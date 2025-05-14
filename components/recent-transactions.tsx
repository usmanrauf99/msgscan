import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./table/recent-transactions-table";

export function RecentTransactions() {
  return (
    <Card className="md:mb-24 mb-20">
      <CardContent className="pt-1">
        <DataTable
          tableName="Recent Transactions"
          searchPlaceholder="Search transaction..."
          searchColumn="hash"
          sortableColumns={["hash", "fee", "addresses", "timestamp"]}
          rowsText="Transactions"
        />
      </CardContent>
    </Card>
  );
}
