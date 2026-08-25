import { useState, useRef, useEffect } from "react";
import { X, Printer, Download, ZoomIn, ZoomOut, FileText } from "lucide-react";
import { PrintableResume } from "./PrintableResume";
import { generateAndDownloadTxt } from "../utils/exportTxt";

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (lang: "vi" | "en") => void;
  onPrint: (lang: "vi" | "en") => void;
  isDownloading?: boolean;
  downloadPercent?: number;
  downloadStatus?: string;
}

export function PdfPreviewModal({
  isOpen,
  onClose,
  onDownload,
  onPrint,
  isDownloading = false,
  downloadPercent = 0,
  downloadStatus = "",
}: PdfPreviewModalProps) {
  const [previewLanguage, setPreviewLanguage] = useState<"vi" | "en">("vi");
  const [zoom, setZoom] = useState<number>(0.85); // 0.5 to 1.2 scale
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number>(0);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCardHeight(entry.contentRect.height);
      }
    });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isOpen, previewLanguage]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[1000] flex flex-col overflow-hidden bg-slate-950/30 backdrop-blur-[3px] duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
    >
      {/* SCROLLABLE PREVIEW FRAME */}
      <div className="no-scrollbar flex flex-1 flex-col items-center overflow-y-auto p-3 sm:p-6 select-none">
        {/* CONTAINER MATCHING DYNAMIC SCALED CARD WIDTH */}
        <div
          className="flex flex-col gap-3 transition-all duration-200 items-center mx-auto"
          style={{
            width: `min(100%, ${820 * zoom}px)`,
          }}
        >
          {/* HEADER CONTROL TOOLBAR (Matching card width exactly, Transparent Light Theme) */}
          <div className="sticky top-0 z-50 flex w-full flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-xl backdrop-blur-md dark:border-slate-300/80 dark:bg-white/90 text-slate-800">
            {/* Title & Info */}
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600 shrink-0">
                <FileText size={18} />
              </div>
              <div>
                <h2
                  id="pdf-modal-title"
                  className="text-xs font-black tracking-wider text-slate-900 uppercase sm:text-sm"
                >
                  {previewLanguage === "vi"
                    ? "XEM TRƯỚC HỒ SƠ NĂNG LỰC (A4)"
                    : "EXECUTIVE RESUME PREVIEW (A4)"}
                </h2>
                <p className="text-[10px] font-bold text-slate-500">
                  {previewLanguage === "vi"
                    ? "Tối ưu chuẩn in ấn & Tải file PDF trực tiếp"
                    : "Optimized for paper printing & High-fidelity PDF download"}
                </p>
              </div>
            </div>

            {/* Toolbar Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Language Selector */}
              <div className="flex items-center rounded-xl bg-slate-100/90 p-1 border border-slate-200/80">
                <button
                  onClick={() => setPreviewLanguage("vi")}
                  className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-black transition-all ${
                    previewLanguage === "vi"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Tiếng Việt (A4)
                </button>
                <button
                  onClick={() => setPreviewLanguage("en")}
                  className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-black transition-all ${
                    previewLanguage === "en"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  English (A4)
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 rounded-xl bg-slate-100/90 p-1 border border-slate-200/80 text-slate-700">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                  className="cursor-pointer rounded-lg p-1 hover:bg-slate-200/80 disabled:opacity-40"
                  title="Thu nhỏ (Zoom Out)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={15} />
                </button>
                <span className="w-9 text-center text-[10px] font-black text-slate-800 select-none">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 1.2}
                  className="cursor-pointer rounded-lg p-1 hover:bg-slate-200/80 disabled:opacity-40"
                  title="Phóng to (Zoom In)"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={15} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                {/* Download TXT */}
                <button
                  onClick={generateAndDownloadTxt}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <FileText size={14} />
                  <span>
                    {previewLanguage === "vi" ? "Xuất Data TXT" : "Export Data TXT"}
                  </span>
                </button>

                {/* Download PDF */}
                <button
                  onClick={() => onDownload(previewLanguage)}
                  disabled={isDownloading}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-black text-white shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-55"
                >
                  <Download size={14} />
                  <span>
                    {isDownloading
                      ? previewLanguage === "vi"
                        ? "Đang xuất..."
                        : "Generating..."
                      : previewLanguage === "vi"
                        ? "Tải PDF"
                        : "Download PDF"}
                  </span>
                </button>

                {/* Print */}
                <button
                  onClick={() => onPrint(previewLanguage)}
                  disabled={isDownloading}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <Printer size={14} />
                  <span>{previewLanguage === "vi" ? "In CV" : "Print CV"}</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="ml-1 cursor-pointer rounded-xl bg-slate-100 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  title="Đóng cửa sổ"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* DOWNLOADING PROGRESS LOADER */}
          {isDownloading && (
            <div className="flex w-full items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/90 px-4 py-2 text-xs font-black text-indigo-700 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-ping rounded-full bg-indigo-600" />
                <span>{downloadStatus || "Đang chuẩn bị dữ liệu..."}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-indigo-200">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${downloadPercent}%` }}
                  />
                </div>
                <span>{downloadPercent}%</span>
              </div>
            </div>
          )}

          {/* DOCUMENT CANVAS CONTAINER MATCHING CARD WIDTH EXACTLY */}
          <div
            className="relative w-full overflow-hidden transition-all duration-200"
            style={{
              height: cardHeight ? `${cardHeight * zoom + 16}px` : "auto",
            }}
          >
            <div
              ref={cardRef}
              className="origin-top-left transition-all duration-200"
              style={{
                width: "820px",
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
            >
              {/* Inner Printable CV wrapper */}
              <div className="w-full rounded-xl border border-slate-300/80 bg-white p-1 text-slate-900 shadow-2xl select-text">
                <PrintableResume
                  forceLanguage={previewLanguage}
                  isForPreview={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
