"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/widgets/Navigation/Navigation";
import { UserPanel } from "@/widgets/Navigation/UserPanel";
import type { NavigationItem } from "@/shared/types/navigation";
import { Logo } from "@/shared/ui/Logo";
import Link from "next/link";
import { RocketIcon, PersonIcon, StarIcon } from "@radix-ui/react-icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigationItems = useMemo<NavigationItem[]>(
    () => [
      {
        id: "skills",
        icon: <RocketIcon width={20} height={20} />,
        label: "Навыки",
        href: "/skills",
        isActive: pathname === "/skills",
      },
      {
        id: "roles",
        icon: <PersonIcon width={20} height={20} />,
        label: "Роли",
        href: "/roles",
        isActive: pathname === "/roles",
      },
      {
        id: "ratings",
        icon: <StarIcon width={20} height={20} />,
        label: "Рейтинг",
        href: "/ratings",
        isActive: pathname === "/ratings",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex min-h-screen">
      {/* Боковая панель с навигацией */}
      <aside className="w-64 p-4 border-r flex flex-col border-[color:var(--color-gray-300)]">
        <Link href="/skills" className="mb-6">
          <Logo />
        </Link>
        <Navigation items={navigationItems} />
        <UserPanel
          name="User Name"
          avatarUrl="/path/to/avatar.jpg" // Замените на реальный путь к аватару
        />
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
