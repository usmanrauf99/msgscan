import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./table/node-overview-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function NodeOverview() {
  return (
    <div className="flex flex-col gap-10 md:mb-24 mb-20">
      <div className="flex flex-col sm:items-start items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Node Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card>
        <CardContent className="pt-1">
          <DataTable
            tableName="Node Overview"
            searchPlaceholder="Search node..."
            searchColumn="node_id"
            filterPlaceholder="Filter Status"
            filterColumn="status"
            sortableColumns={[
              "node_id",
              "volume",
              "total_msg_accumilated",
              "total_msg_claimed",
              "status",
            ]}
            rowsText="Nodes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
