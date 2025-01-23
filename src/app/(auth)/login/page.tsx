import "server-only";

import LoginCover from "@/components/auth/login-cover";
import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập",
};

export default async function LoginPage() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#c8eaee] to-[#fff8dc]">
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <LoginCover />
      </div>

      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
