import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { skillsApi } from "../api/skillsApi";
import {
  SkillSearchQueryParams,
  SkillSearchResponse,
} from "@/shared/types/api/skills";

export const skillSearchKeys = {
  all: ["skillSearch"] as const,
  list: (params: SkillSearchQueryParams) =>
    [...skillSearchKeys.all, "list", params] as const,
};

type SkillSearchQueryKey = ReturnType<typeof skillSearchKeys.list>;

export const useSkillSearch = <TData = SkillSearchResponse>(
  params: SkillSearchQueryParams,
  options?: Omit<
    UseQueryOptions<SkillSearchResponse, Error, TData, SkillSearchQueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SkillSearchResponse, Error, TData, SkillSearchQueryKey>({
    queryKey: skillSearchKeys.list(params),
    queryFn: () => skillsApi.searchSkills(params),
    ...options,
  });
};
