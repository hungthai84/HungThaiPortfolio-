import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Mail,
  User,
  Briefcase,
  GraduationCap,
  Brain,
  Building2,
  FolderKanban,
  Compass,
  Images,
  ChevronRight,
  ChevronLeft,
  Video,
  FileDown,
  Languages,
  Server,
  CalendarDays,
  Menu,
  X,
  Search,
  Check,
  Sparkles,
  Bot,
  Settings,
  Sun,
  Moon,
  MessageCircle,
  LucideIcon,
  Palette,
  Smartphone,
  Monitor,
} from "lucide-react";
import { PageId } from "../types";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  ambientSoundEnabled?: boolean;
  onToggleAmbient?: () => void;
  neuSidebar?: boolean;
  isResponsive?: boolean;
}

interface NavItemConfig {
  id: PageId;
  icon: LucideIcon;
  glassBg: string;
  iconColor: string;
  hoverColor: string;
  activeBg: string;
  activePill: string;
}

export const allNavItemsList: NavItemConfig[] = [
  {
    id: "home",
    icon: Home,
    glassBg:
      "from-rose-500/30 via-orange-500/25 to-amber-500/20 border-rose-400/40",
    iconColor: "text-rose-600 dark:text-rose-400",
    hoverColor: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    activeBg: "from-rose-600 via-orange-600 to-amber-600",
    activePill: "bg-rose-500 dark:bg-rose-400",
  },
  {
    id: "coverLetter",
    icon: Mail,
    glassBg:
      "from-emerald-500/30 via-teal-500/25 to-cyan-500/20 border-emerald-400/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    hoverColor:
      "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    activeBg: "from-emerald-600 via-teal-600 to-cyan-600",
    activePill: "bg-emerald-500 dark:bg-emerald-400",
  },
  {
    id: "about",
    icon: User,
    glassBg:
      "from-indigo-500/30 via-purple-500/25 to-violet-500/20 border-indigo-400/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    hoverColor: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    activeBg: "from-indigo-600 via-purple-600 to-violet-600",
    activePill: "bg-indigo-500 dark:bg-indigo-400",
  },
  {
    id: "experience",
    icon: Briefcase,
    glassBg:
      "from-blue-500/30 via-sky-500/25 to-cyan-500/20 border-blue-400/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverColor: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    activeBg: "from-blue-600 via-sky-600 to-cyan-600",
    activePill: "bg-blue-500 dark:bg-blue-400",
  },
  {
    id: "education",
    icon: GraduationCap,
    glassBg:
      "from-amber-500/30 via-yellow-500/25 to-orange-500/20 border-amber-400/40",
    iconColor: "text-amber-700 dark:text-amber-400",
    hoverColor: "group-hover:text-amber-700 dark:group-hover:text-amber-400",
    activeBg: "from-amber-500 via-orange-500 to-yellow-600",
    activePill: "bg-amber-500 dark:bg-amber-400",
  },
  {
    id: "skills",
    icon: Brain,
    glassBg:
      "from-purple-500/30 via-fuchsia-500/25 to-pink-500/20 border-purple-400/40",
    iconColor: "text-purple-600 dark:text-purple-400",
    hoverColor: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    activeBg: "from-purple-600 via-fuchsia-600 to-pink-600",
    activePill: "bg-purple-500 dark:bg-purple-400",
  },
  {
    id: "industries",
    icon: Building2,
    glassBg:
      "from-cyan-500/30 via-teal-500/25 to-emerald-500/20 border-cyan-400/40",
    iconColor: "text-cyan-700 dark:text-cyan-400",
    hoverColor: "group-hover:text-cyan-700 dark:group-hover:text-cyan-400",
    activeBg: "from-cyan-600 via-teal-600 to-emerald-600",
    activePill: "bg-cyan-500 dark:bg-cyan-400",
  },
  {
    id: "projects",
    icon: FolderKanban,
    glassBg:
      "from-orange-500/30 via-amber-500/25 to-rose-500/20 border-orange-400/40",
    iconColor: "text-orange-600 dark:text-orange-400",
    hoverColor: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
    activeBg: "from-orange-600 via-amber-600 to-rose-600",
    activePill: "bg-orange-500 dark:bg-orange-400",
  },
  {
    id: "systems",
    icon: Server,
    glassBg:
      "from-violet-500/30 via-cyan-500/25 to-emerald-500/20 border-violet-400/40",
    iconColor: "text-violet-600 dark:text-violet-400",
    hoverColor: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    activeBg: "from-violet-600 via-cyan-600 to-emerald-600",
    activePill: "bg-violet-500 dark:bg-violet-400",
  },
  {
    id: "interview",
    icon: Video,
    glassBg:
      "from-pink-500/30 via-rose-500/25 to-purple-500/20 border-pink-400/40",
    iconColor: "text-pink-600 dark:text-pink-400",
    hoverColor: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    activeBg: "from-pink-600 via-rose-600 to-purple-600",
    activePill: "bg-pink-500 dark:bg-pink-400",
  },
  {
    id: "astrology",
    icon: Compass,
    glassBg:
      "from-purple-500/30 via-indigo-500/25 to-violet-500/20 border-purple-400/40",
    iconColor: "text-purple-600 dark:text-purple-400",
    hoverColor: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    activeBg: "from-purple-600 via-indigo-600 to-violet-600",
    activePill: "bg-purple-500 dark:bg-purple-400",
  },
  {
    id: "memories",
    icon: Images,
    glassBg:
      "from-fuchsia-500/30 via-pink-500/25 to-rose-500/20 border-fuchsia-400/40",
    iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
    hoverColor:
      "group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400",
    activeBg: "from-fuchsia-600 via-pink-600 to-rose-600",
    activePill: "bg-fuchsia-500 dark:bg-fuchsia-400",
  },
  {
    id: "aiChat",
    icon: Bot,
    glassBg:
      "from-purple-500/30 via-violet-500/25 to-indigo-500/20 border-purple-400/40",
    iconColor: "text-purple-600 dark:text-purple-400",
    hoverColor: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    activeBg: "from-purple-600 via-violet-600 to-indigo-600",
    activePill: "bg-purple-500 dark:bg-purple-400",
  },
  {
    id: "wallpapers",
    icon: Palette,
    glassBg:
      "from-cyan-500/30 via-sky-500/25 to-blue-500/20 border-cyan-400/40",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    hoverColor: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
    activeBg: "from-cyan-600 via-sky-600 to-blue-600",
    activePill: "bg-cyan-500 dark:bg-cyan-400",
  },
];

