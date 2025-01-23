"use server";
import { signIn } from "@/auth";
import { LoginPayload } from "@/lib/definitions";
import { AuthError } from "next-auth";

export async function login(payload: LoginPayload) {
  try {
    const { email, password } = payload;

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return res;
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CallbackRouteError") {
        return {
          error: error.name,
          message: "Lỗi server",
        };
      }

      return {
        error: error.name,
        message: error.type,
      };
    } else {
      return {
        error: error,
        message: "Something went wrong",
      };
    }
  }
}
