import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function StayConnected() {
  return (
    <Card className="md:mb-24 mb-20 group">
      <Image
        src="/about/back.svg"
        alt="Background"
        width={320}
        height={216}
        className="absolute top-0 -left-1 opacity-60 group-hover:opacity-60 dark:group-hover:opacity-100 transition-all duration-300"
        draggable={false}
      />
      <CardContent className="max-w-4xl mx-auto py-14 relative overflow-hidden ">
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <div className="flex flex-row gap-3">
            <Button variant="social" size="contact_social">
              <Image
                src="/social/instagram.svg"
                alt="Twitter"
                width={48}
                height={48}
                className="dark:invert-0 invert"
              />
            </Button>
            <Button variant="social" size="contact_social">
              <Image
                src="/social/facebook.svg"
                alt="Facebook"
                width={48}
                height={48}
                className="dark:invert-0 invert"
              />
            </Button>
            <Button variant="social" size="contact_social">
              <Image
                src="/social/x.svg"
                alt="X/Twitter"
                width={48}
                height={48}
                className="dark:invert-0 invert"
              />
            </Button>
          </div>
          <span className="text-lg sm:text-xl font-semibold mt-5 group-hover:text-primary transition-all duration-500">
            Stay Connected with Us!
          </span>
          <span className="text-sm text-muted-foreground">
            Follow us on social media to keep up with the latest updates, news,
            and community events.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
