"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useNetworkStats } from "@/hooks/use-network-stats";
import { Skeleton } from "./ui/skeleton";
import { formatNumber } from "@/utils/number-formatter";

export function NetworkOverview() {
  const { data, isLoading } = useNetworkStats();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span>Network Statistics Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="border rounded-xl p-4 bg-secondary flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300">
            <div className="flex flex-row justify-between gap-1 font-medium">
              <span>Total Active Node</span>
              <Image
                src="/network-statistics/flash.svg"
                alt="Total Active Node"
                width={16}
                height={16}
                draggable={false}
              />
            </div>
            <span className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className=" h-8" />
              ) : (
                formatNumber(data?.activeNodes || 0, {
                  abbreviate: true,
                })
              )}
            </span>
            <span className="text-sm text-muted-foreground">
              are currently active right now
            </span>
          </div>
          <div className="border rounded-xl p-4 bg-secondary flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300">
            <div className="flex flex-row justify-between gap-1 font-medium">
              <span>Number of Transactions</span>
              <Image
                src="/network-statistics/chart.svg"
                alt="Number of Transactions"
                width={16}
                height={16}
                draggable={false}
              />
            </div>
            <span className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className=" h-8" />
              ) : (
                formatNumber(data?.transactionsToday || 0, {
                  abbreviate: true,
                })
              )}
            </span>
            <span className="text-sm text-muted-foreground">
              transactions made by today
            </span>
          </div>
          <div className="border rounded-xl p-4 bg-secondary flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300">
            <div className="flex flex-row justify-between gap-1 font-medium">
              <span>Lifetime of Transactions</span>
              <Image
                src="/network-statistics/activity.svg"
                alt="Lifetime of Transactions"
                width={16}
                height={16}
                draggable={false}
              />
            </div>
            <span className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className=" h-8" />
              ) : (
                formatNumber(data?.lifetimeTransactions || 0, {
                  abbreviate: true,
                })
              )}
            </span>
            <span className="text-sm text-muted-foreground">
              lifetime transactions
            </span>
          </div>
          <div className="border rounded-xl p-4 bg-secondary flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300">
            <div className="flex flex-row justify-between gap-1 font-medium">
              <span>Total MSG</span>
              <Image
                src="/network-statistics/msg.svg"
                alt="MSG"
                width={16}
                height={16}
                draggable={false}
              />
            </div>

            {isLoading ? (
              <Skeleton className=" h-8" />
            ) : (
              <span className="text-2xl font-bold">
                {formatNumber(data?.msgStats?.totalMinted || 0, {
                  abbreviate: true,
                  etherConverter: true,
                })}{" "}
                MSG
              </span>
            )}

            <span className="text-sm text-muted-foreground">
              total msg minted
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
