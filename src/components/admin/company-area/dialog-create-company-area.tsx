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
import { createCompanyArea } from "@/models/company-area/actions";
import { ICreateCompanyAreaDto } from "@/models/company-area/definition";
import {
  CreateCompanyAreaFormValues,
  createCompanyAreaSchema,
} from "@/models/company-area/validations";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { LetterText, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DialogCreateCompanyArea() {
  const form = useForm<CreateCompanyAreaFormValues>({
    resolver: zodResolver(createCompanyAreaSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: CreateCompanyAreaFormValues) => {
    const newCompanyArea: ICreateCompanyAreaDto = {
      name: values.name,
    };

    const result = await createCompanyArea(newCompanyArea);

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
            Khu vực mới
          </DialogTitle>
          <DialogDescription className="sr-only">
            New Company Area
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={LetterText}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Tên khu vực"
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
