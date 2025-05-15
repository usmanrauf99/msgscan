import Image from "next/image";
import { Container } from "./ui/container";

export function PageHero({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="relative h-[320px] flex items-center justify-center md:-mt-24 -mt-20 md:mb-24 mb-20">
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
          <h1 className="md:text-4xl text-2xl font-bold mb-4">{title}</h1>
          <p className="md:text-lg text-base mb-6 max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
        </div>
      </Container>
    </div>
  );
}
