import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ValidatorsResponse } from "@/types/network";

export const useValidators = () => {
  return useQuery<ValidatorsResponse>({
    queryKey: ["validators"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/validators`
      );
      return data;
    },
  });
};
