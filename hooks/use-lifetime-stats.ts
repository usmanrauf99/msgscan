import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NetworkLifetimeStats } from "@/types/network";

export const useLifetimeStats = () => {
  return useQuery<NetworkLifetimeStats>({
    queryKey: ["lifetimeStats"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/network/stats/lifetime`
      );
      return data;
    },
  });
};
