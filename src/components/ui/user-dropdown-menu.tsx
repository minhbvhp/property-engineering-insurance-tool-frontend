"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAccount } from "@/types/next-auth";
import { handleSignOut } from "@/utils/handleSignOut";
import { BadgeInfo, ChartNoAxesCombined, LogOut } from "lucide-react";
import Link from "next/link";

interface IProps {
  user: IAccount;
}

export default function UserDropdownMenu(props: IProps) {
  const { user } = props;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Avatar className="w-8 h-8 rounded-lg">
              <AvatarFallback className="rounded-lg bg-primary/70 text-[#f5f5f5]">
                {user ? user.avatar : "N/A"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <Link href="/profile">
            <DropdownMenuItem>
              <BadgeInfo />
              Thông tin
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <Link href="/dashboard">
            <DropdownMenuItem>
              <ChartNoAxesCombined />
              Về trang quản lý
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleSignOut()}>
            <LogOut />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
