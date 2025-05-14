import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function KeyFeatures() {
  return (
    <div className="flex flex-col gap-10 md:mb-24 mb-20">
      <div className="flex md:flex-row flex-col md:items-start items-center md:text-left text-center gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="sm:text-2xl text-xl font-semibold">
            Our Key Features
          </h3>
          <span className="text-muted-foreground">
            Explore the core benefits that make Telegraph a game-changer in
            cross-chain development. From simplified integration to trustless
            operations, our platform is designed to empower developers and
            streamline blockchain interactions
          </span>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <KeyFeatureItem
              title="Low Barrier to Entry"
              description="Add a few lines of code to make your project cross-chain without registration or downloading the entire blockchain."
              icon="low-barrier.svg"
            />
            <Divider />
            <KeyFeatureItem
              title="A Dynamic Bridge"
              description="Telegraph simplifies cross-chain development with no registration, low fees, and trustless node operations."
              icon="dynamic-bridge.svg"
            />
            <Divider />
            <KeyFeatureItem
              title="A Public-Permission Oracle"
              description="We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence."
              icon="public-permission.svg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KeyFeatureItem({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-2 md:p-8 p-6 group">
      <div className="flex flex-col md:items-start items-center">
        <div className="rounded-full border h-14 w-14 flex items-center justify-center mb-3 bg-gradient-to-br from-gray-400/40 via-gray-200/60 to-white dark:from-gray-600/40 dark:via-gray-700/40 dark:to-black/60 group-hover:border-primary/40 transition-all duration-300">
          <Image
            src={`/about/${icon}`}
            alt={title}
            width={28}
            height={28}
            draggable={false}
          />
        </div>
        <span className="text-card-foreground sm:text-xl text-lg font-medium">
          {title}
        </span>
      </div>
      <span className="text-muted-foreground md:text-base text-sm">
        {description}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center">
      <div className="md:w-px w-full bg-border md:h-full h-px" />
    </div>
  );
}
