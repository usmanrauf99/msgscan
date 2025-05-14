import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function StepByStep() {
  return (
    <div className="flex flex-col gap-10 md:mb-24 mb-20">
      <div className="flex sm:flex-row flex-col sm:items-start items-center sm:text-left text-center gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="sm:text-2xl text-xl font-semibold">
            See How the Telegraph Fow Works Here
          </h3>
          <span className="text-muted-foreground">
            Follow the step-by-step process to understand how Telegraph&apos;s
            cross-chain bridge operates seamlessly.
          </span>
        </div>
      </div>
      <Card>
        <CardContent className="max-w-4xl mx-auto py-14 flex justify-center items-center">
          <Image
            src="/about/workflow.svg"
            alt="Workflow"
            width={1000}
            height={1200}
            className="dark:invert-0 invert md:h-[1200px]"
            draggable={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
