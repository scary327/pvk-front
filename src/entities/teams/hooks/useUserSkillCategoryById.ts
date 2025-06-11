import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { teamsApi } from "../api/teamsApi";
import { UserSkillCategoryResponse } from "@/shared/types/api/teams";

export const userSkillCategoryKeys = {
  all: ["userSkillCategory"] as const,
  detail: (userId: number, categoryId: number) =>
    [...userSkillCategoryKeys.all, "detail", userId, categoryId] as const,
};

type UserSkillCategoryQueryKey = ReturnType<
  typeof userSkillCategoryKeys.detail
>;

export const useUserSkillCategoryById = <TData = UserSkillCategoryResponse>(
  userId: number,
  categoryId: number,
  options?: Omit<
    UseQueryOptions<
      UserSkillCategoryResponse,
      Error,
      TData,
      UserSkillCategoryQueryKey
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery<
    UserSkillCategoryResponse,
    Error,
    TData,
    UserSkillCategoryQueryKey
  >({
    queryKey: userSkillCategoryKeys.detail(userId, categoryId),
    queryFn: () => teamsApi.getUserSkillCategoryById(userId, categoryId),
    enabled: !!userId && !!categoryId, // Запрос будет выполнен только если оба параметра предоставлены
    ...options,
  });
};
