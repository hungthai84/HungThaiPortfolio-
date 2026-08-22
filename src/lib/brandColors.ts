export interface BrandColorConfig {
  name: string;
  borderColorClass: string;
  ringColorClass: string;
  shadowStyle: string;
  logoGlowStyle: string;
  cardGlowStyle: string;
  hex: string;
  cardBorderClass: string;
  textClass: string;
  bgBadgeClass: string;
  bgGradient: string;
}

export function getBrandColorConfig(companyOrYear: string): BrandColorConfig {
  const str = (companyOrYear || "").toLowerCase();

  // 1. Mobifone : màu xanh dương (Blue)
  if (str.includes("mobifone") || str.includes("mobi") || str.includes("2003")) {
    const hex = "#2563eb";
    return {
      name: "Mobifone",
      borderColorClass: "border-blue-600 dark:border-blue-500",
      ringColorClass: "ring-blue-500/50",
      shadowStyle: "0 0 20px rgba(37, 99, 235, 0.65)",
      logoGlowStyle: "0 0 12px rgba(37, 99, 235, 0.8), 0 0 24px rgba(37, 99, 235, 0.35)",
      cardGlowStyle: "0 0 22px rgba(37, 99, 235, 0.25), 0 8px 32px rgba(0, 0, 0, 0.08)",
      hex,
      cardBorderClass: "border-blue-600 dark:border-blue-500",
      textClass: "text-blue-600 dark:text-blue-400",
      bgBadgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
      bgGradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.04) 50%, var(--card) 100%)",
    };
  }

  // 2. V247 : màu cam (Orange)
  if (str.includes("v247") || str.includes("viễn liên") || str.includes("2007")) {
    const hex = "#f97316";
    return {
      name: "V247",
      borderColorClass: "border-orange-500 dark:border-orange-400",
      ringColorClass: "ring-orange-500/50",
      shadowStyle: "0 0 20px rgba(249, 115, 22, 0.65)",
      logoGlowStyle: "0 0 12px rgba(249, 115, 22, 0.8), 0 0 24px rgba(249, 115, 22, 0.35)",
      cardGlowStyle: "0 0 22px rgba(249, 115, 22, 0.25), 0 8px 32px rgba(0, 0, 0, 0.08)",
      hex,
      cardBorderClass: "border-orange-500 dark:border-orange-400",
      textClass: "text-orange-600 dark:text-orange-400",
      bgBadgeClass: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
      bgGradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.04) 50%, var(--card) 100%)",
    };
  }

  // 3. LBC : màu tím (Purple)
  if (str.includes("lbc") || str.includes("cuộc sống") || str.includes("htvc") || str.includes("2011")) {
    const hex = "#9333ea";
    return {
      name: "LBC",
      borderColorClass: "border-purple-600 dark:border-purple-400",
      ringColorClass: "ring-purple-500/50",
      shadowStyle: "0 0 20px rgba(147, 51, 234, 0.65)",
      logoGlowStyle: "0 0 12px rgba(147, 51, 234, 0.8), 0 0 24px rgba(147, 51, 234, 0.35)",
      cardGlowStyle: "0 0 22px rgba(147, 51, 234, 0.25), 0 8px 32px rgba(0, 0, 0, 0.08)",
      hex,
      cardBorderClass: "border-purple-600 dark:border-purple-400",
      textClass: "text-purple-600 dark:text-purple-400",
      bgBadgeClass: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
      bgGradient: "linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0.04) 50%, var(--card) 100%)",
    };
  }

  // 4. VED : màu Xám tro (Ash Gray)
  if (str.includes("ved") || str.includes("esport") || str.includes("garena") || str.includes("2013")) {
    const hex = "#64748b"; // Màu xám tro sắc nét (Slate / Ash Gray)
    return {
      name: "VED",
      borderColorClass: "border-slate-500 dark:border-slate-400",
      ringColorClass: "ring-slate-500/50",
      shadowStyle: "0 0 20px rgba(100, 116, 139, 0.65)",
      logoGlowStyle: "0 0 12px rgba(100, 116, 139, 0.85), 0 0 24px rgba(100, 116, 139, 0.4)",
      cardGlowStyle: "0 0 22px rgba(100, 116, 139, 0.28), 0 8px 32px rgba(0, 0, 0, 0.08)",
      hex,
      cardBorderClass: "border-slate-500 dark:border-slate-400",
      textClass: "text-slate-700 dark:text-slate-300",
      bgBadgeClass: "bg-slate-500/15 text-slate-800 dark:text-slate-200 border-slate-500/30",
      bgGradient: "linear-gradient(135deg, rgba(100, 116, 139, 0.18) 0%, rgba(100, 116, 139, 0.05) 50%, var(--card) 100%)",
    };
  }

  // 5. Prudential : màu đỏ (Red)
  if (str.includes("prudential") || str.includes("2016")) {
    const hex = "#dc2626";
    return {
      name: "Prudential",
      borderColorClass: "border-red-600 dark:border-red-500",
      ringColorClass: "ring-red-600/50",
      shadowStyle: "0 0 20px rgba(220, 38, 38, 0.65)",
      logoGlowStyle: "0 0 12px rgba(220, 38, 38, 0.8), 0 0 24px rgba(220, 38, 38, 0.35)",
      cardGlowStyle: "0 0 22px rgba(220, 38, 38, 0.25), 0 8px 32px rgba(0, 0, 0, 0.08)",
      hex,
      cardBorderClass: "border-red-600 dark:border-red-500",
      textClass: "text-red-600 dark:text-red-400",
      bgBadgeClass: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
      bgGradient: "linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.04) 50%, var(--card) 100%)",
    };
  }

  // 6. Momo : màu hồng (Pink)
  if (str.includes("momo") || str.includes("mservice") || str.includes("2018")) {
    const hex = "#ec4899";
    return {
      name: "Momo",
      borderColorClass: "border-pink-500 dark:border-pink-400",
      ringColorClass: "ring-pink-500/50",
      shadowStyle: "0 0 20px rgba(236, 72, 153, 0.65)",
      logoGlowStyle: "0 0 12px rgba(236, 72, 153, 0.8), 0 0 24px rgba(236, 72, 153, 0.35)",
      cardGlowStyle: "0 0 22px rgba(236, 72, 153, 0.25), 0 8px 32px rgba(0, 0, 0, 0.08)",
      hex,
      cardBorderClass: "border-pink-500 dark:border-pink-400",
      textClass: "text-pink-600 dark:text-pink-400",
      bgBadgeClass: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
      bgGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0.04) 50%, var(--card) 100%)",
    };
  }

  // 7. Finviet : màu vàng (Yellow)
  if (str.includes("finviet") || str.includes("eco") || str.includes("2023")) {
    const hex = "#eab308";
    return {
      name: "Finviet",
      borderColorClass: "border-amber-500 dark:border-yellow-400",
      ringColorClass: "ring-amber-500/50",
      shadowStyle: "0 0 20px rgba(234, 179, 8, 0.65)",
      logoGlowStyle: "0 0 12px rgba(234, 179, 8, 0.85), 0 0 24px rgba(234, 179, 8, 0.35)",
      cardGlowStyle: "0 0 22px rgba(234, 179, 8, 0.25), 0 8px 32px rgba(0, 0, 0, 0.08)",
      hex,
      cardBorderClass: "border-amber-500 dark:border-yellow-400",
      textClass: "text-amber-600 dark:text-yellow-400",
      bgBadgeClass: "bg-amber-500/15 text-amber-800 dark:text-yellow-300 border-amber-500/30",
      bgGradient: "linear-gradient(135deg, rgba(234, 179, 8, 0.16) 0%, rgba(234, 179, 8, 0.05) 50%, var(--card) 100%)",
    };
  }

  // 8. 2026 : màu xanh lá cây (Green)
  if (str.includes("2026") || str.includes("tương lai") || str.includes("sẵn sàng") || str.includes("future")) {
    const hex = "#16a34a"; // Green-600 / Emerald
    return {
      name: "2026",
      borderColorClass: "border-green-600 dark:border-emerald-400",
      ringColorClass: "ring-green-600/50",
      shadowStyle: "0 0 20px rgba(22, 163, 74, 0.65)",
      logoGlowStyle: "0 0 12px rgba(22, 163, 74, 0.85), 0 0 24px rgba(22, 163, 74, 0.35)",
      cardGlowStyle: "0 0 22px rgba(22, 163, 74, 0.25), 0 8px 32px rgba(0, 0, 0, 0.08)",
      hex,
      cardBorderClass: "border-green-600 dark:border-emerald-500",
      textClass: "text-green-600 dark:text-emerald-400",
      bgBadgeClass: "bg-green-500/15 text-green-700 dark:text-emerald-300 border-green-500/30",
      bgGradient: "linear-gradient(135deg, rgba(22, 163, 74, 0.15) 0%, rgba(22, 163, 74, 0.04) 50%, var(--card) 100%)",
    };
  }

  // Default fallback
  const hex = "#8b5cf6";
  return {
    name: companyOrYear,
    borderColorClass: "border-violet-500 dark:border-violet-400",
    ringColorClass: "ring-violet-500/50",
    shadowStyle: "0 0 20px rgba(139, 92, 246, 0.6)",
    logoGlowStyle: "0 0 12px rgba(139, 92, 246, 0.8), 0 0 24px rgba(139, 92, 246, 0.35)",
    cardGlowStyle: "0 0 22px rgba(139, 92, 246, 0.25), 0 8px 32px rgba(0, 0, 0, 0.08)",
    hex,
    cardBorderClass: "border-violet-500 dark:border-violet-400",
    textClass: "text-violet-600 dark:text-violet-400",
    bgBadgeClass: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
    bgGradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.04) 50%, var(--card) 100%)",
  };
}
