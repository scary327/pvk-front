import { SkillRating } from "./SkillRating";

interface Skill {
  id: string;
  name: string;
}

interface SkillsSectionProps {
  hardSkills: Skill[];
  softSkills: Skill[];
  ratings: { [key: string]: number };
  notUsedSkills: { [key: string]: boolean };
  onRatingChange: (skillId: string, value: number) => void;
  onNotUsedChange: (skillId: string, checked: boolean) => void;
  onSubmit: (action: "estimate-next" | "finish") => void;
  isSubmitDisabled?: boolean;
  isSubmitting?: boolean;
}

export const SkillsSection = ({
  hardSkills,
  softSkills,
  ratings,
  notUsedSkills,
  onRatingChange,
  onNotUsedChange,
  onSubmit,
  isSubmitDisabled,
  isSubmitting,
}: SkillsSectionProps) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-default-text mb-6">
        Оценка навыков
      </h2>

      {/* Hard Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-default-text mb-4">
          Технические навыки
        </h3>
        <div className="space-y-6">
          {hardSkills.map((skill) => (
            <SkillRating
              key={skill.id}
              skill={skill}
              rating={ratings[skill.id]}
              notUsed={notUsedSkills[skill.id]}
              onRatingChange={onRatingChange}
              onNotUsedChange={onNotUsedChange}
            />
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-default-text mb-4">
          Гибкие навыки
        </h3>
        <div className="space-y-6">
          {softSkills.map((skill) => (
            <SkillRating
              key={skill.id}
              skill={skill}
              rating={ratings[skill.id]}
              notUsed={notUsedSkills[skill.id]}
              onRatingChange={onRatingChange}
              onNotUsedChange={onNotUsedChange}
            />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-10 flex justify-end gap-4">
        <button
          className={`px-6 py-2 font-medium rounded-md transition-colors
            ${
              isSubmitDisabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary-light text-primary hover:bg-blue-50"
            }`}
          onClick={() => onSubmit("estimate-next")}
          disabled={isSubmitDisabled}
        >
          Оценить следующую
        </button>
        <button
          className={`px-6 py-2 font-medium rounded-md transition-colors
            ${
              isSubmitDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-blue-600"
            }`}
          onClick={() => onSubmit("finish")}
          disabled={isSubmitDisabled || isSubmitting}
        >
          {isSubmitting ? "Завершение..." : "Завершить"}
        </button>
      </div>
    </div>
  );
};
