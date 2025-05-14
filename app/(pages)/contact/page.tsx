import { GetInTouch } from "@/components/get-in-touch";
import { FrequentlyAskedQuestions } from "@/components/frequently-asked-questions";
import { StayConnected } from "@/components/stay-connected";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch with Us!"
        description="Feel free to get in touch with us today! We’re here to help with any questions, feedback, or inquiries you might have. Reach out, and let’s start a conversation!"
      />
      <Container>
        <GetInTouch />
        <StayConnected />
        <FrequentlyAskedQuestions />
      </Container>
    </>
  );
}
