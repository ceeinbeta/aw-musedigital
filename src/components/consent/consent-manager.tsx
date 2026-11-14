"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { gaMeasurementId, optionalCategories, type OptionalCategory } from "@/lib/consent/config";
import {
  OPEN_SETTINGS_EVENT,
  getConsent,
  saveConsent,
  subscribe,
  type Consent,
} from "@/lib/consent/store";

const allChoices = (value: boolean) =>
  Object.fromEntries(optionalCategories.map((category) => [category.id, value])) as Consent["choices"];

/** On the server the choice is unknown, so nothing consent-dependent renders. */
const unknownOnServer = () => undefined;

/**
 * Cookie consent banner, preferences panel and the gate for optional
 * scripts. Nothing optional loads until the visitor has agreed to it.
 */
export function ConsentManager() {
  const consent = useSyncExternalStore(subscribe, getConsent, unknownOnServer);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const hasOptional = optionalCategories.length > 0;

  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const showBanner = hasOptional && consent === null && !settingsOpen;
  const granted = (id: OptionalCategory) => consent?.choices[id] === true;

  return (
    <>
      {granted("analytics") && gaMeasurementId ? <Analytics id={gaMeasurementId} /> : null}

      {showBanner ? (
        <section
          aria-label="Cookie consent"
          className="on-dark fixed inset-x-0 bottom-0 z-50 border-t border-ivory/15 bg-black text-ivory"
        >
          <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <p className="max-w-2xl text-sm leading-relaxed text-ivory/85">
              We use optional cookies for {optionalCategories.map((c) => c.title.toLowerCase()).join(" and ")}{" "}
              only if you agree. You can change your choice at any time.{" "}
              <Link href="/cookie-policy" className="underline underline-offset-4">
                Cookie policy
              </Link>
            </p>
            {/* Accept and reject are equally prominent, as Spanish guidance requires. */}
            <div className="flex flex-wrap gap-3">
              <Button variant="light" onClick={() => saveConsent(allChoices(false))}>
                Reject all
              </Button>
              <Button variant="light" onClick={() => saveConsent(allChoices(true))}>
                Accept all
              </Button>
              <Button variant="text" className="text-ivory" onClick={() => setSettingsOpen(true)}>
                Settings
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {settingsOpen ? (
        <Preferences
          current={consent ?? null}
          onClose={() => setSettingsOpen(false)}
          onSave={(choices) => {
            saveConsent(choices);
            setSettingsOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

function Preferences({
  current,
  onClose,
  onSave,
}: {
  current: Consent | null;
  onClose: () => void;
  onSave: (choices: Consent["choices"]) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [choices, setChoices] = useState<Consent["choices"]>(current?.choices ?? allChoices(false));

  // A modal <dialog> keeps keyboard focus inside and closes with Escape.
  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-labelledby="cookie-settings-title"
      className="m-auto w-[min(36rem,calc(100vw-2rem))] bg-ivory p-0 text-charcoal backdrop:bg-black/60"
    >
      <div className="p-6 sm:p-8">
        <h2 id="cookie-settings-title" className="text-black">
          Cookie settings
        </h2>
        <ul className="mt-6 divide-y divide-beige border-y border-beige">
          <li className="flex items-start justify-between gap-6 py-5">
            <div>
              <p className="font-medium text-black">Strictly necessary</p>
              <p className="mt-1 text-sm">
                Remembers this choice and keeps forms secure. Always on, as the site cannot work
                without it.
              </p>
            </div>
            <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-taupe-deep">Always on</span>
          </li>
          {optionalCategories.map((category) => (
            <li key={category.id} className="flex items-start justify-between gap-6 py-5">
              <div>
                <label htmlFor={`consent-${category.id}`} className="font-medium text-black">
                  {category.title}
                </label>
                <p id={`consent-${category.id}-desc`} className="mt-1 text-sm">
                  {category.description}
                </p>
              </div>
              <input
                id={`consent-${category.id}`}
                type="checkbox"
                role="switch"
                aria-describedby={`consent-${category.id}-desc`}
                checked={choices[category.id] === true}
                onChange={(event) =>
                  setChoices((value) => ({ ...value, [category.id]: event.target.checked }))
                }
                className="mt-1 h-5 w-5 shrink-0 accent-black"
              />
            </li>
          ))}
        </ul>
        {optionalCategories.length === 0 ? (
          <p className="mt-6 text-sm">
            This site currently uses no optional cookies, so there is nothing to switch on or off.
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {optionalCategories.length > 0 ? (
            <>
              <Button variant="outline" onClick={() => onSave(allChoices(false))}>
                Reject all
              </Button>
              <Button variant="outline" onClick={() => onSave(allChoices(true))}>
                Accept all
              </Button>
              <Button onClick={() => onSave(choices)}>Save choices</Button>
            </>
          ) : (
            <Button onClick={() => dialog.current?.close()}>Close</Button>
          )}
        </div>
        <p className="mt-6 text-xs">
          Read the{" "}
          <Link href="/cookie-policy" className="underline underline-offset-4">
            cookie policy
          </Link>{" "}
          for details.
        </p>
      </div>
    </dialog>
  );
}

/** Google Analytics, loaded only after consent. IP addresses are anonymised by GA4 itself. */
function Analytics({ id }: { id: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
    </>
  );
}
