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
import { Separator } from "@/components/ui/separator";
import { titleDashboardFont } from "@/lib/font";
import { editCompany } from "@/models/company/actions";
import { IEditCompanyDto, ICompany } from "@/models/company/definition";
import {
  EditCompanyFormValues,
  editCompanySchema,
} from "@/models/company/validations";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookA,
  CaseUpper,
  Hash,
  LetterText,
  Loader2,
  Pencil,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  company: ICompany;
}

export default function DialogEditCompany(props: IProps) {
  const { company } = props;

  const form = useForm<EditCompanyFormValues>({
    resolver: zodResolver(editCompanySchema),
    defaultValues: {
      shortName: company.shortName,
      fullName: company.fullName,
      englishName: company.englishName,
      registrationNumber: company.registrationNumber,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: EditCompanyFormValues) => {
    const editingCompany: IEditCompanyDto = {
      shortName: values.shortName,
      fullName: values.fullName,
      englishName: values.englishName,
      registrationNumber: values.registrationNumber,
    };

    const result = await editCompany(company.id.toString(), editingCompany);

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

      <DialogContent className="max-w-screen-sm px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Cập nhật công ty - {company.shortName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit company
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                          placeholder="Tên viết tắt"
                          {...field}
                          hasClear
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
                          {...field}
                          hasClear
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="englishName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={BookA}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Tên tiếng Anh"
                          {...field}
                          hasClear
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={Hash}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Số đăng ký"
                          {...field}
                          hasClear
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full col-span-2"
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
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
