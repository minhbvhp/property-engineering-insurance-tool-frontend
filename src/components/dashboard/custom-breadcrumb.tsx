"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MenuItem } from "@/lib/definitions";
import { updateIsActive } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  menus: MenuItem[];
}

export default function CustomBreadcrumb(props: IProps) {
  const { menus } = props;
  const pathName = usePathname();
  const activePathName = pathName.split("/dashboard/")[1];

  const [menuItems, setMenuItems] = useState(menus);
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [activeMenuSubItem, setActiveMenuSubItem] = useState("");

  useEffect(() => {
    const updatedNavMain = updateIsActive(menus, activePathName);
    setMenuItems(updatedNavMain);
  }, [activePathName]);

  useEffect(() => {
    const activeItem = menuItems.find((item) => item.isActive);

    if (activeItem) {
      setActiveMenuItem(activeItem.title);

      if (activeItem.items) {
        const activeSubItem = activeItem.items.find((item) => item.isActive);
        if (activeSubItem) {
          setActiveMenuSubItem(activeSubItem.title);
        }
      }
    } else {
      setActiveMenuSubItem("");
    }
  }, [menuItems]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Trang quản lý</BreadcrumbLink>
        </BreadcrumbItem>

        {activeMenuItem ? (
          <>
            <BreadcrumbSeparator className="hidden md:block" />

            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>{activeMenuItem}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <></>
        )}

        {activeMenuSubItem ? (
          <>
            <BreadcrumbSeparator className="hidden md:block" />

            <BreadcrumbItem>
              <BreadcrumbPage>{activeMenuSubItem}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <></>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
