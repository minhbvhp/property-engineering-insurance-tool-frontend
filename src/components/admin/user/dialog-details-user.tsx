"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import GenderIcon from "@/custom-icons/gender-icon";
import { titleDashboardFont } from "@/lib/font";
import { IUser } from "@/models/user/definition";
import { BookA, Eye, Mail, Network, Phone, User, UserCog } from "lucide-react";
import { useState } from "react";

interface IProps {
  user: IUser;
}

export default function DialogDetailsUser(props: IProps) {
  const { user } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Eye />
          Chi tiết
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-screen-lg lg:max-w-screen-lg px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Thông tin người dùng - {user.email}
          </DialogTitle>
          <DialogDescription className="sr-only">Detail user</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <div className="grid grid-cols-2 gap-11">
              <div className="space-y-4">
                <Input PrefixIcon={Mail} defaultValue={user.email} readOnly />

                <Input
                  PrefixIcon={User}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Họ tên (Việt)"
                  defaultValue={user.nameVN}
                  readOnly
                />

                <Input
                  PrefixIcon={BookA}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Họ tên (Anh)"
                  defaultValue={user.nameEN}
                  readOnly
                />

                <Input
                  PrefixIcon={Phone}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Điện thoại"
                  defaultValue={user.phoneNumber}
                  readOnly
                />
              </div>

              <div className="space-y-4">
                <Input
                  PrefixIcon={GenderIcon}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Giới tính"
                  defaultValue={user.gender.titleVN}
                  readOnly
                />

                <Input
                  PrefixIcon={Network}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Chi nhánh"
                  defaultValue={`${user.companyBranch.company.shortName} - ${user.companyBranch.name}`}
                  readOnly
                />

                <Input
                  PrefixIcon={UserCog}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Vai trò"
                  defaultValue={user.role.name}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
