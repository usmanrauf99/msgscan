import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NetworkStats } from "@/types/network";

export const useNetworkStats = () => {
  return useQuery<NetworkStats>({
    queryKey: ["networkStats"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/network/stats`
      );
      return data;
    },
  });
};
