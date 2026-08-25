import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  GraduationCap,
  Copy,
  Check,
  Search,
  Award,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Code,
  LineChart,
  ShieldAlert,
  Target,
  Crown,
  Users,
  Presentation,
  UserPlus,
  Headphones,
  Network,
  Server,
  Calendar,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileCheck,
  Video,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  Award as CertificateIcon,
  QrCode,
  Maximize2
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export interface EducationalCardData {
  id: string;
  categoryKey: 'degree' | 'certificate' | 'training' | 'skills';
  categoryVi: string;
  title: string;
  iconKey: string;
  color: string;
  year: string;
  school: string;
  major: string;
  badgeText: string;
  cred: string;
  img: string;
  diplomaImg?: string;
  summaryVi: string;
  learnedVi: string[];
  resultsVi: string[];
  galleryImages?: { url: string; caption: string }[];
  certImages?: { url: string; caption: string }[];
}

const COLOR_PALETTE = [
  "#2563eb", // Blue (Cử nhân CNTT)
  "#0284c7", // Sky (Web & AI / Data)
  "#8b5cf6", // Purple (Quản lý cấp cao)
  "#e11d48", // Rose (Quản lý rủi ro)
  "#6366f1", // Indigo (Quản lý dự án)
  "#059669", // Emerald (Quản lý cấp trung)
  "#d97706", // Amber (Thuyết trình)
  "#0d9488", // Teal (Phỏng vấn)
  "#0891b2", // Cyan (CCNA)
  "#7c3aed", // Violet (MCSA)
  "#ec4899", // Pink (Mobifone CC)
  "#10b981", // Green (Big Data)
];

// 3D Gradient SVG Vector Icon Component from Showcase specification
export function EduGradientIcon({ iconKey, size = 24, className = "" }: { iconKey: string; size?: number; className?: string }) {
  const s = size;
  switch (iconKey) {
    case 'headset-chat':
    case 'headset':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="headsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8"/>
              <stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
            <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e"/>
              <stop offset="100%" stopColor="#a855f7"/>
            </linearGradient>
          </defs>
          <path d="M8 24C8 15.163 15.163 8 24 8C32.837 8 40 15.163 40 24" stroke="url(#headsetGrad)" strokeWidth="4.5" strokeLinecap="round"/>
          <rect x="5" y="22" width="6" height="12" rx="3" fill="url(#headsetGrad)"/>
          <rect x="37" y="22" width="6" height="12" rx="3" fill="url(#headsetGrad)"/>
          <rect x="14" y="19" width="20" height="14" rx="7" fill="url(#bubbleGrad)"/>
          <circle cx="19" cy="26" r="1.5" fill="#ffffff"/>
          <circle cx="24" cy="26" r="1.5" fill="#ffffff"/>
          <circle cx="29" cy="26" r="1.5" fill="#ffffff"/>
        </svg>
      );

    case 'web-dev':
    case 'code':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
            <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>
          </defs>
          <rect x="6" y="8" width="36" height="32" rx="6" fill="url(#webGrad)" fillOpacity="0.15" stroke="url(#webGrad)" strokeWidth="3"/>
          <circle cx="12" cy="14" r="1.8" fill="#ef4444"/>
          <circle cx="17" cy="14" r="1.8" fill="#f59e0b"/>
          <circle cx="22" cy="14" r="1.8" fill="#10b981"/>
          <path d="M17 28L13 24L17 20" stroke="url(#codeGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M31 20L35 24L31 28" stroke="url(#codeGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M26 19L22 29" stroke="url(#codeGrad)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );

    case 'data-analytics':
    case 'chart':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#1d4ed8"/>
            </linearGradient>
            <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#db2777"/>
            </linearGradient>
            <linearGradient id="barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#059669"/>
            </linearGradient>
          </defs>
          <rect x="8" y="24" width="7" height="16" rx="3.5" fill="url(#barGrad1)"/>
          <rect x="20" y="16" width="7" height="24" rx="3.5" fill="url(#barGrad2)"/>
          <rect x="32" y="10" width="7" height="30" rx="3.5" fill="url(#barGrad3)"/>
          <path d="M8 18L18 12L28 17L40 6" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'risk-management':
    case 'shield':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24"/><stop offset="100%" stopColor="#d97706"/>
            </linearGradient>
            <linearGradient id="innerShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#4338ca"/>
            </linearGradient>
          </defs>
          <path d="M24 6L38 12V22C38 31.5 32 38.5 24 42C16 38.5 10 31.5 10 22V12L24 6Z" fill="url(#innerShield)" fillOpacity="0.2" stroke="url(#shieldGrad)" strokeWidth="3.5" strokeLinejoin="round"/>
          <path d="M18 23L22 27L30 18" stroke="#34d399" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'project-management':
    case 'target':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399"/><stop offset="100%" stopColor="#059669"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="17" stroke="url(#targetGrad)" strokeWidth="3.5"/>
          <circle cx="24" cy="24" r="10" stroke="#38bdf8" strokeWidth="3"/>
          <circle cx="24" cy="24" r="4" fill="#f43f5e"/>
          <path d="M34 14L42 6" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round"/>
        </svg>
      );

    case 'executive-management':
    case 'crown':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047"/><stop offset="100%" stopColor="#ca8a04"/>
            </linearGradient>
          </defs>
          <path d="M8 34L11 16L19 25L24 12L29 25L37 16L40 34H8Z" fill="url(#goldGrad)" stroke="#a16207" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="11" cy="14" r="2.5" fill="#f43f5e"/>
          <circle cx="24" cy="10" r="2.5" fill="#3b82f6"/>
          <circle cx="37" cy="14" r="2.5" fill="#10b981"/>
          <rect x="8" y="34" width="32" height="5" rx="2.5" fill="#a16207"/>
        </svg>
      );

    case 'mid-management':
    case 'users':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="usersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#4f46e5"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="14" r="6" fill="url(#usersGrad)"/>
          <path d="M14 30C14 24.5 18.5 22 24 22C29.5 22 34 24.5 34 30V32H14V30Z" fill="url(#usersGrad)"/>
          <circle cx="11" cy="20" r="4" fill="#38bdf8"/>
          <path d="M5 32C5 28 8 26 12 26V32H5Z" fill="#38bdf8"/>
          <circle cx="37" cy="20" r="4" fill="#ec4899"/>
          <path d="M43 32C43 28 40 26 36 26V32H43Z" fill="#ec4899"/>
        </svg>
      );

    case 'training-presentation':
    case 'presentation':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="boardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/>
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="32" height="22" rx="4" fill="url(#boardGrad)" stroke="#1d4ed8" strokeWidth="2.5"/>
          <circle cx="16" cy="17" r="3" fill="#ffffff"/>
          <path d="M23 15H32" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M23 21H29" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M24 30V40" stroke="#475569" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M16 40H32" stroke="#475569" strokeWidth="3.5" strokeLinecap="round"/>
        </svg>
      );

    case 'interview-skills':
    case 'interview':
    case 'briefcase':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#7c3aed"/>
            </linearGradient>
          </defs>
          <circle cx="21" cy="21" r="13" stroke="url(#searchGrad)" strokeWidth="4"/>
          <path d="M31 31L41 41" stroke="url(#searchGrad)" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="21" cy="18" r="4" fill="#38bdf8"/>
          <path d="M14 27C14 24 17 23 21 23C25 23 28 24 28 27" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'it-degree':
    case 'graduation':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#1e1b4b"/>
            </linearGradient>
          </defs>
          <path d="M24 8L6 18L24 28L42 18L24 8Z" fill="url(#capGrad)" stroke="#60a5fa" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M13 22.5V32C13 35.5 18 38 24 38C30 38 35 35.5 35 32V22.5" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round"/>
          <path d="M38 20V32" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="38" cy="34" r="2.5" fill="#f59e0b"/>
        </svg>
      );

    case 'ccna-network':
    case 'network':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#047857"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="16" fill="url(#netGrad)" fillOpacity="0.2" stroke="url(#netGrad)" strokeWidth="3.5"/>
          <circle cx="24" cy="24" r="5" fill="#10b981"/>
          <circle cx="12" cy="14" r="3.5" fill="#38bdf8"/><circle cx="36" cy="14" r="3.5" fill="#38bdf8"/>
          <circle cx="12" cy="34" r="3.5" fill="#f43f5e"/><circle cx="36" cy="34" r="3.5" fill="#f43f5e"/>
          <path d="M15 16L20 21M28 21L33 16M15 32L20 27M28 27L33 32" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'mcsa-server':
    case 'server':
      return (
        <svg className={`inline-block ${className}`} width={s} height={s} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="srvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7"/><stop offset="100%" stopColor="#0369a1"/>
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="32" height="8" rx="2.5" fill="url(#srvGrad)" stroke="#38bdf8" strokeWidth="2"/>
          <rect x="8" y="20" width="32" height="8" rx="2.5" fill="url(#srvGrad)" stroke="#38bdf8" strokeWidth="2"/>
          <rect x="8" y="32" width="32" height="8" rx="2.5" fill="url(#srvGrad)" stroke="#38bdf8" strokeWidth="2"/>
          <circle cx="14" cy="12" r="1.5" fill="#4ade80"/><circle cx="19" cy="12" r="1.5" fill="#f87171"/>
          <circle cx="14" cy="24" r="1.5" fill="#4ade80"/><circle cx="19" cy="24" r="1.5" fill="#f87171"/>
          <circle cx="14" cy="36" r="1.5" fill="#4ade80"/><circle cx="19" cy="36" r="1.5" fill="#f87171"/>
        </svg>
      );

    default:
      return <GraduationCap className={`inline-block ${className}`} size={s} />;
  }
}

