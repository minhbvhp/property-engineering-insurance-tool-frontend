import "server-only";

import { getAllRoles } from "@/models/role/data";
import { roleColumns } from "@/components/admin/role/role-columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { titleDashboardFont } from "@/lib/font";
import { Suspense } from "react";
import DialogCreateRole from "@/components/admin/role/dialog-create-role";

async function RoleData() {
  const roles = await getAllRoles();

  return (
    <>
      {roles.data && roles.data.length > 0 ? (
        <DataTable columns={roleColumns} data={roles.data} />
      ) : (
        <>Chưa có vai trò nào</>
      )}
    </>
  );
}

export default function RoleTabContent() {
  return (
    <Card className="mx-5 my-10">
      <CardContent className="space-y-2">
        <div className="container mx-auto flex flex-col space-y-3">
          <CardTitle
            className={`${titleDashboardFont.className} text-primary dark:text-foreground pt-8`}
          >
            Vai trò
          </CardTitle>

          <div className="ml-auto">
            <DialogCreateRole />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <RoleData />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
