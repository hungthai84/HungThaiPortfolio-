import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderTree,
  Search,
  ChevronRight,
  ChevronDown,
  GripVertical,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Copy,
  Check,
  Box,
  Layers,
  FileText,
  Grid,
  Sparkles,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Code,
  Tag,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { SITE_PAGE_OBJECTS, PageObjectItem } from "../data/pageObjectsData";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";

export interface TreeNode {
  id: string;
  componentId: string;
  nameVi: string;
  nameEn: string;
  type: "page" | "section" | "card" | "component" | "interactive" | "modal" | "banner";
  selector: string;
  dimensions?: string;
  descriptionVi?: string;
  tags?: string[];
  children?: TreeNode[];
}

// Initial Default Page Tree Structure with linked objects from SITE_PAGE_OBJECTS
const INITIAL_PAGES_ORDER: { pageId: string; nameVi: string; nameEn: string; iconName: string; route: string }[] = [
  { pageId: "home", nameVi: "Trang Chủ (Executive CX)", nameEn: "Home (Executive CX)", iconName: "home", route: "/" },
  { pageId: "coverLetter", nameVi: "Thư Ngỏ (Cover Letter)", nameEn: "Cover Letter", iconName: "mail", route: "/coverLetter" },
  { pageId: "about", nameVi: "Giới Thiệu & Bản Lĩnh (About)", nameEn: "About & Leadership", iconName: "user", route: "/about" },
  { pageId: "education", nameVi: "Học Vấn & Chứng Chỉ (Education)", nameEn: "Education & Certs", iconName: "graduation", route: "/education" },
  { pageId: "experience", nameVi: "Kinh Nghiệm Thực Chiến (Experience)", nameEn: "Experience & Timeline", iconName: "briefcase", route: "/experience" },
  { pageId: "industries", nameVi: "Lĩnh Vực Chuyên Sâu (Industries)", nameEn: "Industries & Domains", iconName: "building", route: "/industries" },
  { pageId: "skills", nameVi: "Kỹ Năng & Năng Lực CX (Skills)", nameEn: "Skills & Core Strengths", iconName: "zap", route: "/skills" },
  { pageId: "projects", nameVi: "Dự Án & Case Studies (Projects)", nameEn: "Projects & Impact", iconName: "folder", route: "/projects" },
  { pageId: "interview", nameVi: "Phỏng Vấn & Q&A (Interview)", nameEn: "Interview & Insights", iconName: "message", route: "/interview" },
  { pageId: "tuvi", nameVi: "Tử Vi & Nhân Tướng (Horoscope)", nameEn: "Eastern Horoscope", iconName: "sparkles", route: "/tuvi" },
  { pageId: "systems", nameVi: "Hệ Thống & Kiến Trúc (Systems)", nameEn: "System Architecture", iconName: "cpu", route: "/systems" },
  { pageId: "memories", nameVi: "Kỷ Niệm & Dấu Ấn (Memories)", nameEn: "Career Memories", iconName: "camera", route: "/memories" },
  { pageId: "aiChat", nameVi: "Trợ Lý AI Thông Minh (AI Assistant)", nameEn: "AI Chat Assistant", iconName: "bot", route: "/aiChat" },
  { pageId: "wallpapers", nameVi: "Kho Hình Nền & Giao Diện (Theme)", nameEn: "Wallpapers & Visuals", iconName: "palette", route: "/wallpapers" },
];

