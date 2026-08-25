import React, { useState } from "react";
import {
  FolderTree,
  ChevronRight,
  ChevronDown,
  Code,
  Layers,
  Sparkles,
  MousePointerClick,
  FileCode,
  Folder,
  FolderOpen,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface DomTreeViewerProps {
  selectedElement: HTMLElement;
  elementHierarchy: HTMLElement[];
  elementChildren: HTMLElement[];
  onSelectElement: (el: HTMLElement) => void;
}

export function DomTreeViewer({
  selectedElement,
  elementHierarchy,
  elementChildren,
  onSelectElement,
}: DomTreeViewerProps) {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    root: true,
    parents: true,
    current: true,
    children: true,
  });

  const toggleNode = (nodeKey: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeKey]: !prev[nodeKey],
    }));
  };

  const getElementLabel = (el: HTMLElement) => {
    const tag = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : "";
    const classFirst =
      typeof el.className === "string" && el.className.trim()
        ? `.${el.className.split(" ")[0]}`
        : "";
    return { tag, id, classFirst };
  };

  return (
    <div className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-[#12161C]/80">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 dark:border-white/10">
        <div className="flex items-center gap-2">
          <FolderTree size={14} className="text-violet-500" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Cây thư mục DOM (Phả hệ cha - con)
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
          Nhấp vào bất kỳ mục nào để kiểm tra
        </span>
      </div>

      <div className="custom-scrollbar max-h-56 overflow-y-auto font-mono text-xs space-y-1 pr-1">
        {/* Ancestors / Parents Tree */}
        {elementHierarchy.length > 0 && (
          <div className="space-y-1">
            <div
              onClick={() => toggleNode("parents")}
              className="flex cursor-pointer items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 py-0.5"
            >
              {expandedNodes.parents ? <FolderOpen size={13} className="text-amber-500" /> : <Folder size={13} className="text-amber-500" />}
              <span className="text-[11px] font-bold">Thành phần cha ({elementHierarchy.length})</span>
            </div>

            {expandedNodes.parents && (
              <div className="ml-3 pl-2.5 border-l-2 border-slate-200 dark:border-white/10 space-y-1">
                {elementHierarchy.map((ancestor, index) => {
                  const { tag, id, classFirst } = getElementLabel(ancestor);
                  return (
                    <div
                      key={index}
                      onClick={() => onSelectElement(ancestor)}
                      className="group flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-slate-600 hover:bg-violet-50 hover:text-violet-700 dark:text-slate-300 dark:hover:bg-violet-950/30 dark:hover:text-violet-300 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-slate-400 select-none">├──</span>
                        <Code size={12} className="text-violet-400 shrink-0" />
                        <span className="font-bold text-violet-600 dark:text-violet-400">&lt;{tag}&gt;</span>
                        {id && <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate">{id}</span>}
                        {classFirst && (
                          <span className="text-slate-400 text-[10.5px] truncate opacity-75">
                            {classFirst}
                          </span>
                        )}
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 text-[10px] bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded font-sans shrink-0 ml-2">
                        Chọn
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Current Selected Element Node */}
        <div className="my-1.5 rounded-lg border border-blue-500/40 bg-blue-50/80 p-2 text-blue-950 dark:border-blue-500/30 dark:bg-blue-950/40 dark:text-blue-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
              <Code size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="font-bold text-blue-700 dark:text-blue-300">
                &lt;{selectedElement.tagName.toLowerCase()}&gt;
              </span>
              {selectedElement.id && (
                <span className="text-blue-600 dark:text-blue-400 text-[11px] truncate">
                  #{selectedElement.id}
                </span>
              )}
              {selectedElement.className && typeof selectedElement.className === "string" && (
                <span className="text-blue-500/80 dark:text-blue-300/70 text-[10.5px] truncate">
                  .{selectedElement.className.split(" ")[0]}
                </span>
              )}
            </div>
            <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-sans font-bold text-white shrink-0">
              Hiện tại
            </span>
          </div>
        </div>

        {/* Children Elements Tree */}
        {elementChildren.length > 0 ? (
          <div className="space-y-1">
            <div
              onClick={() => toggleNode("children")}
              className="flex cursor-pointer items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 py-0.5"
            >
              {expandedNodes.children ? <FolderOpen size={13} className="text-sky-500" /> : <Folder size={13} className="text-sky-500" />}
              <span className="text-[11px] font-bold">Thành phần con ({elementChildren.length})</span>
            </div>

            {expandedNodes.children && (
              <div className="ml-3 pl-2.5 border-l-2 border-slate-200 dark:border-white/10 space-y-1">
                {elementChildren.map((child, index) => {
                  const { tag, id, classFirst } = getElementLabel(child);
                  const isLast = index === elementChildren.length - 1;
                  return (
                    <div
                      key={index}
                      onClick={() => onSelectElement(child)}
                      className="group flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-slate-400 select-none">{isLast ? "└──" : "├──"}</span>
                        <Code size={12} className="text-sky-500 shrink-0" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">&lt;{tag}&gt;</span>
                        {id && <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate">{id}</span>}
                        {classFirst && (
                          <span className="text-slate-400 text-[10.5px] truncate opacity-75">
                            {classFirst}
                          </span>
                        )}
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-sans shrink-0 ml-2">
                        Chọn
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="pl-4 py-1 text-[11px] text-slate-400 italic">
            └── (Không có thành phần con trực tiếp)
          </div>
        )}
      </div>
    </div>
  );
}
