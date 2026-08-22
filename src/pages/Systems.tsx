import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Server as ServerIcon,
  Layers as LayersIcon,
  Briefcase as BriefcaseIcon,
  Users as UsersIcon,
  User as UserIcon,
  ClipboardList as ClipboardDocumentListIcon,
  Trophy as TrophyIcon,
  Heart as HeartIcon,
  BookOpen as BookOpenIcon,
  Phone as PhoneIcon,
  BarChart3 as ChartBarIcon,
  Bot as BotIcon,
  Package as CubeIcon,
  Folder as FolderIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Database,
  Sparkles,
  XCircle,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";

// --- Icons mapping ---
const Icons = {
  ServerIcon,
  LayersIcon,
  BriefcaseIcon,
  UsersIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  TrophyIcon,
  HeartIcon,
  BookOpenIcon,
  PhoneIcon,
  ChartBarIcon,
  BotIcon,
  CubeIcon,
  FolderIcon,
  PauseIcon,
  PlayIcon,
};

// --- Type definitions ---
interface System {
  key: string;
  name: string;
  desc: string;
  nameEn: string;
  link: string;
  icon: keyof typeof Icons;
  color: string;
  category: "platform" | "enterprise" | "growth";
}

// --- Systems Data ---
const systemsData: System[] = [
  {
    key: "SDP",
    name: "Website dành cho phòng CSKH",
    nameEn: "Service Delivery Platform",
    desc: "Trang làm việc chính của Phòng Chăm sóc Khách hàng, đóng vai trò là cổng truy cập tập trung (Portal) để nhân viên sử dụng toàn bộ các hệ thống nghiệp vụ.",
    link: "https://www.sdpplatfrom.powerservice.one",
    icon: "LayersIcon",
    color: "#3b82f6",
    category: "platform",
  },
  {
    key: "CSC",
    name: "Trung tâm Chăm sóc Khách hàng",
    nameEn: "Customer Service Center",
    desc: "Quản lý tương tác đa kênh (Omnichannel), tiếp nhận và xử lý yêu cầu hỗ trợ, quản lý Ticket, SLA, lịch sử liên hệ và Helpdesk.",
    link: "https://www.cscplatform.powerservice.one",
    icon: "PhoneIcon",
    color: "#06b6d4",
    category: "platform",
  },
  {
    key: "CRM",
    name: "Quản lý Quan hệ Khách hàng",
    nameEn: "Customer Relationship Management",
    desc: "Quản lý khách hàng, bán hàng, marketing, chăm sóc khách hàng và toàn bộ hành trình trải nghiệm khách hàng.",
    link: "https://www.crmplatfrom.powerservice.one",
    icon: "UsersIcon",
    color: "#f59e0b",
    category: "platform",
  },
  {
    key: "ERP",
    name: "Tài chính kế toán",
    nameEn: "Enterprise Resource Planning",
    desc: "Quản lý nguồn lực và hoạt động nội bộ của doanh nghiệp như tài chính, kế toán, mua hàng, kho, sản xuất, tài sản và các hoạt động vận hành.",
    link: "https://www.erpplatfrom.powerservice.one",
    icon: "BriefcaseIcon",
    color: "#10b981",
    category: "enterprise",
  },
  {
    key: "HRM",
    name: "Quản lý Nguồn nhân lực",
    nameEn: "Human Resource Management",
    desc: "Quản lý toàn bộ vòng đời nhân viên từ tuyển dụng, hồ sơ nhân sự, chấm công, tính lương, đào tạo, đánh giá năng lực đến phát triển nghề nghiệp.",
    link: "https://www.hrmplatfrom.powerservice.one",
    icon: "UserIcon",
    color: "#8b5cf6",
    category: "enterprise",
  },
  {
    key: "BPM",
    name: "Quản lý Quy trình Nghiệp vụ",
    nameEn: "Business Process Management",
    desc: "Chuẩn hóa, số hóa và tự động hóa các quy trình nghiệp vụ nhằm nâng cao hiệu quả quản lý và vận hành doanh nghiệp.",
    link: "https://www.bmpplatform.powerservice.one",
    icon: "ClipboardDocumentListIcon",
    color: "#ec4899",
    category: "enterprise",
  },
  {
    key: "OKR",
    name: "Quản lý Mục tiêu",
    nameEn: "Objectives and Key Results",
    desc: "Thiết lập mục tiêu chiến lược, theo dõi kết quả then chốt (Key Results), quản lý kế hoạch, dự án và đánh giá hiệu suất của cá nhân, phòng ban và doanh nghiệp.",
    link: "https://www.okrplatfrom.powerservice.one",
    icon: "TrophyIcon",
    color: "#f97316",
    category: "enterprise",
  },
  {
    key: "CLP",
    name: "Khách hàng Thân thiết",
    nameEn: "Customer Loyalty Platform",
    desc: "Quản lý chương trình thành viên, tích điểm, phân hạng khách hàng, ưu đãi, voucher, chiến dịch chăm sóc và gia tăng mức độ trung thành của khách hàng.",
    link: "https://www.clpplatform.powerservice.one",
    icon: "HeartIcon",
    color: "#ef4444",
    category: "growth",
  },
  {
    key: "LMS",
    name: "Quản lý Đào tạo",
    nameEn: "Learning Management System",
    desc: "Xây dựng và quản lý khóa học trực tuyến, kiểm tra, đánh giá năng lực, cấp chứng chỉ và phát triển nguồn nhân lực.",
    link: "https://www.lmsplatfrom.powerservice.one",
    icon: "BookOpenIcon",
    color: "#14b8a6",
    category: "growth",
  },
  {
    key: "BI Dashboard",
    name: "Báo cáo và Phân tích",
    nameEn: "Business Intelligence Dashboard",
    desc: "Thu thập, tổng hợp, phân tích và trực quan hóa dữ liệu theo thời gian thực, hỗ trợ lãnh đạo đưa ra quyết định dựa trên dữ liệu.",
    link: "(Đang triển khai)",
    icon: "ChartBarIcon",
    color: "#0284c7",
    category: "growth",
  },
  {
    key: "AI Assistant",
    name: "Trợ lý Trí tuệ Nhân tạo",
    nameEn: "Artificial Intelligence Assistant",
    desc: "Hỗ trợ người dùng bằng AI trong việc tìm kiếm tri thức, phân tích dữ liệu, tạo nội dung, tự động hóa quy trình, hỗ trợ ra quyết định và nâng cao năng suất làm việc.",
    link: "https://www.aiplatfrom.powerservice.one",
    icon: "BotIcon",
    color: "#d946ef",
    category: "growth",
  },
  {
    key: "POS",
    name: "Quản lý bán hàng",
    nameEn: "Point of Sale",
    desc: "Quản lý bán hàng tại quầy, đơn hàng, thanh toán, hóa đơn, tồn kho và đồng bộ dữ liệu với CRM, ERP và các hệ thống quản trị khác.",
    link: "https://www.posplatform.powerservice.one",
    icon: "CubeIcon",
    color: "#84cc16",
    category: "growth",
  },
];

