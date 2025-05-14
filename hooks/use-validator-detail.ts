import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ValidatorDetailResponse } from "@/types/network";

export const useValidatorDetail = (address: string) => {
  return useQuery<ValidatorDetailResponse>({
    queryKey: ["validator", address],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/validator/${address}`
      );
      return data;
    },
    enabled: !!address,
  });
};
