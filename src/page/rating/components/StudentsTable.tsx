import { ChevronUp, ChevronDown, Star } from "lucide-react";
// import { Student, Role } from '../types'; // Старые типы
import { UserSearchResultItem } from "@/shared/types/api/users"; // Новый тип
import { useRouter } from "next/navigation"; // Импортируем useRouter
import { getContrastColor } from "@/shared/utils/colorUtils"; // Импортируем
// import { getRoleBadgeColor, getOrdinalSuffix } from '../utils'; // Эти утилиты могут быть не нужны или потребуют адаптации

type StudentsTableProps = {
  students: UserSearchResultItem[]; // Заменено
  sortConfig: {
    key: string | null;
    direction: "ascending" | "descending";
  };
  requestSort: (key: string) => void;
  selectedStudents: string[]; // ID выбранных студентов
  onToggleStudentSelection: (userId: string) => void; // Функция для выбора/снятия выбора
  studentsCount?: number;
};

export const StudentsTable = ({
  students,
  sortConfig,
  requestSort,
  selectedStudents,
  onToggleStudentSelection,
  studentsCount = 0,
}: StudentsTableProps) => {
  const router = useRouter(); // Инициализируем router

  const handleRowClick = (userId: string) => {
    router.push(`/rating/${userId}`);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    e.stopPropagation(); // Предотвращаем всплытие на tr и вызов handleRowClick
    onToggleStudentSelection(userId);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-[#636ae8] text-white">
        <h3 className="text-lg leading-6 font-medium">
          Пользователи ({studentsCount})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#636ae8]/10">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider w-12"
              >
                {/* Пустой заголовок для чекбоксов или можно "Выбрать" */}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider"
              >
                Пользователь
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider"
              >
                Команды
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("course")} // sortKey теперь 'numberCourse'
              >
                <div className="flex items-center">
                  Курс
                  {sortConfig.key === "course" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider"
              >
                Основная категория
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("rating")} // sortKey теперь 'averageSkillRating'
              >
                <div className="flex items-center">
                  Средний рейтинг
                  {sortConfig.key === "rating" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider"
              >
                Топ навыки
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((user) => (
                <tr
                  key={user.userId}
                  className={`hover:bg-gray-100 ${
                    selectedStudents.includes(user.userId.toString())
                      ? "bg-blue-50"
                      : ""
                  }`}
                  // onClick={() => handleRowClick(user.userId.toString())} // Убираем клик по всей строке, если есть чекбокс
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      checked={selectedStudents.includes(
                        user.userId.toString()
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, user.userId.toString())
                      }
                      onClick={(e) => e.stopPropagation()} // Также останавливаем всплытие здесь
                    />
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => handleRowClick(user.userId.toString())}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                          <span className="text-xl text-gray-600">
                            {user.firstName?.[0]?.toUpperCase()}
                            {user.lastName?.[0]?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.middleName || ""}{" "}
                          {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.education}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.teams.map((team) => team.name).join(", ") || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.numberCourse ? `${user.numberCourse} курс` : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        !user.mainSkillCategory?.color
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }`}
                      style={{
                        backgroundColor: user.mainSkillCategory?.color,
                        color: getContrastColor(user.mainSkillCategory?.color),
                      }}
                    >
                      {user.mainSkillCategory?.name || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.averageSkillRating !== undefined &&
                    user.averageSkillRating !== null ? (
                      <div className="flex items-center text-sm text-gray-900">
                        <span>{user.averageSkillRating.toFixed(1)}</span>
                        <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.topSkills?.map((skill) => (
                        <div
                          key={skill.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                        >
                          <span className="mr-1">{skill.name}</span>
                          <span className="bg-[#636ae8] text-white px-1 rounded text-xs">
                            {skill.rating ?? "-"}{" "}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Пользователи не найдены.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
