"use client";

import { NodeDetail } from "@/components/node-detail";
import { Container } from "@/components/ui/container";
import { useParams } from "next/navigation";

export default function NodeDetailPage() {
  const params = useParams();
  const nodeId = params.id as string;

  return (
    <Container>
      <NodeDetail nodeId={nodeId} />
    </Container>
  );
}
