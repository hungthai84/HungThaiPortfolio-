import React, { useState, useEffect, useRef } from "react";
import {
  X,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Check,
  Share2,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  FileCheck,
  ZoomIn,
  Search,
  Calendar,
  Hash,
  FileText,
  Copy,
  Layers,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { playUiSound } from "../../lib/sound";
import { usePageFlipAudio } from "../../hooks/usePageFlipAudio";

// Danh mục tất cả 10 bằng cấp & chứng chỉ
const DIPLOMA_DIRECTORY = [
  {
    titleVi: "Quản trị mạng CCNA",
    titleEn: "CCNA Network Administration",
    issuer: "Trường Nghề Nhất Nghệ",
    year: "2006",
    imageUrl: "https://i.ibb.co/DPVsnrfj/CCNA.png",
    credentialId: "NN-CCNA-2006-441",
  },
  {
    titleVi: "Quản trị hệ thống MCSA",
    titleEn: "MCSA System Administration",
    issuer: "Trường Nghề Nhất Nghệ",
    year: "2005",
    imageUrl: "https://i.ibb.co/ZRp6cDRz/MCSA.png",
    credentialId: "NN-MCSA-2005-312",
  },
  {
    titleVi: "Chứng nhận Quản lý rủi ro",
    titleEn: "Risk Management Certificate",
    issuer: "Prudential Việt Nam",
    year: "2017",
    imageUrl: "https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png",
    credentialId: "PRU-RM-2017-104",
  },
  {
    titleVi: "Chứng nhận Quản lý Dự án",
    titleEn: "Project Management Certificate",
    issuer: "Prudential Việt Nam",
    year: "2016",
    imageUrl: "https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png",
    credentialId: "PRU-PM-2016-042",
  },
  {
    titleVi: "Chứng nhận Quản lý cấp cao",
    titleEn: "Senior Executive Management",
    issuer: "Dale Carnegie Training",
    year: "2015",
    imageUrl: "https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png",
    credentialId: "VED-EXEC-2015-992",
  },
  {
    titleVi: "Chứng nhận Quản lý cấp trung",
    titleEn: "Middle Management Certificate",
    issuer: "Dale Carnegie Training",
    year: "2014",
    imageUrl: "https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png",
    credentialId: "VED-MID-2014-551",
  },
  {
    titleVi: "Đào tạo Thuyết trình",
    titleEn: "Train the Trainer & Presentation",
    issuer: "VietnamWorks",
    year: "2013",
    imageUrl: "https://i.ibb.co/TDD9zdST/o-t-o-Thuy-t-tr-nh.png",
    credentialId: "VNW-TRN-2013-118",
  },
  {
    titleVi: "Kỹ năng Phỏng vấn & Tuyển dụng",
    titleEn: "Interview & Hiring Skills",
    issuer: "VietnamWorks",
    year: "2013",
    imageUrl: "https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png",
    credentialId: "VNW-INT-2013-302",
  },
  {
    titleVi: "Tổng đài viên",
    titleEn: "Call Center Representative Cert",
    issuer: "MobiFone",
    year: "2007",
    imageUrl: "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
    credentialId: "MBF-CC-2007-009",
  },
  {
    titleVi: "Chứng nhận Tổng đài viên",
    titleEn: "Call Center Representative Cert",
    issuer: "MobiFone",
    year: "2007",
    imageUrl: "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
    credentialId: "MBF-CC-2007-009",
  },
  {
    titleVi: "Cử nhân Công nghệ Thông tin",
    titleEn: "Bachelor of IT Degree",
    issuer: "Trường Đại học Công nghệ Sài Gòn (STU)",
    year: "2007",
    imageUrl: "https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png",
    credentialId: "STU-BS-2007-0881",
  },
  {
    titleVi: "Chứng nhận Phân tích dữ liệu",
    titleEn: "Data Analytics & Big Data Cert",
    issuer: "Phát triển chuyên môn",
    year: "2019",
    imageUrl: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    credentialId: "DATA-BD-2019-088",
  },
  {
    titleVi: "Chứng nhận Thiết kế Website",
    titleEn: "Website Design Certificate",
    issuer: "Phát triển kỹ năng số",
    year: "2012",
    imageUrl: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    credentialId: "WEB-DES-2012-054",
  },
  {
    titleVi: "Chứng nhận Đào tạo Chuyên sâu",
    titleEn: "Advanced Professional Training",
    issuer: "Chương trình Đào tạo Nội bộ",
    year: "2013",
    imageUrl: "https://i.ibb.co/ynL53f7X/o-t-o.png",
    credentialId: "TRN-ADV-2013-102",
  },
];

function hexToRgba(hex: string, alpha: number) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

export interface EduItemDetails {
  year: string;
  title: string;
  school: string;
  icon?: any;
  image?: string;
  courseImage?: string;
  diplomaImage?: string;
  desc: string;
  tags: string[];
  categoryVi?: string;
  categoryEn?: string;
  palette: {
    border: string;
    bg: string;
    text: string;
    titleColor: string;
    shadow: string;
    accentHex: string;
  };
  learnedListVi: string[];
  learnedListEn: string[];
  resultsListVi: { text: string; highlights: string[] }[];
  resultsListEn: { text: string; highlights: string[] }[];
  certInfo: {
    titleVi: string;
    titleEn: string;
    issuer: string;
    school?: string;
    year: string;
    imageUrl: string;
    credentialId: string;
  };
}

interface BookEducationCardProps {
  item: EduItemDetails;
  index: number;
  isVi: boolean;
  onCopySummary: (item: EduItemDetails) => void;
  copiedNotification: boolean;
  onOpenCertificateLightbox: (certData: any) => void;
  variants?: any;
}

export function BookEducationCard({
  item,
  index,
  isVi,
  onCopySummary,
  copiedNotification,
  onOpenCertificateLightbox,
  variants,
}: BookEducationCardProps) {
  // Book State: currentPage: 1 (Trang Bìa), 2 (Tổng quan Bento), 3 (Nội dung học), 4 (Năng lực đạt được), 5 (Hình ảnh khóa học), 6 (Văn bằng chứng chỉ)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const { playPageFlipSound } = usePageFlipAudio();

  const IconComponent = item.icon || GraduationCap;
  const palette = item.palette;

  // Change page with animation delay
  const goToPage = (targetPage: number) => {
    if (isAnimating || targetPage === currentPage) return;
    if (targetPage < 1 || targetPage > 6) return;

    playPageFlipSound();

    setIsAnimating(true);
    setCurrentPage(targetPage);

    setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentPage < 6) {
      goToPage(currentPage + 1);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleCloseBook = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    goToPage(1);
  };

  // Touch Swipe Gesture Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0 && currentPage < 6) {
        goToPage(currentPage + 1);
      } else if (diffX < 0 && currentPage > 1) {
        goToPage(currentPage - 1);
      }
    }
    setTouchStartX(null);
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentPage > 1) {
        if (e.key === "ArrowRight") {
          handleNext();
        } else if (e.key === "ArrowLeft") {
          handlePrev();
        } else if (e.key === "Escape") {
          handleCloseBook();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isAnimating]);

  const learnedItems = isVi ? item.learnedListVi : item.learnedListEn;
  const resultsItems = isVi ? item.resultsListVi : item.resultsListEn;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;

    if (currentPage === 1) {
      try {
        playUiSound("click");
      } catch {}
      goToPage(2);
    } else if (currentPage < 5) {
      goToPage(currentPage + 1);
    } else {
      goToPage(1);
    }
  };

  const renderCoverContent = (isOpenSpread: boolean = false) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (currentPage === 1) {
          try {
            playUiSound("click");
          } catch {}
          goToPage(2);
        } else {
          try {
            playUiSound("click");
          } catch {}
          goToPage(1);
        }
      }}
         className={cn(
        "group relative z-30 flex w-full cursor-pointer flex-col gap-[5px] overflow-hidden p-3 transition-all duration-500 ease-out select-none",
        isOpenSpread ? "h-full" : "h-auto",
        "rounded-[20px] border border-white/40 bg-white/75 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/75 dark:shadow-black/30 hover:border-white/90 hover:bg-white/90 dark:hover:border-white/30 dark:hover:bg-slate-900/90"
      )}
    >
      {/* CREASE SHADOW WHEN OPEN AT THE RIGHT EDGE OF COVER */}
      {isOpenSpread && (
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-8 bg-gradient-to-l from-black/40 via-black/15 to-transparent" />
      )}

      {/* TAG NĂM Ở GÓC TRÊN BÊN PHẢI (Icon lịch & Năm, bố cục hài hòa với thẻ học vấn) */}
      <div
        className="absolute top-4 right-4 z-30 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black shadow-md backdrop-blur-md transition-all duration-300 group-hover:scale-105"
        style={{
          backgroundColor: hexToRgba(palette.accentHex, 0.25),
          border: `1.5px solid ${palette.accentHex}`,
        }}
      >
        <Calendar size={13} className="shrink-0" style={{ color: palette.accentHex }} />
        <span
          className="font-mono text-xs font-black tracking-wider"
          style={{ color: palette.accentHex }}
        >
          {isVi ? `Năm ${item.year || "2016"}` : `Year ${item.year || "2016"}`}
        </span>
      </div>

      {/* ICON CHÌM DƯỚI GÓC PHẢI THẺ */}
      <IconComponent
        className="pointer-events-none absolute -right-5 -bottom-5 z-0 size-36 opacity-[0.06] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 dark:opacity-[0.14]"
        style={{ color: palette.accentHex }}
      />

      <div className="relative z-10 flex w-full flex-col gap-[5px]">
        {/* KHUNG 1: Khung Banner hình lấp đầy khung */}
        <div
          className="relative flex h-[180px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-transparent shadow-none backdrop-blur-none transition-all duration-300 dark:bg-transparent dark:shadow-none"
          style={{
            borderWidth: "0px",
            borderStyle: "none",
          }}
        >
          <img
            src={
              item.courseImage ||
              item.image ||
              item.certInfo?.imageUrl ||
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600"
            }
            alt={item.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
              paddingBottom: "0px",
              paddingTop: "0px",
              borderStyle: "none",
              borderRadius: "15px",
              borderWidth: "0px",
            }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* KHUNG 2: Khung tiêu đề gồm icon và tên khóa học (tiêu đề cùng màu với icon) */}
        <div
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-[10px] border-none p-[5px] transition-colors duration-300 !bg-transparent dark:!bg-transparent",
          )}
        >
          <IconComponent
            size={20}
            className="shrink-0"
            style={{ color: palette.accentHex }}
          />
          <h3
            className="flex-1 text-xs leading-snug font-black sm:text-xs"
            style={{ color: palette.accentHex }}
          >
            {item.title}
          </h3>
        </div>

        {/* KHUNG 3: Khung Đơn vị đào tạo */}
        <div
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-[10px] border-none p-[5px] transition-colors duration-300 !bg-transparent dark:!bg-transparent",
          )}
        >
          <GraduationCap
            size={16}
            className="shrink-0"
            style={{ color: palette.accentHex }}
          />
          <div className="flex min-w-0 flex-1 items-center gap-1 truncate text-[14px]">
            <span className="truncate font-black text-slate-900 dark:text-slate-100 text-[14px] leading-[15px]">
              {item.school ||
                (isVi ? "Phát triển chuyên môn" : "Professional Development")}
            </span>
          </div>
        </div>

        {/* KHUNG MÔ TẢ CHI TIẾT KHÓA HỌC (Mô tả hiển thị 3 dòng với Icon & Tiêu đề) */}
        <div
          className="flex shrink-0 items-start gap-2 rounded-[10px] border-none p-[5px] transition-colors duration-300 !bg-transparent dark:!bg-transparent"
        >
          <FileText
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: palette.accentHex }}
          />
          <div className="flex-1 text-[14px] leading-[20px]">
            <span className="line-clamp-3 font-semibold text-slate-800 dark:text-slate-200">
              {item.desc}
            </span>
          </div>
        </div>

        {/* KHUNG HÌNH THỨC ĐÀO TẠO (ĐƯỢC CHUYỂN XUỐNG DƯỚI KHUNG MÔ TẢ, ĐÃ XÓA NĂM) */}
        <div
          className="flex shrink-0 items-center justify-between gap-2 rounded-[10px] border border-slate-200/80 bg-transparent p-[5px] shadow-none backdrop-blur-none transition-colors duration-300 dark:border-white/10 dark:bg-transparent"
        >
          <div className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-xs">
            <Award
              size={14}
              className="shrink-0"
              style={{ color: palette.accentHex }}
            />
            <span className="truncate font-black text-slate-800 dark:text-slate-100 text-[14px] leading-[15px]">
              {isVi
                ? item.categoryVi || "Đào tạo chuyên môn"
                : item.categoryEn || "Professional Training"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInnerPage = () => {
    const courseImg = item.courseImage || item.image || "";
    const diplomaImg = item.diplomaImage || "";
    const certImage = diplomaImg || courseImg;

    return (
      <div
        className={cn(
          "relative z-10 flex h-full w-full flex-col justify-between overflow-hidden p-3 sm:p-4 md:p-5",
          "rounded-[22px] border border-white/80 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/15 dark:bg-slate-900/95"
        )}
      >
        {/* TOP GLOW ACCENT DECORATION */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-36 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: palette.accentHex }}
        />

        {/* POPUP HEADER WITH DETAILS & ACTIONS */}
        <div className="relative z-30 flex shrink-0 flex-col gap-2.5 border-b border-slate-200/70 pb-3 select-none dark:border-slate-800/80">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col min-w-0 flex-1 gap-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                  style={{
                    backgroundColor: palette.accentHex + "18",
                    color: palette.accentHex,
                  }}
                >
                  <Award size={11} />
                  {isVi
                    ? item.categoryVi || "Chứng chỉ chuyên môn"
                    : item.categoryEn || "Certificate"}
                </span>

                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Calendar size={11} />
                  {item.year || "2024"}
                </span>

                {item.certInfo?.credentialId && (
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    <Hash size={10} />
                    {item.certInfo.credentialId}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-black leading-tight text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <GraduationCap size={14} style={{ color: palette.accentHex }} />
                <span>
                  {item.school || (isVi ? "Phát triển chuyên môn" : "Professional Development")}
                </span>
              </div>
            </div>

            {/* QUICK ACTIONS TOOLBAR */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCopySummary(item);
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-all shadow-2xs",
                  copiedNotification
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                )}
                title={isVi ? "Sao chép tóm tắt" : "Copy summary"}
              >
                {copiedNotification ? <Check size={13} /> : <Copy size={13} />}
                <span className="hidden sm:inline">
                  {copiedNotification
                    ? isVi ? "Đã chép!" : "Copied!"
                    : isVi ? "Sao chép" : "Copy"}
                </span>
              </button>

              {certImage && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.certInfo) {
                      onOpenCertificateLightbox({
                        ...item.certInfo,
                        imageUrl: certImage,
                      });
                    }
                  }}
                  className="flex items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-all shadow-2xs"
                  title={isVi ? "Phóng to chứng chỉ" : "Zoom certificate"}
                >
                  <ZoomIn size={13} />
                  <span className="hidden md:inline">{isVi ? "Phóng to" : "Zoom"}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCloseBook}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-900/50"
                title={isVi ? "Đóng popup (Esc)" : "Close popup (Esc)"}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* TAB BUTTONS BAR */}
          <div className="flex w-full items-center gap-1 overflow-x-auto rounded-xl border border-slate-200/70 bg-slate-100/70 p-1 backdrop-blur-md dark:border-slate-800 dark:bg-slate-800/60 custom-scrollbar">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPage(2);
              }}
              className={cn(
                "flex flex-1 min-w-[85px] cursor-pointer items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-black transition-all",
                currentPage === 2
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
              style={currentPage === 2 ? { color: palette.accentHex } : {}}
            >
              <LayoutGrid size={13} className="shrink-0" />
              <span className="truncate">{isVi ? "Tổng quan Bento" : "Bento Overview"}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPage(3);
              }}
              className={cn(
                "flex flex-1 min-w-[85px] cursor-pointer items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-black transition-all",
                currentPage === 3
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
              style={currentPage === 3 ? { color: palette.accentHex } : {}}
            >
              <FileCheck size={13} className="shrink-0" />
              <span className="truncate">{isVi ? "Nội dung học" : "Curriculum"}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPage(4);
              }}
              className={cn(
                "flex flex-1 min-w-[85px] cursor-pointer items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-black transition-all",
                currentPage === 4
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
              style={currentPage === 4 ? { color: palette.accentHex } : {}}
            >
              <Sparkles size={13} className="shrink-0" />
              <span className="truncate">{isVi ? "Năng lực đạt được" : "Outcomes"}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPage(5);
              }}
              className={cn(
                "flex flex-1 min-w-[85px] cursor-pointer items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-black transition-all",
                currentPage === 5
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
              style={currentPage === 5 ? { color: palette.accentHex } : {}}
            >
              <FileText size={13} className="shrink-0" />
              <span className="truncate">{isVi ? "Hình ảnh khóa học" : "Course Images"}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPage(6);
              }}
              className={cn(
                "flex flex-1 min-w-[85px] cursor-pointer items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-black transition-all",
                currentPage === 6
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
              style={currentPage === 6 ? { color: palette.accentHex } : {}}
            >
              <Award size={13} className="shrink-0" />
              <span className="truncate">{isVi ? "Văn bằng chứng chỉ" : "Diplomas"}</span>
            </button>
          </div>
        </div>

        {/* POPUP BODY CONTENT WITH ASYMMETRIC BENTO SPREAD */}
        <div className="custom-scrollbar relative z-20 my-2 flex-1 overflow-y-auto pr-1">
          <AnimatePresence mode="wait">
            {/* TAB 1: ASYMMETRIC BENTO OVERVIEW SPREAD (2 COLUMNS) */}
            {currentPage === 2 && (
              <motion.div
                key="bento-overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-3.5 lg:grid-cols-12"
              >
                {/* BENTO COLUMN 1 (LEFT 7/12): KNOWLEDGE & CURRICULUM */}
                <div className="flex flex-col gap-3 lg:col-span-7">
                  {/* BOX 1.1: SUMMARY & FOUNDATION */}
                  <div
                    className="rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-2xs dark:border-white/10 dark:bg-slate-800/80"
                    style={{
                      borderLeftWidth: "4px",
                      borderLeftColor: palette.accentHex,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h6
                        className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider"
                        style={{ color: palette.accentHex }}
                      >
                        <FileText size={14} />
                        <span>{isVi ? "Nền tảng & Tổng quan khóa học" : "Course Background & Overview"}</span>
                      </h6>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        {item.school}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] leading-relaxed font-semibold text-slate-800 dark:text-slate-200">
                      {item.desc}
                    </p>
                  </div>

                  {/* BOX 1.2: LEARNED HIGHLIGHTS */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-2xs dark:border-white/10 dark:bg-slate-800/80">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h6 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        <FileCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span>{isVi ? "Kiến thức & Kỹ năng cốt lõi:" : "Key Modules & Curriculum:"}</span>
                      </h6>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                        {learnedItems.length} {isVi ? "Mục" : "Topics"}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {learnedItems.slice(0, 4).map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2 rounded-xl bg-slate-50/80 p-2 text-xs font-medium text-slate-800 dark:bg-slate-900/60 dark:text-slate-200 border border-slate-100 dark:border-white/5"
                        >
                          <CheckCircle2
                            size={14}
                            className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                          />
                          <span className="leading-snug">
                            {(point as any).text || String(point)}
                          </span>
                        </div>
                      ))}
                      {learnedItems.length > 4 && (
                        <button
                          type="button"
                          onClick={() => goToPage(3)}
                          className="text-[11px] font-bold text-blue-600 hover:underline dark:text-blue-400 pt-0.5 block"
                        >
                          +{learnedItems.length - 4} {isVi ? "nội dung chi tiết khác →" : "more topics →"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* BOX 1.3: PROFESSIONAL TAGS */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-2xs dark:border-white/10 dark:bg-slate-800/80">
                    <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-1.5">
                      <Hash size={13} />
                      <span>{isVi ? "Từ khóa chuyên môn:" : "Key Competency Tags:"}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => {
                        const cleanTag = tag.replace(/^#\s*/, "");
                        return (
                          <span
                            key={tIdx}
                            className="rounded-lg bg-purple-500/10 px-2.5 py-1 text-[11px] font-extrabold text-purple-800 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-500/20"
                          >
                            #{cleanTag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* BENTO COLUMN 2 (RIGHT 5/12): OUTCOMES & CERTIFICATE PREVIEW */}
                <div className="flex flex-col gap-3 lg:col-span-5">
                  {/* BOX 2.1: OUTCOMES HIGHLIGHTS */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-2xs dark:border-white/10 dark:bg-slate-800/80">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h6 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        <Sparkles size={14} className="text-teal-500" />
                        <span>{isVi ? "Kết quả & Năng lực đạt được:" : "Competencies & Outcomes:"}</span>
                      </h6>
                      <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-extrabold text-teal-600 dark:text-teal-400">
                        {resultsItems.length} {isVi ? "Mục tiêu" : "Goals"}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {resultsItems.slice(0, 3).map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-2 rounded-xl bg-teal-500/5 p-2 text-xs font-medium text-slate-800 dark:bg-teal-950/20 dark:text-slate-200 border border-teal-500/15"
                        >
                          <Sparkles size={13} className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" />
                          <span className="leading-snug">
                            {(res as any).text || String(res)}
                          </span>
                        </div>
                      ))}
                      {resultsItems.length > 3 && (
                        <button
                          type="button"
                          onClick={() => goToPage(4)}
                          className="text-[11px] font-bold text-teal-600 hover:underline dark:text-teal-400 pt-0.5 block"
                        >
                          +{resultsItems.length - 3} {isVi ? "năng lực khác →" : "more outcomes →"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* BOX 2.2: IMAGE PREVIEWS (COURSE & DIPLOMA) */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-2xs dark:border-white/10 dark:bg-slate-800/80 flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700/60">
                      <h6 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        <Award size={14} className="text-amber-500" />
                        <span>{isVi ? "Hình ảnh & Minh chứng:" : "Images & Credentials:"}</span>
                      </h6>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        100% Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* COURSE IMAGE MINI PREVIEW */}
                      <div
                        onClick={() => goToPage(5)}
                        className="group/course relative flex h-28 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 dark:border-white/10 dark:bg-slate-900/80 p-1"
                        title={isVi ? "Xem hình ảnh khóa học" : "View course images"}
                      >
                        {courseImg ? (
                          <>
                            <img
                              src={courseImg}
                              alt={item.title}
                              className="h-full w-full object-contain transition-transform duration-300 group-hover/course:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/course:opacity-100">
                              <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-md">
                                {isVi ? "Hình khóa học" : "Course Image"}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 text-center p-1">
                            <FileText size={20} className="mb-0.5 opacity-40" />
                            <span className="text-[10px] font-medium">
                              {isVi ? "Khóa học" : "Course"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* DIPLOMA IMAGE MINI PREVIEW */}
                      <div
                        onClick={() => goToPage(6)}
                        className="group/diploma relative flex h-28 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 dark:border-white/10 dark:bg-slate-900/80 p-1"
                        title={isVi ? "Xem văn bằng chứng chỉ" : "View diploma"}
                      >
                        {diplomaImg ? (
                          <>
                            <img
                              src={diplomaImg}
                              alt={item.title}
                              className="h-full w-full object-contain transition-transform duration-300 group-hover/diploma:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/diploma:opacity-100">
                              <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-md">
                                {isVi ? "Văn bằng" : "Diploma"}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 text-center p-1">
                            <Award size={20} className="mb-0.5 opacity-40" />
                            <span className="text-[10px] font-medium">
                              {isVi ? "Văn bằng" : "Diploma"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      <span className="truncate">
                        {isVi ? "Đơn vị:" : "Issuer:"} <strong>{item.certInfo?.issuer || item.school}</strong>
                      </span>
                      <span className="shrink-0 font-bold" style={{ color: palette.accentHex }}>
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: FULL CURRICULUM VIEW */}
            {currentPage === 3 && (
              <motion.div
                key="curriculum-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs dark:border-white/10 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between mb-3">
                    <h6 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      <FileCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
                      <span>{isVi ? "Toàn bộ nội dung kiến thức đã học:" : "Full Course Curriculum & Modules:"}</span>
                    </h6>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {learnedItems.length} {isVi ? "Module hoàn tất" : "Completed Modules"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {learnedItems.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 dark:bg-slate-900/60 dark:text-slate-200 border border-slate-100 dark:border-white/5"
                      >
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span className="leading-relaxed">{(point as any).text || String(point)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HASHTAGS */}
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs dark:border-white/10 dark:bg-slate-800/80">
                  <h6 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
                    <Hash size={14} />
                    <span>{isVi ? "Từ khóa chuyên môn & Kỹ năng:" : "Competency Hashtags:"}</span>
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-xl bg-purple-500/10 px-3 py-1 text-xs font-extrabold text-purple-800 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-500/20"
                      >
                        #{tag.replace(/^#\s*/, "")}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: FULL OUTCOMES VIEW */}
            {currentPage === 4 && (
              <motion.div
                key="outcomes-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs dark:border-white/10 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between mb-3">
                    <h6 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      <Sparkles size={16} className="text-teal-500" />
                      <span>{isVi ? "Kết quả, năng lực & giá trị thực tiễn:" : "Practical Outcomes & Impact:"}</span>
                    </h6>
                    <span className="rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-extrabold text-teal-600 dark:text-teal-400">
                      {resultsItems.length} {isVi ? "Mục tiêu đạt được" : "Achieved Goals"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {resultsItems.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-start gap-3 rounded-xl bg-teal-500/5 p-3 text-xs sm:text-[13px] font-semibold text-slate-800 dark:bg-teal-950/20 dark:text-slate-200 border border-teal-500/15"
                      >
                        <Sparkles size={16} className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" />
                        <span className="leading-relaxed">{(res as any).text || String(res)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: HÌNH ẢNH KHÓA HỌC */}
            {currentPage === 5 && (
              <motion.div
                key="course-image-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs dark:border-white/10 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5 mb-3 dark:border-slate-700">
                    <h5 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      <FileText size={16} className="text-teal-500" />
                      <span>{isVi ? "Hình ảnh khóa học:" : "Course Image:"}</span>
                    </h5>
                  </div>

                  <div className="group relative flex min-h-[220px] sm:min-h-[280px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100/60 dark:border-white/10 dark:bg-slate-950/60">
                    {courseImg ? (
                      <>
                        <img
                          src={courseImg}
                          alt={item.title}
                          className="max-h-[320px] w-full object-contain p-2"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.certInfo) {
                                onOpenCertificateLightbox({
                                  ...item.certInfo,
                                  imageUrl: courseImg,
                                });
                              }
                            }}
                            className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-md transition-transform hover:scale-105"
                          >
                            <ZoomIn size={14} />
                            {isVi ? "Phóng to toàn màn hình" : "View Fullscreen"}
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs font-medium text-slate-400 italic">
                        {isVi ? "Không có hình ảnh khóa học" : "No course image attached"}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 5: VĂN BẰNG CHỨNG CHỈ */}
            {currentPage === 6 && (
              <motion.div
                key="diploma-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs dark:border-white/10 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5 mb-3 dark:border-slate-700">
                    <h5 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      <Award size={16} className="text-amber-500" />
                      <span>{isVi ? "Văn bằng chứng chỉ:" : "Diplomas & Certificates:"}</span>
                    </h5>
                    {item.certInfo?.credentialId && (
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                        ID: {item.certInfo.credentialId}
                      </span>
                    )}
                  </div>

                  <div className="group relative flex min-h-[220px] sm:min-h-[280px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100/60 dark:border-white/10 dark:bg-slate-950/60">
                    {diplomaImg ? (
                      <>
                        <img
                          src={diplomaImg}
                          alt={item.title}
                          className="max-h-[320px] w-full object-contain p-2"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.certInfo) {
                                onOpenCertificateLightbox({
                                  ...item.certInfo,
                                  imageUrl: diplomaImg,
                                });
                              }
                            }}
                            className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-md transition-transform hover:scale-105"
                          >
                            <ZoomIn size={14} />
                            {isVi ? "Phóng to toàn màn hình" : "View Fullscreen"}
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs font-medium text-slate-400 italic">
                        {isVi ? "Chưa có hình ảnh văn bằng chứng chỉ" : "No diploma attached"}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <p>
                      {isVi ? "Cấp bởi:" : "Issuer:"}{" "}
                      <strong className="font-bold text-slate-900 dark:text-white">
                        {item.certInfo?.issuer || item.school}
                      </strong>
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar size={13} style={{ color: palette.accentHex }} />
                      <span>{isVi ? "Năm cấp:" : "Year:"}</span>{" "}
                      <strong className="font-bold" style={{ color: palette.accentHex }}>
                        {item.year}
                      </strong>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* POPUP FOOTER PAGINATION & SHORTCUT BAR */}
        <div className="relative z-30 flex shrink-0 items-center justify-between gap-2 border-t border-slate-200/70 pt-2.5 select-none dark:border-slate-800/80">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage <= 2}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-extrabold transition-all",
              currentPage > 2
                ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 shadow-2xs"
                : "cursor-not-allowed border-transparent text-slate-400 opacity-40"
            )}
          >
            <ChevronLeft size={14} />
            <span>{isVi ? "Trước" : "Prev"}</span>
          </button>

          {/* PAGE DOTS INDICATOR */}
          <div className="flex items-center gap-2">
            {[2, 3, 4, 5, 6].map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPage(pageNum);
                }}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-all duration-300",
                  currentPage === pageNum
                    ? "w-6 shadow-xs"
                    : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                )}
                style={currentPage === pageNum ? { backgroundColor: palette.accentHex } : {}}
                aria-label={`Go to page ${pageNum - 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= 6}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-extrabold transition-all",
              currentPage < 6
                ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 shadow-2xs"
                : "cursor-not-allowed border-transparent text-slate-400 opacity-40"
            )}
          >
            <span>{isVi ? "Tiếp" : "Next"}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.div
        layout="position"
        variants={variants}
        className="relative w-full col-span-1 z-10 h-auto"
        style={{ perspective: "2000px" }}
      >
        <div
          ref={cardRef}
          tabIndex={0}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            e.stopPropagation();
            if (isAnimating) return;
            try {
              playUiSound("click");
            } catch {}
            goToPage(2);
          }}
          className="education-item group relative w-full outline-none select-none cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.2,1)]"
          aria-label={`Education card: ${item.title}`}
        >
          {renderCoverContent(false)}
        </div>
      </motion.div>

      {/* POPUP MODAL WITH 3D BOOK OPENING ANIMATION */}
      <AnimatePresence>
        {currentPage > 1 && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-1 sm:p-2.5 md:p-4 overflow-hidden select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseBook}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl transition-all"
            />

            {/* Popup Dialog with Glassmorphic Mirror Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex h-full max-h-[820px] w-full max-w-[1320px] flex-col overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/60 bg-white/95 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] backdrop-blur-3xl dark:bg-slate-900/95 dark:border-white/20"
              style={{ perspective: "2500px" }}
            >
              <div
                ref={cardRef}
                tabIndex={0}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative flex h-full w-full flex-col overflow-hidden outline-none select-none"
                style={{ transformStyle: "preserve-3d", perspective: "2000px" }}
              >
                {/* INNER PAGE SPREAD */}
                <div className="absolute inset-0 h-full w-full opacity-100">
                  {renderInnerPage()}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
