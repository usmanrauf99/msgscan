"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactionsHistory } from "@/hooks/use-transactions-history";
import { format, parseISO } from "date-fns";
import { Skeleton } from "./ui/skeleton";

const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DailyTransactions() {
  const { data: transactionsData, isLoading } = useTransactionsHistory(30);

  const chartData =
    transactionsData?.data.transactions_by_date
      .map((item) => ({
        day: format(parseISO(item.date), "d"),
        fullDate: format(parseISO(item.date), "dd MMM yyyy"),
        transactions: item.transaction_count,
      }))
      .reverse() || [];

  return (
    <Card className="md:mb-24 mb-20">
      <CardContent>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2 mb-6">
            <h3 className="font-semibold leading-none text-xl">
              Daily Transactions
            </h3>
            <span className="text-muted-foreground text-sm font-medium">
              Last 30 days
            </span>
          </div>
          {isLoading ? (
            <Skeleton className="h-48 sm:h-72" />
          ) : (
            <ChartContainer config={chartConfig} className="h-48 sm:h-72">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                          return payload[0].payload.fullDate;
                        }
                        return label;
                      }}
                    />
                  }
                />
                <defs>
                  <linearGradient
                    id="fillTransactions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--background))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="transactions"
                  type="natural"
                  fill="url(#fillTransactions)"
                  fillOpacity={0.4}
                  stroke="hsl(var(--chart-primary))"
                  stackId="a"
                  strokeWidth={2.5}
                  activeDot={{
                    stroke: "hsl(var(--chart-primary))",
                    strokeWidth: 2.5,
                    fill: "hsl(var(--background))",
                    r: 8,
                  }}
                />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
