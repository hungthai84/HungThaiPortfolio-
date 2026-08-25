import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  Layers,
  LayoutGrid,
  Calendar,
  Columns3,
  List,
  SlidersHorizontal,
  X,
  Check,
  ChevronDown,
  RotateCcw,
  Video,
  Sparkles,
  Bookmark,
  FolderTree,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

export interface ToolbarOption {
  id: string;
  labelVi: string;
  labelEn: string;
  icon?: React.ElementType;
  count?: number;
  color?: string;
}

export interface ViewModeOption {
  id: string;
  labelVi: string;
  labelEn: string;
  icon: React.ElementType;
}

export interface UnifiedPageToolbarProps {
  id?: string;
  className?: string;

  // 1. Tìm kiếm (Search)
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;

  // 2. Nhóm (Group / Category)
  groupOptions?: ToolbarOption[];
  activeGroup?: string;
  onGroupChange?: (groupId: string) => void;
  groupLabel?: { vi: string; en: string };

  // 3. Bộ lọc (Filter)
  filterOptions?: ToolbarOption[];
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  filterLabel?: { vi: string; en: string };

  // 4. Dạng view (View Mode)
  viewModeOptions?: ViewModeOption[];
  activeViewMode?: string;
  onViewModeChange?: (mode: string) => void;

  // 5. Nút tính năng (Actions / Features)
  toolbarActions?: React.ReactNode;
  onReset?: () => void;
  showReset?: boolean;
  totalCount?: number;
  filteredCount?: number;

  // Video modal trigger
  videoUrl?: string;
  onVideoClick?: () => void;
}

