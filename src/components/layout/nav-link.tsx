"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Whether `pathname` is this link's page ("page") or inside its section ("section"). */
export function matchPath(pathname: string, href: string): "page" | "section" | null {
  if (pathname === href) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "section";
  return null;
}

/**
 * A navigation link that shows when it is the current page or section. The
 * state is announced to screen readers with aria-current, not by styling alone.
 */
export function NavLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}) {
  const match = matchPath(usePathname(), href);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={match === "page" ? "page" : match === "section" ? "true" : undefined}
      className={cn(className, match && activeClassName)}
    >
      {children}
    </Link>
  );
}
