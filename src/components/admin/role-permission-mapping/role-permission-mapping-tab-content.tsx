import "server-only";

import { getAllRolePermissionMappings } from "@/models/role-permission-mapping/data";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { titleDashboardFont } from "@/lib/font";
import { Suspense } from "react";
import { rolePermissionMappingColumns } from "@/components/admin/role-permission-mapping/role-permission-mapping-columns";
import DialogCreateRolePermissionMapping from "@/components/admin/role-permission-mapping/dialog-create-role-permission-mapping";

async function RolePermissionMappingData() {
  const rolePermissionMappings = await getAllRolePermissionMappings();

  return (
    <>
      {rolePermissionMappings.data && rolePermissionMappings.data.length > 0 ? (
        <DataTable
          columns={rolePermissionMappingColumns}
          data={rolePermissionMappings.data}
        />
      ) : (
        <>Chưa có thiết lập quyền nào cho vai trò</>
      )}
    </>
  );
}

export default function RolePermissionMappingTabContent() {
  return (
    <Card className="mx-5 my-10">
      <CardContent className="space-y-2">
        <div className="container mx-auto flex flex-col space-y-3">
          <CardTitle
            className={`${titleDashboardFont.className} text-primary dark:text-foreground pt-8`}
          >
            Phân quyền
          </CardTitle>

          <div className="ml-auto">
            <DialogCreateRolePermissionMapping />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <RolePermissionMappingData />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
