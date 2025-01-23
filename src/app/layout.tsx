"server-only";

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { inter } from "@/lib/font";

export const metadata: Metadata = {
  title: "Tài sản kĩ thuật",
  description: "Ứng dụng quản lý cấp đơn tài sản kĩ thuật",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>

          <Toaster
            position="top-right"
            closeButton={true}
            richColors
            className="animate-in slide-in-from-top-9 md:slide-in-from-top-0 md:slide-in-from-right duration-500"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
