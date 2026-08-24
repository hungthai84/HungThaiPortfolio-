import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import { playGlassSound, GlassSoundType } from "../lib/sound";

interface GlassSoundContextType {
  soundEnabled: boolean;
  hoverEnabled: boolean;
  toggleSound: () => void;
  toggleHoverSound: () => void;
  playGlass: (type?: GlassSoundType) => void;
}

const GlassSoundContext = createContext<GlassSoundContextType>({
  soundEnabled: true,
  hoverEnabled: true,
  toggleSound: () => {},
  toggleHoverSound: () => {},
  playGlass: () => {},
});

export const useGlassSound = () => useContext(GlassSoundContext);

export interface GlassSoundEffectProps {
  children?: React.ReactNode;
  enableClick?: boolean;
  enableHover?: boolean;
  defaultClickType?: GlassSoundType;
  defaultHoverType?: GlassSoundType;
  /**
   * Selector for elements that trigger the glass sound effect.
   * Defaults to interactive elements and glass cards.
   */
  selector?: string;
}

const DEFAULT_SELECTOR = [
  "button",
  "a[href]",
  "[role='button']",
  ".magic-card",
  ".glass-card",
  ".glass-panel",
  ".glass-effect",
  "[data-glass-sound]",
  ".interactive-glass",
].join(", ");

export function GlassSoundEffect({
  children,
  enableClick = true,
  enableHover = true,
  defaultClickType = "tink",
  defaultHoverType = "hover",
  selector = DEFAULT_SELECTOR,
}: GlassSoundEffectProps) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("app_ui_sounds_enabled") !== "false";
  });

  const [hoverEnabled, setHoverEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("app_glass_hover_sounds_enabled") !== "false";
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("app_ui_sounds_enabled", String(next));
      if (next) playGlassSound("shimmer");
      return next;
    });
  }, []);

  const toggleHoverSound = useCallback(() => {
    setHoverEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("app_glass_hover_sounds_enabled", String(next));
      if (next) playGlassSound("hover");
      return next;
    });
  }, []);

  const playGlass = useCallback(
    (type: GlassSoundType = defaultClickType) => {
      if (soundEnabled) {
        playGlassSound(type);
      }
    },
    [soundEnabled, defaultClickType]
  );

  useEffect(() => {
    if (!soundEnabled) return;

    let lastHoverTime = 0;
    const HOVER_THROTTLE_MS = 100;

    const handleClick = (e: MouseEvent) => {
      if (!enableClick) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(selector) as HTMLElement | null;
      if (interactiveEl) {
        // Allow custom sound type via data attribute e.g. data-glass-sound="haptic-click"
        const customType = (interactiveEl.getAttribute("data-glass-sound") ||
          interactiveEl.getAttribute("data-sound-type")) as GlassSoundType | null;

        const soundToPlay = customType || defaultClickType;
        playGlassSound(soundToPlay);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!enableHover || !hoverEnabled) return;
      const now = Date.now();
      if (now - lastHoverTime < HOVER_THROTTLE_MS) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(selector) as HTMLElement | null;
      if (interactiveEl) {
        lastHoverTime = now;
        const customType = (interactiveEl.getAttribute("data-glass-hover-sound") ||
          defaultHoverType) as GlassSoundType;

        playGlassSound(customType);
      }
    };

    document.addEventListener("click", handleClick, { capture: true, passive: true });
    document.addEventListener("mouseover", handleMouseOver, { capture: true, passive: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("mouseover", handleMouseOver, { capture: true });
    };
  }, [soundEnabled, hoverEnabled, enableClick, enableHover, selector, defaultClickType, defaultHoverType]);

  return (
    <GlassSoundContext.Provider
      value={{
        soundEnabled,
        hoverEnabled,
        toggleSound,
        toggleHoverSound,
        playGlass,
      }}
    >
      {children}
    </GlassSoundContext.Provider>
  );
}

export default GlassSoundEffect;
