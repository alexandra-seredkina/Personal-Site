import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — Application Security Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only copy keeps the image independent of web-font loading.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "radial-gradient(circle at 20% 0%, #3a0d1a 0%, #06070b 60%)",
        color: "#eef0f7",
        fontFamily: "monospace",
      }}
    >
      <div style={{ fontSize: 32, color: "#ff3358" }}>$ whoami</div>
      <div style={{ fontSize: 88, fontWeight: 800, marginTop: 24, letterSpacing: -2 }}>
        {site.name}
      </div>
      <div style={{ fontSize: 40, color: "#8d93a8", marginTop: 16 }}>
        Application Security Engineer · Web & API Pentesting
      </div>
    </div>,
    size,
  );
}
