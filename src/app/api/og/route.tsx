import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
          background: "#070708",
          fontFamily: "Geist, sans-serif",
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(201, 169, 255, 0.15), transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "#c9a9ff",
            }}
          >
            TOMEFY
          </span>
          <span
            style={{
              fontSize: 24,
              color: "#a3a3ab",
              letterSpacing: "0.06em",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            AI Automation &amp; AI Agent Engineering
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
