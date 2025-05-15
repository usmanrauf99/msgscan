// import { CallToAction } from "@/components/call-to-action";
import { DailyTransactions } from "@/components/daily-transactions";
import { Stats } from "@/components/stats";
import { SupportedBlockchains } from "@/components/supported-blockchains";
import { Container } from "@/components/ui/container";

export default function AnalyticsPage() {
  return (
    <Container>
      <Stats />
      <DailyTransactions />
      <SupportedBlockchains />
      {/* <CallToAction /> */}
    </Container>
  );
}
