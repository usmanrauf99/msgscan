import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import Link from "next/link";

export function FrequentlyAskedQuestions() {
  const faqs = [
    {
      question: "What is Telegraph?",
      answer:
        "Telegraph is a decentralized communication network that enables secure and efficient data transfer across various blockchain platforms.",
    },
    {
      question: "How does Telegraph ensure data security?",
      answer:
        "Telegraph uses advanced encryption protocols and distributed ledger technology to ensure the integrity and confidentiality of all transmitted data.",
    },
    {
      question: "Can I become a validator on the Telegraph network?",
      answer:
        "Yes, anyone can become a validator on the Telegraph network by meeting certain hardware requirements and staking the required amount of tokens.",
    },
    {
      question: "What are the benefits of using Telegraph?",
      answer:
        "Telegraph offers faster transaction speeds, lower fees, and improved interoperability between different blockchain networks.",
    },
    {
      question: "How does Telegraph handle network congestion?",
      answer:
        "Telegraph employs a dynamic scaling mechanism that automatically adjusts network capacity based on demand, minimizing congestion and maintaining optimal performance.",
    },
    {
      question: "Is Telegraph compatible with other blockchain platforms?",
      answer:
        "Yes, Telegraph is designed to be blockchain-agnostic and can integrate with various existing blockchain platforms, enhancing cross-chain communication.",
    },
    {
      question: "What is the Telegraph token used for?",
      answer:
        "The Telegraph token is used for network governance, staking, and as a means of payment for services within the Telegraph ecosystem.",
    },
    {
      question: "How can I stay updated on Telegraph's development?",
      answer:
        "You can follow our official social media channels, join our community forums, and subscribe to our newsletter for the latest updates and announcements.",
    },
  ];

  return (
    <div className="flex flex-col gap-10 md:mb-24 mb-20">
      <div className="flex sm:flex-row flex-col sm:items-start items-center sm:text-left text-center gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="sm:text-2xl text-xl font-semibold">
            Frequently Asked Questions
          </h3>
          <span className="text-muted-foreground">
            Find answers to common questions about Telegraph and our services
            below. Feel free to contact us for more information!
          </span>
        </div>
        <Link href="/contact">
          <Button variant="secondary" className="rounded-full">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="flex p-3 border rounded-lg bg-card">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  <div className="flex flex-row gap-3 items-center">
                    <div className="w-8 h-8 flex items-center justify-center text-muted-foreground text-xs font-medium bg-secondary rounded-md p-2 border">
                      0{index + 1}
                    </div>
                    <span className="text-left">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
