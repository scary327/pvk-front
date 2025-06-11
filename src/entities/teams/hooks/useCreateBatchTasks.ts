import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { teamsApi } from "../api/teamsApi";
import { BatchTasksRequest } from "@/shared/types/api/teams";
// import { AxiosError } from "axios"; // Если нужна типизация ошибок Axios

export const useCreateBatchTasks = (
  options?: UseMutationOptions<
    unknown, // Тип данных, возвращаемых функцией мутации
    Error, // Тип ошибки (можно заменить на AxiosError, если используется)
    BatchTasksRequest, // Тип переменных, передаваемых в mutate
    unknown // Тип контекста, если используется onMutate
  >
) => {
  return useMutation<unknown, Error, BatchTasksRequest, unknown>(
    teamsApi.createBatchTasks,
    options
  );
};
