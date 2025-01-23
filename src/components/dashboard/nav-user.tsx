"use client";

import { ChevronsUpDown, BadgeInfo, KeyRound, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IAccount } from "@/types/next-auth";
import { useEffect } from "react";
import { storePermissions } from "@/utils/storePermissions";
import { handleSignOut } from "@/utils/handleSignOut";

interface IProps {
  user?: IAccount;
}

export function NavUser(props: IProps) {
  const { user } = props;
  const { isMobile } = useSidebar();

  useEffect(() => {
    if (user) {
      storePermissions();
    }
  }, [user]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="w-8 h-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user ? user.avatar : "N/A"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="font-semibold truncate">{user?.nameVN}</span>
                <span className="text-xs truncate">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {user ? user.avatar : "N/A"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-semibold truncate">
                    {user ? user?.nameVN : "N/A"}
                  </span>
                  <span className="text-xs truncate">
                    {user ? user?.email : "N/A"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem>
                  <BadgeInfo />
                  Thông tin
                </DropdownMenuItem>
              </Link>

              {user?.role.name === "Admin" ? (
                <Link href="/admin?current=1&pageSize=10">
                  <DropdownMenuItem>
                    <KeyRound />
                    Trang quản trị
                  </DropdownMenuItem>
                </Link>
              ) : (
                <></>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleSignOut()}>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
