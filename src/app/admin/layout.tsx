import "server-only";

import { Metadata } from "next";
import { auth } from "@/auth";
import { Session } from "next-auth";
import UserDropdownMenu from "@/components/ui/user-dropdown-menu";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return <>Something wrong</>;
  }

  const { user } = session as Session;

  const avatar = user.nameVN
    .split(" ")
    .slice(-2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const navUser = { ...user, avatar: avatar };

  return (
    <>
      <header className="flex h-16 sticky z-50 top-0 bg-background shrink-0 items-center justify-end gap-2 border-b">
        <div className="flex items-center gap-2 px-4">
          <span className="text-primary dark:text-[#f5f5f5]">
            {navUser.nameVN}
          </span>
          <UserDropdownMenu user={navUser} />
          <Separator orientation="vertical" className="h-4 ml-2 border-r" />
          <ModeToggle />
        </div>
      </header>

      <div className="flex flex-col flex-1 gap-4 pt-0">{children}</div>
    </>
  );
}
