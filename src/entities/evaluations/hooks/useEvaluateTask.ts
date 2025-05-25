import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { evaluationsApi } from "../api/evaluationsApi";
import { EvaluateTaskRequest } from "@/shared/types/api/evaluations";
// import { AxiosError } from "axios"; // Раскомментировать, если нужна типизация ошибок Axios

// Определяем тип для переменных мутации, чтобы taskId передавался вместе с данными
interface EvaluateTaskVariables {
  taskId: number;
  data: EvaluateTaskRequest;
}

// Ключи запроса (если нужны для инвалидации или оптимистичных обновлений)
// export const taskEvaluationKeys = {
//   all: ["taskEvaluations"] as const,
//   detail: (taskId: number) => ["taskEvaluations", "detail", taskId] as const,
// };

export const useEvaluateTask = (
  options?: Omit<
    UseMutationOptions<
      void, // Тип ответа от API (пока void)
      Error, // Тип ошибки (можно заменить на AxiosError)
      EvaluateTaskVariables // Тип передаваемых в mutate переменных
    >,
    "mutationFn"
  >
) => {
  return useMutation<void, Error, EvaluateTaskVariables>(
    ({ taskId, data }) => evaluationsApi.evaluateTask(taskId, data),
    {
      // Здесь можно добавить onSuccess, onError, onSettled и т.д.
      // Например, для инвалидации запросов после успешной оценки:
      // onSuccess: (_, variables) => {
      //   queryClient.invalidateQueries(taskSkillsKeys.detail(variables.taskId));
      //   queryClient.invalidateQueries(myTasksKeys.list()); // Если нужно обновить список задач
      // },
      ...options,
    }
  );
};
