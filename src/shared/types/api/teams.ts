// Типы для teams API

import { Skill } from "./profile";

export interface MyTeamsResponse {
  teamId: number;
  teamName: string;
  skillCategoryId: number;
  skillCategoryName: string;
  skillCategoryColor: string;
}

export interface TeamMemberStatsResponse {
  teamId: number;
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  skillCategoryId: number;
  skillCategoryName: string;
  skillCategoryColor: string;
  averageRating: number;
  currentUser: boolean;
}

export type UserSkillCategoriesResponse = Skill[];

export type UserSkillCategoryResponse = Skill[];

export interface Task {
  evaluatorMemberId: number;
  assigneeMemberId: number;
  leadMemberId: number;
  title: string;
  description: string;
  deadlineCompletion: string;
  status: string;
  userSkillIds: number[];
}

export interface BatchTasksRequest {
  tasks: Task[];
}
