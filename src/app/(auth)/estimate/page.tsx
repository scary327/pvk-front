'use client';

import { useState } from 'react';
import Image from 'next/image';

// Types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'teamlead' | 'frontend' | 'backend' | 'design' | 'analytics';
}

interface Task {
  id: string;
  title: string;
  description: string;
  implementer: User;
  responsible: User;
  deadline: string;
  isEstimated: boolean;
  estimatedAt?: string;
}

// Sample data
const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Implement Authentication System',
    description: 'Create user authentication flow with email and password',
    implementer: {
      id: 'u1',
      firstName: 'Alex',
      lastName: 'Johnson',
      avatar: '/api/placeholder/40/40',
      role: 'backend'
    },
    responsible: {
      id: 'u2',
      firstName: 'Maria',
      lastName: 'Garcia',
      avatar: '/api/placeholder/40/40',
      role: 'teamlead'
    },
    deadline: '2025-05-15',
    isEstimated: false
  },
  {
    id: '2',
    title: 'Design Landing Page',
    description: 'Create a modern landing page with responsive design',
    implementer: {
      id: 'u3',
      firstName: 'Tyler',
      lastName: 'Brown',
      avatar: '/api/placeholder/40/40',
      role: 'design'
    },
    responsible: {
      id: 'u2',
      firstName: 'Maria',
      lastName: 'Garcia',
      avatar: '/api/placeholder/40/40',
      role: 'teamlead'
    },
    deadline: '2025-05-10',
    isEstimated: true,
    estimatedAt: '2025-04-28'
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Connect frontend with backend API endpoints',
    implementer: {
      id: 'u4',
      firstName: 'Sarah',
      lastName: 'Lee',
      avatar: '/api/placeholder/40/40',
      role: 'frontend'
    },
    responsible: {
      id: 'u2',
      firstName: 'Maria',
      lastName: 'Garcia',
      avatar: '/api/placeholder/40/40',
      role: 'teamlead'
    },
    deadline: '2025-05-20',
    isEstimated: false
  },
  {
    id: '4',
    title: 'User Analytics Dashboard',
    description: 'Create analytics dashboard with charts and filters',
    implementer: {
      id: 'u5',
      firstName: 'David',
      lastName: 'Kim',
      avatar: '/api/placeholder/40/40',
      role: 'analytics'
    },
    responsible: {
      id: 'u2',
      firstName: 'Maria',
      lastName: 'Garcia',
      avatar: '/api/placeholder/40/40',
      role: 'teamlead'
    },
    deadline: '2025-05-25',
    isEstimated: true,
    estimatedAt: '2025-04-27'
  }
];

// Role badge colors
const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'teamlead':
      return 'bg-purple-500';
    case 'frontend':
      return 'bg-blue-500';
    case 'backend':
      return 'bg-green-500';
    case 'design':
      return 'bg-yellow-500';
    case 'analytics':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

// Task Table Component
const TaskTable = ({ tasks, onTaskClick, title }: { tasks: Task[]; onTaskClick: (taskId: string) => void; title: string }) => {
  return (
    <div className="bg-white rounded-lg shadow h-full">
      <div className="bg-primary text-white px-4 py-3 rounded-t-lg flex items-center">
        <span className="w-6 h-6 bg-white text-primary rounded-full flex items-center justify-center mr-2 text-sm font-bold">
          {tasks.length}
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center py-6">No tasks available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary bg-opacity-10">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Implementer
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Responsible
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Deadline
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr 
                  key={task.id} 
                  className={`${task.isEstimated ? 'bg-primary-light' : 'hover:bg-gray-50'} cursor-pointer transition-colors active:scale-90`}
                  onClick={() => onTaskClick(task.id)}
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-default-text">{task.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{task.description}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 mr-2">
                        <Image
                          className="rounded-full"
                          src={task.implementer.avatar}
                          alt={`${task.implementer.firstName}`}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-default-text">
                          {task.implementer.firstName} {task.implementer.lastName}
                        </div>
                        <div className="text-xs">
                          <span className={`px-2 py-1 inline-flex text-xs leading-none rounded-full ${getRoleBadgeColor(task.implementer.role)} text-white`}>
                            {task.implementer.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 mr-2">
                        <Image
                          className="rounded-full"
                          src={task.responsible.avatar}
                          alt={`${task.responsible.firstName}`}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-default-text">
                          {task.responsible.firstName} {task.responsible.lastName}
                        </div>
                        <div className="text-xs">
                          {task.responsible.role === 'teamlead' ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-none rounded-full bg-purple-500 text-white">
                              {task.responsible.role}
                            </span>
                          ) : (
                            <span className="text-gray-500">{task.responsible.role}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {new Date(task.deadline).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {task.isEstimated ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Estimated
                      </span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default function TaskRatingPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const handleTaskClick = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId && !task.isEstimated
          ? { ...task, isEstimated: true, estimatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const pendingTasks = tasks.filter(task => !task.isEstimated);
  const estimatedTasks = tasks.filter(task => task.isEstimated);

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-default-text">IT Students Task Rating</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskTable 
            tasks={pendingTasks} 
            onTaskClick={handleTaskClick} 
            title="Tasks to Estimate" 
          />
          
          <TaskTable 
            tasks={estimatedTasks} 
            onTaskClick={handleTaskClick} 
            title="Estimated Tasks" 
          />
        </div>
      </div>
    </div>
  );
}