'use client';

import { useState, useEffect } from 'react';
import { Filters } from '@/page/rating/components/Filters';
import { StudentsTable } from '@/page/rating/components/StudentsTable';
import { Role, Student } from '@/page/rating/types';

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
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
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
    if (selectedRole !== null) {
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

  return (
    <div className="bg-bg-default min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Рейтинг студентов</h1>
          <p className="mt-2 text-gray-600">Просмотр и фильтрация IT-студентов по различным критериям</p>
        </div>

        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          skillSearchQuery={skillSearchQuery}
          setSkillSearchQuery={setSkillSearchQuery}
          filteredSkills={filteredSkills}
          addSkillTag={addSkillTag}
          selectedSkillTags={selectedSkillTags}
          removeSkillTag={removeSkillTag}
          updateSkillLevel={updateSkillLevel}
          resetFilters={resetFilters}
          roles={roles}
          ratings={ratings}
        />

        <StudentsTable
          students={filteredStudents}
          sortConfig={sortConfig}
          requestSort={requestSort}
        />
      </div>
    </div>
  );
}