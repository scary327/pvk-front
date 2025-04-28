"use client";

import { memo } from "react";
import Link from "next/link";
import clsx from "clsx";
import type { NavigationItem as NavigationItemType } from "@/shared/types/navigation";

interface NavigationItemProps {
  item: NavigationItemType;
  onClick?: (item: NavigationItemType) => void;
}

export const NavigationItem = memo(function NavigationItem({
  item,
  onClick,
}: NavigationItemProps) {
  const { icon, label, href, isActive } = item;

  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 border-2 border-transparent",
        "hover:bg-primary-light hover:bg-opacity-20",
        isActive && "bg-primary-light bg-opacity-10 !border-primary"
      )}
      onClick={handleClick}
    >
      {icon && (
        <div className={clsx(isActive ? "text-primary" : "text-default-text")}>
          {icon}
        </div>
      )}
      <span
        className={clsx(
          "text-sm font-bold",
          isActive
            ? "text-[color:var(--color-primary)]"
            : "text-[color:var(--color-default-text)]"
        )}
      >
        {label}
      </span>
    </Link>
  );
});
