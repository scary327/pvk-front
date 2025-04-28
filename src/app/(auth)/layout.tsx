"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/widgets/Navigation/Navigation";
import { UserPanel } from "@/widgets/Navigation/UserPanel";
import type { NavigationItem } from "@/shared/types/navigation";
import { Logo } from "@/shared/ui/Logo";

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
        label: "Навыки",
        href: "/skills",
        isActive: pathname === "/skills",
      },
      {
        id: "roles",
        label: "Роли",
        href: "/roles",
        isActive: pathname === "/roles",
      },
      {
        id: "ratings",
        label: "Рейтинг",
        href: "/ratings",
        isActive: pathname === "/ratings",
      },
    ],
    [pathname]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[color:var(--color-gray-300)] py-[8px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-9">
              <Logo />
              <Navigation items={navigationItems} />
            </div>
            <UserPanel name="User Name" avatarUrl="/path/to/avatar.jpg" />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
