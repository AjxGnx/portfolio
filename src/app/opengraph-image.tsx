import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const profilePhoto = readFile(
  join(process.cwd(), "public/profile-v2.jpg")
).then(
  (file) =>
    `data:image/jpeg;base64,${file.toString("base64")}`
);

export default async function OpenGraphImage() {
  const photoSrc = await profilePhoto;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "56px 72px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #111118 45%, #1a1033 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.25)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: 200,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(6, 182, 212, 0.2)",
            filter: "blur(80px)",
          }}
        />

        {/* Photo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 56,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              padding: 4,
            }}
          >
            <img
              src={photoSrc}
              alt={SITE_NAME}
              width={272}
              height={272}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "#06b6d4",
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Tech Lead & Senior Backend Developer
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#e4e4e7",
              marginBottom: 20,
              letterSpacing: "-0.03em",
            }}
          >
            {SITE_NAME}
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {["Go", "Python", "Node.js", "Kafka"].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#a78bfa",
                  background: "rgba(139, 92, 246, 0.15)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: 8,
                  padding: "6px 14px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#a1a1aa",
              maxWidth: 680,
            }}
          >
            Building scalable microservices at Gipsyy · ex-Rappi · ex-Platzi
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
