'use client'
import React, { useState } from 'react';
import { TaskHeader } from '@/page/estimate/components/TaskHeader';
import { SkillsSection } from '@/page/estimate/components/SkillsSection';

// Mock data for the task
const mockTask = {
  title: "Задача по Frontend-разработке: Страница продукта E-commerce",
  description: "Создать адаптивную страницу продукта с возможностями фильтрации, отображением деталей продукта и функцией 'добавить в корзину'. Убедиться, что страница соответствует гайдлайнам дизайн-системы и работает во всех браузерах.",
  deadline: "10 мая 2025",
  implementer: {
    firstName: "Алексей",
    lastName: "Иванов",
    role: "Frontend-разработчик",
    avatar: "/api/placeholder/60/60"
  },
  responsible: {
    firstName: "Светлана",
    lastName: "Петрова",
    role: "Тимлид",
    avatar: "/api/placeholder/60/60"
  }
};

// Mock skills to be rated
const hardSkills = [
  { id: 'reactjs', name: 'React.js' },
  { id: 'nextjs', name: 'Next.js' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'responsive', name: 'Адаптивный дизайн' },
  { id: 'clean-code', name: 'Чистый код' },
  { id: 'css', name: 'CSS/SASS' },
];

const softSkills = [
  { id: 'communication', name: 'Коммуникация' },
  { id: 'problem-solving', name: 'Решение проблем' },
  { id: 'time-management', name: 'Управление временем' },
  { id: 'teamwork', name: 'Работа в команде' },
  { id: 'adaptability', name: 'Адаптивность' },
];

// Define types for ratings and skills
interface Ratings {
  [key: string]: number;
}

interface NotUsedSkills {
  [key: string]: boolean;
}

// Student Rating Page component
export default function StudentRatingPage() {
  // State for storing skill ratings
  const [ratings, setRatings] = useState<Ratings>({});
  // State for storing skills that were not used
  const [notUsedSkills, setNotUsedSkills] = useState<NotUsedSkills>({});
  
  // Handle rating change
  const handleRatingChange = (skillId: string, value: number) => {
    // If skill was marked as not used before, remove that mark
    if (notUsedSkills[skillId]) {
      const updatedNotUsed = { ...notUsedSkills };
      delete updatedNotUsed[skillId];
      setNotUsedSkills(updatedNotUsed);
    }
    
    setRatings(prev => ({
      ...prev,
      [skillId]: value
    }));
  };
  
  // Handle "skill not used" checkbox
  const handleNotUsedChange = (skillId: string, checked: boolean) => {
    if (checked) {
      // Remove any rating if marked as not used
      const updatedRatings = { ...ratings };
      delete updatedRatings[skillId];
      setRatings(updatedRatings);
      
      // Mark as not used
      setNotUsedSkills(prev => ({
        ...prev,
        [skillId]: true
      }));
    } else {
      // Remove from not used
      const updatedNotUsed = { ...notUsedSkills };
      delete updatedNotUsed[skillId];
      setNotUsedSkills(updatedNotUsed);
    }
  };
  
  // Handle form submission
  const handleSubmit = (action: 'estimate-next' | 'finish') => {
    console.log(`Action: ${action}`, { ratings, notUsedSkills });
    // Here you would typically send this data to your backend
    alert(`${action} - Data logged to console`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <TaskHeader
          title={mockTask.title}
          description={mockTask.description}
          implementer={mockTask.implementer}
          responsible={mockTask.responsible}
          deadline={mockTask.deadline}
        />
        
        <SkillsSection
          hardSkills={hardSkills}
          softSkills={softSkills}
          ratings={ratings}
          notUsedSkills={notUsedSkills}
          onRatingChange={handleRatingChange}
          onNotUsedChange={handleNotUsedChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
