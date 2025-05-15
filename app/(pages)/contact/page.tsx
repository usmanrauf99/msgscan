import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" description="" />
      <Container>
        <ContactForm />
      </Container>
    </>
  );
}
