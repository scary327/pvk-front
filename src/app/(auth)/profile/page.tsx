// app/profile/page.tsx

'use client';

import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Progress from '@radix-ui/react-progress';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Tabs from '@radix-ui/react-tabs';
import { Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Define types
type Role = 'teamlead' | 'frontend' | 'backend' | 'design' | 'analysis';

interface Skill {
  name: string;
  level: number; // 0-100
}

interface UserRoleData {
  role: Role;
  rating: number; // 0-5
  skills: Skill[];
}

interface UserData {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  teams: string[];
  mainRole: Role;
  roles: UserRoleData[];
}

// Mock data for the profile
const userData: UserData = {
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
        { name: "Redux", level: 70 }
      ]
    },
    {
      role: "backend",
      rating: 3.8,
      skills: [
        { name: "Node.js", level: 75 },
        { name: "NestJS", level: 65 },
        { name: "Express", level: 70 },
        { name: "MongoDB", level: 60 },
        { name: "PostgreSQL", level: 55 }
      ]
    },
    {
      role: "teamlead",
      rating: 4.2,
      skills: [
        { name: "Agile", level: 85 },
        { name: "Jira", level: 80 },
        { name: "Code Reviews", level: 90 },
        { name: "Mentoring", level: 75 },
        { name: "Project Planning", level: 70 }
      ]
    },
    {
      role: "design",
      rating: 3.2,
      skills: [
        { name: "Figma", level: 65 },
        { name: "UI Design", level: 60 },
        { name: "UX Principles", level: 55 },
        { name: "Design Systems", level: 50 },
        { name: "Wireframing", level: 70 }
      ]
    },
    {
      role: "analysis",
      rating: 3.5,
      skills: [
        { name: "Requirements", level: 75 },
        { name: "Data Analysis", level: 70 },
        { name: "User Stories", level: 80 },
        { name: "Testing", level: 65 },
        { name: "Documentation", level: 60 }
      ]
    }
  ]
};

