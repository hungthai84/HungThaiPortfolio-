import { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Users,
  Cake,
  Copy,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Zap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Target,
  Send,
  Quote,
  Award,
  TrendingUp,
  Cpu,
  Layers,
  Headphones,
  Check,
  ArrowUpRight,
  Briefcase,
  Activity,
  Star,
} from "lucide-react";
import { cn } from "../lib/utils";
import { PageLayout } from "../components/PageLayout";
import { motion, AnimatePresence } from "motion/react";
import { playUiSound } from "../lib/sound";
import { useLanguage } from "../context/LanguageContext";

export function About() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSets = [
    {
      idle: "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4",
      intro:
        "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4",
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleIntroEnded = () => {
      if (isIntroPlaying) {
        setIsIntroPlaying(false);
        if (video) {
          video.src = videoSets[0].idle;
          video.loop = true;
          video.muted = true;
          video.load();
          video.play().catch(() => {});
        }
      }
    };

    video?.addEventListener("ended", handleIntroEnded);
    return () => {
      video?.removeEventListener("ended", handleIntroEnded);
    };
  }, [isIntroPlaying]);

  const toggleIntro = () => {
    playUiSound("click");
    const video = videoRef.current;
    if (!video) return;

    if (isIntroPlaying) {
      setIsIntroPlaying(false);
      if (video) {
        video.src = videoSets[0].idle;
        video.loop = true;
        video.muted = true;
        video.load();
        video.play().catch(() => {});
      }
    } else {
      setIsIntroPlaying(true);
      setIsVideoAudioOn(true);
      if (video) {
        video.src = videoSets[0].intro;
        video.loop = false;
        video.muted = false;
        video.load();
        video.play().catch(() => {});
      }
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    playUiSound("click");
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setToastMessage(isVi ? `Đã sao chép ${label}` : `Copied ${label}`);
    setTimeout(() => {
      setCopiedField(null);
      setToastMessage(null);
    }, 2000);
  };

  const personalInfo = [
    {
      label: isVi ? "Họ và tên" : "Full Name",
      value: "Nguyễn Hùng Thái",
      icon: User,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: isVi ? "Sinh nhật" : "Date of Birth",
      value: "22/06/1984",
      icon: Cake,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: isVi ? "Dân tộc" : "Ethnicity",
      value: isVi ? "Kinh" : "Kinh (Vietnamese)",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: isVi ? "Tình trạng" : "Marital Status",
      value: isVi ? "Đã có gia đình" : "Married",
      icon: HeartHandshake,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: isVi ? "Địa chỉ" : "Location",
      value: isVi ? "Phường 15, Quận 10, TP.HCM" : "Ward 15, District 10, HCMC",
      icon: MapPin,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-500/10",
    },
  ];

  const contactDetails = [
    {
      label: isVi ? "Điện thoại" : "Phone",
      value: "090 909 7882",
      href: "tel:0909097882",
      icon: Phone,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      label: "Email",
      value: "trinhan.virtual@gmail.com",
      href: "mailto:trinhan.virtual@gmail.com",
      icon: Mail,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Website",
      value: "nguyenhungthai.info",
      href: "https://nguyenhungthai.info",
      icon: Globe,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
    },
  ];

  const quickMetrics = [
    {
      num: "22+",
      unit: isVi ? "Năm" : "Years",
      label: isVi ? "Kinh nghiệm CX & Vận hành" : "CX & Ops Experience",
      icon: Award,
      color: "from-amber-500 to-orange-500",
      accent: "text-amber-500",
    },
    {
      num: "8+",
      unit: isVi ? "Tập đoàn" : "Corporations",
      label: isVi ? "Cột mốc lãnh đạo quy mô lớn" : "Large-scale Leadership",
      icon: Briefcase,
      color: "from-blue-500 to-indigo-500",
      accent: "text-blue-500",
    },
    {
      num: "99%",
      unit: "CSAT",
      label: isVi ? "Chỉ số hài lòng khách hàng" : "Customer Satisfaction",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500",
      accent: "text-emerald-500",
    },
    {
      num: "24/7",
      unit: "AI CRM",
      label: isVi ? "Tự động hóa & Trợ lý thông minh" : "Automation & Smart Bots",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      accent: "text-purple-500",
    },
  ];

  return (
    <PageLayout
      id="about-main-card"
      pageId="about"
      pageName="About & Profile Overview"
      title={isVi ? "Giới Thiệu" : "About Me"}
      subtitle={
        isVi
          ? "Hồ sơ cá nhân Bento Grid: tiểu sử, triết lý phục vụ, 3 trụ cột vận hành và kênh liên hệ."
          : "Bento Grid Portfolio Profile: biography, customer experience philosophy, operational pillars and contact channels."
      }
      icon={User}
    >
      <div
        className="relative mx-auto w-full max-w-7xl h-auto min-h-fit flex-1 px-0 pb-0 transition-all duration-300 ease-in-out"
        id="about-profile-container"
        style={{ paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' }}
      >
        
        {/* =========================================================================
            BENTO PORTFOLIO GRID (HỒ SƠ CÁ NHÂN)
            Structured Responsive Layout Reflow with Fluid Auto-Scaling Below Desktop
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 auto-rows-auto min-h-fit w-full">
          
          {/* -------------------------------------------------------------
              BENTO CARD 1: HERO PORTRAIT & INTERACTIVE AI VIDEO (Col 1-4)
              Fluid scaling: Full width on Mobile, 5/12 on Tablet, 4/12 on Desktop
             ------------------------------------------------------------- */}
          <div className="md:col-span-5 lg:col-span-4 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-white/90 via-white/70 to-white/90 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-900/90 p-4 sm:p-5 md:p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:border-blue-500/30 flex flex-col justify-between h-auto min-h-fit relative overflow-hidden group">
            
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />
            
            <div className="relative z-10">
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-400">
                  <Play size={12} className="fill-current" />
                  <span>{isVi ? "Lời Chào Trực Quan" : "Visual Greeting"}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-bold text-[var(--muted)]">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  AI Live
                </span>
              </div>

              {/* Video Player Box */}
              <div className="relative aspect-[6/19] w-full max-h-[380px] sm:max-h-[460px] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center shadow-inner border border-black/10 dark:border-white/10 my-1">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="video h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  crossOrigin="anonymous"
                  src="https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4"
                />
                
                {/* Floating Bottom Control Bar */}
                <div className="absolute inset-x-0 bottom-0 flex justify-center items-center bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 pt-8">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={toggleIntro}
                    className="flex w-full max-w-[260px] h-[48px] cursor-pointer items-center justify-between px-3.5 py-2 rounded-full border-2 border-indigo-400/80 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_25px_rgba(99,102,241,0.6)] backdrop-blur-md transition-all duration-300 hover:from-blue-500 hover:to-violet-500 text-xs font-black text-white"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-md">
                      {isIntroPlaying ? <Pause size={13} className="fill-indigo-600" /> : <Play size={13} className="translate-x-0.5 fill-indigo-600" />}
                    </div>
                    <span className="truncate px-1">
                      {isIntroPlaying ? (isVi ? "Tạm dừng" : "Pause") : (isVi ? "Phát Intro" : "Play Intro")}
                    </span>
                    {!isIntroPlaying && (
                      <Sparkles size={13} className="shrink-0 animate-bounce text-amber-300" />
                    )}

                    {/* Integrated Divider and Audio Button */}
                    <div className="mx-1 h-4 w-px shrink-0 bg-white/20" />

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiSound("click");
                        const video = videoRef.current;
                        if (video) {
                          video.muted = !video.muted;
                          setIsVideoAudioOn(!video.muted);
                        }
                      }}
                      className={cn(
                        "flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full border text-white shadow-md transition-all hover:scale-105 active:scale-95",
                        isVideoAudioOn ? "border-white/30 bg-white/20 hover:bg-white/30" : "border-rose-500/40 bg-rose-600/90 hover:bg-rose-600"
                      )}
                      title={isVideoAudioOn ? (isVi ? "Tắt tiếng" : "Mute") : (isVi ? "Bật tiếng" : "Unmute")}
                    >
                      {isVideoAudioOn ? <Volume2 size={12} className="animate-pulse text-white" /> : <VolumeX size={12} className="text-white" />}
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              BENTO CARD 2: PHILOSOPHY & OPERATIONAL HUB (Col 5-12)
              Fluid scaling: Full width on Mobile, 7/12 on Tablet, 8/12 on Desktop
             ------------------------------------------------------------- */}
          <div className="md:col-span-7 lg:col-span-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-white/95 via-cyan-500/[0.03] to-white/90 dark:from-slate-900/95 dark:via-cyan-500/[0.05] dark:to-slate-900/90 p-4 sm:p-6 md:p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:border-cyan-500/40 flex flex-col justify-between h-auto min-h-fit relative overflow-hidden group">
            
            {/* Large Watermark Ambient Icon */}
            <Zap
              className="absolute -bottom-6 -right-6 text-cyan-500/[0.06] dark:text-cyan-400/[0.06] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
              size={150}
              strokeWidth={1}
            />

            <div className="relative z-10 space-y-3.5 sm:space-y-4">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] sm:text-xs font-black tracking-wide text-cyan-700 dark:text-cyan-300">
                  <Zap size={13} />
                  <span>{isVi ? "Triết Lý & Tầm Nhìn CX" : "Philosophy & CX Vision"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    22+ Năm Thực Chiến
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                {isVi ? "Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng" : "Dedication & Partnership in Customer Experience"}
              </h2>

              {/* Narrative Content */}
              <div className="text-xs sm:text-[13px] leading-relaxed text-[var(--text-secondary)] space-y-2 sm:space-y-2.5">
                <p>
                  Một chuyên gia dịch vụ khách hàng với hơn <strong className="text-cyan-600 dark:text-cyan-400 font-bold">22 năm kinh nghiệm thực chiến</strong>. Với tôi, Chăm Sóc Khách Hàng không chỉ đơn thuần là giải quyết sự vụ, mà là <strong className="text-[var(--text-primary)] font-bold">sự đồng hành và thấu cảm sâu sắc</strong>.
                </p>
                <p>
                  Mỗi cuộc trò chuyện, mỗi điểm chạm — dù là nhỏ nhất — đều là cơ hội quý giá: để lắng nghe, để thấu hiểu, và để kiến tạo những trải nghiệm vượt trên mong đợi.
                </p>
                <p>
                  Tôi tin rằng sự hài lòng bền vững không đến từ sự hoàn hảo tuyệt đối, mà bắt nguồn từ <strong className="text-amber-600 dark:text-amber-400 font-bold">sự tận tâm kịp thời, tính minh bạch và sự đồng cảm chân thành</strong>.
                </p>
              </div>
            </div>

            {/* 3 OPERATIONAL PILLARS MINI CARDS */}
            <div className="relative z-10 mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-[var(--border)]">
              <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  {isVi ? "3 Trụ Cột Vận Hành Cốt Lõi" : "3 Core Operational Pillars"}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  Hiệu quả – Nhân văn – Bền vững
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {/* Pillar 1 */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] dark:bg-amber-500/[0.08] hover:border-amber-500/40 transition-all">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-amber-600 dark:text-amber-400 font-black text-xs mb-1">
                    <ShieldCheck size={15} />
                    <span>01. {isVi ? "Hiệu quả" : "Efficiency"}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                    {isVi ? "Chuẩn hóa SOP, tối ưu FCR (>85%), rút ngắn SLA và chi phí xử lý." : "SOP standardization, high FCR (>85%), SLA optimization."}
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/[0.04] dark:bg-rose-500/[0.08] hover:border-rose-500/40 transition-all">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-rose-600 dark:text-rose-400 font-black text-xs mb-1">
                    <HeartHandshake size={15} />
                    <span>02. {isVi ? "Nhân văn" : "Human-centric"}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                    {isVi ? "Lắng nghe chân thành, kết nối cảm xúc và đào tạo đội ngũ tận tâm." : "Empathetic engagement, customer trust & dedicated team growth."}
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.08] hover:border-emerald-500/40 transition-all sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs mb-1">
                    <Target size={15} />
                    <span>03. {isVi ? "Bền vững" : "Sustainability"}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                    {isVi ? "Ứng dụng CRM, AI Automation tạo giá trị dài hạn cho tổ chức." : "CRM & AI automation driving lasting organizational growth."}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* -------------------------------------------------------------
              BENTO CARD 4: VALUE MISSION EMOTIONAL SPOTLIGHT (Col 1-7)
              Fluid 12 cols on Tablet, 7 cols on Desktop
             ------------------------------------------------------------- */}
          <div className="md:col-span-12 lg:col-span-7 rounded-2xl border border-rose-500/25 bg-gradient-to-br from-white/95 via-rose-500/[0.04] to-amber-500/[0.03] dark:from-slate-900/95 dark:via-rose-500/[0.08] dark:to-amber-500/[0.05] p-4 sm:p-6 md:p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:border-rose-500/40 flex flex-col justify-between h-auto min-h-fit relative overflow-hidden group">
            
            {/* Background Decorative Quote */}
            <Quote
              size={120}
              className="absolute -right-4 -bottom-6 text-rose-500/10 dark:text-rose-400/10 pointer-events-none rotate-180 transition-transform duration-700 group-hover:scale-110"
              strokeWidth={1}
            />

            <div className="relative z-10 space-y-3 sm:space-y-4 my-auto">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-rose-500/30 bg-rose-500/15 px-3 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-300 shadow-xs">
                <Sparkles size={13} className="text-rose-500 animate-pulse" />
                <span>{isVi ? "Tuyên Ngôn Sứ Mệnh" : "Value Mission Statement"}</span>
              </div>

              {/* Narrative */}
              <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] leading-relaxed">
                {isVi
                  ? "Nỗ lực không ngừng để kiến tạo dịch vụ chuẩn mực, tối ưu hóa chi phí vận hành. Và trên hết, để mỗi khách hàng luôn cảm nhận được một chân lý giản dị nhưng cốt lõi:"
                  : "Relentlessly striving to deliver benchmark service quality with optimal operating cost. And above all, ensuring every single customer experiences:"}
              </p>

              {/* Emotional Quote Pill */}
              <div className="relative my-1.5 sm:my-2 inline-block w-full">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 opacity-20 blur-md group-hover:opacity-30 transition-opacity" />
                <div className="relative rounded-2xl border-2 border-rose-500/30 bg-white/90 dark:bg-slate-900/90 px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-lg backdrop-blur-md text-center">
                  <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 dark:from-rose-400 dark:via-pink-300 dark:to-amber-300 bg-clip-text text-base sm:text-xl md:text-2xl font-black tracking-tight text-transparent">
                    {isVi ? "“ Họ luôn luôn được lắng nghe. ”" : "“ They are always genuinely heard. ”"}
                  </span>
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300 pt-0.5">
                <HeartHandshake size={15} className="text-rose-500 shrink-0" />
                <span className="text-[11px] sm:text-xs">{isVi ? "Cam kết thấu cảm trọn vẹn trong mọi điểm chạm dịch vụ" : "Dedicated to deep empathy across every single touchpoint"}</span>
              </div>

            </div>
          </div>

          {/* -------------------------------------------------------------
              BENTO CARD 5: COMPACT PROFILE & CONTACT HUBS (Col 8-12)
              Fluid 12 cols on Tablet, 5 cols on Desktop
             ------------------------------------------------------------- */}
          <div className="md:col-span-12 lg:col-span-5 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-white/90 to-white/70 dark:from-slate-900/90 dark:to-slate-900/70 p-4 sm:p-5 md:p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:border-purple-500/30 flex flex-col justify-between h-auto min-h-fit space-y-3.5 sm:space-y-4">
            
            {/* TOP SUB-SECTION: THÔNG TIN CÁ NHÂN */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                <span className="text-[11px] sm:text-xs font-bold text-purple-600 dark:text-purple-400 px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/10 inline-flex items-center gap-1.5">
                  <User size={12} />
                  {isVi ? "Hồ Sơ Cá Nhân" : "Personal Profile"}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[var(--muted)] font-bold">Bio Data</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
                {personalInfo.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 hover:bg-[var(--bg)]/80 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-lg", item.bg, item.color)}>
                          <Icon size={13} />
                        </div>
                        <span className="text-xs font-medium text-[var(--muted)] truncate">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[var(--text-primary)] text-right truncate">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ARTISTIC DIVIDER */}
            <div className="relative flex items-center justify-center py-0.5">
              <div className="w-full border-t border-[var(--border)]" />
              <div className="absolute px-3 rounded-full border border-[var(--border)] bg-[var(--card)] text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Send size={10} />
                <span>{isVi ? "Kênh Kết Nối" : "Contact Channels"}</span>
              </div>
            </div>

            {/* BOTTOM SUB-SECTION: KÊNH KẾT NỐI & COPY BUTTONS */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
                {contactDetails.map((contact, idx) => {
                  const Icon = contact.icon;
                  const isCopied = copiedField === contact.label;
                  return (
                    <div
                      key={idx}
                      className="group/item flex items-center justify-between gap-2 p-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 hover:bg-[var(--bg)]/80 transition-all hover:border-[var(--border-hover)]"
                    >
                      <a
                        href={contact.href}
                        target={contact.label === "Website" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                      >
                        <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-lg", contact.bg, contact.color)}>
                          <Icon size={13} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-wider">
                            {contact.label}
                          </span>
                          <span className="text-xs font-bold text-[var(--text-primary)] truncate group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">
                            {contact.value}
                          </span>
                        </div>
                      </a>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(contact.value, contact.label)}
                        className={cn(
                          "cursor-pointer p-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1",
                          isCopied
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "text-[var(--muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10"
                        )}
                        title={isVi ? "Sao chép" : "Copy"}
                      >
                        {isCopied ? <Check size={13} /> : <Copy size={13} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* -------------------------------------------------------------
              BENTO CARD 3: 4 REAL-WORLD KEY METRICS (Col 1-12)
              Positions horizontally in 1 row below Personal Profile & Mission
             ------------------------------------------------------------- */}
          <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4 w-full">
            {quickMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[var(--border)] bg-gradient-to-b from-white/90 to-white/70 dark:from-slate-900/90 dark:to-slate-900/70 p-3.5 sm:p-4 md:p-5 shadow-xs backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:border-blue-500/30 flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
                    <div className={cn("p-1.5 sm:p-2 rounded-xl bg-black/5 dark:bg-white/5", metric.accent)}>
                      <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--muted)]">
                      {metric.unit}
                    </span>
                  </div>
                  <div>
                    <div className={cn("bg-gradient-to-r bg-clip-text text-xl sm:text-2xl md:text-3xl font-black text-transparent tracking-tight", metric.color)}>
                      {metric.num}
                    </div>
                    <div className="text-[11px] sm:text-xs font-bold text-[var(--text-primary)] mt-0.5 sm:mt-1 leading-snug">
                      {metric.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-8 left-1/2 z-[999999] flex -translate-x-1/2 items-center gap-2.5 rounded-[10px] border border-white/20 bg-slate-900/90 px-4 py-2.5 text-xs font-black text-white shadow-2xl backdrop-blur-2xl dark:border-slate-800 dark:bg-white/90 dark:text-slate-900"
            >
              <CheckCircle2
                size={16}
                className="shrink-0 text-emerald-400 dark:text-emerald-600"
              />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}

