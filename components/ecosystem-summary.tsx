"use client";

import Image from "next/image";
import { useTotalValidators } from "@/hooks/use-total-validators";
import { useNetworkStats } from "@/hooks/use-network-stats";
import { formatNumber } from "@/utils/number-formatter";
import { Skeleton } from "@/components/ui/skeleton";

export function EcosystemSummary() {
  const { data: validatorsData, isLoading: isLoadingValidators } =
    useTotalValidators();
  const { data: networkStats, isLoading: isLoadingNetworkStats } =
    useNetworkStats();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Total Validators</span>
          <Image
            src="/validators/validator.svg"
            alt="Total Validators"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        <span className="text-2xl font-bold">
          {isLoadingValidators ? (
            <Skeleton className="h-8" />
          ) : (
            formatNumber(validatorsData?.totalValidators || 0)
          )}
        </span>
        <span className="text-muted-foreground">active on network</span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Total Stake</span>
          <Image
            src="/validators/stake.svg"
            alt="Total Stake"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        {isLoadingNetworkStats ? (
          <Skeleton className="h-8" />
        ) : (
          <span className="text-2xl font-bold">
            {formatNumber(networkStats?.totalMsgClaimed || 0, {
              abbreviate: true,
              etherConverter: true,
            })}{" "}
            MSG
          </span>
        )}
        <span className="text-muted-foreground">
          currently held by validators
        </span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Average Uptime</span>
          <Image
            src="/validators/uptime.svg"
            alt="Average Uptime"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        <span className="text-2xl font-bold">99.5%</span>
        <span className="text-muted-foreground">
          indicating the reliability of validators
        </span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Rewards Distributed</span>
          <Image
            src="/validators/reward.svg"
            alt="Rewards Distributed"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        {isLoadingNetworkStats ? (
          <Skeleton className="h-8" />
        ) : (
          <span className="text-2xl font-bold">
            {formatNumber(networkStats?.totalMsgAccumulated || 0, {
              abbreviate: true,
              etherConverter: true,
            })}{" "}
            MSG
          </span>
        )}

        <span className="text-muted-foreground">
          the total rewards given to validators
        </span>
      </div>
    </div>
  );
}
