import React from "react";
import { motion } from "motion/react";
import {
  FileSignature,
  Sparkles,
  Layers,
  BarChart3,
  Bot,
  Globe,
  User,
  Heart,
  Star,
  Users2,
  Mail,
  Phone,
  MapPin,
  Award,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguageContent, useTimeline } from "../hooks/useCoverLetter";
import { imagesData } from "../data/coverLetterData";
import { CareerTimeline } from "../components/coverLetter/CareerTimeline";
import {
  PrinciplesSection,
  CoreValuesSection,
} from "../components/coverLetter/CoreValuesSection";

export function CoverLetter() {
  const { language } = useLanguageContent();
  const { activeTimelineYear, toggleTimelineYear } = useTimeline();
  const isVi = language === "vi";

  return (
    <PageLayout
      id="cover-letter-main-card"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
      pageId="coverLetter"
      pageName="CoverLetter Main Card"
      titleClassName="text-indigo-600 dark:text-indigo-400 font-black"
      title={isVi ? "Thư ngỏ" : "Cover Letter"}
      subtitle={
        isVi
          ? "“Sứ mệnh của tôi là phụng sự và tạo giá trị thực.”"
          : "“My mission is to serve and create real value.”"
      }
      icon={FileSignature}
    >
      <div className="w-full max-w-5xl mx-auto space-y-6 pb-8">
        
        {/* 1. TOP GREETING CARD (Glass Box with img-box & Socials) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[20px] border border-white/40 dark:border-white/10 bg-white/30 dark:bg-slate-900/60 backdrop-blur-[10px] p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Subtle ambient gradient overlay */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-300/30 via-purple-300/20 to-transparent blur-2xl dark:from-indigo-900/30" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-gradient-to-tr from-sky-300/30 via-blue-300/20 to-transparent blur-2xl dark:from-sky-900/30" />

          {/* Left / Center Content */}
          <div className="space-y-3 z-10 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 shadow-2xs">
              <Award size={13} className="text-amber-500" />
              <span>Customer Service Director &amp; CX Strategist</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              {isVi ? "KÍNH CHÀO QUÝ CÔNG TY!" : "DEAR VALUED PARTNERS!"}
            </h2>

            <p className="text-sm sm:text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-200">
              {isVi ? (
                <>
                  Tôi là <strong className="font-black text-slate-950 dark:text-white underline decoration-indigo-400 decoration-2 underline-offset-2">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng với hơn{" "}
                  <strong className="font-black text-slate-950 dark:text-white">22 năm kinh nghiệm thực chiến</strong> trong lĩnh vực xây dựng, chuẩn hóa quy trình, vận hành và phát triển dịch vụ khách hàng đa kênh toàn diện.
                </>
              ) : (
                <>
                  I am <strong className="font-black text-slate-950 dark:text-white underline decoration-indigo-400 decoration-2 underline-offset-2">Nguyen Hung Thai</strong>, Customer Service Manager with over{" "}
                  <strong className="font-black text-slate-950 dark:text-white">22 years of leadership experience</strong> in architecting, standardizing, and scaling world-class customer service operations.
                </>
              )}
            </p>

            {/* Socials / Quick Contact Badges */}
            <div className="socials pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <a
                href="mailto:hungthai84@gmail.com"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/60 dark:bg-slate-800/60 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 border border-white/50 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all duration-200 shadow-xs"
                title="Email"
              >
                <Mail size={13} className="text-indigo-500 dark:text-indigo-400" />
                <span>hungthai84@gmail.com</span>
              </a>

              <a
                href="tel:0908247247"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/60 dark:bg-slate-800/60 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 border border-white/50 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all duration-200 shadow-xs"
                title="Điện thoại"
              >
                <Phone size={13} className="text-emerald-500 dark:text-emerald-400" />
                <span>0908 247 247</span>
              </a>

              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-xs">
                <MapPin size={13} className="text-rose-500 dark:text-rose-400" />
                <span>TP. Hồ Chí Minh</span>
              </span>
            </div>
          </div>

          {/* Right: Circular Avatar (img-box style: 150px, border-radius 50%, shadow) */}
          <div className="shrink-0 z-10">
            <div className="img-box w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.35)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.6)] border-4 border-white/80 dark:border-white/20 bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-100 dark:from-indigo-950 dark:via-slate-800 dark:to-purple-950 flex items-center justify-center relative group">
              <User size={68} className="text-indigo-600/80 dark:text-indigo-300 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm" />
            </div>
          </div>
        </motion.div>

        {/* 2. CAREER JOURNEY & LEADERSHIP MILESTONES */}
        <div className="space-y-3 pt-2">
          <div className="text-center space-y-1">
            <h3 className="text-base sm:text-lg font-black tracking-wide text-slate-900 dark:text-white uppercase">
              {isVi
                ? "HÀNH TRÌNH SỰ NGHIỆP & CỘT MỐC QUẢN TRỊ"
                : "CAREER JOURNEY & LEADERSHIP MILESTONES"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isVi
                ? "20+ năm kinh nghiệm quản lý dịch vụ và vận hành hệ thống chăm sóc khách hàng đa ngành (2003 - 2023)"
                : "20+ years of CS leadership & operational excellence across leading industries (2003 - 2023)"}
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-500/30 shadow-2xs">
                ⭐ {isVi ? "8 Cột Mốc Tiêu Biểu" : "8 Key Milestones"}
              </span>
            </div>
          </div>

          {/* Render 2-Column Balanced Career Timeline with Central 3D Emblem */}
          <CareerTimeline
            activeYear={activeTimelineYear}
            onToggleYear={toggleTimelineYear}
          />
        </div>

        {/* 3. ROW 1 UNDER TIMELINE: 3 PILLARS + 3 TRAINING VALUES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Left Column: 3 Trụ Cột Nguyên Tắc Cốt Lõi */}
          <PrinciplesSection />

          {/* Right Column: Bên cạnh công nghệ, luôn chú trọng đào tạo đội ngũ */}
          <CoreValuesSection />
        </div>

        {/* 4. ROW 2: TECH SOLUTIONS & CLOSING WITH SIGNATURE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Left Column: Giải Pháp Công Nghệ & Tự Động Hóa */}
          <div className="rounded-[20px] border border-white/40 dark:border-white/10 bg-white/30 dark:bg-slate-900/60 backdrop-blur-[10px] p-5 sm:p-6 shadow-[0_2px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.45)] flex flex-col justify-between h-full space-y-4">
            <div className="space-y-3.5">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/30">
                    <Globe size={15} />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wide">
                    {isVi ? "Giải Pháp Công Nghệ & Tự Động Hóa" : "Technology & Automation"}
                  </h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                  AI &amp; CRM 24/7
                </span>
              </div>

              {/* Embedded Circular 3D Emblem & Description */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 pt-1">
                {/* 3D Circular Orb */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-full bg-gradient-to-br from-indigo-100/95 via-white to-sky-100/95 dark:from-slate-800/95 dark:via-indigo-950/90 dark:to-slate-900/95 border-3 border-indigo-300/90 dark:border-indigo-500/40 shadow-[0_8px_24px_rgba(99,102,241,0.22)] flex flex-col items-center justify-center p-3 text-center backdrop-blur-md relative"
                >
                  <div className="flex items-center gap-1 mb-1 relative z-10">
                    <Star size={10} className="text-amber-400 fill-amber-400 animate-pulse" />
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 dark:bg-indigo-400/20 text-indigo-600 dark:text-indigo-300 shadow-inner">
                      <Users2 size={13} />
                    </div>
                    <Star size={10} className="text-amber-400 fill-amber-400 animate-pulse" />
                  </div>
                  
                  <h5 className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-200 leading-tight relative z-10">
                    {isVi ? "XÂY DỰNG" : "BUILDING"}
                  </h5>
                  <h5 className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-sky-300 leading-tight relative z-10">
                    {isVi ? "DỊCH VỤ KHÁCH HÀNG" : "EXCELLENT"}
                  </h5>
                  <h5 className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-200 leading-tight relative z-10">
                    {isVi ? "XUẤT SẮC" : "CUSTOMER SERVICE"}
                  </h5>
                </motion.div>

                {/* Text Description */}
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <p className="text-xs sm:text-[12.5px] leading-relaxed text-slate-700 dark:text-slate-200">
                    {isVi ? (
                      <>
                        Từ những nguyên tắc đó, tôi tập trung xây dựng các hệ thống{" "}
                        <strong className="font-bold text-slate-900 dark:text-white">
                          CRM, Dashboard quản trị, AI Chatbot
                        </strong>{" "}
                        cùng các giải pháp{" "}
                        <strong className="font-bold text-slate-900 dark:text-white">
                          tự động hóa
                        </strong>{" "}
                        nhằm nâng cao hiệu quả vận hành và kiến tạo chuẩn mực dịch vụ xuất sắc.
                      </>
                    ) : (
                      <>
                        Grounded in these core principles, I architect advanced{" "}
                        <strong className="font-bold text-slate-900 dark:text-white">
                          CRM architectures, real-time BI dashboards, and AI Chatbots
                        </strong>{" "}
                        alongside intelligent automation to maximize operational efficiency and deliver service excellence.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* 3 Tech Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 text-center">
                  <Layers size={16} className="text-sky-600 dark:text-sky-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    CRM Omni
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 text-center">
                  <BarChart3 size={16} className="text-indigo-600 dark:text-indigo-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    Dashboard
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 text-center">
                  <Bot size={16} className="text-purple-600 dark:text-purple-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    AI Chatbot
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-2 text-[11px] font-bold text-amber-700 dark:text-amber-300">
              <Sparkles size={13} className="text-amber-500 shrink-0" />
              <span>
                {isVi
                  ? "Tối ưu hóa nguồn lực & Nâng cao CSAT toàn diện"
                  : "Resource optimization & holistic CSAT enhancement"}
              </span>
            </div>
          </div>

          {/* Right Column: Closing Letter & Signature */}
          <div className="rounded-[20px] border border-white/40 dark:border-white/10 bg-white/30 dark:bg-slate-900/60 backdrop-blur-[10px] p-5 sm:p-6 shadow-[0_2px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.45)] flex flex-col justify-between h-full space-y-4">
            <div className="space-y-3">
              <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-200">
                {isVi ? (
                  <>
                    Tôi mong muốn được đồng hành cùng Quý Công ty để xây dựng một hệ thống chăm sóc khách hàng hiện đại, lấy khách hàng làm trung tâm, tối ưu hiệu quả vận hành và tạo ra{" "}
                    <strong className="font-bold text-indigo-700 dark:text-indigo-300">
                      giá trị phát triển bền vững
                    </strong>
                    .
                  </>
                ) : (
                  <>
                    I look forward to partnering with your esteemed organization to build a modern, customer-centric support ecosystem, optimize operational efficiency, and drive{" "}
                    <strong className="font-bold text-indigo-700 dark:text-indigo-300">
                      sustainable long-term growth
                    </strong>
                    .
                  </>
                )}
              </p>

              <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                {isVi
                  ? "Xin trân trọng cảm ơn Quý Công ty đã dành thời gian lắng nghe!"
                  : "Thank you sincerely for your valuable time and consideration!"}
              </p>
            </div>

            {/* Signature Area */}
            <div className="flex flex-col items-end pt-2 text-right">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {isVi ? "Trân trọng," : "Sincerely,"}
              </p>
              <div className="py-1">
                <img
                  src={imagesData.signatureUrl}
                  alt={isVi ? "Chữ ký Nguyễn Hùng Thái" : "Signature Nguyen Hung Thai"}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto object-contain dark:brightness-125 transition-transform hover:scale-105"
                />
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                {isVi ? "Nguyễn Hùng Thái" : "Nguyen Hung Thai"}
              </p>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM SECTION: TRIẾT LÝ HÀNH ĐỘNG WITH 3D ACCENTS */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[20px] border border-white/40 dark:border-white/10 bg-white/30 dark:bg-slate-900/60 backdrop-blur-[10px] p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-indigo-300/30 blur-2xl" />
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-purple-300/30 blur-2xl" />

          {/* Left 3D Headset Illustration Decorative Element */}
          <div className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 pointer-events-none items-center justify-center opacity-85 dark:opacity-70">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 opacity-20 blur-md" />
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="headsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                {/* Headset Arc */}
                <path
                  d="M 22 55 A 28 28 0 0 1 78 55"
                  fill="none"
                  stroke="url(#headsetGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Ear Cups */}
                <rect x="14" y="50" width="16" height="24" rx="8" fill="#4f46e5" />
                <rect x="70" y="50" width="16" height="24" rx="8" fill="#4f46e5" />
                {/* Speech Bubble */}
                <rect x="36" y="38" width="28" height="20" rx="6" fill="url(#bubbleGrad)" />
                <circle cx="44" cy="48" r="2" fill="white" />
                <circle cx="50" cy="48" r="2" fill="white" />
                <circle cx="56" cy="48" r="2" fill="white" />
              </svg>
            </div>
          </div>

          {/* Right 3D Bar Chart Decorative Element */}
          <div className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 pointer-events-none items-center justify-center opacity-85 dark:opacity-70">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-600 opacity-20 blur-md" />
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="bar1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="bar2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="bar3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect x="22" y="45" width="14" height="40" rx="5" fill="url(#bar1)" />
                <rect x="42" y="25" width="14" height="60" rx="5" fill="url(#bar2)" />
                <rect x="62" y="35" width="14" height="50" rx="5" fill="url(#bar3)" />
              </svg>
            </div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-3.5">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/80 dark:bg-slate-800/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs">
              <Sparkles size={13} className="text-amber-400" />
              <span>{isVi ? "TRIẾT LÝ HÀNH ĐỘNG" : "ACTION PHILOSOPHY"}</span>
              <Sparkles size={13} className="text-amber-400" />
            </div>

            {/* Main Highlighted Quote */}
            <div className="py-1">
              <p className="text-sm sm:text-base md:text-lg font-bold italic leading-relaxed text-slate-800 dark:text-slate-100">
                “{" "}
                {isVi ? (
                  <>
                    Chăm sóc khách hàng không chỉ là giải quyết vấn đề,
                    <br className="hidden sm:inline" /> mà còn là xây dựng một hệ thống giúp doanh{" "}
                    <strong className="font-black text-slate-900 dark:text-white underline decoration-indigo-400 decoration-2 underline-offset-2">
                      nghiệp phát triển bền vững
                    </strong>
                    .
                  </>
                ) : (
                  <>
                    Customer service is not merely about solving issues,
                    <br className="hidden sm:inline" /> but architecting a scalable ecosystem that enables enterprises to{" "}
                    <strong className="font-black text-slate-900 dark:text-white underline decoration-indigo-400 decoration-2 underline-offset-2">
                      grow sustainably
                    </strong>
                    .
                  </>
                )}{" "}
                ”
              </p>
            </div>

            {/* Footer Line */}
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 pt-1">
              <Heart size={14} className="text-rose-500 fill-rose-500" />
              <span>
                {isVi
                  ? "Lấy khách hàng làm trọng tâm – Vận hành chuẩn mực – Giá trị bền vững"
                  : "Customer-Centric – Operational Rigor – Sustainable Value"}
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </PageLayout>
  );
}
export default CoverLetter;
