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
import { getAllDepartments } from "@/models/department/data";
import { IDepartment } from "@/models/department/definition";
import { editEmployee } from "@/models/employee/actions";
import { IEditEmployeeDto, IEmployee } from "@/models/employee/definition";
import {
  EditEmployeeFormValues,
  editEmployeeSchema,
} from "@/models/employee/validations";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Binary, CaseUpper, Loader2, Network, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  employee: IEmployee;
}

export default function DialogEditEmployee(props: IProps) {
  const fetchDepartments = async (): Promise<IDepartment[]> => {
    const res = await getAllDepartments();
    return res.data;
  };

  const { employee } = props;

  const form = useForm<EditEmployeeFormValues>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      urn: employee.urn,
      fullName: employee.fullName,
      departmentId: employee.departmentId.toString(),
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: EditEmployeeFormValues) => {
    const editingEmployee: IEditEmployeeDto = {
      urn: values.urn,
      fullName: values.fullName,
      departmentId: +values.departmentId,
    };

    const result = await editEmployee(employee.id.toString(), editingEmployee);

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
            Cập nhật nhân viên - {employee.fullName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit employee
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
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={CaseUpper}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Tên nhân viên"
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
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectWithLoading<IDepartment>
                          fetchOptions={fetchDepartments}
                          labelExtractor={(department) => department.name}
                          valueExtractor={(department) =>
                            department.id.toString()
                          }
                          placeholder="Chọn Phòng..."
                          PrefixIcon={Network}
                          onChange={field.onChange}
                          defaultValue={
                            form.formState.defaultValues?.departmentId
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
