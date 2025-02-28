import type { Metadata } from "next";
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
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
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
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
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
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#F16436" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
