import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Palette,
  Columns,
  Split,
  ArrowLeftRight,
  Check,
  Sparkles,
  Sun,
  Moon,
  Eye,
  Sliders,
  CheckCircle2,
  Maximize2,
  RefreshCw,
  Layers,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

export interface ColorPresetConfig {
  id: string;
  nameVi: string;
  nameEn: string;
  themeMode: "light" | "dark";
  primaryHex: string;
  primaryGradient: string;
  badgeBg: string;
  badgeText: string;
  wallpaperId: string;
  wallpaperUrl?: string;
  wallpaperNameVi: string;
  wallpaperNameEn: string;
  cardBgLight: string;
  cardBgDark: string;
  accentGlow: string;
  descriptionVi: string;
  descriptionEn: string;
  tags: string[];
}

export const THEME_PRESET_OPTIONS: ColorPresetConfig[] = [
  {
    id: "ocean-sky",
    nameVi: "Ocean Blue (Đại Dương Sáng Tinh Khôi)",
    nameEn: "Ocean Blue (Crisp Azure)",
    themeMode: "light",
    primaryHex: "#0078D4",
    primaryGradient: "from-[#0067C0] via-[#0078D4] to-[#2B88D8]",
    badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
    badgeText: "Enterprise Azure",
    wallpaperId: "img-wp-1",
    wallpaperUrl: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    wallpaperNameVi: "Không Gian Trắng Sáng Tối Giản",
    wallpaperNameEn: "Minimalist Bright Space",
    cardBgLight: "bg-white/85 border-slate-200/80 text-slate-900",
    cardBgDark: "bg-slate-900/85 border-slate-700/80 text-white",
    accentGlow: "rgba(0, 120, 212, 0.35)",
    descriptionVi: "Phong cách chuẩn Microsoft Fluent với sắc lam đại dương sắc nét và độ tương phản cao.",
    descriptionEn: "Microsoft Fluent standard with crisp ocean blue accents and high clarity.",
    tags: ["light", "fluent", "corporate", "blue"],
  },
  {
    id: "midnight-carbon",
    nameVi: "Midnight Carbon (Huyền Bí Tối Cao Cấp)",
    nameEn: "Midnight Carbon (Deep Charcoal)",
    themeMode: "dark",
    primaryHex: "#6366f1",
    primaryGradient: "from-[#18181b] via-[#27272a] to-[#3f3f46]",
    badgeBg: "bg-white/10 border-white/20 text-indigo-300",
    badgeText: "Dark Luxe Mica",
    wallpaperId: "vid-wp-2",
    wallpaperUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    wallpaperNameVi: "Khói Trầm Nghệ Thuật (Abstract Ink)",
    wallpaperNameEn: "Abstract Ink Flow",
    cardBgLight: "bg-slate-100/90 border-slate-300 text-slate-900",
    cardBgDark: "bg-slate-900/90 border-slate-700/60 text-slate-100",
    accentGlow: "rgba(99, 102, 241, 0.4)",
    descriptionVi: "Độ tương phản đen sâu sang trọng, kết hợp nền khói trừu tượng và phản quang Mica tinh tế.",
    descriptionEn: "Luxurious deep dark contrast paired with abstract ink visuals and Mica reflection.",
    tags: ["dark", "luxe", "carbon", "mica"],
  },
  {
    id: "emerald-forest",
    nameVi: "Emerald Forest (Xanh Ngọc Lục Bảo)",
    nameEn: "Emerald Forest (Jade Green)",
    themeMode: "dark",
    primaryHex: "#10b981",
    primaryGradient: "from-[#059669] via-[#10B981] to-[#34D399]",
    badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeText: "Eco Growth CX",
    wallpaperId: "img-wp-23",
    wallpaperUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    wallpaperNameVi: "Rừng Tre Zen Thiên Nhiên",
    wallpaperNameEn: "Bamboo Zen Forest",
    cardBgLight: "bg-white/90 border-emerald-100 text-slate-900",
    cardBgDark: "bg-emerald-950/40 border-emerald-500/20 text-emerald-50",
    accentGlow: "rgba(16, 185, 129, 0.4)",
    descriptionVi: "Tone màu xanh tươi mát, biểu trưng cho sự tăng trưởng bền vững và trải nghiệm khách hàng hài hòa.",
    descriptionEn: "Vibrant emerald green symbolizing sustainable growth and harmonious customer journeys.",
    tags: ["dark", "green", "nature", "zen"],
  },
  {
    id: "sunset-rose",
    nameVi: "Sunset Rose (Hoàng Hôn Rực Rỡ)",
    nameEn: "Sunset Rose (Crimson Twilight)",
    themeMode: "dark",
    primaryHex: "#f43f5e",
    primaryGradient: "from-[#E81123] via-[#EC4899] to-[#F43F5E]",
    badgeBg: "bg-rose-500/15 border-rose-500/30 text-rose-400",
    badgeText: "High Impact CX",
    wallpaperId: "img-wp-25",
    wallpaperUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    wallpaperNameVi: "Sóng Biển Hoàng Hôn Vàng",
    wallpaperNameEn: "Golden Hour Ocean",
    cardBgLight: "bg-rose-50/80 border-rose-200 text-rose-950",
    cardBgDark: "bg-rose-950/30 border-rose-500/20 text-rose-50",
    accentGlow: "rgba(244, 63, 94, 0.4)",
    descriptionVi: "Sắc đỏ hồng năng động khơi nguồn cảm hứng sáng tạo và đam mê phụng sự khách hàng.",
    descriptionEn: "Dynamic crimson rose gradients sparking inspiration and customer passion.",
    tags: ["dark", "rose", "sunset", "vibrant"],
  },
  {
    id: "royal-violet",
    nameVi: "Royal Violet (Tím Hoàng Gia Chuẩn)",
    nameEn: "Royal Violet (Signature)",
    themeMode: "dark",
    primaryHex: "#8b5cf6",
    primaryGradient: "from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA]",
    badgeBg: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeText: "Default Signature",
    wallpaperId: "fluid-mesh",
    wallpaperUrl: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    wallpaperNameVi: "Dãy Núi Đồ Họa Êm Dịu",
    wallpaperNameEn: "Geometric Mountain Calm",
    cardBgLight: "bg-white/85 border-violet-200 text-slate-900",
    cardBgDark: "bg-slate-900/85 border-violet-500/20 text-slate-100",
    accentGlow: "rgba(139, 92, 246, 0.45)",
    descriptionVi: "Bộ nhận diện cốt lõi của Portfolio: sang trọng, thông minh và tinh tế trong từng đường nét.",
    descriptionEn: "Core signature aesthetic: regal, intelligent, and refined across every component.",
    tags: ["dark", "violet", "default", "signature"],
  },
  {
    id: "cyber-cyan",
    nameVi: "Cyber Cyan (Băng Ngọc Tương Lai)",
    nameEn: "Cyber Cyan (Neon Frost)",
    themeMode: "dark",
    primaryHex: "#06b6d4",
    primaryGradient: "from-[#0891b2] via-[#06b6d4] to-[#22d3ee]",
    badgeBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    badgeText: "Tech & AI",
    wallpaperId: "img-wp-24",
    wallpaperUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    wallpaperNameVi: "Thành Phố Tokyo Neon Cyberpunk",
    wallpaperNameEn: "Tokyo Cyberpunk City",
    cardBgLight: "bg-cyan-50/80 border-cyan-200 text-cyan-950",
    cardBgDark: "bg-slate-900/90 border-cyan-500/25 text-cyan-50",
    accentGlow: "rgba(6, 182, 212, 0.4)",
    descriptionVi: "Phong cách công nghệ cao, ánh sáng neon băng giá tối ưu hóa cho AI & Kỹ thuật số.",
    descriptionEn: "High-tech futuristic vibe with icy neon cyan lighting tailored for AI & Digital systems.",
    tags: ["dark", "cyan", "cyber", "tech"],
  },
  {
    id: "amber-gold",
    nameVi: "Warm Amber (Hoàng Kim Quý Tộc)",
    nameEn: "Warm Amber (Golden Sunset)",
    themeMode: "light",
    primaryHex: "#d97706",
    primaryGradient: "from-[#b45309] via-[#d97706] to-[#f59e0b]",
    badgeBg: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    badgeText: "Luxury Warmth",
    wallpaperId: "img-wp-25",
    wallpaperUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    wallpaperNameVi: "Bình Minh Hoàng Kim",
    wallpaperNameEn: "Golden Hour Glow",
    cardBgLight: "bg-amber-50/80 border-amber-200/80 text-amber-950",
    cardBgDark: "bg-slate-900/90 border-amber-500/25 text-amber-100",
    accentGlow: "rgba(217, 119, 6, 0.4)",
    descriptionVi: "Sắc vàng hổ phách ấm áp, toát lên vẻ trang trọng, tin cậy và hiếu khách.",
    descriptionEn: "Warm amber gold tones conveying authority, trustworthiness, and executive hospitality.",
    tags: ["light", "amber", "gold", "warm"],
  },
  {
    id: "nordic-mica",
    nameVi: "Nordic Minimalist (Bắc Âu Tối Giản)",
    nameEn: "Nordic Minimalist (Mica Plain)",
    themeMode: "light",
    primaryHex: "#475569",
    primaryGradient: "from-[#334155] via-[#475569] to-[#64748b]",
    badgeBg: "bg-slate-500/15 border-slate-500/30 text-slate-700 dark:text-slate-300",
    badgeText: "Pure Zen",
    wallpaperId: "none",
    wallpaperUrl: "",
    wallpaperNameVi: "Đơn Sắc Không Hình Nền",
    wallpaperNameEn: "Plain Mica (No Wallpaper)",
    cardBgLight: "bg-white/95 border-slate-200 text-slate-800",
    cardBgDark: "bg-slate-900/95 border-slate-800 text-slate-200",
    accentGlow: "rgba(71, 85, 105, 0.3)",
    descriptionVi: "Đơn giản tuyệt đối, tập trung 100% vào nội dung văn bản và cấu trúc dữ liệu khoa học.",
    descriptionEn: "Absolute simplicity, 100% focus on readable typography and crisp data hierarchy.",
    tags: ["light", "minimal", "slate", "zen"],
  },
];

