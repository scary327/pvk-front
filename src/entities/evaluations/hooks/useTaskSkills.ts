import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { evaluationsApi } from "../api/evaluationsApi";
import { TaskSkillsResponse } from "@/shared/types/api/evaluations";
// import { AxiosError } from "axios";

// Ключи запроса для навыков задачи
export const taskSkillsKeys = {
  all: ["taskSkills"] as const, // Общий ключ для всех навыков задач
  detail: (taskId: number) => ["taskSkills", "detail", taskId] as const, // Ключ для навыков конкретной задачи
};

export const useTaskSkills = (
  taskId: number,
  options?: Omit<
    UseQueryOptions<
      TaskSkillsResponse,
      Error,
      TaskSkillsResponse,
      ReturnType<typeof taskSkillsKeys.detail>
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery<
    TaskSkillsResponse,
    Error,
    TaskSkillsResponse,
    ReturnType<typeof taskSkillsKeys.detail>
  >(taskSkillsKeys.detail(taskId), () => evaluationsApi.getTaskSkills(taskId), {
    enabled: !!taskId, // Запрос будет выполнен только если taskId валидный (не 0, если 0 не используется как валидный ID)
    // Можно добавить и другие опции, например, staleTime, cacheTime и т.д.
    ...options,
  });
};
