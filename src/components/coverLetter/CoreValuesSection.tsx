import React from "react";
import { Users, LucideIcon } from "lucide-react";
import { coreValuesData } from "../../data/coverLetterData";
import { useLanguageContent } from "../../hooks/useCoverLetter";
import { cn } from "../../lib/utils";

interface CoreValueCardProps {
  title: string;
  desc: string;
  num: string;
  icon: LucideIcon;
  bgClass: string;
  iconBgClass: string;
  numClass: string;
  iconIsHeart?: boolean;
}

const CoreValueCard = React.memo(function CoreValueCard({
  title,
  desc,
  num: _num,
  icon: IconComponent,
  bgClass,
  iconBgClass,
  numClass: _numClass,
  iconIsHeart,
}: CoreValueCardProps) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[175px] h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-br p-3.5 text-center shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        bgClass,
      )}
    >
      <IconComponent className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-1.5 text-white">
        <div
          className={cn(
            "mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-inner",
            iconBgClass,
          )}
        >
          <IconComponent
            size={18}
            className={iconIsHeart ? "fill-current text-white" : ""}
          />
        </div>
        <h4 className="m-0 flex items-center gap-2 text-xs sm:text-sm font-black tracking-wider text-white uppercase drop-shadow-xs">
          {title}
        </h4>
        <p className="mt-0.5 max-w-[95%] text-center text-[11px] leading-snug font-bold text-white/90">
          {desc}
        </p>
      </div>
    </div>
  );
});

export function CoreValuesSection() {
  const { t } = useLanguageContent();

  return (
    <div className="rounded-2xl border border-black/5 bg-slate-50/50 p-4 sm:p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.02] flex flex-col justify-between space-y-3 h-full" id="core-values-section">
      <p className="flex items-center gap-1.5 text-left text-xs leading-relaxed font-bold text-slate-800 sm:text-[13px] dark:text-slate-200">
        <Users size={14} className="text-[#0b2853] dark:text-amber-400" />
        <span>{t.common.valuesTitle}</span>
      </p>

      <div
        className="grid grid-cols-1 items-stretch justify-center justify-items-stretch gap-3 text-center sm:grid-cols-3"
        style={{ alignItems: "stretch", justifyContent: "center" }}
      >
        {coreValuesData.map((val) => {
          const vKey = val.id as keyof typeof t.common.values;
          const localizedValue = t.common.values[vKey];

          return (
            <CoreValueCard
              key={val.id}
              title={localizedValue.title}
              desc={localizedValue.desc}
              num={localizedValue.num}
              icon={val.icon}
              bgClass={val.bgClass}
              iconBgClass={val.iconBgClass}
              numClass={val.numClass}
              iconIsHeart={val.iconIsHeart}
            />
          );
        })}
      </div>
    </div>
  );
}
