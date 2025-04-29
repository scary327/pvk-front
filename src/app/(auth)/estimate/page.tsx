'use client';

import { useState } from 'react';
import { TasksTable } from '@/page/estimate/components/TasksTable';

// Define types
type Role = 'teamlead' | 'frontend' | 'backend' | 'design' | 'analytics';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: Role;
}

interface Task {
  id: string;
  title: string;
  description: string;
  implementer: User;
  responsibleUser: User;
  deadlineDate: string;
  isEstimated: boolean;
  estimationDate?: string;
}

// Sample data
const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Создание UI главной страницы',
    description: 'Разработка и реализация интерфейса главной страницы с адаптивной версткой',
    implementer: {
      id: 'u1',
      firstName: 'Иван',
      lastName: 'Смирнов',
      avatarUrl: '/api/placeholder/32/32',
      role: 'frontend'
    },
    responsibleUser: {
      id: 'u5',
      firstName: 'Мария',
      lastName: 'Чен',
      avatarUrl: '/api/placeholder/32/32',
      role: 'teamlead'
    },
    deadlineDate: '2025-05-15',
    isEstimated: true,
    estimationDate: '2025-04-20'
  },
  {
    id: '2',
    title: 'Интеграция API',
    description: 'Подключение фронтенда к бэкенд API для аутентификации пользователей',
    implementer: {
      id: 'u2',
      firstName: 'Алексей',
      lastName: 'Иванов',
      avatarUrl: '/api/placeholder/32/32',
      role: 'backend'
    },
    responsibleUser: {
      id: 'u5',
      firstName: 'Мария',
      lastName: 'Чен',
      avatarUrl: '/api/placeholder/32/32',
      role: 'teamlead'
    },
    deadlineDate: '2025-05-20',
    isEstimated: true,
    estimationDate: '2025-04-22'
  },
  {
    id: '3',
    title: 'Проектирование схемы базы данных',
    description: 'Создание схемы базы данных для профилей пользователей и управления задачами',
    implementer: {
      id: 'u3',
      firstName: 'Светлана',
      lastName: 'Петрова',
      avatarUrl: '/api/placeholder/32/32',
      role: 'backend'
    },
    responsibleUser: {
      id: 'u5',
      firstName: 'Мария',
      lastName: 'Чен',
      avatarUrl: '/api/placeholder/32/32',
      role: 'teamlead'
    },
    deadlineDate: '2025-05-10',
    isEstimated: false
  },
  {
    id: '4',
    title: 'Библиотека UI компонентов',
    description: 'Создание переиспользуемых UI компонентов для обеспечения единого дизайна приложения',
    implementer: {
      id: 'u4',
      firstName: 'Михаил',
      lastName: 'Козлов',
      avatarUrl: '/api/placeholder/32/32',
      role: 'design'
    },
    responsibleUser: {
      id: 'u5',
      firstName: 'Мария',
      lastName: 'Чен',
      avatarUrl: '/api/placeholder/32/32',
      role: 'teamlead'
    },
    deadlineDate: '2025-05-25',
    isEstimated: false
  }
];

export default function TaskRatingPage() {
  const estimatedTasks = sampleTasks.filter(task => task.isEstimated);
  const nonEstimatedTasks = sampleTasks.filter(task => !task.isEstimated);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--color-default-text)' }}>
        Система оценки задач IT-студентов
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TasksTable tasks={nonEstimatedTasks} type="non-estimated" />
        <TasksTable tasks={estimatedTasks} type="estimated" />
      </div>
    </div>
  );
}