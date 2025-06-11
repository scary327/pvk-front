"use client";

import {useMemo} from "react";
import {usePathname} from "next/navigation";
import {Navigation} from "@/widgets/Navigation/Navigation";
import type {NavigationItem} from "@/shared/types/navigation";
import {Logo} from "@/shared/ui/Logo";

export default function AuthLayout({children}: {
		children: React.ReactNode;
}) {
		const pathname = usePathname();

		const navigationItems = useMemo<NavigationItem[]>(
				() => [
						{
								id: "profile",
								label: "Профиль",
								href: "/profile",
								isActive: pathname === "/profile",
						},
						{
								id: "rating",
								label: "Рейтинг",
								href: "/rating",
								isActive: pathname === "/rating",
						},
						{
								id: "estimate",
								label: "Оценки",
								href: "/estimate",
								isActive: pathname === "/estimate",
						},
						{
								id: "teams",
								label: "Команды",
								href: "/teams",
								isActive: pathname === "/teams"
						}
				],
				[pathname]
		);

		return (
				<div className="min-h-screen flex flex-col">
						<header className="border-b border-[color:var(--color-gray-300)] py-[8px]">
								<div className="container mx-auto px-4">
										<div className="flex items-center justify-between h-16">
												<div className="flex items-center gap-9">
														<Logo/>
														<Navigation items={navigationItems}/>
												</div>
										</div>
								</div>
						</header>

						<main style={{minHeight: "calc(100vh - 81px)"}}>{children}</main>
				</div>
		);
}
