"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { titleDashboardFont } from "@/lib/font";
import { editCustomer } from "@/models/customer/actions";
import { IEditCustomerDto, ICustomer } from "@/models/customer/definition";
import {
  EditCustomerFormValues,
  editCustomerSchema,
} from "@/models/customer/validations";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookType,
  CaseUpper,
  CircleMinus,
  CirclePlus,
  Contact,
  LetterText,
  Loader2,
  Mailbox,
  MapPin,
  Pencil,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  customer: ICustomer;
}

export default function DialogEditCustomer(props: IProps) {
  const { customer } = props;

  const form = useForm<EditCustomerFormValues>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues: {
      taxCode: customer.taxCode,
      shortName: customer.shortName,
      fullName: customer.fullName,
      address: customer.address,
      contacts: customer.contacts,
    },
  });

  const { isSubmitting } = form.formState;
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const onSubmit = async (values: EditCustomerFormValues) => {
    const editingCustomer: IEditCustomerDto = {
      taxCode: values.taxCode,
      shortName: values.shortName,
      fullName: values.fullName,
      address: values.address,
      contacts: values.contacts,
    };

    const result = await editCustomer(customer.id.toString(), editingCustomer);

    if (!result) {
      handleSignOut();
    } else if (result?.error) {
      toast.error(result?.message);
    } else {
      toast.success(result?.message);
      form.reset();
      setIsDialogOpen(false);
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil />
          Sửa
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-screen-xl px-8">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Cập nhật khách hàng - {customer.shortName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit customer
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="max-h-[80vh]">
          <div className="flex items-center space-x-2 pt-4">
            <div className="grid flex-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="px-3 grid grid-cols-1 gap-4 grid-rows-[min-content_20px_min-content_50px] md:grid-cols-2 md:grid-rows-[20px_1fr_60px]"
                >
                  <div className="items-start space-y-6 row-start-1 md:row-start-2 md:col-start-1">
                    <FormField
                      control={form.control}
                      name="taxCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              PrefixIcon={BookType}
                              type="text"
                              className="placeholder:italic"
                              placeholder="Mã số thuế"
                              hasClear
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shortName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              PrefixIcon={CaseUpper}
                              type="text"
                              className="placeholder:italic"
                              placeholder="Tên rút gọn"
                              hasClear
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              PrefixIcon={LetterText}
                              type="text"
                              className="placeholder:italic"
                              placeholder="Tên đầy đủ"
                              hasClear
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              PrefixIcon={MapPin}
                              type="text"
                              className="placeholder:italic"
                              placeholder="Địa chỉ"
                              hasClear
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center row-start-2 md:col-start-2 md:row-start-1">
                    <CirclePlus
                      className="hover:cursor-pointer text-primary dark:text-[#f5f5f5]"
                      onClick={() => append({ name: "", phone: "", email: "" })}
                    />
                  </div>

                  <div className="flex flex-col items-stretch space-y-2 row-start-3 md:row-start-2 md:col-start-2">
                    {fields.map((field, index) => (
                      <FormItem key={field.id}>
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <FormControl>
                            <Controller
                              control={control}
                              name={`contacts.${index}.name`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  className="placeholder:italic placeholder:text-[11px] md:placeholder:text-sm"
                                  PrefixIcon={Contact}
                                  placeholder="Tên"
                                  hasClear
                                />
                              )}
                            />
                          </FormControl>

                          <FormControl>
                            <Controller
                              control={control}
                              name={`contacts.${index}.phone`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  className="placeholder:italic placeholder:text-[11px] md:placeholder:text-sm"
                                  PrefixIcon={Phone}
                                  placeholder="Điện thoại"
                                  hasClear
                                />
                              )}
                            />
                          </FormControl>

                          <FormControl>
                            <Controller
                              control={control}
                              name={`contacts.${index}.email`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  className="placeholder:italic placeholder:text-[11px] md:placeholder:text-sm"
                                  PrefixIcon={Mailbox}
                                  placeholder="Email"
                                  hasClear
                                />
                              )}
                            />
                          </FormControl>

                          <CircleMinus
                            className="hover:cursor-pointer text-destructive shrink-0"
                            onClick={() => remove(index)}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    ))}
                  </div>

                  <div className="flex col-span-2 justify-center">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        "Cập nhật"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
