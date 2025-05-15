import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { GetInTouch } from "@/components/get-in-touch";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" />
      <Container>
        <ContactForm />
      </Container>
    </>
  );
}
