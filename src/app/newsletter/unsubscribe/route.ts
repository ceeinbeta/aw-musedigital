import { NextResponse, type NextRequest } from "next/server";
import { applyNewsletterToken } from "@/lib/forms/newsletter";

/** Handles the "unsubscribe" link in newsletter emails, then shows a result page. */
export async function GET(request: NextRequest) {
  const ok = await applyNewsletterToken(request.nextUrl.searchParams.get("token"), "unsubscribed");
  return NextResponse.redirect(new URL(ok ? "/newsletter/unsubscribed" : "/newsletter/invalid", request.url));
}
