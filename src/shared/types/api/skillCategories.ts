// Типы для /api/skill-categories

// Предполагаем, что PageableInfo и PageableSort уже существуют
// и могут быть импортированы из другого файла (например, evaluations.ts или общего файла с типами пагинации)
// Если нет, их нужно будет определить здесь или импортировать.
// Для примера, будем считать, что они будут импортированы позже или определены в этом файле, если потребуется.

// import { PageableInfo, PageableSort } from './commonPaginationTypes'; // Пример импорта

// Для простоты пока определим их здесь, если они не были найдены в других местах
// В реальном проекте лучше вынести их в общий файл
export interface PageableSort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface PageableInfo {
  unpaged: boolean;
  pageNumber: number;
  paged: boolean;
  pageSize: number;
  offset: number;
  sort: PageableSort;
}

export interface SkillCategoryItem {
  id: number;
  name: string;
  color: string; // В вашем примере color обязательный
}

export interface GetSkillCategoriesQueryParams {
  page?: number;
  size?: number;
  // Тут могут быть и другие параметры фильтрации или сортировки, если API их поддерживает
}

export interface SkillCategoriesResponse {
  totalElements: number;
  totalPages: number;
  pageable: PageableInfo;
  numberOfElements: number;
  size: number;
  content: SkillCategoryItem[];
  number: number;
  sort: PageableSort;
  first: boolean;
  last: boolean;
  empty: boolean;
}
