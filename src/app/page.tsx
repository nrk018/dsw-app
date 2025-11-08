"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAnimation } from "@/contexts/animation-context";

import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SimpleCounter } from "@/components/simple-counter";
import { FlipWords } from "@/components/ui/flip-words";
import { useInView, AnimatePresence, motion } from "motion/react";
import { useRef, useCallback } from "react";
import { SiteFooter } from "@/components/site/site-footer";


const missionStatements = [
  "Facilitate multi skilled development.",
  "Cultivate an environment that respects diversity and promotes healthy, positive relations among students, faculty, and community.",
  "Understand students’ needs with empathy and responsiveness.",
  "Synergize academic and co-curricular activities for holistic growth.",
];

const values = [
  "Accomplishment",
  "Honesty",
  "Integrity",
  "Teamwork",
  "Sincerity",
];

const teamMembers = [
  {
    name: "Dr Madhura Yadav",
    title: "Dean, Student Welfare",
    focus: "Leadership & Strategy",
  },
  {
    name: "Dr Pankaj Vyas",
    title: "Director, DSW",
    focus: "Operations & Governance",
  },
  {
    name: "Dr Sanchit Anand",
    title: "Assistant Director (Clubs & Chapters)",
    focus: "Student Communities",
  },
  {
    name: "Dr Sukhwinder Sharma",
    title: "Assistant Director, DSW",
    focus: "Student Engagement",
  },
  {
    name: "Dr Sunita Singh Khatana",
    title: "Assistant Director, DSW",
    focus: "Student Services",
  },
  {
    name: "Dr Harshavardhana B G",
    title: "Assistant Director, DSW",
    focus: "Social Connect",
  },
  {
    name: "Dr Atul Kumar Verma",
    title: "Assistant Director, DSW",
    focus: "Student Code of Conduct",
  },
  {
    name: "Dr Sushama",
    title: "Assistant Director, DSW",
    focus: "Student Wellbeing",
  },
  {
    name: "Dr Rimpy Sharma",
    title: "Student Counsellor",
    focus: "Wellbeing & Guidance",
  },
  {
    name: "Ms Vandna Kabra",
    title: "Student Counsellor",
    focus: "Student Support",
  },
  {
    name: "Ms Devanshi Padaliya",
    title: "Student Counsellor",
    focus: "Counselling & Outreach",
  },
];

