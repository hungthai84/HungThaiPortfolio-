import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Palette,
  Plus,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Search,
  Download,
  RotateCcw,
  Sparkles,
  Upload,
  Link,
  Image as ImageIcon,
  ExternalLink,
  Layers,
  X,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Maximize2,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import {
  PRESET_WALLPAPERS,
  QUICK_PRESET_TEMPLATES,
  WallpaperOption,
} from "../data/wallpapersData";

export function Wallpapers() {
  const { language } = useLanguage();

  // Active Wallpaper State
  const [selectedWallpaperId, setSelectedWallpaperId] = useState<string>(() => {
    return localStorage.getItem("app_selected_wallpaper") || "fluid-mesh";
  });

  // Wallpaper Visibility State
  const [isWallpaperHidden, setIsWallpaperHidden] = useState<boolean>(() => {
    return localStorage.getItem("app_wallpaper_hidden") === "true";
  });

  // Custom Wallpapers State
  const [customWallpapers, setCustomWallpapers] = useState<WallpaperOption[]>(
    () => {
      try {
        const saved = localStorage.getItem("app_custom_wallpapers");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    },
  );

  // Deleted/Hidden Default Wallpapers IDs
  const [deletedWallpaperIds, setDeletedWallpaperIds] = useState<string[]>(
    () => {
      try {
        const saved = localStorage.getItem("app_deleted_wallpaper_ids");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    },
  );

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Add Wallpaper Dialog State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<"url" | "file" | "presets">("url");
  const [inputUrl, setInputUrl] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPreviewUrl, setInputPreviewUrl] = useState("");
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fullscreen Preview Lightbox
  const [previewModalWp, setPreviewModalWp] = useState<WallpaperOption | null>(
    null,
  );

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync state on external events
  useEffect(() => {
    const handleWpChanged = (e: Event) => {
      const custom = e as CustomEvent<{ wallpaperId: string }>;
      if (custom.detail?.wallpaperId) {
        setSelectedWallpaperId(custom.detail.wallpaperId);
      }
    };
    const handleToggle = () => {
      setIsWallpaperHidden((prev) => !prev);
    };
    const handleSetHidden = (e: Event) => {
      const custom = e as CustomEvent<{ hidden: boolean }>;
      if (custom.detail && typeof custom.detail.hidden === "boolean") {
        setIsWallpaperHidden(custom.detail.hidden);
      }
    };

    window.addEventListener("wallpaperChanged", handleWpChanged);
    window.addEventListener("app-toggle-wallpaper-visibility", handleToggle);
    window.addEventListener(
      "app-set-wallpaper-hidden",
      handleSetHidden as EventListener,
    );

    return () => {
      window.removeEventListener("wallpaperChanged", handleWpChanged);
      window.removeEventListener("app-toggle-wallpaper-visibility", handleToggle);
      window.removeEventListener(
        "app-set-wallpaper-hidden",
        handleSetHidden as EventListener,
      );
    };
  }, []);

  // Compute all available wallpapers
  const allWallpapers = useMemo(() => {
    const activePresets = PRESET_WALLPAPERS.filter(
      (wp) => !deletedWallpaperIds.includes(wp.id),
    );
    return [...customWallpapers, ...activePresets];
  }, [customWallpapers, deletedWallpaperIds]);

  // Filter and Search wallpapers
  const filteredWallpapers = useMemo(() => {
    return allWallpapers.filter((wp) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = wp.name.toLowerCase().includes(query);
        const matchesTag = wp.tags?.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesTag;
      }

      return true;
    });
  }, [allWallpapers, searchQuery]);

  // Apply Wallpaper Handler
  const handleApplyWallpaper = (wp: WallpaperOption) => {
    playUiSound("click");
    setSelectedWallpaperId(wp.id);
    localStorage.setItem("app_selected_wallpaper", wp.id);
    localStorage.setItem("app_wallpaper", wp.id);

    if (wp.url) {
      localStorage.setItem("app_custom_wallpaper_url", wp.url);
    }
    localStorage.setItem("app_custom_wallpaper_name", wp.name);

    // If wallpaper was hidden, automatically unhide it when user selects a new one
    if (isWallpaperHidden) {
      setIsWallpaperHidden(false);
      localStorage.setItem("app_wallpaper_hidden", "false");
      window.dispatchEvent(
        new CustomEvent("app-set-wallpaper-hidden", {
          detail: { hidden: false },
        }),
      );
    }

    window.dispatchEvent(
      new CustomEvent("wallpaperChanged", {
        detail: {
          wallpaperId: wp.id,
          url: wp.url,
          name: wp.name,
        },
      }),
    );

    showToast(
      language === "vi"
        ? `Đã áp dụng hình nền "${wp.name}" thành công!`
        : `Applied wallpaper "${wp.name}" successfully!`,
    );
  };

  // Delete Wallpaper Handler
  const handleDeleteWallpaper = (id: string, name: string) => {
    playUiSound("reset");
    const isDefault = PRESET_WALLPAPERS.some((wp) => wp.id === id);

    if (isDefault) {
      const next = [...deletedWallpaperIds, id];
      setDeletedWallpaperIds(next);
      localStorage.setItem("app_deleted_wallpaper_ids", JSON.stringify(next));
    } else {
      const updated = customWallpapers.filter((wp) => wp.id !== id);
      setCustomWallpapers(updated);
      localStorage.setItem("app_custom_wallpapers", JSON.stringify(updated));
    }

    // If deleted wallpaper was active, reset to default
    if (selectedWallpaperId === id) {
      setSelectedWallpaperId("fluid-mesh");
      localStorage.setItem("app_selected_wallpaper", "fluid-mesh");
      localStorage.setItem("app_wallpaper", "fluid-mesh");
      window.dispatchEvent(
        new CustomEvent("wallpaperChanged", {
          detail: { wallpaperId: "fluid-mesh" },
        }),
      );
    }

    showToast(
      language === "vi"
        ? `Đã xóa hình nền "${name}"!`
        : `Deleted wallpaper "${name}"!`,
    );
  };

  // Restore Default Wallpapers Handler
  const handleRestoreDefaults = () => {
    playUiSound("click");
    setDeletedWallpaperIds([]);
    localStorage.removeItem("app_deleted_wallpaper_ids");
    showToast(
      language === "vi"
        ? "Đã khôi phục toàn bộ hình nền mặc định!"
        : "Restored all default wallpapers!",
    );
  };

  // Toggle Visibility Handler
  const handleToggleVisibility = () => {
    playUiSound("toggle");
    const nextState = !isWallpaperHidden;
    setIsWallpaperHidden(nextState);
    localStorage.setItem("app_wallpaper_hidden", String(nextState));
    window.dispatchEvent(
      new CustomEvent("app-set-wallpaper-hidden", {
        detail: { hidden: nextState },
      }),
    );
    showToast(
      language === "vi"
        ? nextState
          ? "Đã ẩn hình nền (Chế độ Fluent đơn sắc)"
          : "Đã hiện lại hình nền"
        : nextState
          ? "Wallpaper hidden (Plain Mica mode)"
          : "Wallpaper shown",
    );
  };

  // Handle File Upload
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setFormError(
        language === "vi"
          ? "Vui lòng chọn tệp hợp lệ (Ảnh hoặc Video)"
          : "Please select a valid file (Image or Video)",
      );
      return;
    }

    // Size limit check (20MB)
    if (file.size > 20 * 1024 * 1024) {
      setFormError(
        language === "vi"
          ? "Kích thước tệp quá lớn (> 20MB). Vui lòng chọn tệp nhỏ hơn."
          : "File size too large (> 20MB). Please select a smaller file.",
      );
      return;
    }

    setFormError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedBase64(result);
      setInputPreviewUrl(result);
      if (!inputName) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "");
        setInputName(cleanName);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Submit New Wallpaper
  const handleAddWallpaper = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = addMode === "file" ? uploadedBase64 : inputUrl.trim();

    if (!finalUrl) {
      setFormError(
        language === "vi"
          ? "Vui lòng nhập đường dẫn URL hoặc tải lên tệp ảnh"
          : "Please enter an image URL or upload an image file",
      );
      return;
    }

    const title =
      inputName.trim() ||
      (language === "vi"
        ? `Hình nền #${customWallpapers.length + 1}`
        : `Wallpaper #${customWallpapers.length + 1}`);

    const isVideo = finalUrl.startsWith("data:video/") || !!finalUrl.match(/\.(mp4|webm|ogg)$/i);

    const newWallpaper: WallpaperOption = {
      id: `custom-wp-${Date.now()}`,
      name: title,
      url: finalUrl,
      previewUrl: finalUrl,
      type: isVideo ? "video" : "image",
      category: "custom",
      isCustom: true,
      tags: ["custom"],
    };

    const updated = [newWallpaper, ...customWallpapers];
    setCustomWallpapers(updated);
    localStorage.setItem("app_custom_wallpapers", JSON.stringify(updated));

    // Auto apply new wallpaper
    handleApplyWallpaper(newWallpaper);

    // Reset Form and close modal
    setInputUrl("");
    setInputName("");
    setInputPreviewUrl("");
    setUploadedBase64(null);
    setFormError(null);
    setIsAddModalOpen(false);

    showToast(
      language === "vi"
        ? `Đã thêm hình nền "${title}" vào bộ sưu tập!`
        : `Added wallpaper "${title}" to collection!`,
    );
  };

  // Quick Preset Click
  const handlePickTemplate = (template: {
    name: string;
    url: string;
    category: "minimal" | "nature" | "abstract" | "tech" | "gradient";
    tags: string[];
  }) => {
    const newWallpaper: WallpaperOption = {
      id: `custom-wp-${Date.now()}`,
      name: template.name,
      url: template.url,
      previewUrl: template.url,
      type: "image",
      category: template.category,
      isCustom: true,
      tags: template.tags,
    };

    const updated = [newWallpaper, ...customWallpapers];
    setCustomWallpapers(updated);
    localStorage.setItem("app_custom_wallpapers", JSON.stringify(updated));
    handleApplyWallpaper(newWallpaper);
    setIsAddModalOpen(false);
  };

  // Permanent Save / Export Wallpaper Links to Persistent Storage
  const handlePermanentSave = () => {
    playUiSound("success");
    const permanentData = {
      version: 1.0,
      savedAt: new Date().toISOString(),
      selectedWallpaperId,
      isWallpaperHidden,
      customWallpapers,
      deletedWallpaperIds,
      allLinks: allWallpapers.map((wp) => ({
        id: wp.id,
        name: wp.name,
        url: wp.url,
        previewUrl: wp.previewUrl,
        category: wp.category,
        isCustom: wp.isCustom,
      })),
    };

    // Save into persistent localStorage backup
    localStorage.setItem(
      "app_wallpaper_permanent_storage",
      JSON.stringify(permanentData),
    );

    // Trigger file download as permanent backup data
    const blob = new Blob([JSON.stringify(permanentData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wallpaper-persistent-links-backup-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      language === "vi"
        ? "Đã lưu lâu dài và xuất toàn bộ liên kết hình nền thành dữ liệu lưu trữ thành công!"
        : "Successfully saved and exported all wallpaper links into persistent storage data!",
    );
  };

  const categories = [
    { id: "all", labelVi: "Tất cả", labelEn: "All" },
    { id: "custom", labelVi: "Tùy chỉnh đã lưu", labelEn: "Custom Saved" },
    { id: "preset", labelVi: "Mặc định", labelEn: "Presets" },
    { id: "minimal", labelVi: "Tối giản / Mica", labelEn: "Minimal & Mica" },
    { id: "nature", labelVi: "Phong cảnh / Thiên nhiên", labelEn: "Nature" },
    { id: "abstract", labelVi: "Trừu tượng / Pastel", labelEn: "Abstract" },
    { id: "tech", labelVi: "Công nghệ / Vũ trụ", labelEn: "Tech & Cosmic" },
    { id: "gradient", labelVi: "Gradient chuyển màu", labelEn: "Gradients" },
  ];

  return (
    <PageLayout
      id="wallpapers-main-card"
      rootClassName="main-info-card w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border border-[var(--border)] relative flex flex-1 flex-col !bg-white/50 transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="wallpapers"
      pageName="Wallpapers Gallery Card"
      title={
        language === "vi"
          ? "Kho Hình Nền & Không Gian Trải Nghiệm"
          : "Wallpapers & Visual Canvas Gallery"
      }
      subtitle={
        language === "vi"
          ? "Khám phá, tùy chỉnh, tải ảnh lên và quản lý không gian làm việc Fluent UI."
          : "Explore, customize, upload images and manage your Fluent UI workspace."
      }
      icon={Palette}
      titleClassName="text-cyan-600 dark:text-cyan-400"
      headerActions={
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Visibility Button */}
          <button
            type="button"
            onClick={handleToggleVisibility}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all duration-200",
              isWallpaperHidden
                ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--border)]",
            )}
            title={
              language === "vi"
                ? isWallpaperHidden
                  ? "Hiện lại hình nền (Giữ nguyên lựa chọn)"
                  : "Ẩn hình nền (Chế độ Fluent đơn sắc)"
                : isWallpaperHidden
                  ? "Show Wallpaper"
                  : "Hide Wallpaper"
            }
          >
            {isWallpaperHidden ? (
              <>
                <EyeOff size={14} className="text-amber-500" />
                <span>{language === "vi" ? "Đang ẩn nền" : "Wall Hidden"}</span>
              </>
            ) : (
              <>
                <Eye size={14} className="text-cyan-500" />
                <span>{language === "vi" ? "Đang hiện nền" : "Wall Active"}</span>
              </>
            )}
          </button>

          {/* Restore Defaults Button (if any default was deleted) */}
          {deletedWallpaperIds.length > 0 && (
            <button
              type="button"
              onClick={handleRestoreDefaults}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-600 transition-all hover:bg-rose-500/20 dark:text-rose-400"
              title={
                language === "vi"
                  ? "Khôi phục các hình nền mặc định đã xóa"
                  : "Restore deleted default wallpapers"
              }
            >
              <RotateCcw size={14} />
              <span>
                {language === "vi"
                  ? `Khôi phục (${deletedWallpaperIds.length})`
                  : `Restore (${deletedWallpaperIds.length})`}
              </span>
            </button>
          )}

          {/* Permanent Save Button */}
          <button
            type="button"
            onClick={handlePermanentSave}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-600 transition-all hover:bg-emerald-500/20 dark:text-emerald-400 shadow-sm"
            title={
              language === "vi"
                ? "Lưu lâu dài: Xuất toàn bộ liên kết hình nền thành dữ liệu lưu trữ"
                : "Permanent Save: Export all wallpaper links into persistent storage"
            }
          >
            <Download size={14} className="text-emerald-500" />
            <span>
              {language === "vi" ? "Lưu Lâu Dài" : "Permanent Save"}
            </span>
          </button>

          {/* Add Wallpaper Toggle Button */}
          <button
            type="button"
            id="open-add-wallpaper-btn"
            onClick={() => {
              playUiSound("click");
              setIsAddModalOpen((prev) => !prev);
            }}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all shadow-md active:scale-95",
              isAddModalOpen
                ? "bg-rose-500 hover:bg-rose-600 text-white"
                : "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:scale-105 text-white"
            )}
          >
            {isAddModalOpen ? <X size={15} /> : <Plus size={15} />}
            <span>
              {isAddModalOpen
                ? (language === "vi" ? "Đóng Bảng Thêm" : "Close Panel")
                : (language === "vi" ? "Thêm Hình Nền" : "Add Wallpaper")}
            </span>
          </button>
        </div>
      }
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-[200] flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-white/90 dark:bg-slate-900/90 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white shadow-2xl backdrop-blur-xl"
          >
            <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INLINE ADD WALLPAPER PANEL (Appears directly below header instead of popup) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full max-w-[1240px] mx-auto overflow-hidden mb-6"
          >
            <div className="relative flex flex-col rounded-2xl border-2 border-cyan-500/40 bg-white/95 dark:bg-slate-900/95 shadow-xl backdrop-blur-2xl p-4 sm:p-6">
              {/* Header of the Inline Panel */}
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-md">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[var(--text-primary)] sm:text-base">
                      {language === "vi"
                        ? "Thêm Hình Nền Mới Vào Bộ Sưu Tập"
                        : "Add New Custom Wallpaper"}
                    </h3>
                    <p className="text-[11px] text-[var(--muted)]">
                      {language === "vi"
                        ? "Dán đường dẫn URL, tải tệp ảnh từ máy tính hoặc chọn mẫu 4K tuyển chọn sẵn."
                        : "Paste an image URL, upload from device or choose a curated 4K preset."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl p-1.5 text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mode Selection Tabs */}
              <div className="flex border-b border-[var(--border)] bg-[var(--bg)] px-2 pt-2 rounded-t-xl mt-3">
                <button
                  type="button"
                  onClick={() => setAddMode("url")}
                  className={cn(
                    "flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer",
                    addMode === "url"
                      ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                      : "border-transparent text-[var(--muted)] hover:text-[var(--text-primary)]",
                  )}
                >
                  <Link size={14} />
                  <span>{language === "vi" ? "Đường Dẫn URL" : "Image URL"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAddMode("file")}
                  className={cn(
                    "flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer",
                    addMode === "file"
                      ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                      : "border-transparent text-[var(--muted)] hover:text-[var(--text-primary)]",
                  )}
                >
                  <Upload size={14} />
                  <span>
                    {language === "vi" ? "Tải Từ Thiết Bị" : "Upload File"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setAddMode("presets")}
                  className={cn(
                    "flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer",
                    addMode === "presets"
                      ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                      : "border-transparent text-[var(--muted)] hover:text-[var(--text-primary)]",
                  )}
                >
                  <Sparkles size={14} />
                  <span>{language === "vi" ? "Mẫu Nhanh 4K" : "4K Templates"}</span>
                </button>
              </div>

              {/* Panel Body */}
              <div className="pt-4">
                {formError && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-bold text-rose-600 dark:text-rose-400">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {addMode === "presets" ? (
                  <div className="space-y-4">
                    <p className="text-xs text-[var(--muted)]">
                      {language === "vi"
                        ? "Chọn nhanh một trong các hình nền 4K siêu nét được tuyển chọn sẵn:"
                        : "Pick a high-resolution 4K wallpaper preset to add with one click:"}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {QUICK_PRESET_TEMPLATES.map((tmpl) => (
                        <div
                          key={tmpl.name}
                          onClick={() => handlePickTemplate(tmpl)}
                          className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] transition-all hover:border-cyan-500 hover:shadow-md"
                        >
                          <img
                            src={tmpl.url}
                            alt={tmpl.name}
                            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="p-2.5">
                            <p className="line-clamp-1 text-xs font-black text-[var(--text-primary)]">
                              {tmpl.name}
                            </p>
                            <span className="mt-0.5 inline-block text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
                              + {language === "vi" ? "Thêm & Áp dụng" : "Add & Apply"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAddWallpaper} className="space-y-4">
                    {/* URL Input Mode */}
                    {addMode === "url" && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-[var(--text-primary)]">
                          {language === "vi"
                            ? "Đường dẫn ảnh (URL Image)"
                            : "Image URL"}
                        </label>
                        <input
                          type="url"
                          required
                          value={inputUrl}
                          onChange={(e) => {
                            setInputUrl(e.target.value);
                            setInputPreviewUrl(e.target.value);
                          }}
                          placeholder="https://images.unsplash.com/... hoặc https://i.ibb.co/..."
                          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-xs font-medium text-[var(--text-primary)] placeholder-[var(--muted)] focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    )}

                    {/* File Upload Mode */}
                    {addMode === "file" && (
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-[var(--text-primary)]">
                          {language === "vi"
                            ? "Tải ảnh/video từ máy tính"
                            : "Upload image/video"}
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*,video/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files?.[0]) {
                              handleFileUpload(e.dataTransfer.files[0]);
                            }
                          }}
                          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--bg)] p-6 text-center transition-colors hover:border-cyan-500 hover:bg-cyan-500/5"
                        >
                          <Upload size={28} className="text-cyan-500 mb-2" />
                          <p className="text-xs font-black text-[var(--text-primary)]">
                            {language === "vi"
                              ? "Kéo thả ảnh vào đây hoặc nhấp để chọn tệp"
                              : "Drag & drop image here or click to browse"}
                          </p>
                          <p className="mt-1 text-[11px] text-[var(--muted)]">
                            PNG, JPG, WEBP, GIF (Tối đa 10MB)
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Live Preview Box */}
                    {inputPreviewUrl && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-bold text-[var(--muted)]">
                          {language === "vi" ? "Xem trước:" : "Preview:"}
                        </span>
                        <div className="aspect-video max-w-sm overflow-hidden rounded-xl border border-[var(--border)] bg-slate-950">
                          {inputPreviewUrl.startsWith("data:video/") || !!inputPreviewUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="h-full w-full object-cover"
                              onError={() => {
                                setFormError(
                                  language === "vi"
                                    ? "Không thể tải được video từ đường dẫn này."
                                    : "Could not load video from this URL."
                                );
                              }}
                            >
                              <source src={inputPreviewUrl} />
                            </video>
                          ) : (
                            <img
                              src={inputPreviewUrl}
                              alt="Preview"
                              className="h-full w-full object-cover"
                              onError={() => {
                                setFormError(
                                  language === "vi"
                                    ? "Không thể tải được ảnh từ đường dẫn này. Vui lòng kiểm tra lại URL."
                                    : "Could not load image from this URL. Please verify the link.",
                                );
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] pt-4">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--border)] cursor-pointer"
                      >
                        {language === "vi" ? "Hủy" : "Cancel"}
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 text-xs font-black text-white shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Plus size={15} />
                        <span>
                          {language === "vi" ? "Lưu & Áp Dụng" : "Save & Apply"}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm backdrop-blur-xl">
        {/* TOP CONTROLS & SEARCH BAR */}
        <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 p-4 shadow-sm backdrop-blur-md">
          <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--muted)]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "vi"
                    ? "Tìm kiếm hình nền theo tên, thẻ hoặc thể loại..."
                    : "Search wallpapers by name, tag or category..."
                }
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pr-4 pl-10 text-xs font-semibold text-[var(--text-primary)] placeholder-[var(--muted)] transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text-primary)]"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex shrink-0 items-center gap-2 text-xs font-bold text-[var(--muted)]">
              <span className="rounded-lg bg-[var(--border)] px-2.5 py-1 text-[var(--text-secondary)]">
                {language === "vi"
                  ? `Hiển thị: ${filteredWallpapers.length} / ${allWallpapers.length}`
                  : `Showing: ${filteredWallpapers.length} / ${allWallpapers.length}`}
              </span>
              {customWallpapers.length > 0 && (
                <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 font-extrabold text-cyan-600 dark:text-cyan-400">
                  {language === "vi"
                    ? `${customWallpapers.length} Tùy chỉnh`
                    : `${customWallpapers.length} Custom`}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* WALLPAPERS GRID */}
        {filteredWallpapers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-12 text-center">
            <ImageIcon size={44} className="text-[var(--muted)] mb-3 opacity-40" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">
              {language === "vi"
                ? "Không tìm thấy hình nền nào phù hợp"
                : "No wallpapers found matching query"}
            </h3>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {language === "vi"
                ? "Hãy thử tìm kiếm với từ khóa khác hoặc nhấn 'Thêm Hình Nền' để tải ảnh của riêng bạn."
                : "Try searching with a different keyword or click 'Add Wallpaper' to upload your own."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs font-bold text-cyan-600 hover:bg-[var(--border)] dark:text-cyan-400"
            >
              {language === "vi" ? "Đặt lại bộ lọc" : "Reset Filter"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredWallpapers.map((wp) => {
              const isSelected = selectedWallpaperId === wp.id;
              const isCustom =
                wp.isCustom || customWallpapers.some((c) => c.id === wp.id);

              return (
                <motion.div
                  key={wp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:z-[999] hover:scale-[1.03] hover:shadow-2xl",
                    isSelected
                      ? "border-cyan-500 ring-2 ring-cyan-500/30 bg-cyan-500/5 shadow-lg shadow-cyan-500/10"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-cyan-500/40 hover:shadow-md",
                  )}
                >
                  {/* Image Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-white/50 dark:bg-slate-900/50">
                    {wp.type === "css" || !wp.previewUrl ? (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">
                        <div className="flex flex-col items-center gap-1 text-[var(--muted)]">
                          <Layers size={24} />
                          <span className="text-[11px] font-bold">
                            {language === "vi" ? "Fluent Mica Đơn Sắc" : "Plain Mica Canvas"}
                          </span>
                        </div>
                      </div>
                    ) : wp.type === "video" ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      >
                        <source src={wp.previewUrl || wp.url} />
                      </video>
                    ) : (
                      <img
                        src={wp.previewUrl}
                        alt={wp.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Gradient Overlay on Hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Active Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-lg bg-cyan-600 px-2.5 py-1 text-[10px] font-black text-white shadow-md backdrop-blur-md">
                        <Check size={12} strokeWidth={3} />
                        <span>{language === "vi" ? "ĐANG DÙNG" : "ACTIVE"}</span>
                      </div>
                    )}

                    {/* Custom Badge */}
                    {isCustom && !isSelected && (
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-lg bg-purple-600/90 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-sm backdrop-blur-md">
                        <Sparkles size={11} />
                        <span>{language === "vi" ? "Tùy chỉnh" : "Custom"}</span>
                      </div>
                    )}

                    {/* Quick Hover Action Tools */}
                    <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {wp.url && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewModalWp(wp);
                          }}
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-black/60 text-white shadow-sm backdrop-blur-md transition-transform hover:scale-110 hover:bg-black/80"
                          title={
                            language === "vi"
                              ? "Xem trước toàn màn hình"
                              : "Fullscreen preview"
                          }
                        >
                          <Maximize2 size={13} />
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteWallpaper(wp.id, wp.name);
                        }}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-rose-600/80 text-white shadow-sm backdrop-blur-md transition-transform hover:scale-110 hover:bg-rose-600"
                        title={
                          language === "vi"
                            ? isCustom
                              ? "Xóa hình nền này"
                              : "Ẩn hình nền mặc định này"
                            : "Delete wallpaper"
                        }
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-3.5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="line-clamp-1 text-xs font-black text-[var(--text-primary)] sm:text-sm">
                          {wp.name}
                        </h4>
                        {wp.type === "image" && (
                          <span className="shrink-0 rounded bg-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[var(--muted)]">
                            4K UHD
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-3.5 flex items-center gap-2 border-t border-[var(--border)] pt-3">
                      {isSelected ? (
                        <button
                          type="button"
                          disabled
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-cyan-600/15 py-1.5 text-xs font-black text-cyan-600 dark:text-cyan-400"
                        >
                          <Check size={14} />
                          <span>{language === "vi" ? "Đã áp dụng" : "Selected"}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApplyWallpaper(wp)}
                          className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-1.5 text-xs font-black text-white shadow-sm transition-all hover:scale-[1.02] active:scale-95"
                        >
                          <span>{language === "vi" ? "Áp Dụng" : "Apply"}</span>
                        </button>
                      )}

                      {wp.url && (
                        <a
                          href={wp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={wp.name}
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                          title={
                            language === "vi"
                              ? "Mở ảnh gốc trong tab mới / Tải về"
                              : "Open high-res in new tab"
                          }
                        >
                          <Download size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX PREVIEW MODAL */}
      <AnimatePresence>
        {previewModalWp && (
          <div className="absolute inset-0 z-[99999] flex items-center justify-center p-3 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewModalWp(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 flex max-h-[90vh] w-[95vw] max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-slate-950 shadow-2xl"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                {previewModalWp.type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={previewModalWp.previewUrl}
                    className="h-full w-full object-cover"
                  >
                    <source
                      src={previewModalWp.url || previewModalWp.previewUrl}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <img
                    src={previewModalWp.url || previewModalWp.previewUrl}
                    alt={previewModalWp.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex items-center justify-between bg-slate-900/90 px-6 py-4 text-white backdrop-blur-md">
                <div>
                  <h3 className="text-base font-black">{previewModalWp.name}</h3>
                  <p className="text-xs text-slate-400">
                    {previewModalWp.category} &bull; 4K Ultra High Definition
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleApplyWallpaper(previewModalWp);
                      setPreviewModalWp(null);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-black text-white shadow-md hover:scale-105"
                  >
                    <Check size={14} />
                    <span>{language === "vi" ? "Áp Dụng Ngay" : "Apply Now"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewModalWp(null)}
                    className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
