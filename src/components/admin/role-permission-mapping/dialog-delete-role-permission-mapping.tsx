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
import { Separator } from "@/components/ui/separator";
import { titleDashboardFont } from "@/lib/font";
import { deletePermanentlyRolePermissionMapping } from "@/models/role-permission-mapping/actions";
import { IRolePermissionMapping } from "@/models/role-permission-mapping/definition";
import { handleSignOut } from "@/utils/handleSignOut";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  rolePermissionMapping: IRolePermissionMapping;
}

export default function DialogDeleteRolePermissionMapping(props: IProps) {
  const { rolePermissionMapping } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRolePermissionMapping = async () => {
    setIsDeleting(true);

    const result = await deletePermanentlyRolePermissionMapping(
      rolePermissionMapping.id.toString()
    );

    if (!result) {
      handleSignOut();
    } else if (result?.error) {
      toast.error(result?.message);
    } else {
      toast.success(result?.message);
      setIsDialogOpen(false);
    }

    setIsDeleting(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="text-red-600 hover:text-blue-400 dark:text-red-400">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash />
          Xóa
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-lg px-6">
        <DialogHeader>
          <DialogTitle
            className={`${titleDashboardFont.className} text-primary dark:text-[#f5f5f5]`}
          >
            <span className="text-red-500">Gỡ quyền hạn</span>
            <span className="text-primary">
              {" "}
              - {rolePermissionMapping.permission.description}
            </span>
          </DialogTitle>

          <Separator />

          <DialogDescription className="dark:text-[#f5f5f5] py-4">
            Quyền hạn{" "}
            <span className="font-semibold">
              {rolePermissionMapping.permission.description}
            </span>{" "}
            sẽ bị gỡ khỏi quyền{" "}
            <span className="font-semibold">
              {rolePermissionMapping.role.description}
            </span>{" "}
            vĩnh viễn. Chức năng này không thể hoàn tác. Bạn chắc chắn muốn xóa
            chứ?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 space-x-10">
          <Button
            disabled={isDeleting}
            variant="destructive"
            onClick={() => deleteRolePermissionMapping()}
          >
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Xóa"
            )}
          </Button>

          <Button
            className="bg-muted-foreground"
            onClick={() => setIsDialogOpen(false)}
          >
            Hủy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
