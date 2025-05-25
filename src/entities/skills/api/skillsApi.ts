import { api } from "@/shared/api/axios";
import { Skill } from "@/shared/types/api/profile"; // Используем существующий тип Skill
import {
  SkillSearchQueryParams,
  SkillSearchResponse,
  AddSkillToMeRequest, // Импортируем новый тип запроса
} from "@/shared/types/api/skills"; // Импортируем новые типы

// Предполагаем, что ответ от /api/skills это Skill[]
export type SkillsListResponse = Skill[];

export const skillsApi = {
  async getAllSkills(): Promise<SkillsListResponse> {
    const { data } = await api.get<SkillsListResponse>("/skills"); // Укажите правильный URL, если он другой
    return data;
  },

  async searchSkills(
    params: SkillSearchQueryParams
  ): Promise<SkillSearchResponse> {
    const { data } = await api.get<SkillSearchResponse>("/skills/search", {
      params,
    });
    return data;
  },

  async addSkillToMe(requestBody: AddSkillToMeRequest): Promise<void> {
    // Предполагаем, что ответ пустой (void)
    // Если API возвращает данные, замените void на соответствующий тип ответа
    await api.post("/skills/me", requestBody);
    // Если нужно вернуть данные из ответа:
    // const { data } = await api.post<ResponseType>("/skills/me", requestBody);
    // return data;
  },

  async removeSkillFromMe(skillId: number): Promise<void> {
    // Предполагаем, что ответ пустой (void)
    await api.delete(`/skills/me/skill/${skillId}`);
  },
};
