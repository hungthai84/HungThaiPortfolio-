import { cva } from "class-variance-authority";

// 5. Chuẩn hóa constants
export enum ProjectGroup {
  All = "Tất cả",
  Group1 = "Nhóm 01 · Xây dựng & Phát triển",
  Group2 = "Nhóm 02 · Vận hành & Tối ưu",
  Group3 = "Nhóm 03 · Hệ thống & Dữ liệu",
  Group4 = "Nhóm 04 · Đào tạo & Năng lực",
  Group5 = "Nhóm 05 · Hỗ trợ Khách hàng",
  Group6 = "Nhóm 06 · Phân tích & Cải tiến",
}

export enum ProjectPhase {
  All = "Tất cả",
  Phase1 = "Giai đoạn 1",
  Phase2 = "Giai đoạn 2",
  Phase3 = "Giai đoạn 3",
  Phase4 = "Giai đoạn 4",
  Continuous = "Xuyên suốt",
}

export enum ProjectListViewMode {
  Grid = "grid",
  Grid1Col = "grid_1col",
  Horizontal = "horizontal",
  Stacked = "stacked",
  List = "list",
}

export enum ArticleViewMode {
  All = "all",
  Mindmap = "mindmap",
  Article = "article",
}

// Color Theme Palettes & Mappings
export const CARD_COLOR_PALETTES = [
  {
    border: "border-sky-500/30",
    bg: "glass-fluent-acrylic text-slate-900 dark:text-slate-100",
    flapBg: "bg-sky-600/50",
    text: "text-sky-600 dark:text-sky-400",
    glassBg: "from-sky-500/10 via-sky-400/5 to-transparent border-sky-400/20",
    shadow: "shadow-sm",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    border: "border-blue-500/30",
    bg: "glass-fluent-acrylic text-slate-900 dark:text-slate-100",
    flapBg: "bg-blue-600/50",
    text: "text-blue-600 dark:text-blue-400",
    glassBg: "from-blue-500/10 via-blue-400/5 to-transparent border-blue-400/20",
    shadow: "shadow-sm",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    border: "border-indigo-500/30",
    bg: "glass-fluent-acrylic text-slate-900 dark:text-slate-100",
    flapBg: "bg-indigo-600/50",
    text: "text-indigo-600 dark:text-indigo-400",
    glassBg: "from-indigo-500/10 via-indigo-400/5 to-transparent border-indigo-400/20",
    shadow: "shadow-sm",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    border: "border-purple-500/30",
    bg: "glass-fluent-acrylic text-slate-900 dark:text-slate-100",
    flapBg: "bg-purple-600/50",
    text: "text-purple-600 dark:text-purple-400",
    glassBg: "from-purple-500/10 via-purple-400/5 to-transparent border-purple-400/20",
    shadow: "shadow-sm",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

// Helper functions for class resolution using standard configurations
export function getPhaseColorClass(phase: string): string {
  switch (phase) {
    case ProjectPhase.Phase1:
      return "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black border-blue-400/50 shadow-sm";
    case ProjectPhase.Phase2:
      return "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black border-amber-300/50 shadow-sm";
    case ProjectPhase.Phase3:
      return "bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black border-violet-400/50 shadow-sm";
    case ProjectPhase.Continuous:
      return "bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black border-pink-400/50 shadow-sm";
    case ProjectPhase.Phase4:
    default:
      return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black border-emerald-400/50 shadow-sm";
  }
}

export function getGroupColorClass(group: string): string {
  switch (group) {
    case ProjectGroup.Group1:
      return "bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black border-purple-400/50 shadow-sm";
    case ProjectGroup.Group2:
      return "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black border-orange-400/50 shadow-sm";
    case ProjectGroup.Group3:
      return "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black border-sky-400/50 shadow-sm";
    case ProjectGroup.Group4:
      return "bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black border-rose-400/50 shadow-sm";
    case ProjectGroup.Group5:
      return "bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-black border-teal-400/50 shadow-sm";
    case ProjectGroup.Group6:
    default:
      return "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-black border-fuchsia-400/50 shadow-sm";
  }
}

export function getProjectTitleColor(index: number): string {
  const colors = [
    "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-300 dark:via-pink-300 dark:to-rose-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-300 dark:via-orange-300 dark:to-red-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-300 dark:via-teal-300 dark:to-cyan-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 dark:from-rose-400 dark:via-pink-300 dark:to-fuchsia-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-300 dark:via-blue-300 dark:to-indigo-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-300 dark:via-purple-300 dark:to-indigo-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-lime-600 dark:from-teal-300 dark:via-emerald-300 dark:to-lime-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-300 dark:via-amber-300 dark:to-yellow-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 dark:from-pink-300 dark:via-rose-300 dark:to-red-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 dark:from-cyan-300 dark:via-blue-300 dark:to-teal-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 dark:from-fuchsia-300 dark:via-purple-300 dark:to-pink-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 dark:from-indigo-300 dark:via-blue-300 dark:to-sky-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 dark:from-red-300 dark:via-rose-300 dark:to-pink-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-emerald-600 to-teal-600 dark:from-lime-300 dark:via-emerald-300 dark:to-teal-300",
    "text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 dark:from-amber-300 dark:via-yellow-300 dark:to-orange-300",
  ];
  return colors[Math.abs(index - 1) % colors.length];
}

export function getPhaseCardBorderClass(phase: string): string {
  switch (phase) {
    case ProjectPhase.Phase1:
      return "border-blue-200/80 dark:border-blue-800/80 group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:ring-2 group-hover:ring-blue-500/30 group-hover:shadow-[0_25px_50px_-10px_rgba(59,130,246,0.35)]";
    case ProjectPhase.Phase2:
      return "border-amber-200/80 dark:border-amber-800/80 group-hover:border-amber-500 dark:group-hover:border-amber-400 group-hover:ring-2 group-hover:ring-amber-500/30 group-hover:shadow-[0_25px_50px_-10px_rgba(245,158,11,0.35)]";
    case ProjectPhase.Phase3:
      return "border-violet-200/80 dark:border-violet-800/80 group-hover:border-violet-500 dark:group-hover:border-violet-400 group-hover:ring-2 group-hover:ring-violet-500/30 group-hover:shadow-[0_25px_50px_-10px_rgba(139,92,246,0.35)]";
    case ProjectPhase.Continuous:
      return "border-pink-200/80 dark:border-pink-800/80 group-hover:border-pink-500 dark:group-hover:border-pink-400 group-hover:ring-2 group-hover:ring-pink-500/30 group-hover:shadow-[0_25px_50px_-10px_rgba(236,72,153,0.35)]";
    case ProjectPhase.Phase4:
    default:
      return "border-emerald-200/80 dark:border-emerald-800/80 group-hover:border-emerald-500 dark:group-hover:border-emerald-400 group-hover:ring-2 group-hover:ring-emerald-500/30 group-hover:shadow-[0_25px_50px_-10px_rgba(16,185,129,0.35)]";
  }
}

export const groupLeftAccentBarStyles = {
  [ProjectGroup.Group1]: "bg-purple-500",
  [ProjectGroup.Group2]: "bg-orange-500",
  [ProjectGroup.Group3]: "bg-sky-500",
  [ProjectGroup.Group4]: "bg-rose-500",
  [ProjectGroup.Group5]: "bg-teal-500",
  [ProjectGroup.Group6]: "bg-pink-500",
};

// 12. Chuẩn hóa Tailwind bằng class-variance-authority (CVA)
export const buttonVariants = cva(
  "inline-flex items-center justify-center font-bold text-xs transition-all cursor-pointer select-none active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary:
          "bg-[#0067C0] hover:bg-[#005fb8] text-white shadow-sm border-b-2 border-black/10",
        secondary:
          "bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-white/10 border border-black/5 dark:border-white/5",
        danger:
          "bg-rose-600 hover:bg-rose-700 text-white shadow-sm",
        outline:
          "bg-transparent border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5",
        gradientRose:
          "bg-gradient-to-r from-rose-600 to-pink-600 text-white border-b-2 border-black/10",
        gradientPurple:
          "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 text-white border-b-2 border-black/10",
        glass:
          "glass-fluent-mica text-slate-800 dark:text-slate-200 hover:brightness-110",
        badge:
          "text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-sm transition-all",
      },
      size: {
        xs: "px-2 py-1 rounded-md text-[10px]",
        sm: "px-3.5 py-1.5 rounded-lg text-xs",
        md: "px-4 py-2 rounded-lg text-xs sm:text-sm",
        lg: "px-6 py-3 rounded-lg text-xs sm:text-sm",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

// 5. Constants for Animations
export const ANIMATION_PRESETS = {
  fadeInUp: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.3 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { duration: 0.25 },
  },
  slideIn: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.35 },
  },
};
