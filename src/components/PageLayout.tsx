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
import {
  UnifiedPageToolbar,
  ToolbarOption,
  ViewModeOption,
} from "./UnifiedPageToolbar";

export const standardPageTitles: Record<string, { vi: string; en: string }> = {
  home: {
    vi: "Trang Chủ",
    en: "Home",
  },
  coverLetter: {
    vi: "Thư Ngỏ",
    en: "Cover Letter",
  },
  education: {
    vi: "Học Vấn",
    en: "Education",
  },
  experience: {
    vi: "Kinh Nghiệm",
    en: "Experience",
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
  interview: {
    vi: "Phỏng Vấn",
    en: "Interview",
  },
  tuvi: {
    vi: "Tử Vi & Phong Thủy",
    en: "Horoscope & Feng Shui",
  },
  memories: {
    vi: "Kỷ Niệm",
    en: "Memories",
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
  websiteManagement: {
    vi: "Quản trị Website",
    en: "Website Management",
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
  education: {
    vi: "Học vấn là hành trình tích lũy tri thức và nâng tầm năng lực.",
    en: "Education is a journey of knowledge accumulation and capability elevation.",
  },
  experience: {
    vi: "Mỗi thử thách là một bài học đắt giá trên hành trình trưởng thành.",
    en: "Every challenge is a valuable lesson on the journey of growth.",
  },
  skills: {
    vi: "Sự chuẩn bị tốt nhất cho tương lai chính là phát triển bản thân ở hiện tại.",
    en: "The best preparation for tomorrow is developing yourself today.",
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
    vi: "Hệ thống vận hành, hạ tầng công nghệ và kiến trúc giải pháp tối ưu.",
    en: "Operational systems, technology infrastructure, and optimal solution architecture.",
  },
  interview: {
    vi: "Chuẩn bị kỹ lưỡng là 50% của thành công.",
    en: "Thorough preparation is 50% of success.",
  },
  tuvi: {
    vi: "Chiêm nghiệm quy luật tự nhiên, vận mệnh và sự cân bằng trong cuộc sống.",
    en: "Contemplating natural laws, destiny, and balance in life.",
  },
  memories: {
    vi: "Những khoảnh khắc quý giá và cột mốc đáng nhớ trên hành trình sự nghiệp.",
    en: "Precious moments and memorable milestones on the career journey.",
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
  websiteManagement: {
    vi: "Hệ thống quản trị và kiểm soát cấu trúc website tập trung.",
    en: "Centralized website structure control and management system.",
  },
};

interface PageLayoutProps {
  id?: string;
  pageId?: PageId;
  pageName?: string; // e.g. "Home Main Card", "Experience Main Card"
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: ElementType;
  children: React.ReactNode;
  background?: React.ReactNode;
  className?: string;
  rootClassName?: string;
  contentContainerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  iconContainerClassName?: string;
  headerClassName?: string;
  headerContainerClassName?: string;
  hideHeader?: boolean;
  headerActions?: React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;

  // Unified Toolbar Props (Search, Group, Filter, View, Actions)
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;

  groupOptions?: ToolbarOption[];
  activeGroup?: string;
  onGroupChange?: (groupId: string) => void;
  groupLabel?: { vi: string; en: string };

  filterOptions?: (ToolbarOption | { id: string; labelVi: string; labelEn: string })[];
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  filterLabel?: { vi: string; en: string };

  viewModeOptions?: ViewModeOption[];
  activeViewMode?: string;
  onViewModeChange?: (mode: string) => void;

  toolbarActions?: React.ReactNode;
  onReset?: () => void;
  showReset?: boolean;
  hideToolbar?: boolean;
  toolbarClassName?: string;
  totalCount?: number;
  filteredCount?: number;

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
  contentContainerClassName,
  titleClassName,
  subtitleClassName,
  iconContainerClassName,
  headerClassName,
  headerContainerClassName,
  hideHeader = false,
  headerActions,
  onScroll,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  showSearch = true,
  groupOptions = [],
  activeGroup,
  onGroupChange,
  groupLabel,
  filterOptions = [],
  activeFilter,
  onFilterChange,
  filterLabel,
  viewModeOptions = [],
  activeViewMode,
  onViewModeChange,
  toolbarActions,
  onReset,
  showReset,
  hideToolbar = false,
  toolbarClassName,
  totalCount,
  filteredCount,
  videoUrl = "https://cdn.scena.ai/project/9306/95e20a75c4af34a76d83b97ffc7ddc0b099bd815eebaad65a9ceef3c73fa19dd.mp4",
  videoTitle,
  isVideoModalOpen: controlledVideoModalOpen,
  onVideoModalToggle,
  customSummary,
}: PageLayoutProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [localVideoModalOpen, setLocalVideoModalOpen] = useState(false);
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
        "relative mx-auto box-border flex min-h-full w-full max-w-full flex-1 flex-col items-center justify-start gap-2.5 sm:gap-3.5 md:gap-4 overflow-x-hidden !bg-transparent !p-0 !border-none !rounded-none !shadow-none transition-all duration-300",
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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        role="main"
        data-view-mode={viewMode}
        onScroll={onScroll}
        className={cn(
          "main-info-card mx-auto box-border h-full min-h-0 w-full max-w-full min-w-0 flex-1",
          "relative z-10 flex flex-col items-center justify-start gap-3 sm:gap-4 overflow-x-hidden transition-all duration-300",
          className,
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex w-full flex-col gap-6 pb-8 px-4 sm:px-6 md:px-0",
            pageId === "home" ? "max-w-full h-full min-h-full flex-1" : "max-w-[1240px]",
            contentContainerClassName
          )}
        >
          {/* 2.1 TOP HEADER BAR: Tiêu đề & Thẻ thanh công cụ tích hợp trang */}
          {!shouldHideHeader && (
            <div
              className={cn(
                "relative z-20 w-full px-0 !bg-transparent space-y-2.5",
                headerContainerClassName,
              )}
            >
              <motion.header
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "relative overflow-hidden w-full px-4 sm:px-6",
                  "transition-all duration-300",
                  "flex flex-col items-start justify-center",
                  "py-1 mb-0 !bg-transparent",
                  headerClassName,
                )}
              >
                {/* Title & Subtitle */}
                <div className="flex w-full min-w-0 items-center justify-between gap-2.5">
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
                            "shrink-0 text-current w-5 h-5 min-w-5 min-h-5 my-auto",
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
              </motion.header>

              {/* THẺ CHỨA CÁC THÔNG SỐ: TÌM KIẾM, NHÓM, FILTER, DẠNG VIEW, NÚT TÍNH NĂNG (NẰM DƯỚI TIÊU ĐỀ) */}
              {/* Only show attached toolbar object on Experience & Projects pages */}
              {!hideToolbar && (pageId === "experience" || pageId === "projects") && (
                <div className="w-full px-4 sm:px-6">
                  <UnifiedPageToolbar
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                    searchPlaceholder={searchPlaceholder}
                    showSearch={showSearch}
                    groupOptions={groupOptions}
                    activeGroup={activeGroup}
                    onGroupChange={onGroupChange}
                    groupLabel={groupLabel}
                    filterOptions={filterOptions as ToolbarOption[]}
                    activeFilter={activeFilter}
                    onFilterChange={onFilterChange}
                    filterLabel={filterLabel}
                    viewModeOptions={viewModeOptions}
                    activeViewMode={activeViewMode}
                    onViewModeChange={onViewModeChange}
                    toolbarActions={toolbarActions || headerActions}
                    onReset={onReset}
                    showReset={showReset}
                    totalCount={totalCount}
                    filteredCount={filteredCount}
                    videoUrl={videoUrl}
                    onVideoClick={() => setIsVideoModalOpen(true)}
                    className={toolbarClassName}
                  />
                </div>
              )}

              {/* Refined Horizontal Divider */}
              {!hideToolbar && (pageId === "experience" || pageId === "projects") && (
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mx-auto mt-2 mb-1 w-4/5 max-w-lg h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-60 dark:opacity-40"
                />
              )}
            </div>
          )}

          {children}
        </div>
      </motion.main>

      {/* 2.3 BOTTOM BANNER: Thông tin Banner & Các câu hỏi tổng kết trang */}

      {/* POPUP VIDEO MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="animate-fadeIn fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex w-[80vw] max-w-[80vw] flex-col items-center space-y-5 overflow-hidden rounded-[15px] border border-purple-500/40 bg-[var(--card)] p-6 shadow-2xl"
            >
              <div className="absolute top-4 left-4 h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse" />

              {/* Modal Header */}
              <div className="flex w-full items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
                    <Video size={18} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black text-[var(--text-primary)] sm:text-base">
                      {videoTitle ||
                        (language === "vi"
                          ? "Video Giới Thiệu Hồ Sơ Năng Lực"
                          : "Portfolio Video Presentation")}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="cursor-pointer rounded-full p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                >
                  <X size={24} />
                </button>
              </div>

              {/* CIRCULAR VIDEO PLAYER IN POPUP */}
              <div className="relative my-3">
                <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-purple-500/80 bg-black shadow-[0_0_35px_rgba(168,85,247,0.45)] ring-4 ring-purple-500/30 sm:h-64 sm:w-64">
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="animate-spin-slow pointer-events-none absolute -inset-3 rounded-full border border-dashed border-purple-500/50" />
              </div>

              {/* Modal Footer */}
              <div className="flex w-full items-center justify-center pt-2">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="cursor-pointer rounded-full bg-purple-600 px-6 py-2 font-bold text-white transition-colors hover:bg-purple-500"
                >
                  {language === "vi" ? "Đóng Video" : "Close Video"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PageLayout;
