import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Akash Patel — AI/ML Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #0f172a 100%)",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid background lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Cyan glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "20px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
          {/* Available badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.3)",
              borderRadius: "999px",
              padding: "6px 16px",
              width: "fit-content",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22d3ee" }} />
            <span style={{ color: "#22d3ee", fontSize: "14px", fontFamily: "monospace" }}>
              Available for new projects
            </span>
          </div>

          {/* Name */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "28px", fontWeight: 300 }}>Hi, I'm</span>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 800,
                background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1,
              }}
            >
              Akash Patel
            </span>
          </div>

          {/* Role */}
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "32px", fontWeight: 600 }}>
            AI/ML Engineer & Full-Stack Developer
          </div>

          {/* Tagline */}
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "18px",
              maxWidth: "700px",
              lineHeight: 1.6,
              marginTop: "8px",
            }}
          >
            RAG systems · Computer Vision · AI Agents · Complex full-stack systems
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "40px", marginTop: "24px" }}>
            {[
              { val: "6+", label: "Years Experience" },
              { val: "40+", label: "Projects Delivered" },
              { val: "Remote", label: "Worldwide" },
            ].map(({ val, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    fontFamily: "monospace",
                    background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {val}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Domain */}
          <div
            style={{
              marginTop: "24px",
              color: "rgba(255,255,255,0.3)",
              fontSize: "16px",
              fontFamily: "monospace",
            }}
          >
            akashcodecafe.tech
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
