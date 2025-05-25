import React, { memo, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Progress from "@radix-ui/react-progress";
import { Skill } from "@/shared/types/profile";
import { XIcon } from "lucide-react";

interface SkillTagProps {
  skill: Partial<
    Omit<Skill, "id"> & { id?: number; name: string; rating?: number }
  >;
  color: string;
  variant?: "default" | "outline";
  onClick?: () => void;
  onRemove?: (skillId: number) => void;
  canRemove?: boolean;
}

export const SkillTag = memo(
  ({
    skill,
    color,
    variant = "default",
    onClick,
    onRemove,
    canRemove = false,
  }: SkillTagProps) => {
    const isOutline = variant === "outline";
    const [isHovered, setIsHovered] = useState(false);

    const shouldShowRemoveButton =
      !isOutline && canRemove && typeof skill.id === "number" && isHovered;

    const handleRemoveClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (typeof skill.id === "number" && onRemove) {
        onRemove(skill.id);
      }
    };

    const tagBaseClass =
      "relative group inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2";
    const cursorClass =
      onClick || (shouldShowRemoveButton && typeof skill.id === "number")
        ? "cursor-pointer"
        : "cursor-default";

    const tagStyle = {
      backgroundColor: isOutline ? "transparent" : `${color}20`,
      color: color,
      border: isOutline ? `1px solid ${color}` : "none",
    };

    const tagContent = (
      <div
        className={`${tagBaseClass} ${cursorClass}`}
        style={tagStyle}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {skill.name}
        {!isOutline && typeof skill.rating === "number" && (
          <span className="ml-1.5 text-xs opacity-90 font-semibold">
            {skill.rating}
          </span>
        )}
        {shouldShowRemoveButton && (
          <button
            onClick={handleRemoveClick}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-700 flex items-center justify-center"
            aria-label="Remove skill"
            style={{ width: "16px", height: "16px" }}
          >
            <XIcon size={10} />
          </button>
        )}
      </div>
    );

    if (isOutline) {
      return tagContent;
    }

    if (
      typeof skill.rating === "number" &&
      (typeof skill.id === "number" || !canRemove)
    ) {
      return (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>{tagContent}</Tooltip.Trigger>
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
                      value={skill.rating}
                    >
                      <Progress.Indicator
                        className="h-full transition-transform"
                        style={{
                          transform: `translateX(-${
                            100 - (skill.rating || 0)
                          }%)`,
                          backgroundColor: color,
                        }}
                      />
                    </Progress.Root>
                    <span className="ml-2 text-xs font-medium">
                      {skill.rating}
                    </span>
                  </div>
                </div>
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    }

    return tagContent;
  }
);

SkillTag.displayName = "SkillTag";
