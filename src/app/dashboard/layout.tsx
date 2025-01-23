import "server-only";

import type { Metadata } from "next";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { MenuItem } from "@/lib/definitions";
import CustomBreadcrumb from "@/components/dashboard/custom-breadcrumb";

export const metadata: Metadata = {
  title: "Trang quản lý",
  description: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return <>Something wrong</>;
  }

  const navMain: MenuItem[] = [
    {
      title: "Khách hàng",
      url: "customers",
      iconName: "users",
      isActive: false,
      items: [
        {
          title: "Danh sách",
          url: "customers?current=1&pageSize=10",
          isActive: false,
        },
        {
          title: "Tìm kiếm",
          url: "customers/search",
          isActive: false,
        },
      ],
    },
    ...(session.user.role.name === "Admin"
      ? [
          {
            title: "Bộ máy tổ chức",
            url: "organization",
            iconName: "layoutGrid",
            isActive: false,
            items: [
              {
                title: "Phòng",
                url: "organization/departments",
                isActive: false,
              },
              {
                title: "Nhân viên",
                url: "organization/employees",
                isActive: false,
              },
              {
                title: "Đại lý",
                url: "organization/agents",
                isActive: false,
              },
            ],
          },
        ]
      : []),
    // {
    //   title: "Dịch vụ",
    //   url: "#",
    //   icon: Package,
    //   isActive: false,
    //   items: [
    //     {
    //       title: "Danh sách",
    //       url: "customers/create",
    //       isActive: false,
    //     },
    //     {
    //       title: "Tìm kiếm",
    //       url: "customers/search",
    //       isActive: false,
    //     },
    //   ],
    // },
  ];

  const { user } = session as Session;

  const avatar = user.nameVN
    .split(" ")
    .slice(-2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const navUser = { ...user, avatar: avatar };

  return (
    <SidebarProvider>
      <AppSidebar user={navUser} menus={navMain} />
      <SidebarInset>
        <header className="flex h-16 sticky z-50 top-0 bg-background shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2 border-r" />
            <CustomBreadcrumb menus={navMain} />
          </div>
        </header>

        <Separator />
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
