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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { titleDashboardFont } from "@/lib/font";
import { createRole } from "@/models/role/actions";
import { ICreateRoleDto } from "@/models/role/definition";
import {
  CreateRoleFormValues,
  createRoleSchema,
} from "@/models/role/validations";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2, Plus, UserCog } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DialogCreateRole() {
  const form = useForm<CreateRoleFormValues>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: CreateRoleFormValues) => {
    const newRole: ICreateRoleDto = {
      name: values.name,
      description: values.description,
    };

    const result = await createRole(newRole);

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

      <DialogContent className="max-w-screen-sm px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Vai trò mới
          </DialogTitle>
          <DialogDescription className="sr-only">New role</DialogDescription>
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
                          className="placeholder:italic"
                          placeholder="Vai trò"
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
