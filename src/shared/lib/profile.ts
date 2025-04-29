import { Role } from "@/shared/types/profile";

// Helper function to get role display name
export const getRoleDisplayName = (role: Role): string => {
  const roleMap: Record<Role, string> = {
    teamlead: "Тимлид",
    frontend: "Frontend-разработчик",
    backend: "Backend-разработчик",
    design: "Дизайнер",
    analysis: "Бизнес-аналитик",
  };
  return roleMap[role];
};

// Helper function to get role color
export const getRoleColor = (role: Role): string => {
  const colorMap: Record<Role, string> = {
    teamlead: "#4F46E5",
    frontend: "#10B981",
    backend: "#F59E0B",
    design: "#EC4899",
    analysis: "#8B5CF6",
  };
  return colorMap[role];
};
