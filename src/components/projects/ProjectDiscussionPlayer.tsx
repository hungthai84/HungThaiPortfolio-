import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Headphones, Sparkles } from "lucide-react";

interface ProjectDiscussionPlayerProps {
  title?: string;
  artist?: string;
  className?: string;
}

export function ProjectDiscussionPlayer({
  title = "Thảo luận dự án",
  artist = "AI Assistant",
  className,
}: ProjectDiscussionPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState<"repeat" | "shuffle">("repeat");

  return (
    <div className={cn("flex flex-col items-center group/he select-none scale-75 origin-bottom-right", className)}>
      {/* Floating Attention Label */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [1, 0.8, 1],
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
            filter: ["drop-shadow(0 0 0px #6366f1)", "drop-shadow(0 0 10px #6366f1)", "drop-shadow(0 0 0px #6366f1)"]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-14 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_10px_25px_-5px_rgba(79,70,229,0.5)] group-hover/he:opacity-0 transition-opacity z-50 whitespace-nowrap"
        >
          <Headphones size={12} className="animate-bounce" />
          <span className="relative">
            {title}
            <motion.span
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-24"
            />
          </span>
          <Sparkles size={12} className="text-amber-300 animate-pulse" />
        </motion.div>
      )}

      <div
        className={cn(
          "relative z-0 h-16 -mb-2 transition-all duration-300 group-hover/he:h-0",
          isPlaying ? "h-0" : "h-16"
        )}
      >
        {/* Pulsing Attention Rings - More intense */}
        {!isPlaying && (
          <>
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-indigo-500/40"
            />
            <motion.div
              animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
              className="absolute inset-0 rounded-full bg-purple-500/30"
            />
            <motion.div
              animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
              className="absolute inset-0 rounded-full bg-pink-500/20"
            />
          </>
        )}

        <motion.div
          animate={!isPlaying ? {
            y: [0, -3, 0],
            rotate: [0, -1, 1, 0]
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            className={cn(
              "duration-500 border-4 rounded-full shadow-md border-zinc-400 border-spacing-5 transition-all",
              isPlaying ? "animate-[spin_3s_linear_infinite]" : ""
            )}
          >
          <g>
            <rect width="128" height="128" fill="black"></rect>
            <circle cx="20" cy="20" r="2" fill="white"></circle>
            <circle cx="40" cy="30" r="2" fill="white"></circle>
            <circle cx="60" cy="10" r="2" fill="white"></circle>
            <circle cx="80" cy="40" r="2" fill="white"></circle>
            <circle cx="100" cy="20" r="2" fill="white"></circle>
            <circle cx="120" cy="50" r="2" fill="white"></circle>
            <circle cx="90" cy="30" r="10" fill="white" fillOpacity="0.5"></circle>
            <circle cx="90" cy="30" r="8" fill="white"></circle>
            <path
              d="M0 128 Q32 64 64 128 T128 128"
              fill="purple"
              stroke="black"
              strokeWidth="1"
            ></path>
            <path
              d="M0 128 Q32 48 64 128 T128 128"
              fill="mediumpurple"
              stroke="black"
              strokeWidth="1"
            ></path>
            <path
              d="M0 128 Q32 32 64 128 T128 128"
              fill="rebeccapurple"
              stroke="black"
              strokeWidth="1"
            ></path>
            <path
              d="M0 128 Q16 64 32 128 T64 128"
              fill="purple"
              stroke="black"
              strokeWidth="1"
            ></path>
            <path
              d="M64 128 Q80 64 96 128 T128 128"
              fill="mediumpurple"
              stroke="black"
              strokeWidth="1"
            ></path>
          </g>
        </svg>
      </motion.div>
        <div className="absolute z-10 w-8 h-8 bg-white border-4 rounded-full shadow-sm border-zinc-400 top-12 left-12"></div>
      </div>
      <div
        className="z-30 flex flex-col w-40 h-20 transition-all duration-300 bg-white shadow-md group-hover/he:h-40 group-hover/he:w-72 rounded-2xl shadow-zinc-400 overflow-hidden"
      >
        <div className="flex flex-row w-full h-0 group-hover/he:h-20 transition-all duration-100">
          <div
            className="relative flex items-center justify-center w-24 h-24 group-hover/he:-top-6 group-hover/he:-left-4 opacity-0 group-hover/he:opacity-100 group-hover/he:animate-[spin_3s_linear_infinite] transition-all duration-100"
          >
            <svg
              width="96"
              height="96"
              viewBox="0 0 128 128"
              className="duration-500 border-4 rounded-full shadow-md border-zinc-400 border-spacing-5"
            >
              <g>
                <rect width="128" height="128" fill="black"></rect>
                <circle cx="20" cy="20" r="2" fill="white"></circle>
                <circle cx="40" cy="30" r="2" fill="white"></circle>
                <circle cx="60" cy="10" r="2" fill="white"></circle>
                <circle cx="80" cy="40" r="2" fill="white"></circle>
                <circle cx="100" cy="20" r="2" fill="white"></circle>
                <circle cx="120" cy="50" r="2" fill="white"></circle>
                <circle
                  cx="90"
                  cy="30"
                  r="10"
                  fill="white"
                  fillOpacity="0.5"
                ></circle>
                <circle cx="90" cy="30" r="8" fill="white"></circle>
                <path
                  d="M0 128 Q32 64 64 128 T128 128"
                  fill="purple"
                  stroke="black"
                  strokeWidth="1"
                ></path>
                <path
                  d="M0 128 Q32 48 64 128 T128 128"
                  fill="mediumpurple"
                  stroke="black"
                  strokeWidth="1"
                ></path>
                <path
                  d="M0 128 Q32 32 64 128 T128 128"
                  fill="rebeccapurple"
                  stroke="black"
                  strokeWidth="1"
                ></path>
                <path
                  d="M0 128 Q16 64 32 128 T64 128"
                  fill="purple"
                  stroke="black"
                  strokeWidth="1"
                ></path>
                <path
                  d="M64 128 Q80 64 96 128 T128 128"
                  fill="mediumpurple"
                  stroke="black"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
            <div className="absolute z-10 w-6 h-6 bg-white border-4 rounded-full shadow-sm border-zinc-400 top-9 left-9"></div>
          </div>
          <div
            className="flex flex-col justify-center w-full pl-3 -ml-24 overflow-hidden group-hover/he:-ml-3 text-nowrap"
          >
            <p className="text-xl font-bold text-slate-900">{title}</p>
            <p className="text-zinc-600 text-sm">{artist}</p>
          </div>
        </div>
        <div
          className="flex flex-row mx-3 mt-3 bg-indigo-100 rounded-md min-h-4 group-hover/he:mt-0"
        >
          <span
            className="hidden pl-3 text-sm text-zinc-600 group-hover/he:inline-block"
          >0:00</span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            className="w-24 group-hover/he:w-full flex-grow h-1 mx-2 my-auto bg-gray-300 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <span
            className="hidden pr-3 text-sm text-zinc-600 group-hover/he:inline-block"
          >3:45</span>
        </div>
        <div
          className="flex flex-row items-center justify-center flex-grow mx-3 space-x-5"
        >
          <button
            type="button"
            onClick={() => setPlayMode(playMode === "repeat" ? "shuffle" : "repeat")}
            className="flex items-center justify-center w-0 h-full cursor-pointer group-hover/he:w-12 overflow-hidden transition-all duration-300"
          >
            {playMode === "repeat" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
            )}
          </button>
          <div className="flex items-center justify-center w-12 h-full cursor-pointer text-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </div>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center w-12 h-full cursor-pointer text-slate-800"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          <div className="flex items-center justify-center w-12 h-full cursor-pointer text-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </div>
          <div className="flex items-center justify-center w-12 h-full cursor-pointer text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#777"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-0 group-hover/he:w-12 transition-all duration-300"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
