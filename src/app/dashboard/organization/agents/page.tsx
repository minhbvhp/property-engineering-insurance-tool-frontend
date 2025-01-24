import "server-only";

import { getAllAgents } from "@/models/agent/data";
import { agentColumns } from "@/components/organization/agent/agent-columns";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { titleDashboardFont } from "@/lib/font";
import DialogCreateAgent from "@/components/organization/agent/dialog-create-agent";
import { DataTable } from "@/components/ui/data-table";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function AgentData(props: IProps) {
  const res = await getAllAgents();

  return (
    <>
      {res.data && res.data.length > 0 ? (
        <DataTable columns={agentColumns} data={res.data} />
      ) : (
        <>Chưa có đại lý nào</>
      )}
    </>
  );
}

export default function AgentsPage(props: IProps) {
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
            <DialogCreateAgent />
          </div>

          <Suspense
            fallback={
              <div className="space-y-4">
                <SkeletonTable />
              </div>
            }
          >
            <AgentData {...props} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
