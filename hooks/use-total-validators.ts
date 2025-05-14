import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TotalValidatorsResponse {
  totalValidators: number;
}

export const useTotalValidators = () => {
  return useQuery<TotalValidatorsResponse>({
    queryKey: ["totalValidators"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/totalValidators`
      );
      return data;
    },
  });
};
