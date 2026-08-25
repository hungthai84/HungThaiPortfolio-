import React from "react";

export interface SwotGradientIconProps {
  iconKey: string;
  extraClass?: string;
}

export function SwotGradientIcon({ iconKey, extraClass = "w-8 h-8" }: SwotGradientIconProps) {
  const id = `swot-grad-${iconKey.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  switch (iconKey.toUpperCase()) {
    case "CRM":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id={`${id}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#d97706" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <circle cx="35" cy="38" r="12" fill={`url(#${id}-bg)`} />
            <path d="M 15 72 C 15 56 24 50 35 50 C 46 50 55 56 55 72 Z" fill={`url(#${id}-bg)`} />
            <circle cx="65" cy="34" r="10" fill={`url(#${id}-accent)`} />
            <path d="M 48 68 C 48 55 55 50 65 50 C 75 50 82 55 82 68 Z" fill={`url(#${id}-accent)`} opacity="0.9" />
          </g>
        </svg>
      );

    case "DATA":
    case "ANALYTICS":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-bar`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id={`${id}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="20" y="52" width="14" height="30" rx="5" fill={`url(#${id}-bar)`} />
            <rect x="43" y="34" width="14" height="48" rx="5" fill={`url(#${id}-accent)`} />
            <rect x="66" y="20" width="14" height="62" rx="5" fill={`url(#${id}-bar)`} />
            <path d="M 22 46 L 45 28 L 72 16" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="72" cy="16" r="5" fill="#38bdf8" />
          </g>
        </svg>
      );

    case "PROCESS":
    case "WORKFLOW":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-board`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
            <linearGradient id={`${id}-check`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#db2777" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="22" y="24" width="56" height="60" rx="12" fill={`url(#${id}-board)`} />
            <rect x="36" y="16" width="28" height="12" rx="6" fill="#fbcfe8" />
            <rect x="32" y="40" width="36" height="6" rx="3" fill="#ffffff" opacity="0.9"/>
            <rect x="32" y="52" width="26" height="6" rx="3" fill="#ffffff" opacity="0.9"/>
            <circle cx="64" cy="62" r="10" fill={`url(#${id}-check)`} />
            <path d="M 59 62 L 63 66 L 69 58" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      );

    case "CUSTOMER":
    case "CX":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-heart`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#dc2626" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 50 82 C 50 82 18 60 18 38 C 18 24 28 16 40 20 C 46 22 50 27 50 27 C 50 27 54 22 60 20 C 72 16 82 24 82 38 C 82 60 50 82 50 82 Z" fill={`url(#${id}-heart)`} />
            <polygon points="50,34 55,42 64,40 59,48 64,56 54,54 50,62 46,54 36,56 41,48 36,40 45,42" fill={`url(#${id}-gold)`} />
          </g>
        </svg>
      );

    case "LEADERSHIP":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-main`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient id={`${id}-badge`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#7c3aed" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="22" y="18" width="56" height="64" rx="12" fill={`url(#${id}-main)`} />
            <circle cx="50" cy="42" r="11" fill="#ffffff" />
            <path d="M 33 66 C 33 55 40 52 50 52 C 60 52 67 55 67 66 Z" fill="#ffffff" />
            <circle cx="68" cy="26" r="8" fill={`url(#${id}-badge)`} />
            <path d="M 65 26 L 67 28 L 71 24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      );

    case "STRATEGY":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <circle cx="50" cy="50" r="32" fill={`url(#${id}-grad)`} />
            <circle cx="50" cy="50" r="22" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.9" />
            <circle cx="50" cy="50" r="12" fill="#ffffff" />
            <polygon points="50,22 56,44 78,50 56,56 50,78 44,56 22,50 44,44" fill="#38bdf8" opacity="0.75" />
          </g>
        </svg>
      );

    case "PROJECT":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#059669" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="20" y="22" width="60" height="56" rx="12" fill={`url(#${id}-grad)`} />
            <rect x="30" y="34" width="16" height="32" rx="4" fill="#ffffff" opacity="0.9" />
            <rect x="52" y="34" width="16" height="22" rx="4" fill="#34d399" opacity="0.9" />
          </g>
        </svg>
      );

    case "CODING":
    case "TECH":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="18" y="24" width="64" height="52" rx="12" fill={`url(#${id}-grad)`} />
            <path d="M 36 42 L 26 50 L 36 58" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 64 42 L 74 50 L 64 58" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 54 36 L 46 64" stroke="#818cf8" strokeWidth="4" strokeLinecap="round"/>
          </g>
        </svg>
      );

    case "AUTOMATION":
    case "AI":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-bot`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c026d3" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <linearGradient id={`${id}-cyan`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#c026d3" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="22" y="30" width="56" height="46" rx="16" fill={`url(#${id}-bot)`} />
            <circle cx="50" cy="18" r="6" fill={`url(#${id}-cyan)`} />
            <path d="M 50 24 L 50 30" stroke={`url(#${id}-cyan)`} strokeWidth="3" />
            <circle cx="38" cy="50" r="7" fill="#ffffff" />
            <circle cx="62" cy="50" r="7" fill="#ffffff" />
            <circle cx="38" cy="50" r="3" fill="#0f172a" />
            <circle cx="62" cy="50" r="3" fill="#0f172a" />
            <path d="M 40 64 Q 50 70 60 64" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );

    case "KPI":
    case "OKR":
    case "TROPHY":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-trophy`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#ea580c" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 28 22 L 72 22 L 66 52 C 66 62 58 66 50 66 C 42 66 34 62 34 52 Z" fill={`url(#${id}-trophy)`} />
            <rect x="42" y="66" width="16" height="12" fill={`url(#${id}-trophy)`} />
            <rect x="32" y="78" width="36" height="8" rx="4" fill={`url(#${id}-gold)`} />
            <polygon points="50,30 53,38 61,38 55,43 57,51 50,46 43,51 45,43 39,38 47,38" fill={`url(#${id}-gold)`} />
          </g>
        </svg>
      );

    case "STRENGTHS":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-diamond`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0d9488" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <polygon points="50,15 82,38 50,85 18,38" fill={`url(#${id}-diamond)`} />
            <polygon points="50,15 82,38 50,48 18,38" fill="#5eead4" opacity="0.6" />
            <line x1="50" y1="48" x2="50" y2="85" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
          </g>
        </svg>
      );

    case "OPPORTUNITIES":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-rocket`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4f46e5" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 50 15 C 65 30 65 55 60 72 L 40 72 C 35 55 35 30 50 15 Z" fill={`url(#${id}-rocket)`} />
            <circle cx="50" cy="40" r="7" fill="#ffffff" />
            <path d="M 40 72 L 50 88 L 60 72 Z" fill="#f97316" />
          </g>
        </svg>
      );

    case "WEAKNESSES":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#c026d3" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="20" y="20" width="60" height="60" rx="16" fill={`url(#${id}-grad)`} />
            <path d="M 32 62 L 46 48 L 56 56 L 70 36" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <polygon points="70,36 62,36 70,44" fill="#ffffff" />
          </g>
        </svg>
      );

    case "THREATS":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-shield`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#ea580c" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 50 16 L 78 26 C 78 54 64 74 50 84 C 36 74 22 54 22 26 Z" fill={`url(#${id}-shield)`} />
            <path d="M 50 36 L 50 54 M 50 62 L 50 64" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "VIETNAMESE":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-flag`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#dc2626" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <circle cx="50" cy="50" r="32" fill={`url(#${id}-flag)`} />
            <polygon points="50,30 55,42 67,42 57,50 61,62 50,54 39,62 43,50 33,42 45,42" fill="#facc15" />
          </g>
        </svg>
      );

    case "ENGLISH":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-uk`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <circle cx="50" cy="50" r="32" fill={`url(#${id}-uk)`} />
            <path d="M 22 50 L 78 50 M 50 22 L 50 78" stroke="#ffffff" strokeWidth="6" />
            <path d="M 22 50 L 78 50 M 50 22 L 50 78" stroke="#ef4444" strokeWidth="3" />
          </g>
        </svg>
      );

    case "BRIEFCASE":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-bag`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="20" y="32" width="60" height="46" rx="10" fill={`url(#${id}-bag)`} />
            <path d="M 36 32 V 24 C 36 20 40 18 50 18 C 60 18 64 20 64 24 V 32" stroke={`url(#${id}-bag)`} strokeWidth="5" fill="none" />
            <rect x="42" y="44" width="16" height="8" rx="2" fill="#ffffff" />
          </g>
        </svg>
      );

    case "USERS":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-usr`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#7e22ce" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <circle cx="42" cy="36" r="12" fill={`url(#${id}-usr)`} />
            <path d="M 22 72 C 22 56 32 50 42 50 C 52 50 62 56 62 72 Z" fill={`url(#${id}-usr)`} />
            <circle cx="68" cy="34" r="9" fill="#c084fc" />
            <path d="M 52 68 C 52 56 60 52 68 52 C 76 52 82 56 82 68 Z" fill="#c084fc" opacity="0.8" />
          </g>
        </svg>
      );

    default:
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-def`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="32" fill={`url(#${id}-def)`} />
        </svg>
      );
  }
}
