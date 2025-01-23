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
import { getAllCompanyAreas } from "@/models/company-area/data";
import { ICompanyArea } from "@/models/company-area/definition";
import { editCompanyBranch } from "@/models/company-branch/actions";
import {
  IEditCompanyBranchDto,
  ICompanyBranch,
} from "@/models/company-branch/definition";
import {
  EditCompanyBranchFormValues,
  editCompanyBranchSchema,
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
  Pencil,
  Phone,
  Printer,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  companyBranch: ICompanyBranch;
}

export default function DialogEditCompanyBranch(props: IProps) {
  const { companyBranch } = props;

  const fetchCompanies = async (): Promise<ICompany[]> => {
    const res = await getAllCompanies();
    return res.data;
  };

  const fetchCompanyAreas = async (): Promise<ICompanyArea[]> => {
    const res = await getAllCompanyAreas();
    return res.data;
  };

  const form = useForm<EditCompanyBranchFormValues>({
    resolver: zodResolver(editCompanyBranchSchema),
    defaultValues: {
      companyId: companyBranch.companyId.toString(),
      areaId: companyBranch.areaId.toString(),
      name: companyBranch.name,
      address: companyBranch.address,
      addressEN: companyBranch.addressEN,
      phoneNumber: companyBranch.phoneNumber,
      fax: companyBranch.fax,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: EditCompanyBranchFormValues) => {
    const editingCompanyBranch: IEditCompanyBranchDto = {
      companyId: +values.companyId,
      areaId: +values.areaId,
      name: values.name,
      address: values.address,
      addressEN: values.addressEN,
      phoneNumber: values.phoneNumber || "",
      fax: values.fax || "",
    };

    const result = await editCompanyBranch(
      companyBranch.id.toString(),
      editingCompanyBranch
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

      <DialogContent className="max-w-screen-sm px-10">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            Cập nhật khu vực - {companyBranch.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit Company Area
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
                          defaultValue={form.formState.defaultValues?.companyId}
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
                          defaultValue={form.formState.defaultValues?.areaId}
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
