import React, { memo } from "react";
import { ProfileSkillCategoriesResponse } from "@/shared/types/api/profile";
import {
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { DEFAULT_FULL_RATING } from "@/shared/constants";

const GRAPH_COLOR = "#8884d8";
const GRAPH_FILL_OPACITY = 0.6;

interface ProfileOverviewTabProps {
  skillCategoriesData: ProfileSkillCategoriesResponse;
}

interface ISkillRadar {
  subject: string;
  value: number;
  fullMark: number;
}

export const ProfileOverviewTab = memo(
  ({ skillCategoriesData }: ProfileOverviewTabProps) => {
    const roleRatingsData = skillCategoriesData.map((item) => ({
      name: item.category.name,
      value: Math.ceil(item.rating),
      color: item.category.color,
    }));

    const skillsRadarData: ISkillRadar[] = roleRatingsData.map((item) => {
      return {
        subject: item.name,
        value: item.value,
        fullMark: DEFAULT_FULL_RATING,
      };
    });

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/*<div className="bg-white p-6 rounded-lg shadow">*/}
        {/*  <h2 className="text-lg font-semibold text-gray-800 mb-4">*/}
        {/*    Рейтинг по категориям*/}
        {/*  </h2>*/}
        {/*  <ResponsiveContainer width="100%" height={300}>*/}
        {/*    <BarChart*/}
        {/*      data={roleRatingsData}*/}
        {/*      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}*/}
        {/*    >*/}
        {/*      <CartesianGrid strokeDasharray="3 3" />*/}
        {/*      <XAxis dataKey="name" />*/}
        {/*      <YAxis*/}
        {/*        domain={[0, DEFAULT_FULL_RATING]}*/}
        {/*        label={{*/}
        {/*          value: "Рейтинг (%)",*/}
        {/*          angle: -90,*/}
        {/*          position: "insideLeft",*/}
        {/*        }}*/}
        {/*      />*/}
        {/*      <RechartsTooltip />*/}
        {/*      <Legend />*/}
        {/*      <Bar dataKey="value" name="Рейтинг">*/}
        {/*        {roleRatingsData.map((entry, index) => (*/}
        {/*          <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />*/}
        {/*        ))}*/}
        {/*      </Bar>*/}
        {/*    </BarChart>*/}
        {/*  </ResponsiveContainer>*/}
        {/*</div>*/}

        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Обзор навыков
          </h2>
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={skillsRadarData} // Используем адаптированные данные
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, DEFAULT_FULL_RATING]} />
              <Radar
                name="Навыки"
                dataKey="value"
                stroke={GRAPH_COLOR}
                fill={GRAPH_COLOR}
                fillOpacity={GRAPH_FILL_OPACITY}
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
