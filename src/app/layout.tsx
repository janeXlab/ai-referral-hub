import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: {
    default: "AI Referral Hub - Share & Find AI Referral Codes",
    template: "%s | AI Referral Hub",
  },
  description:
    "Community-verified referral codes, invite links, and exclusive deals for 50+ AI products. Share your code, earn points.",
  metadataBase: new URL("https://aireferralhub.com"),
  keywords: [
    "AI referral code", "AI invite link", "ChatGPT referral", "Claude invite",
    "Cursor referral code", "AI deals", "AI coupon", "AI discount",
    "Midjourney invite", "Perplexity referral",
  ],
  openGraph: {
    type: "website",
    siteName: "AI Referral Hub",
    title: "AI Referral Hub - Share & Find AI Referral Codes",
    description: "Community-verified referral codes and invite links for 50+ AI products.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Referral Hub",
    description: "Community-verified AI referral codes & deals",
  },
  alternates: {
    languages: {
      en: "/en",
      "zh-CN": "/zh",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grid">
        {children}
      </body>
    </html>
  );
}
