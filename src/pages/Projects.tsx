import React, { useState, useMemo } from "react";
import {
  FolderGit2,
  Filter,
  Layers,
  LayoutGrid,
  LayoutList,
  X,
  Search,
  Tag,
  Sparkles,
  Info,
  Calendar,
  UserCheck,
  Building2,
  Users,
  Target,
  ShieldCheck,
  Award,
} from "lucide-react";

import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";

// Constants & Styles
import { getGroupColorClass } from "../lib/theme";

// Unified Data Source
import { projectsData } from "../data/projectsData";

// Custom Hooks
import {
  useProjectFilter,
  useProjectSearch,
  useProjectNavigation,
} from "../hooks/useProject";
import { useAudio } from "../hooks/useAudio";

// Modular Presentation Components
import { ErrorBoundary } from "../components/projects/ErrorBoundary";
import { ProjectCard } from "../components/projects/ProjectCard";
import { EmptyState } from "../components/projects/EmptyState";
import { MindMapCard } from "../components/projects/MindMapCard";
import { GenericProjectDetails } from "../components/projects/ProjectDetails/GenericProjectDetails";
import { ProjectDiscussionPlayer } from "../components/projects/ProjectDiscussionPlayer";

export function Projects() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  // 1. Unified State & Hooks Extraction
  const { filterGroup, filterPhase, filterTag, resetFilters } =
    useProjectFilter();

  const { searchQuery, deferredSearchQuery, setSearchQuery, clearSearch } =
    useProjectSearch();

  const { stopAudio } = useAudio();

  const { selectedProjectIndex, selectProject, backToList } =
    useProjectNavigation({
      onNavigationChange: stopAudio,
    });

  // Handle auto-selecting project when navigated from Industries keyProjects
  React.useEffect(() => {
    const handleSelectProjectByTitle = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const titleToFind = customEvent.detail;
        const projectIndex = projectsData.findIndex(
          (p) =>
            p.title.toLowerCase().includes(titleToFind.toLowerCase()) ||
            titleToFind.toLowerCase().includes(p.title.toLowerCase()),
        );
        if (projectIndex !== -1) {
          selectProject(projectIndex + 1);
        } else {
          setSearchQuery(titleToFind);
        }
      }
    };
    window.addEventListener("app-select-project", handleSelectProjectByTitle);

    // Check session storage on mount
    const pendingTitle = sessionStorage.getItem("pending_project_title");
    if (pendingTitle) {
      sessionStorage.removeItem("pending_project_title");
      const projectIndex = projectsData.findIndex(
        (p) =>
          p.title.toLowerCase().includes(pendingTitle.toLowerCase()) ||
          pendingTitle.toLowerCase().includes(p.title.toLowerCase()),
      );
      if (projectIndex !== -1) {
        selectProject(projectIndex + 1);
      } else {
        setSearchQuery(pendingTitle);
      }
    }

    return () =>
      window.removeEventListener(
        "app-select-project",
        handleSelectProjectByTitle,
      );
  }, [selectProject, setSearchQuery]);

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [projectListViewMode, setProjectListViewMode] = useState<
    "grid" | "stacked"
  >("grid");

  // 10. Optimized filtering
  const filteredProjects = useMemo(() => {
    const q = deferredSearchQuery.trim().toLowerCase();
    let result = projectsData.filter((p) => {
      const matchGroup = filterGroup === "Tất cả" || p.group === filterGroup;
      const matchPhase = filterPhase === "Tất cả" || p.phase === filterPhase;
      const matchTag = filterTag === "Tất cả" || p.tags.includes(filterTag);
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.toLowerCase().includes(q) ||
        p.group.toLowerCase().includes(q) ||
        p.phase.toLowerCase().includes(q);

      return matchGroup && matchPhase && matchTag && matchSearch;
    });

    return result;
  }, [filterGroup, filterPhase, filterTag, deferredSearchQuery]);

  const groupedProjects = useMemo(() => {
    const map: { [groupName: string]: typeof filteredProjects } = {};
    filteredProjects.forEach((p) => {
      if (!map[p.group]) {
        map[p.group] = [];
      }
      map[p.group].push(p);
    });
    return map;
  }, [filteredProjects]);

  const activeFiltersCount = useMemo(() => {
    return (
      (filterGroup !== "Tất cả" ? 1 : 0) +
      (filterPhase !== "Tất cả" ? 1 : 0) +
      (filterTag !== "Tất cả" ? 1 : 0) +
      (searchQuery.trim() !== "" ? 1 : 0)
    );
  }, [filterGroup, filterPhase, filterTag, searchQuery]);

  const handleResetFiltersAndSearch = () => {
    resetFilters();
    clearSearch();
  };

  const selectedProject = useMemo(() => {
    if (selectedProjectIndex === null) return null;
    return projectsData[selectedProjectIndex - 1] || null;
  }, [selectedProjectIndex]);

  return (
    <ErrorBoundary>
      <PageLayout
        id="projects-main-card"
        rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300 !bg-transparent !border-none !rounded-none shadow-none"
        headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !shadow-none !bg-transparent"
        headerContainerClassName="!px-0"
        className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent !border-none"
        pageId="projects"
        pageName="Projects Main Card"
        title={
          selectedProject
            ? selectedProject.title
            : isVi
              ? "Kho 16+ Dự án Chiến lược & SOP Vận hành CSKH"
              : "16+ Strategic Customer Service & Operations SOPs Repository"
        }
        subtitle={
          selectedProject
            ? isVi
              ? `${selectedProject.group} • ${selectedProject.phase}`
              : `${selectedProject.group} • ${selectedProject.phase}`
            : isVi
              ? "Tổng hợp các dự án chiến lược và SOP nổi bật nhất."
              : "A collection of strategic projects and outstanding operational SOPs."
        }
        icon={selectedProject ? FolderGit2 : FolderGit2}
        titleClassName={
          selectedProject
            ? "text-indigo-600 dark:text-indigo-400 font-black"
            : ""
        }
        subtitleClassName={
          selectedProject ? "text-amber-600 dark:text-amber-400 font-bold" : ""
        }
        headerActions={
          selectedProject ? (
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                const returnPage = sessionStorage.getItem("return_to_page");
                if (returnPage === "experience") {
                  sessionStorage.removeItem("return_to_page");
                  const expId = sessionStorage.getItem("return_to_experience_id");
                  if (expId) {
                    sessionStorage.removeItem("return_to_experience_id");
                    sessionStorage.setItem("return_to_experience_target_id", expId);
                  }
                  window.dispatchEvent(
                    new CustomEvent("app-navigate", {
                      detail: "experience",
                    }),
                  );
                } else {
                  backToList();
                }
              }}
              className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-solid border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black tracking-widest text-[var(--text-primary)] uppercase shadow-none hover:bg-[var(--border)]"
            >
              <X size={14} />
              <span>{isVi ? "Quay lại" : "Back"}</span>
            </button>
          ) : (
            <div className="flex w-full flex-wrap items-center justify-end gap-2.5 sm:w-auto">
              {/* View Mode Toggle Pill Bar */}
              <div className="flex items-center gap-1 rounded-xl border border-slate-200/80 bg-white/80 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80">
                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    setProjectListViewMode("grid");
                  }}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black",
                    projectListViewMode === "grid"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800",
                  )}
                  title={
                    isVi
                      ? "Tất cả dự án (Dạng Lưới)"
                      : "All Projects Grid View"
                  }
                >
                  <LayoutGrid size={14} />
                  <span>{isVi ? "Dạng Lưới" : "Grid View"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    setProjectListViewMode("stacked");
                  }}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black",
                    projectListViewMode === "stacked"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800",
                  )}
                  title={isVi ? "Nhóm theo giai đoạn" : "Grouped by Phase"}
                >
                  <Layers size={14} />
                  <span>
                    {isVi ? "Giai đoạn" : "By Phase"}
                  </span>
                </button>
              </div>
            </div>
          )
        }
      >
      <div className="mx-auto flex h-full w-full max-w-[1240px] flex-col gap-4">
        {selectedProject ? (
          <div
            key="detail"
            className="flex w-full flex-col"
          >
            {/* Integrated Project Content Area */}
            <div className="relative w-full border-none bg-transparent p-[5px] !shadow-none shadow-none">
              <div className="mx-auto w-full max-w-4xl space-y-10">
                {/* Integrated Hero Section inside the card */}
                <div className="space-y-6">
                  {/* Featured Image - Integrated Hero Section */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-[15px] border border-slate-200/90 bg-slate-100 shadow-md sm:aspect-[21/9] dark:border-white/10 dark:bg-slate-800">
                    {selectedProject.img && (
                      <img
                        src={selectedProject.img}
                        alt={selectedProject.title}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Clear Banner Overlay Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                    {/* Project Discussion Listen Button (Music Player Style) */}
                    <ProjectDiscussionPlayer
                      title={isVi ? "Thảo luận dự án" : "Project Discussion"}
                      artist={isVi ? "Giọng đọc AI (Podcast)" : "AI Voice (Podcast)"}
                      className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20"
                    />
                  </div>
                </div>
                {/* Content Detail Section */}
                <div className="w-full space-y-8">
                  {/* Executive Experience Query Card (4 Mục: Giai đoạn, Thời gian, Nhóm, Vai trò) */}
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:p-6">
                    {/* 1. Giai đoạn (Phase) */}
                    <div className="flex flex-1 items-center gap-3.5 min-w-[180px]">
                      <div className="shrink-0 rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                        <Target size={22} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          {isVi ? "Giai đoạn" : "Phase"}
                        </div>
                        <div className="mt-0.5 truncate text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                          {selectedProject.phase}
                        </div>
                      </div>
                    </div>

                    <div className="hidden h-12 w-px bg-slate-200 dark:bg-slate-700 sm:block"></div>

                    {/* 2. Thời gian (Period) */}
                    <div className="flex flex-1 items-center gap-3.5 min-w-[180px]">
                      <div className="shrink-0 rounded-xl bg-amber-500/10 p-3 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                        <Calendar size={22} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          {isVi ? "Thời gian" : "Period"}
                        </div>
                        <div className="mt-0.5 truncate text-sm font-extrabold text-slate-900 dark:text-slate-100">
                          {selectedProject.period}
                        </div>
                      </div>
                    </div>

                    <div className="hidden h-12 w-px bg-slate-200 dark:bg-slate-700 lg:block"></div>

                    {/* 3. Nhóm (Group) */}
                    <div className="flex flex-1 items-center gap-3.5 min-w-[180px]">
                      <div className="shrink-0 rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                        <Users size={22} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          {isVi ? "Nhóm" : "Group"}
                        </div>
                        <div className="mt-0.5 truncate text-sm font-extrabold text-blue-700 dark:text-blue-400">
                          {selectedProject.group}
                        </div>
                      </div>
                    </div>

                    <div className="hidden h-12 w-px bg-slate-200 dark:bg-slate-700 sm:block"></div>

                    {/* 4. Vai trò (Role) */}
                    <div className="flex flex-1 items-center gap-3.5 min-w-[180px]">
                      <div className="shrink-0 rounded-xl bg-indigo-500/10 p-3 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                        <UserCheck size={22} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          {isVi ? "Vai trò" : "Role"}
                        </div>
                        <div className="mt-0.5 truncate text-sm font-extrabold text-indigo-700 dark:text-indigo-400">
                          {selectedProject.role}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* MindMap Frame - Sơ đồ tư duy nằm trên 1. Yêu cầu dự án */}
                  {selectedProject.mindmapImg && (
                    <MindMapCard
                      imageUrl={selectedProject.mindmapImg}
                      title={selectedProject.title}
                    />
                  )}

                  {/* Content Sections - Sử dụng cấu trúc 10 phần tiêu chuẩn */}
                  <div className="pt-4">
                    <GenericProjectDetails project={selectedProject} />
                  </div>
                </div>

                {/* Tags section removed as per user request */}

                <div className="flex justify-center pt-8 pb-4">
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      backToList();
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl bg-indigo-600 px-10 py-4 text-xs font-black tracking-widest text-white uppercase shadow-md hover:bg-indigo-700"
                  >
                    <LayoutGrid size={18} />
                    {isVi
                      ? "Quay lại danh sách dự án"
                      : "Back to Projects List"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            key="list"
            className="w-full space-y-6"
          >
            {/* Empty Search Result State */}
            {filteredProjects.length === 0 ? (
              <EmptyState onReset={handleResetFiltersAndSearch} />
            ) : projectListViewMode === "stacked" ? (
              /* Grouped Stacked Deck Cards View */
              <div className="space-y-8">
                {Object.entries(groupedProjects).map(
                  ([groupName, groupProjects]) => (
                    <div
                      key={groupName}
                      className="space-y-2 p-4 text-left sm:p-5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-black shadow-sm",
                            getGroupColorClass(groupName),
                          )}
                        >
                          {groupName}
                        </span>
                        <span className="text-xs font-extrabold text-[var(--muted)]">
                          • {groupProjects.length}{" "}
                          {isVi ? "dự án" : "projects"}
                        </span>
                      </div>

                      <div className="no-scrollbar flex min-h-[340px] items-center overflow-x-auto scroll-smooth px-4 py-6">
                        {groupProjects.map((project, idx) => {
                          const originalIndex =
                            projectsData.findIndex(
                              (p) => p.title === project.title,
                            ) + 1;
                          const formattedIndex =
                            originalIndex < 10
                              ? `0${originalIndex}`
                              : `${originalIndex}`;

                          return (
                            <ProjectCard
                              key={originalIndex}
                              project={project}
                              originalIndex={originalIndex}
                              formattedIndex={formattedIndex}
                              viewMode="stacked"
                              indexInGroup={idx}
                              onClick={() => selectProject(originalIndex)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
                {filteredProjects.map((project) => {
                  const originalIndex =
                    projectsData.findIndex((p) => p.title === project.title) +
                    1;
                  const formattedIndex =
                    originalIndex < 10
                      ? `0${originalIndex}`
                      : `${originalIndex}`;

                  return (
                    <ProjectCard
                      key={originalIndex}
                      project={project}
                      originalIndex={originalIndex}
                      formattedIndex={formattedIndex}
                      viewMode="grid"
                      onClick={() => selectProject(originalIndex)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
    </ErrorBoundary>
  );
}
