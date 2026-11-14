import type { Metadata } from "next";
import { CookieSettingsLink } from "@/components/consent/cookie-settings-link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { CONSENT_COOKIE, gaMeasurementId } from "@/lib/consent/config";
import { baseOpenGraph } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Which cookies ${siteConfig.name} uses and how to control them.`,
  alternates: { canonical: "/cookie-policy" },
  openGraph: { ...baseOpenGraph, title: "Cookie Policy", url: "/cookie-policy" },
};

type CookieRow = { name: string; provider: string; purpose: string; duration: string };

/**
 * EDITABLE TEMPLATE. The table lists the cookies this site actually sets.
 * When a new service is added, add its cookies here and its category in
 * src/lib/consent/config.ts. Must be reviewed by a lawyer before launch.
 */
export default function CookiePolicyPage() {
  const necessary: CookieRow[] = [
    {
      name: CONSENT_COOKIE,
      provider: siteConfig.name,
      purpose: "Remembers your cookie choices.",
      duration: "12 months",
    },
  ];
  const analytics: CookieRow[] = gaMeasurementId
    ? [
        {
          name: "_ga, _ga_*",
          provider: "Google Analytics",
          purpose: "Counts visits and shows how the site is used.",
          duration: "Up to 2 years",
        },
      ]
    : [];

  const sections: LegalSection[] = [
    {
      heading: "What cookies are",
      body: (
        <p>
          Cookies are small files a website stores on your device. Some are needed for the site to
          work. Others, such as analytics cookies, are optional and are only used if you agree.
        </p>
      ),
    },
    {
      heading: "Strictly necessary cookies",
      body: (
        <>
          <p>These do not need your consent, because the site cannot work without them.</p>
          <CookieTable rows={necessary} />
        </>
      ),
    },
    {
      heading: "Optional cookies",
      body:
        analytics.length > 0 ? (
          <>
            <p>These are only set after you accept them in the cookie banner.</p>
            <CookieTable rows={analytics} />
          </>
        ) : (
          <p>This site does not currently use any optional cookies, such as analytics or advertising cookies.</p>
        ),
    },
    {
      heading: "Amazon and other websites",
      body: (
        <p>
          When you follow a product link to Amazon.es, Amazon sets its own cookies on its own
          website, under its own cookie policy. That is how Amazon records that you arrived from
          this site. We do not control those cookies and none are set while you are on this site.
        </p>
      ),
    },
    {
      heading: "Changing your choice",
      body: (
        <>
          <p>
            You can change or withdraw your consent at any time.{" "}
            <CookieSettingsLink className="underline underline-offset-4" />
          </p>
          <p>You can also delete or block cookies in your browser&apos;s settings.</p>
        </>
      ),
    },
  ];

  return <LegalPage title="Cookie Policy" sections={sections} />;
}

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="relative overflow-x-auto border border-beige">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead className="bg-cream">
          <tr>
            {["Cookie", "Provider", "Purpose", "Duration"].map((label) => (
              <th key={label} scope="col" className="p-3 font-medium text-black">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-beige">
              <td className="p-3 font-mono text-[13px]">{row.name}</td>
              <td className="p-3">{row.provider}</td>
              <td className="p-3">{row.purpose}</td>
              <td className="p-3">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
