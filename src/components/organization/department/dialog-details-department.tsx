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
import { titleDashboardFont } from "@/lib/font";
import { IDepartment } from "@/models/department/definition";
import { Binary, CaseUpper, Eye, Network } from "lucide-react";
import { useState } from "react";

interface IProps {
  department: IDepartment;
}

export default function DialogDetailsDepartment(props: IProps) {
  const { department } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Eye />
          Chi tiết
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-screen-xl px-8">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Thông tin Phòng - {department.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detail department
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2 space-y-4">
            <Input
              PrefixIcon={Binary}
              type="text"
              className="placeholder:italic"
              placeholder="Số URN"
              defaultValue={department.urn}
              readOnly
            />

            <Input
              PrefixIcon={CaseUpper}
              type="text"
              className="placeholder:italic"
              placeholder="Tên phòng"
              defaultValue={department.name}
              readOnly
            />

            <Input
              PrefixIcon={Network}
              type="text"
              className="placeholder:italic"
              placeholder="Chi nhánh"
              defaultValue={`${department.companyBranch.company.shortName} - ${department.companyBranch.name}`}
              readOnly
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
