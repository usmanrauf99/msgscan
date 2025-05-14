import Image from "next/image";

export function SupportedBlockchains() {
  return (
    <div className="flex flex-col gap-8 md:mb-24 mb-20">
      <div className="flex flex-col gap-10 sm:items-start items-center">
        <div className="flex flex-col gap-1 sm:items-start items-center sm:text-left text-center">
          <h3 className="sm:text-2xl text-xl font-semibold">
            Supported Blockchains
          </h3>
          <span className="text-muted-foreground">
            The Telegraph network supports various blockchains for seamless
            integration and interaction.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <div className="col-span-1 border rounded-xl p-5 bg-card flex flex-col gap-3 hover:border-secondary-foreground/15 transition-all duration-300">
            <div className="flex flex-row gap-2.5 font-medium items-center text-lg">
              <div className="flex justify-center p-2 w-9 h-9 items-center rounded-full bg-secondary border-[#8C8C8C] border">
                <Image
                  src="/blockchains/ethereum.svg"
                  alt="Ethereum"
                  width={16}
                  height={16}
                  draggable={false}
                />
              </div>
              <span>Ethereum</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Known for its smart contract functionality, Ethereum is a leading
              platform for decentralized applications (dApps) and token creation
              across the blockchain.
            </span>
          </div>
          <div className="col-span-1 border rounded-xl p-5 bg-card flex flex-col gap-3 hover:border-secondary-foreground/15 transition-all duration-300">
            <div className="flex flex-row gap-2.5 font-medium items-center text-lg">
              <div className="flex justify-center p-2 w-9 h-9 items-center rounded-full bg-secondary border-[#F0B90B] border">
                <Image
                  src="/blockchains/bnb.svg"
                  alt="Binance Chain"
                  width={16}
                  height={16}
                  draggable={false}
                />
              </div>
              <span>Binance Chain</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Renowned for low transaction fees and fast confirmation times, BSC
              is a favored platform for scalable decentralized applications.
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <div className="col-span-1 border rounded-xl p-5 bg-card flex flex-col gap-3 hover:border-secondary-foreground/15 transition-all duration-300">
            <div className="flex flex-row gap-2.5 font-medium items-center text-lg">
              <div className="flex justify-center p-2 w-9 h-9 items-center rounded-full bg-secondary border-[#E84142] border">
                <Image
                  src="/blockchains/avalanche.svg"
                  alt="Avalanche"
                  width={16}
                  height={16}
                  draggable={false}
                />
              </div>
              <span>Avalanche</span>
            </div>
            <span className="text-sm text-muted-foreground">
              With its unique consensus mechanism, Avalanche offers high
              throughput and low latency, making it a top choice for
              decentralized finance (DeFi).
            </span>
          </div>
          <div className="col-span-1 border rounded-xl p-5 bg-card flex flex-col gap-3 hover:border-secondary-foreground/15 transition-all duration-300">
            <div className="flex flex-row gap-2.5 font-medium items-center text-lg">
              <div className="flex justify-center p-2 w-9 h-9 items-center rounded-full bg-secondary border-[#6C00F6] border">
                <Image
                  src="/blockchains/polygon.svg"
                  alt="Polygon"
                  width={16}
                  height={16}
                  draggable={false}
                />
              </div>
              <span>Polygon</span>
            </div>
            <span className="text-sm text-muted-foreground">
              A layer-2 scaling solution for Ethereum, Polygon enhances speed
              and reduces costs while ensuring the security of the Ethereum main
              chain.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
