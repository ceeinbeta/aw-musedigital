"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Sharing without third-party scripts: plain links to each service and a
 * copy-link button. Nothing loads from social networks, so no cookies or
 * tracking are added, and no consent is needed.
 */
export function ShareLinks({
  url,
  title,
  image,
  className,
}: {
  url: string;
  title: string;
  image?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "Pinterest", href: `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}${image ? `&media=${encodeURIComponent(image)}` : ""}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "Email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard access can be blocked; the other options still work.
    }
  }

  const itemClass =
    "link-underline text-[0.68rem] uppercase tracking-[0.24em] text-charcoal";

  return (
    <div className={className}>
      <p className="text-[0.66rem] uppercase tracking-[0.28em] text-taupe-deep">Share</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={itemClass}
            >
              {link.label}
              {link.label !== "Email" ? <span className="sr-only"> (opens in a new tab)</span> : null}
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} className={cn(itemClass, "cursor-pointer")}>
            {copied ? "Link copied" : "Copy link"}
          </button>
        </li>
      </ul>
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </p>
    </div>
  );
}
