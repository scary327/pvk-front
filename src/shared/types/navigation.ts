import { ReactNode } from "react";

export interface NavigationItem {
  id: string;
  icon: ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}
