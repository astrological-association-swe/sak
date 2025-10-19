import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export const alt = `${siteConfig.name} 2025`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1b3e45 0%, #0d596a 100%)",
          position: "relative",
        }}
      >
        {/* Decorative overlay pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background:
              "radial-gradient(circle at 20% 50%, #a5babe 0%, transparent 50%), radial-gradient(circle at 80% 50%, #a5babe 0%, transparent 50%)",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "80px",
            position: "relative",
          }}
        >
          {/* Main title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#efefef",
              marginBottom: 40,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {siteConfig.name} 2025
          </div>

          {/* Accent line */}
          <div
            style={{
              width: 200,
              height: 4,
              background: "#a85c37",
              marginBottom: 40,
              borderRadius: 2,
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: "#e4d8d1",
              marginBottom: 20,
              fontWeight: 400,
            }}
          >
            {new Date(siteConfig.event.startDate).toLocaleDateString("sv-SE", {
              day: "numeric",
              month: "long",
            })}{" "}
            -{" "}
            {new Date(siteConfig.event.endDate).toLocaleDateString("sv-SE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: "#a5babe",
              maxWidth: 900,
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {siteConfig.description.split(".")[0]}
          </div>
        </div>

        {/* Footer badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(0, 0, 0, 0.3)",
            padding: "16px 32px",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#efefef",
              fontWeight: 600,
            }}
          >
            {siteConfig.shortName} 2025
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
