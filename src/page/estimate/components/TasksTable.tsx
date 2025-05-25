import { UserDisplay } from "./UserDisplay";
import { useRouter } from "next/navigation";
import { EvaluationTask } from "@/shared/types/api/evaluations";

interface TasksTableProps {
  tasks: EvaluationTask[];
}

export const TasksTable = ({ tasks }: TasksTableProps) => {
  const router = useRouter();

  const handleRowClick = (task: EvaluationTask) => {
    if (task.status === "RATED") {
      console.log("Эта задача уже оценена и не может быть открыта.");
      return;
    }
    router.push(`/estimate/${task.id.toString()}`);
  };

  return (
    <div className="rounded-md overflow-hidden border border-gray-200">
      <div
        className="py-4 px-6"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-white)",
        }}
      >
        <h2 className="text-xl font-bold">Все задачи</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium">Задача</th>
              <th className="text-left py-3 px-4 font-medium">Исполнитель</th>
              <th className="text-left py-3 px-4 font-medium">Ответственный</th>
              <th className="text-left py-3 px-4 font-medium">Срок</th>
              <th className="text-left py-3 px-4 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Нет задач для отображения
                </td>
              </tr>
            ) : (
              tasks.map((task) => {
                const isRated = task.status === "RATED";
                return (
                  <tr
                    key={task.id}
                    className={`border-b border-gray-100 
                      ${
                        isRated
                          ? "bg-gray-50 opacity-70"
                          : "cursor-pointer hover:bg-gray-50"
                      }`}
                    onClick={() => handleRowClick(task)}
                  >
                    <td className="py-3 px-4 font-medium">{task.title}</td>
                    <td className="py-3 px-4">
                      <UserDisplay user={task.assignee} />
                    </td>
                    <td className="py-3 px-4">
                      <UserDisplay user={task.lead} />
                    </td>
                    <td className="py-3 px-4">
                      {new Date(task.deadlineCompletion).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      {task.status === "RATED" ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Оценено
                        </span>
                      ) : task.status === "IN_WAITING" ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                          Ожидает
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {task.status || "Неизвестный статус"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
