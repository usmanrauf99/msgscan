"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search } from "lucide-react";

export function AdvancedSearch({ maxLength = 150 }: { maxLength?: number }) {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("all");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchText.trim() || searchText.length > maxLength) return;

    if (searchType === "transactions") {
      router.push(`/transactions/${searchText}`);
    } else if (searchType === "addresses") {
      router.push(`/address/${searchText}`);
    } else if (searchType === "blocks") {
      router.push(`/block/${searchText}`);
    } else {
      if (/^0x[a-fA-F0-9]{64}$/.test(searchText)) {
        router.push(`/transactions/${searchText}`);
      } else if (/^0x[a-fA-F0-9]{40}$/.test(searchText)) {
        router.push(`/address/${searchText}`);
      } else if (/^(0x)?[0-9]{1,8}$/.test(searchText)) {
        router.push(`/block/${searchText}`);
      } else {
        router.push(`/search/${searchText}`);
      }
    }
  };

  return (
    <div className="relative flex">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5 h-4 w-4" />
      <Input
        type="search"
        placeholder="Search by address / transaction / block"
        className="w-full sm:h-12 h-11 bg-card pl-10 pr-32"
        value={searchText}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            setSearchText(e.target.value);
          }
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        maxLength={maxLength}
      />
      <Select value={searchType} onValueChange={setSearchType}>
        <SelectTrigger className="absolute sm:right-2 right-1.5 sm:top-2 top-1.5 bottom-0 w-fit h-8 text-muted-foreground text-xs bg-secondary">
          <SelectValue placeholder="All Filters" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Filters</SelectItem>
          <SelectItem value="transactions">Transactions</SelectItem>
          <SelectItem value="addresses">Addresses</SelectItem>
          <SelectItem value="blocks">Blocks</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
