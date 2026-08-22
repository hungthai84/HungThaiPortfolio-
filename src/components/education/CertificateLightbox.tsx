import React, { useState, useEffect } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShieldCheck,
  Download,
  Award,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface CertificateData {
  titleVi: string;
  titleEn: string;
  issuer: string;
  school: string;
  year: string;
  imageUrl: string;
  credentialId: string;
  palette?: {
    accentHex?: string;
  };
}

interface CertificateLightboxProps {
  certData: CertificateData | null;
  isOpen: boolean;
  onClose: () => void;
  isVi: boolean;
}

export function CertificateLightbox({
  certData,
  isOpen,
  onClose,
  isVi,
}: CertificateLightboxProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    // Reset zoom level when lightbox opens
    if (isOpen) {
      setZoomLevel(1);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !certData) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () =>
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-1 sm:p-2.5 md:p-4 overflow-y-auto">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* LIGHTBOX CONTAINER MATCHING EDUCATION-MAIN-CARD */}
        <motion.div
          id="certificate-lightbox-dialog"
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 flex h-full max-h-[750px] w-full max-w-[1280px] flex-col overflow-hidden rounded-[15px] sm:rounded-[20px] border border-[var(--border)] bg-white/95 text-slate-900 shadow-2xl backdrop-blur-2xl dark:bg-slate-900/95 dark:text-white transition-all mx-1 sm:mx-2"
        >
          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between gap-3 sm:gap-4 border-b border-slate-200/80 bg-white/50 p-3 sm:p-5 dark:border-slate-800/80 dark:bg-slate-950/50">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="shrink-0 rounded-[10px] border border-amber-500/20 bg-amber-500/10 p-2.5 text-amber-600 dark:border-amber-500/40 dark:bg-amber-500/20 dark:text-amber-400">
                <Award size={20} />
              </span>
              <div className="flex flex-col overflow-hidden text-left">
                <span className="font-mono text-[10px] font-black tracking-widest text-amber-600 uppercase dark:text-amber-400">
                  VERIFIED CERTIFICATE CREDENTIAL
                </span>
                <h3 className="truncate text-sm font-extrabold text-slate-900 sm:text-base dark:text-white">
                  {isVi ? certData.titleVi : certData.titleEn}
                </h3>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <div className="hidden sm:flex items-center gap-1 rounded-[12px] border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800/90 dark:shadow-none">
                <button
                  onClick={handleZoomOut}
                  title={isVi ? "Thu nhỏ" : "Zoom Out"}
                  className="cursor-pointer rounded-xl p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="min-w-[45px] px-2 text-center font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  title={isVi ? "Phóng to" : "Zoom In"}
                  className="cursor-pointer rounded-xl p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={handleResetZoom}
                  title={isVi ? "Đặt lại zoom" : "Reset Zoom"}
                  className="cursor-pointer rounded-xl p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              <button
                onClick={onClose}
                title={isVi ? "Đóng" : "Close"}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-rose-200 bg-rose-50 text-rose-600 shadow-sm transition-all hover:bg-rose-100 hover:text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/20 dark:text-rose-300 dark:shadow-md dark:hover:bg-rose-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* MAIN IMAGE DISPLAY CANVAS */}
          <div className="custom-scrollbar flex max-h-[70vh] min-h-[300px] sm:min-h-[400px] w-full flex-1 items-center justify-center overflow-auto bg-slate-100/50 p-4 sm:p-8 dark:bg-slate-950/80">
            <div
              className="flex h-full w-full origin-center items-center justify-center transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={certData.imageUrl}
                alt={certData.titleVi}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                className="h-auto max-h-[70vh] w-auto max-w-full rounded-[12px] sm:rounded-[16px] border border-slate-200 bg-white object-contain shadow-2xl dark:border-slate-700/80 dark:shadow-2xl"
              />
            </div>
          </div>

          {/* FOOTER DETAILS BAR */}
          <div className="flex shrink-0 flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-slate-200/80 bg-white/50 p-4 sm:p-5 text-xs sm:text-sm dark:border-slate-800/80 dark:bg-slate-950/50">
            <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-200">
                <GraduationCap
                  size={15}
                  className="text-amber-600 dark:text-amber-400"
                />
                <span>{certData.school}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-slate-200">
                <ShieldCheck
                  size={15}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                <span>{certData.issuer}</span>
              </span>
              <span>•</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                ID: {certData.credentialId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-[11px] font-extrabold text-emerald-400">
                <ShieldCheck size={13} />
                <span>CHỨNG CHỈ XÁC THỰC</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
