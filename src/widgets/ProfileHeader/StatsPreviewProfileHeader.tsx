import React, { memo, useMemo } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { UserData } from "@/shared/types/profile";
import { getRoleColor, getRoleDisplayName } from "@/shared/lib/profile";

interface StatsPreviewProfileHeaderProps {
  userData: UserData;
}

export const StatsPreviewProfileHeader = memo(
  ({ userData }: StatsPreviewProfileHeaderProps) => {
    // Calculate some stats for the preview
    const totalSkills = useMemo(
      () => userData.roles.reduce((acc, role) => acc + role.skills.length, 0),
      [userData.roles]
    );

    const avgRating = useMemo(
      () =>
        userData.roles.reduce((acc, role) => acc + role.rating, 0) /
        userData.roles.length,
      [userData.roles]
    );

    const topSkill = useMemo(
      () =>
        userData.roles
          .flatMap((role) => role.skills)
          .reduce((max, skill) => (skill.level > max.level ? skill : max), {
            name: "",
            level: 0,
          }),
      [userData.roles]
    );

    return (
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Avatar and Basic Info */}
            <div className="flex mb-6 md:mb-0 md:mr-8">
              <Avatar.Root className="flex-shrink-0 mr-4">
                <Avatar.Image
                  className="h-20 w-20 rounded-full object-cover"
                  src={userData.avatarUrl}
                  alt={`${userData.firstName} ${userData.lastName}`}
                />
                <Avatar.Fallback className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                  {userData.firstName.charAt(0)}
                  {userData.lastName.charAt(0)}
                </Avatar.Fallback>
              </Avatar.Root>

              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {userData.firstName} {userData.lastName}
                </h1>
                <span
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-opacity-20 mt-1"
                  style={{
                    backgroundColor: `${getRoleColor(userData.mainRole)}20`,
                    color: getRoleColor(userData.mainRole),
                  }}
                >
                  {getRoleDisplayName(userData.mainRole)}
                </span>

                <div className="mt-2">
                  {userData.teams.map((team, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-1 mb-1"
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="w-[200px] text-center">
              {/* <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">
                  {userData.roles.length}
                </div>
                <div className="text-xs text-gray-500">Roles</div>
              </div> */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">
                  {totalSkills}
                </div>
                <div className="text-xs text-gray-500">Навыков</div>
              </div>
              {/* <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">
                  {avgRating.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">Avg. Rating</div>
              </div> */}
            </div>
          </div>

          {/* Best Skill Preview */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Лучший навык: {topSkill.name}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${topSkill.level}%`,
                  backgroundColor: getRoleColor(userData.mainRole),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StatsPreviewProfileHeader.displayName = "StatsPreviewProfileHeader";
