import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { teamsApi } from "../api/teamsApi";
import { TeamMemberStatsResponse } from "@/shared/types/api/teams";

export const teamMemberStatsKeys = {
  all: ["teamMemberStats"] as const,
  detail: (teamId: number) =>
    [...teamMemberStatsKeys.all, "detail", teamId] as const,
};

type TeamMemberStatsQueryKey = ReturnType<typeof teamMemberStatsKeys.detail>;

export const useTeamMemberStats = <TData = TeamMemberStatsResponse[]>(
  teamId: number,
  options?: Omit<
    UseQueryOptions<
      TeamMemberStatsResponse[],
      Error,
      TData,
      TeamMemberStatsQueryKey
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery<
    TeamMemberStatsResponse[],
    Error,
    TData,
    TeamMemberStatsQueryKey
  >({
    queryKey: teamMemberStatsKeys.detail(teamId),
    queryFn: () => teamsApi.getTeamMemberStats(teamId),
    enabled: !!teamId, // Запрос будет выполнен только если teamId предоставлен
    ...options,
  });
};
