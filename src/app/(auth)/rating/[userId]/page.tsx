"use client";

import React, { memo } from "react";
import { useParams } from "next/navigation"; // Для получения userId из URL
import { StatsPreviewProfileHeader } from "@/widgets/ProfileHeader/StatsPreviewProfileHeader";
import { ProfileTabs } from "@/widgets/ProfileTabs/ProfileTabs"; // Пока используем существующий, возможно, потребует доработки
import { useUserProfile } from "@/entities/profile/hooks/useUserProfile";
// import { useUserSkillCategories } from '@/entities/profile/hooks/useUserSkillCategories'; // Этот хук будет использоваться внутри доработанного ProfileTabs или его аналога

const UserRatingProfilePage = memo(() => {
  const params = useParams();
  const userId = params.userId as string; // Получаем userId из параметров маршрута

  const {
    data: userProfileData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useUserProfile(userId);
  // const { data: userSkillCategoriesData, isLoading: isLoadingSkills, error: skillsError } = useUserSkillCategories(userId);
  // Пока ProfileTabs сам загружает данные для 'me', нам нужно будет его изменить или создать новый для отображения данных другого пользователя.
  // Сейчас ProfileTabs не принимает skillCategories как проп.

  if (isLoadingProfile) {
    // Добавим проверку isLoadingSkills, когда будет интегрировано
    return (
      <div className="min-h-screen bg-bg-default flex items-center justify-center">
        Loading profile data...
      </div>
    );
  }

  if (profileError || !userProfileData) {
    return (
      <div className="min-h-screen bg-bg-default flex items-center justify-center text-red-500">
        {profileError instanceof Error
          ? profileError.message
          : "Failed to load user profile"}
      </div>
    );
  }

  // TODO: Добавить обработку загрузки и ошибок для userSkillCategoriesData, когда ProfileTabs будет готов их принимать

  return (
    <div className="min-h-screen bg-bg-default">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <StatsPreviewProfileHeader profileData={userProfileData} />
        <ProfileTabs userId={userId} />
      </div>
    </div>
  );
});

UserRatingProfilePage.displayName = "UserRatingProfilePage";

export default UserRatingProfilePage;
