"use client";
import { usePathname } from "next/navigation";

export function PageShell({ children }: { children: React.ReactNode }) {
  // Always render without extra top padding; each page can opt-in to spacing if needed.
  usePathname();
  return <div className="pt-0">{children}</div>;
}


