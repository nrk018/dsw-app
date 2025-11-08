import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClubsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900" style={{ backgroundColor: "#e9e5de" }}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_15%,rgba(255,255,255,0.68),rgba(255,255,255,0))]" />
      <div className="relative z-10 w-full px-6 pb-20 pt-24 lg:px-12">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Clubs & Chapters</h1>
        </header>

        <Card className="border-white/60 bg-white/70 p-8 backdrop-blur-2xl shadow-[0_16px_36px_rgba(52,60,98,0.12)]">
          <CardHeader>
            <CardTitle className="text-2xl">Student Clubs & Chapters</CardTitle>
            <CardDescription className="text-base">
              Explore academic, cultural, technical, and social clubs that power student life at MUJ.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-slate-600">
            <p>
              This space can list clubs with categories, meeting info, and application links. We’ll connect to a data source (Sheet/JSON/API) for easy updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


