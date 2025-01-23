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
import { SelectWithLoading } from "@/components/ui/select-with-loading";
import { Separator } from "@/components/ui/separator";
import { titleDashboardFont } from "@/lib/font";
import { getAllCompanyBranches } from "@/models/company-branch/data";
import { ICompanyBranch } from "@/models/company-branch/definition";
import { editDepartment } from "@/models/department/actions";
import {
  IEditDepartmentDto,
  IDepartment,
} from "@/models/department/definition";
import {
  EditDepartmentFormValues,
  editDepartmentSchema,
} from "@/models/department/validations";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Binary, CaseUpper, Loader2, Network, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  department: IDepartment;
}

export default function DialogEditDepartment(props: IProps) {
  const fetchCompanyBranches = async (): Promise<ICompanyBranch[]> => {
    const res = await getAllCompanyBranches();
    return res.data;
  };

  const { department } = props;

  const form = useForm<EditDepartmentFormValues>({
    resolver: zodResolver(editDepartmentSchema),
    defaultValues: {
      urn: department.urn,
      name: department.name,
      companyBranchId: department.companyBranchId.toString(),
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: EditDepartmentFormValues) => {
    const editingDepartment: IEditDepartmentDto = {
      urn: values.urn,
      name: values.name,
      companyBranchId: +values.companyBranchId,
    };

    const result = await editDepartment(
      department.id.toString(),
      editingDepartment
    );

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
            Cập nhật Phòng - {department.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit department
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
                  name="urn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={Binary}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Số URN"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={CaseUpper}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Tên phòng"
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
                  name="companyBranchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectWithLoading<ICompanyBranch>
                          fetchOptions={fetchCompanyBranches}
                          labelExtractor={(companyBranch) =>
                            `${companyBranch.company.shortName} - ${companyBranch.name}`
                          }
                          valueExtractor={(companyBranch) =>
                            companyBranch.id.toString()
                          }
                          placeholder="Chọn chi nhánh..."
                          PrefixIcon={Network}
                          onChange={field.onChange}
                          defaultValue={
                            form.formState.defaultValues?.companyBranchId
                          }
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
