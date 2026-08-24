import { useGlobalRipple } from "./hooks/useGlobalRipple";
import { useScrollPosition } from "./hooks/useScrollPosition";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Image,
  X,
  Check,
  CheckCircle2,
  Layers,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sliders,
  Plus,
  Trash2,
  Link,
  Printer,
  Download,
  FileText,
  Languages,
  Sun,
  Moon,
  Palette,
  RotateCcw,
  Upload,
  Volume2,
  VolumeX,
  Type,
  Keyboard,
  Info,
  Search,
  AlertTriangle,
  Headphones,
  Music,
  MonitorSmartphone,
  Layout,
  Video,
  RefreshCw,
  RefreshCcw,
  Star,
  BookmarkCheck,
  Zap,
  Activity,
  ShieldCheck,
  MousePointer2,
  Box,
  Quote,
  Settings as SettingsIcon,
  Eye,
  EyeOff,
  ImageOff,
} from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Sidebar } from "./components/Sidebar";
import { RightSidebar } from "./components/RightSidebar";
import { PrintableResume } from "./components/PrintableResume";
import { PdfPreviewModal } from "./components/PdfPreviewModal";
import { useLanguage } from "./context/LanguageContext";
import { playUiSound } from "./lib/sound";
import { savePreferencesToCloud, loadPreferencesFromCloud } from "./lib/wallpaperSync";
import { auth } from "./lib/firebase";
import {
  syncAmbientWithWallpaper,
  setAmbientVolume,
  getAtmosphereForWallpaper,
} from "./lib/ambientSound";
import { Home as HomePage } from "./pages/Home";
import { CoverLetter } from "./pages/CoverLetter";
import { About } from "./pages/About";
import { Experience } from "./pages/Experience";
import { Industries } from "./pages/Industries";
import { Projects } from "./pages/Projects";
import { Memories } from "./pages/Memories";
import { Systems } from "./pages/Systems";
import { Education } from "./pages/Education";
import { Skills } from "./pages/Skills";
import { Interview } from "./pages/Interview";
import { AIChat } from "./pages/AIChat";
import { Wallpapers } from "./pages/Wallpapers";
import { WebsiteManagement } from "./pages/WebsiteManagement";
import { TemplateTest } from "./pages/TemplateTest";

import { cn } from "./lib/utils";
import {
  getDefaultVietnameseVoice,
  getDefaultEnglishVoice,
} from "./utils/speechUtils";
import { PageId } from "./types";
import { pageSequence } from "./lib/utils";
import { XRayPromptEditor } from "./components/xray/XRayPromptEditor";
import { GenerativeWaveWallpaper } from "./components/GenerativeWaveWallpaper";
import { GlassSoundEffect } from "./components/GlassSoundEffect";
import { MouseMagicCursor } from "./components/MouseMagicCursor";

export interface WallpaperOption {
  id: string;
  name: string;
  url?: string;
  previewUrl: string;
  type?: "image" | "video" | "css";
  cssClass?: string;
}

export interface ColorPreset {
  id: string;
  nameKey:
    | "presetSunset"
    | "presetOcean"
    | "presetForest"
    | "presetViolet"
    | "presetMinimal";
  theme: "light" | "dark";
  wallpaperId: string;
  gradient: string;
  badgeBg: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: "sky",
    nameKey: "presetOcean",
    theme: "light",
    wallpaperId: "img-wp-1",
    gradient: "from-[#0067C0] via-[#0078D4] to-[#2B88D8]",
    badgeBg: "bg-[#0067C0]/10 border-[#0067C0]/20 text-[#0067C0]",
  },
  {
    id: "carbon",
    nameKey: "presetMinimal",
    theme: "dark",
    wallpaperId: "none",
    gradient: "from-[#202020] via-[#2D2D2D] to-[#323232]",
    badgeBg: "bg-white/10 border-white/20 text-white",
  },
  {
    id: "emerald",
    nameKey: "presetForest",
    theme: "dark",
    wallpaperId: "css-cyan-blue",
    gradient: "from-[#107C10] via-[#27AE60] to-[#2ECC71]",
    badgeBg: "bg-[#107C10]/10 border-[#107C10]/20 text-[#4ADE80]",
  },
  {
    id: "rose",
    nameKey: "presetSunset",
    theme: "dark",
    wallpaperId: "img-wp-19",
    gradient: "from-[#E81123] via-[#EC4899] to-[#F43F5E]",
    badgeBg: "bg-[#E81123]/10 border-[#E81123]/20 text-[#F87171]",
  },
  {
    id: "mica",
    nameKey: "presetMinimal",
    theme: "dark",
    wallpaperId: "img-wp-11",
    gradient: "from-[#404040] via-[#323232] to-[#202020]",
    badgeBg: "bg-white/10 border-white/20 text-white",
  },
];

export const LIGHT_WALLPAPERS: WallpaperOption[] = [
  {
    id: "none",
    name: "🚫 Không Dùng Hình Nền (Xóa Hình Nền)",
    type: "css",
    cssClass: "bg-slate-100 dark:bg-slate-950",
    previewUrl: "",
  },
  // --- VIDEO WALLPAPERS ---
  {
    id: "vid-wp-1",
    name: "Ocean Waves (Video)",
    url: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    previewUrl:
      "https://images.pexels.com/videos/853889/free-video-853889.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    type: "video",
  },
  {
    id: "vid-wp-2",
    name: "Abstract Ink (Video)",
    url: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-21950-large.mp4",
    previewUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    type: "video",
  },
  {
    id: "vid-wp-3",
    name: "Fluid Colors (Video)",
    url: "https://cdn.pixabay.com/video/2021/08/04/83896-584742516_large.mp4",
    previewUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    type: "video",
  },
  // --- IMAGE WALLPAPERS ---
  {
    id: "img-wp-1",
    name: "Minimalist White Bright Space",
    url: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    previewUrl:
      "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    type: "image",
  },
  {
    id: "img-wp-2",
    name: "Geometric Mountain Calming Visuals",
    url: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    previewUrl:
      "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    type: "image",
  },
  {
    id: "img-wp-3",
    name: "Aesthetic Landscape 15",
    url: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg",
    previewUrl: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg",
    type: "image",
  },
  {
    id: "img-wp-4",
    name: "Aesthetic Landscape 14",
    url: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    type: "image",
  },
  {
    id: "img-wp-5",
    name: "Aesthetic Landscape 13",
    url: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg",
    type: "image",
  },
  {
    id: "img-wp-6",
    name: "Aesthetic Landscape 12",
    url: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg",
    previewUrl: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg",
    type: "image",
  },
  {
    id: "img-wp-7",
    name: "Pearlescent Abstract Hues",
    url: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    previewUrl:
      "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    type: "image",
  },
  {
    id: "img-wp-8",
    name: "Best Premium Wallpaper",
    url: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg",
    previewUrl: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg",
    type: "image",
  },
  {
    id: "img-wp-9",
    name: "Minimal Aesthetic Gradient 2",
    url: "https://i.ibb.co/rKL4ffH2/2.jpg",
    previewUrl: "https://i.ibb.co/rKL4ffH2/2.jpg",
    type: "image",
  },
  {
    id: "img-wp-10",
    name: "Soft Pastel Atmosphere 12",
    url: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg",
    previewUrl: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg",
    type: "image",
  },
  {
    id: "img-wp-11",
    name: "Abstract Silvery Pearlescent Minimal",
    url: "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg",
    previewUrl:
      "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg",
    type: "image",
  },
  {
    id: "img-wp-12",
    name: "Clean Aesthetic Wallpaper",
    url: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg",
    previewUrl: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg",
    type: "image",
  },
  {
    id: "img-wp-13",
    name: "Soft Atmosphere 15",
    url: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg",
    previewUrl: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg",
    type: "image",
  },
  {
    id: "img-wp-14",
    name: "Pastel Minimal Clean Aesthetic",
    url: "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg",
    previewUrl:
      "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg",
    type: "image",
  },
  {
    id: "img-wp-15",
    name: "Soft Atmosphere 14",
    url: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg",
    type: "image",
  },
  {
    id: "img-wp-16",
    name: "Soft Atmosphere 13",
    url: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    type: "image",
  },
  {
    id: "img-wp-17",
    name: "Soft Atmosphere 16",
    url: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg",
    previewUrl: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg",
    type: "image",
  },
  {
    id: "img-wp-18",
    name: "Abstract Gradient Circle",
    url: "https://i.ibb.co/r2w5qZCT/Download-Abstract-Gradient-Circle-Background-for-free.jpg",
    previewUrl:
      "https://i.ibb.co/r2w5qZCT/Download-Abstract-Gradient-Circle-Background-for-free.jpg",
    type: "image",
  },
  {
    id: "img-wp-19",
    name: "Mental Peace Rest Minimal",
    url: "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg",
    previewUrl:
      "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg",
    type: "image",
  },
  {
    id: "img-wp-20",
    name: "Serene Alpine Mountain Sunrise",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=3840&auto=format&fit=crop",
    previewUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    type: "image",
  },
  {
    id: "img-wp-21",
    name: "Cosmic Nebula Stardust Dreamscape",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=3840&auto=format&fit=crop",
    previewUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop",
    type: "image",
  },
  {
    id: "img-wp-22",
    name: "Minimalist Architecture Warm Sunlight",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=3840&auto=format&fit=crop",
    previewUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    type: "image",
  },
  {
    id: "img-wp-23",
    name: "Zen Bamboo Forest Calm Ambience",
    url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=3840&auto=format&fit=crop",
    previewUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
    type: "image",
  },
  {
    id: "img-wp-24",
    name: "Cyberpunk Neon Tokyo Cityscape",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=3840&auto=format&fit=crop",
    previewUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    type: "image",
  },
  {
    id: "img-wp-25",
    name: "Golden Hour Ocean Waves Minimal",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3840&auto=format&fit=crop",
    previewUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    type: "image",
  },
  {
    id: "img-wp-26",
    name: "Ocean Coastline Sunny Horizon",
    url: "https://images.pexels.com/videos/853889/free-video-853889.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    previewUrl: "https://images.pexels.com/videos/853889/free-video-853889.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    type: "image",
  },
  {
    id: "img-wp-27",
    name: "Abstract Ink Flow Fluid Art",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    previewUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    type: "image",
  },
];

export type RainbowColorId =
  | "monochrome"
  | "warm"
  | "blue"
  | "indigo"
  | "cyan"
  | "emerald"
  | "amber"
  | "coral"
  | "aurora"
  | "neon"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "violet"
  | "rainbow"
  | "wallpaper-adaptive"
  | "wallpaper-harmonic";

export interface PrimaryThemeColor {
  id: RainbowColorId;
  name: string;
  gradientClass: string;
  badgeBg: string;
  glowColor: string;
  hex: string;
}

export function getThemeForWallpaper(wallpaperId: string): "light" | "dark" {
  const id = wallpaperId.toLowerCase();
  
  // Custom or empty default
  if (id === "none") return "light";
  
  // Dark wallpapers
  if (
    id === "fluid-mesh" ||
    id === "aurora-rainbow" ||
    id === "silk-waves" ||
    id === "violet-glow" ||
    id === "anime-room" ||
    id === "chill-evening" ||
    id === "sunset-coffee" ||
    id === "cozy-study" ||
    id === "warm-living" ||
    id === "lofi-study" ||
    id === "video-waves" ||
    id === "video-stars" ||
    id === "video-rain" ||
    id === "video-dribbble-loop" ||
    id === "img-wp-19" ||
    id.includes("dark") ||
    id.includes("night") ||
    id.includes("black") ||
    id.includes("cozy") ||
    id.includes("carbon") ||
    id.includes("gold")
  ) {
    return "dark";
  }
  
  // By default, light/bright
  return "light";
}

export function getAdaptiveColorForWallpaper(wallpaperId: string): {
  hex: string;
  glowColor: string;
  name: string;
  gradientClass: string;
} {
  switch (wallpaperId) {
    case "fluid-mesh":
      return {
        hex: "#d946ef",
        glowColor: "rgba(217, 70, 239, 0.4)",
        name: "Hồng Phấn (Pastel Pink)",
        gradientClass:
          "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white",
      };
    case "aurora-rainbow":
      return {
        hex: "#06b6d4",
        glowColor: "rgba(6, 182, 212, 0.4)",
        name: "Cực Quang (Aurora Cyan)",
        gradientClass:
          "bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 text-white",
      };
    case "silk-waves":
      return {
        hex: "#8b5cf6",
        glowColor: "rgba(139, 92, 246, 0.4)",
        name: "Tím Tơ Lụa (Silk Purple)",
        gradientClass:
          "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
      };
    case "violet-glow":
      return {
        hex: "#a855f7",
        glowColor: "rgba(168, 85, 247, 0.4)",
        name: "Hào Quang Tím (Violet Glow)",
        gradientClass:
          "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
      };
    case "minimal-arch":
      return {
        hex: "#f59e0b",
        glowColor: "rgba(245, 158, 11, 0.4)",
        name: "Cam Cát Ấm (Sand Amber)",
        gradientClass:
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
      };
    case "anime-room":
      return {
        hex: "#f97316",
        glowColor: "rgba(249, 115, 22, 0.4)",
        name: "Cam Hoàng Hôn (Cozy Orange)",
        gradientClass: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
      };
    case "chill-evening":
      return {
        hex: "#ea580c",
        glowColor: "rgba(234, 88, 12, 0.4)",
        name: "Cam Đỏ Ấm (Warm Sunset)",
        gradientClass:
          "bg-gradient-to-r from-orange-600 to-rose-500 text-white",
      };
    case "sunset-coffee":
      return {
        hex: "#d97706",
        glowColor: "rgba(217, 119, 6, 0.4)",
        name: "Nâu Cà Phê (Sunset Coffee)",
        gradientClass:
          "bg-gradient-to-r from-amber-600 to-orange-600 text-white",
      };
    case "cozy-study":
      return {
        hex: "#10b981",
        glowColor: "rgba(16, 185, 129, 0.4)",
        name: "Lục Yên Bình (Peaceful Green)",
        gradientClass:
          "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
      };
    case "peaceful-window":
      return {
        hex: "#0ea5e9",
        glowColor: "rgba(14, 165, 233, 0.4)",
        name: "Xanh Khung Cửa (Sky Window)",
        gradientClass: "bg-gradient-to-r from-sky-400 to-blue-500 text-white",
      };
    case "warm-living":
      return {
        hex: "#f59e0b",
        glowColor: "rgba(245, 158, 11, 0.4)",
        name: "Vàng Đất Ấm (Warm Amber)",
        gradientClass:
          "bg-gradient-to-r from-yellow-500 to-amber-600 text-white",
      };
    case "dreamy-desk":
      return {
        hex: "#ec4899",
        glowColor: "rgba(236, 72, 153, 0.4)",
        name: "Hồng Thơ Mộng (Dreamy Pink)",
        gradientClass: "bg-gradient-to-r from-pink-500 to-rose-400 text-white",
      };
    case "lofi-study":
      return {
        hex: "#6366f1",
        glowColor: "rgba(99, 102, 241, 0.4)",
        name: "Tím Lofi (Lofi Indigo)",
        gradientClass:
          "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
      };
    case "video-waves":
      return {
        hex: "#06b6d4",
        glowColor: "rgba(6, 182, 212, 0.4)",
        name: "Xanh Sóng Biển (Ocean Cyan)",
        gradientClass: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white",
      };
    case "video-clouds":
      return {
        hex: "#0284c7",
        glowColor: "rgba(2, 132, 199, 0.4)",
        name: "Xanh Mây Trời (Cloudy Blue)",
        gradientClass: "bg-gradient-to-r from-sky-400 to-cyan-500 text-white",
      };
    case "video-stars":
      return {
        hex: "#8b5cf6",
        glowColor: "rgba(139, 92, 246, 0.4)",
        name: "Tím Tinh Vân (Cosmic Violet)",
        gradientClass:
          "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white",
      };
    case "video-rain":
      return {
        hex: "#4f46e5",
        glowColor: "rgba(79, 70, 229, 0.4)",
        name: "Xanh Mưa Đêm (Rainy Blue)",
        gradientClass:
          "bg-gradient-to-r from-slate-700 via-indigo-600 to-sky-500 text-white",
      };
    case "video-dribbble-loop":
      return {
        hex: "#ec4899",
        glowColor: "rgba(236, 72, 153, 0.4)",
        name: "Hồng Cyber (Cyber Pink)",
        gradientClass:
          "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500 text-white",
      };
    case "css-cyan-blue":
      return {
        hex: "#06b6d4",
        glowColor: "rgba(6, 182, 212, 0.4)",
        name: "Xanh Lam (Cyan Blue)",
        gradientClass: "bg-gradient-to-r from-cyan-400 to-blue-600 text-white",
      };
    case "css-mesh-pastel":
      return {
        hex: "#f43f5e",
        glowColor: "rgba(244, 63, 94, 0.4)",
        name: "Màu Mesh Pastel (Mesh Red)",
        gradientClass:
          "bg-gradient-to-r from-rose-400 via-pink-400 to-violet-500 text-white",
      };
    default:
      return {
        hex: "#8b5cf6",
        glowColor: "rgba(139, 92, 246, 0.4)",
        name: "Mặc định (Default Purple)",
        gradientClass:
          "bg-gradient-to-r from-violet-600 to-indigo-600 text-white",
      };
  }
}

