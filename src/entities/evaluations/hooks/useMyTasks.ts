import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { evaluationsApi } from "../api/evaluationsApi";
import {
  MyTasksResponse,
  GetMyTasksQueryParams,
} from "@/shared/types/api/evaluations";
// import { AxiosError } from "axios"; // Раскомментируйте, если нужна типизация ошибок Axios

// Ключи запроса для задач на оценку
export const myTasksKeys = {
  all: ["myTasks"] as const, // Общий ключ для всех "моих задач на оценку"
  list: (params?: GetMyTasksQueryParams) =>
    ["myTasks", "list", params] as const, // Ключ для списка с параметрами
};

// Тип для опций хука, если нужно передавать специфичные UseQueryOptions
// type UseMyTasksOptions = Omit<UseQueryOptions<MyTasksResponse, Error, MyTasksResponse, ReturnType<typeof myTasksKeys.list>>, 'queryKey' | 'queryFn'>;

export const useMyTasks = (
  params?: GetMyTasksQueryParams,
  options?: Omit<
    UseQueryOptions<
      MyTasksResponse,
      Error,
      MyTasksResponse,
      ReturnType<typeof myTasksKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<
    MyTasksResponse,
    Error,
    MyTasksResponse,
    ReturnType<typeof myTasksKeys.list>
  >(
    myTasksKeys.list(params), // Ключ запроса, включает параметры для корректного кеширования
    () => evaluationsApi.getMyTasks(params), // Функция запроса
    {
      keepPreviousData: true, // Полезно для пагинации, чтобы старые данные не пропадали при запросе новой страницы
      ...options, // Дополнительные опции, переданные в хук
    }
  );
};
