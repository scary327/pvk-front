// Типы для запроса POST /api/users/search

import {PageableInfo} from "@/shared/types/api/skills";

export interface SkillCriterion {
  skillId: number;
  minRating: number;
}

export interface UserSearchRequestBody {
  query?: string; // Сделаем query опциональным, так как он может быть пустым
  skillCriteria?: SkillCriterion[]; // Тоже опциональным
}

export interface UserSearchQueryParams {
  page?: number;
  size?: number;
}

// Типы для ответа от POST /api/users/search

// Если у вас уже есть общие типы Team, SkillCategory, Skill в /shared/types/api/profile.ts или другом месте,
// их можно импортировать и переиспользовать. Для примера создам специфичные, но лучше переиспользовать.

export interface TeamInUserSearch {
  id: number;
  name: string;
  role: string;
}

export interface SkillCategoryInUserSearch {
  id: number;
  name: string;
  color?: string; // Добавлено поле для цвета
}

export interface TopSkillInUserSearch {
  id: number;
  name: string;
  rating: number;
}

export interface UserSearchResultItem {
  userId: number;
  firstName: string;
  middleName?: string; // middleName может отсутствовать
  lastName: string;
  teams: TeamInUserSearch[];
  numberCourse: number;
  education: "BACCALAUREATE" | "MAGISTRACY" | "SPECIALTY" | "POSTGRADUATE"; // Пример возможных значений, уточните при необходимости
  mainSkillCategory: SkillCategoryInUserSearch;
  topSkills: TopSkillInUserSearch[];
  averageSkillRating: number;
}

// export type UserSearchResponse = UserSearchResultItem[]; // Старый тип

// Новый тип UserSearchResponse с пагинацией
export interface UserSearchResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: UserSearchResultItem[];
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
  pageable: PageableInfo; // Опционально, если нужно
}
