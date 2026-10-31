import type { Metadata } from "next";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

// Self-hosted latin subsets of the Google Fonts variable files. next/font/google
// intermittently breaks Turbopack when Google serves `/l/font?kit=…&skey=…`
// URLs, so the fonts live in the repo instead of being fetched at build time.
const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Timothy Sheu - Full-Stack Developer",
  description: "Portfolio and projects by Timothy Sheu, a full-stack developer working with React, Next.js, and TypeScript.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${geistSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      >
        <body className="min-h-dvh flex flex-col">
          <Nav />
          {children}
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}