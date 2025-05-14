import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./table/node-ecosystem-table";

export function EcosystemNodes() {
  return (
    <Card className="md:mb-24 mb-20">
      <CardContent className="pt-1">
        <DataTable
          tableName="Nodes"
          searchPlaceholder="Search node..."
          searchColumn="address"
          sortableColumns={[
            "address",
            "tokensMined",
            "transactionsSigned",
            "transactionsSubmitted",
          ]}
          rowsText="Nodes"
        />
      </CardContent>
    </Card>
  );
}
