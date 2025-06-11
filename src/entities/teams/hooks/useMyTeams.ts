import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { teamsApi } from "../api/teamsApi";
import { MyTeamsResponse } from "@/shared/types/api/teams";

export const myTeamsKeys = {
  all: ["myTeams"] as const,
  list: () => [...myTeamsKeys.all, "list"] as const,
};

type MyTeamsQueryKey = ReturnType<typeof myTeamsKeys.list>;

export const useMyTeams = <TData = MyTeamsResponse[]>(
  options?: Omit<
    UseQueryOptions<MyTeamsResponse[], Error, TData, MyTeamsQueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<MyTeamsResponse[], Error, TData, MyTeamsQueryKey>({
    queryKey: myTeamsKeys.list(),
    queryFn: teamsApi.getMyTeams,
    ...options,
  });
};
