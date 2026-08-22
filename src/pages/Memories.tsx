import { useState, useEffect, useCallback } from "react";
import {
  Images,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Camera,
  Sparkles,
} from "lucide-react";
import { contentData } from "../data";
import { PageLayout } from "../components/PageLayout";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { useLanguage } from "../context/LanguageContext";

export function Memories() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(
    null,
  );

  // Lightbox handlers
  const openLightbox = (index: number) => {
    playUiSound("click");
    setActiveLightboxIdx(index);
  };

  const closeLightbox = () => {
    playUiSound("click");
    setActiveLightboxIdx(null);
  };

  const prevLightbox = useCallback(() => {
    playUiSound("click");
    if (activeLightboxIdx !== null) {
      setActiveLightboxIdx((prev) =>
        prev === 0
          ? contentData.memories.length - 1
          : prev !== null
            ? prev - 1
            : 0,
      );
    }
  }, [activeLightboxIdx]);

  const nextLightbox = useCallback(() => {
    playUiSound("click");
    if (activeLightboxIdx !== null) {
      setActiveLightboxIdx((prev) =>
        prev === contentData.memories.length - 1
          ? 0
          : prev !== null
            ? prev + 1
            : 0,
      );
    }
  }, [activeLightboxIdx]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIdx, prevLightbox, nextLightbox]);

  const getCompanyColor = (company: string) => {
    switch (company.toLowerCase()) {
      case "mobifone":
        return "bg-amber-500 text-white";
      case "v247":
        return "bg-sky-500 text-white";
      case "htvc":
        return "bg-purple-600 text-white";
      case "ved":
        return "bg-red-500 text-white";
      case "prudential":
        return "bg-emerald-600 text-white";
      case "momo":
        return "bg-pink-600 text-white";
      case "finviet":
        return "bg-cyan-600 text-white";
      default:
        return "bg-violet-600 text-white";
    }
  };

  return (
    <PageLayout
      id="memories-main-card"
      rootClassName="w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border border-[var(--border)] relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="memories"
      pageName="Memories Main Card"
      title={
        isVi
          ? "Nhật Ký Hành Trình & Kho Ảnh Kỷ Niệm Đồng Hành"
          : "Operational Chronicles & Professional Milestone Gallery"
      }
      subtitle={
        isVi
          ? "Bộ sưu tập hình ảnh kỷ niệm và các cột mốc."
          : "A gallery collection of memorable photos and professional milestones."
      }
      icon={Images}
      headerActions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-black text-violet-700 dark:text-violet-300 shadow-xs backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            <span>{isVi ? `${contentData.memories.length} Khoảnh Khắc Kỷ Niệm` : `${contentData.memories.length} Milestone Photos`}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs font-black text-pink-700 dark:text-pink-300 shadow-xs backdrop-blur-md">
            <Camera size={13} className="text-pink-600 dark:text-pink-400" />
            <span>{isVi ? "Tập Thể & Đối Tác" : "Team & Partners"}</span>
          </div>
        </div>
      }
    >
      <div className="flex w-full flex-col gap-6 pb-12 text-left">
        {/* PHOTO GRID */}
        <div className="columns-1 gap-5 space-y-5 transition-all duration-300 md:columns-2 lg:columns-3 xl:columns-4">
          {contentData.memories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(index * 0.03, 0.3) }}
              onClick={() => openLightbox(index)}
              className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-[10px] border border-slate-200/50 bg-[var(--card)] shadow-xs backdrop-blur-xl transition-all hover:border-violet-400 hover:shadow-md dark:border-slate-800/50 dark:bg-[var(--card)] dark:hover:border-violet-500"
            >
              <img
                src={item.img}
                alt={item.desc}
                className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Company Tag Top Corner */}
              <div className="absolute top-2.5 left-2.5 opacity-90 transition-opacity group-hover:opacity-100">
                <span
                  className={cn(
                    "rounded-lg px-2.5 py-0.5 text-[10px] font-black tracking-wider uppercase shadow-sm",
                    getCompanyColor(item.company),
                  )}
                >
                  {item.company}
                </span>
              </div>

              {/* Hover Caption Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3.5 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="mb-1.5 text-xs leading-snug font-bold text-white sm:text-sm">
                  {item.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider text-amber-300">
                  <Expand size={12} />
                  <span>Xem ảnh kích thước lớn</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ENTERPRISE MEMORIES BANNER */}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxIdx !== null &&
          contentData.memories[activeLightboxIdx] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950/90 p-4 backdrop-blur-xl sm:p-6"
              onClick={closeLightbox}
            >
              {/* Lightbox Top Header Bar */}
              <div
                className="z-10 flex w-full max-w-5xl items-center justify-between text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-xl px-3 py-1 text-xs font-extrabold uppercase shadow-sm",
                      getCompanyColor(
                        contentData.memories[activeLightboxIdx].company,
                      ),
                    )}
                  >
                    {contentData.memories[activeLightboxIdx].company}
                  </span>
                  <span className="text-xs font-extrabold text-slate-300">
                    {activeLightboxIdx + 1} {"/"} {contentData.memories.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={contentData.memories[activeLightboxIdx].img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer rounded-xl bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    title="Mở ảnh gốc trong tab mới"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button
                    onClick={closeLightbox}
                    className="cursor-pointer rounded-xl bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    title="Đóng (ESC)"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Main Lightbox Image Viewport */}
              <div
                className="relative my-auto flex max-h-[75vh] w-full max-w-5xl items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Prev Button */}
                <button
                  onClick={prevLightbox}
                  className="absolute top-1/2 left-2 z-20 -translate-y-1/2 cursor-pointer rounded-[10px] bg-white/10 p-3 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/25 sm:-left-12"
                  title="Ảnh trước (Mũi tên trái)"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Image */}
                <motion.img
                  key={activeLightboxIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  src={contentData.memories[activeLightboxIdx].img}
                  alt={contentData.memories[activeLightboxIdx].desc}
                  className="max-h-[75vh] max-w-full rounded-[10px] border border-white/10 object-contain shadow-2xl"
                />

                {/* Next Button */}
                <button
                  onClick={nextLightbox}
                  className="absolute top-1/2 right-2 z-20 -translate-y-1/2 cursor-pointer rounded-[10px] bg-white/10 p-3 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/25 sm:-right-12"
                  title="Ảnh tiếp theo (Mũi tên phải)"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Lightbox Bottom Caption Bar */}
              <div
                className="z-10 w-full max-w-2xl space-y-1 rounded-[10px] border border-slate-800 bg-slate-900/90 p-4 text-center text-white shadow-xl backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-sm font-bold text-amber-300 sm:text-base">
                  {contentData.memories[activeLightboxIdx].desc}
                </p>
                <p className="text-xs text-slate-400">
                  Nhấn phím mũi tên Trái / Phải để chuyển ảnh • Nhấn ESC để đóng
                </p>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </PageLayout>
  );
}