const MinimalistProfileHeader = () => {
    return (
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-6 flex flex-col md:flex-row items-center md:items-start">
          {/* Avatar */}
          <Avatar.Root className="flex-shrink-0 mr-6 mb-4 md:mb-0">
            <Avatar.Image
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-100 shadow"
              src={userData.avatarUrl}
              alt={`${userData.firstName} ${userData.lastName}`}
            />
            <Avatar.Fallback className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-semibold">
              {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
            </Avatar.Fallback>
          </Avatar.Root>
          
          {/* Basic Info */}
          <div className="flex-grow text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {userData.firstName} {userData.lastName}
              </h1>
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-opacity-20 mt-2 md:mt-0 md:ml-4 self-center md:self-auto"
                style={{ 
                  backgroundColor: `${getRoleColor(userData.mainRole)}20`,
                  color: getRoleColor(userData.mainRole)
                }}
              >
                {getRoleDisplayName(userData.mainRole)}
              </span>
            </div>
            
            {/* Teams */}
            <div className="mt-3">
              <h2 className="text-sm font-medium text-gray-500">Teams</h2>
              <div className="mt-1 flex flex-wrap justify-center md:justify-start">
                {userData.teams.map((team, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2"
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Header Variant 2: Compact Side-by-side Layout
  // This variant is good when you want to save vertical space
  const CompactProfileHeader = () => {
    return (
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 flex flex-wrap items-center">
          {/* Left side: Avatar and name */}
          <div className="flex items-center mr-8 mb-4 lg:mb-0">
            <Avatar.Root className="inline-flex mr-4">
              <Avatar.Image
                className="h-16 w-16 rounded-full object-cover"
                src={userData.avatarUrl}
                alt={`${userData.firstName} ${userData.lastName}`}
              />
              <Avatar.Fallback className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-semibold">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </Avatar.Fallback>
            </Avatar.Root>
            
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {userData.firstName} {userData.lastName}
              </h1>
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-opacity-20 mt-1"
                style={{ 
                  backgroundColor: `${getRoleColor(userData.mainRole)}20`,
                  color: getRoleColor(userData.mainRole)
                }}
              >
                {getRoleDisplayName(userData.mainRole)}
              </span>
            </div>
          </div>
          
          {/* Right side: Teams */}
          <div className="flex-grow">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Teams</h2>
            <div className="flex flex-wrap">
              {userData.teams.map((team, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2"
                >
                  {team}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Header Variant 3: Card with Tabs Integrated
  // This variant integrates the tabs right into the header card
  const IntegratedTabsProfileHeader = () => {
    return (
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row">
          {/* Avatar */}
          <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0 md:mr-6">
            <Avatar.Root className="inline-flex">
              <Avatar.Image
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow"
                src={userData.avatarUrl}
                alt={`${userData.firstName} ${userData.lastName}`}
              />
              <Avatar.Fallback className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-semibold border-4 border-white shadow">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
          
          {/* Info */}
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {userData.firstName} {userData.lastName}
            </h1>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-opacity-20 mr-2 mb-2"
                style={{ 
                  backgroundColor: `${getRoleColor(userData.mainRole)}20`,
                  color: getRoleColor(userData.mainRole)
                }}
              >
                {getRoleDisplayName(userData.mainRole)}
              </span>
              {userData.teams.map((team, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2"
                >
                  {team}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Integrated Tab Navigation */}
        <Tabs.Root> <Tabs.List className="flex border-t border-gray-200 bg-gray-50">
          <Tabs.Trigger 
            value="overview" 
            className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 data-[state=active]:border-t-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          >
            Overview
          </Tabs.Trigger>
          {userData.roles.map((role) => (
            <Tabs.Trigger 
              key={role.role}
              value={role.role} 
              className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 data-[state=active]:border-t-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              {getRoleDisplayName(role.role)}
            </Tabs.Trigger>
          ))}
        </Tabs.List></Tabs.Root>
       
      </div>
    );
  };
  
  // Header Variant 4: Banner Style with Cover Image
  // This variant has a cover image with profile info overlaid
  const BannerProfileHeader = () => {
    return (
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        {/* Cover Image */}
        <div 
          className="h-40 bg-cover bg-center relative"
          style={{ 
            backgroundImage: "url('/api/placeholder/800/200')",
            backgroundColor: "#4F46E5" // Fallback color
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pt-4 pb-6 relative">
          {/* Avatar positioned on top of cover */}
          <div className="absolute -top-16 left-6">
            <Avatar.Root className="inline-flex">
              <Avatar.Image
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow"
                src={userData.avatarUrl}
                alt={`${userData.firstName} ${userData.lastName}`}
              />
              <Avatar.Fallback className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-semibold border-4 border-white shadow">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
          
          {/* Name and Details - with padding to avoid avatar */}
          <div className="ml-32 sm:ml-0 sm:mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                {userData.firstName} {userData.lastName}
              </h1>
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0"
                style={{ 
                  backgroundColor: `${getRoleColor(userData.mainRole)}20`,
                  color: getRoleColor(userData.mainRole)
                }}
              >
                {getRoleDisplayName(userData.mainRole)}
              </span>
            </div>
            
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Teams</h2>
              <div className="flex flex-wrap">
                {userData.teams.map((team, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2"
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Header Variant 5: Card with Stats Preview
  // This variant includes a preview of key stats right in the header
  const StatsPreviewProfileHeader = () => {
    // Calculate some stats for the preview
    const totalSkills = userData.roles.reduce((acc, role) => acc + role.skills.length, 0);
    const avgRating = userData.roles.reduce((acc, role) => acc + role.rating, 0) / userData.roles.length;
    const topSkill = userData.roles
      .flatMap(role => role.skills)
      .reduce((max, skill) => skill.level > max.level ? skill : max, { name: '', level: 0 });
    
    return (
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Avatar and Basic Info */}
            <div className="flex mb-6 md:mb-0 md:mr-8">
              <Avatar.Root className="flex-shrink-0 mr-4">
                <Avatar.Image
                  className="h-20 w-20 rounded-full object-cover"
                  src={userData.avatarUrl}
                  alt={`${userData.firstName} ${userData.lastName}`}
                />
                <Avatar.Fallback className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </Avatar.Fallback>
              </Avatar.Root>
              
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {userData.firstName} {userData.lastName}
                </h1>
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-opacity-20 mt-1"
                  style={{ 
                    backgroundColor: `${getRoleColor(userData.mainRole)}20`,
                    color: getRoleColor(userData.mainRole)
                  }}
                >
                  {getRoleDisplayName(userData.mainRole)}
                </span>
                
                <div className="mt-2">
                  {userData.teams.map((team, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-1 mb-1"
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Stats Preview */}
            <div className="flex-grow grid grid-cols-3 gap-4 text-center">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">{userData.roles.length}</div>
                <div className="text-xs text-gray-500">Roles</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">{totalSkills}</div>
                <div className="text-xs text-gray-500">Skills</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">{avgRating.toFixed(1)}</div>
                <div className="text-xs text-gray-500">Avg. Rating</div>
              </div>
            </div>
          </div>
          
          {/* Best Skill Preview */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="text-sm font-medium text-gray-500 mb-2">Top Skill: {topSkill.name}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${topSkill.level}%`,
                  backgroundColor: getRoleColor(userData.mainRole)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Helper function to get role display name
const getRoleDisplayName = (role: Role): string => {
  const roleMap: Record<Role, string> = {
    teamlead: "Team Lead",
    frontend: "Frontend Developer",
    backend: "Backend Developer",
    design: "Designer",
    analysis: "Business Analyst"
  };
  return roleMap[role];
};

// Helper function to get role color
const getRoleColor = (role: Role): string => {
  const colorMap: Record<Role, string> = {
    teamlead: "#4F46E5",
    frontend: "#10B981",
    backend: "#F59E0B",
    design: "#EC4899",
    analysis: "#8B5CF6"
  };
  return colorMap[role];
};

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {hasHalfStar && (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      <span className="ml-2 text-sm font-medium text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
};

// Skill Tag Component
const SkillTag = ({ skill, color }: { skill: Skill; color: string }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div 
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2" 
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            {skill.name} {skill.level}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content 
            className="bg-white p-2 rounded shadow-lg border border-gray-200 z-50"
            sideOffset={5}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{skill.name}</span>
              <div className="flex items-center mt-1">
                <Progress.Root 
                  className="relative overflow-hidden bg-gray-200 rounded-full w-32 h-2" 
                  value={skill.level}
                >
                  <Progress.Indicator 
                    className="h-full transition-transform" 
                    style={{ 
                      transform: `translateX(-${100 - skill.level}%)`,
                      backgroundColor: color
                    }} 
                  />
                </Progress.Root>
                <span className="ml-2 text-xs font-medium">{skill.level}%</span>
              </div>
            </div>
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

// Profile Page Component
export default function ProfilePage() {
  // For charts data
  const roleRatingsData = userData.roles.map(role => ({
    name: getRoleDisplayName(role.role),
    value: role.rating * 20, // Convert 0-5 scale to 0-100 for charts
    color: getRoleColor(role.role)
  }));

  const skillsRadarData = userData.roles.map(role => {
    const avgSkillLevel = role.skills.reduce((sum, skill) => sum + skill.level, 0) / role.skills.length;
    return {
      subject: getRoleDisplayName(role.role),
      value: avgSkillLevel,
      fullMark: 100
    };
  });

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        {/* <MinimalistProfileHeader /> */}
        {/* OR */}
        {/* <CompactProfileHeader /> */}
        {/* OR */}
        {/* <IntegratedTabsProfileHeader /> */}
        {/* OR */}
        {/* <BannerProfileHeader /> */}
        {/* OR */}
        <StatsPreviewProfileHeader />
        
        {/* Skills & Ratings Section */}
        <div className="mt-8">
          <Tabs.Root defaultValue="overview" className="w-full">
            <Tabs.List className="flex border-b border-gray-200 mb-6">
              <Tabs.Trigger 
                value="overview" 
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Overview
              </Tabs.Trigger>
              {userData.roles.map((role) => (
                <Tabs.Trigger 
                  key={role.role}
                  value={role.role} 
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  {getRoleDisplayName(role.role)}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            
            {/* Overview Tab */}
            <Tabs.Content value="overview" className="outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow ">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Role Ratings</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={roleRatingsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} label={{ value: 'Rating (%)', angle: -90, position: 'insideLeft' }} />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" name="Rating">
                        {roleRatingsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills Overview</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Skills"
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
            </Tabs.Content>
            
            {/* Role-specific Tabs */}
            {userData.roles.map((role) => (
              <Tabs.Content key={role.role} value={role.role} className="outline-none">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {getRoleDisplayName(role.role)} Skills
                    </h2>
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
                        <SkillTag 
                          key={index} 
                          skill={skill} 
                          color={getRoleColor(role.role)} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Skills Bar Chart */}
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Skill Proficiency</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={role.skills.map(skill => ({ name: skill.name, value: skill.level }))}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" width={100} />
                        <RechartsTooltip />
                        <Bar dataKey="value" fill={getRoleColor(role.role)} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}