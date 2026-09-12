import { ImageResponse } from "next/og";
import { THEME_COLORS } from "@/lib/theme";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: THEME_COLORS.background,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${THEME_COLORS.accent}55 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: 60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${THEME_COLORS.secondary}66 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 22,
            color: THEME_COLORS.primary,
            margin: 0,
            marginBottom: 12,
          }}
        >
          Portfolio
        </p>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontWeight: 700,
            fontSize: 64,
            color: THEME_COLORS.foreground,
            margin: 0,
            marginBottom: 12,
          }}
        >
          Timothy Sheu
        </h1>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 28,
            color: THEME_COLORS.primary,
            margin: 0,
          }}
        >
          Full-Stack Developer
        </p>
      </div>
    ),
    { ...size }
  );
}
