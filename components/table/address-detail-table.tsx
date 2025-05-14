"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Column,
} from "@tanstack/react-table";
import {
  ChevronsUpDownIcon,
  SparklesIcon,
  ZapIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ClipboardListIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HashLink } from "../hash-link";
import { useAddressTransactions } from "@/hooks/use-address-transactions";
import { Transaction } from "@/types/network";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface DataTableProps {
  tableName: string;
  searchPlaceholder?: string;
  searchColumn?: string;
  filterPlaceholder?: string;
  filterColumn?: string;
  customizePlaceholder?: string;
  sortableColumns?: string[];
  rowsText?: string;
  addressId: string;
}

export function DataTable({
  tableName,
  searchPlaceholder,
  searchColumn,

  customizePlaceholder,
  sortableColumns,
  rowsText = "Rows",
  addressId,
}: DataTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");
  const currentPageSize = Number(searchParams.get("pageSize") || "20");
  const currentSearch = searchParams.get("search") || "";

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [searchValue, setSearchValue] = React.useState(currentSearch);

  const { data, isLoading } = useAddressTransactions(
    addressId,
    currentPage,
    currentPageSize,
    currentSearch
  );

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    router.push(
      `${pathname}?${createQueryString({
        search: value || null,
        page: 1,
      })}`
    );
  }, 500);

  React.useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const handlePageChange = (page: number) => {
    router.push(
      `${pathname}?${createQueryString({
        page,
      })}`
    );
  };

  const handlePageSizeChange = (pageSize: number) => {
    router.push(
      `${pathname}?${createQueryString({
        pageSize,
        page: 1,
      })}`
    );
  };

  const renderSortableHeader = (
    column: Column<Transaction>,
    title: string,
    sortableColumns: string[] | undefined
  ) => {
    return sortableColumns?.includes(column.id) ? (
      <Button
        variant="column"
        size="none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {title}
        <ChevronsUpDownIcon className="ml-1 h-3 w-3" />
      </Button>
    ) : (
      title
    );
  };

  const tableData = data?.transactions || [];

  const columns: ColumnDef<Transaction>[] = React.useMemo(
    () => [
      {
        accessorKey: "hash",
        header: ({ column }) =>
          renderSortableHeader(column, "Transaction Hash", sortableColumns),
        cell: ({ row }) => (
          <div className="flex flex-row gap-2.5 items-center">
            <div className="h-7 w-7 bg-muted rounded-md flex items-center justify-center border">
              <ClipboardListIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="lowercase flex flex-col items-start gap-0.5">
              <HashLink hash={row.getValue("hash")} type="transaction" />
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(row.original.timestamp), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "sender",
        header: ({ column }) =>
          renderSortableHeader(column, "Sender", sortableColumns),
        cell: ({ row }) => (
          <div className="flex flex-row gap-1 items-center text-sm text-muted-foreground">
            <span>from</span>
            <HashLink
              hash={row.getValue("sender")}
              type="address"
              color="foreground"
            />
          </div>
        ),
      },
      {
        accessorKey: "destination",
        header: ({ column }) =>
          renderSortableHeader(column, "Destination", sortableColumns),
        cell: ({ row }) => (
          <div className="flex flex-row gap-1 items-center text-sm text-muted-foreground">
            <span>to</span>
            <HashLink
              hash={row.getValue("destination")}
              type="address"
              color="foreground"
            />
          </div>
        ),
      },
      {
        accessorKey: "fee",
        header: ({ column }) =>
          renderSortableHeader(column, "Fee", sortableColumns),
        cell: ({ row }) => <span>{row.getValue("fee")}</span>,
      },
      {
        accessorKey: "isConfirmed",
        header: ({ column }) =>
          renderSortableHeader(column, "Status", sortableColumns),
        cell: ({ row }) => {
          const isConfirmed = row.getValue("isConfirmed") as boolean;
          const Icon = isConfirmed ? ZapIcon : ShieldCheckIcon;
          const iconColor = isConfirmed ? "text-green-400" : "text-orange-400";
          const status = isConfirmed ? "Confirmed" : "Pending";

          return (
            <div className="flex flex-row gap-2 items-center">
              <div className="h-6 w-6 bg-secondary rounded-md border flex items-center justify-center p-1">
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </div>
              <span>{status}</span>
            </div>
          );
        },
      },
    ],
    [sortableColumns]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    manualPagination: true,
    pageCount: data?.pagination?.totalPages || 1,
  });

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-semibold">{tableName}</h3>
          <div className="flex items-center space-x-2">
            {searchColumn && (
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(event) => handleSearch(event.target.value)}
                className="max-w-sm"
              />
            )}
          </div>
        </div>

        <div className="rounded-md">
          <Table className="border-separate border-spacing-y-2.5 border-spacing-x-0">
            <TableHeader>
              <TableRow>
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  Transaction Hash
                </TableHead>
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  Sender
                </TableHead>
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  Destination
                </TableHead>
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  Fee
                </TableHead>
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={`skeleton-${i}`} className="bg-muted/5">
                  <TableCell className="px-4">
                    <div className="flex flex-row gap-2.5 items-center">
                      <div className="h-7 w-7 bg-muted rounded-md flex items-center justify-center border">
                        <Skeleton className="h-4 w-4" />
                      </div>
                      <div className="lowercase flex flex-col items-start gap-0.5">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <Skeleton className="h-6 w-36" />
                  </TableCell>
                  <TableCell className="px-4">
                    <Skeleton className="h-6 w-36" />
                  </TableCell>
                  <TableCell className="px-4">
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell className="px-4">
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <h3 className="text-lg font-semibold">{tableName}</h3>
        <div className="flex items-center space-x-2">
          {searchColumn && (
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => handleSearch(event.target.value)}
              className="max-w-sm"
            />
          )}
          {customizePlaceholder && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto tex" size="md">
                  <SparklesIcon className="mr-2 h-3 w-3" />
                  {customizePlaceholder}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="rounded-md">
        <Table className="border-separate border-spacing-y-2.5 border-spacing-x-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-card-foreground font-semibold bg-inherit border-none"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-muted/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium hidden sm:block">
            {rowsText} per page
          </p>
          <Select
            value={`${currentPageSize}`}
            onValueChange={(value) => {
              handlePageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={currentPageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-row items-center text-sm font-medium mr-2 gap-1">
            <span className="sm:block hidden">Page</span>
            <span>
              {currentPage} of {data?.pagination?.totalPages || 1}
            </span>
          </div>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === (data?.pagination?.totalPages || 1)}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => handlePageChange(data?.pagination?.totalPages || 1)}
            disabled={currentPage === (data?.pagination?.totalPages || 1)}
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
