import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Settings,
  Activity,
  Heart,
  BarChart,
  User,
  Cake,
  Users,
  HeartHandshake,
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Zap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Target,
  Send,
  Award,
  TrendingUp,
  Cpu,
  Briefcase,
  FileText,
  X,
  ExternalLink,
  Sparkle,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../lib/utils";
import { playGlassSound } from "../lib/sound";

interface AboutProps {
  onNavigate?: (pageId: string) => void;
}

// Tactical haptic sound feedback
const playTactileSound = (type: "click" | "toast" | "sparkle" = "click") => {
  try {
    const isEnabled = localStorage.getItem("app_ui_sounds_enabled") !== "false";
    if (!isEnabled) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";

    if (type === "click") {
      osc.frequency.setValueAtTime(820, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    } else if (type === "toast") {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    } else if (type === "sparkle") {
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    playGlassSound("tap");
  }
};

export function About({ onNavigate }: AboutProps) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const [activeTab, setActiveTab] = useState<string>("all");
  const [isIntroPlaying, setIsIntroPlaying] = useState<boolean>(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<"cv" | "projects" | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoSets = [
    {
      idle: "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4",
      intro: "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4",
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

    video.addEventListener("ended", handleIntroEnded);
    return () => {
      video.removeEventListener("ended", handleIntroEnded);
    };
  }, [isIntroPlaying]);

  const toggleIntro = () => {
    playTactileSound("click");
    const video = videoRef.current;
    if (!video) return;

    if (isIntroPlaying) {
      setIsIntroPlaying(false);
      video.src = videoSets[0].idle;
      video.loop = true;
      video.muted = true;
      video.load();
      video.play().catch(() => {});
    } else {
      setIsIntroPlaying(true);
      setIsVideoAudioOn(true);
      video.src = videoSets[0].intro;
      video.loop = false;
      video.muted = false;
      video.load();
      video.play().catch(() => {});
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    playTactileSound("toast");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
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

  const filterOptions = [
    { id: "all", labelVi: "Tổng Quan", labelEn: "Overview" },
    { id: "philosophy", labelVi: "Triết Lý CX", labelEn: "Philosophy" },
    { id: "mission", labelVi: "Sứ Mệnh", labelEn: "Mission" },
  ];

  const strategicPillars = [
    {
      title: isVi ? "QUY TRÌNH" : "PROCESS",
      desc: isVi ? "tạo nền tảng." : "creating foundation.",
      icon: Layers,
      bg: "bg-[#673ab7]",
      shadowColor: "#2196f3",
    },
    {
      title: isVi ? "CON NGƯỜI" : "PEOPLE",
      desc: isVi ? "tạo giá trị." : "creating value.",
      icon: Users,
      bg: "bg-[rgb(41,49,79)]",
      shadowColor: "rgb(244,67,54)",
    },
    {
      title: isVi ? "CÔNG NGHỆ" : "TECHNOLOGY",
      desc: isVi ? "tạo đòn bẩy." : "creating leverage.",
      icon: Cpu,
      bg: "bg-[#2196f3]",
      shadowColor: "#ffeb3b",
    },
    {
      title: isVi ? "HIỆU QUẢ" : "EFFICIENCY",
      desc: isVi ? "Tối ưu & đo lường." : "Optimize & Measure.",
      icon: BarChart,
      bg: "bg-[#4caf50]",
      shadowColor: "#673ab7",
    },
    {
      title: isVi ? "NHÂN VĂN" : "HUMANITY",
      desc: isVi ? "Thấu hiểu & đồng cảm." : "Empathy & Understanding.",
      icon: Heart,
      bg: "bg-[#e91e63]",
      shadowColor: "#00bcd4",
    },
    {
      title: isVi ? "BỀN VỮNG" : "SUSTAINABILITY",
      desc: isVi ? "Gắn kết & đồng hành." : "Bonding & Companionship.",
      icon: ShieldCheck,
      bg: "bg-[#009688]",
      shadowColor: "#ff9800",
    },
  ];

  return (
    <PageLayout
      id="about-main-card"
      pageId="about"
      pageName="About Main Card"
      title={isVi ? "Giới thiệu" : "About Me"}
      subtitle={
        isVi
          ? "“Lắng nghe là nền tảng của mọi mối quan hệ bền vững.”"
          : "“Listening is the foundation of every sustainable relationship.”"
      }
      icon={User}
      filterOptions={filterOptions}
      activeFilter={activeTab}
      onFilterChange={(tabId) => {
        playTactileSound("click");
        setActiveTab(tabId);
      }}
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300 !rounded-[20px]"
      headerClassName="!py-2 sm:!py-3 !mb-0 transition-all duration-300"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto border-slate-200/80 dark:border-slate-800 border"
    >
      <div className="w-full max-w-6xl mx-auto pb-8">
        {/* MASONRY WALL LAYOUT */}
        <div className="flex flex-col md:flex-row gap-6">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className={cn(
              "flex-1 flex flex-col gap-6",
              colIndex === 1 ? "hidden md:flex" : "",
              colIndex === 2 ? "hidden lg:flex" : ""
            )}>
              {(() => {
                // Define all possible cards
                const allCards = [
                  // 1. VISUAL GREETING
                  {
                    id: "visual-greeting",
                    tabs: ["all", "philosophy"],
                    content: (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 inline-flex items-center gap-1.5 backdrop-blur-sm">
                            <Play size={12} className="fill-current" />
                            <span>{isVi ? "Lời Chào Trực Quan" : "Visual Greeting"}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            AI Live
                          </span>
                        </div>
                        <div className="relative aspect-[4/5] w-full max-h-[400px] overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center shadow-inner border border-black/10 dark:border-white/10 group/vid">
                          <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover transition-transform duration-700 group-hover/vid:scale-105"
                            crossOrigin="anonymous"
                            src="https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4"
                          />
                          <div className="absolute inset-x-0 bottom-3 flex justify-center items-center px-3 z-20">
                            <div className="rounded-full p-1.5 flex items-center gap-2 w-full max-w-[270px] bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-white/20 shadow-2xl">
                              <button
                                type="button"
                                onClick={toggleIntro}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                              >
                                {isIntroPlaying ? (
                                  <Pause size={13} className="fill-current" />
                                ) : (
                                  <Play size={13} className="fill-current" />
                                )}
                                <span>{isIntroPlaying ? (isVi ? "Tạm dừng" : "Pause") : (isVi ? "Phát Intro" : "Play Intro")}</span>
                              </button>
                              <div className="h-4 w-px bg-slate-400/30 dark:bg-white/20" />
                              <button
                                type="button"
                                onClick={() => {
                                  playTactileSound("click");
                                  const video = videoRef.current;
                                  if (video) {
                                    video.muted = !video.muted;
                                    setIsVideoAudioOn(!video.muted);
                                  }
                                }}
                                className={cn(
                                  "p-2 rounded-full transition-all text-white shadow-xs cursor-pointer",
                                  isVideoAudioOn ? "bg-emerald-600 hover:bg-emerald-500" : "bg-rose-600 hover:bg-rose-500"
                                )}
                              >
                                {isVideoAudioOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                    className: "rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-[10px] shadow-sm backdrop-blur-md"
                  },
                  // 2. PERSONAL PROFILE
                  {
                    id: "personal-profile",
                    tabs: ["all", "philosophy"],
                    content: (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/10 inline-flex items-center gap-1.5">
                            <User size={12} />
                            {isVi ? "Hồ Sơ Cá Nhân" : "Personal Profile"}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {personalInfo.map((item, idx) => {
                            const ItemIcon = item.icon;
                            return (
                              <div key={idx} className="flex items-center justify-between gap-2 p-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-800/40 transition-colors">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-xl", item.bg, item.color)}>
                                    <ItemIcon size={14} />
                                  </div>
                                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">{item.label}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-right truncate">{item.value}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ),
                    className: "rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm backdrop-blur-md"
                  },
                  // 3. CX PHILOSOPHY
                  {
                    id: "cx-philosophy",
                    tabs: ["all", "philosophy"],
                    content: (
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="rounded-full px-3.5 py-1 text-xs font-black tracking-wide text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 inline-flex items-center gap-1.5">
                            <Zap size={13} />
                            <span>{isVi ? "Triết Lý & Tầm Nhìn CX" : "Philosophy & CX Vision"}</span>
                          </div>
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                          {isVi ? "Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng" : "Dedication & Partnership in CX"}
                        </h2>
                        <div className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                          <p>
                            {isVi ? (
                              <>Chuyên gia CX với <strong className="text-cyan-600 dark:text-cyan-400">22 năm thực chiến</strong>. Với tôi, CSKH là <strong className="text-slate-900 dark:text-white">sự đồng hành và thấu cảm sâu sắc</strong>.</>
                            ) : (
                              <>CX specialist with <strong className="text-cyan-600 dark:text-cyan-400">22 years experience</strong>. To me, Customer Care is <strong className="text-slate-900 dark:text-white">deep empathy</strong>.</>
                            )}
                          </p>
                          <p>{isVi ? "Mỗi cuộc trò chuyện là cơ hội để lắng nghe và kiến tạo trải nghiệm vượt mong đợi." : "Every talk is a chance to listen and exceed expectations."}</p>
                        </div>
                      </div>
                    ),
                    className: "rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 shadow-sm backdrop-blur-md"
                  },
                  // 4. MISSION STATEMENT
                  {
                    id: "mission-statement",
                    tabs: ["all", "mission"],
                    content: (
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-4 py-1 text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
                          <Sparkles size={14} className="text-rose-500" />
                          <span>{isVi ? "Tuyên Ngôn Sứ Mệnh" : "Mission Statement"}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                          {isVi ? "Nỗ lực kiến tạo dịch vụ chuẩn mực và tối ưu vận hành." : "Striving for benchmark service and optimized operations."}
                        </p>
                        <div onClick={() => { playTactileSound("sparkle"); showToast(isVi ? "✨ Cam kết thấu cảm!" : "✨ Empathy commitment!"); }} className="relative cursor-pointer group w-full">
                          <div className="relative rounded-2xl border-2 border-rose-500/40 bg-gradient-to-r from-rose-500/10 to-amber-500/10 px-4 py-4 shadow-lg">
                            <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-lg font-black tracking-tight text-transparent">
                              {isVi ? "“ Họ luôn được lắng nghe. ”" : "“ They are always heard. ”"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ),
                    className: "rounded-3xl border border-rose-500/30 bg-white/90 dark:bg-slate-900/90 p-5 shadow-md backdrop-blur-md"
                  },
                  // 5. IMPACT METRICS
                  {
                    id: "impact-metrics",
                    tabs: ["all", "philosophy"],
                    content: (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Award size={14} className="text-blue-500" />
                            {isVi ? "Chỉ Số Vận Hành" : "Ops Metrics"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {quickMetrics.map((metric, idx) => (
                            <div key={idx} className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 p-3 flex flex-col justify-center">
                              <div className={cn("text-lg font-black bg-gradient-to-r bg-clip-text text-transparent", metric.color)}>{metric.num}</div>
                              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{metric.unit}</div>
                              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight mt-1">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                    className: "rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm backdrop-blur-md"
                  },
                  // 6. STRATEGIC PILLARS
                  {
                    id: "strategic-pillars",
                    tabs: ["all", "philosophy"],
                    content: (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Sparkles size={14} className="text-amber-500" />
                            {isVi ? "Hệ Giá Trị Cốt Lõi" : "Core Value Pillars"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {strategicPillars.map((pillar, idx) => {
                            const PillarIcon = pillar.icon;
                            return (
                              <div
                                key={idx}
                                className={cn("group w-full rounded-xl p-4 transition-all relative duration-300 cursor-pointer border-none overflow-hidden hover:translate-x-1", pillar.bg)}
                                onMouseEnter={() => playTactileSound("click")}
                              >
                                <div className="relative z-10">
                                  <p className="text-white text-lg font-black tracking-tight">{pillar.title}</p>
                                  <p className="text-white/80 text-[11px] font-bold">{pillar.desc}</p>
                                </div>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20 text-white">
                                  <PillarIcon size={24} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ),
                    className: "rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm backdrop-blur-md"
                  }
                ];

                // Filter cards based on active tab
                const filteredCards = allCards.filter(card => card.tabs.includes(activeTab));

                // Determine column count (dynamic based on viewport)
                // In server-side, we assume 3 columns for desktop
                const numCols = 3;
                const columns: any[][] = Array.from({ length: numCols }, () => []);

                // Simplified Masonry: Distribute items round-robin (simulates joining shortest column)
                filteredCards.forEach((card, index) => {
                  columns[index % numCols].push(card);
                });

                // Get current column's cards
                const columnCards = columns[colIndex];
                
                return columnCards.map(card => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={card.className}
                  >
                    {card.content}
                  </motion.div>
                ));
              })()}
            </div>
          ))}
        </div>


        {/* CALL TO ACTION FLOATING BAR */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6 backdrop-blur-md"
        >
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Send size={22} className="translate-x-0.5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {isVi
                  ? "CÙNG TẠO RA TRẢI NGHIỆM KHÁCH HÀNG TỐT HƠN"
                  : "CREATE BETTER CUSTOMER EXPERIENCES TOGETHER"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {isVi
                  ? "Tôi luôn sẵn sàng kết nối để cùng doanh nghiệp xây dựng hệ thống Customer Experience hiệu quả, nhân văn và bền vững."
                  : "I am always ready to connect to help businesses build effective, human-centric, and sustainable Customer Experience systems."}
              </p>
            </div>
          </div>

          {/* Action Capsule Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            <a
              href="mailto:trinhan.virtual@gmail.com?subject=Liên%20hệ%20hợp%20tác%20Nguyễn%20Hùng%20Thái"
              onClick={() => playTactileSound("click")}
              className="group flex items-center gap-3 p-3.5 rounded-full bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-white transition-all duration-300 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 font-black text-xs cursor-pointer"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs group-hover:bg-white group-hover:text-blue-600 transition-colors">
                <Send size={15} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black uppercase tracking-wider">
                  {isVi ? "KẾT NỐI VỚI TÔI" : "CONNECT"}
                </span>
                <span className="text-[10px] opacity-75 font-normal">
                  {isVi ? "Trao đổi hợp tác" : "Collaborate"}
                </span>
              </div>
            </a>

            <button
              type="button"
              onClick={() => {
                playTactileSound("click");
                setActiveModal("cv");
              }}
              className="group flex items-center gap-3 p-3.5 rounded-full bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-slate-800 dark:text-white transition-all duration-300 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 font-black text-xs cursor-pointer"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white shadow-xs group-hover:bg-white group-hover:text-purple-600 transition-colors">
                <FileText size={15} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black uppercase tracking-wider">
                  {isVi ? "XEM CV" : "VIEW CV"}
                </span>
                <span className="text-[10px] opacity-75 font-normal">
                  {isVi ? "Tải xuống CV" : "Download CV"}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                playTactileSound("click");
                if (onNavigate) {
                  onNavigate("projects");
                } else {
                  setActiveModal("projects");
                }
              }}
              className="group flex items-center gap-3 p-3.5 rounded-full bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 text-slate-800 dark:text-white transition-all duration-300 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 font-black text-xs cursor-pointer"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white shadow-xs group-hover:bg-white group-hover:text-amber-600 transition-colors">
                <Briefcase size={15} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black uppercase tracking-wider">
                  {isVi ? "XEM DỰ ÁN" : "PROJECTS"}
                </span>
                <span className="text-[10px] opacity-75 font-normal">
                  {isVi ? "Dự án nổi bật" : "Featured Work"}
                </span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* LIQUID GLASS MODAL POPOVERS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl p-6 sm:p-8 max-w-lg w-full bg-white dark:bg-slate-900 shadow-2xl relative border border-slate-200 dark:border-slate-700"
            >
              <button
                type="button"
                onClick={() => {
                  playTactileSound("click");
                  setActiveModal(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition-all text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <X size={16} />
              </button>

              {activeModal === "cv" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
                    <FileText size={24} />
                    <h3 className="text-lg font-black">
                      {isVi
                        ? "Hồ Sơ Năng Lực (CV Chi Tiết)"
                        : "Executive CV Resume"}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isVi
                      ? "Hồ sơ trình bày chi tiết hành trình 22+ năm lãnh đạo vận hành CX, CSAT >99%, tối ưu SOP, xây dựng hệ thống AI CRM tại các tập đoàn lớn."
                      : "Executive resume detailing 22+ years of CX operational leadership, SOP optimization, and AI CRM implementations."}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href="mailto:trinhan.virtual@gmail.com?subject=Yêu%20cầu%20CV%20Nguyễn%20Hùng%20Thái"
                      onClick={() => {
                        playTactileSound("toast");
                        showToast(
                          isVi
                            ? "Đang mở trình gửi email yêu cầu CV..."
                            : "Opening email client to request CV..."
                        );
                      }}
                      className="flex-1 py-3 px-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send size={14} />
                      <span>{isVi ? "Gửi Yêu Cầu Tải CV" : "Request Full CV"}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                    <Briefcase size={24} />
                    <h3 className="text-lg font-black">
                      {isVi ? "Dự Án & Thành Tựu Nổi Bật" : "Featured Key Projects"}
                    </h3>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        1. AI CRM & Omnichannel Service Integration
                      </span>
                      <span className="text-[11px] opacity-80">
                        {isVi
                          ? "Tự động hóa 24/7, nâng chỉ số FCR trên 85% và rút ngắn thời gian xử lý khiếu nại."
                          : "24/7 automation, boosting FCR above 85% and shortening resolution cycle times."}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        2. Chuẩn Hóa Khung SOP Chăm Sóc Khách Hàng Quy Mô Lớn
                      </span>
                      <span className="text-[11px] opacity-80">
                        {isVi
                          ? "Thiết lập quy trình chuẩn cho hơn 8 tập đoàn lớn, duy trì CSAT > 99%."
                          : "Standardized frameworks across 8+ major corporations with sustained CSAT > 99%."}
                      </span>
                    </div>
                  </div>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal(null);
                        onNavigate("projects");
                      }}
                      className="w-full py-2.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isVi ? "Đi đến trang Dự án" : "Go to Projects page"}</span>
                      <ExternalLink size={13} />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-5 py-2.5 text-xs font-black text-slate-900 dark:text-white bg-white/90 dark:bg-slate-900/90 shadow-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-700 backdrop-blur-xl"
          >
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
