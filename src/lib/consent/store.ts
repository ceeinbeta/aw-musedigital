"use client";

import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_SECONDS,
  CONSENT_VERSION,
  type OptionalCategory,
} from "./config";

/** The visitor's recorded choice. */
export type Consent = {
  version: number;
  /** ISO date of the decision, kept as a record of consent. */
  decidedAt: string;
  choices: Partial<Record<OptionalCategory, boolean>>;
};

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedValue: Consent | null = null;

function readCookie(): string | null {
  const match = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  return match ? decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1)) : null;
}

/** The stored choice, or null if none is stored or it is out of date. */
export function getConsent(): Consent | null {
  const raw = readCookie();
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as Consent) : null;
    cachedValue = parsed && parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    cachedValue = null;
  }
  return cachedValue;
}

export function saveConsent(choices: Consent["choices"]) {
  const hadAnalytics = getConsent()?.choices.analytics === true;
  const value: Consent = { version: CONSENT_VERSION, decidedAt: new Date().toISOString(), choices };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  // Withdrawing analytics consent also removes the cookies analytics set.
  if (!choices.analytics) removeCookies(/^_ga/);
  // A script that has already run cannot be unloaded, so a reload is the only
  // way to make sure analytics stops at once when consent is withdrawn.
  if (hadAnalytics && !choices.analytics) {
    window.location.reload();
    return;
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Deletes first-party cookies whose names match, on this domain and its parent. */
function removeCookies(pattern: RegExp) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.split(".").slice(-2).join(".")}`];
  for (const part of document.cookie.split("; ")) {
    const name = part.split("=")[0];
    if (!pattern.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ""}`;
    }
  }
}

/** Opens the preferences panel from anywhere, e.g. the footer link. */
export const OPEN_SETTINGS_EVENT = "md:open-cookie-settings";
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
