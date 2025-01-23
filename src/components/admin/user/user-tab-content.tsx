import "server-only";

import { userColumns } from "@/components/admin/user/user-columns";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { getAllUsers } from "@/models/user/data";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { titleDashboardFont } from "@/lib/font";
import { DataTableWithPagination } from "@/components/ui/data-table-with-pagination";
import DialogCreateUser from "@/components/admin/user/dialog-create-user";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function UserData(props: IProps) {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const users = await getAllUsers(+current, +pageSize);

  return (
    <>
      {users.data && users.data.users.length > 0 ? (
        <DataTableWithPagination
          columns={userColumns}
          data={users.data.users}
          current={+current}
          pageSize={+pageSize}
          totalPages={users.data.totalPages}
        />
      ) : (
        <>Chưa có người dùng nào</>
      )}
    </>
  );
}

export default function UserTabContent(props: IProps) {
  return (
    <Card className="mx-5 my-10">
      <CardContent className="space-y-2">
        <div className="container mx-auto flex flex-col space-y-3">
          <CardTitle
            className={`${titleDashboardFont.className} text-primary dark:text-foreground pt-8`}
          >
            Người dùng
          </CardTitle>

          <div className="ml-auto">
            <DialogCreateUser />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <UserData {...props} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
