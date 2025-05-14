import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Transaction } from "@/types/network";

interface TransactionResponse {
  transaction: Transaction;
}

export const useTransaction = (transactionId: string) => {
  return useQuery<Transaction>({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      const { data } = await axios.get<TransactionResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/${transactionId}`
      );
      return data.transaction;
    },
    enabled: !!transactionId,
  });
};
