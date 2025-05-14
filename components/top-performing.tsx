"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "./ui/button";
import { useLifetimeStats } from "@/hooks/use-lifetime-stats";
import { Skeleton } from "./ui/skeleton";
import { format, parseISO } from "date-fns";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-10))",
  "hsl(var(--chart-11))",
  "hsl(var(--chart-12))",
];

type VisibleLines = {
  [key: string]: boolean;
};

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

interface ValidatorChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export function TopPerforming() {
  const { data, isLoading } = useLifetimeStats();
  const [visibleLines, setVisibleLines] = useState<VisibleLines>({});

  const { chartData, chartConfig } = useMemo<{
    chartData: ChartDataPoint[];
    chartConfig: ValidatorChartConfig;
  }>(() => {
    if (!data?.topPerformingValidators?.length) {
      return { chartData: [], chartConfig: {} };
    }

    const sortedValidators = [...data.topPerformingValidators].sort(
      (a, b) => b.transactionsSigned - a.transactionsSigned
    );

    const validatorMap: Record<string, (typeof sortedValidators)[0]> =
      sortedValidators.reduce((acc, validator) => {
        const key =
          validator.validatorName || validator.address.substring(0, 10);
        return {
          ...acc,
          [key]: validator,
        };
      }, {});

    const config: ValidatorChartConfig = Object.keys(validatorMap).reduce(
      (acc, name, index) => ({
        ...acc,
        [name]: {
          label: name,
          color: colors[index % colors.length],
        },
      }),
      {}
    );

    const uniqueDates = Array.from(
      new Set(
        sortedValidators
          .map((validator) => validator.timestamp)
          .filter(Boolean)
          .map((timestamp) => format(parseISO(timestamp as string), "dd MMM"))
      )
    );

    const chartDates =
      uniqueDates.length > 0 ? uniqueDates : [format(new Date(), "dd MMM")];

    const chartPoints: ChartDataPoint[] = chartDates.map((date) => {
      const dataPoint: ChartDataPoint = { date };

      Object.entries(validatorMap).forEach(([name, validator]) => {
        dataPoint[name] = validator.transactionsSigned;
      });

      return dataPoint;
    });

    return {
      chartData: chartPoints,
      chartConfig: config,
    };
  }, [data]);

  useMemo(() => {
    if (
      Object.keys(chartConfig).length > 0 &&
      Object.keys(visibleLines).length === 0
    ) {
      setVisibleLines(
        Object.keys(chartConfig).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {} as VisibleLines
        )
      );
    }
  }, [chartConfig, visibleLines]);

  const toggleLine = (key: string) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const yAxisRange = useMemo(() => {
    if (!chartData.length) return { min: 0, max: 10 };

    const allValues = chartData.flatMap((entry) =>
      Object.entries(entry)
        .filter(([key]) => key !== "date" && visibleLines[key])
        .map(([, value]) => (typeof value === "number" ? value : 0))
    );

    if (!allValues.length) return { min: 0, max: 10 };

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    return {
      min: Math.max(0, Math.floor(minValue)),
      max: Math.ceil(maxValue),
    };
  }, [chartData, visibleLines]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row justify-between gap-1">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="lg:h-[445px] h-[235px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between gap-1">
            <div className="flex flex-col gap-0.5">
              <span>Top Performing Validators</span>
              <span className="text-sm text-muted-foreground font-medium">
                Validators with the highest number of transactions signed.
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
              {Object.entries(chartConfig).map(([key, config]) => (
                <Button
                  key={key}
                  variant="chart"
                  size="chart"
                  onClick={() => toggleLine(key)}
                  className={visibleLines[key] ? "" : "opacity-50 line-through"}
                >
                  <div className="flex flex-row items-center gap-1 lg:px-0 px-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    <span className="line-clamp-1 text-xs">
                      {config.label.length > 6
                        ? `${config.label.slice(0, 6)}...`
                        : config.label}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig as ChartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 32,
                right: 32,
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <YAxis
                type="number"
                domain={[yAxisRange.min, yAxisRange.max]}
                tickCount={5}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.toFixed(0)}
                label={{
                  value: "Transactions Signed",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              {Object.entries(chartConfig).map(([key, config]) =>
                visibleLines[key] ? (
                  <Line
                    key={key}
                    dataKey={key}
                    type="monotone"
                    stroke={config.color}
                    strokeWidth={2}
                    dot={true}
                    activeDot={{ r: 6 }}
                  />
                ) : null
              )}
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No validator data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
