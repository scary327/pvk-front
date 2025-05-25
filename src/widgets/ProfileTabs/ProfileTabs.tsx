import React, { memo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
// import { getRoleColor } from "@/page/rating/utils"; // Убрано
import { ProfileOverviewTab } from "./ProfileOverviewTab";
import { ProfileCategoryTab } from "./ProfileCategoryTab";
import { useProfileSkillCategories } from "@/entities/profile/hooks/useProfileSkillCategories";
import { useUserSkillCategories } from "@/entities/profile/hooks/useUserSkillCategories";
import {
  ProfileSkillCategory,
  ProfileSkillCategoriesResponse,
} from "@/shared/types/api/profile";

interface ProfileTabsProps {
  userId?: string;
}

export const ProfileTabs = memo(({ userId }: ProfileTabsProps) => {
  const isOwnProfile = !userId; // Если userId не предоставлен, это собственный профиль

  // Хук для данных текущего пользователя (</profile/me/skill-categories>)
  // Он будет активен всегда, но мы используем его данные только если нет userId
  const {
    data: currentUserSkillCategories,
    isLoading: isLoadingCurrent,
    error: errorCurrent,
  } = useProfileSkillCategories(); // Вызываем без аргументов

  // Хук для данных конкретного пользователя (<profile/{userId}/skill-categories>)
  // Он будет активен только если userId предоставлен (логика enabled внутри хука)
  const {
    data: specificUserSkillCategories,
    isLoading: isLoadingSpecific,
    error: errorSpecific,
  } = useUserSkillCategories(userId || ""); // Передаем userId; если он пустой/undefined, хук не будет активен

  // Выбираем, какие данные и состояния загрузки/ошибки использовать
  const isLoading = userId ? isLoadingSpecific : isLoadingCurrent;
  const error = userId ? errorSpecific : errorCurrent;
  const skillCategoriesData = userId
    ? specificUserSkillCategories
    : currentUserSkillCategories;

  if (isLoading) {
    return <div>Загрузка вкладок профиля...</div>;
  }

  if (error || !skillCategoriesData) {
    // Можно добавить более специфичное сообщение об ошибке в зависимости от errorSpecific или errorCurrent
    return (
      <div>
        Ошибка загрузки данных для вкладок профиля. {(error as Error)?.message}
      </div>
    );
  }

  if (!Array.isArray(skillCategoriesData) || skillCategoriesData.length === 0) {
    return <div>Нет данных о категориях навыков для отображения.</div>;
  }

  const defaultTabValue = skillCategoriesData[0]?.category.name || "overview";

  return (
    <div className="mt-8">
      <Tabs.Root defaultValue={defaultTabValue} className="w-full">
        <Tabs.List className="flex border-b border-gray-200 mb-6">
          <Tabs.Trigger
            value="overview"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Обзор
          </Tabs.Trigger>
          {skillCategoriesData.map(
            (profileSkillCategory: ProfileSkillCategory) => (
              <Tabs.Trigger
                key={profileSkillCategory.category.id}
                value={profileSkillCategory.category.name}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                {profileSkillCategory.category.name}
              </Tabs.Trigger>
            )
          )}
        </Tabs.List>

        <Tabs.Content value="overview" className="outline-none">
          <ProfileOverviewTab
            skillCategoriesData={
              skillCategoriesData as ProfileSkillCategoriesResponse
            }
          />
        </Tabs.Content>

        {skillCategoriesData.map(
          (profileSkillCategory: ProfileSkillCategory) => (
            <Tabs.Content
              key={profileSkillCategory.category.id}
              value={profileSkillCategory.category.name}
              className="outline-none"
            >
              <ProfileCategoryTab
                profileSkillCategory={profileSkillCategory}
                isOwnProfile={isOwnProfile}
              />
            </Tabs.Content>
          )
        )}
      </Tabs.Root>
    </div>
  );
});

ProfileTabs.displayName = "ProfileTabs";
