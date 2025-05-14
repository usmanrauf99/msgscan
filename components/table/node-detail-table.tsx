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
  getSortedRowModel,
  useReactTable,
  Column,
} from "@tanstack/react-table";
import {
  ChevronsUpDownIcon,
  FilterIcon,
  SparklesIcon,
  ZapIcon,
  ShieldCheckIcon,
  ShieldOffIcon,
  ShieldIcon,
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
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format";

const data: Node[] = [
  {
    node_id: "3",
    volume: "1000",
    purchase_date: "2024-01-01",
    purchase_price: "1000.3",
    total_msg_accumilated: "1000",
    total_msg_claimed: "500",
    status: "Available",
  },
];

export type Node = {
  node_id: string;
  total_msg_accumilated: string;
  total_msg_claimed: string;
  status: string;
  volume: string;
  purchase_date: string;
  purchase_price: string;
};

interface DataTableProps {
  tableName: string;
  searchPlaceholder?: string;
  searchColumn?: string;
  filterPlaceholder?: string;
  filterColumn?: string;
  customizePlaceholder?: string;
  sortableColumns?: string[];
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
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Node>[] = React.useMemo(
    () => [
      {
        accessorKey: "node_id",
        header: ({ column }) => (
          <div className="px-[22px]">
            {renderSortableHeader(column, "Node ID", sortableColumns)}
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-row gap-2.5 items-center">
            <div className="w-7 h-7 flex items-center justify-center bg-muted rounded-md border">
              <WorkflowIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <span>Node #{row.getValue("node_id")}</span>
          </div>
        ),
      },
      {
        accessorKey: "volume",
        header: ({ column }) =>
          renderSortableHeader(column, "Volume", sortableColumns),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("volume")}</div>
        ),
      },
      {
        accessorKey: "purchase_date",
        header: ({ column }) =>
          renderSortableHeader(column, "Purchase Date", sortableColumns),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("purchase_date")}</div>
        ),
      },
      {
        accessorKey: "purchase_price",
        header: ({ column }) =>
          renderSortableHeader(column, "Purchase Price", sortableColumns),
        cell: ({ row }) => (
          <div className="lowercase">
            ${formatPrice(row.getValue("purchase_price"))}
          </div>
        ),
      },
      {
        accessorKey: "total_msg_accumilated",
        header: ({ column }) =>
          renderSortableHeader(column, "Total Accum.", sortableColumns),
        cell: ({ row }) => (
          <div className="px-2.5 py-1 rounded-full border w-fit text-sm">
            {row.getValue("total_msg_accumilated")}
          </div>
        ),
      },
      {
        accessorKey: "total_msg_claimed",
        header: ({ column }) =>
          renderSortableHeader(column, "Total Claimed", sortableColumns),
        cell: ({ row }) => (
          <div className="px-2.5 py-1 rounded-full border w-fit text-sm">
            {row.getValue("total_msg_claimed")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) =>
          renderSortableHeader(column, "Status", sortableColumns),
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          let Icon, iconColor;

          switch (status.toLowerCase()) {
            case "available":
              Icon = ZapIcon;
              iconColor = "text-primary";
              break;
            case "secured":
              Icon = ShieldCheckIcon;
              iconColor = "text-green-400";
              break;
            case "inactive":
              Icon = ShieldOffIcon;
              iconColor = "text-red-400";
              break;
            default:
              Icon = ShieldIcon;
              iconColor = "text-muted-foreground";
          }

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

  const renderSortableHeader = (
    column: Column<Node>,
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
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
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
      data.map((item) => item[filterColumn as keyof Node])
    );
    return Array.from(options);
  }, [filterColumn]);

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
                    key={option}
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
    </div>
  );
}
