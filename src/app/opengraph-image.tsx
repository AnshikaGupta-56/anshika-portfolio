import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Anshika Gupta — Computer Science Student, AI & Machine Learning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, color: "#e7ecf1",
          background: "radial-gradient(circle at 85% 0%, rgba(110,231,200,0.30), #06080b 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#6ee7c8", letterSpacing: 4 }}>ANSHIKA GUPTA · AI & ML</div>
        <div style={{ display: "flex", fontSize: 86, fontWeight: 700, lineHeight: 1.02, maxWidth: 1000 }}>
          I build tools that turn data into answers.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#8590a0" }}>
          Python · SQL · Machine Learning · NLP — open to internships
        </div>
      </div>
    ),
    size,
  );
}
