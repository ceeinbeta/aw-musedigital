import { z } from "zod";

export type { FormState } from "./state";

/** Validation rules for every form. Used on the server; never trust the browser. */

const text = (max: number) => z.string().trim().max(max, "This is too long.");
/** A field that must be filled in; `message` is shown when it is missing. */
const required = (max: number, message: string) =>
  z.string({ error: message }).trim().min(1, message).max(max, "This is too long.");
const email = z
  .email({ error: "Please enter a valid email address." })
  .trim()
  .toLowerCase()
  .max(254);
const consent = z.literal("on", { error: "Please tick the box to continue." });

export const enquirySchema = z.object({
  service: required(80, "Please reload the page and try again."),
  name: required(120, "Please enter your name.").min(2, "Please enter your name."),
  email,
  phone: text(40).optional(),
  type: required(80, "Please choose an option."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date.")
    .optional(),
  website: z.url("Please enter a full web address, starting with https://").max(300).optional(),
  message: required(5000, "Please write a message.").min(
    10,
    "Please tell us a little more (at least 10 characters).",
  ),
  consent,
});

export const newsletterSchema = z.object({ email, consent });

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Reads form fields into a plain object, treating blank fields as absent. */
export function readFields(formData: FormData, names: string[]): Record<string, string | undefined> {
  return Object.fromEntries(
    names.map((name) => {
      const value = formData.get(name);
      return [name, typeof value === "string" && value.trim() !== "" ? value : undefined];
    }),
  );
}

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    errors[field] ??= issue.message;
  }
  return errors;
}
