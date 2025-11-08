"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const carouselItems = [
  {
    id: "vision",
    title: "Vision",
    content: "Embellish students with integrity and humane touch, nurture their talent to make them socially responsible global citizens.",
  },
  {
    id: "mission",
    title: "Mission",
    content: [
      "Facilitate multi skilled development.",
      "Cultivate an environment that respects diversity and promote healthy and positive relation among students, faculty and community.",
      "Understanding of students' needs.",
      "Synergizing academic and co-curricular activities.",
    ],
  },
  {
    id: "values",
    title: "Values",
    content: ["Accomplishment", "Honesty", "Integrity", "Teamwork", "Sincerity"],
  },
];

export function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 7000); // Change every 7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-56 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Card className="h-full border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(44,50,86,0.12)] rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-slate-900">
                {carouselItems[currentIndex].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {Array.isArray(carouselItems[currentIndex].content) ? (
                carouselItems[currentIndex].id === "mission" ? (
                  <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
                    {carouselItems[currentIndex].content.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-slate-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-wrap gap-2.5">
                    {carouselItems[currentIndex].content.map((value, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-2 rounded-full bg-white/80 text-xs font-medium text-slate-700 border border-slate-200/70 shadow-sm"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed">
                  {carouselItems[currentIndex].content}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-6 bg-slate-700"
                : "w-1.5 bg-slate-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

