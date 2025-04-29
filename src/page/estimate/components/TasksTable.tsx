import { UserDisplay } from './UserDisplay';

// Define types
type Role = 'teamlead' | 'frontend' | 'backend' | 'design' | 'analytics';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: Role;
}

interface Task {
  id: string;
  title: string;
  description: string;
  implementer: User;
  responsibleUser: User;
  deadlineDate: string;
  isEstimated: boolean;
  estimationDate?: string;
}

interface TasksTableProps {
  tasks: Task[];
  type: 'estimated' | 'non-estimated';
}

export const TasksTable = ({ tasks, type }: TasksTableProps) => {
  const isEstimated = type === 'estimated';
  
  return (
    <div className="rounded-md overflow-hidden border border-gray-200">
      <div className="py-4 px-6" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)' }}>
        <h2 className="text-xl font-bold">{isEstimated ? 'Оцененные задачи' : 'Задачи для оценки'}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium">Задача</th>
              <th className="text-left py-3 px-4 font-medium">Исполнитель</th>
              <th className="text-left py-3 px-4 font-medium">Ответственный</th>
              <th className="text-left py-3 px-4 font-medium">Срок</th>
              <th className="text-left py-3 px-4 font-medium text-center">
                {isEstimated ? 'Дата оценки' : 'Статус'}
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  {isEstimated ? 'Нет оцененных задач' : 'Нет задач для оценки'}
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr 
                  key={task.id} 
                  className="border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                  style={isEstimated ? { backgroundColor: 'var(--color-primary-light)' } : undefined}
                >
                  <td className="py-3 px-4 font-medium">{task.title}</td>
                  <td className="py-3 px-4">
                    <UserDisplay user={task.implementer} />
                  </td>
                  <td className="py-3 px-4">
                    <UserDisplay user={task.responsibleUser} />
                  </td>
                  <td className="py-3 px-4">{new Date(task.deadlineDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    {isEstimated ? (
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {task.estimationDate ? new Date(task.estimationDate).toLocaleDateString() : 'N/A'}
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                        Ожидает оценки
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 