import type { Metadata } from "next";
import { Geist, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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