import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Droplet,
  Languages,
  Globe,
  Sun,
  Moon,
  Laptop,
  MonitorSmartphone,
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";

export function TopNavActionStack({
  currentThemeMode,
  onToggleThemeMode,
  onNavigate,
  className,
}: {
  currentThemeMode: string;
  onToggleThemeMode: () => void;
  onNavigate?: (page: string) => void;
  className?: string;
}) {
  const { language, setLanguage } = useLanguage();
  const isVi = language === "vi";

  // Shared Hover State
    const [isHovered, setIsHovered] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isDeviceDropdownOpen, setIsDeviceDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  
  const [glassColorTheme, setGlassColorTheme] = useState(() => {
    return localStorage.getItem("app_glass_theme") || "aurora";
  });
  

  useEffect(() => {
    document.documentElement.setAttribute('data-glass-theme', glassColorTheme);
    localStorage.setItem("app_glass_theme", glassColorTheme);
  }, [glassColorTheme]);
  const [customHexColor, setCustomHexColor] = useState(() => {
    return localStorage.getItem("app_glass_custom_color") || "#8b5cf6";
  });

  useEffect(() => {
    if (glassColorTheme === "custom-color") {
      document.documentElement.style.setProperty('--custom-glass-accent', customHexColor);
      
      let r = 0, g = 0, b = 0;
      if (customHexColor.length === 7) {
        r = parseInt(customHexColor.substring(1,3), 16);
        g = parseInt(customHexColor.substring(3,5), 16);
        b = parseInt(customHexColor.substring(5,7), 16);
      }
      
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.style.setProperty('--custom-glass-bg', `rgba(${Math.max(r-40,0)}, ${Math.max(g-40,0)}, ${Math.max(b-40,0)}, 0.45)`);
        document.documentElement.style.setProperty('--custom-glass-bg-hover', `rgba(${Math.max(r-20,0)}, ${Math.max(g-20,0)}, ${Math.max(b-20,0)}, 0.65)`);
      } else {
        document.documentElement.style.setProperty('--custom-glass-bg', `rgba(${Math.min(r+200,255)}, ${Math.min(g+200,255)}, ${Math.min(b+200,255)}, 0.45)`);
        document.documentElement.style.setProperty('--custom-glass-bg-hover', `rgba(${Math.min(r+200,255)}, ${Math.min(g+200,255)}, ${Math.min(b+200,255)}, 0.65)`);
      }
    } else {
      document.documentElement.style.removeProperty('--custom-glass-accent');
      document.documentElement.style.removeProperty('--custom-glass-bg');
      document.documentElement.style.removeProperty('--custom-glass-bg-hover');
    }
    
    localStorage.setItem("app_glass_custom_color", customHexColor);
  }, [glassColorTheme, customHexColor, currentThemeMode]);

  



  // Close dropdowns when mouse leaves the stack
  useEffect(() => {
    if (!isHovered) {
      setIsLangDropdownOpen(false); setIsColorDropdownOpen(false);
      setIsDeviceDropdownOpen(false); setIsColorDropdownOpen(false);
    }
  }, [isHovered]);

  // Device Preview State
  const [viewportMode, setViewportMode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app_viewport_mode") || "desktop";
    }
    return "desktop";
  });

  // Responsive / Fixed Layout Mode State
  const [isResponsive, setIsResponsive] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_is_responsive");
      return saved !== "false";
    }
    return true;
  });
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleSetResp = (e: any) => {
      if (e.detail && typeof e.detail.isResponsive === "boolean") {
        setIsResponsive(e.detail.isResponsive);
      }
    };
    const handleToggleResp = () => {
      setIsResponsive((prev) => !prev);
    };
    window.addEventListener("app-set-responsive", handleSetResp);
    window.addEventListener("app-toggle-responsive", handleToggleResp);
    return () => {
      window.removeEventListener("app-set-responsive", handleSetResp);
      window.removeEventListener("app-toggle-responsive", handleToggleResp);
    };
  }, []);

  useEffect(() => {
    const handleSetDevice = (e: any) => {
      if (e.detail?.mode) setViewportMode(e.detail.mode);
    };
    window.addEventListener("app-set-viewport-mode", handleSetDevice);
    return () => window.removeEventListener("app-set-viewport-mode", handleSetDevice);
  }, []);

  return (
    <div className="absolute right-4 top-4 z-[100] hidden md:flex items-center">
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="flex items-center"
      >
        {/* ========================================================================= */}
        {/* 1. NÚT HÌNH NỀN (WALLPAPERS) - Layer 1                                   */}
        {/* ========================================================================= */}
        <motion.button
          layout
          type="button"
          id="stack-wallpaper-btn"
          data-name="Nút hình nền trong cụm xếp chồng"
          onClick={(e) => {
            e.stopPropagation();
            playUiSound("click");
            if (onNavigate) { onNavigate("wallpapers"); } else { window.dispatchEvent(new Event("app-open-wallpapers")); }
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          style={{ zIndex: 20 }}
          className={cn(
            "group relative flex shrink-0 items-center justify-center cursor-pointer rounded-xl border text-xs font-bold transition-all duration-300 px-3 py-2 gap-2 select-none",
            "border-cyan-500/50 bg-cyan-50/95 dark:bg-slate-900/95 text-cyan-950 dark:text-cyan-200",
            "hover:border-cyan-500/70 hover:bg-cyan-100 dark:hover:bg-slate-800 shadow-cyan-500/10",
            "w-[130px] h-[38px]",
            "ml-0",
            !isHovered && "shadow-[-3px_0_8px_rgba(0,0,0,0.12)] ring-1 ring-black/5 dark:ring-white/10"
          )}
          title={isVi ? "Thay đổi hình nền" : "Change Wallpaper"}
        >
          <Palette
            size={16}
            className="shrink-0 text-cyan-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="whitespace-nowrap font-black tracking-tight">
            {isVi ? "Hình nền" : "Wallpaper"}
          </span>
        </motion.button>

        
        {/* ========================================================================= */}
        {/* 3. NÚT MÀU SẮC (COLORS) - Layer 3                                       */}
        {/* ========================================================================= */}
        <div
          className={cn(
            "relative inline-block transition-all duration-300",
            isHovered ? "ml-0" : "-ml-[94px]"
          )}
          style={{ zIndex: 30 }}
        >
          <motion.button
            layout
            type="button"
            id="stack-colors-btn"
            onClick={(e) => {
              e.stopPropagation();
              playUiSound("toggle");
              setIsColorDropdownOpen((prev) => !prev);
              setIsLangDropdownOpen(false);
              setIsDeviceDropdownOpen(false);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "group relative flex shrink-0 items-center justify-center cursor-pointer rounded-xl border text-xs font-bold transition-all duration-300 px-3 py-2 gap-2 select-none",
              "border-fuchsia-500/50 bg-fuchsia-50/95 dark:bg-slate-900/95 text-fuchsia-950 dark:text-fuchsia-200",
              "hover:border-fuchsia-500/70 hover:bg-fuchsia-100 dark:hover:bg-slate-800 shadow-fuchsia-500/10",
              "w-[130px] h-[38px]",
              isColorDropdownOpen && "ring-2 ring-fuchsia-500/50 border-fuchsia-500",
              !isHovered && "shadow-[-4px_0_10px_rgba(0,0,0,0.2)] dark:shadow-[-4px_0_10px_rgba(0,0,0,0.45)] ring-1 ring-black/10 dark:ring-white/15"
            )}
            title={isVi ? "Màu sắc: Thay đổi bảng màu" : "Colors: Change color theme"}
          >
            <Droplet size={16} className="text-fuchsia-600 dark:text-fuchsia-400 group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-extrabold tracking-tight whitespace-nowrap text-fuchsia-700 dark:text-fuchsia-300">
              {isVi ? "Màu sắc" : "Colors"}
            </span>
            <ChevronDown
              size={13}
              className={cn(
                "text-fuchsia-500 transition-transform duration-200 shrink-0",
                isColorDropdownOpen && "rotate-180"
              )}
            />
          </motion.button>
          
          {/* Colors Dropdown */}
          <AnimatePresence>
            {isColorDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 top-full mt-2 w-48 max-h-[400px] overflow-y-auto rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/95 p-1.5 shadow-2xl backdrop-blur-xl z-[100]"
              >
                <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">
                  {isVi ? "Chọn bảng màu Glassmorphism" : "Select Glass Theme"}
                </div>
                {[
                  { id: 'neo-dark-glass', nameVi: 'NEO Glass Tối Đa Sắc', nameEn: 'NEO Colorful Dark Glass', color: 'bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400' },
                  { id: 'aurora', nameVi: 'Tím Aurora', nameEn: 'Purple Aurora', color: 'bg-purple-500' },
                  { id: 'cyber-neon', nameVi: 'Cyber Neon', nameEn: 'Cyber Neon', color: 'bg-cyan-500' },
                  { id: 'emerald-aurora', nameVi: 'Emerald Aurora', nameEn: 'Emerald Aurora', color: 'bg-emerald-400' },
                  { id: 'sunset-flare', nameVi: 'Sunset Flare', nameEn: 'Sunset Flare', color: 'bg-rose-500' },
                  { id: 'royal-violet', nameVi: 'Royal Violet', nameEn: 'Royal Violet', color: 'bg-violet-600' },
                  { id: 'oceanic-blue', nameVi: 'Oceanic Blue', nameEn: 'Oceanic Blue', color: 'bg-blue-600' },
                  { id: 'tokyo-crimson', nameVi: 'Tokyo Crimson', nameEn: 'Tokyo Crimson', color: 'bg-rose-700' },
                  { id: 'neo-mint', nameVi: 'Neo Mint Glass', nameEn: 'Neo Mint Glass', color: 'bg-emerald-300' },
                  { id: 'luxury-amber', nameVi: 'Luxury Amber', nameEn: 'Luxury Amber', color: 'bg-amber-600' },
                  { id: 'ocean', nameVi: 'Biển Sâu', nameEn: 'Deep Ocean', color: 'bg-teal-500' },
                  { id: 'forest', nameVi: 'Rừng Xanh', nameEn: 'Emerald Forest', color: 'bg-emerald-500' },
                  { id: 'sunset', nameVi: 'Hoàng Hôn', nameEn: 'Sunset Orange', color: 'bg-orange-500' },
                  { id: 'frost', nameVi: 'Băng Tuyết', nameEn: 'Silver Frost', color: 'bg-slate-400' },
                  { id: 'custom-color', nameVi: 'Chọn mã màu', nameEn: 'Custom Color', color: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' },
                ].map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playUiSound("click");
                      setGlassColorTheme(theme.id);
                      if (theme.id === "neo-dark-glass" && currentThemeMode !== "dark") {
                        onToggleThemeMode();
                      }
                      setIsColorDropdownOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all mt-1",
                      glassColorTheme === theme.id
                        ? "bg-[var(--glass-accent)]/15 text-[var(--glass-accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--glass-bg-hover)]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {theme.id === "custom-color" ? (
                        <div className="relative w-4 h-4 rounded-full overflow-hidden shadow-inner border border-black/10 shrink-0 flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500">
                           <input
                            type="color"
                            value={customHexColor}
                            onClick={(e) => {
                              e.stopPropagation();
                              setGlassColorTheme("custom-color");
                            }}
                            onChange={(e) => {
                              setCustomHexColor(e.target.value);
                              setGlassColorTheme("custom-color");
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
                           />
                        </div>
                      ) : (
                        <span className={cn("w-3.5 h-3.5 rounded-full shadow-inner shrink-0", theme.color)}></span>
                      )}
                      <span>{isVi ? theme.nameVi : theme.nameEn}</span>
                    </div>
                    {glassColorTheme === theme.id && <Check size={14} className="text-[var(--glass-accent)]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* 4. NÚT GIAO DIỆN (THEME) - Layer 4                                     */}
        {/* ========================================================================= */}
        <motion.button
          layout
          type="button"
          id="stack-theme-btn"
          style={{ zIndex: 40 }}
          className={cn(
            "relative inline-block transition-all duration-300",
            isHovered ? "ml-0" : "-ml-[94px]",
            "group relative flex shrink-0 items-center justify-center cursor-pointer rounded-xl border text-xs font-bold transition-all duration-300 px-3 py-2 gap-2 select-none",
            currentThemeMode === "light" &&
              "border-amber-500/50 bg-amber-50/95 dark:bg-slate-900/95 text-amber-950 dark:text-amber-200 shadow-amber-500/10 hover:bg-amber-100 dark:hover:bg-slate-800",
            currentThemeMode === "dark" &&
              "border-indigo-500/50 bg-indigo-50/95 dark:bg-slate-900/95 text-indigo-100 shadow-indigo-500/10 hover:bg-indigo-900 hover:border-indigo-400",
            currentThemeMode === "system" &&
              "border-slate-300/80 dark:border-slate-700/80 bg-slate-100/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-slate-500/10 hover:bg-slate-200 dark:hover:bg-slate-800",
            "w-[130px] h-[38px]",
            isHovered ? "ml-0" : "-ml-[94px]",
            !isHovered && "shadow-[-3px_0_8px_rgba(0,0,0,0.16)] dark:shadow-[-3px_0_8px_rgba(0,0,0,0.4)] ring-1 ring-black/5 dark:ring-white/10"
          )}
          title={
            isVi
              ? `Giao diện: ${
                  currentThemeMode === "light"
                    ? "Sáng"
                    : currentThemeMode === "dark"
                    ? "Tối"
                    : "Hệ thống"
                } (Bấm để đổi)`
              : `Theme: ${
                  currentThemeMode === "light"
                    ? "Light"
                    : currentThemeMode === "dark"
                    ? "Dark"
                    : "System"
                } (Click to switch)`
          }
        >
          {currentThemeMode === "light" && (
            <Sun
              size={16}
              className="text-amber-500 fill-amber-300 animate-[spin_12s_linear_infinite] shrink-0"
            />
          )}
          {currentThemeMode === "dark" && (
            <Moon
              size={16}
              className="text-indigo-400 fill-indigo-300 animate-pulse shrink-0"
            />
          )}
          {currentThemeMode === "system" && (
            <Laptop
              size={16}
              className="text-violet-500 dark:text-violet-400 shrink-0"
            />
          )}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-extrabold tracking-tight">
              {isVi
                ? currentThemeMode === "light"
                  ? "Sáng"
                  : currentThemeMode === "dark"
                  ? "Tối"
                  : "Hệ thống"
                : currentThemeMode === "light"
                ? "Light"
                : currentThemeMode === "dark"
                ? "Dark"
                : "System"}
            </span>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                currentThemeMode === "light" && "bg-amber-500",
                currentThemeMode === "dark" && "bg-indigo-400",
                currentThemeMode === "system" && "bg-violet-400"
              )}
            />
          </div>
        </motion.button>

        {/* ========================================================================= */}
        {/* 5. NÚT NGÔN NGỮ (LANGUAGE) - Layer 5                                     */}
        {/* ========================================================================= */}
        <div
          className={cn(
            "relative inline-block transition-all duration-300",
            isHovered ? "ml-0" : "-ml-[94px]"
          )}
          style={{ zIndex: 50 }}
        >
          <motion.button
            layout
            type="button"
            id="stack-language-btn"
            data-name="Nút ngôn ngữ trong cụm xếp chồng"
            onClick={(e) => {
              e.stopPropagation();
              playUiSound("toggle");
              setIsLangDropdownOpen((prev) => !prev);
              setIsDeviceDropdownOpen(false); setIsColorDropdownOpen(false);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={cn(
              "group relative flex shrink-0 items-center justify-center cursor-pointer rounded-xl border text-xs font-bold transition-all duration-300 px-3 py-2 gap-2 select-none",
              "border-violet-500/50 bg-violet-50/95 dark:bg-slate-900/95 text-violet-950 dark:text-violet-200",
              "hover:border-violet-500/70 hover:bg-violet-100 dark:hover:bg-slate-800 shadow-violet-500/10",
              "w-[130px] h-[38px]",
              isLangDropdownOpen && "ring-2 ring-violet-500/50 border-violet-500",
              !isHovered && "shadow-[-4px_0_10px_rgba(0,0,0,0.2)] dark:shadow-[-4px_0_10px_rgba(0,0,0,0.45)] ring-1 ring-black/10 dark:ring-white/15"
            )}
            title={
              isVi
                ? "Ngôn ngữ: Tiếng Việt (Bấm để đổi sang English)"
                : "Language: English (Click to switch to Vietnamese)"
            }
          >
            {/* Animated Language / Globe Icon */}
            <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
              {isVi ? (
                <Languages
                  size={16}
                  className="text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform"
                />
              ) : (
                <Globe
                  size={16}
                  className="text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform"
                />
              )}
            </div>
            {/* Language Text Badge - Full Language Name */}
            <span className="font-black tracking-tight whitespace-nowrap text-violet-700 dark:text-violet-300">
              {isVi ? "Tiếng Việt" : "English"}
            </span>
            {/* Chevron indicator */}
            <ChevronDown
              size={13}
              className={cn(
                "text-violet-500 transition-transform duration-200 shrink-0",
                isLangDropdownOpen && "rotate-180"
              )}
            />
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
                    setIsLangDropdownOpen(false); setIsColorDropdownOpen(false);
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
                    setIsLangDropdownOpen(false); setIsColorDropdownOpen(false);
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
