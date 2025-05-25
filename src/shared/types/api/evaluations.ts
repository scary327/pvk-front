// Типы для GET /api/evaluations/tasks/my

export interface EvaluationTaskUser {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  skillCategoryName: string;
  skillCategoryColor?: string;
}

export interface EvaluationTask {
  id: number;
  evaluator: EvaluationTaskUser;
  assignee: EvaluationTaskUser;
  lead: EvaluationTaskUser;
  title: string;
  description: string;
  deadlineCompletion: string;
  status: string;
}

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

export interface MyTasksResponse {
  totalElements: number;
  totalPages: number;
  pageable: PageableInfo;
  numberOfElements: number;
  size: number;
  content: EvaluationTask[];
  number: number;
  sort: PageableSort;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface GetMyTasksQueryParams {
  page?: number;
  size?: number;
}

// Типы для GET /api/evaluations/tasks/{taskId}/skills

export interface TaskSkill {
  id: number;
  name: string;
  rating: number;
}

// Ответ от API - это массив TaskSkill
export type TaskSkillsResponse = TaskSkill[];

// Типы для POST /api/evaluations/tasks/{taskId}/evaluate
export interface SkillEvaluation {
  skillId: number;
  rating: number;
  feedback?: string; // Сделаем обратную связь опциональной
}

export interface EvaluateTaskRequest {
  skillEvaluations: SkillEvaluation[];
}
