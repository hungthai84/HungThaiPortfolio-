import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { timelineData } from "../../data/coverLetterData";
import { useLanguageContent } from "../../hooks/useCoverLetter";
import { cn } from "../../lib/utils";
import { getBrandColorConfig } from "../../lib/brandColors";

const renderTextWithLogos = (text: string) => {
  const companyKeywords = [
    { name: "MobiFone", url: "https://i.ibb.co/qYBWg57r/Mobifone.png" },
    { name: "Viễn Liên V247", url: "https://i.ibb.co/2Y3tNsnd/Call-V247.png" },
    { name: "V247", url: "https://i.ibb.co/2Y3tNsnd/Call-V247.png" },
    { name: "HTV LBC", url: "https://i.ibb.co/DDYsQ20B/LBC.png" },
    { name: "LBC – HTV Cable", url: "https://i.ibb.co/DDYsQ20B/LBC.png" },
    { name: "HTV Cable", url: "https://i.ibb.co/DDYsQ20B/LBC.png" },
    { name: "LBC", url: "https://i.ibb.co/DDYsQ20B/LBC.png" },
    { name: "Garena", url: "https://i.ibb.co/BHxMzQFk/Garena.png" },
    { name: "Shopee", url: "https://i.ibb.co/F4T7Zr0k/Shoppe.png" },
    { name: "AirPay", url: "https://i.ibb.co/HTPmHMMQ/Airpay.png" },
    { name: "ShopeePay", url: "https://i.ibb.co/RTPz5Cc3/Shopee-Pay.png" },
    { name: "Prudential", url: "https://i.ibb.co/LThmXHs/Prudentinal.png" },
    { name: "MoMo", url: "https://i.ibb.co/jXJXLvT/Momo.png" },
    { name: "Ví ECO", url: "https://i.ibb.co/mVfX9RkG/Finviet.png" },
    { name: "FinViet", url: "https://i.ibb.co/mVfX9RkG/Finviet.png" },
  ];

  const sortedKeywords = [...companyKeywords].sort(
    (a, b) => b.name.length - a.name.length,
  );
  const regexParts = sortedKeywords.map((k) =>
    k.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
  );
  const regex = new RegExp(`(${regexParts.join("|")})`, "g");

  const parts = text.split(regex);
  return parts.map((part, index) => {
    const matched = sortedKeywords.find(
      (k) => k.name.toLowerCase() === part.toLowerCase(),
    );
    if (matched) {
      return (
        <span
          key={index}
          className="mx-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200/50 bg-white px-1.5 py-0.5 align-middle font-black text-slate-800 shadow-2xs transition-all hover:scale-105 dark:border-slate-700/50 dark:bg-slate-800 dark:text-slate-200"
        >
          <img
            src={matched.url}
            alt={matched.name}
            className="inline-block h-6 w-6 shrink-0 rounded-full border border-slate-200 object-cover shadow-xs dark:border-slate-700"
            referrerPolicy="no-referrer"
          />
          <span>{part}</span>
        </span>
      );
    }
    return part;
  });
};

interface TimelineItemProps {
  year: string;
  company: string;
  role: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  isSelected: boolean;
  isLast: boolean;
  onToggle: () => void;
}

