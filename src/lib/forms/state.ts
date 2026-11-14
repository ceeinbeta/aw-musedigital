/**
 * Small pieces shared by the forms in the browser and the actions on the
 * server. Kept separate so the browser never downloads server-only code.
 */

/** What a form action reports back to the form. */
export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field name → message, for showing errors next to the right field. */
  errors?: Record<string, string>;
  /** What the visitor typed, returned on an error so nothing has to be retyped. */
  values?: Record<string, string>;
};

export const idleState: FormState = { status: "idle", message: "" };

/** A field hidden from people; only bots fill it in. */
export const HONEYPOT_FIELD = "company_website";
/** When the visitor started the form, used to spot instant bot submissions. */
export const TIMESTAMP_FIELD = "form_started";
