import Image from "next/image";
import { Container } from "./ui/container";
import { AdvancedSearch } from "./advanced-search";

export function Hero() {
  return (
    <div className="relative md:h-[465px] h-[400px] flex items-center justify-center md:-mt-24 -mt-20 md:mb-24 mb-20">
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
          <h1 className="sm:text-4xl text-2xl font-bold mb-10">
            The Telegraph Network <span className="text-primary">Explorer</span>
          </h1>

          <div className="max-w-lg mx-auto relative">
            <AdvancedSearch />
          </div>
        </div>
      </Container>
    </div>
  );
}