export function UnifiedPageToolbar({
  id = "unified-page-toolbar",
  className,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  showSearch = true,
  groupOptions = [],
  activeGroup,
  onGroupChange,
  groupLabel,
  filterOptions = [],
  activeFilter,
  onFilterChange,
  filterLabel,
  viewModeOptions = [],
  activeViewMode,
  onViewModeChange,
  toolbarActions,
  onReset,
  showReset,
  totalCount,
  filteredCount,
  videoUrl,
  onVideoClick,
}: UnifiedPageToolbarProps) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  // Internal search state fallback if onSearchChange not passed
  const [localSearch, setLocalSearch] = useState("");
  const isSearchControlled = onSearchChange !== undefined;
  const currentSearch = isSearchControlled ? searchQuery || "" : localSearch;

  const handleSearchInput = (val: string) => {
    if (isSearchControlled && onSearchChange) {
      onSearchChange(val);
    } else {
      setLocalSearch(val);
      window.dispatchEvent(
        new CustomEvent("app-page-search-changed", { detail: { query: val } })
      );
    }
  };

  // Dropdown menus states
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const groupMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        groupMenuRef.current &&
        !groupMenuRef.current.contains(e.target as Node)
      ) {
        setIsGroupMenuOpen(false);
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(e.target as Node)
      ) {
        setIsFilterMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  // Check if filters/search are currently active to show reset button
  const hasActiveFilters =
    Boolean(currentSearch.trim()) ||
    (activeGroup && activeGroup !== "all" && activeGroup !== "Tất cả") ||
    (activeFilter && activeFilter !== "all" && activeFilter !== "All" && activeFilter !== "Tất cả");

  const currentGroupObj = groupOptions.find((g) => g.id === activeGroup);
  const currentFilterObj = filterOptions.find((f) => f.id === activeFilter);

  return (
    <div
      id={id}
      data-name="Thẻ thanh công cụ tích hợp trang (Unified Page Toolbar Card)"
      className={cn(
        "group/toolbar relative z-30 w-full rounded-2xl border transition-all duration-300",
        "border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md",
        "shadow-xs hover:border-black/10 dark:hover:border-white/15 px-2.5 sm:px-3.5 py-2",
        className
      )}
    >
      <div className="flex w-full items-center justify-between gap-1.5 sm:gap-2.5 md:gap-3 flex-nowrap overflow-x-auto no-scrollbar">
        {/* ========================================================================= */}
        {/* 1. TÌM KIẾM (SEARCH BOX)                                                 */}
        {/* ========================================================================= */}
        {showSearch && (
          <div className="relative flex shrink items-center min-w-[110px] sm:min-w-[160px] md:min-w-[200px] max-w-[280px]">
            <div className="relative flex w-full items-center rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 px-2.5 py-1.5 shadow-2xs transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
              <Search
                size={14}
                className="shrink-0 text-slate-400 dark:text-slate-500 mr-1.5"
              />
              <input
                type="text"
                value={currentSearch}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder={
                  searchPlaceholder ||
                  (isVi ? "Tìm kiếm..." : "Search...")
                }
                className="w-full bg-transparent text-xs font-semibold text-[var(--text-primary)] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none truncate"
              />
              {currentSearch && (
                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    handleSearchInput("");
                  }}
                  className="shrink-0 cursor-pointer rounded-full p-0.5 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-slate-200 transition-colors ml-1"
                  title={isVi ? "Xóa tìm kiếm" : "Clear search"}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. NHÓM / CATEGORY (GROUP SELECTOR)                                      */}
        {/* ========================================================================= */}
        {groupOptions.length > 0 && onGroupChange && (
          <div ref={groupMenuRef} className="relative shrink-0">
            <button
              type="button"
              id="toolbar-group-selector-btn"
              onClick={() => {
                playUiSound("click");
                setIsGroupMenuOpen(!isGroupMenuOpen);
              }}
              className={cn(
                "group relative flex cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-black transition-all select-none shadow-2xs",
                activeGroup && activeGroup !== "all" && activeGroup !== "Tất cả"
                  ? "border-sky-500/50 bg-sky-500/15 text-sky-700 dark:text-sky-300 ring-2 ring-sky-500/20"
                  : "border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:border-sky-500/40 hover:bg-sky-50/50 dark:hover:bg-slate-800"
              )}
              title={
                isVi
                  ? `Nhóm: ${
                      currentGroupObj?.labelVi || "Tất cả"
                    } (Bấm để chọn)`
                  : `Group: ${
                      currentGroupObj?.labelEn || "All"
                    } (Click to select)`
              }
            >
              <FolderTree
                size={14}
                className={cn(
                  "shrink-0",
                  activeGroup && activeGroup !== "all" && activeGroup !== "Tất cả"
                    ? "text-sky-600 dark:text-sky-400"
                    : "text-slate-500 dark:text-slate-400 group-hover:text-sky-500"
                )}
              />
              <span className="hidden lg:inline text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {groupLabel
                  ? isVi
                    ? groupLabel.vi
                    : groupLabel.en
                  : isVi
                  ? "Nhóm:"
                  : "Group:"}
              </span>
              <span className="font-extrabold tracking-tight truncate max-w-[85px] sm:max-w-[120px]">
                {currentGroupObj
                  ? isVi
                    ? currentGroupObj.labelVi
                    : currentGroupObj.labelEn
                  : isVi
                  ? "Tất cả"
                  : "All"}
              </span>
              {currentGroupObj?.count !== undefined && (
                <span className="hidden sm:inline-block rounded-md bg-black/5 dark:bg-white/10 px-1.5 py-0.2 text-[10px] font-black">
                  {currentGroupObj.count}
                </span>
              )}
              <ChevronDown
                size={12}
                className={cn(
                  "shrink-0 text-slate-400 transition-transform duration-200",
                  isGroupMenuOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu for Group */}
            <AnimatePresence>
              {isGroupMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-1.5 z-50 flex w-56 flex-col gap-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/95 p-1.5 shadow-2xl backdrop-blur-xl"
                >
                  <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">
                    {isVi ? "Chọn nhóm / phân loại" : "Select Category / Group"}
                  </div>
                  <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1">
                    {groupOptions.map((opt) => {
                      const isSelected = activeGroup === opt.id;
                      const Icon = opt.icon || FolderTree;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            playUiSound("toggle");
                            onGroupChange(opt.id);
                            setIsGroupMenuOpen(false);
                          }}
                          className={cn(
                            "flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition-all",
                            isSelected
                              ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 font-black border border-sky-500/30"
                              : "text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Icon size={14} className="shrink-0 text-sky-600 dark:text-sky-400" />
                            <span className="truncate">
                              {isVi ? opt.labelVi : opt.labelEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {opt.count !== undefined && (
                              <span className="rounded-md bg-black/5 dark:bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                                {opt.count}
                              </span>
                            )}
                            {isSelected && (
                              <Check size={14} className="text-sky-600 dark:text-sky-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. BỘ LỌC (FILTER SELECTOR)                                              */}
        {/* ========================================================================= */}
        {filterOptions.length > 0 && onFilterChange && (
          <div ref={filterMenuRef} className="relative shrink-0">
            <button
              type="button"
              id="toolbar-filter-selector-btn"
              onClick={() => {
                playUiSound("click");
                setIsFilterMenuOpen(!isFilterMenuOpen);
              }}
              className={cn(
                "group relative flex cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-black transition-all select-none shadow-2xs",
                activeFilter && activeFilter !== "all" && activeFilter !== "All" && activeFilter !== "Tất cả"
                  ? "border-indigo-500/50 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20"
                  : "border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:border-indigo-500/40 hover:bg-indigo-50/50 dark:hover:bg-slate-800"
              )}
              title={
                isVi
                  ? `Bộ lọc: ${
                      currentFilterObj?.labelVi || "Tất cả"
                    } (Bấm để lọc)`
                  : `Filter: ${
                      currentFilterObj?.labelEn || "All"
                    } (Click to filter)`
              }
            >
              <SlidersHorizontal
                size={14}
                className={cn(
                  "shrink-0",
                  activeFilter && activeFilter !== "all" && activeFilter !== "All" && activeFilter !== "Tất cả"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400 group-hover:text-indigo-500"
                )}
              />
              <span className="hidden md:inline text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {filterLabel
                  ? isVi
                    ? filterLabel.vi
                    : filterLabel.en
                  : isVi
                  ? "Lọc:"
                  : "Filter:"}
              </span>
              <span className="font-extrabold tracking-tight truncate max-w-[85px] sm:max-w-[120px]">
                {currentFilterObj
                  ? isVi
                    ? currentFilterObj.labelVi
                    : currentFilterObj.labelEn
                  : isVi
                  ? "Tất cả"
                  : "All"}
              </span>
              {currentFilterObj?.count !== undefined && (
                <span className="hidden sm:inline-block rounded-md bg-black/5 dark:bg-white/10 px-1.5 py-0.2 text-[10px] font-black">
                  {currentFilterObj.count}
                </span>
              )}
              <ChevronDown
                size={12}
                className={cn(
                  "shrink-0 text-slate-400 transition-transform duration-200",
                  isFilterMenuOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu for Filter */}
            <AnimatePresence>
              {isFilterMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-1.5 z-50 flex w-56 flex-col gap-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/95 p-1.5 shadow-2xl backdrop-blur-xl"
                >
                  <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">
                    {isVi ? "Tùy chọn lọc dữ liệu" : "Filter Options"}
                  </div>
                  <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1">
                    {filterOptions.map((opt) => {
                      const isSelected = activeFilter === opt.id;
                      const Icon = opt.icon || Filter;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            playUiSound("toggle");
                            onFilterChange(opt.id);
                            setIsFilterMenuOpen(false);
                          }}
                          className={cn(
                            "flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition-all",
                            isSelected
                              ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-black border border-indigo-500/30"
                              : "text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Icon size={14} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                            <span className="truncate">
                              {isVi ? opt.labelVi : opt.labelEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {opt.count !== undefined && (
                              <span className="rounded-md bg-black/5 dark:bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                                {opt.count}
                              </span>
                            )}
                            {isSelected && (
                              <Check size={14} className="text-indigo-600 dark:text-indigo-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. DẠNG VIEW (VIEW MODE SWITCHER)                                        */}
        {/* ========================================================================= */}
        {viewModeOptions.length > 0 && onViewModeChange && (
          <div className="flex shrink-0 items-center rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-1 shadow-2xs">
            <span className="hidden xl:inline text-[11px] font-bold text-slate-400 dark:text-slate-500 px-1.5">
              {isVi ? "Dạng xem:" : "View:"}
            </span>
            <div className="flex items-center gap-0.5">
              {viewModeOptions.map((opt) => {
                const isSelected = activeViewMode === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      onViewModeChange(opt.id);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-black transition-all duration-200 select-none",
                      isSelected
                        ? "bg-indigo-600 text-white shadow-xs dark:bg-indigo-500"
                        : "text-slate-600 hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    )}
                    title={isVi ? opt.labelVi : opt.labelEn}
                  >
                    <Icon size={13} className="shrink-0" />
                    {/* Collapsible label for 1-row responsiveness */}
                    <span className="hidden sm:inline">
                      {isVi ? opt.labelVi : opt.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. NÚT TÍNH NĂNG & ACTIONS (FEATURE BUTTONS)                              */}
        {/* ========================================================================= */}
        <div className="flex shrink-0 items-center gap-1.5 ml-auto">
          {/* Custom actions passed from parent */}
          {toolbarActions}

          {/* Video Presentation Modal Action */}
          {videoUrl && onVideoClick && (
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                onVideoClick();
              }}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-purple-500/40 bg-purple-500/10 px-2.5 py-1.5 text-xs font-black text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 shadow-2xs transition-all"
              title={isVi ? "Xem video giới thiệu" : "Watch presentation"}
            >
              <Video size={13} className="shrink-0 text-purple-600 dark:text-purple-400" />
              <span className="hidden md:inline">
                {isVi ? "Video" : "Video"}
              </span>
            </button>
          )}

          {/* Reset Filters & Search Action */}
          {(showReset || hasActiveFilters) && onReset && (
            <button
              type="button"
              onClick={() => {
                playUiSound("toggle");
                onReset();
              }}
              className="flex cursor-pointer items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-black text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 shadow-2xs transition-all"
              title={isVi ? "Đặt lại toàn bộ bộ lọc và tìm kiếm" : "Reset all filters and search"}
            >
              <RotateCcw size={12} className="shrink-0" />
              <span className="hidden sm:inline">
                {isVi ? "Đặt lại" : "Reset"}
              </span>
            </button>
          )}

          {/* Counter Badge if provided */}
          {totalCount !== undefined && (
            <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-[11px] font-black text-slate-600 dark:text-slate-400">
              <span>
                {filteredCount !== undefined
                  ? `${filteredCount}/${totalCount}`
                  : totalCount}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {isVi ? "mục" : "items"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnifiedPageToolbar;
