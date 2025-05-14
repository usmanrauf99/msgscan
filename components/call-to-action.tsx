import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CallToAction() {
  return (
    <Card className="relative overflow-hidden group hover:!border-primary/70 transition-all duration-300">
      <Image
        src="/cta/abstract-1.png"
        alt="Abstract left background"
        width={400}
        height={400}
        className="absolute bottom-0 left-0 dark:opacity-40 opacity-[0.02] z-0 sm:block hidden"
        draggable={false}
      />
      <Image
        src="/cta/abstract-2.png"
        alt="Abstract right background"
        width={450}
        height={450}
        className="absolute bottom-0 right-0 dark:opacity-80 opacity-[0.04] z-0 transition-all duration-700 group-hover:scale-110"
        draggable={false}
      />
      <CardContent className="sm:px-10 px-5 py-14 relative z-10">
        <div className="flex sm:flex-row flex-col sm:gap-10 gap-6 justify-between items-center">
          <div className="flex flex-col gap-2 sm:items-start items-center sm:text-left text-center">
            <h3 className="sm:text-2xl text-xl font-semibold">
              CTA Text Will be Here
            </h3>
            <span className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu
            </span>
          </div>
          <Button>CTA Button Here</Button>
        </div>
      </CardContent>
    </Card>
  );
}
