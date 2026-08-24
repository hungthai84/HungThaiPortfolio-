import React, { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw, Copy, Check, Sparkles, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HSL {
  h: number; // 0..360
  s: number; // 0..100
  l: number; // 0..100
}

function hslToHex({ h, s, l }: HSL): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function getAnalogousPalette(baseHue: number, count: number = 6): HSL[] {
  const palette: HSL[] = [];
  const step = 30; // 30 degrees separation
  const startHue = baseHue - Math.floor(count / 2) * step;

  for (let i = 0; i < count; i++) {
    const h = (startHue + i * step + 360) % 360;
    palette.push({ h, s: 70, l: 80 }); // Increased lightness for pastel look
  }
  return palette;
}

function lighten(color: HSL, amount: number): HSL {
  return { ...color, l: Math.min(100, Math.max(0, color.l + amount)) };
}

function darken(color: HSL, amount: number): HSL {
  return { ...color, l: Math.min(100, Math.max(0, color.l - amount)) };
}

function desaturate(color: HSL, amount: number): HSL {
  return { ...color, s: Math.min(100, Math.max(0, color.s - amount)) };
}

function spin(color: HSL, amount: number): HSL {
  return { ...color, h: (color.h + amount + 360) % 360 };
}

function lerp(v0: number, v1: number, t: number): number {
  return v0 * (1 - t) + v1 * t;
}

function mapValue(
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((v - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function pointsToSplinePath(
  points: { x: number; y: number }[],
  tension: number = 1,
): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  const pts = [points[0], ...points, points[points.length - 1]];
  let pathData = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2];

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;

    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    pathData += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return pathData;
}

export interface WaveData {
  pathData: string;
  gradientId: string;
  colorStart: string;
  colorEnd: string;
  gradientOffset: number;
}

export interface GenerativeSvgData {
  bgColor: string;
  waves: WaveData[];
  seed: number;
}

export function generateGenerativeSvgData(
  customHue?: number,
): GenerativeSvgData {
  const width = 1920;
  const height = 1080;
  const numWaves = 7;
  // Favor Blue (200) to Purple (280) spectrum
  const baseHue =
    customHue !== undefined ? customHue : 220 + Math.floor(Math.random() * 60);
  const colors = getAnalogousPalette(baseHue, 6);

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  // Softer, lighter background for pastel theme
  const bgColor = hslToHex(lighten(desaturate(randomColor, 30), 10));

  const waves: WaveData[] = [];
  const seed = Date.now();

  for (let i = 0; i < numWaves; i++) {
    const randomOffset = Math.random() * 100 - 50;
    const originY =
      mapValue(i, 0, numWaves, -height / 2, height / 3) + randomOffset;
    const endY = mapValue(i, 0, numWaves, 0, 1000) + randomOffset;

    let color = { ...colors[Math.floor(Math.random() * colors.length)] };

    if (i < 3) {
      color = lighten(color, 5); // Ensure early waves are soft too
    }

    const gradientOffset = mapValue(i, 0, numWaves, 0.1, 1);
    const colorStart = hslToHex(lighten(color, 10));
    const colorEnd = hslToHex(spin(color, 40));

    const numSteps = Math.floor(Math.random() * 5) + 4; // 4..8
    const randomRange = Math.random() * 32 + 32; // 32..64
    const points: { x: number; y: number }[] = [];

    for (let stepIdx = 0; stepIdx <= numSteps; stepIdx++) {
      const stepVal = stepIdx / numSteps;
      let x = lerp(0, width, stepVal);
      let y = lerp(originY, endY, stepVal);

      if (stepIdx !== 0 && stepIdx !== numSteps) {
        x += Math.random() * (randomRange * 2) - randomRange;
        y += Math.random() * (randomRange * 2) - randomRange;
      }
      points.push({ x, y });
    }

    const splineData = pointsToSplinePath(points, 1);
    const fullPathData = `${splineData} L ${width} ${height} L 0 ${height} Z`;

    waves.push({
      pathData: fullPathData,
      gradientId: `wave-grad-${i}-${seed}`,
      colorStart,
      colorEnd,
      gradientOffset,
    });
  }

  return { bgColor, waves, seed };
}

interface GenerativeWaveWallpaperProps {
  showControls?: boolean;
  className?: string;
  onSvgGenerated?: (svgData: GenerativeSvgData) => void;
}

export const GenerativeWaveWallpaper: React.FC<
  GenerativeWaveWallpaperProps
> = ({ showControls = true, className = "", onSvgGenerated }) => {
  const [svgData, setSvgData] = useState<GenerativeSvgData>(() =>
    generateGenerativeSvgData(),
  );
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleRegenerate = useCallback(() => {
    setIsGenerating(true);
    const newData = generateGenerativeSvgData();
    setSvgData(newData);
    if (onSvgGenerated) {
      onSvgGenerated(newData);
    }
    setTimeout(() => setIsGenerating(false), 300);
  }, [onSvgGenerated]);

  const handleCopySvg = useCallback(() => {
    if (svgRef.current) {
      const svgString = svgRef.current.outerHTML;
      navigator.clipboard
        .writeText(svgString)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          // Fallback
          const textarea = document.createElement("textarea");
          textarea.value = svgString;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
    }
  }, []);

  // Listen for custom trigger event 'regenerate-wave-background'
  useEffect(() => {
    const handleTrigger = () => {
      handleRegenerate();
    };
    window.addEventListener("regenerate-wave-background", handleTrigger);
    return () =>
      window.removeEventListener("regenerate-wave-background", handleTrigger);
  }, [handleRegenerate]);

  return (
    <div
      className={`canvas-wrapper pointer-events-none absolute inset-0 h-full w-full overflow-hidden select-none ${className}`}
    >
      {/* Generative SVG Canvas */}
      <svg
        ref={svgRef}
        className="canvas h-full w-full object-cover transition-opacity duration-700"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMaxYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {svgData.waves.map((wave) => (
            <linearGradient
              key={wave.gradientId}
              id={wave.gradientId}
              x1="0.5"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={wave.colorStart} />
              <stop
                offset={`${Math.round(wave.gradientOffset * 100)}%`}
                stopColor={wave.colorEnd}
              />
            </linearGradient>
          ))}
        </defs>

        {/* Darkened Background Rect */}
        <rect width="1920" height="1080" fill={svgData.bgColor} />

        {/* Generative Wave Paths */}
        {svgData.waves.map((wave, index) => (
          <path
            key={`${wave.gradientId}-${index}`}
            d={wave.pathData}
            fill={`url(#${wave.gradientId})`}
            className="transition-all duration-700 ease-out"
          />
        ))}
      </svg>

      {/* CodePen Floating Controls Overlay (If enabled) */}
      {showControls && (
        <div className="controls pointer-events-auto fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 dark:border-slate-700/50 dark:bg-slate-900/40">
          <button
            type="button"
            onClick={handleCopySvg}
            className="download flex cursor-pointer items-center gap-2 rounded-xl border border-white/40 bg-white/30 px-4 py-2.5 text-xs font-semibold text-slate-900 shadow-md transition hover:bg-white/50 active:scale-95 dark:border-slate-600/50 dark:bg-slate-800/60 dark:text-white dark:hover:bg-slate-700/80"
            title="Sao chép toàn bộ mã nguồn SVG"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-blue-500 dark:text-blue-400" />
                <span>Copy SVG</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="regenerate flex cursor-pointer items-center gap-2 rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition hover:from-blue-500 hover:to-purple-500 active:scale-95 disabled:opacity-50"
            title="Tạo lại phối màu sóng ngẫu nhiên"
          >
            <RefreshCw
              size={14}
              className={`text-white ${isGenerating ? "animate-spin" : ""}`}
            />
            <span>Regenerate Wave</span>
          </button>
        </div>
      )}
    </div>
  );
};
