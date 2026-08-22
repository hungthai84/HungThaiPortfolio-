import {
  FileDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bot,
  Video,
  Play,
  Pause,
  FastForward,
  Gauge,
  Film,
  Image as ImageIcon,
  Plus,
  MessageCircle,
  Monitor,
  Smartphone,
  Sun,
  Moon,
  CloudSun,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Cloud,
  MapPin,
  ChevronsUp,
  Sparkles,
  Check,
  Trash2,
  X,
  Server,
  Sliders,
  Layers,
  Box,
  Droplets,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RotateCcw,
  Filter,
  Briefcase,
  Zap,
  Feather,
  CheckCircle2,
  SlidersHorizontal,
  Palette,
  Layout,
  RefreshCw,
  Languages,
  HelpCircle,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn, pageSequence } from "../lib/utils";
import { PageId } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { LIGHT_WALLPAPERS, WallpaperOption } from "../App";
import { aiCategories } from "../data/aiQuestions";


export const GLASS_PRESETS: any[] = [];
const _UNUSED_PRESETS = [
  {
    id: "corporate",
    nameVi: "Doanh nghiệp Tinh tế",
    nameEn: "Corporate Sleek",
    descVi: "Độ sắc nét tối đa, độ trong suốt nhẹ nhàng tạo sự chuyên nghiệp cho doanh nghiệp.",
    descEn: "Maximum crispness and refined transparency ideal for enterprise workflows.",
    category: "professional",
    badge: "Enterprise",
    blur: 26,
    saturate: 120,
    shadow: 20,
    mirror: false,
    opacity: 0.92,
    radius: 12,
    appContainerOpacity: 0.92,
    sidebarOpacity: 0.08,
    mainCardOpacity: 0.92,
    mainInfoOpacity: 0.70,
    subCardOpacity: 0.45,
    iconType: "briefcase",
  },
  {
    id: "obsidian",
    nameVi: "Kính Đen Huyền bí",
    nameEn: "Deep Obsidian",
    descVi: "Sắc tối sang trọng, độ tương phản sâu và phản quang viền sắc sảo.",
    descEn: "Luxurious deep dark contrast with crisp edge reflections.",
    category: "professional",
    badge: "Dark Luxe",
    blur: 35,
    saturate: 110,
    shadow: 45,
    mirror: true,
    opacity: 0.80,
    radius: 16,
    appContainerOpacity: 0.82,
    sidebarOpacity: 0.12,
    mainCardOpacity: 0.80,
    mainInfoOpacity: 0.72,
    subCardOpacity: 0.50,
    iconType: "moon",
  },

  // Playful Category
  {
    id: "acrylic",
    nameVi: "Mica Acrylic",
    nameEn: "Acrylic Mica",
    descVi: "Độ mờ dày, màu sắc sống động bão hoà cao và phản chiếu vệt sáng.",
    descEn: "Heavy diffusion with rich saturation and specular top highlights.",
    category: "playful",
    badge: "Vibrant",
    blur: 40,
    saturate: 180,
    shadow: 35,
    mirror: true,
    opacity: 0.82,
    radius: 16,
    appContainerOpacity: 0.75,
    sidebarOpacity: 0.15,
    mainCardOpacity: 0.80,
    mainInfoOpacity: 0.75,
    subCardOpacity: 0.55,
    iconType: "droplets",
  },
  {
    id: "neon",
    nameVi: "Neon Siêu Rực rỡ",
    nameEn: "Vibrant Neon Glow",
    descVi: "Tăng cường bão hòa 200% và bóng đổ sâu cho cảm giác hiện đại cuốn hút.",
    descEn: "200% saturation boost with deep ambient glow for an ultra-vivid look.",
    category: "playful",
    badge: "Ultra FX",
    blur: 30,
    saturate: 200,
    shadow: 55,
    mirror: true,
    opacity: 0.75,
    radius: 20,
    appContainerOpacity: 0.72,
    sidebarOpacity: 0.18,
    mainCardOpacity: 0.75,
    mainInfoOpacity: 0.80,
    subCardOpacity: 0.60,
    iconType: "zap",
  },
  {
    id: "prism",
    nameVi: "Lăng kính Hologram",
    nameEn: "Cyber Prism",
    descVi: "Độ mờ cao, bo góc lớn 24px và khúc xạ ánh sáng đa sắc phong phú.",
    descEn: "High blur dispersion, 24px roundness, and rich spectral glow.",
    category: "playful",
    badge: "Prism",
    blur: 45,
    saturate: 190,
    shadow: 40,
    mirror: true,
    opacity: 0.68,
    radius: 24,
    appContainerOpacity: 0.70,
    sidebarOpacity: 0.20,
    mainCardOpacity: 0.70,
    mainInfoOpacity: 0.75,
    subCardOpacity: 0.55,
    iconType: "sparkles",
  },

  // Minimalist Category
  {
    id: "elevation",
    nameVi: "Nổi khối 3D",
    nameEn: "Elevation 3D",
    descVi: "Độ sâu nổi khối thanh thoát với bóng đa tầng và góc bo mềm mại.",
    descEn: "Lifted 3D spatial depth with layered shadows and soft curvature.",
    category: "minimalist",
    badge: "3D Depth",
    blur: 30,
    saturate: 160,
    shadow: 45,
    mirror: true,
    opacity: 0.88,
    radius: 20,
    appContainerOpacity: 0.85,
    sidebarOpacity: 0.10,
    mainCardOpacity: 0.88,
    mainInfoOpacity: 0.70,
    subCardOpacity: 0.50,
    iconType: "box",
  },
  {
    id: "frosted",
    nameVi: "Kính mờ Tối giản",
    nameEn: "Frosted Crisp",
    descVi: "Độ mờ nhẹ, sạch sẽ và giữ trọn độ nét phông chữ tối ưu.",
    descEn: "Light frosted diffusion prioritizing absolute typographic legibility.",
    category: "minimalist",
    badge: "Clean",
    blur: 16,
    saturate: 130,
    shadow: 15,
    mirror: false,
    opacity: 0.95,
    radius: 14,
    appContainerOpacity: 0,
    sidebarOpacity: 0,
    mainCardOpacity: 0.95,
    mainInfoOpacity: 0.55,
    subCardOpacity: 0.35,
    iconType: "feather",
  },
  {
    id: "ultra-thin",
    nameVi: "Siêu mỏng Trong suốt",
    nameEn: "Ultra-Thin Airy",
    descVi: "Độ mỏng cao, nhìn xuyên thấu cảnh nền sống động tối đa.",
    descEn: "Featherlight transparency allowing full backdrop visibility.",
    category: "minimalist",
    badge: "Airy",
    blur: 50,
    saturate: 170,
    shadow: 30,
    mirror: true,
    opacity: 0.50,
    radius: 18,
    appContainerOpacity: 0.55,
    sidebarOpacity: 0.10,
    mainCardOpacity: 0.55,
    mainInfoOpacity: 0.65,
    subCardOpacity: 0.45,
    iconType: "sun",
  },
];

interface RightSidebarProps {
  onPrev: () => void;
  onNext: () => void;
  onNavigate?: (page: PageId) => void;
  activePage?: PageId;
  ambientSoundEnabled?: boolean;
  onToggleAmbient?: () => void;
  isExpanded?: boolean;
  isResponsive?: boolean;
  onToggleExpand?: () => void;
}

