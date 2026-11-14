"use client";

import Link from "next/link";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/forms/actions";
import { FieldError, FormMessage, Honeypot, useFormAction } from "./form-kit";

type EnquiryFormProps = {
  /** What the enquiry is about, sent along with the form. */
  service: string;
  /** Label and options for the "what do you need" dropdown. */
  typeLabel: string;
  typeOptions: string[];
  askDate?: boolean;
  askWebsite?: boolean;
  messageLabel?: string;
  submitLabel?: string;
};

const fieldClass =
  "mt-2 block min-h-12 w-full border border-charcoal/50 bg-ivory px-4 py-3 text-base text-black placeholder:text-taupe-deep focus-visible:border-black aria-[invalid=true]:border-[#8a2b1f]";
const labelClass = "block text-[0.66rem] uppercase tracking-[0.24em] text-charcoal";
const hint = "normal-case tracking-normal text-taupe-deep";

/**
 * Enquiry form used on the service pages and the contact page. It is checked
 * in the browser for convenience and again on the server for safety.
 */
export function EnquiryForm({
  service,
  typeLabel,
  typeOptions,
  askDate = false,
  askWebsite = false,
  messageLabel = "Tell us about your project",
  submitLabel = "Send enquiry",
}: EnquiryFormProps) {
  const id = useId();
  const { state, formAction, pending } = useFormAction(submitEnquiry);
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="border border-beige bg-ivory p-8 sm:p-10">
        <p className="font-serif text-3xl font-medium text-black">Thank you</p>
        <p className="mt-4 text-base leading-[1.8]">{state.message}</p>
      </div>
    );
  }

  /** Links a field to its error message for screen readers. */
  const invalid = (name: string) =>
    errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": `${id}-${name}-error` }
      : {};

  return (
    <form action={formAction} className="relative grid gap-6 sm:grid-cols-2">
      <Honeypot />
      <input type="hidden" name="service" value={service} />

      <div>
        <label htmlFor={`${id}-name`} className={labelClass}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-name`}
          name="name"
          required
          autoComplete="name"
          className={fieldClass}
          defaultValue={values.name ?? ""}
          {...invalid("name")}
        />
        <FieldError id={`${id}-name-error`} message={errors.name} />
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={labelClass}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          defaultValue={values.email ?? ""}
          {...invalid("email")}
        />
        <FieldError id={`${id}-email-error`} message={errors.email} />
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={labelClass}>
          Phone <span className={hint}>(optional)</span>
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          defaultValue={values.phone ?? ""}
          {...invalid("phone")}
        />
        <FieldError id={`${id}-phone-error`} message={errors.phone} />
      </div>

      <div>
        <label htmlFor={`${id}-type`} className={labelClass}>
          {typeLabel} <span aria-hidden="true">*</span>
        </label>
        <select
          id={`${id}-type`}
          name="type"
          required
          defaultValue={values.type ?? ""}
          className={fieldClass}
          {...invalid("type")}
        >
          <option value="" disabled>
            Please choose
          </option>
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value="Other">Something else</option>
        </select>
        <FieldError id={`${id}-type-error`} message={errors.type} />
      </div>

      {askDate ? (
        <div>
          <label htmlFor={`${id}-date`} className={labelClass}>
            Event date <span className={hint}>(if known)</span>
          </label>
          <input
            id={`${id}-date`}
            name="date"
            type="date"
            className={fieldClass}
            defaultValue={values.date ?? ""}
          {...invalid("date")}
          />
          <FieldError id={`${id}-date-error`} message={errors.date} />
        </div>
      ) : null}

      {askWebsite ? (
        <div>
          <label htmlFor={`${id}-website`} className={labelClass}>
            Current website <span className={hint}>(if you have one)</span>
          </label>
          <input
            id={`${id}-website`}
            name="website"
            type="url"
            inputMode="url"
            placeholder="https://"
            className={fieldClass}
            defaultValue={values.website ?? ""}
          {...invalid("website")}
          />
          <FieldError id={`${id}-website-error`} message={errors.website} />
        </div>
      ) : null}

      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={labelClass}>
          {messageLabel} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          className={`${fieldClass} resize-y`}
          defaultValue={values.message ?? ""}
          {...invalid("message")}
        />
        <FieldError id={`${id}-message-error`} message={errors.message} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-xs leading-relaxed">
          <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-black" />
          <span>
            I agree to my details being used to respond to this enquiry, as described in the{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4">
              privacy policy
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError id={`${id}-consent-error`} message={errors.consent} />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending" : submitLabel}
        </Button>
        <p className="text-xs text-taupe-deep">Fields marked * are required.</p>
      </div>

      <FormMessage state={state} className="sm:col-span-2" />
    </form>
  );
}
