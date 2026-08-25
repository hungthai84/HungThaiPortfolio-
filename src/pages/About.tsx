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
  Mail,
  Phone,
  Globe,
  Home,
  Building,
  Calendar,
  UserCheck,
} from "lucide-react";

// LinkedIn Lucide-styled Icon
const LinkedinIcon = (props: { size?: number; className?: string }) => (
  <svg
    width={props.size || 16}
    height={props.size || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
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
  const [activeCardTab, setActiveCardTab] = useState<"intro" | "profile">("intro");
  const [isIntroPlaying, setIsIntroPlaying] = useState<boolean>(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<"cv" | "projects" | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tabIntroRef = useRef<HTMLButtonElement | null>(null);
  const tabProfileRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDownTabs = (e: React.KeyboardEvent, currentTab: "intro" | "profile") => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextTab = currentTab === "intro" ? "profile" : "intro";
      setActiveCardTab(nextTab);
      playTactileSound("click");
      if (nextTab === "intro") tabIntroRef.current?.focus();
      else tabProfileRef.current?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevTab = currentTab === "intro" ? "profile" : "intro";
      setActiveCardTab(prevTab);
      playTactileSound("click");
      if (prevTab === "intro") tabIntroRef.current?.focus();
      else tabProfileRef.current?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveCardTab("intro");
      playTactileSound("click");
      tabIntroRef.current?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveCardTab("profile");
      playTactileSound("click");
      tabProfileRef.current?.focus();
    }
  };

  const videoSets = [
    {
      idle: "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4",
      intro: "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4",
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

  const profileDetails = [
    {
      label: isVi ? "Giới tính" : "Gender",
      value: isVi ? "Nam giới" : "Male",
      icon: User,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: isVi ? "Dân tộc" : "Ethnicity",
      value: "Kinh",
      icon: Users,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      label: isVi ? "Tình trạng" : "Marital Status",
      value: isVi ? "Độc thân" : "Single",
      icon: Heart,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      label: isVi ? "Sinh nhật" : "Date of Birth",
      value: "22/06/1984",
      icon: Cake,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      label: isVi ? "Tạm trú" : "Temp Residence",
      value: "Q7, Hồ Chí Minh",
      icon: Building,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      label: isVi ? "Cư trú" : "Permanent Residence",
      value: "Mỹ Tho, Tiền Giang",
      icon: Home,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Email",
      value: "hungthai84@gmail.com",
      link: "mailto:hungthai84@gmail.com",
      icon: Mail,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
      isLink: true,
    },
    {
      label: isVi ? "Điện thoại Zalo" : "Phone / Zalo",
      value: "0909097882",
      link: "https://zalo.me/0909097882",
      icon: Phone,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/20",
      isLink: true,
    },
    {
      label: "Website",
      value: "nguyenhungthai.powerservice.one",
      link: "https://nguyenhungthai.powerservice.one/",
      icon: Globe,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      isLink: true,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/hungthai84",
      link: "https://www.linkedin.com/in/hungthai84/",
      icon: LinkedinIcon,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20",
      isLink: true,
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
    { id: "all", labelVi: "Tất Cả", labelEn: "All" },
    { id: "professional", labelVi: "Chuyên Môn", labelEn: "Professional" },
    { id: "personal", labelVi: "Đời Sống Cá Nhân", labelEn: "Personal Life" },
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
      rootClassName="w-full max-w-full relative flex flex-1 flex-col !bg-transparent !border-none !rounded-none shadow-none transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 !mb-0 transition-all duration-300"
      className="custom-scrollbar !h-[750px] !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent !border-none"
    >
      <div className="w-full max-w-6xl mx-auto pb-8">
        {/* TOP SECTION: 2-COLUMN CARDS GRID (Lời Chào Trực Quan & Giới thiệu) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full mb-8">
          {/* 1. LỜI CHÀO TRỰC QUAN (VISUAL GREETING) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-3xl border border-white/30 dark:border-white/10 bg-white/20 dark:bg-slate-900/20 p-5 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300 h-full"
          >
            <div className="flex flex-col flex-1 h-full space-y-3">
              <div className="flex items-center justify-between gap-2 shrink-0">
                <span className="rounded-full px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 inline-flex items-center gap-1.5 backdrop-blur-sm">
                  <Play size={12} className="fill-current" />
                  <span>{isVi ? "Lời Chào Trực Quan" : "Visual Greeting"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  AI Live Avatar
                </span>
              </div>
              <div className="relative flex-1 w-full min-h-[420px] sm:min-h-[480px] h-full overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center shadow-inner border border-black/10 dark:border-white/10 group/vid">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover/vid:scale-105"
                  crossOrigin="anonymous"
                  src="https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4"
                />

                {/* UNIFIED HOMEPAGE-STYLE VIDEO PLAY/PAUSE BUTTON */}
                <div className="absolute inset-x-0 bottom-3 flex justify-center items-center px-2 z-20">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    id="about-play-intro-btn"
                    type="button"
                    onClick={toggleIntro}
                    className="flex w-[270px] sm:w-[281px] h-[51px] mx-auto cursor-pointer items-center justify-between px-3.5 py-2 rounded-full border-2 border-white/60 dark:border-white/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_4px_25px_rgba(99,102,241,0.5)] backdrop-blur-xl transition-all duration-300 hover:from-blue-500 hover:to-violet-500 text-xs font-black text-white sm:text-sm"
                    title={
                      isIntroPlaying
                        ? isVi
                          ? "Dừng video tự giới thiệu"
                          : "Stop Intro Video"
                        : isVi
                          ? "Xem video giới thiệu"
                          : "Watch Intro Video"
                    }
                  >
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-md">
                      {isIntroPlaying ? (
                        <Pause size={14} className="fill-indigo-600" />
                      ) : (
                        <Play size={14} className="translate-x-0.5 fill-indigo-600" />
                      )}
                    </div>
                    <span>
                      {isIntroPlaying
                        ? isVi
                          ? "Dừng video giới thiệu"
                          : "Stop Intro"
                        : isVi
                          ? "Xem video giới thiệu"
                          : "Watch Intro"}
                    </span>
                    {!isIntroPlaying && (
                      <Sparkles
                        size={14}
                        className="shrink-0 animate-bounce text-amber-300"
                      />
                    )}

                    {/* Integrated Divider and Audio Toggle */}
                    <div className="mx-1 h-4 w-px shrink-0 bg-white/20" />

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        playTactileSound("click");
                        const video = videoRef.current;
                        if (video) {
                          video.muted = !video.muted;
                          setIsVideoAudioOn(!video.muted);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          playTactileSound("click");
                          const video = videoRef.current;
                          if (video) {
                            video.muted = !video.muted;
                            setIsVideoAudioOn(!video.muted);
                          }
                        }
                      }}
                      className={cn(
                        "p-1.5 rounded-full transition-all text-white cursor-pointer hover:scale-110",
                        isVideoAudioOn ? "bg-emerald-500/80" : "bg-white/20"
                      )}
                      title={
                        isVideoAudioOn
                          ? isVi
                            ? "Tắt âm thanh"
                            : "Mute"
                          : isVi
                            ? "Bật âm thanh"
                            : "Unmute"
                      }
                    >
                      {isVideoAudioOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2 & 3. TABBED CARD CONTAINER: THẺ GIỚI THIỆU & THẺ THÔNG TIN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between rounded-3xl border border-white/30 dark:border-white/10 bg-white/20 dark:bg-slate-900/20 p-5 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300 min-h-[480px]"
          >
            {/* ACCESSIBLE TABLIST HEADER */}
            <div
              role="tablist"
              aria-label={isVi ? "Các thẻ thông tin về Nguyễn Hùng Thái" : "Profile and Introduction Tabs"}
              className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/10 dark:bg-black/30 border border-black/10 dark:border-white/10 mb-5 backdrop-blur-md shrink-0"
            >
              <button
                ref={tabIntroRef}
                id="tab-intro"
                type="button"
                role="tab"
                aria-selected={activeCardTab === "intro"}
                aria-controls="panel-intro"
                tabIndex={activeCardTab === "intro" ? 0 : -1}
                onClick={() => {
                  playTactileSound("click");
                  setActiveCardTab("intro");
                }}
                onKeyDown={(e) => handleKeyDownTabs(e, "intro")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 cursor-pointer",
                  activeCardTab === "intro"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-white/10"
                )}
              >
                <Sparkles size={15} className={activeCardTab === "intro" ? "text-amber-100" : "text-amber-500"} />
                <span>{isVi ? "Thẻ Giới thiệu" : "Introduction Card"}</span>
              </button>

              <button
                ref={tabProfileRef}
                id="tab-profile"
                type="button"
                role="tab"
                aria-selected={activeCardTab === "profile"}
                aria-controls="panel-profile"
                tabIndex={activeCardTab === "profile" ? 0 : -1}
                onClick={() => {
                  playTactileSound("click");
                  setActiveCardTab("profile");
                }}
                onKeyDown={(e) => handleKeyDownTabs(e, "profile")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer",
                  activeCardTab === "profile"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-white/10"
                )}
              >
                <UserCheck size={15} className={activeCardTab === "profile" ? "text-indigo-100" : "text-indigo-500"} />
                <span>{isVi ? "Thẻ Thông Tin" : "Personal Profile Card"}</span>
              </button>
            </div>

            {/* SHARED TABPANELS CONTAINER */}
            <div className="flex-1 flex flex-col justify-between min-h-0">
              <AnimatePresence mode="wait">
                {activeCardTab === "intro" && (
                  <motion.div
                    key="panel-intro"
                    id="panel-intro"
                    role="tabpanel"
                    aria-labelledby="tab-intro"
                    tabIndex={0}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between h-full space-y-4 focus:outline-hidden focus:ring-1 focus:ring-amber-500/30 rounded-2xl"
                  >
                    <div className="space-y-4">
                      {/* Header Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 inline-flex items-center gap-1.5 backdrop-blur-sm">
                          <Sparkles size={13} className="text-amber-500" />
                          <span>{isVi ? "Giới thiệu" : "Introduction"}</span>
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          22+ {isVi ? "Năm Thực Chiến" : "Years Experience"}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                        {isVi ? "Nguyễn Hùng Thái — Chuyên Gia Dịch Vụ Khách Hàng" : "Nguyễn Hùng Thái — Customer Experience Specialist"}
                      </h2>

                      {/* Text Body */}
                      <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                        <p>
                          {isVi
                            ? "Một chuyên gia dịch vụ khách hàng với hơn 22 năm kinh nghiệm thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi."
                            : "A customer service expert with over 22 years of hands-on experience. To me, Customer Care is not just service, but partnership. Every conversation, every moment, no matter how small, is a valuable opportunity: to listen, to understand, and to create experiences that exceed expectations."}
                        </p>

                        <p>
                          {isVi
                            ? "Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ sự tận tâm kịp thời và đồng cảm chân thành. Trong suốt sự nghiệp, tôi đã trực tiếp thiết kế và tối ưu hóa hàng chục quy trình, hệ thống Chăm Sóc Khách Hàng, luôn đặt trên nền tảng ba giá trị cốt lõi:"
                            : "I believe satisfaction does not come from absolute perfection, but from timely dedication and genuine empathy. Throughout my career, I have directly designed and optimized dozens of Customer Care processes and systems, always built on three core values:"}
                        </p>

                        {/* 3 Core Value Pills */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 py-1">
                          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/20 text-blue-900 dark:text-blue-100 font-black text-xs shadow-xs">
                            <Zap size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
                            <span>{isVi ? "Hiệu quả" : "Efficiency"}</span>
                          </div>
                          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 dark:bg-rose-500/20 text-rose-900 dark:text-rose-100 font-black text-xs shadow-xs">
                            <Heart size={15} className="text-rose-600 dark:text-rose-400 shrink-0" />
                            <span>{isVi ? "Nhân văn" : "Humanity"}</span>
                          </div>
                          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-100 font-black text-xs shadow-xs">
                            <ShieldCheck size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{isVi ? "Bền vững" : "Sustainability"}</span>
                          </div>
                        </div>

                        <p>
                          {isVi
                            ? "Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi: Họ luôn được lắng nghe."
                            : "I constantly strive to deliver high-quality products and services at a reasonable cost. Above all, so that every customer feels one simple yet core truth: They are always heard."}
                        </p>
                      </div>
                    </div>

                    {/* Highlight Quote Box */}
                    <div
                      onClick={() => {
                        playTactileSound("sparkle");
                        showToast(isVi ? "✨ Cam kết thấu cảm: Họ luôn được lắng nghe!" : "✨ Empathy commitment: They are always heard!");
                      }}
                      className="mt-4 cursor-pointer group rounded-2xl border-2 border-rose-500/40 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 p-3.5 text-center shadow-md transition-transform hover:scale-[1.01]"
                    >
                      <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 dark:from-rose-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-base sm:text-lg font-black tracking-tight text-transparent">
                        {isVi ? "“ Họ luôn được lắng nghe. ”" : "“ They are always heard. ”"}
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeCardTab === "profile" && (
                  <motion.div
                    key="panel-profile"
                    id="panel-profile"
                    role="tabpanel"
                    aria-labelledby="tab-profile"
                    tabIndex={0}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between h-full space-y-4 focus:outline-hidden focus:ring-1 focus:ring-indigo-500/30 rounded-2xl"
                  >
                    <div className="space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span className="rounded-full px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 inline-flex items-center gap-1.5 backdrop-blur-sm">
                            <UserCheck size={13} className="text-indigo-500" />
                            <span>{isVi ? "Thẻ Thông Tin" : "Personal Profile Card"}</span>
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                            {isVi ? "Thông Tin Cá Nhân & Liên Hệ" : "Personal Info & Contact"}
                          </h3>
                        </div>
                        <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-800/40 px-3 py-1 rounded-full border border-black/5 dark:border-white/5">
                          10 {isVi ? "Mục chi tiết" : "Profile Details"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {profileDetails.map((item, idx) => {
                          const ItemIcon = item.icon;
                          const content = (
                            <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-800/30 transition-all duration-200 hover:bg-white/50 dark:hover:bg-slate-800/50 h-full">
                              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-xs", item.bg, item.color)}>
                                <ItemIcon size={16} />
                              </div>
                              <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{item.label}</span>
                                <span className={cn(
                                  "text-xs font-black truncate mt-0.5",
                                  item.isLink ? "text-blue-600 dark:text-blue-400 underline-offset-2 hover:underline" : "text-slate-900 dark:text-slate-100"
                                )}>
                                  {item.value}
                                </span>
                              </div>
                              {item.isLink && <ExternalLink size={12} className="text-slate-400 shrink-0 opacity-70" />}
                            </div>
                          );

                          if (item.isLink && item.link) {
                            return (
                              <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => playTactileSound("click")}
                                className="block h-full group"
                              >
                                {content}
                              </a>
                            );
                          }

                          return <div key={idx} className="h-full">{content}</div>;
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>



        {/* CALL TO ACTION BANNER: CÙNG TẠO RA TRẢI NGHIỆM KHÁCH HÀNG TỐT HƠN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mt-10 overflow-hidden rounded-3xl border border-indigo-400/40 dark:border-indigo-500/30 bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl text-white"
        >
          {/* Decorative Glow & Watermark Effects */}
          <div className="absolute -right-12 -bottom-12 opacity-20 pointer-events-none text-indigo-300">
            <Sparkles size={240} />
          </div>
          <div className="absolute -left-12 -top-12 opacity-15 pointer-events-none text-purple-300">
            <Heart size={200} />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 w-full lg:w-auto text-center sm:text-left">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white border border-white/40 shadow-xl backdrop-blur-md">
                <HeartHandshake size={36} className="animate-pulse text-amber-300" />
              </div>
              <div className="space-y-1.5">
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
                <p className="text-xs sm:text-sm text-indigo-100/90 font-medium max-w-2xl leading-relaxed">
                  {isVi
                    ? "Tôi luôn sẵn sàng kết nối để cùng doanh nghiệp xây dựng hệ thống Customer Experience hiệu quả, nhân văn và bền vững."
                    : "I am always ready to connect to help businesses build effective, human-centric, and sustainable Customer Experience systems."}
                </p>
              </div>
            </div>

            {/* Action Capsule Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
              <a
                href="mailto:trinhan.virtual@gmail.com?subject=Liên%20hệ%20hợp%20tác%20Nguyễn%20Hùng%20Thái"
                onClick={() => playTactileSound("click")}
                className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/15 hover:bg-white text-white hover:text-indigo-950 transition-all duration-300 shadow-lg border border-white/30 active:scale-95 font-black text-xs cursor-pointer backdrop-blur-md"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Send size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black uppercase tracking-wider">
                    {isVi ? "KẾT NỐI VỚI TÔI" : "CONNECT"}
                  </span>
                  <span className="text-[10px] opacity-80 font-normal">
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
                className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/15 hover:bg-white text-white hover:text-purple-950 transition-all duration-300 shadow-lg border border-white/30 active:scale-95 font-black text-xs cursor-pointer backdrop-blur-md"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <FileText size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black uppercase tracking-wider">
                    {isVi ? "XEM CV" : "VIEW CV"}
                  </span>
                  <span className="text-[10px] opacity-80 font-normal">
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
                className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/15 hover:bg-white text-white hover:text-amber-950 transition-all duration-300 shadow-lg border border-white/30 active:scale-95 font-black text-xs cursor-pointer backdrop-blur-md"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Briefcase size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black uppercase tracking-wider">
                    {isVi ? "XEM DỰ ÁN" : "PROJECTS"}
                  </span>
                  <span className="text-[10px] opacity-80 font-normal">
                    {isVi ? "Dự án nổi bật" : "Featured Work"}
                  </span>
                </div>
              </button>
            </div>
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
