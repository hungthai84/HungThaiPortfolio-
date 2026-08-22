import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Languages, Globe, ChevronDown, Check, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

interface LanguageOption {
  id: "vi" | "en";
  title: string;
  nativeTitle: string;
  subLabel: string;
  code: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    id: "vi",
    title: "Tiếng Việt",
    nativeTitle: "Tiếng Việt",
    subLabel: "Vietnamese (VI)",
    code: "VI",
  },
  {
    id: "en",
    title: "English",
    nativeTitle: "English",
    subLabel: "Tiếng Anh (EN)",
    code: "EN",
  },
];

interface LanguageSwitcherProps {
  variant?: "default" | "compact" | "pill" | "minimal";
  className?: string;
  showLabel?: boolean;
  id?: string;
}

export function LanguageSwitcher({
  variant = "default",
  className,
  showLabel = true,
  id = "header-language-switcher",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVi = language === "vi";

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = (newLang: "vi" | "en") => {
    if (newLang !== language) {
      playUiSound("click");
      setLanguage(newLang);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    playUiSound("toggle");
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block text-left select-none", className)}
    >
      {/* 1. Header Trigger Button (Glassmorphic Button) */}
      <motion.button
        id={id}
        data-name="Nút mở menu chọn ngôn ngữ (Header Language Dropdown)"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={
          isVi
            ? "Ngôn ngữ hiện tại: Tiếng Việt. Nhấn để mở menu chọn ngôn ngữ"
            : "Current language: English. Click to choose language"
        }
        title={
          isVi
            ? "Mở menu chọn ngôn ngữ (Tiếng Việt / English)"
            : "Open language selection menu (English / Vietnamese)"
        }
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group relative flex cursor-pointer items-center gap-2 rounded-xl transition-all duration-300",
          // Glassmorphic Surface Styling with index.css tokens
          "border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] shadow-[var(--glass-shadow)] backdrop-blur-[var(--glass-blur)]",
          "hover:border-[var(--glass-border-hover)] hover:bg-[var(--glass-bg-hover)] hover:shadow-[var(--glass-shadow-hover)]",
          "focus-visible:ring-2 focus-visible:ring-violet-500/80 focus-visible:outline-hidden",
          isOpen &&
            "border-violet-500/50 bg-[var(--glass-bg-active)] shadow-lg ring-2 ring-violet-500/20",
          variant === "compact"
            ? "px-2.5 py-1.5 text-xs font-bold"
            : variant === "pill"
              ? "rounded-full px-3.5 py-1.5 text-xs font-bold"
              : "px-3 py-1.5 text-xs font-bold sm:px-3.5 sm:py-2",
        )}
      >
        {/* Animated Rotating Icon Container */}
        <div className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden sm:h-4.5 sm:w-4.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={language}
              initial={{ rotate: isVi ? -60 : 60, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: isVi ? 60 : -60, opacity: 0, scale: 0.7 }}
              transition={{
                duration: 0.28,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="flex items-center justify-center"
            >
              {isVi ? (
                <Languages
                  size={16}
                  className="text-violet-600 transition-colors group-hover:text-violet-700 dark:text-violet-400 dark:group-hover:text-violet-300"
                />
              ) : (
                <Globe
                  size={16}
                  className="text-sky-600 transition-colors group-hover:text-sky-700 dark:text-sky-400 dark:group-hover:text-sky-300"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Flag SVG Indicator */}
        <div className="relative flex shrink-0 items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`flag-${language}`}
              initial={{ opacity: 0, scale: 0.8, y: 2 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center"
            >
              {isVi ? (
                <svg
                  className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10 shadow-xs dark:border-white/20"
                  viewBox="0 0 36 36"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="18" r="18" fill="#DA251D" />
                  <polygon
                    fill="#FFFF00"
                    points="18,7.5 21.1,13.8 28.1,14.8 23,19.7 24.2,26.7 18,23.4 11.8,26.7 13,19.7 7.9,14.8 14.9,13.8"
                  />
                </svg>
              ) : (
                <svg
                  className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10 shadow-xs dark:border-white/20"
                  viewBox="0 0 36 36"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="18" r="18" fill="#00247D" />
                  <path
                    d="M0,0 L36,36 M36,0 L0,36"
                    stroke="#FFF"
                    strokeWidth="4"
                  />
                  <path
                    d="M0,0 L36,36 M36,0 L0,36"
                    stroke="#CF142B"
                    strokeWidth="2"
                  />
                  <path
                    d="M18,0 L18,36 M0,18 L36,18"
                    stroke="#FFF"
                    strokeWidth="6"
                  />
                  <path
                    d="M18,0 L18,36 M0,18 L36,18"
                    stroke="#CF142B"
                    strokeWidth="3.5"
                  />
                </svg>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Current Active Language Text Label */}
        {showLabel && (
          <div className="relative min-w-[54px] overflow-hidden text-left">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`label-${language}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  "block truncate font-black tracking-tight",
                  isVi
                    ? "text-violet-700 dark:text-violet-300"
                    : "text-sky-700 dark:text-sky-300",
                )}
              >
                {variant === "compact"
                  ? isVi
                    ? "VI"
                    : "EN"
                  : isVi
                    ? "Tiếng Việt"
                    : "English"}
              </motion.span>
            </AnimatePresence>
          </div>
        )}

        {/* Chevron Icon with 180deg Smooth Rotation */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="shrink-0 text-[var(--muted)] group-hover:text-[var(--text-primary)]"
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.button>

      {/* 2. Glassmorphic Dropdown Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`${id}-dropdown-menu`}
            role="listbox"
            aria-label="Language options"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "absolute right-0 z-[120] mt-2 w-56 overflow-hidden rounded-2xl p-1.5",
              // Pure Glassmorphism Tokens & Styling
              "border border-[var(--glass-level-2-border)] bg-[var(--card)]/90 shadow-[var(--glass-shadow-hover)] backdrop-blur-[var(--glass-blur)]",
              "dark:border-[var(--glass-level-2-border)] dark:bg-[var(--card)]/95",
            )}
          >
            {/* Header / Subtitle info inside dropdown */}
            <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-violet-500" />
                <span className="text-[10px] font-black tracking-wider text-[var(--muted)] uppercase">
                  {isVi ? "Chọn ngôn ngữ" : "Select Language"}
                </span>
              </div>
              <span className="rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-black text-violet-600 dark:text-violet-400">
                2 options
              </span>
            </div>

            {/* List of Language Options */}
            <div className="mt-1 flex flex-col gap-1">
              {LANGUAGE_OPTIONS.map((opt) => {
                const isSelected = language === opt.id;
                return (
                  <motion.button
                    key={opt.id}
                    id={`${id}-option-${opt.id}`}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => handleSelectLanguage(opt.id)}
                    whileHover={{ x: 2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "group/item relative flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-200",
                      isSelected
                        ? "border border-violet-500/40 bg-violet-500/15 text-violet-700 shadow-xs dark:bg-violet-500/20 dark:text-violet-300"
                        : "border border-transparent text-[var(--text-primary)] hover:border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Flag Visual */}
                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/50 shadow-xs dark:border-white/20 dark:bg-slate-800/50">
                        {opt.id === "vi" ? (
                          <svg
                            className="h-4.5 w-4.5 rounded-full"
                            viewBox="0 0 36 36"
                          >
                            <circle cx="18" cy="18" r="18" fill="#DA251D" />
                            <polygon
                              fill="#FFFF00"
                              points="18,7.5 21.1,13.8 28.1,14.8 23,19.7 24.2,26.7 18,23.4 11.8,26.7 13,19.7 7.9,14.8 14.9,13.8"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-4.5 w-4.5 rounded-full"
                            viewBox="0 0 36 36"
                          >
                            <circle cx="18" cy="18" r="18" fill="#00247D" />
                            <path
                              d="M0,0 L36,36 M36,0 L0,36"
                              stroke="#FFF"
                              strokeWidth="4"
                            />
                            <path
                              d="M0,0 L36,36 M36,0 L0,36"
                              stroke="#CF142B"
                              strokeWidth="2"
                            />
                            <path
                              d="M18,0 L18,36 M0,18 L36,18"
                              stroke="#FFF"
                              strokeWidth="6"
                            />
                            <path
                              d="M18,0 L18,36 M0,18 L36,18"
                              stroke="#CF142B"
                              strokeWidth="3.5"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Language Title & Subtitle */}
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "text-xs font-black tracking-tight",
                            isSelected
                              ? "text-violet-700 dark:text-violet-300"
                              : "text-[var(--text-primary)] group-hover/item:text-violet-600 dark:group-hover/item:text-violet-400",
                          )}
                        >
                          {opt.title}
                        </span>
                        <span className="text-[10px] font-medium text-[var(--muted)]">
                          {opt.subLabel}
                        </span>
                      </div>
                    </div>

                    {/* Active Checkmark Pill */}
                    {isSelected ? (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs dark:bg-violet-500"
                      >
                        <Check size={12} strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <span className="text-[10px] font-bold text-[var(--muted)] opacity-0 transition-opacity group-hover/item:opacity-100">
                        {opt.code}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
