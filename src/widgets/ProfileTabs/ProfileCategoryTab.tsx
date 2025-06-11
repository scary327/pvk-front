import React, { memo, useState, useRef, useEffect } from "react";
// import { UserRoleData } from "@/shared/types/profile"; // Старый тип
import { ProfileSkillCategory } from "@/shared/types/api/profile"; // Новые типы
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { SkillTag } from "@/shared/ui/SkillTag/SkillTag";
// import { allSoftSkills } from "@/shared/api/mocks/profileData"; // Моки, вероятно, не нужны
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AddSkillPopover } from "./components/AddSkillPopover"; // Исправляем путь
import { useQueryClient } from "@tanstack/react-query"; // Импортируем для инвалидации
import { useRemoveSkillFromMe } from "@/entities/skills/hooks/useRemoveSkillFromMe"; // Импорт хука удаления
import { profileSkillCategoriesKeys } from "@/entities/profile/hooks/useProfileSkillCategories";
import { DEFAULT_FULL_RATING } from "@/shared/constants"; // Новый импорт
import { AlertCircle } from "lucide-react";
import { LevelScaleModal } from "@/shared/ui/LevelScaleModal";
// import { getContrastColor } from "@/shared/utils/colorUtils"; // Удалено, т.к. categoryTextColor больше не используется

interface ProfileCategoryTabProps {
  // Переименовано и изменены пропсы
  profileSkillCategory: ProfileSkillCategory;
  isOwnProfile: boolean; // Новый проп
  // roleColor: string; // Пока уберем, цвет можно будет брать из категории или генерировать
}

// Маппинг ролей к их умениям - эту логику нужно будет пересмотреть или удалить
// const roleSkillsMap: Record<string, string[]> = { ... };
// const allSoftSkills = []; // Убираем моки

const MIN_BAR_HEIGHT_PER_SKILL = 50; // Минимальная высота для одного навыка в графике
const CHART_VERTICAL_PADDING = 20; // Отступы сверху/снизу для графика
const MIN_CHART_HEIGHT = 200; // Минимальная общая высота графика

export const ProfileCategoryTab = memo(
  // ({ role, roleColor }: ProfileRoleTabProps) => { // Старые пропсы
  ({ profileSkillCategory, isOwnProfile }: ProfileCategoryTabProps) => {
    // Новые пропсы
    const categoryDisplayColor =
      profileSkillCategory.category.color || "#8884d8";
    // categoryTextColor больше не нужен для заголовка
    // const categoryTextColor = getContrastColor(categoryDisplayColor);

    // Логика управления состоянием навыков (useState, handleAddSkill, handleRemoveSkill, showAddPanel, search)
    // требует значительной переработки, если редактирование навыков останется здесь.
    // Пока что мы отобразим навыки как есть, без возможности редактирования из этой вкладки.
    const skills = profileSkillCategory.skills;

    // Состояние для управления модальным окном добавления навыка
    const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
    const addTagRef = useRef<HTMLDivElement>(null); // Ref для тега "Добавить"
    const popoverRef = useRef<HTMLDivElement>(null); // Ref для поповера
    const queryClient = useQueryClient();

    const removeSkillMutation = useRemoveSkillFromMe({
      onSuccess: () => {
        queryClient.invalidateQueries(profileSkillCategoriesKeys.list());
      },
    });

    const handleOpenAddSkillModal = () => {
      if (isOwnProfile) {
        // Открываем только для своего профиля
        setIsAddSkillModalOpen(true);
      }
    };

    const handleCloseAddSkillModal = () => {
      setIsAddSkillModalOpen(false);
    };

    const handleRemoveSkill = (skillId: number) => {
      if (isOwnProfile) {
        // Удаляем только из своего профиля
        removeSkillMutation.mutate({ skillId });
      }
    };

    // Закрытие поповера при клике вне его и вне тега "Добавить"
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          isAddSkillModalOpen &&
          addTagRef.current &&
          !addTagRef.current.contains(event.target as Node) &&
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          handleCloseAddSkillModal();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isAddSkillModalOpen]);

    // Расчет высоты графика
    const chartHeight = Math.max(
      MIN_CHART_HEIGHT,
      skills.length * MIN_BAR_HEIGHT_PER_SKILL + CHART_VERTICAL_PADDING
    );

    const [openModal, setOpenModal] = useState(false);

    return (
      <>
        <div className="bg-white p-6 rounded-lg shadow relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {/* Убрана стилизация с цветом категории */}
              {profileSkillCategory.category.name}
            </h2>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-500">
                Общий рейтинг категории:
              </span>
              {/* Используем рейтинг категории */}
              <StarRating rating={profileSkillCategory.rating} />
              <button
                className="cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                <AlertCircle className="w-5 ml-2 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Навыки в категории
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {/* Отображаем все навыки из категории */}
              {skills.map((skill) => (
                <SkillTag
                  key={skill.id}
                  skill={skill}
                  color={categoryDisplayColor} // Используем определенный цвет
                  canRemove={isOwnProfile} // Разрешаем удаление только для своего профиля
                  onRemove={handleRemoveSkill} // onRemove будет вызван, но мутация сработает только если isOwnProfile
                />
              ))}
              {/* Контейнер для тега "Добавить" и поповера */}
              {isOwnProfile && ( // Отображаем тег "Добавить +" только для своего профиля
                <div className="relative" ref={addTagRef}>
                  <SkillTag
                    skill={{ name: "Добавить +" }}
                    color={categoryDisplayColor} // Используем определенный цвет
                    variant="outline"
                    onClick={handleOpenAddSkillModal}
                  />
                  {isAddSkillModalOpen && (
                    // Обертка для позиционирования поповера
                    <div
                      ref={popoverRef}
                      className="absolute top-full left-0 mt-1 z-20" // Позиционируем под тегом
                      // Можно добавить стили для стрелочки или более точного позиционирования
                    >
                      <AddSkillPopover
                        // profileSkillCategoryName={profileSkillCategory.category.name} // Проп удален
                        onClose={handleCloseAddSkillModal}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Уровень владения навыками в категории &quot;
              {profileSkillCategory.category.name}&quot;
            </h3>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart
                data={skills.map((skill) => ({
                  name: skill.name,
                  value: skill.rating,
                }))}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, DEFAULT_FULL_RATING]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={220}
                  interval={0}
                />
                <Tooltip />
                <Bar dataKey="value" fill={categoryDisplayColor} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <LevelScaleModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </>
    );
  }
);

ProfileCategoryTab.displayName = "ProfileCategoryTab";
