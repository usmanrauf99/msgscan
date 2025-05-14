import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StatusResponse } from "@/types/network";

export const useStatus = () => {
  return useQuery<StatusResponse>({
    queryKey: ["status"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/status`
      );
      return data;
    },
  });
};
