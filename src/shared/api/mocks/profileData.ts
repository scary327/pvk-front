import { UserData } from "@/shared/types/profile";

// Mock data for the profile
export const userData: UserData = {
  firstName: "Alex",
  lastName: "Johnson",
  avatarUrl: "/api/placeholder/150/150",
  teams: ["Web Platform", "Mobile App", "DevOps"],
  mainRole: "backend",
  roles: [
    {
      role: "frontend",
      rating: 4.5,
      skills: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "CSS/SCSS", level: 75 },
        { name: "Redux", level: 70 },
      ],
    },
    {
      role: "backend",
      rating: 3.8,
      skills: [
        { name: "Node.js", level: 75 },
        { name: "NestJS", level: 65 },
        { name: "Express", level: 70 },
        { name: "MongoDB", level: 60 },
        { name: "PostgreSQL", level: 55 },
      ],
    },
    {
      role: "teamlead",
      rating: 4.2,
      skills: [
        { name: "Agile", level: 85 },
        { name: "Jira", level: 80 },
        { name: "Code Reviews", level: 90 },
        { name: "Mentoring", level: 75 },
        { name: "Project Planning", level: 70 },
      ],
    },
    {
      role: "design",
      rating: 3.2,
      skills: [
        { name: "Figma", level: 65 },
        { name: "UI Design", level: 60 },
        { name: "UX Principles", level: 55 },
        { name: "Design Systems", level: 50 },
        { name: "Wireframing", level: 70 },
      ],
    },
    {
      role: "analysis",
      rating: 3.5,
      skills: [
        { name: "Requirements", level: 75 },
        { name: "Data Analysis", level: 70 },
        { name: "User Stories", level: 80 },
        { name: "Testing", level: 65 },
        { name: "Documentation", level: 60 },
      ],
    },
  ],
};
