import { useState, useDeferredValue, useCallback } from "react";
import { playUiSound } from "../lib/sound";

// ============================================================================
// PROJECT FILTER HOOK
// ============================================================================

export interface UseProjectFilterReturn {
  filterGroup: string;
  setFilterGroup: (group: string) => void;
  filterPhase: string;
  setFilterPhase: (phase: string) => void;
  filterTag: string;
  setFilterTag: (tag: string) => void;
  resetFilters: () => void;
}

export function useProjectFilter(): UseProjectFilterReturn {
  const [filterGroup, setFilterGroupState] = useState<string>("Tất cả");
  const [filterPhase, setFilterPhaseState] = useState<string>("Tất cả");
  const [filterTag, setFilterTagState] = useState<string>("Tất cả");

  const setFilterGroup = useCallback((group: string) => {
    setFilterGroupState(group);
  }, []);

  const setFilterPhase = useCallback((phase: string) => {
    setFilterPhaseState(phase);
  }, []);

  const setFilterTag = useCallback((tag: string) => {
    setFilterTagState(tag);
  }, []);

  const resetFilters = useCallback(() => {
    playUiSound("click");
    setFilterGroupState("Tất cả");
    setFilterPhaseState("Tất cả");
    setFilterTagState("Tất cả");
  }, []);

  return {
    filterGroup,
    setFilterGroup,
    filterPhase,
    setFilterPhase,
    filterTag,
    setFilterTag,
    resetFilters,
  };
}

// ============================================================================
// PROJECT SEARCH HOOK
// ============================================================================

export interface UseProjectSearchReturn {
  searchQuery: string;
  deferredSearchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

export function useProjectSearch(): UseProjectSearchReturn {
  const [searchQuery, setSearchQueryState] = useState<string>("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQueryState("");
  }, []);

  return {
    searchQuery,
    deferredSearchQuery,
    setSearchQuery,
    clearSearch,
  };
}

// ============================================================================
// PROJECT NAVIGATION HOOK
// ============================================================================

export interface UseProjectNavigationProps {
  onNavigationChange?: () => void;
}

export interface UseProjectNavigationReturn {
  selectedProjectIndex: number | null;
  selectProject: (index: number) => void;
  backToList: () => void;
  nextProject: (total: number) => void;
  prevProject: (total: number) => void;
}

export function useProjectNavigation({
  onNavigationChange,
}: UseProjectNavigationProps = {}): UseProjectNavigationReturn {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);

  const selectProject = useCallback(
    (index: number) => {
      playUiSound("click");
      if (onNavigationChange) {
        onNavigationChange();
      }
      setSelectedProjectIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [onNavigationChange],
  );

  const backToList = useCallback(() => {
    playUiSound("click");
    if (onNavigationChange) {
      onNavigationChange();
    }
    setSelectedProjectIndex(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [onNavigationChange]);

  const nextProject = useCallback(
    (total: number) => {
      playUiSound("click");
      if (onNavigationChange) {
        onNavigationChange();
      }
      setSelectedProjectIndex((prev) => {
        if (prev === null) return 1;
        return prev < total ? prev + 1 : 1;
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [onNavigationChange],
  );

  const prevProject = useCallback(
    (total: number) => {
      playUiSound("click");
      if (onNavigationChange) {
        onNavigationChange();
      }
      setSelectedProjectIndex((prev) => {
        if (prev === null) return total;
        return prev > 1 ? prev - 1 : total;
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [onNavigationChange],
  );

  return {
    selectedProjectIndex,
    selectProject,
    backToList,
    nextProject,
    prevProject,
  };
}
