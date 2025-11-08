"use client";

import { useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function ClubsPage() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: "#e9e5de" }}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_15%,rgba(255,255,255,0.68),rgba(255,255,255,0))]" />
      <div className="relative z-10 w-full px-4 pb-20 pt-20 md:pt-24 md:px-6 lg:px-12">
        <header className="mb-8 text-center">
          <div className="mb-4" style={{ fontFamily: 'var(--font-rubik-80s-fade)', fontWeight: 900 }}>
            <TextGenerateEffect
              words="STUDENT CLUBS AND CHAPTERS"
              className="text-xl sm:text-2xl md:text-7xl lg:text-8xl font-black tracking-tight whitespace-nowrap"
              duration={2.0}
              onComplete={() => setAnimationComplete(true)}
            />
          </div>
          <p 
            className={`text-[0.65rem] sm:text-xs md:text-base text-slate-600 italic font-semibold mx-auto px-2 max-w-[95%] transition-opacity duration-1000 ${
              animationComplete ? "opacity-100" : "opacity-0"
            }`}
          >
            Explore academic, cultural, technical, and social clubs that power student life at MUJ.
          </p>
        </header>
      </div>
    </div>
  );
}


