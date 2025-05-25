import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { skillsApi, SkillsListResponse } from "../api/skillsApi";
// import { Skill } from "@/shared/types/api/profile"; // Skill не используется здесь напрямую

export const skillsKeys = {
  all: ["skills"] as const,
  list: () => [...skillsKeys.all, "list"] as const,
};

type SkillsQueryKey = ReturnType<typeof skillsKeys.list>;

export const useAllSkills = <TData = SkillsListResponse>(
  options?: Omit<
    UseQueryOptions<SkillsListResponse, Error, TData, SkillsQueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SkillsListResponse, Error, TData, SkillsQueryKey>({
    queryKey: skillsKeys.list(),
    queryFn: skillsApi.getAllSkills,
    ...options,
  });
};
