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
import { IAgent } from "@/models/agent/definition";
import { Binary, CaseUpper, Eye, Network } from "lucide-react";
import { useState } from "react";

interface IProps {
  agent: IAgent;
}

export default function DialogDetailsAgent(props: IProps) {
  const { agent } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Eye />
          Chi tiết
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-screen-sm px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Thông tin Phòng - {agent.fullName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detail agent
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
              defaultValue={agent.urn}
              readOnly
            />

            <Input
              PrefixIcon={CaseUpper}
              type="text"
              className="placeholder:italic"
              placeholder="Tên nhân viên"
              defaultValue={agent.fullName}
              readOnly
            />

            <Input
              PrefixIcon={Network}
              type="text"
              className="placeholder:italic"
              placeholder="Phòng"
              defaultValue={agent.department.name}
              readOnly
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}