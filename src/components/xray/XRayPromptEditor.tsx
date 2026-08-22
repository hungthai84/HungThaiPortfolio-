import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Copy,
  Wand2,
  MousePointerClick,
  CheckCircle2,
  Sun,
  Moon,
  Monitor,
  BookOpen,
  Search,
  Code,
  Layout,
  Zap,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Edit3,
  Eye,
  Type,
  Image as ImageIcon,
  Link as LinkIcon,
  FileText,
  CheckSquare,
  Square,
  RotateCcw,
  Layers,
  ChevronRight,
  Sliders,
  Bookmark,
  Trash2,
  Target,
  Boxes,
  Globe,
  FileCode,
} from "lucide-react";

const ACTIONS = [
  "Đổi nội dung",
  "Viết lại",
  "Rút gọn",
  "Mở rộng",
  "Dịch",
  "Đổi màu",
  "Đổi màu / Đổi text",
  "Đổi icon",
  "Đổi hình ảnh",
  "Đổi bố cục",
  "Thêm hiệu ứng",
  "Xóa thành phần",
  "Thêm thành phần",
  "Căn chỉnh",
  "Responsive",
  "Accessibility",
  "Animation",
  "Glass UI",
  "Thiết kế lại Card",
  "Tối ưu bố cục",
];

const SCOPES = [
  "Chỉ đối tượng này",
  "Thành phần tương tự trong trang",
  "Tất cả thành phần cùng loại trong Website",
  "Toàn bộ trang hiện tại",
  "Toàn bộ Website",
];

interface LibraryPrompt {
  id: string;
  title: string;
  desc: string;
  prompt: string;
}

interface SavedFormatPreset {
  id: string;
  name: string;
  tagName: string;
  classes: string;
  styles: { [key: string]: string };
  timestamp: string;
}

interface PromptCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  prompts: LibraryPrompt[];
}

const PROMPT_LIBRARY: PromptCategory[] = [
  {
    id: "fix",
    name: "Sửa Lỗi & Fix Code",
    icon: Code,
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    prompts: [
      {
        id: "fix-render",
        title: "Khắc phục lỗi Re-render vô hạn",
        desc: "Sửa lỗi re-render lặp vô tận do dependency trong useEffect gây ra.",
        prompt:
          "Phân tích và khắc phục lỗi lặp re-render vô hạn trong useEffect. Đảm bảo các dependency array được tối ưu hóa chỉ chứa các giá trị nguyên thủy (primitive values), hoặc được bao bọc bởi useCallback / useMemo thích hợp để tránh khởi tạo lại đối tượng.",
      },
      {
        id: "fix-layout",
        title: "Sửa lỗi vỡ Layout / Responsive",
        desc: "Tối ưu CSS/Tailwind bị lệch, tràn màn hình trên di động.",
        prompt:
          "Rà soát và khắc phục các lỗi vỡ layout hoặc tràn khung (horizontal overflow) trên thiết bị di động. Thay thế toàn bộ kích thước cố định (ví dụ: w-[400px]) bằng flex-wrap, grid-cols, hoặc w-full kết hợp max-w. Đảm bảo khoảng cách padding/margin cân đối.",
      },
      {
        id: "fix-async",
        title: "Xử lý lỗi Bất đồng bộ & Guard Key",
        desc: "Bọc lỗi API, Firebase và kiểm tra khóa bảo mật.",
        prompt:
          "Bổ sung khối kiểm tra (guard conditions) chống crash khi thiếu dữ liệu hoặc lỗi kết nối. Đảm bảo tất cả các hàm bất đồng bộ (async/await) đều được bọc trong try-catch và cập nhật đúng trạng thái UI (loadingState, errorState, successState, emptyState).",
      },
      {
        id: "fix-hydration",
        title: "Khử cảnh báo Console & Types",
        desc: "Sửa lỗi TypeScript và các cảnh báo cảnh báo trên console.",
        prompt:
          "Khắc phục các cảnh báo lỗi TypeScript (any type, missing properties) và loại bỏ hoàn toàn các lỗi cảnh báo đỏ trên tab Console của trình duyệt. Đảm bảo định nghĩa kiểu dữ liệu chặt chẽ và không có import thừa.",
      },
    ],
  },
  {
    id: "clean",
    name: "Dọn Dẹp Hệ Thống",
    icon: Sparkles,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    prompts: [
      {
        id: "clean-modular",
        title: "Mô-đun hóa Component lớn",
        desc: "Chia nhỏ tệp component cồng kềnh thành các file nhỏ hơn.",
        prompt:
          "Tái cấu trúc (refactor) tệp mã nguồn lớn bằng cách tách các đoạn giao diện phức tạp hoặc các khối logic riêng biệt thành các component con và đặt trong thư mục phù hợp (ví dụ: src/components/ui/ hoặc src/components/layout/). Đảm bảo truyền props rõ ràng.",
      },
      {
        id: "clean-style",
        title: "Chuẩn hóa & Gộp Class Tailwind",
        desc: "Dọn dẹp mã Tailwind bị trùng lặp, lộn xộn.",
        prompt:
          "Dọn dẹp và tối ưu hóa các lớp Tailwind CSS. Nhóm các utility class theo thứ tự chuẩn hóa (Layout -> Sizing -> Spacing -> Typography -> Colors). Loại bỏ các style trùng lặp và sử dụng helper cn() để gán class động một cách sạch sẽ.",
      },
      {
        id: "clean-dead-code",
        title: "Dọn dẹp Mã rác & Log dư thừa",
        desc: "Loại bỏ console.log, biến không dùng và comment thừa.",
        prompt:
          "Quét toàn bộ tệp và loại bỏ các biến không sử dụng, các hàm thừa, các dòng console.log phục vụ debug trước đó, cùng các ghi chú code cũ bị vô hiệu hóa. Đảm bảo mã nguồn tối giản, sạch đẹp và dễ đọc.",
      },
    ],
  },
  {
    id: "uiux",
    name: "Tối Ưu Giao Diện",
    icon: Layout,
    color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    prompts: [
      {
        id: "uiux-glass",
        title: "Nâng cấp hiệu ứng Glassmorphism",
        desc: "Tạo lớp kính mờ mượt mà, sâu sắc và tinh tế.",
        prompt:
          "Nâng cấp giao diện của đối tượng thành phong cách Glassmorphism cao cấp: Sử dụng nền trong suốt mờ nhòe (backdrop-blur-md/lg), viền mảnh có độ tương phản cao (border border-white/20 hoặc border-slate-200/20), đổ bóng mềm sâu (shadow-xl) và đảm bảo chữ hiển thị cực kì sắc nét, dễ đọc trên nền ảnh hoặc dải màu.",
      },
      {
        id: "uiux-mobile",
        title: "Tối ưu trải nghiệm Touch Mobile",
        desc: "Tăng kích thước nút bấm, tối ưu cử chỉ vuốt chạm.",
        prompt:
          "Tối ưu hóa giao diện cho trải nghiệm cảm ứng di động. Đảm bảo tất cả các nút bấm, liên kết và vùng tương tác có kích thước tối thiểu là 44px x 44px để dễ chạm. Thêm khoảng cách đệm (padding) rộng rãi và loại bỏ các hiệu ứng hover bị đơ trên điện thoại.",
      },
      {
        id: "uiux-theme",
        title: "Đồng bộ Dark Mode hoàn hảo",
        desc: "Sửa lỗi màu chữ, màu nền khi chuyển đổi sáng/tối.",
        prompt:
          "Kiểm tra và đồng bộ hóa trạng thái hiển thị của component khi chuyển đổi giữa chế độ Sáng (Light Mode) và Tối (Dark Mode). Sử dụng đúng các tiền tố dark: cho màu nền, màu chữ và màu viền, đảm bảo độ tương phản đạt chuẩn WCAG AA.",
      },
      {
        id: "uiux-micro",
        title: "Thêm Chuyển Động & Hover",
        desc: "Thêm các micro-interactions mượt mà bằng Framer Motion.",
        prompt:
          "Tích hợp các tương tác vi mô (micro-interactions) tinh tế để tăng độ sống động: Sử dụng Framer Motion cho các hiệu ứng xuất hiện (fade-in), di chuột vào (hover:scale-[1.015] mượt mà) và hiệu ứng click chuột nhẹ nhàng (active:scale-[0.98]).",
      },
    ],
  },
  {
    id: "performance",
    name: "Hiệu Năng & Khác",
    icon: Zap,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    prompts: [
      {
        id: "perf-lazy",
        title: "Tối ưu Tốc độ tải với Lazy Load",
        desc: "Sử dụng React.lazy và Suspense cho các module lớn.",
        prompt:
          "Áp dụng cơ chế Code-Splitting sử dụng React.lazy và React.Suspense cho các trang hoặc component lớn không cần hiển thị ngay lập tức, giúp tối ưu hóa đáng kể dung lượng bundle tải về ban đầu và rút ngắn thời gian phản hồi (Time to Interactive).",
      },
      {
        id: "perf-assets",
        title: "Tối ưu hóa Tài nguyên & Hình ảnh",
        desc: "Cài đặt lazy loading cho ảnh, tối ưu kích thước SVG.",
        prompt:
          'Tối ưu hóa việc tải tài nguyên: Bổ sung thuộc tính loading="lazy" và JSX referrerPolicy="no-referrer" cho tất cả các thẻ hình ảnh (img). Kiểm tra các biểu tượng SVG để đảm bảo không bị lỗi tỷ lệ và được tải bất đồng bộ hiệu quả.',
      },
      {
        id: "perf-a11y",
        title: "Nâng cấp Khả năng tiếp cận (A11y)",
        desc: "Bổ sung thẻ semantic và aria-label chuẩn WCAG.",
        prompt:
          "Tối ưu hóa khả năng tiếp cận (Accessibility - a11y) theo chuẩn WCAG: Sử dụng đúng các thẻ HTML ngữ nghĩa (semantic), bổ sung thuộc tính aria-label, aria-expanded cho các nút tương tác không có nhãn chữ, và đảm bảo hỗ trợ điều hướng bằng bàn phím hoàn hảo.",
      },
    ],
  },
];

