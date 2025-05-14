import { Card, CardContent } from "@/components/ui/card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ClockIcon, ZapIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HashLink } from "./hash-link";
import { useTransaction } from "@/hooks/use-transaction";
import { format, formatDistanceToNow } from "date-fns";
import { Skeleton } from "./ui/skeleton";

interface TransactionDetailProps {
  transactionId: string;
}

export function TransactionDetail({ transactionId }: TransactionDetailProps) {
  const { data: transaction } = useTransaction(transactionId);

  return (
    <div className="flex flex-col gap-10 md:mb-24 mb-20">
      <div className="flex flex-col gap-10 sm:items-start items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/transactions">Transactions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transaction #{transactionId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-5 text-sm py-1">
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="flex flex-row gap-2 items-center text-muted-foreground">
                <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
                <span>Transaction Hash:</span>
              </div>
              <HashLink
                hash={transaction?.hash || transactionId}
                type="transaction"
              />
            </div>
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="flex flex-row gap-2 items-center text-muted-foreground">
                <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
                <span>Status:</span>
              </div>
              <div
                className={`flex flex-row gap-2 items-center font-medium ${
                  !transaction?.isConfirmed
                    ? "text-emerald-500"
                    : "text-orange-400"
                }`}
              >
                <div
                  className={`flex flex-row gap-1.5 items-center border ${
                    !transaction?.isConfirmed
                      ? "border-emerald-500 hover:bg-emerald-500/15"
                      : "border-orange-400 hover:bg-orange-400/15"
                  } transition-all duration-300 rounded-md px-3 py-1.5 text-xs font-medium`}
                >
                  <ClockIcon className="h-4 w-4 flex-shrink-0" />
                  <span>
                    {!transaction?.isConfirmed ? "Confirmed" : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="flex flex-row gap-2 items-center text-muted-foreground">
                <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
                <span>Timestamp:</span>
              </div>
              <div className="flex sm:flex-row flex-col sm:gap-2 gap-1 sm:items-center items-end text-card-foreground text-right">
                {transaction?.timestamp ? (
                  <>
                    <span>
                      {formatDistanceToNow(new Date(transaction.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                    <span className="text-muted-foreground">
                      (
                      {format(
                        new Date(transaction.timestamp),
                        "MMM-dd-yyyy HH:mm:ss"
                      )}
                      )
                    </span>
                  </>
                ) : (
                  <Skeleton className="h-4 w-32" />
                )}
              </div>
            </div>
            <Separator />
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="flex flex-row gap-2 items-center text-muted-foreground">
                <ZapIcon className="h-4 w-4 flex-shrink-0" />
                <span>Transaction Action:</span>
              </div>
              <div className="flex sm:flex-row flex-col gap-1 text-card-foreground text-right">
                <span>{transaction?.event || "Transfer"}</span>
                <span className="text-muted-foreground">from</span>
                <span>Ethereum</span>
                <span className="text-muted-foreground">to</span>
                {transaction?.addresses?.[1] ? (
                  <HashLink hash={transaction.addresses[1]} type="address" />
                ) : (
                  <Skeleton className="h-4 w-32" />
                )}
                <span>Polygon</span>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="flex flex-row gap-2 items-center text-muted-foreground">
                <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
                <span>From:</span>
              </div>
              {transaction?.addresses?.[0] ? (
                <HashLink hash={transaction.addresses[0]} type="address" />
              ) : (
                <Skeleton className="h-4 w-32" />
              )}
            </div>
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="flex flex-row gap-2 items-center text-muted-foreground font-medium">
                <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
                <span>To:</span>
              </div>
              {transaction?.addresses?.[1] ? (
                <HashLink hash={transaction.addresses[1]} type="address" />
              ) : (
                <Skeleton className="h-4 w-32" />
              )}
            </div>
            <Separator />
            <div className="flex flex-row gap-2 justify-between items-start">
              <div className="flex flex-row gap-2 items-center text-muted-foreground">
                <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
                <span>Block Number:</span>
              </div>
              <div className="flex flex-col gap-2 items-end text-card-foreground font-medium">
                {transaction?.blockNumber ? (
                  <span>{transaction.blockNumber}</span>
                ) : (
                  <Skeleton className="h-4 w-32" />
                )}
              </div>
            </div>
            <Separator />
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="flex flex-row gap-2 items-center text-muted-foreground font-medium">
                <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
                <span>Transaction Fee:</span>
              </div>
              <div className="flex flex-row gap-2 items-center text-card-foreground">
                {transaction?.fee ? (
                  <span>{transaction.fee}</span>
                ) : (
                  <Skeleton className="h-4 w-32" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
