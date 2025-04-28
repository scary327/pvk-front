'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

// Types definition
type Role = 'teamlead' | 'frontend' | 'backend' | 'analytics' | 'design';

type SkillTag = {
  id: number;
  name: string;
  category: Role;
  level?: number; // 1-100 skill level
};

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  teams: string[];
  course: number; // University course 1-4
  mainRole: Role;
  rating: number;
  skillTags: SkillTag[];
};

// Mock data - university courses
const mockStudents: Student[] = [
  {
    id: 1,
    firstName: 'Alex',
    lastName: 'Johnson',
    avatar: '/avatars/alex.jpg',
    teams: ['Alpha Team', 'Project X'],
    course: 2,
    mainRole: 'frontend',
    rating: 4.8,
    skillTags: [
      { id: 1, name: 'React', category: 'frontend', level: 85 },
      { id: 2, name: 'TypeScript', category: 'frontend', level: 70 },
      { id: 3, name: 'UI/UX', category: 'frontend', level: 60 }
    ]
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Williams',
    avatar: '/avatars/sarah.jpg',
    teams: ['Delta Squad', 'DevOps Masters'],
    course: 3,
    mainRole: 'backend',
    rating: 4.5,
    skillTags: [
      { id: 4, name: 'Node.js', category: 'backend', level: 90 },
      { id: 5, name: 'MongoDB', category: 'backend', level: 75 },
      { id: 6, name: 'AWS', category: 'backend', level: 85 }
    ]
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Chen',
    avatar: '/avatars/michael.jpg',
    teams: ['Data Wizards', 'ML Group'],
    course: 4,
    mainRole: 'analytics',
    rating: 4.9,
    skillTags: [
      { id: 7, name: 'Python', category: 'analytics', level: 95 },
      { id: 8, name: 'Machine Learning', category: 'analytics', level: 85 },
      { id: 9, name: 'Data Visualization', category: 'analytics', level: 80 }
    ]
  },
  {
    id: 4,
    firstName: 'Emma',
    lastName: 'Davis',
    avatar: '/avatars/emma.jpg',
    teams: ['UX Innovators', 'Creative Hub'],
    course: 2,
    mainRole: 'design',
    rating: 4.7,
    skillTags: [
      { id: 10, name: 'Figma', category: 'design', level: 95 },
      { id: 11, name: 'User Research', category: 'design', level: 80 },
      { id: 12, name: 'Prototyping', category: 'design', level: 85 }
    ]
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Garcia',
    avatar: '/avatars/david.jpg',
    teams: ['Project Leaders', 'Agile Masters'],
    course: 1,
    mainRole: 'teamlead',
    rating: 4.6,
    skillTags: [
      { id: 13, name: 'Agile', category: 'teamlead', level: 90 },
      { id: 14, name: 'Leadership', category: 'teamlead', level: 95 },
      { id: 15, name: 'Scrum', category: 'teamlead', level: 85 }
    ]
  }
];

// Available roles
const roles: Role[] = ['teamlead', 'frontend', 'backend', 'analytics', 'design'];

// Rating range
const ratings = [1, 2, 3, 4, 5];

// All possible skills for search
const allSkills = [
  'React', 'Angular', 'Vue', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'SASS',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'GCP', 'Azure',
  'Python', 'Machine Learning', 'Data Visualization', 'R', 'TensorFlow', 'Pandas', 'NumPy',
  'Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping', 'UI Design', 'UX Design',
  'Agile', 'Leadership', 'Scrum', 'Product Management', 'Project Management', 'DevOps',
  'Git', 'Docker', 'Kubernetes', 'CI/CD', 'Testing', 'Jest', 'Selenium', 'Cypress',
  'GraphQL', 'REST API', 'Microservices', 'System Design', 'Algorithms', 'Data Structures'
];

