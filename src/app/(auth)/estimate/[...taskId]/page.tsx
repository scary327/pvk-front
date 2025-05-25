"use client";
import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { TaskHeader } from "@/page/estimate/components/TaskHeader";
import { SkillsSection } from "@/page/estimate/components/SkillsSection";
import { useTaskSkills } from "@/entities/evaluations/hooks/useTaskSkills";
import { useEvaluateTask } from "@/entities/evaluations/hooks/useEvaluateTask";
import { useQueryClient } from "@tanstack/react-query";
import { myTasksKeys } from "@/entities/evaluations/hooks/useMyTasks";
import { taskSkillsKeys } from "@/entities/evaluations/hooks/useTaskSkills";
import {
  SkillEvaluation,
  EvaluationTaskUser,
} from "@/shared/types/api/evaluations";
import {
  useTaskDetails,
  taskDetailsKeys,
} from "@/entities/evaluations/hooks/useTaskDetails";

// Mock data for the task
// const mockTask = { ... };

// Define types for ratings and skills
interface Ratings {
  [key: string]: number;
}

interface NotUsedSkills {
  [key: string]: boolean;
}

// Тип для пользователя в TaskHeader, чтобы передавать skillCategoryName как role
interface TaskHeaderUser {
  firstName: string;
  lastName: string;
  middleName?: string | null; // Добавим middleName, если есть
  role: string; // Это будет skillCategoryName
  avatar?: string; // avatar сделаем опциональным
  roleColor?: string; // Добавлено здесь для соответствия
}

