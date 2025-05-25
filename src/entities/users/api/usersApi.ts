import { api } from "@/shared/api/axios";
import {
  UserSearchRequestBody,
  UserSearchQueryParams,
  UserSearchResponse,
} from "@/shared/types/api/users";

export const usersApi = {
  async searchUsers(
    params: UserSearchQueryParams,
    body: UserSearchRequestBody
  ): Promise<UserSearchResponse> {
    // Query-параметры добавляются к URL через опцию `params` в axios
    const { data } = await api.post<UserSearchResponse>("/users/search", body, {
      params,
    });
    return data;
  },
};