interface ThemeComparisonProps {
  onApplyPreset?: (preset: ColorPresetConfig) => void;
  className?: string;
}

export function ThemeComparison({ onApplyPreset, className }: ThemeComparisonProps) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  // State for presets A and B
  const [presetAId, setPresetAId] = useState<string>("royal-violet");
  const [presetBId, setPresetBId] = useState<string>("ocean-sky");

  // Comparison View Mode: 'sideBySide' (2 cột) vs 'sliderSplit' (thanh trượt chia đôi)
  const [viewMode, setViewMode] = useState<"sideBySide" | "sliderSplit">("sideBySide");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100%
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const presetA = useMemo(() => {
    return THEME_PRESET_OPTIONS.find((p) => p.id === presetAId) || THEME_PRESET_OPTIONS[0];
  }, [presetAId]);

  const presetB = useMemo(() => {
    return THEME_PRESET_OPTIONS.find((p) => p.id === presetBId) || THEME_PRESET_OPTIONS[1];
  }, [presetBId]);

  const handleSwapPresets = () => {
    playUiSound("toggle");
    const temp = presetAId;
    setPresetAId(presetBId);
    setPresetBId(temp);
  };

  const handleApply = (preset: ColorPresetConfig, label: "A" | "B") => {
    playUiSound("click");

    // 1. Dispatch theme mode change
    window.dispatchEvent(
      new CustomEvent("app-set-theme-mode", { detail: preset.themeMode }),
    );
    window.dispatchEvent(
      new CustomEvent("app-set-theme", { detail: { theme: preset.themeMode } }),
    );

    // 2. Dispatch wallpaper change
    window.dispatchEvent(
      new CustomEvent("wallpaperChanged", {
        detail: {
          id: preset.wallpaperId,
          wallpaperId: preset.wallpaperId,
          url: preset.wallpaperUrl,
          name: isVi ? preset.wallpaperNameVi : preset.wallpaperNameEn,
        },
      }),
    );

    // 3. Set Primary Hex
    document.documentElement.style.setProperty("--app-primary-hex", preset.primaryHex);
    document.documentElement.style.setProperty("--primary", preset.primaryHex);
    localStorage.setItem("app_primary_hex", preset.primaryHex);
    localStorage.setItem("app_theme_mode", preset.themeMode);
    localStorage.setItem("app_selected_wallpaper", preset.wallpaperId);

    // Callback if provided
    if (onApplyPreset) {
      onApplyPreset(preset);
    }

    const msg = isVi
      ? `Đã áp dụng thành công Preset ${label}: "${preset.nameVi}"!`
      : `Successfully applied Preset ${label}: "${preset.nameEn}"!`;

    setAppliedNotice(msg);
    setTimeout(() => setAppliedNotice(null), 3500);
  };

  // Render a Mockup Card for a specific Preset
  const renderCardMockup = (preset: ColorPresetConfig, side: "A" | "B") => {
    const isDark = preset.themeMode === "dark";

    return (
      <div
        className={cn(
          "relative w-full rounded-2xl p-4 sm:p-5 overflow-hidden transition-all duration-300 flex flex-col justify-between border shadow-lg",
          isDark
            ? "bg-slate-900/90 text-slate-100 border-slate-700/60 shadow-slate-950/50"
            : "bg-white/90 text-slate-800 border-slate-200/80 shadow-slate-200/50",
        )}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Background Ambient Glow */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: preset.primaryHex }}
        />

        <div>
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md"
                style={{ backgroundColor: preset.primaryHex }}
              >
                {side}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-tight line-clamp-1">
                    {isVi ? preset.nameVi : preset.nameEn}
                  </span>
                  {preset.themeMode === "dark" ? (
                    <Moon size={12} className="text-indigo-400 shrink-0" />
                  ) : (
                    <Sun size={12} className="text-amber-500 shrink-0" />
                  )}
                </div>
                <span className="text-[10px] font-mono opacity-60">
                  Hex: {preset.primaryHex}
                </span>
              </div>
            </div>

            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border",
                preset.badgeBg,
              )}
            >
              {preset.badgeText}
            </span>
          </div>

          {/* Body Preview Component */}
          <div className="space-y-3">
            {/* Mini Profile Info Box */}
            <div
              className={cn(
                "p-3 rounded-xl border flex items-center gap-3",
                isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5",
              )}
            >
              <div
                className="w-10 h-10 rounded-full ring-2 shrink-0 flex items-center justify-center font-black text-white text-sm"
                style={{
                  backgroundColor: preset.primaryHex,
                  boxShadow: `0 0 12px ${preset.accentGlow}`,
                }}
              >
                HT
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black truncate">Nguyễn Hùng Thái</h4>
                <p className="text-[10px] opacity-75 truncate">
                  Director of Customer Experience (CX)
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-semibold text-emerald-500 uppercase">
                    Available for CX Leadership
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Mini Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "p-2.5 rounded-xl border flex flex-col items-center justify-center text-center",
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5",
                )}
              >
                <span className="text-[10px] font-bold opacity-60 uppercase">CSAT Score</span>
                <span
                  className="text-base font-black tracking-tight"
                  style={{ color: preset.primaryHex }}
                >
                  98.6%
                </span>
              </div>
              <div
                className={cn(
                  "p-2.5 rounded-xl border flex flex-col items-center justify-center text-center",
                  isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5",
                )}
              >
                <span className="text-[10px] font-bold opacity-60 uppercase">NPS Growth</span>
                <span
                  className="text-base font-black tracking-tight"
                  style={{ color: preset.primaryHex }}
                >
                  +42 Pts
                </span>
              </div>
            </div>

            {/* Live Interactive Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                className="flex-1 py-2 px-3 rounded-xl text-white text-[11px] font-black shadow-md transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
                style={{ backgroundColor: preset.primaryHex }}
              >
                <Sparkles size={12} />
                <span>Primary CTA</span>
              </button>
              <button
                type="button"
                className={cn(
                  "py-2 px-3 rounded-xl text-[11px] font-bold border transition-all hover:bg-black/5 dark:hover:bg-white/5",
                  isDark ? "border-white/15 text-slate-200" : "border-slate-300 text-slate-700",
                )}
              >
                Outline
              </button>
            </div>
          </div>
        </div>

        {/* Footer Apply Action */}
        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
          <div className="text-[10px] opacity-60 truncate">
            {isVi ? preset.wallpaperNameVi : preset.wallpaperNameEn}
          </div>
          <button
            type="button"
            onClick={() => handleApply(preset, side)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-white text-xs font-black shadow-md hover:brightness-110 active:scale-95 transition-all"
            style={{ backgroundColor: preset.primaryHex }}
          >
            <Check size={13} />
            <span>{isVi ? `Áp dụng Preset ${side}` : `Apply ${side}`}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7 space-y-6 shadow-xl",
        className,
      )}
    >
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-inner">
            <Columns size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black tracking-tight text-[var(--text-primary)]">
                {isVi ? "So Sánh Giao Diện Trực Quan (Theme Comparison)" : "Live Theme Comparison"}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Split-Screen Preview
              </span>
            </div>
            <p className="text-xs font-medium text-[var(--muted)] mt-0.5">
              {isVi
                ? "Chọn 2 bảng màu tùy chỉnh để so sánh tương quan chia đôi màn hình trước khi áp dụng."
                : "Select two color presets to compare side-by-side or with an interactive split slider."}
            </p>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                setViewMode("sideBySide");
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                viewMode === "sideBySide"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              )}
            >
              <Columns size={13} />
              <span>{isVi ? "Song Song" : "Side-by-Side"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                setViewMode("sliderSplit");
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                viewMode === "sliderSplit"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              )}
            >
              <Split size={13} />
              <span>{isVi ? "Thanh Trượt" : "Split Slider"}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleSwapPresets}
            className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-indigo-600 hover:border-indigo-500 transition-all active:scale-95"
            title={isVi ? "Hoán đổi vị trí Preset A và B" : "Swap Preset A and B"}
          >
            <ArrowLeftRight size={16} />
          </button>
        </div>
      </div>

      {/* Preset Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selector A */}
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">
                A
              </span>
              <span className="text-xs font-black text-[var(--text-primary)]">
                {isVi ? "Phối Màu A (Bên Trái)" : "Preset A (Left Side)"}
              </span>
            </div>
            <span
              className="w-3.5 h-3.5 rounded-full shadow-xs ring-2 ring-white/20"
              style={{ backgroundColor: presetA.primaryHex }}
            />
          </div>

          <select
            value={presetAId}
            onChange={(e) => {
              playUiSound("click");
              setPresetAId(e.target.value);
            }}
            className="w-full px-3.5 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
          >
            {THEME_PRESET_OPTIONS.map((p) => (
              <option key={p.id} value={p.id}>
                {isVi ? p.nameVi : p.nameEn} ({p.themeMode === "dark" ? "Dark" : "Light"})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-[var(--muted)] line-clamp-1">
            {isVi ? presetA.descriptionVi : presetA.descriptionEn}
          </p>
        </div>

        {/* Selector B */}
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] font-black flex items-center justify-center">
                B
              </span>
              <span className="text-xs font-black text-[var(--text-primary)]">
                {isVi ? "Phối Màu B (Bên Phải)" : "Preset B (Right Side)"}
              </span>
            </div>
            <span
              className="w-3.5 h-3.5 rounded-full shadow-xs ring-2 ring-white/20"
              style={{ backgroundColor: presetB.primaryHex }}
            />
          </div>

          <select
            value={presetBId}
            onChange={(e) => {
              playUiSound("click");
              setPresetBId(e.target.value);
            }}
            className="w-full px-3.5 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-cyan-500"
          >
            {THEME_PRESET_OPTIONS.map((p) => (
              <option key={p.id} value={p.id}>
                {isVi ? p.nameVi : p.nameEn} ({p.themeMode === "dark" ? "Dark" : "Light"})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-[var(--muted)] line-clamp-1">
            {isVi ? presetB.descriptionVi : presetB.descriptionEn}
          </p>
        </div>
      </div>

      {/* Comparison Display Canvas */}
      {viewMode === "sideBySide" ? (
        /* SIDE-BY-SIDE MODE (2 COLUMNS) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-2 sm:p-3 rounded-2xl bg-[var(--surface)]/50 border border-[var(--border)]">
          <div>{renderCardMockup(presetA, "A")}</div>
          <div>{renderCardMockup(presetB, "B")}</div>
        </div>
      ) : (
        /* SLIDER SPLIT SCREEN MODE */
        <div className="space-y-3">
          <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)] select-none h-[380px] bg-slate-950">
            {/* Background Layer Left (Preset A) */}
            <div
              className="absolute inset-0 w-full h-full p-4 overflow-hidden"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              {renderCardMockup(presetA, "A")}
            </div>

            {/* Background Layer Right (Preset B) */}
            <div
              className="absolute inset-0 w-full h-full p-4 overflow-hidden"
              style={{
                clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
              }}
            >
              {renderCardMockup(presetB, "B")}
            </div>

            {/* Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] cursor-ew-resize z-20 flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-slate-900 shadow-2xl border-2 border-indigo-600 flex items-center justify-center font-black text-xs hover:scale-110 transition-transform">
                <ArrowLeftRight size={13} className="text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Interactive Range Input Control */}
          <div className="flex items-center gap-3 px-2">
            <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 shrink-0">
              Preset A ({sliderPosition}%)
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-[var(--surface)] rounded-lg"
            />
            <span className="text-[11px] font-black text-cyan-600 dark:text-cyan-400 shrink-0">
              Preset B ({100 - sliderPosition}%)
            </span>
          </div>
        </div>
      )}

      {/* Toast Notice */}
      <AnimatePresence>
        {appliedNotice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
          >
            <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
            <span>{appliedNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeComparison;
