import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Share2,
  Edit3,
  Upload,
  X,
  Video,
  Sparkles,
  GripHorizontal,
  Play,
  Pause,
} from "lucide-react";

export interface Member {
  id: string;
  src: string;
  mediaType: "image" | "video";
  bg: string;
  bgLight: string;
  name: string;
  role: string;
  copy: string;
  infoRows: string[];
}

const INITIAL_MEMBERS: Member[] = [
  {
    id: "01",
    src: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/baf95c76-c10b-4fbd-8958-14c1e85be63c/external-assets/5dab8e4c-5f7d-4953-9389-ca2632c32f33-1-blue-girl.webp",
    mediaType: "image",
    bg: "#2C3545",
    bgLight: "#E2E8F0",
    name: "Nari",
    role: "CENTER",
    copy: "The center. Doesn't smile, doesn't need to. Every fancam is forty seconds of her not blinking and the comments section losing it.",
    infoRows: [
      "Position: Center / Lead Dancer",
      "Birthdate: 2002.04.12",
      "Height: 168 cm",
      "Specialty: Expressions & Precision",
      "Concept Color: Deep Sapphire",
    ],
  },
  {
    id: "02",
    src: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/baf95c76-c10b-4fbd-8958-14c1e85be63c/external-assets/f77b28bc-00f5-4d20-9741-66c4d0ecc32b-2-red-guy.webp",
    mediaType: "image",
    bg: "#8B0000", // Rich dark crimson red matching his vest perfectly!
    bgLight: "#FEE2E2", // Soft pastel red for Light Mode
    name: "Zehn",
    role: "MAIN DANCER",
    copy: "Main dancer. Breaks the choreo, sells it anyway. Three seconds behind the count and somehow still the one you watch.",
    infoRows: [
      "Position: Main Dancer / Sub Vocal",
      "Birthdate: 2001.09.28",
      "Height: 181 cm",
      "Specialty: Freestyle & Popping",
      "Concept Color: Crimson Red",
    ],
  },
  {
    id: "03",
    src: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/baf95c76-c10b-4fbd-8958-14c1e85be63c/external-assets/53571957-a21b-45e0-b3a2-824513328420-3-pink-girl.webp",
    mediaType: "image",
    bg: "#FF9BA1",
    bgLight: "#FFE4E6",
    name: "Saera",
    role: "MAKNAE / LEAD VOCAL",
    copy: "Maknae. Cartoon energy, lethal vocal runs. The laugh alone has two million views, the high note has considerably more.",
    infoRows: [
      "Position: Lead Vocalist / Maknae",
      "Birthdate: 2004.11.05",
      "Height: 164 cm",
      "Specialty: High Notes & Charisma",
      "Concept Color: Sakura Pink",
    ],
  },
  {
    id: "04",
    src: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/baf95c76-c10b-4fbd-8958-14c1e85be63c/external-assets/b86463a0-d531-479a-8f94-6de2812f0d23-4-green-guy.webp",
    mediaType: "image",
    bg: "#3EB165",
    bgLight: "#DCFCE7",
    name: "Viro",
    role: "MAIN RAPPER & PRODUCER",
    copy: "Writes half the discography, won't say which half. Quiet through the verses, then takes the bridge and rearranges the room.",
    infoRows: [
      "Position: Main Rapper / Songwriter",
      "Birthdate: 2000.03.18",
      "Height: 178 cm",
      "Specialty: Beat Production & Flow",
      "Concept Color: Neon Emerald",
    ],
  },
];

const GRAIN_SVG_URI = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.08'/></svg>`;

