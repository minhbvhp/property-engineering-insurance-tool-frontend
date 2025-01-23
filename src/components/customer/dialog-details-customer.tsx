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
import { ICustomer } from "@/models/customer/definition";
import {
  BookType,
  CaseUpper,
  Contact,
  Eye,
  LetterText,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";

interface IProps {
  customer: ICustomer;
}

export default function DialogDetailsCustomer(props: IProps) {
  const { customer } = props;

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
            Thông tin khách hàng - {customer.shortName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detail customer
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1">
            <div className="px-3 grid grid-cols-1 gap-4 grid-rows-[min-content_20px_min-content_50px] md:grid-cols-2 md:grid-rows-[20px_1fr_60px]">
              <div className="items-start space-y-6 row-start-1 md:row-start-2 md:col-start-1">
                <Input
                  PrefixIcon={BookType}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Mã số thuế"
                  defaultValue={customer.taxCode}
                  readOnly
                />

                <Input
                  PrefixIcon={CaseUpper}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Tên rút gọn"
                  defaultValue={customer.shortName}
                  readOnly
                />

                <Input
                  PrefixIcon={LetterText}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Tên đầy đủ"
                  defaultValue={customer.fullName}
                  readOnly
                />

                <Input
                  PrefixIcon={MapPin}
                  type="text"
                  className="placeholder:italic"
                  placeholder="Địa chỉ"
                  defaultValue={customer.address}
                  readOnly
                />
              </div>

              <div className="flex flex-col items-stretch space-y-2 row-start-3 md:row-start-2 md:col-start-2">
                {customer.contacts.map((contact, index) => (
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Input
                      PrefixIcon={Contact}
                      type="text"
                      className="placeholder:italic"
                      placeholder="Tên"
                      defaultValue={contact.name}
                      readOnly
                    />

                    <Input
                      PrefixIcon={Phone}
                      type="text"
                      className="placeholder:italic"
                      placeholder="Điện thoại"
                      defaultValue={contact.phone}
                      readOnly
                    />

                    <Input
                      PrefixIcon={Phone}
                      type="text"
                      className="placeholder:italic"
                      placeholder="Email"
                      defaultValue={contact.email}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
