import "server-only";
import { headers } from "next/headers";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "./state";

/**
 * Spam protection that needs no third-party service and sets no cookies:
 *
 * 1. Honeypot: a field hidden from people. Bots that fill every field reveal
 *    themselves, and their submission is silently discarded.
 * 2. Timing: a form submitted within two seconds of loading was not typed by
 *    a person.
 * 3. Rate limit: a cap on submissions per visitor address.
 *
 * The rate limit is held in server memory, so it resets when the server
 * restarts and is not shared between server instances. It stops casual abuse;
 * if spam becomes a problem, add Firebase App Check or a CAPTCHA.
 */


const MIN_FILL_MS = 2000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const attempts = new Map<string, number[]>();

export function looksAutomated(formData: FormData): boolean {
  if (formData.get(HONEYPOT_FIELD)) return true;
  const started = Number(formData.get(TIMESTAMP_FIELD));
  return !Number.isFinite(started) || started <= 0 || Date.now() - started < MIN_FILL_MS;
}

export async function isRateLimited(bucket: string): Promise<boolean> {
  const forwarded = (await headers()).get("x-forwarded-for");
  const address = forwarded?.split(",")[0]?.trim() || "unknown";
  const key = `${bucket}:${address}`;
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return true;
  }
  attempts.set(key, [...recent, now]);
  return false;
}
