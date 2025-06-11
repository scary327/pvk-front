import { api } from "@/shared/api/axios";
import {
  MyTeamsResponse,
  TeamMemberStatsResponse,
  UserSkillCategoriesResponse,
  UserSkillCategoryResponse,
  BatchTasksRequest,
} from "@/shared/types/api/teams";

export const teamsApi = {
  async getMyTeams(): Promise<MyTeamsResponse[]> {
    const { data } = await api.get<MyTeamsResponse[]>("/teams/my");
    return data;
  },

  async getTeamMemberStats(teamId: number): Promise<TeamMemberStatsResponse[]> {
    const { data } = await api.get<TeamMemberStatsResponse[]>(
      `/teams/${teamId}/member-stats`
    );
    return data;
  },

  async getUserSkillCategories(
    userId: number
  ): Promise<UserSkillCategoriesResponse> {
    const { data } = await api.get<UserSkillCategoriesResponse>(
      `/skills/users/${userId}/categories`
    );
    return data;
  },

  async getUserSkillCategoryById(
    userId: number,
    categoryId: number
  ): Promise<UserSkillCategoryResponse> {
    const { data } = await api.get<UserSkillCategoryResponse>(
      `/skills/users/${userId}/categories/${categoryId}`
    );
    return data;
  },

  async createBatchTasks(requestBody: BatchTasksRequest): Promise<unknown> {
    const { data } = await api.post("/evaluations/tasks/batch", requestBody);
    return data;
  },
};