export function WebsiteTreeManager() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  // Search query state for name or component ID / selector
  const [treeSearch, setTreeSearch] = useState<string>("");
  
  // Custom ordered page list (with local persistence)
  const [pagesOrder, setPagesOrder] = useState<typeof INITIAL_PAGES_ORDER>(() => {
    try {
      const saved = localStorage.getItem("app_tree_navigation_order");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PAGES_ORDER;
  });

  // Custom ordered child sections per page
  const [sectionsOrderMap, setSectionsOrderMap] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem("app_tree_sections_order");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {};
  });

  // Expanded nodes state
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = { "page-home": true, "page-about": true };
    return init;
  });

  // Dragging state
  const [draggedPageIdx, setDraggedPageIdx] = useState<number | null>(null);
  const [draggedSectionInfo, setDraggedSectionInfo] = useState<{ pageId: string; itemIdx: number } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playUiSound("click");
    showToast(isVi ? `Đã sao chép: ${text}` : `Copied: ${text}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (nodeId: string) => {
    playUiSound("click");
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const expandAll = () => {
    playUiSound("click");
    const all: Record<string, boolean> = {};
    pagesOrder.forEach((p) => {
      all[`page-${p.pageId}`] = true;
    });
    setExpandedNodes(all);
    showToast(isVi ? "Đã mở rộng tất cả các nhánh cây" : "Expanded all tree nodes");
  };

  const collapseAll = () => {
    playUiSound("click");
    setExpandedNodes({});
    showToast(isVi ? "Đã thu gọn tất cả các nhánh cây" : "Collapsed all tree nodes");
  };

  // Reorder page move up/down
  const movePage = (index: number, direction: "up" | "down") => {
    playUiSound("click");
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pagesOrder.length) return;

    const newOrder = [...pagesOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);

    setPagesOrder(newOrder);
    localStorage.setItem("app_tree_navigation_order", JSON.stringify(newOrder));
    showToast(isVi ? `Đã di chuyển trang "${moved.nameVi}" ${direction === "up" ? "lên" : "xuống"}` : `Moved page ${direction}`);
  };

  // Reorder section inside a page
  const moveSection = (pageId: string, itemIdx: number, direction: "up" | "down", itemsList: PageObjectItem[]) => {
    playUiSound("click");
    const targetIndex = direction === "up" ? itemIdx - 1 : itemIdx + 1;
    if (targetIndex < 0 || targetIndex >= itemsList.length) return;

    const currentIds = itemsList.map((i) => i.id);
    const [movedId] = currentIds.splice(itemIdx, 1);
    currentIds.splice(targetIndex, 0, movedId);

    const newMap = { ...sectionsOrderMap, [pageId]: currentIds };
    setSectionsOrderMap(newMap);
    localStorage.setItem("app_tree_sections_order", JSON.stringify(newMap));
    showToast(isVi ? `Đã thay đổi thứ tự đối tượng trong trang` : `Updated item order`);
  };

  // Reset to initial order
  const resetOrder = () => {
    playUiSound("reset");
    setPagesOrder(INITIAL_PAGES_ORDER);
    setSectionsOrderMap({});
    localStorage.removeItem("app_tree_navigation_order");
    localStorage.removeItem("app_tree_sections_order");
    showToast(isVi ? "Đã khôi phục thứ tự phân cấp mặc định!" : "Restored default hierarchy order!");
  };

  // Build tree nodes with search filter
  const treeData = useMemo(() => {
    const query = treeSearch.trim().toLowerCase();

    return pagesOrder.map((page, pageIndex) => {
      // Get all objects belonging to this page
      const rawItems = SITE_PAGE_OBJECTS.filter((o) => o.pageId === page.pageId);

      // Custom ordered child objects
      let sortedItems = [...rawItems];
      const customPageOrder = sectionsOrderMap[page.pageId];
      if (customPageOrder && Array.isArray(customPageOrder)) {
        sortedItems.sort((a, b) => {
          const indexA = customPageOrder.indexOf(a.id);
          const indexB = customPageOrder.indexOf(b.id);
          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });
      }

      // Check if page itself matches search
      const pageMatch = !query ||
        page.nameVi.toLowerCase().includes(query) ||
        page.nameEn.toLowerCase().includes(query) ||
        page.pageId.toLowerCase().includes(query) ||
        `#page-${page.pageId}`.toLowerCase().includes(query);

      // Filter matched children
      const matchingChildren = sortedItems.filter((item) => {
        if (!query) return true;
        return (
          item.nameVi.toLowerCase().includes(query) ||
          item.nameEn.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.selector.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          (item.descriptionVi && item.descriptionVi.toLowerCase().includes(query)) ||
          (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)))
        );
      });

      const hasMatchingChild = matchingChildren.length > 0;
      const isVisible = pageMatch || hasMatchingChild;

      return {
        page,
        pageIndex,
        items: sortedItems,
        matchingChildren: query ? matchingChildren : sortedItems,
        isVisible,
        pageMatch,
        hasMatchingChild,
        totalItemsCount: rawItems.length,
      };
    }).filter((node) => node.isVisible);
  }, [pagesOrder, sectionsOrderMap, treeSearch]);

  // Total matching count
  const totalMatchingItemsCount = useMemo(() => {
    let count = 0;
    treeData.forEach((node) => {
      count += node.matchingChildren.length;
    });
    return count;
  }, [treeData]);

  // If searching, automatically expand matching parent nodes
  useEffect(() => {
    if (treeSearch.trim()) {
      const autoExpand: Record<string, boolean> = {};
      treeData.forEach((node) => {
        if (node.hasMatchingChild || node.pageMatch) {
          autoExpand[`page-${node.page.pageId}`] = true;
        }
      });
      setExpandedNodes((prev) => ({ ...prev, ...autoExpand }));
    }
  }, [treeSearch, treeData]);

  return (
    <div className="space-y-6">
      {/* Search Bar & Filter Header */}
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-inner">
              <FolderTree size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-[var(--text-primary)]">
                  {isVi ? "Cấu Trúc Cây & Sắp Xếp Menu / Section (Tree View)" : "Interactive Tree Hierarchy & Reorder"}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Drag & Drop
                </span>
              </div>
              <p className="text-xs font-medium text-[var(--muted)] mt-0.5">
                {isVi
                  ? "Tìm kiếm nhanh theo tên hoặc thẻ Component ID (#id), kéo thả hoặc dùng nút điều hướng để thay đổi thứ tự hiển thị."
                  : "Search elements by name or Component ID, reorder items via Drag & Drop or precision buttons."}
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap self-end md:self-auto">
            <button
              type="button"
              onClick={expandAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:bg-[var(--border)] cursor-pointer"
            >
              <Maximize2 size={13} />
              <span>{isVi ? "Mở Tất Cả" : "Expand All"}</span>
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:bg-[var(--border)] cursor-pointer"
            >
              <Minimize2 size={13} />
              <span>{isVi ? "Thu Gọn" : "Collapse All"}</span>
            </button>
            <button
              type="button"
              onClick={resetOrder}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all hover:bg-rose-500/20 cursor-pointer"
              title={isVi ? "Khôi phục thứ tự mặc định" : "Reset default order"}
            >
              <RotateCcw size={13} />
              <span>{isVi ? "Đặt Lại Thứ Tự" : "Reset Order"}</span>
            </button>
          </div>
        </div>

        {/* SEARCH BAR (Filter by Name or Component ID) */}
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-4 text-[var(--muted)] pointer-events-none" />
          <input
            id="tree-search-filter-input"
            type="text"
            placeholder={
              isVi
                ? "🔍 Tìm kiếm cây đối tượng theo tên (VD: Thư ngỏ, Học vấn, Hero...) hoặc Component ID (VD: #home-hero-banner, .timeline)..."
                : "🔍 Filter tree by name or Component ID (e.g. #home-hero-banner, .timeline)..."
            }
            value={treeSearch}
            onChange={(e) => setTreeSearch(e.target.value)}
            className="w-full pl-11 pr-24 py-3 rounded-2xl bg-[var(--surface)] border-2 border-[var(--border)] text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 shadow-inner transition-all"
          />
          {treeSearch && (
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                setTreeSearch("");
              }}
              className="absolute right-4 text-xs font-bold text-[var(--muted)] hover:text-[var(--text-primary)] px-2 py-1 rounded-md bg-[var(--card)] border border-[var(--border)]"
            >
              {isVi ? "Xóa tìm kiếm" : "Clear"}
            </button>
          )}
        </div>

        {/* Search Results Summary & Quick Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
            <span>
              {isVi ? "Tìm thấy:" : "Found:"}{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">
                {treeData.length} {isVi ? "Trang/Nhóm" : "Pages"}
              </strong>{" "}
              &{" "}
              <strong className="text-cyan-600 dark:text-cyan-400">
                {totalMatchingItemsCount} {isVi ? "Thành phần" : "Components"}
              </strong>
            </span>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-[var(--muted)] mr-1">
              {isVi ? "Gợi ý lọc:" : "Quick tags:"}
            </span>
            {["Hero", "Card", "KPI", "Interactive", "Modal", "Timeline", "Project"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setTreeSearch(tag);
                }}
                className={cn(
                  "px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border",
                  treeSearch.toLowerCase() === tag.toLowerCase()
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--border)]",
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TREE VIEW ACCORDION / DRAG & DROP LIST */}
      <div className="space-y-3">
        {treeData.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--card)] p-12 text-center">
            <Search size={40} className="mx-auto text-[var(--muted)] mb-3 opacity-40" />
            <h4 className="text-base font-black text-[var(--text-primary)]">
              {isVi ? "Không tìm thấy nhánh nào khớp với từ khóa" : "No tree nodes matching query"}
            </h4>
            <p className="text-xs text-[var(--muted)] mt-1">
              {isVi
                ? `Không có Component ID hoặc đối tượng nào chứa "${treeSearch}".`
                : `No components or nodes match "${treeSearch}".`}
            </p>
            <button
              type="button"
              onClick={() => setTreeSearch("")}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 transition-all"
            >
              {isVi ? "Xóa bộ lọc" : "Clear Filter"}
            </button>
          </div>
        ) : (
          treeData.map((node, nodeIdx) => {
            const pageId = node.page.pageId;
            const isExpanded = !!expandedNodes[`page-${pageId}`];
            const isFirst = nodeIdx === 0;
            const isLast = nodeIdx === treeData.length - 1;

            return (
              <div
                key={pageId}
                draggable={!treeSearch}
                onDragStart={() => setDraggedPageIdx(node.pageIndex)}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={() => {
                  if (draggedPageIdx !== null && draggedPageIdx !== node.pageIndex) {
                    playUiSound("click");
                    const newOrder = [...pagesOrder];
                    const [moved] = newOrder.splice(draggedPageIdx, 1);
                    newOrder.splice(node.pageIndex, 0, moved);
                    setPagesOrder(newOrder);
                    localStorage.setItem("app_tree_navigation_order", JSON.stringify(newOrder));
                    setDraggedPageIdx(null);
                    showToast(isVi ? `Đã đổi vị trí trang "${moved.nameVi}"` : `Reordered page`);
                  }
                }}
                onDragEnd={() => setDraggedPageIdx(null)}
                className={cn(
                  "rounded-2xl border transition-all duration-200 bg-[var(--card)] overflow-hidden shadow-sm",
                  draggedPageIdx === node.pageIndex
                    ? "opacity-50 border-dashed border-indigo-500 scale-[0.99]"
                    : "border-[var(--border)] hover:border-indigo-500/40",
                  node.hasMatchingChild && treeSearch
                    ? "ring-1 ring-indigo-500/30"
                    : "",
                )}
              >
                {/* Level 1: Page / Menu Route Node Header */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 bg-[var(--surface)]/60 border-b border-[var(--border)]/70 select-none">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {/* Drag Handle */}
                    <div
                      className={cn(
                        "p-1.5 rounded-lg text-[var(--muted)] transition-colors",
                        !treeSearch ? "cursor-grab active:cursor-grabbing hover:bg-[var(--border)] hover:text-[var(--text-primary)]" : "opacity-30 cursor-not-allowed",
                      )}
                      title={isVi ? "Kéo thả để đổi thứ tự trang trên menu" : "Drag to reorder menu page"}
                    >
                      <GripVertical size={16} />
                    </div>

                    {/* Order Badge */}
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-black flex items-center justify-center shrink-0 border border-indigo-500/20">
                      #{node.pageIndex + 1}
                    </span>

                    {/* Expand/Collapse Chevron */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(`page-${pageId}`)}
                      className="p-1 rounded-lg text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-all shrink-0"
                    >
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>

                    {/* Page Name & Route */}
                    <div
                      onClick={() => toggleExpand(`page-${pageId}`)}
                      className="cursor-pointer min-w-0 flex-1"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-black text-[var(--text-primary)] truncate">
                          {isVi ? node.page.nameVi : node.page.nameEn}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/5 dark:bg-white/10 text-[var(--muted)] border border-[var(--border)]">
                          {node.page.route}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Tools & Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Component Count Badge */}
                    <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 whitespace-nowrap">
                      {node.matchingChildren.length} {isVi ? "thành phần" : "items"}
                    </span>

                    {/* Move Up / Move Down Buttons */}
                    <div className="flex items-center rounded-xl bg-[var(--card)] border border-[var(--border)] p-0.5">
                      <button
                        type="button"
                        disabled={isFirst || !!treeSearch}
                        onClick={() => movePage(node.pageIndex, "up")}
                        className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-[var(--text-secondary)] transition-all cursor-pointer"
                        title={isVi ? "Di chuyển trang lên trên" : "Move page up"}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={isLast || !!treeSearch}
                        onClick={() => movePage(node.pageIndex, "down")}
                        className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-[var(--text-secondary)] transition-all cursor-pointer"
                        title={isVi ? "Di chuyển trang xuống dưới" : "Move page down"}
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Level 2: Children Objects / Components Tree Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 sm:p-4 bg-[var(--card)] space-y-2 border-t border-[var(--border)]/40"
                    >
                      {node.matchingChildren.length === 0 ? (
                        <div className="py-4 text-center text-xs text-[var(--muted)] italic">
                          {isVi ? "Không có đối tượng nào trong trang này." : "No components found."}
                        </div>
                      ) : (
                        node.matchingChildren.map((item, itemIdx) => {
                          const isItemFirst = itemIdx === 0;
                          const isItemLast = itemIdx === node.matchingChildren.length - 1;
                          const isCopied = copiedId === item.id;

                          return (
                            <div
                              key={item.id}
                              draggable={!treeSearch}
                              onDragStart={() => setDraggedSectionInfo({ pageId, itemIdx })}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => {
                                if (
                                  draggedSectionInfo &&
                                  draggedSectionInfo.pageId === pageId &&
                                  draggedSectionInfo.itemIdx !== itemIdx
                                ) {
                                  playUiSound("click");
                                  const currentIds = node.matchingChildren.map((i) => i.id);
                                  const [movedId] = currentIds.splice(draggedSectionInfo.itemIdx, 1);
                                  currentIds.splice(itemIdx, 0, movedId);

                                  const newMap = { ...sectionsOrderMap, [pageId]: currentIds };
                                  setSectionsOrderMap(newMap);
                                  localStorage.setItem("app_tree_sections_order", JSON.stringify(newMap));
                                  setDraggedSectionInfo(null);
                                  showToast(isVi ? "Đã cập nhật thứ tự đối tượng trong trang" : "Reordered component");
                                }
                              }}
                              onDragEnd={() => setDraggedSectionInfo(null)}
                              className={cn(
                                "group relative flex items-center justify-between p-3 rounded-xl border transition-all duration-200",
                                "bg-[var(--surface)] hover:bg-[var(--card)] hover:border-indigo-500/40",
                                isCopied ? "border-emerald-500 bg-emerald-500/5" : "border-[var(--border)]",
                              )}
                            >
                              {/* Item Identity */}
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                {/* Drag Handle */}
                                <div
                                  className={cn(
                                    "p-1 rounded text-[var(--muted)] transition-colors",
                                    !treeSearch ? "cursor-grab active:cursor-grabbing hover:text-[var(--text-primary)]" : "opacity-30",
                                  )}
                                  title={isVi ? "Kéo thả để sắp xếp vị trí" : "Drag to reorder"}
                                >
                                  <GripVertical size={14} />
                                </div>

                                {/* Order & Type Icon */}
                                <span className="text-[10px] font-mono font-bold text-[var(--muted)] w-4 text-center">
                                  {itemIdx + 1}
                                </span>

                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                                  <Box size={14} />
                                </div>

                                {/* Name & Details */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-black text-[var(--text-primary)] truncate">
                                      {isVi ? item.nameVi : item.nameEn}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                      {item.typeLabelVi || item.type}
                                    </span>
                                  </div>

                                  {/* Component ID / DOM Selector */}
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[11px] font-mono text-[var(--muted)] truncate max-w-[280px] sm:max-w-md">
                                      {item.selector}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Actions: Copy ID & Reorder buttons */}
                              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                {/* Copy Component Selector Button */}
                                <button
                                  type="button"
                                  onClick={() => handleCopy(item.selector, item.id)}
                                  className={cn(
                                    "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer",
                                    isCopied
                                      ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                                      : "bg-[var(--card)] border-[var(--border)] text-[var(--text-secondary)] hover:text-indigo-600 hover:border-indigo-500",
                                  )}
                                  title={isVi ? "Sao chép mã định danh / Selector" : "Copy Component ID / Selector"}
                                >
                                  {isCopied ? <Check size={12} /> : <Copy size={12} />}
                                  <span>{isCopied ? (isVi ? "Đã chép" : "Copied") : (isVi ? "Chép ID" : "Copy ID")}</span>
                                </button>

                                {/* Child Up/Down Reorder */}
                                <div className="flex items-center rounded-lg bg-[var(--card)] border border-[var(--border)] p-0.5">
                                  <button
                                    type="button"
                                    disabled={isItemFirst || !!treeSearch}
                                    onClick={() => moveSection(pageId, itemIdx, "up", node.matchingChildren)}
                                    className="p-1 rounded text-[var(--text-secondary)] hover:text-indigo-600 disabled:opacity-20 cursor-pointer"
                                    title={isVi ? "Di chuyển lên" : "Move up"}
                                  >
                                    <ArrowUp size={12} />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isItemLast || !!treeSearch}
                                    onClick={() => moveSection(pageId, itemIdx, "down", node.matchingChildren)}
                                    className="p-1 rounded text-[var(--text-secondary)] hover:text-indigo-600 disabled:opacity-20 cursor-pointer"
                                    title={isVi ? "Di chuyển xuống" : "Move down"}
                                  >
                                    <ArrowDown size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Toast Notice */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white text-xs font-bold shadow-2xl backdrop-blur-xl flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WebsiteTreeManager;
