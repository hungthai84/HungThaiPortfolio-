import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
} from "lucide-react";
import { Project } from "../../data/projectsData";
import { useLanguage } from "../../context/LanguageContext";
import { cn } from "../../lib/utils";
import { playUiSound } from "../../lib/sound";

interface ProjectScrollAccordionProps {
  project: Project;
}

export const ProjectScrollAccordion: React.FC<ProjectScrollAccordionProps> = ({
  project,
}) => {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const emptyText = isVi
    ? "[Chưa có dữ liệu xác nhận - Cần bổ sung dữ liệu]"
    : "[No verified data - Data needed]";
  const loadingColor = "text-slate-400 dark:text-slate-500 italic text-sm";

  const cs = project.caseStudy;

  const renderSolutionCardIcon = (iconName?: string, idx: number = 0) => {
    const iconSize = 13;
    switch (iconName) {
      case "Map":
      case "Route":
      case "Compass":
        return <Map size={iconSize} className="text-amber-500" />;
      case "Heart":
      case "Smile":
      case "Activity":
        return (
          <Heart size={iconSize} className="fill-rose-500/20 text-rose-500" />
        );
      case "ShieldCheck":
      case "Award":
      case "Star":
        return <ShieldCheck size={iconSize} className="text-emerald-500" />;
      case "Users":
      case "Layers":
      case "Workflow":
        return <Users size={iconSize} className="text-indigo-500" />;
      case "Target":
        return <Target size={iconSize} className="text-rose-500" />;
      case "Network":
        return <Network size={iconSize} className="text-blue-500" />;
      case "BarChart":
      case "TrendingUp":
        return <BarChart size={iconSize} className="text-violet-500" />;
      case "Zap":
        return <Zap size={iconSize} className="text-amber-500" />;
      case "Clock":
        return <Clock size={iconSize} className="text-cyan-500" />;
      case "MessageSquare":
        return <MessageSquare size={iconSize} className="text-purple-500" />;
      case "FileText":
        return <FileText size={iconSize} className="text-teal-500" />;
      default:
        return <span>{String(idx + 1).padStart(2, "0")}</span>;
    }
  };

  // Track expanded state for each accordion section (0..9)
  // Default: Expand all sections by default as requested
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  });

  const toggleSection = (index: number) => {
    playUiSound("click");
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => {
    playUiSound("click");
    setOpenSections({
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
    });
  };

  const collapseAll = () => {
    playUiSound("click");
    setOpenSections({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
    });
  };

  // 10 Section Definitions matching CodePen Accordion Gradient Style & Project Case Study
  const sections = [
    {
      id: "01",
      title: isVi ? "01 · TỔNG QUAN DỰ ÁN" : "01 · PROJECT OVERVIEW",
      icon: Info,
      gradient: "from-blue-600 via-indigo-600 to-violet-700",
      accentColor: "text-blue-500",
      bgLight: "bg-blue-500/10 border-blue-500/20",
      content: (
        <div className="space-y-4 pt-2">
          <p className="text-sm leading-relaxed font-semibold text-[var(--text-primary)] sm:text-base">
            {isVi ? "Dự án:" : "Project:"}{" "}
            <span className="font-black text-blue-600 dark:text-blue-400">
              {project.title}
            </span>
          </p>
          <p className="text-sm leading-relaxed font-medium text-[var(--text-secondary)] sm:text-base">
            {cs?.summary || project.desc}
          </p>
          <div className="grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-4 md:grid-cols-4">
            <div>
              <div className="text-[10px] font-black tracking-wider text-[var(--muted)] uppercase">
                {isVi ? "Phạm vi" : "Scope"}
              </div>
              <div className="mt-1 text-sm font-bold text-[var(--text-primary)]">
                {project.group}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-black tracking-wider text-[var(--muted)] uppercase">
                {isVi ? "Thời gian" : "Period"}
              </div>
              <div className="mt-1 text-sm font-bold text-amber-500">
                {project.period || emptyText}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-black tracking-wider text-[var(--muted)] uppercase">
                {isVi ? "Vai trò" : "Role"}
              </div>
              <div className="mt-[5px] text-sm font-bold text-indigo-500">
                {project.role || emptyText}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-black tracking-wider text-[var(--muted)] uppercase">
                {isVi ? "Học tại" : "At"}
              </div>
              <div className="mt-[5px] text-sm font-bold text-[var(--text-primary)]">
                {project.company || emptyText}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "02",
      title: isVi
        ? "02 · BỐI CẢNH & HIỆN TRẠNG"
        : "02 · CONTEXT & CURRENT STATE",
      icon: Globe,
      gradient: "from-sky-500 via-blue-600 to-indigo-700",
      accentColor: "text-sky-500",
      bgLight: "bg-sky-500/10 border-sky-500/20",
      content: (
        <div className="pt-2">
          {cs?.context ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 text-sm font-bold text-[var(--text-primary)]">
                  {isVi ? "Hiện trạng:" : "Current Status:"}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {cs.context.currentStatus}
                </div>
              </div>
              <div className="flex items-center justify-center text-sky-500/50">
                <ArrowRight size={20} className="rotate-90 sm:rotate-0" />
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 text-sm font-bold text-[var(--text-primary)]">
                  {isVi ? "Nguyên nhân:" : "Cause:"}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {cs.context.cause}
                </div>
              </div>
              <div className="flex items-center justify-center text-sky-500/50">
                <ArrowRight size={20} className="rotate-90 sm:rotate-0" />
              </div>
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4">
                <div className="mb-1 text-sm font-bold text-sky-600 dark:text-sky-400">
                  {isVi ? "Nhu cầu thay đổi:" : "Need for Change:"}
                </div>
                <div className="text-sm font-medium text-[var(--text-primary)]">
                  {cs.context.needForChange}
                </div>
              </div>
            </div>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
    {
      id: "03",
      title: isVi ? "03 · VẤN ĐỀ & THÁCH THỨC" : "03 · PROBLEMS & CHALLENGES",
      icon: AlertTriangle,
      gradient: "from-rose-500 via-pink-600 to-red-700",
      accentColor: "text-rose-500",
      bgLight: "bg-rose-500/10 border-rose-500/20",
      content: (
        <div className="pt-2">
          {cs?.problems?.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cs.problems.map((p, i) => (
                <div
                  key={i}
                  className="space-y-3 rounded-2xl border border-rose-400/30 bg-gradient-to-r from-rose-500 via-pink-600 to-red-700 p-5 text-white shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-2 text-sm font-bold text-white">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0 text-white" />
                    <span>{p.problem}</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-white/90">
                    <p>
                      <span className="font-black text-white">
                        {isVi ? "Nguyên nhân:" : "Cause:"}
                      </span>{" "}
                      {p.cause}
                    </p>
                    <p>
                      <span className="font-black text-white">
                        {isVi ? "Ảnh hưởng:" : "Impact:"}
                      </span>{" "}
                      {p.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
    {
      id: "04",
      title: isVi ? "04 · MỤC TIÊU" : "04 · OBJECTIVES",
      icon: Target,
      gradient: "from-emerald-500 via-teal-600 to-green-700",
      accentColor: "text-emerald-500",
      bgLight: "bg-emerald-500/10 border-emerald-500/20",
      content: (
        <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
          {cs?.objectives ? (
            <>
              {cs.objectives.strategic && (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="mb-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {isVi ? "Chiến lược" : "Strategic"}
                  </div>
                  <ul className="space-y-2">
                    {cs.objectives.strategic.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <ChevronRight
                          size={16}
                          className="shrink-0 text-emerald-500"
                        />{" "}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cs.objectives.operational && (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="mb-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {isVi ? "Vận hành" : "Operational"}
                  </div>
                  <ul className="space-y-2">
                    {cs.objectives.operational.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <ChevronRight
                          size={16}
                          className="shrink-0 text-emerald-500"
                        />{" "}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cs.objectives.customer && (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="mb-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {isVi ? "Khách hàng" : "Customer"}
                  </div>
                  <ul className="space-y-2">
                    {cs.objectives.customer.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <ChevronRight
                          size={16}
                          className="shrink-0 text-emerald-500"
                        />{" "}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cs.objectives.kpi && (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="mb-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    KPI
                  </div>
                  <ul className="space-y-2">
                    {cs.objectives.kpi.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm font-semibold text-[var(--text-primary)]"
                      >
                        <CheckCircle2
                          size={16}
                          className="shrink-0 text-emerald-500"
                        />{" "}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
    {
      id: "05",
      title: isVi ? "05 · MÔ HÌNH & GIẢI PHÁP" : "05 · MODEL & SOLUTIONS",
      icon: Network,
      gradient: "from-indigo-600 via-purple-600 to-violet-700",
      accentColor: "text-indigo-500",
      bgLight: "bg-indigo-500/10 border-indigo-500/20",
      content: (
        <div className="pt-2">
          {cs?.solutions ? (
            <div className="space-y-6">
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 text-sm leading-relaxed font-medium text-[var(--text-primary)] dark:border-indigo-900/30 dark:bg-indigo-900/10">
                {cs.solutions.modelOverview}
              </div>
              {cs.solutions.imageUrl && (
                <div className="overflow-hidden rounded-xl border border-[var(--border)] shadow-md">
                  <img
                    src={cs.solutions.imageUrl}
                    alt="Solutions Diagram"
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cs.solutions.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5"
                  >
                    <h5 className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs dark:bg-indigo-900/50">
                        {renderSolutionCardIcon(card.iconName, idx)}
                      </span>
                      {card.name}
                    </h5>
                    <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                      <p>
                        <strong className="text-[var(--text-primary)]">
                          {isVi ? "Mục đích:" : "Purpose:"}
                        </strong>{" "}
                        {card.purpose}
                      </p>
                      <p>
                        <strong className="text-[var(--text-primary)]">
                          {isVi ? "Thực hiện:" : "Implementation:"}
                        </strong>{" "}
                        {card.implementation}
                      </p>
                      <p>
                        <strong className="text-indigo-500">
                          {isVi ? "Giá trị:" : "Value:"}
                        </strong>{" "}
                        {card.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
    {
      id: "06",
      title: isVi
        ? "06 · TRIỂN KHAI & VẬN HÀNH"
        : "06 · IMPLEMENTATION & OPERATION",
      icon: ListChecks,
      gradient: "from-amber-500 via-orange-600 to-amber-700",
      accentColor: "text-orange-500",
      bgLight: "bg-orange-500/10 border-orange-500/20",
      content: (
        <div className="pt-2">
          {cs?.implementation?.length ? (
            <div className="relative space-y-6 pl-6 before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-orange-500/20">
              {cs.implementation.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-orange-500 bg-orange-100 text-[10px] font-bold text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                    {i + 1}
                  </div>
                  <div className="pl-4">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-sm font-medium text-[var(--text-secondary)]">
                      {step}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
    {
      id: "07",
      title: isVi ? "07 · VAI TRÒ & ĐÓNG GÓP" : "07 · ROLE & CONTRIBUTION",
      icon: UserCheck,
      gradient: "from-violet-600 via-fuchsia-600 to-purple-700",
      accentColor: "text-violet-500",
      bgLight: "bg-violet-500/10 border-violet-500/20",
      content: (
        <div className="pt-2">
          {cs?.roleAndContribution ? (
            <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-5 dark:border-violet-900/30 dark:bg-violet-900/10">
              <h5 className="mb-3 text-base font-bold text-violet-600 dark:text-violet-400">
                {cs.roleAndContribution.role}
              </h5>
              <ul className="space-y-2">
                {cs.roleAndContribution.responsibilities.map((resp, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-violet-400"
                    />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
    {
      id: "08",
      title: isVi ? "08 · HỆ THỐNG & CÔNG CỤ" : "08 · SYSTEMS & TOOLS",
      icon: Monitor,
      gradient: "from-cyan-500 via-teal-600 to-blue-700",
      accentColor: "text-cyan-500",
      bgLight: "bg-cyan-500/10 border-cyan-500/20",
      content: (
        <div className="pt-2">
          {cs?.systemsAndTools ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cs.systemsAndTools.systems && (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="mb-2 text-xs font-bold tracking-wider text-[var(--muted)] uppercase">
                    {isVi ? "Hệ thống" : "Systems"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cs.systemsAndTools.systems.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {cs.systemsAndTools.technologies && (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="mb-2 text-xs font-bold tracking-wider text-[var(--muted)] uppercase">
                    {isVi ? "Công nghệ" : "Technology"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cs.systemsAndTools.technologies.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {cs.systemsAndTools.methods && (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="mb-2 text-xs font-bold tracking-wider text-[var(--muted)] uppercase">
                    {isVi ? "Phương pháp" : "Methods"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cs.systemsAndTools.methods.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {cs.systemsAndTools.toolsList && (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="mb-2 text-xs font-bold tracking-wider text-[var(--muted)] uppercase">
                    {isVi ? "Công cụ" : "Tools"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cs.systemsAndTools.toolsList.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
    {
      id: "09",
      title: isVi ? "09 · KẾT QUẢ & TÁC ĐỘNG" : "09 · RESULTS & IMPACT",
      icon: TrendingUp,
      gradient: "from-emerald-600 via-green-600 to-teal-700",
      accentColor: "text-green-500",
      bgLight: "bg-green-500/10 border-green-500/20",
      content: (
        <div className="space-y-6 pt-2">
          {cs?.results?.kpiBeforeAfter &&
            cs.results.kpiBeforeAfter.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cs.results.kpiBeforeAfter.map((kpi, i) => {
                  const parts = kpi.split(":");
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-center"
                    >
                      <div className="mb-1 text-sm font-semibold text-[var(--text-secondary)]">
                        {parts[0]}
                      </div>
                      <div className="text-xl font-black text-green-600 dark:text-green-400">
                        {parts[1]}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          {cs?.results ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {cs.results.operational && (
                <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="mb-2 flex items-center gap-2 font-bold text-[var(--text-primary)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {isVi ? "Vận hành" : "Operations"}
                  </div>
                  <ul className="space-y-2">
                    {cs.results.operational.map((res, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-green-500"
                        />{" "}
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cs.results.customer && (
                <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="mb-2 flex items-center gap-2 font-bold text-[var(--text-primary)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {isVi ? "Khách hàng" : "Customers"}
                  </div>
                  <ul className="space-y-2">
                    {cs.results.customer.map((res, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-green-500"
                        />{" "}
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
    {
      id: "10",
      title: isVi ? "10 · GIÁ TRỊ & PHÁT TRIỂN" : "10 · VALUE & DEVELOPMENT",
      icon: Award,
      gradient: "from-amber-500 via-yellow-600 to-amber-700",
      accentColor: "text-amber-500",
      bgLight: "bg-amber-500/10 border-amber-500/20",
      content: (
        <div className="pt-2">
          {cs?.valueAndDevelopment ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg)] p-5">
                  <h5 className="mb-2 flex items-center gap-2 font-bold text-[var(--text-primary)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {isVi ? "Cho Khách hàng" : "For Customers"}
                  </h5>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {cs.valueAndDevelopment.customerValue}
                  </p>
                </div>
                <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg)] p-5">
                  <h5 className="mb-2 flex items-center gap-2 font-bold text-[var(--text-primary)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {isVi ? "Cho Doanh nghiệp" : "For Business"}
                  </h5>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {cs.valueAndDevelopment.businessValue}
                  </p>
                </div>
                <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg)] p-5">
                  <h5 className="mb-2 flex items-center gap-2 font-bold text-[var(--text-primary)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {isVi ? "Cho Tổ chức" : "For Organization"}
                  </h5>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {cs.valueAndDevelopment.organizationValue}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className={loadingColor}>{emptyText}</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 text-left">
      {/* Top Action Controls: Quick Expand / Collapse All */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
        <div className="flex items-center gap-2 text-xs font-black tracking-wider text-[var(--muted)] uppercase">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-500" />
          <span>
            {isVi
              ? "Hiệu ứng Accordion Xếp Chồng Bài Viết (CodePen ScrollTrigger Style)"
              : "ScrollTrigger Accordion Stack Effect"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="cursor-pointer rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-600 transition-all hover:bg-indigo-500/20 dark:text-indigo-400"
          >
            {isVi ? "Mở tất cả" : "Expand All"}
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-bold text-[var(--muted)] transition-all hover:bg-[var(--glass-xs-bg)] hover:text-[var(--text-primary)]"
          >
            {isVi ? "Thu gọn tất cả" : "Collapse All"}
          </button>
        </div>
      </div>

      {/* ACCORDION CARDS STACK CONTAINER */}
      <div className="space-y-4">
        {sections.map((sec, idx) => {
          const isOpen = !!openSections[idx];
          const IconComp = sec.icon;

          // Extract color border or background values dynamically for fine border styling
          return (
            <motion.div
              key={sec.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="magic-card overflow-hidden rounded-[15px] border border-[var(--border)] bg-[var(--card)] shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {/* ACCORDION CARD HEADER BUTTON */}
              <button
                type="button"
                onClick={() => toggleSection(idx)}
                className={cn(
                  "group flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left select-none sm:p-5",
                  `bg-gradient-to-r ${sec.gradient} text-white shadow-sm`,
                )}
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="shrink-0 rounded-xl bg-white/20 p-2.5 text-white backdrop-blur-md">
                    <IconComp size={20} className="text-white" />
                  </div>
                  <h4 className="truncate text-sm font-black tracking-wide text-white drop-shadow-xs sm:text-base">
                    {sec.title}
                  </h4>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="rounded-lg border border-white/30 bg-white/20 px-2.5 py-1 text-[9px] font-black tracking-widest text-white uppercase backdrop-blur-md">
                    {isOpen
                      ? isVi
                        ? "Đang mở"
                        : "Open"
                      : isVi
                        ? "Thu gọn"
                        : "Collapsed"}
                  </span>

                  <div
                    className={cn(
                      "rounded-full bg-white/20 p-1.5 text-white transition-transform duration-200 backdrop-blur-md",
                      isOpen ? "rotate-180" : "",
                    )}
                  >
                    <ChevronDown size={16} />
                  </div>
                </div>
              </button>

              {/* ACCORDION CARD CONTENT BODY (Scrubbing / Collapsing Effect) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className={cn(
                        "space-y-4 border-t border-[var(--border)] p-5 sm:p-7",
                        sec.bgLight,
                      )}
                    >
                      {sec.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
