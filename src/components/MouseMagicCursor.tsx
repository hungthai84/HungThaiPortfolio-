import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

export function MouseMagicCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth trail positions
  const cursorRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorVisible) setCursorVisible(true);
      cursorRef.current = { x: e.clientX, y: e.clientY };
      setDotPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.closest("[role='button']") !== null ||
          target.classList.contains("interactive-hover");

        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setCursorVisible(false);
    const handleMouseEnter = () => setCursorVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const render = () => {
      ringRef.current.x = lerp(ringRef.current.x, cursorRef.current.x, 0.45);
      ringRef.current.y = lerp(ringRef.current.y, cursorRef.current.y, 0.45);
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorVisible]);

  if (isTouchDevice || !cursorVisible) return null;

  return (
    <>
      <style>{`
        body {
          cursor: default !important;
        }
        button, a, input, textarea, select, [role="button"] {
          cursor: pointer !important;
        }
      `}</style>

      {/* Outer Glow Ring / Aura */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99999999] rounded-full transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`relative rounded-full border transition-all duration-300 ${
            isHovered
              ? "h-7 w-7 border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(6,182,212,0.8)] backdrop-blur-xs scale-110"
              : isMouseDown
              ? "h-4 w-4 border-blue-500 bg-blue-500/30 scale-90"
              : "h-5 w-5 border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
          }`}
        />
      </div>

      {/* Central Sharp Glowing Tech Blue Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99999999] rounded-full transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full bg-cyan-400 transition-transform duration-150 ${
            isHovered
              ? "h-2 w-2 scale-125 bg-cyan-300 shadow-[0_0_10px_#22d3ee]"
              : isMouseDown
              ? "h-1 w-1 scale-75 bg-blue-400 shadow-[0_0_4px_#3b82f6]"
              : "h-1.5 w-1.5 shadow-[0_0_8px_rgba(6,182,212,0.9)]"
          }`}
        />
      </div>

      {/* Tech Blue Particle / Light Trail effect */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99999998] rounded-full blur-[2px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-500/25 to-blue-600/25 blur-xs" />
      </div>
    </>
  );
}
