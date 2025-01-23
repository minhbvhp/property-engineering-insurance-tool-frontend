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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectWithLoading } from "@/components/ui/select-with-loading";
import { Separator } from "@/components/ui/separator";
import { titleDashboardFont } from "@/lib/font";
import { createRolePermissionMapping } from "@/models/role-permission-mapping/actions";
import { getAllPermissions } from "@/models/permission/data";
import { ICreateRolePermissionMappingsDto } from "@/models/role-permission-mapping/definition";
import {
  CreateRolePermissionMappingsFormValues,
  createRolePermissionMappingsSchema,
} from "@/models/role-permission-mapping/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleMinus,
  CirclePlus,
  Loader2,
  Plus,
  ShieldCheckIcon,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { IRole } from "@/models/role/definition";
import { getAllRoles } from "@/models/role/data";
import { IPermission } from "@/models/permission/definition";
import { handleSignOut } from "@/utils/handleSignOut";

export default function DialogCreateRolePermissionMapping() {
  const fetchRoles = async (): Promise<IRole[]> => {
    const res = await getAllRoles();
    return res.data;
  };

  const fetchPermissions = async (): Promise<IPermission[]> => {
    const res = await getAllPermissions();
    return res.data;
  };

  const form = useForm<CreateRolePermissionMappingsFormValues>({
    resolver: zodResolver(createRolePermissionMappingsSchema),
    defaultValues: {
      roleId: "",
      permissionIds: [{ id: "" }],
    },
  });

  const { isSubmitting } = form.formState;
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "permissionIds",
  });

  const onSubmit = async (values: CreateRolePermissionMappingsFormValues) => {
    const newRolePermissionMapping: ICreateRolePermissionMappingsDto = {
      roleId: +values.roleId,
      permissionIds: values.permissionIds.map((permission) => +permission.id),
    };

    const result = await createRolePermissionMapping(newRolePermissionMapping);

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

      <DialogContent className="max-w-screen-lg md:px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Phân quyền mới
          </DialogTitle>
          <DialogDescription className="sr-only">
            New role with permission
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="max-h-[80vh]">
          <div className="flex space-x-2 pt-4 items-center">
            <div className="grid flex-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="px-3 gap-4 grid grid-cols-1 grid-rows-[min_content_20px_min_content_50px] md:grid-cols-[1fr_1fr] md:grid-rows-[20px_1fr_60px]"
                >
                  <div className="space-y-4 row-start-1 md:row-start-2 md:col-start-1">
                    <FormField
                      control={form.control}
                      name="roleId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="min-w-full">
                              <SelectWithLoading<IRole>
                                fetchOptions={fetchRoles}
                                labelExtractor={(role) => role.description}
                                valueExtractor={(role) => role.id.toString()}
                                placeholder="Chọn vai trò..."
                                PrefixIcon={UserCog}
                                onChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center row-start-2 md:col-start-2 md:row-start-1">
                    <CirclePlus
                      className="hover:cursor-pointer text-primary dark:text-[#f5f5f5]"
                      onClick={() => append({ id: "" })}
                    />
                  </div>

                  <div className="flex flex-col space-y-2 row-start-3 md:row-start-2 md:col-start-2">
                    {fields.map((field, index) => (
                      <FormItem key={field.id}>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Controller
                              control={control}
                              name={`permissionIds.${index}.id`}
                              render={({ field }) => (
                                <div className="flex-grow">
                                  <SelectWithLoading<IPermission>
                                    fetchOptions={fetchPermissions}
                                    labelExtractor={(permission) =>
                                      permission.description
                                    }
                                    valueExtractor={(permission) =>
                                      permission.id.toString()
                                    }
                                    placeholder="Chọn quyền..."
                                    PrefixIcon={ShieldCheckIcon}
                                    onChange={field.onChange}
                                  />
                                </div>
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

                  <div className="flex items-center justify-center row-start-4 md:col-span-3 md:row-start-3">
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
                        "Tạo mới"
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
