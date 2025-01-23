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
import GenderIcon from "@/custom-icons/gender-icon";
import { titleDashboardFont } from "@/lib/font";
import { getAllCompanyBranches } from "@/models/company-branch/data";
import { ICompanyBranch } from "@/models/company-branch/definition";
import { getAllGenders } from "@/models/gender/data";
import { IGender } from "@/models/gender/definition";
import { getAllRoles } from "@/models/role/data";
import { IRole } from "@/models/role/definition";
import { editUser } from "@/models/user/actions";
import { IEditUserDto, IUser } from "@/models/user/definition";
import { EditUserFormValues, editUserSchema } from "@/models/user/validations";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookA,
  Building,
  Loader2,
  Mail,
  MapPinHouse,
  Network,
  Pencil,
  Phone,
  User,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  user: IUser;
}

export default function DialogEditUser(props: IProps) {
  const { user } = props;

  const fetchGenders = async (): Promise<IGender[]> => {
    const res = await getAllGenders();
    return res.data;
  };

  const fetchCompanyBranches = async (): Promise<ICompanyBranch[]> => {
    const res = await getAllCompanyBranches();
    return res.data;
  };

  const fetchRoles = async (): Promise<IRole[]> => {
    const res = await getAllRoles();
    return res.data;
  };

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      nameVN: user.nameVN,
      nameEN: user.nameEN,
      phoneNumber: user.phoneNumber,
      genderId: user.gender.id.toString(),
      companyBranchId: user.companyBranch.id.toString(),
      roleId: user.role.id.toString(),
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: EditUserFormValues) => {
    const editingUser: IEditUserDto = {
      nameVN: values.nameVN,
      nameEN: values.nameEN,
      phoneNumber: values.phoneNumber,
      genderId: +values.genderId,
      companyBranchId: +values.companyBranchId,
      roleId: +values.roleId,
    };

    const result = await editUser(user.id, editingUser);

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

      <DialogContent className="max-w-screen-lg lg:max-w-screen-lg px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Cập nhật người dùng - {user.email}
          </DialogTitle>
          <DialogDescription className="sr-only">Edit user</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-11"
                autoComplete="off"
              >
                <div className="space-y-4">
                  <Input PrefixIcon={Mail} defaultValue={user.email} disabled />

                  <FormField
                    control={form.control}
                    name="nameVN"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            PrefixIcon={User}
                            type="text"
                            {...field}
                            className="placeholder:italic"
                            placeholder="Họ tên (Việt)"
                            hasClear
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nameEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            PrefixIcon={BookA}
                            type="text"
                            {...field}
                            className="placeholder:italic"
                            placeholder="Họ tên (Anh)"
                            hasClear
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            PrefixIcon={Phone}
                            type="text"
                            {...field}
                            className="placeholder:italic"
                            placeholder="Điện thoại"
                            hasClear
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="genderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SelectWithLoading<IGender>
                            fetchOptions={fetchGenders}
                            labelExtractor={(gender) => gender.titleVN}
                            valueExtractor={(gender) => gender.id.toString()}
                            placeholder="Chọn giới tính..."
                            PrefixIcon={GenderIcon}
                            defaultValue={
                              form.formState.defaultValues?.genderId
                            }
                            onChange={field.onChange}
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
                            defaultValue={
                              form.formState.defaultValues?.companyBranchId
                            }
                            onChange={field.onChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SelectWithLoading<IRole>
                            fetchOptions={fetchRoles}
                            labelExtractor={(role) => role.description}
                            valueExtractor={(role) => role.id.toString()}
                            placeholder="Chọn vai trò..."
                            PrefixIcon={UserCog}
                            defaultValue={form.formState.defaultValues?.roleId}
                            onChange={field.onChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
