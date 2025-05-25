import React, { useState, useEffect } from "react";
import { Skill } from "@/shared/types/api/profile";
import { useSkillSearch } from "@/entities/skills/hooks/useSkillSearch";
import { useAddSkillToMe } from "@/entities/skills/hooks/useAddSkillToMe";
import { useDebounce } from "@/shared/hooks/useDebounce"; // Предполагаем, что useDebounce вынесен в shared/hooks
import { XIcon, SearchIcon } from "lucide-react"; // Иконки для UI
import { useQueryClient } from "@tanstack/react-query"; // Импорт для инвалидации кеша
import { profileSkillCategoriesKeys } from "@/entities/profile/hooks/useProfileSkillCategories"; // Новый импорт

interface AddSkillPopoverProps {
  // profileSkillCategoryName: string; // Удаляем, так как не используется
  onClose: () => void;
}

export const AddSkillPopover: React.FC<AddSkillPopoverProps> = ({
  // profileSkillCategoryName, // Удаляем
  onClose,
}) => {
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const debouncedSkillSearchQuery = useDebounce(skillSearchQuery, 500);
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const queryClient = useQueryClient();

  const { data: skillSearchData, isLoading: isLoadingSkillSearch } =
    useSkillSearch({ query: debouncedSkillSearchQuery, page: 0, size: 10 });

  useEffect(() => {
    if (skillSearchData?.content) {
      setSearchResults(skillSearchData.content);
    } else {
      setSearchResults([]);
    }
  }, [skillSearchData]);

  const addSkillMutation = useAddSkillToMe({
    onSuccess: () => {
      queryClient.invalidateQueries(profileSkillCategoriesKeys.list()); // Используем новый ключ
      console.log("Навык успешно добавлен");
      onClose();
    },
    onError: (error) => {
      console.error("Ошибка добавления навыка:", error);
      // TODO: Показать сообщение об ошибке пользователю
    },
  });

  const handleAddSkill = (skillId: number) => {
    addSkillMutation.mutate({ skillId });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 w-64 h-80 flex flex-col z-20 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold">
          Добавить навык
          {/* <span className="text-sm text-gray-500 block">в "{profileSkillCategoryName}"</span> */}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <XIcon size={18} />
        </button>
      </div>

      <div className="relative mb-3">
        <SearchIcon
          size={16}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Поиск навыков..."
          value={skillSearchQuery}
          onChange={(e) => setSkillSearchQuery(e.target.value)}
          className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {isLoadingSkillSearch && (
        <p className="text-xs text-gray-500 px-1">Поиск...</p>
      )}

      <div className="flex-grow overflow-y-auto space-y-1 text-sm pr-1">
        {searchResults.length > 0
          ? searchResults.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-1.5 border-b border-gray-100 hover:bg-gray-50 rounded"
              >
                <span className="truncate" title={skill.name}>
                  {skill.name}
                </span>
                <button
                  onClick={() => handleAddSkill(skill.id)}
                  disabled={addSkillMutation.isLoading}
                  className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 disabled:opacity-50 shrink-0 ml-2"
                >
                  {addSkillMutation.isLoading &&
                  addSkillMutation.variables?.skillId === skill.id
                    ? "..."
                    : "Add"}
                </button>
              </div>
            ))
          : !isLoadingSkillSearch &&
            debouncedSkillSearchQuery && (
              <p className="text-xs text-gray-500 px-1">Навыки не найдены.</p>
            )}
        {!debouncedSkillSearchQuery &&
          !isLoadingSkillSearch &&
          searchResults.length === 0 && (
            <p className="text-xs text-gray-500 px-1">Начните поиск.</p>
          )}
      </div>
    </div>
  );
};
