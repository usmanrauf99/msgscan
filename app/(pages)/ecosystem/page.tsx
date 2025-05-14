import { Container } from "@/components/ui/container";
import { ValidatorInsights } from "@/components/validator-insights";
import { EcosystemSummary } from "@/components/ecosystem-summary";
import { EcosystemStatus } from "@/components/ecosystem-status";

export default function EcosystemPage() {
  return (
    <Container>
      <EcosystemSummary />
      <ValidatorInsights />
      <EcosystemStatus />
    </Container>
  );
}
