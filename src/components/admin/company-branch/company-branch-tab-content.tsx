import "server-only";

import { getAllCompanyBranches } from "@/models/company-branch/data";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { titleDashboardFont } from "@/lib/font";
import { Suspense } from "react";
import { companyBranchColumns } from "@/components/admin/company-branch/company-branch-columns";
import DialogCreateCompanyBranch from "@/components/admin/company-branch/dialog-create-company-branch";

async function CompanyBranchData() {
  const companyBranches = await getAllCompanyBranches();

  return (
    <>
      {companyBranches.data && companyBranches.data.length > 0 ? (
        <DataTable columns={companyBranchColumns} data={companyBranches.data} />
      ) : (
        <>Chưa có chi nhánh nào</>
      )}
    </>
  );
}

export default function CompanyBranchTabContent() {
  return (
    <Card className="mx-5 my-10">
      <CardContent className="space-y-2">
        <div className="container mx-auto flex flex-col space-y-3">
          <CardTitle
            className={`${titleDashboardFont.className} text-primary dark:text-foreground pt-8`}
          >
            Chi nhánh
          </CardTitle>

          <div className="ml-auto">
            <DialogCreateCompanyBranch />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <CompanyBranchData />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