const desktopNavItemsList = allNavItemsList.filter(
  (item) => item.id !== "systems" && item.id !== "aiChat" && item.id !== "wallpapers",
);

export function Sidebar({
  activePage,
  onNavigate,
  isExpanded,
  onToggleExpand,
  ambientSoundEnabled,
  onToggleAmbient,
  neuSidebar,
  isResponsive,
}: SidebarProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleToggleLanguage = () => {
    playUiSound("click");
    toggleLanguage();
  };

  const activeBgClass = null;

  const activeNavItem = allNavItemsList.find((item) => item.id === activePage);
  const ActiveIcon = activeNavItem ? activeNavItem.icon : Home;

  // Filter items in mobile drawer search
  const filteredNavItems = allNavItemsList
    .filter((item) => item.id !== "wallpapers")
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const label = t.nav[item.id] || item.id;
      return label.toLowerCase().includes(searchQuery.toLowerCase());
    });

  // Close drawer on Escape key and prevent body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile & Tablet Navigation Header (< lg) */}
      <header className="sticky top-0 z-40 flex w-full shrink-0 items-center justify-between border-none bg-transparent px-3.5 py-2.5 shadow-none backdrop-blur-none lg:hidden">
        <div className="flex items-center gap-2">
          {/* Hamburger Menu Trigger Button */}
          <button
            id="mobile-menu-trigger-btn"
            data-name="Nút mở thanh điều hướng di động (Mobile Navigation Trigger)"
            onClick={() => {
              playUiSound("click");
              setIsMobileMenuOpen(true);
            }}
            className={cn(
              "glass-xs hover:glass-sm group relative flex shrink-0 cursor-pointer items-center justify-center rounded-xl p-2 text-[var(--text-primary)] transition-all focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-95",
              isMobileMenuOpen && "ring-2 ring-violet-500",
            )}
            aria-label="Open Navigation Menu"
            title={language === "vi" ? "Mở Menu điều hướng" : "Open Menu"}
          >
            <Menu
              size={20}
              className="text-violet-600 transition-transform duration-300 group-hover:rotate-90 dark:text-violet-400"
            />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-[var(--bg)] bg-emerald-500" />
          </button>

          {/* User Avatar & Active Page Tag */}
          <div className="flex shrink-0 items-center gap-2">
            <img
              src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
              alt="Hùng Thái"
              className="h-10 w-10 rounded-full border-2 border-violet-500/80 object-cover shadow-md ring-2 ring-violet-500/20"
            />
            <div className="hidden flex-col leading-none sm:flex">
              <span className="text-[13px] font-black text-[var(--text-primary)]">
                Nguyễn Hùng Thái
              </span>
              <span className="text-[9px] font-bold tracking-tighter text-violet-500 uppercase">
                CX Executive Manager
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons Header Bar (Chat, Theme, Language, AI, PDF) */}
        <div className="no-scrollbar flex max-w-[70vw] items-center justify-end gap-1.5 overflow-x-auto py-0.5 sm:max-w-none">
          {/* Chat Icon Button */}
          <button
            onClick={() => {
              playUiSound("click");
              onNavigate("aiChat");
            }}
            className="glass-xs hover:glass-sm flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black text-purple-600 transition-all active:scale-95 dark:text-purple-400"
            title="Chat"
          >
            <MessageCircle size={13} />
            <span>Chat</span>
          </button>

          {/* PDF Print Button */}
          <button
            onClick={() => {
              playUiSound("click");
              window.dispatchEvent(new CustomEvent("app-trigger-download"));
            }}
            className="glass-xs hover:glass-sm flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black text-violet-600 transition-all focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-95 dark:text-violet-400"
            title={t.header.printPdfCv}
          >
            <FileDown size={13} />
            <span>PDF</span>
          </button>
        </div>
      </header>

      {/* Slide-out Hamburger Drawer for Mobile & Tablet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Blur Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] cursor-pointer bg-[var(--shadow-color)] backdrop-blur-md lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-out Panel with Smooth Transition */}
            <motion.div
              initial={{ x: "-100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 280,
                opacity: { duration: 0.2 },
              }}
              style={{ borderRadius: 0, boxShadow: "none" }}
              className="glass-fluent-acrylic fixed top-0 bottom-0 left-0 z-[101] flex w-[310px] max-w-[85vw] flex-col justify-between overflow-hidden rounded-none !shadow-none shadow-none lg:hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Drawer Header */}
              <div className="glass-xs flex items-center justify-between border-b border-[var(--border)] p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                      alt="Hùng Thái"
                      className="h-12 w-12 rounded-full border-[3px] border-violet-500 object-cover shadow-md ring-2 ring-violet-500/30"
                    />
                    <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-emerald-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1.5 text-sm font-black text-[var(--text)]">
                      Nguyễn Hùng Thái{" "}
                      <Sparkles
                        size={12}
                        className="animate-spin-slow text-amber-500"
                      />
                    </span>
                    <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400">
                      CX Executive Manager
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playUiSound("click");
                    setIsMobileMenuOpen(false);
                  }}
                  className="glass-xs hover:glass-sm cursor-pointer rounded-full p-2 text-[var(--muted)] transition-all hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-violet-500"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Quick Search */}
              <div className="px-4 pt-3 pb-1">
                <div className="glass-search-bar relative flex items-center px-3 py-1.5">
                  <Search
                    size={14}
                    className="mr-2 shrink-0 text-[var(--muted)]"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      language === "vi"
                        ? "Tìm danh mục..."
                        : "Search category..."
                    }
                    className="w-full border-none bg-transparent text-xs text-[var(--text-primary)] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 shrink-0 cursor-pointer text-[var(--muted)] hover:text-[var(--text-primary)]"
                      aria-label="Clear search"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer Navigation List */}
              <nav className="no-scrollbar flex-1 space-y-1.5 overflow-y-auto px-3 py-2">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  const label = t.nav[item.id] || item.id;
                  const desc =
                    (t.navDesc as Record<string, string>)?.[item.id] || "";
                  return (
                    <motion.button
                      key={item.id}
                      id={`sidebar-nav-mobile-${item.id}`}
                      data-name={`Nút chuyển di động sang trang ${label} (Go to ${label} page)`}
                      onClick={() => {
                        playUiSound("pageSwitch");
                        onNavigate(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "group flex w-full cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ease-out",
                        isActive
                          ? "border-black/10 bg-black/5 shadow-xs dark:border-white/15 dark:bg-white/10"
                          : "border-transparent bg-transparent hover:border-black/5 hover:bg-black/5 dark:hover:border-white/10 dark:hover:bg-white/10",
                        neuSidebar && "neu-btn",
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-3 pr-2">
                        <Icon
                          size={19}
                          className={cn(
                            "shrink-0 transition-all duration-200 ease-out group-hover:scale-110 group-hover:rotate-3",
                            item.iconColor,
                          )}
                        />

                        <div className="flex min-w-0 flex-col">
                          <span
                            className={cn(
                              "truncate text-[13px] font-semibold tracking-tight transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:font-bold",
                              item.iconColor,
                            )}
                          >
                            {label}
                          </span>
                        </div>
                      </div>

                      {isActive ? (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/40 text-[var(--text-primary)] shadow-xs dark:border-white/20 dark:bg-white/20 dark:text-white">
                          <Check size={10} />
                        </span>
                      ) : (
                        <ChevronRight size={14} className="text-[#7e8590] transition-transform duration-200 group-hover:translate-x-0.5" />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="magic-card flex flex-col gap-2 border-t border-[var(--border)] bg-[var(--card)]/80 p-3">
                <button
                  onClick={() => {
                    playUiSound("click");
                    window.dispatchEvent(
                      new CustomEvent("app-trigger-download"),
                    );
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 py-2.5 text-xs font-bold text-violet-600 transition-colors hover:bg-violet-500/20 dark:text-violet-400"
                >
                  <FileDown size={14} />
                  <span>{t.header.printPdfCv}</span>
                </button>
                <div className="pt-1 text-center text-[10px] font-medium text-[var(--muted)]">
                  © 2026 Hùng Thái • Interactive Portfolio
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Vertical Sidebar (>= lg) */}
      <aside
        style={{ borderRadius: 0, boxShadow: "none" }}
        className={cn(
          "!bg-transparent relative z-50 ml-0 hidden h-full flex-shrink-0 flex-col justify-between rounded-none border-r border-black/5 dark:border-white/5 px-2 py-4 font-bold !shadow-none shadow-none transition-all duration-300 lg:flex",
          isExpanded ? "w-[200px] items-center" : "w-[100px] items-center",
        )}
      >
        {/* 1. TOP SECTION: Avatar */}
        <div
          className={cn(
            "mb-4 flex w-full pt-2",
            isExpanded
              ? "flex-row items-center gap-3 px-4"
              : "flex-col items-center px-0",
          )}
        >
          <div
            className="group relative shrink-0 cursor-pointer"
            onClick={onToggleExpand}
          >
            <img
              src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
              alt="Avatar"
              className={cn(
                "rounded-full border-2 border-violet-500 object-cover shadow-lg transition-all duration-300",
                isExpanded ? "h-14 w-14" : "h-10 w-10",
              )}
            />
            <span
              className={cn(
                "absolute right-0 bottom-0 animate-pulse rounded-full border-2 border-[var(--bg)] bg-emerald-500",
                isExpanded ? "h-4 w-4" : "h-3 w-3",
              )}
            />
          </div>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex min-w-0 flex-col items-start"
            >
              <span className="text-[14px] leading-tight font-black whitespace-nowrap text-[var(--text-primary)]">
                Nguyễn Hùng Thái
              </span>
              <span className="mt-0.5 text-[10px] font-bold tracking-tighter whitespace-nowrap text-violet-500 uppercase opacity-80">
                CX Executive Manager
              </span>
            </motion.div>
          )}
        </div>

        {/* 2. CENTER SECTION: Menu Icons */}
        <nav
          className={cn(
            "my-auto flex w-full flex-col space-y-2 overflow-visible py-2",
            isExpanded ? "items-stretch px-2" : "items-center px-0",
          )}
        >
          {desktopNavItemsList.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            const label = t.nav[item.id] || item.id;
            const desc = (t.navDesc as Record<string, string>)?.[item.id] || "";
            return (
              <motion.button
                key={item.id}
                id={`sidebar-nav-desktop-${item.id}`}
                data-name={`Nút chuyển sang trang ${label} (Go to ${label} page)`}
                title={`${label} - ${desc}`}
                onClick={() => {
                  playUiSound("pageSwitch");
                  onNavigate(item.id);
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                data-active={isActive}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "sidebar-nav-item group relative flex h-10 shrink-0 cursor-pointer items-center rounded-xl transition-colors duration-200 hover:bg-[var(--shadow-color)]/5",
                  isExpanded
                    ? "w-full justify-start gap-2.5 px-3"
                    : "mx-auto w-10 justify-center",
                  isActive
                    ? `bg-[var(--glass-xs-bg)] ${item.iconColor}`
                    : item.iconColor,
                )}
              >
                <Icon
                  size={22}
                  className={cn(
                    "shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-6",
                    item.iconColor,
                  )}
                />
                {isExpanded && (
                  <span
                    className={cn(
                      "truncate text-left text-[13px] font-black tracking-tight whitespace-nowrap",
                      item.iconColor,
                    )}
                  >
                    {label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* 3. BOT SECTION: Toggle Collapse/Expand Button */}
        <div
          className={cn(
            "flex w-full shrink-0 items-center justify-center border-t border-[var(--border)] px-0 pt-3",
          )}
        >
          <motion.button
            onClick={onToggleExpand}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "group flex cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-2 text-[var(--muted)] shadow-none transition-colors hover:bg-[var(--shadow-color)]/5 hover:text-[var(--text-primary)]",
            )}
            title={
              isExpanded
                ? language === "vi"
                  ? "Thu gọn thanh menu"
                  : "Collapse Sidebar"
                : language === "vi"
                  ? "Mở rộng thanh menu"
                  : "Expand Sidebar"
            }
          >
            {isExpanded ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform group-hover:-translate-x-0.5"
              >
                <line x1="4" y1="4" x2="4" y2="20" />
                <line x1="20" y1="12" x2="9" y2="12" />
                <polyline points="14 6 8 12 14 18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform group-hover:translate-x-0.5"
              >
                <line x1="4" y1="4" x2="4" y2="20" />
                <line x1="8" y1="12" x2="19" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            )}
          </motion.button>
        </div>
      </aside>
    </>
  );
}