// Audio Sound Generators (Web Audio API)
let audioCtx: AudioContext | null = null;
function initAudio() {
  if (typeof window === "undefined") return;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function playBookOpenSound() {
  initAudio();
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.35);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.35);

    const bufferSize = audioCtx.sampleRate * 0.3;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.25);
    filter.Q.value = 1.5;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.linearRampToValueAtTime(0.2, now + 0.08);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    whiteNoise.start(now);
    whiteNoise.stop(now + 0.3);
  } catch (e) {
    console.log("Audio playback error:", e);
  }
}

export function playPageFlipSound() {
  initAudio();
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.linearRampToValueAtTime(400, now + 0.18);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.12, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    whiteNoise.start(now);
    whiteNoise.stop(now + 0.18);
  } catch (e) {
    console.log("Audio playback error:", e);
  }
}

const EDUCATIONAL_DATA: EducationalCardData[] = [
  {
    id: 'bachelor-it',
    categoryKey: 'degree',
    categoryVi: 'Bằng cấp chính quy',
    title: 'Cử nhân Công nghệ Thông tin',
    iconKey: 'it-degree',
    color: '#2563eb',
    year: '2003 – 2007',
    school: 'Trường Đại học Công nghệ Sài Gòn (STU)',
    major: 'Công nghệ Thông tin (Software & Systems)',
    badgeText: 'Chính quy Đại học',
    cred: 'STU-BS-2007-0881',
    img: 'https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png',
    diplomaImg: 'https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png',
    summaryVi: 'Được đào tạo nền tảng chính quy về lập trình, cơ sở dữ liệu, phân tích thiết kế hệ thống, mạng máy tính và phát triển phần mềm, tạo nền tảng vững chắc cho sự nghiệp công nghệ.',
    learnedVi: [
      'Lập trình phần mềm, Cấu trúc dữ liệu và Giải thuật.',
      'Cơ sở dữ liệu quan hệ (RDBMS) & Truy vấn dữ liệu SQL.',
      'Phân tích và thiết kế hệ thống thông tin doanh nghiệp.',
      'Hệ điều hành, Kiến trúc máy tính & Mạng máy tính.'
    ],
    resultsVi: [
      'Xây dựng nền tảng tư duy công nghệ và lập trình vững chắc.',
      'Phân tích yêu cầu nghiệp vụ theo tư duy hệ thống logic.',
      'Hiểu sâu thiết kế cơ sở dữ liệu và kiến trúc phần mềm.'
    ],
    galleryImages: [
      { url: 'https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png', caption: 'Lễ tốt nghiệp Cử nhân CNTT - Đại học Công nghệ Sài Gòn' },
      { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', caption: 'Thực hành phòng Lab mạng & Lập trình phần mềm' },
      { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', caption: 'Bảo vệ đồ án tốt nghiệp cử nhân' },
      { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', caption: 'Kỷ niệm khóa học STU IT-03' }
    ],
    certImages: [
      { url: 'https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png', caption: 'Bằng Cử Nhân CNTT Chính Quy' },
      { url: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80', caption: 'Con Dấu & Chữ Ký Xác Thực Hiệu Trưởng' }
    ]
  },
  {
    id: 'web-design-2024',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Thiết kế Webpages & AI',
    iconKey: 'web-dev',
    color: '#0284c7',
    year: '2023 – 2024',
    school: 'Tự học & Phát triển chuyên môn',
    major: 'Phát triển Web, UI/UX & Generative AI',
    badgeText: 'Live Interactive Session',
    cred: 'WEB-DES-2024-001',
    img: 'https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png',
    diplomaImg: 'https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png',
    summaryVi: 'Được trang bị kiến thức về phát triển website hiện đại với HTML5, CSS3, JavaScript, PHP và C++, đồng thời nâng cao kỹ năng thiết kế giao diện Responsive, tối ưu trải nghiệm người dùng (UI/UX) và ứng dụng AI trong phát triển website.',
    learnedVi: [
      'Phát triển Website hiện đại với HTML5, CSS3, JavaScript, PHP & C++.',
      'Thiết kế giao diện Responsive & Tối ưu trải nghiệm người dùng (UI/UX).',
      'Ứng dụng Generative AI & AI Agents trong lập trình website.',
      'Tối ưu hiệu năng, chuẩn SEO và nâng cao tương tác người dùng.'
    ],
    resultsVi: [
      'Nắm vững nguyên lý thiết kế và trải nghiệm người dùng trên website.',
      'Xây dựng giao diện trực quan, hiện đại và tối ưu chuyển đổi.',
      'Ứng dụng phát triển cổng thông tin và công cụ số cho doanh nghiệp.'
    ],
    galleryImages: [
      { url: 'https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png', caption: 'Thiết kế hệ thống giao diện Web Interactive Portal' },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', caption: 'Mockup UI/UX & Tối ưu trải nghiệm Responsive' }
    ]
  },
  {
    id: 'data-analytics',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Phân tích dữ liệu Big Data',
    iconKey: 'data-analytics',
    color: '#10b981',
    year: '2018 – 2019',
    school: 'Phát triển chuyên môn',
    major: 'Khoa học Dữ liệu & Quản trị Data-driven',
    badgeText: 'Executive Workshop',
    cred: 'DATA-BD-2019-088',
    img: 'https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png',
    diplomaImg: 'https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png',
    summaryVi: 'Đào tạo chuyên sâu về tư duy phân tích dữ liệu lớn, khai phá dữ liệu khách hàng (Data Mining), xây dựng Dashboard báo cáo thông minh và ứng dụng Data-driven Decision Making vào quản trị.',
    learnedVi: [
      'Tư duy phân tích dữ liệu lớn (Big Data Fundamentals).',
      'Khai phá dữ liệu (Data Mining) & Mô hình hóa dữ liệu.',
      'Xây dựng Dashboard trực quan hóa dữ liệu (Business Intelligence).',
      'Ứng dụng Data-driven vào quyết định kinh doanh & CSKH.'
    ],
    resultsVi: [
      'Chuyển đổi dữ liệu thô thành thông tin chiến lược có giá trị.',
      'Xây dựng hệ thống báo cáo thời gian thực phục vụ điều hành.',
      'Phát hiện xu hướng dịch vụ và hành vi khách hàng chính xác.'
    ]
  },
  {
    id: 'risk-management',
    categoryKey: 'skills',
    categoryVi: 'Chuyên môn & Quản trị',
    title: 'Quản lý rủi ro',
    iconKey: 'risk-management',
    color: '#e11d48',
    year: '2017',
    school: 'Prudential Việt Nam',
    major: 'Quản trị Dự án & Vận hành',
    badgeText: 'Kỹ năng nâng cao',
    cred: 'PRU-RM-2017-042',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    diplomaImg: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    summaryVi: 'Được đào tạo phương pháp nhận diện, đánh giá và kiểm soát rủi ro, xây dựng kế hoạch ứng phó nhằm giảm thiểu tác động và đảm bảo hiệu quả vận hành dự án.',
    learnedVi: [
      'Nhận diện Rủi ro Dự án & Vận hành.',
      'Đánh giá & Định lượng tác động rủi ro.',
      'Xây dựng Kế hoạch Ứng phó Sự cố (BCP).',
      'Kiểm soát & Giám sát liên tục rủi ro.'
    ],
    resultsVi: [
      'Giảm thiểu thiệt hại và biến động ngoài dự kiến trong vận hành dự án.',
      'Xây dựng kịch bản ứng phó sự cố linh hoạt, đảm bảo tính liên tục vận hành.',
      'Nâng cao độ tin cậy và an toàn tài nguyên cho toàn bộ tổ chức.'
    ]
  },
  {
    id: 'project-management',
    categoryKey: 'skills',
    categoryVi: 'Chuyên môn & Quản trị',
    title: 'Quản lý Dự án',
    iconKey: 'project-management',
    color: '#6366f1',
    year: '2016',
    school: 'Prudential Việt Nam',
    major: 'Quản trị Dự án Toàn diện',
    badgeText: 'Kỹ năng nâng cao',
    cred: 'PRU-PM-2016-109',
    img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    diplomaImg: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    summaryVi: 'Nắm vững quy trình quản lý dự án từ lập kế hoạch, phân bổ nguồn lực, quản lý tiến độ, ngân sách, chất lượng đến đánh giá hiệu quả sau khi triển khai.',
    learnedVi: [
      'Lập Kế hoạch & Xác định Phạm vi (Scope).',
      'Quản lý Ngân sách & Timeline Dự án.',
      'Phân bổ Nguồn lực & Nhân sự hiệu quả.',
      'Đánh giá & Nghiệm thu Sản phẩm đầu ra.'
    ],
    resultsVi: [
      'Hoàn thành dự án đúng tiến độ và kiểm soát tối ưu ngân sách cam kết.',
      'Phối hợp hiệu quả các nguồn lực nhân sự, giảm thiểu chồng chéo công việc.',
      'Đảm bảo chất lượng sản phẩm đầu ra đạt tiêu chuẩn cao nhất.'
    ]
  },
  {
    id: 'executive-management',
    categoryKey: 'skills',
    categoryVi: 'Lãnh đạo & Điều hành',
    title: 'Quản lý cấp cao',
    iconKey: 'executive-management',
    color: '#8b5cf6',
    year: '2015',
    school: 'Dale Carnegie Training',
    major: 'Lãnh đạo & Điều hành Chiến lược',
    badgeText: 'Lãnh đạo Cao cấp',
    cred: 'DC-EM-2015-018',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    diplomaImg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    summaryVi: 'Phát triển tư duy lãnh đạo, quản trị chiến lược, xây dựng đội ngũ và nâng cao năng lực điều hành tổ chức trong môi trường doanh nghiệp.',
    learnedVi: [
      'Tư duy Lãnh đạo Chiến lược chuẩn Dale Carnegie.',
      'Quản trị Doanh nghiệp & Văn hóa Tổ chức.',
      'Phát triển Đội ngũ Kế thừa & Truyền cảm hứng.',
      'Quản trị Biến động & Đổi mới Doanh nghiệp.'
    ],
    resultsVi: [
      'Định hình tầm nhìn chiến lược dài hạn và dẫn dắt tổ chức bứt phá.',
      'Xây dựng văn hóa gắn kết, truyền cảm hứng cho đội ngũ lãnh đạo kế thừa.',
      'Nâng cao năng lực điều hành và ra quyết định chiến lược trong môi trường biến động.'
    ]
  },
  {
    id: 'mid-management',
    categoryKey: 'skills',
    categoryVi: 'Lãnh đạo & Điều hành',
    title: 'Quản lý cấp trung',
    iconKey: 'mid-management',
    color: '#059669',
    year: '2014',
    school: 'Dale Carnegie Training',
    major: 'Quản trị Nhân sự & Đội ngũ',
    badgeText: 'Quản lý Cấp trung',
    cred: 'DC-MM-2014-055',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    diplomaImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    summaryVi: 'Hoàn thiện kỹ năng quản lý nhân sự, phân công công việc, giám sát hiệu quả thực hiện, huấn luyện nhân viên và phối hợp giữa các phòng ban.',
    learnedVi: [
      'Phân công & Giám sát Thực thi Công việc.',
      'Huấn luyện (Coaching) & Phát triển Kỹ năng.',
      'Quản lý Hiệu suất KPI & Đánh giá Nhân sự.',
      'Giao tiếp & Phối hợp Liên phòng ban.'
    ],
    resultsVi: [
      'Tăng cường hiệu suất thực thi và khả năng hoàn thành mục tiêu của nhóm.',
      'Giải quyết mâu thuẫn nội bộ, tạo động lực làm việc tích cực cho nhân viên.',
      'Kết nối nhuần nhuyễn giữa mục tiêu phòng ban với định hướng chung.'
    ]
  },
  {
    id: 'training-presentation',
    categoryKey: 'skills',
    categoryVi: 'Sư phạm & Giảng dạy',
    title: 'Đào tạo & Thuyết trình',
    iconKey: 'training-presentation',
    color: '#d97706',
    year: '2013',
    school: 'VietnamWorks',
    major: 'Sư phạm & Giảng dạy Nội bộ',
    badgeText: 'Chuyên gia Đào tạo',
    cred: 'VNW-TP-2013-009',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    diplomaImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    summaryVi: 'Nâng cao kỹ năng xây dựng chương trình đào tạo, thiết kế nội dung, thuyết trình và truyền đạt kiến thức hiệu quả cho nhiều đối tượng.',
    learnedVi: [
      'Phân tích Nhu cầu Đào tạo (TNA).',
      'Thiết kế Giáo trình & Bài giảng Đa phương tiện.',
      'Kỹ thuật Thuyết trình Truyền cảm hứng.',
      'Phương pháp Sư phạm Tương tác Hiện đại.'
    ],
    resultsVi: [
      'Xây dựng và triển khai chương trình đào tạo nội bộ bài bản, chuyên nghiệp.',
      'Đào tạo nghiệp vụ CSKH và quy chuẩn hóa chất lượng dịch vụ.',
      'Nâng cao khả năng thuyết trình trước đám đông và truyền cảm hứng làm việc.'
    ]
  },
  {
    id: 'interview-skills',
    categoryKey: 'skills',
    categoryVi: 'Tuyển dụng & Nhân sự',
    title: 'Kỹ năng Phỏng vấn',
    iconKey: 'interview-skills',
    color: '#0d9488',
    year: '2013',
    school: 'VietnamWorks',
    major: 'Tuyển dụng & Đánh giá Năng lực',
    badgeText: 'Tuyển dụng Chuyên nghiệp',
    cred: 'VNW-IS-2013-024',
    img: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=800&q=80',
    diplomaImg: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=800&q=80',
    summaryVi: 'Trang bị phương pháp tuyển dụng, kỹ thuật phỏng vấn, đánh giá năng lực ứng viên và lựa chọn nhân sự phù hợp với yêu cầu công việc.',
    learnedVi: [
      'Xây dựng Tiêu chí Tuyển dụng & Competency Framework.',
      'Phỏng vấn Hành vi STAR Method.',
      'Đánh giá Năng lực & Phù hợp Văn hóa.',
      'Chiến lược Thu hút & Giữ chân Nhân tài.'
    ],
    resultsVi: [
      'Tuyển dụng chính xác người phù hợp với văn hóa và yêu cầu chuyên môn.',
      'Tối ưu hóa thời gian và chi phí tuyển dụng trong quy trình nhân sự.',
      'Xây dựng hình ảnh thương hiệu nhà tuyển dụng chuyên nghiệp trong mắt ứng viên.'
    ]
  },
  {
    id: 'ccna-network',
    categoryKey: 'certificate',
    categoryVi: 'Chứng chỉ quốc tế',
    title: 'Chứng chỉ CCNA Cisco',
    iconKey: 'ccna-network',
    color: '#0891b2',
    year: '2008',
    school: 'Cisco Networking Academy',
    major: 'Cisco Certified Network Associate (Network Infrastructure)',
    badgeText: 'Quốc tế Cisco Certified',
    cred: 'CISCO-CCNA-2008-884',
    img: 'https://i.ibb.co/3ykG3F8t/M-ng-CCNA.png',
    diplomaImg: 'https://i.ibb.co/3ykG3F8t/M-ng-CCNA.png',
    summaryVi: 'Chứng chỉ quốc tế về hạ tầng mạng máy tính Cisco, bao gồm định tuyến (Routing), chuyển mạch (Switching), bảo mật mạng và tối ưu hạ tầng mạng doanh nghiệp.',
    learnedVi: [
      'Mô hình OSI & Chồng giao thức TCP/IP.',
      'Cấu hình Router & Switch Cisco chuyên sâu.',
      'Định tuyến VLAN, OSPF, EIGRP & NAT/PAT.',
      'An ninh hạ tầng mạng & Tường lửa Access List.'
    ],
    resultsVi: [
      'Quản trị hạ tầng mạng doanh nghiệp hoạt động ổn định 24/7.',
      'Thiết kế giải pháp kết nối mạng an toàn và tối ưu băng thông.',
      'Cấu hình và khắc phục sự cố mạng máy tính quy mô lớn.'
    ]
  },
  {
    id: 'mcsa-server',
    categoryKey: 'certificate',
    categoryVi: 'Chứng chỉ quốc tế',
    title: 'Chứng chỉ MCSA Microsoft',
    iconKey: 'mcsa-server',
    color: '#7c3aed',
    year: '2008',
    school: 'Microsoft Certified Systems',
    major: 'Microsoft Certified Systems Administrator',
    badgeText: 'Quốc tế Microsoft Certified',
    cred: 'MS-MCSA-2008-992',
    img: 'https://i.ibb.co/hRqVndD4/H-th-ng-MCSA.png',
    diplomaImg: 'https://i.ibb.co/hRqVndD4/H-th-ng-MCSA.png',
    summaryVi: 'Chứng chỉ chuyên gia quản trị hệ thống máy chủ Windows Server, Active Directory, Domain Controller, Group Policy và dịch vụ mạng doanh nghiệp của Microsoft.',
    learnedVi: [
      'Quản trị Windows Server & Active Directory (AD DS).',
      'Thiết lập Group Policy Object (GPO) & Phân quyền User.',
      'Cấu hình Dịch vụ DNS, DHCP, File Server, Print Server.',
      'Sao lưu (Backup) & Phục hồi sự cố hệ thống (Disaster Recovery).'
    ],
    resultsVi: [
      'Vận hành và bảo mật hệ thống máy chủ doanh nghiệp chuyên nghiệp.',
      'Quản lý tập trung tài khoản, máy tính và chính sách bảo mật toàn công ty.',
      'Đảm bảo hệ thống vận hành liên tục, giảm thiểu thời gian Downtime.'
    ]
  },
  {
    id: 'mobifone-cc',
    categoryKey: 'skills',
    categoryVi: 'Dịch vụ Khách hàng',
    title: 'Tổng đài viên MobiFone',
    iconKey: 'headset-chat',
    color: '#ec4899',
    year: '2007',
    school: 'MobiFone Telecommunication',
    major: 'Chăm sóc Khách hàng & Contact Center',
    badgeText: 'Chuyên sâu Nghiệp vụ',
    cred: 'MBF-CC-2007-312',
    img: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80',
    diplomaImg: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80',
    summaryVi: 'Được đào tạo chuyên sâu về nghiệp vụ Contact Center, quy trình chăm sóc khách hàng, kỹ năng giao tiếp, xử lý tình huống và tiêu chuẩn chất lượng dịch vụ.',
    learnedVi: [
      'Nghiệp vụ Contact Center & Hệ thống CRM Tổng đài.',
      'Kỹ năng Giao tiếp & Chuẩn hóa Giọng nói qua điện thoại.',
      'Xử lý Khiếu nại & Giải quyết Khách hàng giận dữ.',
      'Tiêu chuẩn Kiểm soát Chất lượng Cuộc gọi (QA Standard).'
    ],
    resultsVi: [
      'Gia tăng chỉ số hài lòng khách hàng (CSAT) và tỷ lệ xử lý ngay lần đầu (FCR).',
      'Làm chủ kỹ năng kiềm chế cảm xúc và giải quyết sự cố khách hàng căng thẳng.',
      'Đạt các tiêu chuẩn kiểm định chất lượng cuộc gọi cao nhất từ MobiFone.'
    ]
  }
];

export function Education() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const [colorStep, setColorStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'degree' | 'certificate' | 'training'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // 3D Flipbook Viewer State (HTML Spec)
  const [activeReaderBook, setActiveReaderBook] = useState<EducationalCardData | null>(null);
  const [pagePairIndex, setPagePairIndex] = useState<number>(0); // 0 = Cover, 1 = Spread 1, 2 = Spread 2, 3 = Spread 3
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [isUnfolding, setIsUnfolding] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward' | null>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [lightboxImg, setLightboxImg] = useState<{ url: string; caption: string } | null>(null);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto color rotation for dynamic multi-color visual effect
  useEffect(() => {
    const timer = setInterval(() => {
      setColorStep((prev) => (prev + 1) % COLOR_PALETTE.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation for Reader Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeReaderBook) return;
      if (e.key === 'Escape') {
        if (lightboxImg) {
          setLightboxImg(null);
        } else {
          closeBookReader();
        }
      } else if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReaderBook, pagePairIndex, isFlipping, lightboxImg]);

  // AutoPlay logic
  useEffect(() => {
    if (autoPlay && activeReaderBook) {
      autoPlayRef.current = setInterval(() => {
        setPagePairIndex((prev) => {
          const next = (prev + 1) % 4;
          playPageFlipSound();
          return next;
        });
      }, 3200);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, activeReaderBook]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const handleCopyCode = (e: React.MouseEvent, cred: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cred);
    setCopiedId(id);
    playUiSound("click");
    triggerToast(isVi ? `Đã sao chép mã: ${cred}` : `Copied credential: ${cred}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openBookReader = (book: EducationalCardData) => {
    playBookOpenSound();
    setActiveReaderBook(book);
    setPagePairIndex(0);
    setIsUnfolding(true);
    setTimeout(() => setIsUnfolding(false), 1150);
  };

  const closeBookReader = () => {
    playUiSound("toggle");
    setAutoPlay(false);
    setActiveReaderBook(null);
    setPagePairIndex(0);
  };

  const trigger3DUnfold = () => {
    setIsUnfolding(true);
    setTimeout(() => setIsUnfolding(false), 1150);
  };

  const animate3DPageFlip = (fromIdx: number, toIdx: number, dir: 'forward' | 'backward') => {
    setFlipDirection(dir);
    setTimeout(() => setFlipDirection(null), 780);
  };

  const nextPage = () => {
    if (isFlipping || pagePairIndex >= 3) return;
    setIsFlipping(true);
    playPageFlipSound();

    const prevIdx = pagePairIndex;
    const nextIdx = pagePairIndex + 1;
    setPagePairIndex(nextIdx);

    if (prevIdx === 0) {
      trigger3DUnfold();
    } else {
      animate3DPageFlip(prevIdx, nextIdx, 'forward');
    }

    setTimeout(() => setIsFlipping(false), 800);
  };

  const prevPage = () => {
    if (isFlipping || pagePairIndex <= 0) return;
    setIsFlipping(true);
    playPageFlipSound();

    const prevIdx = pagePairIndex;
    const nextIdx = pagePairIndex - 1;
    setPagePairIndex(nextIdx);

    if (nextIdx === 0) {
      trigger3DUnfold();
    } else {
      animate3DPageFlip(prevIdx, nextIdx, 'backward');
    }

    setTimeout(() => setIsFlipping(false), 800);
  };

  const filteredData = useMemo(() => {
    return EDUCATIONAL_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.categoryKey === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.school.toLowerCase().includes(query) ||
        item.cred.toLowerCase().includes(query) ||
        item.year.toLowerCase().includes(query) ||
        item.summaryVi.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: EDUCATIONAL_DATA.length,
      degree: EDUCATIONAL_DATA.filter(i => i.categoryKey === 'degree').length,
      certificate: EDUCATIONAL_DATA.filter(i => i.categoryKey === 'certificate').length,
      training: EDUCATIONAL_DATA.filter(i => i.categoryKey === 'training').length
    };
  }, []);

  return (
    <PageLayout
      hideToolbar={true}
      id="education-main-card"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
      pageId="education"
      pageName="Education Main Card"
      title={isVi ? "Học Vấn & Chứng Chỉ" : "Education & Credentials"}
      subtitle={
        isVi
          ? "Tổng hợp bằng cấp chính quy, chứng chỉ chuyên môn và các chương trình đào tạo quản lý cao cấp dạng Thẻ Sách 3D."
          : "Formal degrees, professional certifications, and executive leadership training in 3D Showcase Books."
      }
      icon={GraduationCap}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder={
        isVi ? "Tìm chứng chỉ, trường, mã..." : "Search certificate, school..."
      }
      groupOptions={[
        {
          id: "all",
          labelVi: "Tất cả",
          labelEn: "All",
          icon: BookOpen,
          count: categoryCounts.all,
        },
        {
          id: "degree",
          labelVi: "Bằng cấp chính quy",
          labelEn: "Degrees",
          icon: GraduationCap,
          count: categoryCounts.degree,
        },
        {
          id: "certificate",
          labelVi: "Chứng chỉ chuyên môn",
          labelEn: "Certificates",
          icon: ShieldCheck,
          count: categoryCounts.certificate,
        },
        {
          id: "training",
          labelVi: "Đào tạo nâng cao",
          labelEn: "Training",
          icon: Award,
          count: categoryCounts.training,
        },
      ]}
      activeGroup={selectedCategory}
      onGroupChange={(cat) => setSelectedCategory(cat as any)}
      groupLabel={{ vi: "Phân loại:", en: "Category:" }}
      onReset={() => {
        setSearchQuery("");
        setSelectedCategory("all");
      }}
      totalCount={EDUCATIONAL_DATA.length}
      filteredCount={filteredData.length}
    >
      <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-4 p-0 text-center">
        {/* MAIN EDUCATION CARDS GRID (SHOWCASE FORMAT MATCHING SPECIFICATION) */}
        <div className="mx-auto w-full max-w-[1280px] flex-1">
          <div className="grid grid-cols-2 min-[750px]:grid-cols-4 gap-[15px] w-full">
            {filteredData.map((card, index) => {
              const colorIndex =
                (index - colorStep + COLOR_PALETTE.length * 100) %
                COLOR_PALETTE.length;
              const currentColor = card.color || COLOR_PALETTE[colorIndex];

              return (
                <article
                  key={`card-${card.id}`}
                  onClick={() => openBookReader(card)}
                  className="glass-card group rounded-2xl p-[5px] flex flex-col h-auto cursor-pointer border border-white/80 dark:border-slate-800 shadow-sm relative overflow-hidden text-left transition-all duration-300 hover:shadow-xl hover:border-indigo-500/50 hover:scale-[1.01]"
                >
                  {/* Slot 1: Media Full Banner Image */}
                  <div className="w-full h-36 rounded-[20px] overflow-hidden border border-white/70 dark:border-slate-700/60 bg-slate-900 shadow-inner relative m-0 mb-2.5 shrink-0 group/img">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-[20px] group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg text-[10px] font-black glass-pill text-slate-800 dark:text-slate-100 shadow-sm backdrop-blur-md flex items-center gap-1 border border-white/20">
                      <Calendar className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{card.year}</span>
                    </div>
                  </div>

                  {/* Slot 2: Header with Title & 3D Gradient Icon */}
                  <header className="mb-2 px-1">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight tracking-tight flex items-center gap-1.5">
                      <EduGradientIcon iconKey={card.iconKey} size={16} className="shrink-0" />
                      <span className="line-clamp-1">{card.title}</span>
                    </h3>
                  </header>

                  {/* Slot 3: Body Text Summary */}
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mb-2.5 px-1">
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                      {card.summaryVi}
                    </p>
                  </div>

                  {/* Slot 4: Metadata Row */}
                  <div className="space-y-1.5 text-[10px] sm:text-[11px] border-t border-indigo-100/60 dark:border-slate-800/80 pt-1.5 pb-2 px-2 m-0 mb-2 rounded-[10px] bg-white/35 dark:bg-slate-900/35 backdrop-blur-sm border border-white/50 dark:border-slate-800/50">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 shrink-0">
                        <GraduationCap className="w-3 h-3 text-indigo-500 shrink-0" />
                        <span>{isVi ? "Học tại:" : "School:"}</span>
                      </span>
                      <span className="text-slate-800 dark:text-slate-100 font-bold truncate text-right">
                        {card.school}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />
                        <span>{isVi ? "Chuyên ngành:" : "Major:"}</span>
                      </span>
                      <span className="text-slate-800 dark:text-slate-100 font-bold truncate text-right">
                        {card.major}
                      </span>
                    </div>
                  </div>

                  {/* Slot 5: Footer Actions */}
                  <footer className="mt-auto pt-2 border-t border-indigo-100/80 dark:border-slate-800 flex justify-end items-center">
                    <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-[10px] sm:text-[11px] shadow-md shadow-indigo-500/20 flex items-center gap-1 hover:shadow-indigo-500/40 transition">
                      <span>Mở sách</span>
                      <BookOpen className="w-3 h-3 shrink-0" />
                    </span>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3D BOOK READER POPUP MODAL (1000px × 750px Master Glassmorphism Container) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {activeReaderBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xl overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="glass-master-card w-full max-w-[1000px] h-[750px] max-h-[95vh] rounded-[32px] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden border border-white/80 dark:border-slate-700 shadow-2xl text-left"
              >
                {/* Modal Toolbar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-500/30 shrink-0">
                      <EduGradientIcon iconKey={activeReaderBook.iconKey} size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                        <span>{activeReaderBook.title}</span>
                      </h3>
                      <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                        {activeReaderBook.school} ({activeReaderBook.year})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAutoPlay((prev) => !prev)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer",
                        autoPlay
                          ? "bg-rose-600 text-white border-rose-500"
                          : "bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 border-indigo-200/60 dark:border-slate-700 text-indigo-700 dark:text-indigo-300"
                      )}
                    >
                      {autoPlay ? <Pause size={13} /> : <Play size={13} />}
                      <span>{autoPlay ? (isVi ? "Dừng tự động" : "Pause Auto") : (isVi ? "Tự động lật" : "Auto Flip")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={closeBookReader}
                      className="w-9 h-9 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20 text-rose-600 dark:text-rose-300 hover:bg-rose-500 hover:text-white transition flex items-center justify-center ml-1 shadow-sm cursor-pointer"
                      title={isVi ? "Đóng" : "Close"}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Book Viewport Container */}
                <div className="flex-1 flex items-center justify-center relative my-2 overflow-hidden">
                  <div className="book-spread-viewport w-full h-full flex items-center justify-center p-1">
                    <div
                      className={cn(
                        "book-double-page relative w-full h-full max-h-[530px] flex rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl transition-all duration-500 ease-in-out",
                        pagePairIndex === 0 ? "max-w-[450px]" : "max-w-[900px]",
                        isUnfolding && "book-unfolding-v"
                      )}
                    >
                      {/* Center Book Spine */}
                      <div
                        className="book-spine-center transition-opacity duration-300"
                        style={{ opacity: pagePairIndex === 0 ? 0 : 1 }}
                      />

                      {/* Dynamic 3D Flipping Leaf Layer */}
                      {flipDirection && (
                        <div className={cn("flipping-leaf-3d", flipDirection === 'forward' ? 'wave-flip-forward' : 'wave-flip-backward')}>
                          <div className="leaf-front bg-slate-50 dark:bg-slate-900 p-6 flex flex-col justify-between" />
                          <div className="leaf-back bg-slate-50 dark:bg-slate-900 p-6 flex flex-col justify-between" />
                        </div>
                      )}

                      {/* PAGE PAIR SPREADS */}
                      {pagePairIndex === 0 ? (
                        /* SPREAD 0: CLOSED BOOK COVER MODE */
                        <div
                          onClick={nextPage}
                          className="w-full h-full p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-slate-50 via-indigo-50/50 to-white dark:from-[#121622] dark:via-[#161b2a] dark:to-[#0f131d] text-slate-800 dark:text-white border border-slate-200/80 dark:border-slate-800 relative cursor-pointer select-none shadow-sm"
                          title="Nhấp vào bìa để mở sách"
                        >
                          <div className="book-spine-3d" />
                          <div className="book-spine-groove" />
                          <div className="book-pages-stack" />

                          <div className="pl-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <EduGradientIcon iconKey={activeReaderBook.iconKey} size={22} />
                                <span className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">VietnamWorks Portfolio</span>
                              </div>
                            </div>

                            <div className="w-full h-36 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/60 my-2 bg-slate-100 dark:bg-slate-900 shadow-md">
                              <img src={activeReaderBook.img} alt={activeReaderBook.title} className="w-full h-full object-cover" />
                            </div>

                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight my-2 tracking-tight flex items-center gap-2">
                              <EduGradientIcon iconKey={activeReaderBook.iconKey} size={24} className="shrink-0" />
                              <span>{activeReaderBook.title}</span>
                            </h2>

                            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                              <div className="flex items-start gap-2.5">
                                <GraduationCap size={14} className="text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                                <span className="text-slate-500 dark:text-slate-400 w-20 shrink-0 font-medium">{isVi ? "Học tại:" : "Institution:"}</span>
                                <span className="text-slate-800 dark:text-white font-semibold flex-1">{activeReaderBook.school}</span>
                              </div>

                              <div className="flex items-start gap-2.5">
                                <CheckCircle2 size={14} className="text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                                <span className="text-slate-500 dark:text-slate-400 w-20 shrink-0 font-medium">{isVi ? "Ngành học:" : "Major:"}</span>
                                <span className="text-slate-800 dark:text-white font-semibold flex-1 leading-snug">{activeReaderBook.major}</span>
                              </div>

                              <div className="flex items-start gap-2.5">
                                <BookOpen size={14} className="text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                                <span className="text-slate-500 dark:text-slate-400 w-20 shrink-0 font-medium">{isVi ? "Mô tả:" : "Summary:"}</span>
                                <p className="text-slate-600 dark:text-slate-300 flex-1 leading-relaxed text-[11px] line-clamp-3">{activeReaderBook.summaryVi}</p>
                              </div>
                            </div>
                          </div>

                          <div className="pl-4 pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span>{isVi ? "Bấm vào bìa để mở sách" : "Click cover to open"}</span>
                            <span className="bg-indigo-600 text-white px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 shadow-md text-xs">
                              <span>Mở sách</span>
                              <BookOpen size={12} />
                            </span>
                          </div>

                          <div className="page-corner-peel" title="Nhấp hoặc chạm để lật trang" />
                        </div>
                      ) : pagePairIndex === 1 ? (
                        /* SPREAD 1: PAGE 01 (CORE LEARNED MODULES) */
                        <>
                          {/* Left Page: Inner Logo */}
                          <div
                            onClick={prevPage}
                            className="w-1/2 h-full p-8 flex flex-col justify-center items-center bg-gradient-to-br from-slate-100 via-indigo-50/40 to-white dark:from-[#0d111a] dark:via-[#101522] dark:to-[#0a0d14] text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800 relative select-none cursor-pointer"
                            title="Bấm để quay lại bìa"
                          >
                            <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 dark:bg-indigo-600/20 border border-indigo-500/20 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-3xl mb-4 shadow-xl">
                              <EduGradientIcon iconKey={activeReaderBook.iconKey} size={36} />
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-widest uppercase">VietnamWorks</h3>
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-1">Learning & Capability Portfolio</p>
                          </div>

                          {/* Right Page: Core Modules */}
                          <div
                            onClick={nextPage}
                            className="w-1/2 h-full p-6 sm:p-7 flex flex-col justify-between bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative origami-viewport cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
                                <span className="flex items-center gap-1 font-bold text-indigo-500">
                                  {activeReaderBook.title}
                                </span>
                                <span>Trang 01</span>
                              </div>

                              <h3 className="text-lg font-black text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-1">
                                <ShieldCheck size={18} className="text-indigo-600 dark:text-indigo-400" />
                                <span>01. Nội dung cốt lõi</span>
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Các môn học và chuyên đề đã hoàn thành xuất sắc trong chương trình.</p>

                              <div className="grid grid-cols-2 gap-3">
                                {activeReaderBook.learnedVi.map((item, i) => (
                                  <div
                                    key={i}
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                    className="p-3 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 flex flex-col items-center text-center shadow-sm origami-fold-out"
                                  >
                                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold mb-1.5 shadow-sm">
                                      <CheckCircle2 size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-400 font-medium">
                              <span>VietnamWorks Training</span>
                              <span>Trang 01 / 04</span>
                            </div>

                            <div className="page-corner-peel" title="Nhấp hoặc chạm để lật trang" />
                          </div>
                        </>
                      ) : pagePairIndex === 2 ? (
                        /* SPREAD 2: PAGE 02 (OUTCOMES) & PAGE 03 (GALLERY) */
                        <>
                          {/* Left Page: Page 02 Outcomes */}
                          <div
                            onClick={prevPage}
                            className="w-1/2 h-full p-6 sm:p-7 flex flex-col justify-between bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative origami-viewport cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
                                <span className="flex items-center gap-1 font-bold text-indigo-500">
                                  {activeReaderBook.title}
                                </span>
                                <span>Trang 02</span>
                              </div>

                              <h3 className="text-lg font-black text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-1">
                                <LineChart size={18} className="text-indigo-600 dark:text-indigo-400" />
                                <span>02. Kết quả & Ứng dụng</span>
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Áp dụng kiến thức vào thực tiễn tổ chức và phát triển sự nghiệp.</p>

                              <div className="space-y-2.5">
                                {activeReaderBook.resultsVi.map((res, i) => (
                                  <div
                                    key={i}
                                    style={{ animationDelay: `${i * 0.12}s` }}
                                    className="p-2.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-2.5 shadow-sm origami-fold-out"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                      <Award size={14} />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">{res}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-400 font-medium">
                              <span>VietnamWorks Capability</span>
                              <span>Trang 02 / 04</span>
                            </div>
                          </div>

                          {/* Right Page: Page 03 Gallery */}
                          <div
                            onClick={nextPage}
                            className="w-1/2 h-full p-6 sm:p-7 flex flex-col justify-between bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative origami-viewport cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
                                <span className="flex items-center gap-1 font-bold text-indigo-500">
                                  {activeReaderBook.title}
                                </span>
                                <span>Trang 03</span>
                              </div>

                              <h3 className="text-lg font-black text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-1">
                                <Sparkles size={18} className="text-indigo-600 dark:text-indigo-400" />
                                <span>03. Hình ảnh khóa học</span>
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Khoảnh khắc học tập, thực hành và kết nối trong suốt hành trình.</p>

                              <div className="grid grid-cols-2 gap-2.5">
                                {(activeReaderBook.galleryImages || [
                                  { url: activeReaderBook.img, caption: 'Hình ảnh lớp học & thực hành' },
                                  { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', caption: 'Thảo luận nhóm & thuyết trình' },
                                  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', caption: 'Trao chứng nhận hoàn thành' },
                                  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', caption: 'Kỷ niệm khóa học' }
                                ]).map((img, i) => (
                                  <div
                                    key={i}
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLightboxImg(img);
                                    }}
                                    className="h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative cursor-pointer shadow-sm origami-fold-out group"
                                  >
                                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                      <Maximize2 size={16} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-400 font-medium">
                              <span>Hình ảnh thực tế</span>
                              <span>Trang 03 / 04</span>
                            </div>

                            <div className="page-corner-peel" title="Nhấp hoặc chạm để lật trang" />
                          </div>
                        </>
                      ) : (
                        /* SPREAD 3: PAGE 04 LEFT (VERIFICATION) & PAGE 04 RIGHT (CERTIFICATE) */
                        <>
                          {/* Left Page: Cert Verification Summary */}
                          <div
                            onClick={prevPage}
                            className="w-1/2 h-full p-6 sm:p-7 flex flex-col justify-between bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white border-r border-slate-200 dark:border-slate-800 relative origami-viewport cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
                                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                                  {activeReaderBook.title}
                                </span>
                                <span>Trang 04 (Trái)</span>
                              </div>

                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-600/30 border border-indigo-500/20 dark:border-indigo-500/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm">
                                  <FileCheck size={16} />
                                </div>
                                <div>
                                  <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">Hồ Sơ Chứng Nhận</h3>
                                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">VietnamWorks Verification</span>
                                </div>
                              </div>

                              <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2.5 mb-3 text-xs shadow-sm origami-fold-out">
                                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/60 pb-1.5">
                                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">{isVi ? "Trạng thái:" : "Status:"}</span>
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                                    <CheckCircle2 size={12} /> {isVi ? "Đã xác thực" : "Verified"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/60 pb-1.5">
                                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">{isVi ? "Đơn vị cấp:" : "Issuer:"}</span>
                                  <span className="text-slate-800 dark:text-white font-bold text-[11px]">{activeReaderBook.school}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/60 pb-1.5">
                                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">{isVi ? "Năm hoàn thành:" : "Year:"}</span>
                                  <span className="text-slate-800 dark:text-white font-bold text-[11px]">{activeReaderBook.year}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">{isVi ? "Mã chứng nhận:" : "ID:"}</span>
                                  <div className="flex items-center gap-1">
                                    <span className="text-indigo-600 dark:text-indigo-300 font-mono text-[10px] font-bold">{activeReaderBook.cred}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => handleCopyCode(e, activeReaderBook.cred, activeReaderBook.id)}
                                      className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                                    >
                                      {copiedId === activeReaderBook.id ? <Check size={12} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={12} />}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/50 rounded-xl border border-indigo-200/80 dark:border-indigo-800/50 flex items-center gap-3 origami-fold-out" style={{ animationDelay: '0.15s' }}>
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 dark:bg-indigo-600/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-lg shrink-0">
                                  <QrCode size={20} />
                                </div>
                                <div>
                                  <p className="text-[11px] font-bold text-slate-900 dark:text-white">Xác minh mã QR</p>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Chứng nhận được lưu trữ chính thức trong hệ thống VietnamWorks Portfolio.</p>
                                </div>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                              <span>Hồ sơ năng lực</span>
                              <span>Trang 04 / 04</span>
                            </div>
                          </div>

                          {/* Right Page: Certificate Display */}
                          <div className="w-1/2 h-full p-5 sm:p-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative origami-viewport">
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 pb-2 mb-2.5">
                                <span className="flex items-center gap-1 font-bold text-indigo-500">
                                  {activeReaderBook.title}
                                </span>
                                <span>Trang 04</span>
                              </div>

                              <h3 className="text-base font-black text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-0.5">
                                <CertificateIcon size={18} className="text-indigo-600 dark:text-indigo-400" />
                                <span>04. Bằng cấp & Hình ảnh chứng nhận</span>
                              </h3>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">Chứng nhận hoàn thành khóa học và hình ảnh xác thực.</p>

                              <div className="p-3 border-2 border-indigo-500/30 rounded-2xl bg-white dark:bg-slate-800 text-center relative shadow-sm mb-2.5 origami-fold-out">
                                <div className="absolute -top-2.5 right-3 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] shadow-md origami-badge-3d">
                                  <Award size={13} />
                                </div>
                                <span className="text-[8px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">Certificate of Completion</span>
                                <h4 className="text-sm font-black text-slate-900 dark:text-white my-0.5">{activeReaderBook.title}</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Cấp bởi: <strong className="text-indigo-600 dark:text-indigo-400">{activeReaderBook.school}</strong> ({activeReaderBook.year})</p>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                {(activeReaderBook.certImages || [
                                  { url: activeReaderBook.diplomaImg || activeReaderBook.img, caption: 'Bằng chứng nhận chính thức' },
                                  { url: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80', caption: 'Con dấu & Chữ ký xác thực' }
                                ]).map((img, i) => (
                                  <div
                                    key={i}
                                    style={{ animationDelay: `${i * 0.08}s` }}
                                    onClick={() => setLightboxImg(img)}
                                    className="h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative cursor-pointer shadow-sm origami-fold-out group"
                                  >
                                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-1.5">
                                      <span className="text-[9px] font-bold text-white leading-none truncate">{img.caption}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-400 font-medium">
                              <span>Bằng cấp & Chứng nhận</span>
                              <span>Trang 04 / 04</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={prevPage}
                      disabled={pagePairIndex <= 0}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
                    >
                      <ArrowLeft size={14} /> <span>{isVi ? "Trang trước" : "Prev Page"}</span>
                    </button>

                    <div className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
                      {pagePairIndex === 0 ? (isVi ? "Bìa Sách (Đang đóng)" : "Cover Page") :
                       pagePairIndex === 1 ? (isVi ? "Trang 01 – Nội dung" : "Page 01 – Modules") :
                       pagePairIndex === 2 ? (isVi ? "Trang 02 – 03" : "Page 02 – 03") :
                       (isVi ? "Trang 04 – Bằng cấp" : "Page 04 – Certificate")}
                    </div>

                    <button
                      type="button"
                      onClick={nextPage}
                      disabled={pagePairIndex >= 3}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
                    >
                      <span>{isVi ? "Trang sau" : "Next Page"}</span> <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Thumbnail Dots */}
                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
                    {['Bìa', 'Trang 1', 'Trang 2-3', 'Trang 4 - Bằng cấp'].map((label, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (pagePairIndex !== idx) {
                            const prevIdx = pagePairIndex;
                            setPagePairIndex(idx);
                            playPageFlipSound();
                            if (prevIdx === 0 || idx === 0) {
                              trigger3DUnfold();
                            } else {
                              animate3DPageFlip(prevIdx, idx, idx > prevIdx ? 'forward' : 'backward');
                            }
                          }
                        }}
                        className={cn(
                          "px-3 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer",
                          pagePairIndex === idx
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-white/10 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-indigo-500/20"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* LIGHTBOX MODAL FOR ENLARGING GALLERY & CERTIFICATE IMAGES                 */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
            >
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center text-center"
              >
                <button
                  type="button"
                  onClick={() => setLightboxImg(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition flex items-center justify-center cursor-pointer"
                >
                  <X size={16} />
                </button>
                <div className="w-full flex justify-center items-center my-2 max-h-[70vh]">
                  <img src={lightboxImg.url} alt={lightboxImg.caption} className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-2xl" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3 font-semibold">
                  {lightboxImg.caption}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-800/95 backdrop-blur-md text-white text-xs font-bold shadow-xl z-[99999] border border-slate-700/60 animate-fade-in">
            {toastMsg}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
