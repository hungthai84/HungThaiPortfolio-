import { motion, AnimatePresence } from "motion/react";
import {
  Volume2,
  VolumeX,
  X,
  Play,
  Pause,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Smile,
  Brain,
  Flame,
  User,
  CloudSun,
  Palette,
  Sun,
  Moon,
  Laptop,
  GripHorizontal,
  GripVertical,
  RotateCcw,
  Smartphone,
  Monitor,
  Check,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { logBubbleInteraction } from "../lib/bubbleLogging";
import { PageLayout } from "../components/PageLayout";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { TopNavActionStack } from "../components/TopNavActionStack";
import {
  getDefaultVietnameseVoice,
  getDefaultEnglishVoice,
} from "../utils/speechUtils";

const IDLE_1_URL =
  "https://cdn.scena.ai/project/9741/73e39b037268a364ed0bac9563119e5c5ea6d6294e8b4a50052653303b75c52f.mp4";
const INTRO_1_URL =
  "https://cdn.scena.ai/project/9306/95e20a75c4af34a76d83b97ffc7ddc0b099bd815eebaad65a9ceef3c73fa19dd.mp4";

const IDLE_2_URL =
  "https://cdn.scena.ai/project/10112/bd20d7cafa2d764146ab362cf1c4473ded1f79ae87b789f0ba689056ca1b2904.mp4";
const INTRO_2_URL =
  "https://cdn.scena.ai/project/8606/87d892c1c37f70cfae99aa55e5888f93ea6b7015050fe44e5d1f54418f0b06b9.mp4";

const TRANSITION_1_TO_2_URL =
  "https://cdn.scena.ai/project/10124/2c5df2cd27cd1bcaa6fdf3b3aca254988d34a2933c461281b1332dabd1d1c89b.mp4";
const TRANSITION_2_TO_1_URL =
  "https://cdn.scena.ai/project/10124/a2f3d2280da33e96bd8c66c95d1192f2fe192c1fec1357b24bf23c9a85494e22.mp4";

type VideoState =
  | "idle_1"
  | "intro_1"
  | "transition_1_to_2"
  | "idle_2"
  | "intro_2"
  | "transition_2_to_1";

export const EXPRESSIONS = [
  {
    id: "chao_hoi",
    labelVi: "Chào hỏi",
    labelEn: "Greeting",
    icon: Sparkles,
    textVi:
      "Xin chào ! Tôi là Nguyễn Hùng Thái . Chúc bạn có những trải nghiệm tuyệt vời tại đây nhé !!!",
    textEn:
      "Hello ! I am Nguyễn Hùng Thái . Wish you a wonderful experience here !!!",
  },
  {
    id: "vui_ve",
    labelVi: "Vui vẻ",
    labelEn: "Happy",
    icon: Smile,
    textVi: "Thái đang rất vui được chia sẻ hành trình 22 năm CX cùng bạn! ✨",
    textEn: "Thái is delighted to share his 22-year CX journey with you! ✨",
  },
  {
    id: "suy_tu",
    labelVi: "Suy tư",
    labelEn: "Thoughtful",
    icon: Brain,
    textVi: "Làm thế nào để tối ưu hóa 100% mức độ hài lòng của khách hàng? 🤔",
    textEn: "How do we optimize customer satisfaction to 100%? 🤔",
  },
  {
    id: "nhiet_huyet",
    labelVi: "Nhiệt huyết",
    labelEn: "Passionate",
    icon: Flame,
    textVi: "Vận hành xuất sắc và tận tâm phục vụ là tôn chỉ của tôi! 🔥",
    textEn: "Operational excellence and dedicated care are my mottos! 🔥",
  },
];

export const HOME_SELECTION_TOPICS = [
  {
    id: "cat-1",
    labelVi: "I. Giới thiệu cá nhân",
    labelEn: "I. Personal Introduction",
    textVi:
      "Xin chào ! Tôi là Nguyễn Hùng Thái . Trưởng phòng Chăm sóc Khách hàng với 22+ năm kinh nghiệm trong vận hành và quản trị dịch vụ khách hàng chuyên nghiệp.",
    textEn:
      "Hello ! I am Nguyễn Hùng Thái . Customer Service Manager with 22+ years of experience in CS operations & management.",
  },
  {
    id: "cat-2",
    labelVi: "II. Tầm nhìn & Chiến lược",
    labelEn: "II. Vision & Strategy",
    textVi:
      "Tầm nhìn chiến lược: Nâng tầm trải nghiệm khách hàng (CX) làm trung tâm giá trị doanh nghiệp. Tối ưu hóa điểm chạm & tự động hóa với kiến trúc CRM.",
    textEn:
      "Strategic vision: Elevate Customer Experience (CX) as core business value. Touchpoint optimization & automated CRM architecture.",
  },
  {
    id: "cat-3",
    labelVi: "III. Quản lý & Đào tạo",
    labelEn: "III. Management & Training",
    textVi:
      "Quản trị đội ngũ & Đào tạo nhân sự: Xây dựng văn hóa dịch vụ tận tâm, thiết kế khung năng lực & lộ trình phát triển cho đội ngũ CS.",
    textEn:
      "Team Management & Training: Building dedicated service culture, competency frameworks & career growth paths for CS teams.",
  },
  {
    id: "cat-4",
    labelVi: "IV. Tình huống & Khủng hoảng",
    labelEn: "IV. Crisis & Case Management",
    textVi:
      "Xử lý tình huống & Khủng hoảng dịch vụ: Ứng dụng mô hình STAR, chủ động kiểm soát rủi ro, bảo vệ uy tín thương hiệu & biến sự cố thành niềm tin.",
    textEn:
      "Crisis & Case Management: Applying STAR model, proactive risk control, brand reputation protection & turning incidents into trust.",
  },
  {
    id: "cat-5",
    labelVi: "V. Công nghệ & Quy trình",
    labelEn: "V. Technology & Process",
    textVi:
      "Công nghệ & Quy trình vận hành: Triển khai Omnichannel CRM, AI Chatbot tự động hóa, chuẩn hóa SLA/SOP gia tăng hiệu suất vận hành.",
    textEn:
      "Technology & Process: Deploying Omnichannel CRM, AI Chatbot automation, standardizing SLA/SOP to boost operational efficiency.",
  },
  {
    id: "cat-6",
    labelVi: "VI. Văn hóa & Thấu cảm",
    labelEn: "VI. Culture & Empathy",
    textVi:
      "Văn hóa & Thấu cảm dịch vụ: Lắng nghe chân thành, gia tăng thấu cảm với khách hàng, nuôi dưỡng tinh thần phụng sự từ trái tim.",
    textEn:
      "Culture & Empathy: Sincere listening, enhancing empathy with customers, nurturing a servant heart mindset.",
  },
  {
    id: "cat-7",
    labelVi: "VII. Tổ chức & Phối hợp",
    labelEn: "VII. Organization & Alignment",
    textVi:
      "Tổ chức & Phối hợp liên phòng ban: Kết nối liền mạch giữa CS, Sales, Product & Tech, đảm bảo trải nghiệm khách hàng nhất quán.",
    textEn:
      "Cross-departmental Alignment: Seamless connection between CS, Sales, Product & Tech for a consistent customer journey.",
  },
  {
    id: "cat-8",
    labelVi: "VIII. Lãnh đạo & Tư duy khác biệt",
    labelEn: "VIII. Leadership & Innovation",
    textVi:
      "Lãnh đạo & Tư duy đột phá: Tư duy dịch vụ khác biệt, dám thay đổi, dẫn dắt đội ngũ vượt qua thử thách và kiến tạo giá trị bền vững.",
    textEn:
      "Leadership & Innovation: Distinctive service mindset, bold change leadership, guiding teams through challenges to create lasting value.",
  },
];

interface HomeProps {
  uiStyle?: "glass" | "neumorphism" | "soft";
  onNavigate?: (page: any) => void;
}

export function Home({ uiStyle = "glass", onNavigate }: HomeProps) {
  const { language, t } = useLanguage();
  const [videoState, setVideoState] = useState<VideoState>("idle_1");
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [isResponsive, setIsResponsive] = useState<boolean>(() => {
    return localStorage.getItem("app_is_responsive") !== "false";
  });

  useEffect(() => {
    const handleToggleResponsive = () => {
      setIsResponsive((prev) => !prev);
    };
    window.addEventListener("app-toggle-responsive", handleToggleResponsive);
    return () => window.removeEventListener("app-toggle-responsive", handleToggleResponsive);
  }, []);

  const [currentThemeMode, setCurrentThemeMode] = useState<"light" | "dark" | "system">(() => {
    return (localStorage.getItem("app_theme_mode") as any) || "system";
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark" | "system">;
      if (customEvent.detail) {
        setCurrentThemeMode(customEvent.detail);
      }
    };
    window.addEventListener("app-theme-mode-synced", handleSync);
    return () => window.removeEventListener("app-theme-mode-synced", handleSync);
  }, []);

  const handleSelectThemeMode = (mode: "light" | "dark" | "system") => {
    playUiSound("click");
    setCurrentThemeMode(mode);
    const event = new CustomEvent("app-set-theme-mode", { detail: mode });
    window.dispatchEvent(event);
    showToast(
      language === "vi"
        ? `Đã kích hoạt Giao diện ${
            mode === "light" ? "Sáng tinh tế ☀️" : mode === "dark" ? "Tối cao cấp 🌙" : "Đồng bộ Hệ thống 💻"
          }`
        : `Switched to ${
            mode === "light" ? "Light theme ☀️" : mode === "dark" ? "Dark theme 🌙" : "System theme 💻"
          }`
    );
  };

  const handleToggleThemeMode = () => {
    const modes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];
    const nextIndex = (modes.indexOf(currentThemeMode) + 1) % modes.length;
    handleSelectThemeMode(modes[nextIndex]);
  };

  useEffect(() => {
    // Log the initial welcome bubble appearance
    logBubbleInteraction("appearance", "initial_welcome_show", "chao_hoi");
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeak = () => {
    playUiSound("click");
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const introText =
      language === "vi"
        ? "Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn hai mươi hai năm kinh nghiệm trong lĩnh vực xây dựng, vận hành và phát triển dịch vụ khách hàng. Châm ngôn của tôi là: Tận tâm chăm sóc, vận hành hiệu quả! Nâng tầm trải nghiệm khách hàng với kiến trúc CRM và AI Chatbot tự động hóa. Rất hân hạnh được đồng hành và chia sẻ cùng bạn!"
        : "I am Nguyen Hung Thai, Customer Service Director with over twenty-two years of hands-on experience in building, operating, and developing customer services. My motto is: Dedicated care, efficient operations! Elevating customer experience with automated CRM and AI Chatbot architecture. It's a great pleasure to support and connect with you!";

    const utterance = new SpeechSynthesisUtterance(introText);
    utterance.lang = language === "vi" ? "vi-VN" : "en-US";
    utterance.rate = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const isVi = language === "vi";
    const savedVoiceUri =
      localStorage.getItem(isVi ? "app_ai_voice_vi" : "app_ai_voice_en") || "";

    let matchedVoice = voices.find((v) => v.voiceURI === savedVoiceUri);
    if (!matchedVoice) {
      matchedVoice = isVi
        ? getDefaultVietnameseVoice(voices)
        : getDefaultEnglishVoice(voices);
    }
    if (!matchedVoice) {
      matchedVoice = voices.find((v) =>
        v.lang.toLowerCase().includes(isVi ? "vi" : "en"),
      );
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    try {
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const renderSpeechBubble = (isMobilePos: boolean) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        id="intro-speech-bubble"
        data-name="Nội dung giới thiệu Nguyễn Hùng Thái"
        style={{ width: "350px", height: "200px" }}
        className={cn(
          "group magic-card glass-card relative z-30 flex w-[350px] h-[200px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border-2 border-solid border-[var(--border)] bg-[var(--card)] !p-[15px] !m-0 text-[var(--text-primary)] shadow-xl backdrop-blur-none transition-all duration-300 hover:border-indigo-500/40 hover:shadow-2xl",
          isMobilePos ? "max-w-[calc(100vw-32px)]" : ""
        )}
      >
        {/* Soft background glow & watermark */}
        <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-4 -bottom-4 text-indigo-500/10 dark:text-indigo-400/15 transition-transform duration-500 group-hover:scale-110">
          <Sparkles size={100} />
        </div>

        <div className="relative flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-200/80 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white shadow-md dark:border-white/20">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-[10px] font-black tracking-widest text-[var(--muted)] uppercase">
                {language === "vi" ? "Xin chào! Tôi là" : "Hello! I am"}
              </span>
              <span className="truncate bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-[25px] font-black leading-tight text-transparent dark:from-indigo-400 dark:to-purple-400">
                Nguyễn Hùng Thái
              </span>
            </div>
          </div>
        </div>

        <div className="relative space-y-1 py-1 text-left">
          <p className="text-[13px] leading-snug font-bold text-[var(--text-primary)]">
            {language === "vi"
              ? "Chào mừng bạn đến với Portfolio của tôi ! 👋"
              : "Welcome to my Portfolio ! 👋"}
          </p>
          <p className="text-[12px] leading-snug font-medium text-[var(--text-secondary)]">
            {language === "vi"
              ? "Chúc bạn một ngày làm việc tràn đầy năng lượng !"
              : "Wishing you an energetic and productive day !"}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="relative flex flex-col gap-2 border-t border-[var(--border)] pt-2.5">
            {/* Unified Premium Play/Pause Video Button matching Interview style */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              id="play-intro-video-btn"
              data-name="Nút Phát video Giới thiệu (Play Intro Video Button)"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                logBubbleInteraction(
                  "click",
                  isIntro ? "stop_intro_video" : "play_intro_video",
                  "chao_hoi",
                );
                if (isIntro) {
                  handleCancelIntro();
                } else {
                  handlePlayIntroVideo();
                }
              }}
              className="flex w-full h-[51px] cursor-pointer items-center justify-between px-3.5 py-2 rounded-full border-2 border-indigo-400/80 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_25px_rgba(99,102,241,0.6)] backdrop-blur-none transition-all duration-300 hover:from-blue-500 hover:to-violet-500 text-xs font-black text-white sm:text-sm"
              title={
                isIntro
                  ? language === "vi"
                    ? "Dừng video tự giới thiệu"
                    : "Stop Intro Video"
                  : language === "vi"
                    ? "Xem video giới thiệu"
                    : "Watch Intro Video"
              }
            >
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-md">
                {isIntro ? (
                  <Pause size={14} className="fill-indigo-600" />
                ) : (
                  <Play
                    size={14}
                    className="translate-x-0.5 fill-indigo-600"
                  />
                )}
              </div>
              <span className="truncate flex-1 text-center">
                {isIntro
                  ? language === "vi"
                    ? "Dừng video giới thiệu"
                    : "Stop Intro"
                  : language === "vi"
                    ? "Xem video giới thiệu"
                    : "Watch Intro"}
              </span>
              {!isIntro && (
                <Sparkles
                  size={14}
                  className="shrink-0 animate-bounce text-amber-300"
                />
              )}

              {/* Integrated Divider and Audio Button */}
              <div className="mx-1 h-4 w-px shrink-0 bg-white/20" />

              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  playUiSound("click");
                  const nextAudio = !isVideoAudioOn;
                  setIsVideoAudioOn(nextAudio);
                  if (videoRef.current) {
                    videoRef.current.muted = !nextAudio;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    playUiSound("click");
                    const nextAudio = !isVideoAudioOn;
                    setIsVideoAudioOn(nextAudio);
                    if (videoRef.current) {
                      videoRef.current.muted = !nextAudio;
                    }
                  }
                }}
                title={
                  isVideoAudioOn
                    ? language === "vi"
                      ? "Tắt âm thanh"
                      : "Mute Audio"
                    : language === "vi"
                      ? "Bật âm thanh"
                      : "Unmute Audio"
                }
                className={cn(
                  "flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all text-white hover:bg-white/10 active:scale-90",
                  isVideoAudioOn ? "bg-white/15" : "bg-rose-500/80"
                )}
              >
                {isVideoAudioOn ? (
                  <Volume2 size={13} className="animate-pulse" />
                ) : (
                  <VolumeX size={13} />
                )}
              </div>
            </motion.button>
        </div>
      </motion.div>
    );
  };

  const getVideoUrl = (state: VideoState) => {
    switch (state) {
      case "idle_1":
        return IDLE_1_URL;
      case "intro_1":
        return INTRO_1_URL;
      case "transition_1_to_2":
        return TRANSITION_1_TO_2_URL;
      case "idle_2":
        return IDLE_2_URL;
      case "intro_2":
        return INTRO_2_URL;
      case "transition_2_to_1":
        return TRANSITION_2_TO_1_URL;
    }
  };

  const changeVideoState = (state: VideoState, playSound = false) => {
    if (playSound) playUiSound("click");
    setVideoState(state);

    // For intro and transition, force audio on
    let shouldAudioBeOn = isVideoAudioOn;
    if (state.startsWith("intro_") || state.startsWith("transition_")) {
      shouldAudioBeOn = true;
      setIsVideoAudioOn(true);
    }

    if (videoRef.current) {
      videoRef.current.src = getVideoUrl(state);
      videoRef.current.currentTime = 0;
      videoRef.current.muted = !shouldAudioBeOn;
      videoRef.current.loop = state.startsWith("idle_");
      videoRef.current.play().catch(() => {});
    }
  };

  const handlePlayIntroVideo = () => {
    if (videoState === "idle_2" || videoState === "intro_2") {
      changeVideoState("intro_2", true);
    } else {
      changeVideoState("intro_1", true);
    }
  };

  const handleCancelIntro = () => {
    playUiSound("reset");
    if (videoState === "intro_1") {
      changeVideoState("idle_1");
    } else if (videoState === "intro_2") {
      changeVideoState("idle_2");
    }
  };

  const handleVideoEnded = () => {
    if (videoState === "intro_1" || videoState === "transition_2_to_1") {
      changeVideoState("idle_1");
    } else if (videoState === "intro_2" || videoState === "transition_1_to_2") {
      changeVideoState("idle_2");
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoAudioOn;
    }
  }, [isVideoAudioOn]);

  const isTransitioning = videoState.startsWith("transition_");
  const isIntro = videoState.startsWith("intro_");
  const hideMainUI = isTransitioning || isIntro;

  return (
    <PageLayout
      id="home-main-card"
      rootClassName="w-full max-w-full h-full min-h-full !p-0 !border-none !rounded-none relative flex flex-1 flex-col !bg-transparent shadow-none transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="no-scrollbar custom-scrollbar !h-full !min-h-full w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent text-slate-900 dark:text-slate-100 flex flex-col"
      pageId="home"
      pageName="Home Main Card"
      title={
        language === "vi"
          ? "Hành trình phát triển Năng lực Cá nhân & Bản lĩnh"
          : "Personal Biography & Core Executive Competence"
      }
      subtitle={
        language === "vi"
          ? "Thông tin tổng quan về hành trình và năng lực cá nhân."
          : "Overview information about the personal journey and executive competencies."
      }
      icon={User}
      background={
        <div className="h-full w-full overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            autoPlay
            muted={!isVideoAudioOn}
            playsInline
            loop={videoState.startsWith("idle_")}
            src={getVideoUrl(videoState)}
            onEnded={handleVideoEnded}
            className="h-full w-full rounded-2xl object-cover transition-all duration-700"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-transparent" />
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 h-[705px] p-0">
      {/* FLOATING DRAGGABLE RESPONSIVE TOGGLE BUTTON (CIRCULAR GLASS) - ON TOP OF ALL LAYERS */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.08}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed top-6 left-6 z-[999999] flex h-12 w-12 cursor-grab items-center justify-center rounded-full border border-white/40 bg-white/75 p-0 text-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-none transition-shadow select-none hover:shadow-amber-500/30 active:cursor-grabbing dark:border-white/15 dark:bg-slate-900/75 dark:text-slate-100"
        title={
          language === "vi"
            ? isResponsive
              ? "Giao diện: Co giãn (Fluid) - Nhấn để chuyển Cố định, Kéo để di chuyển"
              : "Giao diện: Cố định (Fixed) - Nhấn để chuyển Co giãn, Kéo để di chuyển"
            : isResponsive
              ? "Layout: Fluid - Click to toggle, Drag to move"
              : "Layout: Fixed - Click to toggle, Drag to move"
        }
      >
        <button
          id="sidebar-toggle-responsive-btn"
          data-name="Nút co giãn thiết bị nổi (Floating Toggle Responsive Button)"
          onClick={(e) => {
            e.stopPropagation();
            playUiSound("toggle");
            window.dispatchEvent(new CustomEvent("app-toggle-responsive"));
          }}
          className="flex h-full w-full cursor-pointer items-center justify-center rounded-full text-amber-600 transition-colors hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
        >
          {isResponsive ? (
            <Smartphone size={20} className="shrink-0 transition-transform hover:scale-110" />
          ) : (
            <Monitor size={20} className="shrink-0 transition-transform hover:scale-110" />
          )}
        </button>
      </motion.div>
      {/* Top Right Stacked Interactive Action Cluster (Ngôn ngữ xếp chồng Giao diện xếp chồng Hình nền) */}
      <TopNavActionStack
        currentThemeMode={currentThemeMode}
        onToggleThemeMode={handleToggleThemeMode}
        onNavigate={onNavigate}
        onOpenColorPicker={() => showToast("Color Picker coming soon!")}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60]"
      />

      {/* Middle Right Arrow Button */}
      <AnimatePresence>
        {!hideMainUI && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-1/2 right-4 z-40 -translate-y-1/2"
          >
            <button
              id="screen-navigation-btn"
              data-name="Nút chuyển đổi màn hình video (Screen Navigation Button)"
              onClick={() =>
                changeVideoState(
                  videoState === "idle_1"
                    ? "transition_1_to_2"
                    : "transition_2_to_1",
                  true,
                )
              }
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-900/40 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-none transition-all hover:scale-110 hover:bg-slate-900/60 active:scale-95"
              title={
                videoState === "idle_1"
                  ? "Chuyển sang Màn hình 2"
                  : "Quay lại Màn hình 1"
              }
            >
              {videoState === "idle_1" ? (
                <ChevronRight size={28} />
              ) : (
                <ChevronLeft size={28} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container - Full height flex to position elements */}
      <div
        ref={containerRef}
        className="pointer-events-none relative flex min-h-[calc(100vh-210px)] w-full max-w-full flex-1 flex-col justify-between"
      >
        {/* Bottom Right Area: Intro Speech Bubble & Cancel Button */}
        <div className="pointer-events-auto absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 flex items-end justify-end gap-3">
          <AnimatePresence mode="wait">
            {!hideMainUI && !isTransitioning && !isIntro && renderSpeechBubble(isMobile)}

            {/* Right Side: Stop/Cancel Intro Button matching Interview Video style */}
            {isIntro && (
              <motion.div
                key="cancel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-auto flex shrink-0 items-center self-end"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  id="cancel-intro-video-btn"
                  data-name="Nút hủy video đang phát (Cancel Intro Video Button)"
                  type="button"
                  onClick={handleCancelIntro}
                  className="flex w-[281px] h-[51px] cursor-pointer items-center justify-between px-3.5 py-2 rounded-full border-2 border-indigo-400/80 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_25px_rgba(99,102,241,0.6)] backdrop-blur-none transition-all duration-300 hover:from-blue-500 hover:to-violet-500 text-xs font-black text-white sm:text-sm"
                  style={{ width: "281px", height: "51px" }}
                  title={language === "vi" ? "Dừng video giới thiệu" : "Stop Intro Video"}
                >
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-md">
                    <Pause size={14} className="fill-indigo-600" />
                  </div>
                  <span>
                    {language === "vi" ? "Dừng video giới thiệu" : "Stop Intro Video"}
                  </span>

                  {/* Integrated Divider and Audio Button */}
                  <div className="mx-1 h-4 w-px shrink-0 bg-white/20" />

                  <div
                    role="button"
                    tabIndex={0}
                    id="toggle-video-sound-btn"
                    data-name="Nút bật/tắt âm thanh video (Video Sound Toggle Button)"
                    onClick={(e) => {
                      e.stopPropagation();
                      playUiSound("click");
                      const nextAudio = !isVideoAudioOn;
                      setIsVideoAudioOn(nextAudio);
                      if (videoRef.current) {
                        videoRef.current.muted = !nextAudio;
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        playUiSound("click");
                        const nextAudio = !isVideoAudioOn;
                        setIsVideoAudioOn(nextAudio);
                        if (videoRef.current) {
                          videoRef.current.muted = !nextAudio;
                        }
                      }
                    }}
                    title={
                      isVideoAudioOn
                        ? language === "vi"
                          ? "Tắt âm thanh"
                          : "Mute Audio"
                        : language === "vi"
                          ? "Bật âm thanh"
                          : "Unmute Audio"
                    }
                    className={cn(
                      "flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all text-white hover:bg-white/10 active:scale-90",
                      isVideoAudioOn ? "bg-white/15" : "bg-rose-500/80"
                    )}
                  >
                    {isVideoAudioOn ? (
                      <Volume2 size={13} className="animate-pulse" />
                    ) : (
                      <VolumeX size={13} />
                    )}
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>

      {/* Floating Theme Switch Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[999999] pointer-events-none"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 border border-white/20 dark:border-slate-800/20 shadow-2xl backdrop-blur-none text-xs font-bold">
              <Sparkles size={14} className="text-amber-400 dark:text-amber-600 animate-pulse" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
