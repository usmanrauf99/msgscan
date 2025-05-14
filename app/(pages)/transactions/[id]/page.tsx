"use client";

import { TransactionDetail } from "@/components/transaction-detail";
import { Container } from "@/components/ui/container";
import { useParams } from "next/navigation";

export default function TransactionDetailPage() {
  const params = useParams();
  const transactionId = params.id as string;

  return (
    <Container>
      <TransactionDetail transactionId={transactionId} />
    </Container>
  );
}
