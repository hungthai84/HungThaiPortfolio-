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
  Save,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { ThemeComparison } from "../components/ThemeComparison";
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

  // Delayed apply states and refs
  const applyTimeoutRef = useRef<any>(null);
  const countdownIntervalRef = useRef<any>(null);
  const [applyingWallpaper, setApplyingWallpaper] = useState<{ id: string; name: string; secondsLeft: number } | null>(null);

  // Modal / Add Wallpaper Dialog State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<"url" | "file" | "presets">("url");
  const [inputUrl, setInputUrl] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPreviewUrl, setInputPreviewUrl] = useState("");
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonImportInputRef = useRef<HTMLInputElement>(null);

  // Fullscreen Preview Lightbox
  const [previewModalWp, setPreviewModalWp] = useState<WallpaperOption | null>(
    null,
  );

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme Mode State (For Giao Diện Sáng / Tối / Hệ Thống)
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(() => {
    return (localStorage.getItem("app_theme_mode") as any) || "system";
  });

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark" | "system">;
      if (customEvent.detail) {
        setThemeMode(customEvent.detail);
      }
    };
    window.addEventListener("app-theme-mode-synced", handleSync as EventListener);
    return () => {
      window.removeEventListener("app-theme-mode-synced", handleSync as EventListener);
    };
  }, []);

  const handleChangeThemeMode = (mode: "light" | "dark" | "system") => {
    playUiSound("click");
    setThemeMode(mode);
    window.dispatchEvent(new CustomEvent("app-set-theme-mode", { detail: mode }));
    showToast(
      language === "vi"
        ? `Đã chuyển đổi thành công sang giao diện ${
            mode === "light" ? "Sáng tinh tế" : mode === "dark" ? "Tối cao cấp" : "Đồng bộ hệ thống"
          }!`
        : `Successfully switched to ${
            mode === "light" ? "Light theme" : mode === "dark" ? "Dark theme" : "System theme"
          }!`
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync state on external events
  useEffect(() => {
    const handleWpChanged = (e: Event) => {
      const custom = e as CustomEvent<{ wallpaperId?: string; id?: string }>;
      const targetId = custom.detail?.id || custom.detail?.wallpaperId;
      if (targetId) {
        setSelectedWallpaperId(targetId);
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
      if (applyTimeoutRef.current) clearTimeout(applyTimeoutRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
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
          id: wp.id,
          wallpaperId: wp.id,
          url: wp.url,
          customUrl: wp.url,
          name: wp.name,
          customName: wp.name,
          type: wp.type,
          previewUrl: wp.previewUrl,
        },
      }),
    );

    showToast(
      language === "vi"
        ? `Đã áp dụng hình nền "${wp.name}" thành công!`
        : `Applied wallpaper "${wp.name}" successfully!`,
    );
  };



  // Delayed Wallpaper Selection Handler (30 seconds)
  const handleSelectWallpaperDeferred = (wp: WallpaperOption) => {
    playUiSound("click");
    setSelectedWallpaperId(wp.id);

    // Clear any existing delayed apply timers
    if (applyTimeoutRef.current) clearTimeout(applyTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    showToast(
      language === "vi"
        ? `Đã lựa chọn "${wp.name}". Sẽ áp dụng sau 30 giây...`
        : `Selected "${wp.name}". Wallpaper will be applied in 30 seconds...`,
    );

    let timeLeft = 30;
    setApplyingWallpaper({
      id: wp.id,
      name: wp.name,
      secondsLeft: timeLeft,
    });

    countdownIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        setApplyingWallpaper(null);
      } else {
        setApplyingWallpaper({
          id: wp.id,
          name: wp.name,
          secondsLeft: timeLeft,
        });
      }
    }, 1000);

    applyTimeoutRef.current = setTimeout(() => {
      // Actually apply the wallpaper
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
    }, 30000);
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

  // Import JSON configuration and Custom Wallpapers back
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);

        let importedCustoms: WallpaperOption[] = [];
        let importedSelectedId = selectedWallpaperId;
        let importedHidden = isWallpaperHidden;
        let importedDeletedIds = deletedWallpaperIds;

        if (data && typeof data === "object") {
          if (Array.isArray(data)) {
            importedCustoms = data;
          } else {
            if (Array.isArray(data.customWallpapers)) {
              importedCustoms = data.customWallpapers;
            } else if (Array.isArray(data.allLinks)) {
              importedCustoms = data.allLinks.filter((wp: any) => wp.isCustom);
            }
            
            if (typeof data.selectedWallpaperId === "string") {
              importedSelectedId = data.selectedWallpaperId;
            }
            if (typeof data.isWallpaperHidden === "boolean") {
              importedHidden = data.isWallpaperHidden;
            }
            if (Array.isArray(data.deletedWallpaperIds)) {
              importedDeletedIds = data.deletedWallpaperIds;
            }
          }

          const validCustoms = importedCustoms.filter(
            (wp) => wp && typeof wp === "object" && wp.id && wp.url && wp.name
          );

          if (validCustoms.length === 0 && !data.selectedWallpaperId) {
            throw new Error(
              language === "vi"
                ? "Không tìm thấy dữ liệu hình nền hợp lệ trong tệp JSON."
                : "No valid wallpaper data found in JSON file."
            );
          }

          setCustomWallpapers(validCustoms);
          localStorage.setItem("app_custom_wallpapers", JSON.stringify(validCustoms));

          if (importedSelectedId) {
            setSelectedWallpaperId(importedSelectedId);
            localStorage.setItem("app_selected_wallpaper", importedSelectedId);
          }

          setIsWallpaperHidden(importedHidden);
          localStorage.setItem("app_wallpaper_hidden", String(importedHidden));

          setDeletedWallpaperIds(importedDeletedIds);
          localStorage.setItem("app_deleted_wallpaper_ids", JSON.stringify(importedDeletedIds));

          playUiSound("success");
          showToast(
            language === "vi"
              ? `Nhập thành công! Đã khôi phục ${validCustoms.length} hình nền.`
              : `Import successful! Restored ${validCustoms.length} wallpapers.`
          );
        } else {
          throw new Error(
            language === "vi"
              ? "Định dạng JSON không hợp lệ."
              : "Invalid JSON format."
          );
        }
      } catch (err: any) {
        playUiSound("reset");
        alert(
          language === "vi"
            ? `Lỗi khi nhập dữ liệu: ${err.message || "Định dạng JSON không đúng."}`
            : `Error importing data: ${err.message || "Incorrect JSON format."}`
        );
      }
    };
    reader.readAsText(file);
    e.target.value = "";
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
      rootClassName="w-full max-w-full m-0 relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
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

          {/* Hidden File Input for JSON Import */}
          <input
            ref={jsonImportInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />

          {/* Import JSON Button */}
          <button
            type="button"
            onClick={() => {
              playUiSound("click");
              jsonImportInputRef.current?.click();
            }}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold text-indigo-600 transition-all hover:bg-indigo-500/20 dark:text-indigo-400 shadow-sm"
            title={
              language === "vi"
                ? "Nhập JSON: Phục hồi hình nền đã lưu từ tệp JSON"
                : "Import JSON: Restore saved wallpapers from a JSON file"
            }
          >
            <Upload size={14} className="text-indigo-500" />
            <span>
              {language === "vi" ? "Nhập JSON" : "Import JSON"}
            </span>
          </button>

          {/* Permanent Save Button / Export JSON */}
          <button
            type="button"
            onClick={handlePermanentSave}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-600 transition-all hover:bg-emerald-500/20 dark:text-emerald-400 shadow-sm"
            title={
              language === "vi"
                ? "Xuất JSON: Lưu trữ & Tải toàn bộ hình nền hiện tại về máy tính"
                : "Export JSON: Save & download all current wallpapers to your computer"
            }
          >
            <Download size={14} className="text-emerald-500" />
            <span>
              {language === "vi" ? "Xuất JSON" : "Export JSON"}
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
                          className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-solid border-[var(--border)] bg-[var(--bg)] transition-all hover:border-cyan-500 hover:shadow-md"
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
                          className="w-full rounded-xl border-2 border-solid border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-xs font-medium text-[var(--text-primary)] placeholder-[var(--muted)] focus:border-cyan-500 focus:outline-none"
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
                        <div className="aspect-video max-w-sm overflow-hidden rounded-xl border-2 border-solid border-[var(--border)] bg-slate-950">
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
                        className="rounded-xl border-2 border-solid border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--border)] cursor-pointer"
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

      {/* THEME COMPARISON SPLIT-SCREEN PREVIEW */}
      <div className="relative mx-auto mb-5 w-full max-w-[1240px]">
        <ThemeComparison
          onApplyPreset={(preset) => {
            setSelectedWallpaperId(preset.wallpaperId);
            setThemeMode(preset.themeMode);
          }}
        />
      </div>

      {/* THEME SELECTION BLOCK (TRANG PHONG CÁCH THÊM GIAO DIỆN SÁNG) */}
      <div className="relative mx-auto mb-5 flex w-full max-w-[1240px] flex-col gap-4 rounded-2xl border border-slate-200/85 dark:border-slate-800 bg-white/70 dark:bg-slate-900/75 p-5 backdrop-blur-[24px] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Palette size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white sm:text-base">
              {language === "vi" ? "Chủ Đề Giao Diện Hệ Thống (App Theme)" : "System Interface Theme"}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {language === "vi" 
                ? "Tùy biến nhanh giữa giao diện sáng tinh tế, tối cao cấp hoặc tự động đồng bộ theo cấu hình thiết bị."
                : "Quickly customize your experience with Light mode, premium Dark mode, or automatic System theme."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* LIGHT THEME CARD */}
          <button
            type="button"
            onClick={() => handleChangeThemeMode("light")}
            className={cn(
              "group relative flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-md cursor-pointer",
              themeMode === "light"
                ? "border-cyan-500 bg-cyan-500/5 ring-1 ring-cyan-500/30"
                : "border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 hover:border-cyan-500/30"
            )}
          >
            <div className="flex w-full items-center justify-between mb-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                themeMode === "light" ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-amber-500"
              )}>
                <Sun size={16} />
              </div>
              {themeMode === "light" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-white">
                  <Check size={12} className="stroke-[3]" />
                </span>
              )}
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              {language === "vi" ? "Giao Diện Sáng" : "Light Theme"}
            </span>
            <span className="mt-1 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
              {language === "vi" 
                ? "Tone sáng ngà & xám slate dịu mắt, tối ưu hóa độ sắc nét và độ tương phản ban ngày."
                : "Gentle ivory & slate tones, optimized for daylight clarity and low reflection."}
            </span>
            <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* DARK THEME CARD */}
          <button
            type="button"
            onClick={() => handleChangeThemeMode("dark")}
            className={cn(
              "group relative flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-md cursor-pointer",
              themeMode === "dark"
                ? "border-cyan-500 bg-cyan-500/5 ring-1 ring-cyan-500/30"
                : "border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 hover:border-cyan-500/30"
            )}
          >
            <div className="flex w-full items-center justify-between mb-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                themeMode === "dark" ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-indigo-400"
              )}>
                <Moon size={16} />
              </div>
              {themeMode === "dark" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-white">
                  <Check size={12} className="stroke-[3]" />
                </span>
              )}
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              {language === "vi" ? "Giao Diện Tối" : "Dark Theme"}
            </span>
            <span className="mt-1 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
              {language === "vi"
                ? "Mica đen huyền bí chống mỏi mắt ban đêm, tăng chiều sâu và độ sống động của màu sắc."
                : "Mystic black mica prevents night eye strain, enhancing color depth and vividness."}
            </span>
            <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* SYSTEM AUTO CARD */}
          <button
            type="button"
            onClick={() => handleChangeThemeMode("system")}
            className={cn(
              "group relative flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-md cursor-pointer",
              themeMode === "system"
                ? "border-cyan-500 bg-cyan-500/5 ring-1 ring-cyan-500/30"
                : "border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 hover:border-cyan-500/30"
            )}
          >
            <div className="flex w-full items-center justify-between mb-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                themeMode === "system" ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-cyan-500"
              )}>
                <Monitor size={16} />
              </div>
              {themeMode === "system" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-white">
                  <Check size={12} className="stroke-[3]" />
                </span>
              )}
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              {language === "vi" ? "Đồng Bộ Hệ Thống" : "System Auto Sync"}
            </span>
            <span className="mt-1 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
              {language === "vi"
                ? "Tự động thay đổi giao diện sáng hoặc tối đồng bộ theo hệ điều hành của thiết bị của bạn."
                : "Automatically adapt light or dark interfaces depending on your device operating system."}
            </span>
            <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-[10px] rounded-2xl overflow-hidden border border-slate-200/85 dark:border-slate-800 bg-[rgba(255,255,255,0.7)] dark:bg-slate-900/70 p-4 sm:p-6 backdrop-blur-[24px] shadow-sm">
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
              className="mt-4 rounded-xl border-2 border-solid border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs font-bold text-cyan-600 hover:bg-[var(--border)] dark:text-cyan-400"
            >
              {language === "vi" ? "Đặt lại bộ lọc" : "Reset Filter"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-4">
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
                  onClick={() => handleApplyWallpaper(wp)}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-[10px] border transition-all duration-300 hover:z-[999] hover:scale-[1.03] hover:shadow-2xl cursor-pointer aspect-video w-full",
                    isSelected
                      ? "border-red-500 ring-2 ring-red-500/30 bg-red-500/5 shadow-lg shadow-red-500/10"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-red-500/40 hover:shadow-md",
                  )}
                >
                  {/* Delete Wallpaper Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWallpaper(wp.id, wp.name);
                    }}
                    className="absolute top-2 right-2 z-25 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 shadow-md cursor-pointer"
                    title={language === "vi" ? "Xóa hình nền này" : "Delete this wallpaper"}
                  >
                    <Trash2 size={12} />
                  </button>

                  {/* Image Thumbnail Container */}
                  <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-white/50 dark:bg-slate-900/50">
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
                        className="h-full w-full object-cover"
                      >
                        <source src={wp.previewUrl || wp.url} />
                      </video>
                    ) : (
                      <img
                        src={wp.id === "img-wp-18" ? "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg" : wp.previewUrl}
                        alt={wp.id === "img-wp-18" ? "Hình nền #18" : wp.name}
                        loading="lazy"
                        className="h-full w-full object-cover rounded-[10px]"
                      />
                    )}

                    {/* Countdown Overlay or Active Selected Badge */}
                    {isSelected && applyingWallpaper?.id === wp.id && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]">
                        <div className="flex flex-col items-center gap-2 rounded-2xl bg-black/70 px-4 py-3 text-center shadow-xl backdrop-blur-md border border-white/10">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                          <span className="text-[11px] font-black tracking-wider text-white uppercase">
                            {language === "vi" ? `ÁP DỤNG SAU ${applyingWallpaper.secondsLeft}S` : `APPLY IN ${applyingWallpaper.secondsLeft}S`}
                          </span>
                        </div>
                      </div>
                    )}
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
