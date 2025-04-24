"use client";

import { memo } from "react";
import clsx from "clsx";
import { NavigationItem } from "./NavigationItem";
import type { NavigationItem as NavigationItemType } from "@/shared/types/navigation";

interface NavigationProps {
  items: NavigationItemType[];
  onItemClick?: (item: NavigationItemType) => void;
  className?: string;
}

export const Navigation = memo(function Navigation({
  items,
  onItemClick,
  className,
}: NavigationProps) {
  return (
    <nav className={clsx("flex flex-col gap-1", className)}>
      {items.map((item) => (
        <NavigationItem key={item.id} item={item} onClick={onItemClick} />
      ))}
    </nav>
  );
});
