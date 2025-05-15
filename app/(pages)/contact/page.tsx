import { GetInTouch } from "@/components/get-in-touch";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" description="" />
      <Container>
        <GetInTouch />
      </Container>
    </>
  );
}