const TimelineItem = React.memo(function TimelineItem({
  year,
  company,
  role,
  desc,
  icon: IconComponent,
  color: _color,
  isSelected,
  isLast,
  onToggle,
}: TimelineItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  const brand = getBrandColorConfig(company || year);

  return (
    <div className="relative pb-2 sm:pb-3" id={`timeline-item-${year}`}>
      {/* Connection Line & Dots (only if not last) */}
      {!isLast && (
        <div className="absolute top-[44px] bottom-[-8px] left-[24px] z-0 flex flex-col items-center py-1 opacity-70">
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c59b27] dark:bg-amber-400" />
          <div className="my-1 w-0.5 flex-grow bg-gradient-to-b from-[#0b2853] via-[#c59b27] to-[#0b2853] dark:from-amber-400 dark:to-sky-400" />
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b2853] dark:bg-sky-400" />
        </div>
      )}

      <motion.div
        whileHover={{ x: 2 }}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isSelected}
        aria-label={`Chi tiết năm ${year} tại ${company}`}
        className={cn(
          "group relative z-10 flex cursor-pointer items-start gap-3 rounded-xl border p-2.5 outline-hidden transition-all",
          !isSelected && "border-transparent hover:bg-black/5 dark:hover:bg-white/5"
        )}
        style={
          isSelected
            ? {
                borderColor: brand.hex,
                borderWidth: "1.5px",
                borderStyle: "solid",
                boxShadow: brand.cardGlowStyle,
              }
            : undefined
        }
      >
        <div
          className={cn(
            "relative z-20 flex h-9 w-9 min-w-[36px] shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-transform group-hover:scale-110 dark:bg-slate-900"
          )}
          style={
            isSelected
              ? {
                  borderColor: brand.hex,
                  borderWidth: "1.5px",
                  borderStyle: "solid",
                  color: brand.hex,
                  boxShadow: brand.logoGlowStyle,
                }
              : {
                  borderColor: "rgba(11, 40, 83, 0.4)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }
          }
        >
          <IconComponent size={15} />
        </div>

        <div className="flex-grow pt-0.5 text-left">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="flex flex-wrap items-center gap-1 text-xs font-extrabold text-[#0b2853] dark:text-amber-300">
              <span>{year} - </span>
              {renderTextWithLogos(company)}
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-400 dark:bg-slate-800">
              {role}
            </span>
          </div>
          <div className="mt-2 rounded-xl border border-indigo-500/25 bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent p-3 shadow-2xs backdrop-blur-md dark:border-indigo-400/25 dark:from-indigo-950/40 dark:via-sky-950/20">
            <p className="text-xs leading-relaxed font-bold text-slate-900 dark:text-slate-100">
              {renderTextWithLogos(desc)}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

interface CareerTimelineProps {
  activeYear: string | null;
  onToggleYear: (year: string) => void;
}

export function CareerTimeline({
  activeYear,
  onToggleYear,
}: CareerTimelineProps) {
  const { t, language } = useLanguageContent();
  const isVi = language === "vi";

  const phase1Items = timelineData.slice(0, 4);
  const phase2Items = timelineData.slice(4, 8);

  return (
    <div className="relative my-2 w-full space-y-4" id="career-timeline">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Phase 1: 2003 - 2013 */}
        <div className="relative space-y-3 rounded-2xl border border-black/5 bg-slate-50/50 p-3 sm:p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-black tracking-wider text-[#0b2853] uppercase dark:text-amber-300">
                {isVi ? "Giai đoạn 2003 – 2013" : "Phase 2003 – 2013"}
              </span>
            </div>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-extrabold text-amber-700 dark:text-amber-300">
              {isVi ? "Nền Tảng & Tăng Trưởng" : "Foundation & Operations"}
            </span>
          </div>

          <div className="relative pt-1">
            {phase1Items.map((evt, idx) => {
              const isSelected = activeYear === evt.year;
              const isLast = idx === phase1Items.length - 1;
              const localizedEvent = t.timeline[idx] || { role: "", desc: "" };

              return (
                <TimelineItem
                  key={evt.year}
                  year={evt.year}
                  company={evt.company}
                  role={localizedEvent.role}
                  desc={localizedEvent.desc}
                  icon={evt.icon}
                  color={evt.color}
                  isSelected={isSelected}
                  isLast={isLast}
                  onToggle={() => onToggleYear(evt.year)}
                />
              );
            })}
          </div>
        </div>

        {/* Phase 2: 2015 - 2023 */}
        <div className="relative space-y-3 rounded-2xl border border-black/5 bg-slate-50/50 p-3 sm:p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-xs font-black tracking-wider text-[#0b2853] uppercase dark:text-sky-300">
                {isVi ? "Giai đoạn 2015 – 2023" : "Phase 2015 – 2023"}
              </span>
            </div>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-extrabold text-sky-700 dark:text-sky-300">
              {isVi ? "FinTech & Công Nghệ Số" : "FinTech & Digital Scale"}
            </span>
          </div>

          <div className="relative pt-1">
            {phase2Items.map((evt, idx) => {
              const originalIdx = idx + 4;
              const isSelected = activeYear === evt.year;
              const isLast = idx === phase2Items.length - 1;
              const localizedEvent = t.timeline[originalIdx] || {
                role: "",
                desc: "",
              };

              return (
                <TimelineItem
                  key={evt.year}
                  year={evt.year}
                  company={evt.company}
                  role={localizedEvent.role}
                  desc={localizedEvent.desc}
                  icon={evt.icon}
                  color={evt.color}
                  isSelected={isSelected}
                  isLast={isLast}
                  onToggle={() => onToggleYear(evt.year)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
