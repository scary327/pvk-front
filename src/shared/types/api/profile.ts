export interface SkillCategory {
  id: number;
  name: string;
  color?: string; // Добавлено поле color
}

// export interface BestSkill {
//   id: number;
//   name: string;
//   rating: number;
// }

export interface Team {
  id: number;
  name: string;
  role: string;
}

export interface ProfileResponse {
  firstName: string;
  middleName: string;
  lastName: string;
  mainSkillCategory: SkillCategory;
  bestSkill: Skill;
  totalNumberSkills: number;
  teams: Team[];
  skillCategories: SkillCategory[];
}

// Новые типы для /api/profile/me/skill-categories
export interface Skill {
  id: number; // Предполагаем, что id числовые, как в примере
  name: string;
  rating: number;
  isNecessary: boolean;
}

export interface Category {
  id: number;
  name: string;
  color?: string; // Добавлено поле для цвета
}

export interface ProfileSkillCategory {
  category: Category;
  skills: Skill[];
  rating: number;
}

// Тип ответа для /api/profile/me/skill-categories
export type ProfileSkillCategoriesResponse = ProfileSkillCategory[];

// Тип для PUT /api/profile/main-skill-category
export interface UpdateMainSkillCategoryRequest {
  skillCategoryId: number;
}
