import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";

interface TypewriterMarkdownProps {
  content: string;
  onComplete: () => void;
  speed?: number;
}

export function TypewriterMarkdown({
  content,
  onComplete,
  speed = 8,
}: TypewriterMarkdownProps) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const timerRef = useRef<any | null>(null);

  // Dynamic speed based on length
  // For long text, type much faster so user doesn't wait indefinitely
  const actualSpeed =
    content.length > 500
      ? Math.max(1, Math.floor(speed / 4))
      : content.length > 200
        ? Math.max(2, Math.floor(speed / 2))
        : speed;

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      indexRef.current += 1;
      const sliced = content.slice(0, indexRef.current);
      setDisplayedText(sliced);

      if (indexRef.current >= content.length) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        onComplete();
      }
    }, actualSpeed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [content, actualSpeed, onComplete]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setDisplayedText(content);
    onComplete();
  };

  return (
    <article
      className="group/typewriter relative cursor-pointer select-text"
      onClick={handleSkip}
      title="Nhấp để hiển thị toàn bộ"
    >
      <div className="markdown-body prose dark:prose-invert max-w-none text-xs sm:text-sm">
        <Markdown>{displayedText}</Markdown>
      </div>
      {displayedText.length < content.length && (
        <div className="mt-2.5 flex animate-pulse items-center gap-1.5 text-[10px] font-black tracking-wider text-violet-500/80 uppercase select-none dark:text-violet-400/80">
          <span className="inline-block h-3 w-1.5 bg-violet-500 dark:bg-violet-400" />
          <span>Đang gõ... (Nhấp vào đây để xem toàn bộ)</span>
        </div>
      )}
    </article>
  );
}
