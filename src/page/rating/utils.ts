import { Role } from './types';

export const getRoleBadgeColor = (role: Role) => {
  const colorMap: Record<Role, string> = {
    teamlead: 'bg-purple-100 text-purple-800',
    frontend: 'bg-blue-100 text-blue-800',
    backend: 'bg-green-100 text-green-800',
    analytics: 'bg-yellow-100 text-yellow-800',
    design: 'bg-pink-100 text-pink-800'
  };
  return colorMap[role] || 'bg-gray-100 text-gray-800';
};

export const getOrdinalSuffix = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return "-й";
  }
  if (j === 2 && k !== 12) {
    return "-й";
  }
  if (j === 3 && k !== 13) {
    return "-й";
  }
  return "-й";
}; 