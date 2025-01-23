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
import { SelectWithLoading } from "@/components/ui/select-with-loading";
import { Separator } from "@/components/ui/separator";
import { titleDashboardFont } from "@/lib/font";
import { getAllCompanyAreas } from "@/models/company-area/data";
import { ICompanyArea } from "@/models/company-area/definition";
import { createCompanyBranch } from "@/models/company-branch/actions";
import { ICreateCompanyBranchDto } from "@/models/company-branch/definition";
import {
  CreateCompanyBranchFormValues,
  createCompanyBranchSchema,
} from "@/models/company-branch/validations";
import { getAllCompanies } from "@/models/company/data";
import { ICompany } from "@/models/company/definition";
import { handleSignOut } from "@/utils/handleSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  LetterText,
  Loader2,
  MapPin,
  MapPinHouse,
  MapPinned,
  Phone,
  Plus,
  Printer,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DialogCreateCompanyBranch() {
  const fetchCompanies = async (): Promise<ICompany[]> => {
    const res = await getAllCompanies();
    return res.data;
  };

  const fetchCompanyAreas = async (): Promise<ICompanyArea[]> => {
    const res = await getAllCompanyAreas();
    return res.data;
  };

  const form = useForm<CreateCompanyBranchFormValues>({
    resolver: zodResolver(createCompanyBranchSchema),
    defaultValues: {
      companyId: "",
      areaId: "",
      name: "",
      address: "",
      addressEN: "",
      phoneNumber: "",
      fax: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: CreateCompanyBranchFormValues) => {
    const newCompanyBranch: ICreateCompanyBranchDto = {
      companyId: +values.companyId,
      areaId: +values.areaId,
      name: values.name,
      address: values.address,
      addressEN: values.addressEN,
      phoneNumber: values.phoneNumber || "",
      fax: values.fax || "",
    };

    const result = await createCompanyBranch(newCompanyBranch);

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
            Chi nhánh mới
          </DialogTitle>
          <DialogDescription className="sr-only">
            New Company Branch
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
                  name="companyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectWithLoading<ICompany>
                          fetchOptions={fetchCompanies}
                          labelExtractor={(company) => company.shortName}
                          valueExtractor={(company) => company.id.toString()}
                          placeholder="Chọn công ty..."
                          PrefixIcon={Building2}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="areaId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectWithLoading<ICompanyArea>
                          fetchOptions={fetchCompanyAreas}
                          labelExtractor={(area) => area.name}
                          valueExtractor={(area) => area.id.toString()}
                          placeholder="Chọn khu vực..."
                          PrefixIcon={MapPinHouse}
                          onChange={field.onChange}
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
                          PrefixIcon={LetterText}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Tên chi nhánh"
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={MapPin}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Địa chỉ"
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
                  name="addressEN"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={MapPinned}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Địa chỉ (Anh)"
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={Phone}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Điện thoại"
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
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          PrefixIcon={Printer}
                          type="text"
                          className="placeholder:italic"
                          placeholder="Fax"
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
