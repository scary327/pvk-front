import React, { memo, useMemo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  UserData,
  RoleRatingData,
  SkillRadarData,
} from "@/shared/types/profile";
import { getRoleColor, getRoleDisplayName } from "@/shared/lib/profile";
import { ProfileOverviewTab } from "./ProfileOverviewTab";
import { ProfileRoleTab } from "./ProfileRoleTab";

interface ProfileTabsProps {
  userData: UserData;
}

export const ProfileTabs = memo(({ userData }: ProfileTabsProps) => {
  // Подготавливаем данные для графиков
  const roleRatingsData = useMemo<RoleRatingData[]>(
    () =>
      userData.roles.map((role) => ({
        name: getRoleDisplayName(role.role),
        value: role.rating * 20, // Convert 0-5 scale to 0-100 for charts
        color: getRoleColor(role.role),
      })),
    [userData.roles]
  );

  const skillsRadarData = useMemo<SkillRadarData[]>(
    () =>
      userData.roles.map((role) => {
        const avgSkillLevel =
          role.skills.reduce((sum, skill) => sum + skill.level, 0) /
          role.skills.length;
        return {
          subject: getRoleDisplayName(role.role),
          value: avgSkillLevel,
          fullMark: 100,
        };
      }),
    [userData.roles]
  );

  return (
    <div className="mt-8">
      <Tabs.Root defaultValue="overview" className="w-full">
        <Tabs.List className="flex border-b border-gray-200 mb-6">
          <Tabs.Trigger
            value="overview"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Обзор
          </Tabs.Trigger>
          {userData.roles.map((role) => (
            <Tabs.Trigger
              key={role.role}
              value={role.role}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              {getRoleDisplayName(role.role)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Overview Tab */}
        <Tabs.Content value="overview" className="outline-none">
          <ProfileOverviewTab
            roleRatingsData={roleRatingsData}
            skillsRadarData={skillsRadarData}
          />
        </Tabs.Content>

        {/* Role-specific Tabs */}
        {userData.roles.map((role) => (
          <Tabs.Content
            key={role.role}
            value={role.role}
            className="outline-none"
          >
            <ProfileRoleTab role={role} roleColor={getRoleColor(role.role)} />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
});

ProfileTabs.displayName = "ProfileTabs";
