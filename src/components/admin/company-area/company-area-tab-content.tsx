import "server-only";

import { getAllCompanyAreas } from "@/models/company-area/data";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { titleDashboardFont } from "@/lib/font";
import { Suspense } from "react";
import { companyAreaColumns } from "@/components/admin/company-area/company-area-columns";
import DialogCreateCompanyArea from "@/components/admin/company-area/dialog-create-company-area";

async function CompanyAreaData() {
  const companyAreas = await getAllCompanyAreas();

  return (
    <>
      {companyAreas.data && companyAreas.data.length > 0 ? (
        <DataTable columns={companyAreaColumns} data={companyAreas.data} />
      ) : (
        <>Chưa có khu vực nào</>
      )}
    </>
  );
}

export default function CompanyAreaTabContent() {
  return (
    <Card className="mx-5 my-10">
      <CardContent className="space-y-2">
        <div className="container mx-auto flex flex-col space-y-3">
          <CardTitle
            className={`${titleDashboardFont.className} text-primary dark:text-foreground pt-8`}
          >
            Khu vực
          </CardTitle>

          <div className="ml-auto">
            <DialogCreateCompanyArea />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <CompanyAreaData />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
