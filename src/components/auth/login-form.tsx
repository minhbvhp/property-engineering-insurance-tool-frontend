"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2, Mail } from "lucide-react";
import { LoginFormValues, loginSchema } from "@/models/auth/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/models/auth/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { titleFormFont } from "@/lib/font";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: LoginFormValues) => {
    const result = await login(values);

    if (result?.error) {
      toast.error(result.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-lg glassmorphic-card">
      <CardHeader>
        <CardTitle
          className={`${titleFormFont.className} text-5xl text-primary antialiased`}
        >
          Đăng nhập
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-red-500">* </span>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      PrefixIcon={Mail}
                      type="email"
                      className="placeholder:italic"
                      placeholder="Nhập email"
                      hasClear
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-red-500">* </span>
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className="placeholder:italic"
                      placeholder="Nhập mật khẩu"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
