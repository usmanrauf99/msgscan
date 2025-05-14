import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AddressTransactionsResponse } from "@/types/network";

export const useAddressTransactions = (
  addressId: string,
  page: number = 1,
  pageSize: number = 20,
  search: string = ""
) => {
  return useQuery<AddressTransactionsResponse>({
    queryKey: ["addressTransactions", addressId, page, pageSize, search],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address/${addressId}/transactions`,
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
    enabled: !!addressId,
  });
};
