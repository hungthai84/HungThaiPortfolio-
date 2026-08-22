import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { playUiSound } from "../lib/sound";
import { useLanguage } from "../context/LanguageContext";
import {
  getDefaultVietnameseVoice,
  getDefaultEnglishVoice,
} from "../utils/speechUtils";

// Translations for cover letter
import { coverLetterTranslations as viCoverLetter } from "../locales/vi/coverLetter";
import { commonTranslations as viCommon } from "../locales/vi/common";
import { buttonTranslations as viButtons } from "../locales/vi/buttons";
import { timelineTranslations as viTimeline } from "../locales/vi/timeline";

import { coverLetterTranslations as enCoverLetter } from "../locales/en/coverLetter";
import { commonTranslations as enCommon } from "../locales/en/common";
import { buttonTranslations as enButtons } from "../locales/en/buttons";
import { timelineTranslations as enTimeline } from "../locales/en/timeline";

// ============================================================================
// LANGUAGE CONTENT HOOK
// ============================================================================
export function useLanguageContent() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const t = useMemo(() => {
    if (isVi) {
      return {
        coverLetter: viCoverLetter,
        common: viCommon,
        buttons: viButtons,
        timeline: viTimeline,
      };
    } else {
      return {
        coverLetter: enCoverLetter,
        common: enCommon,
        buttons: enButtons,
        timeline: enTimeline,
      };
    }
  }, [isVi]);

  return {
    language,
    isVi,
    t,
  };
}

// ============================================================================
// TIMELINE STATE HOOK
// ============================================================================
export function useTimeline() {
  const [activeTimelineYear, setActiveTimelineYear] = useState<string | null>(
    null,
  );

  const toggleTimelineYear = useCallback((year: string) => {
    playUiSound("click");
    setActiveTimelineYear((prev) => (prev === year ? null : year));
  }, []);

  return {
    activeTimelineYear,
    toggleTimelineYear,
  };
}

// ============================================================================
// EXPAND/COLLAPSE STATE HOOK
// ============================================================================
export function useExpandCollapse() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    playUiSound("click");
    setIsExpanded((prev) => !prev);
  }, []);

  return {
    isExpanded,
    toggleExpand,
  };
}

// ============================================================================
// SPEECH SYNTHESIS HOOK
// ============================================================================
interface UseSpeechSynthesisProps {
  onUnsupported?: () => void;
}

export function useSpeechSynthesis({
  onUnsupported,
}: UseSpeechSynthesisProps = {}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stopAudio = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  }, []);

  const toggleAudio = useCallback(
    (text: string, lang = "vi-VN", rate = 0.95) => {
      playUiSound("click");
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        if (onUnsupported) onUnsupported();
        return;
      }

      if (isPlayingAudio) {
        stopAudio();
      } else {
        // Cancel any ongoing speaking first
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;

        const voices = window.speechSynthesis.getVoices();
        const isVi = lang.toLowerCase().includes("vi");
        const savedVoiceUri =
          localStorage.getItem(isVi ? "app_ai_voice_vi" : "app_ai_voice_en") ||
          "";

        let matchedVoice = voices.find((v) => v.voiceURI === savedVoiceUri);
        if (!matchedVoice) {
          matchedVoice = isVi
            ? getDefaultVietnameseVoice(voices)
            : getDefaultEnglishVoice(voices);
        }
        if (!matchedVoice) {
          matchedVoice = voices.find((v) =>
            v.lang.toLowerCase().includes(isVi ? "vi" : "en"),
          );
        }

        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onend = () => {
          setIsPlayingAudio(false);
        };

        utterance.onerror = () => {
          setIsPlayingAudio(false);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    },
    [isPlayingAudio, stopAudio, onUnsupported],
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isPlayingAudio,
    toggleAudio,
    stopAudio,
  };
}
