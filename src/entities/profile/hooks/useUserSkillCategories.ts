import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { profileApi } from "../api/profileApi";
import { ProfileSkillCategoriesResponse } from "@/shared/types/api/profile";
// import { AxiosError } from "axios";

export const userSkillCategoriesKeys = {
  all: ["userSkillCategories"] as const,
  detail: (userId: string) =>
    ["userSkillCategories", "detail", userId] as const,
  // listByUserId: (userId: string) => ["userSkillCategories", "list", userId] as const, // Альтернативный вариант ключа для списка по ID
};

export const useUserSkillCategories = (
  userId: string,
  options?: Omit<
    UseQueryOptions<
      ProfileSkillCategoriesResponse,
      Error,
      ProfileSkillCategoriesResponse,
      ReturnType<typeof userSkillCategoriesKeys.detail>
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery<
    ProfileSkillCategoriesResponse,
    Error,
    ProfileSkillCategoriesResponse,
    ReturnType<typeof userSkillCategoriesKeys.detail>
  >(
    userSkillCategoriesKeys.detail(userId),
    () => profileApi.getUserSkillCategories(userId),
    {
      enabled: !!userId, // Запрос будет выполнен только если userId предоставлен
      ...options,
    }
  );
};
