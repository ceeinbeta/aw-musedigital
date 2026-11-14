"use client";

import { useActionState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import {
  HONEYPOT_FIELD,
  TIMESTAMP_FIELD,
  idleState,
  type FormState,
} from "@/lib/forms/state";

type Action = (previous: FormState, formData: FormData) => Promise<FormState>;

/**
 * Wraps a server action for use in a form. Adds the time the visitor first
 * saw the form, which the server uses to discard instant bot submissions.
 */
export function useFormAction(action: Action) {
  const [state, dispatch, pending] = useActionState(action, idleState);
  const started = useRef(0);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  function formAction(formData: FormData) {
    formData.set(TIMESTAMP_FIELD, String(started.current));
    dispatch(formData);
  }

  return { state, formAction, pending };
}

/**
 * A field hidden from people and from screen readers. Real visitors never
 * fill it in; bots that complete every field do, and are discarded.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

/** The message under a form: confirmation on success, explanation on failure. */
export function FormMessage({ state, className }: { state: FormState; className?: string }) {
  return (
    <p
      role={state.status === "error" ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "min-h-6 text-sm",
        state.status === "error" && "font-normal text-[#8a2b1f]",
        className,
      )}
    >
      {state.message}
    </p>
  );
}

/** The error shown directly beneath one field. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-normal text-[#8a2b1f]">
      {message}
    </p>
  );
}
