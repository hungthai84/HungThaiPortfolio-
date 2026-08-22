import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  ShieldCheck,
  Target,
  LayoutGrid,
  SlidersHorizontal,
  Quote,
  Sparkles,
  Cpu,
  Bot,
  BarChart3,
  Layers,
  HeartHandshake,
  GripVertical,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguageContent, useTimeline } from "../hooks/useCoverLetter";
import { principlesData, imagesData } from "../data/coverLetterData";
import { CareerTimeline } from "../components/coverLetter/CareerTimeline";
import { CoreValuesSection } from "../components/coverLetter/CoreValuesSection";
import { CoverLetterSlider } from "../components/coverLetter/CoverLetterSlider";
import { cn } from "../lib/utils";

function CoverLetterIntro() {
  const { t } = useLanguageContent();

  return (
    <div className="space-y-2.5" id="cover-letter-intro">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm leading-snug font-extrabold text-[#0b2853] sm:text-base dark:text-amber-400">
            {t.coverLetter.salutation}
          </p>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-slate-700 sm:text-[13px] dark:text-slate-300">
        {t.coverLetter.introPrefix}
        <strong className="font-extrabold text-slate-900 dark:text-white">
          {t.coverLetter.introBoldName}
        </strong>
        {t.coverLetter.introRole}
        <strong className="font-extrabold text-slate-900 dark:text-white">
          {t.coverLetter.introExperience}
        </strong>
        {t.coverLetter.introSuffix}
      </p>
    </div>
  );
}

function PrincipleSection() {
  const { t } = useLanguageContent();

  return (
    <div className="rounded-2xl border border-black/5 bg-slate-50/50 p-4 sm:p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.02] flex flex-col justify-between space-y-3 h-full" id="principles-section">
      <p className="flex items-center gap-1.5 text-left text-xs leading-relaxed font-bold text-slate-800 sm:text-[13px] dark:text-slate-200">
        <Target size={14} className="text-[#0b2853] dark:text-amber-400" />
        <span>{t.common.pillarsTitle}</span>
      </p>

      <div
        className="grid grid-cols-1 items-stretch justify-center justify-items-stretch gap-3 text-center sm:grid-cols-3"
        style={{ alignItems: "stretch", justifyContent: "center" }}
      >
        {principlesData.map((pillar) => {
          const Icon = pillar.icon;
          const pKey = pillar.id as keyof typeof t.common.pillars;
          const localPillar = t.common.pillars[pKey];

          return (
            <div
              key={pillar.id}
              className={cn(
                "group relative flex min-h-[175px] h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-br p-3.5 text-center shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                pillar.bgClass,
              )}
            >
              <Icon className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
              <div className="relative z-10 flex w-full flex-col items-center justify-center gap-1.5 text-white">
                <div
                  className={cn(
                    "mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-inner",
                    pillar.iconBgClass,
                  )}
                >
                  <Icon size={18} />
                </div>
                <h4 className="m-0 flex items-center gap-2 text-xs sm:text-sm font-black tracking-wider text-white uppercase drop-shadow-xs">
                  {localPillar.title}
                </h4>
                <p className="mt-0.5 max-w-[95%] text-center text-[11px] leading-snug font-bold text-white/90">
                  {localPillar.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClosingSection() {
  const { t } = useLanguageContent();

  return (
    <div
      className="flex flex-col justify-between h-full space-y-4"
      id="closing-section"
    >
      <div className="space-y-3">
        <p className="text-left text-xs leading-relaxed font-semibold text-slate-800 sm:text-[13px] dark:text-slate-200">
          {t.coverLetter.closingText}
          <strong className="font-extrabold text-[#0b2853] dark:text-sky-300">
            {t.coverLetter.closingPartner}
          </strong>
          {t.coverLetter.closingMiddle}
          <strong className="font-extrabold text-[#0b2853] dark:text-sky-300">
            {t.coverLetter.closingFocus}
          </strong>
          {t.coverLetter.closingAnd}
          <strong className="font-extrabold text-[#c59b27] dark:text-amber-400">
            {t.coverLetter.closingValue}
          </strong>
          {t.coverLetter.closingSuffix}
        </p>

        <p className="text-left text-xs font-black text-[#0b2853] sm:text-sm dark:text-amber-300">
          {t.coverLetter.thanksText}
        </p>
      </div>

      <div className="flex flex-col items-end space-y-1 border-t border-slate-200/60 pt-3 text-right dark:border-white/10">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          {t.coverLetter.sincerely}
        </p>
        <div className="py-1">
          <img
            src={imagesData.signatureUrl}
            alt={t.coverLetter.signatureAlt}
            loading="lazy"
            decoding="async"
            className="h-[75px] w-[75px] pl-0 object-contain dark:brightness-125 transition-transform hover:scale-105"
          />
        </div>
        <p className="text-sm font-black tracking-wide text-[#0b2853] sm:text-base dark:text-amber-300">
          {t.coverLetter.authorName}
        </p>
      </div>
    </div>
  );
}

export function CoverLetter() {
  const { t, language } = useLanguageContent();
  const { activeTimelineYear, toggleTimelineYear } = useTimeline();
  const [viewMode, setViewMode] = useState<"doc" | "slider">("doc");

  const isVi = language === "vi";

  return (
    <PageLayout
      id="cover-letter-main-card"
      rootClassName="main-info-card w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border border-[var(--border)] relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="coverLetter"
      pageName="CoverLetter Main Card"
      titleClassName="text-emerald-600 dark:text-emerald-400 font-black"
      title={
        isVi
          ? "Thư Ngỏ & Tuyên Ngôn Nghề Nghiệp"
          : "Open Letter & Professional Manifesto"
      }
      subtitle={
        isVi
          ? "Thư ngỏ gửi nhà tuyển dụng và tuyên ngôn nghề nghiệp."
          : "An open letter to employers and professional career manifesto."
      }
      icon={Mail}
      headerActions={
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle Segmented Control */}
          <div className="flex items-center rounded-full border border-slate-200/80 bg-white/80 p-0.5 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setViewMode("doc")}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black transition-all",
                viewMode === "doc"
                  ? "bg-[#0b2853] text-white shadow-xs dark:bg-amber-400 dark:text-slate-950"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
              )}
              title={isVi ? "Xem toàn bộ nội dung" : "View full document"}
            >
              <LayoutGrid size={12} />
              <span>{isVi ? "Bố Cục Chi Tiết" : "Full Document"}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("slider")}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black transition-all",
                viewMode === "slider"
                  ? "bg-[#0b2853] text-white shadow-xs dark:bg-amber-400 dark:text-slate-950"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
              )}
              title={isVi ? "Xem dạng trình chiếu từng mục" : "View slideshow presentation"}
            >
              <SlidersHorizontal size={12} />
              <span>{isVi ? "Trình Chiếu Slide" : "Slider View"}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300 shadow-xs backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isVi ? "Tuyên Ngôn Nghề Nghiệp" : "Career Manifesto"}
            </span>
          </div>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6">
        {viewMode === "slider" ? (
          <CoverLetterSlider onSwitchToDocView={() => setViewMode("doc")} />
        ) : (
          /* MAIN PAGE CANVAS / CONTAINER - CLEAN GLASS MORPHISM */
          <div className="group relative h-full w-full cursor-default overflow-hidden rounded-[15px] border border-[var(--border)] bg-[var(--card)] p-4 text-left shadow-xs backdrop-blur-xl transition-all duration-300 sm:p-6 lg:p-8 dark:bg-[var(--card)]/40 space-y-8">
            
            {/* 1. TOP SECTION: SALUTATION & INTRODUCTION */}
            <div className="relative z-20 rounded-2xl border border-black/5 bg-slate-50/50 p-4 sm:p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.02]">
              <CoverLetterIntro />
            </div>

            {/* 2. MIDDLE SECTION: CAREER TIMELINE & MILESTONES */}
            <div className="relative z-20 space-y-4 border-t border-slate-200/60 pt-6 dark:border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black tracking-wide text-[#0b2853] uppercase sm:text-base dark:text-amber-300">
                    {isVi
                      ? "Hành Trình Sự Nghiệp & Cột Mốc Quản Trị"
                      : "Career Journey & Leadership Milestones"}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {isVi
                      ? "20+ năm kinh nghiệm quản lý dịch vụ và vận hành hệ thống chăm sóc khách hàng đa ngành (2003 - 2023)"
                      : "20+ years of CS leadership and operational excellence across major industries (2003 - 2023)"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {isVi ? "8 Cột Mốc Tiêu Biểu" : "8 Key Milestones"}
                  </span>
                </div>
              </div>

              {/* Render 2-Column Balanced Career Timeline */}
              <CareerTimeline
                activeYear={activeTimelineYear}
                onToggleYear={toggleTimelineYear}
              />
            </div>

            {/* 3. ROW 1 UNDER TIMELINE: 3 TRỤ CỘT NGUYÊN TẮC CÙNG HÀNG VỚI 3 GIÁ TRỊ ĐÀO TẠO */}
            <div className="relative z-20 grid grid-cols-1 items-stretch gap-6 border-t border-slate-200/60 pt-6 text-xs leading-relaxed text-slate-800 sm:text-[13px] lg:grid-cols-2 lg:gap-8 dark:border-white/10 dark:text-slate-200">
              {/* Left Column: 3 Trụ Cột Nguyên Tắc Cốt Lõi */}
              <PrincipleSection />

              {/* Right Column: Bên cạnh công nghệ, tôi luôn chú trọng đào tạo đội ngũ */}
              <CoreValuesSection />
            </div>

            {/* 4. ROW 2: ĐỊNH HƯỚNG CÔNG NGHỆ (CRM, AI) CÙNG HÀNG VỚI MONG MUỐN ĐỒNG HÀNH & CHỮ KÝ */}
            <div className="relative z-20 grid grid-cols-1 items-stretch gap-6 border-t border-slate-200/60 pt-6 text-xs leading-relaxed text-slate-800 sm:text-[13px] lg:grid-cols-2 lg:gap-8 dark:border-white/10 dark:text-slate-200">
              {/* Left Column: Từ những nguyên tắc đó, tôi tập trung xây dựng CRM, Dashboard, AI Chatbot */}
              <div className="flex flex-col justify-between rounded-2xl border border-sky-500/20 bg-gradient-to-br from-white/90 via-sky-500/[0.04] to-blue-500/[0.03] p-5 sm:p-6 shadow-xs backdrop-blur-md dark:border-sky-500/20 dark:from-slate-900/90 dark:via-sky-500/[0.08] dark:to-blue-500/[0.05]">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-black text-sky-700 dark:text-sky-300">
                      <Cpu size={14} className="text-sky-600 dark:text-sky-400" />
                      <span>{isVi ? "Giải Pháp Công Nghệ & Tự Động Hóa" : "Technology & Automation"}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">
                      AI & CRM 24/7
                    </span>
                  </div>

                  <p className="text-left text-xs leading-relaxed text-slate-700 sm:text-[13px] dark:text-slate-300">
                    {t.coverLetter.techFocusPrefix}
                    <strong className="font-extrabold text-[#0b2853] dark:text-sky-300">
                      {t.coverLetter.techFocusSystems}
                    </strong>
                    {t.coverLetter.techFocusAnd}
                    <strong className="font-extrabold text-[#0b2853] dark:text-sky-300">
                      {t.coverLetter.techFocusAutomation}
                    </strong>
                    {t.coverLetter.techFocusSuffix}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-sky-500/20 bg-white/60 dark:bg-white/5 text-center">
                      <Layers size={16} className="text-sky-600 dark:text-sky-400 mb-1" />
                      <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">CRM Omni</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-indigo-500/20 bg-white/60 dark:bg-white/5 text-center">
                      <BarChart3 size={16} className="text-indigo-600 dark:text-indigo-400 mb-1" />
                      <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">Dashboard</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-purple-500/20 bg-white/60 dark:bg-white/5 text-center">
                      <Bot size={16} className="text-purple-600 dark:text-purple-400 mb-1" />
                      <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">AI Chatbot</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-sky-500/15 flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300">
                  <Sparkles size={13} className="text-amber-500 animate-pulse" />
                  <span>{isVi ? "Tối ưu hóa nguồn lực & Nâng cao CSAT toàn diện" : "Resource optimization & holistic CSAT enhancement"}</span>
                </div>
              </div>

              {/* Right Column: Mong muốn đồng hành, Lời cảm ơn & Chữ ký */}
              <div className="flex flex-col justify-between rounded-2xl border border-black/5 bg-slate-50/50 p-5 sm:p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
                <ClosingSection />
              </div>
            </div>

            {/* 5. BOTTOM SECTION: TRIẾT LÝ HÀNH ĐỘNG NẰM DƯỚI MỤC CHỮ KÝ VỚI HIỆU ỨNG NỔI BẬT */}
            <div className="relative z-20 border-t border-slate-200/60 pt-6 dark:border-white/10">
              <div className="group/quote relative overflow-hidden rounded-2xl border-2 border-sky-500/40 bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-purple-500/15 p-6 sm:p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-sky-400 hover:shadow-2xl dark:border-sky-400/40 dark:from-sky-500/20 dark:via-indigo-500/15 dark:to-purple-500/20">
                
                {/* Glowing ambient radial light */}
                <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl group-hover/quote:bg-sky-500/30 transition-all duration-700" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl group-hover/quote:bg-purple-500/30 transition-all duration-700" />

                {/* Large Background Watermark Quote Icon */}
                <Quote
                  size={140}
                  className="absolute -top-4 -left-4 text-sky-500/10 dark:text-sky-400/10 pointer-events-none transition-transform duration-700 group-hover/quote:scale-110 group-hover/quote:-rotate-6"
                  strokeWidth={1}
                />
                <Sparkles
                  size={120}
                  className="absolute -bottom-6 -right-6 text-purple-500/10 dark:text-purple-400/10 pointer-events-none transition-transform duration-700 group-hover/quote:scale-110"
                  strokeWidth={1}
                />

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
                  {/* Badge Header */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-sky-800 dark:text-sky-200 shadow-xs">
                    <Sparkles size={14} className="text-amber-400 animate-pulse" />
                    <span>{isVi ? "Triết Lý Hành Động" : "Action Philosophy"}</span>
                    <Sparkles size={14} className="text-amber-400 animate-pulse" />
                  </div>

                  {/* Main Highlighted Quote */}
                  <div className="relative py-2">
                    <p className="text-base sm:text-xl lg:text-2xl font-black italic leading-relaxed text-slate-900 dark:text-white tracking-tight">
                      <span className="text-sky-600 dark:text-sky-400 font-serif text-2xl sm:text-3xl mr-1">“</span>
                      <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-sky-100 dark:to-amber-200 bg-clip-text text-transparent">
                        {isVi
                          ? t.coverLetter.philosophy
                          : (t.coverLetter as any).philosophyEn ||
                            "Customer care is not just about solving problems, but also about building a system that helps businesses grow sustainably."}
                      </span>
                      <span className="text-sky-600 dark:text-sky-400 font-serif text-2xl sm:text-3xl ml-1">”</span>
                    </p>
                  </div>

                  {/* Subtext Assurance */}
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 pt-1">
                    <HeartHandshake size={15} className="text-rose-500" />
                    <span>
                      {isVi
                        ? "Lấy khách hàng làm trọng tâm – Vận hành chuẩn mực – Giá trị bền vững"
                        : "Customer-centric – Operational Excellence – Sustainable Value"}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </PageLayout>
  );
}
