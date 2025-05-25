import { api } from "@/shared/api/axios";
import {
  MyTasksResponse,
  GetMyTasksQueryParams,
  TaskSkillsResponse,
  EvaluateTaskRequest,
  EvaluationTask,
} from "@/shared/types/api/evaluations";

export const evaluationsApi = {
  async getMyTasks(params?: GetMyTasksQueryParams): Promise<MyTasksResponse> {
    const { data } = await api.get<MyTasksResponse>("/evaluations/tasks/my", {
      params: params, // Передаем параметры page и size
    });
    return data;
  },

  // Новая функция для получения навыков задачи
  async getTaskSkills(taskId: number): Promise<TaskSkillsResponse> {
    // taskId должен быть строкой для URL, если API ожидает /tasks/123/skills
    // Однако, если API может принимать число, то можно оставить как есть.
    // Для безопасности преобразуем в строку.
    const { data } = await api.get<TaskSkillsResponse>(
      `/evaluations/tasks/${taskId.toString()}/skills`
    );
    return data;
  },

  // Новая функция для оценки задачи
  async evaluateTask(
    taskId: number,
    requestBody: EvaluateTaskRequest
  ): Promise<void> {
    // Предполагаем, что ответ void, или можно указать конкретный тип ответа
    await api.post(
      `/evaluations/tasks/${taskId.toString()}/evaluate`,
      requestBody
    );
    // Если API возвращает данные, можно сделать: return response.data;
  },

  // Новая функция для получения деталей задачи
  async getTaskDetails(taskId: number): Promise<EvaluationTask> {
    const { data } = await api.get<EvaluationTask>(
      `/evaluations/tasks/${taskId.toString()}`
    );
    return data;
  },
};
