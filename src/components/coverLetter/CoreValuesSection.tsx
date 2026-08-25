import React from "react";
import {
  Layers,
  Users,
  Zap,
  BarChart3,
  Heart,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { useLanguageContent } from "../../hooks/useCoverLetter";
import { cn } from "../../lib/utils";

interface PillarItem {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  icon: LucideIcon;
  gradientClass: string;
  borderClass: string;
  iconBoxClass: string;
  titleColor: string;
  descColor: string;
}

export const PILLARS_DATA: PillarItem[] = [
  {
    id: "process",
    titleVi: "QUY TRÌNH",
    titleEn: "PROCESS",
    descVi: "Tạo nền tảng",
    descEn: "Build Foundation",
    icon: Layers,
    gradientClass:
      "bg-gradient-to-b from-[#dbeafe] via-[#eff6ff] to-[#e0e7ff] dark:from-blue-950/80 dark:via-sky-950/60 dark:to-indigo-950/80",
    borderClass: "border-blue-200/80 dark:border-blue-800/60",
    iconBoxClass:
      "bg-white/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50",
    titleColor: "text-slate-900 dark:text-white",
    descColor: "text-slate-600 dark:text-slate-300",
  },
  {
    id: "people",
    titleVi: "CON NGƯỜI",
    titleEn: "PEOPLE",
    descVi: "Tạo giá trị",
    descEn: "Create Value",
    icon: Users,
    gradientClass:
      "bg-gradient-to-b from-[#fed7aa] via-[#fff7ed] to-[#ffedd5] dark:from-amber-950/80 dark:via-orange-950/60 dark:to-yellow-950/80",
    borderClass: "border-orange-200/80 dark:border-orange-800/60",
    iconBoxClass:
      "bg-white/80 dark:bg-orange-900/40 text-amber-700 dark:text-amber-300 border border-orange-200 dark:border-orange-700/50",
    titleColor: "text-slate-900 dark:text-white",
    descColor: "text-slate-600 dark:text-slate-300",
  },
  {
    id: "technology",
    titleVi: "CÔNG NGHỆ",
    titleEn: "TECHNOLOGY",
    descVi: "Tạo đòn bẩy",
    descEn: "Create Leverage",
    icon: Zap,
    gradientClass:
      "bg-gradient-to-b from-[#e9d5ff] via-[#faf5ff] to-[#f3e8ff] dark:from-purple-950/80 dark:via-indigo-950/60 dark:to-purple-950/80",
    borderClass: "border-purple-200/80 dark:border-purple-800/60",
    iconBoxClass:
      "bg-white/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50",
    titleColor: "text-slate-900 dark:text-white",
    descColor: "text-slate-600 dark:text-slate-300",
  },
];

export const VALUES_DATA: PillarItem[] = [
  {
    id: "effective",
    titleVi: "HIỆU QUẢ",
    titleEn: "EFFICIENCY",
    descVi: "Tối ưu đo lường",
    descEn: "Optimize & Measure",
    icon: BarChart3,
    gradientClass:
      "bg-gradient-to-b from-[#cffafe] via-[#ecfeff] to-[#e0f2fe] dark:from-cyan-950/80 dark:via-sky-950/60 dark:to-cyan-950/80",
    borderClass: "border-cyan-200/80 dark:border-cyan-800/60",
    iconBoxClass:
      "bg-white/80 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700/50",
    titleColor: "text-slate-900 dark:text-white",
    descColor: "text-slate-600 dark:text-slate-300",
  },
  {
    id: "human",
    titleVi: "NHÂN VĂN",
    titleEn: "HUMANITY",
    descVi: "Thấu hiểu đồng cảm",
    descEn: "Empathy & Compassion",
    icon: Heart,
    gradientClass:
      "bg-gradient-to-b from-[#fbcfe8] via-[#fdf2f8] to-[#fce7f3] dark:from-pink-950/80 dark:via-rose-950/60 dark:to-pink-950/80",
    borderClass: "border-pink-200/80 dark:border-pink-800/60",
    iconBoxClass:
      "bg-white/80 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-700/50",
    titleColor: "text-slate-900 dark:text-white",
    descColor: "text-slate-600 dark:text-slate-300",
  },
  {
    id: "sustainable",
    titleVi: "BỀN VỮNG",
    titleEn: "SUSTAINABILITY",
    descVi: "Gắn kết đồng hành",
    descEn: "Engage & Accompany",
    icon: Sparkles,
    gradientClass:
      "bg-gradient-to-b from-[#a7f3d0] via-[#ecfdf5] to-[#d1fae5] dark:from-emerald-950/80 dark:via-teal-950/60 dark:to-emerald-950/80",
    borderClass: "border-emerald-200/80 dark:border-emerald-800/60",
    iconBoxClass:
      "bg-white/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50",
    titleColor: "text-slate-900 dark:text-white",
    descColor: "text-slate-600 dark:text-slate-300",
  },
];

export function PrinciplesSection() {
  const { language } = useLanguageContent();
  const isVi = language === "vi";

  return (
    <div
      className="rounded-2xl border border-indigo-200/60 dark:border-indigo-900/50 bg-white/50 dark:bg-slate-800/50 p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full space-y-3"
      id="principles-section"
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
        <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
          {isVi
            ? "Tôi luôn làm việc dựa trên 3 trụ cột nguyên tắc cốt lõi:"
            : "I consistently operate based on 3 core pillars:"}
        </h4>
      </div>

      <div className="grid grid-cols-3 gap-[10px]">
        {PILLARS_DATA.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={cn(
                "rounded-xl border p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
                item.gradientClass,
                item.borderClass
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-2 shadow-xs",
                  item.iconBoxClass
                )}
              >
                <Icon size={16} />
              </div>
              <h5
                className={cn(
                  "text-[11px] sm:text-xs font-black uppercase tracking-wider mb-1",
                  item.titleColor
                )}
              >
                {isVi ? item.titleVi : item.titleEn}
              </h5>
              <p
                className={cn(
                  "text-[10px] sm:text-[11px] font-medium leading-tight",
                  item.descColor
                )}
              >
                {isVi ? item.descVi : item.descEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CoreValuesSection() {
  const { language } = useLanguageContent();
  const isVi = language === "vi";

  return (
    <div
      className="rounded-2xl border border-sky-200/60 dark:border-sky-900/50 bg-white/50 dark:bg-slate-800/50 p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full space-y-3"
      id="core-values-section"
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-sky-400 shrink-0" />
        <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
          {isVi
            ? "Bên cạnh công nghệ, tôi luôn chú trọng đào tạo đội ngũ:"
            : "Alongside technology, I deeply emphasize team empowerment:"}
        </h4>
      </div>

      <div className="grid grid-cols-3 gap-[10px]">
        {VALUES_DATA.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={cn(
                "rounded-xl border p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
                item.gradientClass,
                item.borderClass
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-2 shadow-xs",
                  item.iconBoxClass
                )}
              >
                <Icon size={16} />
              </div>
              <h5
                className={cn(
                  "text-[11px] sm:text-xs font-black uppercase tracking-wider mb-1",
                  item.titleColor
                )}
              >
                {isVi ? item.titleVi : item.titleEn}
              </h5>
              <p
                className={cn(
                  "text-[10px] sm:text-[11px] font-medium leading-tight",
                  item.descColor
                )}
              >
                {isVi ? item.descVi : item.descEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
