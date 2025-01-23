import "server-only";

import { getAllPermissions } from "@/models/permission/data";
import { permissionColumns } from "@/components/admin/permission/permission-columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { titleDashboardFont } from "@/lib/font";
import { Suspense } from "react";
import DialogCreatePermission from "@/components/admin/permission/dialog-create-permission";

async function PermissionData() {
  const permissions = await getAllPermissions();

  return (
    <>
      {permissions.data && permissions.data.length > 0 ? (
        <DataTable columns={permissionColumns} data={permissions.data} />
      ) : (
        <>Chưa có quyền nào</>
      )}
    </>
  );
}

export default function PermissionTabContent() {
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
            <DialogCreatePermission />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <PermissionData />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
