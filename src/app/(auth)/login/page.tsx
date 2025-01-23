import "server-only";

import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập",
};

export default async function LoginPage() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#c8eaee] to-[#fff8dc]">
      <div className="flex w-full items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
}
