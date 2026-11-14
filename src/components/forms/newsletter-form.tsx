"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { subscribeNewsletter } from "@/lib/forms/actions";
import { FormMessage, Honeypot, useFormAction } from "./form-kit";

/** Newsletter sign-up. Consent is required and recorded with the address. */
export function NewsletterForm() {
  const { state, formAction, pending } = useFormAction(subscribeNewsletter);
  const done = state.status === "success";

  return (
    <form action={formAction} className="relative mx-auto w-full max-w-xl">
      <Honeypot />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={state.errors?.email ? true : undefined}
          className="min-h-12 flex-1 border border-charcoal/50 bg-ivory px-5 text-base text-black placeholder:text-taupe-deep focus-visible:border-black"
        />
        <Button type="submit" disabled={pending || done}>
          {pending ? "Sending" : "Subscribe"}
        </Button>
      </div>

      <label className="mt-5 flex items-start gap-3 text-left text-xs leading-relaxed">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-black" />
        <span>
          I agree to receive the newsletter and accept the{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4">
            privacy policy
          </Link>
          . Unsubscribe at any time.
        </span>
      </label>

      <FormMessage state={state} className="mt-5" />
    </form>
  );
}
