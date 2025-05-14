import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { KeyFeatures } from "@/components/key-features";
import { StepByStep } from "@/components/step-by-step";
import { NodeQuestions } from "@/components/node-questions";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        description="Telegraph simplifies cross-chain development with no registration, low fees, and trustless node operations."
      />
      <Container>
        <KeyFeatures />
        <StepByStep />
        <NodeQuestions />
      </Container>
    </>
  );
}
