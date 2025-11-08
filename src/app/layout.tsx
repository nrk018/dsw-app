import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Rubik_80s_Fade } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/site/site-navbar";
import { PageShell } from "@/components/site/page-shell";
import { AnimationProvider } from "@/contexts/animation-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik80sFade = Rubik_80s_Fade({
  weight: "400",
  variable: "--font-rubik-80s-fade",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Directorate of Students' Welfare | Manipal University Jaipur",
  description:
    "Department of Student Welfare at Manipal University Jaipur, supporting students with holistic programs, counselling, and leadership.",
  themeColor: "#e9e5de",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik80sFade.variable} antialiased`}
      >
        <AnimationProvider>
          <SiteNavbar />
          <PageShell>{children}</PageShell>
        </AnimationProvider>
      </body>
    </html>
  );
}
