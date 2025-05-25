import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { skillsApi } from "../api/skillsApi";
import { AddSkillToMeRequest } from "@/shared/types/api/skills";
// import { AxiosError } from "axios"; // Если нужна типизация ошибок Axios

// Если от мутации ожидается какой-то результат (кроме void), укажите его тип здесь
// type AddSkillToMeResponse = void;

export const useAddSkillToMe = (
  options?: UseMutationOptions<
    void, // Тип данных, возвращаемых функцией мутации (void, если ничего)
    Error, // Тип ошибки (можно заменить на AxiosError, если используется)
    AddSkillToMeRequest, // Тип переменных, передаваемых в mutate
    unknown // Тип контекста, если используется onMutate
  >
) => {
  return useMutation<void, Error, AddSkillToMeRequest, unknown>(
    skillsApi.addSkillToMe,
    options
  );
};
