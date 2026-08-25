import React from "react";
import { 
  Target, TrendingUp, Rocket, Globe
} from "lucide-react";
import { cn } from "../lib/utils";
import { SwotGradientIcon } from "./SwotGradientIcon";

const CircularProgress = ({ 
  value, 
  colorClass, 
  trackClass = "text-slate-100",
  size = 72,
  strokeWidth = 8,
  children
}: { 
  value: number, 
  colorClass: string,
  trackClass?: string,
  size?: number,
  strokeWidth?: number,
  children?: React.ReactNode
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className={trackClass} />
        <circle 
          cx={size/2} cy={size/2} r={radius} 
          stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          className={colorClass}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex items-center justify-center flex-col text-center">
        {children}
      </div>
    </div>
  );
};

// Interactive Stacked Skill List for Strengths & Weaknesses
const StackedSkillList = ({ 
  items, 
  colorClass, 
  trackClass, 
  barGradient,
  badgeBgColor
}: { 
  items: Array<{ name: string, score: string, iconKey: string, color: string }>, 
  colorClass: string,
  trackClass: string,
  barGradient: string,
  badgeBgColor: string
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const activeItem = items[activeIndex];

  return (
    <div className="relative flex-1 flex flex-col justify-between w-full min-h-0 pt-1 pb-2">
      {/* Stack Container */}
      <div className="relative w-full h-[185px] sm:h-[195px] flex items-center justify-center">
        {items.map((item, idx) => {
          // Calculate stack distance relative to activeIndex
          const position = (idx - activeIndex + items.length) % items.length;
          const isVisible = position < 3 || position === items.length - 1;
          
          if (!isVisible) return null;

          let zIndex = 30 - position * 10;
          let translateY = position * 10;
          let scale = 1 - position * 0.05;
          let opacity = position === 0 ? 1 : position === 1 ? 0.8 : position === 2 ? 0.5 : 0.2;

          if (position === items.length - 1) {
            translateY = -6;
            scale = 0.97;
            opacity = 0.3;
            zIndex = 5;
          }

          return (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                zIndex,
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
              }}
              className={cn(
                "absolute top-0 left-0 w-full rounded-2xl p-4 transition-all duration-300 ease-out cursor-pointer border shadow-md flex flex-col justify-between",
                position === 0
                  ? "bg-white/95 dark:bg-slate-800/95 border-slate-200/80 dark:border-white/15 shadow-lg"
                  : "bg-white/70 dark:bg-slate-900/80 border-slate-200/40 dark:border-white/5 pointer-events-auto"
              )}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="swot-icon-badge p-2.5 rounded-xl shrink-0 flex items-center justify-center border border-white/40 dark:border-white/10 shadow-sm"
                  style={{
                    backgroundColor: `${item.color}20`,
                    boxShadow: `0 6px 16px -4px ${item.color}40`
                  }}
                >
                  <SwotGradientIcon iconKey={item.iconKey} extraClass="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 truncate">{item.name}</p>
                    <span className={cn("text-xs font-black uppercase tracking-tight ml-2", colorClass)}>{item.score}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={cn("flex-1 h-2 rounded-full overflow-hidden", trackClass)}>
                      <div 
                        className={cn("h-full rounded-full transition-all duration-700", barGradient)} 
                        style={{ width: item.score }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/50 flex items-start justify-between gap-2">
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-300 leading-snug line-clamp-2">
                  Năng lực thực chiến được đánh giá ở mức <span className={cn("font-black", colorClass)}>{item.score}</span> dựa trên các dự án đã triển khai thực tế.
                </p>
                {position === 0 && (
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
                    {idx + 1}/{items.length}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stack Navigation & Indicators */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[70%] py-1">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                activeIndex === idx 
                  ? "w-6 bg-slate-800 dark:bg-white" 
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              )}
              title={item.name}
              aria-label={`Select ${item.name}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={prevCard}
            className="w-7 h-7 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            aria-label="Previous item"
          >
            ←
          </button>
          <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 px-1">
            {activeIndex + 1} / {items.length}
          </span>
          <button
            onClick={nextCard}
            className="w-7 h-7 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            aria-label="Next item"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

// Interactive Stacked Item List for Opportunities & Threats
const StackedOpportunityList = ({ 
  items, 
  colorClass,
  borderColorClass,
  badgeBgColor
}: { 
  items: Array<{ iconKey: string, color: string, title: string, desc: string }>, 
  colorClass: string,
  borderColorClass: string,
  badgeBgColor: string
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between w-full min-h-0 pt-1 pb-2">
      {/* Stack Container */}
      <div className="relative w-full h-[185px] sm:h-[195px] flex items-center justify-center">
        {items.map((item, idx) => {
          const position = (idx - activeIndex + items.length) % items.length;
          const isVisible = position < 3 || position === items.length - 1;
          
          if (!isVisible) return null;

          let zIndex = 30 - position * 10;
          let translateY = position * 10;
          let scale = 1 - position * 0.05;
          let opacity = position === 0 ? 1 : position === 1 ? 0.8 : position === 2 ? 0.5 : 0.2;

          if (position === items.length - 1) {
            translateY = -6;
            scale = 0.97;
            opacity = 0.3;
            zIndex = 5;
          }

          return (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                zIndex,
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
              }}
              className={cn(
                "absolute top-0 left-0 w-full rounded-2xl p-4 transition-all duration-300 ease-out cursor-pointer border shadow-md flex flex-col justify-between",
                position === 0
                  ? "bg-white/95 dark:bg-slate-800/95 border-slate-200/80 dark:border-white/15 shadow-lg"
                  : "bg-white/70 dark:bg-slate-900/80 border-slate-200/40 dark:border-white/5 pointer-events-auto"
              )}
            >
              <div className="flex items-start gap-3.5">
                <div 
                  className="swot-icon-badge p-3 rounded-2xl shrink-0 flex items-center justify-center border border-white/40 dark:border-white/10 shadow-md"
                  style={{
                    backgroundColor: `${item.color}20`,
                    boxShadow: `0 8px 20px -4px ${item.color}40`
                  }}
                >
                  <SwotGradientIcon iconKey={item.iconKey} extraClass="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className={cn("text-sm sm:text-base font-black tracking-tight leading-tight", colorClass)}>{item.title}</h5>
                    {position === 0 && (
                      <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 ml-2">
                        {idx + 1}/{items.length}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  Chi tiết cơ hội & giải pháp
                </span>
                <span className={cn("text-[11px] font-black underline cursor-pointer", colorClass)}>
                  Xem thêm →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stack Navigation & Indicators */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[70%] py-1">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                activeIndex === idx 
                  ? "w-6 bg-slate-800 dark:bg-white" 
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              )}
              title={item.title}
              aria-label={`Select ${item.title}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={prevCard}
            className="w-7 h-7 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            aria-label="Previous item"
          >
            ←
          </button>
          <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 px-1">
            {activeIndex + 1} / {items.length}
          </span>
          <button
            onClick={nextCard}
            className="w-7 h-7 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            aria-label="Next item"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export const SwotAnalysis = ({ activeSection = "all" }: { activeSection?: string }) => {
  const strengths = [
    { name: "Kiến thức sâu về CRM", score: "95%", iconKey: "CRM", color: "#f59e0b" },
    { name: "Phân tích dữ liệu khách hàng", score: "90%", iconKey: "DATA", color: "#0284c7" },
    { name: "Xây dựng quy trình dịch vụ", score: "90%", iconKey: "PROCESS", color: "#db2777" },
    { name: "Tư duy lấy khách hàng làm trung tâm", score: "90%", iconKey: "CUSTOMER", color: "#ef4444" },
    { name: "Lãnh đạo & Phát triển đội ngũ", score: "90%", iconKey: "LEADERSHIP", color: "#7c3aed" },
    { name: "Giải quyết vấn đề", score: "90%", iconKey: "STRATEGY", color: "#2563eb" },
    { name: "Trải nghiệm khách hàng (CX)", score: "90%", iconKey: "CUSTOMER", color: "#0d9488" },
  ];

  const weaknesses = [
    { name: "Tư duy chiến lược & Tầm nhìn dài hạn", score: "80%", iconKey: "STRATEGY", color: "#2563eb" },
    { name: "Quản lý dự án", score: "80%", iconKey: "PROJECT", color: "#059669" },
    { name: "Thiết kế & Lập trình Web (Responsive)", score: "85%", iconKey: "CODING", color: "#6366f1" },
    { name: "Tự động hóa", score: "85%", iconKey: "AUTOMATION", color: "#c026d3" },
    { name: "Quản lý hiệu suất (KPIs, OKRs)", score: "85%", iconKey: "KPI", color: "#ea580c" },
    { name: "Giao tiếp", score: "85%", iconKey: "CUSTOMER", color: "#0284c7" },
    { name: "Giải quyết khiếu nại", score: "85%", iconKey: "PROCESS", color: "#db2777" },
    { name: "Xây dựng văn hóa dịch vụ nội bộ", score: "85%", iconKey: "LEADERSHIP", color: "#7c3aed" },
    { name: "Quản lý rủi ro dịch vụ", score: "85%", iconKey: "THREATS", color: "#f97316" },
    { name: "Thích ứng với công nghệ", score: "85%", iconKey: "AI", color: "#10b981" },
  ];

  const opportunities = [
    { iconKey: "AUTOMATION", color: "#c026d3", title: "AI & Automation", desc: "Ứng dụng AI, Chatbot, RPA và Automation để tối ưu vận hành & trải nghiệm." },
    { iconKey: "CUSTOMER", color: "#4f46e5", title: "CX Strategy & Transformation", desc: "Dẫn dắt chiến lược CX, nâng cao trải nghiệm khách hàng toàn diện." },
    { iconKey: "DATA", color: "#0284c7", title: "Data-driven CX Management", desc: "Khai thác dữ liệu, đo lường & cá nhân hóa trải nghiệm khách hàng." },
    { iconKey: "PROCESS", color: "#059669", title: "Digital Transformation", desc: "Thúc đẩy chuyển đổi số, CRM, Self-service và hệ sinh thái số." }
  ];

  const threats = [
    { iconKey: "AI", color: "#ea580c", title: "AI thay đổi ngành CSKH", desc: "AI & Automation thay thế nhiều nghiệp vụ, yêu cầu nâng cấp năng lực liên tục." },
    { iconKey: "CODING", color: "#c026d3", title: "Công nghệ thay đổi nhanh", desc: "CRM, AI, Data, Automation tiếp tục đổi mới, đòi hỏi học hỏi & thích ứng nhanh." },
    { iconKey: "LEADERSHIP", color: "#7c3aed", title: "Cạnh tranh nhân sự", desc: "Yêu cầu kết hợp đa năng: Business + Data + Tech + Leadership ngày càng cao." },
    { iconKey: "KPI", color: "#ef4444", title: "Áp lực tối ưu chi phí", desc: "Doanh nghiệp yêu cầu hiệu quả cao hơn với chi phí thấp hơn." }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-transparent p-4 md:p-6 rounded-[32px] flex flex-col items-center gap-6 md:gap-8">
      

      {/* SWOT Grid */}
      {(activeSection === "all" || activeSection === "swot") && (
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">

        {/* STRENGTHS */}
        <div className="group relative overflow-hidden rounded-[28px] md:rounded-br-none bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-teal-100/80 dark:border-teal-900/40 shadow-xs p-4 sm:p-5 md:p-6 flex flex-col justify-between h-[390px] sm:h-[410px]">
          {/* S - Corner Badge */}
          <div className="absolute bottom-0 right-0 w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] bg-gradient-to-br from-[#53ead0] to-[#25d3b6] rounded-tl-full flex items-end justify-end pb-3 pr-4 sm:pb-5 sm:pr-6 border-t-[3px] border-l-[3px] border-white/80 dark:border-slate-800/80 z-0 transition-transform duration-300 group-hover:scale-105 origin-bottom-right pointer-events-none opacity-90">
            <span className="text-3xl sm:text-4xl font-black text-white">S</span>
          </div>

          <header className="relative z-10 flex items-start gap-4 bg-transparent border-none shadow-none shrink-0">
            <div 
              className="swot-icon-badge flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-200/60 dark:border-teal-800/60 shadow-md"
              style={{
                backgroundColor: "#0d948818",
                boxShadow: "0 8px 24px -6px #0d948840"
              }}
            >
              <SwotGradientIcon iconKey="STRENGTHS" extraClass="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col pt-0.5">
              <h3 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">STRENGTHS</h3>
              <h4 className="text-[11px] sm:text-xs font-extrabold text-teal-600 dark:text-teal-400 uppercase tracking-widest mt-0.5">NĂNG LỰC CỐT LÕI</h4>
              <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-transparent mt-1.5 rounded-full" />
            </div>
          </header>

          <p className="relative z-10 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed pr-2 shrink-0 my-1">
            Những năng lực cốt lõi đã được rèn luyện và chứng minh qua thực tiễn quản lý & vận hành.
          </p>

          <StackedSkillList 
            items={strengths} 
            colorClass="text-teal-600 dark:text-teal-400" 
            trackClass="bg-teal-100/50 dark:bg-teal-900/30" 
            barGradient="bg-gradient-to-r from-teal-400 to-teal-600" 
            badgeBgColor="#0d9488"
          />
        </div>

        {/* OPPORTUNITIES */}
        <div className="group relative overflow-hidden rounded-[28px] md:rounded-bl-none bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-indigo-100/80 dark:border-indigo-900/40 shadow-xs p-4 sm:p-5 md:p-6 flex flex-col justify-between h-[390px] sm:h-[410px]">
          {/* O - Corner Badge */}
          <div className="absolute bottom-0 left-0 w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] bg-gradient-to-br from-[#9cb5ff] to-[#718df2] rounded-tr-full flex items-end justify-start pb-3 pl-4 sm:pb-5 sm:pl-6 border-t-[3px] border-r-[3px] border-white/80 dark:border-slate-800/80 z-0 transition-transform duration-300 group-hover:scale-105 origin-bottom-left pointer-events-none opacity-90">
            <span className="text-3xl sm:text-4xl font-black text-white">O</span>
          </div>

          <header className="relative z-10 flex items-start justify-end gap-4 text-right bg-transparent border-none shadow-none shrink-0">
            <div className="flex flex-col pt-0.5 items-end">
              <h3 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">OPPORTUNITIES</h3>
              <h4 className="text-[11px] sm:text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-0.5">CƠ HỘI PHÁT TRIỂN</h4>
              <div className="h-1 w-20 bg-gradient-to-l from-indigo-500 to-transparent mt-1.5 rounded-full" />
            </div>
            <div 
              className="swot-icon-badge flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-200/60 dark:border-indigo-800/60 shadow-md order-last"
              style={{
                backgroundColor: "#4f46e518",
                boxShadow: "0 8px 24px -6px #4f46e540"
              }}
            >
              <SwotGradientIcon iconKey="OPPORTUNITIES" extraClass="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          </header>

          <p className="relative z-10 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed text-right pl-2 shrink-0 my-1">
            Xu hướng công nghệ & nhu cầu thị trường mở ra nhiều cơ hội để tạo bứt phá và nâng tầm sự nghiệp.
          </p>

          <StackedOpportunityList 
            items={opportunities} 
            colorClass="text-indigo-600 dark:text-indigo-400" 
            borderColorClass="border-indigo-100 dark:border-indigo-900" 
            badgeBgColor="#4f46e5"
          />
        </div>

        {/* WEAKNESSES */}
        <div className="group relative overflow-hidden rounded-[28px] md:rounded-tr-none bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-fuchsia-100/80 dark:border-fuchsia-900/40 shadow-xs p-4 sm:p-5 md:p-6 flex flex-col justify-between h-[390px] sm:h-[410px]">
          {/* W - Corner Badge */}
          <div className="absolute top-0 right-0 w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] bg-gradient-to-br from-[#e09cf0] to-[#c166d8] rounded-bl-full flex items-start justify-end pt-3 pr-4 sm:pt-5 sm:pr-6 border-b-[3px] border-l-[3px] border-white/80 dark:border-slate-800/80 z-0 transition-transform duration-300 group-hover:scale-105 origin-top-right pointer-events-none opacity-90">
            <span className="text-3xl sm:text-4xl font-black text-white">W</span>
          </div>

          <header className="relative z-10 flex items-start gap-4 pr-16 sm:pr-20 bg-transparent border-none shadow-none shrink-0">
            <div 
              className="swot-icon-badge flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-200/60 dark:border-fuchsia-800/60 shadow-md"
              style={{
                backgroundColor: "#c026d318",
                boxShadow: "0 8px 24px -6px #c026d340"
              }}
            >
              <SwotGradientIcon iconKey="WEAKNESSES" extraClass="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col pt-0.5">
              <h3 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">WEAKNESSES</h3>
              <h4 className="text-[11px] sm:text-xs font-extrabold text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-widest mt-0.5">ĐIỂM CẦN PHÁT TRIỂN</h4>
              <div className="h-1 w-20 bg-gradient-to-r from-fuchsia-500 to-transparent mt-1.5 rounded-full" />
            </div>
          </header>

          <p className="relative z-10 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed pr-16 sm:pr-20 shrink-0 my-1">
            Những năng lực cần tiếp tục nâng cao để đạt đến cấp độ chuyên gia và đáp ứng yêu cầu tương lai.
          </p>

          <StackedSkillList 
            items={weaknesses} 
            colorClass="text-fuchsia-600 dark:text-fuchsia-400" 
            trackClass="bg-fuchsia-100/50 dark:bg-fuchsia-900/30" 
            barGradient="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600" 
            badgeBgColor="#c026d3"
          />
        </div>

        {/* THREATS */}
        <div className="group relative overflow-hidden rounded-[28px] md:rounded-tl-none bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-orange-100/80 dark:border-orange-900/40 shadow-xs p-4 sm:p-5 md:p-6 flex flex-col justify-between h-[390px] sm:h-[410px]">
          {/* T - Corner Badge */}
          <div className="absolute top-0 left-0 w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] bg-gradient-to-br from-[#ffb485] to-[#ff7895] rounded-br-full flex items-start justify-start pt-3 pl-4 sm:pt-5 sm:pl-6 border-b-[3px] border-r-[3px] border-white/80 dark:border-slate-800/80 z-0 transition-transform duration-300 group-hover:scale-105 origin-top-left pointer-events-none opacity-90">
            <span className="text-3xl sm:text-4xl font-black text-white">T</span>
          </div>

          <header className="relative z-10 flex items-start justify-end gap-4 text-right pl-16 sm:pl-20 bg-transparent border-none shadow-none shrink-0">
            <div className="flex flex-col pt-0.5 items-end">
              <h3 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">THREATS</h3>
              <h4 className="text-[11px] sm:text-xs font-extrabold text-orange-500 uppercase tracking-widest mt-0.5">THÁCH THỨC & RỦI RO</h4>
              <div className="h-1 w-20 bg-gradient-to-l from-orange-500 to-transparent mt-1.5 rounded-full" />
            </div>
            <div 
              className="swot-icon-badge flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-200/60 dark:border-orange-800/60 shadow-md order-last"
              style={{
                backgroundColor: "#ea580c18",
                boxShadow: "0 8px 24px -6px #ea580c40"
              }}
            >
              <SwotGradientIcon iconKey="THREATS" extraClass="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          </header>

          <p className="relative z-10 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed text-right pl-16 sm:pl-20 shrink-0 my-1">
            Những yếu tố bên ngoài có thể ảnh hưởng đến hiệu quả công việc và lộ trình phát triển.
          </p>

          <StackedOpportunityList 
            items={threats} 
            colorClass="text-orange-600 dark:text-orange-400" 
            borderColorClass="border-orange-100 dark:border-orange-900" 
            badgeBgColor="#ea580c"
          />
        </div>

      </div>
      )}

      {/* Bottom Card: Languages */}
      {(activeSection === "all" || activeSection === "languages") && (
        <div className="w-full bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl rounded-[24px] p-6 md:p-8 flex flex-col gap-6 shadow-xs border border-slate-200/60 dark:border-white/10">
          <header className="relative flex items-center gap-3 bg-transparent border-none shadow-none">
            <Globe className="text-blue-600 dark:text-blue-400" size={20} />
            <h3 className="text-sm font-black tracking-widest text-slate-800 dark:text-white uppercase">NGÔN NGỮ</h3>
          </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-[10px] w-full">
          
          {/* Vietnamese */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100/80 dark:border-blue-900/30 hover:bg-blue-50/80 transition-colors shadow-xs">
            {/* Ngôn ngữ nằm trên */}
            <div className="flex flex-col items-center gap-3 mb-3">
              <CircularProgress value={100} colorClass="text-blue-500" trackClass="text-blue-100 dark:text-blue-950" size={90} strokeWidth={10}>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">100<span className="text-lg">%</span></span>
              </CircularProgress>
              <div className="flex flex-col items-center gap-1.5">
                <div 
                  className="swot-icon-badge p-1.5 rounded-full border border-red-200 dark:border-red-900/40"
                  style={{ backgroundColor: "#ef444415", boxShadow: "0 4px 12px -2px #ef444435" }}
                >
                  <SwotGradientIcon iconKey="VIETNAMESE" extraClass="w-6 h-6" />
                </div>
                <span className="text-base font-black text-slate-800 dark:text-white tracking-wide uppercase">TIẾNG VIỆT</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">(Ngôn ngữ mẹ đẻ)</span>
              </div>
            </div>
            {/* Chữ nằm dưới */}
            <div className="pt-3 border-t border-blue-100/80 dark:border-blue-900/30 w-full flex flex-col items-center gap-1 mt-auto">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Thành thạo tuyệt đối</span>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 max-w-[220px]">
                Giao tiếp, làm việc, biên soạn tài liệu & đàm phán bằng tiếng Việt chuyên nghiệp.
              </p>
            </div>
          </div>

          {/* English */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100/80 dark:border-purple-900/30 hover:bg-purple-50/80 transition-colors shadow-xs">
            {/* Ngôn ngữ nằm trên */}
            <div className="flex flex-col items-center gap-3 mb-3">
              <CircularProgress value={90} colorClass="text-purple-500" trackClass="text-purple-100 dark:text-purple-950" size={90} strokeWidth={10}>
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tighter">90<span className="text-lg">%</span></span>
              </CircularProgress>
              <div className="flex flex-col items-center gap-1.5">
                <div 
                  className="swot-icon-badge p-1.5 rounded-full border border-blue-200 dark:border-blue-900/40"
                  style={{ backgroundColor: "#3b82f615", boxShadow: "0 4px 12px -2px #3b82f635" }}
                >
                  <SwotGradientIcon iconKey="ENGLISH" extraClass="w-6 h-6" />
                </div>
                <span className="text-base font-black text-slate-800 dark:text-white tracking-wide uppercase">TIẾNG ANH</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">(English)</span>
              </div>
            </div>
            {/* Chữ nằm dưới */}
            <div className="pt-3 border-t border-purple-100/80 dark:border-purple-900/30 w-full flex flex-col items-center gap-1 mt-auto">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Giao tiếp & Làm việc chuyên nghiệp</span>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 max-w-[220px]">
                Đọc hiểu tài liệu chuyên ngành, trao đổi công việc & hỗ trợ khách hàng quốc tế.
              </p>
            </div>
          </div>

          {/* AI */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100/80 dark:border-emerald-900/30 hover:bg-emerald-50/80 transition-colors shadow-xs">
            {/* Ngôn ngữ nằm trên */}
            <div className="flex flex-col items-center gap-3 mb-3">
              <CircularProgress value={85} colorClass="text-emerald-500" trackClass="text-emerald-100 dark:text-emerald-950" size={90} strokeWidth={10}>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">85<span className="text-lg">%</span></span>
              </CircularProgress>
              <div className="flex flex-col items-center gap-1.5">
                <div 
                  className="swot-icon-badge p-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/40"
                  style={{ backgroundColor: "#10b98115", boxShadow: "0 4px 12px -2px #10b98135" }}
                >
                  <SwotGradientIcon iconKey="AI" extraClass="w-6 h-6" />
                </div>
                <span className="text-base font-black text-slate-800 dark:text-white tracking-wide uppercase">AI ĐA NGÔN NGỮ</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">(AI-Powered Communication)</span>
              </div>
            </div>
            {/* Chữ nằm dưới */}
            <div className="pt-3 border-t border-emerald-100/80 dark:border-emerald-900/30 w-full flex flex-col items-center gap-1 mt-auto">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Dùng AI Trao Đổi Đa Ngôn Ngữ</span>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 max-w-[220px]">
                Sử dụng AI hỗ trợ trao đổi đa ngôn ngữ, dịch thuật tài liệu & hợp tác quốc tế.
              </p>
            </div>
          </div>

        </div>
      </div>
      )}

      {/* Overview Stats (Positioned at Bottom) */}
      {(activeSection === "all" || activeSection === "overview") && (
        <div className="w-full flex flex-col gap-6">
          <div className="w-full bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl rounded-[24px] p-6 md:p-8 shadow-xs border border-slate-200/60 dark:border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
              
              {/* Stat 1: Tổng quan năng lực */}
              <div className="flex items-center gap-4">
                <CircularProgress value={88} colorClass="text-blue-500" size={72} strokeWidth={8} />
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800 dark:text-white tracking-tight uppercase">TỔNG QUAN NĂNG LỰC</span>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 leading-none mt-1">88%</span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">Mức độ thành thạo trung bình</span>
                </div>
              </div>

              {/* Stat 2: 20+ Năm kinh nghiệm */}
              <div className="flex items-center gap-4">
                <div 
                  className="swot-icon-badge w-14 h-14 rounded-2xl border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#3b82f618",
                    boxShadow: "0 8px 24px -6px #3b82f640"
                  }}
                >
                  <SwotGradientIcon iconKey="BRIEFCASE" extraClass="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[22px] font-black text-blue-600 dark:text-blue-400 leading-tight">20+</span>
                  <span className="text-[13px] font-bold text-slate-800 dark:text-white">Năm kinh nghiệm</span>
                  <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">Quản lý & vận hành CSKH</span>
                </div>
              </div>

              {/* Stat 3: 100+ Đội ngũ quản lý */}
              <div className="flex items-center gap-4">
                <div 
                  className="swot-icon-badge w-14 h-14 rounded-2xl border border-purple-200/60 dark:border-purple-800/40 flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#a855f718",
                    boxShadow: "0 8px 24px -6px #a855f740"
                  }}
                >
                  <SwotGradientIcon iconKey="USERS" extraClass="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[22px] font-black text-purple-600 dark:text-purple-400 leading-tight">100+</span>
                  <span className="text-[13px] font-bold text-slate-800 dark:text-white">Đội ngũ quản lý</span>
                  <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">Nhân sự trực tiếp</span>
                </div>
              </div>

              {/* Stat 4: CX xuất sắc */}
              <div className="flex items-center gap-4">
                <div 
                  className="swot-icon-badge w-14 h-14 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#10b98118",
                    boxShadow: "0 8px 24px -6px #10b98140"
                  }}
                >
                  <SwotGradientIcon iconKey="KPI" extraClass="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[22px] font-black text-green-600 dark:text-emerald-400 leading-tight">CX xuất sắc</span>
                  <span className="text-[13px] font-bold text-slate-800 dark:text-white">Cam kết giá trị</span>
                  <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">Kết quả bền vững</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

