import "server-only";

/**
 * Sends transactional email through Resend's HTTP API.
 *
 * Needs three environment variables:
 *   RESEND_API_KEY     secret key from resend.com
 *   EMAIL_FROM         a sender on a domain verified in Resend
 *   ENQUIRY_TO_EMAIL   the inbox that should receive enquiries
 *
 * Until they are set, nothing is sent. In development the message is printed
 * to the server log instead, so flows such as newsletter confirmation can
 * still be tested.
 */

const apiKey = process.env.RESEND_API_KEY ?? "";
const from = process.env.EMAIL_FROM ?? "";

export const enquiryInbox = process.env.ENQUIRY_TO_EMAIL ?? "";
export const isEmailConfigured = Boolean(apiKey && from);

type Email = {
  to: string;
  subject: string;
  text: string;
  /** Lets the owner reply straight to the person who wrote in. */
  replyTo?: string;
};

/** Returns true only if the email was accepted for delivery. */
export async function sendEmail({ to, subject, text, replyTo }: Email): Promise<boolean> {
  if (!isEmailConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email not configured] To: ${to}\nSubject: ${subject}\n\n${text}\n`);
    }
    return false;
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, reply_to: replyTo }),
    });
    if (!response.ok) {
      console.error("Email could not be sent:", response.status, await response.text());
    }
    return response.ok;
  } catch (error) {
    console.error("Email could not be sent:", error);
    return false;
  }
}
