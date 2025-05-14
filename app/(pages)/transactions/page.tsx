import { DataTable } from "@/components/table/transactions-table";
import { TransactionsSummary } from "@/components/transactions-summary";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Suspense } from "react";

export default function TransactionsPage() {
  return (
    <Container>
      <TransactionsSummary />
      <Card className="md:mb-24 mb-20">
        <CardContent className="pt-1">
          <Suspense fallback={<div>Loading transactions...</div>}>
            <DataTable
              tableName="Transactions"
              searchColumn="transaction_hash"
              searchPlaceholder="Search transaction..."
              sortableColumns={[
                "transaction_hash",
                "block_number",
                "fee_amount",
                "sender",
                "destination",
                "is_confirmed",
              ]}
              rowsText="Transactions"
            />
          </Suspense>
        </CardContent>
      </Card>
    </Container>
  );
}
