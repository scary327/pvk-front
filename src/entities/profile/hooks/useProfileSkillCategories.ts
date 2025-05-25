import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/profileApi";
import { ProfileSkillCategoriesResponse } from "@/shared/types/api/profile";

// Ключи запроса для категорий навыков профиля
export const profileSkillCategoriesKeys = {
  all: ["profileSkillCategories"] as const,
  list: () => [...profileSkillCategoriesKeys.all, "list"] as const,
  // Можно добавить детализацию ключей, если потребуется, например, по ID пользователя
};

// Тип ключа запроса
type ProfileSkillCategoriesQueryKey = ReturnType<
  typeof profileSkillCategoriesKeys.list
>;

// Хук для получения категорий навыков профиля
export const useProfileSkillCategories = <
  TData = ProfileSkillCategoriesResponse
>(
  options?: Omit<
    UseQueryOptions<
      ProfileSkillCategoriesResponse,
      Error,
      TData,
      ProfileSkillCategoriesQueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<
    ProfileSkillCategoriesResponse,
    Error,
    TData,
    ProfileSkillCategoriesQueryKey
  >({
    queryKey: profileSkillCategoriesKeys.list(),
    queryFn: profileApi.getProfileSkillCategories,
    ...options,
  });
};
