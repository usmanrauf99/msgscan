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
  Loader2Icon,
  AlertCircleIcon,
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
import { useValidators } from "@/hooks/use-validators";

const mockData: Nodes[] = [
  {
    node_id: "1",
    total_msg_accumilated: "1000",
    total_msg_claimed: "500",
    status: "Secured",
    volume: "1000",
    purchase_price: "2000",
  },
  {
    node_id: "2",
    total_msg_accumilated: "2300",
    total_msg_claimed: "200",
    status: "Secured",
    volume: "400",
    purchase_price: "2156",
  },
  {
    node_id: "3",
    total_msg_accumilated: "522",
    total_msg_claimed: "250",
    status: "Secured",
    volume: "2300",
    purchase_price: "2323",
  },
  {
    node_id: "4",
    total_msg_accumilated: "522",
    total_msg_claimed: "250",
    status: "Secured",
    volume: "2300",
    purchase_price: "2504",
  },
  {
    node_id: "5",
    total_msg_accumilated: "1000",
    total_msg_claimed: "500",
    status: "Secured",
    volume: "1000",
    purchase_price: "2699",
  },
  {
    node_id: "6",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "2909",
  },
  {
    node_id: "7",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "3135",
  },
  {
    node_id: "8",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "3379",
  },
  {
    node_id: "9",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "3642",
  },
  {
    node_id: "10",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "3926",
  },
  {
    node_id: "11",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "4231",
  },
  {
    node_id: "12",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "4561",
  },
  {
    node_id: "13",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "4915",
  },
  {
    node_id: "14",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "5298",
  },
  {
    node_id: "15",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "5710",
  },
  {
    node_id: "16",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "6155",
  },
  {
    node_id: "17",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "6634",
  },
  {
    node_id: "18",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "7150",
  },
  {
    node_id: "19",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "7706",
  },
  {
    node_id: "20",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "8306",
  },
  {
    node_id: "21",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "8952",
  },
  {
    node_id: "22",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "9649",
  },
  {
    node_id: "23",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "10400",
  },
  {
    node_id: "24",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "11209",
  },
  {
    node_id: "25",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "12081",
  },
  {
    node_id: "26",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "13021",
  },
  {
    node_id: "27",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "14034",
  },
  {
    node_id: "28",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "15126",
  },
  {
    node_id: "29",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "16304",
  },
  {
    node_id: "30",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "17572",
  },
  {
    node_id: "31",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "18940",
  },
  {
    node_id: "32",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "20413",
  },
  {
    node_id: "33",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "22002",
  },
  {
    node_id: "34",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "23714",
  },
  {
    node_id: "35",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "25559",
  },
  {
    node_id: "36",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "27548",
  },
  {
    node_id: "37",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "29692",
  },
  {
    node_id: "38",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "32003",
  },
  {
    node_id: "39",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "34493",
  },
  {
    node_id: "40",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "37177",
  },
  {
    node_id: "41",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "40070",
  },
  {
    node_id: "42",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "43188",
  },
  {
    node_id: "43",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "46549",
  },
  {
    node_id: "44",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "50171",
  },
  {
    node_id: "45",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "54075",
  },
  {
    node_id: "46",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "58283",
  },
  {
    node_id: "47",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "62819",
  },
  {
    node_id: "48",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "67707",
  },
  {
    node_id: "49",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "72976",
  },
  {
    node_id: "50",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "78654",
  },
  {
    node_id: "51",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "84775",
  },
  {
    node_id: "52",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "91372",
  },
  {
    node_id: "53",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "98482",
  },
  {
    node_id: "54",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "106146",
  },
  {
    node_id: "55",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "114405",
  },
  {
    node_id: "56",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "123308",
  },
  {
    node_id: "57",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "132903",
  },
  {
    node_id: "58",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "143245",
  },
  {
    node_id: "59",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "154392",
  },
  {
    node_id: "60",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "166406",
  },
  {
    node_id: "61",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "179356",
  },
  {
    node_id: "62",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "193312",
  },
  {
    node_id: "63",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "208355",
  },
  {
    node_id: "64",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "224569",
  },
  {
    node_id: "65",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "242044",
  },
  {
    node_id: "66",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "260879",
  },
  {
    node_id: "67",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "281179",
  },
  {
    node_id: "68",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "303060",
  },
  {
    node_id: "69",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "326643",
  },
  {
    node_id: "70",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "352061",
  },
  {
    node_id: "71",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "379457",
  },
  {
    node_id: "72",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "408985",
  },
  {
    node_id: "73",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "440810",
  },
  {
    node_id: "74",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "475113",
  },
  {
    node_id: "75",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "512084",
  },
  {
    node_id: "76",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "551933",
  },
  {
    node_id: "77",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "594882",
  },
  {
    node_id: "78",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "641173",
  },
  {
    node_id: "79",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "691067",
  },
  {
    node_id: "80",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "744843",
  },
  {
    node_id: "81",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "802804",
  },
  {
    node_id: "82",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "865276",
  },
  {
    node_id: "83",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "932608",
  },
  {
    node_id: "84",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1005180",
  },
  {
    node_id: "85",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1083400",
  },
  {
    node_id: "86",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1167706",
  },
  {
    node_id: "87",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1258573",
  },
  {
    node_id: "88",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1356510",
  },
  {
    node_id: "89",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1462069",
  },
  {
    node_id: "90",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1575841",
  },
  {
    node_id: "91",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1698468",
  },
  {
    node_id: "92",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1830636",
  },
  {
    node_id: "93",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "1973089",
  },
  {
    node_id: "94",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "2126628",
  },
  {
    node_id: "95",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "2292114",
  },
  {
    node_id: "96",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "2470478",
  },
  {
    node_id: "97",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "2662721",
  },
  {
    node_id: "98",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "2869925",
  },
  {
    node_id: "99",
    total_msg_accumilated: "0",
    total_msg_claimed: "0",
    status: "Available",
    volume: "0",
    purchase_price: "3093251",
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

  const { data: validatorsData, isLoading, isError, error } = useValidators();

  const tableData = React.useMemo(() => {
    const result = [...mockData];

    if (validatorsData?.validators) {
      validatorsData.validators.forEach((validator, index) => {
        if (index < 5) {
          result[index] = {
            ...result[index],
            node_id: (index + 1).toString(),
            total_msg_accumilated: validator.transactionsSigned.toString(),
            total_msg_claimed: validator.transactionsSubmitted.toString(),
          };
        }
      });
    }

    return result;
  }, [validatorsData]);

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
    filterFns: {
      customFilter: filterFn,
    },
  });

  const filterOptions = React.useMemo(() => {
    if (!filterColumn) return [];
    const options = new Set(
      tableData.map((item) => item[filterColumn as keyof Nodes])
    );
    return Array.from(options);
  }, [filterColumn, tableData]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-8 min-h-[500px]">
        <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    console.error("Error loading validators:", error);
    return (
      <div className="w-full">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 flex items-center">
          <AlertCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
          <p className="text-yellow-700 text-sm">
            Could not load validators data. Showing sample data instead.
          </p>
        </div>

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
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
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
