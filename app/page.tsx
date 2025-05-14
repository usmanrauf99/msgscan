import { Hero } from "@/components/hero";
import { NetworkOverview } from "@/components/network-overview";
import { RecentNodes } from "@/components/recent-nodes";
import { RecentTransactions } from "@/components/recent-transactions";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-16 lg:h-[365px] md:mb-24 mb-20">
          <NetworkOverview />
          <RecentNodes />
        </div>
        <RecentTransactions />
      </Container>
    </>
  );
}
