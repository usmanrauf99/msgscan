"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./table/validators-table";

export function Validators() {
  return (
    <Card>
      <CardContent className="pt-1">
        <DataTable
          tableName="Validators"
          searchPlaceholder="Search validator..."
          searchColumn="address"
          sortableColumns={[
            "tokensMined",
            "transactionsSigned",
            "transactionsSubmitted",
          ]}
          rowsText="Validators"
        />
      </CardContent>
    </Card>
  );
}
