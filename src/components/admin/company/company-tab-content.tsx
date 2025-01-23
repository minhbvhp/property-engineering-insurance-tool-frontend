import "server-only";

import { getAllCompanies } from "@/models/company/data";
import { companyColumns } from "@/components/admin/company/company-columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { titleDashboardFont } from "@/lib/font";
import { Suspense } from "react";
import DialogCreateCompany from "@/components/admin/company/dialog-create-company";

async function CompanyData() {
  const companies = await getAllCompanies();

  return (
    <>
      {companies.data && companies.data.length > 0 ? (
        <DataTable columns={companyColumns} data={companies.data} />
      ) : (
        <>Chưa có vai trò nào</>
      )}
    </>
  );
}

export default function CompanyTabContent() {
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
            <DialogCreateCompany />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <CompanyData />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
