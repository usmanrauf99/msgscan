"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkflowIcon, ClockArrowUp } from "lucide-react";
import Link from "next/link";
import { useValidators } from "@/hooks/use-validators";
import { formatNumber } from "@/utils/number-formatter";
import { Skeleton } from "./ui/skeleton";
import { HashLink } from "./hash-link";
import { useLifetimeStats } from "@/hooks/use-lifetime-stats";

export function RecentNodes() {
  const { data: validatorsData, isLoading: isValidatorsLoading } =
    useValidators();
  const { data: lifetimeData, isLoading: isLifetimeLoading } =
    useLifetimeStats();

  const isLoading = isValidatorsLoading || isLifetimeLoading;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between gap-1 items-center">
            <div className="flex flex-row gap-2 items-center">
              <span>Total Nodes:</span>
              {!isLoading && (
                <div className="flex px-2 py-1 rounded-md bg-muted items-center text-sm">
                  <span>
                    {formatNumber(validatorsData?.validators?.length || 0)}
                  </span>
                </div>
              )}
            </div>
            <Link href={`/nodes`}>
              <Button size="sm" variant="secondary">
                View More
              </Button>
            </Link>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent noPadding>
        <div className="flex flex-row gap-1 text-sm text-muted-foreground font-medium items-center h-14 border-b px-5">
          <span className="w-2/6 flex gap-1">
            Next to<span className="hidden md:block"> Submit</span>
          </span>
          <span className="w-2/6 flex gap-1 lg:justify-end">Tokens Mined</span>
          <span className="w-1/6 flex gap-1 lg:justify-end">Signed</span>
          <span className="w-1/6 flex gap-1 lg:justify-end">Submitted</span>
        </div>
        <ScrollArea className="h-[243px]">
          {isLoading ? (
            <div className="flex flex-col gap-6 p-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col text-sm text-card-foreground">
              {lifetimeData?.nextValidatorToSubmitTransaction && (
                <Link
                  href={`/validators/${lifetimeData.nextValidatorToSubmitTransaction}`}
                  key="next-validator"
                >
                  <div className="flex flex-row gap-1 items-center h-14 border-b px-5 hover:bg-secondary transition-all duration-100 bg-primary/5">
                    <div className="flex flex-row gap-2 items-center w-2/6">
                      <div className="w-7 h-7 flex items-center justify-center bg-primary/20 rounded-md">
                        <ClockArrowUp className="h-4 w-4 text-primary" />
                      </div>
                      <span
                        className="truncate"
                        title={lifetimeData.nextValidatorToSubmitTransaction}
                      >
                        <HashLink
                          hash={lifetimeData.nextValidatorToSubmitTransaction}
                          type="address"
                          color="primary"
                          sliceLength={6}
                        />
                      </span>
                    </div>
                    <span className="w-2/6 text-secondary-foreground/70 flex lg:justify-end">
                      -
                    </span>
                    <span className="w-1/6  flex lg:justify-end">-</span>
                    <span className="w-1/6  flex lg:justify-end lg:pr-1">
                      -
                    </span>
                  </div>
                </Link>
              )}

              {validatorsData?.validators.map((validator) => (
                <Link
                  href={`/validators/${validator.address}`}
                  key={validator.address}
                >
                  <div className="flex flex-row gap-1 items-center h-14 border-b px-5 hover:bg-secondary transition-all duration-100">
                    <div className="flex flex-row gap-2 items-center w-2/6">
                      <div className="w-7 h-7 flex items-center justify-center bg-muted rounded-md">
                        <WorkflowIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="truncate" title={validator.address}>
                        <HashLink
                          hash={validator.address}
                          type="address"
                          color="regular-foreground"
                          sliceLength={6}
                        />
                      </span>
                    </div>
                    <span className="w-2/6 text-secondary-foreground/70 flex lg:justify-end">
                      <div className="px-2.5 py-0.5 rounded-full border w-fit text-sm">
                        {formatNumber(validator.tokensMined, {
                          abbreviate: true,
                          etherConverter: true,
                        })}{" "}
                        MSG
                      </div>
                    </span>
                    <span className="w-1/6 lg:flex lg:justify-end">
                      {formatNumber(validator.transactionsSigned)}
                    </span>
                    <span className="w-1/6 flex lg:justify-end lg:pr-1">
                      {formatNumber(validator.transactionsSubmitted)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
