import React, { useState, useEffect, useRef } from "react";
import {
  Info,
  Globe,
  AlertTriangle,
  Target,
  Network,
  ListChecks,
  UserCheck,
  Monitor,
  TrendingUp,
  Award,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  BarChart,
  Map,
  Heart,
  ShieldCheck,
  Users,
  Zap,
  Clock,
  MessageSquare,
  FileText,
  Compass,
  Tag,
  Sparkles,
  PhoneCall,
  PhoneOutgoing,
  ShieldAlert,
  Sliders,
  Check,
  CheckCircle,
  Star,
  CheckSquare,
  Eye,
  Rocket,
  Trophy,
  Activity,
  Bot,
  X,
  RefreshCw,
  Printer,
  ArrowUp,
  SlidersHorizontal,
  Folder,
  Briefcase,
  Layers
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { playUiSound } from "../../../lib/sound";

export const CSKHProjectDetails: React.FC = () => {
  // Modal Simulation State
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [selectedSimOption, setSelectedSimOption] = useState<number | null>(null);

  // Active Tool Tab State
  const [activeToolTab, setActiveToolTab] = useState<"calc" | "qa" | "csat">("calc");

  // Headcount Calculator Inputs
  const [volume, setVolume] = useState<number>(15000);
  const [aht, setAht] = useState<number>(6);
  const [hours, setHours] = useState<number>(8);
  const [days, setDays] = useState<number>(22);
  const [occupancy, setOccupancy] = useState<number>(80);
  const [shrinkage, setShrinkage] = useState<number>(15);

  // QA Scorecard Checkboxes
  const [qaC1, setQaC1] = useState(true);
  const [qaC2, setQaC2] = useState(true);
  const [qaC3, setQaC3] = useState(true);
  const [qaC4, setQaC4] = useState(true);
  const [qaC5, setQaC5] = useState(true);
  const [qaFatal, setQaFatal] = useState(false);

  // CSAT & NPS Inputs
  const [csatGood, setCsatGood] = useState<number>(484);
  const [csatTotal, setCsatTotal] = useState<number>(500);
  const [npsPromoters, setNpsPromoters] = useState<number>(350);
  const [npsPassives, setNpsPassives] = useState<number>(110);
  const [npsDetractors, setNpsDetractors] = useState<number>(40);

  // Mindmap Connector Curves
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>(["", "", "", ""]);

  const updateMindmapPaths = () => {
    if (!containerRef.current || !centerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    const cX = centerRect.left + centerRect.width / 2 - containerRect.left;
    const cY = centerRect.top + centerRect.height / 2 - containerRect.top;

    const refs = [p1Ref, p2Ref, p3Ref, p4Ref];
    const newPaths = refs.map((ref) => {
      if (!ref.current) return "";
      const cardRect = ref.current.getBoundingClientRect();
      let cardX = cardRect.left + cardRect.width / 2 - containerRect.left;
      let cardY = cardRect.top + cardRect.height / 2 - containerRect.top;

      if (cardX < cX) {
        cardX = cardRect.right - containerRect.left;
      } else {
        cardX = cardRect.left - containerRect.left;
      }

      const deltaX = Math.abs(cardX - cX) * 0.5;
      const controlX1 = cardX < cX ? cX - deltaX : cX + deltaX;
      const controlX2 = cardX < cX ? cardX + deltaX : cardX - deltaX;

      return `M ${cX} ${cY} C ${controlX1} ${cY}, ${controlX2} ${cardY}, ${cardX} ${cardY}`;
    });
    setPaths(newPaths);
  };

  useEffect(() => {
    updateMindmapPaths();
    window.addEventListener("resize", updateMindmapPaths);
    return () => window.removeEventListener("resize", updateMindmapPaths);
  }, []);

  // Recalculate paths when active tab changes, as components resize
  useEffect(() => {
    const timer = setTimeout(updateMindmapPaths, 100);
    return () => clearTimeout(timer);
  }, [activeToolTab]);

  // Calculations: Headcount
  const totalWorkloadMinutes = volume * aht;
  const totalWorkloadHours = Math.round(totalWorkloadMinutes / 60);
  const netHoursPerAgent = hours * days * (occupancy / 100) * (1 - shrinkage / 100);
  const agentsNeeded = netHoursPerAgent > 0 ? Math.ceil(totalWorkloadHours / netHoursPerAgent) : 0;
  const tlNeeded = Math.max(1, Math.ceil(agentsNeeded / 10));
  const qaNeeded = Math.max(1, Math.ceil(agentsNeeded / 15));
  const totalHeadcount = agentsNeeded + tlNeeded + qaNeeded;

  // Calculations: QA
  const getQAScore = () => {
    if (qaFatal) return { score: 0, label: "FATAL ERROR", color: "bg-red-500" };
    let score = 0;
    if (qaC1) score += 15;
    if (qaC2) score += 20;
    if (qaC3) score += 35;
    if (qaC4) score += 20;
    if (qaC5) score += 10;

    let label = "Rất Tốt";
    let color = "bg-emerald-500";
    if (score < 70) {
      label = "Cần Đào Tạo";
      color = "bg-red-500";
    } else if (score < 85) {
      label = "Đạt Yêu Cầu";
      color = "bg-amber-500";
    }
    return { score, label, color };
  };
  const qaResult = getQAScore();

  // Calculations: CSAT & NPS
  const csatVal = csatTotal > 0 ? Math.min(100, Math.round((csatGood / csatTotal) * 1000) / 10) : 0;
  const npsTotal = npsPromoters + npsPassives + npsDetractors;
  const npsScore = npsTotal > 0 ? Math.round(((npsPromoters - npsDetractors) / npsTotal) * 100) : 0;

  // Accordion open section states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "00": true,
    "01": true,
    "02": true,
    "03": true,
    "04": true,
    "05": true,
    "06": true,
    "07": true,
    "08": true,
    "09": true,
  });

  const toggleSection = (id: string) => {
    playUiSound("click");
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    playUiSound("click");
    setOpenSections({
      "00": true,
      "01": true,
      "02": true,
      "03": true,
      "04": true,
      "05": true,
      "06": true,
      "07": true,
      "08": true,
      "09": true,
    });
  };

  const collapseAll = () => {
    playUiSound("click");
    setOpenSections({
      "00": false,
      "01": false,
      "02": false,
      "03": false,
      "04": false,
      "05": false,
      "06": false,
      "07": false,
      "08": false,
      "09": false,
    });
  };

  const highlightPillar = (id: string) => {
    toggleSection("05");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-4", "ring-sky-500", "scale-[1.02]");
      setTimeout(() => el.classList.remove("ring-4", "ring-sky-500", "scale-[1.02]"), 2500);
    }
  };

  return (
    <div className="space-y-10">
      {/* Mindmap Card */}
      <article className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/40 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/40 sm:p-8">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4 border-b border-slate-200/60 pb-5 dark:border-slate-700/60 sm:flex-row sm:items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg ring-2 ring-white/50 font-black">
              <Network size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                  Sơ Đồ Tư Duy Kiến Trúc CSKH
                </h3>
                <span className="rounded-full border border-sky-500/30 bg-sky-500/20 px-2.5 py-0.5 text-xs font-black uppercase text-sky-700 dark:text-sky-300">
                  Interactive
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Bản đồ tương tác kết nối 4 Trụ cột chiến lược & 6 Khối chức năng chuyên trách
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={() => {
                playUiSound("click");
                updateMindmapPaths();
              }}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-200/60 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-white dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-200"
            >
              <RefreshCw size={14} className="text-sky-500" />
              <span>Căn Chỉnh Luồng Lines</span>
            </button>
          </div>
        </div>

        {/* Quick Pillar Filter Grid */}
        <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            onClick={() => highlightPillar("pillar-1")}
            className="group cursor-pointer rounded-2xl border border-sky-500/30 bg-white/50 p-3.5 hover:bg-sky-500/10 dark:bg-slate-950/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                <Compass size={10} className="text-amber-300" /> TRỤ CỘT 01
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-500">
                <Compass size={16} />
              </div>
            </div>
            <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">Tầm Nhìn & Sứ Mệnh</div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">6 Giá trị cốt lõi & Tuyên ngôn</p>
          </div>

          <div
            onClick={() => highlightPillar("pillar-2")}
            className="group cursor-pointer rounded-2xl border border-purple-500/30 bg-white/50 p-3.5 hover:bg-purple-500/10 dark:bg-slate-950/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                <Network size={10} className="text-pink-300" /> TRỤ CỘT 02
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-500">
                <Network size={16} />
              </div>
            </div>
            <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">Sơ Đồ 6 Khối CSKH</div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Inbound, Outbound, Escalation</p>
          </div>

          <div
            onClick={() => highlightPillar("pillar-3")}
            className="group cursor-pointer rounded-2xl border border-emerald-500/30 bg-white/50 p-3.5 hover:bg-emerald-500/10 dark:bg-slate-950/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                <Users size={10} className="text-emerald-200" /> TRỤ CỘT 03
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-500">
                <Users size={16} />
              </div>
            </div>
            <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">Định Biên & Tuyển Dụng</div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Ma trận ASK & Tuyển dụng 5 bước</p>
          </div>

          <div
            onClick={() => highlightPillar("pillar-4")}
            className="group cursor-pointer rounded-2xl border border-orange-500/30 bg-white/50 p-3.5 hover:bg-orange-500/10 dark:bg-slate-950/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-md bg-gradient-to-r from-orange-600 to-amber-500 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                <Heart size={10} className="text-rose-200" /> TRỤ CỘT 04
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/20 text-orange-500">
                <Heart size={16} />
              </div>
            </div>
            <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">Văn Hóa Customer-Centric</div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Lắng nghe, thấu cảm & trao quyền</p>
          </div>
        </div>

        {/* Visual Canvas Container */}
        <div
          ref={containerRef}
          className="relative mt-8 flex min-h-[620px] w-full items-center justify-center overflow-x-auto rounded-3xl bg-slate-900/5 p-4 dark:bg-slate-950/60 sm:p-8 border border-slate-200/80 dark:border-slate-800/80"
        >
          {/* SVG Connector Layer */}
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="grad-sky" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path d={paths[0]} stroke="url(#grad-sky)" strokeWidth="3" fill="none" className="stroke-dasharray-[8_4]" />
            <path d={paths[1]} stroke="url(#grad-purple)" strokeWidth="3" fill="none" className="stroke-dasharray-[8_4]" />
            <path d={paths[2]} stroke="url(#grad-emerald)" strokeWidth="3" fill="none" className="stroke-dasharray-[8_4]" />
            <path d={paths[3]} stroke="url(#grad-orange)" strokeWidth="3" fill="none" className="stroke-dasharray-[8_4]" />
          </svg>

          {/* Mindmap Tree Grid */}
          <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-6 md:grid-cols-12">
            {/* Left Column: Pillar 1 & Pillar 3 */}
            <div className="space-y-8 md:col-span-4 flex flex-col justify-center">
              <div
                ref={p1Ref}
                onClick={() => highlightPillar("pillar-1")}
                className="group cursor-pointer rounded-2xl border-2 border-sky-500/50 bg-white/80 p-4 shadow-md dark:bg-slate-900/80"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/30">
                    <Compass size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">Trụ Cột 01</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">Tầm Nhìn & Sứ Mệnh</h4>
                  </div>
                </div>
                <div className="relative mt-3 h-20 overflow-hidden rounded-xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" alt="Tầm nhìn CSKH" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                    <p className="text-[11px] font-semibold text-white">Tuyên ngôn đối tác tin cậy & 6 Giá trị cốt lõi</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-bold">
                  <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-sky-700 dark:text-sky-300">Tận tâm</span>
                  <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-sky-700 dark:text-sky-300">Lắng nghe</span>
                  <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-sky-700 dark:text-sky-300">Chủ động</span>
                </div>
              </div>

              <div
                ref={p3Ref}
                onClick={() => highlightPillar("pillar-3")}
                className="group cursor-pointer rounded-2xl border-2 border-emerald-500/50 bg-white/80 p-4 shadow-md dark:bg-slate-900/80"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                    <Users size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Trụ Cột 03</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">Định Biên & Tuyển Dụng</h4>
                  </div>
                </div>
                <div className="relative mt-3 h-20 overflow-hidden rounded-xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" alt="Tuyển dụng CSKH" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                    <p className="text-[11px] font-semibold text-white">Khung năng lực 3 cấp & 5 Bước HR</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-bold">
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Nhân viên</span>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Leader</span>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Manager</span>
                </div>
              </div>
            </div>

            {/* Center Hub Column */}
            <div className="flex justify-center py-4 md:col-span-4">
              <div
                ref={centerRef}
                className="group relative flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700 p-6 text-center text-white shadow-2xl dark:border-slate-700 sm:h-72 sm:w-72 ring-8 ring-sky-400/20"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-md">
                  <Monitor size={28} className="text-amber-300" />
                </div>
                <h3 className="text-sm font-black uppercase leading-snug sm:text-base">
                  PHÒNG CHĂM SÓC
                  <br />
                  KHÁCH HÀNG
                </h3>
                <p className="my-1 text-[11px] font-medium text-sky-100">Value Center & Bệ Phóng CX</p>
                <div className="rounded-full bg-white/20 border border-white/30 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide">
                  Master Plan CSKH
                </div>
              </div>
            </div>

            {/* Right Column: Pillar 2 & Pillar 4 */}
            <div className="space-y-8 md:col-span-4 flex flex-col justify-center">
              <div
                ref={p2Ref}
                onClick={() => highlightPillar("pillar-2")}
                className="group cursor-pointer rounded-2xl border-2 border-purple-500/50 bg-white/80 p-4 shadow-md hover:border-purple-400 dark:bg-slate-900/80"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
                    <Network size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">Trụ Cột 02</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">Sơ Đồ Tổ Chức 6 Khối</h4>
                  </div>
                </div>
                <div className="relative mt-3 h-20 overflow-hidden rounded-xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop" alt="Cấu trúc tổ chức CSKH" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                    <p className="text-[11px] font-semibold text-white">6 Khối chuyên trách & Phân cấp 3 Tuyến</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-bold">
                  <span className="rounded-md bg-purple-500/15 px-2 py-0.5 text-purple-700 dark:text-purple-300">Inbound</span>
                  <span className="rounded-md bg-purple-500/15 px-2 py-0.5 text-purple-700 dark:text-purple-300">Outbound</span>
                  <span className="rounded-md bg-purple-500/15 px-2 py-0.5 text-purple-700 dark:text-purple-300">Escalation</span>
                </div>
              </div>

              <div
                ref={p4Ref}
                onClick={() => highlightPillar("pillar-4")}
                className="group cursor-pointer rounded-2xl border-2 border-orange-500/50 bg-white/80 p-4 shadow-md hover:border-orange-400 dark:bg-slate-900/80"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-500/30">
                    <Heart size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">Trụ Cột 04</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">Văn Hóa Customer-Centric</h4>
                  </div>
                </div>
                <div className="relative mt-3 h-20 overflow-hidden rounded-xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=400&auto=format&fit=crop" alt="Văn hóa Customer Centric" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                    <p className="text-[11px] font-semibold text-white">Trao quyền tuyến đầu & CRM hội tụ</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-bold">
                  <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-orange-700 dark:text-orange-300">Đồng cảm</span>
                  <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-orange-700 dark:text-orange-300">Trao quyền</span>
                  <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-orange-700 dark:text-orange-300">Ghi nhận</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Accordion Cards Sections list */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 dark:border-slate-700/60">
          <div className="flex items-center gap-2 text-xs font-black tracking-wider text-slate-500 uppercase">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span>Cấu trúc Chi Tiết Dự Án</span>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {/* SECTION 00 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-indigo-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Layers size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  00 · YÊU CẦU ĐẶT RA CỦA DỰ ÁN
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-indigo-500/5 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Xác định rõ ràng các mục tiêu bài toán, bài học vận hành và tiêu chuẩn chất lượng trọng tâm mà phòng Chăm sóc Khách hàng cần giải quyết ngay từ giai đoạn khởi tạo nhằm tạo nền tảng vững chắc cho sự phát triển lâu dài của doanh nghiệp.
              </p>

              {/* Metric Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">100%</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Phủ Kênh CSKH</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Tích hợp đa kênh Omnichannel</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">&lt; 15p</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Thời Gian Phản Hồi</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Cam kết SLA chuẩn hóa</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">&ge; 95%</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Chỉ Số CSAT Target</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Đo lường độ hài lòng khách hàng</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">01</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Bộ Chuẩn SOP</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Quy trình vận hành đồng bộ</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-800 dark:text-indigo-300">
                    <Layers size={14} className="text-indigo-500" /> XÂY DỰNG TỪ SỐ 0
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Thiết lập toàn bộ sơ đồ tổ chức, chức năng nhiệm vụ, mô hình phân cấp và định biên nhân sự phù hợp với quy mô phát triển doanh nghiệp.
                  </p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-800 dark:text-indigo-300">
                    <CheckCircle size={14} className="text-indigo-500" /> CHUẨN HÓA QUY TRÌNH SOP & SLA
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Xây dựng cẩm nang vận hành, quy trình xử lý khiếu nại, kịch bản giao tiếp và cam kết thời gian phản hồi minh bạch cho từng kênh dịch vụ.
                  </p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-800 dark:text-indigo-300">
                    <Sliders size={14} className="text-indigo-500" /> ỨNG DỤNG CÔNG NGHỆ CRM
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Triển khai hạ tầng Helpdesk/Ticket, đài tổng đài IP đàm thoại và Omnichannel hội tụ (Hotline, Chat, Zalo, Mail, Social) đồng bộ.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 01 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-sky-500 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Info size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  01 · TỔNG QUAN DỰ ÁN & TẦM NHÌN
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-sky-500/5 space-y-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                      <tr className="hover:bg-slate-500/5">
                        <td className="p-3.5 font-bold w-1/4 text-sky-600 dark:text-sky-400 flex items-center gap-2 text-xs">
                          <Folder size={14} className="text-sky-500" /> Tên dự án
                        </td>
                        <td className="p-3.5 font-extrabold text-slate-900 dark:text-white text-xs">
                          1.1 Xây Dựng & Vận Hành Phòng Dịch Vụ Khách Hàng
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-500/5">
                        <td className="p-3.5 font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 text-xs">
                          <Briefcase size={14} className="text-purple-500" /> Nhóm dự án
                        </td>
                        <td className="p-3.5 text-xs">Chiến lược & Quản lý (Strategy & Operations)</td>
                      </tr>
                      <tr className="hover:bg-slate-500/5">
                        <td className="p-3.5 font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 text-xs">
                          <Tag size={14} className="text-pink-500" /> Thẻ (Tags)
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400 text-xs">
                          #CS_Strategy #Structure #CSStrategy #CSKH #CustomerCentric
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-500/5">
                        <td className="p-3.5 font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 text-xs">
                          <UserCheck size={14} className="text-emerald-500" /> Vai trò thực hiện
                        </td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white text-xs">
                          Senior Project Architect + Customer Experience Strategist
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Vision / Mission grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex h-full flex-col justify-between p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-2">
                    <div className="flex items-center space-x-1.5 text-sky-700 dark:text-sky-300 font-bold text-xs">
                      <Eye size={16} />
                      <span>TẦM NHÌN (VISION)</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      &quot;Trở thành đối tác tin cậy, dẫn đầu về trải nghiệm khách hàng trong ngành.&quot;
                    </p>
                  </div>
                  <div className="flex h-full flex-col justify-between p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                    <div className="flex items-center space-x-1.5 text-purple-700 dark:text-purple-300 font-bold text-xs">
                      <Rocket size={16} />
                      <span>SỰ MỆNH (MISSION)</span>
                    </div>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-200 text-[11px] font-medium">
                      <li>• Giải quyết vấn đề nhanh chóng &amp; triệt để</li>
                      <li>• Tạo dựng lòng trung thành bền vững</li>
                      <li>• Thu thập insight khách hàng đóng góp cải tiến sản phẩm</li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 02 */}
          <div id="pillar-2" className="flex flex-col overflow-hidden rounded-[20px] border-2 border-purple-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Network size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  02 · THIẾT KẾ CƠ CẤU TỔ CHỨC & MÔ HÌNH VẬN HÀNH
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-purple-500/5 space-y-6">
                <div className="text-center space-y-1">
                  <h5 className="text-sm font-black text-slate-900 dark:text-white uppercase">Sơ đồ cơ cấu tổ chức 6 Khối</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Phân cấp tinh gọn từ Quản lý đến Agent chuyên biệt</p>
                </div>

                <div className="flex justify-center">
                  <div className="rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 p-3.5 text-center text-white w-72 shadow-md">
                    <span className="text-[10px] uppercase font-black tracking-wider opacity-80">CẤP CAO NHẤT</span>
                    <div className="font-bold text-sm">Giám Đốc Dịch Vụ Khách Hàng</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-sky-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-sky-600">Khối 01: Inbound & Voice</span>
                    <p className="text-[11px] text-slate-500 mt-1">Tiếp nhận cuộc gọi nóng, giải đáp thông tin tức thời và xử lý Ticket cơ bản.</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-emerald-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-emerald-600">Khối 02: Omnichannel Chat</span>
                    <p className="text-[11px] text-slate-500 mt-1">Hỗ trợ Livechat Website, Fanpage, Zalo OA và hộp thư Email hội tụ.</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-purple-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-purple-600">Khối 03: Outbound Care</span>
                    <p className="text-[11px] text-slate-500 mt-1">Gọi thăm hỏi chủ động, chăm sóc tập khách VIP và đo lường CSAT/NPS định kỳ.</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-red-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-red-600">Khối 04: Escalation (Khiếu Nại)</span>
                    <p className="text-[11px] text-slate-500 mt-1">Giải quyết khiếu nại sâu, sự cố nhạy cảm và khủng hoảng truyền thông.</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-amber-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-amber-600">Khối 05: QA & Training</span>
                    <p className="text-[11px] text-slate-500 mt-1">Chấm điểm chất lượng đàm thoại, đào tạo chuyên môn Onboarding 14 ngày.</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-indigo-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-indigo-600">Khối 06: Data & CRM System</span>
                    <p className="text-[11px] text-slate-500 mt-1">Xây dựng báo cáo realtime, phân tích Voice of Customer & bảo trì CRM.</p>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 03 */}
          <div id="pillar-3" className="flex flex-col overflow-hidden rounded-[20px] border-2 border-emerald-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Users size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  03 · ĐỊNH BIÊN NHÂN SỰ & KHUNG NĂNG LỰC
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-emerald-500/5 space-y-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-emerald-500/10 text-slate-800 dark:text-slate-200 font-bold text-xs border-b border-emerald-500/20">
                        <th className="p-3">Vị trí nhân sự</th>
                        <th className="p-3">Yêu cầu khung năng lực cốt lõi</th>
                        <th className="p-3">Trọng tâm đánh giá performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-600 dark:text-slate-300">
                      <tr>
                        <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">Agent (Nhân viên)</td>
                        <td className="p-3">Kỹ năng giao tiếp, xử lý vấn đề, kiến thức sản phẩm, đồng cảm sâu sắc.</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Thái độ & điểm CSAT, FCR</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-purple-700 dark:text-purple-400">Team Leader (Trưởng nhóm)</td>
                        <td className="p-3">Quản lý đội nhóm, coaching chuyên môn, xử lý sự cố Escalation nâng cao.</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Hiệu suất nhóm & Cam kết SLA</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-sky-700 dark:text-sky-400">Manager (Quản lý)</td>
                        <td className="p-3">Hoạch định chiến lược, thiết kế quy trình, phân tích hệ thống & tối ưu ROI.</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Hiệu quả tài chính & NPS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>

          {/* SECTION 04 */}
          <div id="pillar-4" className="flex flex-col overflow-hidden rounded-[20px] border-2 border-orange-500 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-orange-500 via-amber-500 to-rose-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Heart size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  04 · VĂN HÓA CUSTOMER-CENTRIC & HỆ THỐNG CRM
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-orange-500/5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-orange-600 uppercase">LẮNG NGHE</span>
                    <p className="text-[11px] text-slate-500 mt-1">Nắm bắt chính xác phản hồi từ khách hàng và thu thập lỗi phần mềm.</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-orange-600 uppercase">ĐỒNG CẢM</span>
                    <p className="text-[11px] text-slate-500 mt-1">Luôn đứng ở góc nhìn khách hàng để giải quyết mâu thuẫn một cách êm đẹp.</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-orange-600 uppercase">TRAO QUYỀN</span>
                    <p className="text-[11px] text-slate-500 mt-1">Cho phép nhân viên bồi thường trực tiếp trong khung hạn mức bồi thường SOP.</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-orange-600 uppercase">GHI NHẬN</span>
                    <p className="text-[11px] text-slate-500 mt-1">Biểu dương xuất sắc các ca hỗ trợ vượt kỳ vọng của khách hàng hàng tuần.</p>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 05 */}
          <div id="pillar-1" className="flex flex-col overflow-hidden rounded-[20px] border-2 border-sky-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Target size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  05 · MÔ HÌNH & GIẢI PHÁP CHIẾN LƯỢC
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-sky-500/5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div id="pillar-1" className="flex h-full flex-col justify-between rounded-xl border border-sky-300 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 space-y-2">
                    <div className="relative h-24 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" alt="Tầm nhìn" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <span className="font-extrabold text-xs text-white uppercase tracking-wider bg-sky-600/80 px-2.5 py-1 rounded">01 · TẦM NHÌN & SỨ MỆNH</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>Tập trung:</strong> Xây dựng tuyên ngôn Tầm nhìn đối tác tin cậy, định vị dịch vụ bệ phóng trải nghiệm bền vững và bộ 6 giá trị cốt lõi làm kim chỉ nam.
                    </p>
                  </div>

                  <div id="pillar-2" className="flex h-full flex-col justify-between rounded-xl border border-purple-300 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 space-y-2">
                    <div className="relative h-24 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop" alt="Sơ đồ" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <span className="font-extrabold text-xs text-white uppercase tracking-wider bg-purple-600/80 px-2.5 py-1 rounded">02 · THIẾT KẾ SƠ ĐỒ TỔ CHỨC</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>Tập trung:</strong> Sắp xếp 6 khối chuyên trách (Inbound, Outbound, Escalation, Social, QA, CRM System) kết hợp quy trình luân chuyển Ticket 3 Tuyến thông minh.
                    </p>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 06 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-amber-500 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Clock size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  06 · TRIỂN KHAI & VẬN HÀNH
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-orange-500/5 space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 text-center font-bold">
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">1</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">Khảo sát & Đánh giá</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">2</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">Thiết kế Sơ đồ</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">3</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">Tuyển dụng 5 Bước</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">4</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">Đào tạo Onboarding</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">5</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">Vận hành Thử</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl bg-amber-600 text-white space-y-1 shadow">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-white text-amber-600 text-xs font-black">6</div>
                    <div className="text-[10px] uppercase">Bàn giao & Tối ưu</div>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 07 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-teal-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-teal-600 to-emerald-500 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <UserCheck size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  07 · VAI TRÒ & ĐÓNG GÓP CỦA DỰ ÁN
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-emerald-500/5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-teal-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950 space-y-2">
                    <span className="font-extrabold text-xs text-teal-700 dark:text-teal-400 uppercase">Trách nhiệm chính:</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
                      <li>Nghiên cứu thị trường và quy hoạch toàn bộ cơ cấu vận hành phòng CSKH.</li>
                      <li>Trực tiếp xây dựng giáo trình đào tạo, tổ chức kiểm tra năng lực nhân viên tuyến đầu.</li>
                      <li>Giám sát ca trực Hotline và bảo vệ tỷ lệ tuân thủ SLA phản hồi.</li>
                    </ul>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-teal-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950 space-y-2">
                    <span className="font-extrabold text-xs text-teal-700 dark:text-teal-400 uppercase">Quyết định then chốt:</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
                      <li>Áp dụng chính sách &quot;Ủy quyền bồi thường ngay tuyến đầu&quot; cho Agent có năng lực tốt.</li>
                      <li>Lựa chọn giải pháp tổng đài đa kênh Omnichannel tập trung.</li>
                      <li>Thiết kế hệ thống báo cáo kết quả Realtime cập nhật liên tục.</li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 08 (INTERACTIVE TOOLS) */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-blue-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <SlidersHorizontal size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  08 · HỆ THỐNG & CÔNG CỤ INTERACTIVE
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-blue-500/5 space-y-6">
                <div className="inline-flex flex-wrap items-center gap-2.5 p-1 bg-transparent mx-2.5 my-2.5">
                  <button
                    onClick={() => {
                      playUiSound("click");
                      setActiveToolTab("calc");
                    }}
                    className={cn(
                      "px-3.5 py-2 m-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer",
                      activeToolTab === "calc"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
                    )}
                  >
                    <Sliders size={14} /> 1. Định Biên Headcount
                  </button>
                  <button
                    onClick={() => {
                      playUiSound("click");
                      setActiveToolTab("qa");
                    }}
                    className={cn(
                      "px-3.5 py-2 m-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer",
                      activeToolTab === "qa"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
                    )}
                  >
                    <CheckSquare size={14} /> 2. Chấm Điểm QA
                  </button>
                  <button
                    onClick={() => {
                      playUiSound("click");
                      setActiveToolTab("csat");
                    }}
                    className={cn(
                      "px-3.5 py-2 m-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer",
                      activeToolTab === "csat"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
                    )}
                  >
                    <Heart size={14} /> 3. Đo Lường CSAT / NPS
                  </button>
                </div>

                {/* TAB 1: HEADCOUNT */}
                {activeToolTab === "calc" && (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 lg:col-span-7 space-y-4">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Thông Số Đầu Vào</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Ticket/Cuộc gọi (tháng):</label>
                          <input
                            type="number"
                            value={volume}
                            onChange={(e) => setVolume(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Thời gian xử lý TB AHT (phút):</label>
                          <input
                            type="number"
                            step="0.5"
                            value={aht}
                            onChange={(e) => setAht(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Giờ làm việc/ngày (giờ):</label>
                          <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Số ngày làm việc/tháng (ngày):</label>
                          <input
                            type="number"
                            value={days}
                            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Occupancy (%):</label>
                          <input
                            type="number"
                            value={occupancy}
                            onChange={(e) => setOccupancy(Math.min(100, Math.max(10, parseInt(e.target.value) || 0)))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Shrinkage (%):</label>
                          <input
                            type="number"
                            value={shrinkage}
                            onChange={(e) => setShrinkage(Math.min(90, Math.max(0, parseInt(e.target.value) || 0)))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/20 lg:col-span-5 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-400 tracking-wider">Định Biên Khuyến Nghị</span>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-white/70 dark:bg-slate-800/70 text-xs">
                          <span className="text-slate-500">Tổng giờ công tháng:</span>
                          <span className="font-bold">{totalWorkloadHours.toLocaleString()} Giờ</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs">
                          <span className="font-extrabold text-sky-700 dark:text-sky-400">Số Nhân viên trực tiếp (Agents):</span>
                          <span className="font-black text-sky-600 dark:text-sky-400 text-sm">{agentsNeeded} NV</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                          <span className="font-extrabold text-purple-700 dark:text-purple-400">Trưởng Nhóm / Giám Sát (TL):</span>
                          <span className="font-black text-purple-600 dark:text-purple-400 text-sm">{tlNeeded} NV</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                          <span className="font-extrabold text-emerald-700 dark:text-emerald-400">Đảm bảo chất lượng (QA):</span>
                          <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">{qaNeeded} NV</span>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-sky-600 text-white text-center shadow">
                        <div className="text-[10px] uppercase font-bold opacity-80">Tổng định biên phòng ban</div>
                        <div className="text-2xl font-black">{totalHeadcount} Nhân Sự</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: QA */}
                {activeToolTab === "qa" && (
                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Tiêu Chí Chấm Điểm</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">Điểm QA đạt:</span>
                        <span className={cn("px-3 py-1 rounded-xl text-white font-black text-xs", qaResult.color)}>
                          {qaResult.score}% ({qaResult.label})
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC1} onChange={(e) => setQaC1(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">1. Chào hỏi đúng chuẩn &amp; Lời xưng hô lịch sự</span>
                            <span className="text-[10px] text-slate-400 block">Đúng kịch bản lời chào, xưng tên tư vấn viên.</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+15 Điểm</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC2} onChange={(e) => setQaC2(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">2. Lắng nghe, đồng cảm &amp; Thấu hiểu nhu cầu</span>
                            <span className="text-[10px] text-slate-400 block">Thể hiện tinh thần sẵn sàng trợ giúp, đồng cảm với sự cố.</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+20 Điểm</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC3} onChange={(e) => setQaC3(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">3. Tra cứu thông tin chính xác theo chuẩn SOP</span>
                            <span className="text-[10px] text-slate-400 block">Sử dụng đúng cơ sở dữ liệu tri thức nội bộ.</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+35 Điểm</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC4} onChange={(e) => setQaC4(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">4. Chủ động đưa giải pháp &amp; Hướng dẫn từng bước</span>
                            <span className="text-[10px] text-slate-400 block">Chủ động hỗ trợ đền bù trong hạn mức nhanh chóng.</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+20 Điểm</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC5} onChange={(e) => setQaC5(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">5. Kết thúc cuộc gọi &amp; Lời chào cảm ơn</span>
                            <span className="text-[10px] text-slate-400 block">Lời chào đúng chuẩn, xác nhận không còn thắc mắc khác.</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+10 Điểm</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaFatal} onChange={(e) => setQaFatal(e.target.checked)} className="w-4 h-4 accent-red-600" />
                          <div>
                            <span className="block text-xs font-extrabold text-red-700 dark:text-red-300">VI PHẠM NGHIÊM TRỌNG (FATAL ERROR)</span>
                            <span className="text-[10px] text-red-600 dark:text-red-400 block">Thái độ gắt gỏng, ngắt kết nối chủ động hoặc tiết lộ thông tin.</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-red-600 shrink-0 uppercase">Trừ 100% Điểm</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* TAB 3: CSAT & NPS */}
                {activeToolTab === "csat" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex h-full flex-col justify-between p-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 space-y-4">
                      <div className="flex items-center space-x-1.5 font-extrabold text-amber-900 dark:text-amber-200 text-xs border-b border-amber-500/20 pb-2">
                        <Star size={16} />
                        <span>CHỈ SỐ HÀI LÒNG KHÁCH HÀNG (CSAT)</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Số lượt đánh giá 4* và 5*:</label>
                          <input
                            type="number"
                            value={csatGood}
                            onChange={(e) => setCsatGood(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tổng số lượt đánh giá CSAT:</label>
                          <input
                            type="number"
                            value={csatTotal}
                            onChange={(e) => setCsatTotal(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-center">
                          <span className="block text-[11px] text-slate-500 font-bold uppercase">Điểm số CSAT:</span>
                          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{csatVal}%</span>
                          <p className="text-[10px] text-amber-700 mt-1 font-semibold">Đạt &amp; Vượt mục tiêu (≥90%)</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-col justify-between p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 space-y-4">
                      <div className="flex items-center space-x-1.5 font-extrabold text-indigo-900 dark:text-indigo-200 text-xs border-b border-indigo-500/20 pb-2">
                        <Heart size={16} />
                        <span>NET PROMOTER SCORE (NPS)</span>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Promoters (9-10*)</label>
                            <input
                              type="number"
                              value={npsPromoters}
                              onChange={(e) => setNpsPromoters(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Passives (7-8*)</label>
                            <input
                              type="number"
                              value={npsPassives}
                              onChange={(e) => setNpsPassives(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Detractors (0-6*)</label>
                            <input
                              type="number"
                              value={npsDetractors}
                              onChange={(e) => setNpsDetractors(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-center">
                          <span className="block text-[11px] text-slate-500 font-bold uppercase">Chỉ số NPS đạt:</span>
                          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{npsScore > 0 ? `+${npsScore}` : npsScore}</span>
                          <p className="text-[10px] text-indigo-700 mt-1 font-semibold">Mức Xuất Sắc (&gt;50)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* SECTION 09 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-emerald-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Trophy size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  09 · KẾT QUẢ ĐẠT ĐƯỢC CỦA DỰ ÁN
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-emerald-500/5 space-y-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-emerald-500/10 text-slate-800 dark:text-slate-200 font-bold text-xs border-b border-emerald-500/20">
                        <th className="p-3">Chỉ số đo lường (KPIs)</th>
                        <th className="p-3 text-red-600 dark:text-red-400">Trước khi triển khai</th>
                        <th className="p-3 text-emerald-600 dark:text-emerald-400">Sau khi hoàn thiện</th>
                        <th className="p-3">Cải thiện</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Thời gian phản hồi ban đầu (FRT)</td>
                        <td className="p-3 text-red-500">45 Phút</td>
                        <td className="p-3 font-extrabold text-emerald-600">2.8 Phút</td>
                        <td className="p-3 font-extrabold text-sky-600">Nhanh hơn 93.7%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Tỷ lệ giải quyết lần đầu (FCR)</td>
                        <td className="p-3 text-red-500">52.0%</td>
                        <td className="p-3 font-extrabold text-emerald-600">88.2%</td>
                        <td className="p-3 font-extrabold text-sky-600">Tăng +36.2%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Chỉ số Hài lòng (CSAT)</td>
                        <td className="p-3 text-red-500">72.0%</td>
                        <td className="p-3 font-extrabold text-emerald-600">96.8%</td>
                        <td className="p-3 font-extrabold text-sky-600">Tăng +24.8%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Tỷ lệ tuân thủ SLA phản hồi</td>
                        <td className="p-3 text-red-500">68.5%</td>
                        <td className="p-3 font-extrabold text-emerald-600">98.5%</td>
                        <td className="p-3 font-extrabold text-sky-600">Tăng +30.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-emerald-500/15 via-sky-500/15 to-purple-500/15 border border-emerald-500/20 rounded-xl p-4 gap-3">
                  <div className="text-left">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                      <Award size={14} className="text-emerald-500" /> BẢO CHỨNG TÁC ĐỘNG TÀI CHÍNH &amp; ROI 210%
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">Chuyển đổi hoàn toàn bộ máy CSKH từ Cost Center thành Value Center đắc lực.</p>
                  </div>
                  <button
                    onClick={() => {
                      playUiSound("click");
                      window.print();
                    }}
                    className="cursor-pointer px-4.5 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow hover:bg-emerald-500 transition shrink-0"
                  >
                    In Báo Cáo Kết Quả
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slogan Banner with Simulation trigger */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/40 p-8 shadow-2xl dark:border-white/10 dark:bg-slate-900/40 sm:p-14 text-center">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-gradient-to-br from-sky-500/30 via-indigo-500/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/30 via-pink-500/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-300">
            <Sparkles size={14} className="text-amber-400" /> Tuyên Ngôn Chiến Lược Trải Nghiệm Khách Hàng
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-4xl leading-tight">
            &quot;TỪ TRUNG TÂM CHI PHÍ THỤ ĐỘNG THÀNH BỆ PHÓNG TRẢI NGHIỆM VÀ KẾT NỐI BỀN VỮNG&quot;
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Một phòng CSKH xuất sắc không chỉ giải quyết sự cố, mà còn kiến tạo niềm tin, giữ chân khách hàng và lan tỏa giá trị thương hiệu dài hạn.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                playUiSound("click");
                setIsSimOpen(true);
              }}
              className="cursor-pointer px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold shadow-lg flex items-center space-x-2 text-xs"
            >
              <Bot size={16} />
              <span>Thử Nghiệm Mô Phỏng CSKH</span>
            </button>
          </div>
        </div>
      </section>

      {/* CSKH SIMULATION MODAL */}
      {isSimOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsSimOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Box */}
          <div
            className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/40 bg-white/90 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900/90 backdrop-blur-xl max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 dark:border-slate-700/60">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow">
                  <Bot size={22} />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Mô Phỏng Xử Lý Tình Huống CSKH</h3>
                  <p className="text-xs text-slate-500">Kiểm tra ứng xử Customer-Centric &amp; Khung năng lực tuyến đầu</p>
                </div>
              </div>
              <button
                onClick={() => setIsSimOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {selectedSimOption === null ? (
              <div className="space-y-5 text-left">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 space-y-2">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-red-600 dark:text-red-400 uppercase">
                    <AlertTriangle size={14} /> Tình huống khiếu nại khách hàng:
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm">
                    &quot;Đơn hàng của tôi bị trễ 3 ngày so với cam kết, sản phẩm nhận được còn bị móp góc! Tôi muốn hủy dịch vụ và yêu cầu hoàn tiền ngay lập tức!&quot;
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-extrabold text-slate-500 uppercase">Hãy chọn phương án phản hồi của tư vấn viên:</p>

                  <button
                    onClick={() => {
                      playUiSound("click");
                      setSelectedSimOption(1);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-500 space-y-1 block"
                  >
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      Phương án A: &quot;Dạ đây là lỗi bên vận chuyển chứ không phải bên em. Anh/chị vui lòng tự gọi shipper nhé!&quot;
                    </div>
                    <p className="text-[11px] text-slate-500">Hành vi: Đổ lỗi cho đối tác vận chuyển, thoái thác trách nhiệm.</p>
                  </button>

                  <button
                    onClick={() => {
                      playUiSound("click");
                      setSelectedSimOption(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-500 space-y-1 block"
                  >
                    <div className="font-bold text-slate-950 dark:text-white text-xs">
                      Phương án B: &quot;Dạ em rất hiểu sự thất vọng của anh/chị. Cho phép em gửi lời xin lỗi chân thành! Em xin phép gửi đổi sản phẩm mới ngay hôm nay kèm voucher đền bù 20% ạ.&quot;
                    </div>
                    <p className="text-[11px] text-slate-500">Hành vi: Đồng cảm sâu sắc, chủ động trao quyền đền bù tức thì tuyến đầu.</p>
                  </button>

                  <button
                    onClick={() => {
                      playUiSound("click");
                      setSelectedSimOption(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-500 space-y-1 block"
                  >
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      Phương án C: &quot;Anh/chị vui lòng viết email khiếu nại gửi bộ phận kỹ thuật, bên em sẽ xem xét phản hồi trong vòng 7 ngày làm việc.&quot;
                    </div>
                    <p className="text-[11px] text-slate-500">Hành vi: Xử lý quan liêu theo quy trình chậm chạp, gây ức chế thêm.</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                {selectedSimOption === 2 ? (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 space-y-3">
                    <span className="flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase">
                      <CheckCircle size={16} /> XỬ LÝ CHUẨN CUSTOMER-CENTRIC (+100 ĐIỂM QA)
                    </span>
                    <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-semibold">
                      Tuyệt vời! Bạn đã áp dụng đúng triết lý đồng cảm sâu sắc kết hợp cơ chế Trao quyền tuyến đầu bồi thường tức thì. Khách hàng cảm thấy bức xúc được giải tỏa ngay lập tức, chuyển hóa khiếu nại căng thẳng thành lòng trung thành lâu bền với thương hiệu!
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 space-y-3">
                    <span className="flex items-center gap-1.5 text-xs font-black text-red-800 dark:text-red-300 uppercase">
                      <ShieldAlert size={16} /> XỬ LÝ SAI QUY CHUẨN (0 ĐIỂM QA - FATAL)
                    </span>
                    <p className="text-xs text-red-900 dark:text-red-200 leading-relaxed">
                      {selectedSimOption === 1
                        ? "Hành vi đổ lỗi cho đối tác vận chuyển shipper làm khách hàng phẫn nộ đỉnh điểm, dẫn tới khủng hoảng khiếu nại leo thang trên mạng xã hội."
                        : "Quy trình giải quyết hành chính trễ nải 7 ngày của bạn gây ra tỷ lệ rời bỏ dịch vụ (Churn Rate) tăng vọt, phá hỏng uy tín thương hiệu."}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    playUiSound("click");
                    setSelectedSimOption(null);
                  }}
                  className="cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-slate-900"
                >
                  Thử Lại Phương Án Khác
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
