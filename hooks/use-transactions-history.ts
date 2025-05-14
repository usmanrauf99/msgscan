import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface TransactionHistoryItem {
  date: string;
  transaction_count: number;
}

export interface TransactionHistoryResponse {
  data: {
    transactions_by_date: TransactionHistoryItem[];
  };
}

export const useTransactionsHistory = (days: number = 30) => {
  return useQuery<TransactionHistoryResponse>({
    queryKey: ["transactionsHistory", days],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/countHistory?days=${days}`
      );
      return data;
    },
  });
};
