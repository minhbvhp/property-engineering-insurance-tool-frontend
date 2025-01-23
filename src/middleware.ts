import { sendRequest } from "@/utils/api";
import { getSecondsUntilExpiration } from "@/utils/helpers";
import { jwtDecode } from "jwt-decode";
import { encode, getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/dashboard", "/admin"];
const publicPaths = ["/login"];
const secret = process.env.AUTH_SECRET;
const sessionTokenName = process.env.SESSION_TOKEN_NAME || "sessionToken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = privatePaths.some((path) =>
    pathname.startsWith(path)
  );
  const isPublicPage = publicPaths.some((path) => pathname.startsWith(path));
  const isAdminPage =
    pathname.includes("admin") || pathname.includes("organization");

  if (!secret) return signOut(request);

  const session = await getToken({
    req: request,
    cookieName: sessionTokenName,
    secret,
  });

  let response = NextResponse.next();

  if (isProtectedPage) {
    if (!session) return signOut(request);

    if (shouldSignOut(session)) return signOut(request);

    if (shouldUpdateToken(session.user.access_token)) {
      try {
        const refreshedSession = await refreshAccessToken(
          session,
          session.user.refresh_token
        );

        const newSessionTokenMaxAge = getSecondsUntilExpiration(
          refreshedSession.user.refresh_token
        );

        const newSessionToken = await encode({
          secret,
          salt: sessionTokenName,
          token: refreshedSession,
          maxAge: newSessionTokenMaxAge
            ? newSessionTokenMaxAge
            : 7 * 24 * 60 * 60, // 7 days
        });

        response = updateCookie(
          newSessionToken,
          newSessionTokenMaxAge,
          request,
          response
        );
      } catch {
        return signOut(request);
      }
    }
  }

  // Restrict admin pages
  if (isAdminPage && session?.user?.role?.name !== "Admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect authenticated users away from login page
  if (isPublicPage) {
    if (
      //access_token still valid
      (session?.user.access_token &&
        !isTokenExpired(session?.user.access_token)) ||
      //access_token expire but refresh_token still valid
      ((!session?.user.access_token ||
        isTokenExpired(session?.user.access_token)) &&
        session?.user.refresh_token &&
        !isTokenExpired(session?.user.refresh_token))
    )
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

function signOut(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  request.cookies.getAll().forEach((cookie) => {
    response.cookies.delete(cookie.name);
  });

  return response;
}

function isTokenExpired(token: string): boolean {
  const { exp } = jwtDecode(token);
  return exp ? Date.now() > exp * 1000 : false;
}

function shouldSignOut(token: JWT | null): boolean {
  if (
    !token ||
    !token.user ||
    (!token.user.access_token && !token.user.refresh_token)
  )
    return true;

  const accessToken = token.user.access_token;
  const refreshToken = token.user.refresh_token;
  const isAccessTokenExpired = isTokenExpired(accessToken);
  const isRefreshTokenExpired = isTokenExpired(refreshToken);

  if (
    (!accessToken || isAccessTokenExpired) &&
    (!refreshToken || isRefreshTokenExpired)
  )
    return true;

  return false;
}

function shouldUpdateToken(access_token: string): boolean {
  const isAccessTokenExpired = isTokenExpired(access_token);

  if (!access_token || isAccessTokenExpired) return true;

  return false;
}

async function refreshAccessToken(
  session: any,
  refreshToken: string
): Promise<JWT> {
  const res = await sendRequest<IBackendRes<IRefresh>>({
    method: "POST",
    url: "/api/auth/refresh",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  if (!res.data) throw new Error("Failed to refresh access token");

  return {
    ...session,
    user: {
      ...session.user,
      access_token: res.data.access_token,
      refresh_token: res.data.refresh_token,
    },
  };
}

function updateCookie(
  newSession: string | null,
  maxAge: number | null,
  request: NextRequest,
  response: NextResponse
): NextResponse<unknown> {
  if (newSession) {
    request.cookies.set(sessionTokenName, newSession);

    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    response.cookies.set(sessionTokenName, newSession, {
      httpOnly: true,
      maxAge: maxAge || 7 * 24 * 60 * 60, // 7 days
      sameSite: "lax",
    });
  } else {
    return signOut(request);
  }

  return response;
}

export const config = {
  matcher: [
    {
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      source:
        "/((?!api|_next/static|_next/image|media|fonts|favicon.ico|favicon.png).*)",
      missing: [
        // Exclude Server Actions
        { type: "header", key: "next-action" },
      ],
    },
  ],
};
