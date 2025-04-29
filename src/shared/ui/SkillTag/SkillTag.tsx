import React, { memo } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Progress from "@radix-ui/react-progress";
import { Skill } from "@/shared/types/profile";

interface SkillTagProps {
  skill: Skill;
  color: string;
}

export const SkillTag = memo(({ skill, color }: SkillTagProps) => {
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
                      backgroundColor: color,
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
});

SkillTag.displayName = "SkillTag";
