import * as Checkbox from '@radix-ui/react-checkbox';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
}

interface SkillRatingProps {
  skill: Skill;
  rating?: number;
  notUsed?: boolean;
  onRatingChange: (skillId: string, value: number) => void;
  onNotUsedChange: (skillId: string, checked: boolean) => void;
}

export const SkillRating = ({ skill, rating, notUsed, onRatingChange, onNotUsedChange }: SkillRatingProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-default-text">{skill.name}</h4>
        <div className="flex items-center">
          <Checkbox.Root 
            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white"
            checked={notUsed}
            onCheckedChange={(checked: boolean) => onNotUsedChange(skill.id, checked)}
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
            Навык не использовался
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
}; 