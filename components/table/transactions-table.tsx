"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronsUpDownIcon,
  FilterIcon,
  SparklesIcon,
  ZapIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ClockIcon,
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
import { useTransactions } from "@/hooks/use-transactions";
import { Transaction } from "@/types/network";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/number-formatter";
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
}

export function DataTable({
  tableName,
  searchPlaceholder,
  searchColumn,
  filterPlaceholder,
  filterColumn,
  customizePlaceholder,
  sortableColumns,
  rowsText = "Rows",
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

  const { data, isLoading, isFetching } = useTransactions(
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
    column: string,
    title: string,
    sortableColumns: string[] | undefined
  ) => {
    return sortableColumns?.includes(column) ? (
      <Button
        variant="column"
        size="none"
        onClick={() => {
          const currentSortDir = sorting.find((s) => s.id === column)?.desc
            ? "asc"
            : "desc";
          setSorting([{ id: column, desc: currentSortDir === "desc" }]);
        }}
      >
        {title}
        <ChevronsUpDownIcon className="ml-1 h-3 w-3" />
      </Button>
    ) : (
      title
    );
  };

  const tableData = React.useMemo(() => data?.recentTransactions || [], [data]);
  const pagination = data?.pagination || {
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };

  const filterOptions = React.useMemo(() => {
    if (!filterColumn) return [];
    const options = new Set<string>();

    tableData.forEach((item) => {
      const value = item[filterColumn as keyof Transaction];
      if (typeof value === "boolean") {
        options.add(value ? "True" : "False");
      } else if (Array.isArray(value)) {
        value.forEach((v) => options.add(String(v)));
      } else {
        options.add(String(value));
      }
    });

    return Array.from(options);
  }, [filterColumn, tableData]);

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
                onChange={(event) => {
                  setSearchValue(event.target.value);
                  handleSearch(event.target.value);
                }}
                className="max-w-sm"
              />
            )}
          </div>
        </div>

        <div className="rounded-md">
          <Table className="border-separate border-spacing-y-2.5 border-spacing-x-0">
            <TableHeader>
              <TableRow>
                {!columnVisibility["timestamp"] && (
                  <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                    {renderSortableHeader("timestamp", "Time", sortableColumns)}
                  </TableHead>
                )}
                {!columnVisibility["hash"] && (
                  <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                    {renderSortableHeader(
                      "hash",
                      "Transaction Hash",
                      sortableColumns
                    )}
                  </TableHead>
                )}
                {!columnVisibility["blockNumber"] && (
                  <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                    {renderSortableHeader(
                      "blockNumber",
                      "Block",
                      sortableColumns
                    )}
                  </TableHead>
                )}
                {!columnVisibility["addresses"] && (
                  <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                    {renderSortableHeader(
                      "addresses",
                      "Addresses",
                      sortableColumns
                    )}
                  </TableHead>
                )}
                {!columnVisibility["event"] && (
                  <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                    {renderSortableHeader("event", "Event", sortableColumns)}
                  </TableHead>
                )}
                {!columnVisibility["fee"] && (
                  <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                    {renderSortableHeader("fee", "Fee", sortableColumns)}
                  </TableHead>
                )}
                {!columnVisibility["isConfirmed"] && (
                  <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                    {renderSortableHeader(
                      "isConfirmed",
                      "Status",
                      sortableColumns
                    )}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={`skeleton-${i}`} className="bg-muted/5">
                  {!columnVisibility["timestamp"] && (
                    <TableCell className="px-4">
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                  )}
                  {!columnVisibility["hash"] && (
                    <TableCell className="px-4">
                      <Skeleton className="h-6 w-40" />
                    </TableCell>
                  )}
                  {!columnVisibility["blockNumber"] && (
                    <TableCell className="px-4">
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                  )}
                  {!columnVisibility["addresses"] && (
                    <TableCell className="px-4">
                      <Skeleton className="h-12 w-40" />
                    </TableCell>
                  )}
                  {!columnVisibility["event"] && (
                    <TableCell className="px-4">
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                  )}
                  {!columnVisibility["fee"] && (
                    <TableCell className="px-4">
                      <Skeleton className="h-6 w-12" />
                    </TableCell>
                  )}
                  {!columnVisibility["isConfirmed"] && (
                    <TableCell className="px-4">
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4 mt-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-48" />
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
              onChange={(event) => {
                setSearchValue(event.target.value);
                handleSearch(event.target.value);
              }}
              className="max-w-sm"
            />
          )}
          {filterColumn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto text-secondary-foreground"
                  size="md"
                >
                  <FilterIcon className="mr-2 h-3 w-3" /> {filterPlaceholder}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {filterOptions.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option}
                    className="capitalize"
                    checked={columnFilters.some(
                      (filter) =>
                        filter.id === filterColumn &&
                        (filter.value as string[])?.includes(option)
                    )}
                    onCheckedChange={(value) => {
                      const existingFilter = columnFilters.find(
                        (filter) => filter.id === filterColumn
                      );

                      const existingValues =
                        (existingFilter?.value as string[]) || [];

                      if (value) {
                        setColumnFilters((prev) => [
                          ...prev.filter((f) => f.id !== filterColumn),
                          {
                            id: filterColumn,
                            value: [...existingValues, option],
                          },
                        ]);
                      } else {
                        setColumnFilters((prev) => [
                          ...prev.filter((f) => f.id !== filterColumn),
                          {
                            id: filterColumn,
                            value: existingValues.filter((v) => v !== option),
                          },
                        ]);
                      }
                    }}
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                {[
                  "timestamp",
                  "hash",
                  "blockNumber",
                  "addresses",
                  "event",
                  "fee",
                  "isConfirmed",
                ].map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column}
                      className="capitalize"
                      checked={!columnVisibility[column]}
                      onCheckedChange={(value) =>
                        setColumnVisibility((prev) => ({
                          ...prev,
                          [column]: !value,
                        }))
                      }
                    >
                      {column}
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
            <TableRow>
              {!columnVisibility["timestamp"] && (
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader("timestamp", "Time", sortableColumns)}
                </TableHead>
              )}
              {!columnVisibility["hash"] && (
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader(
                    "hash",
                    "Transaction Hash",
                    sortableColumns
                  )}
                </TableHead>
              )}
              {!columnVisibility["blockNumber"] && (
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader(
                    "blockNumber",
                    "Block",
                    sortableColumns
                  )}
                </TableHead>
              )}
              {!columnVisibility["addresses"] && (
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader(
                    "addresses",
                    "Addresses",
                    sortableColumns
                  )}
                </TableHead>
              )}
              {!columnVisibility["event"] && (
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader("event", "Event", sortableColumns)}
                </TableHead>
              )}
              {!columnVisibility["fee"] && (
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader("fee", "Fee", sortableColumns)}
                </TableHead>
              )}
              {!columnVisibility["isConfirmed"] && (
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader(
                    "isConfirmed",
                    "Status",
                    sortableColumns
                  )}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <TableRow key={row.hash + "-" + index} className="bg-muted/5">
                  {!columnVisibility["timestamp"] && (
                    <TableCell className="px-4">
                      <div className="flex flex-row gap-1 items-center text-muted-foreground">
                        <ClockIcon className="h-3 w-3" />
                        <span>
                          {formatDistanceToNow(new Date(row.timestamp), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </TableCell>
                  )}

                  {!columnVisibility["hash"] && (
                    <TableCell className="px-4">
                      <div className="flex flex-row gap-2.5 items-center">
                        <HashLink hash={row.hash} type="transaction" />
                      </div>
                    </TableCell>
                  )}

                  {!columnVisibility["blockNumber"] && (
                    <TableCell className="px-4">
                      <span>{formatNumber(row.blockNumber)}</span>
                    </TableCell>
                  )}

                  {!columnVisibility["addresses"] && (
                    <TableCell className="px-4">
                      <div className="flex flex-col gap-1">
                        {row.addresses[0] && (
                          <div className="flex flex-row gap-1 items-center text-sm text-muted-foreground">
                            <span>from</span>
                            <HashLink
                              hash={row.addresses[0]}
                              type="address"
                              color="foreground"
                            />
                          </div>
                        )}
                        {row.addresses[1] && (
                          <div className="flex flex-row gap-1 items-center text-sm text-muted-foreground">
                            <span>to</span>
                            <HashLink
                              hash={row.addresses[1]}
                              type="address"
                              color="foreground"
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  )}

                  {!columnVisibility["event"] && (
                    <TableCell className="px-4">
                      <div className="text-muted-foreground">{row.event}</div>
                    </TableCell>
                  )}

                  {!columnVisibility["fee"] && (
                    <TableCell className="px-4">
                      <div className="px-2.5 py-0.5 rounded-full border w-fit text-sm">
                        {row.fee} MSG
                      </div>
                    </TableCell>
                  )}

                  {!columnVisibility["isConfirmed"] && (
                    <TableCell className="px-4">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="h-6 w-6 bg-secondary rounded-md border flex items-center justify-center p-1">
                          {!row.isConfirmed ? (
                            <ZapIcon className="h-4 w-4 text-green-400" />
                          ) : (
                            <ClockIcon className="h-4 w-4 text-orange-400" />
                          )}
                        </div>
                        <span>
                          {!row.isConfirmed ? "Confirmed" : "Pending"}
                        </span>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
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
            value={String(pagination.pageSize)}
            onValueChange={(value) => {
              handlePageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
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
              {pagination.page} of {pagination.totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => handlePageChange(1)}
            disabled={pagination.page <= 1 || isFetching}
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1 || isFetching}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages || isFetching}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => handlePageChange(pagination.totalPages)}
            disabled={pagination.page >= pagination.totalPages || isFetching}
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
