import { memo } from "react";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { RatingStarsProps } from "@/shared/types/skills";

export const RatingStars = memo(({ rating }: RatingStarsProps) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) =>
        index < rating ? (
          <StarFilledIcon
            key={index}
            className="text-[color:var(--color-primary)]"
            width={16}
            height={16}
          />
        ) : (
          <StarIcon
            key={index}
            className="text-[color:var(--color-gray-300)]"
            width={16}
            height={16}
          />
        )
      )}
    </div>
  );
});

RatingStars.displayName = "RatingStars";
