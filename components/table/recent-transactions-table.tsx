"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronsUpDownIcon,
  ClipboardListIcon,
  FilterIcon,
  SparklesIcon,
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

import { Button } from "@/components/ui/button";
import { HashLink } from "../hash-link";
import { useTransactions } from "@/hooks/use-transactions";
import { Transaction } from "@/types/network";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

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
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [searchValue, setSearchValue] = React.useState("");

  const { data, isLoading } = useTransactions(1, 5, searchValue);

  const handleSearch = (value: string) => {
    setSearchValue(value);
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
                  {renderSortableHeader(
                    "hash",
                    "Transaction Hash",
                    sortableColumns
                  )}
                </TableHead>
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader("addresses", "Sender", sortableColumns)}
                </TableHead>
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader(
                    "addresses",
                    "Destination",
                    sortableColumns
                  )}
                </TableHead>
                <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                  {renderSortableHeader("fee", "Fee", sortableColumns)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={`skeleton-${i}`} className="bg-muted/5">
                  <TableCell className="px-4">
                    <div className="flex flex-row gap-2.5 items-center">
                      <div className="h-7 w-7 bg-muted rounded-md flex items-center justify-center border"></div>
                      <div className="lowercase flex flex-col items-start gap-2">
                        <Skeleton className="h-4 w-40" />
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
                {["hash", "addresses", "fee", "timestamp"].map((column) => {
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
              <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                {renderSortableHeader(
                  "hash",
                  "Transaction Hash",
                  sortableColumns
                )}
              </TableHead>
              <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                {renderSortableHeader("addresses", "Sender", sortableColumns)}
              </TableHead>
              <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                {renderSortableHeader(
                  "addresses",
                  "Destination",
                  sortableColumns
                )}
              </TableHead>
              <TableHead className="text-card-foreground font-semibold bg-inherit border-none">
                {renderSortableHeader("fee", "Fee", sortableColumns)}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <TableRow key={row.hash + "-" + index} className="bg-muted/5">
                  <TableCell className="px-4">
                    <div className="flex flex-row gap-2.5 items-center">
                      <div className="h-7 w-7 bg-muted rounded-md flex items-center justify-center border">
                        <ClipboardListIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="lowercase flex flex-col items-start gap-0.5">
                        <HashLink hash={row.hash} type="transaction" />
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(row.timestamp), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex flex-row gap-1 items-center text-sm text-muted-foreground">
                      <span>from</span>
                      <HashLink
                        hash={row.addresses[0] || ""}
                        type="address"
                        color="foreground"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex flex-row gap-1 items-center text-sm text-muted-foreground">
                      <span>to</span>
                      <HashLink
                        hash={row.addresses[1] || ""}
                        type="address"
                        color="foreground"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="px-2.5 py-0.5 rounded-full border w-fit text-sm">
                      {row.fee} MSG
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
