"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full bg-white py-6 md:py-8 mt-12 md:mt-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Section: Logo/University on left, Social Icons on right */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
          {/* Left: Logo and DSW Text */}
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src="/manipal-university-jaipur-logo.svg"
              alt="Manipal University Jaipur"
              width={50}
              height={50}
              className="h-10 md:h-12 w-auto"
            />
            <span className="h-6 md:h-8 w-px bg-slate-300" aria-hidden="true" />
            <div className="flex flex-col leading-tight text-left">
              <span className="text-lg md:text-[1.2rem] font-semibold tracking-tight text-slate-900">
                DSW
              </span>
              <span className="text-[0.55rem] md:text-[0.62rem] font-medium uppercase tracking-[0.3em] md:tracking-[0.38em] text-slate-500">
                Student Welfare
              </span>
            </div>
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#d3622d] transition-colors"
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#d3622d] transition-colors"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#d3622d] transition-colors"
            >
              <Youtube className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-slate-200 mb-4 md:mb-6"></div>

        {/* Bottom Section: Copyright on left, Links on right */}
        <div className="flex flex-col gap-4 md:gap-0">
          {/* Left: Copyright */}
          <div className="flex flex-col gap-1 mb-4 md:mb-0">
            <p className="text-xs md:text-sm text-slate-600">
              © {new Date().getFullYear()} Directorate of Students' Welfare
            </p>
            <p className="text-xs md:text-sm text-slate-600">All rights reserved</p>
          </div>

          {/* Right: Buildit Links */}
          <div className="flex flex-col gap-2 items-start md:items-end">
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              <span className="text-xs md:text-sm text-slate-600">application built with</span>
              <span className="text-[#d3622d]">❤️</span>
              <span className="text-xs md:text-sm text-slate-600">by</span>
              <Image
                src="/morrow.png"
                alt="Morrow"
                width={150}
                height={60}
                className="h-8 md:h-12 w-auto"
              />
            </div>
            <Link
              href="/buildit"
              className="text-xs md:text-sm font-semibold text-slate-900 hover:text-[#d3622d] transition-colors"
            >
              #BUILDITPROJECT001
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

