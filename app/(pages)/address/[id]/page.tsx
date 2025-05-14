"use client";

import { AddressDetail } from "@/components/address-detail";
import { Container } from "@/components/ui/container";
import { useParams } from "next/navigation";

export default function AddressDetailPage() {
  const params = useParams();
  const addressId = params.id as string;

  return (
    <Container>
      <AddressDetail addressId={addressId} />
    </Container>
  );
}
