import React, { memo } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { ProfileResponse } from "@/shared/types/api/profile";
import { getContrastColor } from "@/shared/utils/colorUtils";
import { Edit3 } from "lucide-react";

interface StatsPreviewProfileHeaderProps {
  profileData: ProfileResponse;
  isOwnProfile?: boolean;
  onEditMainCategory?: () => void;
  editButtonRef?: React.Ref<HTMLButtonElement>;
}

export const StatsPreviewProfileHeader = memo(
  ({
    profileData,
    isOwnProfile,
    onEditMainCategory,
    editButtonRef,
  }: StatsPreviewProfileHeaderProps) => {
    const mainCategory = profileData.mainSkillCategory;
    const mainCategoryColor = mainCategory?.color;

    return (
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Avatar and Basic Info */}
            <div className="flex mb-6 md:mb-0 md:mr-8">
              <Avatar.Root className="flex-shrink-0 mr-4">
                <Avatar.Image
                  className="h-20 w-20 rounded-full object-cover"
                  src="/api/placeholder/150/150"
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                />
                <Avatar.Fallback className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                  {profileData.firstName.charAt(0)}
                  {profileData.lastName.charAt(0)}
                </Avatar.Fallback>
              </Avatar.Root>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.middleName}{" "}
                  {profileData.lastName}
                </h1>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                      !mainCategoryColor ? "bg-gray-200 text-gray-800" : ""
                    }`}
                    style={
                      mainCategoryColor
                        ? {
                            backgroundColor: mainCategoryColor,
                            color: getContrastColor(mainCategoryColor),
                          }
                        : {}
                    }
                  >
                    {mainCategory ? mainCategory.name : "Категория не указана"}
                  </span>
                  {isOwnProfile && onEditMainCategory && (
                    <button
                      ref={editButtonRef}
                      onClick={onEditMainCategory}
                      className="text-gray-500 hover:text-gray-700 transition-colors ml-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      title="Изменить основную категорию"
                    >
                      <Edit3 size={18} />
                    </button>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  {profileData.teams.map((team) => (
                    <span
                      key={team.id}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2"
                    >
                      {team.name} • {team.role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <dt className="text-sm font-medium text-gray-500">
                  Лучший навык
                </dt>
                {profileData.bestSkill && (
                  <dd className="mt-1 text-xl font-semibold text-gray-900">
                    {profileData.bestSkill.name}
                    <span className="text-sm text-gray-500 ml-2">
                      Рейтинг: {profileData.bestSkill.rating}
                    </span>
                  </dd>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <dt className="text-sm font-medium text-gray-500">
                  Всего навыков
                </dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900">
                  {profileData.totalNumberSkills}
                </dd>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <dt className="text-sm font-medium text-gray-500">
                  Категории навыков
                </dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900">
                  {profileData.skillCategories.length}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StatsPreviewProfileHeader.displayName = "StatsPreviewProfileHeader";
