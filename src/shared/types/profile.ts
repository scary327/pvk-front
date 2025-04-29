export type Role = "teamlead" | "frontend" | "backend" | "design" | "analysis";

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface UserRoleData {
  role: Role;
  rating: number; // 0-5
  skills: Skill[];
}

export interface UserData {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  teams: string[];
  mainRole: Role;
  roles: UserRoleData[];
}

export interface RoleRatingData {
  name: string;
  value: number;
  color: string;
}

export interface SkillRadarData {
  subject: string;
  value: number;
  fullMark: number;
}
