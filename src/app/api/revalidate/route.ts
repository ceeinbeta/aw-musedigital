import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Called by a Sanity webhook whenever content is published, so the site
 * shows the change straight away instead of waiting up to an hour.
 *
 * Set SANITY_REVALIDATE_SECRET here and the same secret in the webhook's
 * settings at sanity.io/manage. Requests without a valid signature are refused.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured." }, { status: 500 });
  }
  try {
    const { isValidSignature } = await parseBody(request, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    }
    revalidateTag("content", "max");
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("Revalidation failed:", error);
    return NextResponse.json({ message: "Revalidation failed." }, { status: 400 });
  }
}
