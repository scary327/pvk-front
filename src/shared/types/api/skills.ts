import { Skill } from "./profile"; // Предполагаем, что тип Skill уже есть и его можно импортировать

export interface SkillSearchQueryParams {
  page?: number;
  size?: number;
  query?: string;
}

export interface SortInfo {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface PageableInfo {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SkillSearchResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Skill[]; // Предполагаем, что здесь массив объектов Skill
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: PageableInfo;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// Типы для POST /api/skills/me
export interface AddSkillToMeRequest {
  skillId: number;
}

// Если от POST /api/skills/me ожидается специфический ответ, его тип нужно определить здесь
// export interface AddSkillToMeResponse { ... }