// --- Sub-component: SystemCard ---
const SystemCard: React.FC<{
  system: System;
  index: number;
  language: string;
}> = ({ system, index, language }) => {
  const isVi = language === "vi";
  const Icon = Icons[system.icon] || Icons.FolderIcon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => {
      if (element) {
        observer.disconnect();
      }
    };
  }, []);

  const handleClick = () => {
    if (system.link && system.link !== "(Đang triển khai)") {
      let url = system.link;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      window.open(url, "_blank");
    }
  };

  return (
    <div
      id={`system-card-${system.key}`}
      ref={cardRef}
      className={`system-card-container fade-in-up-on-scroll ${isFlipped ? "is-flipped" : ""}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleClick}
      style={
        {
          "--item-color": system.color,
          transitionDelay: `${index * 50}ms`,
        } as React.CSSProperties
      }
    >
      <div className="system-card-inner">
        {/* Mặt trước */}
        <div className="system-card-front">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              width: "100%",
            }}
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, index % 2 === 0 ? 5 : -5, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5 + (index % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.25, rotate: 15 }}
              style={{ flexShrink: 0, display: "inline-flex" }}
            >
              <Icon
                size={38}
                style={{
                  color: system.color,
                  filter: `drop-shadow(0 4px 8px ${system.color}40)`,
                }}
              />
            </motion.div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                textAlign: "left",
                minWidth: 0,
                flex: 1,
              }}
            >
              {/* Dòng 1: SDP (Service Delivery Platform) */}
              <div
                style={{
                  color: system.color,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  lineHeight: "1.2",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {system.key}{" "}
                <span
                  style={{
                    opacity: 0.85,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  ({system.nameEn})
                </span>
              </div>
              {/* Dòng 2: Nền tảng điều hành dịch vụ */}
              <div
                className="text-slate-900 dark:text-slate-100"
                style={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  lineHeight: "1.3",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {isVi ? system.name : system.nameEn}
              </div>
            </div>
          </div>
        </div>

        {/* Mặt sau */}
        <div
          className="system-card-back"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0.85rem",
            backgroundColor: `${system.color}B3`,
            color: "white",
          }}
        >
          <p
            className="description text-justify"
            style={{
              margin: 0,
              fontSize: "0.8rem",
              lineHeight: 1.4,
              color: "white",
            }}
          >
            {system.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Custom Hook to match snippet's useI18n ---
const useI18n = () => {
  const { language, t } = useLanguage();
  return { language, t };
};

// --- Main Page Component ---
export const SystemsPage: React.FC<{ id?: string }> = ({ id }) => {
  const { t, language } = useI18n();
  const isVi = language === "vi";

  // Section Expand/Collapse State
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    platform: true,
    enterprise: true,
    growth: true,
  });

  const allExpanded = Object.values(expandedSections).every(Boolean);

  const toggleSection = (catKey: string) => {
    setExpandedSections((prev) => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const toggleAllSections = () => {
    const next = !allExpanded;
    setExpandedSections({
      platform: next,
      enterprise: next,
      growth: next,
    });
  };

  // Video popup state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const sectionCategories = [
    {
      key: "platform",
      titleVi: "Nền tảng CSKH & Vận hành Dịch vụ",
      titleEn: "Service Platform & Customer Care",
      badge: "Portal & CSC",
      color:
        "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    {
      key: "enterprise",
      titleVi: "Hệ thống Quản trị Doanh nghiệp",
      titleEn: "Enterprise Management Systems",
      badge: "ERP & HRM & BPM",
      color:
        "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    {
      key: "growth",
      titleVi: "Trí tuệ Nhân tạo, Đào tạo & Tăng trưởng",
      titleEn: "AI, Experience & Loyalty",
      badge: "AI & CLP & POS",
      color:
        "from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
    },
  ];

  return (
    <PageLayout
      id={id || "systems-main-card"}
      rootClassName="w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border border-[var(--border)] relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="systems"
      pageName="Systems Main Card"
      title={isVi ? "Hệ thống Vận hành" : "Operated Systems"}
      subtitle={
        isVi
          ? "Hệ sinh thái nền tảng và các hệ thống vận hành."
          : "The platform ecosystem and operated operational management systems."
      }
      icon={ServerIcon}
      headerActions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs font-black text-sky-700 dark:text-sky-300 shadow-xs backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            <span>{isVi ? "6 Hệ Thống Vận Hành" : "6 Operating Systems"}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-black text-purple-700 dark:text-purple-300 shadow-xs backdrop-blur-md">
            <Database size={13} className="text-purple-600 dark:text-purple-400" />
            <span>{isVi ? "ERP · CRM · Omnichannel" : "ERP · CRM · Omni"}</span>
          </div>
          <button
            type="button"
            id="header-video-badge"
            className="relative flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-gradient-to-r from-rose-500/20 to-pink-500/20 px-3 py-1.5 text-xs font-black text-rose-600 dark:text-rose-400 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95 hover:bg-rose-500/30 backdrop-blur-md"
            title={isVi ? "Xem popup video giới thiệu hệ thống" : "Watch systems intro video popup"}
            onClick={() => {
              playUiSound("click");
              setIsVideoModalOpen(true);
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <Icons.PlayIcon style={{ width: "12px", height: "12px", marginLeft: "1px" }} />
            <span>{isVi ? "Video Giới Thiệu" : "Watch Video"}</span>
          </button>
        </div>
      }
    >
      <style>{`
                .systems-grid {
                    display: grid;
                    grid-template-columns: repeat(1, minmax(0, 1fr));
                    gap: 15px;
                    justify-content: center;
                    align-content: center;
                    align-items: center;
                    justify-items: center;
                    margin: auto;
                    width: 100%;
                    max-width: 1100px;
                }
                @media (min-width: 640px) {
                    .systems-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
                @media (min-width: 1024px) {
                    .systems-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }

                .system-card-container {
                    perspective: 1000px;
                    cursor: pointer;
                    height: 120px;
                    width: 100%;
                    background-color: transparent;
                    border: none;
                    box-shadow: none;
                    transition: transform 0.3s ease;
                    border-radius: 10px;
                }
                .system-card-container:hover {
                    transform: none;
                }
                .system-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                    border-radius: 10px;
                }
                .system-card-container.is-flipped .system-card-inner {
                    transform: rotateY(180deg);
                }
                .system-card-front, .system-card-back {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    border-radius: 10px;
                    padding: 10px;
                    box-sizing: border-box;
                    /* Nền trong suốt 50% thẻ */
                    background-color: color-mix(in srgb, var(--item-color) 8%, rgba(255, 255, 255, var(--card-opacity, 0.95)));
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1.5px solid color-mix(in srgb, var(--item-color) 30%, rgba(226, 232, 240, 0.50));
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.04);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                :is(.dark) .system-card-front, :is(.dark) .system-card-back {
                    /* Nền trong suốt 50% thẻ dark mode */
                    background-color: color-mix(in srgb, var(--item-color) 12%, rgba(15, 23, 42, var(--card-opacity, 0.85)));
                    border-color: color-mix(in srgb, var(--item-color) 35%, rgba(255, 255, 255, 0.12));
                }
                .system-card-back {
                    transform: rotateY(180deg);
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            `}</style>
      <div
        id="systems-main-card"
        className="mx-auto animate-fade-in custom-scrollbar relative flex h-full min-h-full w-full max-w-[1240px] flex-1 flex-col items-center justify-center gap-6 overflow-y-auto border-none !p-0 text-left shadow-none !bg-transparent my-auto"
      >
        {/* Flat Grid for all systems */}
        <div
          style={{ minHeight: "480px", height: "100%", paddingTop: "15px", paddingBottom: "15px", paddingRight: "15px", paddingLeft: "15px" }}
          className="no-scrollbar my-auto flex w-full flex-1 flex-col items-center justify-center overflow-y-auto py-2"
        >
          <div className="systems-grid w-full">
            {systemsData.map((system, index) => (
              <SystemCard
                key={system.key}
                system={system}
                index={index}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* SYSTEMS VIDEO POPUP MODAL (IDENTICAL FORMAT TO ASTROLOGY) */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <div className="animate-fadeIn fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative flex w-[80vw] max-w-[80vw] flex-col items-center space-y-5 overflow-hidden rounded-[15px] border border-rose-500/40 bg-[var(--card)] p-6 shadow-2xl"
              >
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500" />

                <div className="flex w-full items-center justify-between border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                      <Sparkles size={18} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-black text-[var(--text-primary)] sm:text-base">
                        {isVi
                          ? "Video Giới Thiệu Hệ Thống Vận Hành (AI Avatar)"
                          : "Operated Systems AI Video Interpretation"}
                      </h3>
                      <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                        {isVi
                          ? "ERP · CRM · Omnichannel · Hệ Thống Số Hóa Doanh Nghiệp"
                          : "ERP · CRM · Omnichannel · Enterprise Operations"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(false)}
                    className="cursor-pointer rounded-full p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                {/* LARGE CIRCULAR VIDEO IN POPUP */}
                <div className="relative my-3">
                  <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-rose-500/80 bg-black shadow-[0_0_35px_rgba(244,63,94,0.45)] ring-4 ring-rose-500/30 sm:h-64 sm:w-64">
                    <video
                      src="https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4"
                      autoPlay
                      loop
                      controls
                      playsInline
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="animate-spin-slow pointer-events-none absolute -inset-3 rounded-full border border-dashed border-rose-500/50" />
                </div>

                <div className="w-full space-y-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-center">
                  <p className="text-xs font-bold text-[var(--text-primary)]">
                    {isVi
                      ? "Trợ lý AI thuyết minh tổng quan kiến trúc và phương pháp vận hành các hệ thống ERP, CRM, POS & Omnichannel."
                      : "AI Assistant presenting architectural governance and operation methodologies across ERP, CRM, POS & Omnichannel platforms."}
                  </p>
                </div>

                <div className="flex w-full justify-end border-t border-[var(--border)] pt-3">
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(false)}
                    className="cursor-pointer rounded-xl bg-rose-500 px-5 py-2 text-xs font-black tracking-wider text-white shadow-md transition-colors hover:bg-rose-600"
                  >
                    {isVi ? "Đóng Popup" : "Close Popup"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

export const Systems = SystemsPage;
export default SystemsPage;
