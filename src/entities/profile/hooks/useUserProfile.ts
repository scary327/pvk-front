import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { profileApi } from "../api/profileApi";
import { ProfileResponse } from "@/shared/types/api/profile";
// import { AxiosError } from "axios"; // Раскомментируйте, если нужна типизация ошибок Axios

// Определяем ключи запроса для профиля пользователя
// Мы используем массив строк, чтобы ключи были более читаемыми и структурированными
// ['userProfile', userId] - для получения профиля конкретного пользователя
// ['userProfile', 'detail', userId] - можно использовать, если есть другие подзапросы для профиля
export const userProfileKeys = {
  all: ["userProfile"] as const, // Общий ключ для всех профилей пользователей
  detail: (userId: string) => ["userProfile", "detail", userId] as const, // Ключ для конкретного профиля
  // Если есть списки профилей или другие варианты, их можно добавить сюда
  // list: (filters: string) => ["userProfile", "list", filters] as const,
};

// Типизация для опций хука, если это необходимо
// type UseUserProfileOptions = Omit<UseQueryOptions<ProfileResponse, Error, ProfileResponse, readonly ["userProfile", "detail", string]>, 'queryKey' | 'queryFn'>;

export const useUserProfile = (
  userId: string,
  options?: Omit<
    UseQueryOptions<
      ProfileResponse,
      Error,
      ProfileResponse,
      ReturnType<typeof userProfileKeys.detail>
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery<
    ProfileResponse,
    Error,
    ProfileResponse,
    ReturnType<typeof userProfileKeys.detail>
  >(
    userProfileKeys.detail(userId), // Ключ запроса
    () => profileApi.getUserProfile(userId), // Функция запроса
    {
      enabled: !!userId, // Запрос будет выполнен только если userId предоставлен
      ...options, // Дополнительные опции
    }
  );
};
