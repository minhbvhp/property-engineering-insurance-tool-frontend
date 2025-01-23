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
import { deletePermanentlyUser } from "@/models/user/actions";
import { IUser } from "@/models/user/definition";
import { handleSignOut } from "@/utils/handleSignOut";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  user: IUser;
}

export default function DialogDeleteUser(props: IProps) {
  const { user } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async () => {
    setIsDeleting(true);

    const result = await deletePermanentlyUser(user.id);

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
            <span className="text-red-500">Xóa người dùng</span>
            <span className="text-primary"> - {user.email}</span>
          </DialogTitle>

          <Separator />

          <DialogDescription className="dark:text-[#f5f5f5] py-4">
            Người dùng <span className="font-semibold">{user.nameVN}</span> sẽ
            bị xóa vĩnh viễn. Thao tác này chỉ sử dụng được khi người dùng chưa
            tạo bất kỳ thông tin nào. Nếu người dùng đã tạo thông tin, hệ thống
            đề xuất sử dụng chức năng{" "}
            <span className="font-semibold">Khóa tài khoản</span>. Nếu bạn vẫn
            muốn thực hiện thao tác này, bạn cần phải xóa các thông tin mà người
            dùng này đã tạo. Chức năng này không thể hoàn tác. Bạn chắc chắn
            muốn xóa chứ?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 space-x-10">
          <Button
            disabled={isDeleting}
            variant="destructive"
            onClick={() => deleteUser()}
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
