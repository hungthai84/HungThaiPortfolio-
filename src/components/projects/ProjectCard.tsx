import React from "react";
import { ArrowRight, Calendar, UserCheck } from "lucide-react";
import { Project } from "../../data/projectsData";
import { cn } from "../../lib/utils";
import {
  getPhaseColorClass,
  getGroupColorClass,
  getPhaseCardBorderClass,
} from "../../lib/theme";

export interface ProjectCardProps {
  project: Project;
  originalIndex: number;
  formattedIndex: string;
  viewMode: "grid" | "horizontal" | "stacked" | "list";
  onClick: () => void;
  indexInGroup?: number; // Used for stacked zIndex offset
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(
  ({
    project,
    originalIndex,
    formattedIndex,
    viewMode,
    onClick,
    indexInGroup = 0,
  }) => {
    // HORIZONTAL OVERLAPPING BANNER CARD
    if (viewMode === "horizontal") {
      return (
        <div
          onClick={onClick}
          className="group relative my-2 h-full cursor-pointer sm:my-3"
        >
          {/* Outer Card Container */}
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-[16px] border border-slate-200/90 bg-white text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] dark:hover:border-indigo-400/60 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
            style={{ borderRadius: "16px" }}
          >
            {/* Top Image Thumbnail */}
            <div
              className="relative h-56 w-full shrink-0 overflow-hidden rounded-t-[16px] border-b border-slate-200/80 bg-slate-100 sm:h-64 dark:border-slate-800 dark:bg-slate-800"
              style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}
            >
              <img
                src={project.img}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Gradient Overlay for Clear Image Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent dark:from-slate-950/75 dark:via-slate-950/20" />
            </div>

            {/* Middle Content Section */}
            <div className="flex w-full flex-1 flex-col justify-between space-y-3 p-5 sm:p-6 bg-transparent">
              {/* Top Subtitle / Date Style Header */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                <span>{project.phase}</span>
                <span>•</span>
                <span className="font-extrabold text-rose-600 dark:text-rose-400">
                  {project.group}
                </span>
                {project.period && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-extrabold text-amber-700 dark:text-amber-400">
                      <Calendar size={12} /> {project.period}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg leading-tight font-black text-slate-900 transition-colors duration-200 group-hover:text-indigo-600 sm:text-xl dark:text-slate-100 dark:group-hover:text-indigo-400">
                {project.title.match(/^\d+\.\d+/) ? null : (
                  <span className="mr-2 font-extrabold text-indigo-600 dark:text-indigo-400">
                    #{formattedIndex}.
                  </span>
                )}
                {project.title}
              </h3>

              {/* Role Badge */}
              {project.role && (
                <div className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50/70 px-2.5 py-1 text-xs font-bold text-slate-800 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-slate-200">
                  <UserCheck size={14} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    Vai trò:
                  </span>
                  <span className="font-black text-indigo-700 dark:text-indigo-300">
                    {project.role}
                  </span>
                </div>
              )}

              {/* Description Paragraph */}
              {project.desc && (
                <p className="line-clamp-3 text-xs leading-relaxed font-medium text-slate-600 dark:text-slate-300">
                  {project.desc}
                </p>
              )}

              {/* CTA Gradient Pill Button */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-black tracking-wider text-white uppercase shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md dark:bg-indigo-600 dark:hover:bg-indigo-500"
                >
                  <span>XEM CHI TIẾT</span>
                  <ArrowRight size={14} />
                </button>

                {/* Tags */}
                <div className="ml-1 hidden flex-wrap gap-1 sm:flex">
                  {project.tags
                    .split(" ")
                    .slice(0, 3)
                    .map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-full border border-slate-200/90 bg-slate-100/90 px-2.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 transition-colors hover:bg-slate-200/80 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        #{tag.startsWith("#") ? tag.substring(1) : tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Far Right Vertical Indicator Dots */}
            <div className="hidden shrink-0 flex-col items-center justify-center gap-2 pl-2 lg:flex">
              <div className="h-8 w-2.5 rounded-full bg-rose-500 shadow-xs" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>
      );
    }

    // COMPACT LIST MODE CARD
    if (viewMode === "list") {
      return (
        <div
          onClick={onClick}
          className="group relative h-full cursor-pointer"
        >
          <div className="relative flex h-full items-center gap-3.5 rounded-[15px] border border-slate-200/90 bg-white p-3.5 text-left shadow-xs transition-all duration-300 hover:border-indigo-500/60 hover:shadow-md sm:p-4 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-indigo-400/60 dark:hover:shadow-lg">
            {/* Small Left Thumbnail */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[12px] border border-slate-200/80 bg-slate-100 shadow-2xs sm:h-28 sm:w-28 dark:border-slate-800 dark:bg-slate-800">
              <img
                src={project.img}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Info */}
            <div className="flex h-full min-w-0 flex-1 flex-col justify-between space-y-1.5">
              <div className="flex items-center justify-between gap-1.5">
                <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-800 shadow-2xs dark:border-amber-500/40 dark:bg-amber-950/60 dark:text-amber-300">
                  #{formattedIndex}
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[9px] font-extrabold",
                      getGroupColorClass(project.group),
                    )}
                  >
                    {project.group}
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[9px] font-extrabold",
                      getPhaseColorClass(project.phase),
                    )}
                  >
                    {project.phase}
                  </span>
                </div>
              </div>

              <h3 className="line-clamp-1 text-xs leading-snug font-black text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-sm dark:text-slate-100 dark:group-hover:text-indigo-400">
                {project.title}
              </h3>

              {/* Period and Role */}
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-extrabold text-amber-700 dark:text-amber-400">
                  <Calendar size={10} /> {project.period}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 truncate font-extrabold text-indigo-700 dark:text-indigo-400">
                  <UserCheck size={10} /> {project.role}
                </span>
              </div>

              {project.desc && (
                <p className="line-clamp-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  {project.desc}
                </p>
              )}

              <div className="flex items-center justify-end pt-0.5">
                <div className="flex gap-1">
                  {project.tags
                    .split(" ")
                    .slice(0, 2)
                    .map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-full border border-slate-200/80 bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                      >
                        #{tag.startsWith("#") ? tag.substring(1) : tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // STANDARD GRID MODE CARD (MAIN PROJECT CARD)
    if (viewMode === "grid") {
      return (
        <div
          onClick={onClick}
          className={cn(
            "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[16px] border border-slate-200/90 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]",
            getPhaseCardBorderClass(project.phase),
          )}
        >
          {/* Top Image Fills Top of Card */}
          <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-[16px] border-b border-slate-200/80 bg-slate-100 sm:h-52 dark:border-slate-800 dark:bg-slate-800">
            <img
              src={project.img}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt={project.title}
              referrerPolicy="no-referrer"
            />

            {/* Circle formatted index tag at top-left of the card */}
            <div className="absolute top-3 left-3 z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber-500 bg-white/95 font-mono text-[11px] font-black text-slate-900 shadow-md backdrop-blur-md dark:border-amber-400 dark:bg-slate-950/90 dark:text-amber-400">
              {formattedIndex}
            </div>

            {/* Bottom-Left metadata containing Group, Phase, and Tags together */}
            <div className="absolute bottom-3 left-3 z-10 flex w-[calc(100%-24px)] flex-wrap items-center gap-1.5 overflow-hidden pr-3">
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[9px] font-black shadow-xs",
                  getGroupColorClass(project.group),
                )}
              >
                {project.group}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[9px] font-black shadow-xs",
                  getPhaseColorClass(project.phase),
                )}
              >
                {project.phase}
              </span>
              {project.tags
                .split(" ")
                .slice(0, 1)
                .map((tag, tIdx) => {
                  const tagClean = tag.startsWith("#") ? tag.substring(1) : tag;
                  return (
                    <span
                      key={tIdx}
                      className="max-w-[90px] truncate rounded-full border border-slate-200/90 bg-white/95 px-2 py-0.5 text-[9px] font-bold text-slate-800 shadow-xs backdrop-blur-md dark:border-white/20 dark:bg-slate-900/85 dark:text-slate-100"
                    >
                      #{tagClean}
                    </span>
                  );
                })}
            </div>
          </div>

          {/* Card Content Body */}
          <div className="flex flex-grow flex-col justify-between space-y-3 p-4 text-left sm:p-5 bg-transparent">
            <div>
              <h3 className="line-clamp-2 text-sm sm:text-base font-black leading-snug text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400 min-h-[40px]">
                {project.title}
              </h3>
              {project.desc && (
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed font-medium text-slate-600 dark:text-slate-300">
                  {project.desc}
                </p>
              )}
            </div>

            {/* Thời gian & Vai trò Metadata Bar */}
            <div className="flex flex-col gap-1 border-t border-slate-100 pt-3 text-[11px] dark:border-slate-800">
              <div className="grid grid-cols-2 items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/90 p-2.5 text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-300">
                <span className="flex items-center justify-center gap-1 font-extrabold text-amber-700 dark:text-amber-400 min-w-0">
                  <Calendar size={12} className="shrink-0 text-amber-600 dark:text-amber-400" />
                  <span className="truncate">{project.period}</span>
                </span>
                <span className="flex items-center justify-center gap-1 font-black text-indigo-700 dark:text-indigo-300 border-l border-slate-200/80 dark:border-slate-700/80 pl-2 min-w-0">
                  <UserCheck size={12} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                  <span className="truncate">{project.role}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // STACKED DECK MODE CARD
    return (
      <div
        onClick={onClick}
        style={{ zIndex: indexInGroup }}
        className={cn(
          "group/card relative flex min-h-[310px] w-[290px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-[16px] border border-slate-200/90 bg-white text-left shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]",
          indexInGroup > 0 ? "-ml-16 sm:-ml-24" : "",
          getPhaseCardBorderClass(project.phase),
        )}
      >
        {/* Image Container */}
        <div className="relative h-[145px] w-full shrink-0 overflow-hidden rounded-t-[16px] border-b border-slate-200/80 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
          <img
            src={project.img}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            alt={project.title}
            referrerPolicy="no-referrer"
          />
          {/* Subtle image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>

        {/* Body details */}
        <div className="relative flex flex-grow flex-col justify-between space-y-2 p-3.5 text-left bg-transparent">
          {/* # Tag, Group & Phase Badges */}
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-800 shadow-2xs dark:border-amber-500/40 dark:bg-amber-950/60 dark:text-amber-300">
              #{formattedIndex}
            </span>
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[9px] font-extrabold shadow-2xs",
                  getGroupColorClass(project.group),
                )}
              >
                {project.group}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[9px] font-extrabold shadow-2xs",
                  getPhaseColorClass(project.phase),
                )}
              >
                {project.phase}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-black leading-snug text-slate-900 transition-colors group-hover/card:text-indigo-600 dark:text-slate-100 dark:group-hover/card:text-indigo-400">
              {project.title}
            </h3>
            {project.desc && (
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed font-medium text-slate-600 dark:text-slate-300">
                {project.desc}
              </p>
            )}
          </div>

          {/* Period & Role */}
          <div className="grid grid-cols-2 items-center gap-2 border-t border-slate-100 pt-2 text-[10px] font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300">
            <span className="flex items-center gap-1 font-extrabold text-amber-700 dark:text-amber-400 min-w-0">
              <Calendar size={10} className="shrink-0 text-amber-600 dark:text-amber-400" />{" "}
              <span className="truncate">{project.period}</span>
            </span>
            <span className="flex items-center justify-end gap-1 font-extrabold text-indigo-700 dark:text-indigo-300 min-w-0 border-l border-slate-200/80 dark:border-slate-700 pl-2">
              <UserCheck size={10} className="shrink-0 text-indigo-600 dark:text-indigo-400" />{" "}
              <span className="truncate">{project.role}</span>
            </span>
          </div>
        </div>
      </div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";

