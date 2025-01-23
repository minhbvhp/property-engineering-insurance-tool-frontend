import "server-only";

import { getAllDepartments } from "@/models/department/data";
import { departmentColumns } from "@/components/organization/department/department-columns";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { titleDashboardFont } from "@/lib/font";
import DialogCreateDepartment from "@/components/organization/department/dialog-create-department";
import { DataTable } from "@/components/ui/data-table";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function DepartmentData(props: IProps) {
  const res = await getAllDepartments();

  return (
    <>
      {res.data && res.data.length > 0 ? (
        <DataTable columns={departmentColumns} data={res.data} />
      ) : (
        <>Chưa có Phòng nào</>
      )}
    </>
  );
}

export default function DepartmentsPage(props: IProps) {
  return (
    <Card className="mx-5 my-10">
      <CardContent className="space-y-2">
        <div className="container mx-auto flex flex-col space-y-3">
          <CardTitle
            className={`${titleDashboardFont.className} text-3xl text-primary dark:text-foreground py-7 antialiased`}
          >
            Danh sách Phòng
          </CardTitle>

          <div className="ml-auto">
            <DialogCreateDepartment />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <DepartmentData {...props} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
