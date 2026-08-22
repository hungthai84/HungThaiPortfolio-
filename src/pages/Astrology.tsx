import React, { useState, useRef } from "react";
import {
  Compass,
  Sparkles,
  User,
  Check,
  X,
  Layers,
  Briefcase,
  Lightbulb,
  Quote,
  Star,
  CheckCircle2,
  Users,
  Award,
  Activity,
  TrendingUp,
  XCircle,
  ChevronRight,
  ChevronDown,
  Flame,
  Crown,
  Zap,
  Play,
  Pause,
  Clock,
  Target,
  Rocket,
  Settings,
  Eye,
  Workflow,
  PieChart,
  ShieldCheck,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from "recharts";
import { useLanguage } from "../context/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { AudioPlayer } from "../components/AudioPlayer";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

const ASTROLOGY_RADAR_DATA_VI = [
  { subject: "Kỷ Luật & SOP", A: 95, fullMark: 100, color: "#f59e0b" },
  { subject: "Tầm Nhìn Chiến Lược", A: 90, fullMark: 100, color: "#8b5cf6" },
  { subject: "Năng Lực Khai Phá", A: 85, fullMark: 100, color: "#ec4899" },
  { subject: "Thực Thi & Vận Hành", A: 98, fullMark: 100, color: "#10b981" },
  { subject: "Quản Trị Nhân Sự", A: 92, fullMark: 100, color: "#3b82f6" },
  { subject: "Quản Trị Rủi Ro", A: 88, fullMark: 100, color: "#f43f5e" },
];

const ASTROLOGY_RADAR_DATA_EN = [
  { subject: "Discipline & SOP", A: 95, fullMark: 100, color: "#f59e0b" },
  { subject: "Strategic Vision", A: 90, fullMark: 100, color: "#8b5cf6" },
  { subject: "Innovation Ability", A: 85, fullMark: 100, color: "#ec4899" },
  { subject: "Execution & Ops", A: 98, fullMark: 100, color: "#10b981" },
  { subject: "HR & Team Mgmt", A: 92, fullMark: 100, color: "#3b82f6" },
  { subject: "Risk Governance", A: 88, fullMark: 100, color: "#f43f5e" },
];

const ZODIAC_GROUPS = [
  {
    badgeTextVi: "Hiệu suất Tối đa",
    badgeTextEn: "Top Efficiency",
    mainTitleVi: "Nhóm Hợp Nhất",
    subLineVi: "Tam Hợp & Lục Hợp",
    titleEn: "Optimal Synergistic Alliance",
    subLineEn: "San He & Liu He",
    subtitleVi: "Phối hợp ăn ý nhất trong triển khai & bứt phá",
    subtitleEn: "Highest execution efficiency and trust",
    color: "#10b981",
    bgIconName: "Users",
    summaryVi:
      "✦ Đội ngũ nòng cốt mang lại hiệu suất tối đa & độ tin cậy tuyệt đối.",
    summaryEn: "✦ Core strike team delivering maximum speed & execution trust.",
    items: [
      {
        ageVi: "Thân (1980, 1992)",
        ageEn: "Monkey (1980, 1992)",
        traitVi: "Giỏi triển khai, thực thi cực nhanh",
        traitEn: "Rapid execution & high agility",
        isBest: true,
        icon: "https://api.iconify.design/noto:monkey.svg",
      },
      {
        ageVi: "Thìn (1976, 1988)",
        ageEn: "Dragon (1976, 1988)",
        traitVi: "Có tầm nhìn, giữ vững chiến lược",
        traitEn: "Visionary & strategic anchor",
        icon: "https://api.iconify.design/noto:dragon.svg",
      },
      {
        ageVi: "Dậu (1981, 1993)",
        ageEn: "Rooster (1981, 1993)",
        traitVi: "Chi tiết, kỷ luật, tỉ mỉ tuyệt đối",
        traitEn: "Detail-oriented & strict discipline",
        icon: "https://api.iconify.design/noto:rooster.svg",
      },
    ],
  },
  {
    badgeTextVi: "Phối hợp Chuẩn hóa",
    badgeTextEn: "Standardized Fit",
    mainTitleVi: "Nhóm Bổ Trợ",
    subLineVi: "Quy Trình Rõ Ràng",
    titleEn: "Complementary Execution Group",
    subLineEn: "Standard Operating Procedures",
    subtitleVi: "Bổ trợ tốt khi có KPI & SLA minh bạch",
    subtitleEn: "High output under clear KPIs & SLAs",
    color: "#0284c7",
    bgIconName: "Workflow",
    summaryVi: "✦ Cần giao việc theo đúng KPI, SLA & hướng dẫn cụ thể.",
    summaryEn: "✦ Task allocation requires transparent KPIs and clear SLAs.",
    items: [
      {
        ageVi: "Sửu (1985, 1997)",
        ageEn: "Ox (1985, 1997)",
        traitVi: "Bền bỉ, cần deadline rõ ràng",
        traitEn: "Resilient, deadline-driven",
        icon: "https://api.iconify.design/noto:ox.svg",
      },
      {
        ageVi: "Tỵ (1977, 1989)",
        ageEn: "Snake (1977, 1989)",
        traitVi: "Thông minh, cần sự minh bạch",
        traitEn: "Sharp intellect, demands clarity",
        icon: "https://api.iconify.design/noto:snake.svg",
      },
      {
        ageVi: "Hợi (1983, 1995)",
        ageEn: "Pig (1983, 1995)",
        traitVi: "Chịu khó, cần người dẫn dắt",
        traitEn: "Hardworking with guidance",
        icon: "https://api.iconify.design/noto:pig.svg",
      },
    ],
  },
  {
    badgeTextVi: "Cần Thống Nhất",
    badgeTextEn: "Alignment Needed",
    mainTitleVi: "Nhóm Quản Trị Đặc Biệt",
    subLineVi: "Thống Nhất & Dung Hòa",
    titleEn: "Adaptive Management Group",
    subLineEn: "Unified Alignment",
    subtitleVi: "Khác biệt phong cách, cần dung hòa quy chuẩn",
    subtitleEn: "Diverse styles requiring alignment",
    color: "#f59e0b",
    bgIconName: "Target",
    summaryVi:
      "✦ Cần thống nhất quan điểm và tiếng nói chung trước khi vận hành.",
    summaryEn: "✦ Align expectations and core ground rules prior to launching.",
    items: [
      {
        ageVi: "Ngọ (1978, 1990)",
        ageEn: "Horse (1978, 1990)",
        traitVi: "Tốc độ nhanh, dễ lệch nhịp",
        traitEn: "Fast-paced, needs rhythm calibration",
        icon: "https://api.iconify.design/noto:horse.svg",
      },
      {
        ageVi: "Mão (1975, 1987)",
        ageEn: "Rabbit (1975, 1987)",
        traitVi: "Cảm xúc cao, cần lắng nghe",
        traitEn: "High EQ, requires empathetic listening",
        icon: "https://api.iconify.design/noto:rabbit.svg",
      },
      {
        ageVi: "Tý (Đồng tuổi 1984)",
        ageEn: "Rat (1984 Peer)",
        traitVi: "Đồng góc nhìn nhưng dễ trùng vai",
        traitEn: "Shared mindset, align clear scopes",
        icon: "https://api.iconify.design/noto:rat.svg",
      },
    ],
  },
];

const ZODIAC_NAMES = [
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
];

interface AstrologyLeadershipRadarProps {
  data: Array<{
    subject: string;
    A: number;
    fullMark: number;
    color: string;
  }>;
  hoveredIndex: number | null;
  onHoverIndex: (idx: number | null) => void;
  isVi: boolean;
}

function AstrologyLeadershipRadar({
  data,
  hoveredIndex,
  onHoverIndex,
  isVi,
}: AstrologyLeadershipRadarProps) {
  const cx = 220;
  const cy = 165;
  const R = 100;
  const levels = [20, 40, 60, 80, 100];
  const numAxes = data.length; // 6

  // Calculate polygon vertex points for each level
  const getLevelPoints = (lvl: number) => {
    return data
      .map((_, i) => {
        const angleDeg = -90 + i * (360 / numAxes);
        const rad = (angleDeg * Math.PI) / 180;
        const x = cx + R * (lvl / 100) * Math.cos(rad);
        const y = cy + R * (lvl / 100) * Math.sin(rad);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  // Calculate data polygon points
  const dataPoints = data.map((item, i) => {
    const angleDeg = -90 + i * (360 / numAxes);
    const rad = (angleDeg * Math.PI) / 180;
    const r = R * (item.A / 100);
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    return { x, y, item, i, angleDeg };
  });

  const polygonPointsString = dataPoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const avgScore = (
    data.reduce((sum, item) => sum + item.A, 0) / data.length
  ).toFixed(1);

  const activeItem = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <svg
        viewBox="0 0 440 330"
        className="h-auto w-full max-w-[420px] select-none overflow-visible"
      >
        <defs>
          <linearGradient id="astroCustomRadarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.45" />
          </linearGradient>
          <filter
            id="astroRadarGlowFilter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="5"
              floodColor="#f59e0b"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        {/* 1. Concentric Background Polygons */}
        {levels.map((lvl) => (
          <g key={lvl}>
            <polygon
              points={getLevelPoints(lvl)}
              fill={lvl === 100 ? "var(--surface)" : "none"}
              fillOpacity={lvl === 100 ? 0.35 : 0}
              stroke="currentColor"
              className="text-amber-500/30 dark:text-amber-400/20"
              strokeWidth={lvl === 100 ? 1.5 : 1}
              strokeDasharray={lvl === 100 ? "none" : "3 3"}
              opacity={lvl === 100 ? 0.9 : 0.6}
            />
            <text
              x={cx}
              y={cy - R * (lvl / 100) + 3}
              textAnchor="middle"
              className="text-[9px] font-bold fill-[var(--muted)] opacity-60"
            >
              {lvl}%
            </text>
          </g>
        ))}

        {/* 2. Spoke Lines from Center to Vertices */}
        {data.map((item, i) => {
          const angleDeg = -90 + i * (360 / numAxes);
          const rad = (angleDeg * Math.PI) / 180;
          const x2 = cx + R * Math.cos(rad);
          const y2 = cy + R * Math.sin(rad);
          const isHovered = hoveredIndex === i;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke={isHovered ? item.color : "currentColor"}
              className={
                isHovered ? "" : "text-amber-500/30 dark:text-amber-400/20"
              }
              strokeWidth={isHovered ? 2 : 1}
              strokeOpacity={isHovered ? 1 : 0.7}
            />
          );
        })}

        {/* 3. Filled Dynamic Radar Polygon */}
        <polygon
          points={polygonPointsString}
          fill="url(#astroCustomRadarGrad)"
          stroke="#f59e0b"
          strokeWidth={2.5}
          filter="url(#astroRadarGlowFilter)"
          className="transition-all duration-500"
        />

        {/* 4. Interactive Vertex Dots & Rings */}
        {dataPoints.map((pt) => {
          const isHovered = hoveredIndex === pt.i;
          return (
            <g
              key={pt.i}
              className="cursor-pointer"
              onMouseEnter={() => onHoverIndex(pt.i)}
              onMouseLeave={() => onHoverIndex(null)}
            >
              {isHovered && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={13}
                  fill={pt.item.color}
                  fillOpacity={0.25}
                  className="animate-pulse"
                />
              )}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 4}
                fill={pt.item.color}
                stroke="#ffffff"
                strokeWidth={2}
                className="transition-all duration-200"
              />
            </g>
          );
        })}

        {/* 5. Center Score Badge */}
        <circle
          cx={cx}
          cy={cy}
          r={20}
          fill="var(--card)"
          stroke="#f59e0b"
          strokeWidth={1.5}
          className="shadow-sm"
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[7.5px] font-black uppercase fill-[var(--muted)]"
        >
          {isVi ? "ĐIỂM TB" : "AVG"}
        </text>
        <text
          x={cx}
          y={cy + 7}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[10.5px] font-black fill-amber-600 dark:fill-amber-400"
        >
          {avgScore}%
        </text>

        {/* 6. Spoke Labels (Name + Score Tag) */}
        {data.map((item, i) => {
          const angleDeg = -90 + i * (360 / numAxes);
          const rad = (angleDeg * Math.PI) / 180;
          const labelDist = R + 24;
          const lx = cx + labelDist * Math.cos(rad);
          const ly = cy + labelDist * Math.sin(rad);

          let textAnchor: "middle" | "start" | "end" = "middle";
          let offsetX = 0;
          let offsetY = 0;

          if (i === 0) {
            textAnchor = "middle";
            offsetY = -10;
          } else if (i === 1) {
            textAnchor = "start";
            offsetX = 6;
            offsetY = -4;
          } else if (i === 2) {
            textAnchor = "start";
            offsetX = 6;
            offsetY = 10;
          } else if (i === 3) {
            textAnchor = "middle";
            offsetY = 14;
          } else if (i === 4) {
            textAnchor = "end";
            offsetX = -6;
            offsetY = 10;
          } else if (i === 5) {
            textAnchor = "end";
            offsetX = -6;
            offsetY = -4;
          }

          const isHovered = hoveredIndex === i;

          return (
            <g
              key={i}
              transform={`translate(${lx + offsetX}, ${ly + offsetY})`}
              className="cursor-pointer"
              onMouseEnter={() => onHoverIndex(i)}
              onMouseLeave={() => onHoverIndex(null)}
            >
              <text
                x={0}
                y={-6}
                textAnchor={textAnchor}
                dominantBaseline="central"
                className={cn(
                  "text-[10.5px] font-extrabold transition-colors duration-200",
                  isHovered
                    ? "fill-amber-600 dark:fill-amber-400"
                    : "fill-[var(--text-primary)]",
                )}
              >
                {item.subject}
              </text>
              <text
                x={0}
                y={7}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fill={item.color}
                className="text-[9.5px] font-black"
              >
                {item.A}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating active metric badge */}
      {activeItem && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-[var(--card)] px-3 py-1 text-xs font-black shadow-md backdrop-blur-md"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: activeItem.color }}
          />
          <span className="text-[var(--text-primary)]">
            {activeItem.subject}
          </span>
          <span
            className="rounded px-1.5 py-0.5 text-[10px]"
            style={{
              backgroundColor: `${activeItem.color}20`,
              color: activeItem.color,
            }}
          >
            {activeItem.A}%
          </span>
        </motion.div>
      )}
    </div>
  );
}

export function Astrology() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showAstroVideoPopup, setShowAstroVideoPopup] = useState(false);
  const [birthYear, setBirthYear] = useState<string>("");
  const [checkResult, setCheckResult] = useState<number | null>(null);
  const [hoveredAstroIndex, setHoveredAstroIndex] = useState<number | null>(
    null,
  );

  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Circular video player state
  const astroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isAstroVideoPlaying, setIsAstroVideoPlaying] = useState(true);
  const [isAstroVideoMuted, setIsAstroVideoMuted] = useState(true);

  const toggleAstroVideoPlay = () => {
    if (!astroVideoRef.current) return;
    if (astroVideoRef.current.paused) {
      astroVideoRef.current.play();
      setIsAstroVideoPlaying(true);
    } else {
      astroVideoRef.current.pause();
      setIsAstroVideoPlaying(false);
    }
  };

  const toggleAstroVideoMute = () => {
    if (!astroVideoRef.current) return;
    astroVideoRef.current.muted = !astroVideoRef.current.muted;
    setIsAstroVideoMuted(astroVideoRef.current.muted);
  };

  const toggleInlineAudio = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => {});
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleCheckCompatibility = () => {
    if (!birthYear || birthYear.length !== 4) {
      setCheckResult(-1);
      return;
    }
    const year = parseInt(birthYear);
    if (isNaN(year)) {
      setCheckResult(-1);
      return;
    }
    const index = year % 12;
    setCheckResult(index);
  };

  const radarData = isVi ? ASTROLOGY_RADAR_DATA_VI : ASTROLOGY_RADAR_DATA_EN;

  const renderAstroAngleAxisTick = (props: any) => {
    const { x, y, payload, cx, cy } = props;
    if (!payload || !payload.value) return null;

    const item = radarData.find((d) => d.subject === payload.value);
    const score = item ? item.A : "";
    const color = item ? item.color : "#f59e0b";

    const dx = (x || 0) - (cx || 0);
    const dy = (y || 0) - (cy || 0);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const offset = 12;
    const nx = distance > 0 ? dx / distance : 0;
    const ny = distance > 0 ? dy / distance : 0;

    const finalX =
      isNaN(nx) || isNaN(ny) || distance === 0
        ? x || 0
        : (x || 0) + nx * offset;
    const finalY =
      isNaN(nx) || isNaN(ny) || distance === 0
        ? y || 0
        : (y || 0) + ny * offset;

    const anchor = Math.abs(dx) < 15 ? "middle" : dx > 0 ? "start" : "end";

    return (
      <g transform={`translate(${finalX},${finalY})`}>
        <text
          x={0}
          y={-6}
          textAnchor={anchor}
          dominantBaseline="central"
          fill="var(--text-primary)"
          className="text-[10px] font-black sm:text-[11px]"
        >
          {payload.value}
        </text>
        <text
          x={0}
          y={8}
          textAnchor={anchor}
          dominantBaseline="central"
          fill={color}
          className="text-[9px] font-black sm:text-[10px]"
        >
          {score}%
        </text>
      </g>
    );
  };

  return (
    <PageLayout
      id="astrology-main-card"
      rootClassName="w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border border-[var(--border)] relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="astrology"
      pageName="Astrology Main Card"
      titleClassName="text-amber-600 dark:text-amber-400 font-black"
      title={
        isVi
          ? "Luận Giải Tử Vi & Phong Cách Lãnh Đạo Mệnh Lý"
          : "Astrological Profile & Leadership Archetype Matrix"
      }
      subtitle={
        isVi
          ? "Luận giải phong cách lãnh đạo qua góc nhìn mệnh lý khoa học Giáp Tý 1984."
          : "Leadership style interpretation through astrological analysis based on 1984 Rat."
      }
      icon={Compass}
      background={
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30 dark:opacity-40">
          {/* Glowing colorful nebula blobs */}
          <div className="absolute -top-[10%] -left-[10%] h-[300px] w-[300px] rounded-full bg-amber-500/15 blur-[80px]" />
          <div className="absolute top-[40%] right-[5%] h-[350px] w-[350px] rounded-full bg-purple-500/15 blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] h-[250px] w-[250px] rounded-full bg-sky-500/15 blur-[70px]" />
          {/* Subtle starry grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        </div>
      }
      headerActions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-black text-amber-700 dark:text-amber-300 shadow-xs backdrop-blur-md">
            <Crown size={13} className="text-amber-500" />
            <span>
              {isVi ? "Giáp Tý 1984 · Hải Trung Kim" : "1984 Wood Rat · Gold"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-black text-indigo-700 dark:text-indigo-300 shadow-xs backdrop-blur-md">
            <Sparkles size={13} className="text-indigo-500" />
            <span>
              {isVi ? "Phủ Tướng Triều Viên" : "Strategic Archetype"}
            </span>
          </div>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6">
        {/* Floating Yin Yang Audio Player (Circular Popup - PRESERVED) */}
        <AudioPlayer
          audioUrl="https://cdn.scena.ai/project/9626/b40b848d5a2ad108760073e8c64bd80f963850ab7e79c19af228c82a83f6419d.mp3"
          hintTextVi="Bấm vào để nghe luận giải tử vi của anh Thái!"
          hintTextEn="Click to play the audio horoscope interpretation!"
        />

        {/* ========================================================================= */}
        {/* BENTO GRID LAYOUT: HERO FEATURE (2x2 HERO & WIDGETS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 2x2 HERO FEATURE: LÁ SỐ MỆNH LÝ LÃNH ĐẠO */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl backdrop-blur-2xl bg-white/15 dark:bg-slate-900/40 border border-amber-500/30 p-6 flex flex-col justify-between space-y-4 shadow-lg"
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-amber-600 dark:text-amber-400">
                    <Crown size={20} />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                      01 · Hero Module
                    </span>
                    <h3 className="text-sm font-extrabold tracking-wider text-[var(--text-primary)] capitalize sm:text-base mt-1">
                      {isVi
                        ? "Lá Số Mệnh Lý Lãnh Đạo"
                        : "Astrological Core Profile"}
                    </h3>
                    <p className="text-[11px] font-semibold text-[var(--muted)]">
                      {isVi
                        ? "Phủ Tướng Triều Viên · Giáp Tý 1984"
                        : "Phu Tuong Trieu Vien · Wood Rat 1984"}
                    </p>
                  </div>
                </div>

                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-amber-600 capitalize shadow-2xs dark:text-amber-400">
                  <Flame size={12} className="animate-pulse text-amber-500" />
                  <span>{isVi ? "Dương Nam" : "Yang Male"}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {/* Họ & Tên */}
                <div className="group/card relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-transparent to-amber-600/5 p-4 transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] sm:p-5 dark:border-amber-500/20">
                  <div className="absolute right-2 bottom-2 text-amber-500/10 transition-transform duration-500 group-hover/card:scale-110">
                    <Crown size={72} />
                  </div>
                  <div className="relative z-10">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-amber-600 capitalize sm:text-xs dark:text-amber-400">
                      <User size={12} className="text-amber-500" />
                      {isVi ? "Họ & Tên" : "Full Name"}
                    </span>
                    <p className="mt-2 truncate text-sm font-extrabold text-[var(--text-primary)] sm:text-base">
                      Nguyễn Hùng Thái
                    </p>
                  </div>
                  <div className="relative z-10 mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--muted)]">
                      {isVi ? "Tuổi âm:" : "Lunar Age:"} <span className="font-extrabold text-amber-600 dark:text-amber-400">Giáp Tý</span>
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-black text-amber-600 dark:text-amber-400">
                      1984
                    </span>
                  </div>
                </div>

                {/* Ngày & Giờ Sinh */}
                <div className="group/card relative flex flex-col justify-between overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 via-transparent to-indigo-600/5 p-4 transition-all duration-300 hover:border-indigo-400/60 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] sm:p-5 dark:border-indigo-500/20">
                  <div className="absolute right-2 bottom-2 text-indigo-500/10 transition-transform duration-500 group-hover/card:scale-110">
                    <Clock size={72} />
                  </div>
                  <div className="relative z-10">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-indigo-600 capitalize sm:text-xs dark:text-indigo-400">
                      <Clock size={12} className="text-indigo-500" />
                      {isVi ? "Ngày & Giờ Sinh" : "Date of Birth"}
                    </span>
                    <p className="mt-2 text-sm font-extrabold text-[var(--text-primary)] sm:text-base">
                      18/12/1984
                    </p>
                  </div>
                  <div className="relative z-10 mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--muted)]">
                      {isVi ? "Giờ sinh:" : "Birth Hour:"} <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Dậu (17h - 19h)</span>
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[9px] font-black text-indigo-600 dark:text-indigo-400">
                      Yang
                    </span>
                  </div>
                </div>

                {/* Mệnh & Cục */}
                <div className="group/card relative flex flex-col justify-between overflow-hidden rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/15 via-transparent to-sky-600/5 p-4 transition-all duration-300 hover:border-sky-400/60 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] sm:p-5 dark:border-sky-500/20">
                  <div className="absolute right-2 bottom-2 text-sky-500/10 transition-transform duration-500 group-hover/card:scale-110">
                    <Compass size={72} />
                  </div>
                  <div className="relative z-10">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-sky-600 capitalize sm:text-xs dark:text-sky-400">
                      <Compass size={12} className="text-sky-500" />
                      {isVi ? "Mệnh & Cục" : "Element & Destiny"}
                    </span>
                    <p className="mt-2 text-sm font-extrabold text-[var(--text-primary)] sm:text-base">
                      Hải Trung Kim
                    </p>
                  </div>
                  <div className="relative z-10 mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--muted)]">
                      {isVi ? "Mệnh:" : "Element:"} <span className="font-extrabold text-sky-600 dark:text-sky-400">Thủy Nhị Cục</span>
                    </span>
                    <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[9px] font-black text-sky-600 dark:text-sky-400">
                      Gold
                    </span>
                  </div>
                </div>

                {/* Cách Cục Mệnh Lý */}
                <div className="group/card relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/15 via-transparent to-purple-600/5 p-4 transition-all duration-300 hover:border-purple-400/60 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] sm:p-5 dark:border-purple-500/20">
                  <div className="absolute right-2 bottom-2 text-purple-500/10 transition-transform duration-500 group-hover/card:scale-110">
                    <Award size={72} />
                  </div>
                  <div className="relative z-10">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-purple-600 capitalize sm:text-xs dark:text-purple-400">
                      <Award size={12} className="text-purple-500" />
                      {isVi ? "Cách Cục Mệnh Lý" : "Astrological Archetype"}
                    </span>
                    <p className="mt-2 text-sm font-extrabold text-[var(--text-primary)] sm:text-base">
                      Phủ Tướng Triều Viên
                    </p>
                  </div>
                  <div className="relative z-10 mt-3 flex items-center justify-between">
                    <span className="text-[10px] truncate font-bold text-[var(--muted)]">
                      {isVi ? "Chính Tinh:" : "Stars:"} <span className="font-extrabold text-purple-600 dark:text-purple-400">Thiên Phủ & Thiên Tướng</span>
                    </span>
                    <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-black text-purple-600 dark:text-purple-400">
                      Elite
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2x2 BENTO WIDGET: CIRCULAR VIDEO AVATAR CARD */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl backdrop-blur-2xl bg-white/15 dark:bg-slate-900/40 border border-amber-500/30 p-6 flex flex-col justify-between text-center shadow-lg"
          >
            <div className="flex w-full items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                  <Sparkles size={18} />
                </div>
                <div className="text-left">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-600 dark:text-purple-400">
                    02 · AI Avatar Video
                  </span>
                  <h3 className="text-xs font-black tracking-wider text-[var(--text-primary)] capitalize sm:text-sm mt-0.5">
                    {isVi ? "Nghe luận giải mệnh lý" : "Astrology AI Video"}
                  </h3>
                  <p className="text-[10px] font-bold text-[var(--muted)]">
                    {isVi
                      ? "Trợ lý AI Luận Giải Tử Vi"
                      : "AI Avatar Interpretation"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAstroVideoPopup(true)}
                className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-black tracking-wider text-amber-600 transition-all hover:bg-amber-500/20 dark:text-amber-400"
              >
                <Maximize2 size={12} />
                <span>{isVi ? "Phóng To" : "Expand"}</span>
              </button>
            </div>

            {/* CENTERED VIDEO DISPLAY AREA */}
            <div className="my-auto flex w-full flex-1 items-center justify-center py-2">
              <div
                className="group relative cursor-pointer"
                onClick={() => setShowAstroVideoPopup(true)}
              >
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-transparent bg-black shadow-[0_0_30px_rgba(245,158,11,0.35)] ring-4 ring-amber-500/20 sm:h-44 sm:w-44 bg-gradient-to-r from-amber-500 via-indigo-500 to-sky-500 p-[3px]">
                  <div className="h-full w-full overflow-hidden rounded-full bg-black">
                    <video
                      ref={astroVideoRef}
                      src="https://cdn.scena.ai/project/9306/95e20a75c4af34a76d83b97ffc7ddc0b099bd815eebaad65a9ceef3c73fa19dd.mp4"
                      autoPlay
                      loop
                      muted={isAstroVideoMuted}
                      playsInline
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* INTERACTIVE OVERLAY CONTROLS ON HOVER */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAstroVideoPlay();
                      }}
                      className="cursor-pointer rounded-full bg-amber-500 p-2.5 font-bold text-slate-950 shadow-md transition-colors hover:bg-amber-400"
                      title={isAstroVideoPlaying ? "Tạm dừng" : "Phát video"}
                    >
                      {isAstroVideoPlaying ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} className="fill-current" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAstroVideoMute();
                      }}
                      className="cursor-pointer rounded-full border border-white/20 bg-slate-900/80 p-2.5 font-bold text-white shadow-md transition-colors hover:bg-slate-800"
                      title={isAstroVideoMuted ? "Bật tiếng" : "Tắt tiếng"}
                    >
                      {isAstroVideoMuted ? (
                        <VolumeX size={16} />
                      ) : (
                        <Volume2 size={16} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAstroVideoPopup(true);
                      }}
                      className="cursor-pointer rounded-full bg-amber-500/90 p-2.5 font-bold text-slate-950 shadow-md transition-colors hover:bg-amber-400"
                      title="Mở Video Popup"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-end border-t border-[var(--border)] pt-3 text-[11px] font-extrabold text-[var(--muted)]">
              <button
                type="button"
                onClick={toggleAstroVideoMute}
                className="flex cursor-pointer items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-600 transition-all hover:bg-amber-500/20 dark:text-amber-400"
              >
                {isAstroVideoMuted ? (
                  <>
                    <VolumeX size={12} />
                    <span>{isVi ? "Bật Tiếng" : "Unmute"}</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={12} />
                    <span>{isVi ? "Tắt Tiếng" : "Mute"}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* 4-COL BENTO ROW: MA TRẬN NĂNG LỰC LÃNH ĐẠO */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-4 rounded-3xl backdrop-blur-2xl bg-white/15 dark:bg-slate-900/40 border border-amber-500/30 p-6 flex flex-col justify-between space-y-4 shadow-lg"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-amber-600 dark:text-amber-400">
                  <PieChart size={20} />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    03 · Radar Matrix
                  </span>
                  <h3 className="text-sm font-extrabold tracking-wider text-[var(--text-primary)] capitalize sm:text-base mt-0.5">
                    {isVi
                      ? "Ma Trận Năng Lực Lãnh Đạo"
                      : "Leadership Competency Radar"}
                  </h3>
                  <p className="text-[11px] font-semibold text-[var(--muted)]">
                    {isVi
                      ? "Đánh giá chỉ số theo lá số mệnh lý Phủ Tướng Triều Viên"
                      : "Evaluated against astrological alignment & executive competencies"}
                  </p>
                </div>
              </div>
            </div>

            {/* Wide Grid: Radar Chart + Detailed Score Cards */}
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              {/* LEFT / RADAR CHART */}
              <div className="relative flex w-full min-w-0 flex-col items-center justify-center py-2 lg:col-span-5">
                <AstrologyLeadershipRadar
                  data={radarData}
                  hoveredIndex={hoveredAstroIndex}
                  onHoverIndex={setHoveredAstroIndex}
                  isVi={isVi}
                />
              </div>

              {/* RIGHT / COMPETENCY METRICS BREAKDOWN */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7">
                {radarData.map((item, idx) => {
                  const isHovered = hoveredAstroIndex === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredAstroIndex(idx)}
                      onMouseLeave={() => setHoveredAstroIndex(null)}
                      className={cn(
                        "flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 transition-colors duration-200 cursor-pointer",
                        isHovered
                          ? "border-amber-500 bg-amber-500/10"
                          : "border-[var(--border)] bg-slate-900/5 hover:border-amber-500/50 dark:bg-white/5",
                      )}
                      style={{
                        borderColor: isHovered ? item.color : `${item.color}40`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={cn(
                            "truncate text-[10.5px] font-extrabold transition-colors",
                            isHovered
                              ? "text-[var(--text-primary)]"
                              : "text-[var(--muted)]",
                          )}
                        >
                          {item.subject}
                        </span>
                        <span
                          className="text-xs font-black shrink-0"
                          style={{ color: item.color }}
                        >
                          {item.A}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.A}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Highlights */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-3 text-xs font-extrabold text-[var(--muted)]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>
                    {isVi ? "Thực Thi & Vận Hành: 98%" : "Execution & Ops: 98%"}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <TrendingUp size={14} />
                  <span>
                    {isVi ? "Kỷ Luật & SOP: 95%" : "Discipline & SOP: 95%"}
                  </span>
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[var(--muted)]">
                {isVi
                  ? "✦ Đánh giá dựa trên chuẩn năng lực lãnh đạo thực chiến"
                  : "✦ Evaluated against real-world leadership standards"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION I: PORTRAIT & CORE PERSONALITY (3 COLORFUL GLASS CARDS) */}
        {/* ========================================================================= */}
        <section className="space-y-[15px] rounded-[15px]">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-black tracking-wider text-[var(--text-primary)] capitalize sm:text-base">
              <div className="rounded-lg bg-amber-500/10 p-1.5 text-amber-600 dark:text-amber-400">
                <User size={18} />
              </div>
              <span>
                {isVi
                  ? "I. Chân Dung Lãnh Đạo & Tính Cách Cốt Lõi"
                  : "I. Leadership Profile & Core Personality"}
              </span>
            </h3>
            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              3 {isVi ? "Trụ Cột Cốt Lõi" : "Core Pillars"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* PILLAR 1: INDIGO */}
            <motion.div
              whileHover={{ y: -3 }}
              className="relative flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-indigo-500/30 bg-white/15 dark:bg-slate-900/40 p-5 shadow-md backdrop-blur-2xl transition-colors sm:p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <Layers
                      size={20}
                      className="shrink-0 text-indigo-600 dark:text-indigo-400"
                    />
                    <h4 className="truncate text-sm font-extrabold text-indigo-700 sm:text-base dark:text-indigo-300">
                      {isVi
                        ? "Hệ Thống & Quy Trình"
                        : "Systems & Standard Operating Procedures"}
                    </h4>
                  </div>
                  <span className="shrink-0 rounded-md bg-slate-900/5 px-2 py-0.5 text-[10px] font-black tracking-widest text-[var(--text-primary)] uppercase dark:bg-white/10">
                    01
                  </span>
                </div>

                <p className="text-[11px] font-bold text-[var(--muted)]">
                  {isVi
                    ? "Chính tinh Thiên Phủ & Thiên Tướng"
                    : "Tian Fu & Tian Xiang Stars"}
                </p>

                <p className="text-xs leading-relaxed font-semibold text-[var(--text-primary)] sm:text-sm">
                  {isVi
                    ? "Tư duy hệ thống bài bản, giỏi xây dựng chuẩn mực vận hành (SOP), quản lý tài chính & kho tàng nhân lực chặt chẽ. Điềm tĩnh, cẩn trọng, không làm việc ngẫu hứng."
                    : "Structured systems thinking, proficient in creating SOPs, managing finances, and talent governance. Calm, prudent, and data-driven."}
                </p>
              </div>

              <div className="flex items-center gap-1.5 border-t border-[var(--border)] pt-2 text-[10.5px] font-extrabold text-[var(--muted)]">
                <Sparkles size={13} className="text-indigo-500" />
                <span>
                  {isVi
                    ? "Định hướng hành động thực chiến"
                    : "Actionable leadership trait"}
                </span>
              </div>
            </motion.div>

            {/* PILLAR 2: PURPLE */}
            <motion.div
              whileHover={{ y: -3 }}
              className="relative flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-purple-500/30 bg-white/15 dark:bg-slate-900/40 p-5 shadow-md backdrop-blur-2xl transition-colors sm:p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <Zap
                      size={20}
                      className="shrink-0 text-purple-600 dark:text-purple-400"
                    />
                    <h4 className="truncate text-sm font-extrabold text-purple-700 sm:text-base dark:text-purple-300">
                      {isVi
                        ? "Tái Cấu Trúc & Đột Phá"
                        : "Restructuring & Breakthrough"}
                    </h4>
                  </div>
                  <span className="shrink-0 rounded-md bg-slate-900/5 px-2 py-0.5 text-[10px] font-black tracking-widest text-[var(--text-primary)] uppercase dark:bg-white/10">
                    02
                  </span>
                </div>

                <p className="text-[11px] font-bold text-[var(--muted)]">
                  {isVi
                    ? "Hóa Quyền & Phá Quân chiếu"
                    : "Hua Quan & Po Jun Stars"}
                </p>

                <p className="text-xs leading-relaxed font-semibold text-[var(--text-primary)] sm:text-sm">
                  {isVi
                    ? "Sở hữu khả năng quyết đoán trong tái cấu trúc tổ chức, sẵn sàng đập bỏ quy trình cũ lỗi thời để xây dựng mô hình vận hành hiện đại, tối ưu hiệu suất."
                    : "Decisive in organizational restructuring, bold in sunsetting legacy frameworks to build agile, automated, and high-performing operations."}
                </p>
              </div>

              <div className="flex items-center gap-1.5 border-t border-[var(--border)] pt-2 text-[10.5px] font-extrabold text-[var(--muted)]">
                <Sparkles size={13} className="text-purple-500" />
                <span>
                  {isVi
                    ? "Định hướng hành động thực chiến"
                    : "Actionable leadership trait"}
                </span>
              </div>
            </motion.div>

            {/* PILLAR 3: AMBER */}
            <motion.div
              whileHover={{ y: -3 }}
              className="relative flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-amber-500/30 bg-white/15 dark:bg-slate-900/40 p-5 shadow-md backdrop-blur-2xl transition-colors sm:p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <ShieldCheck
                      size={20}
                      className="shrink-0 text-amber-600 dark:text-amber-400"
                    />
                    <h4 className="truncate text-sm font-extrabold text-amber-700 sm:text-base dark:text-amber-300">
                      {isVi
                        ? "Thực Chứng & Chữ Tín"
                        : "Execution & High Integrity"}
                    </h4>
                  </div>
                  <span className="shrink-0 rounded-md bg-slate-900/5 px-2 py-0.5 text-[10px] font-black tracking-widest text-[var(--text-primary)] uppercase dark:bg-white/10">
                    03
                  </span>
                </div>

                <p className="text-[11px] font-bold text-[var(--muted)]">
                  {isVi
                    ? "Linh Tinh & Cương Trực"
                    : "Ling Xing & Integrity Aspect"}
                </p>

                <p className="text-xs leading-relaxed font-semibold text-[var(--text-primary)] sm:text-sm">
                  {isVi
                    ? "Coi trọng lời nói và cam kết (SLA / CSAT). Phản xạ linh hoạt với sự cố khủng hoảng, luôn lấy kết quả thực tế đo lường bằng số liệu làm thước đo."
                    : "Strong commitment to promises (SLA/CSAT). Agile incident response with calm crisis leadership, measured purely by empirical metrics."}
                </p>
              </div>

              <div className="flex items-center gap-1.5 border-t border-[var(--border)] pt-2 text-[10.5px] font-extrabold text-[var(--muted)]">
                <Sparkles size={13} className="text-amber-500" />
                <span>
                  {isVi
                    ? "Định hướng hành động thực chiến"
                    : "Actionable leadership trait"}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION II: STRENGTHS, WEAKNESSES & ROLES (4-STEP PROCESS SEQUENCE) */}
        {/* ========================================================================= */}
        <section className="space-y-[15px] rounded-[15px]">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-black tracking-wider text-[var(--text-primary)] capitalize sm:text-base">
              <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400">
                <Workflow size={18} />
              </div>
              <span>
                {isVi
                  ? "II. Điểm Mạnh, Điểm Cần Lưu Ý & Vai Trò Phù Hợp"
                  : "II. Core Strengths, Focus Areas & Ideal Roles"}
              </span>
            </h3>
            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-black text-amber-600 dark:text-amber-400">
              {isVi ? "Quy Trình 4 Bước" : "4-Step Sequence"}
            </span>
          </div>

          {/* 4-STEP PROCESS SEQUENCE CONTAINER */}
          <div className="relative grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* CARD 01: AMBER / ORANGE */}
            <div className="group relative flex flex-col">
              <motion.div
                whileHover={{ y: -3 }}
                className="relative flex flex-1 flex-col justify-between space-y-4 rounded-2xl border border-amber-500/40 bg-white/15 dark:bg-slate-900/40 p-5 shadow-xl backdrop-blur-2xl"
              >
                <div className="space-y-4">
                  <div className="flex justify-center pt-1">
                    <Lightbulb
                      size={36}
                      className="text-amber-500 transition-transform group-hover:scale-110"
                    />
                  </div>

                  <div className="flex items-center gap-2 border-b border-amber-500/20 pb-3">
                    <div
                      className="shrink-0 bg-amber-500 px-3 py-1 text-xs font-black tracking-wider text-slate-950 shadow-2xs"
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)",
                      }}
                    >
                      01
                    </div>
                    <h4 className="min-w-0 truncate text-xs font-extrabold tracking-wide text-amber-600 uppercase sm:text-sm dark:text-amber-400">
                      {isVi ? "Điểm Mạnh Cốt Lõi" : "CORE STRENGTHS"}
                    </h4>
                  </div>

                  <ul className="space-y-2.5 text-xs leading-snug font-semibold text-[var(--text-primary)] sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-amber-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Tư duy hệ thống sắc bén, giỏi xây dựng quy trình SOP và CRM"
                          : "Sharp systems thinking, expert in SOP & CRM architecture"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-amber-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Khả năng chịu áp lực vận hành cao, xử lý sự cố điềm tĩnh"
                          : "High operational resilience, calm crisis resolution"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-amber-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Giữ chữ tín cao, nguyên tắc công bằng trong quản trị đội ngũ"
                          : "Unwavering integrity and fair team management principles"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-amber-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Xây dựng văn hóa phục vụ lấy khách hàng làm trung tâm"
                          : "Obsessive customer-centric service culture builder"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-1.5 border-t border-amber-500/20 pt-2 text-[10.5px] font-bold text-amber-600 dark:text-amber-400">
                  <Award size={13} />
                  <span>
                    {isVi
                      ? "Thế mạnh cạnh tranh vượt trội"
                      : "Core competitive advantage"}
                  </span>
                </div>
              </motion.div>

              <div className="absolute top-1/2 -right-3.5 z-20 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--bg)] bg-amber-500 text-slate-950 shadow-md lg:flex">
                <ChevronRight size={14} />
              </div>
              <div className="z-20 my-1 flex justify-center text-amber-500 lg:hidden">
                <ChevronDown size={20} className="animate-bounce" />
              </div>
            </div>

            {/* CARD 02: RED / ROSE */}
            <div className="group relative flex flex-col">
              <motion.div
                whileHover={{ y: -3 }}
                className="relative flex flex-1 flex-col justify-between space-y-4 rounded-2xl border border-rose-500/40 bg-white/15 dark:bg-slate-900/40 p-5 shadow-xl backdrop-blur-2xl"
              >
                <div className="space-y-4">
                  <div className="flex justify-center pt-1">
                    <Settings
                      size={36}
                      className="text-rose-500 transition-transform duration-300 group-hover:rotate-45"
                    />
                  </div>

                  <div className="flex items-center gap-2 border-b border-rose-500/20 pb-3">
                    <div
                      className="shrink-0 bg-rose-500 px-3 py-1 text-xs font-black tracking-wider text-white shadow-2xs"
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)",
                      }}
                    >
                      02
                    </div>
                    <h4 className="min-w-0 truncate text-xs font-extrabold tracking-wide text-rose-600 uppercase sm:text-sm dark:text-rose-400">
                      {isVi ? "Điểm Cần Lưu Ý" : "AREAS TO MIND"}
                    </h4>
                  </div>

                  <ul className="space-y-2.5 text-xs leading-snug font-semibold text-[var(--text-primary)] sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-rose-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Không giỏi chính trị công sở hay nịnh hót, rất thẳng thắn"
                          : "Direct and transparent; avoids office politics or flattery"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-rose-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Dễ cảm thấy khó chịu với sự cẩu thả, thiếu chỉn chu"
                          : "Low tolerance for carelessness or sloppy execution"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-rose-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Cần chú ý thư giãn, tránh ôm đồm công việc quá tải"
                          : "Needs to delegate more to prevent operational burnout"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-1.5 border-t border-rose-500/20 pt-2 text-[10.5px] font-bold text-rose-600 dark:text-rose-400">
                  <Eye size={13} />
                  <span>
                    {isVi
                      ? "Góc nhìn tự nhận thức để hoàn thiện"
                      : "Self-awareness for refinement"}
                  </span>
                </div>
              </motion.div>

              <div className="absolute top-1/2 -right-3.5 z-20 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--bg)] bg-rose-500 text-white shadow-md lg:flex">
                <ChevronRight size={14} />
              </div>
              <div className="z-20 my-1 flex justify-center text-rose-500 lg:hidden">
                <ChevronDown size={20} className="animate-bounce" />
              </div>
            </div>

            {/* CARD 03: CYAN / TEAL */}
            <div className="group relative flex flex-col">
              <motion.div
                whileHover={{ y: -3 }}
                className="relative flex flex-1 flex-col justify-between space-y-4 rounded-2xl border border-cyan-500/40 bg-white/15 dark:bg-slate-900/40 p-5 shadow-xl backdrop-blur-2xl"
              >
                <div className="space-y-4">
                  <div className="flex justify-center pt-1">
                    <Clock
                      size={36}
                      className="text-cyan-500 transition-transform group-hover:scale-110"
                    />
                  </div>

                  <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3">
                    <div
                      className="shrink-0 bg-cyan-500 px-3 py-1 text-xs font-black tracking-wider text-slate-950 shadow-2xs"
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)",
                      }}
                    >
                      03
                    </div>
                    <h4 className="min-w-0 truncate text-xs font-extrabold tracking-wide text-cyan-600 uppercase sm:text-sm dark:text-cyan-400">
                      {isVi ? "Vai Trò Phù Hợp" : "IDEAL ROLES"}
                    </h4>
                  </div>

                  <ul className="space-y-2.5 text-xs leading-snug font-semibold text-[var(--text-primary)] sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-cyan-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Giám đốc Trải nghiệm Khách hàng (Head of CX / CXO)"
                          : "Chief Experience Officer (CXO) / Head of CX"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-cyan-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Giám đốc Vận hành Contact Center / CSKB (COO)"
                          : "Contact Center / CSKB Operations Director (COO)"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-cyan-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Cố vấn Chuẩn hóa & Tái cấu trúc Quy trình Doanh nghiệp"
                          : "Enterprise Restructuring & Operations Advisor"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-1.5 border-t border-cyan-500/20 pt-2 text-[10.5px] font-bold text-cyan-600 dark:text-cyan-400">
                  <Crown size={13} />
                  <span>
                    {isVi
                      ? "Vị trí phát huy 100% năng lực"
                      : "Peak performance positions"}
                  </span>
                </div>
              </motion.div>

              <div className="absolute top-1/2 -right-3.5 z-20 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--bg)] bg-cyan-500 text-slate-950 shadow-md lg:flex">
                <ChevronRight size={14} />
              </div>
              <div className="z-20 my-1 flex justify-center text-cyan-500 lg:hidden">
                <ChevronDown size={20} className="animate-bounce" />
              </div>
            </div>

            {/* CARD 04: BLUE / INDIGO */}
            <div className="group relative flex flex-col">
              <motion.div
                whileHover={{ y: -3 }}
                className="relative flex flex-1 flex-col justify-between space-y-4 rounded-2xl border border-blue-600/40 bg-white/15 dark:bg-slate-900/40 p-5 shadow-xl backdrop-blur-2xl"
              >
                <div className="space-y-4">
                  <div className="flex justify-center pt-1">
                    <Target
                      size={36}
                      className="text-blue-600 transition-transform group-hover:scale-110 dark:text-blue-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 border-b border-blue-500/20 pb-3">
                    <div
                      className="shrink-0 bg-blue-700 px-3 py-1 text-xs font-black tracking-wider text-white shadow-2xs"
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)",
                      }}
                    >
                      04
                    </div>
                    <h4 className="min-w-0 truncate text-xs font-extrabold tracking-wide text-blue-700 uppercase sm:text-sm dark:text-blue-300">
                      {isVi ? "Giải Pháp Đột Phá" : "STRATEGIC SOLUTION"}
                    </h4>
                  </div>

                  <ul className="space-y-2.5 text-xs leading-snug font-semibold text-[var(--text-primary)] sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-blue-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Tự động hóa quy trình bằng AI & Bot (RPA) để giảm tải thủ công"
                          : "Automate routine workflows using AI & RPA bots"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-blue-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Tối ưu hóa 70% thời gian tác vụ vận hành lặp đi lặp lại"
                          : "Optimize 70% repetitive manual operational tasks"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 font-bold text-blue-500">
                        ✦
                      </span>
                      <span>
                        {isVi
                          ? "Tập trung 100% nguồn lực vào quy hoạch chiến lược dài hạn"
                          : "Focus 100% resources on long-term strategic execution"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-1.5 border-t border-blue-500/20 pt-2 text-[10.5px] font-bold text-blue-700 dark:text-blue-300">
                  <Rocket size={13} />
                  <span>
                    {isVi
                      ? "Tối ưu tự động hóa & AI"
                      : "Automation & AI Optimization"}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION III: COMPATIBILITY MATRIX (12 ZODIACS) */}
        {/* ========================================================================= */}
        <section className="space-y-[15px] rounded-[15px]">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-black tracking-wider text-[var(--text-primary)] capitalize sm:text-base">
              <div className="rounded-lg bg-blue-500/10 p-1.5 text-blue-600 dark:text-blue-400">
                <Users size={18} />
              </div>
              <span>
                {isVi
                  ? "III. Độ Tương Hợp Nhân Sự & Cộng Sự (12 Con Giáp)"
                  : "III. Talent & Partner Compatibility Matrix (12 Zodiacs)"}
              </span>
            </h3>
          </div>

          {/* BIRTH YEAR CHECKER */}
          <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-md backdrop-blur-xl sm:p-5">
            <h4 className="text-xs font-extrabold text-[var(--text-primary)] sm:text-sm">
              {isVi ? "Tra cứu mức độ hợp tác" : "Check compatibility"}
            </h4>
            <div className="flex flex-col items-stretch gap-[15px] sm:flex-row sm:items-center">
              <input
                type="number"
                placeholder={
                  isVi
                    ? "Nhập năm sinh (VD: 1990)"
                    : "Enter birth year (e.g. 1990)"
                }
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCheckCompatibility}
                className="cursor-pointer rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-black tracking-wider text-slate-950 uppercase shadow-md transition-all hover:bg-amber-400"
              >
                <span>{isVi ? "Kiểm tra" : "Check"}</span>
              </button>
            </div>

            {checkResult !== null && (
              <div className="mt-3 border-t border-[var(--border)] pt-3">
                {checkResult === -1 ? (
                  <p className="text-xs font-bold text-rose-500">
                    {isVi
                      ? "Vui lòng nhập năm sinh hợp lệ (4 số)"
                      : "Please enter a valid 4-digit year"}
                  </p>
                ) : (
                  (() => {
                    const yearNum = parseInt(birthYear);
                    const zodiac = ZODIAC_NAMES[checkResult];
                    const isBest = ["Thân", "Thìn", "Dậu"].includes(zodiac);
                    const isComplementary = ["Sửu", "Tỵ", "Hợi"].includes(
                      zodiac,
                    );
                    const isAdaptive = ["Ngọ", "Mão", "Tý"].includes(zodiac);

                    let groupName = isVi ? "Nhóm Bình Hòa" : "Neutral Group";
                    let color = "text-[var(--text-primary)]";
                    let msg = isVi
                      ? "Phối hợp linh hoạt, phụ thuộc nhiều vào tính cách cá nhân."
                      : "Flexible cooperation depending on personal alignment.";

                    if (isBest) {
                      groupName = isVi
                        ? "Nhóm Hợp Nhất (Hiệu suất Tối đa)"
                        : "Optimal Synergistic Alliance (Top Efficiency)";
                      color = "text-emerald-600 dark:text-emerald-400";
                      msg = isVi
                        ? "Phối hợp ăn ý nhất trong triển khai & bứt phá. Đội ngũ nòng cốt mang lại hiệu suất tối đa & độ tin cậy tuyệt đối."
                        : "Highest execution efficiency and trust. Core strike team delivering maximum speed.";
                    } else if (isComplementary) {
                      groupName = isVi
                        ? "Nhóm Bổ Trợ (Phối hợp Chuẩn hóa)"
                        : "Complementary Execution Group (Standardized Fit)";
                      color = "text-sky-600 dark:text-sky-400";
                      msg = isVi
                        ? "Bổ trợ tốt khi có KPI & SLA minh bạch. Cần giao việc theo đúng KPI, SLA & hướng dẫn cụ thể."
                        : "High output under clear KPIs & SLAs. Task allocation requires transparent guidelines.";
                    } else if (isAdaptive) {
                      groupName = isVi
                        ? "Nhóm Quản Trị Đặc Biệt (Cần Thống Nhất)"
                        : "Adaptive Management Group (Alignment Needed)";
                      color = "text-amber-600 dark:text-amber-400";
                      msg = isVi
                        ? "Khác biệt phong cách, cần dung hòa quy chuẩn. Cần thống nhất quan điểm và tiếng nói chung trước khi vận hành."
                        : "Diverse styles requiring alignment. Align expectations prior to launching.";
                    }

                    return (
                      <div className="space-y-1 text-xs">
                        <p className="font-bold text-[var(--text-primary)]">
                          {isVi ? "Con giáp:" : "Zodiac:"}{" "}
                          <span className="font-extrabold text-amber-600">
                            {zodiac} ({yearNum})
                          </span>
                        </p>
                        <p className={`font-extrabold ${color}`}>{groupName}</p>
                        <p className="text-[11px] font-semibold text-[var(--muted)]">
                          {msg}
                        </p>
                      </div>
                    );
                  })()
                )}
              </div>
            )}
          </div>

          {/* 3 ZODIAC GROUPS CARDS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ZODIAC_GROUPS.map((group, idx) => {
              const mainTitle = isVi ? group.mainTitleVi : group.titleEn;
              const subLine = isVi ? group.subLineVi : group.subLineEn;
              const badge = isVi ? group.badgeTextVi : group.badgeTextEn;
              const subtitle = isVi ? group.subtitleVi : group.subtitleEn;
              const summary = isVi ? group.summaryVi : group.summaryEn;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="group relative flex flex-col justify-between space-y-3.5 overflow-hidden rounded-2xl border border-[var(--border)] bg-white/15 dark:bg-slate-900/40 p-5 shadow-md backdrop-blur-2xl transition-colors"
                >
                  <div className="relative z-10 space-y-3">
                    <div
                      className="flex flex-col items-start border-b pb-2.5"
                      style={{ borderColor: `${group.color}30` }}
                    >
                      <span
                        className="mb-1.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-black tracking-wider text-white shadow-2xs"
                        style={{ backgroundColor: group.color }}
                      >
                        {badge}
                      </span>
                      <h4
                        className="text-sm leading-snug font-extrabold capitalize sm:text-base"
                        style={{ color: group.color }}
                      >
                        <span>{mainTitle}</span>
                        <span className="mt-0.5 block text-xs font-bold text-[var(--text-primary)] dark:text-slate-200">
                          {subLine}
                        </span>
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {group.items.map((item, itemIdx) => {
                        const age = isVi ? item.ageVi : item.ageEn;
                        const trait = isVi ? item.traitVi : item.traitEn;

                        return (
                          <div
                            key={itemIdx}
                            className="flex items-center justify-between gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2.5 shadow-2xs backdrop-blur-md transition-colors duration-200"
                            style={{
                              borderLeftWidth: "3.5px",
                              borderLeftColor: group.color,
                              borderColor: item.isBest
                                ? group.color
                                : undefined,
                            }}
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)]">
                              <img
                                src={item.icon}
                                alt="zodiac"
                                className="h-5 w-5 object-contain"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-xs font-extrabold text-[var(--text-primary)]">
                                {age}
                              </div>
                              <div className="truncate text-[10.5px] font-semibold text-[var(--muted)]">
                                {trait}
                              </div>
                            </div>
                            {item.isBest && (
                              <span className="shrink-0 rounded bg-emerald-600 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-white shadow-2xs">
                                BEST
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="relative z-10 border-t border-[var(--border)] pt-2"
                    style={{ color: group.color }}
                  >
                    <p className="text-xs font-extrabold italic">{summary}</p>
                    <p className="mt-1 text-[11px] font-bold text-[var(--muted)]">
                      {subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION IV: CONCLUSION & MANAGEMENT MOTTO */}
        {/* ========================================================================= */}
        <section className="space-y-[15px] rounded-[15px]">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-black tracking-wider text-[var(--text-primary)] capitalize sm:text-base">
              <div className="rounded-lg bg-amber-500/10 p-1.5 text-amber-600 dark:text-amber-400">
                <Star size={18} />
              </div>
              <span>
                {isVi
                  ? "IV. Lời Kết & Phương Châm Quản Trị"
                  : "IV. Conclusion & Leadership Creed"}
              </span>
            </h3>
            <span className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Compass size={13} />
              <span>{isVi ? "Triết Lý Lãnh Đạo" : "Leadership Creed"}</span>
            </span>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="relative flex flex-col items-center space-y-5 overflow-hidden rounded-3xl border border-amber-500/40 bg-white/15 dark:bg-slate-900/40 p-6 text-center shadow-xl backdrop-blur-2xl sm:p-8"
          >
            <Quote
              className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 text-amber-500/10"
              size={120}
            />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black tracking-widest text-amber-700 uppercase shadow-2xs dark:text-amber-300">
                <Sparkles size={13} className="text-amber-500" />
                <span>
                  {isVi
                    ? "Tâm - Kỷ Luật - Công Nghệ"
                    : "Mindset - Discipline - Tech"}
                </span>
              </div>

              <p className="text-xs leading-relaxed font-semibold text-[var(--text-primary)] sm:text-sm">
                {isVi
                  ? "Tử vi không phải là định mệnh bài sẵn, mà là công cụ thấu hiểu bản thân để phát huy tối đa điểm mạnh và khắc phục điểm yếu."
                  : "Astrology is not a pre-ordained fate, but a profound self-awareness tool to maximize strengths and neutralize weaknesses."}
              </p>

              <blockquote className="relative rounded-2xl border border-amber-500/40 bg-amber-500/15 p-5 text-sm leading-relaxed font-extrabold text-amber-800 italic shadow-sm sm:p-6 sm:text-base dark:text-amber-300">
                <span className="absolute -top-3 left-3 font-serif text-3xl text-amber-500">
                  “
                </span>
                {isVi
                  ? "Lấy tâm phụng sự khách hàng, lấy kỷ luật vận hành doanh nghiệp, và lấy công nghệ làm đòn bẩy bứt phá."
                  : "Serve clients with empathy, govern enterprises with firm discipline, and leverage technology for breakthrough scale."}
                <span className="absolute right-3 -bottom-5 font-serif text-3xl text-amber-500">
                  ”
                </span>
              </blockquote>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* LEADERSHIP EXECUTIVE SUMMARY MODAL */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showSummaryModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSummaryModal(false)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 flex max-h-[90vh] w-[80vw] max-w-[80vw] flex-col overflow-hidden rounded-[15px] border border-amber-500/40 bg-[var(--card)] shadow-2xl backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between border-b border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl bg-amber-500 p-2 font-black text-slate-950">
                      <Crown size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[var(--text-primary)]">
                        {isVi
                          ? "Tóm Tắt Luận Giải Cho Lãnh Đạo"
                          : "Leadership Executive Summary"}
                      </h3>
                      <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                        {isVi
                          ? "Nguyễn Hùng Thái · Giáp Tý 1984"
                          : "Nguyen Hung Thai · Wood Rat 1984"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowSummaryModal(false)}
                    className="cursor-pointer rounded-full p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                  >
                    <XCircle size={22} />
                  </button>
                </div>

                <div className="custom-scrollbar space-y-5 overflow-y-auto p-6 text-xs leading-relaxed text-[var(--text-primary)] sm:text-sm">
                  <p className="font-semibold">
                    <strong className="text-amber-600 dark:text-amber-400">
                      Nguyễn Hùng Thái (1984 - 🐭 Giáp Tý)
                    </strong>{" "}
                    {isVi
                      ? "mang cách cục lá số"
                      : "carries the astrological structure"}{" "}
                    <strong className="text-amber-600 dark:text-amber-400">
                      Phủ Tướng Triều Viên
                    </strong>{" "}
                    {isVi
                      ? "với hai chính tinh Thiên Phủ và Thiên Tướng tọa chiếu. Đây là cách cục điển hình của nhà điều hành hệ thống, người giữ kho tàng quy trình và kỷ luật doanh nghiệp."
                      : "governed by Heavenly Treasury & Heavenly General. This archetype represents systematic enterprise execution, process governance, and rigorous discipline."}
                  </p>

                  <div className="space-y-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5">
                    <p className="flex items-center gap-1.5 text-xs font-black tracking-wider text-amber-700 uppercase dark:text-amber-400">
                      <Sparkles size={14} />
                      <span>
                        {isVi
                          ? "3 Điểm Cốt Lõi Cần Ghi Nhớ:"
                          : "3 Key Leadership Takeaways:"}
                      </span>
                    </p>
                    <ul className="space-y-2 text-xs font-bold text-[var(--text-primary)]">
                      <li className="flex items-start gap-2.5">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span>
                          <strong>
                            {isVi
                              ? "Không làm việc tùy hứng:"
                              : "Data & SOP Governance:"}
                          </strong>{" "}
                          {isVi
                            ? "Mọi thứ phải được quy chuẩn hóa bằng SOP và dữ liệu CRM rõ ràng."
                            : "Every action is governed by standard operating procedures (SOP) and clear CRM metrics."}
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span>
                          <strong>
                            {isVi
                              ? 'Chọn đúng "Cánh tay phải":'
                              : "Key Alliance:"}
                          </strong>{" "}
                          {isVi
                            ? "Ưu tiên hợp tác với tuổi Thân (1980, 1992), Thìn (1988) và Dậu (1981, 1993)."
                            : "Synergize best with Monkey (1980, 1992), Dragon (1988), and Rooster (1981, 1993)."}
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span>
                          <strong>
                            {isVi
                              ? "Khung giờ vàng quyết sách:"
                              : "Golden Hours:"}
                          </strong>{" "}
                          {isVi
                            ? "Dành giờ Dậu (17h-19h) để đưa ra các quyết định tái cấu trúc lớn."
                            : "Dau Hour (17h-19h) is optimal for strategic restructuring decisions."}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="font-semibold">
                    {isVi
                      ? "Anh Nguyễn Hùng Thái phát huy tối đa giá trị khi ở vị trí"
                      : "Nguyen Hung Thai maximizes enterprise value in leadership roles such as"}{" "}
                    <strong className="text-amber-600 dark:text-amber-400">
                      Chief Experience Officer (CXO)
                    </strong>
                    ,{" "}
                    <strong className="text-amber-600 dark:text-amber-400">
                      Chief Operating Officer (COO)
                    </strong>{" "}
                    {isVi ? "hoặc" : "or"}{" "}
                    <strong className="text-amber-600 dark:text-amber-400">
                      {isVi
                        ? "Chuyên Gia Cố Vấn Chuẩn Hóa Doanh Nghiệp"
                        : "Enterprise Restructuring & Operations Advisor"}
                    </strong>
                    .
                  </p>
                </div>

                <div className="flex justify-end border-t border-[var(--border)] bg-[var(--surface)] p-4">
                  <button
                    type="button"
                    onClick={() => setShowSummaryModal(false)}
                    className="cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs font-black tracking-wider text-slate-950 shadow-sm transition-colors hover:bg-amber-400"
                  >
                    {isVi ? "Đã Hiểu & Đóng" : "Acknowledge & Close"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          {/* ASTROLOGY VIDEO POPUP MODAL */}
          {showAstroVideoPopup && (
            <div className="animate-fadeIn fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative flex w-[80vw] max-w-[80vw] flex-col items-center space-y-5 overflow-hidden rounded-[15px] border border-amber-500/40 bg-[var(--card)] p-6 shadow-2xl"
              >
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-500 via-purple-500 to-indigo-500" />

                <div className="flex w-full items-center justify-between border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                      <Sparkles size={18} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-black text-[var(--text-primary)] sm:text-base">
                        {isVi
                          ? "Nghe luận giải mệnh lý (AI Avatar)"
                          : "Astrology AI Video Interpretation"}
                      </h3>
                      <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                        {isVi
                          ? "Phủ Tướng Triều Viên · Nguyễn Hùng Thái 1984"
                          : "Phu Tuong Trieu Vien · Nguyen Hung Thai 1984"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAstroVideoPopup(false)}
                    className="cursor-pointer rounded-full p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                {/* LARGE CIRCULAR VIDEO IN POPUP */}
                <div className="relative my-3">
                  <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-amber-500/80 bg-black shadow-[0_0_35px_rgba(245,158,11,0.45)] ring-4 ring-amber-500/30 sm:h-64 sm:w-64">
                    <video
                      src="https://cdn.scena.ai/project/9306/95e20a75c4af34a76d83b97ffc7ddc0b099bd815eebaad65a9ceef3c73fa19dd.mp4"
                      autoPlay
                      loop
                      controls
                      playsInline
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="animate-spin-slow pointer-events-none absolute -inset-3 rounded-full border border-dashed border-amber-500/50" />
                </div>

                <div className="w-full space-y-2 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-center">
                  <p className="text-xs font-bold text-[var(--text-primary)]">
                    {isVi
                      ? "Trợ lý AI Trí Tuệ Nhân Tạo giải mã phong cách lãnh đạo mệnh lý Giáp Tý 1984."
                      : "AI Assistant interpreting Wood Rat 1984 leadership destiny profile."}
                  </p>
                </div>

                <div className="flex w-full justify-end border-t border-[var(--border)] pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAstroVideoPopup(false)}
                    className="cursor-pointer rounded-xl bg-amber-500 px-5 py-2 text-xs font-black tracking-wider text-slate-950 shadow-md transition-colors hover:bg-amber-400"
                  >
                    {isVi ? "Đóng Popup" : "Close Popup"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
