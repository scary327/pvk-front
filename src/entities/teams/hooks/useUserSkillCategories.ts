import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { teamsApi } from "../api/teamsApi";
import { UserSkillCategoriesResponse } from "@/shared/types/api/teams";

export const userSkillCategoriesKeys = {
  all: ["userSkillCategories"] as const,
  detail: (userId: number) =>
    [...userSkillCategoriesKeys.all, "detail", userId] as const,
};

type UserSkillCategoriesQueryKey = ReturnType<
  typeof userSkillCategoriesKeys.detail
>;

export const useUserSkillCategories = <TData = UserSkillCategoriesResponse>(
  userId: number,
  options?: Omit<
    UseQueryOptions<
      UserSkillCategoriesResponse,
      Error,
      TData,
      UserSkillCategoriesQueryKey
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery<
    UserSkillCategoriesResponse,
    Error,
    TData,
    UserSkillCategoriesQueryKey
  >({
    queryKey: userSkillCategoriesKeys.detail(userId),
    queryFn: () => teamsApi.getUserSkillCategories(userId),
    enabled: !!userId, // Запрос будет выполнен только если userId предоставлен
    ...options,
  });
};
