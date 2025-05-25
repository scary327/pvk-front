import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { usersApi } from "../api/usersApi";
import {
  UserSearchRequestBody,
  UserSearchQueryParams,
  UserSearchResponse,
} from "@/shared/types/api/users";

interface UserSearchVariables {
  params: UserSearchQueryParams;
  body: UserSearchRequestBody;
}

export const useUserSearch = (
  options?: Omit<
    UseMutationOptions<UserSearchResponse, Error, UserSearchVariables>,
    "mutationFn"
  >
) => {
  return useMutation<UserSearchResponse, Error, UserSearchVariables>(
    (variables) => usersApi.searchUsers(variables.params, variables.body),
    {
      // Здесь можно добавить onSuccess, onError, onSettled и другие опции
      // Например, для инвалидации связанных запросов или обработки состояния UI
      ...options,
    }
  );
};
