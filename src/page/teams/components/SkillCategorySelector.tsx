import { memo, useState, useEffect } from "react";
import {
  UserSkillCategoriesResponse,
  UserSkillCategoryResponse,
  TeamMemberStatsResponse,
} from "@/shared/types/api/teams";
import { Star } from "lucide-react";

// Определим категории навыков
const SKILL_CATEGORIES = [
  { value: 1, label: "Backend" },
  { value: 2, label: "Frontend" },
  { value: 3, label: "DevOps" },
  { value: 4, label: "Design" },
  { value: 5, label: "Analysis" },
  { value: 6, label: "Teamlead" },
];

type ViewMode = "all" | "categories";

interface SkillCategorySelectorProps {
  skillCategories: UserSkillCategoriesResponse;
  categorySkills?: UserSkillCategoryResponse;
  isLoadingCategories?: boolean;
  isLoadingCategorySkills?: boolean;
  evaluatedUserName?: string;
  evaluatedUserId?: number;
  teamMembers?: TeamMemberStatsResponse[];
  onCreateBatchTasks?: (params: {
    selectedSkillIds: number[];
    selectedEvaluatorIds: number[];
    title: string;
    description: string;
  }) => void;
  onCategorySelect?: (categoryId: number) => void;
}

export const SkillCategorySelector = memo(
  ({
    skillCategories,
    categorySkills,
    isLoadingCategories,
    isLoadingCategorySkills,
    evaluatedUserName,
    evaluatedUserId,
    teamMembers,
    onCreateBatchTasks,
    onCategorySelect,
  }: SkillCategorySelectorProps) => {
    const [selectedSkills, setSelectedSkills] = useState<Set<number>>(
      new Set()
    );
    const [selectedEvaluators, setSelectedEvaluators] = useState<Set<number>>(
      new Set()
    );
    const [title, setTitle] = useState(
      `Оценка навыков пользователя ${evaluatedUserName || ""}`
    );
    const [description, setDescription] = useState(
      `Оценка навыков пользователя ${evaluatedUserName || ""}`
    );
    const [viewMode, setViewMode] = useState<ViewMode>("all");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
      null
    );

    // Обновляем title и description при изменении evaluatedUserName
    useEffect(() => {
      const defaultTitle = `Оценка навыков пользователя ${
        evaluatedUserName || ""
      }`;
      const defaultDescription = `Оценка навыков пользователя ${
        evaluatedUserName || ""
      }`;
      setTitle(defaultTitle);
      setDescription(defaultDescription);
    }, [evaluatedUserName]);

    const handleSkillToggle = (skillId: number) => {
      const newSelectedSkills = new Set(selectedSkills);
      if (newSelectedSkills.has(skillId)) {
        newSelectedSkills.delete(skillId);
      } else {
        newSelectedSkills.add(skillId);
      }
      setSelectedSkills(newSelectedSkills);
    };

    const handleEvaluatorToggle = (evaluatorId: number) => {
      const newSelectedEvaluators = new Set(selectedEvaluators);
      if (newSelectedEvaluators.has(evaluatorId)) {
        newSelectedEvaluators.delete(evaluatorId);
      } else {
        newSelectedEvaluators.add(evaluatorId);
      }
      setSelectedEvaluators(newSelectedEvaluators);
    };

    const handleCategorySelect = (categoryId: number) => {
      setSelectedCategoryId(categoryId);
      if (onCategorySelect) {
        onCategorySelect(categoryId);
      }
    };

    const getCurrentSkills = () => {
      if (viewMode === "categories" && categorySkills) {
        return categorySkills;
      }
      return skillCategories;
    };

    const currentSkills = getCurrentSkills();

    const handleSelectAllSkills = () => {
      const skillsToSelect = currentSkills;
      if (!skillsToSelect || !Array.isArray(skillsToSelect)) return;

      const allSkillIds = new Set(skillsToSelect.map((skill) => skill.id));
      setSelectedSkills(allSkillIds);
    };

    const handleSelectNecessarySkills = () => {
      const skillsToSelect = currentSkills;
      if (!skillsToSelect || !Array.isArray(skillsToSelect)) return;

      const necessarySkillIds = new Set(
        skillsToSelect
          .filter((skill) => skill.isNecessary)
          .map((skill) => skill.id)
      );
      setSelectedSkills(necessarySkillIds);
    };

    const handleClearAllSkills = () => {
      setSelectedSkills(new Set());
    };

    const handleCreateTasks = () => {
      if (onCreateBatchTasks) {
        onCreateBatchTasks({
          selectedSkillIds: Array.from(selectedSkills),
          selectedEvaluatorIds: Array.from(selectedEvaluators),
          title,
          description,
        });
      }
    };

    if (isLoadingCategories) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Выбор навыков для оценки{" "}
            {evaluatedUserName && `пользователя "${evaluatedUserName}"`}
          </h2>
          <div className="text-center text-gray-500">Загрузка навыков...</div>
        </div>
      );
    }

    if (!skillCategories || skillCategories.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Выбор навыков для оценки{" "}
            {evaluatedUserName && `пользователя "${evaluatedUserName}"`}
          </h2>
          <div className="text-center text-gray-500">
            У пользователя нет навыков для оценки
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Выбор навыков для оценки{" "}
          {evaluatedUserName && `пользователя "${evaluatedUserName}"`}
        </h2>

        {/* Выбор оценщиков */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">
              Выберите участников команды, которые будут проводить оценку
            </h3>
            {teamMembers &&
              teamMembers.filter((member) => member.userId !== evaluatedUserId)
                .length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      const availableMembers = teamMembers.filter(
                        (member) => member.userId !== evaluatedUserId
                      );
                      const allMemberIds = new Set(
                        availableMembers.map((member) => member.userId)
                      );
                      setSelectedEvaluators(allMemberIds);
                    }}
                    className="text-sm text-primary hover:text-blue-600 transition-colors"
                  >
                    Выбрать всех
                  </button>
                  <button
                    onClick={() => setSelectedEvaluators(new Set())}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Очистить
                  </button>
                </div>
              )}
          </div>
          {teamMembers && teamMembers.length > 0 ? (
            <div className="overflow-hidden border border-gray-200 rounded-lg mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Участник
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Роль
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Рейтинг
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Выбрать
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamMembers
                    .filter((member) => member.userId !== evaluatedUserId)
                    .map((member) => (
                      <tr
                        key={member.userId}
                        onClick={() => handleEvaluatorToggle(member.userId)}
                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                          selectedEvaluators.has(member.userId)
                            ? "bg-primary-light"
                            : ""
                        }`}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {member.firstName} {member.lastName}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span
                            className="text-sm px-2 py-1 rounded text-white font-bold"
                            style={{
                              backgroundColor: member.skillCategoryColor,
                            }}
                          >
                            {member.skillCategoryName}
                          </span>
                        </td>
                        <td className="flex items-center gap-x-[4px] w-full justify-center px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                          {member.averageRating.toFixed(1)}
                          <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <input
                            type="checkbox"
                            checked={selectedEvaluators.has(member.userId)}
                            onChange={() =>
                              handleEvaluatorToggle(member.userId)
                            }
                            className="text-primary focus:ring-primary rounded pointer-events-none"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">
              Нет доступных участников для оценки
            </div>
          )}
        </div>

        {/* Переключатель режимов просмотра */}
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Все навыки
            </button>
            <button
              onClick={() => setViewMode("categories")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "categories"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              По категориям
            </button>
          </div>

          {/* Выбор категории если включен режим "По категориям" */}
          {viewMode === "categories" && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-3">Выберите категорию</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                {SKILL_CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategorySelect(category.value)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      selectedCategoryId === category.value
                        ? "border-primary bg-primary-light text-primary"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {selectedCategoryId && isLoadingCategorySkills && (
                <div className="text-center text-gray-500 py-4">
                  Загрузка навыков категории...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Список навыков */}
        {(viewMode === "all" ||
          (viewMode === "categories" && currentSkills)) && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">
                {viewMode === "categories"
                  ? "Навыки категории"
                  : "Доступные навыки"}
              </h3>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleSelectAllSkills}
                  className="text-sm text-primary hover:text-blue-600 transition-colors"
                >
                  Выбрать все
                </button>
                <button
                  onClick={handleSelectNecessarySkills}
                  className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Выбрать все обязательные
                </button>
                <button
                  onClick={handleClearAllSkills}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Очистить
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {currentSkills.map((skill, index) => (
                <label
                  key={skill.id || index}
                  className={`flex items-center p-3 border rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ${
                    selectedSkills.has(skill.id || index)
                      ? "border-primary bg-primary-light text-primary"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.has(skill.id || index)}
                    onChange={() => handleSkillToggle(skill.id || index)}
                    className="mr-3 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{skill.name}</span>
                      {skill.isNecessary && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          Обязательный
                        </span>
                      )}
                    </div>
                    {skill.rating !== undefined && (
                      <div className="text-sm text-gray-500">
                        Текущий рейтинг: {skill.rating}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {selectedSkills.size > 0 && selectedEvaluators.size > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <div>Выбрано навыков: {selectedSkills.size}</div>
                  <div>
                    Обязательных навыков:{" "}
                    {
                      currentSkills.filter(
                        (skill) =>
                          skill.isNecessary && selectedSkills.has(skill.id)
                      ).length
                    }{" "}
                    из{" "}
                    {currentSkills.filter((skill) => skill.isNecessary).length}
                  </div>
                  <div>Выбрано оценщиков: {selectedEvaluators.size}</div>
                </div>

                {/* Поля для заголовка и описания */}
                <div className="mb-4 space-y-3">
                  <div>
                    <label
                      htmlFor="task-title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Заголовок задачи
                    </label>
                    <input
                      id="task-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Введите заголовок задачи"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="task-description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Описание задачи
                    </label>
                    <textarea
                      id="task-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                      placeholder="Введите описание задачи"
                    />
                  </div>
                </div>

                <button
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleCreateTasks}
                  disabled={!title.trim() || !description.trim()}
                >
                  Создать задачи для оценки
                </button>
              </div>
            )}

            {selectedSkills.size > 0 && selectedEvaluators.size === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  Выберите хотя бы одного участника команды для проведения
                  оценки
                </p>
              </div>
            )}

            {selectedEvaluators.size > 0 && selectedSkills.size === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  Выберите хотя бы один навык для оценки
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

SkillCategorySelector.displayName = "SkillCategorySelector";
