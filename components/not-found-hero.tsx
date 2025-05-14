import Image from "next/image";
import { Container } from "./ui/container";
import Link from "next/link";
import { Button } from "./ui/button";
import { AdvancedSearch } from "./advanced-search";

export function NotFoundHero({
  title,
  description,
  linkText,
  linkHref,
  advancedSearch = false,
}: {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  advancedSearch?: boolean;
}) {
  return (
    <div className="relative h-[620px] flex items-center justify-center md:-mt-24 -mt-20 md:-mb-28 -mb-24">
      <Image
        src="/hero/background.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 dark:bg-black bg-white dark:opacity-80 opacity-85" />
      <Container>
        <div className="relative z-10 text-center">
          <h1 className="md:text-4xl text-2xl font-bold mb-4 break-all">
            {title}
          </h1>
          <p className="md:text-lg text-base mb-6 max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
          {advancedSearch && (
            <div className="max-w-lg mx-auto relative mb-6">
              <AdvancedSearch />
            </div>
          )}
          <Button className="mt-4">
            <Link href={linkHref}>{linkText}</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
