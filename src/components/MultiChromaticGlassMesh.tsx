import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface MultiChromaticGlassMeshProps {
  className?: string;
  intensity?: "subtle" | "vibrant" | "medium";
}

/**
 * Modern Multi-Chromatic Glassmorphism Background Mesh
 * Generates floating dynamic luminescent color spheres (Cyan, Violet, Fuchsia, Emerald, Amber, Electric Blue)
 * to provide the rich refractive color foundation for frosted glass surfaces.
 */
export function MultiChromaticGlassMesh({
  className,
  intensity = "vibrant",
}: MultiChromaticGlassMeshProps) {
  const opacityMap = {
    subtle: "opacity-40 dark:opacity-30",
    medium: "opacity-60 dark:opacity-50",
    vibrant: "opacity-85 dark:opacity-75",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none transition-opacity duration-1000",
        opacityMap[intensity],
        className
      )}
    >
      {/* Orb 1: Vibrant Violet / Purple - Top Left */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] -left-[10%] h-[550px] w-[550px] rounded-full bg-gradient-to-br from-violet-600/45 via-indigo-500/35 to-purple-600/30 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Orb 2: Electric Cyan / Sky Blue - Top Right */}
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-400/40 via-teal-400/35 to-blue-500/30 blur-[85px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Orb 3: Luminous Magenta / Rose / Pink - Center Right */}
      <motion.div
        animate={{
          x: [0, -60, 30, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.1, 0.88, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[35%] -right-[5%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-pink-500/40 via-rose-500/30 to-fuchsia-600/35 blur-[95px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Orb 4: Emerald / Mint Glow - Bottom Left */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, 40, -50, 0],
          scale: [1, 1.18, 0.92, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute -bottom-[10%] -left-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-emerald-400/35 via-teal-500/30 to-cyan-500/30 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Orb 5: Warm Amber / Sunset Gold - Bottom Center */}
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-[15%] left-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-amber-400/30 via-orange-500/25 to-rose-400/25 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Orb 6: Deep Royal Indigo / Blue - Center */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[25%] left-[25%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-indigo-500/25 via-blue-600/20 to-purple-500/25 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Iridescent Prismatic Shimmer Scanline / Grid (Subtle Glass Texture) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
    </div>
  );
}
