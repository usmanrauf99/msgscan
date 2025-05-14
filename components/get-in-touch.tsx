import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export function GetInTouch() {
  return (
    <Card className="md:mb-24 mb-20">
      <CardContent className="pt-1">
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-6 lg:px-2 px-1 lg:py-2 py-4">
          <ContactItem
            question="General Questions?"
            text="info@telegraph.com"
            icon={<MailIcon className="lg:w-5 lg:h-5 w-4 h-4" />}
            link="#"
          />
          <Divider />
          <ContactItem
            question="Looking to Collaborate?"
            text="partnerships@telegraph.com"
            icon={<MailIcon className="lg:w-5 lg:h-5 w-4 h-4" />}
            link="#"
          />
          <Divider />
          <ContactItem
            question="Call Us Now!"
            text="+45 XXX XX XX"
            icon={<PhoneIcon className="lg:w-5 lg:h-5 w-4 h-4" />}
            link="#"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ContactItem({
  question,
  text,
  icon,
  link,
}: {
  question: string;
  text: string;
  icon: React.ReactNode;
  link: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-3.5 h-32 justify-center mt-0.5">
      <span className="text-muted-foreground">{question}</span>
      <div className="flex flex-row lg:h-14 h-12 bg-secondary border rounded-full px-2 py-1 w-full items-center justify-between group hover:border-muted-foreground/20 transition-all duration-300">
        <div className="flex flex-row gap-2.5 items-center pl-3 text-sm">
          {icon}
          <span>{text}</span>
        </div>
        <Link href={link}>
          <div className="flex lg:w-16 w-14 bg-muted rounded-full px-2 lg:py-2.5 py-1.5 items-center text-muted-foreground justify-center hover:bg-muted-foreground/20 group-hover:text-card-foreground transition-all duration-300 cursor-pointer overflow-hidden">
            <ArrowRightIcon className="w-5 h-5 transition-all duration-300 group-hover:animate-slide-right-and-return" />
          </div>
        </Link>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="hidden lg:flex items-center">
      <div className="w-px bg-border h-20" />
    </div>
  );
}
