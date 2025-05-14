import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionsResponse } from "@/types/network";

export const useTransactions = (
  page: number = 1,
  pageSize: number = 20,
  search: string = ""
) => {
  return useQuery<TransactionsResponse>({
    queryKey: ["transactions", page, pageSize, search],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/recent`,
        {
          params: {
            page,
            pageSize,
            search: search || undefined,
          },
        }
      );
      return data;
    },
  });
};