export function StyleShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [displayedIndex, setDisplayedIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [swapping, setSwapping] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Dynamic Members State with localStorage persistence
  const [membersList, setMembersList] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem("app_style_showcase_members");
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [inputMediaType, setInputMediaType] = useState<"image" | "video">("image");
  const [editName, setEditName] = useState<string>("");
  const [editBg, setEditBg] = useState<string>("");
  const [editBgLight, setEditBgLight] = useState<string>("");
  const [editRole, setEditRole] = useState<string>("");
  const [editCopy, setEditCopy] = useState<string>("");
  const [editInfoRows, setEditInfoRows] = useState<string[]>(["", "", "", "", ""]);

  // Draggable Glass Card Position & Touch/Mouse states
  const [cardPos, setCardPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingCard, setIsDraggingCard] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardPosStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Auto-play state (3s transition)
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState<boolean>(true);
  const [isHoveredCard, setIsHoveredCard] = useState<boolean>(false);

  // Swipe navigation touch refs
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    if (!document.getElementById("google-font-anton")) {
      const link1 = document.createElement("link");
      link1.rel = "preconnect";
      link1.href = "https://fonts.googleapis.com";
      document.head.appendChild(link1);

      const link2 = document.createElement("link");
      link2.rel = "preconnect";
      link2.href = "https://fonts.gstatic.com";
      link2.crossOrigin = "anonymous";
      document.head.appendChild(link2);

      const link3 = document.createElement("link");
      link3.id = "google-font-anton";
      link3.rel = "stylesheet";
      link3.href =
        "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link3);
    }

    INITIAL_MEMBERS.forEach((member) => {
      if (member.mediaType === "image") {
        const img = new Image();
        img.src = member.src;
      }
    });
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      if (isAutoPlayEnabled) {
        setIsAutoPlayEnabled(false);
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
  }, [isAutoPlayEnabled]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, input, a")) return;
    setIsDraggingCard(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    cardPosStartRef.current = { ...cardPos };
  };

  const handleCardMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingCard) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setCardPos({
        x: cardPosStartRef.current.x + dx,
        y: cardPosStartRef.current.y + dy,
      });
    },
    [isDraggingCard]
  );

  const handleCardMouseUp = useCallback(() => {
    setIsDraggingCard(false);
  }, []);

  useEffect(() => {
    if (isDraggingCard) {
      window.addEventListener("mousemove", handleCardMouseMove);
      window.addEventListener("mouseup", handleCardMouseUp);
    } else {
      window.removeEventListener("mousemove", handleCardMouseMove);
      window.removeEventListener("mouseup", handleCardMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleCardMouseMove);
      window.removeEventListener("mouseup", handleCardMouseUp);
    };
  }, [isDraggingCard, handleCardMouseMove, handleCardMouseUp]);

  const handleCardTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("button, input, a")) return;
    setIsDraggingCard(true);
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    cardPosStartRef.current = { ...cardPos };
  };

  const handleCardTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingCard) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    setCardPos({
      x: cardPosStartRef.current.x + dx,
      y: cardPosStartRef.current.y + dy,
    });
  };

  const handleCardTouchEnd = () => {
    setIsDraggingCard(false);
  };

  const playSwooshSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // Audio autoplay restriction bypass
    }
  }, [soundEnabled]);

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (isAnimating) return;

      setIsAnimating(true);
      setSwapping(true);
      playSwooshSound();

      const nextIdx = direction === "next" ? (activeIndex + 1) % 4 : (activeIndex + 3) % 4;

      setActiveIndex(nextIdx);

      setTimeout(() => {
        setDisplayedIndex(nextIdx);
        setSwapping(false);
      }, 200);

      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [activeIndex, isAnimating, playSwooshSound]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigate("prev");
      } else if (e.key === "ArrowRight") {
        navigate("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Auto-transition logic:
  // - If active item is an IMAGE: transition after 3.5s
  // - If active item is a VIDEO: transition when the video finishes playing (via onEnded event)
  useEffect(() => {
    if (!isAutoPlayEnabled || isEditModalOpen || isDraggingCard || isHoveredCard) return;

    const currentMember = membersList[activeIndex];
    if (currentMember?.mediaType === "video") {
      // For video, transition is triggered on video ended.
      // Safety fallback timer in case video stalls or fails to trigger onEnded: 2 minutes
      const fallbackTimer = setTimeout(() => {
        navigate("next");
      }, 120000);
      return () => clearTimeout(fallbackTimer);
    }

    // For Image (mẫu hình), auto transition after 3.5 seconds
    const timer = setInterval(() => {
      navigate("next");
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlayEnabled, isEditModalOpen, isDraggingCard, isHoveredCard, activeIndex, membersList, navigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        navigate("next");
      } else {
        navigate("prev");
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const openEditModal = () => {
    const current = membersList[activeIndex];
    setInputUrl(current.src);
    setInputMediaType(current.mediaType);
    setEditName(current.name);
    setEditBg(current.bg);
    setEditBgLight(current.bgLight || lightBgs[current.bg] || "#F1F5F9");
    setEditRole(current.role);
    setEditCopy(current.copy);
    setEditInfoRows([...current.infoRows]);
    setIsEditModalOpen(true);
  };

  const handleResetMembers = () => {
    setMembersList(INITIAL_MEMBERS);
    try {
      localStorage.removeItem("app_style_showcase_members");
    } catch {}
    setIsEditModalOpen(false);
  };

  const handleSaveMemberData = () => {
    const updated = membersList.map((m, idx) =>
      idx === activeIndex
        ? {
            ...m,
            src: inputUrl || m.src,
            mediaType: inputMediaType,
            name: editName || m.name,
            bg: editBg || m.bg,
            bgLight: editBgLight || m.bgLight,
            role: editRole || m.role,
            copy: editCopy || m.copy,
            infoRows: editInfoRows,
          }
        : m
    );
    setMembersList(updated);
    try {
      localStorage.setItem("app_style_showcase_members", JSON.stringify(updated));
    } catch {}
    setIsEditModalOpen(false);
  };

  const handleUrlInputChange = (urlVal: string) => {
    setInputUrl(urlVal);
    if (
      urlVal.match(/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i) ||
      urlVal.startsWith("data:video/")
    ) {
      setInputMediaType("video");
    } else if (
      urlVal.match(/\.(png|jpg|jpeg|webp|gif|svg|avif)(\?.*)?$/i) ||
      urlVal.startsWith("data:image/")
    ) {
      setInputMediaType("image");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVid = file.type.startsWith("video/");
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setInputUrl(event.target.result as string);
          setInputMediaType(isVid ? "video" : "image");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Theme observation for Light Mode / Dark Mode support
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const lightBgs: Record<string, string> = {
    "#2C3545": "#E2E8F0", // Soft Slate Blue
    "#8B0000": "#FEE2E2", // Soft Crimson
    "#FF9BA1": "#FFE4E6", // Soft Sakura Pink
    "#3EB165": "#DCFCE7", // Soft Emerald Green
  };

  const activeMember = membersList[activeIndex];
  const displayedMember = membersList[displayedIndex];
  const currentBg = isDark
    ? activeMember.bg
    : activeMember.bgLight || lightBgs[activeMember.bg] || activeMember.bg;

  return (
    <div
      className="relative w-full min-h-[720px] sm:min-h-[750px] rounded-[24px] overflow-hidden shadow-xl dark:shadow-2xl border border-slate-900/10 dark:border-white/20 transition-colors duration-650 ease-[cubic-bezier(0.4,0,0.2,1)] font-['Inter',sans-serif] select-none"
      style={{
        backgroundColor: currentBg,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
        {/* Grain overlay texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[50] opacity-20 dark:opacity-40"
          style={{
            backgroundImage: `url("${GRAIN_SVG_URI}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Top Header */}
        <header className="absolute top-5 left-5 right-5 z-[60] flex items-center justify-between bg-transparent border-none shadow-none">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white opacity-90 drop-shadow-sm flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
              YU STUDIO . DESIGN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute sound" : "Enable sound"}
              className="p-2 rounded-full border border-slate-900/30 dark:border-white/30 text-slate-900 dark:text-white/90 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/10 dark:hover:bg-white/10 hover:border-slate-900 dark:hover:border-white transition-all backdrop-blur-sm focus:outline-none cursor-pointer animate-none"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            <button
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              title={isInfoOpen ? "Ẩn bảng thông tin chi tiết" : "Hiện bảng thông tin & phong cách chi tiết"}
              className={`p-2 rounded-full border border-slate-900/30 dark:border-white/30 text-slate-900 dark:text-white/90 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/10 dark:hover:bg-white/10 hover:border-slate-900 dark:hover:border-white transition-all backdrop-blur-sm focus:outline-none cursor-pointer ${
                isInfoOpen ? "bg-slate-900/20 dark:bg-white/20 border-slate-900/60 dark:border-white/60" : ""
              }`}
            >
              <Edit3 size={15} className={isInfoOpen ? "" : "animate-pulse"} />
            </button>

            <div className="hidden sm:flex items-center bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-full px-2.5 py-1 border border-slate-900/15 dark:border-white/20">
              {membersList.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => {
                    if (idx !== activeIndex && !isAnimating) {
                      const dir = idx > activeIndex ? "next" : "prev";
                      navigate(dir);
                    }
                  }}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full transition-all cursor-pointer ${
                    idx === activeIndex
                      ? "bg-slate-900 text-white dark:bg-white dark:text-black font-bold shadow-sm"
                      : "text-slate-800 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/10 dark:hover:bg-white/10"
                  }`}
                >
                  {m.id} {m.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleShare}
              title="Share Showcase"
              className="relative p-2 rounded-full border border-slate-900/30 dark:border-white/30 text-slate-900 dark:text-white/90 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/10 dark:hover:bg-white/10 hover:border-slate-900 dark:hover:border-white transition-all backdrop-blur-sm focus:outline-none cursor-pointer"
            >
              <Share2 size={15} />
              {copiedNotification && (
                <span className="absolute right-0 top-10 bg-slate-900 text-white dark:bg-black/80 dark:text-white text-[10px] font-semibold px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm border border-slate-900/20 dark:border-white/20">
                  Link Copied!
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Giant Ghost Text "KPOP IDOL" */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]"
          style={{ top: "12%" }}
        >
          <h1
            className="uppercase font-normal text-slate-900/15 dark:text-white/20 text-center leading-none tracking-[-0.02em] whitespace-nowrap opacity-100"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(70px, 20vw, 220px)",
              textShadow: isDark
                ? "0 10px 40px rgba(0,0,0,0.08)"
                : "0 10px 30px rgba(0,0,0,0.04), 0 1px 4px rgba(255,255,255,0.8)",
            }}
          >
            KPOP IDOL
          </h1>
        </div>

        {/* Draggable Glass Info Card */}
        <style>{`
          @keyframes progress3s {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
        {isInfoOpen && (
          <div
            onMouseDown={handleCardMouseDown}
            onTouchStart={handleCardTouchStart}
            onTouchMove={handleCardTouchMove}
            onTouchEnd={handleCardTouchEnd}
            onMouseEnter={() => setIsHoveredCard(true)}
            onMouseLeave={() => setIsHoveredCard(false)}
            style={{
              transform: `translate(${cardPos.x}px, ${cardPos.y}px)`,
              cursor: isDraggingCard ? "grabbing" : "grab",
            }}
            className="absolute top-16 right-5 sm:top-20 sm:right-8 z-[60] w-64 sm:w-72 bg-white/75 dark:bg-white/15 backdrop-blur-xl border border-slate-900/15 dark:border-white/30 rounded-2xl p-4 shadow-xl dark:shadow-2xl text-slate-900 dark:text-white transition-all duration-300 hover:bg-white/85 dark:hover:bg-white/20 select-none touch-none overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-900/15 dark:border-white/20">
              <div className="flex items-center gap-1.5">
                <GripHorizontal size={16} className="text-slate-600 dark:text-white/70" />
                <Sparkles size={15} className="text-amber-500 dark:text-amber-300 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  {displayedMember.name} • INFO
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal();
                  }}
                  className="flex items-center gap-1 text-[10px] font-semibold text-slate-700 dark:text-white/80 bg-slate-900/10 dark:bg-black/30 hover:bg-slate-900/20 dark:hover:bg-black/60 border border-slate-900/20 dark:border-white/30 px-2 py-1 rounded-lg backdrop-blur-md transition-all cursor-pointer"
                  title="Chỉnh sửa thông tin thành viên"
                >
                  <Edit3 size={11} />
                  <span>Sửa</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoPlayEnabled(!isAutoPlayEnabled);
                  }}
                  className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                    isAutoPlayEnabled
                      ? "text-emerald-800 dark:text-emerald-300 bg-emerald-500/20 border border-emerald-500/40"
                      : "text-slate-700 dark:text-white/80 bg-slate-900/10 dark:bg-black/30 border border-slate-900/20 dark:border-white/30"
                  }`}
                  title={isAutoPlayEnabled ? "Tự động chuyển mỗi 3s (Đang Bật)" : "Tự động chuyển mỗi 3s (Đang Tắt)"}
                >
                  {isAutoPlayEnabled ? <Pause size={12} /> : <Play size={12} />}
                  <span>3s</span>
                </button>
              </div>
            </div>

            <div
              className="space-y-2 text-xs transition-opacity duration-200 ease-out"
              style={{ opacity: swapping ? 0 : 0.95 }}
            >
              {displayedMember.infoRows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-slate-900/5 dark:bg-black/15 hover:bg-slate-900/10 dark:hover:bg-black/25 px-2.5 py-1.5 rounded-lg border border-slate-900/10 dark:border-white/10 transition-colors"
                >
                  <span className="text-[11px] font-medium text-slate-800 dark:text-white/90 truncate">{row}</span>
                </div>
              ))}
            </div>

            {/* 3s Progress Bar Indicator */}
            {isAutoPlayEnabled && !isHoveredCard && !isDraggingCard && !isEditModalOpen && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900/10 dark:bg-white/10 overflow-hidden pointer-events-none">
                <div
                  key={displayedIndex}
                  className="h-full bg-slate-900/70 dark:bg-white/80"
                  style={{
                    animation: "progress3s 3s linear infinite",
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Carousel Figure Container */}
        <div className="absolute inset-0 z-[3] overflow-hidden">
          {membersList.map((member, i) => {
            let role: "center" | "left" | "right" | "back";
            if (i === activeIndex) role = "center";
            else if (i === (activeIndex + 3) % 4) role = "left";
            else if (i === (activeIndex + 1) % 4) role = "right";
            else role = "back";

            const isVideo = member.mediaType === "video";

            if (role === "center" && isVideo) {
              return (
                <div
                  key={member.id}
                  className="absolute inset-0 w-full h-full z-[3] overflow-hidden select-none pointer-events-none"
                  style={{
                    opacity: 1,
                    transition: "opacity 650ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <video
                    src={member.src}
                    autoPlay
                    loop={!isAutoPlayEnabled}
                    muted={!soundEnabled}
                    playsInline
                    onEnded={() => {
                      if (isAutoPlayEnabled && !isDraggingCard && !isHoveredCard && !isEditModalOpen) {
                        navigate("next");
                      }
                    }}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  {/* Dark gradient overlay for text readability & elegant backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/35 pointer-events-none" />
                </div>
              );
            }

            let transform = "translateX(-50%) scale(1)";
            let blur = "0px";
            let opacity = 1;
            let zIndex = 5;
            let left = "50%";
            let height = isMobile ? "20%" : "28%";
            let bottom = isMobile ? "25%" : "10%";

            if (role === "center") {
              transform = `translateX(-50%) scale(${isMobile ? 1.2 : 1.55})`;
              blur = "0px";
              opacity = 1;
              zIndex = 20;
              left = "50%";
              height = isMobile ? "65%" : "90%";
              bottom = "0%";
            } else if (role === "left") {
              transform = "translateX(-50%) scale(1)";
              blur = "2px";
              opacity = 0.85;
              zIndex = 10;
              left = isMobile ? "22%" : "28%";
              height = isMobile ? "22%" : "32%";
              bottom = isMobile ? "28%" : "12%";
            } else if (role === "right") {
              transform = "translateX(-50%) scale(1)";
              blur = "2px";
              opacity = 0.85;
              zIndex = 10;
              left = isMobile ? "78%" : "72%";
              height = isMobile ? "22%" : "32%";
              bottom = isMobile ? "28%" : "12%";
            } else if (role === "back") {
              transform = "translateX(-50%) scale(1)";
              blur = "4px";
              opacity = 1;
              zIndex = 5;
              left = "50%";
              height = isMobile ? "18%" : "24%";
              bottom = isMobile ? "28%" : "12%";
            }

            return (
              <div
                key={member.id}
                onClick={() => {
                  if (role === "left") navigate("prev");
                  if (role === "right") navigate("next");
                }}
                className={`absolute cursor-pointer transition-all duration-650 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  role !== "center" ? "hover:brightness-110" : ""
                } ${isVideo ? "rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30" : ""}`}
                style={{
                  aspectRatio: isVideo ? "16 / 10" : "0.6 / 1",
                  left,
                  height,
                  bottom,
                  transform,
                  filter: `blur(${blur})`,
                  opacity,
                  zIndex,
                  willChange: "transform, filter, opacity, left, height, bottom",
                  transitionProperty: "transform, filter, opacity, left, height, bottom",
                  transitionDuration: "650ms",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {isVideo ? (
                  <video
                    src={member.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                ) : (
                  <img
                    src={member.src}
                    alt={member.name}
                    draggable={false}
                    className="w-full h-full object-contain object-bottom select-none drop-shadow-2xl pointer-events-none"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Left Info & Controls */}
        <div
          className="absolute bottom-6 left-5 sm:left-12 z-[60]"
          style={{ maxWidth: "340px" }}
        >
          <div
            className="flex items-center gap-2 mb-1 transition-opacity duration-200 ease-out"
            style={{ opacity: swapping ? 0 : 0.85 }}
          >
            <span className="text-[10px] font-bold tracking-widest text-slate-900 dark:text-white/90 uppercase bg-white/40 dark:bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-slate-900/15 dark:border-white/10">
              {displayedMember.id} / 04
            </span>
            <span className="text-[10px] font-bold tracking-widest text-slate-900 dark:text-white/90 uppercase drop-shadow-sm">
              {displayedMember.role}
            </span>
          </div>

          <p
            className="font-bold uppercase mb-1.5 text-slate-900 dark:text-white tracking-[0.02em] text-xl sm:text-[24px] transition-opacity duration-200 ease-out drop-shadow-sm dark:drop-shadow"
            style={{ opacity: swapping ? 0 : 0.95 }}
          >
            {displayedMember.name}
          </p>

          <p
            className="hidden sm:block text-xs text-slate-800 dark:text-white/85 leading-[20px] mb-4 transition-opacity duration-200 ease-out font-medium"
            style={{ opacity: swapping ? 0 : 0.85 }}
          >
            {displayedMember.copy}
          </p>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("prev")}
              disabled={isAnimating}
              aria-label="Previous Member"
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-slate-900 dark:border-white bg-slate-900/10 dark:bg-transparent text-slate-900 dark:text-white flex items-center justify-center transition-all duration-150 ease-out hover:scale-[1.08] hover:bg-slate-900/20 dark:hover:bg-white/12 active:scale-95 disabled:opacity-50 focus:outline-none cursor-pointer"
            >
              <ArrowLeft size={24} strokeWidth={2.25} />
            </button>

            <button
              onClick={() => navigate("next")}
              disabled={isAnimating}
              aria-label="Next Member"
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-slate-900 dark:border-white bg-slate-900/10 dark:bg-transparent text-slate-900 dark:text-white flex items-center justify-center transition-all duration-150 ease-out hover:scale-[1.08] hover:bg-slate-900/20 dark:hover:bg-white/12 active:scale-95 disabled:opacity-50 focus:outline-none cursor-pointer"
            >
              <ArrowRight size={24} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom Right Link "DISCOVER" */}
        <div className="absolute bottom-6 right-5 sm:right-8 z-[60]">
          <a
            href="#discover"
            onClick={(e) => e.preventDefault()}
            className="group flex items-center gap-2 text-slate-900 dark:text-white uppercase no-underline transition-opacity duration-200 ease-out hover:opacity-100 opacity-95 focus:outline-none drop-shadow-sm"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(20px, 3.5vw, 44px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            <span>DISCOVER</span>
            <ArrowRight
              className="w-5 h-5 sm:w-7 sm:h-7 transition-transform duration-200 ease-out group-hover:translate-x-1.5"
              strokeWidth={2.25}
            />
          </a>
        </div>

        {/* Edit Modal Dialog */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-neutral-900 border border-white/20 rounded-2xl p-6 shadow-2xl text-white">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Edit3 className="text-sky-400" size={22} />
                <h3 className="text-lg font-bold">Edit Profile & Card - {activeMember.name}</h3>
              </div>

              <div className="space-y-4 text-xs">
                {/* Character Name, Role & Slogan / Copy */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-white/80 mb-1">Character Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-neutral-800 border border-white/20 rounded-xl px-3 py-2 focus:outline-none focus:border-sky-400 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-white/80 mb-1">Role / Position</label>
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="w-full bg-neutral-800 border border-white/20 rounded-xl px-3 py-2 focus:outline-none focus:border-sky-400 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-white/80 mb-1">Slogan / Description</label>
                  <textarea
                    value={editCopy}
                    onChange={(e) => setEditCopy(e.target.value)}
                    rows={2}
                    className="w-full bg-neutral-800 border border-white/20 rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-400 text-white text-xs resize-none"
                  />
                </div>

                {/* THEME & STYLE EDIT SECTION (Giao Diện Sáng & Tối) */}
                <div className="bg-neutral-800/40 p-3 rounded-xl border border-white/10 space-y-3">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                    Thiết Kế Phong Cách & Màu Nền
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-white/85 mb-1.5">
                        Màu Nền Giao Diện Tối (Dark)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={editBg}
                          onChange={(e) => setEditBg(e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-white/10 overflow-hidden"
                        />
                        <input
                          type="text"
                          value={editBg}
                          onChange={(e) => setEditBg(e.target.value)}
                          className="bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-white text-xs w-24 uppercase focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-white/85 mb-1.5">
                        Màu Nền Giao Diện Sáng (Light)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={editBgLight}
                          onChange={(e) => setEditBgLight(e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-white/10 overflow-hidden"
                        />
                        <input
                          type="text"
                          value={editBgLight}
                          onChange={(e) => setEditBgLight(e.target.value)}
                          className="bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-white text-xs w-24 uppercase focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 Glass Card Info Rows */}
                <div>
                  <label className="block font-semibold text-white/80 mb-1">
                    Glass Card Info (5 Rows)
                  </label>
                  <div className="space-y-1.5">
                    {editInfoRows.map((rowVal, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={rowVal}
                        onChange={(e) => {
                          const updated = [...editInfoRows];
                          updated[idx] = e.target.value;
                          setEditInfoRows(updated);
                        }}
                        placeholder={`Row ${idx + 1}`}
                        className="w-full bg-neutral-800 border border-white/15 rounded-lg px-3 py-1.5 focus:outline-none focus:border-sky-400 text-white text-xs"
                      />
                    ))}
                  </div>
                </div>

                {/* Media Upload & Preview */}
                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-white/80">
                      Character Media (Image / GIF / Video)
                    </label>
                    {inputMediaType === "video" && (
                      <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-medium">
                        Full Screen Video Mode
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-center bg-neutral-800/80 rounded-xl p-1.5 border border-white/10 h-40 overflow-hidden relative mb-2.5">
                    {inputMediaType === "video" ? (
                      <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-black">
                        <video
                          src={inputUrl || activeMember.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white/90 border border-white/20">
                          Hiển thị full màn hình khi kích hoạt
                        </div>
                      </div>
                    ) : (
                      <img
                        src={inputUrl || activeMember.src}
                        alt="Preview"
                        className="h-full object-contain drop-shadow-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = activeMember.src;
                        }}
                      />
                    )}
                  </div>

                  <label className="flex items-center justify-center gap-2 w-full p-2.5 border-2 border-dashed border-white/20 hover:border-white/50 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all font-medium">
                    <Upload size={16} />
                    <span>Tải tệp Ảnh / GIF / Video (MP4, WebM)...</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center gap-2 my-2">
                    <div className="h-[1px] bg-white/10 flex-1" />
                    <span className="text-[10px] uppercase text-white/40 font-semibold">Hoặc đường dẫn URL</span>
                    <div className="h-[1px] bg-white/10 flex-1" />
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => handleUrlInputChange(e.target.value)}
                      placeholder="https://example.com/video.mp4 hoặc hình ảnh .png / .jpg"
                      className="w-full bg-neutral-800 border border-white/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400 text-white placeholder-white/30"
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-200">
                        <input
                          type="radio"
                          name="mediaType"
                          checked={inputMediaType === "image"}
                          onChange={() => setInputMediaType("image")}
                        />
                        <span>Hình ảnh / GIF</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-200">
                        <input
                          type="radio"
                          name="mediaType"
                          checked={inputMediaType === "video"}
                          onChange={() => setInputMediaType("video")}
                        />
                        <span>Video (Full màn hình)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleResetMembers}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
                  >
                    Khôi phục mặc định
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveMemberData}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-white/90 transition-all shadow-md cursor-pointer"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
