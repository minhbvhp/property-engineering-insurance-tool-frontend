"use client";

import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavTheme } from "@/components/dashboard/nav-theme";
import { IAccount } from "@/types/next-auth";
import { MenuItem } from "@/lib/definitions";

interface IProps {
  user?: IAccount;
  menus: MenuItem[];
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> | IProps) {
  const { user, menus } = props as IProps;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavTheme />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
