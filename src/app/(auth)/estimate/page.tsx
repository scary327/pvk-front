"use client";

import { useState } from "react";
import { TasksTable } from "@/page/estimate/components/TasksTable";
import { useMyTasks } from "@/entities/evaluations/hooks/useMyTasks";
import { EvaluationTask } from "@/shared/types/api/evaluations";

export default function TaskRatingPage() {
  const [page, setPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState(10); // Размер страницы, пока не изменяемый пользователем

  const {
    data: tasksResponse,
    isLoading,
    error,
    isFetching,
  } = useMyTasks({ page, size });

  const allTasks: EvaluationTask[] = tasksResponse?.content || [];
  const totalPages = tasksResponse?.totalPages || 0;

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        Загрузка задач...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center text-red-500">
        Ошибка загрузки задач: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1
        className="text-3xl font-bold mb-8 text-center"
        style={{ color: "var(--color-default-text)" }}
      >
        Система оценки задач IT-студентов
      </h1>

      <div className="w-full">
        <TasksTable tasks={allTasks} />
      </div>

      {tasksResponse && totalPages > 0 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || isFetching}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Назад
          </button>
          <span>
            Страница {page + 1} из {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1 || isFetching}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
}
