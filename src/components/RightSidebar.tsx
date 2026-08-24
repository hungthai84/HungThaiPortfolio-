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
MoreHorizontal,
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
  const isSnow = (code >= 71 && code <= 77) || code === 85 || code === 86;

  // Determine which of the 4 scenes to render
  let scene = 'cloudy'; // Default
  if (isRain) scene = 'rain';
  if (isThunder) scene = 'thunder';
  if (isSnow) scene = 'snow';

  return (
    <div
      className="group/weather-icon relative flex items-center justify-center select-none transition-all duration-300 group-hover/weather:scale-110"
      style={{ width: size, height: size }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 128 128" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible drop-shadow-xl"
      >
        <defs>
          {/* Frost Blur Filter for the glassmorphism bleed */}
          <filter id="frost" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>

          {/* Cloud Path: Perfect puffy cloud shape */}
          <path id="cloud-path" d="M 38,92 c -13.25,0 -24,-10.75 -24,-24 c 0,-12.92 10.22,-23.45 23,-23.95 c 4.18,-15.7 18.52,-27.05 35,-27.05 c 15.65,0 29.35,10.15 34.2,24.52 c 11.58,1.72 20.8,11.5 20.8,23.48 c 0,13.25 -10.75,24 -24,24 z" />
          
          {/* Cloud Clip Path (for masking the blurred objects and inner bevels) */}
          <clipPath id="cloud-clip">
            <use href="#cloud-path" />
          </clipPath>

          {/* Gradients matching the image exactly */}
          <linearGradient id="sun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE100" />
            <stop offset="100%" stopColor="#FF7B00" />
          </linearGradient>

          <linearGradient id="moon-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="blue-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>

          <linearGradient id="rain-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <g id="snowflake">
            <line x1="0" y1="-10" x2="0" y2="10" stroke="url(#blue-grad)" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" stroke="url(#blue-grad)" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" stroke="url(#blue-grad)" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </defs>

        <g transform="translate(0, 10)">
          
          {/* BACKGROUND OBJECTS (Crisp, behind the cloud) */}
          {scene === 'cloudy' && isDay && (
            <circle cx="86" cy="38" r="21" fill="url(#sun-grad)" className="animate-[pulse_4s_ease-in-out_infinite]" />
          )}
          {scene === 'cloudy' && !isDay && (
            <circle cx="86" cy="38" r="21" fill="url(#moon-grad)" className="animate-[pulse_4s_ease-in-out_infinite]" />
          )}
          
          {scene === 'rain' && (
            <g className="animate-[bounce_3s_ease-in-out_infinite]">
              <line x1="36" y1="85" x2="36" y2="100" stroke="url(#rain-grad)" strokeWidth="6" strokeLinecap="round" />
              <line x1="50" y1="92" x2="50" y2="115" stroke="url(#rain-grad)" strokeWidth="6" strokeLinecap="round" />
              <line x1="64" y1="82" x2="64" y2="108" stroke="url(#rain-grad)" strokeWidth="6" strokeLinecap="round" />
              <line x1="78" y1="95" x2="78" y2="110" stroke="url(#rain-grad)" strokeWidth="6" strokeLinecap="round" />
              <line x1="92" y1="85" x2="92" y2="100" stroke="url(#rain-grad)" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}

          {scene === 'thunder' && (
            <path 
              d="M 69,70 L 49,105 H 64 L 54,130 L 84,95 H 69 Z" 
              fill="url(#blue-grad)" 
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
            />
          )}

          {scene === 'snow' && (
            <g className="animate-[pulse_3s_ease-in-out_infinite]">
              <use href="#snowflake" transform="translate(56, 105) scale(0.9)" />
              <use href="#snowflake" transform="translate(80, 120) scale(0.7)" />
              <use href="#snowflake" transform="translate(95, 100) scale(0.5)" />
            </g>
          )}

          {/* CLOUD BASE */}
          {/* Soft white matte base */}
          <use href="#cloud-path" fill="#F8FAFC" opacity="0.95" />

          {/* FROSTED GLASS EFFECTS (Objects blurred inside the cloud for 3D translucency) */}
          <g clipPath="url(#cloud-clip)">
            
            {/* Cloudy sun/moon frosted bleed */}
            {scene === 'cloudy' && isDay && (
              <circle cx="86" cy="38" r="21" fill="url(#sun-grad)" filter="url(#frost)" opacity="0.85" />
            )}
            {scene === 'cloudy' && !isDay && (
              <circle cx="86" cy="38" r="21" fill="url(#moon-grad)" filter="url(#frost)" opacity="0.85" />
            )}

            {/* Rain/Thunder/Snow blue inner frosted glow */}
            {(scene === 'rain' || scene === 'thunder' || scene === 'snow') && (
              <circle cx="64" cy="75" r="32" fill="url(#blue-grad)" filter="url(#frost)" opacity="0.45" />
            )}

            {/* 3D BEVELS */}
            {/* Top inner highlight */}
            <use href="#cloud-path" fill="none" stroke="#FFFFFF" strokeWidth="12" transform="translate(0, 6)" opacity="0.9" />
            {/* Bottom inner shadow */}
            <use href="#cloud-path" fill="none" stroke="#94A3B8" strokeWidth="10" transform="translate(0, -5)" opacity="0.2" />
            {/* Overall soft inner volumetric shadow */}
            <use href="#cloud-path" fill="none" stroke="#CBD5E1" strokeWidth="20" filter="url(#frost)" opacity="0.3" transform="translate(0, -6)" />
          </g>
          
        </g>
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
    details?: {
      maxTemp: number;
      minTemp: number;
      precipProb: number;
      uvIndex: number;
      windSpeed: number;
      humidity: number;
    };
  } | null>(null);
  const [showWeatherModal, setShowWeatherModal] = useState(false);

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
          "https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current=temperature_2m,relative_humidity_2m,weather_code,is_day,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=Asia%2FHo_Chi_Minh",
        );
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        if (data && data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
            isDay: data.current.is_day,
            details: data.daily ? {
              maxTemp: Math.round(data.daily.temperature_2m_max[0]),
              minTemp: Math.round(data.daily.temperature_2m_min[0]),
              precipProb: data.daily.precipitation_probability_max[0],
              uvIndex: data.daily.uv_index_max[0],
              windSpeed: Math.round(data.current.wind_speed_10m),
              humidity: data.current.relative_humidity_2m,
            } : undefined,
          });
          return;
        }
      } catch (e) {
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

    const getWeatherColorClass = (code: number, isDay: number) => {
    if (code === 0 || code === 1) return isDay ? "text-amber-500" : "text-amber-400";
    if (code === 2 || code === 3) return "text-sky-500";
    if (code >= 51 && code <= 67) return "text-blue-500";
    if (code >= 71 && code <= 77) return "text-sky-300";
    if (code >= 80) return "text-indigo-500";
    return "text-slate-700 dark:text-slate-200";
  };

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

            {/* 3. New Vertical Weather Card Replacement */}
            <div
              className={cn(
                "duration-300 font-mono text-white group cursor-pointer relative overflow-hidden bg-[#DCDFE4] dark:bg-[#22272B] rounded-[10px] p-[5px] m-[5px] h-[90px] w-auto hover:bg-blue-200 hover:dark:bg-[#0C66E4] flex flex-col items-center justify-center transition-all shadow-lg border-0",
              )}
              onClick={() => setShowWeatherModal(true)}
            >
              <h3 className="text-lg text-center font-black mb-1 text-slate-800 dark:text-white">Today</h3>
              <div className="gap-2 relative flex flex-col items-center">
                <svg
                  viewBox="0 0 64 64"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn("transition-all duration-300", isExpanded ? "w-20" : "w-16")}
                >
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      y2="28.33"
                      y1="19.67"
                      x2="21.5"
                      x1="16.5"
                      id="weather_b"
                    >
                      <stop stopColor="#fbbf24" offset="0"></stop>
                      <stop stopColor="#fbbf24" offset=".45"></stop>
                      <stop stopColor="#f59e0b" offset="1"></stop>
                    </linearGradient>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      y2="50.8"
                      y1="21.96"
                      x2="39.2"
                      x1="22.56"
                      id="weather_c"
                    >
                      <stop stopColor="#f3f7fe" offset="0"></stop>
                      <stop stopColor="#f3f7fe" offset=".45"></stop>
                      <stop stopColor="#deeafb" offset="1"></stop>
                    </linearGradient>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      y2="48.05"
                      y1="42.95"
                      x2="25.47"
                      x1="22.53"
                      id="weather_a"
                    >
                      <stop stopColor="#4286ee" offset="0"></stop>
                      <stop stopColor="#4286ee" offset=".45"></stop>
                      <stop stopColor="#0950bc" offset="1"></stop>
                    </linearGradient>
                    <linearGradient
                      xlinkHref="#weather_a"
                      y2="48.05"
                      y1="42.95"
                      x2="32.47"
                      x1="29.53"
                      id="weather_d"
                    ></linearGradient>
                    <linearGradient
                      xlinkHref="#weather_a"
                      y2="48.05"
                      y1="42.95"
                      x2="39.47"
                      x1="36.53"
                      id="weather_e"
                    ></linearGradient>
                  </defs>
                  <circle
                    strokeWidth=".5"
                    strokeMiterlimit="10"
                    stroke="#f8af18"
                    fill="url(#weather_b)"
                    r="5"
                    cy="24"
                    cx="19"
                  ></circle>
                  <path
                    d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    stroke="#fbbf24"
                    fill="none"
                  >
                    <animateTransform
                      values="0 19 24; 360 19 24"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="45s"
                      attributeName="transform"
                    ></animateTransform>
                  </path>
                  <path
                    d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"
                    strokeWidth=".5"
                    strokeMiterlimit="10"
                    stroke="#e6effc"
                    fill="url(#weather_c)"
                  ></path>
                  <path
                    d="M24.39 43.03l-.78 4.94"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    stroke="url(#weather_a)"
                    fill="none"
                  >
                    <animateTransform
                      values="1 -5; -2 10"
                      type="translate"
                      repeatCount="indefinite"
                      dur="0.7s"
                      attributeName="transform"
                    ></animateTransform>
                  </path>
                  <path
                    d="M31.39 43.03l-.78 4.94"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    stroke="url(#weather_d)"
                    fill="none"
                  >
                    <animateTransform
                      values="1 -5; -2 10"
                      type="translate"
                      repeatCount="indefinite"
                      dur="0.7s"
                      begin="-0.4s"
                      attributeName="transform"
                    ></animateTransform>
                  </path>
                  <path
                    d="M38.39 43.03l-.78 4.94"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    stroke="url(#weather_e)"
                    fill="none"
                  >
                    <animateTransform
                      values="1 -5; -2 10"
                      type="translate"
                      repeatCount="indefinite"
                      dur="0.7s"
                      begin="-0.2s"
                      attributeName="transform"
                    ></animateTransform>
                  </path>
                </svg>
                <h4
                  className={cn(
                    "font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-center group-hover:translate-x-8 group-hover:-translate-y-12 group-hover:scale-125 font-black text-slate-800 dark:text-white",
                    isExpanded ? "text-4xl" : "text-2xl"
                  )}
                >
                  {weather ? weather.temp : 29}°
                </h4>
              </div>
              <div className="hidden absolute duration-300 -left-40 mt-2 group-hover:left-4 transition-all opacity-0 group-hover:opacity-100 flex flex-col items-start px-2">
                <p className="text-[10px] font-bold text-slate-800 dark:text-white leading-tight">
                  {getSmartWeatherAdvice(
                    weather?.code ?? 0,
                    weather?.temp ?? 29,
                    language,
                  )}
                </p>
                <p className="text-[9px] opacity-70 text-slate-700 dark:text-slate-200">50% humidity</p>
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

          {/* Trang Phong Cách (Style Showcase) Button */}
          <motion.button
            id="template-test-btn"
            data-name="Nút mở Trang Phong Cách (Style Showcase Button)"
            onClick={() => {
              playUiSound("click");
              if (onNavigate) onNavigate("templateTest");
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            data-active={activePage === "templateTest"}
            className={cn(
              "right-sidebar-item group relative flex h-10 cursor-pointer items-center rounded-xl transition-colors duration-200 hover:bg-[var(--shadow-color)]/5",
              isExpanded
                ? "w-full justify-end gap-2.5 px-3"
                : "mx-auto w-10 justify-center",
              activePage === "templateTest"
                ? "bg-[var(--glass-xs-bg)] text-fuchsia-600 dark:text-fuchsia-400"
                : "text-fuchsia-600 dark:text-fuchsia-400",
            )}
            title={language === "vi" ? "Trang Phong Cách" : "Style Showcase"}
          >
            {isExpanded && (
              <span className="truncate text-right text-[13px] font-black tracking-tight whitespace-nowrap text-fuchsia-600 dark:text-fuchsia-400">
                {language === "vi" ? "Trang Phong Cách" : "Style Showcase"}
              </span>
            )}
            <Sparkles
              size={22}
              className="shrink-0 text-fuchsia-600 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:text-fuchsia-400"
            />
            {activePage === "templateTest" && (
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 animate-ping rounded-full border-2 border-[var(--bg)] bg-fuchsia-400" />
            )}
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
            <MoreHorizontal size={20} className="shrink-0 transition-transform group-hover:scale-110" />
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

      <AnimatePresence>
        {showWeatherModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowWeatherModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-slate-900/80 p-6 text-white shadow-2xl backdrop-blur-xl"
              style={{ fontFamily: "'Play', sans-serif" }}
            >
              <button
                onClick={() => setShowWeatherModal(false)}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="flex flex-col items-center gap-2">
                <GlassAnimatedWeatherIcon code={weather?.code || 0} isDay={weather?.isDay === 1} size={80} />
                <h3 className="text-xl font-bold tracking-tight text-slate-100">TP. Hồ Chí Minh</h3>
                <div className={`text-5xl font-black ${getWeatherColorClass(weather?.code || 0, weather?.isDay ?? 1)}`}>
                  {weather?.temp || 29}°C
                </div>
                <p className="text-sm font-medium text-slate-300">
                  {getSmartWeatherAdvice(weather?.code || 0, weather?.temp || 29, language)}
                </p>
              </div>

              {weather?.details && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center rounded-2xl bg-white/5 p-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Cao nhất / Thấp nhất</span>
                    <span className="mt-1 text-base font-bold text-slate-200">
                      {weather.details.maxTemp}° / {weather.details.minTemp}°
                    </span>
                  </div>
                  <div className="flex flex-col items-center rounded-2xl bg-white/5 p-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Khả năng mưa</span>
                    <span className="mt-1 text-base font-bold text-sky-400">
                      {weather.details.precipProb}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center rounded-2xl bg-white/5 p-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Gió</span>
                    <span className="mt-1 text-base font-bold text-slate-200">
                      {weather.details.windSpeed} km/h
                    </span>
                  </div>
                  <div className="flex flex-col items-center rounded-2xl bg-white/5 p-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Độ ẩm</span>
                    <span className="mt-1 text-base font-bold text-slate-200">
                      {weather.details.humidity}%
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

