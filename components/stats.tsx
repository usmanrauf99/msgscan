"use client";

import Image from "next/image";
import { useLifetimeStats } from "@/hooks/use-lifetime-stats";
import { formatNumber } from "@/utils/number-formatter";
import { Skeleton } from "./ui/skeleton";
import { useNetworkStats } from "@/hooks/use-network-stats";

export function Stats() {
  const { data: lifetimeStats, isLoading: isLoadingLifetimeStats } =
    useLifetimeStats();
  const { data: networkStats, isLoading: isLoadingNetworkStats } =
    useNetworkStats();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Total Nodes</span>
          <Image
            src="/stats/validators.svg"
            alt="Registered Validators"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        <span className="text-2xl font-bold">
          {isLoadingNetworkStats ? (
            <Skeleton className="h-8" />
          ) : (
            formatNumber(networkStats?.nodeVolume || 0, {
              abbreviate: true,
            })
          )}
        </span>
        <span className="text-muted-foreground">
          total nodes on the network
        </span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Lifetime Transactions</span>
          <Image
            src="/stats/transactions.svg"
            alt="Lifetime Transactions"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        <span className="text-2xl font-bold">
          {isLoadingLifetimeStats ? (
            <Skeleton className="h-8" />
          ) : (
            formatNumber(lifetimeStats?.totalTransactions || 0, {
              abbreviate: true,
            })
          )}
        </span>
        <span className="text-muted-foreground">
          total transactions processed
        </span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Current MSG Reward</span>
          <Image
            src="/stats/reward.svg"
            alt="Current MSG Reward"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        <span className="text-2xl font-bold">
          {isLoadingLifetimeStats ? (
            <Skeleton className="h-8" />
          ) : (
            `${formatNumber(lifetimeStats?.currentMsgReward || 0)} MSG`
          )}
        </span>
        <span className="text-muted-foreground">per validated transaction</span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Total MSG Minted</span>
          <Image
            src="/stats/minted.svg"
            alt="Total MSG Minted"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        {isLoadingNetworkStats ? (
          <Skeleton className="h-8" />
        ) : (
          <span className="text-2xl font-bold">
            {formatNumber(networkStats?.msgStats?.totalMinted || 0, {
              abbreviate: true,
              etherConverter: true,
            })}{" "}
            MSG
          </span>
        )}

        <span className="text-muted-foreground">tokens minted so far</span>
      </div>
    </div>
  );
}
