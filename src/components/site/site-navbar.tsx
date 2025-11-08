"use client";
import Link from "next/link";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAnimation } from "@/contexts/animation-context";

const items = [
  { name: "Clubs", link: "/clubs" },
  { name: "MUJ Events", link: "/events" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isClubsOrEvents = pathname === "/clubs" || pathname === "/events";
  const isBuildit = pathname === "/buildit";
  const { heroAnimationComplete } = useAnimation();

  // Hide navbar on buildit page
  if (isBuildit) {
    return null;
  }

  return (
    <Navbar 
      className={`fixed inset-x-0 z-50 w-full transition-opacity duration-1000 ${
        isHome && !heroAnimationComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      } ${
        isClubsOrEvents 
          ? "bottom-3 md:top-3 md:bottom-auto" 
          : "top-3 md:top-4"
      }`}
    >
      <NavBody
        className={
          `mx-auto rounded-full px-6 py-3 transition-colors ${
            isHome
              ? "border-transparent bg-transparent shadow-none"
              : "border-white/60 bg-white/70 shadow-[0_10px_28px_rgba(44,50,86,0.08)] backdrop-blur-2xl"
          }`
        }
      >
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-slate-900">
            <span className="sr-only">Home</span>
            <div className="flex items-center gap-2">
              <img
                src="/manipal-university-jaipur-logo.svg"
                alt="Manipal University Jaipur"
                width={34}
                height={34}
                className="h-8 w-auto"
              />
              <span className="h-8 w-px bg-slate-300/80" aria-hidden="true" />
              <div className="flex flex-col leading-tight text-left">
                <span className="text-base font-semibold tracking-tight text-slate-900">
                  DSW
                </span>
                <span className="text-[0.5rem] font-medium uppercase tracking-[0.3em] text-slate-500">
                  Student Welfare
                </span>
              </div>
            </div>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            <Link href="/clubs" className="px-4 py-2 text-sm text-slate-700 border-b-2 border-transparent hover:border-[#d3622d] transition-colors">
              Clubs
            </Link>
            <Link href="/events" className="px-4 py-2 text-sm text-slate-700 border-b-2 border-transparent hover:border-[#d3622d] transition-colors">
              MUJ Events
            </Link>
          </div>
        </div>
      </NavBody>

      <MobileNav className="mx-auto w-full max-w-[calc(100%-2rem)] rounded-full px-2.5 py-1.5 border-white/60 bg-white/70 shadow-[0_10px_28px_rgba(44,50,86,0.08)] backdrop-blur-2xl">
        <div className="flex w-full items-center justify-between">
          {/* Left: Logo + DSW */}
          <Link href="/" className="flex items-center gap-1 text-slate-900">
            <img
              src="/manipal-university-jaipur-logo.svg"
              alt="Manipal University Jaipur"
              width={16}
              height={16}
              className="h-4 w-auto"
            />
            <span className="h-4 w-px bg-slate-300/80" aria-hidden="true" />
            <div className="flex flex-col leading-tight text-left">
              <span className="text-[0.7rem] font-semibold tracking-tight text-slate-900">
                DSW
              </span>
              <span className="text-[0.35rem] font-medium uppercase tracking-[0.15em] text-slate-500">
                Student Welfare
              </span>
            </div>
          </Link>
          {/* Right Corner: Clubs and Events */}
          <div className="flex items-center gap-1">
            <Link href="/clubs" className="px-2.5 py-0.5 text-[0.65rem] font-medium text-slate-700 border-b-2 border-transparent hover:border-[#d3622d] transition-colors">
              Clubs
            </Link>
            <Link href="/events" className="px-2.5 py-0.5 text-[0.65rem] font-medium text-slate-700 border-b-2 border-transparent hover:border-[#d3622d] transition-colors">
              Events
            </Link>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}


