import React from "react";
import { motion } from "motion/react";
import { Sparkles, Camera } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../lib/utils";
import { PageLayout } from "../components/PageLayout";

interface MemoryItem {
  url: string;
  title: string;
  category: string;
  aspect: string;
}

const memories: MemoryItem[] = [
  { url: "https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp", title: "Mobifone 1", category: "Mobifone", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/0HHrmyz/Mobifone-2.webp", title: "Mobifone 2", category: "Mobifone", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/TDgZqxG9/Mobifone-3.webp", title: "Mobifone 3", category: "Mobifone", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/ZzjXpjsX/HTVC-1.webp", title: "HTVC 1", category: "HTVC", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/BKjZQfY5/HTVC-2.webp", title: "HTVC 2", category: "HTVC", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/357kHb63/HTVC-3.webp", title: "HTVC 3", category: "HTVC", aspect: "aspect-[1/1]" },
  { url: "https://i.ibb.co/39Sjm7S0/HTVC-4.webp", title: "HTVC 4", category: "HTVC", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/ds1qm1WD/VED-1.webp", title: "VED 1", category: "VED (Garena)", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/7d9BFsS6/VED-2.webp", title: "VED 2", category: "VED (Garena)", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/1f4dHTyV/VED-3.webp", title: "VED 3", category: "VED (Garena)", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/7xNbsP5j/VED-4.webp", title: "VED 4", category: "VED (Garena)", aspect: "aspect-[1/1]" },
  { url: "https://i.ibb.co/CK2Y62Zy/Prudential-1.webp", title: "Prudential 1", category: "Prudential", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/HD71024V/Prudential-2.webp", title: "Prudential 2", category: "Prudential", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/TM32Dg85/Prudential-3.webp", title: "Prudential 3", category: "Prudential", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/sd8bZfsk/Prudential-4.webp", title: "Prudential 4", category: "Prudential", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/XZXnp2Dw/Prudential-5.webp", title: "Prudential 5", category: "Prudential", aspect: "aspect-[1/1]" },
  { url: "https://i.ibb.co/1t8kkHGm/Prudential-6.webp", title: "Prudential 6", category: "Prudential", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/Mk5S8vYR/Prudential-7.webp", title: "Prudential 7", category: "Prudential", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/S7ySGnvC/Momo-1.webp", title: "Momo 1", category: "Momo", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/v6K5jLsQ/Momo-2.webp", title: "Momo 2", category: "Momo", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/DsvVt9C/Momo-3.webp", title: "Momo 3", category: "Momo", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/gLdK4ss8/Momo-4.webp", title: "Momo 4", category: "Momo", aspect: "aspect-[1/1]" },
  { url: "https://i.ibb.co/svYWnsHK/Momo-5.webp", title: "Momo 5", category: "Momo", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/BVH5GdtT/Momo-6.webp", title: "Momo 6", category: "Momo", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/G3MgYJp3/Momo-7.webp", title: "Momo 7", category: "Momo", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/398WZf65/Momo-8.webp", title: "Momo 8", category: "Momo", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/Rp4jmTWF/Finviet-1.webp", title: "Finviet 1", category: "Finviet", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/gM7nPptY/V247-3.jpg", title: "V247-3", category: "V247", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/vr4hB1m/V247-2.jpg", title: "V247-2", category: "V247", aspect: "aspect-[16/10]" },
  { url: "https://i.ibb.co/s9gsmSHs/V247-4.jpg", title: "V247-4", category: "V247", aspect: "aspect-[4/3]" },
  { url: "https://i.ibb.co/WNQkxzYQ/V247-5.jpg", title: "V247-5", category: "V247", aspect: "aspect-[1/1]" },
  { url: "https://i.ibb.co/9HwPTKGg/V247-1.jpg", title: "V247-1", category: "V247", aspect: "aspect-[16/10]" },
];

export function Memories() {
  const { language, t } = useLanguage();

  const isVi = language === "vi";

  return (
    <PageLayout
      id="memories-main-card"
      pageId="memories"
      pageName={t.nav.memories}
      title={t.nav.memories}
      subtitle={t.navDesc.memories}
      icon={Camera}
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
      hideToolbar={true}
    >
      <div className="w-full max-w-7xl mx-auto pb-8">
        {/* Pinterest-Style Masonry Grid */}
        <div className="memories-masonry-grid w-full">
          {memories.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 8) * 0.04, duration: 0.3 }}
              viewport={{ once: true }}
              className="memories-masonry-item group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Reserved Aspect Ratio Image Box */}
              <div className={cn("w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative", photo.aspect)}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay / Caption */}
              <div className="p-3.5 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-white/5 bg-white/95 dark:bg-slate-900/95">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <Camera size={12} />
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      {photo.category}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .memories-masonry-grid {
          columns: 1;
          column-gap: 10px;
        }
        
        @media (min-width: 640px) {
          .memories-masonry-grid {
            columns: 2;
          }
        }
        
        @media (min-width: 1024px) {
          .memories-masonry-grid {
            columns: 3;
          }
        }

        @media (min-width: 1280px) {
          .memories-masonry-grid {
            columns: 4;
          }
        }

        .memories-masonry-item {
          break-inside: avoid;
          margin-bottom: 10px;
          display: inline-block;
          width: 100%;
        }

        @supports (grid-template-rows: masonry) {
          .memories-masonry-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: masonry;
            gap: 10px;
          }
          
          @media (min-width: 640px) {
            .memories-masonry-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .memories-masonry-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (min-width: 1280px) {
            .memories-masonry-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .memories-masonry-item {
            margin-bottom: 0;
            display: block;
          }
        }
      `}} />
    </PageLayout>
  );
}

