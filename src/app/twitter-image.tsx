import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export const alt = `${siteConfig.name}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const development = process.env.NODE_ENV === "development";
  const imageUrl = development
    ? `http://localhost:3000/images/SAK_fb_cover.png`
    : `${siteConfig.baseUrl}/images/SAK_fb_cover.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d596a",
          padding: "40px",
        }}
      >
        <img
          src={imageUrl}
          alt={`${siteConfig.name}`}
          width="1120"
          height="550"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
