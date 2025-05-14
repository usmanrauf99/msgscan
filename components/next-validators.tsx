"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClockIcon } from "lucide-react";
import { useLifetimeStats } from "@/hooks/use-lifetime-stats";
import { HashLink } from "./hash-link";
import { Skeleton } from "./ui/skeleton";

export function NextValidators() {
  const { data: lifetimeData, isLoading } = useLifetimeStats();

  if (isLoading) {
    return (
      <Card className="overflow-hidden lg:h-[543px] h-[470px]">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col justify-between gap-0.5">
              <span>Next Validator to Submit Transaction</span>
              <span className="text-sm text-muted-foreground font-medium">
                Upcoming validator in transaction queue.
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent noPadding>
          <div className="flex flex-row gap-1 text-sm text-muted-foreground font-medium items-center h-14 border-b px-5 justify-between">
            <span>Validator Address</span>
            <span>Status</span>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden lg:h-[543px] h-[470px]">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col justify-between gap-0.5">
            <span>Next Validator to Submit Transaction</span>
            <span className="text-sm text-muted-foreground font-medium">
              Upcoming validator in transaction queue.
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent noPadding>
        <div className="flex flex-row gap-1 text-sm text-muted-foreground font-medium items-center h-14 border-b px-5 justify-between">
          <span>Validator Address</span>
          <span>Status</span>
        </div>
        <ScrollArea className="lg:h-[403px] h-[330px]">
          <div className="flex flex-col text-sm text-card-foreground">
            {lifetimeData?.nextValidatorToSubmitTransaction ? (
              <div className="flex flex-row gap-1 font-medium items-center h-20 border-b px-5 justify-between hover:bg-secondary transition-all duration-100">
                <div className="flex flex-col gap-0.5">
                  <span className="flex gap-2 items-center">
                    <HashLink
                      hash={lifetimeData.nextValidatorToSubmitTransaction}
                      type="address"
                      color="primary"
                    />
                  </span>
                  <div className="flex flex-row gap-1 items-center text-muted-foreground">
                    <ClockIcon className="h-3 w-3" />
                    <span>Next to submit</span>
                  </div>
                </div>
                <div className="flex items-center px-2.5 py-1.5 border rounded-md text-secondary-foreground/90">
                  <span>Waiting</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                No validators currently in queue
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