export const RAINBOW_PRIMARY_COLORS: PrimaryThemeColor[] = [
  {
    id: "monochrome",
    name: "Monochrome (Đơn sắc Tối giản)",
    gradientClass:
      "bg-gradient-to-r from-slate-600 via-zinc-500 to-slate-400 text-white",
    badgeBg: "bg-slate-600 text-white",
    glowColor: "rgba(100, 116, 139, 0.4)",
    hex: "#64748b",
  },
  {
    id: "warm",
    name: "Warm (Cam Đỏ Ấm Áp)",
    gradientClass:
      "bg-gradient-to-r from-orange-600 via-amber-500 to-rose-500 text-white",
    badgeBg: "bg-orange-600 text-white",
    glowColor: "rgba(234, 88, 12, 0.4)",
    hex: "#ea580c",
  },
  {
    id: "blue",
    name: "Blue (Xanh Dương Đại Dương)",
    gradientClass:
      "bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white",
    badgeBg: "bg-blue-600 text-white",
    glowColor: "rgba(37, 99, 235, 0.4)",
    hex: "#2563eb",
  },
  {
    id: "indigo",
    name: "Indigo (Tím Chàm Quý Phái)",
    gradientClass:
      "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 text-white",
    badgeBg: "bg-indigo-600 text-white",
    glowColor: "rgba(99, 102, 241, 0.4)",
    hex: "#6366f1",
  },
  {
    id: "cyan",
    name: "Cyan (Xanh Ngọc Băng Cyber)",
    gradientClass:
      "bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 text-white",
    badgeBg: "bg-cyan-500 text-white",
    glowColor: "rgba(6, 182, 212, 0.4)",
    hex: "#06b6d4",
  },
  {
    id: "emerald",
    name: "Emerald (Ngọc Lục Bảo Tự Nhiên)",
    gradientClass:
      "bg-gradient-to-r from-emerald-600 via-teal-500 to-green-400 text-white",
    badgeBg: "bg-emerald-500 text-white",
    glowColor: "rgba(16, 185, 129, 0.4)",
    hex: "#10b981",
  },
  {
    id: "amber",
    name: "Amber (Vàng Hổ Phách Rực Rỡ)",
    gradientClass:
      "bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-white",
    badgeBg: "bg-amber-500 text-white",
    glowColor: "rgba(245, 158, 11, 0.4)",
    hex: "#f59e0b",
  },
  {
    id: "coral",
    name: "Coral (San Hô Đỏ Hồng)",
    gradientClass:
      "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white",
    badgeBg: "bg-rose-500 text-white",
    glowColor: "rgba(244, 63, 94, 0.4)",
    hex: "#f43f5e",
  },
  {
    id: "aurora",
    name: "Aurora (Bắc Cực Quang Huyền Ảo)",
    gradientClass:
      "bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 text-white animate-gradient-slow",
    badgeBg: "bg-gradient-to-r from-teal-400 to-indigo-500 text-white",
    glowColor: "rgba(20, 184, 166, 0.4)",
    hex: "#14b8a6",
  },
  {
    id: "neon",
    name: "Neon (Cyberpunk Neon Rực Rỡ)",
    gradientClass:
      "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 text-white animate-pulse",
    badgeBg: "bg-fuchsia-500 text-white",
    glowColor: "rgba(217, 70, 239, 0.4)",
    hex: "#d946ef",
  },
  {
    id: "wallpaper-harmonic",
    name: "🎨 Màu Tương Đồng Nền (Wallpaper Harmonic)",
    gradientClass:
      "bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-teal-400 via-indigo-500 to-rose-400 text-white animate-pulse",
    badgeBg:
      "bg-gradient-to-r from-teal-400 via-indigo-500 to-rose-400 text-white",
    glowColor: "rgba(99, 102, 241, 0.4)",
    hex: "#6366f1",
  },
  {
    id: "wallpaper-adaptive",
    name: "🎨 Thích Ứng Theo Hình Nền (Wallpaper Adaptive)",
    gradientClass:
      "bg-gradient-to-r from-rose-500 via-emerald-400 via-cyan-500 to-violet-600 text-white animate-gradient-slow",
    badgeBg:
      "bg-gradient-to-r from-rose-500 via-emerald-400 via-cyan-500 to-violet-600 text-white",
    glowColor: "rgba(139, 92, 246, 0.4)",
    hex: "#8b5cf6",
  },
  {
    id: "rainbow",
    name: "Cầu Vồng 7 Màu (Rainbow Gradient)",
    gradientClass:
      "bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-cyan-400 to-violet-600 text-white",
    badgeBg:
      "bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-cyan-400 to-violet-600 text-white",
    glowColor: "rgba(244, 63, 94, 0.4)",
    hex: "#f43f5e",
  },
  {
    id: "red",
    name: "1. Đỏ Đam Mê (Red)",
    gradientClass: "bg-gradient-to-r from-rose-600 to-red-500 text-white",
    badgeBg: "bg-rose-500 text-white",
    glowColor: "rgba(244, 63, 94, 0.4)",
    hex: "#ef4444",
  },
  {
    id: "orange",
    name: "2. Cam Nhiệt Huyết (Orange)",
    gradientClass: "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
    badgeBg: "bg-orange-500 text-white",
    glowColor: "rgba(249, 115, 22, 0.4)",
    hex: "#f97316",
  },
  {
    id: "yellow",
    name: "3. Vàng Tỏa Sáng (Yellow)",
    gradientClass:
      "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black",
    badgeBg: "bg-amber-400 text-slate-950 font-black",
    glowColor: "rgba(245, 158, 11, 0.4)",
    hex: "#f59e0b",
  },
  {
    id: "green",
    name: "4. Lục Tươi Tắn (Green)",
    gradientClass: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
    badgeBg: "bg-emerald-500 text-white",
    glowColor: "rgba(16, 185, 129, 0.4)",
    hex: "#10b981",
  },
  {
    id: "violet",
    name: "7. Tím Quý Phái (Violet)",
    gradientClass: "bg-gradient-to-r from-violet-600 to-purple-600 text-white",
    badgeBg: "bg-violet-600 text-white",
    glowColor: "rgba(139, 92, 246, 0.4)",
    hex: "#8b5cf6",
  },
];

