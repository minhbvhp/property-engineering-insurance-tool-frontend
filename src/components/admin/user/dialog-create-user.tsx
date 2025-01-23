"use client";

import {
  BookA,
  BookUser,
  Loader2,
  Mail,
  Network,
  Phone,
  Plus,
  UserCog,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  CreateUserFormValues,
  createUserSchema,
} from "@/models/user/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { titleDashboardFont } from "@/lib/font";
import { Separator } from "@/components/ui/separator";
import { IGender } from "@/models/gender/definition";
import { IRole } from "@/models/role/definition";
import { getAllGenders } from "@/models/gender/data";
import { getAllRoles } from "@/models/role/data";
import { SelectWithLoading } from "@/components/ui/select-with-loading";
import { ICreateUserDto } from "@/models/user/definition";
import { createUser } from "@/models/user/actions";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import GenderIcon from "@/custom-icons/gender-icon";
import { ICompanyBranch } from "@/models/company-branch/definition";
import { getAllCompanyBranches } from "@/models/company-branch/data";
import { handleSignOut } from "@/utils/handleSignOut";

export default function DialogCreateUser() {
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

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      nameVN: "",
      nameEN: "",
      genderId: "",
      phoneNumber: "",
      companyBranchId: "",
      roleId: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: CreateUserFormValues) => {
    const newUser: ICreateUserDto = {
      email: values.email,
      password: values.password,
      nameVN: values.nameVN,
      nameEN: values.nameEN,
      phoneNumber: values.phoneNumber,
      genderId: +values.genderId,
      companyBranchId: +values.companyBranchId,
      roleId: +values.roleId,
    };

    const result = await createUser(newUser);

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
        <Button>
          <Plus />
          Thêm mới
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen-lg lg:max-w-screen-lg px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Người dùng mới
          </DialogTitle>
          <DialogDescription className="sr-only">New user</DialogDescription>
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
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            PrefixIcon={Mail}
                            type="email"
                            className="placeholder:italic"
                            placeholder="Email"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            className="placeholder:italic"
                            placeholder="Mật khẩu"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nameVN"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            PrefixIcon={BookUser}
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
                    "Tạo mới"
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
