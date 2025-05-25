import {
  ProfileResponse,
  ProfileSkillCategoriesResponse,
  UpdateMainSkillCategoryRequest,
} from "@/shared/types/api/profile";
import { api } from "@/shared/api/axios";

export const profileApi = {
  async getCurrentProfile(): Promise<ProfileResponse> {
    const { data } = await api.get<ProfileResponse>("/profile/me");
    return data;
  },

  async getProfileSkillCategories(): Promise<ProfileSkillCategoriesResponse> {
    const { data } = await api.get<ProfileSkillCategoriesResponse>(
      "/profile/me/skill-categories"
    );
    return data;
  },

  // Новый метод для получения профиля пользователя по ID
  async getUserProfile(userId: string): Promise<ProfileResponse> {
    const { data } = await api.get<ProfileResponse>(`/profile/${userId}`);
    return data;
  },

  // Новый метод для получения категорий навыков пользователя по ID
  async getUserSkillCategories(
    userId: string
  ): Promise<ProfileSkillCategoriesResponse> {
    const { data } = await api.get<ProfileSkillCategoriesResponse>(
      `/profile/${userId}/skill-categories`
    );
    return data;
  },

  // Новая функция для обновления основной категории навыков
  async updateMainSkillCategory(
    requestBody: UpdateMainSkillCategoryRequest
  ): Promise<void> {
    await api.put("/profile/main-skill-category", requestBody);
    // Если API возвращает какие-то данные, их можно вернуть здесь
  },
};
