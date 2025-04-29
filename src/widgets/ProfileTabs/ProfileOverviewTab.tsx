import React, { memo } from "react";
import { RoleRatingData, SkillRadarData } from "@/shared/types/profile";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface ProfileOverviewTabProps {
  roleRatingsData: RoleRatingData[];
  skillsRadarData: SkillRadarData[];
}

export const ProfileOverviewTab = memo(
  ({ roleRatingsData, skillsRadarData }: ProfileOverviewTabProps) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Рейтинг по ролям
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={roleRatingsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                domain={[0, 100]}
                label={{
                  value: "Рейтинг (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="value" name="Рейтинг">
                {roleRatingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Обзор навыков
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={skillsRadarData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Навыки"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
);

ProfileOverviewTab.displayName = "ProfileOverviewTab";
