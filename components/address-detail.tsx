import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "./table/address-detail-table";
import Image from "next/image";
import { HashLink } from "./hash-link";
import { useAddressTransactions } from "@/hooks/use-address-transactions";
import { useSearchParams } from "next/navigation";

interface AddressDetailProps {
  addressId: string;
}

export function AddressDetail({ addressId }: AddressDetailProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const currentPageSize = Number(searchParams.get("pageSize") || "20");
  const currentSearch = searchParams.get("search") || "";

  const { data } = useAddressTransactions(
    addressId,
    currentPage,
    currentPageSize,
    currentSearch
  );

  const totalTransactions = data?.totalTransactions || 0;
  const tableName = `Latest ${currentPageSize} from a total of ${totalTransactions} transactions`;

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
              <BreadcrumbPage>Address #{addressId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="border rounded-xl p-5 bg-card flex flex-col gap-3 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
          <div className="flex flex-row justify-between gap-1 font-medium">
            <span>Address</span>
            <Image
              src="/address/address.svg"
              alt="Address"
              width={16}
              height={16}
              draggable={false}
            />
          </div>
          <div className="flex flex-row gap-1.5 text-primary items-center">
            <HashLink hash={addressId} type="address" />
          </div>
        </div>
        <div className="border group rounded-xl p-5 bg-card flex flex-col gap-3 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
          <div className="flex flex-row justify-between gap-1 font-medium">
            <span>Transaction Sent</span>
            <Image
              src="/address/sent.svg"
              alt="Transaction Sent"
              width={16}
              height={16}
              draggable={false}
            />
          </div>
          <div className="flex flex-row gap-2.5 text-primary">
            <div className="flex flex-row gap-1">
              <span className="text-card-foreground">Latest:</span>
              <span>236 days ago</span>
            </div>
            <div className="flex flex-row gap-1">
              <span className="text-card-foreground">First:</span>
              <span>536 days ago</span>
            </div>
          </div>
        </div>
        <div className="border rounded-xl p-5 bg-card flex flex-col gap-3 hover:border-secondary-foreground/15 transition-all duration-300 text-sm">
          <div className="flex flex-row justify-between gap-1 font-medium">
            <span>Funded By</span>
            <Image
              src="/address/funded.svg"
              alt="Funded By"
              width={16}
              height={16}
              draggable={false}
            />
          </div>
          <div className="flex flex-row gap-1.5 text-muted-foreground flex-wrap">
            <HashLink
              hash="0x62Be323B94f860124dX4fEe278FDGBD38C102D88"
              type="address"
            />
            <span>at txn</span>
            <HashLink
              hash="0x7287c9d0eb221354f1249de7632d4f557c4d30f8"
              type="address"
            />
          </div>
        </div>
      </div>
      <Card>
        <CardContent className="pt-1">
          <DataTable
            tableName={tableName}
            searchColumn="hash"
            searchPlaceholder="Search transaction..."
            sortableColumns={[
              "hash",
              "fee",
              "sender",
              "destination",
              "isConfirmed",
            ]}
            rowsText="Transactions"
            addressId={addressId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
