import React from "react";
import { cn } from "../lib/utils";

interface HamburgerCollapseButtonProps {
  id?: string;
  checked: boolean;
  onChange?: () => void;
  onClick?: () => void;
  scale?: number;
  className?: string;
  title?: string;
  "aria-label"?: string;
  direction?: "left-right" | "right-left";
}

export function HamburgerCollapseButton({
  id = "hamburger-collapse-toggle",
  checked,
  onChange,
  onClick,
  scale = 0.42,
  className,
  title,
  "aria-label": ariaLabel,
  direction = "left-right",
}: HamburgerCollapseButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (onChange) onChange();
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none",
        className
      )}
      style={{
        width: `${70 * scale}px`,
        height: `${50 * scale}px`,
      }}
      title={title}
    >
      <input
        type="checkbox"
        id={id}
        className="check"
        checked={direction === "right-left" ? !checked : checked}
        onChange={() => {
          if (onChange) onChange();
        }}
        aria-label={ariaLabel || title || "Toggle Sidebar"}
      />
      <label
        htmlFor={id}
        onClick={handleClick}
        className="hamburger-button cursor-pointer"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "absolute",
        }}
      >
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </label>
    </div>
  );
}

export default HamburgerCollapseButton;