const nucleusMembers = [
  {
    name: "Nucleus Members",
    description:
      "Collaborative leaders from across departments, supporting daily operations and co-creating vibrant campus life.",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Home() {
  const { heroAnimationComplete, setHeroAnimationComplete } = useAnimation();
  const [firstLineComplete, setFirstLineComplete] = useState(false);
  const [secondLineComplete, setSecondLineComplete] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [missionIndex, setMissionIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
    // Refs for scroll-based fade in effects
    const overviewRef = useRef(null);
    const teamRef = useRef(null);
    const footerRef = useRef(null);
    
    const overviewInView = useInView(overviewRef, { once: true, amount: 0.1 });
    const teamInView = useInView(teamRef, { once: true, amount: 0.1 });
    const footerInView = useInView(footerRef, { once: true, amount: 0.1 });

  // Scroll to top on page load/reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set hero animation complete when both lines are done
  useEffect(() => {
    if (firstLineComplete && secondLineComplete && !heroAnimationComplete) {
      setTimeout(() => {
        setHeroAnimationComplete(true);
      }, 500);
    }
  }, [firstLineComplete, secondLineComplete, heroAnimationComplete, setHeroAnimationComplete]);

  const carouselIndexRef = useRef(carouselIndex);
  const missionIndexRef = useRef(missionIndex);
  const missionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const carouselTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Sync refs with state
  carouselIndexRef.current = carouselIndex;
  missionIndexRef.current = missionIndex;

  // Auto-rotate carousel - longer duration for Mission to show all statements
  useEffect(() => {
    const rotateCarousel = () => {
      const currentIndex = carouselIndexRef.current;
      const nextIndex = (currentIndex + 1) % 3;
      carouselIndexRef.current = nextIndex;
      setCarouselIndex(nextIndex);
      
      // Reset mission index when switching away from Mission
      if (currentIndex === 1) {
        missionIndexRef.current = 0;
        setMissionIndex(0);
        if (missionTimeoutRef.current) {
          clearTimeout(missionTimeoutRef.current);
          missionTimeoutRef.current = null;
        }
      }
      
      // If next is Mission, stay longer (enough for all 4 statements: 4 * 4.5s = 18s + buffer)
      // If next is Vision or Values, normal duration
      const interval = nextIndex === 1 ? 20000 : 8000; // 20s for Mission, 8s for others
      carouselTimeoutRef.current = setTimeout(rotateCarousel, interval);
    };
    
    // Start rotation after initial delay
    const initialDelay = 8000;
    carouselTimeoutRef.current = setTimeout(rotateCarousel, initialDelay);
    
    return () => {
      if (carouselTimeoutRef.current) clearTimeout(carouselTimeoutRef.current);
    };
  }, []);

  // Auto-rotate mission statements when Mission card is active
  useEffect(() => {
    if (carouselIndex !== 1) {
      // Reset mission index when Mission card is not active
      missionIndexRef.current = 0;
      setMissionIndex(0);
      if (missionTimeoutRef.current) {
        clearTimeout(missionTimeoutRef.current);
        missionTimeoutRef.current = null;
      }
      return;
    }
    
    // Reset to first mission when Mission card becomes active
    missionIndexRef.current = 0;
    setMissionIndex(0);
    
    const rotateMission = () => {
      missionIndexRef.current = (missionIndexRef.current + 1) % missionStatements.length;
      setMissionIndex(missionIndexRef.current);
      
      // Rotate every 4.5 seconds to show all 4 statements within 20 seconds
      const interval = 4500;
      missionTimeoutRef.current = setTimeout(rotateMission, interval);
    };
    
    // Start rotation after initial delay
    const initialDelay = 4500;
    missionTimeoutRef.current = setTimeout(rotateMission, initialDelay);
    
    return () => {
      if (missionTimeoutRef.current) clearTimeout(missionTimeoutRef.current);
    };
  }, [carouselIndex]);

  return (
    <>
      {/* Hero Section with Dome Image as Background */}
      <section
        className="hero-bg-responsive relative w-full"
        style={{
          backgroundColor: "#e9e5de",
          minHeight: "100vh",
        }}
      >
        {/* Mobile: Centered Text Above Dome */}
        <div className="absolute inset-0 z-10 flex items-start justify-center px-4 pt-12 md:hidden">
          <div className="flex flex-col items-center text-center space-y-1 mt-4 max-w-[95%]">
            <div className="whitespace-nowrap">
              <TextGenerateEffect
                words="Directorate of Student Welfare"
                className="text-2xl sm:text-3xl tracking-tight text-slate-900 font-black"
                duration={2.0}
                onComplete={() => {
                  setFirstLineComplete(true);
                  setSecondLineComplete(true);
                }}
              />
            </div>
            <p 
              className={`text-[0.65rem] sm:text-[0.7rem] text-slate-700 leading-relaxed font-medium transition-opacity duration-1000 whitespace-nowrap ${
                heroAnimationComplete ? "opacity-100" : "opacity-0"
              }`}
            >
              Empowering students through comprehensive support and guidance
            </p>
          </div>
        </div>

        {/* Mobile: Circular Stats Cards at Stairs */}
        <div 
          className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 md:hidden flex items-center justify-center gap-4 transition-opacity duration-1000 ${
            heroAnimationComplete ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Clubs Card */}
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_20px_rgba(44,50,86,0.1)]">
              <p className="text-lg font-bold text-slate-900">
                <SimpleCounter end={45} duration={2000} />
              </p>
              <p className="text-[0.6rem] font-medium text-slate-600 uppercase tracking-wide mt-0.5">Clubs</p>
            </div>
            {/* Events Card */}
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_20px_rgba(44,50,86,0.1)]">
              <p className="text-lg font-bold text-slate-900">
                <SimpleCounter end={150} duration={2500} />
              </p>
              <p className="text-[0.6rem] font-medium text-slate-600 uppercase tracking-wide mt-0.5">Events</p>
            </div>
            {/* Members Card */}
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_20px_rgba(44,50,86,0.1)]">
              <p className="text-lg font-bold text-slate-900">
                <SimpleCounter end={5000} duration={3000} />
              </p>
              <p className="text-[0.6rem] font-medium text-slate-600 uppercase tracking-wide mt-0.5">Members</p>
            </div>
          </div>
        </div>

        {/* Mobile: Scroll Arrow */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 md:hidden animate-bounce">
          <svg
            className="w-5 h-5 text-slate-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>

        {/* Desktop: Original Layout */}
        <div className="absolute inset-0 z-10 hidden md:flex items-start px-8 pt-20 md:pt-24 lg:px-12 lg:pt-40">
          {/* Directorate Title */}
          <div className="flex-1 space-y-3 md:space-y-4 max-w-lg lg:max-w-xl xl:max-w-2xl">
            {/* iPad: Single Line */}
            <div className="md:block lg:hidden">
              <div className="whitespace-nowrap">
                <TextGenerateEffect
                  words="Directorate of Student Welfare"
                  className="text-4xl md:text-5xl tracking-tight text-slate-900 font-black"
                  duration={2.0}
                  onComplete={() => {
                    setFirstLineComplete(true);
                    setSecondLineComplete(true);
                  }}
                />
              </div>
              <p 
                className={`text-xs md:text-sm text-slate-700 max-w-md leading-relaxed transition-opacity duration-1000 whitespace-nowrap mt-2 italic ${
                  heroAnimationComplete ? "opacity-100" : "opacity-0"
                }`}
              >
                Empowering students through comprehensive support and guidance
              </p>
              {/* iPad: Circular Stats Cards */}
              <div 
                className={`flex items-center justify-start gap-4 mt-6 -ml-4 transition-opacity duration-1000 ${
                  heroAnimationComplete ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Clubs Card */}
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_20px_rgba(44,50,86,0.1)]">
                  <p className="text-lg font-bold text-slate-900">
                    <SimpleCounter end={45} duration={2000} />
                  </p>
                  <p className="text-[0.6rem] font-medium text-slate-600 uppercase tracking-wide mt-0.5">Clubs</p>
                </div>
                {/* Events Card */}
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_20px_rgba(44,50,86,0.1)]">
                  <p className="text-lg font-bold text-slate-900">
                    <SimpleCounter end={150} duration={2500} />
                  </p>
                  <p className="text-[0.6rem] font-medium text-slate-600 uppercase tracking-wide mt-0.5">Events</p>
                </div>
                {/* Members Card */}
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_20px_rgba(44,50,86,0.1)]">
                  <p className="text-lg font-bold text-slate-900">
                    <SimpleCounter end={5000} duration={3000} />
                  </p>
                  <p className="text-[0.6rem] font-medium text-slate-600 uppercase tracking-wide mt-0.5">Members</p>
                </div>
              </div>
            </div>
            {/* Desktop: Two Lines */}
            <div className="hidden lg:flex flex-col">
              <div className="whitespace-nowrap">
                <TextGenerateEffect
                  words="Directorate of"
                  className="text-5xl lg:text-6xl xl:text-7xl tracking-tight text-slate-900"
                  duration={2.0}
                  onComplete={() => setFirstLineComplete(true)}
                />
              </div>
              <div className="whitespace-nowrap mt-1 md:mt-2">
                <TextGenerateEffect
                  words="Student Welfare"
                  className="text-5xl lg:text-6xl xl:text-7xl tracking-tight text-slate-900"
                  duration={2.0}
                  onComplete={() => setSecondLineComplete(true)}
                />
              </div>
            </div>
            <p 
              className={`hidden lg:block text-base lg:text-lg text-slate-700 max-w-md leading-relaxed transition-opacity duration-1000 ${
                heroAnimationComplete ? "opacity-100" : "opacity-0"
              }`}
            >
              Empowering students through comprehensive support and guidance
            </p>
          </div>
        </div>

        {/* Desktop: Scroll Arrow */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block animate-bounce transition-opacity duration-1000 ${
            heroAnimationComplete ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Platinum Clubs Strip */}
      <section 
        className="w-screen py-4 relative"
        style={{
          backgroundColor: "#d3622d",
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          maxWidth: '100vw',
          marginTop: 0,
          marginBottom: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="w-full px-6 lg:px-12 overflow-x-hidden">
          <div className="mb-3 text-center">
            <span className="text-xs uppercase tracking-[0.34em] text-white/90">Platinum Clubs</span>
          </div>
          <div className="flex items-center justify-between w-full gap-1 md:gap-0 flex-wrap md:flex-nowrap">
            {/* Circular translucent cards for clubs - 5 on mobile, 8 on desktop */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((club) => (
              <div
                key={club}
                className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg flex-shrink-0 ${
                  club > 5 ? 'hidden md:flex' : ''
                }`}
              >
                <span className="text-[0.6rem] md:text-[0.65rem] font-semibold text-white text-center px-1">Club {club}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section - Moved outside container to fix z-index stacking context */}
      <section 
        ref={overviewRef}
        id="overview" 
        className={`w-screen relative transition-opacity duration-1000 ${
          heroAnimationComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          maxWidth: '100vw',
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          position: 'relative',
          zIndex: 1,
          backgroundColor: "#e9e5de",
        }}
      >
          <motion.div
            initial={{ opacity: 0 }}
            animate={overviewInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
          <Card className="w-full border-white/60 bg-white/70 pt-6 md:pt-10 px-2 md:px-10 pb-0 shadow-[0_18px_40px_rgba(46,54,92,0.12)] backdrop-blur-2xl relative" style={{ marginTop: 0, marginBottom: 0 }}>
            <CardHeader className="space-y-3 md:space-y-4 pb-4 md:pb-6 text-center">
              <span className="text-xs uppercase tracking-[0.34em] text-slate-500">Overview</span>
              <CardTitle className="text-2xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                Nurturing growth, talent, and community at <span style={{ color: '#d3622d' }}>MUJ</span>.
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6 md:pb-10">
              <div className="grid gap-4 lg:grid-cols-2 lg:items-center px-2 md:px-6 lg:px-12">
                <div className="space-y-4 md:space-y-5">
                  <p className="text-sm md:text-xl leading-relaxed md:leading-relaxed text-slate-700 text-justify font-medium md:font-semibold">
                    Directorate of Students' Welfare (DSW) focuses on addressing both the administrative needs and personal development of students through a variety of domains, including Student Clubs & Chapters, Social Connect, Annual Fests, Scholarships, Student Counselling, and student code of conduct. The department is committed to creating a holistic environment that supports academic excellence, personal growth, and social responsibility among the student body.
                  </p>
                  <p className="text-sm md:text-xl leading-relaxed md:leading-relaxed text-slate-700 text-justify font-medium md:font-semibold">
                    DSW holistically works with Nucleus Members from various departments, who assist in daily operations and help coordinate various student engagement activities and events. This collaborative approach ensures that the DSW effectively caters to the diverse needs of the student community, fostering a vibrant and supportive campus life. Through strategic partnerships and innovative programs, DSW continues to enhance the overall student experience and contribute to the development of well-rounded individuals prepared for future challenges.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-end">
            <Image
                    src="/fame-muj.jpg"
                    alt="MUJ Frame"
                    width={500}
                    height={500}
                    className="rounded-lg object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
      </section>

      {/* Vision/Mission/Values Carousel Section - Moved outside container to fix z-index stacking context */}
      <section 
        className={`w-screen pt-4 pb-0 relative transition-opacity duration-1000 ${
          heroAnimationComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "#d3622d",
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          maxWidth: '100vw',
          marginTop: 0,
          height: '180px',
          overflow: 'hidden',
          marginBottom: 0,
          zIndex: 2,
        }}
      >
          <div className="w-full px-2 md:px-6 lg:px-12 h-full">
            <div className="grid grid-cols-1 md:grid-cols-[200px_80px_auto_1fr] gap-2 md:gap-6 h-full items-center">
              {/* Mobile: Centered Heading | Desktop: Left Heading */}
              <div className="flex items-center justify-center md:justify-start w-full md:w-[200px] h-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={carouselIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-2xl lg:text-3xl font-black tracking-tight text-white whitespace-nowrap"
                  >
                    {carouselIndex === 0 ? "Vision" : carouselIndex === 1 ? "Mission" : "Values"}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              {/* Spacer for gap */}
              <div className="hidden md:block"></div>
              
              {/* Separator */}
              <div className="hidden md:flex items-center h-full">
                <div className="h-[85%] w-px bg-white/70"></div>
              </div>
              
              {/* Mobile: Centered Content | Desktop: Left Content */}
              <div className="relative h-full flex items-center justify-center md:justify-start min-h-[120px]">
                <AnimatePresence mode="wait">
                  {/* Vision Card */}
                  {carouselIndex === 0 && (
                    <motion.div
                      key="vision"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="px-2 py-3 w-full h-full flex items-center justify-center md:justify-start absolute inset-0"
                    >
                      <p className="text-xs md:text-sm lg:text-base font-bold italic leading-tight text-white text-center md:text-left px-2">
                        Embellish students with integrity and a humane touch, nurturing their talents to make them socially responsible global citizens.
                      </p>
                    </motion.div>
                  )}
                  
                  {/* Mission Card */}
                  {carouselIndex === 1 && (
                    <motion.div
                      key="mission"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="px-2 py-3 w-full h-full flex items-center justify-center md:justify-start absolute inset-0"
                    >
                      <div className="text-xs md:text-sm lg:text-base font-bold leading-tight text-white text-center md:text-left relative w-full h-full flex items-center justify-center md:justify-start px-2">
                      <AnimatePresence mode="wait">
                        {missionStatements.map((statement, idx) => 
                          missionIndex === idx && (
                            <motion.p
                              key={statement}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="text-xs md:text-sm lg:text-base font-bold italic leading-tight text-white text-center md:text-left"
                            >
                              {statement}
                            </motion.p>
                          )
                        )}
                      </AnimatePresence>
                    </div>
                    </motion.div>
                  )}
                  
                  {/* Values Card */}
                  {carouselIndex === 2 && (
                    <motion.div
                      key="values"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="px-2 py-3 w-full h-full flex items-center justify-center md:justify-start absolute inset-0"
                    >
                      <div className="text-xs md:text-sm lg:text-base font-bold italic leading-tight text-white text-center md:text-left px-2">
                        Our guiding principles shaping student welfare are <FlipWords words={values} duration={2000} className="text-white font-bold" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
      </section>

      {/* Teams Section - Moved outside container to fix z-index stacking context */}
      <section 
        ref={teamRef}
        id="team" 
        className={`mt-8 lg:mt-12 transition-opacity duration-1000 ${
          heroAnimationComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          position: 'relative',
          zIndex: 3,
          backgroundColor: "#e9e5de",
        }}
      >
        <div className="relative z-10 flex w-full flex-col px-2 md:px-6 pb-0 pt-0 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-3xl border-0 md:border border-transparent md:border-white/60 bg-transparent md:bg-white/70 p-4 md:p-10 shadow-none md:shadow-[0_16px_38px_rgba(52,60,98,0.12)] backdrop-blur-0 md:backdrop-blur-2xl"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 text-center mb-3">
              Team - Directorate of Students' Welfare
            </h2>
            <p className="mt-2 mx-auto text-sm md:text-base text-slate-600 text-center italic px-4 max-w-4xl">
              Dedicated professionals supporting student welfare, development, and wellbeing across campus initiatives.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 mt-6 md:mt-10">
              {teamMembers.map((member, idx) => (
                <div
                  key={member.name}
                  className="relative group block p-1 md:p-2"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ isolation: 'isolate' }}
                >
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.span
                        className="absolute inset-0 h-full w-full block rounded-2xl md:rounded-3xl pointer-events-none"
                        style={{ 
                          backgroundColor: '#d3622d',
                          willChange: 'transform, opacity'
                        }}
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 0.2,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        transition={{
                          layout: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                            type: "tween"
                          },
                          opacity: {
                            duration: 0.2,
                            ease: "easeOut"
                          }
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <Card
                    className="flex flex-row items-center justify-between gap-2 md:gap-6 border-0 bg-white/30 backdrop-blur-xl p-2.5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.15)] relative z-10 h-full min-h-[80px] md:min-h-[140px]"
                  >
                    <div className="space-y-0.5 md:space-y-2 relative z-20 flex-1 min-w-0 flex flex-col justify-center">
                      <CardTitle className={`text-xs md:text-xl font-semibold text-slate-900 transition-all duration-300 leading-tight line-clamp-2 ${
                        hoveredIndex === idx ? 'text-sm md:text-2xl' : ''
                      }`}>
                        {member.name}
                      </CardTitle>
                      <CardDescription className={`text-[0.65rem] md:text-base text-slate-600 transition-all duration-300 leading-tight line-clamp-2 ${
                        hoveredIndex === idx ? 'font-bold' : 'font-medium'
                      }`}>
                        {member.title}
                      </CardDescription>
                      <p className="text-[0.6rem] md:text-sm text-slate-500 leading-tight line-clamp-1">{member.focus}</p>
                    </div>
                    <div className="relative z-20 flex-shrink-0 ml-1.5 md:ml-4">
                      <Image
                        src={`/${idx + 1}.jpg`}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="rounded-full object-cover w-12 h-12 md:w-28 md:h-28 border-2 border-white/50 shadow-lg"
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section - Moved outside container to fix z-index stacking context */}
      <div 
        ref={footerRef}
        className={`w-full transition-opacity duration-1000 ${
          heroAnimationComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          position: 'relative',
          zIndex: 4,
          backgroundColor: "#e9e5de",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full"
        >
          <SiteFooter />
        </motion.div>
      </div>
    </>
  );
}
