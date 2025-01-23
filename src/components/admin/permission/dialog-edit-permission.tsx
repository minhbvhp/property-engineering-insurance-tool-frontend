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
import { SelectWithLoading } from "@/components/ui/select-with-loading";
import { Separator } from "@/components/ui/separator";
import { titleDashboardFont } from "@/lib/font";
import { editPermission } from "@/models/permission/actions";
import { getAllActions } from "@/models/permission/data";
import {
  IAction,
  IEditPermissionDto,
  IPermission,
} from "@/models/permission/definition";
import {
  EditPermissionFormValues,
  editPermissionSchema,
} from "@/models/permission/validations";
import { getAllSubjects } from "@/models/subject/data";
import { ISubject } from "@/models/subject/definition";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleCheck,
  CircleHelp,
  CircleMinus,
  CirclePlus,
  HandHelping,
  Info,
  Loader2,
  Pencil,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  permission: IPermission;
}

export default function DialogEditPermission(props: IProps) {
  const { permission } = props;

  const fetchSubject = async (): Promise<ISubject[]> => {
    const res = await getAllSubjects();
    return res.data;
  };

  const form = useForm<EditPermissionFormValues>({
    resolver: zodResolver(editPermissionSchema),
    defaultValues: {
      action: permission.action,
      subjectId: permission.subjectId.toString(),
      conditions: permission.condition
        ? Object.entries(permission.condition).map(([key, value]) => ({
            key,
            value,
          }))
        : [{ key: "", value: "" }],
      description: permission.description,
    },
  });

  const { isSubmitting } = form.formState;
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "conditions",
  });

  const onSubmit = async (values: EditPermissionFormValues) => {
    const editingPermission: IEditPermissionDto = {
      action: values.action,
      subjectId: +values.subjectId,
      condition: values.conditions.reduce<Record<string, string>>(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {}
      ),
      description: values.description,
    };

    const result = await editPermission(
      permission.id.toString(),
      editingPermission
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

      <DialogContent className="max-w-screen-lg md:px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Cập nhật quyền hạn - {permission.description}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit permission
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="max-h-[80vh] w-fit">
          <div className="flex items-center space-x-2 pt-4">
            <div className="grid flex-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="px-3 gap-4 grid grid-cols-1 grid-rows-[min-content_20px_min-content_50px] md:grid-cols-2 md:grid-rows-[20px_1fr_60px]"
                >
                  <div className="space-y-4 row-start-1 md:row-start-2 md:col-start-1">
                    <FormField
                      control={form.control}
                      name="action"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <SelectWithLoading<IAction>
                              fetchOptions={() => getAllActions()}
                              labelExtractor={(action) => action.description}
                              valueExtractor={(action) => action.name}
                              placeholder="Chọn quyền thao tác..."
                              PrefixIcon={HandHelping}
                              defaultValue={
                                form.formState.defaultValues?.action
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
                      name="subjectId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <SelectWithLoading<ISubject>
                              fetchOptions={fetchSubject}
                              labelExtractor={(subject) => subject.name}
                              valueExtractor={(subject) =>
                                subject.id.toString()
                              }
                              placeholder="Chọn đối tượng..."
                              PrefixIcon={Tag}
                              defaultValue={
                                form.formState.defaultValues?.subjectId
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
                  </div>

                  <div className="flex flex-col items-center justify-center row-start-2 md:col-start-2 md:row-start-1">
                    <CirclePlus
                      className="hover:cursor-pointer text-primary dark:text-[#f5f5f5]"
                      onClick={() => append({ key: "", value: "" })}
                    />
                  </div>

                  <div className="flex flex-col items-center space-y-2 row-start-3 md:row-start-2 md:col-start-2">
                    {fields.map((field, index) => (
                      <FormItem key={field.id}>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Controller
                              control={control}
                              name={`conditions.${index}.key`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  className="placeholder:italic placeholder:text-[11px] md:placeholder:text-sm"
                                  PrefixIcon={CircleHelp}
                                  placeholder="Điều kiện"
                                  hasClear
                                />
                              )}
                            />
                          </FormControl>

                          <FormControl>
                            <Controller
                              control={control}
                              name={`conditions.${index}.value`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  className="placeholder:italic placeholder:text-[11px] md:placeholder:text-sm"
                                  PrefixIcon={CircleCheck}
                                  placeholder="Thỏa mãn"
                                  hasClear
                                />
                              )}
                            />
                          </FormControl>

                          <CircleMinus
                            className="hover:cursor-pointer text-destructive"
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
