import { IAccount } from "@/types/next-auth";
import { sendRequest } from "@/utils/api";
import {
  InvalidCredentialsError,
  NotExistedAccountError,
} from "@/utils/errors";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: "/api/auth/login",
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (+res.statusCode === 201) {
          if (res.data) {
            return res.data;
          } else {
            throw new Error("Tokens error");
          }
        } else if (+res.statusCode === 404) {
          throw new NotExistedAccountError();
        } else if (+res.statusCode === 400) {
          throw new InvalidCredentialsError();
        } else {
          throw new Error("Lỗi máy chủ");
        }
      },
    }),
  ],
  trustHost: true,
  logger: {
    error(error) {
      console.error(`${error.name}: ${error.message.split("#")[1]}`);
    },
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    callbackUrl: {
      name: "callbackUrl",
    },
    csrfToken: {
      name: "csrfToken",
    },
    sessionToken: {
      name: process.env.SESSION_TOKEN_NAME,
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as IAccount;
      }

      return token;
    },
    async session({ session, token }) {
      (session.user as IAccount) = token.user;
      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});
