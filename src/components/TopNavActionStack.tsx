import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Sun, Moon, Laptop, Languages, Globe, ChevronDown, Check, SwatchBook } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

interface TopNavActionStackProps {
  currentThemeMode: "light" | "dark" | "system";
  onToggleThemeMode: () => void;
  onNavigate?: (page: string) => void;
  className?: string;
  onOpenColorPicker?: () => void; // Added prop
}

export function TopNavActionStack({
  currentThemeMode,
  onToggleThemeMode,
  onNavigate,
  className,
  onOpenColorPicker, // Added prop
}: TopNavActionStackProps) {
  const { language, setLanguage } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVi = language === "vi";

  // Handle click outside to close dropdown and collapse if needed
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isLangDropdownOpen) {
          setIsHovered(false);
        }
      }}
      className={cn(
        "pointer-events-auto relative inline-flex items-center select-none transition-all duration-300",
        className
      )}
    >
      {/* Outer Glow & Background Frame */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className={cn(
          "relative flex items-center rounded-2xl border transition-colors duration-300 backdrop-blur-xl shadow-lg",
          "border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/10",
          "gap-2 p-1 ring-1 ring-white/20 dark:ring-white/10"
        )}
      >
        {/* ========================================================================= */}
        {/* 1. NÚT HÌNH NỀN (WALLPAPERS) */}
        {/* ========================================================================= */}
        <motion.button
          layout
          type="button"
          id="stack-wallpaper-btn"
          data-name="Nút hình nền"
          onClick={(e) => {
            e.stopPropagation();
            playUiSound("click");
            onNavigate?.("wallpapers");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex h-12 items-center gap-2 px-4 cursor-pointer rounded-2xl transition-all duration-200",
            "border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-teal-500/5 text-cyan-900 dark:text-cyan-200",
            "hover:border-cyan-500/60 hover:from-cyan-500/25 hover:to-sky-500/15 shadow-sm"
          )}
          title={isVi ? "Thay đổi hình nền" : "Change Wallpaper"}
        >
          <Palette size={18} className="text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-bold">{isVi ? "Hình nền" : "Wallpapers"}</span>
        </motion.button>

        {/* ========================================================================= */}
        {/* 1.1. NÚT MÀU CHÍNH (MAIN COLOR) */}
        {/* ========================================================================= */}
        <motion.button
          layout
          type="button"
          id="stack-color-btn"
          data-name="Nút màu chính"
          onClick={(e) => {
            e.stopPropagation();
            playUiSound("click");
            onOpenColorPicker?.();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex h-12 items-center gap-2 px-4 cursor-pointer rounded-2xl transition-all duration-200",
            "border border-rose-500/30 bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-rose-500/5 text-rose-900 dark:text-rose-200",
            "hover:border-rose-500/60 hover:from-rose-500/25 hover:to-pink-500/15 shadow-sm"
          )}
          title={isVi ? "Chọn màu chính" : "Select Main Color"}
        >
          <SwatchBook size={18} className="text-rose-600 dark:text-rose-400" />
          <span className="text-sm font-bold">{isVi ? "Màu chính" : "Main Color"}</span>
        </motion.button>

        {/* ========================================================================= */}
        {/* 2. NÚT GIAO DIỆN (THEME) */}
        {/* ========================================================================= */}
        <motion.button
          layout
          type="button"
          id="stack-theme-toggle-btn"
          data-name="Nút giao diện"
          onClick={(e) => {
            e.stopPropagation();
            playUiSound("toggle");
            onToggleThemeMode();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex h-12 items-center gap-2 px-4 cursor-pointer rounded-2xl border transition-all duration-200",
            currentThemeMode === "light" &&
              "border-amber-400/60 bg-gradient-to-r from-amber-400/25 via-amber-300/20 to-amber-200/10 text-amber-950 dark:text-amber-200",
            currentThemeMode === "dark" &&
              "border-indigo-400/60 bg-gradient-to-r from-indigo-600/25 via-indigo-500/20 to-purple-600/15 text-indigo-950 dark:text-indigo-200",
            currentThemeMode === "system" &&
              "border-slate-300/80 dark:border-slate-700/80 bg-gradient-to-r from-slate-200/60 via-slate-100/50 to-slate-200/40 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-900/80 text-slate-800 dark:text-slate-200"
          )}
          title={
            isVi
              ? `Giao diện: ${
                  currentThemeMode === "light"
                    ? "Sáng"
                    : currentThemeMode === "dark"
                    ? "Tối"
                    : "Hệ thống"
                }`
              : `Theme: ${
                  currentThemeMode === "light"
                    ? "Light"
                    : currentThemeMode === "dark"
                    ? "Dark"
                    : "System"
                }`
          }
        >
          {currentThemeMode === "light" && <Sun size={18} className="text-amber-500 shrink-0" />}
          {currentThemeMode === "dark" && <Moon size={18} className="text-indigo-400 shrink-0" />}
          {currentThemeMode === "system" && <Laptop size={18} className="text-violet-500 dark:text-violet-400 shrink-0" />}
          <span className="text-sm font-bold">
            {isVi 
              ? (currentThemeMode === "light" ? "Sáng" : currentThemeMode === "dark" ? "Tối" : "Hệ thống")
              : (currentThemeMode === "light" ? "Light" : currentThemeMode === "dark" ? "Dark" : "System")}
          </span>
          <ChevronDown size={14} className="opacity-60" />
        </motion.button>

        {/* ========================================================================= */}
        {/* 3. NÚT NGÔN NGỮ (LANGUAGE) */}
        {/* ========================================================================= */}
        <div className="relative" style={{ zIndex: 30 }}>
          <motion.button
            layout
            type="button"
            id="stack-language-btn"
            data-name="Nút ngôn ngữ"
            onClick={(e) => {
              e.stopPropagation();
              playUiSound("toggle");
              setIsLangDropdownOpen((prev) => !prev);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex h-12 items-center gap-2 px-4 cursor-pointer rounded-2xl border transition-all duration-200",
              "border-violet-500/40 bg-gradient-to-r from-violet-500/20 via-purple-500/15 to-indigo-500/10 text-violet-950 dark:text-violet-200",
              "hover:border-violet-500/60 hover:from-violet-500/30 hover:to-purple-500/20",
              isLangDropdownOpen && "ring-2 ring-violet-500/50 border-violet-500"
            )}
            title={isVi ? "Ngôn ngữ: Tiếng Việt" : "Language: English"}
          >
            <Languages size={18} className="text-violet-600 dark:text-violet-400" />
            <span className="text-sm font-bold">{isVi ? "Tiếng Việt" : "English"}</span>
            <ChevronDown size={14} className={cn("opacity-60 transition-transform", isLangDropdownOpen && "rotate-180")} />
          </motion.button>

          {/* Language Dropdown Menu */}
          <AnimatePresence>
            {isLangDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-44 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/95 p-1.5 shadow-2xl backdrop-blur-xl z-[100]"
              >
                <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">
                  {isVi ? "Chọn ngôn ngữ" : "Select Language"}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playUiSound("click");
                    setLanguage("vi");
                    setIsLangDropdownOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all",
                    isVi
                      ? "bg-violet-500/15 text-violet-700 dark:text-violet-300 font-black"
                      : "text-[var(--text-secondary)] hover:bg-[var(--glass-bg-hover)]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 rounded-full border border-black/10" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="18" fill="#DA251D" />
                      <polygon fill="#FFFF00" points="18,7.5 21.1,13.8 28.1,14.8 23,19.7 24.2,26.7 18,23.4 11.8,26.7 13,19.7 7.9,14.8 14.9,13.8" />
                    </svg>
                    <span>Tiếng Việt</span>
                  </div>
                  {isVi && <Check size={14} className="text-violet-600 dark:text-violet-400" />}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playUiSound("click");
                    setLanguage("en");
                    setIsLangDropdownOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all",
                    !isVi
                      ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 font-black"
                      : "text-[var(--text-secondary)] hover:bg-[var(--glass-bg-hover)]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 rounded-full border border-black/10" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="18" fill="#00247D" />
                      <path d="M0,0 L36,36 M36,0 L0,36" stroke="#FFF" strokeWidth="4" />
                      <path d="M0,0 L36,36 M36,0 L0,36" stroke="#CF142B" strokeWidth="2" />
                      <path d="M18,0 L18,36 M0,18 L36,18" stroke="#FFF" strokeWidth="6" />
                      <path d="M18,0 L18,36 M0,18 L36,18" stroke="#CF142B" strokeWidth="3.5" />
                    </svg>
                    <span>English</span>
                  </div>
                  {!isVi && <Check size={14} className="text-sky-600 dark:text-sky-400" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
