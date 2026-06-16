import { ImageResponse } from "next/og";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

export const alt = SITE_NAME;
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
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #1a1033 100%)",
          color: "#e4e4e7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#06b6d4",
            marginBottom: 16,
          }}
        >
          Tech Lead & Senior Backend Developer
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 24,
            background: "linear-gradient(135deg, #8b5cf6, #6366f1, #06b6d4)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.4,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          {DEFAULT_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
