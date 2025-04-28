import { ReactNode } from "react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  icon?: ReactNode;
}
