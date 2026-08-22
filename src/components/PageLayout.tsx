import React, { ElementType, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Video,
  LayoutGrid,
  ListFilter,
  Languages,
  X,
  HelpCircle,
  Sparkles,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Zap,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { PageId } from "../types";
import { pageSummariesData, PageSummaryInfo } from "../data/pageSummaries";
import { allNavItemsList } from "./Sidebar";

export const standardPageTitles: Record<string, { vi: string; en: string }> = {
  home: {
    vi: "Trang Chủ",
    en: "Home",
  },
  coverLetter: {
    vi: "Thư Ngỏ",
    en: "Cover Letter",
  },
  about: {
    vi: "Giới Thiệu",
    en: "About Me",
  },
  experience: {
    vi: "Kinh Nghiệm",
    en: "Experience",
  },
  education: {
    vi: "Học Vấn",
    en: "Education",
  },
  skills: {
    vi: "Kỹ Năng",
    en: "Skills",
  },
  industries: {
    vi: "Lĩnh Vực",
    en: "Industries",
  },
  projects: {
    vi: "Dự Án",
    en: "Projects",
  },
  systems: {
    vi: "Hệ Thống",
    en: "Systems",
  },
  astrology: {
    vi: "Tử Vi",
    en: "Astrology",
  },
  memories: {
    vi: "Kỷ Niệm",
    en: "Memories",
  },
  interview: {
    vi: "Phỏng Vấn",
    en: "Interview",
  },
  settings: {
    vi: "Cài Đặt & Giao Diện",
    en: "Settings & UI",
  },
  aiChat: {
    vi: "Trợ Lý AI",
    en: "AI Assistant",
  },
  wallpapers: {
    vi: "Hình Nền",
    en: "Wallpapers",
  },
};

export const shortSubtitles: Record<string, { vi: string; en: string }> = {
  home: {
    vi: "Quản trị không phải là kiểm soát, mà là khai phá tiềm năng.",
    en: "Management is not about control, it's about unlocking potential.",
  },
  coverLetter: {
    vi: "Sứ mệnh của tôi là phụng sự và tạo giá trị thực.",
    en: "My mission is to serve and create real value.",
  },
  about: {
    vi: "Lắng nghe là nền tảng của mọi mối quan hệ bền vững.",
    en: "Listening is the foundation of every lasting relationship.",
  },
  experience: {
    vi: "Mỗi thử thách là một bài học đắt giá trên hành trình trưởng thành.",
    en: "Every challenge is a valuable lesson on the journey of growth.",
  },
  education: {
    vi: "Kiến thức là sức mạnh, nhưng áp dụng kiến thức mới là quyền năng.",
    en: "Knowledge is power, but applying knowledge is true mastery.",
  },
  skills: {
    vi: "Công nghệ thay đổi, nhưng thái độ phục vụ là vĩnh cửu.",
    en: "Technology changes, but service attitude is eternal.",
  },
  industries: {
    vi: "Sự đa dạng mang lại góc nhìn đa chiều và đột phá.",
    en: "Diversity brings multi-dimensional perspectives and breakthroughs.",
  },
  projects: {
    vi: "Chi tiết làm nên sự hoàn hảo, và hoàn hảo không phải là chi tiết.",
    en: "Details make perfection, and perfection is not a detail.",
  },
  systems: {
    vi: "Hệ thống tốt là hệ thống phục vụ con người, không phải ngược lại.",
    en: "A good system serves people, not the other way around.",
  },
  astrology: {
    vi: "Hiểu mình để vươn xa, hiểu người để bao dung.",
    en: "Understand yourself to go far, understand others to be tolerant.",
  },
  memories: {
    vi: "Kỷ niệm là tài sản tinh thần quý giá nhất của mỗi chúng ta.",
    en: "Memories are our most precious spiritual assets.",
  },
  interview: {
    vi: "Chuẩn bị kỹ lưỡng là 50% của thành công.",
    en: "Thorough preparation is 50% of success.",
  },
  settings: {
    vi: "Giao diện đơn giản là sự tinh tế tối thượng.",
    en: "Simplicity is the ultimate sophistication.",
  },
  aiChat: {
    vi: "Công nghệ là cánh tay nối dài của trí tuệ con người.",
    en: "Technology is the extension of human intelligence.",
  },
  wallpapers: {
    vi: "Không gian làm việc đẹp khơi nguồn cảm hứng sáng tạo bất tận.",
    en: "A beautiful workspace sparks endless creative inspiration.",
  },
};

interface PageLayoutProps {
  id?: string;
  pageId?: PageId;
  pageName?: string; // e.g. "Home Main Card", "About Main Card"
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: ElementType;
  children: React.ReactNode;
  background?: React.ReactNode;
  className?: string;
  rootClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  iconContainerClassName?: string;
  headerClassName?: string;
  headerContainerClassName?: string;
  hideHeader?: boolean;
  headerActions?: React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;

  // Custom Filters & View modes
  filterOptions?: { id: string; labelVi: string; labelEn: string }[];
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;

  // Custom video popup URL override
  videoUrl?: string;
  videoTitle?: string;

  // External control for video modal
  isVideoModalOpen?: boolean;
  onVideoModalToggle?: (isOpen: boolean) => void;

  // Custom summary Q&A override
  customSummary?: PageSummaryInfo;
}

export function PageLayout({
  id,
  pageId = "home",
  pageName,
  title,
  subtitle,
  icon: Icon,
  children,
  background,
  className,
  rootClassName,
  titleClassName,
  subtitleClassName,
  iconContainerClassName,
  headerClassName,
  headerContainerClassName,
  hideHeader = false,
  headerActions,
  onScroll,
  filterOptions = [],
  activeFilter,
  onFilterChange,
  videoUrl = "https://cdn.scena.ai/project/9306/95e20a75c4af34a76d83b97ffc7ddc0b099bd815eebaad65a9ceef3c73fa19dd.mp4",
  videoTitle,
  isVideoModalOpen: controlledVideoModalOpen,
  onVideoModalToggle,
  customSummary,
}: PageLayoutProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [localVideoModalOpen, setLocalVideoModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);

  const isVideoModalOpen = controlledVideoModalOpen !== undefined ? controlledVideoModalOpen : localVideoModalOpen;
  const setIsVideoModalOpen = (isOpen: boolean) => {
    if (onVideoModalToggle) {
        onVideoModalToggle(isOpen);
    } else {
        setLocalVideoModalOpen(isOpen);
    }
  };

  const summaryInfo =
    customSummary || pageSummariesData[pageId] || pageSummariesData.home;
  const mainCardId = id || `${pageId}-main-card`;
  const displayCardName = pageName || `${title || "Main"} Card`;

  const [isMobileScreen, setIsMobileScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobileScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldHideHeader = hideHeader || pageId === "home";

  // Resolve standard page title based on pageId
  const displayTitle = (() => {
    // Exceptional case: Projects detail view where project is selected
    if (
      pageId === "projects" &&
      title &&
      title !== "Kho 16+ Dự án Chiến lược & SOP Vận hành CSKH" &&
      title !== "16+ Strategic Customer Service & Operations SOPs Repository"
    ) {
      return title;
    }
    // Fall back to standardized titles matching the page names
    if (pageId && standardPageTitles[pageId]) {
      return language === "vi"
        ? standardPageTitles[pageId].vi
        : standardPageTitles[pageId].en;
    }
    return title || t.nav[pageId];
  })();

  const displaySubtitle = (() => {
    // Exceptional case: Projects detail view where project is selected
    if (
      pageId === "projects" &&
      title &&
      title !== "Kho 16+ Dự án Chiến lược & SOP Vận hành CSKH" &&
      title !== "16+ Strategic Customer Service & Operations SOPs Repository" &&
      subtitle
    ) {
      return subtitle;
    }
    // Fall back to the shortened subtitles dictionary
    if (pageId && shortSubtitles[pageId]) {
      return language === "vi"
        ? shortSubtitles[pageId].vi
        : shortSubtitles[pageId].en;
    }
    return subtitle;
  })();

  const navItem = allNavItemsList.find(
    (item) =>
      item.id === pageId ||
      (item.id as string).toLowerCase() ===
        (pageId as string | undefined)?.toLowerCase(),
  );
  const iconColorClass = navItem
    ? navItem.iconColor
        .split(" ")
        .map((cls) => (cls.startsWith("!") ? cls : `!${cls}`))
        .join(" ")
    : "!text-violet-600 dark:!text-violet-400";

  return (
    <div
      id={mainCardId}
      data-card-name={displayCardName}
      className={cn(
        "relative mx-auto box-border flex min-h-full w-full max-w-full flex-1 flex-col items-center justify-start gap-2.5 sm:gap-3.5 md:gap-4 overflow-x-hidden rounded-xl sm:rounded-2xl border-none !bg-transparent !p-[5px] !shadow-none transition-all duration-300",
        rootClassName,
      )}
    >
      {/* Background Layer */}
      {background && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          {background}
        </div>
      )}

      {/* 2.2 MAIN INFO CARD AND HEADER */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        role="main"
        data-view-mode={viewMode}
        onScroll={onScroll}
        className={cn(
          "main-info-card mx-auto box-border h-full min-h-0 w-full max-w-full min-w-0 flex-1",
          "relative z-10 flex flex-col items-center justify-start gap-3 sm:gap-4 overflow-x-hidden border-none !bg-transparent !p-[10px] !shadow-none backdrop-blur-none transition-all duration-300",
          className,
        )}
      >
        <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-4 pb-6 px-1 sm:px-2 md:px-0">
          {/* 2.1 TOP HEADER BAR: Tiêu đề, Popup Video, Filter, View Mode, Giao Diện Icon, Ngôn Ngữ */}
          {!shouldHideHeader && (
            <div
              className={cn(
                "relative z-20 w-full px-0 !bg-transparent",
                headerContainerClassName,
              )}
            >
              <motion.header
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "relative overflow-hidden w-full px-4 sm:px-6 shadow-xs",
                  "border border-[var(--border)] transition-all duration-300",
                  "flex flex-col items-center justify-between gap-2 md:flex-row",
                  "h-[60px] py-0 mb-0 !rounded-full !bg-white dark:!bg-slate-900",
                  headerClassName,
                )}
              >
                {/* Left: Title & Subtitle */}
                <div className="flex w-full min-w-0 items-center gap-2.5 md:w-auto">
                  <div
                    className={cn(
                      "flex min-w-0 flex-col text-left",
                      titleClassName?.includes("text-center") &&
                        "w-full items-center justify-center text-center",
                    )}
                  >
                    <h1
                      className={cn(
                        "m-0 flex items-center gap-2 text-[20px] leading-tight font-black tracking-tight",
                        titleClassName?.includes("text-center") ? "" : "truncate",
                        iconColorClass,
                        titleClassName,
                      )}
                    >
                      {Icon && (
                        <Icon
                          size={20}
                          className={cn(
                            "shrink-0 text-current w-5 h-5 min-w-5 min-h-5",
                            iconContainerClassName,
                          )}
                        />
                      )}
                      <span>
                        {pageId === "coverLetter"
                          ? language === "vi"
                            ? "Thư ngỏ"
                            : "Cover Letter"
                          : displayTitle}
                      </span>
                    </h1>
                    {displaySubtitle && (
                      <p
                        className={cn(
                          "mt-1 text-[15px] font-bold text-[var(--muted)] italic",
                          titleClassName?.includes("text-center")
                            ? "text-center whitespace-normal"
                            : "truncate",
                          subtitleClassName,
                        )}
                      >
                        "{displaySubtitle}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Interactive Control Tools Bar */}
                <div className="flex w-full shrink-0 flex-wrap items-center justify-end gap-2 border-t border-[var(--border)] pt-2 md:w-auto md:border-t-0 md:pt-0">
                  {/* Custom Header Actions passed from parent */}
                  {headerActions}

                  {/* Filter Dropdown (If filterOptions available) */}
                  {filterOptions.length > 0 && onFilterChange && (
                    <div className="relative z-50">
                      <button
                        onClick={() => {
                          playUiSound("click");
                          setIsFilterDropdownOpen(!isFilterDropdownOpen);
                        }}
                        className={cn(
                          "flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-black shadow-xs transition-all duration-200 select-none",
                          activeFilter && activeFilter !== "All"
                            ? "border-indigo-500/50 bg-indigo-500/15 text-indigo-700 dark:border-indigo-400/40 dark:bg-indigo-500/25 dark:text-indigo-300 ring-2 ring-indigo-500/20"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-indigo-500/30 hover:bg-[var(--border)]"
                        )}
                        title={
                          language === "vi" ? "Bộ lọc danh mục" : "Filter category"
                        }
                      >
                        <Filter size={14} className={cn("shrink-0", activeFilter && activeFilter !== "All" ? "text-indigo-600 dark:text-indigo-400" : iconColorClass)} />
                        <span className="hidden sm:inline">
                          {language === "vi" ? "Lọc danh mục:" : "Filter:"}
                        </span>
                        <span className={cn("font-black", activeFilter && activeFilter !== "All" ? "text-indigo-600 dark:text-indigo-300" : iconColorClass)}>
                          {filterOptions.find((f) => f.id === activeFilter)?.[
                            language === "vi" ? "labelVi" : "labelEn"
                          ] || (language === "vi" ? "Tất cả" : "All")}
                        </span>
                        <ChevronDown size={13} className="text-[var(--muted)]" />
                      </button>

                      <AnimatePresence>
                        {isFilterDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.95 }}
                            className="absolute right-0 mt-1.5 flex w-52 flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-xl backdrop-blur-xl"
                          >
                            {filterOptions.map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  playUiSound("toggle");
                                  onFilterChange(opt.id);
                                  setIsFilterDropdownOpen(false);
                                }}
                                className={cn(
                                  "flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-black transition-all",
                                  activeFilter === opt.id
                                    ? `bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-extrabold border border-indigo-500/30`
                                    : "text-[var(--text-secondary)] hover:bg-[var(--border)]",
                                )}
                              >
                                <span>
                                  {language === "vi" ? opt.labelVi : opt.labelEn}
                                </span>
                                {activeFilter === opt.id && (
                                  <Check size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.header>
            </div>
          )}

          {children}
        </div>
      </motion.main>

      {/* 2.3 BOTTOM BANNER: Thông tin Banner & Các câu hỏi tổng kết trang */}

      {/* POPUP VIDEO MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center  modal-backdrop  p-3   sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-[10px] border border-purple-500/40 bg-[var(--surface)] shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] p-3.5 sm:p-4">
                <div className="flex items-center gap-2">
                  <Video size={18} className="text-rose-500" />
                  <h3 className="m-0 text-sm font-black text-[var(--text-primary)] sm:text-base">
                    {videoTitle ||
                      (language === "vi"
                        ? "Video Giới Thiệu Hồ Sơ Năng Lực"
                        : "Portfolio Video Presentation")}
                  </h3>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="cursor-pointer rounded-lg bg-[var(--text-primary)]/10 p-1.5 text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)]/20"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player Box */}
              <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-black">
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--bg)] p-3 text-xs font-medium text-[var(--muted)] sm:p-4">
                <span>Nguyễn Hùng Thái • Head of Customer Experience</span>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="cursor-pointer rounded-xl bg-purple-600 px-3 py-1.5 font-bold text-white transition-colors hover:bg-purple-500"
                >
                  {language === "vi" ? "Đóng" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
