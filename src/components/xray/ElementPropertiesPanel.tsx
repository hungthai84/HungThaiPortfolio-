import React, { useState } from "react";
import {
  Type,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Sliders,
  Sparkles,
  Wand2,
  CheckSquare,
  Square,
  Edit3,
  Check,
  RotateCcw,
  Palette,
  Layout,
  Layers,
  Box,
  Eye,
  EyeOff,
  Sun,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "../../lib/utils";

export interface EditableStyleProp {
  id: string;
  label: string;
  cssKey: string;
  value: string;
  originalValue: string;
  selected: boolean;
  type: "text" | "color";
  placeholder: string;
}

interface ElementPropertiesPanelProps {
  selectedElement: HTMLElement;
  editTagText: string;
  setEditTagText: (val: string) => void;
  editClasses: string;
  setEditClasses: (val: string) => void;
  editImageSrc: string;
  setEditImageSrc: (val: string) => void;
  editHref: string;
  setEditHref: (val: string) => void;
  bgColor: string;
  setBgColor: (val: string) => void;
  bgOpacity: string;
  setBgOpacity: (val: string) => void;
  effectType: string;
  setEffectType: (val: string) => void;
  styleProperties: EditableStyleProp[];
  onToggleStyleSelect: (id: string) => void;
  onUpdateStyleValue: (id: string, val: string) => void;
  onSelectAllStyles: (select: boolean) => void;
}

export function ElementPropertiesPanel({
  selectedElement,
  editTagText,
  setEditTagText,
  editClasses,
  setEditClasses,
  editImageSrc,
  setEditImageSrc,
  editHref,
  setEditHref,
  bgColor,
  setBgColor,
  bgOpacity,
  setBgOpacity,
  effectType,
  setEffectType,
  styleProperties,
  onToggleStyleSelect,
  onUpdateStyleValue,
  onSelectAllStyles,
}: ElementPropertiesPanelProps) {
  // Field-level unlock states with Pencil icon
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingClasses, setIsEditingClasses] = useState(false);
  const [isEditingMedia, setIsEditingMedia] = useState(false);
  const [isEditingEffects, setIsEditingEffects] = useState(false);
  const [isEditingStyles, setIsEditingStyles] = useState(false);
  const [styleSearch, setStyleSearch] = useState("");

  // Detect active effects currently present on element classes or computed styles
  const activeEffectsList = React.useMemo(() => {
    const classList = (selectedElement.className || "").toString().toLowerCase();
    const effects: { label: string; desc: string; active: boolean; badge: string }[] = [];

    // 1. Backdrop blur / Glass
    if (classList.includes("backdrop-blur") || classList.includes("bg-white/") || classList.includes("bg-slate-900/")) {
      effects.push({
        label: "Kính mờ (Glassmorphism)",
        desc: "Lớp phủ mờ nền xuyên thấu Acrylic / Mica",
        active: true,
        badge: "backdrop-blur",
      });
    }

    // 2. Shadows
    if (classList.includes("shadow-")) {
      const shadowMatch = classList.match(/shadow-([a-z0-9]+)/);
      effects.push({
        label: "Đổ bóng (Box Shadow)",
        desc: `Đổ bóng đa lớp ${shadowMatch ? shadowMatch[0] : "shadow"}`,
        active: true,
        badge: shadowMatch ? shadowMatch[0] : "shadow",
      });
    }

    // 3. Transitions & Animations
    if (classList.includes("transition-") || classList.includes("animate-") || classList.includes("duration-")) {
      effects.push({
        label: "Hiệu ứng chuyển động (Animation & Transition)",
        desc: "Chuyển cảnh mượt mà khi hover / tương tác",
        active: true,
        badge: "transition",
      });
    }

    // 4. Hover scale or transforms
    if (classList.includes("hover:scale") || classList.includes("hover:-translate")) {
      effects.push({
        label: "Phản hồi chuột (Hover Transform)",
        desc: "Phóng to / nổi bật khi rê chuột",
        active: true,
        badge: "hover:transform",
      });
    }

    // 5. Rounded corners
    if (classList.includes("rounded-none")) {
      effects.push({
        label: "Góc phẳng vuông vức (Rounded None)",
        desc: "Thiết kế chuẩn Fluent không bo góc",
        active: true,
        badge: "rounded-none",
      });
    } else if (classList.includes("rounded-")) {
      effects.push({
        label: "Bo góc mềm mại (Border Radius)",
        desc: "Góc thẻ bo tròn mềm mại",
        active: true,
        badge: "rounded",
      });
    }

    // 6. Gradients
    if (classList.includes("bg-gradient-") || classList.includes("from-")) {
      effects.push({
        label: "Dải màu chuyển sắc (Gradient Background)",
        desc: "Màu nền chuyển sắc đa tầng",
        active: true,
        badge: "gradient",
      });
    }

    return effects;
  }, [selectedElement, editClasses]);

  const filteredStyles = React.useMemo(() => {
    if (!styleSearch.trim()) return styleProperties;
    const q = styleSearch.toLowerCase();
    return styleProperties.filter(
      (p) => p.label.toLowerCase().includes(q) || p.cssKey.toLowerCase().includes(q) || p.value.toLowerCase().includes(q)
    );
  }, [styleProperties, styleSearch]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
      {/* ========================================================================= */}
      {/* CỘT 1: THUỘC TÍNH PHẦN TỬ (ELEMENT PROPERTIES) */}
      {/* ========================================================================= */}
      <div className="space-y-3 rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-xs dark:border-white/10 dark:bg-[#12161C]/90">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Layout size={15} className="text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Thuộc tính phần tử
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            {selectedElement.tagName.toLowerCase()} • {styleProperties.length} thuộc tính
          </span>
        </div>

        {/* 1.1 Văn bản (Text Content) */}
        <div className="space-y-1.5 rounded-lg border border-slate-200/60 bg-slate-50/70 p-2.5 dark:border-white/5 dark:bg-[#181D24]/60">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
              <Type size={12} className="text-blue-500" />
              <span>Nội dung văn bản (Text)</span>
            </label>
            <button
              type="button"
              onClick={() => setIsEditingText(!isEditingText)}
              className={cn(
                "flex cursor-pointer items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-bold transition-colors",
                isEditingText
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200/80 text-slate-700 hover:bg-slate-300 dark:bg-white/10 dark:text-slate-300"
              )}
              title="Nhấp để bật / tắt chế độ chỉnh sửa"
            >
              <Edit3 size={11} />
              <span>{isEditingText ? "Đang sửa" : "Sửa"}</span>
            </button>
          </div>

          {isEditingText ? (
            <textarea
              value={editTagText}
              onChange={(e) => setEditTagText(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-blue-400/80 bg-white p-2 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-blue-500/50 dark:bg-[#12161C] dark:text-white"
              placeholder="Nhập nội dung văn bản mới..."
            />
          ) : (
            <div className="rounded-md bg-white/80 p-2 text-xs font-medium text-slate-800 dark:bg-[#12161C]/80 dark:text-slate-200 border border-slate-200/40 dark:border-white/5 max-h-16 overflow-y-auto">
              {editTagText ? editTagText : <span className="text-slate-400 italic">(Không chứa text trực tiếp)</span>}
            </div>
          )}
        </div>

        {/* 1.2 Lớp Tailwind CSS (Class list) */}
        <div className="space-y-1.5 rounded-lg border border-slate-200/60 bg-slate-50/70 p-2.5 dark:border-white/5 dark:bg-[#181D24]/60">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
              <Code size={12} className="text-indigo-500" />
              <span>Lớp Tailwind CSS (Classes)</span>
            </label>
            <button
              type="button"
              onClick={() => setIsEditingClasses(!isEditingClasses)}
              className={cn(
                "flex cursor-pointer items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-bold transition-colors",
                isEditingClasses
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200/80 text-slate-700 hover:bg-slate-300 dark:bg-white/10 dark:text-slate-300"
              )}
              title="Nhấp để bật / tắt chế độ chỉnh sửa class"
            >
              <Edit3 size={11} />
              <span>{isEditingClasses ? "Đang sửa" : "Sửa"}</span>
            </button>
          </div>

          {isEditingClasses ? (
            <textarea
              value={editClasses}
              onChange={(e) => setEditClasses(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-indigo-400/80 bg-white p-2 font-mono text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-indigo-500/50 dark:bg-[#12161C] dark:text-white"
              placeholder="Nhập danh sách class Tailwind..."
            />
          ) : (
            <div className="custom-scrollbar max-h-16 overflow-y-auto rounded-md bg-white/80 p-2 font-mono text-[11px] text-slate-700 dark:bg-[#12161C]/80 dark:text-slate-300 border border-slate-200/40 dark:border-white/5 break-words">
              {editClasses ? editClasses : <span className="text-slate-400 italic">(Chưa có class riêng)</span>}
            </div>
          )}
        </div>

        {/* 1.3 Media / Link Href (nếu là ảnh hoặc thẻ a) */}
        {(selectedElement.tagName.toLowerCase() === "img" ||
          selectedElement.tagName.toLowerCase() === "a" ||
          editImageSrc ||
          editHref) && (
          <div className="space-y-1.5 rounded-lg border border-slate-200/60 bg-slate-50/70 p-2.5 dark:border-white/5 dark:bg-[#181D24]/60">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <ImageIcon size={12} className="text-emerald-500" />
                <span>Liên kết &amp; Hình ảnh</span>
              </label>
              <button
                type="button"
                onClick={() => setIsEditingMedia(!isEditingMedia)}
                className={cn(
                  "flex cursor-pointer items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-bold transition-colors",
                  isEditingMedia
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200/80 text-slate-700 hover:bg-slate-300 dark:bg-white/10 dark:text-slate-300"
                )}
              >
                <Edit3 size={11} />
                <span>{isEditingMedia ? "Đang sửa" : "Sửa"}</span>
              </button>
            </div>

            {editImageSrc !== undefined && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Image Src:</span>
                {isEditingMedia ? (
                  <input
                    type="text"
                    value={editImageSrc}
                    onChange={(e) => setEditImageSrc(e.target.value)}
                    className="w-full rounded-md border border-emerald-400/80 bg-white p-1.5 font-mono text-[11px] outline-none dark:border-emerald-500/50 dark:bg-[#12161C] dark:text-white"
                  />
                ) : (
                  <div className="truncate rounded-md bg-white/80 p-1.5 font-mono text-[11px] text-slate-700 dark:bg-[#12161C]/80 dark:text-slate-300">
                    {editImageSrc || "(Trống)"}
                  </div>
                )}
              </div>
            )}

            {editHref !== undefined && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Href Link:</span>
                {isEditingMedia ? (
                  <input
                    type="text"
                    value={editHref}
                    onChange={(e) => setEditHref(e.target.value)}
                    className="w-full rounded-md border border-emerald-400/80 bg-white p-1.5 font-mono text-[11px] outline-none dark:border-emerald-500/50 dark:bg-[#12161C] dark:text-white"
                  />
                ) : (
                  <div className="truncate rounded-md bg-white/80 p-1.5 font-mono text-[11px] text-slate-700 dark:bg-[#12161C]/80 dark:text-slate-300">
                    {editHref || "(Trống)"}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 1.4 Danh sách đầy đủ Computed CSS Properties */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sliders size={12} className="text-blue-600 dark:text-blue-400" />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Thuộc tính CSS thực tế (Computed Styles)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              <button
                type="button"
                onClick={() => onSelectAllStyles(true)}
                className="cursor-pointer rounded px-1.5 py-0.5 font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40"
              >
                Chọn tất cả
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => onSelectAllStyles(false)}
                className="cursor-pointer rounded px-1.5 py-0.5 font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                Bỏ chọn
              </button>
              <button
                type="button"
                onClick={() => setIsEditingStyles(!isEditingStyles)}
                className={cn(
                  "ml-1 flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 font-bold transition-colors",
                  isEditingStyles ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                )}
              >
                <Edit3 size={10} />
                <span>{isEditingStyles ? "Xong" : "Chỉnh"}</span>
              </button>
            </div>
          </div>

          <div className="custom-scrollbar max-h-44 space-y-1 overflow-y-auto pr-1">
            {filteredStyles.map((prop) => (
              <div
                key={prop.id}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-lg border px-2 py-1 text-xs transition-colors",
                  prop.selected
                    ? "border-blue-300 bg-blue-50/70 dark:border-blue-800/60 dark:bg-blue-950/30"
                    : "border-slate-200/50 bg-slate-50/50 dark:border-white/5 dark:bg-[#181D24]/40"
                )}
              >
                <label className="flex cursor-pointer items-center gap-1.5 truncate flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={prop.selected}
                    onChange={() => onToggleStyleSelect(prop.id)}
                    className="h-3 w-3 rounded border-slate-300 text-blue-600 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300 truncate text-[11px]">
                    {prop.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono truncate">({prop.cssKey})</span>
                </label>

                {isEditingStyles ? (
                  <input
                    type="text"
                    value={prop.value}
                    onChange={(e) => onUpdateStyleValue(prop.id, e.target.value)}
                    className="w-32 rounded bg-white px-1.5 py-0.5 font-mono text-[10.5px] border border-blue-400 outline-none dark:bg-[#12161C] dark:text-white"
                  />
                ) : (
                  <span className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-[10px] text-slate-700 dark:bg-[#12161C] dark:text-slate-300 border border-slate-200/60 dark:border-white/5 shrink-0">
                    {prop.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CỘT 2: HIỆU ỨNG ĐANG CÓ (ACTIVE EFFECTS & CUSTOMIZERS) */}
      {/* ========================================================================= */}
      <div className="space-y-3 rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-xs dark:border-white/10 dark:bg-[#12161C]/90">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-amber-500" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Hiệu ứng đang có (Active Effects)
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            {activeEffectsList.length} hiệu ứng phát hiện
          </span>
        </div>

        {/* 2.1 Danh sách badges hiệu ứng đang áp dụng */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Các hiệu ứng được nhận diện trên phần tử:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeEffectsList.map((eff, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-50/60 px-2 py-1 text-[11px] font-medium text-amber-900 dark:border-amber-500/20 dark:bg-amber-950/30 dark:text-amber-200"
              >
                <Zap size={11} className="text-amber-500 shrink-0" />
                <span className="font-bold">{eff.label}</span>
                <span className="rounded bg-amber-500/20 px-1 font-mono text-[9.5px] text-amber-800 dark:text-amber-300">
                  {eff.badge}
                </span>
              </div>
            ))}
            {activeEffectsList.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-200 p-2 text-center text-xs text-slate-400 dark:border-white/10 w-full">
                Không phát hiện hiệu ứng đặc biệt nào.
              </div>
            )}
          </div>
        </div>

        {/* 2.2 Tinh chỉnh Màu Nền & Độ Mờ (Glassmorphism / Opacity) */}
        <div className="space-y-2 rounded-lg border border-slate-200/60 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-[#181D24]/60">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Palette size={13} className="text-sky-500" />
              <span>Màu nền &amp; Độ mờ xuyên thấu (Glassmorphism)</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-8 w-12 cursor-pointer rounded-md border border-slate-300 p-0.5 dark:border-white/10"
              title="Chọn mã màu HEX"
            />
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5 dark:border-white/5 dark:bg-[#12161C]">
              <span className="text-[11px] font-semibold text-slate-500">Độ mờ:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={bgOpacity}
                onChange={(e) => setBgOpacity(e.target.value)}
                className="flex-1 cursor-pointer accent-blue-600"
              />
              <span className="w-10 text-right font-mono text-xs font-bold text-slate-800 dark:text-white">
                {bgOpacity}%
              </span>
            </div>
          </div>
        </div>

        {/* 2.3 Hiệu ứng Đổ Bóng & Ánh Sáng (Shadow / Glow / Preset) */}
        <div className="space-y-2 rounded-lg border border-slate-200/60 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-[#181D24]/60">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Wand2 size={13} className="text-purple-500" />
            <span>Đổi bộ hiệu ứng thị giác (Visual Effect Preset)</span>
          </label>

          <select
            value={effectType}
            onChange={(e) => setEffectType(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-slate-200/80 bg-white p-2 text-xs font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-white/10 dark:bg-[#12161C] dark:text-white"
          >
            <option value="none">1. Mặc định (Không thêm hiệu ứng)</option>
            <option value="glass">2. Kính mờ Acrylic (Glassmorphism &amp; Backdrop Blur)</option>
            <option value="shadow-sm">3. Đổ bóng nhẹ (Shadow sm)</option>
            <option value="shadow-md">4. Đổ bóng vừa (Shadow md)</option>
            <option value="shadow-lg">5. Đổ bóng lớn nổi bật (Shadow lg)</option>
            <option value="shadow-xl">6. Đổ bóng cao cấp đa lớp (Shadow xl)</option>
            <option value="glow">7. Phát sáng đường viền (Glow Accent Light)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