export function GlassAnimatedWeatherIcon({
  code = 0,
  isDay = true,
  size = 64,
}: {
  code?: number;
  isDay?: boolean;
  size?: number;
}) {
  const isClear = code === 0 || code === 1;
  const isCloudy = code === 2 || code === 3;
  const isRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
  const isThunder = code >= 95;
  const isFog = code >= 45 && code <= 48;
  const isSnow = (code >= 71 && code <= 77) || code === 85 || code === 86;

  const renderIconContent = () => {
    if (!isDay && (isClear || isCloudy || isFog)) {
      // SCENE 1: Night cloudy / crescent moon
      return (
        <g filter="url(#dropShadow)">
          {/* Glowing Crescent Moon */}
          <path
            d="M52 22 C52 22 30 26 30 48 C30 66 45 76 64 73 C48 78 36 64 36 48 C36 33 46 25 52 22 Z"
            fill="url(#moonGrad)"
            stroke="#FFB300"
            strokeWidth="1.2"
            filter="url(#glow)"
            className="animate-[pulse_3s_ease-in-out_infinite]"
          />
          {/* Frosted Glass Cloud with high visibility */}
          <path
            d="M25 60 C25 51.7 31.7 45 40 45 C41.2 45 42.4 45.1 43.5 45.4 C47.5 39.5 54.3 35.6 62 35.6 C72.5 35.6 81.3 42.6 83.7 52.1 C84.7 51.8 85.8 51.6 87 51.6 C94.2 51.6 100 57.4 100 64.6 C100 71.8 94.2 77.6 87 77.6 L40 77.6 C31.7 77.6 25 70.9 25 62.6 Z"
            fill="url(#glassGrad)"
            stroke="url(#glassBorder)"
            strokeWidth="2.5"
            className="backdrop-blur-[4px] animate-[pulse_4s_ease-in-out_infinite]"
          />
        </g>
      );
    }

    if (isThunder) {
      // SCENE 2: Thunderstorm with lightning
      return (
        <g filter="url(#dropShadow)">
          {/* Glowing Lightning Bolt */}
          <path
            d="M48 45 L62 45 L48 68 L62 68 L36 94 L48 70 L36 70 Z"
            fill="url(#lightningGrad)"
            stroke="#FFE500"
            strokeWidth="1"
            filter="url(#glow)"
            className="animate-pulse"
          />
          {/* Dark Glass Cloud */}
          <path
            d="M20 52 C20 43.7 26.7 37 35 37 C36.2 37 37.4 37.1 38.5 37.4 C42.5 31.5 49.3 27.6 57 27.6 C67.5 27.6 76.3 34.6 78.7 44.1 C79.7 43.8 80.8 43.6 82 43.6 C89.2 43.6 95 49.4 95 56.6 C95 63.8 89.2 69.6 82 69.6 L35 69.6 C26.7 69.6 20 62.9 20 54.6 Z"
            fill="url(#thunderCloudGrad)"
            stroke="url(#glassBorder)"
            strokeWidth="2.5"
            className="backdrop-blur-[4px]"
          />
        </g>
      );
    }

    if (isDay && (isClear || isCloudy || isFog)) {
      // SCENE 3: Day partly cloudy / sunny
      return (
        <g filter="url(#dropShadow)">
          {/* Glowing Sun with Sunrays */}
          <g className="animate-[spin_40s_linear_infinite]" transform="translate(60, 36)">
            <circle cx="0" cy="0" r="18" fill="url(#sunGrad)" filter="url(#glow)" stroke="#FF8F00" strokeWidth="1.5" />
            {/* Sun Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="0"
                y1="-22"
                x2="0"
                y2="-29"
                stroke="#FF8F00"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
          {/* Frosted Glass Cloud with High Clarity */}
          <path
            d="M18 58 C18 49.7 24.7 43 33 43 C34.2 43 35.4 43.1 36.5 43.4 C40.5 37.5 47.3 33.6 55 33.6 C65.5 33.6 74.3 40.6 76.7 50.1 C77.7 49.8 78.8 49.6 80 49.6 C87.2 49.6 93 55.4 93 62.6 C93 69.8 87.2 75.6 80 75.6 L33 75.6 C24.7 75.6 18 68.9 18 60.6 Z"
            fill="url(#glassGrad)"
            stroke="url(#glassBorder)"
            strokeWidth="2.5"
            className="backdrop-blur-[4px] animate-[pulse_5s_ease-in-out_infinite]"
          />
        </g>
      );
    }

    if (isRain && code >= 60) {
      // SCENE 4: Heavy Rain with glowing cyan/purple rain streaks
      return (
        <g filter="url(#dropShadow)">
          {/* Glowing rain streaks */}
          {[
            { x1: 34, y1: 65, x2: 28, y2: 84 },
            { x1: 48, y1: 68, x2: 42, y2: 87 },
            { x1: 62, y1: 65, x2: 56, y2: 84 },
            { x1: 76, y1: 68, x2: 70, y2: 87 }
          ].map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#00E5FF"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#glow)"
              className="animate-pulse"
              style={{ animationDelay: `${idx * 0.25}s` }}
            />
          ))}
          {/* Frosted Glass Cloud */}
          <path
            d="M20 54 C20 45.7 26.7 39 35 39 C36.2 39 37.4 39.1 38.5 39.4 C42.5 33.5 49.3 29.6 57 29.6 C67.5 29.6 76.3 36.6 78.7 46.1 C79.7 45.8 80.8 45.6 82 45.6 C89.2 45.6 95 51.4 95 58.6 C95 65.8 89.2 71.6 82 71.6 L35 71.6 C26.7 71.6 20 64.9 20 56.6 Z"
            fill="url(#glassGrad)"
            stroke="url(#glassBorder)"
            strokeWidth="2.5"
            className="backdrop-blur-[4px]"
          />
        </g>
      );
    }

    if (isRain) {
      // SCENE 5: Standard Rain - Glossy blue raindrop
      return (
        <g filter="url(#dropShadow)">
          {/* Big Glossy blue raindrop */}
          <path
            d="M50 42 C50 42 64 62 64 74 C64 82 58 88 50 88 C42 88 36 82 36 74 C36 62 50 42 50 42 Z"
            fill="url(#rainGrad)"
            stroke="#0284C7"
            strokeWidth="1.5"
            filter="url(#glow)"
            className="animate-bounce"
          />
          {/* Frosted Glass Cloud */}
          <path
            d="M20 48 C20 39.7 26.7 33 35 33 C36.2 33 37.4 33.1 38.5 33.4 C42.5 27.5 49.3 23.6 57 23.6 C67.5 23.6 76.3 30.6 78.7 40.1 C79.7 39.8 80.8 39.6 82 39.6 C89.2 39.6 95 45.4 95 52.6 C95 59.8 89.2 65.6 82 65.6 L35 65.6 C26.7 65.6 20 58.9 20 50.6 Z"
            fill="url(#glassGrad)"
            stroke="url(#glassBorder)"
            strokeWidth="2.5"
            className="backdrop-blur-[4px]"
          />
        </g>
      );
    }

    if (isSnow) {
      // SCENE 6: Snow / Snowflake
      return (
        <g filter="url(#dropShadow)">
          {/* Rotating Glowing Snowflake */}
          <g className="animate-[spin_20s_linear_infinite]" transform="translate(50, 72)">
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <g key={angle} transform={`rotate(${angle})`}>
                <line x1="0" y1="0" x2="0" y2="-14" stroke="url(#snowGrad)" strokeWidth="3" filter="url(#glow)" />
                <path d="M-4 -8 L0 -12 L4 -8" fill="none" stroke="url(#snowGrad)" strokeWidth="2.5" />
              </g>
            ))}
          </g>
          {/* Frosted Glass Cloud */}
          <path
            d="M20 44 C20 35.7 26.7 29 35 29 C36.2 29 37.4 29.1 38.5 29.4 C42.5 23.5 49.3 19.6 57 19.6 C67.5 19.6 76.3 26.6 78.7 36.1 C79.7 35.8 80.8 35.6 82 35.6 C89.2 35.6 95 41.4 95 48.6 C95 55.8 89.2 61.6 82 61.6 L35 61.6 C26.7 61.6 20 54.9 20 46.6 Z"
            fill="url(#glassGrad)"
            stroke="url(#glassBorder)"
            strokeWidth="2.5"
            className="backdrop-blur-[4px]"
          />
        </g>
      );
    }

    // Default Fallback: Classic Cloudy scene
    return (
      <g filter="url(#dropShadow)">
        {/* Secondary back cloud */}
        <path
          d="M38 52 C38 45.4 43.4 40 50 40 C51 40 51.9 40.1 52.8 40.4 C56 35.7 61.4 32.5 67.5 32.5 C75.9 32.5 82.9 38.1 84.8 45.7 C85.6 45.5 86.5 45.3 87.4 45.3 C93.2 45.3 97.9 50 97.9 55.8 C97.9 61.6 93.2 66.3 87.4 66.3 L50 66.3 C43.4 66.3 38 60.9 38 54.3 Z"
          fill="rgba(148, 163, 184, 0.7)"
          className="animate-[pulse_6s_ease-in-out_infinite]"
        />
        {/* Main Frosted Glass Cloud */}
        <path
          d="M18 58 C18 49.7 24.7 43 33 43 C34.2 43 35.4 43.1 36.5 43.4 C40.5 37.5 47.3 33.6 55 33.6 C65.5 33.6 74.3 40.6 76.7 50.1 C77.7 49.8 78.8 49.6 80 49.6 C87.2 49.6 93 55.4 93 62.6 C93 69.8 87.2 75.6 80 75.6 L33 75.6 C24.7 75.6 18 68.9 18 60.6 Z"
          fill="url(#glassGrad)"
          stroke="url(#glassBorder)"
          strokeWidth="2.5"
          className="backdrop-blur-[4px] animate-[pulse_4s_ease-in-out_infinite]"
        />
      </g>
    );
  };

  return (
    <div
      className="group/weather-icon relative flex items-center justify-center select-none transition-all duration-300 group-hover/weather:scale-110"
      style={{ width: size, height: size }}
    >
      {/* Background aura badge for high contrast */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/20 via-indigo-500/10 to-amber-400/20 opacity-80 blur-[2px] transition-all group-hover/weather:opacity-100" />

      {/* SVG Canvas representing high fidelity glassmorphism vectors */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-lg"
      >
        <defs>
          {/* Intense glow blur filter */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* High contrast drop shadow filter */}
          <filter id="dropShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.4" />
          </filter>

          {/* High Contrast Color Gradients */}
          <linearGradient id="sunGrad" x1="42" y1="22" x2="74" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF6D00" />
          </linearGradient>

          <linearGradient id="moonGrad" x1="30" y1="22" x2="64" y2="73" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#FF8F00" />
          </linearGradient>

          <linearGradient id="lightningGrad" x1="40" y1="45" x2="55" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="50%" stopColor="#FFEE58" />
            <stop offset="100%" stopColor="#F57F17" />
          </linearGradient>

          <linearGradient id="rainGrad" x1="36" y1="42" x2="64" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="snowGrad" x1="40" y1="58" x2="60" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E0F7FA" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Vibrant high-contrast frosted glass cloud gradient */}
          <linearGradient id="glassGrad" x1="20" y1="30" x2="100" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F0F9FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="thunderCloudGrad" x1="20" y1="30" x2="100" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#64748B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="glassBorder" x1="20" y1="30" x2="100" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {renderIconContent()}
      </svg>
    </div>
  );
}

export function RightSidebar({
  onPrev,
  onNext,
  onNavigate,
  activePage,
  ambientSoundEnabled,
  onToggleAmbient,
  isExpanded = false,
  isResponsive = false,
  onToggleExpand,
}: RightSidebarProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [time, setTime] = useState(new Date());
  const [isGoogleStudio, setIsGoogleStudio] = useState(false);
  const [weather, setWeather] = useState<{
    temp: number;
    code: number;
    isDay: number;
  } | null>(null);

  // Page curl / wallpaper background modal state
  const [isDraggingCurl, setIsDraggingCurl] = useState(false);
  const [curlDrag, setCurlDrag] = useState({ x: 0, y: 0 });
  const [btnPos, setBtnPos] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem("responsive_btn_pos");
      return saved ? JSON.parse(saved) : { x: 0, y: 0 };
    } catch {
      return { x: 0, y: 0 };
    }
  });
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>(() => {
    return (
      localStorage.getItem("app_wallpaper") ||
      localStorage.getItem("app_selected_wallpaper") ||
      "aurora"
    );
  });

  const handleApplyPreset = (presetItem: any) => {};
  const handleSelectGlassPreset = (presetId: string) => {};
  const handleResetGlassEffects = () => {};
  const handleGlassSaturateChange = (val: number) => {};
  const handleProjectBlurChange = (val: number) => {};
  const handleGlassShadowIntensityChange = (val: number) => {};
  const handleGlassMirrorEffectToggle = (val: boolean) => {};
  const handleProjectOpacityChange = (val: number) => {};
  const handleProjectDarkOpacityChange = (val: number) => {};
  const handleCardRadiusChange = (val: number) => {};
  const handleCardOpacityChange = (val: number) => {};
  const handleAppContainerOpacityChange = (val: number) => {};
  const handleSidebarOpacityChange = (val: number) => {};
  const handleMainCardOpacityChange = (val: number) => {};
  const handleMainInfoOpacityChange = (val: number) => {};
  const handleSubCardOpacityChange = (val: number) => {};
  const handleHeaderOpacityChange = (val: number) => {};
  const handleHeaderBlurChange = (val: number) => {};
  const handleHeaderRadiusChange = (val: number) => {};
  const handleThemeStyleChange = (style: any) => {};
  const appContainerOpacity = 0;
  const sidebarOpacity = 0;
  const mainCardOpacity = 0;
  const mainInfoOpacity = 0;
  const subCardOpacity = 0;
  const headerOpacity = 0;
  const headerBlur = 0;
  const headerRadius = 0;

  /* Legacy glass/card handlers commented out:
  const _handleApplyPreset = (presetItem: GlassPresetDefinition) => {
    setGlassPreset(presetItem.id as any);
    setProjectBlur(presetItem.blur);
    setGlassSaturate(presetItem.saturate);
    setGlassShadowIntensity(presetItem.shadow);
    setGlassMirrorEffect(presetItem.mirror);
    setCardRadius(presetItem.radius);
    setCardOpacity(presetItem.opacity);
    setAppContainerOpacity(presetItem.appContainerOpacity);
    setSidebarOpacity(presetItem.sidebarOpacity);
    setMainCardOpacity(presetItem.mainCardOpacity);
    setMainInfoOpacity(presetItem.mainInfoOpacity);
    setSubCardOpacity(presetItem.subCardOpacity);

    localStorage.setItem("app_glass_preset", presetItem.id);
    localStorage.setItem("app_glass_blur", String(presetItem.blur));
    localStorage.setItem("app_project_glass_blur", String(presetItem.blur));
    localStorage.setItem("app_glass_saturate", String(presetItem.saturate));
    localStorage.setItem("app_glass_shadow_intensity", String(presetItem.shadow));
    localStorage.setItem("app_glass_mirror_effect", String(presetItem.mirror));
    localStorage.setItem("app_card_radius", String(presetItem.radius));
    localStorage.setItem("app_card_opacity", String(presetItem.opacity));
    localStorage.setItem(
      "app_opacity_app_container",
      String(presetItem.appContainerOpacity),
    );
    localStorage.setItem("app_opacity_sidebar", String(presetItem.sidebarOpacity));
    localStorage.setItem(
      "app_opacity_main_card",
      String(presetItem.mainCardOpacity),
    );
    localStorage.setItem(
      "app_opacity_main_info",
      String(presetItem.mainInfoOpacity),
    );
    localStorage.setItem(
      "app_opacity_sub_card",
      String(presetItem.subCardOpacity),
    );

    document.documentElement.style.setProperty(
      "--glass-blur",
      `${presetItem.blur}px`,
    );
    document.documentElement.style.setProperty(
      "--glass-saturate",
      `${presetItem.saturate}%`,
    );
    document.documentElement.style.setProperty(
      "--project-glass-blur",
      `${presetItem.blur}px`,
    );
    document.documentElement.style.setProperty(
      "--glass-shadow-intensity",
      `${presetItem.shadow}%`,
    );
    document.documentElement.style.setProperty(
      "--card-radius",
      `${presetItem.radius}px`,
    );
    document.documentElement.style.setProperty(
      "--card-opacity",
      `${presetItem.opacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-app-container",
      `${presetItem.appContainerOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-sidebars",
      `${presetItem.sidebarOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-main-card",
      `${presetItem.mainCardOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-info-card",
      `${presetItem.mainInfoOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-sub-card",
      `${presetItem.subCardOpacity}`,
    );

    window.dispatchEvent(
      new CustomEvent("app-apply-glass-preset", {
        detail: {
          id: presetItem.id,
          blur: presetItem.blur,
          opacity: presetItem.opacity,
          saturate: presetItem.saturate,
          contrast: presetItem.contrast || 100,
          elevation: presetItem.elevation || false,
          depth: presetItem.depth || false,
          mirror: presetItem.mirror,
          border: presetItem.colorBorder || "rgba(255, 255, 255, 0.25)",
          shadow: presetItem.shadow,
        },
      }),
    );
    window.dispatchEvent(
      new CustomEvent("app-glass-blur-updated", { detail: presetItem.blur }),
    );
    window.dispatchEvent(
      new CustomEvent("app-glass-saturate-updated", {
        detail: presetItem.saturate,
      }),
    );
    window.dispatchEvent(
      new CustomEvent("app-glass-shadow-updated", {
        detail: presetItem.shadow,
      }),
    );
    window.dispatchEvent(
      new CustomEvent("app-glass-mirror-updated", {
        detail: presetItem.mirror,
      }),
    );

    playUiSound("click");
    setGlassActionToast(
      language === "vi"
        ? `✨ Đã áp dụng mẫu kính "${presetItem.nameVi}"!`
        : `✨ Applied "${presetItem.nameEn}" glass preset!`,
    );
    setTimeout(() => setGlassActionToast(null), 3000);
  };

  const handleSelectGlassPreset = (
    presetId: string,
  ) => {
    const found = GLASS_PRESETS.find((p) => p.id === presetId);
    if (found) {
      handleApplyPreset(found);
      return;
    }

    setGlassPreset(presetId as any);
    localStorage.setItem("app_glass_preset", presetId);
    playUiSound("click");
  };

  const handleResetGlassEffects = () => {
    const defaultBlur = 24;
    const defaultSaturate = 150;
    const defaultShadow = 35;
    const defaultMirror = false;
    const defaultRadius = 16;
    const defaultOpacity = 0.95;
    const defaultAppContainerOpacity = 0.95;
    const defaultSidebarOpacity = 0.05;
    const defaultMainCardOpacity = 0.95;
    const defaultMainInfoOpacity = 0.60;
    const defaultSubCardOpacity = 0.40;

    setProjectBlur(defaultBlur);
    setGlassSaturate(defaultSaturate);
    setGlassShadowIntensity(defaultShadow);
    setGlassMirrorEffect(defaultMirror);
    setCardRadius(defaultRadius);
    setCardOpacity(defaultOpacity);
    setAppContainerOpacity(defaultAppContainerOpacity);
    setSidebarOpacity(defaultSidebarOpacity);
    setMainCardOpacity(defaultMainCardOpacity);
    setMainInfoOpacity(defaultMainInfoOpacity);
    setSubCardOpacity(defaultSubCardOpacity);
    setGlassPreset("standard");

    localStorage.setItem("app_glass_blur", String(defaultBlur));
    localStorage.setItem("app_project_glass_blur", String(defaultBlur));
    localStorage.setItem("app_glass_saturate", String(defaultSaturate));
    localStorage.setItem("app_glass_shadow_intensity", String(defaultShadow));
    localStorage.setItem("app_glass_mirror_effect", String(defaultMirror));
    localStorage.setItem("app_card_radius", String(defaultRadius));
    localStorage.setItem("app_card_opacity", String(defaultOpacity));
    localStorage.setItem(
      "app_opacity_app_container",
      String(defaultAppContainerOpacity),
    );
    localStorage.setItem("app_opacity_sidebar", String(defaultSidebarOpacity));
    localStorage.setItem(
      "app_opacity_main_card",
      String(defaultMainCardOpacity),
    );
    localStorage.setItem(
      "app_opacity_main_info",
      String(defaultMainInfoOpacity),
    );
    localStorage.setItem(
      "app_opacity_sub_card",
      String(defaultSubCardOpacity),
    );
    localStorage.setItem("app_glass_preset", "standard");

    document.documentElement.style.setProperty(
      "--glass-blur",
      `${defaultBlur}px`,
    );
    document.documentElement.style.setProperty(
      "--glass-saturate",
      `${defaultSaturate}%`,
    );
    document.documentElement.style.setProperty(
      "--project-glass-blur",
      `${defaultBlur}px`,
    );
    document.documentElement.style.setProperty(
      "--glass-shadow-intensity",
      `${defaultShadow}%`,
    );
    document.documentElement.style.setProperty(
      "--card-radius",
      `${defaultRadius}px`,
    );
    document.documentElement.style.setProperty(
      "--card-opacity",
      `${defaultOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-app-container",
      `${defaultAppContainerOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-sidebars",
      `${defaultSidebarOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-main-card",
      `${defaultMainCardOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-info-card",
      `${defaultMainInfoOpacity}`,
    );
    document.documentElement.style.setProperty(
      "--opacity-sub-card",
      `${defaultSubCardOpacity}`,
    );

    window.dispatchEvent(
      new CustomEvent("app-glass-blur-updated", { detail: defaultBlur }),
    );
    window.dispatchEvent(
      new CustomEvent("app-glass-saturate-updated", { detail: defaultSaturate }),
    );
    window.dispatchEvent(
      new CustomEvent("app-glass-shadow-updated", { detail: defaultShadow }),
    );
    window.dispatchEvent(
      new CustomEvent("app-glass-mirror-updated", { detail: defaultMirror }),
    );
    window.dispatchEvent(
      new CustomEvent("app-apply-glass-preset", {
        detail: {
          id: "standard",
          blur: defaultBlur,
          opacity: defaultOpacity,
          saturate: defaultSaturate,
          contrast: 100,
          elevation: false,
          depth: false,
          mirror: defaultMirror,
          border: "rgba(255, 255, 255, 0.25)",
          shadow: defaultShadow,
        },
      }),
    );

    playUiSound("reset");
    setGlassActionToast(
      language === "vi"
        ? "🔄 Đã khôi phục toàn bộ hiệu ứng Kính về thông số mặc định ban đầu!"
        : "🔄 All glass effects restored to default values successfully!",
    );
    setTimeout(() => setGlassActionToast(null), 3500);
  };

  const handleGlassSaturateChange = (val: number) => {
    setGlassSaturate(val);
    localStorage.setItem("app_glass_saturate", val.toString());
    document.documentElement.style.setProperty(
      "--glass-saturate",
      `${val}%`,
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
    if (themeStyle !== "custom") {
      setThemeStyle("custom");
      localStorage.setItem("app_theme_style", "custom");
    }
    window.dispatchEvent(
      new CustomEvent("app-glass-saturate-updated", { detail: val }),
    );
  };

  const handleProjectBlurChange = (val: number) => {
    setProjectBlur(val);
    localStorage.setItem("app_glass_blur", val.toString());
    localStorage.setItem("app_project_glass_blur", val.toString());
    document.documentElement.style.setProperty(
      "--glass-blur",
      `${val}px`,
    );
    document.documentElement.style.setProperty(
      "--project-glass-blur",
      `${val}px`,
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
    if (themeStyle !== "custom") {
      setThemeStyle("custom");
      localStorage.setItem("app_theme_style", "custom");
    }
    window.dispatchEvent(new CustomEvent("app-glass-blur-updated", { detail: val }));
  };

  const handleGlassShadowIntensityChange = (val: number) => {
    setGlassShadowIntensity(val);
    localStorage.setItem("app_glass_shadow_intensity", val.toString());
    document.documentElement.style.setProperty(
      "--glass-shadow-intensity",
      `${val}%`,
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
    window.dispatchEvent(new CustomEvent("app-glass-shadow-updated", { detail: val }));
  };

  const handleGlassMirrorEffectToggle = (checked: boolean) => {
    setGlassMirrorEffect(checked);
    localStorage.setItem("app_glass_mirror_effect", checked ? "true" : "false");
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
    playUiSound("click");
    window.dispatchEvent(new CustomEvent("app-glass-mirror-updated", { detail: checked }));
  };

  const handleProjectOpacityChange = (val: number) => {
    setProjectOpacity(val);
    localStorage.setItem("app_project_glass_opacity", val.toString());
    document.documentElement.style.setProperty(
      "--project-glass-opacity",
      val.toString(),
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
    if (themeStyle !== "custom") {
      setThemeStyle("custom");
      localStorage.setItem("app_theme_style", "custom");
    }
  };

  const handleProjectDarkOpacityChange = (val: number) => {
    setProjectDarkOpacity(val);
    localStorage.setItem("app_project_glass_dark_opacity", val.toString());
    document.documentElement.style.setProperty(
      "--project-glass-dark-opacity",
      val.toString(),
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
    if (themeStyle !== "custom") {
      setThemeStyle("custom");
      localStorage.setItem("app_theme_style", "custom");
    }
  };

  const handleCardRadiusChange = (val: number) => {
    setCardRadius(val);
    localStorage.setItem("app_card_radius", val.toString());
    document.documentElement.style.setProperty("--card-radius", `${val}px`);
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
    if (themeStyle !== "custom") {
      setThemeStyle("custom");
      localStorage.setItem("app_theme_style", "custom");
    }
  };

  const handleCardOpacityChange = (val: number) => {
    setCardOpacity(val);
    localStorage.setItem("app_card_opacity", val.toString());
    document.documentElement.style.setProperty(
      "--card-opacity",
      val.toString(),
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
    if (themeStyle !== "custom") {
      setThemeStyle("custom");
      localStorage.setItem("app_theme_style", "custom");
    }
  };
  const handleAppContainerOpacityChange = (val: number) => {
    setAppContainerOpacity(val);
    localStorage.setItem("app_opacity_app_container", val.toString());
    document.documentElement.style.setProperty(
      "--opacity-app-container",
      val.toString(),
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
  };
  const handleSidebarOpacityChange = (val: number) => {
    setSidebarOpacity(val);
    localStorage.setItem("app_opacity_sidebar", val.toString());
    document.documentElement.style.setProperty(
      "--opacity-sidebars",
      val.toString(),
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
  };
  const handleMainCardOpacityChange = (val: number) => {
    setMainCardOpacity(val);
    localStorage.setItem("app_opacity_main_card", val.toString());
    document.documentElement.style.setProperty(
      "--opacity-main-card",
      val.toString(),
    );
    document.documentElement.style.setProperty(
      "--card-opacity",
      val.toString(),
    ); // keep backward compatibility
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
  };
  const handleMainInfoOpacityChange = (val: number) => {
    setMainInfoOpacity(val);
    localStorage.setItem("app_opacity_main_info", val.toString());
    document.documentElement.style.setProperty(
      "--opacity-info-card",
      val.toString(),
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
  };
  const handleSubCardOpacityChange = (val: number) => {
    setSubCardOpacity(val);
    localStorage.setItem("app_opacity_sub_card", val.toString());
    document.documentElement.style.setProperty(
      "--opacity-sub-card",
      val.toString(),
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
  };

  const handleHeaderOpacityChange = (val: number) => {
    setHeaderOpacity(val);
    localStorage.setItem("app_header_opacity", val.toString());
    document.documentElement.style.setProperty(
      "--header-opacity",
      val.toString(),
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
  };

  const handleHeaderBlurChange = (val: number) => {
    setHeaderBlur(val);
    localStorage.setItem("app_header_blur", val.toString());
    document.documentElement.style.setProperty(
      "--header-blur",
      `${val}px`,
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
  };

  const handleHeaderRadiusChange = (val: number) => {
    setHeaderRadius(val);
    localStorage.setItem("app_header_radius", val.toString());
    document.documentElement.style.setProperty(
      "--header-radius",
      `${val}px`,
    );
    setGlassPreset("custom");
    localStorage.setItem("app_glass_preset", "custom");
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--opacity-app-container",
      appContainerOpacity.toString(),
    );
    document.documentElement.style.setProperty(
      "--opacity-sidebars",
      sidebarOpacity.toString(),
    );
    document.documentElement.style.setProperty(
      "--opacity-main-card",
      mainCardOpacity.toString(),
    );
    document.documentElement.style.setProperty(
      "--card-opacity",
      mainCardOpacity.toString(),
    );
    document.documentElement.style.setProperty(
      "--opacity-info-card",
      mainInfoOpacity.toString(),
    );
    document.documentElement.style.setProperty(
      "--opacity-sub-card",
      subCardOpacity.toString(),
    );
    document.documentElement.style.setProperty(
      "--header-opacity",
      headerOpacity.toString(),
    );
    document.documentElement.style.setProperty(
      "--header-blur",
      `${headerBlur}px`,
    );
    document.documentElement.style.setProperty(
      "--header-radius",
      `${headerRadius}px`,
    );
  }, [
    appContainerOpacity,
    sidebarOpacity,
    mainCardOpacity,
    mainInfoOpacity,
    subCardOpacity,
    headerOpacity,
    headerBlur,
    headerRadius,
  ]);

  const handleThemeStyleChange = (style: "light" | "dark" | "custom") => {
    setThemeStyle(style);
    localStorage.setItem("app_theme_style", style);

    if (style === "light") {
      window.dispatchEvent(
        new CustomEvent("app-set-theme", { detail: { theme: "light" } }),
      );

      setProjectBlur(12);
      localStorage.setItem("app_project_glass_blur", "12");
      document.documentElement.style.setProperty(
        "--project-glass-blur",
        "12px",
      );

      setProjectOpacity(0.92);
      localStorage.setItem("app_project_glass_opacity", "0.92");
      document.documentElement.style.setProperty(
        "--project-glass-opacity",
        "0.92",
      );

      setProjectDarkOpacity(0.7);
      localStorage.setItem("app_project_glass_dark_opacity", "0.7");
      document.documentElement.style.setProperty(
        "--project-glass-dark-opacity",
        "0.7",
      );

      setCardRadius(16);
      localStorage.setItem("app_card_radius", "16");
      document.documentElement.style.setProperty("--card-radius", "16px");

      setCardOpacity(0.96);
      localStorage.setItem("app_card_opacity", "0.96");
      document.documentElement.style.setProperty("--card-opacity", "0.96");
    } else if (style === "dark") {
      window.dispatchEvent(
        new CustomEvent("app-set-theme", { detail: { theme: "dark" } }),
      );

      setProjectBlur(24);
      localStorage.setItem("app_project_glass_blur", "24");
      document.documentElement.style.setProperty(
        "--project-glass-blur",
        "24px",
      );

      setProjectOpacity(0.7);
      localStorage.setItem("app_project_glass_opacity", "0.7");
      document.documentElement.style.setProperty(
        "--project-glass-opacity",
        "0.7",
      );

      setProjectDarkOpacity(0.45);
      localStorage.setItem("app_project_glass_dark_opacity", "0.45");
      document.documentElement.style.setProperty(
        "--project-glass-dark-opacity",
        "0.45",
      );

      setCardRadius(16);
      localStorage.setItem("app_card_radius", "16");
      document.documentElement.style.setProperty("--card-radius", "16px");

      setCardOpacity(0.85);
      localStorage.setItem("app_card_opacity", "0.85");
      document.documentElement.style.setProperty("--card-opacity", "0.85");
    }
    playUiSound("click");
  };
  */

  // Custom saved wallpapers state
  const [customWallpaperName, setCustomWallpaperName] = useState<string>("");
  const [customWallpaperUrlInput, setCustomWallpaperUrlInput] =
    useState<string>("");
  const [customWallpaperThumbnail, setCustomWallpaperThumbnail] =
    useState<string>("");
  const [customWallpaperType, setCustomWallpaperType] = useState<
    "image" | "video"
  >("video");
  const [wallpaperFilter, setWallpaperFilter] = useState<
    "all" | "video" | "image" | "gradient"
  >("all");
  const [isAddingWallpaper, setIsAddingWallpaper] = useState<boolean>(false);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  // Video Settings state
  const [videoDimmer, setVideoDimmer] = useState<number>(() => {
    const saved = localStorage.getItem("app_video_dimmer");
    return saved ? parseInt(saved, 10) : 15;
  });
  const [videoBlur, setVideoBlur] = useState<number>(() => {
    const saved = localStorage.getItem("app_video_blur");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [videoSpeed, setVideoSpeed] = useState<number>(() => {
    const saved = localStorage.getItem("app_video_speed");
    return saved ? parseFloat(saved) : 1.0;
  });
  
  // ABOUT PAGE LAYOUT STATE
  
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(() => {
    return localStorage.getItem("app_video_playing") !== "false";
  });

  const handleUpdateVideoSettings = (settings: {
    dimmer?: number;
    blur?: number;
    speed?: number;
    playing?: boolean;
  }) => {
    if (typeof settings.dimmer === "number") {
      setVideoDimmer(settings.dimmer);
      localStorage.setItem("app_video_dimmer", settings.dimmer.toString());
    }
    if (typeof settings.blur === "number") {
      setVideoBlur(settings.blur);
      localStorage.setItem("app_video_blur", settings.blur.toString());
    }
    if (typeof settings.speed === "number") {
      setVideoSpeed(settings.speed);
      localStorage.setItem("app_video_speed", settings.speed.toString());
    }
    if (typeof settings.playing === "boolean") {
      setIsVideoPlaying(settings.playing);
      localStorage.setItem("app_video_playing", settings.playing.toString());
    }
    window.dispatchEvent(
      new CustomEvent("videoSettingsChanged", { detail: settings }),
    );
  };

  const [savedCustomWallpapers, setSavedCustomWallpapers] = useState<
    WallpaperOption[]
  >(() => {
    try {
      const saved = localStorage.getItem("app_custom_wallpapers");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: "def-1",
        name: "Minimalist Bright Space",
        url: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
        previewUrl:
          "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
        type: "image",
      },
      {
        id: "def-2",
        name: "Geometric Mountain",
        url: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
        previewUrl:
          "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
        type: "image",
      },
    ];
  });

  const [deletedWallpaperIds, setDeletedWallpaperIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("app_deleted_wallpapers");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const handleDeleteWallpaperItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    playUiSound("click");

    const isCustom = savedCustomWallpapers.some((wp) => wp.id === id);
    if (isCustom) {
      const updatedCustom = savedCustomWallpapers.filter((wp) => wp.id !== id);
      setSavedCustomWallpapers(updatedCustom);
      try {
        localStorage.setItem("app_custom_wallpapers", JSON.stringify(updatedCustom));
      } catch {}
    }

    setDeletedWallpaperIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem("app_deleted_wallpapers", JSON.stringify(next));
      } catch {}
      return next;
    });

    if (selectedWallpaper === id) {
      handleWallpaperChange("light-mesh");
    }
  };

  const gradientPresets = [
    {
      id: "generative-waves",
      nameVi: "🎨 Sóng Màu Generative SVG",
      nameEn: "🎨 Generative Wave SVG",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      type: "css" as const,
      previewUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "aurora",
      nameVi: "Aurora Tím Huyền Áo",
      nameEn: "Aurora Purple Mesh",
      gradient: "from-violet-900 via-indigo-950 to-slate-950",
      type: "css" as const,
      previewUrl:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "twilight",
      nameVi: "Hoàng Hôn Sâu (Twilight)",
      nameEn: "Deep Twilight",
      gradient: "from-slate-950 via-purple-950 to-slate-900",
      type: "css" as const,
      previewUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "zen",
      nameVi: "Thiền Định Xanh (Zen)",
      nameEn: "Emerald Zen",
      gradient: "from-emerald-950 via-teal-950 to-slate-950",
      type: "css" as const,
      previewUrl:
        "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "gold",
      nameVi: "Lãnh Đạo Vàng (Executive Gold)",
      nameEn: "Executive Gold",
      gradient: "from-amber-950 via-stone-950 to-slate-950",
      type: "css" as const,
      previewUrl:
        "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const handleWallpaperChange = (
    id: string,
    customUrl?: string,
    customName?: string,
    type?: "image" | "video" | "css",
    previewUrl?: string,
  ) => {
    setSelectedWallpaper(id);
    localStorage.setItem("app_wallpaper", id);
    localStorage.setItem("app_selected_wallpaper", id);
    if (customUrl) {
      localStorage.setItem("app_custom_wallpaper_url", customUrl);
      if (customName) {
        localStorage.setItem("app_custom_wallpaper_name", customName);
      }
    }
    playUiSound("pageSwitch");
    window.dispatchEvent(
      new CustomEvent("wallpaperChanged", {
        detail: { id, customUrl, customName, type, previewUrl },
      }),
    );
  };

  const handleSaveCustomWallpaper = () => {
    if (!customWallpaperUrlInput.trim()) return;
    const isVideo =
      customWallpaperType === "video" ||
      customWallpaperUrlInput.endsWith(".mp4") ||
      customWallpaperUrlInput.endsWith(".webm") ||
      customWallpaperUrlInput.includes("dribbble.com/userupload") ||
      customWallpaperUrlInput.includes(".mp4");

    const newId = `custom-wp-${Date.now()}`;
    const newName =
      customWallpaperName.trim() ||
      (isVideo
        ? `Video Live ${savedCustomWallpapers.length + 1}`
        : `Hình nền ${savedCustomWallpapers.length + 1}`);

    const previewUrl = customWallpaperThumbnail.trim()
      ? customWallpaperThumbnail.trim()
      : isVideo
        ? "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80"
        : customWallpaperUrlInput.trim();

    const newEntry: WallpaperOption = {
      id: newId,
      name: newName,
      url: customWallpaperUrlInput.trim(),
      previewUrl: previewUrl,
      type: isVideo ? "video" : "image",
    };

    const updated = [newEntry, ...savedCustomWallpapers];
    setSavedCustomWallpapers(updated);
    localStorage.setItem("app_custom_wallpapers", JSON.stringify(updated));

    // Apply immediately
    handleWallpaperChange(
      newId,
      newEntry.url,
      newEntry.name,
      newEntry.type,
      newEntry.previewUrl,
    );

    // Reset inputs
    setCustomWallpaperName("");
    setCustomWallpaperUrlInput("");
    setCustomWallpaperThumbnail("");
  };

  const handleDeleteCustomWallpaper = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedCustomWallpapers.filter((wp) => wp.id !== id);
    setSavedCustomWallpapers(updated);
    localStorage.setItem("app_custom_wallpapers", JSON.stringify(updated));
    if (selectedWallpaper === id) {
      handleWallpaperChange("vid-wp-1");
    }
    playUiSound("click");
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDraggingCurl(true);
    playUiSound("pageSwitch");
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingCurl) return;
    const deltaX = Math.max(0, Math.min(180, e.clientX));
    const deltaY = Math.max(0, Math.min(180, e.clientY));
    setCurlDrag({ x: deltaX, y: deltaY });
    if (deltaX > 80 || deltaY > 80) {
      window.dispatchEvent(new CustomEvent("app-open-wallpaper-modal"));
      setIsDraggingCurl(false);
      setCurlDrag({ x: 0, y: 0 });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingCurl) {
      setIsDraggingCurl(false);
      setCurlDrag({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    // Fetch weather data for Ho Chi Minh City with fallback
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current_weather=true",
        );
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        if (data && data.current_weather) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            code: data.current_weather.weathercode,
            isDay: data.current_weather.is_day,
          });
          return;
        }
      } catch {
        // Fallback to default pleasant weather if network/API is unavailable
        setWeather({
          temp: 30,
          code: 0,
          isDay: 1,
        });
      }
    };

    fetchWeather();
    // Update every 30 mins
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getSmartWeatherAdvice = (code: number, temp: number, lang: string) => {
    if (lang === "vi") {
      if (code === 0)
        return temp > 32 ? "Nắng gắt • Cần che chắn" : "Nắng đẹp • Lý tưởng";
      if (code <= 3) return "Nhiều mây • Mát mẻ";
      if (code >= 51 && code <= 67) return "Trời mưa • Nên mang ô";
      if (code >= 80) return "Mưa rào • Chú ý di chuyển";
      return "Dễ chịu • Khí hậu tốt";
    } else {
      if (code === 0) return temp > 32 ? "Sunny & Hot" : "Clear Sky";
      if (code <= 3) return "Partly Cloudy";
      if (code >= 51) return "Rainy • Take Umbrella";
      return "Pleasant Weather";
    }
  };

  const [isWallpaperHidden, setIsWallpaperHidden] = useState<boolean>(() => {
    return localStorage.getItem("app_wallpaper_hidden") === "true";
  });

  useEffect(() => {
    const handleToggle = () => {
      setIsWallpaperHidden((prev) => !prev);
    };
    const handleSet = (e: Event) => {
      const custom = e as CustomEvent<{ hidden: boolean }>;
      if (custom.detail && typeof custom.detail.hidden === "boolean") {
        setIsWallpaperHidden(custom.detail.hidden);
      }
    };
    window.addEventListener("app-toggle-wallpaper-visibility", handleToggle);
    window.addEventListener(
      "app-set-wallpaper-hidden",
      handleSet as EventListener,
    );
    return () => {
      window.removeEventListener("app-toggle-wallpaper-visibility", handleToggle);
      window.removeEventListener(
        "app-set-wallpaper-hidden",
        handleSet as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    try {
      setIsGoogleStudio(window.self !== window.top);
    } catch {
      setIsGoogleStudio(true);
    }
  }, []);



  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleLanguage = () => {
    playUiSound("click");
    toggleLanguage();
  };

  const currentIndex = activePage ? pageSequence.indexOf(activePage) : 0;
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === pageSequence.length - 1;

  return (
    <>
      <motion.aside
        style={{ borderRadius: 0, boxShadow: "none" }}
        animate={{ width: isExpanded ? 200 : 100 }}
        className={cn(
          "!bg-transparent relative z-[90] hidden h-full flex-shrink-0 flex-col items-center overflow-visible rounded-none border-none px-2 py-4 !shadow-none shadow-none backdrop-blur-none transition-all duration-300 lg:flex",
          isExpanded ? "w-[200px] justify-between" : "w-[100px] justify-center gap-4",
        )}
      >
        {/* TOP SECTION: Thẻ Đồng Hồ & Thời Tiết Dạng Dọc (Vertical Clock & Weather Card) */}
        <div
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          className={cn(
            "flex w-full shrink-0 flex-col gap-1.5 px-1 py-1 text-center",
            isExpanded ? "items-end pr-4" : "items-center",
          )}
        >
          <div
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              borderRadius: 0,
              borderWidth: 0,
              borderStyle: "none",
              background: "transparent",
              backgroundColor: "transparent",
            }}
            className={cn(
              "group relative flex w-full flex-col space-y-2 rounded-2xl border-none bg-transparent p-3 shadow-none transition-all duration-300",
              isExpanded ? "items-end text-right" : "items-center text-center",
            )}
          >
            {/* 1. Giờ (Clock HH:MM) */}
            <div className="flex w-full flex-col items-center justify-center pt-0.5">
              <span className="flex items-center font-mono text-xl leading-none font-black tracking-wider sm:text-2xl">
                <span className="text-violet-600 dark:text-violet-400">
                  {time.getHours().toString().padStart(2, "0")}
                </span>
                <span className="mx-[1px] animate-pulse text-[var(--muted)]">
                  :
                </span>
                <span className="text-[var(--text-primary)]">
                  {time.getMinutes().toString().padStart(2, "0")}
                </span>
              </span>
            </div>

            {/* 2. Ngày (Day & Date) */}
            <div className="flex w-full flex-col items-center gap-0.5">
              <span className="text-xs font-extrabold text-[var(--text-primary)]">
                {time.getDay() === 0
                  ? "Chủ Nhật"
                  : [
                      "Chủ Nhật",
                      "Thứ Hai",
                      "Thứ Ba",
                      "Thứ Tư",
                      "Thứ Năm",
                      "Thứ Sáu",
                      "Thứ Bảy",
                    ][time.getDay()]}
              </span>
              <span className="font-sans text-[10px] font-bold text-[var(--muted)]">
                {time.toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="h-px w-4/5 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

            {/* 3. Icon thời tiết Glass, Nhiệt độ & Địa điểm (Font Google Play) */}
            <div
              className="group/weather relative z-[999] flex w-full cursor-pointer flex-col items-center gap-1 py-1 overflow-visible"
              style={{ fontFamily: "'Play', sans-serif" }}
            >
              {/* Icon thời tiết Glass - Nâng cấp phong cách Glassmorphism động */}
              <GlassAnimatedWeatherIcon
                code={weather?.code ?? 0}
                isDay={time.getHours() >= 6 && time.getHours() < 18}
                size={60}
              />

              {/* 4. Nhiệt độ - Font Google Play */}
              <div
                className="flex items-baseline gap-0.5"
                style={{ fontFamily: "'Play', sans-serif" }}
              >
                <span
                  className="text-2xl font-black tracking-tight text-[var(--text-primary)]"
                  style={{ fontFamily: "'Play', sans-serif" }}
                >
                  {weather ? weather.temp : 29}
                </span>
                <span
                  className="text-xs font-bold text-sky-600 dark:text-sky-400"
                  style={{ fontFamily: "'Play', sans-serif" }}
                >
                  °C
                </span>
              </div>

              {/* 5. Địa điểm dưới nhiệt độ */}
              <div
                className="mt-0.5 flex items-center justify-center gap-1 text-[11px] font-bold text-violet-600 dark:text-violet-300"
                style={{ fontFamily: "'Play', sans-serif" }}
              >
                <MapPin
                  size={11}
                  className="shrink-0 animate-bounce text-rose-500"
                />
                <span className="truncate">TP. Hồ Chí Minh</span>
              </div>

              {/* 6. Ghi chú thời tiết khi rê chuột vào (Hover Tooltip Note) */}
              <div className="pointer-events-none absolute top-full left-1/2 z-[9999] mt-2 w-48 -translate-x-1/2 translate-y-1 transform opacity-0 transition-all duration-300 group-hover/weather:pointer-events-auto group-hover/weather:translate-y-0 group-hover/weather:opacity-100">
                <div
                  className="relative space-y-2 rounded-2xl border border-sky-400/30 bg-[var(--glass-lg-bg)] p-3 text-center text-xs shadow-2xl backdrop-blur-xl"
                  style={{ fontFamily: "'Play', sans-serif" }}
                >
                  <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-sky-400/30 bg-[var(--glass-lg-bg)]" />

                  <div className="relative z-10 flex items-center justify-center gap-1.5 font-black text-sky-700 dark:text-sky-300">
                    <Sparkles
                      size={12}
                      className="shrink-0 animate-spin text-amber-500"
                    />
                    <span className="leading-tight">
                      {getSmartWeatherAdvice(
                        weather?.code ?? 0,
                        weather?.temp ?? 29,
                        language,
                      )}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center justify-center gap-1 border-t border-[var(--border)] pt-1.5 text-[10px] font-bold text-[var(--text-secondary)]">
                    <MapPin
                      size={10}
                      className="shrink-0 animate-bounce text-rose-500"
                    />
                    <span>TP. Hồ Chí Minh • Việt Nam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-0.5 hidden h-px w-10 bg-[var(--border)] md:block" />
        </div>

        {/* CENTER SECTION: Icons (Actions) */}
        <div
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          className={cn(
            "my-auto flex w-full justify-center gap-2.5 py-1 md:flex-col",
            isExpanded ? "items-stretch px-2 pr-4" : "items-center px-0",
          )}
        >
          {/* Download CV Button */}
          <motion.button
            id="print-pdf-btn"
            data-name="Nút tải CV dạng PDF (Download PDF CV Button)"
            onClick={() => {
              playUiSound("click");
              window.dispatchEvent(new CustomEvent("app-trigger-download"));
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "right-sidebar-item group relative flex h-10 cursor-pointer items-center rounded-xl transition-colors duration-200 hover:bg-[var(--shadow-color)]/5",
              isExpanded
                ? "w-full justify-end gap-2.5 px-3"
                : "mx-auto w-10 justify-center",
            )}
            title={language === "vi" ? "Tải CV PDF" : "Download PDF CV"}
          >
            {isExpanded && (
              <span className="truncate text-right text-[13px] font-black tracking-tight whitespace-nowrap text-violet-600 dark:text-violet-400">
                {language === "vi" ? "Tải CV" : "Download CV"}
              </span>
            )}
            <FileDown
              size={22}
              className="shrink-0 text-violet-600 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:text-violet-400"
            />
          </motion.button>

          {/* AI Assistant Button */}
          <motion.button
            id="ai-chat-btn"
            data-name="Nút trò chuyện với Trợ lý AI (AI Assistant Chat Button)"
            onClick={() => {
              playUiSound("click");
              if (onNavigate) onNavigate("aiChat");
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            data-active={activePage === "aiChat"}
            className={cn(
              "right-sidebar-item group relative flex h-10 cursor-pointer items-center rounded-xl transition-colors duration-200 hover:bg-[var(--shadow-color)]/5",
              isExpanded
                ? "w-full justify-end gap-2.5 px-3"
                : "mx-auto w-10 justify-center",
              activePage === "aiChat"
                ? "bg-[var(--glass-xs-bg)] text-purple-600 dark:text-purple-400"
                : "text-purple-600 dark:text-purple-400",
            )}
            title={language === "vi" ? "Trợ lý AI" : "AI Support"}
          >
            {isExpanded && (
              <span className="truncate text-right text-[13px] font-black tracking-tight whitespace-nowrap text-purple-600 dark:text-purple-400">
                {language === "vi" ? "Trợ lý AI" : "AI Support"}
              </span>
            )}
            <Bot
              size={22}
              className="shrink-0 text-purple-600 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:text-purple-400"
            />
            {activePage === "aiChat" && (
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 animate-ping rounded-full border-2 border-[var(--bg)] bg-emerald-400" />
            )}
          </motion.button>

          {/* Systems Button (Hệ thống) */}
          <motion.button
            id="systems-btn"
            data-name="Nút chuyển sang trang Kiến trúc & Hệ thống (Systems Button)"
            onClick={() => {
              playUiSound("pageSwitch");
              if (onNavigate) onNavigate("systems");
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            data-active={activePage === "systems"}
            className={cn(
              "right-sidebar-item group relative flex h-10 cursor-pointer items-center rounded-xl transition-colors duration-200 hover:bg-[var(--shadow-color)]/5",
              isExpanded
                ? "w-full justify-end gap-2.5 px-3"
                : "mx-auto w-10 justify-center",
              activePage === "systems"
                ? "bg-[var(--glass-xs-bg)] text-violet-600 dark:text-violet-400"
                : "text-violet-600 dark:text-violet-400",
            )}
            title={language === "vi" ? "Hệ thống" : "Systems"}
          >
            {isExpanded && (
              <span className="truncate text-right text-[13px] font-black tracking-tight whitespace-nowrap text-violet-600 dark:text-violet-400">
                {language === "vi" ? "Hệ thống" : "Systems"}
              </span>
            )}
            <Server
              size={22}
              className="shrink-0 text-violet-600 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:text-violet-400"
            />
            {activePage === "systems" && (
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 animate-ping rounded-full border-2 border-[var(--bg)] bg-emerald-400" />
            )}
          </motion.button>

          
          

          {/* Chat Zalo (0909097882) Button */}

          <motion.button
            id="chat-zalo-btn"
            data-name="Nút mở liên kết chat Zalo Nguyễn Hùng Thái (Zalo Chat Button)"
            onClick={() => {
              playUiSound("click");
              window.open("https://zalo.me/0909097882", "_blank");
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "right-sidebar-item group relative flex h-10 cursor-pointer items-center rounded-xl text-sky-500 transition-colors duration-200 hover:bg-[var(--shadow-color)]/5",
              isExpanded
                ? "w-full justify-end gap-2.5 px-3"
                : "mx-auto w-10 justify-center",
            )}
          >
            {isExpanded && (
              <span className="truncate text-right text-[13px] font-black tracking-tight whitespace-nowrap text-sky-500 dark:text-sky-400">
                Chat Zalo
              </span>
            )}
            <MessageCircle
              size={22}
              className="shrink-0 text-sky-500 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:text-sky-400"
            />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-[var(--bg)] bg-sky-500" />
          </motion.button>

          {/* Hide/Show Wallpaper Background Toggle Button */}
          <motion.button
            id="toggle-wallpaper-visibility-btn"
            data-name="Nút ẩn/hiện hình nền không làm mất lựa chọn (Toggle Wallpaper Visibility Button)"
            onClick={() => {
              playUiSound("toggle");
              window.dispatchEvent(
                new CustomEvent("app-toggle-wallpaper-visibility"),
              );
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "!hidden right-sidebar-item group relative h-10 cursor-pointer items-center rounded-xl transition-colors duration-200 hover:bg-[var(--shadow-color)]/5",
              isExpanded
                ? "w-full justify-end gap-2.5 px-3"
                : "mx-auto w-10 justify-center",
              isWallpaperHidden
                ? "text-slate-400 dark:text-slate-500"
                : "text-emerald-600 dark:text-emerald-400",
            )}
            title={
              language === "vi"
                ? isWallpaperHidden
                  ? "Hiện lại hình nền (Giữ nguyên lựa chọn)"
                  : "Ẩn hình nền (Chế độ Fluent đơn sắc)"
                : isWallpaperHidden
                  ? "Show Wallpaper (Keep selection)"
                  : "Hide Wallpaper (Fluent plain mode)"
            }
          >
            {isExpanded && (
              <span className="truncate text-right text-[13px] font-black tracking-tight whitespace-nowrap">
                {language === "vi"
                  ? isWallpaperHidden
                    ? "Hiện hình nền"
                    : "Ẩn hình nền"
                  : isWallpaperHidden
                    ? "Show Wall"
                    : "Hide Wall"}
              </span>
            )}
            {isWallpaperHidden ? (
              <EyeOff
                size={22}
                className="shrink-0 text-slate-400 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:text-slate-500"
              />
            ) : (
              <Eye
                size={22}
                className="shrink-0 text-emerald-600 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:text-emerald-400"
              />
            )}
          </motion.button>

          {/* Reset Theme Bookmarks Dialog Trigger Button */}
          <motion.button
            id="open-theme-reset-dialog-btn"
            data-name="Nút mở hộp thoại đặt lại giao diện đã lưu (Reset Theme Bookmarks Button)"
            onClick={() => {
              playUiSound("click");
              window.dispatchEvent(
                new CustomEvent("app-open-theme-reset-dialog"),
              );
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "!hidden right-sidebar-item group relative h-10 cursor-pointer items-center rounded-xl text-rose-500 transition-colors duration-200 hover:bg-[var(--shadow-color)]/5 dark:text-rose-400",
              isExpanded
                ? "w-full justify-end gap-2.5 px-3"
                : "mx-auto w-10 justify-center",
            )}
            title={
              language === "vi"
                ? "Đặt lại giao diện đã lưu"
                : "Reset Theme Bookmarks"
            }
          >
            {isExpanded && (
              <span className="truncate text-right text-[13px] font-black tracking-tight whitespace-nowrap text-rose-500 dark:text-rose-400">
                {language === "vi" ? "Reset Theme" : "Reset Theme"}
              </span>
            )}
            <RotateCcw
              size={22}
              className="shrink-0 text-rose-500 transition-transform group-hover:scale-110 group-hover:-rotate-45 dark:text-rose-400"
            />
          </motion.button>
        </div>

        {/* BOTTOM SECTION: Navigation */}
        {/* Page Navigation Buttons (Prev / Next / Scroll to Top) */}
        <div
          style={{
            paddingTop: 18,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          className={cn(
            "flex w-full items-center border-t border-[var(--border)] pt-2",
            isExpanded ? "flex-row justify-end pr-4 gap-3" : "flex-col justify-center gap-2.5",
          )}
        >
          {!isFirstPage && (
            <motion.button
              onClick={() => {
                playUiSound("pageSwitch");
                onPrev();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="right-sidebar-item group flex h-10 w-10 shrink-0 animate-[bounce_2s_infinite] cursor-pointer items-center justify-center rounded-full border-2 border-violet-500/80 bg-white/50 dark:bg-slate-900/50 text-violet-600 ring-2 ring-violet-500/30 backdrop-blur-md transition-all duration-300 hover:bg-violet-500/20 dark:border-violet-400/80 dark:text-violet-300 dark:hover:bg-violet-400/20"
              title={language === "vi" ? "Trang trước (Lùi)" : "Prev"}
            >
              <ChevronUp
                size={20}
                className="shrink-0 text-violet-600 transition-transform group-hover:-translate-y-0.5 dark:text-violet-300"
              />
            </motion.button>
          )}

          <motion.button
            onClick={() => {
              playUiSound("pageSwitch");
              onNext();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="right-sidebar-item group flex h-10 w-10 shrink-0 animate-[bounce_2s_infinite] cursor-pointer items-center justify-center rounded-full border-2 border-violet-500/80 bg-white/50 dark:bg-slate-900/50 text-violet-600 ring-2 ring-violet-500/30 backdrop-blur-md transition-all duration-300 hover:bg-violet-500/20 dark:border-violet-400/80 dark:text-violet-300 dark:hover:bg-violet-400/20"
            style={{ animationDelay: "0.4s" }}
            title={
              isLastPage
                ? language === "vi"
                  ? "Về đầu trang"
                  : "Scroll to top"
                : language === "vi"
                  ? "Trang sau (Tới)"
                  : "Next"
            }
          >
            {isLastPage ? (
              <ChevronsUp
                size={20}
                className="shrink-0 text-violet-600 transition-transform group-hover:-translate-y-0.5 dark:text-violet-300"
              />
            ) : (
              <ChevronDown
                size={20}
                className="shrink-0 text-violet-600 transition-transform group-hover:translate-y-0.5 dark:text-violet-300"
              />
            )}
          </motion.button>
        </div>

        {/* Toggle Collapse/Expand Button */}
        <div
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          className={cn(
            "flex w-full shrink-0 items-center border-t border-[var(--border)] px-0 pt-3",
            isExpanded ? "justify-end pr-4" : "justify-center",
          )}
        >
          <motion.button
            onClick={onToggleExpand}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "group flex cursor-pointer items-center rounded-lg border-0 bg-transparent p-2 text-[var(--muted)] shadow-none transition-colors hover:bg-[var(--shadow-color)]/5 hover:text-[var(--text-primary)]",
              isExpanded ? "justify-end" : "justify-center",
            )}
            title={
              isExpanded
                ? language === "vi"
                  ? "Thu gọn thanh menu"
                  : "Collapse Sidebar"
                : language === "vi"
                  ? "Mở rộng thanh menu"
                  : "Expand Sidebar"
            }
          >
            {isExpanded ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform group-hover:translate-x-0.5"
              >
                <line x1="20" y1="4" x2="20" y2="20" />
                <line x1="5" y1="12" x2="16" y2="12" />
                <polyline points="10 6 16 12 10 18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform group-hover:-translate-x-0.5"
              >
                <line x1="20" y1="4" x2="20" y2="20" />
                <line x1="16" y1="12" x2="5" y2="12" />
                <polyline points="10 6 4 12 10 18" />
              </svg>
            )}
          </motion.button>
        </div>
      </motion.aside>




      {/* Mobile & Tablet Floating Page Navigation Controls (< lg) */}
      <nav
        className="pointer-events-auto fixed right-5 bottom-5 z-[99999] flex flex-col gap-2.5 lg:hidden"
        aria-label="Mobile page navigation"
      >
        {!isFirstPage && (
          <motion.button
            onClick={() => {
              playUiSound("pageSwitch");
              onPrev();
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="group flex h-12 w-12 animate-[bounce_2s_infinite] cursor-pointer items-center justify-center rounded-full border-2 border-violet-500/80 bg-[var(--glass-xs-bg)] text-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.65),0_0_8px_rgba(168,85,247,0.4)] ring-2 ring-violet-500/40 backdrop-blur-xl transition-all dark:border-violet-400/80 dark:text-violet-300"
            title={language === "vi" ? "Trang trước (Lùi)" : "Previous Page"}
          >
            <ChevronUp
              size={24}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </motion.button>
        )}

        <motion.button
          onClick={() => {
            playUiSound("pageSwitch");
            onNext();
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          className="group flex h-12 w-12 animate-[bounce_2s_infinite] cursor-pointer items-center justify-center rounded-full border-2 border-violet-500/80 bg-[var(--glass-xs-bg)] text-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.65),0_0_8px_rgba(168,85,247,0.4)] ring-2 ring-violet-500/40 backdrop-blur-xl transition-all dark:border-violet-400/80 dark:text-violet-300"
          style={{ animationDelay: "0.4s" }}
          title={
            isLastPage
              ? language === "vi"
                ? "Về trang chủ"
                : "Return to top"
              : language === "vi"
                ? "Trang sau (Tới)"
                : "Next Page"
          }
        >
          {isLastPage ? (
            <ChevronsUp
              size={24}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          ) : (
            <ChevronDown
              size={24}
              className="transition-transform group-hover:translate-y-0.5"
            />
          )}
        </motion.button>
      </nav>
    </>
  );
}
