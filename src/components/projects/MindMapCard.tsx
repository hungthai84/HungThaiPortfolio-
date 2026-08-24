import React, { useState } from "react";
import {
  Network,
  Maximize2,
  X,
  ZoomIn,
  Download,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface MindMapCardProps {
  imageUrl: string;
  title: string;
}

export const MindMapCard: React.FC<MindMapCardProps> = ({
  imageUrl,
  title,
}) => {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="my-6 w-full space-y-4">
      {/* Mindmap Frame Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-2 text-indigo-500 shadow-sm dark:text-indigo-400">
            <Network size={20} />
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-base font-black text-[var(--text-primary)] sm:text-lg">
              <span>
                {isVi
                  ? "Sơ Đồ Tư Duy Strategic Mindmap"
                  : "Strategic Project Mindmap"}
              </span>
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-extrabold text-indigo-600 uppercase dark:text-indigo-400">
                Visual Workflow
              </span>
            </h4>
            <p className="text-xs font-medium text-[var(--muted)]">
              {isVi
                ? "Tổng quan cấu trúc & luồng thực thi dự án"
                : "Project execution workflow & architecture map"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700"
        >
          <Maximize2 size={13} />
          <span className="hidden sm:inline">
            {isVi ? "Phóng to sơ đồ" : "Zoom Mindmap"}
          </span>
        </button>
      </div>

      {/* Frame Container - Image Fills Frame */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group project-attachment-card relative w-full cursor-pointer overflow-hidden rounded-[15px] border-2 border-indigo-500/30 bg-[var(--card)] p-1 shadow-md hover:border-indigo-500 dark:border-indigo-400/30"
      >
        <div className="flex h-full max-h-[520px] min-h-[220px] w-full items-center justify-center rounded-xl bg-[var(--card)] p-2 sm:max-h-[600px] sm:p-4">
          <img
            src={imageUrl}
            alt={`Sơ đồ tư duy - ${title}`}
            className="h-auto max-h-[520px] w-full rounded-xl object-contain sm:max-h-[580px]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Floating Zoom Indicator Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/10 opacity-0 backdrop-blur-[2px] group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-2xl border border-indigo-400/40 bg-[var(--card)] px-4 py-2.5 text-xs font-bold text-[var(--text-primary)] shadow-md">
            <ZoomIn size={16} className="text-indigo-500" />
            <span>
              {isVi
                ? "Click để phóng to Sơ đồ HD"
                : "Click to View Full HD Mindmap"}
            </span>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[10px] font-bold text-[var(--text-primary)] shadow-lg backdrop-blur-md">
          <Sparkles size={12} className="text-amber-500" />
          <span>{title}</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-950/90 p-2 backdrop-blur-xl sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[15px] border border-indigo-500/40 bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/20 p-2 text-indigo-400">
                  <Network size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white sm:text-base">
                    {isVi
                      ? "Sơ Đồ Tư Duy Trực Quan"
                      : "Visual Mindmap Diagram"}
                  </h3>
                  <p className="max-w-md truncate text-xs font-medium text-slate-400">
                    {title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-slate-200 hover:bg-slate-700"
                  title={isVi ? "Tải ảnh gốc" : "Download HD Image"}
                >
                  <Download size={18} />
                </a>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-slate-200 hover:bg-rose-600 hover:text-white"
                  title={isVi ? "Đóng" : "Close"}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Image Container in Modal */}
            <div className="custom-scrollbar flex flex-1 items-center justify-center overflow-auto bg-slate-950 p-4">
              <img
                src={imageUrl}
                alt={title}
                className="h-auto max-w-full rounded-xl object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
