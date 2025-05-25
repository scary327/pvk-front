import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { skillCategoriesApi } from "../api/skillCategoriesApi";
import {
  SkillCategoriesResponse,
  GetSkillCategoriesQueryParams,
} from "@/shared/types/api/skillCategories";
// import { AxiosError } from "axios";

// Ключи запроса для категорий навыков
export const skillCategoriesKeys = {
  all: ["skillCategories"] as const,
  list: (params?: GetSkillCategoriesQueryParams) =>
    ["skillCategories", "list", params] as const,
};

export const useSkillCategories = (
  params?: GetSkillCategoriesQueryParams,
  options?: Omit<
    UseQueryOptions<
      SkillCategoriesResponse,
      Error, // или AxiosError
      SkillCategoriesResponse,
      ReturnType<typeof skillCategoriesKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<
    SkillCategoriesResponse,
    Error,
    SkillCategoriesResponse,
    ReturnType<typeof skillCategoriesKeys.list>
  >(
    skillCategoriesKeys.list(params),
    () => skillCategoriesApi.getSkillCategories(params),
    {
      // keepPreviousData: true, // Можно добавить, если используется на странице с пагинацией
      ...options,
    }
  );
};
