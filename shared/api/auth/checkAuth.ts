import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../interfaces/user";
import { client } from "../../utils/apiClient";

export const checkAuth = (refetchEnabled: boolean) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      const user = await client
        .get<User>("auth/check-login")
        .catch(() => {
          localStorage.removeItem("liberty-net-token");
          window.location.href = "/auth/login";
          queryClient.cancelQueries({ queryKey: ["check-auth"] });
        });
      return user;
    },
    enabled: refetchEnabled,
  });

  const userData = data?.data;

  return { userData, error, isLoading, refetch };
};
