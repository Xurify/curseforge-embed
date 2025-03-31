import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CurseForge Embeds",
  description:
    "A simple and easy way to embed CurseForge projects on your website",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  },
  applicationName: "CurseForge Embeds",
  authors: [{ name: "Xurify" }],
  creator: "Xurify",
  publisher: "Xurify",
  keywords: ["curseforge", "minecraft", "mods", "react", "nextjs", "embed"],
  openGraph: {
    title: "CurseForge Embeds",
    description:
      "A simple and easy way to embed CurseForge projects on your website",
    images: ["/og-image.svg"],
  },
  metadataBase: new URL("https://curseforge-embed.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#EB622B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
