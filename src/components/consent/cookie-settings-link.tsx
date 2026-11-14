"use client";

import { openCookieSettings } from "@/lib/consent/store";

/** Footer link that reopens the cookie preferences, so consent can be withdrawn. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
