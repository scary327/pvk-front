import React, { memo } from "react";
// import { RoleRatingData, SkillRadarData } from "@/shared/types/profile"; // Старые типы
import { ProfileSkillCategoriesResponse } from "@/shared/types/api/profile"; // Новый тип
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
  // roleRatingsData: RoleRatingData[]; // Заменено
  // skillsRadarData: SkillRadarData[]; // Заменено
  skillCategoriesData: ProfileSkillCategoriesResponse;
}

export const ProfileOverviewTab = memo(
  // ({ roleRatingsData, skillsRadarData }: ProfileOverviewTabProps) => { // Старые пропсы
  ({ skillCategoriesData }: ProfileOverviewTabProps) => {
    // Новый пропс
    // TODO: Адаптировать логику для графиков на основе skillCategoriesData
    // Например, можно отобразить общий рейтинг по категориям или наиболее прокачанные навыки
    const roleRatingsData = skillCategoriesData.map((item) => ({
      name: item.category.name,
      value: item.rating * 100, // Пример преобразования, если рейтинг 0-1
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Случайный цвет для примера
    }));

    const skillsRadarData = skillCategoriesData.reduce((acc, category) => {
      category.skills.forEach((skill) => {
        acc.push({
          subject: skill.name,
          value: skill.rating, // Предполагаем, что рейтинг навыка уже в нужной шкале
          fullMark: 100, // Или максимальный возможный рейтинг
        });
      });
      return acc;
    }, [] as { subject: string; value: number; fullMark: number }[]);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {/* Рейтинг по ролям - возможно, "Рейтинг по категориям" */}
            Рейтинг по категориям
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={roleRatingsData} // Используем адаптированные данные
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
                {/* Используем адаптированные данные */}
                {roleRatingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
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
              data={skillsRadarData} // Используем адаптированные данные
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
