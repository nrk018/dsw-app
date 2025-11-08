import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Directorate of Students' Welfare | Manipal University Jaipur",
  description:
    "Department of Student Welfare at Manipal University Jaipur, supporting students with holistic programs, counselling, and leadership.",
  themeColor: "#e9e5de",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimationProvider>
          <SiteNavbar />
          <PageShell>{children}</PageShell>
        </AnimationProvider>
      </body>
    </html>
  );
}
