import { ImageResponse } from "next/og";
import { getCity } from "@/lib/content";

export const alt = "Guide Palma — the independent guide to Palma de Mallorca";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Standard-OG-bild för hela sajten. Sidor med egna foton kan senare få egna. */
export default function OgImage() {
  const city = getCity();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fbf8f2",
          background: "linear-gradient(178deg, #f2cfa1 0%, #e3a079 30%, #b86c5a 58%, #5d4352 100%)",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 10, textTransform: "uppercase" }}>{city.brand}</div>
        <div style={{ fontSize: 112, lineHeight: 0.95, letterSpacing: -4, display: "flex", flexDirection: "column" }}>
          <span>{city.name},</span>
          <span style={{ fontStyle: "italic" }}>properly explored.</span>
        </div>
      </div>
    ),
    size,
  );
}
