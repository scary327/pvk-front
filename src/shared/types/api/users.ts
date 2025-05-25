// Типы для запроса POST /api/users/search

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
  // Предполагаем, что SortInfo и PageableInfo похожи на те, что в SkillSearchResponse
  // Если они отличаются, их нужно будет определить здесь или импортировать
  // Для простоты пока не будем добавлять SortInfo и PageableInfo,
  // так как они не используются напрямую в onSuccess callback хука useUserSearch
  // но если они нужны, их можно добавить по аналогии с SkillSearchResponse
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
  // pageable: PageableInfo; // Опционально, если нужно
}
