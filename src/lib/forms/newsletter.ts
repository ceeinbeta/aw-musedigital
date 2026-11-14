import "server-only";
import { getStore } from "./store";

/**
 * Applies a link clicked in a newsletter email. The token in the link
 * identifies the subscriber, so no login is needed. Returns false if the
 * token is unknown.
 */
export async function applyNewsletterToken(
  token: string | null,
  status: "subscribed" | "unsubscribed",
): Promise<boolean> {
  if (!token || !/^[a-f0-9]{48}$/.test(token)) return false;
  try {
    const store = await getStore();
    const subscriber = await store.findOne("newsletterSubscribers", "token", token);
    if (!subscriber) return false;
    await store.set("newsletterSubscribers", subscriber.id, {
      status,
      [status === "subscribed" ? "confirmedAt" : "unsubscribedAt"]: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Newsletter link could not be applied:", error);
    return false;
  }
}
