import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./table/node-detail-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface NodeDetailProps {
  nodeId: string;
}

export function NodeDetail({ nodeId }: NodeDetailProps) {
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
              <BreadcrumbLink href="/nodes">Node Overview</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Node #{nodeId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card>
        <CardContent className="pt-1">
          <DataTable
            tableName={`Node #${nodeId} Detail`}
            customizePlaceholder="Customize"
          />
        </CardContent>
      </Card>
    </div>
  );
}
