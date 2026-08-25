import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Target,
  Briefcase,
  Users,
  Award,
  PenTool,
  Quote,
  CheckCircle2,
  TrendingUp,
  Settings,
  Users2,
  Radio,
  Monitor,
  Gamepad2,
  ShoppingCart,
  ShieldCheck,
  Smartphone,
  Wallet,
  Volume2,
  Heart,
  Calendar,
  Layers,
} from "lucide-react";
import { useLanguageContent } from "../../hooks/useCoverLetter";
import {
  principlesData,
  timelineData,
  coreValuesData,
  imagesData,
  metricsData,
} from "../../data/coverLetterData";
import { cn } from "../../lib/utils";

interface CoverLetterSliderProps {
  onSwitchToDocView?: () => void;
}

export function CoverLetterSlider({ onSwitchToDocView: _ }: CoverLetterSliderProps) {
  const { t, language } = useLanguageContent();
  const isVi = language === "vi";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [activePhase, setActivePhase] = useState<"all" | "phase1" | "phase2">("all");

  const slideDuration = 7000; // 7 seconds per slide in autoplay
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = 6;

  const slidesMeta = [
    {
      id: 0,
      title: isVi ? "Lời Mở Đầu & Giới Thiệu" : "Salutation & Introduction",
      shortTitle: isVi ? "1. Giới Thiệu" : "1. Intro",
      icon: PenTool,
      color: "from-blue-600 to-sky-500",
      accentBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    {
      id: 1,
      title: isVi ? "Triết Lý & Sứ Mệnh Vận Hành" : "Philosophy & Operations Mission",
      shortTitle: isVi ? "2. Triết Lý" : "2. Philosophy",
      icon: Quote,
      color: "from-sky-600 to-teal-500",
      accentBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
    },
    {
      id: 2,
      title: isVi ? "3 Trụ Cột Nguyên Tắc Cốt Lõi" : "3 Core Operational Pillars",
      shortTitle: isVi ? "3. Trụ Cột" : "3. Pillars",
      icon: Target,
      color: "from-indigo-600 to-purple-500",
      accentBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    },
    {
      id: 3,
      title: isVi ? "Hành Trình Sự Nghiệp 20+ Năm" : "20+ Years Career Journey",
      shortTitle: isVi ? "4. Hành Trình" : "4. Journey",
      icon: Briefcase,
      color: "from-amber-600 to-orange-500",
      accentBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    {
      id: 4,
      title: isVi ? "3 Giá Trị Đào Tạo & Lãnh Đạo" : "3 Core Leadership Values",
      shortTitle: isVi ? "5. Giá Trị" : "5. Values",
      icon: Users,
      color: "from-rose-600 to-pink-500",
      accentBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    },
    {
      id: 5,
      title: isVi ? "Lời Kết & Cam Kết Đồng Hành" : "Closing Commitment & Signature",
      shortTitle: isVi ? "6. Lời Kết" : "6. Closing",
      icon: Award,
      color: "from-emerald-600 to-teal-500",
      accentBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
  ];

  const goToSlide = useCallback((newIndex: number) => {
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
    setProgress(0);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Autoplay management
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      setProgress(0);
      return;
    }

    const intervalStep = 50; // update progress every 50ms
    const stepIncrement = (intervalStep / slideDuration) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, slideDuration, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <div
      className="relative flex w-full flex-col space-y-6"
      id="cover-letter-slider-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* TOP SLIDER CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3 shadow-xs dark:border-white/10 dark:bg-slate-900/60">
        {/* Slide Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 custom-scrollbar">
          {slidesMeta.map((slide, idx) => {
            const isActive = currentSlide === idx;
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={cn(
                  "group flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-[#0b2853] text-white shadow-sm dark:bg-amber-400 dark:text-slate-950"
                    : "border border-transparent bg-slate-100/70 text-slate-600 hover:border-slate-300 hover:bg-slate-200/60 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10",
                )}
              >
                <Icon
                  size={13}
                  className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive
                      ? "text-amber-400 dark:text-slate-950"
                      : "text-slate-500 dark:text-slate-400",
                  )}
                />
                <span>{slide.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Play / Next / Prev & Counter Controls */}
        <div className="flex items-center gap-2">
          {/* Autoplay toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-all shadow-xs",
              isPlaying
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300",
            )}
            title={isPlaying ? (isVi ? "Tạm dừng tự động phát" : "Pause autoplay") : (isVi ? "Tự động phát slide" : "Start autoplay")}
          >
            {isPlaying ? (
              <>
                <Pause size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span>{isVi ? "Tự Động" : "Auto"}</span>
              </>
            ) : (
              <>
                <Play size={13} />
                <span>{isVi ? "Phát Slide" : "Play"}</span>
              </>
            )}
          </button>

          {/* Reset to Slide 1 */}
          <button
            type="button"
            onClick={() => goToSlide(0)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-xs dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            title={isVi ? "Về slide đầu tiên" : "Go to first slide"}
          >
            <RotateCcw size={13} />
          </button>

          {/* Prev Button */}
          <button
            type="button"
            onClick={prevSlide}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 shadow-xs dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            title={isVi ? "Slide trước" : "Previous slide"}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Slide Indicator Badge */}
          <span className="flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-black text-[#0b2853] dark:border-white/10 dark:bg-white/5 dark:text-amber-300">
            {currentSlide + 1} / {totalSlides}
          </span>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 shadow-xs dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            title={isVi ? "Slide tiếp theo" : "Next slide"}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 transition-all duration-100 ease-linear"
          style={{
            width: isPlaying ? `${progress}%` : `${((currentSlide + 1) / totalSlides) * 100}%`,
          }}
        />
      </div>

      {/* SLIDE CANVAS STAGE */}
      <div className="relative min-h-[460px] w-full overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-lg backdrop-blur-xl sm:p-8 dark:bg-[var(--card)]/40">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 flex min-h-[400px] w-full flex-col justify-between"
          >
            {/* SLIDE 0: SALUTATION & OVERVIEW INTRO */}
            {currentSlide === 0 && (
              <div className="flex h-full flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-black text-blue-700 uppercase dark:text-blue-300">
                      Slide 01 • {isVi ? "Giới Thiệu Tổng Quan" : "Introduction"}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                  </div>
                  <h2 className="mt-3 text-xl font-black tracking-tight text-[#0b2853] sm:text-2xl lg:text-3xl dark:text-white">
                    {t.coverLetter.salutation}
                  </h2>
                </div>

                {/* Main Content Box */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                  <div className="space-y-4 lg:col-span-8">
                    <div className="rounded-2xl border border-black/5 bg-slate-50/70 p-5 shadow-xs dark:border-white/10 dark:bg-white/[0.03]">
                      <p className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-200">
                        {t.coverLetter.introPrefix}
                        <strong className="text-base font-black text-blue-700 sm:text-lg dark:text-amber-400">
                          {t.coverLetter.introBoldName}
                        </strong>
                        {t.coverLetter.introRole}
                        <strong className="text-base font-black text-[#0b2853] sm:text-lg dark:text-white">
                          {t.coverLetter.introExperience}
                        </strong>
                        {t.coverLetter.introSuffix}
                      </p>
                    </div>

                    {/* Key Core Focus Bullets */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="flex items-center gap-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 dark:border-blue-400/20 dark:bg-blue-500/10">
                        <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">22+ Năm Quản Trị</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">CS & Call Center</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 dark:border-amber-400/20 dark:bg-amber-500/10">
                        <Layers size={18} className="text-amber-600 dark:text-amber-400 shrink-0" />
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">Đa Ngành Nghề</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">Telco, FinTech, E-com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 dark:border-emerald-400/20 dark:bg-emerald-500/10">
                        <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">Tự Động Hóa</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">CRM, AI & Dashboard</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Metric Card */}
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-sky-500/30 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-center text-white shadow-md lg:col-span-4">
                    <span className="text-xs font-extrabold tracking-widest text-sky-200 uppercase">
                      {isVi ? "Kinh Nghiệm Thực Chiến" : "Proven Track Record"}
                    </span>
                    <span className="my-2 text-5xl font-black tracking-tight text-white drop-shadow-sm sm:text-6xl">
                      22+
                    </span>
                    <span className="text-sm font-bold text-sky-100">
                      {isVi ? "Năm Xây Dựng & Vận Hành" : "Years of Operational Leadership"}
                    </span>
                    <div className="mt-4 flex w-full justify-around border-t border-white/20 pt-4 text-center">
                      <div>
                        <p className="text-lg font-black text-amber-300">8+</p>
                        <p className="text-[11px] text-sky-200">{isVi ? "Tập Đoàn" : "Enterprises"}</p>
                      </div>
                      <div className="h-8 w-[1px] bg-white/20" />
                      <div>
                        <p className="text-lg font-black text-emerald-300">99%</p>
                        <p className="text-[11px] text-sky-200">{isVi ? "Mục tiêu CSAT" : "Target CSAT"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer hint */}
                <div className="flex items-center justify-between border-t border-slate-200/60 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <span>{isVi ? "Nhấn Phím → hoặc nút Tiếp theo để xem Triết lý hành động" : "Press → or click Next to view Core Philosophy"}</span>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-blue-600 hover:text-blue-700 dark:text-amber-400"
                  >
                    <span>{isVi ? "Xem Triết Lý" : "Next: Philosophy"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* SLIDE 1: PHILOSOPHY & TECH FOCUS */}
            {currentSlide === 1 && (
              <div className="flex h-full flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-black text-sky-700 uppercase dark:text-sky-300">
                      Slide 02 • {isVi ? "Triết Lý & Tuyên Ngôn" : "Philosophy & Manifesto"}
                    </span>
                    <Sparkles size={14} className="text-sky-500" />
                  </div>
                  <h2 className="mt-3 text-xl font-black tracking-tight text-[#0b2853] sm:text-2xl lg:text-3xl dark:text-white">
                    {isVi ? "Triết Lý Hành Động & Sứ Mệnh Phục Vụ" : "Operational Philosophy & Service Mission"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                  {/* Left: Big Quote Card */}
                  <div className="relative overflow-hidden rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/15 via-blue-500/10 to-transparent p-6 shadow-sm sm:p-8 lg:col-span-7 dark:border-sky-400/30">
                    <Quote className="absolute -top-3 -left-3 h-24 w-24 text-sky-500/10 dark:text-sky-400/10" />
                    <div className="relative z-10">
                      <p className="mb-3 text-xs font-extrabold tracking-widest text-sky-700 uppercase dark:text-sky-300">
                        {isVi ? "Tuyên ngôn cốt lõi" : "Core Declaration"}
                      </p>
                      <blockquote className="text-lg leading-relaxed font-black text-slate-900 italic sm:text-xl lg:text-2xl dark:text-white">
                        "{t.coverLetter.philosophy}"
                      </blockquote>
                      <p className="mt-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {isVi
                          ? "Sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ sự tận tâm đúng lúc và đồng cảm chân thành."
                          : "Customer satisfaction comes not from absolute perfection, but from timely dedication and sincere empathy."}
                      </p>
                    </div>
                  </div>

                  {/* Right: Tech & Automation Systems */}
                  <div className="space-y-4 rounded-2xl border border-black/5 bg-slate-50/70 p-6 shadow-xs lg:col-span-5 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                        <Settings size={18} />
                      </div>
                      <h4 className="text-sm font-black text-[#0b2853] dark:text-amber-400">
                        {isVi ? "Định Hướng Công Nghệ & Tự Động Hóa" : "Technology & Automation Focus"}
                      </h4>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                      {t.coverLetter.techFocusPrefix}
                      <strong className="font-extrabold text-[#0b2853] dark:text-sky-300">
                        {t.coverLetter.techFocusSystems}
                      </strong>
                      {t.coverLetter.techFocusAnd}
                      <strong className="font-extrabold text-amber-600 dark:text-amber-400">
                        {t.coverLetter.techFocusAutomation}
                      </strong>
                      {t.coverLetter.techFocusSuffix}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {["CRM Architecture", "AI Chatbot 24/7", "Realtime Dashboard", "Workflow Automation"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-slate-200/80 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-2xs dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  >
                    <ChevronLeft size={14} />
                    <span>{isVi ? "Slide Trước" : "Back"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-sky-600 hover:text-sky-700 dark:text-amber-400"
                  >
                    <span>{isVi ? "Xem 3 Trụ Cột" : "Next: 3 Pillars"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* SLIDE 2: 3 CORE PILLARS */}
            {currentSlide === 2 && (
              <div className="flex h-full flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-black text-indigo-700 uppercase dark:text-indigo-300">
                      Slide 03 • {isVi ? "Trụ Cột Nền Tảng" : "Operational Pillars"}
                    </span>
                    <Target size={14} className="text-indigo-500" />
                  </div>
                  <h2 className="mt-3 text-xl font-black tracking-tight text-[#0b2853] sm:text-2xl lg:text-3xl dark:text-white">
                    {t.common.pillarsTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  {/* Pillar 1: Process */}
                  <div className="group relative flex flex-col justify-between rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-500/10 via-slate-50/50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-md dark:border-white/10 dark:from-blue-500/15 dark:via-white/[0.02] dark:to-transparent">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-600 shadow-xs dark:text-blue-400">
                        <Settings size={24} />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase">Trụ Cột 01</span>
                        <span className="h-1 w-1 rounded-full bg-blue-500" />
                      </div>
                      <h3 className="mt-1 text-lg font-black text-[#0b2853] sm:text-xl dark:text-white">
                        {t.common.pillars.process.title}
                      </h3>
                      <p className="mt-1 text-xs font-bold text-blue-700 sm:text-sm dark:text-amber-300">
                        {t.common.pillars.process.desc}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {isVi
                          ? "Thiết lập SOP chuẩn hóa, lưu đồ xử lý khiếu nại rõ ràng, tối ưu thời gian phản hồi (SLA) và đảm bảo chất lượng QA/QC đồng nhất."
                          : "Standardize operating procedures (SOP), complaint resolution workflows, optimize SLA response times and maintain QA/QC."}
                      </p>
                    </div>
                    <div className="mt-4 border-t border-slate-200/60 pt-3 text-[11px] font-bold text-slate-500 dark:border-white/10 dark:text-slate-400">
                      SOPs • SLAs • QA/QC Audit
                    </div>
                  </div>

                  {/* Pillar 2: People */}
                  <div className="group relative flex flex-col justify-between rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 via-slate-50/50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-md dark:border-white/10 dark:from-amber-500/15 dark:via-white/[0.02] dark:to-transparent">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-600 shadow-xs dark:text-amber-400">
                        <Users2 size={24} />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase">Trụ Cột 02</span>
                        <span className="h-1 w-1 rounded-full bg-amber-500" />
                      </div>
                      <h3 className="mt-1 text-lg font-black text-[#0b2853] sm:text-xl dark:text-white">
                        {t.common.pillars.people.title}
                      </h3>
                      <p className="mt-1 text-xs font-bold text-amber-700 sm:text-sm dark:text-amber-300">
                        {t.common.pillars.people.desc}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {isVi
                          ? "Truyền cảm hứng, đào tạo kỹ năng thấu cảm, khơi gợi tinh thần trách nhiệm và xây dựng môi trường làm việc gắn kết bền vững."
                          : "Inspire teams, foster empathy training, nurture proactive ownership and cultivate a sustainable collaborative culture."}
                      </p>
                    </div>
                    <div className="mt-4 border-t border-slate-200/60 pt-3 text-[11px] font-bold text-slate-500 dark:border-white/10 dark:text-slate-400">
                      Coaching • Empathy • Team Spirit
                    </div>
                  </div>

                  {/* Pillar 3: Technology */}
                  <div className="group relative flex flex-col justify-between rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/10 via-slate-50/50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md dark:border-white/10 dark:from-indigo-500/15 dark:via-white/[0.02] dark:to-transparent">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 shadow-xs dark:text-indigo-400">
                        <TrendingUp size={24} />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase">Trụ Cột 03</span>
                        <span className="h-1 w-1 rounded-full bg-indigo-500" />
                      </div>
                      <h3 className="mt-1 text-lg font-black text-[#0b2853] sm:text-xl dark:text-white">
                        {t.common.pillars.technology.title}
                      </h3>
                      <p className="mt-1 text-xs font-bold text-indigo-700 sm:text-sm dark:text-amber-300">
                        {t.common.pillars.technology.desc}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {isVi
                          ? "Ứng dụng AI, tự động hóa phân luồng Omnichannel, xây dựng Dashboard báo cáo thời gian thực giúp ban lãnh đạo ra quyết định chính xác."
                          : "Leverage AI, automate Omnichannel routing, build realtime analytics dashboards to empower data-backed executive decisions."}
                      </p>
                    </div>
                    <div className="mt-4 border-t border-slate-200/60 pt-3 text-[11px] font-bold text-slate-500 dark:border-white/10 dark:text-slate-400">
                      AI Integration • Omnichannel • Data
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  >
                    <ChevronLeft size={14} />
                    <span>{isVi ? "Slide Trước" : "Back"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700 dark:text-amber-400"
                  >
                    <span>{isVi ? "Xem Hành Trình 20+ Năm" : "Next: Career Journey"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* SLIDE 3: CAREER TIMELINE & MILESTONES */}
            {currentSlide === 3 && (
              <div className="flex h-full flex-col justify-between space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-700 uppercase dark:text-amber-300">
                        Slide 04 • {isVi ? "Hành Trình 20+ Năm" : "Career Timeline"}
                      </span>
                      <Calendar size={14} className="text-amber-500" />
                    </div>
                    <h2 className="mt-2 text-xl font-black tracking-tight text-[#0b2853] sm:text-2xl dark:text-white">
                      {isVi ? "8 Cột Mốc Quản Trị & Vận Hành Tiêu Biểu" : "8 Key Leadership Milestones (2003 - 2023)"}
                    </h2>
                  </div>

                  {/* Phase Filter Tabs */}
                  <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100/80 p-1 text-xs font-bold dark:border-white/10 dark:bg-white/5">
                    <button
                      type="button"
                      onClick={() => setActivePhase("all")}
                      className={cn(
                        "rounded-full px-3 py-1 transition-all",
                        activePhase === "all"
                          ? "bg-[#0b2853] text-white shadow-xs dark:bg-amber-400 dark:text-slate-950"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-300",
                      )}
                    >
                      {isVi ? "Tất Cả (8)" : "All (8)"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhase("phase1")}
                      className={cn(
                        "rounded-full px-3 py-1 transition-all",
                        activePhase === "phase1"
                          ? "bg-[#0b2853] text-white shadow-xs dark:bg-amber-400 dark:text-slate-950"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-300",
                      )}
                    >
                      2003 – 2013
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhase("phase2")}
                      className={cn(
                        "rounded-full px-3 py-1 transition-all",
                        activePhase === "phase2"
                          ? "bg-[#0b2853] text-white shadow-xs dark:bg-amber-400 dark:text-slate-950"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-300",
                      )}
                    >
                      2015 – 2023
                    </button>
                  </div>
                </div>

                {/* Milestones Grid / Carousel view */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
                  {timelineData
                    .filter((item, idx) => {
                      if (activePhase === "phase1") return idx < 4;
                      if (activePhase === "phase2") return idx >= 4;
                      return true;
                    })
                    .map((item, originalIdx) => {
                      // get actual index in timelineData
                      const realIndex = timelineData.findIndex((m) => m.year === item.year);
                      const isSelected = activeMilestoneIndex === realIndex;
                      const localizedEvent = t.timeline[realIndex] || { role: "", desc: "" };
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.year}
                          onClick={() => setActiveMilestoneIndex(realIndex)}
                          className={cn(
                            "group relative flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition-all duration-300 hover:-translate-y-1 sm:p-4",
                            isSelected
                              ? "border-amber-500/60 bg-amber-500/10 shadow-md ring-2 ring-amber-500/30 dark:bg-amber-500/15"
                              : "border-slate-200/80 bg-white/60 hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]",
                          )}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r text-white shadow-xs",
                                item.color,
                              )}>
                                <Icon size={14} />
                              </span>
                              <span className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-black text-[#0b2853] dark:border-white/10 dark:bg-white/10 dark:text-amber-300">
                                {item.year}
                              </span>
                            </div>

                            <h4 className="mt-2.5 text-xs font-black text-[#0b2853] sm:text-sm dark:text-white line-clamp-1">
                              {item.company}
                            </h4>
                            <p className="mt-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400 line-clamp-1">
                              {localizedEvent.role}
                            </p>
                          </div>

                          <p className="mt-2 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                            {localizedEvent.desc}
                          </p>
                        </div>
                      );
                    })}
                </div>

                {/* Active Milestone Highlight Card */}
                {timelineData[activeMilestoneIndex] && (
                  <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-4 shadow-xs dark:border-amber-400/20">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-extrabold text-[#0b2853] uppercase dark:text-amber-300">
                          {isVi ? "Cột mốc đang chọn" : "Selected Milestone"}:
                        </span>
                        <strong className="text-sm font-black text-slate-900 dark:text-white">
                          {timelineData[activeMilestoneIndex].company} ({timelineData[activeMilestoneIndex].year})
                        </strong>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                          — {t.timeline[activeMilestoneIndex]?.role}
                        </span>
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {t.timeline[activeMilestoneIndex]?.desc}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  >
                    <ChevronLeft size={14} />
                    <span>{isVi ? "Slide Trước" : "Back"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400"
                  >
                    <span>{isVi ? "Xem Giá Trị Đào Tạo" : "Next: Core Values"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* SLIDE 4: CORE VALUES (3 GIÁ TRỊ) */}
            {currentSlide === 4 && (
              <div className="flex h-full flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-black text-rose-700 uppercase dark:text-rose-300">
                      Slide 05 • {isVi ? "Giá Trị Đào Tạo" : "Core Values"}
                    </span>
                    <Users size={14} className="text-rose-500" />
                  </div>
                  <h2 className="mt-3 text-xl font-black tracking-tight text-[#0b2853] sm:text-2xl lg:text-3xl dark:text-white">
                    {t.common.valuesTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  {coreValuesData.map((val) => {
                    const vKey = val.id as keyof typeof t.common.values;
                    const localizedValue = t.common.values[vKey];
                    const IconComponent = val.icon;

                    return (
                      <div
                        key={val.id}
                        className={cn(
                          "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                          val.bgClass,
                        )}
                      >
                        <IconComponent className="absolute -right-4 -bottom-4 h-32 w-32 text-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-xs">
                              <IconComponent size={22} className="text-white" />
                            </div>
                            <span className="text-2xl font-black text-white/40 tracking-wider">
                              {localizedValue.num}
                            </span>
                          </div>

                          <h3 className="mt-5 text-xl font-black tracking-wide text-white uppercase sm:text-2xl">
                            {localizedValue.title}
                          </h3>
                          <p className="mt-1 text-sm font-bold text-white/90">
                            {localizedValue.desc}
                          </p>
                        </div>

                        <div className="relative z-10 mt-6 border-t border-white/20 pt-3 text-xs text-white/80">
                          {val.id === "listen" && (isVi ? "Đo lường định lượng qua CSAT, SLA, giảm thiểu sai sót." : "Quantifiable optimization via CSAT, SLA metrics.")}
                          {val.id === "empathy" && (isVi ? "Đặt mình vào góc nhìn khách hàng để giải quyết tận gốc." : "Deeply understand pain points from customer's perspective.")}
                          {val.id === "serve" && (isVi ? "Đồng hành lâu dài, tạo giá trị tin cậy vững chắc." : "Long-term partnership driving trusted sustainable growth.")}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  >
                    <ChevronLeft size={14} />
                    <span>{isVi ? "Slide Trước" : "Back"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-rose-600 hover:text-rose-700 dark:text-amber-400"
                  >
                    <span>{isVi ? "Xem Lời Kết & Chữ Ký" : "Next: Closing & Signature"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* SLIDE 5: CLOSING & DIGITAL SIGNATURE */}
            {currentSlide === 5 && (
              <div className="flex h-full flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-700 uppercase dark:text-emerald-300">
                      Slide 06 • {isVi ? "Lời Kết & Cam Kết" : "Closing Commitment"}
                    </span>
                    <Award size={14} className="text-emerald-500" />
                  </div>
                  <h2 className="mt-3 text-xl font-black tracking-tight text-[#0b2853] sm:text-2xl lg:text-3xl dark:text-white">
                    {isVi ? "Cam Kết Đồng Hành & Tạo Giá Trị Bền Vững" : "Committed to Sustainable Growth"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                  {/* Left: Closing Manifesto */}
                  <div className="space-y-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-50/60 to-transparent p-6 shadow-xs sm:p-8 lg:col-span-8 dark:border-emerald-400/20 dark:from-emerald-500/15 dark:via-white/[0.02]">
                    <p className="text-sm leading-relaxed font-semibold text-slate-800 sm:text-base dark:text-slate-200">
                      {t.coverLetter.closingText}
                      <strong className="font-extrabold text-[#0b2853] dark:text-sky-300">
                        {t.coverLetter.closingPartner}
                      </strong>
                      {t.coverLetter.closingMiddle}
                      <strong className="font-extrabold text-[#0b2853] dark:text-sky-300">
                        {t.coverLetter.closingFocus}
                      </strong>
                      {t.coverLetter.closingAnd}
                      <strong className="font-extrabold text-amber-600 dark:text-amber-400">
                        {t.coverLetter.closingValue}
                      </strong>
                      {t.coverLetter.closingSuffix}
                    </p>

                    <p className="text-sm font-extrabold text-[#0b2853] sm:text-base dark:text-amber-300">
                      {t.coverLetter.thanksText}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 size={13} />
                        <span>{isVi ? "Sẵn sàng nhận nhiệm vụ" : "Ready for Mission"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                        <ShieldCheck size={13} />
                        <span>{isVi ? "Tận tâm & Bảo mật" : "Dedicated & Confidential"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Signature Card */}
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-black/5 bg-slate-50/70 p-6 text-center shadow-xs lg:col-span-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {t.coverLetter.sincerely}
                    </p>
                    <div className="my-2">
                      <img
                        src={imagesData.signatureUrl}
                        alt={t.coverLetter.signatureAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-[90px] w-auto max-w-[160px] object-contain dark:brightness-125"
                      />
                    </div>
                    <p className="text-base font-black tracking-wide text-[#0b2853] sm:text-lg dark:text-amber-300">
                      {t.coverLetter.authorName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {isVi ? "Trưởng Phòng Dịch Vụ Khách Hàng" : "Head of Customer Service & Operations"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex cursor-pointer items-center gap-1 font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  >
                    <ChevronLeft size={14} />
                    <span>{isVi ? "Slide Trước" : "Back"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(0)}
                    className="flex cursor-pointer items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 dark:text-amber-400"
                  >
                    <RotateCcw size={14} />
                    <span>{isVi ? "Xem lại từ đầu" : "Replay Slideshow"}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM SLIDE DOTS / PILLS */}
      <div className="flex items-center justify-center gap-2 py-1">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goToSlide(idx)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
              currentSlide === idx
                ? "w-8 bg-[#0b2853] dark:bg-amber-400"
                : "w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600",
            )}
            title={`${isVi ? "Chuyển tới slide" : "Go to slide"} ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
