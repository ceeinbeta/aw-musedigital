"use client";

import { NavLink } from "./nav-link";
import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/site";

/** Slide-down menu shown below the `lg` breakpoint. */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  // Close with Escape, and stop the page scrolling behind the open menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-6">
          <span
            className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-editorial ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ease-editorial ${
              open ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-beige/60 bg-ivory text-charcoal"
      >
        <nav aria-label="Main" className="px-5 py-8 sm:px-8">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b border-beige/50">
                <NavLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 text-2xl text-black"
                  activeClassName="font-medium [&>span]:opacity-100"
                >
                  {item.label}
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-charcoal opacity-0" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
