import "server-only";

import { getAllEmployees } from "@/models/employee/data";
import { employeeColumns } from "@/components/organization/employee/employee-columns";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { titleDashboardFont } from "@/lib/font";
import DialogCreateEmployee from "@/components/organization/employee/dialog-create-employee";
import { DataTable } from "@/components/ui/data-table";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function EmployeeData(props: IProps) {
  const res = await getAllEmployees();

  return (
    <>
      {res.data && res.data.length > 0 ? (
        <DataTable columns={employeeColumns} data={res.data} />
      ) : (
        <>Chưa có nhân viên nào</>
      )}
    </>
  );
}

export default function EmployeesPage(props: IProps) {
  return (
    <Card className="mx-5 my-10">
      <CardContent className="space-y-2">
        <div className="container mx-auto flex flex-col space-y-3">
          <CardTitle
            className={`${titleDashboardFont.className} text-3xl text-primary dark:text-foreground py-7 antialiased`}
          >
            Danh sách nhân viên
          </CardTitle>

          <div className="ml-auto">
            <DialogCreateEmployee />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <EmployeeData {...props} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
