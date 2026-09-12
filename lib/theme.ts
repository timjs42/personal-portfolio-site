// Mirrors the :root custom properties in app/globals.css. Kept in sync manually
// since Satori (next/og) can't read CSS custom properties at build time.
export const THEME_COLORS = {
  background: "#0f130f",
  foreground: "#ecede8",
  primary: "#bbbeac",
  secondary: "#4c615a",
  accent: "#7e9c7a",
} as const;
