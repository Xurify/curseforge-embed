import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "CurseForge Embed - React Component for Minecraft Mods",
  description: "A modern React component for embedding CurseForge projects in your Next.js application",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  authors: [
    { name: 'CurseForge Embed Team' }
  ],
  keywords: ['curseforge', 'minecraft', 'mods', 'react', 'nextjs', 'embed'],
  openGraph: {
    title: 'CurseForge Embed Component',
    description: 'Embed CurseForge projects in your Next.js application',
    images: ['/og-image.svg'],
  },
  metadataBase: new URL('https://curseforge-embed.vercel.app'),
};

export const viewport: Viewport = {
  themeColor: '#F16436',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
