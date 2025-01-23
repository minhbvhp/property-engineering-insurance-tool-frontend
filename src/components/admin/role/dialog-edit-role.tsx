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
import { editRole } from "@/models/role/actions";
import { IEditRoleDto, IRole } from "@/models/role/definition";
import { EditRoleFormValues, editRoleSchema } from "@/models/role/validations";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2, Pencil, UserCog } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  role: IRole;
}

export default function DialogEditRole(props: IProps) {
  const { role } = props;

  const form = useForm<EditRoleFormValues>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      name: role.name,
      description: role.description,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: EditRoleFormValues) => {
    const editingRole: IEditRoleDto = {
      name: values.name,
      description: values.description,
    };

    const result = await editRole(role.id.toString(), editingRole);

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
            Cập nhật vai trò - {role.name}
          </DialogTitle>
          <DialogDescription className="sr-only">Edit role</DialogDescription>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={UserCog}
                          type="text"
                          {...field}
                          className="placeholder:italic"
                          placeholder="Vai trò"
                          hasClear
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={Info}
                          type="text"
                          {...field}
                          className="placeholder:italic"
                          placeholder="Mô tả"
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