export default function StudentsRatingTable() {
  // State variables
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | 'All Roles'>('All Roles');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSkillTags, setSelectedSkillTags] = useState<{name: string, level: number}[]>([]);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>(allSkills);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null,
    direction: 'ascending' | 'descending'
  }>({ key: null, direction: 'ascending' });
  
  // Filter skills based on search
  useEffect(() => {
    if (skillSearchQuery.trim() === '') {
      setFilteredSkills(allSkills);
    } else {
      const query = skillSearchQuery.toLowerCase();
      setFilteredSkills(
        allSkills.filter(skill => 
          skill.toLowerCase().includes(query) && 
          !selectedSkillTags.some(tag => tag.name === skill)
        )
      );
    }
  }, [skillSearchQuery, selectedSkillTags]);

  // Filter students based on all filters
  useEffect(() => {
    let result = [...students];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(student => 
        student.firstName.toLowerCase().includes(query) || 
        student.lastName.toLowerCase().includes(query) ||
        student.teams.some(team => team.toLowerCase().includes(query))
      );
    }

    // Filter by course
    if (selectedCourse !== null) {
      result = result.filter(student => student.course === selectedCourse);
    }

    // Filter by role
    if (selectedRole !== 'All Roles') {
      result = result.filter(student => student.mainRole === selectedRole);
    }

    // Filter by rating
    if (selectedRating !== null) {
      result = result.filter(student => Math.floor(student.rating) >= selectedRating);
    }

    // Filter by skill tags with level
    if (selectedSkillTags.length > 0) {
      result = result.filter(student => 
        selectedSkillTags.every(selectedTag => {
          const studentTag = student.skillTags.find(tag => tag.name === selectedTag.name);
          return studentTag && (studentTag.level || 0) >= selectedTag.level;
        })
      );
    }

    // Sort if needed
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === 'name') {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          if (nameA < nameB) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (nameA > nameB) return sortConfig.direction === 'ascending' ? 1 : -1;
          return 0;
        }
        
        if (sortConfig.key === 'rating') {
          return sortConfig.direction === 'ascending' 
            ? a.rating - b.rating 
            : b.rating - a.rating;
        }
        
        if (sortConfig.key === 'course') {
          return sortConfig.direction === 'ascending' 
            ? a.course - b.course 
            : b.course - a.course;
        }
        
        return 0;
      });
    }

    setFilteredStudents(result);
  }, [searchQuery, selectedCourse, selectedRole, selectedRating, selectedSkillTags, sortConfig, students]);

  // Handle sort requests
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Add a skill tag
  const addSkillTag = (skill: string) => {
    if (!selectedSkillTags.some(tag => tag.name === skill)) {
      setSelectedSkillTags([...selectedSkillTags, { name: skill, level: 50 }]);
    }
    setSkillSearchQuery('');
  };

  // Remove a skill tag
  const removeSkillTag = (skillName: string) => {
    setSelectedSkillTags(selectedSkillTags.filter(tag => tag.name !== skillName));
  };

  // Update skill level
  const updateSkillLevel = (skillName: string, level: number) => {
    setSelectedSkillTags(
      selectedSkillTags.map(tag => 
        tag.name === skillName ? { ...tag, level } : tag
      )
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCourse(null);
    setSelectedRole('All Roles');
    setSelectedRating(null);
    setSelectedSkillTags([]);
    setSortConfig({ key: null, direction: 'ascending' });
  };

  // Role badge color mapping
  const getRoleBadgeColor = (role: Role) => {
    const colorMap: Record<Role, string> = {
      teamlead: 'bg-purple-100 text-purple-800',
      frontend: 'bg-blue-100 text-blue-800',
      backend: 'bg-green-100 text-green-800',
      analytics: 'bg-yellow-100 text-yellow-800',
      design: 'bg-pink-100 text-pink-800'
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800';
  };

  // Rating star rendering
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Ratings</h1>
          <p className="mt-2 text-gray-600">Browse and filter IT students by various criteria</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4 md:mb-0">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h2>
            <button
              onClick={resetFilters}
              className="text-sm text-[#636ae8] hover:text-blue-800 font-medium"
            >
              Reset All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search by Name or Team
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="focus:ring-[#636ae8] focus:border-[#636ae8] block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Course Filter - University courses 1-4 */}
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                University Course Year
              </label>
              <select
                id="course"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#636ae8] focus:border-[#636ae8] sm:text-sm rounded-md h-10"
                value={selectedCourse === null ? '' : selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Main Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#636ae8] focus:border-[#636ae8] sm:text-sm rounded-md h-10"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role | 'All Roles')}
              >
                <option value="All Roles">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <select
                id="rating"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#636ae8] focus:border-[#636ae8] sm:text-sm rounded-md h-10"
                value={selectedRating || ''}
                onChange={(e) => setSelectedRating(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Any Rating</option>
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}+ Stars
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skill Tags Filter - Updated: Combined search with tags list */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Tags with Level Requirements
            </label>
            
            {/* Search input for skills */}
            <div className="relative mb-3">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-[#636ae8] focus:border-[#636ae8] block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="Search for skills to add..."
                  value={skillSearchQuery}
                  onChange={(e) => setSkillSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Skill tags list filtered by search */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkillTag(skill)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                    >
                      {skill}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No matching skills found</p>
                )}
              </div>
            </div>
            
            {/* Selected skill tags with level sliders */}
            {selectedSkillTags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Skills with Required Level</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedSkillTags.map((tag) => (
                    <div key={tag.name} className="flex flex-col bg-[#636ae8]/10 border border-[#636ae8]/30 rounded-md p-2 w-40">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-800">{tag.name}</span>
                        <button 
                          onClick={() => removeSkillTag(tag.name)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={tag.level}
                          onChange={(e) => updateSkillLevel(tag.name, Number(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs w-7 text-gray-600">{tag.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Students Table - Updated header color to primary */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-[#636ae8] text-white">
            <h3 className="text-lg leading-6 font-medium">
              Students ({filteredStudents.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#636ae8]/10">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider">
                    Teams
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('course')}
                  >
                    <div className="flex items-center">
                      Course Year
                      {sortConfig.key === 'course' && (
                        sortConfig.direction === 'ascending' 
                          ? <ChevronUp className="h-4 w-4 ml-1" /> 
                          : <ChevronDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider">
                    Main Role
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('rating')}
                  >
                    <div className="flex items-center">
                      Rating
                      {sortConfig.key === 'rating' && (
                        sortConfig.direction === 'ascending' 
                          ? <ChevronUp className="h-4 w-4 ml-1" /> 
                          : <ChevronDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider">
                    Skills
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                              {student.avatar ? (
                                <img 
                                  src="/api/placeholder/40/40" 
                                  alt={`${student.firstName} ${student.lastName}`} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-xl text-gray-600">
                                  {student.firstName[0]}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.teams.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.course}{getOrdinalSuffix(student.course)} Year</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                            student.mainRole
                          )}`}
                        >
                          {student.mainRole.charAt(0).toUpperCase() + student.mainRole.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderRatingStars(student.rating)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {student.skillTags.map((tag) => (
                            <div
                              key={tag.id}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                            >
                              <span className="mr-1">{tag.name}</span>
                              <span className="bg-[#636ae8] text-white px-1 rounded text-xs">
                                {tag.level || 0}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No students match your filter criteria. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get ordinal suffix for course year
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}