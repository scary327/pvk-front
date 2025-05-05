import React, { memo, useState, useRef } from "react";
import { UserRoleData } from "@/shared/types/profile";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { SkillTag } from "@/shared/ui/SkillTag/SkillTag";
import { allSoftSkills } from "@/shared/api/mocks/profileData";
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

// Маппинг ролей к их умениям
const roleSkillsMap: Record<string, string[]> = {
  frontend: [
    "React", "TypeScript", "Next.js", "CSS/SCSS", "Redux", "Vue", "Angular",
    "JavaScript", "HTML", "Webpack", "Vite", "Tailwind", "Sass", "Jest"
  ],
  backend: [
    "Node.js", "NestJS", "Express", "MongoDB", "PostgreSQL", "Python",
    "Django", "Flask", "Java", "Spring", "Go", "Rust", "GraphQL", "REST API"
  ],
  teamlead: [
    "Agile", "Jira", "Code Reviews", "Mentoring", "Project Planning",
    "Scrum", "Kanban", "Team Management", "Risk Management", "Budget Planning"
  ],
  design: [
    "Figma", "UI Design", "UX Principles", "Design Systems", "Wireframing",
    "Adobe XD", "Sketch", "Prototyping", "User Research", "Visual Design"
  ],
  analytics: [
    "Requirements", "Data Analytics", "User Stories", "Testing", "Documentation",
    "Business Analysis", "Data Visualization", "SQL", "Python", "Statistics"
  ],
  softskills: allSoftSkills
};

export const ProfileRoleTab = memo(
  ({ role, roleColor }: ProfileRoleTabProps) => {
    const isCurrentUser = true;
    const [skills, setSkills] = useState(role.skills);
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [search, setSearch] = useState("");
    const addBtnRef = useRef<HTMLDivElement>(null);

    const requiredSkills = skills.filter(s => s.required);
    const optionalSkills = skills.filter(s => !s.required);

    const userSkillNames = skills.map(s => s.name);
    const availableToAdd = (roleSkillsMap[role.role] || []).filter(
      s => !userSkillNames.includes(s) && s.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddSkill = (name: string) => {
      setSkills([...skills, { name, level: 0 }]);
      setShowAddPanel(false);
      setSearch("");
    };

    const handleRemoveSkill = (name: string) => {
      setSkills(skills.filter(s => s.name !== name));
    };

    const handlePanelClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Навыки</h2>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-500">Рейтинг:</span>
            <StarRating rating={role.rating} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Навыки</h3>
          <div className="flex flex-wrap items-center gap-2">
            {requiredSkills.map((skill, index) => (
              <SkillTag key={"req-"+index} skill={skill} color={roleColor} />
            ))}
            {optionalSkills.map((skill, index) => (
              <div key={"opt-"+index} className="relative group">
                <SkillTag skill={skill} color={roleColor} />
                {isCurrentUser && (
                  <button
                    className="absolute inset-0 bg-red-600 bg-opacity-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    onClick={() => handleRemoveSkill(skill.name)}
                    title="Удалить умение"
                  >
                    <span className="text-white text-lg">✕</span>
                  </button>
                )}
              </div>
            ))}
            {isCurrentUser && (
              <div
                ref={addBtnRef}
                className="relative inline-flex items-center justify-center h-7 px-3 rounded-full text-sm font-medium border-2 border-dashed cursor-pointer hover:bg-opacity-10 select-none"
                style={{
                  borderColor: roleColor,
                  color: roleColor,
                  backgroundColor: `${roleColor}10`
                }}
                onClick={() => setShowAddPanel(v => !v)}
              >
                <span className="text-lg font-bold mr-1">+</span>
                <span>Добавить</span>
                {showAddPanel && (
                  <div 
                    className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72 animate-fade-in"
                    style={{
                      top: 'calc(100% + 8px)',
                      left: '0'
                    }}
                    onClick={handlePanelClick}
                  >
                    <div className="font-semibold mb-2">Добавление умения</div>
                    <input
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      placeholder="Поиск умения..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      autoFocus
                    />
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {availableToAdd.length === 0 && (
                        <span className="text-xs text-gray-400">Нет доступных умений</span>
                      )}
                      {availableToAdd.map((name) => (
                        <button
                          key={name}
                          className="px-2 py-1 rounded-full text-xs font-medium hover:bg-opacity-20 transition"
                          style={{
                            backgroundColor: `${roleColor}10`,
                            color: roleColor
                          }}
                          onClick={() => handleAddSkill(name)}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            Уровень владения навыками
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={skills.map((skill) => ({
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
