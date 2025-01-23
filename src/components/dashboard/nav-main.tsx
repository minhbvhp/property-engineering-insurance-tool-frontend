"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { MenuItem } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { updateIsActive } from "@/utils/helpers";
import { iconMap } from "@/utils/iconMaps";

interface IProps {
  items: MenuItem[];
}

export function NavMain(props: IProps) {
  const { items } = props;
  const pathName = usePathname();
  const [menuItems, setMenuItems] = useState(items);

  const activePathName = pathName.split("/dashboard/")[1];

  useEffect(() => {
    const updatedNavMain = updateIsActive(items, activePathName);
    setMenuItems(updatedNavMain);
  }, [activePathName]);
  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuItems.map((item) => {
          const Icon = iconMap[item.iconName || ""];

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.isActive}
                  >
                    {Icon && <Icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                        >
                          <Link href={`/dashboard/${subItem.url}`}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
