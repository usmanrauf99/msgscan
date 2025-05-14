"use client";

import Image from "next/image";
import { useTransactionsHistory } from "@/hooks/use-transactions-history";
import { Skeleton } from "./ui/skeleton";
import { formatNumber } from "@/utils/number-formatter";

export function TransactionsSummary() {
  const { data, isLoading } = useTransactionsHistory(2);

  const todayTransactions =
    data?.data?.transactions_by_date[0]?.transaction_count || 0;
  const yesterdayTransactions =
    data?.data?.transactions_by_date[1]?.transaction_count || 0;

  let percentageChange = 0;
  if (yesterdayTransactions !== 0 && todayTransactions !== 0) {
    percentageChange =
      ((todayTransactions - yesterdayTransactions) / yesterdayTransactions) *
      100;
  }

  const isPositiveChange = percentageChange >= 0;
  const percentageChangeFormatted = Math.abs(percentageChange).toFixed(2);
  const changeColorClass = isPositiveChange ? "text-green-500" : "text-red-500";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Transactions (24h)</span>
          <Image
            src="/transactions/transactions.svg"
            alt="Transactions"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        {isLoading ? (
          <Skeleton className="h-8" />
        ) : (
          <span className="text-2xl font-bold">
            {formatNumber(todayTransactions.toLocaleString() || 0)}{" "}
            {percentageChange !== 0 && (
              <span className={`text-sm ${changeColorClass}`}>
                ({percentageChangeFormatted}%)
              </span>
            )}
          </span>
        )}

        <span className="text-muted-foreground">
          all transactions processed today
        </span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Pending Transaction (Last 1h)</span>
          <Image
            src="/transactions/pending.svg"
            alt="Pending Transaction"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        <span className="text-2xl font-bold">
          120 <span className="text-green-500 text-sm">(5.54%)</span>
        </span>
        <span className="text-muted-foreground">
          awaiting validation and confirmation
        </span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Network Transactions Fee (24h)</span>
          <Image
            src="/transactions/network.svg"
            alt="Network Transactions Fee"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        <span className="text-2xl font-bold">
          0.005 ETH <span className="text-green-500 text-sm">(5.54%)</span>
        </span>
        <span className="text-muted-foreground">
          cost for processing transactions
        </span>
      </div>
      <div className="border rounded-xl p-5 bg-card flex flex-col gap-2 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
        <div className="flex flex-row justify-between gap-1 font-medium">
          <span>Avg. Transaction Fee (24h)</span>
          <Image
            src="/transactions/average.svg"
            alt="Avg. Transaction Fee"
            width={16}
            height={16}
            draggable={false}
          />
        </div>
        <span className="text-2xl font-bold">
          4.10 USD <span className="text-green-500 text-sm">(5.54%)</span>
        </span>
        <span className="text-muted-foreground">
          average transactions in last 24h
        </span>
      </div>
    </div>
  );
}
