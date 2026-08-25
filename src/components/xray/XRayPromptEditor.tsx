import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Copy,
  Wand2,
  MousePointerClick,
  CheckCircle2,
  AlertTriangle,
  Check,
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
  Save,
  FolderTree,
  Share2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { DomTreeViewer } from "./DomTreeViewer";
import { ElementPropertiesPanel } from "./ElementPropertiesPanel";
import { WebsiteStructureTree, StructureNode } from "./WebsiteStructureTree";

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
  const [activeTab, setActiveTab] = useState<"generator" | "structure" | "library">("generator");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isSelectModePaused, setIsSelectModePaused] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  const [selectRect, setSelectRect] = useState<DOMRect | null>(null);
  const [stackedLayers, setStackedLayers] = useState<HTMLElement[]>([]);
  const [layerHoverRect, setLayerHoverRect] = useState<DOMRect | null>(null);
  const [isStackedWarningExpanded, setIsStackedWarningExpanded] = useState(false);

  useEffect(() => {
    if (selectedElement && isPanelOpen) {
      setSelectRect(selectedElement.getBoundingClientRect());
    } else {
      setSelectRect(null);
    }
  }, [selectedElement, isPanelOpen]);

  const [action, setAction] = useState(ACTIONS[0]);
  const [scope, setScope] = useState(SCOPES[0]);
  const [instruction, setInstruction] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  
  // New States for X-Ray Redesign
  const [editType, setEditType] = useState<"custom" | "preset">("custom");
  const [targetScope, setTargetScope] = useState<"self" | "same-tag" | "same-class" | "parent-section" | "entire-page">("self");
  const [normalizeAllPages, setNormalizeAllPages] = useState(false);
  const [requirementOption, setRequirementOption] = useState("chinh-sua");
  const [bgOpacity, setBgOpacity] = useState("100");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [effectType, setEffectType] = useState("none");
  const [promptQueue, setPromptQueue] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("xray_prompt_queue_saved");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [queueSelectedIds, setQueueSelectedIds] = useState<number[]>([]);
  const [showInstructionPresets, setShowInstructionPresets] = useState(false);
  const [showDomHierarchy, setShowDomHierarchy] = useState(false);
  const [showAdvancedStyles, setShowAdvancedStyles] = useState(false);
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);

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
    categoryId?: string;
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

  const [showPromptLibraryModal, setShowPromptLibraryModal] = useState(false);
  const [isObjOpen, setIsObjOpen] = useState(true);
  const [isPropOpen, setIsPropOpen] = useState(false); // Default collapsed for properties card
  const [isScopeOpen, setIsScopeOpen] = useState(true);
  const [isReqOpen, setIsReqOpen] = useState(true);
  const [isGenOpen, setIsGenOpen] = useState(true);
  const [selectedSaveCategory, setSelectedSaveCategory] = useState<string>("fix");

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
      categoryId: selectedSaveCategory
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

  const handleGeneratePromptForNodes = (nodes: StructureNode[], actionType: "custom" | "edit" | "add" | "delete") => {
    if (nodes.length === 0) return;
    const names = nodes.map(n => `"${n.name}" (${n.type}${n.selector ? `: ${n.selector}` : ""})`).join(", ");
    
    let p = "";
    if (actionType === "add") {
      p = `Hãy thêm các thành phần mới sau vào cấu trúc website: ${names}. Yêu cầu: thiết kế chuẩn Fluent UI, bố cục gọn gàng, không bo góc (rounded-none), màu nền đồng bộ với sidebar.`;
    } else if (actionType === "edit") {
      p = `Hãy chỉnh sửa và tối ưu hóa các thành phần sau trong cấu trúc website: ${names}. Cải thiện tính thẩm mỹ, độ tương phản và căn chỉnh nội dung trực quan.`;
    } else if (actionType === "delete") {
      p = `Yêu cầu xóa hoàn toàn các thành phần sau khỏi cấu trúc website: ${names}.`;
    } else {
      p = `Hãy tối ưu, hoàn thiện và đồng bộ các thành phần sau trong cấu trúc website: ${names}. Đảm bảo các khối thông tin hiển thị mạch lạc và phản hồi mượt mà trên mọi thiết bị.`;
    }
    
    setGeneratedPrompt(p);
    setLastPrompt(p);
    const updatedQueue = [...promptQueue, p];
    setPromptQueue(updatedQueue);
    try {
      localStorage.setItem("xray_prompt_queue_saved", JSON.stringify(updatedQueue));
    } catch {}
    showToast(`✓ Đã sinh Prompt cho ${nodes.length} mục cấu trúc website!`);
    setActiveTab("generator");
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("✓ Đã sao chép vào Clipboard!");
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
    // Detect all stacked layers at this element's bounding rect
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + Math.min(Math.max(rect.width / 2, 5), 80);
    const centerY = rect.top + Math.min(Math.max(rect.height / 2, 5), 80);
    if (centerX >= 0 && centerY >= 0 && centerX <= window.innerWidth && centerY <= window.innerHeight) {
      const raw = document.elementsFromPoint(centerX, centerY)
        .filter((e): e is HTMLElement => e instanceof HTMLElement && !isXRayElement(e) && e.tagName.toLowerCase() !== "html");
      const unique = Array.from(new Set(raw));
      if (!unique.includes(el)) {
        unique.unshift(el);
      }
      setStackedLayers(unique);
    } else {
      setStackedLayers([el]);
    }

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
          id: "fontWeight",
          label: "Độ đậm chữ (Font Weight)",
          cssKey: "fontWeight",
          value: cs.fontWeight || "400",
          originalValue: cs.fontWeight || "400",
          selected: false,
          type: "text",
          placeholder: "vd: 500, 600, bold",
        },
        {
          id: "lineHeight",
          label: "Chiều cao dòng (Line Height)",
          cssKey: "lineHeight",
          value: cs.lineHeight || "normal",
          originalValue: cs.lineHeight || "normal",
          selected: false,
          type: "text",
          placeholder: "vd: 1.5, 24px",
        },
        {
          id: "letterSpacing",
          label: "Khoảng cách chữ (Letter Spacing)",
          cssKey: "letterSpacing",
          value: cs.letterSpacing && cs.letterSpacing !== "normal" ? cs.letterSpacing : "0px",
          originalValue: cs.letterSpacing && cs.letterSpacing !== "normal" ? cs.letterSpacing : "0px",
          selected: false,
          type: "text",
          placeholder: "vd: 0.05em, 1px",
        },
        {
          id: "textAlign",
          label: "Căn lề chữ (Text Align)",
          cssKey: "textAlign",
          value: cs.textAlign || "left",
          originalValue: cs.textAlign || "left",
          selected: false,
          type: "text",
          placeholder: "vd: left, center, right",
        },
        {
          id: "textTransform",
          label: "Kiểu chữ (Text Transform)",
          cssKey: "textTransform",
          value: cs.textTransform || "none",
          originalValue: cs.textTransform || "none",
          selected: false,
          type: "text",
          placeholder: "vd: uppercase, capitalize",
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
          id: "borderWidth",
          label: "Độ rộng viền (Border Width)",
          cssKey: "borderWidth",
          value: cs.borderWidth || "0px",
          originalValue: cs.borderWidth || "0px",
          selected: false,
          type: "text",
          placeholder: "vd: 1px, 2px",
        },
        {
          id: "borderColor",
          label: "Màu viền (Border Color)",
          cssKey: "borderColor",
          value: cs.borderColor || "transparent",
          originalValue: cs.borderColor || "transparent",
          selected: false,
          type: "color",
          placeholder: "vd: #e2e8f0",
        },
        {
          id: "borderStyle",
          label: "Kiểu viền (Border Style)",
          cssKey: "borderStyle",
          value: cs.borderStyle || "none",
          originalValue: cs.borderStyle || "none",
          selected: false,
          type: "text",
          placeholder: "vd: solid, dashed",
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
          id: "display",
          label: "Kiểu hiển thị (Display)",
          cssKey: "display",
          value: cs.display || "block",
          originalValue: cs.display || "block",
          selected: false,
          type: "text",
          placeholder: "vd: flex, grid, block, none",
        },
        {
          id: "flexDirection",
          label: "Hướng Flex (Flex Direction)",
          cssKey: "flexDirection",
          value: cs.flexDirection || "row",
          originalValue: cs.flexDirection || "row",
          selected: false,
          type: "text",
          placeholder: "vd: row, column",
        },
        {
          id: "alignItems",
          label: "Canh chỉnh Items (Align Items)",
          cssKey: "alignItems",
          value: cs.alignItems || "normal",
          originalValue: cs.alignItems || "normal",
          selected: false,
          type: "text",
          placeholder: "vd: center, start, stretch",
        },
        {
          id: "justifyContent",
          label: "Canh đều Content (Justify)",
          cssKey: "justifyContent",
          value: cs.justifyContent || "normal",
          originalValue: cs.justifyContent || "normal",
          selected: false,
          type: "text",
          placeholder: "vd: center, between, start",
        },
        {
          id: "gap",
          label: "Khoảng cách Flex/Grid (Gap)",
          cssKey: "gap",
          value: cs.gap && cs.gap !== "normal" ? cs.gap : "0px",
          originalValue: cs.gap && cs.gap !== "normal" ? cs.gap : "0px",
          selected: false,
          type: "text",
          placeholder: "vd: 12px, 1rem",
        },
        {
          id: "position",
          label: "Vị trí (Position)",
          cssKey: "position",
          value: cs.position || "static",
          originalValue: cs.position || "static",
          selected: false,
          type: "text",
          placeholder: "vd: relative, absolute, fixed",
        },
        {
          id: "zIndex",
          label: "Thứ tự lớp (Z-Index)",
          cssKey: "zIndex",
          value: cs.zIndex || "auto",
          originalValue: cs.zIndex || "auto",
          selected: false,
          type: "text",
          placeholder: "vd: 10, 50, auto",
        },
        {
          id: "transform",
          label: "Biến đổi (Transform)",
          cssKey: "transform",
          value: cs.transform && cs.transform !== "none" ? cs.transform : "none",
          originalValue: cs.transform && cs.transform !== "none" ? cs.transform : "none",
          selected: false,
          type: "text",
          placeholder: "vd: scale(1.05), rotate(3deg)",
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
        {
          id: "cursor",
          label: "Con trỏ chuột (Cursor)",
          cssKey: "cursor",
          value: cs.cursor || "auto",
          originalValue: cs.cursor || "auto",
          selected: false,
          type: "text",
          placeholder: "vd: pointer, default",
        },
        {
          id: "overflow",
          label: "Tràn nội dung (Overflow)",
          cssKey: "overflow",
          value: cs.overflow || "visible",
          originalValue: cs.overflow || "visible",
          selected: false,
          type: "text",
          placeholder: "vd: hidden, auto, scroll",
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

  const WIDGET_TARGETS = [
    { id: "audio", name: "🎵 Thanh Âm Nhạc Nổi (Audio Player)", selector: 'audio, [class*="Audio"], [class*="audio"]' },
    { id: "chat", name: "🤖 Trợ Lý AI Trí Nhân (Chat Widget)", selector: 'textarea, [class*="chat"], [class*="Chat"]' },
    { id: "skills", name: "📊 Biểu Đồ Năng Lực (Skills Radar)", selector: 'canvas, [class*="recharts"], [class*="skill"]' },
    { id: "projects", name: "📂 Lưới Dự Án (Projects Grid)", selector: '[class*="project"], [class*="Project"]' },
    { id: "industries", name: "🏛️ Lĩnh Vực Kinh Doanh (Industries Widget)", selector: '[class*="industry"], [class*="Industry"]' },
    { id: "main-card", name: "📄 Khung Thẻ Nội Dung Chính (Main Card Container)", selector: '[id$="-main-card"], main' },
  ];

  const handleSelectWidgetTarget = (selector: string, widgetName: string) => {
    const el = document.querySelector(selector) as HTMLElement;
    if (el) {
      setSelectedElement(el);
      populateInspectorFields(el);
      autoDetectAction(el);
      setShowWidgetPicker(false);
      showToast(`✓ Đã chọn widget: ${widgetName}`);
    } else {
      showToast(`Không tìm thấy widget trên trang hiện tại.`);
    }
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

  const isXRayElement = (el: HTMLElement | null): boolean => {
    if (!el) return false;
    return !!el.closest('.xray-exclude, [class*="xray"], [id*="xray"]');
  };

  useEffect(() => {
    if (isSelectMode && !isSelectModePaused) {
      document.body.style.cursor = "crosshair";
    } else {
      document.body.style.cursor = "";
    }

    if (!isSelectMode) {
      setHoveredElement(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isXRayElement(target)) return;
      if (isSelectModePaused || e.altKey) {
        setHoveredElement(null);
        setHoverRect(null);
        return;
      }
      e.stopPropagation();
      setHoveredElement(target);
      setHoverRect(target.getBoundingClientRect());
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isXRayElement(target)) return;
      if (isSelectModePaused || e.altKey) return; // Allow normal click interaction

      e.preventDefault();
      e.stopPropagation();

      // Find all stacked elements directly under cursor position
      const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY)
        .filter((el): el is HTMLElement => el instanceof HTMLElement && !isXRayElement(el) && el.tagName.toLowerCase() !== "html");
      const uniqueLayers = Array.from(new Set(elementsAtPoint));
      setStackedLayers(uniqueLayers.length > 0 ? uniqueLayers : [target]);

      setSelectedElement(target);
      setIsSelectMode(false);
      setIsSelectModePaused(false);
      setIsPanelOpen(true);
      populateInspectorFields(target);
      setActiveTab("generator");

      autoDetectAction(target);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSelectMode(false);
        setIsSelectModePaused(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isSelectMode, isSelectModePaused]);

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
    // 1. Detect if it's part of the AI Chat Widget / Assistant
    const chatWidgetEl = el.closest('[id*="chat"], [class*="chat"], [id*="Chat"], [class*="Chat"], .aichat-container, .aichat-popup, #aichat-main-card');
    const isChatWidget = !!chatWidgetEl || (el.id && el.id.toLowerCase().includes("chat")) || (el.className && typeof el.className === "string" && el.className.toLowerCase().includes("chat"));

    // 2. Multi-Layer Popup / Modal / Overlay / Dialog Detection
    const findModalAncestor = (target: HTMLElement): HTMLElement | null => {
      let current: HTMLElement | null = target;
      while (current && current !== document.body) {
        const id = current.id ? current.id.toLowerCase() : "";
        const className = typeof current.className === "string" ? current.className.toLowerCase() : "";
        const tagName = current.tagName.toLowerCase();
        const role = current.getAttribute("role");
        const ariaModal = current.getAttribute("aria-modal");

        const isContainer = !["button", "a", "span", "i", "svg", "path", "input", "label", "strong", "em"].includes(tagName);

        if (isContainer) {
          const hasModalWord = id.includes("modal") || className.includes("modal") || ariaModal === "true";
          const hasDialogWord = id.includes("dialog") || className.includes("dialog") || role === "dialog";
          const hasPopupWord = id.includes("popup") || className.includes("popup") || className.includes("popover") || className.includes("dropdown") || className.includes("tooltip") || className.includes("menu");
          const hasSheetWord = id.includes("sheet") || className.includes("sheet") || id.includes("drawer") || className.includes("drawer");
          
          const hasBackdropWord = (id.includes("backdrop") || className.includes("backdrop")) && 
                                  !className.includes("backdrop-blur") && 
                                  !className.includes("backdrop-filter");

          const isOverlayStyle = className.includes("fixed") || className.includes("absolute") || className.includes("z-") || tagName === "dialog";

          if (
            tagName === "dialog" ||
            role === "dialog" ||
            ariaModal === "true" ||
            hasModalWord || hasDialogWord || hasPopupWord || hasSheetWord ||
            (hasBackdropWord && isOverlayStyle)
          ) {
            return current;
          }
        }
        current = current.parentElement;
      }
      return null;
    };

    const modalEl = findModalAncestor(el);
    const isModal = !!modalEl;

    // 3. Multi-Layer Section & Component Inspection (Fallback for Unknown Section)
    let section = "Unknown Section";
    let component = "Unknown Component";

    if (isChatWidget) {
      section = "Trợ lý Trí Nhân (AI Chat Widget)";
      component = "AI Chat Widget Elements";
    } else if (isModal) {
      section = "Hộp thoại / Popup Dialog";
      component = modalEl ? (modalEl.getAttribute("id") || (modalEl.getAttribute("class") || "").split(" ")[0] || "Modal Dialog") : "Popup Dialog Component";
    } else {
      // Layer 1: Closest semantic container
      const sectionEl = el.closest("section, article, header, footer, nav, aside, main, form, table");
      const cardEl = el.closest('.card, [class*="card"], [class*="panel"], [class*="box"]');

      if (sectionEl) {
        section =
          sectionEl.getAttribute("id") ||
          sectionEl.getAttribute("aria-label") ||
          (sectionEl.getAttribute("class") || "").split(" ")[0] ||
          sectionEl.tagName.toLowerCase();
      }

      if (cardEl) {
        component =
          cardEl.getAttribute("id") ||
          cardEl.getAttribute("aria-label") ||
          (cardEl.getAttribute("class") || "").split(" ")[0] ||
          "Card Component";
      }

      // Layer 2 & 3: Multi-layer upward traversal if Unknown Section / Unknown Component
      if (section === "Unknown Section" || component === "Unknown Component") {
        let curr: HTMLElement | null = el.parentElement;
        let depth = 0;
        while (curr && curr !== document.body && depth < 10) {
          const id = curr.id ? curr.id.toLowerCase() : "";
          const className = typeof curr.className === "string" ? curr.className.toLowerCase() : "";
          const dataSec = curr.getAttribute("data-section") || curr.getAttribute("data-card-name");
          const ariaLabel = curr.getAttribute("aria-label");

          if (dataSec && section === "Unknown Section") {
            section = dataSec;
          } else if (ariaLabel && section === "Unknown Section") {
            section = ariaLabel;
          } else if ((id.includes("section") || id.includes("container") || id.includes("wrapper") || id.includes("pane") || id.includes("tab") || className.includes("section") || className.includes("container") || className.includes("wrapper") || className.includes("content")) && section === "Unknown Section") {
            section = curr.id || className.split(" ")[0] || curr.tagName.toLowerCase();
          }

          if ((id.includes("card") || id.includes("component") || id.includes("box") || id.includes("item") || id.includes("widget") || className.includes("card") || className.includes("component") || className.includes("box")) && component === "Unknown Component") {
            component = curr.id || className.split(" ")[0] || curr.tagName.toLowerCase();
          }

          curr = curr.parentElement;
          depth++;
        }
      }

      // Layer 4: Heading fallback inspection for Unknown Section
      if (section === "Unknown Section") {
        const nearestHeading = el.closest("div, section, article, main")?.querySelector("h1, h2, h3, h4, h5, h6")?.textContent?.trim();
        if (nearestHeading) {
          section = `Section: ${nearestHeading}`;
        } else {
          section = "Trang chính (Main View)";
        }
      }

      if (component === "Unknown Component") {
        const nearestLabel = el.querySelector("label, span, a, p")?.textContent?.trim() || el.tagName.toLowerCase();
        component = nearestLabel.length > 25 ? nearestLabel.slice(0, 25) + "..." : nearestLabel;
      }
    }

    const activePageCard =
      el.closest('[id$="-main-card"]') ||
      document.querySelector('[id$="-main-card"]');
    const pageCardName = activePageCard?.getAttribute("data-card-name");
    const bodyPageName = document.body.getAttribute("data-active-page-name");
    const h1Title = document.querySelector("h1")?.textContent?.trim();

    let page =
      pageCardName ||
      (bodyPageName ? `${bodyPageName} - Nguyễn Hùng Thái` : null) ||
      (h1Title ? `${h1Title}` : null) ||
      document.title ||
      "Nguyễn Hùng Thái - CX Expert Portfolio";

    if (isChatWidget) {
      page = "Trợ lý AI Trí Nhân";
    } else if (isModal) {
      page = "Hộp thoại / Popup Dialog";
    }

    const classAttr = el.getAttribute("class");
    const targetStr = `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${classAttr ? `.${classAttr.split(" ")[0]}` : ""}`;

    let hierarchy = "";
    let curr: HTMLElement | null = el.parentElement;
    let depth = 0;
    while (curr && depth < 4 && curr !== document.body) {
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
    
    if (normalizeAllPages) {
      scopeTargetStr += ` (Đồng thời chuẩn hóa đối tượng này áp dụng đồng bộ cho tất cả các trang trong toàn bộ ứng dụng)`;
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
    
    let prompt = "";
    if (requirementOption === "xoa-doi-tuong") {
      prompt = `Yêu cầu xóa hoàn toàn ${scopeTargetStr} khỏi giao diện.`;
    } else if (requirementOption === "dung-ap-dung-cho") {
      prompt = `Dùng đối tượng mẫu ${scopeTargetStr} để áp dụng format/style cho các thành phần tương tự.`;
    } else {
      let customInst = instruction ? `. Yêu cầu thêm: ${instruction}` : "";
      let presetText = editType === "preset" && appliedPresetId ? ` (áp dụng format giống preset định dạng đã chọn)` : "";
      prompt = `Hãy chỉnh sửa ${scopeTargetStr}${presetText}${changeStr}${customInst}.`;
    }

    setGeneratedPrompt(prompt);
    setLastPrompt(prompt);
    showToast("✓ Đã sinh Prompt thành công!");
  };

  const handleAddToQueue = () => {
    if (!generatedPrompt) {
        showToast("Vui lòng tạo prompt trước.");
        return;
    }
    const updated = [...promptQueue, generatedPrompt];
    setPromptQueue(updated);
    try {
      localStorage.setItem("xray_prompt_queue_saved", JSON.stringify(updated));
    } catch {}
    showToast("✓ Đã thêm vào danh sách chờ (lưu lâu dài).");
  };

  const handleDeleteQueueItem = (index: number) => {
    const updated = promptQueue.filter((_, i) => i !== index);
    setPromptQueue(updated);
    setQueueSelectedIds(queueSelectedIds.filter(id => id !== index).map(id => id > index ? id - 1 : id));
    try {
      localStorage.setItem("xray_prompt_queue_saved", JSON.stringify(updated));
    } catch {}
    showToast("Đã xóa mục khỏi danh sách chờ.");
  };

  const handleCopyQueueItem = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("✓ Đã sao chép prompt!");
  };

  const handleToggleQueueSelect = (index: number) => {
    if (queueSelectedIds.includes(index)) {
      setQueueSelectedIds(queueSelectedIds.filter(i => i !== index));
    } else {
      setQueueSelectedIds([...queueSelectedIds, index]);
    }
  };

  const handleCopySelectedQueue = () => {
    if (queueSelectedIds.length === 0) {
      handleCopyPrompt();
      return;
    }
    const selectedTexts = queueSelectedIds.map(i => `${i + 1}. ${promptQueue[i]}`).join("\n\n");
    navigator.clipboard.writeText(selectedTexts);
    showToast(`✓ Đã sao chép ${queueSelectedIds.length} mục đã chọn!`);
  };

  const handleCopyPrompt = () => {
    if (!generatedPrompt && promptQueue.length === 0) return;
    
    let textToCopy = "";
    if (promptQueue.length > 0) {
        textToCopy = promptQueue.map((p, i) => `${i + 1}. ${p}`).join("\n\n");
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
          const matchingCat = item.categoryId ? PROMPT_LIBRARY.find((c) => c.id === item.categoryId) : null;
          result.push({
            category: matchingCat ? matchingCat : {
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
        
        // Push custom presets that match this category but ONLY if selectedCategory is not "all", 
        // to avoid duplicating them (since "all" already covers them in the first block).
        if (selectedCategory !== "all") {
          customInstructionPresets.forEach((item) => {
            if (item.categoryId === cat.id) {
              const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.instruction.toLowerCase().includes(searchQuery.toLowerCase());
              if (matchesSearch) {
                result.push({
                  category: cat,
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
            }
          });
        }
      });
    }

    return result;
  };

  const filteredLibrary = getFilteredLibraryPrompts();

  return createPortal(
    <>
      {/* Hovered Element X-Ray Overlay (Color Border & Object Name) */}
      {isSelectMode && hoveredElement && hoverRect && (
        <div
          style={{
            top: hoverRect.top,
            left: hoverRect.left,
            width: hoverRect.width,
            height: hoverRect.height,
          }}
          className="fixed z-[999999] pointer-events-none border-2 border-blue-500 bg-blue-500/15 rounded transition-all duration-75 shadow-lg"
        >
          <div className="absolute -top-7 left-0 flex items-center gap-1.5 rounded bg-blue-600 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow-md whitespace-nowrap">
            <span>&lt;{hoveredElement.tagName.toLowerCase()}&gt;</span>
            {hoveredElement.id && <span className="opacity-90">#{hoveredElement.id}</span>}
            {hoveredElement.className && typeof hoveredElement.className === "string" && (
              <span className="opacity-90">.{hoveredElement.className.split(" ")[0]}</span>
            )}
          </div>
        </div>
      )}

      {/* Selected Element X-Ray Highlight Overlay */}
      {selectedElement && isPanelOpen && selectRect && (
        <div
          style={{
            top: selectRect.top,
            left: selectRect.left,
            width: selectRect.width,
            height: selectRect.height,
          }}
          className="fixed z-[999999] pointer-events-none border-2 border-emerald-500 bg-emerald-500/15 rounded transition-all duration-75 shadow-lg"
        >
          <div className="absolute -top-7 left-0 flex items-center gap-1.5 rounded bg-emerald-600 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow-md whitespace-nowrap">
            <span>&lt;{selectedElement.tagName.toLowerCase()}&gt;</span>
            {selectedElement.id && <span className="opacity-90">#{selectedElement.id}</span>}
            {selectedElement.className && typeof selectedElement.className === "string" && (
              <span className="opacity-90">.{selectedElement.className.split(" ")[0]}</span>
            )}
          </div>
        </div>
      )}

      {/* Overlapping Layer Hover Preview Highlighter */}
      {layerHoverRect && (
        <div
          style={{
            top: layerHoverRect.top,
            left: layerHoverRect.left,
            width: layerHoverRect.width,
            height: layerHoverRect.height,
          }}
          className="fixed z-[999999] pointer-events-none border-2 border-dashed border-red-500 bg-red-500/20 rounded transition-all duration-75 shadow-lg animate-pulse"
        >
          <div className="absolute -top-7 left-0 flex items-center gap-1.5 rounded bg-red-600 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow-md whitespace-nowrap">
            <span>Layer xem trước (Preview)</span>
          </div>
        </div>
      )}

      {isSelectMode && (
        <div
          className="xray-exclude"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.05)",
            pointerEvents: "none",
            zIndex: 999998,
          }}
        >
          <div 
            className="xray-exclude absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-slate-200 bg-white/95 px-6 py-3 text-slate-800 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-[#12161C]/95 dark:text-slate-100"
            style={{ pointerEvents: "auto" }}
          >
            <MousePointerClick
              size={20}
              className={`text-blue-500 ${!isSelectModePaused ? 'animate-bounce' : 'opacity-50'}`}
            />
            <span className="text-sm font-semibold whitespace-nowrap">
              {isSelectModePaused 
                ? "Đang tạm dừng chọn. Bạn có thể tương tác bình thường." 
                : "Chọn thành phần (ESC để thoát, Alt để tương tác)"}
            </span>
            <div className="h-4 w-px bg-slate-300 dark:bg-white/20 mx-1"></div>
            <button
              onClick={() => setIsSelectModePaused(!isSelectModePaused)}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap",
                isSelectModePaused
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
              )}
            >
              {isSelectModePaused ? "Tiếp tục chọn" : "Tạm dừng"}
            </button>
            <button
              onClick={() => {
                setIsSelectMode(false);
                setIsSelectModePaused(false);
              }}
              className="ml-1 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-200"
              title="Thoát chế độ chọn"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Backdrop */}
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
              className="fixed top-1/2 left-1/2 z-[999999] flex h-[88vh] max-h-[860px] w-[95vw] sm:w-[90vw] md:w-[86vw] lg:w-[860px] max-w-[900px] -translate-x-1/2 flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-white/95 font-sans text-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0B0D10]/95 dark:text-slate-100"
            >
              {/* Header with Navigation Tabs */}
              <div className="flex shrink-0 flex-col border-b border-slate-200/60 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-[#12161C]/60">
                <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                      <Wand2 size={18} />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold tracking-wide text-slate-900 dark:text-white">
                        X-Ray Prompt &amp; Element Inspector
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Kiểm tra phần tử trực quan &amp; sinh câu lệnh Prompt AI chuẩn xác
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowPromptLibraryModal(true)}
                      className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                    >
                      <BookOpen size={14} />
                      <span className="hidden sm:inline">Prompt mẫu</span>
                    </button>
                    <button
                      onClick={() => setIsPanelOpen(false)}
                      className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5 dark:hover:text-slate-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Sub Header Tabs */}
                <div className="flex items-center gap-1 border-t border-slate-200/50 bg-slate-50/70 px-5 dark:border-white/5 dark:bg-[#151921]/60">
                  <button
                    type="button"
                    onClick={() => setActiveTab("generator")}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 border-b-2 px-3.5 py-2 text-xs font-bold transition-all",
                      activeTab === "generator"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                        : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    )}
                  >
                    <Wand2 size={13} />
                    <span>Kiểm tra phần tử &amp; Sinh Prompt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("structure")}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 border-b-2 px-3.5 py-2 text-xs font-bold transition-all",
                      activeTab === "structure"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                        : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    )}
                  >
                    <FolderTree size={13} />
                    <span>Cấu trúc Website (Tree)</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
                {activeTab === "structure" ? (
                  /* Website Structure Tree Tab */
                  <div className="animate-fadeIn">
                    <WebsiteStructureTree
                      onGeneratePromptForNodes={handleGeneratePromptForNodes}
                      onCopyText={handleCopyText}
                    />
                  </div>
                ) : (
                  /* Inspector & Prompt Generator Tab */
                  <div className="animate-fadeIn space-y-4">
                    {selectedElement ? (
                      <>
                        {/* Red Warning Card: Overlapping Stacked Layers Detection (Collapsed by default) */}
                        {stackedLayers.length >= 2 && (
                          <div className="rounded-xl border border-red-500/80 bg-red-50/90 p-3 sm:p-3.5 shadow-md dark:border-red-500/80 dark:bg-red-950/40 text-red-900 dark:text-red-200 animate-fadeIn space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                                <h4 className="text-xs font-black uppercase tracking-wide text-red-700 dark:text-red-300 truncate">
                                  ⚠️ Cảnh báo: Phát hiện {stackedLayers.length} lớp phần tử xếp chồng
                                </h4>
                              </div>
                              <button
                                type="button"
                                onClick={() => setIsStackedWarningExpanded(!isStackedWarningExpanded)}
                                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-300 bg-white/95 px-2.5 py-1 text-[11px] font-bold text-red-700 shadow-2xs hover:bg-red-100 transition-colors cursor-pointer dark:border-red-800 dark:bg-slate-900 dark:text-red-300 dark:hover:bg-red-950"
                              >
                                <span>{isStackedWarningExpanded ? "Thu gọn" : `Xem ${stackedLayers.length} lớp`}</span>
                                {isStackedWarningExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                              </button>
                            </div>

                            {isStackedWarningExpanded && (
                              <div className="space-y-3 pt-2 border-t border-red-200 dark:border-red-800/60 animate-fadeIn">
                                <p className="text-[11px] font-medium leading-relaxed text-red-800/90 dark:text-red-300/90">
                                  Vị trí nhấp chuột có nhiều lớp phần tử nằm đè lên nhau (từ lớp trên cùng xuống lớp dưới). Bấm trực tiếp vào từng layer dưới đây để chuyển đổi:
                                </p>

                                {/* List of stacked layers */}
                                <div className="grid grid-cols-1 gap-1.5">
                                  {stackedLayers.map((layerEl, idx) => {
                                    const isCurrentSelected = layerEl === selectedElement;
                                    const tag = layerEl.tagName.toLowerCase();
                                    const id = layerEl.id ? `#${layerEl.id}` : "";
                                    const primaryClass = typeof layerEl.className === "string" && layerEl.className.trim()
                                      ? `.${layerEl.className.trim().split(/\s+/)[0]}`
                                      : "";
                                    const isTopLayer = idx === 0;
                                    const isBottomLayer = idx === stackedLayers.length - 1;
                                    const textSample = layerEl.textContent?.trim().slice(0, 32) || "";
                                    const rect = layerEl.getBoundingClientRect();
                                    
                                    return (
                                      <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                          setSelectedElement(layerEl);
                                          populateInspectorFields(layerEl);
                                          autoDetectAction(layerEl);
                                          showToast(`✓ Đã chuyển sang layer: <${tag}> ${id}`);
                                        }}
                                        onMouseEnter={() => setLayerHoverRect(rect)}
                                        onMouseLeave={() => setLayerHoverRect(null)}
                                        className={cn(
                                          "flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-xs font-bold transition-all cursor-pointer",
                                          isCurrentSelected
                                            ? "border-red-600 bg-red-600 text-white shadow-sm ring-2 ring-red-400"
                                            : "border-red-300 bg-white/90 text-slate-800 hover:border-red-500 hover:bg-red-100/70 dark:border-red-800/60 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-red-950/60"
                                        )}
                                      >
                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                          <span className={cn(
                                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black",
                                            isCurrentSelected
                                              ? "bg-white text-red-600"
                                              : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                                          )}>
                                            {idx + 1}
                                          </span>
                                          
                                          <div className="min-w-0 flex-1 truncate">
                                            <span className="font-mono font-bold">
                                              &lt;{tag}&gt;
                                            </span>
                                            {id && <span className={cn("font-mono ml-1", isCurrentSelected ? "text-amber-200" : "text-amber-600 dark:text-amber-400")}>{id}</span>}
                                            {primaryClass && <span className="font-mono opacity-70 ml-1">{primaryClass}</span>}
                                            {textSample && <span className="text-[11px] font-normal opacity-80 ml-2 truncate">"{textSample}"</span>}
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 shrink-0">
                                          {isTopLayer && (
                                            <span className={cn(
                                              "rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase",
                                              isCurrentSelected ? "bg-white/20 text-white" : "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200"
                                            )}>
                                              Lớp trên cùng
                                            </span>
                                          )}
                                          {isBottomLayer && (
                                            <span className={cn(
                                              "rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase",
                                              isCurrentSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                            )}>
                                              Lớp đáy
                                            </span>
                                          )}
                                          {isCurrentSelected && (
                                            <span className="flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[10px] font-black text-red-600 shadow-2xs">
                                              <Check size={11} /> Đang chọn
                                            </span>
                                          )}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 1. Đối tượng */}
                        <div className="rounded-xl border border-blue-500/25 bg-blue-50/40 p-4 shadow-2xs dark:border-blue-500/20 dark:bg-blue-950/20">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-500/15 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">1</span>
                              <span className="text-xs font-bold tracking-wide text-blue-900 dark:text-blue-200">1. Đối tượng</span>
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
                                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-2xs transition-all hover:bg-blue-700"
                              >
                                <MousePointerClick size={13} />
                                <span>Chọn đối tượng khác</span>
                              </button>

                              <div className="relative">
                                <button
                                  onClick={() => setShowWidgetPicker(!showWidgetPicker)}
                                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-2xs transition-all hover:bg-emerald-700"
                                >
                                  <Boxes size={13} />
                                  <span>Chọn widget</span>
                                </button>

                                {showWidgetPicker && (
                                  <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-[#151921] animate-fadeIn">
                                    <div className="px-2 py-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/10 mb-1">
                                      Chọn widget hệ thống
                                    </div>
                                    <div className="space-y-1 max-h-60 overflow-y-auto">
                                      {WIDGET_TARGETS.map((widget) => (
                                        <button
                                          key={widget.id}
                                          onClick={() => handleSelectWidgetTarget(widget.selector, widget.name)}
                                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                                        >
                                          <span className="truncate">{widget.name}</span>
                                          <ChevronRight size={12} className="opacity-50 shrink-0 ml-1" />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => setIsObjOpen(!isObjOpen)}
                                className="cursor-pointer rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                              >
                                {isObjOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                          </div>

                          {isObjOpen && (
                            <div className="mt-3 space-y-3 animate-fadeIn">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white shadow-2xs">
                                  <Code size={12} />
                                  &lt;{selectedElement.tagName.toLowerCase()}&gt;
                                </span>
                                <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-300">
                                  {getElementMetadata(selectedElement).targetStr}
                                </span>
                              </div>

                              {/* Location Badges */}
                              <div className="grid grid-cols-1 gap-2 text-xs font-medium sm:grid-cols-3">
                                <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/90 px-3 py-2 dark:border-white/5 dark:bg-[#151921]/90">
                                  <span className="text-[10px] font-bold text-slate-400">Trang:</span>
                                  <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
                                    {getElementMetadata(selectedElement).page}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/90 px-3 py-2 dark:border-white/5 dark:bg-[#151921]/90">
                                  <span className="text-[10px] font-bold text-slate-400">Section:</span>
                                  <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
                                    {getElementMetadata(selectedElement).section}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/90 px-3 py-2 dark:border-white/5 dark:bg-[#151921]/90">
                                  <span className="text-[10px] font-bold text-slate-400">Component:</span>
                                  <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
                                    {getElementMetadata(selectedElement).component}
                                  </span>
                                </div>
                              </div>

                              {/* DOM Tree Hierarchy Component */}
                              {showDomHierarchy && (
                                <DomTreeViewer
                                  selectedElement={selectedElement}
                                  elementHierarchy={elementHierarchy}
                                  elementChildren={elementChildren}
                                  onSelectElement={handleSelectSubElement}
                                />
                              )}
                            </div>
                          )}
                        </div>

                        {/* 2. Thuộc Tính & Hiệu Ứng (Modular Panel with Active Effects) */}
                        <div className="space-y-3 rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-2xs dark:border-white/5 dark:bg-[#151921]/80">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">2</span>
                              <label className="text-xs font-bold tracking-wide text-slate-700 dark:text-slate-200">
                                2. Thuộc tính phần tử &amp; Hiệu ứng đang có (Active Effects)
                              </label>
                            </div>
                            <button
                              onClick={() => setIsPropOpen(!isPropOpen)}
                              className="cursor-pointer rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                              {isPropOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </div>

                          {isPropOpen && (
                            <div className="animate-fadeIn pt-1">
                              <ElementPropertiesPanel
                                selectedElement={selectedElement}
                                editTagText={editTagText}
                                setEditTagText={setEditTagText}
                                editClasses={editClasses}
                                setEditClasses={setEditClasses}
                                editImageSrc={editImageSrc}
                                setEditImageSrc={setEditImageSrc}
                                editHref={editHref}
                                setEditHref={setEditHref}
                                bgColor={bgColor}
                                setBgColor={setBgColor}
                                bgOpacity={bgOpacity}
                                setBgOpacity={setBgOpacity}
                                effectType={effectType}
                                setEffectType={setEffectType}
                                styleProperties={styleProperties}
                                onToggleStyleSelect={handleToggleStyleSelect}
                                onUpdateStyleValue={handleUpdateStyleValue}
                                onSelectAllStyles={handleSelectAllStyles}
                              />
                            </div>
                          )}
                        </div>

                        {/* 3. Phạm Vi Áp Dụng */}
                        <div className="space-y-2.5 rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-2xs dark:border-white/5 dark:bg-[#151921]/80">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">3</span>
                              <label className="text-xs font-bold tracking-wide text-slate-700 dark:text-slate-200">
                                3. Phạm vi áp dụng
                              </label>
                            </div>
                            <button
                              onClick={() => setIsScopeOpen(!isScopeOpen)}
                              className="cursor-pointer rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                              {isScopeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </div>
                          
                          {isScopeOpen && (
                            <div className="space-y-2 animate-fadeIn pt-1">
                              <div className="relative">
                                <select
                                  value={targetScope}
                                  onChange={(e) => setTargetScope(e.target.value as any)}
                                  className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200/80 bg-slate-50 py-2.5 pr-8 pl-3.5 text-xs font-bold text-slate-700 outline-none transition-all hover:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-[#12161C] dark:text-slate-200 dark:hover:bg-[#181D24]"
                                >
                                  <option value="self">1. Chỉ riêng phần tử này (&lt;{selectedElement.tagName.toLowerCase()}&gt;)</option>
                                  <option value="same-tag">2. Tất cả thẻ cùng loại (&lt;{selectedElement.tagName.toLowerCase()}&gt;)</option>
                                  <option value="same-class">3. Cùng Class / Component tương tự</option>
                                  <option value="parent-section">4. Toàn bộ Section ({getElementMetadata(selectedElement).section})</option>
                                  <option value="entire-page">5. Toàn bộ trang hiện tại ({getElementMetadata(selectedElement).page})</option>
                                </select>
                                <ChevronDown size={14} className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400" />
                              </div>

                              <label className="flex cursor-pointer items-center gap-2 pt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <input
                                  type="checkbox"
                                  checked={normalizeAllPages}
                                  onChange={(e) => setNormalizeAllPages(e.target.checked)}
                                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-white/20 dark:bg-[#12161C]"
                                />
                                <span>Chuẩn hóa đối tượng này cho tất cả các trang</span>
                              </label>
                            </div>
                          )}
                        </div>

                        {/* 4. Yêu Cầu Thực Hiện */}
                        <div className="space-y-3.5 rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-2xs dark:border-white/5 dark:bg-[#151921]/80">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">4</span>
                              <label className="text-xs font-bold tracking-wide text-slate-700 dark:text-slate-200">
                                4. Yêu cầu thực hiện
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setShowPromptLibraryModal(true)}
                                className="flex cursor-pointer items-center gap-1 rounded-lg bg-blue-600/10 px-2.5 py-1 text-[11px] font-bold text-blue-600 transition-all hover:bg-blue-600/20 dark:text-blue-400 border border-blue-500/20"
                              >
                                <BookOpen size={12} />
                                <span>Kho prompt mẫu</span>
                              </button>
                              <button
                                onClick={() => setIsReqOpen(!isReqOpen)}
                                className="cursor-pointer rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                              >
                                {isReqOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                          </div>

                          {isReqOpen && (
                            <div className="space-y-3.5 animate-fadeIn pt-1">
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[
                                  { id: "chinh-sua", label: "Chỉnh sửa", icon: Edit3, color: "text-blue-500" },
                                  { id: "xoa-doi-tuong", label: "Xóa phần tử", icon: Trash2, color: "text-red-500" },
                                  { id: "ap-dung-mau", label: "Áp dụng mẫu", icon: Sparkles, color: "text-purple-500" },
                                  { id: "dung-ap-dung-cho", label: "Áp dụng cho...", icon: Share2, color: "text-emerald-500" },
                                ].map((item) => {
                                  const IconComp = item.icon;
                                  const isSelected = requirementOption === item.id;
                                  return (
                                    <button
                                      key={item.id}
                                      type="button"
                                      onClick={() => setRequirementOption(item.id)}
                                      className={cn(
                                        "flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition-all cursor-pointer",
                                        isSelected
                                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                          : "border-slate-200/80 bg-slate-50/70 text-slate-700 hover:bg-white hover:border-slate-300 dark:border-white/10 dark:bg-[#12161C] dark:text-slate-300 dark:hover:bg-[#181D24]"
                                      )}
                                    >
                                      <IconComp size={16} className={isSelected ? "text-white" : item.color} />
                                      <span className="text-[11px] leading-none font-semibold">{item.label}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {requirementOption === "chinh-sua" && (
                                <div className="space-y-3 animate-fadeIn">
                                  <div className="relative">
                                    <textarea
                                      value={instruction}
                                      onChange={(e) => setInstruction(e.target.value)}
                                      className="h-24 w-full resize-none rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 text-xs leading-relaxed font-medium transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-[#12161C]/80 dark:text-white"
                                      placeholder="Nhập mô tả chi tiết yêu cầu chỉnh sửa..."
                                    />
                                    {instruction && (
                                      <button
                                        type="button"
                                        onClick={() => setInstruction("")}
                                        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                                      >
                                        <X size={14} />
                                      </button>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                      <select
                                        value={selectedSaveCategory}
                                        onChange={(e) => setSelectedSaveCategory(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-slate-200/60 bg-white p-2 pl-3 pr-8 text-xs font-bold text-slate-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-[#12161C] dark:text-slate-200"
                                      >
                                        <option value="my_saved">Tất cả (Mẫu lưu sẵn của tôi)</option>
                                        {PROMPT_LIBRARY.map((cat) => (
                                          <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                          </option>
                                        ))}
                                      </select>
                                      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={handleSaveInstructionPreset}
                                      disabled={!instruction.trim()}
                                      className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-200 disabled:opacity-50 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 cursor-pointer"
                                    >
                                      <Save size={13} />
                                      <span>Lưu mẫu prompt</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {requirementOption === "ap-dung-mau" && (
                                <div className="space-y-3.5 animate-fadeIn">
                                  <div className="rounded-xl border border-blue-500/25 bg-blue-50/40 p-3.5 shadow-2xs dark:border-blue-500/20 dark:bg-blue-950/20">
                                    <span className="block text-xs font-bold text-blue-900 dark:text-blue-200 mb-2">
                                      Áp dụng format giống từ &lt;{selectedElement.tagName.toLowerCase()}&gt;:
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <input
                                        type="text"
                                        value={formatPresetName}
                                        onChange={(e) => setFormatPresetName(e.target.value)}
                                        placeholder="Tên format (vd: Card Kính Mờ)..."
                                        className="flex-1 rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs font-medium outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#12161C] dark:text-white"
                                      />
                                      <button
                                        type="button"
                                        onClick={handleSaveFormat}
                                        className="cursor-pointer rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 transition-all"
                                      >
                                        Lưu format hiện tại
                                      </button>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                      Danh sách format đã lưu:
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
                                                ? "border-blue-600 bg-blue-600 text-white shadow-2xs"
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
                                            >
                                              <X size={13} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-white/10">
                                        Chưa có mẫu format nào.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {requirementOption === "xoa-doi-tuong" && (
                                <div className="rounded-xl border border-rose-500/30 bg-rose-50/50 p-3.5 text-xs text-rose-700 dark:bg-rose-950/20 dark:text-rose-300 animate-fadeIn">
                                  <p className="font-bold">⚠️ Yêu cầu: Xóa đối tượng này</p>
                                  <p className="mt-1">Khi bấm "Tạo Prompt", hệ thống sẽ sinh lệnh yêu cầu xóa hoàn toàn phần tử <code className="font-mono bg-rose-100 dark:bg-rose-900 px-1 rounded">&lt;{selectedElement.tagName.toLowerCase()}&gt;</code> khỏi bố cục giao diện.</p>
                                </div>
                              )}

                              {requirementOption === "dung-ap-dung-cho" && (
                                <div className="rounded-xl border border-blue-500/30 bg-blue-50/50 p-3.5 text-xs text-blue-700 dark:bg-blue-950/20 dark:text-blue-300 animate-fadeIn space-y-2">
                                  <p className="font-bold">🔗 Dùng đối tượng này áp dụng cho:</p>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400">Đối tượng mẫu hiện tại <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded">&lt;{selectedElement.tagName.toLowerCase()}&gt;</code> sẽ được dùng làm chuẩn để áp dụng style/format sang các thành phần khác trong cùng trang.</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* 5. Tạo Prompt */}
                        <div className="space-y-3 rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-2xs dark:border-white/5 dark:bg-[#151921]/80">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">5</span>
                              <h3 className="text-xs font-bold tracking-wide text-slate-700 dark:text-slate-200">
                                5. Tạo prompt
                              </h3>
                            </div>
                            <button
                              onClick={() => setIsGenOpen(!isGenOpen)}
                              className="cursor-pointer rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                              {isGenOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </div>

                          {isGenOpen && (
                            <div className="space-y-3 animate-fadeIn pt-1">
                              <div className="flex gap-2">
                                {!generatedPrompt ? (
                                  <button
                                    onClick={() => {
                                      handleGenerate();
                                    }}
                                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.99]"
                                  >
                                    <Wand2 size={14} />
                                    <span>Tạo Prompt</span>
                                  </button>
                                ) : (
                                  <div className="flex flex-1 gap-2">
                                    <button
                                      onClick={() => setGeneratedPrompt("")}
                                      className="cursor-pointer flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-[#181D24] dark:text-slate-300"
                                      title="Tạo lại"
                                    >
                                      <RotateCcw size={14} />
                                      <span>Tạo lại</span>
                                    </button>
                                  </div>
                                )}

                                <button
                                  onClick={handleAddToQueue}
                                  className="cursor-pointer flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all dark:border-white/10 dark:bg-[#181D24] dark:text-slate-200"
                                >
                                  <Bookmark size={14} className="text-emerald-500" />
                                  <span>Danh sách chờ ({promptQueue.length})</span>
                                </button>
                              </div>

                              {generatedPrompt && (
                                <div className="mt-3 space-y-2 rounded-xl border border-blue-500/30 bg-blue-50/50 p-3 dark:border-blue-500/20 dark:bg-blue-950/20 animate-fadeIn">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300">Nội dung prompt xem trước:</span>
                                    <button
                                      onClick={handleCopyPrompt}
                                      className="flex cursor-pointer items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-blue-700 transition-all"
                                    >
                                      <Copy size={12} />
                                      <span>Copy Prompt</span>
                                    </button>
                                  </div>
                                  <pre className="custom-scrollbar max-h-28 overflow-y-auto rounded-lg bg-white/80 p-2.5 text-xs font-mono text-slate-800 dark:bg-black/40 dark:text-slate-200 whitespace-pre-wrap">
                                    {generatedPrompt}
                                  </pre>
                                </div>
                              )}

                              {promptQueue.length > 0 && (
                                <div className="mt-4 space-y-2 pt-3 border-t border-slate-200/60 dark:border-white/10 animate-fadeIn">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                      Danh sách chờ lưu trữ ({promptQueue.length} mục):
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={handleCopySelectedQueue}
                                        className="flex cursor-pointer items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                                      >
                                        <Copy size={12} />
                                        <span>Copy đã chọn ({queueSelectedIds.length})</span>
                                      </button>
                                      <span className="text-slate-300">|</span>
                                      <button
                                        onClick={() => {
                                          setPromptQueue([]);
                                          setQueueSelectedIds([]);
                                          try { localStorage.removeItem("xray_prompt_queue_saved"); } catch {}
                                          showToast("Đã xóa toàn bộ danh sách chờ.");
                                        }}
                                        className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                                      >
                                        Xóa hết
                                      </button>
                                    </div>
                                  </div>

                                  <div className="custom-scrollbar max-h-48 space-y-2 overflow-y-auto pr-1">
                                    {promptQueue.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white p-3 text-xs dark:border-white/10 dark:bg-[#12161C] shadow-2xs"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={queueSelectedIds.includes(idx)}
                                          onChange={() => handleToggleQueueSelect(idx)}
                                          className="mt-1 h-3.5 w-3.5 rounded border-slate-300 cursor-pointer text-blue-600"
                                        />
                                        <div className="min-w-0 flex-1 space-y-1">
                                          <span className="font-bold text-blue-600 dark:text-blue-400 mr-1.5">{idx + 1}.</span>
                                          <span className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{item}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                          <button
                                            onClick={() => handleCopyQueueItem(item)}
                                            className="flex cursor-pointer items-center gap-1 rounded-lg bg-blue-500/10 px-2 py-1 text-[10px] font-bold text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
                                          >
                                            <Copy size={11} />
                                            <span>Copy</span>
                                          </button>
                                          <button
                                            onClick={() => handleDeleteQueueItem(idx)}
                                            className="flex cursor-pointer items-center gap-1 rounded-lg bg-rose-500/10 px-2 py-1 text-[10px] font-bold text-rose-600 hover:bg-rose-500/20 dark:text-rose-400"
                                          >
                                            <Trash2 size={11} />
                                            <span>Xóa</span>
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      /* Empty State */
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
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                          <button
                            onClick={() => {
                              setIsSelectMode(true);
                              setIsPanelOpen(false);
                            }}
                            className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
                          >
                            <MousePointerClick size={15} />
                            <span>Chọn đối tượng ngay (Phím X)</span>
                          </button>
                          <button
                            onClick={() => setActiveTab("structure")}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-white/10 dark:bg-[#181D24] dark:text-slate-200"
                          >
                            <FolderTree size={15} className="text-blue-600 dark:text-blue-400" />
                            <span>Xem cây cấu trúc website</span>
                          </button>
                        </div>
                      </div>
                    )}
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

            {/* Prompt Library Modal */}
            {showPromptLibraryModal && (
              <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fadeIn">
                <div className="flex h-[80vh] max-h-[700px] w-full max-w-[720px] flex-col rounded-[20px] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#12161C] dark:text-white overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-4 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <BookOpen size={18} className="text-blue-600" />
                      <h3 className="text-sm font-bold">Kho Prompt Mẫu Hỗ Trợ</h3>
                    </div>
                    <button
                      onClick={() => setShowPromptLibraryModal(false)}
                      className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="custom-scrollbar flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm mẫu prompt..."
                        className="w-full rounded-xl border border-slate-200/85 bg-slate-50 py-2.5 pr-4 pl-11 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-[#181D24]"
                      />
                    </div>

                    {/* Prompt List */}
                    <div className="space-y-3">
                      {filteredLibrary.length > 0 ? (
                        filteredLibrary.map(({ category, prompt, isCustom, customId }) => (
                          <div key={prompt.id} className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4 space-y-2 dark:border-white/10 dark:bg-[#181D24]/50">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                {category.name}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{prompt.title}</h4>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{prompt.desc}</p>
                            <pre className="custom-scrollbar max-h-24 overflow-y-auto rounded-lg bg-white/80 p-2 font-mono text-[11px] text-slate-700 dark:bg-black/40 dark:text-slate-300 whitespace-pre-wrap">
                              {prompt.prompt}
                            </pre>
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                onClick={() => handleCopyLibraryPrompt(prompt)}
                                className="flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-xs font-bold hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10"
                              >
                                <Copy size={12} /> Sao chép
                              </button>
                              <button
                                onClick={() => handleApplyInstructionPreset(prompt.prompt)}
                                className="flex cursor-pointer items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-700"
                              >
                                <Sparkles size={12} /> Nạp vào mô tả
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 text-xs text-slate-400">Không tìm thấy mẫu prompt nào phù hợp.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed right-8 bottom-8 z-[9999999] flex items-center gap-3 rounded-[16px] border border-slate-200/90 bg-white/95 px-5 py-3.5 text-sm font-bold text-slate-800 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:border-white/10 dark:bg-[#12161C]/95 dark:text-slate-100 dark:ring-white/10"
          >
            <CheckCircle2
              size={18}
              className="text-emerald-500 dark:text-emerald-400"
            />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
