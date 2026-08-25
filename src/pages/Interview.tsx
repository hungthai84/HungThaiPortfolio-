import React, { useRef, useState, useEffect } from "react";
import {
  Video,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sparkles,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle2,
  MessageSquare,
  Award,
  Zap,
  HelpCircle,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

import {
  INTERVIEW_QUESTIONS,
  INTERVIEW_VIDEO_1_URL as VIDEO_1_URL,
  INTERVIEW_VIDEO_2_URL as VIDEO_2_URL,
} from "../data/interviewQuestions";

export function Interview() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const videoRef = useRef<HTMLVideoElement>(null);

  // States for Video & Audio
  const [isInterviewPlaying, setIsInterviewPlaying] = useState(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);

  // Card Expand 1.1x & Blur State
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  // Active Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuestionsListOpen, setIsQuestionsListOpen] = useState(false);

  // Sync Active Question with Video Playback Time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isInterviewPlaying) return;
      const time = video.currentTime;
      let idx = INTERVIEW_QUESTIONS.findIndex(
        (q) => time >= q.startSec && time <= q.endSec
      );
      if (idx === -1) {
        // Fallback: find the last question that started before current time
        for (let i = INTERVIEW_QUESTIONS.length - 1; i >= 0; i--) {
          if (time >= INTERVIEW_QUESTIONS[i].startSec) {
            idx = i;
            break;
          }
        }
      }
      if (idx !== -1 && idx !== currentQuestionIndex) {
        setCurrentQuestionIndex(idx);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isInterviewPlaying]);

  // Handle video end event
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (isInterviewPlaying) {
        setIsInterviewPlaying(false);
        video.src = VIDEO_1_URL;
        video.loop = true;
        video.muted = true;
        video.load();
        video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isInterviewPlaying]);

  const toggleInterview = () => {
    playUiSound("click");
    const video = videoRef.current;
    if (!video) return;

    if (isInterviewPlaying) {
      setIsInterviewPlaying(false);
      video.src = VIDEO_1_URL;
      video.loop = true;
      video.muted = true;
      video.load();
      video.play().catch(() => {});
    } else {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.play().catch(() => {});
    }
  };

  // Seek video to specific question
  const handleSelectQuestion = (index: number) => {
    playUiSound("click");
    setCurrentQuestionIndex(index);
    const q = INTERVIEW_QUESTIONS[index];
    const video = videoRef.current;
    if (!video) return;

    if (!isInterviewPlaying || video.src !== VIDEO_2_URL) {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.currentTime = q.startSec;
      video.play().catch(() => {});
    } else {
      video.currentTime = q.startSec;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  };

  const currentQ = INTERVIEW_QUESTIONS[currentQuestionIndex];

  return (
    <PageLayout
      id="interview-main-card"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0 !h-[70px]"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
      pageId="interview"
      pageName="Interview Main Card"
      title={isVi ? "Phỏng Vấn Chiến Lược" : "Strategic Interview"}
      subtitle={
        isVi
          ? "Video phỏng vấn mẫu trả lời câu hỏi chiến lược về CX/CS."
          : "Sample video answering core CX/CS and operational questions."
      }
      icon={Video}
      hideToolbar={true}
    >
      <div className="relative w-full flex flex-col gap-[10px]">
        {/* BLUR BACKDROP WHEN CARD IS EXPANDED TO 1.1x */}
        <AnimatePresence>
          {isCardExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playUiSound("click");
                setIsCardExpanded(false);
              }}
              className="fixed inset-0 z-[90] flex cursor-pointer items-center justify-center bg-slate-950/80 backdrop-blur-xl transition-all duration-300"
            />
          )}
        </AnimatePresence>

        {/* MAIN RELATIVE CARD WITH EXPAND ON CLICK, 2-COLUMN GRID & BORDER GLOW */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isCardExpanded ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "card-border-glow relative mx-auto w-full max-w-6xl rounded-[15px] !p-0 backdrop-blur-none transition-all duration-500 !bg-transparent !shadow-none !border-none",
            isCardExpanded
              ? "z-[100] border-indigo-400 !bg-transparent text-white shadow-[0_0_80px_rgba(99,102,241,0.6)] ring-2 ring-indigo-400"
              : "z-10 text-slate-900 dark:text-white",
          )}
        >
          {/* VIDEO PLAYER CANVAS */}
          <div className="w-full">
            <div className="flex flex-col justify-between space-y-3">
              <div className="group relative !h-[400px] w-full overflow-hidden rounded-[15px] border border-slate-700/50 bg-slate-950 shadow-2xl">
                {/* VIDEO ELEMENT */}
                <video
                  ref={videoRef}
                  controls={isInterviewPlaying}
                  autoPlay
                  loop={!isInterviewPlaying}
                  muted={!isInterviewPlaying || !isVideoAudioOn}
                  playsInline
                  poster="https://i.ibb.co/ynnj4BXr/H-nh-tr-nh-ki-n-t-o.png"
                  className="!h-[400px] w-full rounded-[15px] object-cover transition-transform duration-700"
                  src={isInterviewPlaying ? VIDEO_2_URL : VIDEO_1_URL}
                />

                {/* TRANSPARENT OVERLAY LAYER */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-transparent" />

                {/* CIRCULAR QUESTION TRIGGER AT BOTTOM LEFT */}
                <div className="pointer-events-auto absolute left-3 bottom-3 z-30">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playUiSound("click");
                      setIsQuestionsListOpen(!isQuestionsListOpen);
                    }}
                    type="button"
                    title={isVi ? "Danh sách câu hỏi phỏng vấn" : "Interview questions list"}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-slate-950/90 p-1 px-3.5 py-2 text-xs font-black text-white shadow-lg backdrop-blur-md transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-sm",
                      isQuestionsListOpen
                        ? "from-emerald-600 to-teal-600 bg-gradient-to-r shadow-[0_0_20px_rgba(16,185,129,0.5)] border-emerald-400"
                        : "from-blue-600 via-indigo-600 to-violet-600 bg-gradient-to-r shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:from-blue-500 hover:to-violet-500"
                    )}
                  >
                    <div className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full shadow-inner sm:h-7 sm:w-7 transition-transform duration-500",
                      isQuestionsListOpen ? "rotate-[360deg] bg-emerald-500/20 text-emerald-300" : "bg-indigo-500/20 text-indigo-300"
                    )}>
                      <HelpCircle size={14} className="sm:size-[16px]" />
                    </div>
                    <span>
                      {isQuestionsListOpen
                        ? (isVi ? "Câu hỏi hiện tại" : "Show Current Question")
                        : (isVi ? "Xem 13 Câu hỏi" : "Show 13 Questions")}
                    </span>
                    <Sparkles
                      size={14}
                      className={cn(
                        "shrink-0 text-amber-300",
                        isQuestionsListOpen ? "animate-spin" : "animate-bounce"
                      )}
                    />
                  </motion.button>
                </div>

                {/* UNIFIED PLAY & AUDIO CONTROL BUTTON AT BOTTOM RIGHT */}
                <div className="pointer-events-auto absolute right-3 bottom-3 z-20">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleInterview}
                    type="button"
                    className="flex w-[281px] h-[51px] cursor-pointer items-center justify-between px-3.5 py-2 rounded-full border-2 border-indigo-400/80 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_25px_rgba(99,102,241,0.6)] backdrop-blur-md transition-all duration-300 hover:from-blue-500 hover:to-violet-500 text-xs font-black text-white sm:text-sm"
                    style={{ width: '281px', height: '51px' }}
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-md sm:h-7 sm:w-7">
                      {!isInterviewPlaying ? (
                        <Play
                          size={14}
                          className="translate-x-0.5 fill-indigo-600"
                        />
                      ) : (
                        <Pause size={14} className="fill-indigo-600" />
                      )}
                    </div>
                    <span>
                      {!isInterviewPlaying
                        ? isVi
                          ? "Phát phỏng vấn mẫu"
                          : "Play Sample Interview"
                        : isVi
                          ? "Tạm dừng phỏng vấn"
                          : "Pause Interview"}
                    </span>
                    {!isInterviewPlaying && (
                      <Sparkles
                        size={14}
                        className="shrink-0 animate-bounce text-amber-300"
                      />
                    )}

                    {/* Integrated Divider and Audio Button */}
                    <div className="mx-1 h-4 w-px shrink-0 bg-white/20" />

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiSound("click");
                        const nextAudio = !isVideoAudioOn;
                        setIsVideoAudioOn(nextAudio);
                        if (videoRef.current) {
                          videoRef.current.muted = !nextAudio;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          playUiSound("click");
                          const nextAudio = !isVideoAudioOn;
                          setIsVideoAudioOn(nextAudio);
                          if (videoRef.current) {
                            videoRef.current.muted = !nextAudio;
                          }
                        }
                      }}
                      title={
                        isVideoAudioOn
                          ? isVi
                            ? "Tắt âm thanh"
                            : "Mute Audio"
                          : isVi
                            ? "Bật âm thanh"
                            : "Unmute Audio"
                      }
                      className={cn(
                        "flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all text-white hover:bg-white/10 active:scale-90",
                        isVideoAudioOn ? "bg-white/15" : "bg-rose-500/80"
                      )}
                    >
                      {isVideoAudioOn ? (
                        <Volume2 size={13} className="animate-pulse" />
                      ) : (
                        <VolumeX size={13} />
                      )}
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

          {/* ACTIVE SPOTLIGHT QUESTION CARD */}
          <div className="mt-[10px] rounded-[15px] border border-indigo-200/80 dark:border-indigo-500/40 bg-white/90 dark:bg-slate-900/90 pt-[20px] pb-4 px-4 sm:pt-[20px] sm:pb-5 sm:px-5 backdrop-blur-xl !h-[220px] overflow-y-auto custom-scrollbar text-slate-800 dark:text-slate-100 shadow-xl">
            <AnimatePresence mode="wait">
              {isQuestionsListOpen ? (
                <motion.div
                  key="questions-list"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/80 dark:border-indigo-500/30 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-black text-white shadow-md animate-pulse">
                        ?
                      </span>
                      <h3 className="text-sm font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {isVi ? "Danh sách 13 câu hỏi phỏng vấn" : "13 Interview Questions Timeline"}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-bold">
                      {isVi ? "Chọn một câu hỏi dưới đây để nhảy tới phần tương ứng" : "Select a question below to jump to that section"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                    {INTERVIEW_QUESTIONS.map((q, idx) => {
                      const isActive = currentQuestionIndex === idx;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => {
                            handleSelectQuestion(idx);
                            setIsQuestionsListOpen(false); // return to details view on selection
                          }}
                          className={cn(
                            "w-full flex items-start gap-2.5 rounded-xl h-[51px] px-[15px] py-[15px] text-left text-xs transition-all border",
                            isActive
                              ? "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-400 dark:border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                              : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                          )}
                          style={{ height: '51px', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '15px', paddingRight: '15px' }}
                        >
                          <span className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-lg text-[10px] font-black shadow-sm transition-colors",
                            isActive ? "bg-indigo-600 text-white animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          )}>
                            {q.stt}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-0.5">
                                <Clock size={9} />
                                {q.timestamp}
                              </span>
                              {isActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              )}
                            </div>
                            <p className="mt-1 text-xs leading-normal font-medium line-clamp-2 text-slate-800 dark:text-slate-200">
                              {isVi ? q.questionVi : q.questionEn}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="active-question-detail"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/80 dark:border-indigo-500/30 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white shadow-md">
                        {currentQ.stt}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-indigo-300 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-500/20 px-3 py-0.5 text-xs font-bold text-indigo-800 dark:text-indigo-200">
                        <Clock size={12} />
                        {currentQ.timestamp}
                      </span>
                    </div>
                    <span className="rounded-full border border-amber-500/35 bg-amber-50 dark:bg-amber-500/20 px-3 py-1 text-xs font-black text-amber-900 dark:text-amber-300 shadow-2xs">
                      {isVi ? "Tóm tắt: " : "Summary: "}
                      {isVi ? currentQ.summaryVi : currentQ.summaryEn}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-indigo-700 dark:text-indigo-300 sm:text-lg">
                      {isVi ? currentQ.questionVi : currentQ.questionEn}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-200 sm:text-sm">
                      {isVi ? currentQ.answerVi : currentQ.answerEn}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
      </div>
    </PageLayout>
  );
}
