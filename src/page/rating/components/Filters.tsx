import { Search, Filter, X } from "lucide-react";
import { CustomSelect } from "./CustomSelect";
import { SkillLevelSlider } from "./SkillLevelSlider";
import { Skill } from "@/shared/types/api/profile";

export interface SelectedSkillFilter {
  skillId: number;
  name: string;
  minRating: number;
}

type FiltersProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCourse: number | null;
  setSelectedCourse: (value: number | null) => void;
  selectedRole: string | null;
  setSelectedRole: (value: string | null) => void;
  selectedRating: number | null;
  setSelectedRating: (value: number | null) => void;
  skillSearchQuery: string;
  setSkillSearchQuery: (value: string) => void;
  availableSkills: Skill[];
  addSkillTag: (skill: Skill) => void;
  selectedSkillTags: SelectedSkillFilter[];
  removeSkillTag: (skillId: number) => void;
  updateSkillLevel: (skillId: number, minRating: number) => void;
  resetFilters: () => void;
  roles: { value: string; label: string }[];
  ratingsOptions: { value: string; label: string }[];
};

export const Filters = ({
  searchQuery,
  setSearchQuery,
  selectedCourse,
  setSelectedCourse,
  selectedRole,
  setSelectedRole,
  selectedRating,
  setSelectedRating,
  skillSearchQuery,
  setSkillSearchQuery,
  availableSkills,
  addSkillTag,
  selectedSkillTags,
  removeSkillTag,
  updateSkillLevel,
  resetFilters,
  roles,
  ratingsOptions,
}: FiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4 md:mb-0">
          <Filter className="h-5 w-5 mr-2" />
          Фильтры
        </h2>
        <button
          onClick={resetFilters}
          className="text-sm text-[#636ae8] hover:text-blue-800 font-medium"
        >
          Сбросить все фильтры
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="relative">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Поиск по имени или команде
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-[#636ae8] focus:border-[#636ae8] block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
              placeholder="Поиск пользователей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Course Filter */}
        <div>
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Курс обучения
          </label>
          <CustomSelect
            value={selectedCourse}
            onChange={(value) =>
              setSelectedCourse(value === "all" ? null : Number(value))
            }
            options={[
              { value: "all", label: "Все курсы" },
              { value: "1", label: "1 курс" },
              { value: "2", label: "2 курс" },
              { value: "3", label: "3 курс" },
              { value: "4", label: "4 курс" },
            ]}
            placeholder="Выберите курс"
          />
        </div>

        {/* Role Filter */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Основная категория
          </label>
          <CustomSelect
            value={selectedRole}
            onChange={(value) =>
              setSelectedRole(value === "all" ? null : (value as string))
            }
            options={[{ value: "all", label: "Все категории" }, ...roles]}
            placeholder="Выберите категорию"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Минимальный средний рейтинг
          </label>
          <CustomSelect
            value={selectedRating}
            onChange={(value) =>
              setSelectedRating(value === "all" ? null : Number(value))
            }
            options={[
              { value: "all", label: "Любой рейтинг" },
              ...ratingsOptions,
            ]}
            placeholder="Выберите мин. рейтинг"
          />
        </div>
      </div>

      {/* Skill Tags Filter */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Фильтр по навыкам
        </label>

        {/* Search input for skills */}
        <div className="relative mb-3">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-[#636ae8] focus:border-[#636ae8] block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
              placeholder="Поиск по техническим навыкам..."
              value={skillSearchQuery}
              onChange={(e) => setSkillSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Skill tags list filtered by search */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {availableSkills.length > 0 ? (
              availableSkills
                .filter(
                  (skill) =>
                    !selectedSkillTags.some((tag) => tag.skillId === skill.id)
                )
                .filter((skill) =>
                  skill.name
                    .toLowerCase()
                    .includes(skillSearchQuery.toLowerCase())
                )
                .map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => addSkillTag(skill)}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                  >
                    {skill.name}
                  </button>
                ))
            ) : (
              <p className="text-sm text-gray-500">
                Нет доступных навыков для выбора или они уже выбраны.
              </p>
            )}
          </div>
        </div>

        {/* Selected skill tags with level sliders */}
        {selectedSkillTags.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Выбранные навыки (минимальный рейтинг)
            </h3>
            <div className="flex flex-wrap gap-3">
              {selectedSkillTags.map((tag) => (
                <div
                  key={tag.skillId}
                  className="flex flex-col bg-[#636ae8]/10 border border-[#636ae8]/30 rounded-md p-2 w-48"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">
                      {tag.name}
                    </span>
                    <button
                      onClick={() => removeSkillTag(tag.skillId)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 gap-x-[8px]">
                    <SkillLevelSlider
                      value={tag.minRating}
                      onChange={(rating) =>
                        updateSkillLevel(tag.skillId, rating)
                      }
                    />
                    <span>{tag.minRating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
