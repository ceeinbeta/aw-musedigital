"use server";

import { createHash, randomBytes } from "node:crypto";
import { siteConfig } from "@/lib/site";
import { enquiryInbox, isEmailConfigured, sendEmail } from "./email";
import { isRateLimited, looksAutomated } from "./protection";
import {
  enquirySchema,
  fieldErrors,
  newsletterSchema,
  readFields,
  type FormState,
} from "./schemas";
import { getStore } from "./store";

const tooMany: FormState = {
  status: "error",
  message: "Too many attempts. Please wait a few minutes and try again.",
};
const failed: FormState = {
  status: "error",
  message: "Sorry, something went wrong and your message was not sent. Please try again later.",
};

/** The wording the visitor agreed to, stored with each record as proof of consent. */
const ENQUIRY_CONSENT = "Agreed to details being used to respond to this enquiry.";
const NEWSLETTER_CONSENT = "Agreed to receive the newsletter and accepted the privacy policy.";

/** Handles the service enquiry forms and the contact form. */
export async function submitEnquiry(_previous: FormState, formData: FormData): Promise<FormState> {
  // Bots get a success message so they learn nothing, but nothing is saved.
  if (looksAutomated(formData)) {
    return { status: "success", message: "Thank you. Your message has been received." };
  }
  if (await isRateLimited("enquiry")) return tooMany;

  const fields = readFields(formData, [
    "service",
    "name",
    "email",
    "phone",
    "type",
    "date",
    "website",
    "message",
    "consent",
  ]);
  const parsed = enquirySchema.safeParse(fields);
  if (!parsed.success) {
    // Hand back what was typed so the visitor does not have to start again.
    const values: Record<string, string> = {};
    for (const [name, value] of Object.entries(fields)) {
      if (value !== undefined && name !== "consent") values[name] = value;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors: fieldErrors(parsed.error),
      values,
    };
  }
  const enquiry = parsed.data;

  try {
    const store = await getStore();
    await store.add("enquiries", {
      service: enquiry.service,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone ?? null,
      type: enquiry.type,
      date: enquiry.date ?? null,
      website: enquiry.website ?? null,
      message: enquiry.message,
      consent: ENQUIRY_CONSENT,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Enquiry could not be saved:", error);
    return failed;
  }

  // The enquiry is already saved, so a failed notification loses nothing.
  if (enquiryInbox) {
    await sendEmail({
      to: enquiryInbox,
      replyTo: enquiry.email,
      subject: `New enquiry: ${enquiry.service} (${enquiry.type})`,
      text: [
        `Service: ${enquiry.service}`,
        `Type: ${enquiry.type}`,
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        enquiry.phone ? `Phone: ${enquiry.phone}` : null,
        enquiry.date ? `Event date: ${enquiry.date}` : null,
        enquiry.website ? `Current website: ${enquiry.website}` : null,
        "",
        enquiry.message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });
  }

  return {
    status: "success",
    message: "Thank you. Your message has been received and we will reply as soon as we can.",
  };
}

/** Handles newsletter sign-up, with email confirmation when email is set up. */
export async function subscribeNewsletter(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  if (looksAutomated(formData)) {
    return { status: "success", message: "Thank you. Please check your inbox." };
  }
  if (await isRateLimited("newsletter")) return tooMany;

  const parsed = newsletterSchema.safeParse(readFields(formData, ["email", "consent"]));
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    return { status: "error", message: errors.email ?? errors.consent ?? "Please try again.", errors };
  }
  const { email } = parsed.data;

  // The record ID is a hash of the address, so signing up twice never duplicates.
  const id = createHash("sha256").update(email).digest("hex");
  const token = randomBytes(24).toString("hex");

  try {
    const store = await getStore();
    const existing = await store.get("newsletterSubscribers", id);
    if (existing?.status === "subscribed") {
      // Same reply as a new sign-up, so the form cannot be used to check who is subscribed.
      return { status: "success", message: "Thank you. You are on the list." };
    }
    await store.set("newsletterSubscribers", id, {
      email,
      // With email set up, the address must be confirmed before it counts.
      status: isEmailConfigured ? "pending" : "subscribed",
      token,
      consent: NEWSLETTER_CONSENT,
      consentAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Newsletter sign-up could not be saved:", error);
    return { ...failed, message: "Sorry, something went wrong and you were not signed up. Please try again later." };
  }

  if (!isEmailConfigured) {
    return { status: "success", message: "Thank you. You are on the list." };
  }

  const confirmUrl = `${siteConfig.url}/newsletter/confirm?token=${token}`;
  const sent = await sendEmail({
    to: email,
    subject: `Please confirm your subscription to ${siteConfig.name}`,
    text: [
      `Thank you for subscribing to the ${siteConfig.name} newsletter.`,
      "",
      "Please confirm your email address by opening this link:",
      confirmUrl,
      "",
      "If you did not ask to subscribe, you can ignore this email and you will not hear from us.",
    ].join("\n"),
  });

  return sent
    ? { status: "success", message: "Almost there. Please check your inbox and confirm your email address." }
    : { status: "error", message: "We could not send the confirmation email. Please try again later." };
}
