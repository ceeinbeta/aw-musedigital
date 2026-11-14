import { NextResponse, type NextRequest } from "next/server";
import { applyNewsletterToken } from "@/lib/forms/newsletter";

/** Handles the "confirm" link in newsletter emails, then shows a result page. */
export async function GET(request: NextRequest) {
  const ok = await applyNewsletterToken(request.nextUrl.searchParams.get("token"), "subscribed");
  return NextResponse.redirect(new URL(ok ? "/newsletter/confirmed" : "/newsletter/invalid", request.url));
}
