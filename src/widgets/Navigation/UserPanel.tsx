"use client";

import { memo } from "react";
import { Avatar } from "@radix-ui/themes";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import clsx from "clsx";

interface UserPanelProps {
  name: string;
  avatarUrl?: string;
  className?: string;
}

export const UserPanel = memo(function UserPanel({
  name,
  avatarUrl,
  className,
}: UserPanelProps) {
  return (
    <div
      className={clsx(
        "mt-auto p-4 border-t border-[color:var(--color-gray-300)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/profile" className="flex items-center gap-3">
          <Avatar
            size="3"
            src={avatarUrl}
            fallback={name[0].toUpperCase()}
            radius="full"
            className="border-2 border-[color:var(--color-primary)]"
          />
          <span className="font-bold text-[color:var(--color-default-text)] truncate">
            {name}
          </span>
        </Link>
        <Link
          href="/settings"
          className="p-2 rounded-lg hover:bg-[color:var(--color-gray-300)] hover:bg-opacity-20 transition-colors"
        >
          <GearIcon
            width={20}
            height={20}
            className="text-[color:var(--color-default-text)]"
          />
        </Link>
      </div>
    </div>
  );
});
