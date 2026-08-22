import {
  Briefcase,
  Users,
  Trophy,
  ListChecks,
  CheckCircle2,
  Image as ImageIcon,
  Calendar,
  ClipboardList,
  FolderGit2,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  UserCheck,
  ShieldCheck,
  Award,
  Eye,
  Layers,
  BarChart3,
  Target,
  Activity,
  LayoutGrid,
  Search,
  Share2,
  FileText,
  GripVertical,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { contentData } from "../data";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { useState, useMemo, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import { PageLayout } from "../components/PageLayout";
import { motion, AnimatePresence, Reorder } from "motion/react";
import { ExperienceItem } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { getBrandColorConfig } from "../lib/brandColors";

const VIDEO_1_URL =
  " https://cdn.scena.ai/project/9626/d97de7f6bb813019350838499ee0f3b11f711487c7d9961679f3a43d8a3bf7ff.mp4";
const VIDEO_2_URL =
  "https://cdn.scena.ai/project/9626/a5b5bdf1659991c0c74510ddfc59b9d27a3c7478f17c711b0fc39c5e51cf43d2.mp4";

function Video2026Card({ isVi }: { isVi: boolean }) {
  const [isInterviewPlaying, setIsInterviewPlaying] = useState(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (isInterviewPlaying) {
        setIsInterviewPlaying(false);
        video.src = VIDEO_1_URL;
        video.loop = true;
        video.muted = true;
        video.load();
        video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isInterviewPlaying]);

  const toggleInterview = () => {
    playUiSound("click");
    const video = videoRef.current;
    if (!video) return;

    if (isInterviewPlaying) {
      setIsInterviewPlaying(false);
      video.src = VIDEO_1_URL;
      video.loop = true;
      video.muted = true;
      video.load();
      video.play().catch(() => {});
    } else {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.play().catch(() => {});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[15px] bg-slate-950 transition-all min-h-[420px] sm:min-h-[500px] w-full flex-1 sub-card with-ripple"
      style={{
        borderColor: "#16a34a",
        borderWidth: "1.5px",
        borderStyle: "solid",
        boxShadow: "0 0 22px rgba(22, 163, 74, 0.35), 0 8px 32px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* Video Element Embed */}
      <div className="relative h-full w-full flex-1 overflow-hidden">
        <video
          ref={videoRef}
          controls={isInterviewPlaying}
          autoPlay
          loop={!isInterviewPlaying}
          muted={!isInterviewPlaying || !isVideoAudioOn}
          playsInline
          poster="https://i.ibb.co/ynnj4BXr/H-nh-tr-nh-ki-n-t-o.png"
          className="absolute inset-0 h-full w-full object-cover min-h-full min-w-full transition-transform duration-700"
          src={isInterviewPlaying ? VIDEO_2_URL : VIDEO_1_URL}
        />

        {!isInterviewPlaying && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/30" />
        )}

        {/* Bottom Video Controls Action Bar */}
        <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleInterview}
            type="button"
            className="flex w-[281px] h-[51px] cursor-pointer items-center justify-between px-3.5 py-2 rounded-full   bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600  backdrop-blur-md transition-all duration-300 hover:from-blue-500 hover:to-violet-500 text-xs font-black text-white sm:text-sm"
            style={{ width: '281px', height: '51px' }}
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600  sm:h-7 sm:w-7">
              {!isInterviewPlaying ? (
                <Play
                  size={14}
                  className="translate-x-0.5 fill-indigo-600"
                />
              ) : (
                <Pause size={14} className="fill-indigo-600" />
              )}
            </div>
            <span>
              {!isInterviewPlaying
                ? isVi
                  ? "Hành trình kiến tạo"
                  : "Hành trình kiến tạo"
                : isVi
                  ? "Dừng Video 2"
                  : "Pause Video 2"}
            </span>
            {!isInterviewPlaying && (
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
                  ? isVi
                    ? "Tắt âm thanh"
                    : "Mute Audio"
                  : isVi
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
      </div>
    </motion.div>
  );
}


const getBentoClass = (index: number, is2026: boolean) => {
  if (is2026) return "sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2";
  
  const patterns = [
    "sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
    "sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
    "sm:col-span-2 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
    "sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
    "sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
    "sm:col-span-2 sm:row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
  ];
  return patterns[index % patterns.length];
};

export function Experience() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const getCleanDesc = (desc: string) => {
    let clean = desc
      .replace(/##\s+.*?\n/g, "") // remove h2 headers
      .replace(/\*\*/g, "") // remove bold markers
      .replace(/#/g, "") // remove general hashtags
      .replace(/\n+/g, " ") // replace newlines with space
      .trim();
    return clean;
  };

  const [selectedYear, setSelectedYear] = useState("2003");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"timeline" | "masonry">("timeline");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    const mainCard = document.querySelector(".main-info-card");
    if (mainCard) {
      mainCard.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const [expandedFullCompany, setExpandedFullCompany] = useState<string | null>(
    null,
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [expandedAchievementIndex, setExpandedAchievementIndex] = useState<
    number | null
  >(null);
  const [detailModalExp, setDetailModalExp] = useState<ExperienceItem | null>(
    null,
  );
  const [isCopied, setIsCopied] = useState(false);
  const [subCardsOrder, setSubCardsOrder] = useState([
    "chia-se",
    "quan-ly",
    "kpi",
    "nhiem-vu",
    "du-an",
    "cam-ket",
  ]);

  const years = [
    "2003",
    "2007",
    "2011",
    "2013",
    "2016",
    "2018",
    "2023",
    "2026",
  ];

  // Filter experience list based on search term
  const filteredExperiences = useMemo(() => {
    return contentData.experience
      .filter((exp) => {
        if (!searchTerm.trim()) return true;

        const term = searchTerm.toLowerCase().trim();
        const companyMatch = exp.company.toLowerCase().includes(term);
        const roleMatch = exp.role.toLowerCase().includes(term);
        const descMatch = exp.desc.toLowerCase().includes(term);
        const subTitleMatch = exp.subTitle?.toLowerCase().includes(term);
        const taskMatch = exp.tasks?.some((t) =>
          t.toLowerCase().includes(term),
        );
        const projectMatch = exp.projects?.some((p) =>
          p.toLowerCase().includes(term),
        );

        return (
          companyMatch ||
          roleMatch ||
          descMatch ||
          subTitleMatch ||
          taskMatch ||
          projectMatch
        );
      })
      .sort((a, b) => parseInt(b.yearStart) - parseInt(a.yearStart));
  }, [searchTerm]);

  // Custom grid experiences ordering for Grid Views (sorted chronologically from highest to lowest)
  const gridExperiences = useMemo(() => {
    return filteredExperiences;
  }, [filteredExperiences]);

  useEffect(() => {
    const targetExpId = sessionStorage.getItem("return_to_experience_target_id");
    if (targetExpId) {
      sessionStorage.removeItem("return_to_experience_target_id");
      const found = contentData.experience.find((e) => e.id === targetExpId);
      if (found) {
        setSelectedYear(found.yearStart);
      }
    }
  }, []);

  // Selected experience in timeline
  const selectedExp = useMemo(() => {
    return (
      contentData.experience.find((exp) => exp.yearStart === selectedYear) ||
      contentData.experience[1]
    );
  }, [selectedYear]);

  const selectedBrand = useMemo(() => {
    return getBrandColorConfig(selectedExp?.company || selectedYear);
  }, [selectedExp, selectedYear]);

  const detailModalBrand = useMemo(() => {
    return detailModalExp ? getBrandColorConfig(detailModalExp.company || detailModalExp.yearStart) : null;
  }, [detailModalExp]);

  // Total calculated statistics for header overview
  const totalStaffTrained = useMemo(() => {
    return contentData.experience.reduce(
      (sum, exp) => sum + (exp.staff || 0),
      0,
    );
  }, []);

  const totalCompaniesCount = contentData.experience.length - 1; // Exclude future ready position

  const handleCopySummary = async () => {
    playUiSound("click");
    const summaryText = contentData.experience
      .map(
        (exp) =>
          `• ${exp.yearStart} - ${exp.yearEnd || "Nay"}: ${exp.company} (${exp.role})`,
      )
      .join("\n");

    const fullText = `HỒ SƠ TÓM TẮT KINH NGHIỆM LÀM VIỆC (2003 - 2026):\n\n${summaryText}\n\nChuyên môn: Xây dựng P.CSKH, Chuẩn hóa SOP, Vận hành CallCenter/CRM, CSAT 98%.`;

    try {
      await navigator.clipboard.writeText(fullText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <PageLayout
      id="experience-main-card"
      onScroll={handleScroll}
      rootClassName="w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="experience"
      pageName="Experience Main Card"
      title={isVi ? "Kinh Nghiệm Thực Chiến" : "Work Experience"}
      subtitle={
        isVi
          ? "Hành trình 22+ năm quản trị và vận hành CX xuất sắc."
          : "22+ years of leadership and operational CX excellence."
      }
      icon={Briefcase}
      headerContainerClassName="!px-0"
      headerActions={
        <div className="flex items-center gap-2">
          <div className="flex h-9 shrink-0 items-center gap-1 rounded-full border border-slate-200/60 bg-white/60 dark:border-white/10 dark:bg-slate-900/60 p-1 text-left backdrop-blur-xl shadow-xs">
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                setViewMode("timeline");
              }}
              className={cn(
                "flex h-full cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black transition-all duration-300",
                viewMode === "timeline"
                  ? "bg-blue-600 text-white shadow-xs dark:bg-blue-500"
                  : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/50 dark:hover:bg-white/10",
              )}
              title={isVi ? "Dạng thời gian" : "Timeline view"}
            >
              <Calendar size={13} />
              <span className="hidden sm:inline">
                {isVi ? "Thời gian" : "Timeline"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                setViewMode("masonry");
              }}
              className={cn(
                "flex h-full cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black transition-all duration-300",
                viewMode === "masonry"
                  ? "bg-blue-600 text-white shadow-xs dark:bg-blue-500"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--text-primary)] hover:bg-white/50 dark:hover:bg-white/10",
              )}
              title={isVi ? "Dạng thẻ" : "Card view"}
            >
              <LayoutGrid size={13} />
              <span className="hidden sm:inline">
                {isVi ? "Dạng thẻ" : "Cards"}
              </span>
            </button>
          </div>
        </div>
      }
    >
        {/* View Mode 1: Masonry Grid View - Mobile & Desktop */}
        {viewMode === "masonry" ? (
          <section className="flex h-auto min-h-0 w-full flex-col items-center gap-4 rounded-[15px]    bg-[var(--card)]/60 p-[10px]  backdrop-blur-xl sub-card with-ripple">
            {filteredExperiences.length === 0 ? (
              <div className="space-y-3 py-12 text-center">
                <Search size={40} className="mx-auto text-[var(--muted)]/50" />
                <p className="text-sm font-bold text-[var(--muted)]">
                  Không tìm thấy công việc nào
                </p>
              </div>
            ) : (
              /* Asymmetric Bento Grid (Bất Đối Xứng Sáng Tạo - Đan xen 1x1, 2x1 điểm nhấn) */
              <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 transition-all duration-300">
                {gridExperiences.map((exp, idx) => {
                  const cardBrand = getBrandColorConfig(exp.company || exp.yearStart);
                  
                  const is2026 = exp.yearStart === "2026";
                  const colSpanClass = is2026 ? "col-span-1 md:col-span-2" : "col-span-1";

                  return exp.yearStart === "2026" ? (
                    <div
                      key={exp.company + idx}
                      className={cn("flex h-full w-full flex-col", colSpanClass)}
                    >
                      <Video2026Card isVi={isVi} />
                    </div>
                  ) : (
                    <motion.div
                      key={exp.company + idx}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => {
                        playUiSound("click");
                        setDetailModalExp(exp);
                      }}
                      className={cn(
                        "group relative cursor-pointer overflow-hidden rounded-[24px] p-2.5 sm:p-3 text-left transition-all duration-300 bg-white/90 backdrop-blur-2xl dark:bg-slate-900/90 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between",
                        colSpanClass
                      )}
                      style={{
                        borderColor: cardBrand.hex,
                        borderWidth: "1.5px",
                        borderStyle: "solid",
                        boxShadow: cardBrand.cardGlowStyle,
                      }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 h-full">
                        {/* CORE INFO BOX */}
                        <div className="flex flex-col justify-between gap-3 rounded-[18px] border border-slate-200/70 bg-white/90 p-4 sm:p-5 transition-colors group-hover:border-blue-300/60 dark:border-white/10 dark:bg-[#151921]/90 col-span-1 sm:col-span-3">
                          <div className="flex items-start justify-between gap-2">
                            {exp.logo ? (
                              <div
                                className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-2 ring-slate-100 dark:ring-white/10"
                                style={{
                                  borderColor: cardBrand.hex,
                                  borderWidth: "1.5px",
                                  borderStyle: "solid",
                                  boxShadow: `0 0 10px ${cardBrand.hex}60`,
                                }}
                              >
                                <img
                                  src={exp.logo}
                                  className="h-full w-full object-contain p-1"
                                  alt={exp.company}
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ) : (
                              <div
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-black text-sm text-white shadow-sm"
                                style={{ backgroundColor: cardBrand.hex }}
                              >
                                {exp.yearStart}
                              </div>
                            )}

                            <div className="flex items-center gap-1.5">
                              <div 
                                className="rounded-bl-xl rounded-tr-xl px-2.5 py-1 text-[9px] font-black tracking-wider uppercase"
                                style={{ backgroundColor: cardBrand.hex + "18", color: cardBrand.hex }}
                              >
                                {exp.yearStart ? `${exp.yearStart} - ${exp.yearEnd || "Nay"}` : "Kinh nghiệm"}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1 mt-1">
                            <h4 className="text-lg sm:text-[20px] font-black leading-tight tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {exp.company}
                            </h4>
                            <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                              {getCleanDesc(exp.desc)}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            {exp.projects && exp.projects.slice(0, 2).map((p, i) => (
                              <span
                                key={i}
                                className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300"
                              >
                                {p}
                              </span>
                            ))}
                            <span 
                              className="rounded-lg px-2.5 py-1 text-[10px] font-bold"
                              style={{ backgroundColor: cardBrand.hex + "15", color: cardBrand.hex }}
                            >
                              {exp.categoryName || "Dự án"}
                            </span>
                          </div>
                        </div>

                        {/* BOX 2 (SIDE UTILITIES): Role & Time */}
                        <div className="flex flex-col justify-between gap-3 rounded-[18px] border border-slate-200/70 bg-white/90 p-4 sm:p-5 transition-colors group-hover:border-blue-300/60 dark:border-white/10 dark:bg-[#151921]/90 col-span-1 sm:col-span-3">
                          <div className="flex items-start justify-between">
                            <span 
                              className="text-[10px] font-black tracking-wider uppercase"
                              style={{ color: cardBrand.hex }}
                            >
                              Vai trò & Trách nhiệm
                            </span>
                            <div
                              className="rounded-lg p-1.5"
                              style={{ backgroundColor: cardBrand.hex + "15", color: cardBrand.hex }}
                            >
                              <Briefcase size={14} />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 mt-1">
                            <h5 className="text-[15px] sm:text-[16px] font-black leading-tight text-slate-800 dark:text-slate-100">
                              {exp.subTitle || "Quản trị CX"}
                            </h5>
                            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                              {exp.role}
                            </p>
                          </div>

                          {/* Quick indicators */}
                          <div className="space-y-1.5 mt-1">
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                              <span>Tiến độ & Hiệu suất</span>
                              <span style={{ color: cardBrand.hex }}>100% SOP</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                              <div 
                                className="h-full rounded-full transition-all duration-500" 
                                style={{ width: "85%", backgroundColor: cardBrand.hex }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* BOX 3 (MEDIA & PHOTOS): 1x1 Mini Bento button */}
                        <button
                          type="button"
                          className="group/km flex items-center gap-3 rounded-[16px] border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/15 p-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] dark:border-rose-500/20 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 backdrop-blur-xl shadow-xs hover:shadow-md col-span-1 text-left cursor-pointer w-full"
                          onClick={(e) => {
                            if (exp.photos && exp.photos.length > 0) {
                              e.stopPropagation();
                              playUiSound("click");
                              setActivePhotoIndex(0);
                              setShowGallery(true);
                            }
                          }}
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-500/30 shadow-2xs group-hover/km:scale-105 transition-transform">
                            <ImageIcon size={15} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{isVi ? "Hình ảnh" : "Photos"}</span>
                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                              {exp.photos && exp.photos.length > 0 ? (isVi ? `${exp.photos.length} kỷ niệm` : `${exp.photos.length} photos`) : (isVi ? "Không có" : "None")}
                            </span>
                          </div>
                        </button>

                        {/* BOX 4 (PLATFORM/CATEGORY): 1x1 Mini Bento block */}
                        <div className="flex items-center gap-3 rounded-[16px] border border-indigo-500/30 bg-indigo-500/10 p-3 transition-all duration-300 dark:border-indigo-500/20 dark:bg-indigo-950/30 backdrop-blur-xl shadow-xs col-span-1">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 border border-indigo-500/30 shadow-2xs">
                            <Layers size={15} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{isVi ? "Nền tảng" : "Platform"}</span>
                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                              {exp.categoryName || (isVi ? "Đa ngành" : "Multi-sector")}
                            </span>
                          </div>
                        </div>

                        {/* BOX 5 (DETAILS ACTION): 1x1 Mini Bento button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            playUiSound("click");
                            setDetailModalExp(exp);
                          }}
                          className="group/km flex items-center justify-between rounded-[16px] border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/15 p-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 backdrop-blur-xl shadow-xs hover:shadow-md col-span-1 text-left cursor-pointer w-full"
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 truncate">{isVi ? "Chi tiết thẻ" : "Details"}</span>
                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">{isVi ? "Bấm xem báo cáo" : "View report"}</span>
                          </div>
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30 group-hover/km:scale-110 transition-transform shadow-2xs">
                            <Maximize2 size={14} />
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        ) : (
          /* View Mode 2: Interactive Timeline View (Mobile & Desktop) */
          <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 text-left">
            {/* Timeline Nodes Navigation Row */}
            <div className="relative flex w-full shrink-0 items-center justify-center p-2 pb-6">
              <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-1 sm:gap-4 md:gap-8 px-1 sm:px-6">
                {years.map((year, index) => {
                  const exp = contentData.experience.find(
                    (e) => e.yearStart === year,
                  );
                  const brand = getBrandColorConfig(exp?.company || year);
                  const isActive = selectedYear === year;
                  const isPassed = years.indexOf(selectedYear) >= index;
                  const isLineActive = years.indexOf(selectedYear) > index;

                  return (
                    <div
                      key={year}
                      className="group relative flex flex-1 min-w-0 flex-col items-center"
                    >
                      {/* YEAR BADGE */}
                      <div className="relative z-20 mb-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            playUiSound("click");
                            setSelectedYear(year);
                            setIsVideoPlaying(false);
                          }}
                          className={cn(
                            "flex cursor-pointer items-center gap-0.5 sm:gap-1 px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-black tracking-tight whitespace-nowrap transition-all duration-300 focus:outline-none backdrop-blur-md",
                            isActive
                              ? cn("scale-110 shadow-xs border border-white/30 bg-white/70 dark:bg-slate-800/70", brand.textClass)
                              : "text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-amber-400 bg-white/30 dark:bg-white/5 border border-transparent hover:border-white/20",
                          )}
                          title={`Chọn năm ${year}`}
                        >
                          <Calendar
                            className={cn(
                              "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5",
                              isActive
                                ? brand.textClass
                                : isPassed 
                                  ? "text-blue-500/70 dark:text-amber-500/70"
                                  : "text-slate-400 dark:text-slate-500"
                            )}
                          />
                          <span>{year}</span>
                        </motion.button>
                      </div>

                      {/* LOGO AND CONNECTOR WRAPPER */}
                      <div
                        className="relative flex w-full items-center justify-center"
                      >
                        {/* CONNECTOR LINE */}
                        {index < years.length - 1 && (
                          <div 
                            className="pointer-events-none absolute z-0 overflow-visible"
                            style={{
                              left: "50%",
                              width: "100%",
                              height: "60px",
                              top: "calc(50% - 30px)",
                            }}
                          >
                            <svg
                              className="h-full w-full overflow-visible"
                              viewBox="0 0 100 60"
                              preserveAspectRatio="none"
                            >
                              <defs>
                                <marker
                                  id={`arrow-${index}`}
                                  viewBox="0 0 10 10"
                                  refX="6"
                                  refY="5"
                                  markerWidth="5"
                                  markerHeight="5"
                                  orient="auto-start-reverse"
                                >
                                  <path
                                    d="M 0 1.5 L 7 5 L 0 8.5 z"
                                    className="fill-slate-900 dark:fill-slate-100"
                                  />
                                </marker>
                              </defs>
                              <path
                                d={
                                  index % 2 === 0
                                    ? "M 0,30 C 25,5 75,5 100,30" // Curved up
                                    : "M 0,30 C 25,55 75,55 100,30" // Curved down
                                }
                                fill="none"
                                className="stroke-slate-900 dark:stroke-slate-100"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                                markerEnd={`url(#arrow-${index})`}
                              />
                            </svg>
                          </div>
                        )}

                        {/* CIRCULAR LOGO BADGE WITH WRAPPING BORDER */}
                        <div
                          className={cn(
                            "relative z-10 shrink-0 rounded-full bg-white p-0 transition-all duration-500",
                            isActive
                              ? "scale-110"
                              : isPassed
                                ? ""
                                : ""
                          )}
                          style={
                            isActive
                              ? {
                                  borderColor: brand.hex,
                                  borderWidth: "1.5px",
                                  borderStyle: "solid",
                                  boxShadow: brand.logoGlowStyle,
                                }
                              : {
                                  borderColor: "rgba(255, 255, 255, 0.4)",
                                  borderWidth: "1px",
                                  borderStyle: "solid",
                                }
                          }
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              playUiSound("click");
                              setSelectedYear(year);
                              setIsVideoPlaying(false);
                            }}
                            className={cn(
                              "relative flex h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white transition-all duration-300",
                            )}
                            style={
                              isActive
                                ? {
                                    borderColor: brand.hex,
                                    borderWidth: "1.5px",
                                    borderStyle: "solid",
                                  }
                                : {
                                    borderColor: "transparent",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                  }
                            }
                            title={
                              exp?.company
                                ? `Chuyển đến thẻ công việc: ${exp.company}`
                                : `Năm ${year}`
                            }
                          >
                            {exp?.logo ? (
                              <img
                                src={exp.logo}
                                className="h-full w-full rounded-full object-cover"
                                alt={year}
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="text-xs font-black text-slate-800">
                                {year}
                              </span>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Experience Detail View / Video Showcase inside card container */}
            <div
              className={cn(
                "custom-scrollbar relative flex w-full flex-1 flex-col overflow-y-auto rounded-[16px] transition-all duration-300 bg-white/80 backdrop-blur-3xl dark:bg-slate-900/80",
                selectedExp.yearStart === "2026" ? "p-1.5 sm:p-2 space-y-0" : "p-5 sm:p-7 space-y-6"
              )}
              style={{
                borderColor: selectedBrand.hex,
                borderWidth: "1.5px",
                borderStyle: "solid",
                boxShadow: selectedBrand.cardGlowStyle,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedYear}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="flex min-h-0 w-full flex-1 flex-col items-center p-[10px]"
                >
                  {/* Company Overview Header Row */}
                  {selectedExp.yearStart !== "2026" && (
                    <div className="flex w-full items-stretch justify-between gap-4   pb-6">
                       {/* Cột trái: 4 Dòng */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5 h-[130px] p-2.5">
                        {/* Dòng 1 : Từ Năm ... đến ... */}
                        <div className="flex items-center gap-1.5 text-[13px] font-black whitespace-nowrap text-slate-700 dark:text-slate-200">
                          <Calendar
                            size={13}
                            className="shrink-0 text-slate-700 dark:text-slate-200"
                          />
                          <span>
                            Từ Năm {selectedExp.yearStart} đến{" "}
                            {selectedExp.yearEnd
                              ? `Năm ${selectedExp.yearEnd}`
                              : "Nay"}
                          </span>
                        </div>

                        {/* Nhóm Dòng 2, 3, 4 chung một Logo lớn bên trái */}
                        <div className="flex items-center gap-3 w-full min-w-0">
                          {/* Logo lớn chiếm độ cao cả 3 dòng */}
                          {selectedExp.logo && (
                            <div
                              className="flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0"
                              style={{
                                borderColor: selectedBrand.hex,
                                borderWidth: "1.5px",
                                borderStyle: "solid",
                                boxShadow: `0 0 14px ${selectedBrand.hex}60`,
                              }}
                            >
                              <img
                                src={selectedExp.logo}
                                className="h-full w-full rounded-full object-contain p-1"
                                alt="Company"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}

                          {/* Cột chữ gồm Dòng 2, Dòng 3 và Dòng 4 */}
                          <div className="flex flex-col justify-between gap-1.5 min-w-0 flex-1">
                            {/* Dòng 2 : Viễn thông */}
                            {selectedExp.categoryName && (
                              <div className="flex items-center min-w-0">
                                <span
                                  className="flex items-center gap-1.5 rounded-full border px-3 py-0.5 font-black tracking-wider"
                                  style={{
                                    backgroundColor: selectedBrand.hex + "80",
                                    borderColor: selectedBrand.hex,
                                    color: selectedBrand.hex,
                                    fontSize: "12px",
                                    lineHeight: "14px",
                                  }}
                                >
                                  {selectedExp.categoryName}
                                </span>
                              </div>
                            )}

                            {/* Dòng 3 : Tên công ty (20 px) */}
                            <h2
                              className="text-[20px] leading-tight font-black tracking-tight transition-colors duration-300 truncate"
                              style={{ color: selectedBrand.hex }}
                            >
                              {selectedExp.company}
                            </h2>

                            {/* Dòng 4 : (Cty Ánh Hào Quang) (18 px) */}
                            {selectedExp.subTitle && (
                              <div className="flex items-center min-w-0">
                                <div
                                  className="text-[18px] font-black leading-tight truncate"
                                  style={{ color: selectedBrand.hex }}
                                >
                                  {selectedExp.subTitle}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Cột phải: Card Kỷ niệm (Chiều cao bằng 4 dòng bên cột trái) */}
                      {selectedExp.photos && selectedExp.photos.length > 0 ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            playUiSound("click");
                            setActivePhotoIndex(0);
                            setShowGallery(true);
                          }}
                          className="group/km relative flex h-[130px] w-[200px] shrink-0 flex-col justify-between items-center gap-1.5 rounded-[16px] border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/15 p-2.5 transition-all duration-300 cursor-pointer backdrop-blur-xl dark:border-rose-500/30 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 shadow-md shadow-rose-500/5 hover:shadow-lg hover:shadow-rose-500/15 hover:scale-[1.02] active:scale-[0.98]"
                          title={isVi ? "Xem Card Hình Kỷ niệm" : "View Photo Memories"}
                        >
                          <div className="relative flex h-20 w-full shrink-0 overflow-hidden rounded-xl border border-rose-500/20 shadow-2xs">
                            <img
                              src={selectedExp.photos[0]}
                              alt="Kỷ niệm"
                              className="h-full w-full object-cover group-hover/km:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center gap-0.5 text-center text-rose-600 dark:text-rose-400">
                            <div className="flex items-center gap-1 text-xs font-black">
                              <ImageIcon size={13} className="shrink-0 text-rose-500" />
                              <span className="whitespace-nowrap">{isVi ? "Card Kỷ niệm" : "Memories"}</span>
                            </div>
                            <span className="text-[10px] font-bold opacity-80">
                              {isVi ? `${selectedExp.photos.length} hình ảnh` : `${selectedExp.photos.length} photos`}
                            </span>
                          </div>
                        </button>
                      ) : (
                        <div className="flex h-[130px] w-[200px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-[16px] border border-slate-200/60 bg-white/40 dark:border-white/10 dark:bg-slate-900/40 p-2.5 text-center text-xs font-semibold text-slate-400 dark:text-slate-500 backdrop-blur-xl shadow-xs">
                          <ImageIcon size={18} className="opacity-40" />
                          <span>{isVi ? "Không có hình" : "No photos"}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sub-Cards or Video 2026 Container */}
                  {expandedFullCompany === selectedExp.company &&
                    selectedExp.yearStart !== "2026" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="my-4 w-full space-y-4 rounded-[16px] border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-white/80 to-indigo-500/10 dark:via-slate-900/80 p-5 sm:p-6 backdrop-blur-2xl sub-card with-ripple shadow-lg"
                      >
                        <div className="flex items-center justify-between pb-3">
                          <h3 className="flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400">
                            <BarChart3 size={16} /> Báo Cáo Chi Tiết Chỉ Số &
                            KPI Quản Trị ({selectedExp.company})
                          </h3>
                          <button
                            onClick={() => setExpandedFullCompany(null)}
                            className="cursor-pointer rounded-full border border-blue-500/40 bg-blue-600/90 hover:bg-blue-600 px-3.5 py-1 text-xs font-black text-white shadow-xs backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                          >
                            {isVi ? "Thu gọn chi tiết" : "Collapse"}
                          </button>
                        </div>

                        {/* Bento Box Grid */}
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-3">
                            <div className="flex flex-col justify-center rounded-[20px] border border-slate-200/60 bg-white/60 p-4 backdrop-blur-md dark:border-white/5 dark:bg-[#151921]/60">
                              <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                                <Users size={14} className="text-blue-500" /> QUY MÔ
                              </span>
                              <p className="mt-1 text-lg font-black text-blue-600 dark:text-blue-400">
                                {selectedExp.staff && selectedExp.staff > 0 ? `${selectedExp.staff} Nhân viên` : "Phát triển"}
                              </p>
                            </div>
                            <div className="flex flex-col justify-center rounded-[20px] border border-slate-200/60 bg-white/60 p-4 backdrop-blur-md dark:border-white/5 dark:bg-[#151921]/60">
                              <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                                <CheckCircle2 size={14} className="text-emerald-500" /> SOP
                              </span>
                              <p className="mt-1 text-lg font-black text-emerald-600 dark:text-emerald-400">
                                100% Đạt chuẩn
                              </p>
                            </div>
                            <div className="flex flex-col justify-center rounded-[20px] border border-slate-200/60 bg-white/60 p-4 backdrop-blur-md dark:border-white/5 dark:bg-[#151921]/60">
                              <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                                <FolderGit2 size={14} className="text-purple-500" /> DỰ ÁN
                              </span>
                              <p className="mt-1 text-lg font-black text-purple-600 dark:text-purple-400">
                                {selectedExp.projects?.length || 0} Dự án
                              </p>
                            </div>
                            <div className="flex flex-col justify-center rounded-[20px] border border-slate-200/60 bg-white/60 p-4 backdrop-blur-md dark:border-white/5 dark:bg-[#151921]/60">
                              <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                                <Trophy size={14} className="text-amber-500" /> CSAT
                              </span>
                              <p className="mt-1 text-lg font-black text-amber-600 dark:text-amber-400">
                                92% - 98%
                              </p>
                            </div>
                          </div>

                          <div className="col-span-12 lg:col-span-7 flex flex-col gap-3 rounded-[20px] border border-slate-200/60 bg-white/60 p-5 backdrop-blur-md dark:border-white/5 dark:bg-[#151921]/60">
                            <h4 className="flex items-center gap-2 text-sm font-black text-amber-600 dark:text-amber-400">
                              <Trophy size={16} /> Kết quả nổi bật
                            </h4>
                            {selectedExp.achievements && selectedExp.achievements.length > 0 ? (
                              <div className="flex flex-col gap-3">
                                {selectedExp.achievements.map((ach, i) => (
                                  <div key={i} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs font-bold">
                                      <span className="text-slate-700 dark:text-slate-200">{ach.name}</span>
                                      <span className="text-amber-600 dark:text-amber-400">{ach.score}%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                                      <div
                                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                                        style={{ width: `${ach.score}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
                                Đang cập nhật số liệu
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                  {/* Sub-Cards or Video 2026 Container */}
                  {expandedFullCompany !== selectedExp.company && selectedExp.yearStart === "2026" ? (
                    <div className="flex h-full min-h-[440px] sm:min-h-[500px] w-full flex-1 flex-col items-center justify-center">
                      <Video2026Card isVi={isVi} />
                    </div>
                  ) : expandedFullCompany !== selectedExp.company && (
                    <div className="w-full space-y-3">
                      <Reorder.Group
                        axis="y"
                        values={subCardsOrder}
                        onReorder={setSubCardsOrder}
                        className="m-0 w-full list-none grid grid-cols-1 gap-4 p-0 pt-1 md:grid-cols-12"
                      >
                        {subCardsOrder.map((cardId, cardIndex) => {
                          const badgeNum = cardIndex + 1;
                          switch (cardId) {
                            case "chia-se":
                              return (
                                <Reorder.Item
                                  value="chia-se"
                                  key="chia-se"
                                  className="md:col-span-12 lg:col-span-12 relative z-10 inline-block w-full cursor-grab break-inside-avoid select-none active:cursor-grabbing"
                                  whileHover={{ y: 0 }}
                                  whileDrag={{ scale: 1, zIndex: 50 }}
                                >
                                  <div className="group magic-card relative flex h-full w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] border bg-amber-500/15 p-5 text-left backdrop-blur-3xl transition-all sm:p-6">
                                    <div className="flex w-full shrink-0 items-center justify-between pb-3">
                                      <div className="flex items-center gap-2.5">
                                        <h3 className="flex items-center gap-2 text-[16px] md:text-[18px] font-black tracking-tight text-amber-700 dark:text-amber-400">
                                          <ClipboardList size={18} />
                                          <span>0{badgeNum} · Chia sẻ</span>
                                        </h3>
                                      </div>
                                      <div className="cursor-grab text-[var(--muted)] hover:text-[var(--text-primary)] active:cursor-grabbing">
                                        <GripVertical size={16} />
                                      </div>
                                    </div>
                                    <div className="prose prose-slate dark:prose-invert relative w-full max-w-none space-y-3 text-sm leading-relaxed font-medium text-[var(--text-primary)]">
                                      <Markdown>{selectedExp.desc}</Markdown>
                                    </div>
                                  </div>
                                </Reorder.Item>
                              );
                            case "quan-ly":
                              return (
                                <Reorder.Item
                                  value="quan-ly"
                                  key="quan-ly"
                                  className="md:col-span-12 lg:col-span-12 relative z-10 inline-block w-full cursor-grab break-inside-avoid select-none active:cursor-grabbing"
                                  whileHover={{ y: 0 }}
                                  whileDrag={{ scale: 1, zIndex: 50 }}
                                >
                                  <div className="group magic-card relative flex h-full w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] border bg-sky-500/15 p-5 text-left backdrop-blur-3xl transition-all sm:p-6">
                                    <div className="flex w-full shrink-0 items-center justify-between pb-3">
                                      <div className="flex items-center gap-2.5">
                                        <h3 className="flex items-center gap-2 text-[16px] md:text-[18px] font-black tracking-tight text-sky-700 dark:text-sky-400">
                                          <UserCheck size={18} />
                                          <span>0{badgeNum} · Quản lý</span>
                                        </h3>
                                      </div>
                                      <div className="cursor-grab text-[var(--muted)] hover:text-[var(--text-primary)] active:cursor-grabbing">
                                        <GripVertical size={16} />
                                      </div>
                                    </div>
                                    <div className="w-full min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 sm:text-sm dark:text-slate-300">
                                      <div className="flex items-start gap-3 rounded-[12px] border border-sky-500/25 bg-sky-500/10 p-3.5">
                                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-sky-500" />
                                        <div className="flex flex-col gap-1 min-w-0">
                                          <span className="font-bold text-[var(--text-primary)]">Chức danh quản trị:</span>
                                          <span className="font-black text-sky-600 dark:text-sky-400 text-sm truncate">{selectedExp.role}</span>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-3 rounded-[12px] border border-sky-500/25 bg-sky-500/10 p-3.5">
                                        <Users size={18} className="mt-0.5 shrink-0 text-sky-500" />
                                        <div className="flex flex-col gap-1 min-w-0">
                                          <span className="font-bold text-[var(--text-primary)]">Quy mô nhân sự quản lý:</span>
                                          <span className="font-black text-sky-600 dark:text-sky-400 text-sm truncate">{selectedExp.staff || 0} nhân sự trực thuộc</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Reorder.Item>
                              );
                            case "kpi":
                              return (
                                <Reorder.Item
                                  value="kpi"
                                  key="kpi"
                                  className="md:col-span-6 lg:col-span-6 relative z-10 inline-block w-full cursor-grab break-inside-avoid select-none active:cursor-grabbing"
                                  whileHover={{ y: 0 }}
                                  whileDrag={{ scale: 1, zIndex: 50 }}
                                >
                                  <div className="group magic-card relative flex h-full w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] border bg-emerald-500/15 p-5 text-left backdrop-blur-3xl transition-all sm:p-6">
                                    <div className="flex w-full shrink-0 items-center justify-between pb-3">
                                      <div className="flex items-center gap-2.5">
                                        <h3 className="flex items-center gap-2 text-[16px] md:text-[18px] font-black tracking-tight text-emerald-700 dark:text-emerald-400">
                                          <Trophy size={18} />
                                          <span>0{badgeNum} · Kết quả & KPI</span>
                                        </h3>
                                      </div>
                                      <div className="cursor-grab text-[var(--muted)] hover:text-[var(--text-primary)] active:cursor-grabbing">
                                        <GripVertical size={16} />
                                      </div>
                                    </div>
                                    {selectedExp.achievements && selectedExp.achievements.length > 0 ? (
                                      <div className="w-full min-w-0 flex-1 space-y-3">
                                        {selectedExp.achievements.map((ach, i) => (
                                          <div key={i} className="space-y-1.5 rounded-[12px] border border-emerald-500/30 bg-emerald-500/10 p-3">
                                            <div className="flex items-center justify-between text-xs font-bold">
                                              <span className="text-slate-800 dark:text-slate-200">{ach.name}</span>
                                              <span className="text-emerald-700 dark:text-emerald-400">{ach.score}%</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-emerald-950">
                                              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${ach.score}%` }}></div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="flex h-full min-h-[100px] w-full items-center justify-center text-xs font-medium text-slate-400">
                                        Đang cập nhật
                                      </div>
                                    )}
                                  </div>
                                </Reorder.Item>
                              );
                            case "nhiem-vu":
                              return (
                                <Reorder.Item
                                  value="nhiem-vu"
                                  key="nhiem-vu"
                                  className="md:col-span-6 lg:col-span-6 relative z-10 inline-block w-full cursor-grab break-inside-avoid select-none active:cursor-grabbing"
                                  whileHover={{ y: 0 }}
                                  whileDrag={{ scale: 1, zIndex: 50 }}
                                >
                                  <div className="group magic-card relative flex h-full w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] border bg-purple-500/15 p-5 text-left backdrop-blur-3xl transition-all sm:p-6">
                                    <div className="flex w-full shrink-0 items-center justify-between pb-3">
                                      <div className="flex items-center gap-2.5">
                                        <h3 className="flex items-center gap-2 text-[16px] md:text-[18px] font-black tracking-tight text-purple-700 dark:text-purple-400">
                                          <ListChecks size={18} />
                                          <span>0{badgeNum} · Công việc</span>
                                        </h3>
                                      </div>
                                      <div className="cursor-grab text-[var(--muted)] hover:text-[var(--text-primary)] active:cursor-grabbing">
                                        <GripVertical size={16} />
                                      </div>
                                    </div>
                                    {selectedExp.tasks && selectedExp.tasks.length > 0 ? (
                                      <div className="w-full min-w-0 flex-1 space-y-3 text-xs text-slate-700 sm:text-sm dark:text-slate-300">
                                        {selectedExp.tasks.map((task, i) => (
                                          <div key={i} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-600">
                                              <span className="text-[10px] font-black">{i + 1}</span>
                                            </div>
                                            <span className="font-medium tracking-tight">{task}</span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="flex h-full min-h-[100px] w-full items-center justify-center text-xs font-medium text-slate-400">
                                        Đang cập nhật
                                      </div>
                                    )}
                                  </div>
                                </Reorder.Item>
                              );
                            case "du-an":
                              return (
                                <Reorder.Item
                                  value="du-an"
                                  key="du-an"
                                  className="md:col-span-6 lg:col-span-6 relative z-10 inline-block w-full cursor-grab break-inside-avoid select-none active:cursor-grabbing"
                                  whileHover={{ y: 0 }}
                                  whileDrag={{ scale: 1, zIndex: 50 }}
                                >
                                  <div className="group magic-card relative flex h-full w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] border bg-indigo-500/15 p-5 text-left backdrop-blur-3xl transition-all sm:p-6">
                                    <div className="flex w-full shrink-0 items-center justify-between pb-3">
                                      <div className="flex items-center gap-2.5">
                                        <h3 className="flex items-center gap-2 text-[16px] md:text-[18px] font-black tracking-tight text-indigo-700 dark:text-indigo-400">
                                          <FolderGit2 size={18} />
                                          <span>0{badgeNum} · Dự án</span>
                                        </h3>
                                      </div>
                                      <div className="cursor-grab text-[var(--muted)] hover:text-[var(--text-primary)] active:cursor-grabbing">
                                        <GripVertical size={16} />
                                      </div>
                                    </div>
                                    {selectedExp.projects && selectedExp.projects.length > 0 ? (
                                      <div className="w-full min-w-0 flex-1 space-y-3">
                                        {selectedExp.projects.map((proj, i) => (
                                          <div key={i} className="flex items-center gap-3 rounded-[12px] border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5">
                                            <FolderGit2 size={15} className="shrink-0 text-indigo-500" />
                                            <span className="text-xs font-bold text-slate-800 sm:text-sm dark:text-slate-200">{proj}</span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="flex h-full min-h-[100px] w-full items-center justify-center text-xs font-medium text-slate-400">
                                        Đang cập nhật
                                      </div>
                                    )}
                                  </div>
                                </Reorder.Item>
                              );
                            case "cam-ket":
                              return (
                                <Reorder.Item
                                  value="cam-ket"
                                  key="cam-ket"
                                  className="md:col-span-6 lg:col-span-6 relative z-10 inline-block w-full cursor-grab break-inside-avoid select-none active:cursor-grabbing"
                                  whileHover={{ y: 0 }}
                                  whileDrag={{ scale: 1, zIndex: 50 }}
                                >
                                  <div className="group magic-card relative flex h-full w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] border bg-teal-500/15 p-5 text-left backdrop-blur-3xl transition-all sm:p-6">
                                    <div className="flex w-full shrink-0 items-center justify-between pb-3">
                                      <div className="flex items-center gap-2.5">
                                        <h3 className="flex items-center gap-2 text-[16px] md:text-[18px] font-black tracking-tight text-teal-700 dark:text-teal-400">
                                          <ShieldCheck size={18} />
                                          <span>0{badgeNum} · Cam kết</span>
                                        </h3>
                                      </div>
                                      <div className="cursor-grab text-[var(--muted)] hover:text-[var(--text-primary)] active:cursor-grabbing">
                                        <GripVertical size={16} />
                                      </div>
                                    </div>
                                    <div className="w-full min-w-0 flex-1 space-y-3 text-xs text-slate-700 sm:text-sm dark:text-slate-300">
                                      <div className="flex items-start gap-3">
                                        <CheckCircle2 size={16} className="mt-1 shrink-0 text-teal-500" />
                                        <span className="font-medium tracking-tight">
                                          Chuẩn hóa SOP quy trình dịch vụ khách hàng đa kênh
                                        </span>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <CheckCircle2 size={16} className="mt-1 shrink-0 text-teal-500" />
                                        <span className="font-medium tracking-tight">
                                          Đào tạo & Quản trị năng suất đội ngũ theo chỉ số CSAT & NPS
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </Reorder.Item>
                              );
                            case "ky-niem":
                              return selectedExp.photos && selectedExp.photos.length > 0 ? (
                                <Reorder.Item
                                  value="ky-niem"
                                  key="ky-niem"
                                  className="md:col-span-12 lg:col-span-12 relative z-10 inline-block w-full cursor-grab break-inside-avoid select-none active:cursor-grabbing"
                                  whileHover={{ y: 0 }}
                                  whileDrag={{ scale: 1, zIndex: 50 }}
                                >
                                  <div className="group magic-card relative flex h-full w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] border bg-rose-500/15 p-5 text-left backdrop-blur-3xl transition-all sm:p-6">
                                    <div className="flex w-full shrink-0 items-center justify-between pb-3">
                                      <div className="flex items-center gap-2.5">
                                        <h3 className="flex items-center gap-2 text-[16px] md:text-[18px] font-black tracking-tight text-rose-700 dark:text-rose-400">
                                          <ImageIcon size={18} />
                                          <span>0{badgeNum} · Kỷ niệm</span>
                                        </h3>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => {
                                            playUiSound("click");
                                            setShowGallery(true);
                                          }}
                                          className="cursor-pointer rounded-full border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1 text-[11px] font-black text-rose-700 dark:text-rose-300 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xs"
                                        >
                                          {isVi ? `Xem tất cả (${selectedExp.photos.length})` : `View all (${selectedExp.photos.length})`}
                                        </button>
                                        <div className="cursor-grab text-[var(--muted)] hover:text-[var(--text-primary)] active:cursor-grabbing">
                                          <GripVertical size={16} />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-full">
                                      <div className="group/carousel relative w-full overflow-hidden">
                                        <div className="no-scrollbar flex snap-x gap-2.5 overflow-x-auto py-1">
                                          {selectedExp.photos.map((photo, pIdx) => (
                                            <div
                                              key={pIdx}
                                              onClick={() => {
                                                setActivePhotoIndex(pIdx);
                                                setShowGallery(true);
                                              }}
                                              className="group/item relative h-28 w-28 shrink-0 cursor-pointer snap-start overflow-hidden rounded-xl border border-rose-500/20 bg-rose-500/10 shadow-sm transition-all hover:scale-105 hover:border-rose-500/50 sm:h-36 sm:w-36"
                                            >
                                              <img
                                                src={photo}
                                                alt={`Hình ảnh ${pIdx + 1}`}
                                                loading="lazy"
                                                className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover/item:opacity-100"
                                                referrerPolicy="no-referrer"
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Reorder.Item>
                              ) : null;
                            default:
                              return null;
                          }
                        })}
                      </Reorder.Group>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ENTERPRISE EXPERIENCE BANNER */}

      {/* 1. Detail Modal Popup (Cửa sổ bật lên Báo cáo Chi tiết & Chỉ số) */}
      <AnimatePresence>
        {detailModalExp && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailModalExp(null)}
              className="fixed inset-0  modal-backdrop   "
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "magic-card relative z-10 my-auto flex max-h-[88vh] w-[80vw] max-w-[80vw] flex-col overflow-hidden rounded-[15px] text-left transition-all bg-white/90 backdrop-blur-xl dark:bg-slate-900/90"
              )}
              style={
                detailModalBrand
                  ? {
                      borderColor: detailModalBrand.hex,
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                      boxShadow: detailModalBrand.cardGlowStyle,
                    }
                  : undefined
              }
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between bg-transparent p-5 sm:p-6">
                <div className="flex items-stretch justify-between gap-4 w-full mr-4">
                  {/* Cột trái: 4 Dòng */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5 h-[130px] p-2.5">
                    {/* Dòng 1 : Từ Năm ... đến ... */}
                    <div className="flex items-center gap-2 text-[15px] leading-[16px] font-black text-blue-600 dark:text-blue-400">
                      <Calendar size={13} /> {detailModalExp.yearStart ? `Từ Năm ${detailModalExp.yearStart} đến ${detailModalExp.yearEnd ? `Năm ${detailModalExp.yearEnd}` : "Nay"}` : detailModalExp.time}
                    </div>

                    {/* Nhóm Dòng 2, 3, 4 chung một Logo lớn bên trái */}
                    <div className="flex items-center gap-3 w-full min-w-0">
                      {/* Logo lớn chiếm độ cao cả 3 dòng */}
                      {detailModalExp.logo && (
                        <div
                          className="flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0"
                          style={{
                            borderColor: detailModalBrand?.hex,
                            borderWidth: "1.5px",
                            borderStyle: "solid",
                            boxShadow: `0 0 14px ${detailModalBrand?.hex}60`,
                          }}
                        >
                          <img
                            src={detailModalExp.logo}
                            className="h-full w-full rounded-full object-contain p-1"
                            alt="Company"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {/* Cột chữ gồm Dòng 2, Dòng 3 và Dòng 4 */}
                      <div className="flex flex-col justify-between gap-1.5 min-w-0 flex-1">
                        {/* Dòng 2 : Viễn thông */}
                        {detailModalExp.categoryName && (
                          <div className="flex items-center min-w-0">
                            <span className="rounded-full border  bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-black text-amber-900 dark:text-amber-300">
                              {detailModalExp.categoryName}
                            </span>
                          </div>
                        )}

                        {/* Dòng 3 : Tên công ty (20px) */}
                        <h2
                          className="text-[20px] leading-tight font-black tracking-tight truncate"
                          style={{ color: detailModalBrand?.hex }}
                        >
                          {detailModalExp.company}
                        </h2>

                        {/* Dòng 4 : (Cty Ánh Hào Quang) (18px) */}
                        {detailModalExp.subTitle && (
                          <div className="flex items-center min-w-0">
                            <div
                              className="text-[18px] font-black truncate"
                              style={{ color: detailModalBrand?.hex }}
                            >
                              {detailModalExp.subTitle}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cột phải: Card Kỷ niệm */}
                  {detailModalExp.photos && detailModalExp.photos.length > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiSound("click");
                        setActivePhotoIndex(0);
                        setShowGallery(true);
                      }}
                      className="group/km relative flex h-[130px] w-32 sm:w-40 shrink-0 flex-col justify-between items-center gap-1 rounded-[16px] border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/15 p-2 transition-all duration-300 cursor-pointer backdrop-blur-xl dark:border-rose-500/30 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 shadow-md shadow-rose-500/5 hover:shadow-lg hover:shadow-rose-500/15 hover:scale-[1.02] active:scale-[0.98]"
                      title={isVi ? "Xem Card Hình Kỷ niệm" : "View Photo Memories"}
                    >
                      <div className="relative flex h-16 w-full shrink-0 overflow-hidden rounded-xl border border-rose-500/20 shadow-2xs">
                        <img
                          src={detailModalExp.photos[0]}
                          alt="Kỷ niệm"
                          className="h-full w-full object-cover group-hover/km:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center gap-0.5 text-center text-rose-600 dark:text-rose-400">
                        <div className="flex items-center gap-1 text-[11px] font-black">
                          <ImageIcon size={12} className="shrink-0 text-rose-500" />
                          <span className="whitespace-nowrap">{isVi ? "Card Kỷ niệm" : "Memories"}</span>
                        </div>
                        <span className="text-[10px] font-bold opacity-80">
                          {isVi ? `${detailModalExp.photos.length} hình ảnh` : `${detailModalExp.photos.length} photos`}
                        </span>
                      </div>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setDetailModalExp(null)}
                  className="shrink-0 cursor-pointer rounded-full border border-slate-200/60 bg-white/60 p-2 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xs"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="no-scrollbar overflow-y-auto p-4 sm:p-6">
                {detailModalExp.yearStart === "2026" ? (
                  <div className="space-y-5">
                    <Video2026Card isVi={isVi} />
                  </div>
                ) : (
                  <div className="grid grid-cols-12 gap-4">
                    {/* Bento Box 1: Tổng quan (Span 12 or 8) */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-3 rounded-[20px] border border-slate-200/60 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-5 dark:border-white/5 dark:from-slate-800/40 dark:to-indigo-900/10 backdrop-blur-md">
                      <h3 className="flex items-center gap-2 text-sm font-black tracking-wider text-blue-600 dark:text-blue-400">
                        <Activity size={16} /> {isVi ? "Tổng quan mô tả công việc" : "Job Overview"}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {detailModalExp.desc}
                      </p>
                    </div>

                    {/* Bento Box 2: Quy mô & SOP (Span 12 or 4) */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
                      <div className="flex-1 flex flex-col justify-center rounded-[20px] border border-slate-200/60 bg-white/80 p-4 dark:border-white/5 dark:bg-[#151921]/80 backdrop-blur-md shadow-xs">
                        <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <Users size={14} className="text-blue-500" /> {isVi ? "Quy mô nhân sự" : "Staff Scale"}
                        </span>
                        <p className="mt-1 text-xl font-black text-blue-600 dark:text-blue-400">
                          {detailModalExp.staff > 0 ? (isVi ? `${detailModalExp.staff} Nhân viên` : `${detailModalExp.staff} Staff`) : (isVi ? "Đang phát triển" : "Growing")}
                        </p>
                      </div>
                      <div className="flex-1 flex flex-col justify-center rounded-[20px] border border-slate-200/60 bg-white/80 p-4 dark:border-white/5 dark:bg-[#151921]/80 backdrop-blur-md shadow-xs">
                        <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <BarChart3 size={14} className="text-emerald-500" /> {isVi ? "Chuẩn hóa SOP" : "SOP Standard"}
                        </span>
                        <p className="mt-1 text-xl font-black text-emerald-600 dark:text-emerald-400">
                          100% {isVi ? "Đạt tiêu chuẩn" : "Standardized"}
                        </p>
                      </div>
                    </div>

                    {/* Bento Box 3: Tasks SOP List (Span 12 or 6) */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 rounded-[20px] border border-slate-200/60 bg-white/80 p-5 dark:border-white/5 dark:bg-[#151921]/80 backdrop-blur-md shadow-xs">
                      <h3 className="flex items-center gap-2 text-sm font-black text-purple-600 dark:text-purple-400">
                        <ListChecks size={16} /> {isVi ? "Nhiệm vụ & Công việc" : "Tasks & Responsibilities"}
                      </h3>
                      <div className="flex flex-col gap-3">
                        {detailModalExp.tasks?.map((task, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-purple-500" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bento Box 4: Achievements & CSAT (Span 12 or 6) */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                      {detailModalExp.achievements && detailModalExp.achievements.length > 0 && (
                        <div className="flex-1 rounded-[20px] border border-slate-200/60 bg-white/80 p-5 dark:border-white/5 dark:bg-[#151921]/80 backdrop-blur-md shadow-xs">
                          <h3 className="flex items-center gap-2 mb-4 text-sm font-black text-amber-600 dark:text-amber-400">
                            <Trophy size={16} /> {isVi ? "Kết quả nổi bật" : "Key Achievements"}
                          </h3>
                          <div className="flex flex-col gap-3">
                            {detailModalExp.achievements.map((ach, i) => (
                              <div key={i} className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs font-bold">
                                  <span className="text-slate-700 dark:text-slate-300">{ach.name}</span>
                                  <span className="font-black text-amber-600 dark:text-amber-400">{ach.score}%</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${ach.score}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-4">
                        <div className="flex-1 flex flex-col justify-center rounded-[20px] border border-slate-200/60 bg-white/80 p-4 dark:border-white/5 dark:bg-[#151921]/80 backdrop-blur-md shadow-xs">
                          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            <FolderGit2 size={14} className="text-indigo-500" /> {isVi ? "Dự án" : "Projects"}
                          </span>
                          <p className="mt-1 text-xl font-black text-indigo-600 dark:text-indigo-400">
                            {detailModalExp.projects?.length || 0} {isVi ? "Dự án" : "Projects"}
                          </p>
                        </div>
                        <div className="flex-1 flex flex-col justify-center rounded-[20px] border border-slate-200/60 bg-white/80 p-4 dark:border-white/5 dark:bg-[#151921]/80 backdrop-blur-md shadow-xs">
                          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            <Target size={14} className="text-rose-500" /> CSAT
                          </span>
                          <p className="mt-1 text-xl font-black text-rose-600 dark:text-rose-400">
                            92% - 98%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bento Box 5: Projects List (Span 12) */}
                    {detailModalExp.projects && detailModalExp.projects.length > 0 && (
                      <div className="col-span-12 rounded-[20px] border border-slate-200/60 bg-white/80 p-5 dark:border-white/5 dark:bg-[#151921]/80 backdrop-blur-md shadow-xs">
                        <h3 className="flex items-center gap-2 mb-3 text-sm font-black text-indigo-600 dark:text-indigo-400">
                          <FolderGit2 size={16} /> {isVi ? "Danh sách dự án triển khai" : "Deployed Projects"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {detailModalExp.projects.map((proj, i) => (
                            <span key={i} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-white/5 dark:text-slate-300">
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-slate-200/60 bg-white/60 dark:border-white/10 dark:bg-slate-900/60 backdrop-blur-xl p-4">
                <span className="text-xs font-bold text-[var(--muted)]">
                  {isVi ? "Hồ sơ năng lực & Kinh nghiệm thực chiến" : "Professional Portfolio & CX Track Record"}
                </span>
                <button
                  onClick={() => setDetailModalExp(null)}
                  className="cursor-pointer rounded-xl border border-slate-200/60 bg-white/80 dark:border-white/10 dark:bg-slate-800/80 px-5 py-2 text-xs font-black text-slate-800 dark:text-slate-100 backdrop-blur-md transition-all hover:bg-white dark:hover:bg-slate-700 shadow-xs hover:scale-105 active:scale-95"
                >
                  {isVi ? "Đóng cửa sổ" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGallery(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="magic-card relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[20px] border border-white/20 bg-slate-900/90 text-left backdrop-blur-3xl shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h3 className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  <ImageIcon size={20} className="text-blue-400" /> {isVi ? "Hình ảnh hoạt động" : "Activity Photos"}: {selectedExp.company}
                </h3>
                <button
                  onClick={() => setShowGallery(false)}
                  className="cursor-pointer rounded-full border border-white/10 bg-white/10 p-2 text-slate-300 hover:text-white transition-all hover:bg-white/20 backdrop-blur-md hover:scale-105 active:scale-95 shadow-xs"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="no-scrollbar grid grid-cols-2 gap-4 overflow-y-auto p-6 sm:grid-cols-3 md:grid-cols-4">
                {selectedExp.photos?.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhotoIndex(i)}
                    className={cn(
                      "group/km relative aspect-video cursor-pointer overflow-hidden rounded-[14px] border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-blue-400/60 hover:shadow-xl hover:scale-105 active:scale-95",
                      activePhotoIndex === i
                        ? "ring-2 ring-blue-500 border-blue-500 shadow-lg scale-105"
                        : ""
                    )}
                  >
                    <img
                      src={photo}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/km:scale-105"
                      alt="Activity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/km:opacity-100 backdrop-blur-[2px]">
                      <Maximize2 size={20} className="text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhotoIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 flex max-h-[90vh] max-w-5xl flex-col items-center gap-4"
            >
              <img
                src={selectedExp.photos?.[activePhotoIndex]}
                className="max-h-[80vh] max-w-full rounded-[16px] border border-white/20 shadow-2xl object-contain"
                alt="Zoomed"
              />
              <div className="flex items-center gap-4 rounded-full border border-white/20 bg-black/50 px-6 py-2.5 text-white backdrop-blur-xl shadow-xl">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex((prev) =>
                      prev !== null
                        ? (prev - 1 + (selectedExp.photos?.length || 0)) %
                          (selectedExp.photos?.length || 1)
                        : null,
                    );
                  }}
                  className="cursor-pointer transition-transform hover:scale-110 active:scale-90 hover:text-blue-400"
                >
                  <ChevronLeft size={22} />
                </button>
                <span className="text-xs font-black tracking-widest text-slate-200">
                  {(activePhotoIndex ?? 0) + 1} {"/"}{" "}
                  {selectedExp.photos?.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex((prev) =>
                      prev !== null
                        ? (prev + 1) % (selectedExp.photos?.length || 1)
                        : null,
                    );
                  }}
                  className="cursor-pointer transition-transform hover:scale-110 active:scale-90 hover:text-blue-400"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-4 right-4 cursor-pointer rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-xl transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-lg"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button - Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="absolute bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-violet-600/90 text-white shadow-lg shadow-violet-500/25 backdrop-blur-xl hover:bg-violet-600 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-violet-500/30"
            title={isVi ? "Về đầu trang" : "Scroll to top"}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