const getClassString = (el: Element | null | undefined): string => {
  if (!el) return "";
  if (typeof el.className === "string") return el.className;
  if (
    typeof (el as any).className === "object" &&
    (el as any).className?.baseVal
  ) {
    return (el as any).className.baseVal;
  }
  if (typeof el.getAttribute === "function")
    return el.getAttribute("class") || "";
  return "";
};

interface EditableStyleProp {
  id: string;
  label: string;
  cssKey: string;
  value: string;
  originalValue: string;
  selected: boolean;
  type: "text" | "color";
  placeholder: string;
}

export function XRayPromptEditor() {
  const [activeTab, setActiveTab] = useState<"generator" | "library">("generator");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [action, setAction] = useState(ACTIONS[0]);
  const [scope, setScope] = useState(SCOPES[0]);
  const [instruction, setInstruction] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  
  // New States for X-Ray Redesign
  const [editType, setEditType] = useState<"custom" | "preset">("custom");
  const [targetScope, setTargetScope] = useState<"self" | "same-tag" | "same-class" | "parent-section" | "entire-page">("self");
  const [bgOpacity, setBgOpacity] = useState("100");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [effectType, setEffectType] = useState("none");
  const [promptQueue, setPromptQueue] = useState<string[]>([]);
  const [showInstructionPresets, setShowInstructionPresets] = useState(false);
  const [showDomHierarchy, setShowDomHierarchy] = useState(false);
  const [showAdvancedStyles, setShowAdvancedStyles] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  // Inspector & Editable Element States
  const [editTagText, setEditTagText] = useState("");
  const [editClasses, setEditClasses] = useState("");
  const [editImageSrc, setEditImageSrc] = useState("");
  const [editHref, setEditHref] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [editCustomNotes, setEditCustomNotes] = useState("");

  // Editable & Selectable Computed CSS Properties
  const [styleProperties, setStyleProperties] = useState<EditableStyleProp[]>([]);

  // DOM Hierarchy / Element parts
  const [elementHierarchy, setElementHierarchy] = useState<HTMLElement[]>([]);
  const [elementChildren, setElementChildren] = useState<HTMLElement[]>([]);

  // Library States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);

  // Saved Format Presets (X-Ray Style Transfer)
  const [savedFormats, setSavedFormats] = useState<SavedFormatPreset[]>(() => {
    try {
      const saved = localStorage.getItem("xray_saved_formats");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [formatPresetName, setFormatPresetName] = useState("");
  const [appliedPresetId, setAppliedPresetId] = useState<string | null>(null);

  // Custom Saved Instruction Presets (Mẫu mô tả lưu sẵn cho sau này)
  interface CustomInstructionPreset {
    id: string;
    title: string;
    instruction: string;
    timestamp: string;
  }

  const [customInstructionPresets, setCustomInstructionPresets] = useState<CustomInstructionPreset[]>(() => {
    try {
      const saved = localStorage.getItem("xray_custom_instruction_presets");
      return saved ? JSON.parse(saved) : [
        {
          id: "inst_default_1",
          title: "Tối ưu hóa bố cục & Phối màu chuẩn",
          instruction: "Tinh chỉnh bố cục hài hòa, sử dụng dải màu trung tính tinh tế và đảm bảo độ tương phản cao đạt chuẩn WCAG AA.",
          timestamp: "Mẫu hệ thống"
        },
        {
          id: "inst_default_2",
          title: "Hiệu ứng Glassmorphism & Bo góc",
          instruction: "Thiết kế thẻ với hiệu ứng kính mờ (backdrop-blur-md), viền tinh tế và góc bo tròn mềm mại hiện đại.",
          timestamp: "Mẫu hệ thống"
        }
      ];
    } catch {
      return [];
    }
  });

  const handleSaveInstructionPreset = () => {
    if (!instruction.trim()) {
      showToast("⚠️ Vui lòng nhập nội dung mô tả yêu cầu trước khi lưu!");
      return;
    }
    const title = instruction.slice(0, 35) + (instruction.length > 35 ? "..." : "");
    const newPreset: CustomInstructionPreset = {
      id: "inst_" + Date.now(),
      title,
      instruction: instruction.trim(),
      timestamp: new Date().toLocaleString(),
    };
    const updated = [newPreset, ...customInstructionPresets];
    setCustomInstructionPresets(updated);
    try {
      localStorage.setItem("xray_custom_instruction_presets", JSON.stringify(updated));
    } catch {}
    showToast("✓ Đã lưu mẫu mô tả thành công để dùng cho sau này!");
  };

  const handleDeleteInstructionPreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customInstructionPresets.filter(p => p.id !== id);
    setCustomInstructionPresets(updated);
    try {
      localStorage.setItem("xray_custom_instruction_presets", JSON.stringify(updated));
    } catch {}
    showToast("Đã xóa mẫu lưu sẵn.");
  };

  const handleApplyInstructionPreset = (instText: string) => {
    setInstruction(instText);
    setActiveTab("generator");
    showToast("✓ Đã áp dụng mẫu mô tả lưu sẵn!");
  };

  const handleSaveFormat = () => {
    if (!selectedElement) return;
    const name = formatPresetName.trim() || `Format <${selectedElement.tagName.toLowerCase()}> (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
    
    const styleMap: { [key: string]: string } = {};
    styleProperties.forEach((p) => {
      styleMap[p.cssKey] = p.value;
    });

    const newPreset: SavedFormatPreset = {
      id: "preset_" + Date.now(),
      name,
      tagName: selectedElement.tagName.toLowerCase(),
      classes: editClasses,
      styles: styleMap,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newPreset, ...savedFormats];
    setSavedFormats(updated);
    try {
      localStorage.setItem("xray_saved_formats", JSON.stringify(updated));
    } catch {}
    setFormatPresetName("");
    showToast(`✓ Đã lưu format "${name}" thành công!`);
  };

  const handleApplyFormatPreset = (preset: SavedFormatPreset) => {
    if (!selectedElement) return;
    if (preset.classes) {
      setEditClasses(preset.classes);
      selectedElement.className = preset.classes;
    }
    
    setStyleProperties((prev) =>
      prev.map((prop) => {
        if (preset.styles && preset.styles[prop.cssKey] !== undefined) {
          const val = preset.styles[prop.cssKey];
          try {
            if (prop.id === "widthHeight") {
              const parts = val.split("×").map((s: string) => s.trim());
              if (parts[0]) selectedElement.style.width = parts[0];
              if (parts[1]) selectedElement.style.height = parts[1];
            } else if (prop.cssKey in selectedElement.style) {
              (selectedElement.style as any)[prop.cssKey] = val;
            }
          } catch {}
          return {
            ...prop,
            value: val,
            selected: true,
          };
        }
        return prop;
      })
    );

    setAppliedPresetId(preset.id);
    showToast(`✓ Đã áp dụng format "${preset.name}" cho đối tượng này!`);
  };

  const handleDeletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedFormats.filter((p) => p.id !== id);
    setSavedFormats(updated);
    try {
      localStorage.setItem("xray_saved_formats", JSON.stringify(updated));
    } catch {}
    showToast("✓ Đã xóa mẫu format đã lưu");
  };

  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(() => {
    return (localStorage.getItem("app_theme_option") as any) || "system";
  });

  const changeTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeMode(newTheme);
    window.dispatchEvent(
      new CustomEvent("app-set-theme", { detail: { theme: newTheme } }),
    );
  };

  useEffect(() => {
    const handleThemeUpdated = () => {
      const savedThemeOption = localStorage.getItem("app_theme_option") as any;
      if (savedThemeOption) {
        setThemeMode(savedThemeOption);
      }
    };
    window.addEventListener("app-theme-updated", handleThemeUpdated);
    return () =>
      window.removeEventListener("app-theme-updated", handleThemeUpdated);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      if (
        e.key.toLowerCase() === "x" &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        if (!isPanelOpen) {
          setIsSelectMode((prev) => !prev);
        }
      } else if (e.key === "Escape") {
        setIsSelectMode(false);
        setIsPanelOpen(false);
        setHoveredElement(null);
      } else if (e.key.toLowerCase() === "x" && e.ctrlKey && e.shiftKey) {
        if (lastPrompt) {
          setGeneratedPrompt(lastPrompt);
          setIsPanelOpen(true);
        }
      } else if (e.key.toLowerCase() === "c" && e.ctrlKey && isPanelOpen) {
        handleCopy();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPanelOpen, lastPrompt, generatedPrompt]);

  const populateInspectorFields = (el: HTMLElement) => {
    setEditTagText((el.innerText || el.textContent || "").trim());
    setEditClasses(getClassString(el));
    setEditImageSrc(el.getAttribute("src") || "");
    setEditHref(el.getAttribute("href") || "");
    setEditAlt(el.getAttribute("alt") || "");
    setEditCustomNotes("");

    // Extract Ancestors for Element Hierarchy
    const parents: HTMLElement[] = [];
    let p = el.parentElement;
    while (p && p !== document.body && parents.length < 5) {
      parents.unshift(p);
      p = p.parentElement;
    }
    setElementHierarchy(parents);

    // Extract Immediate Children
    const children: HTMLElement[] = [];
    Array.from(el.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        children.push(child);
      }
    });
    setElementChildren(children);

    if (typeof window !== "undefined" && window.getComputedStyle) {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      const initialProps: EditableStyleProp[] = [
        {
          id: "widthHeight",
          label: "Kích thước (Size W×H)",
          cssKey: "widthHeight",
          value: `${Math.round(rect.width)}px × ${Math.round(rect.height)}px`,
          originalValue: `${Math.round(rect.width)}px × ${Math.round(rect.height)}px`,
          selected: false,
          type: "text",
          placeholder: "vd: 320px × 180px hoặc w-full",
        },
        {
          id: "fontSize",
          label: "Cỡ chữ (Font Size)",
          cssKey: "fontSize",
          value: cs.fontSize || "16px",
          originalValue: cs.fontSize || "16px",
          selected: false,
          type: "text",
          placeholder: "vd: 14px, 1.25rem",
        },
        {
          id: "color",
          label: "Màu chữ (Color)",
          cssKey: "color",
          value: cs.color || "#000000",
          originalValue: cs.color || "#000000",
          selected: false,
          type: "color",
          placeholder: "#1e293b hoặc rgb(...)",
        },
        {
          id: "bgColor",
          label: "Màu nền (Background)",
          cssKey: "backgroundColor",
          value: cs.backgroundColor === "rgba(0, 0, 0, 0)" ? "transparent" : cs.backgroundColor,
          originalValue: cs.backgroundColor === "rgba(0, 0, 0, 0)" ? "transparent" : cs.backgroundColor,
          selected: false,
          type: "color",
          placeholder: "#ffffff hoặc transparent",
        },
        {
          id: "borderRadius",
          label: "Bo góc (Border Radius)",
          cssKey: "borderRadius",
          value: cs.borderRadius || "0px",
          originalValue: cs.borderRadius || "0px",
          selected: false,
          type: "text",
          placeholder: "vd: 12px, 16px, 9999px",
        },
        {
          id: "padding",
          label: "Khoảng đệm (Padding)",
          cssKey: "padding",
          value: cs.padding || "0px",
          originalValue: cs.padding || "0px",
          selected: false,
          type: "text",
          placeholder: "vd: 12px 16px",
        },
        {
          id: "margin",
          label: "Khoảng cách (Margin)",
          cssKey: "margin",
          value: cs.margin || "0px",
          originalValue: cs.margin || "0px",
          selected: false,
          type: "text",
          placeholder: "vd: 8px, 0 auto",
        },
        {
          id: "boxShadow",
          label: "Đổ bóng (Box Shadow)",
          cssKey: "boxShadow",
          value: cs.boxShadow && cs.boxShadow !== "none" ? cs.boxShadow : "none",
          originalValue: cs.boxShadow && cs.boxShadow !== "none" ? cs.boxShadow : "none",
          selected: false,
          type: "text",
          placeholder: "vd: 0 10px 25px rgba(0,0,0,0.1)",
        },
        {
          id: "opacity",
          label: "Độ mờ (Opacity)",
          cssKey: "opacity",
          value: cs.opacity || "1",
          originalValue: cs.opacity || "1",
          selected: false,
          type: "text",
          placeholder: "vd: 0.9, 1",
        },
        {
          id: "backdropFilter",
          label: "Kính mờ (Backdrop Filter)",
          cssKey: "backdropFilter",
          value:
            cs.backdropFilter && cs.backdropFilter !== "none"
              ? cs.backdropFilter
              : (cs as any).webkitBackdropFilter || "none",
          originalValue:
            cs.backdropFilter && cs.backdropFilter !== "none"
              ? cs.backdropFilter
              : (cs as any).webkitBackdropFilter || "none",
          selected: false,
          type: "text",
          placeholder: "vd: blur(12px)",
        },
        {
          id: "transition",
          label: "Chuyển cảnh (Transition)",
          cssKey: "transition",
          value:
            cs.transition && cs.transition !== "all 0s ease 0s"
              ? cs.transition
              : "none",
          originalValue:
            cs.transition && cs.transition !== "all 0s ease 0s"
              ? cs.transition
              : "none",
          selected: false,
          type: "text",
          placeholder: "vd: all 0.2s ease-in-out",
        },
      ];

      setStyleProperties(initialProps);
    }
  };

  const handleSelectSubElement = (targetEl: HTMLElement) => {
    setSelectedElement(targetEl);
    populateInspectorFields(targetEl);
    autoDetectAction(targetEl);
    showToast(`✓ Đã chọn thành phần: <${targetEl.tagName.toLowerCase()}>`);
  };

  const handleUpdateStyleValue = (id: string, newValue: string) => {
    setStyleProperties((prev) =>
      prev.map((prop) => {
        if (prop.id === id) {
          return {
            ...prop,
            value: newValue,
            selected: true, // Auto-select when value is edited
          };
        }
        return prop;
      }),
    );
  };

  const handleToggleStyleSelect = (id: string) => {
    setStyleProperties((prev) =>
      prev.map((prop) => {
        if (prop.id === id) {
          return { ...prop, selected: !prop.selected };
        }
        return prop;
      }),
    );
  };

  const handleSelectAllStyles = (selectAll: boolean) => {
    setStyleProperties((prev) =>
      prev.map((prop) => ({ ...prop, selected: selectAll })),
    );
  };

  const handleResetStyles = () => {
    setStyleProperties((prev) =>
      prev.map((prop) => ({
        ...prop,
        value: prop.originalValue,
        selected: false,
      })),
    );
    showToast("✓ Đã khôi phục các giá trị ban đầu");
  };

  useEffect(() => {
    if (isSelectMode) {
      document.body.style.cursor = "crosshair";
    } else {
      document.body.style.cursor = "";
    }

    if (!isSelectMode) {
      setHoveredElement(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      e.stopPropagation();
      setHoveredElement(e.target as HTMLElement);
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const target = e.target as HTMLElement;
      setSelectedElement(target);
      setIsSelectMode(false);
      setIsPanelOpen(true);
      populateInspectorFields(target);
      setActiveTab("generator");

      autoDetectAction(target);
    };

    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [isSelectMode]);

  const autoDetectAction = (el: HTMLElement) => {
    const tag = el.tagName.toLowerCase();
    let suggestedAction = "Đổi nội dung";
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag))
      suggestedAction = "Đổi nội dung";
    else if (["button", "a"].includes(tag) || el.closest("button"))
      suggestedAction = "Đổi màu / Đổi text";
    else if (tag === "img" || tag === "svg") suggestedAction = "Đổi hình ảnh";
    else if (
      el.classList.toString().includes("card") ||
      el.closest('.card, [class*="card"]')
    )
      suggestedAction = "Thiết kế lại Card";
    else if (tag === "section" || el.classList.toString().includes("section"))
      suggestedAction = "Tối ưu bố cục";

    setAction(suggestedAction);
  };

  const getElementMetadata = (el: HTMLElement) => {
    const activePageCard =
      el.closest('[id$="-main-card"]') ||
      document.querySelector('[id$="-main-card"]');
    const pageCardName = activePageCard?.getAttribute("data-card-name");
    const bodyPageName = document.body.getAttribute("data-active-page-name");
    const h1Title = document.querySelector("h1")?.textContent?.trim();

    const page =
      pageCardName ||
      (bodyPageName ? `${bodyPageName} - Nguyễn Hùng Thái` : null) ||
      (h1Title ? `${h1Title}` : null) ||
      document.title ||
      "Nguyễn Hùng Thái - CX Expert Portfolio";

    let section = "Unknown Section";
    let component = "Unknown Component";

    const sectionEl = el.closest("section");
    if (sectionEl) {
      section =
        sectionEl.getAttribute("id") ||
        (sectionEl.getAttribute("class") || "").split(" ")[0] ||
        "Section";
    }

    const compEl = el.closest(
      '[id*="-card"], [class*="card"], [class*="container"], [class*="wrapper"], nav, header, footer',
    );
    if (compEl) {
      component =
        compEl.getAttribute("id") ||
        (compEl.getAttribute("class") || "").split(" ")[0] ||
        compEl.tagName.toLowerCase();
    }

    const classAttr = el.getAttribute("class");
    const targetStr = `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${classAttr ? `.${classAttr.split(" ")[0]}` : ""}`;

    let hierarchy = "";
    let curr: HTMLElement | null = el.parentElement;
    let depth = 0;
    while (curr && depth < 3 && curr !== document.body) {
      const currClass = curr.getAttribute("class");
      hierarchy = `${curr.tagName.toLowerCase()}${currClass ? `.${currClass.split(" ")[0]}` : ""} > ${hierarchy}`;
      curr = curr.parentElement;
      depth++;
    }
    hierarchy += targetStr;

    return { page, section, component, targetStr, hierarchy };
  };

  const handleGenerate = () => {
    if (!selectedElement) {
      showToast("Vui lòng chọn một đối tượng trước khi tạo Prompt.");
      return;
    }

    const meta = getElementMetadata(selectedElement);
    const tagName = selectedElement.tagName.toLowerCase();
    
    // Prepare Scope Target wording
    let scopeTargetStr = "";
    if (targetScope === "self") {
      scopeTargetStr = `thẻ <${tagName}> ("${meta.targetStr}") tại section ${meta.section} của trang ${meta.page}`;
    } else if (targetScope === "same-tag") {
      scopeTargetStr = `tất cả các thẻ <${tagName}> tương tự trong section "${meta.section}" của trang ${meta.page} (dựa trên mẫu phần tử tham chiếu "${meta.targetStr}")`;
    } else if (targetScope === "same-class") {
      const primaryClass = getClassString(selectedElement).split(" ")[0];
      scopeTargetStr = `tất cả các phần tử có cùng class/kiểu dáng (${primaryClass ? `.${primaryClass}` : `<${tagName}>`}) tại trang ${meta.page}`;
    } else if (targetScope === "parent-section") {
      scopeTargetStr = `toàn bộ section / khối cha ("${meta.section}") chứa phần tử <${tagName}> tại trang ${meta.page}`;
    } else if (targetScope === "entire-page") {
      scopeTargetStr = `toàn bộ trang "${meta.page}" (đồng bộ thiết kế với trọng tâm là thẻ <${tagName}>)`;
    }
    
    let changes = [];
    const originalText = (selectedElement.innerText || selectedElement.textContent || "").trim();
    if (editTagText.trim() && editTagText.trim() !== originalText) {
      changes.push(`đổi nội dung chữ thành "${editTagText.trim()}"`);
    }
    const originalClasses = getClassString(selectedElement);
    if (editClasses.trim() && editClasses.trim() !== originalClasses) {
      changes.push(`đổi class thành "${editClasses.trim()}"`);
    }
    if (editImageSrc.trim()) changes.push(`đổi link ảnh thành "${editImageSrc.trim()}"`);
    if (editHref.trim()) changes.push(`đổi link href thành "${editHref.trim()}"`);
    if (editAlt.trim()) changes.push(`đổi alt thành "${editAlt.trim()}"`);

    // CSS
    const selectedStyles = styleProperties.filter(
      (p) => p.selected || p.value !== p.originalValue,
    );
    if (selectedStyles.length > 0) {
      let styleStr = selectedStyles.map(p => `${p.label} thành ${p.value}`).join(", ");
      changes.push(`cập nhật CSS (${styleStr})`);
    }
    
    // Additional options
    if (bgColor !== "#ffffff" || bgOpacity !== "100") {
      changes.push(`chỉnh nền thành màu ${bgColor} với độ mờ ${bgOpacity}%`);
    }
    if (effectType !== "none") {
      let effectName = effectType;
      switch(effectType) {
        case "shadow-sm": effectName = "đổ bóng nhỏ (shadow-sm)"; break;
        case "shadow-md": effectName = "đổ bóng vừa (shadow-md)"; break;
        case "shadow-lg": effectName = "đổ bóng lớn (shadow-lg)"; break;
        case "shadow-xl": effectName = "đổ bóng rất lớn (shadow-xl)"; break;
        case "glow": effectName = "phát sáng (glow)"; break;
        case "glass": effectName = "kính mờ (glassmorphism)"; break;
      }
      changes.push(`thêm hiệu ứng ${effectName}`);
    }

    let changeStr = changes.length > 0 ? " với các thay đổi: " + changes.join(", ") : "";
    
    let customInst = instruction ? `. Yêu cầu thêm: ${instruction}` : "";
    let presetText = editType === "preset" && appliedPresetId ? ` (áp dụng format giống preset định dạng đã chọn)` : "";

    let prompt = `Hãy chỉnh sửa ${scopeTargetStr}${presetText}${changeStr}${customInst}.`;

    setGeneratedPrompt(prompt);
    setLastPrompt(prompt);
    showToast("✓ Đã sinh Prompt thành công!");
  };

  const handleAddToQueue = () => {
    if (!generatedPrompt) {
        showToast("Vui lòng tạo prompt trước.");
        return;
    }
    setPromptQueue([...promptQueue, generatedPrompt]);
    showToast("Đã thêm vào danh sách chờ.");
  };

  const handleCopyPrompt = () => {
    if (!generatedPrompt && promptQueue.length === 0) return;
    
    let textToCopy = "";
    if (promptQueue.length > 0) {
        textToCopy = promptQueue.map((p, i) => `${i + 1}. ${p}`).join("\n\n");
        // Also add the current generated prompt if it's not already in the queue
        if (generatedPrompt && !promptQueue.includes(generatedPrompt)) {
            textToCopy += `\n\n${promptQueue.length + 1}. ${generatedPrompt}`;
        }
    } else {
      textToCopy = generatedPrompt;
    }

    navigator.clipboard.writeText(textToCopy);
    showToast("✓ Đã sao chép Prompt!");
  };

  const handleApplyLivePreview = () => {
    if (!selectedElement) return;
    try {
      // Determine elements to apply based on targetScope
      let targetElements: HTMLElement[] = [selectedElement];
      if (targetScope === "same-tag") {
        const tagName = selectedElement.tagName.toLowerCase();
        const parentSec = selectedElement.closest("section") || document.body;
        const matched = Array.from(parentSec.querySelectorAll(tagName)) as HTMLElement[];
        if (matched.length > 0) targetElements = matched;
      } else if (targetScope === "same-class") {
        const primaryClass = getClassString(selectedElement).split(" ")[0];
        if (primaryClass) {
          const matched = Array.from(document.querySelectorAll(`.${primaryClass}`)) as HTMLElement[];
          if (matched.length > 0) targetElements = matched;
        }
      } else if (targetScope === "parent-section") {
        const parentSec = selectedElement.closest("section") as HTMLElement;
        if (parentSec) targetElements = [parentSec];
      }

      targetElements.forEach((el) => {
        if (editTagText && targetScope === "self") {
          el.innerText = editTagText;
        }
        if (editClasses) {
          el.className = editClasses;
        }
        if (editImageSrc && el.tagName.toLowerCase() === "img") {
          el.setAttribute("src", editImageSrc);
        }
        if (editHref && el.tagName.toLowerCase() === "a") {
          el.setAttribute("href", editHref);
        }

        // Apply selected / modified CSS styles
        styleProperties.forEach((prop) => {
          if (prop.selected || prop.value !== prop.originalValue) {
            try {
              if (prop.id === "widthHeight") {
                const parts = prop.value.split("×").map((s) => s.trim());
                if (parts[0]) el.style.width = parts[0];
                if (parts[1]) el.style.height = parts[1];
              } else if (prop.cssKey && prop.cssKey in el.style) {
                (el.style as any)[prop.cssKey] = prop.value;
              }
            } catch {}
          }
        });
      });

      showToast(`✓ Đã xem thử trực tiếp trên ${targetElements.length} đối tượng!`);
    } catch {
      showToast("Không thể thay đổi trực tiếp phần tử này");
    }
  };

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      showToast("✓ Prompt đã được sao chép vào bộ nhớ tạm");
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleApplyLibraryPrompt = (p: LibraryPrompt) => {
    setInstruction(p.prompt);
    setActiveTab("generator");
    showToast(`✓ Đã nạp prompt: "${p.title}"`);
  };

  const handleCopyLibraryPrompt = (p: LibraryPrompt) => {
    navigator.clipboard.writeText(p.prompt);
    showToast(`✓ Đã sao chép prompt: "${p.title}"`);
  };

  const getFilteredLibraryPrompts = () => {
    let result: { category: PromptCategory; prompt: LibraryPrompt; isCustom?: boolean; customId?: string }[] = [];

    if (selectedCategory === "my_saved" || selectedCategory === "all") {
      customInstructionPresets.forEach((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.instruction.toLowerCase().includes(searchQuery.toLowerCase());
        if (matchesSearch) {
          result.push({
            category: {
              id: "my_saved",
              name: "Mẫu lưu sẵn của tôi",
              icon: Bookmark,
              color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
              prompts: []
            },
            prompt: {
              id: item.id,
              title: item.title,
              desc: item.timestamp,
              prompt: item.instruction
            },
            isCustom: true,
            customId: item.id
          });
        }
      });
    }

    if (selectedCategory !== "my_saved") {
      PROMPT_LIBRARY.forEach((cat) => {
        if (selectedCategory !== "all" && cat.id !== selectedCategory) return;

        cat.prompts.forEach((p) => {
          const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.prompt.toLowerCase().includes(searchQuery.toLowerCase());

          if (matchesSearch) {
            result.push({ category: cat, prompt: p });
          }
        });
      });
    }

    return result;
  };

  const filteredLibrary = getFilteredLibraryPrompts();

  return createPortal(
    <>
      {isSelectMode && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.05)",
            pointerEvents: "none",
            zIndex: 999998,
          }}
        >
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-slate-200 bg-white/95 px-6 py-3 text-slate-800 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-[#12161C]/95 dark:text-slate-100">
            <MousePointerClick
              size={20}
              className="animate-bounce text-blue-500"
            />
            <span className="text-sm font-semibold">
              Chọn thành phần cần chỉnh sửa (Nhấn ESC để thoát)
            </span>
          </div>
        </div>
      )}

      {isSelectMode && hoveredElement && (
        <div
          style={{
            position: "fixed",
            top: hoveredElement.getBoundingClientRect().top,
            left: hoveredElement.getBoundingClientRect().left,
            width: hoveredElement.getBoundingClientRect().width,
            height: hoveredElement.getBoundingClientRect().height,
            border: "2px solid #2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            pointerEvents: "none",
            zIndex: 999999,
            transition: "all 0.1s ease-out",
            boxShadow: "0 0 12px rgba(37, 99, 235, 0.2)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -26,
              left: -2,
              background: "#2563eb",
              color: "white",
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "4px 4px 4px 0",
              whiteSpace: "nowrap",
              fontWeight: "600",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            {hoveredElement.tagName.toLowerCase()}
            {hoveredElement.id ? `#${hoveredElement.id}` : ""}
            {hoveredElement.getAttribute("class")
              ? `.${hoveredElement.getAttribute("class")?.split(" ")[0]}`
              : ""}
          </div>
        </div>
      )}

      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Backdrop for 70% Popup */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPanelOpen(false)}
              className="fixed inset-0 z-[999998] bg-slate-950/50 backdrop-blur-xs"
            />

            {/* Centered Popup Dialog - Optimized Ergonomic Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: "-48%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.96, y: "-48%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-1/2 left-1/2 z-[999999] flex h-[88vh] max-h-[860px] w-[95vw] sm:w-[90vw] md:w-[86vw] lg:w-[860px] max-w-[900px] -translate-x-1/2 flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 font-sans text-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0B0D10]/95 dark:text-slate-100"
            >
              {/* Header */}
              <div className="flex shrink-0 flex-col border-b border-slate-200/60 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-[#12161C]/60">
                <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                      <Wand2 size={18} />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold tracking-wide text-slate-900 dark:text-white">
                        X-RAY PROMPT &amp; ELEMENT INSPECTOR
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Kiểm tra phần tử trực quan &amp; Sinh câu lệnh Prompt AI chuẩn xác
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Theme Mode Toggle Buttons */}
                    <div className="flex items-center rounded-xl border border-slate-200/60 bg-slate-100/80 p-1 dark:border-white/5 dark:bg-[#181D24]">
                      <button
                        onClick={() => changeTheme("light")}
                        className={`cursor-pointer rounded-lg p-1.5 transition-colors ${themeMode === "light" ? "bg-white text-amber-500 shadow-xs dark:bg-[#222934]" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
                        title="Chế độ Sáng (Light Mode)"
                      >
                        <Sun size={14} />
                      </button>
                      <button
                        onClick={() => changeTheme("dark")}
                        className={`cursor-pointer rounded-lg p-1.5 transition-colors ${themeMode === "dark" ? "bg-white text-blue-500 shadow-xs dark:bg-[#222934]" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
                        title="Chế độ Tối (Dark Mode)"
                      >
                        <Moon size={14} />
                      </button>
                      <button
                        onClick={() => changeTheme("system")}
                        className={`cursor-pointer rounded-lg p-1.5 transition-colors ${themeMode === "system" ? "bg-white text-violet-500 shadow-xs dark:bg-[#222934]" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
                        title="Đồng bộ Hệ thống (Auto Sync)"
                      >
                        <Monitor size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => setIsPanelOpen(false)}
                      className="cursor-pointer rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5 dark:hover:text-slate-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-2 px-5 pb-3 sm:px-6">
                  <button
                    onClick={() => setActiveTab("generator")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${activeTab === "generator" ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/15" : "border-slate-200/60 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/5 dark:bg-[#12161C] dark:text-slate-400 dark:hover:bg-[#181D24]"}`}
                  >
                    <Wand2 size={14} />
                    <span>X-Ray &amp; Tạo Prompt</span>
                    {selectedElement && (
                      <span className="ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        Đã chọn &lt;{selectedElement.tagName.toLowerCase()}&gt;
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("library")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${activeTab === "library" ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/15" : "border-slate-200/60 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/5 dark:bg-[#12161C] dark:text-slate-400 dark:hover:bg-[#181D24]"}`}
                  >
                    <BookOpen size={14} />
                    <span>Kho Prompt Mẫu</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
                {activeTab === "generator" && (
                  /* TAB 1: AUTO PROMPT GENERATOR + INTEGRATED INSPECTOR */
                  <div className="animate-fadeIn space-y-4">
                    {selectedElement ? (
                      <>
                        {/* 1. Element Summary Banner & Hierarchy Toggle */}
                        <div className="rounded-2xl border border-blue-500/25 bg-blue-50/40 p-4 shadow-xs dark:border-blue-500/20 dark:bg-blue-950/20">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-500/15 pb-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-black tracking-wider text-white uppercase shadow-xs">
                                <Code size={12} />
                                &lt;{selectedElement.tagName.toLowerCase()}&gt;
                              </span>
                              <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-300">
                                {getElementMetadata(selectedElement).targetStr}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setShowDomHierarchy(!showDomHierarchy)}
                                className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold transition-all ${showDomHierarchy ? "border-violet-500 bg-violet-600 text-white" : "border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#181D24] dark:text-slate-300"}`}
                              >
                                <Layers size={13} className={showDomHierarchy ? "text-white" : "text-violet-500"} />
                                <span>Phả hệ DOM ({elementHierarchy.length + elementChildren.length})</span>
                                {showDomHierarchy ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                              </button>

                              <button
                                onClick={() => {
                                  setIsSelectMode(true);
                                  setIsPanelOpen(false);
                                }}
                                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700"
                              >
                                <MousePointerClick size={13} />
                                Chọn đối tượng khác
                              </button>
                            </div>
                          </div>

                          {/* Location / Context Details Badges */}
                          <div className="mt-3 grid grid-cols-1 gap-2 text-xs font-medium sm:grid-cols-3">
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/90 px-3 py-2 dark:border-white/5 dark:bg-[#151921]/90">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Trang:</span>
                              <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
                                {getElementMetadata(selectedElement).page}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/90 px-3 py-2 dark:border-white/5 dark:bg-[#151921]/90">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Section:</span>
                              <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
                                {getElementMetadata(selectedElement).section}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/90 px-3 py-2 dark:border-white/5 dark:bg-[#151921]/90">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Component:</span>
                              <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
                                {getElementMetadata(selectedElement).component}
                              </span>
                            </div>
                          </div>

                          {/* Expandable DOM Hierarchy */}
                          {showDomHierarchy && (
                            <div className="mt-3 space-y-2.5 rounded-xl border border-slate-200/60 bg-white/95 p-3 dark:border-white/10 dark:bg-[#12161C]/95 animate-fadeIn">
                              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Phần tử cha:</span>
                                {elementHierarchy.length > 0 ? (
                                  elementHierarchy.map((ancestor, idx) => (
                                    <React.Fragment key={idx}>
                                      <button
                                        onClick={() => handleSelectSubElement(ancestor)}
                                        className="flex cursor-pointer items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700 dark:border-white/10 dark:bg-[#181D24] dark:text-slate-300"
                                      >
                                        &lt;{ancestor.tagName.toLowerCase()}&gt;
                                        {ancestor.id && <span className="text-slate-400">#{ancestor.id}</span>}
                                      </button>
                                      <ChevronRight size={11} className="text-slate-300 dark:text-slate-600" />
                                    </React.Fragment>
                                  ))
                                ) : (
                                  <span className="text-[11px] text-slate-400">(Không có)</span>
                                )}
                                <span className="rounded-md bg-blue-600 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                                  &lt;{selectedElement.tagName.toLowerCase()}&gt; (Hiện tại)
                                </span>
                              </div>

                              {elementChildren.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-200/50 pt-2 text-xs dark:border-white/5">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                                    Thành phần con ({elementChildren.length}):
                                  </span>
                                  {elementChildren.slice(0, 8).map((child, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleSelectSubElement(child)}
                                      className="flex cursor-pointer items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:bg-[#181D24] dark:text-slate-300"
                                    >
                                      &lt;{child.tagName.toLowerCase()}&gt;
                                      {child.id && <span className="text-slate-400">#{child.id}</span>}
                                    </button>
                                  ))}
                                  {elementChildren.length > 8 && (
                                    <span className="text-[10px] text-slate-400">+{elementChildren.length - 8} mục khác</span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* 2. Mục Áp Dụng Cho Đối Tượng (Phạm Vi Chỉnh Sửa) */}
                        <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-2xs dark:border-white/5 dark:bg-[#151921]/80">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                              <Target size={13} className="text-blue-500" />
                              <span>Áp Dụng Cho Đối Tượng (Phạm Vi)</span>
                            </label>
                            <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                              {targetScope === "self" && "Chỉ riêng phần tử này"}
                              {targetScope === "same-tag" && `Tất cả thẻ <${selectedElement.tagName.toLowerCase()}>`}
                              {targetScope === "same-class" && "Cùng Class / Component"}
                              {targetScope === "parent-section" && "Toàn bộ Section"}
                              {targetScope === "entire-page" && "Toàn bộ trang"}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            <button
                              type="button"
                              onClick={() => setTargetScope("self")}
                              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                                targetScope === "self"
                                  ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-100 ring-1 ring-blue-500/20"
                                  : "border-slate-200/70 bg-slate-50/50 hover:bg-white text-slate-700 dark:border-white/5 dark:bg-[#12161C]/50 dark:hover:bg-[#181D24] dark:text-slate-300"
                              }`}
                            >
                              <div className={`mt-0.5 rounded-lg p-1.5 ${targetScope === "self" ? "bg-blue-600 text-white" : "bg-slate-200/70 text-slate-600 dark:bg-white/10 dark:text-slate-400"}`}>
                                <Target size={14} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-bold truncate">1. Chỉ phần tử này</span>
                                <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  Chính xác &lt;{selectedElement.tagName.toLowerCase()}{selectedElement.id ? `#${selectedElement.id}` : ""}&gt;
                                </span>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setTargetScope("same-tag")}
                              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                                targetScope === "same-tag"
                                  ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-100 ring-1 ring-blue-500/20"
                                  : "border-slate-200/70 bg-slate-50/50 hover:bg-white text-slate-700 dark:border-white/5 dark:bg-[#12161C]/50 dark:hover:bg-[#181D24] dark:text-slate-300"
                              }`}
                            >
                              <div className={`mt-0.5 rounded-lg p-1.5 ${targetScope === "same-tag" ? "bg-blue-600 text-white" : "bg-slate-200/70 text-slate-600 dark:bg-white/10 dark:text-slate-400"}`}>
                                <FileCode size={14} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-bold truncate">2. Thẻ cùng loại</span>
                                <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  Tất cả thẻ &lt;{selectedElement.tagName.toLowerCase()}&gt; trong khối
                                </span>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setTargetScope("same-class")}
                              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                                targetScope === "same-class"
                                  ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-100 ring-1 ring-blue-500/20"
                                  : "border-slate-200/70 bg-slate-50/50 hover:bg-white text-slate-700 dark:border-white/5 dark:bg-[#12161C]/50 dark:hover:bg-[#181D24] dark:text-slate-300"
                              }`}
                            >
                              <div className={`mt-0.5 rounded-lg p-1.5 ${targetScope === "same-class" ? "bg-blue-600 text-white" : "bg-slate-200/70 text-slate-600 dark:bg-white/10 dark:text-slate-400"}`}>
                                <Boxes size={14} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-bold truncate">3. Cùng Class / Kiểu</span>
                                <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  Mọi thành phần có style tương tự
                                </span>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setTargetScope("parent-section")}
                              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                                targetScope === "parent-section"
                                  ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-100 ring-1 ring-blue-500/20"
                                  : "border-slate-200/70 bg-slate-50/50 hover:bg-white text-slate-700 dark:border-white/5 dark:bg-[#12161C]/50 dark:hover:bg-[#181D24] dark:text-slate-300"
                              }`}
                            >
                              <div className={`mt-0.5 rounded-lg p-1.5 ${targetScope === "parent-section" ? "bg-blue-600 text-white" : "bg-slate-200/70 text-slate-600 dark:bg-white/10 dark:text-slate-400"}`}>
                                <Layers size={14} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-bold truncate">4. Toàn bộ Section</span>
                                <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  Khối cha ({getElementMetadata(selectedElement).section})
                                </span>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setTargetScope("entire-page")}
                              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all sm:col-span-2 lg:col-span-2 ${
                                targetScope === "entire-page"
                                  ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-100 ring-1 ring-blue-500/20"
                                  : "border-slate-200/70 bg-slate-50/50 hover:bg-white text-slate-700 dark:border-white/5 dark:bg-[#12161C]/50 dark:hover:bg-[#181D24] dark:text-slate-300"
                              }`}
                            >
                              <div className={`mt-0.5 rounded-lg p-1.5 ${targetScope === "entire-page" ? "bg-blue-600 text-white" : "bg-slate-200/70 text-slate-600 dark:bg-white/10 dark:text-slate-400"}`}>
                                <Globe size={14} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-bold truncate">5. Toàn bộ trang hiện tại</span>
                                <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  Đồng bộ giao diện toàn trang ({getElementMetadata(selectedElement).page})
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* 3. Nhóm Chế Độ & Mô Tả Yêu Cầu Chỉnh Sửa (Hợp Nhất) */}
                        <div className="space-y-3.5 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-2xs dark:border-white/5 dark:bg-[#151921]/80">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3 dark:border-white/10">
                            <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                              <Sparkles size={13} className="text-amber-500" />
                              <span>Chế Độ &amp; Tùy Chỉnh Yêu Cầu</span>
                            </label>

                            {/* Mode Pill Switcher */}
                            <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-[#12161C] border border-slate-200/60 dark:border-white/5">
                              <button
                                type="button"
                                onClick={() => setEditType("custom")}
                                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                                  editType === "custom"
                                    ? "bg-white text-blue-700 shadow-xs dark:bg-[#1e2530] dark:text-blue-300"
                                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                              >
                                <Edit3 size={12} />
                                <span>Tùy chỉnh theo mô tả</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setEditType("preset")}
                                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                                  editType === "preset"
                                    ? "bg-white text-blue-700 shadow-xs dark:bg-[#1e2530] dark:text-blue-300"
                                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                              >
                                <Copy size={12} />
                                <span>Áp dụng format giống</span>
                              </button>
                            </div>
                          </div>

                          {/* Dynamic Content Based on Selected Mode */}
                          {editType === "custom" ? (
                            /* Mode 1: TÙY CHỈNH THEO MÔ TẢ */
                            <div className="space-y-3 animate-fadeIn">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                  Nội dung mô tả yêu cầu:
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={handleSaveInstructionPreset}
                                    className="flex cursor-pointer items-center gap-1 text-[11px] font-bold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400"
                                  >
                                    <Bookmark size={12} />
                                    <span>Lưu mẫu này</span>
                                  </button>
                                  <span className="text-slate-300 dark:text-slate-600">|</span>
                                  <button
                                    type="button"
                                    onClick={() => setShowInstructionPresets(!showInstructionPresets)}
                                    className="flex cursor-pointer items-center gap-1 text-[11px] font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
                                  >
                                    <span>{showInstructionPresets ? "Đóng mẫu" : `Mẫu lưu sẵn (${customInstructionPresets.length})`}</span>
                                  </button>
                                </div>
                              </div>

                              {showInstructionPresets && (
                                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-2.5 dark:border-blue-900/50 dark:bg-blue-900/20 max-h-36 overflow-y-auto custom-scrollbar animate-fadeIn">
                                  {customInstructionPresets.length > 0 ? (
                                    <div className="space-y-1.5">
                                      {customInstructionPresets.map((preset) => (
                                        <div
                                          key={preset.id}
                                          className="flex items-center justify-between rounded-lg p-2 hover:bg-white/80 dark:hover:bg-black/30 cursor-pointer group"
                                          onClick={() => {
                                            setInstruction(preset.instruction);
                                            setShowInstructionPresets(false);
                                          }}
                                        >
                                          <div className="truncate pr-3">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{preset.title}</p>
                                            <p className="text-[10px] text-slate-400 truncate">{preset.instruction}</p>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={(e) => handleDeleteInstructionPreset(preset.id, e)}
                                            className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                          >
                                            <X size={13} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-xs text-slate-500 p-2 text-center">Chưa có mẫu mô tả nào được lưu.</div>
                                  )}
                                </div>
                              )}

                              <div className="relative">
                                <textarea
                                  value={instruction}
                                  onChange={(e) => setInstruction(e.target.value)}
                                  className="h-24 w-full resize-none rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 text-xs leading-relaxed font-medium transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-[#12161C]/80 dark:focus:border-blue-500 dark:focus:bg-[#181D24]"
                                  placeholder="Nhập mô tả yêu cầu chỉnh sửa chi tiết của bạn vào đây..."
                                />
                                {instruction && (
                                  <button
                                    type="button"
                                    onClick={() => setInstruction("")}
                                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                                    title="Xóa văn bản"
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                              </div>

                              {/* Quick Selection Dropdowns */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div className="relative">
                                  <select
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        setInstruction((prev) => e.target.value + (prev ? " " + prev : ""));
                                        e.target.value = "";
                                      }
                                    }}
                                    className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200/80 bg-slate-50 py-2.5 pr-8 pl-3 text-xs font-bold text-slate-700 outline-none transition-all hover:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-[#12161C] dark:text-slate-300 dark:hover:bg-[#181D24]"
                                  >
                                    <option value="">🛠️ Chọn Loại chỉnh sửa nhanh...</option>
                                    <option value="Yêu cầu: Xóa đối tượng này khỏi giao diện.">🗑️ Xóa đối tượng</option>
                                    <option value="Yêu cầu: Thêm đối tượng mới tương tự vào vị trí này.">➕ Thêm đối tượng</option>
                                    <option value="Yêu cầu: Áp dụng định dạng (format/style) giống với đối tượng này.">🎨 Áp dụng giống format</option>
                                    <option value="Yêu cầu: Thay đổi nội dung chữ (text).">✍️ Thay đổi nội dung chữ</option>
                                    <option value="Yêu cầu: Căn chỉnh lại khoảng cách, margin, padding.">📐 Điều chỉnh khoảng cách</option>
                                    <option value="Yêu cầu: Thay đổi màu sắc (nền, chữ, viền).">🖌️ Đổi màu sắc / CSS</option>
                                    <option value="Yêu cầu: Thêm hiệu ứng di chuột (hover).">✨ Thêm hiệu ứng Hover</option>
                                    <option value="Yêu cầu: Ẩn đối tượng này trên giao diện điện thoại (mobile).">📱 Ẩn trên Mobile</option>
                                  </select>
                                  <ChevronDown size={14} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400" />
                                </div>

                                <div className="relative">
                                  <select
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        setInstruction((prev) => (prev ? prev + (prev.endsWith(" ") ? "" : " ") + e.target.value : e.target.value));
                                        e.target.value = "";
                                      }
                                    }}
                                    className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200/80 bg-slate-50 py-2.5 pr-8 pl-3 text-xs font-bold text-slate-700 outline-none transition-all hover:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-[#12161C] dark:text-slate-300 dark:hover:bg-[#181D24]"
                                  >
                                    <option value="">✨ Thêm nhanh tùy chỉnh thiết kế...</option>
                                    <option value="Thêm hiệu ứng kính mờ (Glassmorphism) sang trọng với backdrop-blur.">✨ Glassmorphism (Hiệu ứng kính mờ)</option>
                                    <option value="Áp dụng đổ bóng 3D nổi (Neumorphism) tinh tế.">☁️ Neumorphism (Đổ bóng 3D)</option>
                                    <option value="Thiết kế tối giản (Minimalist), tăng khoảng trắng (negative space).">⬜ Minimalist (Tối giản &amp; Khoảng trắng)</option>
                                    <option value="Sử dụng bố cục Bento Grid bất đối xứng.">🍱 Bento Grid (Lưới bất đối xứng)</option>
                                    <option value="Sử dụng Font chữ to, in đậm, độ tương phản cao.">🔠 Brutalism Typography (Chữ to, in đậm)</option>
                                    <option value="Thêm hiệu ứng hover mượt mà và các micro-interactions tinh tế.">🖱️ Micro-interactions (Hover mượt mà)</option>
                                    <option value="Sử dụng màu Gradient nổi bật và đổ bóng phát sáng (Neon Glow).">🌈 Gradient &amp; Neon Glow</option>
                                    <option value="Tối ưu giao diện cho Dark Mode (nền đen sâu, viền mờ).">🌙 Dark Mode Optimized (Tối ưu nền tối)</option>
                                    <option value="Làm bo tròn góc mềm mại (pill-shape hoặc rounded-2xl).">🟡 Rounded (Bo tròn góc mềm mại)</option>
                                    <option value="Giao diện dạng thẻ (Card-based UI) với viền mỏng và đổ bóng nhẹ.">💳 Card-based UI (Giao diện dạng thẻ)</option>
                                  </select>
                                  <ChevronDown size={14} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Mode 2: ÁP DỤNG FORMAT GIỐNG */
                            <div className="space-y-3.5 animate-fadeIn">
                              <div className="rounded-xl border border-blue-500/25 bg-blue-50/40 p-3.5 shadow-xs dark:border-blue-500/20 dark:bg-blue-950/20">
                                <span className="block text-xs font-bold text-blue-900 dark:text-blue-200 mb-2">
                                  Lưu format hiện tại từ &lt;{selectedElement.tagName.toLowerCase()}&gt;:
                                </span>
                                <div className="flex flex-wrap items-center gap-2">
                                  <input
                                    type="text"
                                    value={formatPresetName}
                                    onChange={(e) => setFormatPresetName(e.target.value)}
                                    placeholder="Tên format (vd: Thẻ Card Kính Mờ, Button Bo Góc)..."
                                    className="flex-1 rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs font-medium outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#12161C]"
                                  />
                                  <button
                                    type="button"
                                    onClick={handleSaveFormat}
                                    className="cursor-pointer rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-all"
                                  >
                                    Lưu Format Hiện Tại
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                  Chọn format đã lưu để áp dụng nhanh:
                                </span>
                                {savedFormats.length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {savedFormats.map((preset) => (
                                      <div
                                        key={preset.id}
                                        onClick={() => {
                                          setAppliedPresetId(preset.id);
                                          handleApplyFormatPreset(preset);
                                        }}
                                        className={`group flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                                          appliedPresetId === preset.id
                                            ? "border-blue-600 bg-blue-600 text-white shadow-xs"
                                            : "border-slate-200 bg-white hover:border-blue-500/50 dark:border-white/10 dark:bg-[#181D24] text-slate-700 dark:text-slate-200"
                                        }`}
                                      >
                                        <span className="font-semibold">{preset.name}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${appliedPresetId === preset.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400"}`}>
                                          &lt;{preset.tagName}&gt;
                                        </span>
                                        <button
                                          type="button"
                                          onClick={(e) => handleDeletePreset(preset.id, e)}
                                          className="text-slate-400 hover:text-red-500 opacity-60 group-hover:opacity-100 cursor-pointer ml-1"
                                          title="Xóa mẫu format này"
                                        >
                                          <X size={13} />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-white/10">
                                    Chưa có mẫu format nào được lưu. Bạn có thể nhấn "Lưu Format Hiện Tại" ở trên để tạo mẫu đầu tiên!
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 4. Collapsible Advanced Style Inspector & Live Preview */}
                        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-2xs dark:border-white/5 dark:bg-[#151921]/80">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setShowAdvancedStyles(!showAdvancedStyles)}
                              className="flex cursor-pointer items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300"
                            >
                              <Sliders size={14} className="text-blue-500" />
                              <span>Thuộc tính &amp; Xem thử trực tiếp (CSS, HTML, Màu nền)</span>
                              {showAdvancedStyles ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            <button
                              onClick={handleApplyLivePreview}
                              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 transition-all hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-900/50"
                              title="Áp dụng thay đổi trực tiếp lên giao diện hiện tại"
                            >
                              <Eye size={13} />
                              <span>Xem thử Live</span>
                            </button>
                          </div>

                          {showAdvancedStyles && (
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-slate-200/60 pt-4 dark:border-white/10 animate-fadeIn">
                              {/* Cột 1: Thuộc tính HTML & Classes */}
                              <div className="space-y-3 text-xs">
                                <div className="space-y-1">
                                  <label className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                                    <Type size={12} /> Nội dung văn bản (Text)
                                  </label>
                                  <textarea
                                    value={editTagText}
                                    onChange={(e) => setEditTagText(e.target.value)}
                                    rows={2}
                                    className="w-full rounded-xl border border-slate-200/60 bg-slate-50/80 p-2.5 text-xs font-medium transition-all outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/5 dark:bg-[#12161C]/80"
                                    placeholder="Nhập nội dung mới..."
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                                    <Code size={12} /> Lớp Tailwind CSS
                                  </label>
                                  <textarea
                                    value={editClasses}
                                    onChange={(e) => setEditClasses(e.target.value)}
                                    rows={2}
                                    className="w-full rounded-xl border border-slate-200/60 bg-slate-50/80 p-2.5 font-mono text-xs transition-all outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/5 dark:bg-[#12161C]/80"
                                    placeholder="Nhập class Tailwind..."
                                  />
                                </div>

                                {(selectedElement.tagName.toLowerCase() === "img" || editImageSrc) && (
                                  <div className="space-y-1">
                                    <label className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                                      <ImageIcon size={12} /> Image Src
                                    </label>
                                    <input
                                      type="text"
                                      value={editImageSrc}
                                      onChange={(e) => setEditImageSrc(e.target.value)}
                                      className="w-full rounded-xl border border-slate-200/60 bg-slate-50/80 p-2 font-mono text-xs transition-all outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/5 dark:bg-[#12161C]/80"
                                    />
                                  </div>
                                )}
                                {(selectedElement.tagName.toLowerCase() === "a" || editHref) && (
                                  <div className="space-y-1">
                                    <label className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                                      <LinkIcon size={12} /> Href Link
                                    </label>
                                    <input
                                      type="text"
                                      value={editHref}
                                      onChange={(e) => setEditHref(e.target.value)}
                                      className="w-full rounded-xl border border-slate-200/60 bg-slate-50/80 p-2 font-mono text-xs transition-all outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/5 dark:bg-[#12161C]/80"
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Cột 2: Màu nền, Hiệu ứng & Computed CSS */}
                              <div className="space-y-3 text-xs">
                                <div className="space-y-1">
                                  <label className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                                    <CheckSquare size={12} className="text-blue-500" />
                                    Màu Nền &amp; Độ Mờ
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="color"
                                      value={bgColor}
                                      onChange={(e) => setBgColor(e.target.value)}
                                      className="h-8 w-12 cursor-pointer rounded-lg border border-slate-200/60 p-0.5 outline-none dark:border-white/10"
                                    />
                                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200/60 bg-slate-50/80 px-2.5 py-1 dark:border-white/5 dark:bg-[#12161C]/80">
                                      <span className="text-slate-500 text-[11px]">Độ mờ:</span>
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={bgOpacity}
                                        onChange={(e) => setBgOpacity(e.target.value)}
                                        className="flex-1"
                                      />
                                      <span className="w-8 text-right font-mono text-[11px]">{bgOpacity}%</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                                    <Wand2 size={12} /> Hiệu ứng (Effect)
                                  </label>
                                  <select
                                    value={effectType}
                                    onChange={(e) => setEffectType(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200/60 bg-slate-50/80 p-2 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/5 dark:bg-[#12161C]/80 dark:text-white"
                                  >
                                    <option value="none">Không có (None)</option>
                                    <option value="shadow-sm">Đổ bóng nhỏ (Shadow sm)</option>
                                    <option value="shadow-md">Đổ bóng vừa (Shadow md)</option>
                                    <option value="shadow-lg">Đổ bóng lớn (Shadow lg)</option>
                                    <option value="shadow-xl">Đổ bóng rất lớn (Shadow xl)</option>
                                    <option value="glow">Phát sáng (Glow)</option>
                                    <option value="glass">Kính mờ (Glassmorphism)</option>
                                  </select>
                                </div>

                                <div className="pt-1">
                                  <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                    <span>CSS Computed Properties</span>
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => handleSelectAllStyles(true)} className="rounded px-1.5 py-0.5 hover:bg-slate-200 text-[10px] dark:hover:bg-white/10">All</button>
                                      <button onClick={() => handleSelectAllStyles(false)} className="rounded px-1.5 py-0.5 hover:bg-slate-200 text-[10px] dark:hover:bg-white/10">None</button>
                                    </div>
                                  </div>
                                  <div className="custom-scrollbar flex max-h-32 flex-col gap-1.5 overflow-y-auto pr-1">
                                    {styleProperties.map((prop) => (
                                      <div key={prop.id} className="flex items-center justify-between rounded-lg border border-slate-200/60 bg-slate-50/50 px-2.5 py-1 text-[11px] dark:border-white/5 dark:bg-[#181D24]/50">
                                        <label className="flex cursor-pointer items-center gap-1.5 truncate">
                                          <input
                                            type="checkbox"
                                            checked={prop.selected}
                                            onChange={() => handleToggleStyleSelect(prop.id)}
                                            className="h-3 w-3 rounded border-slate-300"
                                          />
                                          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{prop.label}</span>
                                        </label>
                                        <input
                                          type="text"
                                          value={prop.value}
                                          onChange={(e) => handleUpdateStyleValue(prop.id, e.target.value)}
                                          className="w-28 rounded bg-white px-1.5 py-0.5 font-mono text-[10px] outline-none border border-slate-200 dark:border-white/10 dark:bg-[#12161C]"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 5. Tạo Prompt & Danh Sách Chờ */}
                        <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-2xs dark:border-white/5 dark:bg-[#151921]/80">
                          <button
                            onClick={handleGenerate}
                            className="w-full cursor-pointer rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.99]"
                          >
                            Tạo Prompt
                          </button>

                          {(generatedPrompt || promptQueue.length > 0) && (
                            <div className="space-y-2.5 border-t border-slate-200/60 pt-3 dark:border-white/10 animate-fadeIn">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                  Prompt &amp; Danh Sách Chờ ({promptQueue.length + (generatedPrompt && !promptQueue.includes(generatedPrompt) ? 1 : 0)})
                                </label>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={handleAddToQueue}
                                    className="cursor-pointer text-[11px] font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                                  >
                                    + Thêm vào danh sách chờ
                                  </button>
                                  <span className="text-slate-300 dark:text-slate-600">|</span>
                                  <button
                                    onClick={handleCopyPrompt}
                                    className="flex cursor-pointer items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                                  >
                                    <Copy size={12} />
                                    <span>Copy {promptQueue.length > 0 ? "Tất Cả" : "Prompt"}</span>
                                  </button>
                                </div>
                              </div>

                              <div className="relative">
                                <pre className="custom-scrollbar max-h-36 w-full overflow-y-auto rounded-xl border border-slate-800 bg-[#0F172A] p-3 text-xs leading-relaxed whitespace-pre-wrap text-slate-200 shadow-inner dark:bg-black">
                                  {promptQueue.length > 0 ? (
                                    <>
                                      {promptQueue.map((p, i) => (
                                        <div key={i} className="mb-2 pb-2 border-b border-slate-800 last:border-0 last:mb-0 last:pb-0">
                                          <span className="text-blue-400 font-bold mr-1">{i + 1}.</span> {p}
                                        </div>
                                      ))}
                                      {generatedPrompt && !promptQueue.includes(generatedPrompt) && (
                                        <div>
                                          <span className="text-emerald-400 font-bold mr-1">{promptQueue.length + 1}.</span> {generatedPrompt}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    generatedPrompt
                                  )}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      /* Empty State: Chưa chọn phần tử */
                      <div className="flex flex-col items-center justify-center gap-3.5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center dark:border-white/5 dark:bg-[#12161C]/30">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                          <MousePointerClick size={32} className="animate-bounce" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-slate-800 dark:text-white">
                            Chưa chọn đối tượng nào trên giao diện
                          </h3>
                          <p className="max-w-md text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                            Nhấn nút bên dưới hoặc phím <kbd className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">X</kbd> trên bàn phím, sau đó click chuột vào bất kỳ phần tử nào trên website để kiểm tra và sinh prompt AI.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setIsSelectMode(true);
                            setIsPanelOpen(false);
                          }}
                          className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
                        >
                          <MousePointerClick size={15} />
                          <span>Chọn đối tượng ngay (Phím X)</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "library" && (
                  /* TAB 2: PROMPT LIBRARY (KHO PROMPT HỖ TRỢ) */
                  <div className="animate-fadeIn space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm mẫu prompt hỗ trợ..."
                        className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 py-2.5 pr-4 pl-11 text-xs font-medium transition-all outline-none placeholder:text-slate-400 hover:bg-white focus:ring-2 focus:ring-blue-500/30 dark:border-white/5 dark:bg-[#12161C]/80 dark:hover:bg-[#181D24]"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Categories Scrolling Badges */}
                    <div className="-mx-1 flex shrink-0 scrollbar-none gap-1.5 overflow-x-auto px-1 pb-1">
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === "all" ? "border-slate-900 bg-slate-900 text-white shadow-xs dark:border-white dark:bg-white dark:text-slate-900" : "border-slate-200/80 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/5 dark:bg-[#12161C] dark:text-slate-400 dark:hover:bg-[#181D24]"}`}
                      >
                        Tất cả
                      </button>
                      <button
                        onClick={() => setSelectedCategory("my_saved")}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === "my_saved" ? "border-emerald-600 bg-emerald-600 text-white shadow-xs" : "border-emerald-200/60 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:border-emerald-900/35 dark:text-emerald-300"}`}
                      >
                        <Bookmark size={12} />
                        Mẫu của tôi ({customInstructionPresets.length})
                      </button>
                      {PROMPT_LIBRARY.map((cat) => {
                        const CatIcon = cat.icon;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id ? "border-blue-600 bg-blue-600 text-white shadow-xs" : "border-slate-200/80 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/5 dark:bg-[#12161C] dark:text-slate-400 dark:hover:bg-[#181D24]"}`}
                          >
                            <CatIcon size={12} />
                            {cat.name}
                          </button>
                        );
                      })}
                    </div>

                    {/* List of prompts */}
                    <div className="custom-scrollbar max-h-[460px] space-y-3 overflow-y-auto pr-1">
                      {filteredLibrary.length > 0 ? (
                        filteredLibrary.map(({ category, prompt, isCustom, customId }) => {
                          const CatIcon = category.icon;
                          const isExpanded = expandedPromptId === prompt.id;

                          return (
                            <div
                              key={prompt.id}
                              className="group flex flex-col gap-2.5 rounded-2xl border border-slate-200/60 bg-slate-50/60 p-4 shadow-2xs transition-all hover:border-blue-500/40 dark:border-white/5 dark:bg-[#12161C]/50 dark:hover:border-blue-500/30"
                            >
                              {/* Badge & Title */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`flex items-center gap-1 rounded-md border px-2 py-0.5 text-[9px] font-extrabold tracking-wider uppercase ${category.color}`}
                                    >
                                      <CatIcon size={10} />
                                      {category.name}
                                    </span>
                                  </div>
                                  <h4 className="pr-2 text-xs sm:text-[13px] leading-tight font-bold text-slate-800 dark:text-slate-100">
                                    {prompt.title}
                                  </h4>
                                </div>

                                <button
                                  onClick={() =>
                                    setExpandedPromptId(
                                      isExpanded ? null : prompt.id,
                                    )
                                  }
                                  className="cursor-pointer rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                  {isExpanded ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )}
                                </button>
                              </div>

                              {/* Description */}
                              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                {prompt.desc}
                              </p>

                              {/* Expanded prompt code view */}
                              {isExpanded && (
                                <div className="relative mt-1">
                                  <pre className="custom-scrollbar max-h-36 w-full overflow-x-auto overflow-y-auto rounded-xl border border-slate-200 bg-slate-100 p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-slate-600 shadow-inner dark:border-white/5 dark:bg-black/50 dark:text-slate-300">
                                    {prompt.prompt}
                                  </pre>
                                </div>
                              )}

                              {/* Card actions */}
                              <div className="mt-1 flex items-center justify-between border-t border-slate-200/50 pt-2.5 dark:border-white/5">
                                <div>
                                  {isCustom && customId && !customId.startsWith("inst_default_") && (
                                    <button
                                      onClick={(e) => handleDeleteInstructionPreset(customId, e)}
                                      className="flex cursor-pointer items-center gap-1 rounded-lg border border-rose-200/80 bg-rose-500/10 px-2.5 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-500/20 dark:border-rose-900/30 dark:text-rose-400"
                                    >
                                      <Trash2 size={11} /> Xóa mẫu
                                    </button>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      handleCopyLibraryPrompt(prompt)
                                    }
                                    className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200/80 px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                                  >
                                    <Copy size={11} />
                                    Sao chép
                                  </button>
                                  <button
                                    onClick={() =>
                                      isCustom
                                        ? handleApplyInstructionPreset(prompt.prompt)
                                        : handleApplyLibraryPrompt(prompt)
                                    }
                                    className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-blue-500/10 bg-blue-600/10 px-3 py-1.5 text-[11px] font-bold text-blue-500 transition-all hover:bg-blue-600/20"
                                  >
                                    <Sparkles size={11} />
                                    Nạp vào X-Ray
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex flex-col items-center gap-2 p-10 text-center text-slate-400">
                          <AlertCircle
                            size={24}
                            className="text-slate-300 dark:text-slate-600"
                          />
                          <span className="text-xs font-semibold">
                            Không tìm thấy mẫu prompt nào phù hợp.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer button for Generator Tab */}
              {activeTab === "generator" && generatedPrompt && (
                <div className="shrink-0 border-t border-slate-200/60 bg-white/60 p-3.5 backdrop-blur-md dark:border-white/10 dark:bg-[#12161C]/60">
                  <button
                    onClick={handleCopy}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.99] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  >
                    <Copy size={15} /> Copy Prompt To Clipboard
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed right-8 bottom-8 z-[9999999] flex items-center gap-3 rounded-[16px] border border-slate-700 bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-2xl dark:border-white dark:bg-white dark:text-slate-900"
          >
            <CheckCircle2
              size={18}
              className="text-emerald-400 dark:text-emerald-500"
            />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
