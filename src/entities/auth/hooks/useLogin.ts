import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { LoginRequest, LoginResponse } from "@/shared/types/api/auth";

export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginRequest>,
    "mutationFn"
  >
) => {
  const { onSuccess: callerOnSuccess, ...restOfOptions } = options || {};

  return useMutation<LoginResponse, Error, LoginRequest>(
    (credentials) => authApi.login(credentials),
    {
      onSuccess: (data, variables, context) => {
        // 1. Основная логика хука: сохранение токенов
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        // console.log("Токены сохранены хуком useLogin."); // Для отладки

        // 2. Вызов onSuccess, переданного из компонента (если есть)
        if (callerOnSuccess) {
          callerOnSuccess(data, variables, context);
        }
      },
      // Передаем остальные опции, которые могли быть переданы в хук
      ...restOfOptions,
    }
  );
};
