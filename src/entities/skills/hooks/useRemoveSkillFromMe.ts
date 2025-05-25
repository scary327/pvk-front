import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { skillsApi } from "../api/skillsApi";
// import { AxiosError } from "axios"; // Если нужна типизация ошибок Axios

interface RemoveSkillVariables {
  skillId: number;
}

export const useRemoveSkillFromMe = (
  options?: UseMutationOptions<
    void, // Тип данных, возвращаемых функцией мутации
    Error, // Тип ошибки
    RemoveSkillVariables, // Тип переменных, передаваемых в mutate
    unknown // Тип контекста
  >
) => {
  return useMutation<void, Error, RemoveSkillVariables, unknown>(
    (variables) => skillsApi.removeSkillFromMe(variables.skillId),
    options
  );
};
