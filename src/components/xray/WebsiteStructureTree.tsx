import React, { useState, useMemo } from "react";
import {
  FolderTree,
  CheckSquare,
  Square,
  Plus,
  Edit3,
  Trash2,
  Download,
  Upload,
  Search,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Copy,
  FileCode,
  CheckCircle2,
  FolderPlus,
  RefreshCw,
  Eye,
  Wand2,
  X,
  Save,
} from "lucide-react";
import { cn } from "../../lib/utils";

export interface StructureNode {
  id: string;
  name: string;
  type: "page" | "section" | "card" | "navbar" | "sidebar" | "modal" | "widget" | "element";
  selector?: string;
  path?: string;
  description?: string;
  children?: StructureNode[];
}

export const INITIAL_WEBSITE_STRUCTURE: StructureNode[] = [
  {
    id: "page-cover-letter",
    name: "Trang Thư Ngỏ (Cover Letter)",
    type: "page",
    path: "/cover-letter",
    selector: "#cover-letter-main-card",
    description: "Trang thư ngỏ giới thiệu cá nhân, kinh nghiệm 22 năm CX và triết lý hành động.",
    children: [
      {
        id: "section-greeting-card",
        name: "Khối Lời Chào & Avatar (Greeting Card)",
        type: "card",
        selector: "#cover-letter-main-card .relative.overflow-hidden",
        description: "Khối kính mờ hiển thị danh xưng, giới thiệu 22 năm kinh nghiệm, liên hệ nhanh và avatar tròn.",
      },
      {
        id: "section-career-timeline",
        name: "Hành Trình Sự Nghiệp (Career Timeline 2003 - 2023)",
        type: "section",
        selector: "#cover-letter-main-card .py-4",
        description: "Dòng thời gian 8 cột mốc sự nghiệp từ MobiFone, Shopee, Prudential, MoMo đến Ví ECO.",
      },
      {
        id: "section-principles",
        name: "3 Trụ Cột Nguyên Tắc (Principles Section)",
        type: "section",
        selector: "#principles-section",
        description: "Quy trình tạo nền tảng, Con người tạo giá trị, Công nghệ tạo đòn bẩy.",
      },
      {
        id: "section-core-values",
        name: "Giá Trị Cốt Lõi (Core Values Section)",
        type: "section",
        selector: "#core-values-section",
        description: "Hiệu quả (Tối ưu & đo lường), Nhân văn (Thấu hiểu & đồng cảm), Bền vững (Gắn kết & đồng hành).",
      },
      {
        id: "section-tech-automation",
        name: "Giải Pháp Công Nghệ & CRM 24/7",
        type: "card",
        description: "Thẻ giải pháp CRM Omni, Dashboard quản trị và AI Chatbot tự động hóa.",
      },
      {
        id: "section-closing-signature",
        name: "Lời Kết & Chữ Ký (Closing & Signature)",
        type: "card",
        description: "Lời ngỏ hợp tác chân thành cùng chữ ký giám đốc CSKH Nguyễn Hùng Thái.",
      },
      {
        id: "section-action-philosophy",
        name: "Triết Lý Hành Động (Action Philosophy)",
        type: "section",
        description: "Khối quote triết lý lấy khách hàng làm trung tâm cùng đồ họa tai nghe 3D.",
      },
    ],
  },
  {
    id: "component-navigation",
    name: "Hệ Thống Thanh Điều Hướng (Navigation & Sidebar)",
    type: "sidebar",
    selector: "#sidebar",
    description: "Thanh menu dọc, nút đổi ngôn ngữ, chế độ sáng/tối, x-ray inspector và widget xếp chồng.",
    children: [
      {
        id: "nav-theme-toggle",
        name: "Nút Đổi Giao Diện & Hình Nền (Theme Switcher)",
        type: "widget",
        description: "Cụm 3 nút dồn lại thành 1 nút bung ra xếp hàng khi hover để đổi giao diện, ngôn ngữ, hình nền.",
      },
      {
        id: "nav-language-toggle",
        name: "Nút Chuyển Ngôn Ngữ (Tiếng Việt / English)",
        type: "widget",
        description: "Chuyển đổi tức thì toàn bộ nội dung sang tiếng Việt hoặc tiếng Anh.",
      },
      {
        id: "nav-menu-links",
        name: "Danh Sách Liên Kết Menu (Nav Items)",
        type: "navbar",
        description: "Điều hướng giữa Thư ngỏ, Kinh nghiệm, Dự án, Kỹ năng, Liên hệ.",
      },
    ],
  },
  {
    id: "page-experience",
    name: "Trang Kinh Nghiệm & Thành Tựu (Experience & Projects)",
    type: "page",
    path: "/experience",
    description: "Chi tiết các dự án quản trị quy trình CSKH, xây dựng tổng đài và tối ưu hóa CSAT/NPS.",
    children: [
      {
        id: "exp-kpi-metrics",
        name: "Bảng Chỉ Số KPI & Hiệu Quả Vận Hành",
        type: "card",
        description: "Chỉ số FCR, AHT, CSAT, NPS và năng suất giải quyết khiếu nại.",
      },
      {
        id: "exp-case-studies",
        name: "Các Dự Án Trọng Điểm & Tối Ưu CRM",
        type: "section",
        description: "Dự án chuyển đổi số CSKH đa kênh, AI bot và đào tạo đội ngũ chuyên viên.",
      },
    ],
  },
  {
    id: "page-skills",
    name: "Trang Kỹ Năng & Năng Lực Cốt Lõi (Skills)",
    type: "page",
    path: "/skills",
    description: "Khung năng lực lãnh đạo, thiết kế quy trình SOP, phân tích dữ liệu và công nghệ CRM.",
  },
  {
    id: "page-contact",
    name: "Trang Liên Hệ & Kết Nối (Contact)",
    type: "page",
    path: "/contact",
    description: "Form gửi tin nhắn trực tiếp, thông tin email, số điện thoại và liên kết mạng xã hội.",
  },
  {
    id: "system-xray-tool",
    name: "Công Cụ X-Ray Prompt Editor & Inspector",
    type: "modal",
    description: "Công cụ kiểm tra phần tử trực quan, sinh prompt chuẩn xác và quản lý cấu trúc cây DOM.",
  },
];

