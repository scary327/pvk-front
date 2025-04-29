import React, { memo } from "react";
import { UserRoleData } from "@/shared/types/profile";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { SkillTag } from "@/shared/ui/SkillTag/SkillTag";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProfileRoleTabProps {
  role: UserRoleData;
  roleColor: string;
}

export const ProfileRoleTab = memo(
  ({ role, roleColor }: ProfileRoleTabProps) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-500">Rating:</span>
            <StarRating rating={role.rating} />
          </div>
        </div>

        {/* Skills Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
          <div className="flex flex-wrap">
            {role.skills.map((skill, index) => (
              <SkillTag key={index} skill={skill} color={roleColor} />
            ))}
          </div>
        </div>

        {/* Skills Bar Chart */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            Skill Proficiency
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={role.skills.map((skill) => ({
                name: skill.name,
                value: skill.level,
              }))}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill={roleColor} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
);

ProfileRoleTab.displayName = "ProfileRoleTab";
