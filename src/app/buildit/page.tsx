"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, Github } from "lucide-react";

const developers = [
  {
    name: "Nirmal Rajkumar",
    photo: "/dev-1.jpg",
  },
  {
    name: "Varun Sivanesh",
    photo: "/dev-2.jpg",
  },
  {
    name: "Daksh",
    photo: "/dev-3.jpg",
  },
  {
    name: "Aadi",
    photo: "/dev-4.jpg",
  },
  {
    name: "Shrikunj",
    photo: "/dev-5.jpg",
  },
  {
    name: "Nishant Bharadwaj",
    photo: "/dev-6.jpg",
  },
];

export default function BuilditPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: "#000000" }}>
      <div className="relative z-10 w-full px-6 pb-20 pt-12 lg:px-12">
        {/* Back Button - Top Right */}
        <div className="flex justify-end mb-8">
          <Link href="/">
            <Button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-white">
              ← Back to Main Application
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-16 flex items-center gap-6">
          <div className="flex-shrink-0">
            <Image
              src="/logobuildit.png"
              alt="Buildit"
              width={200}
              height={75}
              className="h-24 w-auto"
            />
          </div>
          <span className="h-16 w-px bg-slate-400" aria-hidden="true" />
          <div className="flex flex-col">
            <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-2">project 001</h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white">
              DSW MUJ Official website
            </h1>
          </div>
        </div>

        {/* Developers Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {developers.map((developer, idx) => (
            <div
              key={idx}
              className="relative group block p-2"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ isolation: 'isolate' }}
            >
              <Card
                className={`border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-[0_8px_24px_rgba(255,255,255,0.1)] relative z-10 transition-all duration-300 ${
                  hoveredIndex === idx ? 'scale-105 shadow-[0_12px_32px_rgba(255,255,255,0.2)]' : ''
                }`}
              >
                <CardContent className="flex flex-col items-center gap-6 p-0">
                  <Image
                    src={developer.photo}
                    alt={developer.name}
                    width={140}
                    height={140}
                    className="rounded-full object-cover w-36 h-36"
                  />
                  <h3 className="text-2xl font-semibold text-white text-center">
                    {developer.name}
                  </h3>
                  {/* Social Media Icons */}
                  <div className="flex items-center gap-4 mt-2">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

