import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const nodeQuestions = [
  {
    title: "How They Work?",
    subtitle: "Keeping it Simple",
    content: [
      "• Telegraph nodes are lightweight programs that rely on the data provided by full nodes of blockchains. Each Telegraph node operates independently, but requires a threshold of signatures from its peers in order to initiate a transaction within telegraph smart contracts.",
      "• Nodes that complete transactions get rewarded with Telegraph tokens called $MSG.",
    ],
  },
  {
    title: "Why They Are Safe?",
    subtitle: "Thresholds & Time",
    content: [
      "• Telegraph nodes & smart contracts have 2 primary means of validating authorized transaction requests: Signature thresholds and the time spent within the network.",
      "• A threshold of signatures representing a subset of the network must be sent to a Telegraph Smart contract. That subset of signatures must represent a majority of time spent within the network.",
      "• Nodes that complete transactions get rewarded with Telegraph tokens called $MSG.",
    ],
  },
  {
    title: "Who Can Run A Node?",
    subtitle: "In the spirit of decentralization",
    content: [
      "• Anyone can run a node and join the telegraph network. All participants must pay a fee in a token supported by Telegraph smart contracts.",
    ],
  },
];

export function NodeQuestions() {
  return (
    <div className="flex flex-col gap-10 md:mb-24 mb-20">
      <div className="flex sm:flex-row flex-col sm:items-start items-center sm:text-left text-center gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="sm:text-2xl text-xl font-semibold">Node Overview</h3>
          <span className="text-muted-foreground">
            Get a detailed snapshot of all active nodes, including performance
            metrics and status updates.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {nodeQuestions.map((question, index) => (
          <Card key={index} className="relative overflow-hidden group">
            <Image
              src="/about/back.svg"
              alt="Background"
              width={320}
              height={216}
              className="absolute top-0 -left-1 opacity-60 group-hover:opacity-60 dark:group-hover:opacity-100 transition-all duration-300"
              draggable={false}
            />
            <CardContent className="relative z-10">
              <div className="grid grid-cols-3 md:gap-4 gap-0">
                <div className="flex-1 flex flex-col gap-2 p-8 md:col-span-1 justify-center col-span-3 md:items-start items-center">
                  <div className="rounded-full border h-14 w-14 flex items-center justify-center mb-3 bg-gradient-to-br from-gray-400/40 via-gray-200/60 to-white dark:from-gray-600/40 dark:via-gray-700/40 dark:to-black/60 group-hover:border-primary/40 transition-all duration-300">
                    <Image
                      src={`/about/setting.svg`}
                      alt="Icon"
                      width={28}
                      height={28}
                      draggable={false}
                    />
                  </div>
                  <span className="text-card-foreground sm:text-xl text-lg font-medium">
                    {question.title}
                  </span>
                  <span className="text-primary">{question.subtitle}</span>
                </div>
                <div className="md:col-span-2 col-span-3 p-4">
                  <div className="flex flex-col gap-3 border rounded-2xl p-6 h-full w-full text-muted-foreground justify-center md:text-base text-sm">
                    {question.content.map((item, itemIndex) => (
                      <span key={itemIndex}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