interface WebsiteStructureTreeProps {
  onGeneratePromptForNodes: (nodes: StructureNode[], action: "custom" | "edit" | "add" | "delete") => void;
  onCopyText: (text: string) => void;
}

export function WebsiteStructureTree({
  onGeneratePromptForNodes,
  onCopyText,
}: WebsiteStructureTreeProps) {
  const [treeData, setTreeData] = useState<StructureNode[]>(() => {
    try {
      const saved = localStorage.getItem("xray_website_structure_tree");
      return saved ? JSON.parse(saved) : INITIAL_WEBSITE_STRUCTURE;
    } catch {
      return INITIAL_WEBSITE_STRUCTURE;
    }
  });

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([
    "page-cover-letter",
    "component-navigation",
  ]);

  // Modal dialog states for Thêm / Chỉnh / Xóa / Nhập
  const [activeModal, setActiveModal] = useState<"add" | "edit" | "delete" | "import" | null>(null);
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeType, setNewNodeType] = useState<StructureNode["type"]>("section");
  const [newNodePath, setNewNodePath] = useState("");
  const [newNodeDesc, setNewNodeDesc] = useState("");
  const [selectedParentId, setSelectedParentId] = useState<string>("");

  const [editNodeName, setEditNodeName] = useState("");
  const [editNodeType, setEditNodeType] = useState<StructureNode["type"]>("section");
  const [editNodeDesc, setEditNodeDesc] = useState("");
  const [editNodeSelector, setEditNodeSelector] = useState("");

  const [importJsonText, setImportJsonText] = useState("");
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  const saveTreeData = (data: StructureNode[]) => {
    setTreeData(data);
    try {
      localStorage.setItem("xray_website_structure_tree", JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  // Flatten all nodes helper
  const getAllNodesFlat = (nodes: StructureNode[]): StructureNode[] => {
    const list: StructureNode[] = [];
    const traverse = (items: StructureNode[]) => {
      items.forEach((item) => {
        list.push(item);
        if (item.children) traverse(item.children);
      });
    };
    traverse(nodes);
    return list;
  };

  const allFlatNodes = useMemo(() => getAllNodesFlat(treeData), [treeData]);

  // Selected Nodes Object
  const selectedNodes = useMemo(() => {
    return allFlatNodes.filter((n) => selectedNodeIds.includes(n.id));
  }, [allFlatNodes, selectedNodeIds]);

  // Toggle selection
  const handleToggleSelect = (id: string) => {
    setSelectedNodeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select all / None
  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedNodeIds(allFlatNodes.map((n) => n.id));
    } else {
      setSelectedNodeIds([]);
    }
  };

  // Expand / Collapse all
  const handleToggleExpandAll = (expand: boolean) => {
    if (expand) {
      setExpandedNodeIds(allFlatNodes.map((n) => n.id));
    } else {
      setExpandedNodeIds([]);
    }
  };

  const toggleExpandNode = (id: string) => {
    setExpandedNodeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 1. THÊM (ADD)
  const handleOpenAddModal = () => {
    setNewNodeName("");
    setNewNodeType("section");
    setNewNodePath("");
    setNewNodeDesc("");
    setSelectedParentId(selectedNodeIds[0] || "");
    setActiveModal("add");
  };

  const handleConfirmAdd = () => {
    if (!newNodeName.trim()) return;

    const newNode: StructureNode = {
      id: `custom-node-${Date.now()}`,
      name: newNodeName.trim(),
      type: newNodeType,
      path: newNodePath.trim() || undefined,
      description: newNodeDesc.trim() || undefined,
    };

    let updatedTree: StructureNode[];

    if (selectedParentId) {
      const addToParent = (nodes: StructureNode[]): StructureNode[] => {
        return nodes.map((node) => {
          if (node.id === selectedParentId) {
            return {
              ...node,
              children: [...(node.children || []), newNode],
            };
          }
          if (node.children) {
            return {
              ...node,
              children: addToParent(node.children),
            };
          }
          return node;
        });
      };
      updatedTree = addToParent(treeData);
      if (!expandedNodeIds.includes(selectedParentId)) {
        setExpandedNodeIds((prev) => [...prev, selectedParentId]);
      }
    } else {
      updatedTree = [...treeData, newNode];
    }

    saveTreeData(updatedTree);
    setSelectedNodeIds([newNode.id]);
    setActiveModal(null);
    showFeedback(`Đã thêm thành phần "${newNode.name}" vào cây cấu trúc.`);
    onGeneratePromptForNodes([newNode], "add");
  };

  // 2. CHỈNH (EDIT)
  const handleOpenEditModal = () => {
    if (selectedNodes.length === 0) return;
    const target = selectedNodes[0];
    setEditNodeName(target.name);
    setEditNodeType(target.type);
    setEditNodeDesc(target.description || "");
    setEditNodeSelector(target.selector || "");
    setActiveModal("edit");
  };

  const handleConfirmEdit = () => {
    if (selectedNodes.length === 0 || !editNodeName.trim()) return;
    const targetId = selectedNodes[0].id;

    const updateRecursive = (nodes: StructureNode[]): StructureNode[] => {
      return nodes.map((node) => {
        if (node.id === targetId) {
          return {
            ...node,
            name: editNodeName.trim(),
            type: editNodeType,
            description: editNodeDesc.trim() || undefined,
            selector: editNodeSelector.trim() || undefined,
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateRecursive(node.children),
          };
        }
        return node;
      });
    };

    const updatedTree = updateRecursive(treeData);
    saveTreeData(updatedTree);
    setActiveModal(null);
    showFeedback(`Đã cập nhật thông tin thành phần "${editNodeName}".`);
    onGeneratePromptForNodes(
      [
        {
          id: targetId,
          name: editNodeName,
          type: editNodeType,
          description: editNodeDesc,
          selector: editNodeSelector,
        },
      ],
      "edit"
    );
  };

  // 3. XÓA (DELETE)
  const handleOpenDeleteModal = () => {
    if (selectedNodes.length === 0) return;
    setActiveModal("delete");
  };

  const handleConfirmDelete = () => {
    const idsToDelete = new Set(selectedNodeIds);

    const deleteRecursive = (nodes: StructureNode[]): StructureNode[] => {
      return nodes
        .filter((node) => !idsToDelete.has(node.id))
        .map((node) => ({
          ...node,
          children: node.children ? deleteRecursive(node.children) : undefined,
        }));
    };

    const updatedTree = deleteRecursive(treeData);
    saveTreeData(updatedTree);
    onGeneratePromptForNodes(selectedNodes, "delete");
    setSelectedNodeIds([]);
    setActiveModal(null);
    showFeedback(`Đã xóa ${idsToDelete.size} mục khỏi cấu trúc website.`);
  };

  // 4. NHẬP / XUẤT (IMPORT / EXPORT)
  const handleOpenImportModal = () => {
    setImportJsonText(JSON.stringify(treeData, null, 2));
    setActiveModal("import");
  };

  const handleConfirmImport = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (Array.isArray(parsed)) {
        saveTreeData(parsed);
        setActiveModal(null);
        showFeedback("Đã nhập cấu trúc website thành công!");
      } else {
        alert("Dữ liệu JSON không đúng định dạng mảng (Array).");
      }
    } catch (e: any) {
      alert("Lỗi cú pháp JSON: " + e.message);
    }
  };

  const handleResetToDefault = () => {
    if (confirm("Khôi phục lại cây cấu trúc chuẩn ban đầu?")) {
      saveTreeData(INITIAL_WEBSITE_STRUCTURE);
      setSelectedNodeIds([]);
      showFeedback("Đã khôi phục cấu trúc chuẩn ban đầu.");
    }
  };

  // Filtered Tree Render
  const filterNodes = (nodes: StructureNode[], query: string): StructureNode[] => {
    if (!query.trim()) return nodes;
    const lowerQuery = query.toLowerCase();

    return nodes
      .map((node) => {
        const matchesSelf =
          node.name.toLowerCase().includes(lowerQuery) ||
          (node.description && node.description.toLowerCase().includes(lowerQuery)) ||
          (node.selector && node.selector.toLowerCase().includes(lowerQuery));

        const filteredChildren = node.children ? filterNodes(node.children, query) : [];

        if (matchesSelf || filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children,
          };
        }
        return null;
      })
      .filter(Boolean) as StructureNode[];
  };

  const filteredTree = useMemo(() => filterNodes(treeData, searchQuery), [treeData, searchQuery]);

  const renderTreeNodes = (nodes: StructureNode[], level = 0) => {
    return nodes.map((node) => {
      const hasChildren = Boolean(node.children && node.children.length > 0);
      const isExpanded = expandedNodeIds.includes(node.id);
      const isSelected = selectedNodeIds.includes(node.id);

      const getTypeBadge = (type: StructureNode["type"]) => {
        switch (type) {
          case "page":
            return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
          case "section":
            return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30";
          case "card":
            return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
          case "sidebar":
            return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
          case "navbar":
            return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30";
          case "widget":
            return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30";
          default:
            return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30";
        }
      };

      return (
        <div key={node.id} className="space-y-1">
          <div
            className={cn(
              "group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all border",
              isSelected
                ? "border-blue-500/80 bg-blue-50/90 text-blue-950 dark:border-blue-500/50 dark:bg-blue-950/40 dark:text-blue-100 shadow-xs"
                : "border-transparent bg-white/70 hover:border-slate-200 hover:bg-slate-50/90 dark:bg-[#151921]/70 dark:hover:border-white/10 dark:hover:bg-[#181D24]"
            )}
            style={{ marginLeft: `${level * 18}px` }}
          >
            <div className="flex items-center gap-2 truncate min-w-0 flex-1">
              {/* Checkbox */}
              <button
                type="button"
                onClick={() => handleToggleSelect(node.id)}
                className="cursor-pointer text-blue-600 dark:text-blue-400 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 shrink-0"
              >
                {isSelected ? <CheckSquare size={16} /> : <Square size={16} className="text-slate-400" />}
              </button>

              {/* Expand toggle */}
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggleExpandNode(node.id)}
                  className="cursor-pointer text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5 shrink-0"
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              ) : (
                <span className="w-3.5 shrink-0" />
              )}

              {/* Node Type Badge */}
              <span
                className={cn(
                  "rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0",
                  getTypeBadge(node.type)
                )}
              >
                {node.type}
              </span>

              {/* Node Name */}
              <span className="font-bold text-slate-800 dark:text-slate-100 truncate">
                {node.name}
              </span>

              {/* Description preview */}
              {node.description && (
                <span className="hidden md:inline text-[11px] text-slate-500 dark:text-slate-400 truncate opacity-75">
                  — {node.description}
                </span>
              )}
            </div>

            {/* Quick Actions on Hover */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedNodeIds([node.id]);
                  handleOpenEditModal();
                }}
                className="cursor-pointer p-1 rounded hover:bg-slate-200 text-slate-500 dark:hover:bg-white/10 dark:text-slate-300"
                title="Chỉnh sửa nút này"
              >
                <Edit3 size={12} />
              </button>
              <button
                type="button"
                onClick={() => onGeneratePromptForNodes([node], "custom")}
                className="cursor-pointer p-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                title="Sinh prompt cho thành phần này"
              >
                <Wand2 size={12} />
              </button>
            </div>
          </div>

          {/* Render Children */}
          {hasChildren && isExpanded && (
            <div className="space-y-1 pl-1 border-l border-slate-200/80 dark:border-white/10 ml-4">
              {renderTreeNodes(node.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Controls & Action Buttons Bar */}
      <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 shadow-xs dark:border-white/10 dark:bg-[#12161C]/90">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <FolderTree size={16} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Cấu trúc Website (Cây thư mục &amp; Thành phần)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Chọn các thành phần để Thêm, Chỉnh, Xóa, Nhập hoặc sinh câu lệnh Prompt AI
              </p>
            </div>
          </div>

          {/* 4 Action Buttons: Thêm / Chỉnh / Xóa / Nhập */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700"
              title="Thêm thành phần / section mới"
            >
              <Plus size={13} />
              <span>Thêm</span>
            </button>

            <button
              type="button"
              onClick={handleOpenEditModal}
              disabled={selectedNodeIds.length === 0}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:bg-[#181D24] dark:text-slate-200"
              title="Chỉnh sửa thông tin thành phần đã chọn"
            >
              <Edit3 size={13} className="text-amber-500" />
              <span>Chỉnh ({selectedNodeIds.length})</span>
            </button>

            <button
              type="button"
              onClick={handleOpenDeleteModal}
              disabled={selectedNodeIds.length === 0}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 shadow-xs transition-all hover:bg-rose-100 disabled:opacity-40 dark:bg-rose-950/30 dark:text-rose-300"
              title="Xóa thành phần đã chọn khỏi cấu trúc"
            >
              <Trash2 size={13} />
              <span>Xóa</span>
            </button>

            <button
              type="button"
              onClick={handleOpenImportModal}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-[#181D24] dark:text-slate-200"
              title="Nhập / Xuất cấu trúc JSON"
            >
              <Download size={13} className="text-emerald-500" />
              <span>Nhập / Xuất</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-[#181D24]"
              title="Khôi phục cấu trúc chuẩn"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* Search & Bulk Select bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-white/10">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm trang, section, card hoặc selector..."
              className="w-full rounded-lg border border-slate-200/80 bg-slate-50 py-1.5 pl-9 pr-3 text-xs outline-none focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-[#181D24] dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleSelectAll(true)}
              className="cursor-pointer font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Chọn tất cả ({allFlatNodes.length})
            </button>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <button
              type="button"
              onClick={() => handleSelectAll(false)}
              className="cursor-pointer font-semibold text-slate-500 hover:underline dark:text-slate-400"
            >
              Bỏ chọn
            </button>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <button
              type="button"
              onClick={() => handleToggleExpandAll(true)}
              className="cursor-pointer text-slate-600 hover:underline dark:text-slate-300"
            >
              Mở rộng
            </button>
            <button
              type="button"
              onClick={() => handleToggleExpandAll(false)}
              className="cursor-pointer text-slate-600 hover:underline dark:text-slate-300"
            >
              Thu gọn
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      {actionSuccessMsg && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 animate-fadeIn">
          <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Tree Content Area */}
      <div className="custom-scrollbar max-h-[480px] overflow-y-auto space-y-1.5 p-1">
        {filteredTree.length > 0 ? (
          renderTreeNodes(filteredTree)
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400 dark:border-white/10">
            Không tìm thấy thành phần nào phù hợp với từ khóa "{searchQuery}".
          </div>
        )}
      </div>

      {/* Bottom Floating Action: Generate Prompt for Selected Nodes */}
      {selectedNodeIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-500/40 bg-blue-50/90 p-3.5 shadow-sm dark:border-blue-500/30 dark:bg-blue-950/40 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
              {selectedNodeIds.length}
            </span>
            <span className="text-xs font-bold text-blue-950 dark:text-blue-100">
              Đã chọn {selectedNodeIds.length} mục trong cấu trúc website
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onGeneratePromptForNodes(selectedNodes, "custom")}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700"
            >
              <Wand2 size={13} />
              <span>Tạo Prompt cho các mục đã chọn</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL 1: THÊM (ADD) */}
      {activeModal === "add" && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#12161C] dark:text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Plus size={16} className="text-blue-600" />
                <h4 className="text-sm font-bold">Thêm thành phần mới vào cấu trúc</h4>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Tên thành phần (*):</label>
                <input
                  type="text"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  placeholder="Ví dụ: Khối Đánh Giá Khách Hàng (Testimonials)"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#181D24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Loại thành phần:</label>
                  <select
                    value={newNodeType}
                    onChange={(e) => setNewNodeType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none dark:border-white/10 dark:bg-[#181D24]"
                  >
                    <option value="section">Section</option>
                    <option value="card">Card / Khối</option>
                    <option value="page">Trang (Page)</option>
                    <option value="widget">Widget</option>
                    <option value="navbar">Thanh điều hướng</option>
                    <option value="modal">Modal / Popup</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Nằm trong cha:</label>
                  <select
                    value={selectedParentId}
                    onChange={(e) => setSelectedParentId(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none dark:border-white/10 dark:bg-[#181D24]"
                  >
                    <option value="">(Nút gốc Root)</option>
                    {allFlatNodes.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Mô tả chức năng:</label>
                <textarea
                  value={newNodeDesc}
                  onChange={(e) => setNewNodeDesc(e.target.value)}
                  rows={2}
                  placeholder="Mô tả công năng và bố cục..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#181D24]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:border-white/10"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmAdd}
                disabled={!newNodeName.trim()}
                className="cursor-pointer rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-40"
              >
                Thêm vào cấu trúc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CHỈNH (EDIT) */}
      {activeModal === "edit" && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#12161C] dark:text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Edit3 size={16} className="text-amber-500" />
                <h4 className="text-sm font-bold">Chỉnh sửa thông tin thành phần</h4>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Tên thành phần (*):</label>
                <input
                  type="text"
                  value={editNodeName}
                  onChange={(e) => setEditNodeName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#181D24]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">CSS Selector / Path:</label>
                <input
                  type="text"
                  value={editNodeSelector}
                  onChange={(e) => setEditNodeSelector(e.target.value)}
                  placeholder="Ví dụ: #cover-letter-main-card"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-mono text-xs outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#181D24]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Mô tả chi tiết:</label>
                <textarea
                  value={editNodeDesc}
                  onChange={(e) => setEditNodeDesc(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#181D24]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:border-white/10"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmEdit}
                disabled={!editNodeName.trim()}
                className="cursor-pointer rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-40"
              >
                Lưu thay đổi &amp; Tạo Prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: XÓA (DELETE) */}
      {activeModal === "delete" && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl border border-rose-200 bg-white p-5 shadow-2xl dark:border-rose-900/40 dark:bg-[#12161C] dark:text-white space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <Trash2 size={18} />
              <h4 className="text-sm font-bold">Xác nhận xóa thành phần</h4>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bạn có chắc chắn muốn xóa <strong className="text-rose-600">{selectedNodeIds.length}</strong> mục đã chọn khỏi cấu trúc website?
            </p>

            <div className="max-h-28 overflow-y-auto space-y-1 rounded-lg bg-slate-50 p-2 text-[11px] font-medium dark:bg-[#181D24]">
              {selectedNodes.map((n) => (
                <div key={n.id} className="text-slate-700 dark:text-slate-300 truncate">
                  • {n.name}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:border-white/10"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="cursor-pointer rounded-lg bg-rose-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-rose-700"
              >
                Xóa &amp; Tạo Prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: NHẬP / XUẤT (IMPORT / EXPORT) */}
      {activeModal === "import" && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#12161C] dark:text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Download size={16} className="text-emerald-500" />
                <h4 className="text-sm font-bold">Nhập / Xuất cấu trúc Website (JSON)</h4>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Bạn có thể sao chép JSON bên dưới để lưu trữ hoặc dán dữ liệu JSON mới để cập nhật toàn bộ cấu trúc:
            </p>

            <textarea
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              rows={10}
              className="w-full font-mono text-[11px] rounded-xl border border-slate-200/80 bg-slate-50 p-3 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#181D24] dark:text-slate-200 custom-scrollbar"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  onCopyText(importJsonText);
                  showFeedback("Đã sao chép dữ liệu JSON cấu trúc vào Clipboard!");
                }}
                className="flex cursor-pointer items-center gap-1 text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
              >
                <Copy size={13} />
                <span>Sao chép JSON</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:border-white/10"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleConfirmImport}
                  className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  Áp dụng JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
