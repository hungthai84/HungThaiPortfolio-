import React from "react";
import { motion } from "motion/react";
import { Images, CalendarDays, Heart, Sparkles, MapPin, Camera } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../lib/utils";

const memories = [
  { url: "https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp", title: "Mobifone 1", category: "Mobifone" },
  { url: "https://i.ibb.co/0HHrmyz/Mobifone-2.webp", title: "Mobifone 2", category: "Mobifone" },
  { url: "https://i.ibb.co/TDgZqxG9/Mobifone-3.webp", title: "Mobifone 3", category: "Mobifone" },
  { url: "https://i.ibb.co/ZzjXpjsX/HTVC-1.webp", title: "HTVC 1", category: "HTVC" },
  { url: "https://i.ibb.co/BKjZQfY5/HTVC-2.webp", title: "HTVC 2", category: "HTVC" },
  { url: "https://i.ibb.co/357kHb63/HTVC-3.webp", title: "HTVC 3", category: "HTVC" },
  { url: "https://i.ibb.co/39Sjm7S0/HTVC-4.webp", title: "HTVC 4", category: "HTVC" },
  { url: "https://i.ibb.co/ds1qm1WD/VED-1.webp", title: "VED 1", category: "VED (Garena)" },
  { url: "https://i.ibb.co/7d9BFsS6/VED-2.webp", title: "VED 2", category: "VED (Garena)" },
  { url: "https://i.ibb.co/1f4dHTyV/VED-3.webp", title: "VED 3", category: "VED (Garena)" },
  { url: "https://i.ibb.co/7xNbsP5j/VED-4.webp", title: "VED 4", category: "VED (Garena)" },
  { url: "https://i.ibb.co/CK2Y62Zy/Prudential-1.webp", title: "Prudential 1", category: "Prudential" },
  { url: "https://i.ibb.co/HD71024V/Prudential-2.webp", title: "Prudential 2", category: "Prudential" },
  { url: "https://i.ibb.co/TM32Dg85/Prudential-3.webp", title: "Prudential 3", category: "Prudential" },
  { url: "https://i.ibb.co/sd8bZfsk/Prudential-4.webp", title: "Prudential 4", category: "Prudential" },
  { url: "https://i.ibb.co/XZXnp2Dw/Prudential-5.webp", title: "Prudential 5", category: "Prudential" },
  { url: "https://i.ibb.co/1t8kkHGm/Prudential-6.webp", title: "Prudential 6", category: "Prudential" },
  { url: "https://i.ibb.co/Mk5S8vYR/Prudential-7.webp", title: "Prudential 7", category: "Prudential" },
  { url: "https://i.ibb.co/S7ySGnvC/Momo-1.webp", title: "Momo 1", category: "Momo" },
  { url: "https://i.ibb.co/v6K5jLsQ/Momo-2.webp", title: "Momo 2", category: "Momo" },
  { url: "https://i.ibb.co/DsvVt9C/Momo-3.webp", title: "Momo 3", category: "Momo" },
  { url: "https://i.ibb.co/gLdK4ss8/Momo-4.webp", title: "Momo 4", category: "Momo" },
  { url: "https://i.ibb.co/svYWnsHK/Momo-5.webp", title: "Momo 5", category: "Momo" },
  { url: "https://i.ibb.co/BVH5GdtT/Momo-6.webp", title: "Momo 6", category: "Momo" },
  { url: "https://i.ibb.co/G3MgYJp3/Momo-7.webp", title: "Momo 7", category: "Momo" },
  { url: "https://i.ibb.co/398WZf65/Momo-8.webp", title: "Momo 8", category: "Momo" },
  { url: "https://i.ibb.co/Rp4jmTWF/Finviet-1.webp", title: "Finviet 1", category: "Finviet" },
  { url: "https://i.ibb.co/gM7nPptY/V247-3.jpg", title: "V247-3", category: "V247" },
  { url: "https://i.ibb.co/vr4hB1m/V247-2.jpg", title: "V247-2", category: "V247" },
  { url: "https://i.ibb.co/s9gsmSHs/V247-4.jpg", title: "V247-4", category: "V247" },
  { url: "https://i.ibb.co/WNQkxzYQ/V247-5.jpg", title: "V247-5", category: "V247" },
  { url: "https://i.ibb.co/9HwPTKGg/V247-1.jpg", title: "V247-1", category: "V247" },
];

export function Memories() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen w-full px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          >
            <Sparkles size={14} />
            <span className="uppercase tracking-widest">
              {language === "vi" ? "Kho lưu trữ dấu ấn" : "Gallery of Milestones"}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-black tracking-tighter text-slate-900 md:text-6xl dark:text-white"
          >
            {t.nav.memories}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg font-bold text-slate-500 dark:text-slate-400"
          >
            {t.navDesc.memories}
          </motion.p>
        </div>

        {/* Masonry Layout */}
        <div className="masonry-grid w-full">
          {memories.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx % 10 * 0.05 }}
              viewport={{ once: true }}
              className="masonry-item group relative mb-6 break-inside-avoid overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-xl transition-all duration-500 hover:shadow-amber-500/20"
            >
              <div className="aspect-auto overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Camera size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {photo.category}
                    </span>
                  </div>
                  <h3 className="mt-1 text-xl font-black text-white tracking-tight">
                    {photo.title}
                  </h3>
                </div>
              </div>

              {/* Subtle Border Glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-300 group-hover:border-amber-500/30" />
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .masonry-grid {
          columns: 1;
          column-gap: 1.5rem;
        }
        
        @media (min-width: 640px) {
          .masonry-grid {
            columns: 2;
          }
        }
        
        @media (min-width: 1024px) {
          .masonry-grid {
            columns: 3;
          }
        }

        @supports (grid-template-rows: masonry) {
          .masonry-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: masonry;
            gap: 1.5rem;
          }
          
          @media (min-width: 640px) {
            .masonry-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .masonry-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .masonry-item {
            margin-bottom: 0;
          }
        }
      `}} />
    </div>
  );
}
