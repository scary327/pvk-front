import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { profileApi } from "../api/profileApi";
import { UpdateMainSkillCategoryRequest } from "@/shared/types/api/profile";
import { profileKeys } from "./useProfile"; // Предполагаем, что ключи для /profile/me существуют в useProfile
// import { AxiosError } from "axios";

// Ключи запроса можно определить и здесь, если не хочется импортировать profileKeys
// или если profileKeys не покрывают все случаи инвалидации.
// export const mainSkillCategoryKeys = {
//   all: ["mainSkillCategory"] as const,
// };

export const useUpdateMainSkillCategory = (
  options?: Omit<
    UseMutationOptions<
      void, // Тип ответа от API (пока void)
      Error, // Тип ошибки
      UpdateMainSkillCategoryRequest // Тип передаваемых в mutate переменных
    >,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateMainSkillCategoryRequest>(
    (requestBody) => profileApi.updateMainSkillCategory(requestBody),
    {
      // Сначала применяем все переданные опции, включая пользовательские колбэки
      ...options,
      // Затем переопределяем onSuccess, чтобы добавить нашу логику инвалидации ПОСЛЕ пользовательского onSuccess
      onSuccess: async (data, variables, context) => {
        // Вызываем оригинальный onSuccess из options, если он был предоставлен
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
        // Инвалидируем запрос /profile/me, чтобы обновить данные профиля
        // invalidateQueries по умолчанию инициирует refetch для активных запросов
        await queryClient.invalidateQueries(profileKeys.current());
        // Можно также инвалидировать другие связанные запросы, если необходимо
        // Например, если есть отдельный запрос на mainSkillCategory:
        // queryClient.invalidateQueries(mainSkillCategoryKeys.all);
      },
      // Можно также обернуть onError и onSettled, если нужно выполнить доп. логику
      // после пользовательских обработчиков, но для refetch обычно достаточно onSuccess.
    }
  );
};
