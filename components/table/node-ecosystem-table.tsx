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
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  FilterIcon,
  SparklesIcon,
  WorkflowIcon,
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
import { useStatus } from "@/hooks/use-status";
import { useValidatorDetail } from "@/hooks/use-validator-detail";
import { formatNumber } from "@/utils/number-formatter";
import { EcosystemNode } from "@/types/network";
import { Skeleton } from "@/components/ui/skeleton";
import { HashLink } from "@/components/hash-link";

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
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: statusData, isLoading: isStatusLoading } = useStatus();
  const { data: validatorData, isLoading: isValidatorLoading } =
    useValidatorDetail(statusData?.publicKey || "");

  const isLoading = isStatusLoading || isValidatorLoading;

  const tableData = React.useMemo<EcosystemNode[]>(() => {
    if (!statusData || !validatorData?.validator) return [];

    return [
      {
        node_id: "1",
        address: validatorData.validator.address,
        tokensMined: validatorData.validator.tokensMined,
        transactionsSigned: validatorData.validator.transactionsSigned,
        transactionsSubmitted: validatorData.validator.transactionsSubmitted,
        status: "Active",
      },
    ];
  }, [statusData, validatorData]);

  const columns: ColumnDef<EcosystemNode>[] = React.useMemo(
    () => [
      {
        accessorKey: "address",
        header: ({ column }) =>
          renderSortableHeader(column, "Address", sortableColumns),
        cell: ({ row }) => (
          <div className="flex flex-row gap-2.5 items-center">
            <div className="w-7 h-7 flex items-center justify-center bg-muted rounded-md border">
              <WorkflowIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <HashLink
              hash={row.getValue("address")}
              type="address"
              color="primary"
              sliceLength={6}
            />
          </div>
        ),
      },
      {
        accessorKey: "tokensMined",
        header: ({ column }) =>
          renderSortableHeader(column, "Tokens Mined", sortableColumns),
        cell: ({ row }) => (
          <div className="px-2.5 py-0.5 rounded-full border w-fit text-sm">
            {formatNumber(row.getValue("tokensMined"), {
              abbreviate: true,
              etherConverter: true,
            })}{" "}
            MSG
          </div>
        ),
      },
      {
        accessorKey: "transactionsSigned",
        header: ({ column }) =>
          renderSortableHeader(column, "Signed", sortableColumns),
        cell: ({ row }) => (
          <div>{formatNumber(row.getValue("transactionsSigned"))}</div>
        ),
      },
      {
        accessorKey: "transactionsSubmitted",
        header: ({ column }) =>
          renderSortableHeader(column, "Submitted", sortableColumns),
        cell: ({ row }) => (
          <div>{formatNumber(row.getValue("transactionsSubmitted"))}</div>
        ),
      },
    ],
    [sortableColumns]
  );

  const renderSortableHeader = (
    column: Column<EcosystemNode>,
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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const filterOptions = React.useMemo(() => {
    if (!filterColumn) return [];
    const options = new Set(
      tableData.map((item) => item[filterColumn as keyof EcosystemNode])
    );
    return Array.from(options).map((option) => String(option));
  }, [filterColumn, tableData]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-semibold">{tableName}</h3>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
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
              value={
                (table.getColumn(searchColumn)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(searchColumn)
                  ?.setFilterValue(event.target.value)
              }
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
                    key={String(option)}
                    className="capitalize"
                    checked={(
                      table.getColumn(filterColumn)?.getFilterValue() as
                        | string[]
                        | undefined
                    )?.includes(option)}
                    onCheckedChange={(value) => {
                      const filterValue = table
                        .getColumn(filterColumn)
                        ?.getFilterValue() as string[] | undefined;
                      table
                        .getColumn(filterColumn)
                        ?.setFilterValue(
                          value
                            ? [...(filterValue || []), option]
                            : filterValue?.filter(
                                (item: string) => item !== option
                              )
                        );
                    }}
                  >
                    {String(option)}
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
                  className="bg-muted/5 cursor-pointer"
                  // onClick={() =>
                  //   router.push(`/nodes/${row.getValue("node_id")}`)
                  // }
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
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 50, 100].map((pageSize) => (
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
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          </div>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="pagination"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
