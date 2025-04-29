'use client'
import React, { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';

// Mock data for the task
const mockTask = {
  title: "Frontend Development Task: E-commerce Product Page",
  description: "Create a responsive product page with filtering capabilities, product details, and an 'add to cart' functionality. Ensure the page follows design system guidelines and works across all browsers.",
  deadline: "May 10, 2025",
  implementer: {
    firstName: "Alex",
    lastName: "Johnson",
    role: "Frontend Developer",
    avatar: "/api/placeholder/60/60"
  },
  responsible: {
    firstName: "Sarah",
    lastName: "Williams",
    role: "Team Lead",
    avatar: "/api/placeholder/60/60"
  }
};

// Mock skills to be rated
const hardSkills = [
  { id: 'reactjs', name: 'React.js' },
  { id: 'nextjs', name: 'Next.js' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'responsive', name: 'Responsive Design' },
  { id: 'clean-code', name: 'Clean Code' },
  { id: 'css', name: 'CSS/SASS' },
];

const softSkills = [
  { id: 'communication', name: 'Communication' },
  { id: 'problem-solving', name: 'Problem Solving' },
  { id: 'time-management', name: 'Time Management' },
  { id: 'teamwork', name: 'Teamwork' },
  { id: 'adaptability', name: 'Adaptability' },
];

// Student Rating Page component
export default function StudentRatingPage() {
  // State for storing skill ratings
  const [ratings, setRatings] = useState({});
  // State for storing skills that were not used
  const [notUsedSkills, setNotUsedSkills] = useState({});
  
  // Handle rating change
  const handleRatingChange = (skillId, value) => {
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
  const handleNotUsedChange = (skillId, checked) => {
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
  const handleSubmit = (action) => {
    console.log(`Action: ${action}`, { ratings, notUsedSkills });
    // Here you would typically send this data to your backend
    alert(`${action} - Data logged to console`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header section */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-default-text mb-4">{mockTask.title}</h1>
          <p className="text-gray-600 mb-4">{mockTask.description}</p>
          
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-6">
              {/* Implementer info */}
              <div className="flex items-center">
                <UserAvatar user={mockTask.implementer} />
                <div className="ml-3">
                  <p className="font-medium text-sm text-default-text">Implementer</p>
                  <p className="text-default-text">{`${mockTask.implementer.firstName} ${mockTask.implementer.lastName}`}</p>
                  <p className="text-sm text-gray-500">{mockTask.implementer.role}</p>
                </div>
              </div>
              
              {/* Responsible info */}
              <div className="flex items-center">
                <UserAvatar user={mockTask.responsible} />
                <div className="ml-3">
                  <p className="font-medium text-sm text-default-text">Responsible</p>
                  <p className="text-default-text">{`${mockTask.responsible.firstName} ${mockTask.responsible.lastName}`}</p>
                  <p className="text-sm text-gray-500">{mockTask.responsible.role}</p>
                </div>
              </div>
            </div>
            
            {/* Deadline */}
            <div className="text-right">
              <p className="text-sm text-gray-500">Deadline</p>
              <p className="text-primary font-medium">{mockTask.deadline}</p>
            </div>
          </div>
        </div>
        
        {/* Main content - Skills rating */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-default-text mb-6">Skills Estimation</h2>
          
          {/* Hard Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-default-text mb-4">Hard Skills</h3>
            <div className="space-y-6">
              {hardSkills.map(skill => (
                <SkillRating 
                  key={skill.id}
                  skill={skill}
                  rating={ratings[skill.id]}
                  notUsed={notUsedSkills[skill.id]}
                  onRatingChange={handleRatingChange}
                  onNotUsedChange={handleNotUsedChange}
                />
              ))}
            </div>
          </div>
          
          {/* Soft Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-default-text mb-4">Soft Skills</h3>
            <div className="space-y-6">
              {softSkills.map(skill => (
                <SkillRating 
                  key={skill.id}
                  skill={skill}
                  rating={ratings[skill.id]}
                  notUsed={notUsedSkills[skill.id]}
                  onRatingChange={handleRatingChange}
                  onNotUsedChange={handleNotUsedChange}
                />
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="mt-10 flex justify-end gap-4">
            <button 
              className="px-6 py-2 bg-primary-light text-primary font-medium rounded-md hover:bg-blue-50"
              onClick={() => handleSubmit('estimate-next')}
            >
              Estimate Next
            </button>
            <button 
              className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-blue-600"
              onClick={() => handleSubmit('finish')}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for user avatar
function UserAvatar({ user }) {
  return (
    <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden w-12 h-12 rounded-full bg-primary-light">
      <Avatar.Image
        src={user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-full h-full object-cover"
      />
      <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-primary text-white text-lg font-medium">
        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}

// Component for rating a single skill
function SkillRating({ skill, rating, notUsed, onRatingChange, onNotUsedChange }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-default-text">{skill.name}</h4>
        <div className="flex items-center">
          <Checkbox.Root 
            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white"
            checked={notUsed}
            onCheckedChange={(checked) => onNotUsedChange(skill.id, checked)}
            id={`not-used-${skill.id}`}
          >
            <Checkbox.Indicator>
              <Check size={14} className="text-primary" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label 
            htmlFor={`not-used-${skill.id}`} 
            className="ml-2 text-sm text-gray-500"
          >
            The skill was not used
          </label>
        </div>
      </div>
      
      {/* Rating radio buttons, disabled if marked as "not used" */}
      <RadioGroup.Root 
        className="flex gap-1 mt-2" 
        value={rating ? rating.toString() : undefined}
        onValueChange={(value) => onRatingChange(skill.id, parseInt(value))}
        disabled={notUsed}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <RadioGroup.Item
            key={value}
            value={value.toString()}
            className={`w-8 h-8 rounded-md flex items-center justify-center cursor-pointer border 
              ${rating === value ? 'bg-primary text-white border-primary' : 'bg-white text-default-text border-gray-200 hover:bg-gray-100'}
              ${notUsed ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {value}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}