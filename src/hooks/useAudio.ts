import { useState, useRef, useEffect, useCallback } from "react";
import { playUiSound } from "../lib/sound";

export interface UseAudioReturn {
  isPlayingAudio: boolean;
  toggleAudio: (url: string) => void;
  stopAudio: () => void;
}

export function useAudio(): UseAudioReturn {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
    }
  }, []);

  const toggleAudio = useCallback(
    (url: string) => {
      playUiSound("click");

      if (audioRef.current) {
        if (isPlayingAudio) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlayingAudio(false);
        } else {
          audioRef.current
            .play()
            .then(() => setIsPlayingAudio(true))
            .catch((err) => console.error("Audio playback failed:", err));
        }
      } else {
        const audio = new Audio(url);
        audioRef.current = audio;

        const handleEnded = () => {
          setIsPlayingAudio(false);
        };

        audio.addEventListener("ended", handleEnded);
        audio
          .play()
          .then(() => setIsPlayingAudio(true))
          .catch((err) => console.error("Audio playback failed:", err));
      }
    },
    [isPlayingAudio],
  );

  // Prevent memory leaks by cleaning up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        // Remove listeners
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isPlayingAudio,
    toggleAudio,
    stopAudio,
  };
}
