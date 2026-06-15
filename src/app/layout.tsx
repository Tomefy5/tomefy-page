import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tomefy — AI Automation & AI Agent Engineer",
    template: "%s | Tomefy",
  },
  description:
    "Premium bilingual portfolio of Tomefy, AI Automation Engineer and AI Agent Engineer.",
  icons: [{ url: "/images/logo-alone.png", type: "image/png" }],
  openGraph: {
    title: "Tomefy — AI Automation & AI Agent Engineer",
    description:
      "Premium bilingual portfolio of Tomefy, AI Automation Engineer and AI Agent Engineer.",
    url: "https://tomefy.com",
    siteName: "Tomefy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        type: "image/png",
      },
      {
        url: "/images/logo-with-name.png",
        width: 1536,
        height: 1024,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomefy — AI Automation & AI Agent Engineer",
    description:
      "Premium bilingual portfolio of Tomefy, AI Automation Engineer and AI Agent Engineer.",
    images: ["/api/og"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
