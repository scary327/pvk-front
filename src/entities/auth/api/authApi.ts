import { api } from "@/shared/api/axios";
import { LoginRequest, LoginResponse } from "@/shared/types/api/auth";

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    return data;
  },
};
