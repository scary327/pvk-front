import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { evaluationsApi } from "../api/evaluationsApi";
import { EvaluationTask } from "@/shared/types/api/evaluations";
// import { AxiosError } from "axios";

// Ключи запроса для деталей задачи
export const taskDetailsKeys = {
  all: ["taskDetails"] as const,
  detail: (taskId: number) => ["taskDetails", "detail", taskId] as const,
};

export const useTaskDetails = (
  taskId: number,
  options?: Omit<
    UseQueryOptions<
      EvaluationTask,
      Error, // Или AxiosError
      EvaluationTask,
      ReturnType<typeof taskDetailsKeys.detail>
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery<
    EvaluationTask,
    Error,
    EvaluationTask,
    ReturnType<typeof taskDetailsKeys.detail>
  >(
    taskDetailsKeys.detail(taskId),
    () => evaluationsApi.getTaskDetails(taskId),
    {
      enabled: !!taskId, // Запрос будет выполнен только если taskId валидный
      // Можно добавить и другие опции, например, staleTime, cacheTime и т.д.
      ...options,
    }
  );
};