// Student Rating Page component
export default function StudentRatingPage() {
  // State for storing skill ratings
  const [ratings, setRatings] = useState<Ratings>({});
  // State for storing skills that were not used
  const [notUsedSkills, setNotUsedSkills] = useState<NotUsedSkills>({});

  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const taskIdFromParams = Array.isArray(params.taskId)
    ? params.taskId[0]
    : params.taskId;
  const taskId = taskIdFromParams ? parseInt(taskIdFromParams, 10) : 0;

  const {
    data: taskSkills,
    isLoading: isLoadingSkills,
    isError: isSkillsError,
    error: skillsError,
  } = useTaskSkills(taskId);

  const {
    data: taskDetails,
    isLoading: isLoadingDetails,
    isError: isDetailsError,
    error: detailsError,
  } = useTaskDetails(taskId);

  const evaluateTaskMutation = useEvaluateTask({
    onSuccess: () => {
      queryClient.invalidateQueries(myTasksKeys.list());
      queryClient.invalidateQueries(taskSkillsKeys.detail(taskId));
      queryClient.invalidateQueries(taskDetailsKeys.detail(taskId));
      alert("Задача успешно оценена!");
      router.push("/estimate");
    },
    onError: (error) => {
      console.error("Ошибка при оценке задачи:", error);
      alert(`Ошибка при оценке задачи: ${error.message}`);
    },
  });

  // Handle rating change
  const handleRatingChange = (skillId: string, value: number) => {
    // If skill was marked as not used before, remove that mark
    if (notUsedSkills[skillId]) {
      const updatedNotUsed = { ...notUsedSkills };
      delete updatedNotUsed[skillId];
      setNotUsedSkills(updatedNotUsed);
    }

    setRatings((prev) => ({
      ...prev,
      [skillId]: value,
    }));
  };

  // Handle "skill not used" checkbox
  const handleNotUsedChange = (skillId: string, checked: boolean) => {
    if (checked) {
      // Remove any rating if marked as not used
      const updatedRatings = { ...ratings };
      delete updatedRatings[skillId];
      setRatings(updatedRatings);

      // Mark as not used
      setNotUsedSkills((prev) => ({
        ...prev,
        [skillId]: true,
      }));
    } else {
      // Remove from not used
      const updatedNotUsed = { ...notUsedSkills };
      delete updatedNotUsed[skillId];
      setNotUsedSkills(updatedNotUsed);
    }
  };

  // Логика для определения, активна ли кнопка "Завершить"
  const allSkillsRatedOrMarked = useMemo(() => {
    if (!taskSkills) return false;
    return taskSkills.every(
      (skill) =>
        ratings[skill.id.toString()] !== undefined ||
        notUsedSkills[skill.id.toString()] === true
    );
  }, [taskSkills, ratings, notUsedSkills]);

  // Handle form submission
  const handleSubmit = (action: "estimate-next" | "finish") => {
    if (action === "finish") {
      if (!allSkillsRatedOrMarked) {
        alert(
          "Пожалуйста, оцените все навыки или отметьте их как неиспользуемые."
        );
        return;
      }

      const skillEvaluations: SkillEvaluation[] = taskSkills
        ? taskSkills
            .filter(
              (skill) =>
                ratings[skill.id.toString()] !== undefined &&
                !notUsedSkills[skill.id.toString()]
            )
            .map((skill) => ({
              skillId: skill.id, // skill.id здесь number
              rating: ratings[skill.id.toString()],
              // feedback пока не добавляем
            }))
        : [];

      if (
        skillEvaluations.length === 0 &&
        taskSkills &&
        taskSkills.length > 0
      ) {
        // Проверяем, есть ли вообще оцененные навыки, если есть что оценивать
        // Можно также проверить, что не все навыки отмечены как notUsed, если такая логика нужна
        const allMarkedAsNotUsed = taskSkills.every(
          (skill) => notUsedSkills[skill.id.toString()] === true
        );
        if (allMarkedAsNotUsed) {
          // Если все навыки помечены как неиспользуемые, возможно, нужно отправить пустой массив или специальный флаг
          // Текущая логика отправит пустой skillEvaluations, что может быть неверно для API
          // Пока что отправляем как есть, но это место для возможной доработки логики
          console.warn(
            "Все навыки помечены как неиспользуемые. Отправляется пустой массив оценок."
          );
        }
        // Если нет оцененных навыков, но не все отмечены как "не использовался", то это ошибка состояния, которая должна быть отловлена allSkillsRatedOrMarked
      }

      console.log("Отправка оценок:", { taskId, skillEvaluations });
      evaluateTaskMutation.mutate({ taskId, data: { skillEvaluations } });
    } else if (action === "estimate-next") {
      // TODO: Логика для "Оценить и перейти к следующему", если такая нужна
      // Например, найти следующую задачу в списке и перейти к ней
      alert("Логика 'Оценить и перейти к следующему' еще не реализована.");
      // Пока что просто отправляем оценку текущей задачи, если все оценено
      if (allSkillsRatedOrMarked) {
        const skillEvaluations: SkillEvaluation[] = taskSkills
          ? taskSkills
              .filter(
                (skill) =>
                  ratings[skill.id.toString()] !== undefined &&
                  !notUsedSkills[skill.id.toString()]
              )
              .map((skill) => ({
                skillId: skill.id,
                rating: ratings[skill.id.toString()],
              }))
          : [];
        evaluateTaskMutation.mutate({ taskId, data: { skillEvaluations } });
      } else {
        alert(
          "Пожалуйста, оцените все навыки или отметьте их как неиспользуемые перед переходом."
        );
      }
    }
  };

  // Объединенная обработка загрузки и ошибок
  if (isLoadingSkills || isLoadingDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Загрузка данных задачи...</p>
      </div>
    );
  }

  if (isSkillsError || isDetailsError) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        <p>
          Ошибка загрузки данных:{" "}
          {skillsError?.message ||
            detailsError?.message ||
            "Неизвестная ошибка"}
        </p>
      </div>
    );
  }

  if (!taskDetails) {
    // Дополнительная проверка, если вдруг taskDetails не загрузились, но нет ошибки
    return (
      <div className="container mx-auto p-4 text-orange-500">
        <p>Данные о задаче не найдены.</p>
      </div>
    );
  }

  // Преобразуем TaskSkill[] в формат, ожидаемый SkillsSection (Skill[] с id: string)
  // Предполагаем, что тип Skill имеет поля id: string и name: string
  // Если у Skill есть другие обязательные поля, которых нет в TaskSkill, это потребует доп. адаптации
  const skillsForSection = taskSkills?.map((skill) => ({
    ...skill,
    id: skill.id.toString(), // Преобразуем id в строку
  }));

  // Функция для маппинга EvaluationTaskUser в TaskHeaderUser
  const mapToTaskHeaderUser = (
    user?: EvaluationTaskUser
  ): TaskHeaderUser | undefined => {
    if (!user) return undefined;
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      role: user.skillCategoryName,
      roleColor: user.skillCategoryColor, // Передаем цвет
      // avatar: user.avatarUrl
    };
  };

  const implementerForHeader = mapToTaskHeaderUser(taskDetails.assignee);
  const responsibleForHeader = mapToTaskHeaderUser(taskDetails.lead);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {implementerForHeader && responsibleForHeader ? (
          <TaskHeader
            title={taskDetails.title}
            description={taskDetails.description}
            implementer={implementerForHeader}
            responsible={responsibleForHeader}
            deadline={new Date(
              taskDetails.deadlineCompletion
            ).toLocaleDateString("ru-RU")} // Форматируем дату
          />
        ) : (
          <div className="p-6 text-center text-gray-500">
            Загрузка информации об исполнителях...
          </div>
        )}

        <SkillsSection
          hardSkills={skillsForSection || []}
          softSkills={[]}
          ratings={ratings}
          notUsedSkills={notUsedSkills}
          onRatingChange={handleRatingChange}
          onNotUsedChange={handleNotUsedChange}
          onSubmit={handleSubmit}
          isSubmitDisabled={!allSkillsRatedOrMarked}
          isSubmitting={evaluateTaskMutation.isLoading}
        />
      </div>
    </div>
  );
}
