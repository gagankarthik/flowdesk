import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";

const display = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowDesk — pick the freelancer tool we build",
  description:
    "Three problems every freelancer has. Vote for the one that hurts most. We ship the winner.",
  openGraph: {
    title: "FlowDesk — pick the freelancer tool we build",
    description: "Three problems. One winner. We ship the one you vote for.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
