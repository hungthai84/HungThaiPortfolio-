import React, { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

interface AudioPlayerProps {
  audioUrl: string;
  imageUrl?: string;
  hintTextVi?: string;
  hintTextEn?: string;
}

export function AudioPlayer({
  audioUrl,
  imageUrl = "https://i.ibb.co/nsKpgT8V/Yin-Yan.jpg",
  hintTextVi = "Bấm vào để nghe luận giải của tôi!",
  hintTextEn = "Click to listen to my commentary!",
}: AudioPlayerProps) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTogglingPlay, setIsTogglingPlay] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayPause = useCallback(async () => {
    playUiSound("click");
    const video = videoRef.current;
    if (!video || isTogglingPlay) return;

    setIsTogglingPlay(true);
    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Media play/pause error:", error);
      }
    } finally {
      setIsTogglingPlay(false);
    }
  }, [isTogglingPlay]);

  return (
    <>
      <style>{`
        .custom-video-player-wrapper {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 90px;
          height: 90px;
          z-index: 50;
          overflow: visible !important;
        }
        .custom-video-player-wrapper.is-playing::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(45deg, #fbbf24, #f59e0b, #d97706, #b45309, #facc15, #eab308, #ca8a04);
          background-size: 400%;
          z-index: -1;
          filter: blur(8px);
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          animation: glowing-border 20s linear infinite;
          opacity: 1;
          border-radius: 50%;
        }
        @keyframes glowing-border {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
        .cover-letter-video-container {
          width: 90px;
          height: 90px;
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          z-index: 2;
          background: transparent;
          cursor: pointer;
        }
        .custom-play-button {
          position: absolute;
          width: 32px;
          height: 32px;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          background: #d4af37;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .custom-play-button:hover {
          transform: translateX(-50%) scale(1.1);
        }
        .horoscope-hint-bubble {
          position: absolute;
          right: calc(100% + 15px);
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #d4af37 0%, #aa8410 100%);
          color: white;
          padding: 10px 16px;
          border-radius: 18px 18px 4px 18px;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.4;
          box-shadow: 0 4px 15px rgba(170, 132, 16, 0.4);
          z-index: 60;
          pointer-events: auto;
          animation: hint-bounce-x 1.5s infinite ease-in-out;
          border: 1px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          width: max-content;
          max-width: 210px;
          text-align: left;
        }
        .horoscope-hint-bubble::after {
          content: '';
          position: absolute;
          bottom: 10px;
          right: -6px;
          border-width: 6px 0 6px 6px;
          border-style: solid;
          border-color: transparent transparent transparent #aa8410;
          display: block;
          width: 0;
        }
        @keyframes hint-bounce-x {
          0%, 100% { transform: translate(0, -50%); }
          50% { transform: translate(-6px, -50%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

      <div
        className={cn("custom-video-player-wrapper", isPlaying && "is-playing")}
      >
        <div
          className="cover-letter-video-container"
          onClick={handlePlayPause}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handlePlayPause();
          }}
          role="button"
          tabIndex={0}
        >
          <img
            src={imageUrl}
            alt="Audio Player"
            className={isPlaying ? "spin-slow" : ""}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              position: "absolute",
              top: 0,
              left: 0,
              mixBlendMode: "multiply",
            }}
          />
          <video
            ref={videoRef}
            src={audioUrl}
            playsInline
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          >
            Trình duyệt của bạn không hỗ trợ thẻ media.
          </video>
        </div>
        <button className="custom-play-button" onClick={handlePlayPause}>
          {isPlaying ? (
            <Pause size={14} />
          ) : (
            <Play size={14} className="ml-0.5" />
          )}
        </button>
      </div>
    </>
  );
}
