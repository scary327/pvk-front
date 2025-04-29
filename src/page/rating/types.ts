export type Role = 'teamlead' | 'frontend' | 'backend' | 'analytics' | 'design';

export type SkillTag = {
  id: number;
  name: string;
  category: Role;
  level?: number;
};

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  teams: string[];
  course: number;
  mainRole: Role;
  rating: number;
  skillTags: SkillTag[];
}; 