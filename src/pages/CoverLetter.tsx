import React from "react";
import { motion } from "motion/react";
import {
  FileSignature,
  Sparkles,
  Layers,
  BarChart3,
  Bot,
  Globe,
  Heart,
  Mail,
  Phone,
  MapPin,
  Award,
  Volume2,
  VolumeX,
  HeartHandshake,
  Send,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import {
  useLanguageContent,
  useTimeline,
  useSpeechSynthesis,
} from "../hooks/useCoverLetter";
import { imagesData } from "../data/coverLetterData";
import { CareerTimeline } from "../components/coverLetter/CareerTimeline";
import {
  PrinciplesSection,
  CoreValuesSection,
} from "../components/coverLetter/CoreValuesSection";
import { cn } from "../lib/utils";

export function CoverLetter() {
  const { language } = useLanguageContent();
  const { activeTimelineYear, toggleTimelineYear } = useTimeline();
  const { isPlayingAudio, toggleAudio } = useSpeechSynthesis();
  const isVi = language === "vi";

  const coverLetterAudioText = isVi
    ? "Kính chào Quý Công ty! Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm thực chiến trong lĩnh vực xây dựng, chuẩn hóa quy trình, vận hành và phát triển dịch vụ khách hàng đa kênh toàn diện. Sứ mệnh của tôi là phụng sự và tạo giá trị thực."
    : "Dear Valued Partners! I am Nguyen Hung Thai, Customer Service Manager with over 22 years of leadership experience in architecting, standardizing, and scaling world-class customer service operations. My mission is to serve and create real value.";

  return (
    <PageLayout
      hideToolbar={true}
      id="cover-letter-main-card"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col !bg-transparent !border-none shadow-none transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent rounded-2xl md:rounded-3xl"
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
      <div className="w-full max-w-5xl mx-auto pb-8">
        {/* MASTER THẺ THƯ NGỎ (MULTI-COLOR GLASS UI COVER LETTER CARD) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full rounded-3xl border border-indigo-300/40 dark:border-white/15 bg-gradient-to-b from-white/80 via-white/70 to-indigo-50/40 dark:from-slate-900/85 dark:via-slate-900/75 dark:to-indigo-950/40 backdrop-blur-2xl shadow-2xl p-4 sm:p-7 lg:p-9 space-y-6 sm:space-y-7 relative overflow-hidden text-left"
        >
          {/* Decorative Background Glass Glow Blobs */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 left-0 -ml-16 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 -mb-16 w-80 h-80 rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-3xl pointer-events-none" />

          {/* 1. HEADER BAR OF THE MASTER CARD */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-indigo-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="rounded-full px-3.5 py-1 text-xs font-black text-indigo-700 dark:text-indigo-300 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-sky-500/15 border border-indigo-400/30 inline-flex items-center gap-1.5 backdrop-blur-md shadow-2xs">
                <FileSignature size={14} className="text-indigo-500" />
                <span>{isVi ? "Thẻ Thư Ngỏ Ứng Tuyển" : "Official Cover Letter Card"}</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/60 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-white/10 backdrop-blur-sm">
                Ref: CL-NHT-2026
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  toggleAudio(
                    coverLetterAudioText,
                    isVi ? "vi-VN" : "en-US"
                  )
                }
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer border backdrop-blur-md",
                  isPlayingAudio
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 animate-pulse shadow-indigo-500/30"
                    : "bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-indigo-700 dark:text-indigo-300 border-indigo-300/60 dark:border-indigo-500/30 hover:shadow-md"
                )}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX size={14} />
                    <span>{isVi ? "Tắt giọng đọc" : "Stop Speech"}</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={14} />
                    <span>{isVi ? "Đọc thư ngỏ" : "Read Letter"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. TOP GREETING & CANDIDATE PROFILE CARD (MULTI-COLOR GLASS) */}
          <div className="relative z-10 overflow-hidden rounded-2xl border border-indigo-300/60 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-sky-500/10 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-sky-950/40 p-5 sm:p-7 shadow-sm backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-sky-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-300/50 dark:border-indigo-400/30 shadow-2xs backdrop-blur-md">
                <Award size={14} className="text-amber-500" />
                <span>Customer Service Director &amp; CX Strategist</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-100 dark:to-slate-200 bg-clip-text text-transparent tracking-tight uppercase">
                {isVi ? "KÍNH CHÀO QUÝ CÔNG TY!" : "DEAR VALUED PARTNERS!"}
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {isVi ? (
                  <>
                    Tôi là <strong className="font-black text-indigo-950 dark:text-white underline decoration-indigo-400 decoration-2 underline-offset-2">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng với hơn{" "}
                    <strong className="font-black text-indigo-950 dark:text-white">22 năm kinh nghiệm thực chiến</strong> trong lĩnh vực xây dựng, chuẩn hóa quy trình, vận hành và phát triển dịch vụ khách hàng đa kênh toàn diện.
                  </>
                ) : (
                  <>
                    I am <strong className="font-black text-indigo-950 dark:text-white underline decoration-indigo-400 decoration-2 underline-offset-2">Nguyen Hung Thai</strong>, Customer Service Manager with over{" "}
                    <strong className="font-black text-indigo-950 dark:text-white">22 years of leadership experience</strong> in architecting, standardizing, and scaling world-class customer service operations.
                  </>
                )}
              </p>

              <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <a
                  href="mailto:hungthai84@gmail.com"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 dark:bg-slate-800/80 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 border border-indigo-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all duration-300 shadow-xs hover:shadow-indigo-500/20"
                >
                  <Mail size={13} className="text-indigo-500 dark:text-indigo-400" />
                  <span>hungthai84@gmail.com</span>
                </a>

                <a
                  href="tel:0908247247"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 dark:bg-slate-800/80 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 border border-emerald-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all duration-300 shadow-xs hover:shadow-emerald-500/20"
                >
                  <Phone size={13} className="text-emerald-500 dark:text-emerald-400" />
                  <span>0908 247 247</span>
                </a>

                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 dark:bg-slate-800/80 border border-rose-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-xs">
                  <MapPin size={13} className="text-rose-500 dark:text-rose-400" />
                  <span>TP. Hồ Chí Minh</span>
                </span>
              </div>
            </div>
          </div>

          {/* 3. CAREER JOURNEY & MILESTONES CARD */}
          <div className="relative z-10 rounded-2xl border border-sky-200/60 dark:border-slate-800/80 bg-gradient-to-br from-sky-500/5 via-white/50 to-purple-500/5 dark:from-slate-900/60 dark:via-slate-800/40 dark:to-indigo-950/40 p-4 sm:p-6 shadow-xs backdrop-blur-xl space-y-3">
            <div className="text-center space-y-1">
              <h3 className="text-sm sm:text-base font-black tracking-wide text-slate-900 dark:text-white uppercase">
                {isVi
                  ? "HÀNH TRÌNH SỰ NGHIỆP & CỘT MỐC QUẢN TRỊ"
                  : "CAREER JOURNEY & LEADERSHIP MILESTONES"}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {isVi
                  ? "20+ năm kinh nghiệm quản lý dịch vụ và vận hành hệ thống chăm sóc khách hàng đa ngành (2003 - 2023)"
                  : "20+ years of CS leadership & operational excellence across leading industries (2003 - 2023)"}
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-sky-500/15 to-indigo-500/15 text-sky-800 dark:text-sky-300 border border-sky-400/30 backdrop-blur-md">
                  ⭐ {isVi ? "8 Cột Mốc Tiêu Biểu" : "8 Key Milestones"}
                </span>
              </div>
            </div>

            <CareerTimeline
              activeYear={activeTimelineYear}
              onToggleYear={toggleTimelineYear}
            />
          </div>

          {/* 4. PRINCIPLES & CORE VALUES CARD GRID */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <PrinciplesSection />
            <CoreValuesSection />
          </div>

          {/* 5. TECH SOLUTIONS & CLOSING SIGNATURE GRID */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* Left Column: Tech Solutions */}
            <div className="rounded-2xl border border-blue-300/60 dark:border-blue-900/40 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-white/60 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-900/60 p-4 sm:p-5 shadow-xs backdrop-blur-xl flex flex-col justify-between h-full space-y-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-400/30">
                      <Globe size={16} />
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wide">
                      {isVi ? "Giải Pháp Công Nghệ & Tự Động Hóa" : "Technology & Automation"}
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                    AI &amp; CRM 24/7
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                    {isVi ? (
                      <>
                        Từ những nguyên tắc đó, tôi tập trung xây dựng các hệ thống{" "}
                        <strong className="font-bold text-indigo-700 dark:text-indigo-300">
                          CRM, Dashboard quản trị, AI Chatbot
                        </strong>{" "}
                        cùng các giải pháp{" "}
                        <strong className="font-bold text-indigo-700 dark:text-indigo-300">
                          tự động hóa
                        </strong>{" "}
                        nhằm nâng cao hiệu quả vận hành và kiến tạo chuẩn mực dịch vụ xuất sắc.
                      </>
                    ) : (
                      <>
                        Grounded in these core principles, I architect advanced{" "}
                        <strong className="font-bold text-indigo-700 dark:text-indigo-300">
                          CRM architectures, real-time BI dashboards, and AI Chatbots
                        </strong>{" "}
                        alongside intelligent automation to maximize operational efficiency.
                      </>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-sky-200/60 dark:border-sky-900/50 bg-white/80 dark:bg-slate-800/80 text-center shadow-2xs">
                    <Layers size={16} className="text-sky-600 dark:text-sky-400 mb-0.5" />
                    <span className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                      CRM Omni
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-indigo-200/60 dark:border-indigo-900/50 bg-white/80 dark:bg-slate-800/80 text-center shadow-2xs">
                    <BarChart3 size={16} className="text-indigo-600 dark:text-indigo-400 mb-0.5" />
                    <span className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                      Dashboard
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-purple-200/60 dark:border-purple-900/50 bg-white/80 dark:bg-slate-800/80 text-center shadow-2xs">
                    <Bot size={16} className="text-purple-600 dark:text-purple-400 mb-0.5" />
                    <span className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                      AI Chatbot
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-1 text-[10.5px] font-bold text-amber-700 dark:text-amber-300">
                <Sparkles size={13} className="text-amber-500 shrink-0" />
                <span>
                  {isVi
                    ? "Tối ưu hóa nguồn lực & Nâng cao CSAT toàn diện"
                    : "Resource optimization & holistic CSAT enhancement"}
                </span>
              </div>
            </div>

            {/* Right Column: Letter Closing & Signature */}
            <div className="rounded-2xl border border-indigo-300/60 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-white/60 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-slate-900/60 p-4 sm:p-5 shadow-xs backdrop-blur-xl flex flex-col justify-between h-full space-y-3">
              <div className="space-y-2.5">
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
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

                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {isVi
                    ? "Xin trân trọng cảm ơn Quý Công ty đã dành thời gian lắng nghe!"
                    : "Thank you sincerely for your valuable time and consideration!"}
                </p>
              </div>

              <div className="flex flex-col items-end pt-1 text-right">
                <p className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">
                  {isVi ? "Trân trọng," : "Sincerely,"}
                </p>
                <div className="py-0.5">
                  <img
                    src={imagesData.signatureUrl}
                    alt={isVi ? "Chữ ký Nguyễn Hùng Thái" : "Signature Nguyen Hung Thai"}
                    loading="lazy"
                    decoding="async"
                    className="h-7 sm:h-8 w-auto object-contain dark:brightness-125 transition-transform hover:scale-105"
                  />
                </div>
                <p className="text-xs font-black text-slate-900 dark:text-white">
                  {isVi ? "Nguyễn Hùng Thái" : "Nguyen Hung Thai"}
                </p>
              </div>
            </div>
          </div>

          {/* 6. CALL TO ACTION BANNER: CÙNG TẠO RA TRẢI NGHIỆM KHÁCH HÀNG TỐT HƠN (MULTI-COLOR GLASS BANNER) */}
          <div className="relative z-10 overflow-hidden rounded-3xl border border-indigo-400/50 dark:border-indigo-500/40 bg-gradient-to-r from-indigo-700 via-purple-700 to-sky-700 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-white">
            {/* Decorative Glow & Ambient Watermarks */}
            <div className="absolute -right-10 -bottom-10 opacity-25 pointer-events-none text-indigo-200">
              <Sparkles size={220} />
            </div>
            <div className="absolute -left-10 -top-10 opacity-20 pointer-events-none text-purple-200">
              <Heart size={180} />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 w-full text-center sm:text-left">
                <div className="flex h-16 w-16 sm:h-18 sm:w-18 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white border border-white/40 shadow-xl backdrop-blur-md">
                  <HeartHandshake size={34} className="animate-pulse text-amber-300" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-black tracking-wider uppercase border border-white/30 backdrop-blur-md shadow-xs">
                      <Sparkles size={12} className="text-amber-300" />
                      {isVi ? "Hợp tác & Đồng hành" : "Partnership & Collaboration"}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest hidden sm:inline-block">
                      • CX STRATEGY
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-sm">
                    {isVi
                      ? "CÙNG TẠO RA TRẢI NGHIỆM KHÁCH HÀNG TỐT HƠN"
                      : "CREATE BETTER CUSTOMER EXPERIENCES TOGETHER"}
                  </h3>

                  <p className="text-xs sm:text-sm text-indigo-100 font-medium max-w-2xl leading-relaxed">
                    {isVi
                      ? "Tôi luôn sẵn sàng kết nối để cùng doanh nghiệp xây dựng hệ thống Customer Experience hiệu quả, nhân văn và bền vững."
                      : "I am always ready to connect to help businesses build effective, human-centric, and sustainable Customer Experience systems."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2.5 w-full md:w-auto shrink-0 justify-center">
                <a
                  href="mailto:hungthai84@gmail.com?subject=Liên%20hệ%20hợp%20tác%20từ%20Cover%20Letter"
                  className="group flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white text-indigo-900 hover:bg-amber-300 hover:text-indigo-950 transition-all duration-300 shadow-xl border border-white/60 font-black text-xs cursor-pointer active:scale-95 shrink-0"
                >
                  <Send size={15} className="text-indigo-600 group-hover:text-indigo-950 transition-colors" />
                  <span>{isVi ? "KẾT NỐI NGAY" : "CONNECT NOW"}</span>
                </a>

                <a
                  href="tel:0908247247"
                  className="group flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-all duration-300 shadow-md border border-white/40 backdrop-blur-md font-black text-xs cursor-pointer active:scale-95 shrink-0"
                >
                  <Phone size={15} className="text-emerald-300" />
                  <span>0908 247 247</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
export default CoverLetter;
