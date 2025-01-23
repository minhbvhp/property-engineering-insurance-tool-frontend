import "server-only";

import { getAllCustomers } from "@/models/customer/data";
import { customerColumns } from "@/components/customer/customer-columns";
import { DataTableWithPagination } from "@/components/ui/data-table-with-pagination";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { titleDashboardFont } from "@/lib/font";
import DialogCreateCustomer from "@/components/customer/dialog-create-customer";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function CustomerData(props: IProps) {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const res = await getAllCustomers(+current, +pageSize);

  return (
    <>
      {res.data && res.data.customers.length > 0 ? (
        <DataTableWithPagination
          columns={customerColumns}
          data={res.data.customers}
          current={+current}
          pageSize={+pageSize}
          totalPages={res.data.totalPages}
        />
      ) : (
        <>Chưa có khách hàng nào</>
      )}
    </>
  );
}

export default function CustomersPage(props: IProps) {
  return (
    <Card className="mx-5 my-10">
      <CardContent className="space-y-2">
        <div className="container mx-auto flex flex-col space-y-3">
          <CardTitle
            className={`${titleDashboardFont.className} text-3xl text-primary dark:text-foreground py-7 antialiased`}
          >
            Danh sách khách hàng
          </CardTitle>

          <div className="ml-auto">
            <DialogCreateCustomer />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <CustomerData {...props} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
