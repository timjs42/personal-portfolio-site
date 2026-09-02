import { ImageResponse } from "next/og";

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
          background: "#FAFAF8",
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
            top: 60,
            right: 80,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "#5CE7AF",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 70,
            right: 140,
            width: 50,
            height: 50,
            borderRadius: 10,
            background: "#14151A",
            transform: "rotate(12deg)",
            display: "flex",
          }}
        />

        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#5F5E5A",
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
            color: "#14151A",
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
            color: "#5F5E5A",
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