export default function App() {
  useGlobalRipple();
  const { language, setLanguage, t } = useLanguage();
  const [activePage, setActivePage] = useState<PageId>("home");

  useEffect(() => {
    const pageTitleMap: Record<string, { vi: string; en: string }> = {
      home: { vi: "Trang Chủ", en: "Home" },
      coverLetter: { vi: "Thư Ngỏ", en: "Cover Letter" },
      about: { vi: "Giới Thiệu", en: "About Me" },
      experience: { vi: "Kinh Nghiệm", en: "Experience" },
      skills: { vi: "Kỹ Năng", en: "Skills" },
      industries: { vi: "Lĩnh Vực", en: "Industries" },
      projects: { vi: "Dự Án", en: "Projects" },
      memories: { vi: "Kỷ Niệm", en: "Memories" },
      interview: { vi: "Phỏng Vấn", en: "Interview" },
      settings: { vi: "Cài Đặt", en: "Settings" },
      aiChat: { vi: "Trợ Lý AI", en: "AI Assistant" },
      wallpapers: { vi: "Hình Nền", en: "Wallpapers" },
      templateTest: { vi: "Trang Mẫu (Test)", en: "Template Test" },
    };
    const pageInfo = pageTitleMap[activePage] || { vi: "Trang Chủ", en: "Home" };
    const pageName = language === "vi" ? pageInfo.vi : pageInfo.en;
    document.title = `${pageName} - Nguyễn Hùng Thái - CX Expert Portfolio`;
    document.body.setAttribute("data-active-page", activePage);
    document.body.setAttribute("data-active-page-name", pageName);
  }, [activePage, language]);
  const [navDirection, setNavDirection] = useState<number>(1);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(activePage === "home");
  const [isRightSidebarExpanded, setIsRightSidebarExpanded] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [printLanguage, setPrintLanguage] = useState<"vi" | "en">("vi");

  // Settings Modal Active Tab State ('appearance' | 'typography' | 'sound_lang' | 'sync_system' | 'backup_pdf')
  const [activeSettingsTab, setActiveSettingsTab] = useState<
    "appearance" | "typography" | "sound_lang" | "sync_system" | "backup_pdf"
  >("appearance");

  // Synchronization State
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState<
    | "idle"
    | "scanning"
    | "bug_checking"
    | "design_sync"
    | "full_sync"
    | "optimizing"
    | "reporting"
    | "completed"
  >("idle");
  const [syncReport, setSyncReport] = useState<any>(null);

  const startSynchronization = () => {
    setIsSyncing(true);
    setSyncStatus("scanning");
    setSyncProgress(5);
    playUiSound("click");

    // Simulate Step 1: Scanning
    setTimeout(() => {
      setSyncStatus("scanning");
      setSyncProgress(15);

      // Step 2: Bug Checking
      setTimeout(() => {
        setSyncStatus("bug_checking");
        setSyncProgress(30);

        // Step 3: Applying Design System
        setTimeout(() => {
          setSyncStatus("design_sync");
          setSyncProgress(50);

          // Step 4: Full Website Sync
          setTimeout(() => {
            setSyncStatus("full_sync");
            setSyncProgress(75);

            // Step 5: Optimizing
            setTimeout(() => {
              setSyncStatus("optimizing");
              setSyncProgress(90);

              // Step 6: Reporting
              setTimeout(() => {
                setSyncStatus("reporting");
                setSyncProgress(100);

                // Final Step: Completed
                setTimeout(() => {
                  setSyncStatus("completed");
                  setIsSyncing(false);
                  setSyncReport({
                    filesChecked: 218,
                    componentsChecked: 84,
                    bugsFixed: 14,
                    designTokensApplied: 1250,
                    performanceScore: "99/100",
                    accessibilityScore: "100/100",
                    status: "PERFECT",
                  });
                  playUiSound("success");
                }, 1000);
              }, 1200);
            }, 1500);
          }, 1800);
        }, 2000);
      }, 1500);
    }, 1000);
  };

  // Custom wallpapers list state
  const [customWallpapers, setCustomWallpapers] = useState<WallpaperOption[]>(
    () => {
      const saved = localStorage.getItem("app_custom_wallpapers");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
      return [];
    },
  );

  // Deleted default wallpapers ID list
  const [deletedWallpaperIds, setDeletedWallpaperIds] = useState<string[]>(
    () => {
      const saved = localStorage.getItem("app_deleted_wallpaper_ids");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
      return [];
    },
  );

  // Selected active wallpaper state
  const [selectedWallpaperId, setSelectedWallpaperId] = useState<string>(() => {
    return localStorage.getItem("app_selected_wallpaper") || "fluid-mesh";
  });

  // Cloud sync for wallpapers so they persist across browsers and cookie clearing when logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const cloudPrefs = await loadPreferencesFromCloud();
          if (cloudPrefs) {
            if (cloudPrefs.customWallpapers && cloudPrefs.customWallpapers.length > 0) {
              setCustomWallpapers(cloudPrefs.customWallpapers);
              localStorage.setItem("app_custom_wallpapers", JSON.stringify(cloudPrefs.customWallpapers));
            }
            if (cloudPrefs.deletedWallpaperIds && cloudPrefs.deletedWallpaperIds.length > 0) {
              setDeletedWallpaperIds(cloudPrefs.deletedWallpaperIds);
              localStorage.setItem("app_deleted_wallpaper_ids", JSON.stringify(cloudPrefs.deletedWallpaperIds));
            }
            if (cloudPrefs.selectedWallpaperId) {
              setSelectedWallpaperId(cloudPrefs.selectedWallpaperId);
              localStorage.setItem("app_selected_wallpaper", cloudPrefs.selectedWallpaperId);
            }
          }
        } catch (err) {
          console.error("Error loading wallpaper preferences from cloud:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    savePreferencesToCloud({
      customWallpapers,
      deletedWallpaperIds,
      selectedWallpaperId,
    });
  }, [customWallpapers, deletedWallpaperIds, selectedWallpaperId]);

  // Responsive Component Options State
  const [responsiveComponents, setResponsiveComponents] = useState<{
    fluidGrid: boolean;
    adaptiveFont: boolean;
    touchOptimized: boolean;
    compactNavbar: boolean;
    stackedCards: boolean;
  }>(() => {
    const saved = localStorage.getItem("app_responsive_components");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      fluidGrid: true,
      adaptiveFont: true,
      touchOptimized: true,
      compactNavbar: true,
      stackedCards: true,
    };
  });

  useEffect(() => {
    localStorage.setItem(
      "app_responsive_components",
      JSON.stringify(responsiveComponents),
    );
  }, [responsiveComponents]);

  // Glassmorphism Mirror effect toggle state
  const [glassMirrorEffect, setGlassMirrorEffect] = useState<boolean>(() => {
    return localStorage.getItem("app_glass_mirror_effect") === "true";
  });

  // UI Styles Detailed Customizations
  const [glassBlur, setGlassBlur] = useState<number>(() => {
    return parseInt(localStorage.getItem("app_glass_blur") || "0", 10);
  });
  const [glassOpacity, setGlassOpacity] = useState<number>(() => {
    return parseInt(localStorage.getItem("app_glass_opacity") || "55", 10);
  });
  const [glassSaturate, setGlassSaturate] = useState<number>(() => {
    return parseInt(localStorage.getItem("app_glass_saturate") || "180", 10);
  });
  const [glassContrast, setGlassContrast] = useState<number>(() => {
    return parseInt(localStorage.getItem("app_glass_contrast") || "100", 10);
  });
  const [glassElevation, setGlassElevation] = useState<boolean>(() => {
    return localStorage.getItem("app_glass_elevation") !== "false";
  });
  const [glassPreset, setGlassPreset] = useState<
    "standard" | "elevation" | "acrylic" | "custom"
  >(() => {
    return (localStorage.getItem("app_glass_preset") as any) || "standard";
  });
  const [glassBorderColor, setGlassBorderColor] = useState<string>(() => {
    return (
      localStorage.getItem("app_glass_border_color") ||
      "rgba(255, 255, 255, 0.25)"
    );
  });
  const [glassShadowIntensity, setGlassShadowIntensity] = useState<number>(
    () => {
      const saved = localStorage.getItem("app_glass_shadow_intensity");
      return saved ? parseInt(saved, 10) : 35;
    },
  );
  const [glassTargetElement, setGlassTargetElement] = useState<string>(() => {
    return localStorage.getItem("app_glass_target_element") || "all";
  });
  const [glassDepthEffect, setGlassDepthEffect] = useState<boolean>(() => {
    return localStorage.getItem("app_glass_depth_effect") !== "false";
  });

  const [softShadow, setSoftShadow] = useState<number>(() => {
    return parseInt(localStorage.getItem("app_soft_shadow") || "25", 10);
  });
  const [softOpacity, setSoftOpacity] = useState<number>(() => {
    return parseInt(localStorage.getItem("app_soft_opacity") || "85", 10);
  });
  const [uiRadius, setUiRadius] = useState<number>(() => {
    return parseInt(localStorage.getItem("app_ui_radius") || "32", 10);
  });

  // Auto-Showcase Mode (Video Wallpaper cycling)
  const [isAutoShowcaseActive, setIsAutoShowcaseActive] = useState<boolean>(true);
  
  useEffect(() => {
    const handleInteraction = () => {
      if (isAutoShowcaseActive) {
        setIsAutoShowcaseActive(false);
      }
    };
    
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("mousedown", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("wheel", handleInteraction, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
    };
  }, [isAutoShowcaseActive]);

  const handleNextWallpaper = () => {
    const currentIndex = wallpapers.findIndex(wp => wp.id === selectedWallpaperId);
    if (currentIndex === -1) return;
    
    const nextIndex = (currentIndex + 1) % wallpapers.length;
    const nextWallpaper = wallpapers[nextIndex];
    
    setSelectedWallpaperId(nextWallpaper.id);
  };

  // Video Background Tuning States
  const [videoDimmer, setVideoDimmer] = useState<number>(() => {
    const saved = localStorage.getItem("app_video_dimmer");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [videoBlur, setVideoBlur] = useState<number>(() => {
    const saved = localStorage.getItem("app_video_blur");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [videoSpeed, setVideoSpeed] = useState<number>(() => {
    const saved = localStorage.getItem("app_video_speed");
    return saved ? parseFloat(saved) : 1.0;
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(() => {
    return localStorage.getItem("app_video_playing") !== "false";
  });
  const videoBgRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoBgRef.current) {
      videoBgRef.current.playbackRate = videoSpeed;
      if (isVideoPlaying) {
        videoBgRef.current.play().catch(() => {});
      } else {
        videoBgRef.current.pause();
      }
    }
  }, [videoSpeed, isVideoPlaying, selectedWallpaperId]);

  useEffect(() => {
    const handleVideoSettings = (e: Event) => {
      const custom = e as CustomEvent<{
        dimmer?: number;
        blur?: number;
        speed?: number;
        playing?: boolean;
      }>;
      if (custom.detail) {
        if (typeof custom.detail.dimmer === "number") {
          setVideoDimmer(custom.detail.dimmer);
          localStorage.setItem("app_video_dimmer", custom.detail.dimmer.toString());
        }
        if (typeof custom.detail.blur === "number") {
          setVideoBlur(custom.detail.blur);
          localStorage.setItem("app_video_blur", custom.detail.blur.toString());
        }
        if (typeof custom.detail.speed === "number") {
          setVideoSpeed(custom.detail.speed);
          localStorage.setItem("app_video_speed", custom.detail.speed.toString());
        }
        if (typeof custom.detail.playing === "boolean") {
          setIsVideoPlaying(custom.detail.playing);
          localStorage.setItem("app_video_playing", custom.detail.playing.toString());
        }
      }
    };
    window.addEventListener("videoSettingsChanged", handleVideoSettings as EventListener);
    return () => window.removeEventListener("videoSettingsChanged", handleVideoSettings as EventListener);
  }, []);

  // Card Customization States
  const [cardPadding, setCardPadding] = useState<number>(() => {
    const saved = localStorage.getItem("app_card_padding");
    return saved ? parseInt(saved, 10) : 24;
  });
  const [cardBorderWidth, setCardBorderWidth] = useState<number>(() => {
    const saved = localStorage.getItem("app_card_border_width");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [cardShadowIntensity, setCardShadowIntensity] = useState<number>(() => {
    const saved = localStorage.getItem("app_card_shadow_intensity");
    return saved ? parseInt(saved, 10) : 15;
  });

  // Global Font Size state (14px - 20px)
  const [globalFontSize, setGlobalFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("app_global_font_size");
    return saved ? parseInt(saved, 10) : 16;
  });

  const [aiVoiceVi, setAiVoiceVi] = useState<string>(() => {
    return localStorage.getItem("app_ai_voice_vi") || "";
  });

  const [aiVoiceEn, setAiVoiceEn] = useState<string>(() => {
    return localStorage.getItem("app_ai_voice_en") || "";
  });

  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadSystemVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const filtered = voices.filter(
          (v) =>
            v.lang.toLowerCase().includes("vi") ||
            v.lang.toLowerCase().includes("en") ||
            v.name.toLowerCase().includes("tiếng việt"),
        );
        setSystemVoices(filtered);

        if (voices.length > 0) {
          const defaultVi = getDefaultVietnameseVoice(voices);
          const savedVi = localStorage.getItem("app_ai_voice_vi");
          if (!savedVi && defaultVi) {
            setAiVoiceVi(defaultVi.voiceURI);
          } else if (savedVi) {
            const exists = voices.some((v) => v.voiceURI === savedVi);
            if (!exists && defaultVi) {
              setAiVoiceVi(defaultVi.voiceURI);
            }
          }

          const defaultEn = getDefaultEnglishVoice(voices);
          const savedEn = localStorage.getItem("app_ai_voice_en");
          if (!savedEn && defaultEn) {
            setAiVoiceEn(defaultEn.voiceURI);
          }
        }
      };
      loadSystemVoices();
      window.speechSynthesis.onvoiceschanged = loadSystemVoices;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("app_ai_voice_vi", aiVoiceVi);
  }, [aiVoiceVi]);

  useEffect(() => {
    localStorage.setItem("app_ai_voice_en", aiVoiceEn);
  }, [aiVoiceEn]);

  // Component-Specific Font Sizes
  const [navFontSize, setNavFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("app_font_size_nav");
    return saved ? parseInt(saved, 10) : 14;
  });

  const [headerFontSize, setHeaderFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("app_font_size_header");
    return saved ? parseInt(saved, 10) : 28;
  });

  const [cardTitleFontSize, setCardTitleFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("app_font_size_card_title");
    return saved ? parseInt(saved, 10) : 18;
  });

  const [bodyFontSize, setBodyFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("app_font_size_body");
    return saved ? parseInt(saved, 10) : 14;
  });

  const [labelFontSize, setLabelFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("app_font_size_label");
    return saved ? parseInt(saved, 10) : 12;
  });

  const [selectedSimSection, setSelectedSimSection] = useState<
    "nav" | "header" | "card_title" | "body" | "label"
  >("body");

  // Paragraph Font Weight state (false = regular 400, true = bold 600)
  const [isParagraphBold, setIsParagraphBold] = useState<boolean>(() => {
    return localStorage.getItem("app_paragraph_bold") === "true";
  });

  // UI Interactive Sounds state
  const [uiSoundsEnabled, setUiSoundsEnabled] = useState<boolean>(() => {
    return localStorage.getItem("app_ui_sounds_enabled") !== "false";
  });

  // Ambient Sound (lofi / rain matching wallpaper) state
  const [ambientSoundEnabled, setAmbientSoundEnabled] = useState<boolean>(
    () => {
      return localStorage.getItem("app_ambient_enabled") === "true";
    },
  );
  const [ambientVolumeState, setAmbientVolumeState] = useState<number>(() => {
    return parseFloat(localStorage.getItem("app_ambient_volume") || "0.45");
  });

  // Website Primary Theme Color - Set to static Violet default
  const colorObj = {
    id: "violet" as RainbowColorId,
    name: "Default Violet",
    gradientClass: "bg-gradient-to-r from-violet-600 to-purple-600 text-white",
    badgeBg: "bg-violet-600 text-white",
    glowColor: "rgba(139, 92, 246, 0.4)",
    hex: "#8b5cf6",
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-primary-hex",
      colorObj.hex,
      "important",
    );
    document.documentElement.style.setProperty(
      "--app-primary-glow",
      colorObj.glowColor,
      "important",
    );
    document.documentElement.style.setProperty(
      "--primary",
      colorObj.hex,
      "important",
    );
    document.documentElement.style.setProperty(
      "--primary-glow",
      colorObj.glowColor,
      "important",
    );
    document.documentElement.style.setProperty(
      "--color-brand-primary",
      colorObj.hex,
      "important",
    );

    let styleTag = document.getElementById("primary-color-dynamic-styles");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "primary-color-dynamic-styles";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = `
      :root, .dark {
        --app-primary-hex: ${colorObj.hex} !important;
        --primary: ${colorObj.hex} !important;
        --color-brand-primary: ${colorObj.hex} !important;
        --primary-glow: ${colorObj.glowColor} !important;
      }
      .bg-primary-theme { background-color: ${colorObj.hex} !important; }
      .text-primary-theme { color: ${colorObj.hex} !important; }
      .border-primary-theme { border-color: ${colorObj.hex} !important; }
      .glass-btn-primary { background: ${colorObj.hex} !important; box-shadow: 0 4px 15px -3px ${colorObj.glowColor} !important; }
    `;
  }, [colorObj]);

  // Apply typography font size based on selected size
  useEffect(() => {
    document.documentElement.style.fontSize = `${globalFontSize}px`;
    localStorage.setItem("app_global_font_size", globalFontSize.toString());
  }, [globalFontSize]);

  // Apply component-specific font sizes dynamically and save to localStorage
  useEffect(() => {
    localStorage.setItem("app_font_size_nav", navFontSize.toString());
    localStorage.setItem("app_font_size_header", headerFontSize.toString());
    localStorage.setItem(
      "app_font_size_card_title",
      cardTitleFontSize.toString(),
    );
    localStorage.setItem("app_font_size_body", bodyFontSize.toString());
    localStorage.setItem("app_font_size_label", labelFontSize.toString());

    let styleTag = document.getElementById("component-font-sizes-styles");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "component-font-sizes-styles";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = `
      :root {
        --fs-nav: ${navFontSize}px;
        --fs-header: ${headerFontSize}px;
        --fs-card-title: ${cardTitleFontSize}px;
        --fs-body: ${bodyFontSize}px;
        --fs-label: ${labelFontSize}px;
      }
      
      /* Navigation items */
      .custom-font-nav,
      nav a,
      aside a,
      .nav-item,
      .nav-link,
      nav button span,
      aside button span,
      .sidebar-nav-item,
      nav button {
        font-size: var(--fs-nav) !important;
      }
      
      /* Headers / Main Titles */
      .custom-font-header,
      .hero-title,
      h1,
      .header-title,
      [class*="hero-title"] {
        font-size: var(--fs-header) !important;
      }
      
      /* Card Titles & Section Headings */
      .custom-font-card-title,
      h2,
      h3,
      .card-title,
      .section-heading,
      .chart-title {
        font-size: var(--fs-card-title) !important;
      }
      
      /* Body / Paragraph text */
      .custom-font-body,
      p,
      .body-text,
      .paragraph-text,
      .intro-card {
        font-size: var(--fs-body) !important;
      }
      
      /* Buttons & Labels & Badges */
      .custom-font-labels,
      .badge,
      .label-text,
      .chip,
      .tag {
        font-size: var(--fs-label) !important;
      }
    `;
  }, [
    navFontSize,
    headerFontSize,
    cardTitleFontSize,
    bodyFontSize,
    labelFontSize,
  ]);

  // Glassmorphism Mirror Effect configuration save
  useEffect(() => {
    localStorage.setItem(
      "app_glass_mirror_effect",
      glassMirrorEffect ? "true" : "false",
    );
  }, [glassMirrorEffect]);

  // UI Styles Detailed Customization save
  useEffect(() => {
    localStorage.setItem("app_glass_blur", glassBlur.toString());
    localStorage.setItem("app_glass_opacity", glassOpacity.toString());
    localStorage.setItem("app_glass_saturate", glassSaturate.toString());
    localStorage.setItem("app_glass_contrast", glassContrast.toString());
    localStorage.setItem(
      "app_glass_elevation",
      glassElevation ? "true" : "false",
    );
    localStorage.setItem("app_glass_preset", glassPreset);
    localStorage.setItem("app_glass_border_color", glassBorderColor);
    localStorage.setItem(
      "app_glass_shadow_intensity",
      glassShadowIntensity.toString(),
    );
    localStorage.setItem("app_glass_target_element", glassTargetElement);
    localStorage.setItem(
      "app_glass_depth_effect",
      glassDepthEffect ? "true" : "false",
    );
    localStorage.setItem("app_soft_shadow", softShadow.toString());
    localStorage.setItem("app_soft_opacity", softOpacity.toString());
    localStorage.setItem("app_ui_radius", uiRadius.toString());

    let styleTag = document.getElementById("glassmorphism-dynamic-styles");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "glassmorphism-dynamic-styles";
      document.head.appendChild(styleTag);
    }

    const shadowBoxCss = `0 ${Math.round(glassShadowIntensity * 0.4)}px ${Math.round(glassShadowIntensity * 0.8)}px rgba(0, 0, 0, ${(glassShadowIntensity / 100) * 0.5})`;

    const depthShadowCss = glassDepthEffect
      ? `${shadowBoxCss}, 0 20px 45px -10px rgba(0, 0, 0, ${Math.min(0.6, (glassShadowIntensity / 100) * 0.55)}), inset 0 1px 1.5px 0 ${glassBorderColor}, inset 0 -1px 3px 0 rgba(0, 0, 0, 0.2)`
      : `${shadowBoxCss} ${glassMirrorEffect ? `, inset 0 1px 1px 0 ${glassBorderColor}` : ""}`;

    let targetSelector =
      ".glass-card, .glass-panel, .card, article, section, .main-info-container";
    if (glassTargetElement === "cards") {
      targetSelector = ".glass-card, .card";
    } else if (glassTargetElement === "panels") {
      targetSelector = ".glass-panel, section, article";
    } else if (glassTargetElement === "container") {
      targetSelector = ".main-info-container";
    } else if (glassTargetElement === "preview") {
      targetSelector = "#glass-live-preview-card";
    }

    styleTag.textContent = `
      :root {
        --glass-blur: ${glassBlur}px;
        --glass-opacity: ${glassOpacity / 100};
        --glass-saturate: ${glassSaturate}%;
        --glass-contrast: ${glassContrast}%;
        --glass-elevation: ${glassElevation ? "translateY(-6px)" : "none"};
        --glass-border-color: ${glassBorderColor};
        --glass-shadow-intensity: ${glassShadowIntensity}%;
        --glass-shadow: ${shadowBoxCss};
        --ui-radius: ${uiRadius}px;
      }

      ${targetSelector} {
        backdrop-filter: blur(var(--glass-blur, ${glassBlur}px)) contrast(${glassContrast}%) saturate(var(--glass-saturate, ${glassSaturate}%)) !important;
        -webkit-backdrop-filter: blur(var(--glass-blur, ${glassBlur}px)) contrast(${glassContrast}%) saturate(var(--glass-saturate, ${glassSaturate}%)) !important;
        border-color: ${glassBorderColor} !important;
        box-shadow: ${depthShadowCss} !important;
        transition: backdrop-filter 0.35s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        ${glassDepthEffect ? "transform-style: preserve-3d;" : ""}
      }

      .glass-mirror-effect, .glass-mirror-effect-active .card, .glass-mirror-effect-active .glass-card, .glass-mirror-effect-active article, .glass-mirror-effect-active section, .glass-mirror-effect-active .main-info-container {
        position: relative;
      }
      .glass-mirror-effect::before, .glass-mirror-effect-active .card::before, .glass-mirror-effect-active .glass-card::before, .glass-mirror-effect-active article::before, .glass-mirror-effect-active section::before, .glass-mirror-effect-active .main-info-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1.5px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.05));
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        pointer-events: none;
        z-index: 5;
        opacity: 1;
        transform: scaleX(1);
        transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        animation: glass-mirror-shine-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes glass-mirror-shine-in {
        from {
          opacity: 0;
          transform: scaleX(0.85);
        }
        to {
          opacity: 1;
          transform: scaleX(1);
        }
      }

      ${
        glassDepthEffect
          ? `
      ${targetSelector}:hover {
        transform: translateY(-3px) scale(1.003);
        box-shadow: ${shadowBoxCss}, 0 28px 55px -12px rgba(0, 0, 0, ${Math.min(0.7, (glassShadowIntensity / 100) * 0.65)}), inset 0 1.5px 2px 0 ${glassBorderColor}, inset 0 -1px 4px 0 rgba(0, 0, 0, 0.25) !important;
      }
      `
          : ""
      }
    `;
  }, [
    glassBlur,
    glassOpacity,
    glassSaturate,
    glassContrast,
    glassElevation,
    glassPreset,
    glassBorderColor,
    glassShadowIntensity,
    glassTargetElement,
    glassMirrorEffect,
    glassDepthEffect,
    softShadow,
    softOpacity,
    uiRadius,
  ]);

  // Handle glass effects synchronization via custom events
  useEffect(() => {
    const handleApplyGlassPreset = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      if (customEvent.detail) {
        if (customEvent.detail.id) setGlassPreset(customEvent.detail.id);
        if (typeof customEvent.detail.blur === "number") setGlassBlur(customEvent.detail.blur);
        if (typeof customEvent.detail.shadow === "number") setGlassShadowIntensity(customEvent.detail.shadow);
        if (typeof customEvent.detail.mirror === "boolean") setGlassMirrorEffect(customEvent.detail.mirror);
        if (typeof customEvent.detail.elevation === "boolean") setGlassElevation(customEvent.detail.elevation);
        if (typeof customEvent.detail.depth === "boolean") setGlassDepthEffect(customEvent.detail.depth);
        if (customEvent.detail.border) setGlassBorderColor(customEvent.detail.border);
        if (typeof customEvent.detail.opacity === "number") setGlassOpacity(Math.round(customEvent.detail.opacity * 100));
        if (typeof customEvent.detail.saturate === "number") setGlassSaturate(customEvent.detail.saturate);
        if (typeof customEvent.detail.contrast === "number") setGlassContrast(customEvent.detail.contrast);
      }
    };
    const handleGlassBlurUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        setGlassBlur(customEvent.detail);
      }
    };
    const handleGlassShadowUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        setGlassShadowIntensity(customEvent.detail);
      }
    };
    const handleGlassMirrorUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (typeof customEvent.detail === "boolean") {
        setGlassMirrorEffect(customEvent.detail);
      }
    };
    const handleGlassSaturateUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        setGlassSaturate(customEvent.detail);
      }
    };
    const handleGlassContrastUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        setGlassContrast(customEvent.detail);
      }
    };

    window.addEventListener("app-apply-glass-preset", handleApplyGlassPreset);
    window.addEventListener("app-glass-blur-updated", handleGlassBlurUpdate);
    window.addEventListener("app-glass-shadow-updated", handleGlassShadowUpdate);
    window.addEventListener("app-glass-mirror-updated", handleGlassMirrorUpdate);
    window.addEventListener("app-glass-saturate-updated", handleGlassSaturateUpdate);
    window.addEventListener("app-glass-contrast-updated", handleGlassContrastUpdate);

    return () => {
      window.removeEventListener("app-apply-glass-preset", handleApplyGlassPreset);
      window.removeEventListener("app-glass-blur-updated", handleGlassBlurUpdate);
      window.removeEventListener("app-glass-shadow-updated", handleGlassShadowUpdate);
      window.removeEventListener("app-glass-mirror-updated", handleGlassMirrorUpdate);
      window.removeEventListener("app-glass-saturate-updated", handleGlassSaturateUpdate);
      window.removeEventListener("app-glass-contrast-updated", handleGlassContrastUpdate);
    };
  }, []);

  // Update root mirror effect class
  useEffect(() => {
    if (glassMirrorEffect) {
      document.documentElement.classList.add("glass-mirror-effect-active");
    } else {
      document.documentElement.classList.remove("glass-mirror-effect-active");
    }
  }, [glassMirrorEffect]);

  // Card Customization Dynamic Styling
  useEffect(() => {
    localStorage.setItem("app_card_padding", cardPadding.toString());
    localStorage.setItem("app_card_border_width", cardBorderWidth.toString());
    localStorage.setItem(
      "app_card_shadow_intensity",
      cardShadowIntensity.toString(),
    );

    let styleTag = document.getElementById("card-customization-dynamic-styles");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "card-customization-dynamic-styles";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = `
      .glass-card, .card, article, section, .main-info-container, #experience-main-card, #settings-main-card, #projects-main-card {
        padding: ${cardPadding}px !important;
        border-width: ${cardBorderWidth}px !important;
        box-shadow: 0 ${Math.round(cardShadowIntensity * 0.4)}px ${Math.round(cardShadowIntensity * 0.8)}px rgba(0, 0, 0, ${cardShadowIntensity / 100}) !important;
      }
    `;
  }, [cardPadding, cardBorderWidth, cardShadowIntensity]);

  // Deleted default wallpaper IDs save
  useEffect(() => {
    localStorage.setItem(
      "app_deleted_wallpaper_ids",
      JSON.stringify(deletedWallpaperIds),
    );
  }, [deletedWallpaperIds]);

  // Paragraph font weight class handler
  useEffect(() => {
    localStorage.setItem(
      "app_paragraph_bold",
      isParagraphBold ? "true" : "false",
    );
    if (isParagraphBold) {
      document.documentElement.classList.add("body-p-bold");
      document.body.classList.add("body-p-bold");
    } else {
      document.documentElement.classList.remove("body-p-bold");
      document.body.classList.remove("body-p-bold");
    }
  }, [isParagraphBold]);

  useEffect(() => {
    localStorage.setItem(
      "app_ui_sounds_enabled",
      uiSoundsEnabled ? "true" : "false",
    );
  }, [uiSoundsEnabled]);

  const [isActualDark, setIsActualDark] = useState<boolean>(false);

  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(() => {
    return (localStorage.getItem("app_theme_mode") as any) || "system";
  });

  const theme = isActualDark ? "dark" : "light";

  useEffect(() => {
    localStorage.setItem("app_theme_mode", themeMode);

    const applyTheme = () => {
      let isDark = false;
      if (themeMode === "system") {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      } else {
        isDark = themeMode === "dark";
      }

      setIsActualDark(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        localStorage.setItem("app_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.setItem("app_theme", "light");
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (themeMode === "system") {
        applyTheme();
      }
    };
    
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [themeMode]);

  // Handle set theme mode custom event
  useEffect(() => {
    const handleSetThemeMode = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark" | "system">;
      if (customEvent.detail) {
        setThemeMode(customEvent.detail);
      }
    };
    window.addEventListener("app-set-theme-mode", handleSetThemeMode);
    return () => window.removeEventListener("app-set-theme-mode", handleSetThemeMode);
  }, []);

  // Sync theme mode back to components
  useEffect(() => {
    const event = new CustomEvent("app-theme-mode-synced", { detail: themeMode });
    window.dispatchEvent(event);
  }, [themeMode]);

  const [pdfProgress, setPdfProgress] = useState<{
    isOpen: boolean;
    statusText: string;
    percent: number;
    mode: "print" | "download";
  }>({
    isOpen: false,
    statusText: "",
    percent: 0,
    mode: "print",
  });

  const loadHtml2Pdf = () => {
    return new Promise<any>((resolve, reject) => {
      if ((window as any).html2pdf) {
        resolve((window as any).html2pdf);
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = () => resolve((window as any).html2pdf);
      script.onerror = (err) => reject(err);
      document.head.appendChild(script);
    });
  };

  const handlePrintPdf = (forcedLang?: "vi" | "en") => {
    const targetLang = forcedLang || language;
    setPrintLanguage(targetLang);

    setPdfProgress({
      isOpen: true,
      statusText: t.settingsModal.preparingPdf,
      percent: 20,
      mode: "print",
    });

    const intervals = [
      { delay: 400, text: t.settingsModal.generatingCanvas, p: 50 },
      { delay: 900, text: t.settingsModal.buildingDocument, p: 85 },
      { delay: 1400, text: t.settingsModal.complete, p: 100 },
    ];

    intervals.forEach(({ delay, text, p }) => {
      setTimeout(() => {
        setPdfProgress((prev) => ({
          ...prev,
          statusText: text,
          percent: p,
        }));
      }, delay);
    });

    setTimeout(() => {
      setPdfProgress((prev) => ({ ...prev, isOpen: false }));
      window.print();
    }, 1800);
  };

  const handleDownloadDirectPdf = async (forcedLang?: "vi" | "en") => {
    const targetLang = forcedLang || language;
    setPrintLanguage(targetLang);

    setPdfProgress({
      isOpen: true,
      statusText: t.settingsModal.preparingPdf,
      percent: 10,
      mode: "download",
    });

    // Wait a tiny bit for the React DOM tree of PrintableResume to update its language
    await new Promise((resolve) => setTimeout(resolve, 150));

    try {
      const html2pdf = await loadHtml2Pdf();
      setPdfProgress((prev) => ({
        ...prev,
        statusText: t.settingsModal.generatingCanvas,
        percent: 35,
      }));

      const element = document.getElementById("printable-resume");
      if (!element) {
        throw new Error("Resume container element not found.");
      }

      const clone = element.cloneNode(true) as HTMLElement;
      clone.classList.remove("hidden", "print:block");
      clone.classList.add("block", "p-10", "bg-white", "text-slate-900");
      clone.style.width = "800px";
      clone.style.fontFamily = "system-ui, -apple-system, sans-serif";

      const hiddenElements = clone.querySelectorAll(".hidden");
      hiddenElements.forEach((el) => {
        if (!el.classList.contains("print:block")) {
          el.classList.remove("hidden");
        }
      });

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "800px";
      container.appendChild(clone);
      document.body.appendChild(container);

      setPdfProgress((prev) => ({
        ...prev,
        statusText: t.settingsModal.buildingDocument,
        percent: 70,
      }));

      const opt = {
        margin: 10,
        filename:
          targetLang === "vi"
            ? "Nguyen_Hung_Thai_CV_VI.pdf"
            : "Nguyen_Hung_Thai_CV_EN.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(clone).save();

      setPdfProgress((prev) => ({
        ...prev,
        statusText: t.settingsModal.downloading,
        percent: 95,
      }));

      setTimeout(() => {
        setPdfProgress((prev) => ({
          ...prev,
          statusText: t.settingsModal.complete,
          percent: 100,
        }));
        setTimeout(() => {
          setPdfProgress((prev) => ({ ...prev, isOpen: false }));
          if (document.body.contains(container)) {
            document.body.removeChild(container);
          }
        }, 800);
      }, 500);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      setPdfProgress({
        isOpen: true,
        statusText:
          language === "en"
            ? "Direct PDF failed. Opening print panel..."
            : "Lỗi tải trực tiếp. Đang mở trình in...",
        percent: 50,
        mode: "download",
      });
      setTimeout(() => {
        setPdfProgress((prev) => ({ ...prev, isOpen: false }));
        window.print();
      }, 2000);
    }
  };

  useEffect(() => {
    const handleGlobalPrint = () => setIsPdfPreviewOpen(true);
    const handleGlobalDownload = () => setIsPdfPreviewOpen(true);
    window.addEventListener("app-trigger-print", handleGlobalPrint);
    window.addEventListener("app-trigger-download", handleGlobalDownload);
    return () => {
      window.removeEventListener("app-trigger-print", handleGlobalPrint);
      window.removeEventListener("app-trigger-download", handleGlobalDownload);
    };
  }, [language]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useScrollPosition(scrollContainerRef, activePage);

  const toggleThemeWithTransition = (_theme: string = "light", _clickEvent?: any) => {
    if (_theme === "dark") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  };

  // Theme synchronization effect handled above

  // Redundant listener removed

  // Listen for app-navigate events from subcomponents
  useEffect(() => {
    const handleAppNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<PageId>;
      if (customEvent.detail) {
        handleNavigate(customEvent.detail);
      }
    };
    window.addEventListener("app-navigate", handleAppNavigate);
    return () => window.removeEventListener("app-navigate", handleAppNavigate);
  }, []);

  // Listen for glass preset apply events from components
  useEffect(() => {
    const handleApplyGlassPreset = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      if (customEvent.detail) {
        const p = customEvent.detail;
        if (typeof p.blur === "number") setGlassBlur(p.blur);
        if (typeof p.opacity === "number")
          setGlassOpacity(
            Math.round(p.opacity > 1 ? p.opacity : p.opacity * 100),
          );
        if (typeof p.saturate === "number") setGlassSaturate(p.saturate);
        if (typeof p.contrast === "number") setGlassContrast(p.contrast);
        if (typeof p.elevation === "boolean") setGlassElevation(p.elevation);
        if (p.border) setGlassBorderColor(p.border);
        if (typeof p.shadow === "number") setGlassShadowIntensity(p.shadow);
        if (typeof p.depth === "boolean") setGlassDepthEffect(p.depth);
        if (typeof p.mirror === "boolean") setGlassMirrorEffect(p.mirror);
        if (p.id) setGlassPreset(p.id);

        if (p.category === "dark" || p.id?.startsWith("dark-")) {
          toggleThemeWithTransition("dark");
        } else if (p.category === "light" || p.id?.startsWith("light-")) {
          toggleThemeWithTransition("light");
        }
      }
    };
    window.addEventListener("app-apply-glass-preset", handleApplyGlassPreset);
    return () =>
      window.removeEventListener(
        "app-apply-glass-preset",
        handleApplyGlassPreset,
      );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "app_ambient_enabled",
      ambientSoundEnabled ? "true" : "false",
    );
    syncAmbientWithWallpaper(
      selectedWallpaperId,
      ambientSoundEnabled,
      ambientVolumeState,
    );
  }, [ambientSoundEnabled, selectedWallpaperId]);

  useEffect(() => {
    localStorage.setItem("app_ambient_volume", String(ambientVolumeState));
    setAmbientVolume(ambientVolumeState);
  }, [ambientVolumeState]);

  const [customWallpaperUrl, setCustomWallpaperUrl] = useState(() => {
    return localStorage.getItem("app_custom_wallpaper_url") || "";
  });
  const [customWallpaperName, setCustomWallpaperName] = useState("");

  useEffect(() => {
    const handleWallpaperChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{
        id?: string;
        wallpaperId?: string;
        customUrl?: string;
        url?: string;
        customName?: string;
        name?: string;
        type?: "image" | "video" | "css";
        previewUrl?: string;
      }>;
      if (customEvent.detail) {
        const wpId = customEvent.detail.id || customEvent.detail.wallpaperId;
        const wpUrl = customEvent.detail.customUrl || customEvent.detail.url;
        const wpName = customEvent.detail.customName || customEvent.detail.name;

        if (wpId) {
          setSelectedWallpaperId(wpId);
        }
        if (wpUrl) {
          setCustomWallpaperUrl(wpUrl);
        }
        if (wpName) {
          setCustomWallpaperName(wpName);
        }
        // Refresh custom wallpapers from localStorage
        try {
          const saved = localStorage.getItem("app_custom_wallpapers");
          if (saved) {
            setCustomWallpapers(JSON.parse(saved));
          }
        } catch (err) {
          // ignore
        }
      }
    };
    window.addEventListener(
      "wallpaperChanged",
      handleWallpaperChanged as EventListener,
    );
    return () =>
      window.removeEventListener(
        "wallpaperChanged",
        handleWallpaperChanged as EventListener,
      );
  }, []);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // --- CUSTOM THEME FEATURES START ---
  // List of custom bookmarked themes (saved in local storage)
  const [savedCustomThemes, setSavedCustomThemes] = useState<RainbowColorId[]>(
    () => {
      try {
        const saved = localStorage.getItem("app_custom_theme_selections");
        return saved ? JSON.parse(saved) : ["violet"]; // default violet
      } catch (e) {
        return ["violet"];
      }
    },
  );

  // Track bookmarked themes in localStorage
  useEffect(() => {
    localStorage.setItem(
      "app_custom_theme_selections",
      JSON.stringify(savedCustomThemes),
    );
  }, [savedCustomThemes]);

  // Track theme history for Quick Switch
  const [themeHistory, setThemeHistory] = useState<RainbowColorId[]>(() => {
    return ["violet"];
  });

  // Confirmation modal for resetting custom theme selections
  const [isThemeResetConfirmOpen, setIsThemeResetConfirmOpen] = useState(false);

  // Wallpaper Visibility toggle state (hide/show wallpaper without deleting selection)
  const [isWallpaperHidden, setIsWallpaperHidden] = useState<boolean>(() => {
    return localStorage.getItem("app_wallpaper_hidden") === "true";
  });

  useEffect(() => {
    localStorage.setItem(
      "app_wallpaper_hidden",
      isWallpaperHidden ? "true" : "false",
    );
  }, [isWallpaperHidden]);

  useEffect(() => {
    const handleToggleWallpaperVisibility = () => {
      setIsWallpaperHidden((prev) => {
        const next = !prev;
        playUiSound("toggle");
        setSettingsNotice(
          next
            ? language === "vi"
              ? "Đã ẩn hình nền (Giữ nguyên lựa chọn hình nền hiện tại)"
              : "Wallpaper hidden (Current selection preserved)"
            : language === "vi"
              ? "Đã hiện lại hình nền"
              : "Wallpaper displayed",
        );
        setTimeout(() => setSettingsNotice(null), 3000);
        return next;
      });
    };

    const handleSetWallpaperHidden = (e: Event) => {
      const custom = e as CustomEvent<{ hidden: boolean }>;
      if (custom.detail && typeof custom.detail.hidden === "boolean") {
        setIsWallpaperHidden(custom.detail.hidden);
      }
    };

    const handleOpenThemeResetDialog = () => {
      playUiSound("click");
      setIsThemeResetConfirmOpen(true);
    };

    window.addEventListener(
      "app-toggle-wallpaper-visibility",
      handleToggleWallpaperVisibility,
    );
    window.addEventListener(
      "app-set-wallpaper-hidden",
      handleSetWallpaperHidden as EventListener,
    );
    window.addEventListener(
      "app-open-theme-reset-dialog",
      handleOpenThemeResetDialog,
    );

    return () => {
      window.removeEventListener(
        "app-toggle-wallpaper-visibility",
        handleToggleWallpaperVisibility,
      );
      window.removeEventListener(
        "app-set-wallpaper-hidden",
        handleSetWallpaperHidden as EventListener,
      );
      window.removeEventListener(
        "app-open-theme-reset-dialog",
        handleOpenThemeResetDialog,
      );
    };
  }, [language]);

  // Compare mode states
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareThemeA, setCompareThemeA] = useState<RainbowColorId>("violet");
  const [compareThemeB, setCompareThemeB] = useState<RainbowColorId>("indigo");
  const [compareActiveSlot, setCompareActiveSlot] = useState<"A" | "B">("A");
  const [compareSplitRatio, setCompareSplitRatio] = useState(50);

  const handleResetThemeBookmarks = () => {
    const count = savedCustomThemes.length;
    setSavedCustomThemes(["violet"]);
    localStorage.setItem("app_custom_theme_selections", JSON.stringify(["violet"]));
    playUiSound("reset");
    setSettingsNotice(
      language === "vi"
        ? `Đã đặt lại ${count} giao diện đã lưu về màu Violet mặc định!`
        : `Reset ${count} saved theme bookmark(s) to default Violet!`,
    );
    setTimeout(() => setSettingsNotice(null), 3500);
  };

  const handleQuickSwitch = () => {
    setSettingsNotice(
      language === "vi"
        ? `Tính năng chuyển nhanh đã tắt`
        : `Quick Switch is disabled`,
    );
    setTimeout(() => setSettingsNotice(null), 3000);
  };

  const toggleThemeBookmark = (
    e: React.MouseEvent,
    themeId: RainbowColorId,
  ) => {
    e.stopPropagation();
    playUiSound("click");
    setSavedCustomThemes((prev) => {
      if (prev.includes(themeId)) {
        const filtered = prev.filter((id) => id !== themeId);
        setSettingsNotice(
          language === "vi"
            ? "Đã xóa giao diện khỏi danh sách lưu trữ"
            : "Removed from saved selections",
        );
        setTimeout(() => setSettingsNotice(null), 2500);
        return filtered;
      } else {
        setSettingsNotice(
          language === "vi"
            ? "Đã lưu giao diện này vào Local Storage!"
            : "Saved to Local Storage!",
        );
        setTimeout(() => setSettingsNotice(null), 2500);
        return [...prev, themeId];
      }
    });
  };

  const getThemeDetails = (themeId: RainbowColorId) => {
    const found = RAINBOW_PRIMARY_COLORS.find((c) => c.id === themeId);
    if (found) return found;
    if (themeId === "wallpaper-harmonic") {
      return {
        hex: "#6366f1",
        name: "Màu Tương Đồng Nền",
        gradientClass:
          "bg-gradient-to-r from-teal-400 via-indigo-500 to-rose-400",
        badgeBg: "bg-gradient-to-r from-teal-400 via-indigo-500 to-rose-400",
        glowColor: "rgba(99, 102, 241, 0.4)",
      };
    }
    return {
      hex: "#8b5cf6",
      name: "Mặc định",
      gradientClass: "bg-gradient-to-r from-violet-600 to-indigo-600",
      badgeBg: "bg-gradient-to-r from-violet-600 to-indigo-600",
      glowColor: "rgba(139, 92, 246, 0.4)",
    };
  };
  // --- CUSTOM THEME FEATURES END ---

  const [wallpaperSearch, setWallpaperSearch] = useState("");
  const [settingsNotice, setSettingsNotice] = useState<string | null>(null);
  const [displayScale, setDisplayScale] = useState<number>(() => {
    const saved = localStorage.getItem("app_display_scale");
    return saved ? parseInt(saved, 10) : 100;
  });

  useEffect(() => {
    localStorage.setItem("app_display_scale", displayScale.toString());
  }, [displayScale]);

  const [mainCardScale, setMainCardScale] = useState<number>(() => {
    const saved = localStorage.getItem("app_main_card_scale");
    return saved ? parseInt(saved, 10) : 100;
  });

  useEffect(() => {
    localStorage.setItem("app_main_card_scale", mainCardScale.toString());
  }, [mainCardScale]);

  const [isDefaultMainCardZoom, setIsDefaultMainCardZoom] = useState<boolean>(
    () => {
      const saved = localStorage.getItem("app_is_default_main_card_zoom");
      return saved !== "false";
    },
  );

  useEffect(() => {
    localStorage.setItem(
      "app_is_default_main_card_zoom",
      isDefaultMainCardZoom.toString(),
    );
  }, [isDefaultMainCardZoom]);

  const [isDefaultWebsiteZoom, setIsDefaultWebsiteZoom] = useState<boolean>(
    () => {
      const saved = localStorage.getItem("app_is_default_website_zoom");
      return saved !== "false";
    },
  );

  useEffect(() => {
    localStorage.setItem(
      "app_is_default_website_zoom",
      isDefaultWebsiteZoom.toString(),
    );
  }, [isDefaultWebsiteZoom]);

  const [isResponsive, setIsResponsive] = useState<boolean>(() => {
    const saved = localStorage.getItem("app_is_responsive");
    return saved !== "false";
  });

  useEffect(() => {
    localStorage.setItem("app_is_responsive", isResponsive ? "true" : "false");
  }, [isResponsive]);

  useEffect(() => {
    const handleToggleResponsive = () => {
      setIsResponsive(prev => !prev);
    };
    window.addEventListener("app-toggle-responsive", handleToggleResponsive);
    return () => window.removeEventListener("app-toggle-responsive", handleToggleResponsive);
  }, []);

  const [fontFamily, setFontFamily] = useState<string>("font-play");

  const [isFontOverrideActive, setIsFontOverrideActive] = useState<boolean>(
    () => {
      return localStorage.getItem("app_font_override_active") === "true";
    },
  );
  const [isFontScanRunning, setIsFontScanRunning] = useState<boolean>(false);
  const [isThemeSyncing, setIsThemeSyncing] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("app_font_family", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem(
      "app_font_override_active",
      isFontOverrideActive ? "true" : "false",
    );
  }, [isFontOverrideActive]);

  useEffect(() => {
    if (isFontOverrideActive) {
      let fontVal = '"Plus Jakarta Sans", sans-serif';
      if (fontFamily === "font-system" || fontFamily === "system")
        fontVal = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
      else if (fontFamily === "font-roboto" || fontFamily === "roboto")
        fontVal = '"Roboto", sans-serif';
      else if (
        fontFamily === "font-play" ||
        fontFamily === "play" ||
        fontFamily === "'Playfair Display', serif" ||
        fontFamily === "'Play', sans-serif"
      )
        fontVal = '"Playfair Display", serif';
      else if (fontFamily === "font-samsung" || fontFamily === "samsung")
        fontVal = '"Samsung Sans", "Segoe UI", sans-serif';
      else if (fontFamily === "font-googlesans" || fontFamily === "googlesans")
        fontVal =
          '"Google Sans", "Product Sans", "Plus Jakarta Sans", sans-serif';
      else if (fontFamily === "font-sans")
        fontVal = '"Plus Jakarta Sans", "Poppins", sans-serif';
      else if (fontFamily === "font-serif")
        fontVal = '"Playfair Display", Georgia, serif';
      else if (fontFamily === "font-mono") fontVal = "monospace";
      else if (fontFamily && fontFamily !== "inherit") fontVal = fontFamily;

      let styleEl = document.getElementById("font-override-style");
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "font-override-style";
        document.head.appendChild(styleEl);
      }
      styleEl.innerHTML = `
        body, #root, #root *, .font-sans, .font-serif, .font-mono, .font-play, h1, h2, h3, h4, h5, h6, p, span, button, input, textarea, select {
          font-family: ${fontVal} !important;
        }
      `;
    } else {
      const styleEl = document.getElementById("font-override-style");
      if (styleEl) {
        styleEl.remove();
      }
    }
  }, [fontFamily, isFontOverrideActive]);

  const [uiStyle, setUiStyle] = useState<"glass" | "neumorphism" | "soft">(
    "glass",
  );

  useEffect(() => {
    document.documentElement.classList.remove(
      "glass-mode",
      "neumorphism-mode",
      "softui-mode",
    );
    if (uiStyle === "glass") {
      document.documentElement.classList.add("glass-mode");
    } else if (uiStyle === "neumorphism") {
      document.documentElement.classList.add("neumorphism-mode");
    } else if (uiStyle === "soft") {
      document.documentElement.classList.add("softui-mode");
    }
    localStorage.setItem("app_ui_style", uiStyle);
  }, [uiStyle]);

  const [neuSidebar, setNeuSidebar] = useState<boolean>(() => {
    return localStorage.getItem("app_neu_sidebar") === "true";
  });
  const [neuContactForm, setNeuContactForm] = useState<boolean>(() => {
    return localStorage.getItem("app_neu_contact_form") === "true";
  });
  const [neuGlobalButtons, setNeuGlobalButtons] = useState<boolean>(() => {
    return localStorage.getItem("app_neu_global_buttons") === "true";
  });
  const [neuGlobalInputs, setNeuGlobalInputs] = useState<boolean>(() => {
    return localStorage.getItem("app_neu_global_inputs") === "true";
  });
  const [neuGlobalCards, setNeuGlobalCards] = useState<boolean>(() => {
    return localStorage.getItem("app_neu_global_cards") === "true";
  });

  useEffect(() => {
    localStorage.setItem("app_neu_sidebar", neuSidebar ? "true" : "false");
    localStorage.setItem(
      "app_neu_contact_form",
      neuContactForm ? "true" : "false",
    );
    localStorage.setItem(
      "app_neu_global_buttons",
      neuGlobalButtons ? "true" : "false",
    );
    localStorage.setItem(
      "app_neu_global_inputs",
      neuGlobalInputs ? "true" : "false",
    );
    localStorage.setItem(
      "app_neu_global_cards",
      neuGlobalCards ? "true" : "false",
    );

    let styleEl = document.getElementById(
      "neumorphism-dynamic-override-styles",
    );
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "neumorphism-dynamic-override-styles";
      document.head.appendChild(styleEl);
    }

    let cssContent = "";

    if (neuGlobalButtons) {
      cssContent += `
        button:not(.no-neu), .glass-button, [role="button"] {
          background: var(--neu-bg, #e2e8f0) !important;
          box-shadow: 5px 5px 10px var(--neu-shadow-dark, #cbd5e1), -5px -5px 10px var(--neu-shadow-light, #ffffff) !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          color: inherit !important;
        }
        button:not(.no-neu):hover, [role="button"]:hover {
          box-shadow: 7px 7px 14px var(--neu-shadow-dark, #cbd5e1), -7px -7px 14px var(--neu-shadow-light, #ffffff) !important;
          transform: translateY(-1px) scale(1.01) !important;
        }
        button:not(.no-neu):active, [role="button"]:active {
          box-shadow: inset 3px 3px 6px var(--neu-shadow-dark, #cbd5e1), inset -3px -3px 6px var(--neu-shadow-light, #ffffff) !important;
          transform: translateY(1px) scale(0.99) !important;
        }
      `;
    }

    if (neuGlobalInputs) {
      cssContent += `
        input, textarea, select {
          background: var(--neu-bg, #e2e8f0) !important;
          box-shadow: inset 3px 3px 6px var(--neu-shadow-dark, #cbd5e1), inset -3px -3px 6px var(--neu-shadow-light, #ffffff) !important;
          border: none !important;
        }
      `;
    }

    if (neuGlobalCards) {
      cssContent += `
        .glass-card, .glass-panel, .card, article, section {
          background: var(--neu-bg, #e2e8f0) !important;
          box-shadow: 8px 8px 18px var(--neu-shadow-dark, #cbd5e1), -8px -8px 18px var(--neu-shadow-light, #ffffff) !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          backdrop-filter: none !important;
        }
      `;
    }

    if (neuSidebar) {
      cssContent += `
        .sidebar-nav-item, nav button {
          background: var(--neu-bg, #e2e8f0) !important;
          box-shadow: 5px 5px 10px var(--neu-shadow-dark, #cbd5e1), -5px -5px 10px var(--neu-shadow-light, #ffffff) !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
        }
        .sidebar-nav-item:hover, nav button:hover {
          box-shadow: 7px 7px 14px var(--neu-shadow-dark, #cbd5e1), -7px -7px 14px var(--neu-shadow-light, #ffffff) !important;
        }
        .sidebar-nav-item.active, .sidebar-nav-item[data-active="true"] {
          box-shadow: inset 3px 3px 6px var(--neu-shadow-dark, #cbd5e1), inset -3px -3px 6px var(--neu-shadow-light, #ffffff) !important;
          background: var(--neu-bg, #e2e8f0) !important;
        }
      `;
    }

    if (neuContactForm) {
      cssContent += `
        form input, form textarea, form select, .booking-form input, .booking-form textarea {
          background: var(--neu-bg, #e2e8f0) !important;
          box-shadow: inset 3px 3px 6px var(--neu-shadow-dark, #cbd5e1), inset -3px -3px 6px var(--neu-shadow-light, #ffffff) !important;
          border: none !important;
        }
        form button, .booking-form button {
          background: var(--neu-bg, #e2e8f0) !important;
          box-shadow: 5px 5px 10px var(--neu-shadow-dark, #cbd5e1), -5px -5px 10px var(--neu-shadow-light, #ffffff) !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
        }
      `;
    }

    styleEl.innerHTML = cssContent;
    window.dispatchEvent(new CustomEvent("app-neu-settings-updated"));
  }, [
    neuSidebar,
    neuContactForm,
    neuGlobalButtons,
    neuGlobalInputs,
    neuGlobalCards,
  ]);

  const [scaleRatio, setScaleRatio] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isResponsive) {
      setScaleRatio(1);
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
      }
      return;
    }

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // We want to fit a 1400x800 container
      const widthRatio = windowWidth / 1400;
      const heightRatio = windowHeight / 800;

      // We can scale it down if the window is smaller, up to 1
      const ratio = Math.min(widthRatio, heightRatio, 1);
      setScaleRatio(ratio);
    };

    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "width=1400, initial-scale=0.3, shrink-to-fit=no",
      );
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (meta) {
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
      }
    };
  }, [isResponsive]);

  useEffect(() => {
    localStorage.setItem("app_selected_wallpaper", selectedWallpaperId);
    
    // Auto-select light or dark theme based on the wallpaper
    const targetTheme = getThemeForWallpaper(selectedWallpaperId);
    toggleThemeWithTransition(targetTheme);
  }, [selectedWallpaperId]);

  const wallpapers = useMemo(() => {
    return [...LIGHT_WALLPAPERS, ...customWallpapers].filter(
      (wp) => !deletedWallpaperIds.includes(wp.id),
    );
  }, [customWallpapers, deletedWallpaperIds]);

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter((wp) =>
      wp.name.toLowerCase().includes(wallpaperSearch.trim().toLowerCase()),
    );
  }, [wallpapers, wallpaperSearch]);

  const activeWallpaper = useMemo(() => {
    return (
      wallpapers.find((w) => w.id === selectedWallpaperId) ||
      wallpapers[0] ||
      LIGHT_WALLPAPERS[0]
    );
  }, [wallpapers, selectedWallpaperId]);

  const handleNavigate = (page: PageId) => {
    if (page === "aiChat") {
      setIsAiChatOpen(true);
      playUiSound("click");
      return;
    }
    const currentIndex = pageSequence.indexOf(activePage);
    const nextIndex = pageSequence.indexOf(page);
    setNavDirection(nextIndex >= currentIndex ? 1 : -1);
    setActivePage(page);
    setIsSidebarExpanded(page === "home");
  };

  const handleResetToDefaults = () => {
    localStorage.removeItem("app_theme");
    localStorage.removeItem("app_ui_style");
    localStorage.removeItem("app_display_scale");
    localStorage.removeItem("app_main_card_scale");
    localStorage.removeItem("app_selected_wallpaper");
    localStorage.removeItem("app_custom_wallpapers");
    localStorage.removeItem("app_glass_blur");
    localStorage.removeItem("app_glass_opacity");
    localStorage.removeItem("app_glass_saturate");
    localStorage.removeItem("app_glass_border_color");
    localStorage.removeItem("app_glass_shadow_intensity");
    localStorage.removeItem("app_glass_target_element");
    localStorage.removeItem("app_glass_depth_effect");
    localStorage.removeItem("app_soft_shadow");
    localStorage.removeItem("app_soft_opacity");
    localStorage.removeItem("app_ui_radius");
    localStorage.removeItem("app_card_padding");
    localStorage.removeItem("app_card_border_width");
    localStorage.removeItem("app_card_shadow_intensity");
    localStorage.removeItem("app_font_size_nav");
    localStorage.removeItem("app_font_size_header");
    localStorage.removeItem("app_font_size_card_title");
    localStorage.removeItem("app_font_size_body");
    localStorage.removeItem("app_font_size_label");
    localStorage.removeItem("app_ui_sounds_enabled");
    localStorage.removeItem("app_ambient_enabled");
    localStorage.removeItem("app_ambient_volume");
    localStorage.removeItem("app_is_settings_open");
    localStorage.removeItem("app_is_responsive");

    toggleThemeWithTransition("light");
    setDisplayScale(100);
    setMainCardScale(100);
    setGlobalFontSize(16);
    setNavFontSize(14);
    setHeaderFontSize(28);
    setCardTitleFontSize(18);
    setBodyFontSize(14);
    setLabelFontSize(12);
    setUiSoundsEnabled(true);
    setAmbientSoundEnabled(false);
    setAmbientVolumeState(0.45);
    setSelectedWallpaperId("fluid-mesh");
    setCustomWallpapers([]);
    setLanguage("vi");
    setIsResponsive(true);
    setCardPadding(24);
    setCardBorderWidth(1);
    setCardShadowIntensity(15);
    setGlassBorderColor("rgba(255, 255, 255, 0.25)");
    setGlassShadowIntensity(35);
    setGlassTargetElement("all");
    setGlassDepthEffect(true);
    setUiStyle("glass");

    playUiSound("reset");
    setSettingsNotice(t.settingsModal.resetSuccessNotice);
    setTimeout(() => setSettingsNotice(null), 3500);
  };

  const handleExportSettings = () => {
    const configData = {
      app: "PowerService One CX Portfolio",
      version: "2.6.0",
      exportedAt: new Date().toISOString(),
      settings: {
        theme,
        primaryColor: "violet",
        displayScale,
        globalFontSize,
        navFontSize,
        headerFontSize,
        cardTitleFontSize,
        bodyFontSize,
        labelFontSize,
        uiSoundsEnabled,
        ambientSoundEnabled,
        ambientVolumeState,
        language,
        selectedWallpaperId,
        customWallpapers,
        isResponsive,
      },
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(configData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `powerservice-settings-${new Date().toISOString().slice(0, 10)}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    playUiSound("click");
  };

  const handleExportDesignConfig = () => {
    playUiSound("click");
    const designConfig = {
      appName: "Trí Nhân Interactive Design System",
      version: "2.6.0",
      exportedAt: new Date().toISOString(),
      theme: theme,
      primaryColor: colorObj.id,
      primaryColorName: colorObj.name,
      primaryColorHex: colorObj.hex,
      uiStyle: uiStyle,
      glassmorphism: {
        blur: glassBlur,
        opacity: glassOpacity,
        saturate: glassSaturate,
        mirrorEffect: glassMirrorEffect,
      },
      softUi: {
        shadow: softShadow,
        opacity: softOpacity,
      },
      uiRadius: uiRadius,
      fontFamily: fontFamily,
      isFontOverrideActive: isFontOverrideActive,
      displayScale: displayScale,
      fontSizes: {
        global: globalFontSize,
        nav: navFontSize,
        header: headerFontSize,
        cardTitle: cardTitleFontSize,
        body: bodyFontSize,
        label: labelFontSize,
      },
      responsive: {
        isResponsive: isResponsive,
        components: responsiveComponents,
      },
      audio: {
        soundsEnabled: uiSoundsEnabled,
        ambientEnabled: ambientSoundEnabled,
        ambientVolume: ambientVolumeState,
        aiVoiceVi: aiVoiceVi,
        aiVoiceEn: aiVoiceEn,
      },
    };

    const jsonString = JSON.stringify(designConfig, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cau-hinh-thiet-ke-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonString).catch(() => {});
    }

    setSettingsNotice(
      "✅ Đã trích xuất & tải về thành công file cấu hình thiết kế (cau-hinh-thiet-ke.json)! Dữ liệu đã được sao chép vào bộ nhớ tạm.",
    );
    setTimeout(() => setSettingsNotice(null), 4500);
  };

  const handleSetCurrentAsDefault = () => {
    localStorage.setItem("app_primary_color", "violet");
    localStorage.setItem("app_global_font_size", globalFontSize.toString());
    localStorage.setItem("app_font_size_nav", navFontSize.toString());
    localStorage.setItem("app_font_size_header", headerFontSize.toString());
    localStorage.setItem(
      "app_font_size_card_title",
      cardTitleFontSize.toString(),
    );
    localStorage.setItem("app_font_size_body", bodyFontSize.toString());
    localStorage.setItem("app_font_size_label", labelFontSize.toString());
    localStorage.setItem(
      "app_glass_mirror_effect",
      glassMirrorEffect ? "true" : "false",
    );
    localStorage.setItem("app_glass_blur", glassBlur.toString());
    localStorage.setItem("app_glass_opacity", glassOpacity.toString());
    localStorage.setItem("app_glass_saturate", glassSaturate.toString());
    localStorage.setItem("app_glass_contrast", glassContrast.toString());
    localStorage.setItem(
      "app_glass_elevation",
      glassElevation ? "true" : "false",
    );
    localStorage.setItem("app_glass_preset", glassPreset);
    localStorage.setItem("app_soft_shadow", softShadow.toString());
    localStorage.setItem("app_soft_opacity", softOpacity.toString());
    localStorage.setItem("app_ui_radius", uiRadius.toString());
    localStorage.setItem("app_card_padding", cardPadding.toString());
    localStorage.setItem("app_card_border_width", cardBorderWidth.toString());
    localStorage.setItem(
      "app_card_shadow_intensity",
      cardShadowIntensity.toString(),
    );
    localStorage.setItem("app_ui_style", uiStyle);
    localStorage.setItem("app_font_family", fontFamily);
    localStorage.setItem(
      "app_font_override_active",
      isFontOverrideActive ? "true" : "false",
    );
    localStorage.setItem("app_selected_wallpaper", selectedWallpaperId);
    localStorage.setItem("app_display_scale", displayScale.toString());
    localStorage.setItem("app_main_card_scale", mainCardScale.toString());
    localStorage.setItem("app_is_responsive", isResponsive ? "true" : "false");
    localStorage.setItem(
      "app_ui_sounds_enabled",
      uiSoundsEnabled ? "true" : "false",
    );
    localStorage.setItem(
      "app_ambient_enabled",
      ambientSoundEnabled ? "true" : "false",
    );
    localStorage.setItem("app_ambient_volume", String(ambientVolumeState));

    const defaultSnapshot = {
      primaryColor: "violet",
      globalFontSize,
      navFontSize,
      headerFontSize,
      cardTitleFontSize,
      bodyFontSize,
      labelFontSize,
      uiStyle,
      fontFamily,
      selectedWallpaperId,
      displayScale,
      uiSoundsEnabled,
      ambientSoundEnabled,
      savedAt: new Date().toLocaleTimeString("vi-VN"),
    };
    localStorage.setItem(
      "app_user_default_settings",
      JSON.stringify(defaultSnapshot),
    );

    playUiSound("click");
    setSettingsNotice(
      language === "vi"
        ? "⭐ Đã đặt cấu hình ở trang cài đặt hiện tại làm mặc định thành công!"
        : "⭐ Current settings page configuration saved as default successfully!",
    );
    setTimeout(() => setSettingsNotice(null), 4500);
  };

  const handleImportSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const cfg = parsed.settings || parsed;

        if (cfg.theme === "light" || cfg.theme === "dark") {
          toggleThemeWithTransition(cfg.theme);
        }
        if (typeof cfg.displayScale === "number") {
          setDisplayScale(cfg.displayScale);
        }
        if (
          typeof cfg.globalFontSize === "number" &&
          cfg.globalFontSize >= 14 &&
          cfg.globalFontSize <= 20
        ) {
          setGlobalFontSize(cfg.globalFontSize);
        }
        if (
          typeof cfg.navFontSize === "number" &&
          cfg.navFontSize >= 12 &&
          cfg.navFontSize <= 18
        ) {
          setNavFontSize(cfg.navFontSize);
        }
        if (
          typeof cfg.headerFontSize === "number" &&
          cfg.headerFontSize >= 20 &&
          cfg.headerFontSize <= 36
        ) {
          setHeaderFontSize(cfg.headerFontSize);
        }
        if (
          typeof cfg.cardTitleFontSize === "number" &&
          cfg.cardTitleFontSize >= 16 &&
          cfg.cardTitleFontSize <= 24
        ) {
          setCardTitleFontSize(cfg.cardTitleFontSize);
        }
        if (
          typeof cfg.bodyFontSize === "number" &&
          cfg.bodyFontSize >= 12 &&
          cfg.bodyFontSize <= 18
        ) {
          setBodyFontSize(cfg.bodyFontSize);
        }
        if (
          typeof cfg.labelFontSize === "number" &&
          cfg.labelFontSize >= 10 &&
          cfg.labelFontSize <= 16
        ) {
          setLabelFontSize(cfg.labelFontSize);
        }
        if (typeof cfg.uiSoundsEnabled === "boolean") {
          setUiSoundsEnabled(cfg.uiSoundsEnabled);
        }
        if (typeof cfg.ambientSoundEnabled === "boolean") {
          setAmbientSoundEnabled(cfg.ambientSoundEnabled);
        }
        if (typeof cfg.ambientVolumeState === "number") {
          setAmbientVolumeState(cfg.ambientVolumeState);
        }
        if (cfg.language === "vi" || cfg.language === "en") {
          setLanguage(cfg.language);
        }
        if (
          cfg.selectedWallpaperId &&
          typeof cfg.selectedWallpaperId === "string"
        ) {
          setSelectedWallpaperId(cfg.selectedWallpaperId);
        }
        if (typeof cfg.isResponsive === "boolean") {
          setIsResponsive(cfg.isResponsive);
        }
        if (Array.isArray(cfg.customWallpapers)) {
          setCustomWallpapers(cfg.customWallpapers);
          localStorage.setItem(
            "app_custom_wallpapers",
            JSON.stringify(cfg.customWallpapers),
          );
        }

        playUiSound("click");
        setSettingsNotice(t.settingsModal.importSuccessNotice);
        setTimeout(() => setSettingsNotice(null), 3500);
      } catch (err) {
        alert("File JSON không hợp lệ / Invalid JSON file!");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleApplyPreset = (preset: ColorPreset) => {
    toggleThemeWithTransition(preset.theme);
    setSelectedWallpaperId(preset.wallpaperId);
    playUiSound("click");
    setSettingsNotice(
      `Đã áp dụng phối màu: ${t.settingsModal[preset.nameKey]}`,
    );
    setTimeout(() => setSettingsNotice(null), 3000);
  };

  const handleAddCustomWallpaper = (
    overrideUrl?: string,
    overrideName?: string,
    overridePreviewUrl?: string,
    overrideType?: "image" | "video" | "css",
  ) => {
    const rawInput = (overrideUrl || customWallpaperUrl).trim();
    if (!rawInput) return;

    const isCodePen =
      rawInput.includes("codepen.io") ||
      (overrideName && overrideName.toLowerCase().includes("codepen"));
    const isVideo =
      overrideType === "video" ||
      Boolean(rawInput.match(/\.(mp4|webm|mov)($|\?)/i));
    const isCssCode =
      !isVideo &&
      (rawInput.includes("gradient") ||
        rawInput.includes("background") ||
        rawInput.includes("linear-") ||
        rawInput.includes("radial-") ||
        rawInput.startsWith("#") ||
        rawInput.startsWith("rgb") ||
        rawInput.startsWith("hsla") ||
        isCodePen);

    const name =
      (overrideName || customWallpaperName).trim() ||
      (isCodePen
        ? `CodePen Wallpaper ${customWallpapers.length + 1}`
        : isVideo
          ? `Video Wallpaper ${customWallpapers.length + 1}`
          : `Hình nền ${customWallpapers.length + 1}`);

    const newWallpaper: WallpaperOption = {
      id: isCodePen
        ? `codepen-${Date.now()}`
        : isVideo
          ? `video-${Date.now()}`
          : `custom-${Date.now()}`,
      name: name,
      type: overrideType || (isCssCode ? "css" : isVideo ? "video" : "image"),
      url: isCssCode ? undefined : rawInput,
      cssClass: isCssCode ? rawInput : undefined,
      previewUrl:
        overridePreviewUrl ||
        (isCssCode
          ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
          : rawInput),
    };

    const updated = [newWallpaper, ...customWallpapers];
    setCustomWallpapers(updated);
    localStorage.setItem("app_custom_wallpapers", JSON.stringify(updated));
    setSelectedWallpaperId(newWallpaper.id);
    playUiSound("click");

    // Reset form
    setCustomWallpaperUrl("");
    setCustomWallpaperName("");
  };

  const handleRemoveWallpaper = (id: string) => {
    const isDefault = LIGHT_WALLPAPERS.some((wp) => wp.id === id);
    if (isDefault) {
      setDeletedWallpaperIds((prev) => {
        if (!prev.includes(id)) {
          const next = [...prev, id];
          localStorage.setItem(
            "app_deleted_wallpaper_ids",
            JSON.stringify(next),
          );
          return next;
        }
        return prev;
      });
    } else {
      const updated = customWallpapers.filter((wp) => wp.id !== id);
      setCustomWallpapers(updated);
      localStorage.setItem("app_custom_wallpapers", JSON.stringify(updated));
    }

    // If deleted wallpaper was currently active, fall back to default
    if (selectedWallpaperId === id) {
      setSelectedWallpaperId("fluid-mesh");
    }
  };

  const handleRestoreDefaultWallpapers = () => {
    setDeletedWallpaperIds([]);
    localStorage.removeItem("app_deleted_wallpaper_ids");
  };

  const handleNext = () => {
    const currentIndex = pageSequence.indexOf(activePage);
    const nextIndex = (currentIndex + 1) % pageSequence.length;
    const targetPage = pageSequence[nextIndex] as PageId;
    setNavDirection(1);
    setActivePage(targetPage);
    setIsSidebarExpanded(targetPage === "home");
  };

  const handlePrev = () => {
    const currentIndex = pageSequence.indexOf(activePage);
    const prevIndex =
      (currentIndex - 1 + pageSequence.length) % pageSequence.length;
    const targetPage = pageSequence[prevIndex] as PageId;
    setNavDirection(-1);
    setActivePage(targetPage);
    setIsSidebarExpanded(targetPage === "home");
  };

  // Language Change Toast Notification
  const [langToast, setLangToast] = useState<{
    message: string;
    lang: "vi" | "en";
  } | null>(null);
  const [shortcutNotice, setShortcutNotice] = useState<string | null>(null);

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const newLang = customEvent.detail || language;
      const msg =
        newLang === "vi"
          ? "🇻🇳 Đã chuyển sang Tiếng Việt thành công!"
          : "🇬🇧 Switched to English successfully!";
      setLangToast({ message: msg, lang: newLang as "vi" | "en" });
      playUiSound("click");
      const timer = setTimeout(() => setLangToast(null), 2500);
      return () => clearTimeout(timer);
    };

    window.addEventListener("app-language-changed", handleLangChange);
    return () =>
      window.removeEventListener("app-language-changed", handleLangChange);
  }, [language]);

  // Global Keyboard Shortcuts ('H' for Home, 'S' for Settings, ArrowLeft/Right for navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        handleNavigate("home");
        setShortcutNotice(
          language === "en" ? "⌨️ [H] Navigate Home" : "⌨️ [H] Về Trang chủ",
        );
        playUiSound("click");
        setTimeout(() => setShortcutNotice(null), 1800);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
        setShortcutNotice(
          language === "en" ? "⌨️ [←] Previous Page" : "⌨️ [←] Trang trước",
        );
        playUiSound("click");
        setTimeout(() => setShortcutNotice(null), 1800);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
        setShortcutNotice(
          language === "en" ? "⌨️ [→] Next Page" : "⌨️ [→] Trang kế tiếp",
        );
        playUiSound("click");
        setTimeout(() => setShortcutNotice(null), 1800);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePage, language]);

  return (
    <main
      className={cn(
        "glass-mode animate-gradient-bg relative flex min-h-screen w-full items-center justify-center bg-transparent transition-colors duration-700",
        fontFamily,
        isResponsive ? "overflow-hidden p-0 lg:p-8" : "overflow-auto p-4",
      )}
      style={{ fontFamily: "var(--font-play), sans-serif" }}
    >
      {/* Physical Glassmorphism Sound Effect Engine */}
      <GlassSoundEffect defaultClickType="tink" defaultHoverType="hover" />

      {/* Subtle Language Change Toast Notification */}
      <AnimatePresence>
        {langToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="pointer-events-none fixed top-5 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-2.5 rounded-[12px] border border-slate-200/90 bg-white/95 px-4 py-2.5 text-xs font-bold tracking-wide text-slate-800 shadow-2xl backdrop-blur-xl sm:text-sm dark:border-white/10 dark:bg-[#12161C]/95 dark:text-slate-100"
          >
            <Sparkles size={16} className="shrink-0 text-amber-500 dark:text-amber-400" />
            <span>{langToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Shortcut Notice Toast */}
      <AnimatePresence>
        {shortcutNotice && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-600/90 px-4 py-2 font-mono text-xs font-bold text-white shadow-xl backdrop-blur-md"
          >
            <Keyboard size={14} className="text-purple-200" />
            <span>{shortcutNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background Layer with Selected Light Wallpaper */}
      <div className="area pointer-events-none fixed inset-0 z-0 overflow-hidden transition-all duration-700">
        {/* Ambient Gradient Floating Blobs */}
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />
        <div className="ambient-blob ambient-blob-4" />

        {/* If wallpaper is hidden via settings, display a distraction-free neutral Fluent canvas while preserving active wallpaper state */}
        {isWallpaperHidden ? (
          <div className="absolute inset-0 bg-slate-100/90 dark:bg-slate-950/90 transition-all duration-500" />
        ) : (
          <>
            {/* Generative Wave SVG Background (CodePen Generative Canvas) */}
            {(activeWallpaper.id === "generative-waves" ||
              selectedWallpaperId === "generative-waves") && (
              <GenerativeWaveWallpaper showControls={true} />
            )}

            {/* Background Wallpaper Image Layer */}
            {activeWallpaper.id !== "generative-waves" &&
              (!activeWallpaper.type || activeWallpaper.type === "image") &&
              activeWallpaper.id !== "none" &&
              activeWallpaper.url && (
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-all duration-[1200ms]",
                    isActualDark
                      ? "opacity-90 brightness-85 saturate-115"
                      : "opacity-100 brightness-100 saturate-105",
                  )}
                  style={{ backgroundImage: `url(${activeWallpaper.url})` }}
                />
              )}

            {activeWallpaper.type === "video" &&
              activeWallpaper.id !== "none" &&
              activeWallpaper.url && (
                <>
                  <video
                    ref={videoBgRef}
                    autoPlay
                    loop={!isAutoShowcaseActive}
                    muted
                    playsInline
                    onEnded={() => {
                      if (isAutoShowcaseActive) {
                        handleNextWallpaper();
                      }
                    }}
                    poster={activeWallpaper.previewUrl}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms]",
                      isActualDark
                        ? "opacity-90 brightness-85 saturate-115"
                        : "opacity-100 brightness-100 saturate-105",
                    )}
                    style={{
                      filter: videoBlur > 0 ? `blur(${videoBlur}px)` : undefined,
                      transform: videoBlur > 0 ? "scale(1.04)" : undefined, // prevent white edges when blurred
                    }}
                    src={activeWallpaper.url}
                  />
                  {/* Dynamic Video Overlay Dimmer */}
                  {videoDimmer > 0 && (
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                      style={{
                        backgroundColor: `rgba(0, 0, 0, ${videoDimmer / 100})`,
                      }}
                    />
                  )}
                </>
              )}

            {activeWallpaper.type === "css" && activeWallpaper.id !== "none" && (
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-[1200ms]",
                  activeWallpaper.cssClass,
                  isActualDark
                    ? "opacity-90 brightness-85"
                    : "opacity-100 brightness-100",
                )}
              />
            )}

            {activeWallpaper.id === "none" && (
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 transition-colors duration-700 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950" />
            )}
          </>
        )}

        {/* Crisp Soft Ambient Tint Overlay for UI readability (without blurring background image) */}
        <div className="pointer-events-none absolute inset-0 bg-transparent transition-colors duration-700 dark:bg-transparent" />
      </div>

      <div
        className={cn(
          "relative z-10 flex items-center justify-center p-2 transition-all duration-500 sm:p-4 lg:p-8",
          isResponsive
            ? "min-h-screen w-full overflow-hidden lg:h-screen"
            : "h-screen w-screen shrink-0 overflow-hidden",
        )}
      >
        <div id="external-timeline-portal-root" className="pointer-events-none absolute inset-0 z-50 overflow-hidden" />
        <section
          id="app-main-window-container"
          ref={containerRef}
          style={{
            ...(!isResponsive
              ? {
                  transform: `scale(${scaleRatio})`,
                  transformOrigin: "center center",
                  width: "1250px",
                  height: "750px",
                  minWidth: "1250px",
                  minHeight: "750px",
                }
              : {
                  height: "750px",
                }),
            backdropFilter:
              uiStyle === "glass"
                ? `blur(var(--glass-blur, ${glassBlur}px)) contrast(${glassContrast}%) saturate(var(--glass-saturate, ${glassSaturate}%))`
                : `blur(0px)`,
            WebkitBackdropFilter:
              uiStyle === "glass"
                ? `blur(var(--glass-blur, ${glassBlur}px)) contrast(${glassContrast}%) saturate(var(--glass-saturate, ${glassSaturate}%))`
                : `blur(0px)`,
            backgroundColor:
              uiStyle === "glass"
                ? `rgba(255, 255, 255, var(--opacity-app-container, ${glassOpacity / 100}))`
                : uiStyle === "neumorphism"
                  ? `#e2e8f0`
                  : `rgba(248, 250, 252, var(--opacity-app-container, ${softOpacity / 100}))`,
            borderRadius: `${uiRadius}px`,
            boxShadow:
              uiStyle === "soft"
                ? `0 ${softShadow}px ${softShadow * 2.5}px -${softShadow / 2}px rgba(15,23,42,0.08), 0 20px 45px -10px rgba(15,23,42,0.1), inset 0 1.5px 2px rgba(255,255,255,0.95)`
                : uiStyle === "neumorphism"
                  ? `12px 12px 28px #cbd5e1, -12px -12px 28px #ffffff, 0 20px 45px -10px rgba(15,23,42,0.1)`
                  : undefined,
          }}
          className={cn(
            "relative overflow-hidden border transition-all duration-500",
            glassElevation && "glass-elevation",
            uiStyle === "glass"
              ? glassMirrorEffect
                ? "border-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.12),0_8px_20px_rgba(15,23,42,0.06),inset_0_2px_4px_rgba(255,255,255,0.4)] ring-1 ring-white/25"
                : "border-white/70 shadow-[0_20px_50px_rgba(15,23,42,0.12),0_8px_20px_rgba(15,23,42,0.06)]"
              : "border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12),0_8px_20px_rgba(15,23,42,0.06)]",
            isResponsive
              ? "mx-auto flex h-full max-h-[750px] w-full flex-col gap-[5px] overflow-hidden border border-white/80 p-[10px] shadow-[0_20px_50px_rgba(15,23,42,0.12),0_8px_20px_rgba(15,23,42,0.06)] !rounded-[32px] lg:h-[750px] lg:max-w-[1250px] lg:flex-row"
              : "flex gap-[5px] border-white/80 p-[10px] shadow-[0_20px_50px_rgba(15,23,42,0.12),0_8px_20px_rgba(15,23,42,0.06)] dark:border-white/15 dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.85),0_10px_25px_-5px_rgba(0,0,0,0.6)]",
          )}
        >
          <Sidebar
            activePage={activePage}
            onNavigate={handleNavigate}
            isExpanded={isSidebarExpanded}
            onToggleExpand={() => {
              setIsSidebarExpanded(!isSidebarExpanded);
            }}
            ambientSoundEnabled={ambientSoundEnabled}
            onToggleAmbient={() => setAmbientSoundEnabled(!ambientSoundEnabled)}
            neuSidebar={neuSidebar}
            isResponsive={isResponsive}
          />

          <main className="relative flex min-h-0 w-full flex-grow flex-col items-center overflow-hidden border-none bg-transparent p-0 shadow-none transition-all duration-500">
            <div
              className="flex h-full w-full flex-1 origin-top flex-col items-center overflow-hidden border-none bg-transparent p-0 shadow-none transition-all duration-300"
              style={{ zoom: `${displayScale}%`, width: "100%" }}
            >
              <AnimatePresence mode="popLayout" custom={navDirection}>
                <motion.div
                  ref={scrollContainerRef}
                  key={activePage}
                  custom={navDirection}
                  style={{ zoom: `${mainCardScale}%`, width: "100%" }}
                  variants={{
                    initial: (dir: number) => ({
                      x: dir > 0 ? 50 : -50,
                      opacity: 0,
                      scale: 0.98,
                    }),
                    animate: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 280,
                        damping: 28,
                        mass: 0.8,
                      },
                    },
                    exit: (dir: number) => ({
                      x: dir > 0 ? -50 : 50,
                      opacity: 0,
                      scale: 0.98,
                      transition: {
                        duration: 0.2,
                        ease: "easeInOut",
                      },
                    }),
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="custom-scrollbar relative mx-auto flex h-full w-full max-w-[1250px] flex-1 flex-col items-stretch justify-start overflow-x-hidden overflow-y-auto bg-transparent p-0 transition-all duration-300"
                >
                  {activePage === "home" && (
                    <HomePage uiStyle={uiStyle} onNavigate={handleNavigate} />
                  )}
                  {activePage === "coverLetter" && <CoverLetter />}
                  {activePage === "about" && <About onNavigate={handleNavigate} />}
                  {activePage === "experience" && <Experience />}
                  {activePage === "skills" && <Skills />}
                  {activePage === "industries" && <Industries />}
                  {activePage === "projects" && <Projects />}
                  {activePage === "memories" && <Memories />}
                  {activePage === "systems" && <Systems />}
                  {activePage === "education" && <Education />}
                  {activePage === "interview" && <Interview />}
                  {activePage === "wallpapers" && <Wallpapers />}
                  {activePage === "websiteManagement" && <WebsiteManagement />}
                  {activePage === "templateTest" && <TemplateTest />}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

          <RightSidebar
            activePage={activePage}
            onNavigate={handleNavigate}
            onPrev={handlePrev}
            onNext={handleNext}
            ambientSoundEnabled={ambientSoundEnabled}
            onToggleAmbient={() => setAmbientSoundEnabled(!ambientSoundEnabled)}
            isExpanded={isRightSidebarExpanded}
            isResponsive={isResponsive}
            onToggleExpand={() => {
              setIsRightSidebarExpanded(!isRightSidebarExpanded);
            }}
          />
        </section>
      </div>

      {/* Custom Reset to Defaults Confirmation Modal */}
      <AnimatePresence>
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center  modal-backdrop  p-3   sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-lg space-y-5 overflow-hidden rounded-[10px] border-2 border-rose-500/40 bg-white p-6 shadow-2xl backdrop-blur-2xl sm:p-7 dark:bg-slate-900"
            >
              {/* Header */}
              <div className="flex items-center gap-3.5 border-b border-slate-200/80 pb-3 dark:border-slate-800">
                <div className="shrink-0 rounded-[10px] border border-rose-500/30 bg-rose-500/15 p-3 text-rose-500 shadow-md">
                  <AlertTriangle size={24} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl dark:text-white">
                    {t.settingsModal.resetModal.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {t.settingsModal.resetModal.subtitle}
                  </p>
                </div>
              </div>

              {/* Warning Content */}
              <div className="space-y-3">
                <p className="text-xs leading-relaxed font-semibold text-slate-700 dark:text-slate-300">
                  {t.settingsModal.resetModal.warningText}
                </p>

                <div className="space-y-2 rounded-[10px] border border-rose-500/20 bg-rose-500/5 p-4 dark:bg-rose-950/30">
                  {t.settingsModal.resetModal.clearedItems.map(
                    (item: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                        <span>{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-200/80 pt-3 dark:border-slate-800">
                <button
                  onClick={() => {
                    playUiSound("click");
                    setIsResetConfirmOpen(false);
                  }}
                  className="cursor-pointer rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-bold tracking-wider text-slate-700 transition-all hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {t.settingsModal.resetModal.cancelBtn}
                </button>

                <button
                  onClick={() => {
                    handleResetToDefaults();
                    setIsResetConfirmOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 px-6 py-2.5 text-xs font-black tracking-wider text-white shadow-md shadow-rose-600/30 transition-all hover:bg-rose-700 active:scale-95"
                >
                  <RotateCcw size={14} />
                  <span>{t.settingsModal.resetModal.confirmBtn}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Reset Themes Confirmation Modal */}
      <AnimatePresence>
        {isThemeResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center  modal-backdrop  p-3   sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-lg space-y-4 overflow-hidden rounded-2xl border border-rose-500/30 bg-white p-6 shadow-2xl backdrop-blur-2xl sm:p-7 dark:border-rose-500/20 dark:bg-slate-900"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/15 text-rose-500 shadow-sm">
                    <Palette size={22} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                      {language === "vi"
                        ? `Đặt lại ${savedCustomThemes.length} giao diện đã lưu`
                        : `Reset ${savedCustomThemes.length} Saved Theme(s)`}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {language === "vi"
                        ? "Khôi phục cấu hình bảng màu về mặc định"
                        : "Restore theme bookmarks to default state"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-50 px-3 py-1 text-xs font-black text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                  <span>{savedCustomThemes.length}</span>
                  <span className="font-medium text-[11px]">
                    {language === "vi" ? "giao diện" : "themes"}
                  </span>
                </div>
              </div>

              {/* Warning Content */}
              <div className="space-y-3">
                <div className="rounded-xl border border-amber-500/25 bg-amber-50/80 p-3 text-xs leading-relaxed text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                  <p className="font-semibold">
                    {language === "vi"
                      ? `Hành động này sẽ xóa vĩnh viễn ${savedCustomThemes.length} giao diện tùy chỉnh đang được đánh dấu (bookmark) trong Local Storage của trình duyệt:`
                      : `This action will remove all ${savedCustomThemes.length} custom bookmarked theme(s) currently stored in your browser's Local Storage:`}
                  </p>
                </div>

                {/* List of themes to be removed */}
                <div className="max-h-48 space-y-1.5 overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-950/50">
                  {savedCustomThemes.length > 0 ? (
                    savedCustomThemes.map((themeId, idx) => {
                      const details = getThemeDetails(themeId);
                      return (
                        <div
                          key={`${themeId}-${idx}`}
                          className="flex items-center justify-between rounded-lg border border-slate-200/60 bg-white px-3 py-1.5 text-xs shadow-xs transition-colors dark:border-slate-800/80 dark:bg-slate-900"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="h-3.5 w-3.5 shrink-0 rounded-full shadow-xs ring-1 ring-black/10 dark:ring-white/20"
                              style={{ backgroundColor: details.hex }}
                            />
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {details.name}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                            {details.hex}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="py-2 text-center text-xs text-slate-400">
                      {language === "vi"
                        ? "Không có giao diện tùy chỉnh nào được lưu."
                        : "No custom theme bookmarks saved."}
                    </p>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {language === "vi"
                    ? "Sau khi đặt lại, hệ thống sẽ khôi phục giao diện chuẩn 'Violet' mặc định."
                    : "After resetting, the theme bookmarks will be reset to default 'Violet'."}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-200/80 pt-3 dark:border-slate-800">
                <button
                  onClick={() => {
                    playUiSound("click");
                    setIsThemeResetConfirmOpen(false);
                  }}
                  className="cursor-pointer rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold tracking-wider text-slate-700 transition-all hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {language === "vi" ? "Hủy" : "Cancel"}
                </button>

                <button
                  onClick={() => {
                    handleResetThemeBookmarks();
                    setIsThemeResetConfirmOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 px-5 py-2 text-xs font-black tracking-wider text-white shadow-md shadow-rose-600/30 transition-all hover:bg-rose-700 active:scale-95"
                >
                  <RotateCcw size={14} />
                  <span>
                    {language === "vi"
                      ? `Xác Nhận Xóa ${savedCustomThemes.length} Giao Diện`
                      : `Confirm Reset (${savedCustomThemes.length})`}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PDF Generation / Print Progress Overlay */}
      <AnimatePresence>
        {pdfProgress.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center  modal-backdrop  p-4  "
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-md space-y-5 rounded-[10px] border border-slate-200 bg-white p-6 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="animate-bounce-slow flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                  {pdfProgress.mode === "download" ? (
                    <Download size={24} className="animate-pulse" />
                  ) : (
                    <Printer size={24} className="animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-wider text-slate-800 dark:text-slate-200">
                    {pdfProgress.mode === "download"
                      ? language === "en"
                        ? "Direct PDF Downloader"
                        : "Tải File PDF Trực Tiếp"
                      : language === "en"
                        ? "Preparing Print Layout"
                        : "Chuẩn Bị Tài Liệu In"}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {language === "en"
                      ? "Optimizing layout for A4 standards..."
                      : "Đang tối ưu hóa trang phục vụ in ấn chuẩn A4..."}
                  </p>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-2">
                <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-slate-200/50 bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pdfProgress.percent}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  />
                </div>
                <div className="flex items-center justify-between px-1 text-xs font-semibold">
                  <span className="animate-pulse text-left text-slate-600 dark:text-slate-400">
                    {pdfProgress.statusText}
                  </span>
                  <span className="font-black text-indigo-600 dark:text-indigo-400">
                    {pdfProgress.percent}%
                  </span>
                </div>
              </div>

              {/* Status checklist */}
              <div className="flex justify-around border-t border-slate-100 pt-3 text-[10px] text-slate-400 dark:border-slate-800/80 dark:text-slate-500">
                <span
                  className={cn(
                    "flex items-center gap-1",
                    pdfProgress.percent >= 20
                      ? "font-bold text-emerald-500"
                      : "",
                  )}
                >
                  {pdfProgress.percent >= 20 ? "✓" : "○"}{" "}
                  {language === "en" ? "Analyze" : "Phân tích"}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1",
                    pdfProgress.percent >= 50
                      ? "font-bold text-emerald-500"
                      : "",
                  )}
                >
                  {pdfProgress.percent >= 50 ? "✓" : "○"}{" "}
                  {language === "en" ? "Render" : "Kết xuất"}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1",
                    pdfProgress.percent >= 85
                      ? "font-bold text-emerald-500"
                      : "",
                  )}
                >
                  {pdfProgress.percent >= 85 ? "✓" : "○"}{" "}
                  {language === "en" ? "Assemble" : "Đóng gói"}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1",
                    pdfProgress.percent >= 100
                      ? "font-bold text-emerald-500"
                      : "",
                  )}
                >
                  {pdfProgress.percent >= 100 ? "✓" : "○"}{" "}
                  {language === "en" ? "Ready" : "Sẵn sàng"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Popup Modal */}
      {isAiChatOpen && (
        <AIChat isPopup onClose={() => setIsAiChatOpen(false)} />
      )}

      {/* Printable Resume Document Component (Hidden on screen, visible during browser print) */}
      <PrintableResume forceLanguage={printLanguage} />

      {/* PDF Interactive Preview & Print/Download Modal */}
      <PdfPreviewModal
        isOpen={isPdfPreviewOpen}
        onClose={() => setIsPdfPreviewOpen(false)}
        onDownload={(lang) => handleDownloadDirectPdf(lang)}
        onPrint={(lang) => handlePrintPdf(lang)}
        isDownloading={pdfProgress.isOpen}
        downloadPercent={pdfProgress.percent}
        downloadStatus={pdfProgress.statusText}
      />

      <XRayPromptEditor />
      <MouseMagicCursor />
    </main>
  );
}
