"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Binary, CaseUpper, Loader2, Network, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  CreateAgentFormValues,
  createAgentSchema,
} from "@/models/agent/validations";
import { Button } from "@/components/ui/button";
import { titleDashboardFont } from "@/lib/font";
import { ICreateAgentDto } from "@/models/agent/definition";
import { createAgent } from "@/models/agent/actions";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SelectWithLoading } from "@/components/ui/select-with-loading";
import { IDepartment } from "@/models/department/definition";
import { getAllDepartments } from "@/models/department/data";
import { handleSignOut } from "@/utils/handleSignOut";

export default function DialogCreateAgent() {
  const fetchDepartments = async (): Promise<IDepartment[]> => {
    const res = await getAllDepartments();
    return res.data;
  };

  const form = useForm<CreateAgentFormValues>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      urn: "",
      fullName: "",
      departmentId: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: CreateAgentFormValues) => {
    const newAgent: ICreateAgentDto = {
      urn: values.urn,
      fullName: values.fullName,
      departmentId: +values.departmentId,
    };

    const result = await createAgent(newAgent);

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
            Phòng mới
          </DialogTitle>
          <DialogDescription className="sr-only">New agent</DialogDescription>
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
                          placeholder="Tên đại lý"
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
