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
  Row,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
//import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/format";

const data: Nodes[] = [
  {
    node_id: "1",
    total_msg_accumilated: "1000",
    total_msg_claimed: "500",
    status: "Secured",
    volume: "1000",
    purchase_price: "600",
  },
  {
    node_id: "2",
    total_msg_accumilated: "2300",
    total_msg_claimed: "200",
    status: "Secured",
    volume: "400",
    purchase_price: "646.33232",
  },
  {
    node_id: "3",
    total_msg_accumilated: "522",
    total_msg_claimed: "250",
    status: "Secured",
    volume: "2300",
    purchase_price: "696.52",
  },
  {
    node_id: "4",
    total_msg_accumilated: "522",
    total_msg_claimed: "250",
    status: "Secured",
    volume: "2300",
    purchase_price: "984",
  },
  {
    node_id: "5",
    total_msg_accumilated: "1000",
    total_msg_claimed: "500",
    status: "Secured",
    volume: "1000",
    purchase_price: "1023.23",
  },
  {
    node_id: "6",
    total_msg_accumilated: "2300",
    total_msg_claimed: "200",
    status: "Available",
    volume: "400",
    purchase_price: "1474",
  },
  {
    node_id: "7",
    total_msg_accumilated: "522",
    total_msg_claimed: "250",
    status: "Available",
    volume: "2300",
    purchase_price: "1523",
  },
  {
    node_id: "8",
    total_msg_accumilated: "522",
    total_msg_claimed: "250",
    status: "Available",
    volume: "2300",
    purchase_price: "1974.3",
  },
  {
    node_id: "9",
    total_msg_accumilated: "1000",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1000",
    purchase_price: "2023",
  },
  {
    node_id: "10",
    total_msg_accumilated: "2300",
    total_msg_claimed: "200",
    status: "Available",
    volume: "400",
    purchase_price: "2474",
  },
  {
    node_id: "11",
    total_msg_accumilated: "522",
    total_msg_claimed: "250",
    status: "Available",
    volume: "2903",
    purchase_price: "3974",
  },
  {
    node_id: "12",
    total_msg_accumilated: "522",
    total_msg_claimed: "250",
    status: "Available",
    volume: "2300",
    purchase_price: "3974",
  },
  {
    node_id: "13",
    total_msg_accumilated: "1800",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1200",
    purchase_price: "1500.50",
  },
  {
    node_id: "14",
    total_msg_accumilated: "2200",
    total_msg_claimed: "150",
    status: "Available",
    volume: "500",
    purchase_price: "1750.75",
  },
  {
    node_id: "15",
    total_msg_accumilated: "1000",
    total_msg_claimed: "700",
    status: "Available",
    volume: "900",
    purchase_price: "1100.25",
  },
  {
    node_id: "16",
    total_msg_accumilated: "2100",
    total_msg_claimed: "400",
    status: "Available",
    volume: "800",
    purchase_price: "1300.80",
  },
  {
    node_id: "17",
    total_msg_accumilated: "500",
    total_msg_claimed: "200",
    status: "Available",
    volume: "450",
    purchase_price: "1400.50",
  },
  {
    node_id: "18",
    total_msg_accumilated: "1500",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1000",
    purchase_price: "1550.75",
  },
  {
    node_id: "19",
    total_msg_accumilated: "2300",
    total_msg_claimed: "100",
    status: "Available",
    volume: "600",
    purchase_price: "1600.30",
  },
  {
    node_id: "20",
    total_msg_accumilated: "900",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1200",
    purchase_price: "1800.60",
  },
  {
    node_id: "21",
    total_msg_accumilated: "1600",
    total_msg_claimed: "500",
    status: "Available",
    volume: "700",
    purchase_price: "1950.90",
  },
  {
    node_id: "22",
    total_msg_accumilated: "2100",
    total_msg_claimed: "900",
    status: "Available",
    volume: "950",
    purchase_price: "2000.10",
  },
  {
    node_id: "23",
    total_msg_accumilated: "1200",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1100",
    purchase_price: "2100.15",
  },
  {
    node_id: "24",
    total_msg_accumilated: "1800",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1000",
    purchase_price: "2200.20",
  },
  {
    node_id: "25",
    total_msg_accumilated: "1700",
    total_msg_claimed: "600",
    status: "Available",
    volume: "850",
    purchase_price: "2300.25",
  },
  {
    node_id: "26",
    total_msg_accumilated: "1400",
    total_msg_claimed: "600",
    status: "Available",
    volume: "950",
    purchase_price: "2600.30",
  },
  {
    node_id: "27",
    total_msg_accumilated: "1600",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1200",
    purchase_price: "2700.35",
  },
  {
    node_id: "28",
    total_msg_accumilated: "1300",
    total_msg_claimed: "400",
    status: "Available",
    volume: "850",
    purchase_price: "2800.40",
  },
  {
    node_id: "29",
    total_msg_accumilated: "1800",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1150",
    purchase_price: "2900.45",
  },
  {
    node_id: "30",
    total_msg_accumilated: "1200",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1000",
    purchase_price: "3000.50",
  },
  {
    node_id: "31",
    total_msg_accumilated: "1100",
    total_msg_claimed: "550",
    status: "Available",
    volume: "900",
    purchase_price: "3100.55",
  },
  {
    node_id: "32",
    total_msg_accumilated: "1500",
    total_msg_claimed: "650",
    status: "Available",
    volume: "1100",
    purchase_price: "3200.60",
  },
  {
    node_id: "33",
    total_msg_accumilated: "2000",
    total_msg_claimed: "750",
    status: "Available",
    volume: "1300",
    purchase_price: "3300.65",
  },
  {
    node_id: "34",
    total_msg_accumilated: "1400",
    total_msg_claimed: "300",
    status: "Available",
    volume: "950",
    purchase_price: "3400.70",
  },
  {
    node_id: "35",
    total_msg_accumilated: "1600",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1000",
    purchase_price: "3500.75",
  },
  {
    node_id: "36",
    total_msg_accumilated: "1100",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1200",
    purchase_price: "3600.80",
  },
  {
    node_id: "37",
    total_msg_accumilated: "1500",
    total_msg_claimed: "900",
    status: "Available",
    volume: "1400",
    purchase_price: "3700.85",
  },
  {
    node_id: "38",
    total_msg_accumilated: "1300",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1000",
    purchase_price: "3800.90",
  },
  {
    node_id: "39",
    total_msg_accumilated: "1800",
    total_msg_claimed: "600",
    status: "Available",
    volume: "1200",
    purchase_price: "3900.95",
  },
  {
    node_id: "40",
    total_msg_accumilated: "1900",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1100",
    purchase_price: "4000.00",
  },
  {
    node_id: "41",
    total_msg_accumilated: "1500",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1000",
    purchase_price: "4050.60",
  },
  {
    node_id: "42",
    total_msg_accumilated: "1800",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1100",
    purchase_price: "4150.65",
  },
  {
    node_id: "43",
    total_msg_accumilated: "1200",
    total_msg_claimed: "500",
    status: "Available",
    volume: "950",
    purchase_price: "4250.70",
  },
  {
    node_id: "44",
    total_msg_accumilated: "1700",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1050",
    purchase_price: "4350.75",
  },
  {
    node_id: "45",
    total_msg_accumilated: "2000",
    total_msg_claimed: "600",
    status: "Available",
    volume: "1200",
    purchase_price: "4450.80",
  },
  {
    node_id: "46",
    total_msg_accumilated: "1300",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1150",
    purchase_price: "4550.85",
  },
  {
    node_id: "47",
    total_msg_accumilated: "1500",
    total_msg_claimed: "750",
    status: "Available",
    volume: "1400",
    purchase_price: "4650.90",
  },
  {
    node_id: "48",
    total_msg_accumilated: "1800",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1200",
    purchase_price: "4750.95",
  },
  {
    node_id: "49",
    total_msg_accumilated: "1900",
    total_msg_claimed: "650",
    status: "Available",
    volume: "1000",
    purchase_price: "4850.00",
  },
  {
    node_id: "50",
    total_msg_accumilated: "1600",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1300",
    purchase_price: "4950.05",
  },
  {
    node_id: "51",
    total_msg_accumilated: "1700",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1050",
    purchase_price: "5050.10",
  },
  {
    node_id: "52",
    total_msg_accumilated: "1200",
    total_msg_claimed: "550",
    status: "Available",
    volume: "950",
    purchase_price: "5150.15",
  },
  {
    node_id: "53",
    total_msg_accumilated: "1500",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1150",
    purchase_price: "5250.20",
  },
  {
    node_id: "54",
    total_msg_accumilated: "1600",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1100",
    purchase_price: "5350.25",
  },
  {
    node_id: "55",
    total_msg_accumilated: "1900",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1250",
    purchase_price: "5450.30",
  },
  {
    node_id: "56",
    total_msg_accumilated: "1300",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1150",
    purchase_price: "5550.35",
  },
  {
    node_id: "57",
    total_msg_accumilated: "1800",
    total_msg_claimed: "900",
    status: "Available",
    volume: "1200",
    purchase_price: "5650.40",
  },
  {
    node_id: "58",
    total_msg_accumilated: "1500",
    total_msg_claimed: "400",
    status: "Available",
    volume: "950",
    purchase_price: "5750.45",
  },
  {
    node_id: "59",
    total_msg_accumilated: "2000",
    total_msg_claimed: "650",
    status: "Available",
    volume: "1100",
    purchase_price: "5850.50",
  },
  {
    node_id: "60",
    total_msg_accumilated: "1700",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1200",
    purchase_price: "5950.55",
  },
  {
    node_id: "61",
    total_msg_accumilated: "1500",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1150",
    purchase_price: "6050.60",
  },
  {
    node_id: "62",
    total_msg_accumilated: "1600",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1250",
    purchase_price: "6150.65",
  },
  {
    node_id: "63",
    total_msg_accumilated: "1900",
    total_msg_claimed: "600",
    status: "Available",
    volume: "1300",
    purchase_price: "6250.70",
  },
  {
    node_id: "64",
    total_msg_accumilated: "1300",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1150",
    purchase_price: "6350.75",
  },
  {
    node_id: "65",
    total_msg_accumilated: "1800",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1200",
    purchase_price: "6450.80",
  },
  {
    node_id: "66",
    total_msg_accumilated: "1500",
    total_msg_claimed: "650",
    status: "Available",
    volume: "1050",
    purchase_price: "6550.85",
  },
  {
    node_id: "67",
    total_msg_accumilated: "2000",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1300",
    purchase_price: "6650.90",
  },
  {
    node_id: "68",
    total_msg_accumilated: "1700",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1150",
    purchase_price: "6750.95",
  },
  {
    node_id: "69",
    total_msg_accumilated: "1600",
    total_msg_claimed: "600",
    status: "Available",
    volume: "1100",
    purchase_price: "6850.00",
  },
  {
    node_id: "70",
    total_msg_accumilated: "1500",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1050",
    purchase_price: "6950.05",
  },
  {
    node_id: "71",
    total_msg_accumilated: "1800",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1200",
    purchase_price: "7050.10",
  },
  {
    node_id: "72",
    total_msg_accumilated: "1300",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1150",
    purchase_price: "7150.15",
  },
  {
    node_id: "73",
    total_msg_accumilated: "1900",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1300",
    purchase_price: "7250.20",
  },
  {
    node_id: "74",
    total_msg_accumilated: "1600",
    total_msg_claimed: "600",
    status: "Available",
    volume: "1200",
    purchase_price: "7350.25",
  },
  {
    node_id: "75",
    total_msg_accumilated: "2000",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1100",
    purchase_price: "7450.30",
  },
  {
    node_id: "76",
    total_msg_accumilated: "1700",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1050",
    purchase_price: "7550.35",
  },
  {
    node_id: "77",
    total_msg_accumilated: "1300",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1150",
    purchase_price: "7650.40",
  },
  {
    node_id: "78",
    total_msg_accumilated: "1800",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1200",
    purchase_price: "7750.45",
  },
  {
    node_id: "79",
    total_msg_accumilated: "1500",
    total_msg_claimed: "600",
    status: "Available",
    volume: "1100",
    purchase_price: "7850.50",
  },
  {
    node_id: "80",
    total_msg_accumilated: "2000",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1300",
    purchase_price: "7950.55",
  },
  {
    node_id: "81",
    total_msg_accumilated: "1900",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1150",
    purchase_price: "8050.60",
  },
  {
    node_id: "82",
    total_msg_accumilated: "1600",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1200",
    purchase_price: "8150.65",
  },
  {
    node_id: "83",
    total_msg_accumilated: "1700",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1100",
    purchase_price: "8250.70",
  },
  {
    node_id: "84",
    total_msg_accumilated: "1800",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1300",
    purchase_price: "8350.75",
  },
  {
    node_id: "85",
    total_msg_accumilated: "2000",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1200",
    purchase_price: "8450.80",
  },
  {
    node_id: "86",
    total_msg_accumilated: "1600",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1150",
    purchase_price: "8550.85",
  },
  {
    node_id: "87",
    total_msg_accumilated: "1300",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1000",
    purchase_price: "8650.90",
  },
  {
    node_id: "88",
    total_msg_accumilated: "1900",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1300",
    purchase_price: "8750.95",
  },
  {
    node_id: "89",
    total_msg_accumilated: "1500",
    total_msg_claimed: "600",
    status: "Available",
    volume: "1200",
    purchase_price: "8850.00",
  },
  {
    node_id: "90",
    total_msg_accumilated: "1800",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1100",
    purchase_price: "8950.05",
  },
  {
    node_id: "91",
    total_msg_accumilated: "1700",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1150",
    purchase_price: "9050.10",
  },
  {
    node_id: "92",
    total_msg_accumilated: "1600",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1300",
    purchase_price: "9150.15",
  },
  {
    node_id: "93",
    total_msg_accumilated: "1300",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1100",
    purchase_price: "9250.20",
  },
  {
    node_id: "94",
    total_msg_accumilated: "1900",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1200",
    purchase_price: "9350.25",
  },
  {
    node_id: "95",
    total_msg_accumilated: "1500",
    total_msg_claimed: "300",
    status: "Available",
    volume: "1050",
    purchase_price: "9450.30",
  },
  {
    node_id: "96",
    total_msg_accumilated: "2000",
    total_msg_claimed: "800",
    status: "Available",
    volume: "1250",
    purchase_price: "9550.35",
  },
  {
    node_id: "97",
    total_msg_accumilated: "1600",
    total_msg_claimed: "600",
    status: "Available",
    volume: "1100",
    purchase_price: "9650.40",
  },
  {
    node_id: "98",
    total_msg_accumilated: "1700",
    total_msg_claimed: "500",
    status: "Available",
    volume: "1150",
    purchase_price: "9750.45",
  },
  {
    node_id: "99",
    total_msg_accumilated: "1300",
    total_msg_claimed: "400",
    status: "Available",
    volume: "1000",
    purchase_price: "9850.50",
  },
  {
    node_id: "100",
    total_msg_accumilated: "2000",
    total_msg_claimed: "700",
    status: "Available",
    volume: "1250",
    purchase_price: "9950.55",
  },
];

export type Nodes = {
  node_id: string;
  total_msg_accumilated: string;
  total_msg_claimed: string;
  status: string;
  volume: string;
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
  //const router = useRouter();

  const filterFn = React.useCallback(
    (row: Row<Nodes>, columnId: string, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      const value = row.getValue(columnId) as string;
      return filterValue.includes(value);
    },
    []
  );

  const columns: ColumnDef<Nodes>[] = React.useMemo(
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
        filterFn: filterFn,
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
    [sortableColumns, filterFn]
  );

  const renderSortableHeader = (
    column: Column<Nodes>,
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
    filterFns: {
      customFilter: filterFn,
    },
  });

  const filterOptions = React.useMemo(() => {
    if (!filterColumn) return [];
    const options = new Set(
      data.map((item) => item[filterColumn as keyof Nodes])
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
