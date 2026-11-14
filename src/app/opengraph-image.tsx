import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * The default preview image shown when a page is shared on social media and
 * the page has no photograph of its own.
 */
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3ede3",
          color: "#0f0e0d",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: 12 }}>{siteConfig.name}</div>
        <div style={{ width: 96, height: 2, background: "#d8c7ae", margin: "40px 0" }} />
        <div style={{ fontSize: 32, color: "#2b2927", maxWidth: 900, textAlign: "center" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
