'use client';

import { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';

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
    title: 'Create homepage UI',
    description: 'Design and implement the main page interface with responsive layout',
    implementer: {
      id: 'u1',
      firstName: 'John',
      lastName: 'Smith',
      avatarUrl: '/api/placeholder/32/32',
      role: 'frontend'
    },
    responsibleUser: {
      id: 'u5',
      firstName: 'Maria',
      lastName: 'Chen',
      avatarUrl: '/api/placeholder/32/32',
      role: 'teamlead'
    },
    deadlineDate: '2025-05-15',
    isEstimated: true,
    estimationDate: '2025-04-20'
  },
  {
    id: '2',
    title: 'API integration',
    description: 'Connect frontend to backend APIs for user authentication',
    implementer: {
      id: 'u2',
      firstName: 'Alex',
      lastName: 'Johnson',
      avatarUrl: '/api/placeholder/32/32',
      role: 'backend'
    },
    responsibleUser: {
      id: 'u5',
      firstName: 'Maria',
      lastName: 'Chen',
      avatarUrl: '/api/placeholder/32/32',
      role: 'teamlead'
    },
    deadlineDate: '2025-05-20',
    isEstimated: true,
    estimationDate: '2025-04-22'
  },
  {
    id: '3',
    title: 'Database schema design',
    description: 'Create database schema for user profiles and task management',
    implementer: {
      id: 'u3',
      firstName: 'Sarah',
      lastName: 'Williams',
      avatarUrl: '/api/placeholder/32/32',
      role: 'backend'
    },
    responsibleUser: {
      id: 'u5',
      firstName: 'Maria',
      lastName: 'Chen',
      avatarUrl: '/api/placeholder/32/32',
      role: 'teamlead'
    },
    deadlineDate: '2025-05-10',
    isEstimated: false
  },
  {
    id: '4',
    title: 'UI component library',
    description: 'Create reusable UI components for consistent design across the application',
    implementer: {
      id: 'u4',
      firstName: 'Michael',
      lastName: 'Brown',
      avatarUrl: '/api/placeholder/32/32',
      role: 'design'
    },
    responsibleUser: {
      id: 'u5',
      firstName: 'Maria',
      lastName: 'Chen',
      avatarUrl: '/api/placeholder/32/32',
      role: 'teamlead'
    },
    deadlineDate: '2025-05-25',
    isEstimated: false
  }
];

// Role badge colors
const roleBadgeColors = {
  teamlead: 'bg-blue-600 text-white',
  frontend: 'bg-green-600 text-white',
  backend: 'bg-purple-600 text-white',
  design: 'bg-orange-600 text-white',
  analytics: 'bg-cyan-600 text-white'
};

// User display component for consistent rendering
const UserDisplay = ({ user }: { user: User }) => (
  <div className="flex items-center gap-2">
    <Avatar.Root className="inline-flex h-8 w-8 rounded-full">
      <Avatar.Image 
        className="h-full w-full rounded-full object-cover"
        src={user.avatarUrl} 
        alt={`${user.firstName} ${user.lastName}`} 
      />
      <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
        {user.firstName[0]}{user.lastName[0]}
      </Avatar.Fallback>
    </Avatar.Root>
    <div>
      <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
      <span className={`inline-block px-2 py-1 text-xs rounded-full ${roleBadgeColors[user.role]}`}>
        {user.role}
      </span>
    </div>
  </div>
);

export default function TaskRatingPage() {
  const estimatedTasks = sampleTasks.filter(task => task.isEstimated);
  const nonEstimatedTasks = sampleTasks.filter(task => !task.isEstimated);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--color-default-text)' }}>
        IT Students Task Rating System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tasks to Estimate (Left) */}
        <div className="rounded-md overflow-hidden border border-gray-200">
          <div className="py-4 px-6" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)' }}>
            <h2 className="text-xl font-bold">Tasks to Estimate</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium">Task</th>
                  <th className="text-left py-3 px-4 font-medium">Implementer</th>
                  <th className="text-left py-3 px-4 font-medium">Responsible</th>
                  <th className="text-left py-3 px-4 font-medium">Deadline</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {nonEstimatedTasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No tasks to estimate
                    </td>
                  </tr>
                ) : (
                  nonEstimatedTasks.map((task) => (
                    <tr 
                      key={task.id} 
                      className="border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-medium">{task.title}</td>
                      <td className="py-3 px-4">
                        <UserDisplay user={task.implementer} />
                      </td>
                      <td className="py-3 px-4">
                        <UserDisplay user={task.responsibleUser} />
                      </td>
                      <td className="py-3 px-4">{new Date(task.deadlineDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                          Waiting to be estimated
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Estimated Tasks (Right) */}
        <div className="rounded-md overflow-hidden border border-gray-200">
          <div className="py-4 px-6" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)' }}>
            <h2 className="text-xl font-bold">Estimated Tasks</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium">Task</th>
                  <th className="text-left py-3 px-4 font-medium">Implementer</th>
                  <th className="text-left py-3 px-4 font-medium">Responsible</th>
                  <th className="text-left py-3 px-4 font-medium">Deadline</th>
                  <th className="text-left py-3 px-4 font-medium">Estimation Date</th>
                </tr>
              </thead>
              <tbody>
                {estimatedTasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No estimated tasks available
                    </td>
                  </tr>
                ) : (
                  estimatedTasks.map((task) => (
                    <tr 
                      key={task.id} 
                      className="border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                      style={{ backgroundColor: 'var(--color-primary-light)' }}
                    >
                      <td className="py-3 px-4 font-medium">{task.title}</td>
                      <td className="py-3 px-4">
                        <UserDisplay user={task.implementer} />
                      </td>
                      <td className="py-3 px-4">
                        <UserDisplay user={task.responsibleUser} />
                      </td>
                      <td className="py-3 px-4">{new Date(task.deadlineDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {task.estimationDate ? new Date(task.estimationDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}