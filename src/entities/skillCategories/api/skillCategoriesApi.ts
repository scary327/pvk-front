import { api } from "@/shared/api/axios";
import {
  SkillCategoriesResponse,
  GetSkillCategoriesQueryParams,
} from "@/shared/types/api/skillCategories";

export const skillCategoriesApi = {
  async getSkillCategories(
    params?: GetSkillCategoriesQueryParams
  ): Promise<SkillCategoriesResponse> {
    const { data } = await api.get<SkillCategoriesResponse>(
      "/skill-categories",
      {
        params: params, // Передаем параметры page, size и другие, если есть
      }
    );
    return data;
  },
};
