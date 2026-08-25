import React, { useState, useEffect, useRef } from "react";
import {
  Server,
  Globe,
  Sun,
  Moon,
  Search,
  X,
  Sparkles,
  Play,
  Minimize2,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUpRight,
  Info,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Phone,
  Users,
  Briefcase,
  User,
  ClipboardList,
  Trophy,
  Heart,
  BookOpen,
  BarChart3,
  Bot,
  Package
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../lib/utils";

export interface SystemItem {
  key: string;
  name: string;
  nameEn: string;
  desc: string;
  features: string[];
  link: string;
  icon: string;
  color: string;
  category: "platform" | "enterprise" | "growth";
}

export type Language = "vi" | "en";

const systemsData: SystemItem[] = [
  {
    key: "SDP",
    name: "Website dành cho phòng CSKH",
    nameEn: "Service Delivery Platform",
    desc: "Trang làm việc chính của Phòng Chăm sóc Khách hàng, đóng vai trò là cổng truy cập tập trung (Portal) để nhân viên sử dụng toàn bộ các hệ thống nghiệp vụ.",
    features: [
      "Cổng thông tin tập trung cho nhân viên CSKH",
      "Tích hợp điều hướng linh hoạt liên hệ thống",
      "Tối ưu hóa thời gian thao tác và tra cứu dữ liệu",
      "Quản lý phân quyền truy cập người dùng"
    ],
    link: "https://www.sdpplatfrom.powerservice.one",
    icon: "layers",
    color: "#2563eb",
    category: "platform",
  },
  {
    key: "CSC",
    name: "Trung tâm Chăm sóc Khách hàng",
    nameEn: "Customer Service Center",
    desc: "Quản lý tương tác đa kênh (Omnichannel), tiếp nhận và xử lý yêu cầu hỗ trợ, quản lý Ticket, SLA, lịch sử liên hệ và Helpdesk.",
    features: [
      "Quản lý tương tác Omnichannel (Zalo, Facebook, Call Center)",
      "Hệ thống ticket tự động điều phối tác vụ",
      "Theo dõi cam kết chất lượng dịch vụ SLA",
      "Lịch sử tương tác và tri thức Helpdesk"
    ],
    link: "https://www.cscplatform.powerservice.one",
    icon: "phone",
    color: "#0891b2",
    category: "platform",
  },
  {
    key: "CRM",
    name: "Quản lý Quan hệ Khách hàng",
    nameEn: "Customer Relationship Management",
    desc: "Quản lý khách hàng, bán hàng, marketing, chăm sóc khách hàng và toàn bộ hành trình trải nghiệm khách hàng.",
    features: [
      "Quản lý hồ sơ 360 độ khách hàng",
      "Theo dõi cơ hội bán hàng & Lead funnel",
      "Tự động hóa chiến dịch Marketing & Re-marketing",
      "Báo cáo tỷ lệ chuyển đổi khách hàng"
    ],
    link: "https://www.crmplatfrom.powerservice.one",
    icon: "users",
    color: "#d97706",
    category: "platform",
  },
  {
    key: "ERP",
    name: "Tài chính kế toán & Nguồn lực",
    nameEn: "Enterprise Resource Planning",
    desc: "Quản lý nguồn lực và hoạt động nội bộ của doanh nghiệp như tài chính, kế toán, mua hàng, kho, sản xuất, tài sản và các hoạt động vận hành.",
    features: [
      "Quản lý tài chính, kế toán tổng hợp & báo cáo thuế",
      "Quản lý mua hàng, tồn kho & tài sản cố định",
      "Theo dõi luồng tiền và chi phí hoạt động",
      "Số hóa chứng từ và phê duyệt ngân sách"
    ],
    link: "https://www.erpplatfrom.powerservice.one",
    icon: "briefcase",
    color: "#059669",
    category: "enterprise",
  },
  {
    key: "HRM",
    name: "Quản lý Nguồn nhân lực",
    nameEn: "Human Resource Management",
    desc: "Quản lý toàn bộ vòng đời nhân viên từ tuyển dụng, hồ sơ nhân sự, chấm công, tính lương, đào tạo, đánh giá năng lực đến phát triển nghề nghiệp.",
    features: [
      "Quản lý hồ sơ nhân sự số hóa & hợp đồng",
      "Tự động chấm công và tính lương chuẩn xác",
      "Đánh giá nhân sự KPI/OKRs định kỳ",
      "Cổng thông tin tự phục vụ dành cho nhân viên"
    ],
    link: "https://www.hrmplatfrom.powerservice.one",
    icon: "user",
    color: "#7c3aed",
    category: "enterprise",
  },
  {
    key: "BPM",
    name: "Quản lý Quy trình Nghiệp vụ",
    nameEn: "Business Process Management",
    desc: "Chuẩn hóa, số hóa và tự động hóa các quy trình nghiệp vụ nhằm nâng cao hiệu quả quản lý và vận hành doanh nghiệp.",
    features: [
      "Thiết kế sơ đồ quy trình dạng kéo thả linh hoạt",
      "Tự động hóa phê duyệt đề xuất đa cấp",
      "Giám sát tiến độ xử lý công việc trực thời gian thực",
      "Phân tích nghẽn cổ chai trong vận hành"
    ],
    link: "https://www.bmpplatform.powerservice.one",
    icon: "clipboard-list",
    color: "#db2777",
    category: "enterprise",
  },
  {
    key: "OKR",
    name: "Quản lý Mục tiêu & Dự án",
    nameEn: "Objectives and Key Results",
    desc: "Thiết lập mục tiêu chiến lược, theo dõi kết quả then chốt (Key Results), quản lý kế hoạch, dự án và đánh giá hiệu suất của cá nhân, phòng ban và doanh nghiệp.",
    features: [
      "Thiết lập mục tiêu chiến lược OKRs toàn công ty",
      "Kết nối mục tiêu phòng ban với cá nhân",
      "Theo dõi tiến độ theo tuần/tháng với chỉ số trực quan",
      "Báo cáo đánh giá hiệu suất minh bạch"
    ],
    link: "https://www.okrplatfrom.powerservice.one",
    icon: "trophy",
    color: "#ea580c",
    category: "enterprise",
  },
  {
    key: "CLP",
    name: "Khách hàng Thân thiết",
    nameEn: "Customer Loyalty Platform",
    desc: "Quản lý chương trình thành viên, tích điểm, phân hạng khách hàng, ưu đãi, voucher, chiến dịch chăm sóc và gia tăng mức độ trung thành của khách hàng.",
    features: [
      "Phân hạng thành viên (Silver, Gold, Platinum...)",
      "Tích điểm tự động và đổi quà / voucher",
      "Gửi ưu đãi sinh nhật và ngày lễ cá nhân hóa",
      "Gia tăng giá trị trọn đời khách hàng (LTV)"
    ],
    link: "https://www.clpplatform.powerservice.one",
    icon: "heart",
    color: "#dc2626",
    category: "growth",
  },
  {
    key: "LMS",
    name: "Quản lý Đào tạo Trực tuyến",
    nameEn: "Learning Management System",
    desc: "Xây dựng và quản lý khóa học trực tuyến, kiểm tra, đánh giá năng lực, cấp chứng chỉ và phát triển nguồn nhân lực.",
    features: [
      "Kho bài giảng và tài liệu học tập trực tuyến",
      "Tổ chức bài kiểm tra & thi trắc nghiệm tự động",
      "Theo dõi tiến độ học tập của nhân viên",
      "Cấp chứng chỉ hoàn thành khóa học nội bộ"
    ],
    link: "https://www.lmsplatfrom.powerservice.one",
    icon: "book-open",
    color: "#0d9488",
    category: "growth",
  },
  {
    key: "BI Dashboard",
    name: "Báo cáo và Phân tích Trí tuệ",
    nameEn: "Business Intelligence Dashboard",
    desc: "Thu thập, tổng hợp, phân tích và trực quan hóa dữ liệu theo thời gian thực, hỗ trợ lãnh đạo đưa ra quyết định dựa trên dữ liệu.",
    features: [
      "Trực quan hóa chỉ số KPI kinh doanh real-time",
      "Báo cáo doanh thu, chi phí và lợi nhuận tự động",
      "Dự báo xu hướng dựa trên lịch sử dữ liệu",
      "Tùy chỉnh biểu đồ & xuất báo cáo đa dạng"
    ],
    link: "(Đang triển khai)",
    icon: "bar-chart-3",
    color: "#0284c7",
    category: "growth",
  },
  {
    key: "AI Assistant",
    name: "Trợ lý Trí tuệ Nhân tạo",
    nameEn: "Artificial Intelligence Assistant",
    desc: "Hỗ trợ người dùng bằng AI trong việc tìm kiếm tri thức, phân tích dữ liệu, tạo nội dung, tự động hóa quy trình, hỗ trợ ra quyết định và nâng cao năng suất làm việc.",
    features: [
      "Hỏi đáp tri thức doanh nghiệp tự động",
      "Soạn thảo văn bản và tóm tắt tài liệu thông minh",
      "Hỗ trợ phân tích dữ liệu nhanh chóng",
      "Tích hợp bot tự động hỗ trợ nhân viên"
    ],
    link: "https://www.aiplatfrom.powerservice.one",
    icon: "bot",
    color: "#c026d3",
    category: "growth",
  },
  {
    key: "POS",
    name: "Quản lý Bán hàng tại Quầy",
    nameEn: "Point of Sale",
    desc: "Quản lý bán hàng tại quầy, đơn hàng, thanh toán, hóa đơn, tồn kho và đồng bộ dữ liệu với CRM, ERP và các hệ thống quản trị khác.",
    features: [
      "Giao diện thu ngân tối ưu tốc độ tính tiền",
      "In hóa đơn và quét mã QR thanh toán tức thì",
      "Đồng bộ tồn kho trực tiếp với ERP & CRM",
      "Báo cáo ca làm việc & ca thu ngân"
    ],
    link: "https://www.posplatform.powerservice.one",
    icon: "package",
    color: "#65a30d",
    category: "growth",
  },
];

const translations = {
  vi: {
    bannerTitle: "Hệ thống Vận hành",
    bannerSubtitle: "Hệ sinh thái nền tảng và các hệ thống vận hành doanh nghiệp PowerService.",
    searchPlaceholder: "Tìm kiếm hệ thống, mã hệ thống (CRM, ERP, AI...)...",
    allCategories: "Tất cả hệ thống",
    catPlatform: "Nền tảng & CSKH",
    catEnterprise: "Quản trị Doanh nghiệp",
    catGrowth: "Tăng trưởng & AI",
    underDevelopment: "Đang triển khai",
    details: "Xem chi tiết",
    close: "Đóng",
    noResults: "Không tìm thấy hệ thống phù hợp với từ khóa.",
    allSystemsOperational: "Tất cả hệ thống hoạt động ổn định",
    featuresTitle: "Các tính năng nổi bật & Nhiệm vụ chính",
    accessNow: "Vào website",
    videoIntroTitle: "Video Giới thiệu PowerService Ecosystem",
    pause: "Tạm dừng",
    playVideo: "PLAY VIDEO",
  },
  en: {
    bannerTitle: "Operated Systems",
    bannerSubtitle: "The platform ecosystem and enterprise operational management systems by PowerService.",
    searchPlaceholder: "Search systems, codes (CRM, ERP, AI...)...",
    allCategories: "All Systems",
    catPlatform: "Platform & Care",
    catEnterprise: "Enterprise Admin",
    catGrowth: "Growth & AI",
    underDevelopment: "Under Development",
    details: "View Details",
    close: "Close",
    noResults: "No systems matched your search query.",
    allSystemsOperational: "All Systems Operational",
    featuresTitle: "Key Features & Core Capabilities",
    accessNow: "Visit Website",
    videoIntroTitle: "PowerService Ecosystem Intro Video",
    pause: "Pause",
    playVideo: "PLAY VIDEO",
  }
};

function SystemGradientIcon({ itemKey, extraClass = "w-8 h-8" }: { itemKey: string; extraClass?: string }) {
  const id = `grad-${itemKey.replace(/[^a-zA-Z0-9]/g, '-')}`;

  switch (itemKey) {
    case "CSC":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-arc`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id={`${id}-bubble`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.3"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 18 55 A 32 32 0 0 1 82 55" fill="none" stroke={`url(#${id}-arc)`} strokeWidth="12" strokeLinecap="round" />
            <rect x="12" y="50" width="14" height="26" rx="7" fill={`url(#${id}-arc)`} />
            <rect x="74" y="50" width="14" height="26" rx="7" fill={`url(#${id}-arc)`} />
            <rect x="30" y="42" width="40" height="28" rx="10" fill={`url(#${id}-bubble)`} />
            <circle cx="40" cy="56" r="3" fill="#ffffff" />
            <circle cx="50" cy="56" r="3" fill="#ffffff" />
            <circle cx="60" cy="56" r="3" fill="#ffffff" />
          </g>
        </svg>
      );
    case "SDP":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id={`${id}-2`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 50 18 L 82 34 L 50 50 L 18 34 Z" fill={`url(#${id}-2)`} />
            <path d="M 18 46 L 50 62 L 82 46 L 82 54 L 50 70 L 18 54 Z" fill={`url(#${id}-1)`} opacity="0.85" />
            <path d="M 18 64 L 50 80 L 82 64 L 82 72 L 50 88 L 18 72 Z" fill={`url(#${id}-1)`} />
          </g>
        </svg>
      );
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
    case "ERP":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-box`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#059669" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="18" y="32" width="64" height="48" rx="12" fill={`url(#${id}-box)`} />
            <path d="M 36 32 C 36 22 42 18 50 18 C 58 18 64 22 64 32" stroke={`url(#${id}-box)`} strokeWidth="6" fill="none" strokeLinecap="round"/>
            <circle cx="50" cy="56" r="12" fill={`url(#${id}-gold)`} />
            <path d="M 50 48 L 50 64 M 45 52 L 55 60" stroke="#047857" strokeWidth="2.5" strokeLinecap="round"/>
          </g>
        </svg>
      );
    case "HRM":
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
    case "BPM":
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
    case "OKR":
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
            <path d="M 28 28 C 18 28 16 42 28 44" stroke={`url(#${id}-trophy)`} strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M 72 28 C 82 28 84 42 72 44" stroke={`url(#${id}-trophy)`} strokeWidth="5" fill="none" strokeLinecap="round"/>
            <rect x="42" y="66" width="16" height="12" fill={`url(#${id}-trophy)`} />
            <rect x="32" y="78" width="36" height="8" rx="4" fill={`url(#${id}-gold)`} />
            <polygon points="50,30 53,38 61,38 55,43 57,51 50,46 43,51 45,43 39,38 47,38" fill={`url(#${id}-gold)`} />
          </g>
        </svg>
      );
    case "CLP":
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
    case "LMS":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-book`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
            <linearGradient id={`${id}-pages`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ccfbf1" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0d9488" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 18 36 C 32 30 50 36 50 36 C 50 36 68 30 82 36 L 82 72 C 68 66 50 72 50 72 C 50 72 32 66 18 72 Z" fill={`url(#${id}-book)`} />
            <path d="M 50 36 L 50 72" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            <polygon points="50,16 80,26 50,36 20,26" fill={`url(#${id}-pages)`} />
            <path d="M 72 29 L 72 44" stroke={`url(#${id}-pages)`} strokeWidth="3" strokeLinecap="round"/>
          </g>
        </svg>
      );
    case "BI Dashboard":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-bar1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id={`${id}-bar2`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="20" y="52" width="16" height="32" rx="6" fill={`url(#${id}-bar1)`} />
            <rect x="42" y="36" width="16" height="48" rx="6" fill={`url(#${id}-bar2)`} />
            <rect x="64" y="20" width="16" height="64" rx="6" fill={`url(#${id}-bar1)`} />
            <path d="M 22 42 L 44 26 L 62 34 L 82 16" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 72 16 L 82 16 L 82 26" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      );
    case "AI Assistant":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-ai`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
            <linearGradient id={`${id}-glow`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#c026d3" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="22" y="28" width="56" height="48" rx="16" fill={`url(#${id}-ai)`} />
            <circle cx="38" cy="50" r="7" fill={`url(#${id}-glow)`} />
            <circle cx="62" cy="50" r="7" fill={`url(#${id}-glow)`} />
            <rect x="42" y="62" width="16" height="4" rx="2" fill="#ffffff" />
            <line x1="50" y1="14" x2="50" y2="28" stroke={`url(#${id}-ai)`} strokeWidth="4" strokeLinecap="round"/>
            <circle cx="50" cy="12" r="5" fill={`url(#${id}-glow)`} />
          </g>
        </svg>
      );
    case "POS":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-pos`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#65a30d" />
            </linearGradient>
            <linearGradient id={`${id}-screen`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#65a30d" floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <rect x="20" y="22" width="60" height="46" rx="10" fill={`url(#${id}-screen)`} />
            <rect x="26" y="28" width="48" height="34" rx="6" fill={`url(#${id}-pos)`} />
            <path d="M 32 78 L 68 78 L 74 86 L 26 86 Z" fill={`url(#${id}-pos)`} />
            <rect x="44" y="68" width="12" height="10" fill="#475569" />
          </g>
        </svg>
      );
    default:
      return <Layers className={extraClass} />;
  }
}

export function Systems() {
  const { language } = useLanguage();
  const currentLang = language as Language;
  
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [modalSystem, setModalSystem] = useState<SystemItem | null>(null);

  /* Video player states */
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [fullVideoPaused, setFullVideoPaused] = useState<boolean>(false);
  const [fullVideoMuted, setFullVideoMuted] = useState<boolean>(false);

  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);

  const t = translations[currentLang];

  /* Handle preview video autoplay on mount */
  useEffect(() => {
    if (previewVideoRef.current && !isVideoPlaying) {
      previewVideoRef.current.play().catch(() => {});
    }
  }, [isVideoPlaying]);

  const handleCardClick = (key: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.action-btn')) return;

    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const openSystemLink = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  };

  const openModal = (sys: SystemItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setModalSystem(sys);
  };

  const closeModal = () => {
    setModalSystem(null);
  };

  /* Full Banner Video Controls */
  const toggleVideoPlay = () => {
    if (!isVideoPlaying) {
      setIsVideoPlaying(true);
      setFullVideoPaused(false);
      if (fullVideoRef.current) {
        fullVideoRef.current.currentTime = 0;
        fullVideoRef.current.muted = fullVideoMuted;
        fullVideoRef.current.play().catch(() => {});
      }
      if (previewVideoRef.current) {
        previewVideoRef.current.pause();
      }
    } else {
      setIsVideoPlaying(false);
      if (fullVideoRef.current) {
        fullVideoRef.current.pause();
      }
      if (previewVideoRef.current) {
        previewVideoRef.current.currentTime = 0;
        previewVideoRef.current.play().catch(() => {});
      }
    }
  };

  const toggleFullVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullVideoRef.current) {
      if (fullVideoRef.current.paused) {
        fullVideoRef.current.play();
        setFullVideoPaused(false);
      } else {
        fullVideoRef.current.pause();
        setFullVideoPaused(true);
      }
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullVideoRef.current) {
      fullVideoRef.current.muted = !fullVideoRef.current.muted;
      setFullVideoMuted(fullVideoRef.current.muted);
    }
  };

  /* Filter Systems based on Category and Search Query */
  const filteredSystems = systemsData.filter(sys => {
    const matchesCat = currentCategory === 'all' || sys.category === currentCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      sys.key.toLowerCase().includes(q) ||
      sys.name.toLowerCase().includes(q) ||
      sys.nameEn.toLowerCase().includes(q) ||
      sys.desc.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <PageLayout
      id="systems-main-card"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300 !bg-transparent !border-none !shadow-none !backdrop-blur-none"
      headerContainerClassName="!px-0 !bg-transparent"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent !border-none"
      pageId="systems"
      pageName="Systems Main Card"
      title={currentLang === "vi" ? "Hệ Thống" : "Systems"}
      subtitle={
        currentLang === "vi"
          ? "Hệ thống vận hành, hạ tầng công nghệ và kiến trúc giải pháp tối ưu."
          : "Operational systems, technology infrastructure, and optimal solution architecture."
      }
      icon={Server}
      hideToolbar={true}
    >
      <>
        <style>{`
          /* Ambient Background Orbs for Glassmorphism Effect */
          .bg-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(90px);
            pointer-events: none;
            opacity: 0.5;
            animation: floatOrb 18s ease-in-out infinite alternate;
          }
          .bg-orb-1 {
            top: -10%;
            left: -5%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.2) 100%);
          }
          .bg-orb-2 {
            top: 30%;
            right: -10%;
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, rgba(239, 68, 68, 0.15) 100%);
            animation-delay: -6s;
          }
          .bg-orb-3 {
            bottom: -10%;
            left: 20%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.15) 100%);
            animation-delay: -12s;
          }

          @keyframes floatOrb {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(40px, -50px) scale(1.1); }
            100% { transform: translate(-30px, 30px) scale(0.95); }
          }

          /* Grid Layout */
          .systems-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 20px;
            width: 100%;
            align-items: start;
          }
          @media (min-width: 640px) {
            .systems-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (min-width: 1024px) {
            .systems-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }

          /* UltraFlex Glassmorphic Card Container */
          .ultraflex-card-container {
            height: 105px;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .ultraflex-card-container.is-expanded {
            height: 310px;
          }

          /* Glassmorphism Surface Base */
          .glass-card {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1.5px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
            transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
          }
          .dark .glass-card {
            background: rgba(15, 23, 42, 0.75);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
          }

          .ultraflex-card-container:hover:not(.is-expanded) .glass-card {
            border-color: color-mix(in srgb, var(--item-color) 60%, transparent);
            box-shadow: 0 16px 36px -12px color-mix(in srgb, var(--item-color) 30%, transparent);
            transform: translateY(-3px);
          }

          /* Floating Multi-color Glass Badge / Icon - UltraFlex Glasses effect */
          .ultraflex-icon {
            position: absolute;
            top: 1.1rem;
            right: 1.25rem;
            z-index: 10;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .ultraflex-card-container.is-expanded .ultraflex-icon {
            transform: translateX(-50%) rotate(360deg) scale(1.35);
            left: 50%;
            right: auto;
            top: 1.25rem;
          }

          /* Heading Animation - UltraFlex Shift */
          .ultraflex-heading {
            position: absolute;
            top: 1.25rem;
            left: 1.25rem;
            right: 4.5rem;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .ultraflex-card-container.is-expanded .ultraflex-heading {
            transform: translateY(4.6rem);
            left: 1rem;
            right: 1rem;
            text-align: center;
          }

          /* Details Animation - Hidden when collapsed, visible only on click expansion */
          .ultraflex-details {
            position: absolute;
            top: 8.2rem;
            left: 1.25rem;
            right: 1.25rem;
            opacity: 0;
            transform: translateY(15px);
            pointer-events: none;
            transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .ultraflex-card-container.is-expanded .ultraflex-details {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
            text-align: center;
          }

          /* UltraFlex Action Buttons (btn1 & btn2) */
          .ultraflex-actions {
            position: absolute;
            bottom: 1.2rem;
            left: 1rem;
            right: 1rem;
            opacity: 0;
            transform: translateY(20px);
            pointer-events: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
            transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .ultraflex-card-container.is-expanded .ultraflex-actions {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          /* UltraFlex Button 1 (Buy/Access style with limegreen hover accent) */
          .ultraflex-btn-primary {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 700;
          }
          .ultraflex-btn-primary:hover {
            background-color: #22c55e !important;
            color: #ffffff !important;
            box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
            transform: translateY(-1.5px);
          }

          /* UltraFlex Button 2 (Add to Cart/Details style) */
          .ultraflex-btn-secondary {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 700;
          }
          .ultraflex-btn-secondary:hover {
            background-color: #0f172a !important;
            color: #ffffff !important;
            transform: translateY(-1.5px);
          }
          .dark .ultraflex-btn-secondary:hover {
            background-color: #ffffff !important;
            color: #0f172a !important;
          }

          /* Custom Glass Scrollbar */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Icon Floating & Continuous Motion Animations */
          @keyframes iconPulseFloat {
            0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
            50% { transform: translateY(-4px) scale(1.08) rotate(3deg); }
          }

          .ultraflex-icon svg {
            animation: iconPulseFloat 3.5s ease-in-out infinite;
            display: inline-block;
          }

          /* Staggered Animation Delays for Grid Icons */
          .systems-grid > div:nth-child(2n) .ultraflex-icon svg { animation-delay: -0.7s; }
          .systems-grid > div:nth-child(3n) .ultraflex-icon svg { animation-delay: -1.4s; }
          .systems-grid > div:nth-child(4n) .ultraflex-icon svg { animation-delay: -2.1s; }
          .systems-grid > div:nth-child(5n) .ultraflex-icon svg { animation-delay: -2.8s; }

          /* Circular Video Thumbnail Hover Glow & Pulsing */
          .video-circle-thumb {
            animation: circlePulse 2.2s infinite alternate ease-in-out;
          }
          @keyframes circlePulse {
            0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4), 0 10px 25px -5px rgba(0, 0, 0, 0.3); }
            100% { box-shadow: 0 0 25px 8px rgba(244, 63, 94, 0.35), 0 15px 30px -5px rgba(225, 29, 72, 0.4); }
          }

          /* Optimal Video Character Framing & Sharpness Enhancements */
          .video-character-frame {
            object-fit: cover;
            object-position: center 22%;
            filter: contrast(1.08) brightness(1.04) saturate(1.06);
            image-rendering: -webkit-optimize-contrast;
          }
        `}</style>

        {/* Ambient Orbs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl">
          <div className="bg-orb bg-orb-1"></div>
          <div className="bg-orb bg-orb-2"></div>
          <div className="bg-orb bg-orb-3"></div>
        </div>

        {/* Hero Banner with Glassmorphism & Expanding Video Overlay */}
        <div id="hero-banner" className="relative mb-8 rounded-3xl bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-purple-700/80 dark:from-blue-950/80 dark:via-indigo-950/80 dark:to-purple-950/80 backdrop-blur-2xl p-6 md:p-8 text-white overflow-hidden shadow-2xl border border-white/30 dark:border-white/10 transition-all duration-700">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-32 -top-16 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Banner Content Layer */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 text-white border border-white/30 backdrop-blur-xl shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" /> Ecosystem Portal
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight drop-shadow-sm">{t.bannerTitle}</h2>
              <p className="text-slate-100 text-sm md:text-base mt-1.5 max-w-xl font-medium leading-relaxed drop-shadow-xs">{t.bannerSubtitle}</p>
            </div>

            {/* Interactive Circular Video Widget */}
            <div className="flex flex-col items-center justify-center shrink-0 self-center sm:self-auto group">
              <div 
                onClick={toggleVideoPlay}
                className="video-circle-thumb relative transition-all duration-500 ease-out cursor-pointer flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-white/90 hover:ring-rose-400 hover:scale-110 active:scale-95 bg-slate-950 overflow-hidden shadow-2xl"
                title="Xem video giới thiệu"
              >
                <video
                  ref={previewVideoRef}
                  playsInline
                  muted
                  loop
                  className="video-character-frame w-full h-full rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
                  src="https://cdn.scena.ai/project/8606/581097478f9de72616d982e302e1c8d0aab6d66cbee040430c610424c0c72a44.mp4"
                ></video>

                <div className="absolute bottom-1.5 right-1/2 translate-x-1/2 p-2 rounded-full text-white bg-rose-600 hover:bg-rose-500 shadow-lg group-hover:scale-110 transition-all flex items-center justify-center z-10">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
              </div>
              <span className="text-[11px] font-black tracking-widest uppercase text-white/90 mt-2 bg-gradient-to-r from-rose-600 to-pink-600 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 shadow-md flex items-center gap-1 font-sans">
                <Play className="w-3 h-3 fill-current" /> {t.playVideo}
              </span>
            </div>
          </div>

          {/* Expanded Full Banner Video Player Layer */}
          <div 
            className={`absolute inset-0 z-30 bg-slate-950 flex flex-col justify-between p-4 sm:p-6 transition-all duration-700 rounded-3xl overflow-hidden ${
              isVideoPlaying
                ? 'opacity-100 pointer-events-auto scale-100'
                : 'opacity-0 pointer-events-none scale-95'
            }`}
          >
            <video
              ref={fullVideoRef}
              playsInline
              loop
              className="video-character-frame absolute inset-0 w-full h-full rounded-3xl"
              src="https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4"
            ></video>

            {/* Soft top & bottom gradient vignette to protect button visibility while leaving center character video clear & sharp */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-transparent to-slate-950/80 pointer-events-none z-10"></div>

            {/* Video Overlay Header & Close Control */}
            <div className="relative z-40 flex items-center justify-between w-full">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="text-xs font-bold text-white tracking-wide">{t.videoIntroTitle}</span>
              </div>

              <button 
                onClick={toggleVideoPlay}
                className="p-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                title="Thu nhỏ video"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Video Bottom Controls */}
            <div className="relative z-40 flex items-center justify-between w-full pt-4">
              <button 
                onClick={toggleFullVideoPlayback}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-500 backdrop-blur-md text-white font-black text-xs uppercase tracking-wider border border-white/30 transition-all shadow-lg"
              >
                {fullVideoPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                <span>{fullVideoPaused ? t.playVideo : t.pause}</span>
              </button>

              <button 
                onClick={toggleVideoMute}
                className="p-2 rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                {fullVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Glass Filter Tabs */}
          <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-2 overflow-x-auto no-scrollbar relative z-10">
            {[
              { key: 'all', label: t.allCategories },
              { key: 'platform', label: t.catPlatform },
              { key: 'enterprise', label: t.catEnterprise },
              { key: 'growth', label: t.catGrowth },
            ].map(cat => (
              <button
                key={cat.key}
                onClick={() => setCurrentCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  currentCategory === cat.key
                    ? 'bg-white text-slate-900 shadow-lg scale-105'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Systems Grid */}
        <div className="w-full py-2 relative z-10">
          {filteredSystems.length > 0 ? (
            <div className="responsive-card-container w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredSystems.map((sys, idx) => {
                const isExpanded = expandedKeys.has(sys.key);
                const nameDisplay = currentLang === 'vi' ? sys.name : sys.nameEn;
                const hasLink = sys.link && sys.link !== "(Đang triển khai)";

                return (
                  <div
                    key={sys.key}
                    onClick={e => handleCardClick(sys.key, e)}
                    className={`ultraflex-card-container group relative w-full cursor-pointer ${isExpanded ? 'is-expanded' : ''}`}
                    style={{
                      '--item-color': sys.color,
                      transitionDelay: `${(idx % 6) * 35}ms`
                    } as React.CSSProperties}
                  >
                    <div className="glass-card h-full rounded-2xl overflow-hidden p-4 relative">
                      
                      {/* Indicator Arrow Icon (Hidden) */}
                      <div className="hidden absolute top-3 left-3 z-20 text-slate-400 group-hover:text-indigo-500 transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-indigo-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                        )}
                      </div>

                      {/* Floating Multi-color Glass Icon Badge with 3D Duotone Gradient SVGs */}
                      <div 
                        className="ultraflex-icon p-2 rounded-2xl shrink-0 flex items-center justify-center border border-white/40 dark:border-white/10"
                        style={{
                          backgroundColor: `${sys.color}18`,
                          boxShadow: `0 8px 24px -6px ${sys.color}40`
                        }}
                      >
                        <SystemGradientIcon itemKey={sys.key} extraClass="w-8 h-8" />
                      </div>

                      {/* Heading */}
                      <div className="ultraflex-heading">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-xs tracking-wider uppercase" style={{ color: sys.color }}>
                            {sys.key}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 truncate">
                            ({sys.nameEn})
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                          {nameDisplay}
                        </h3>
                      </div>

                      {/* Details (Visible on click expansion) */}
                      <div className="ultraflex-details">
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                          {sys.desc}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="ultraflex-actions">
                        {hasLink ? (
                          <button
                            onClick={e => openSystemLink(sys.link, e)}
                            className="action-btn ultraflex-btn-primary w-full py-2 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                            style={{ backgroundColor: sys.color }}
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{t.accessNow}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full py-2 px-3 rounded-xl text-xs font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 text-center cursor-not-allowed border border-white/20 dark:border-slate-800"
                          >
                            {t.underDevelopment}
                          </button>
                        )}

                        <button
                          onClick={e => openModal(sys, e)}
                          className="action-btn ultraflex-btn-secondary w-full py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                        >
                          <Info className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                          <span>{t.details}</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400 glass-card rounded-3xl border border-white/60 dark:border-slate-800">
              <Search className="w-10 h-10 mx-auto text-slate-400 mb-3" />
              <p className="text-sm font-semibold">{t.noResults}</p>
            </div>
          )}
        </div>
      </>

      {/* Modal */}
      {modalSystem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg glass-card bg-white/90 dark:bg-slate-900/90 border border-white/80 dark:border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden p-6 text-slate-900 dark:text-slate-100">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div 
                className="p-3.5 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-sm border bg-white/50 dark:bg-slate-800/50"
                style={{
                  borderColor: `${modalSystem.color}40`
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <SystemGradientIcon itemKey={modalSystem.key} extraClass="w-10 h-10" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: modalSystem.color }}>
                    {modalSystem.key}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    ({modalSystem.nameEn})
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {currentLang === 'vi' ? modalSystem.name : modalSystem.nameEn}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed bg-slate-100/50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
              {modalSystem.desc}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                {t.featuresTitle}
              </h4>
              <ul className="space-y-2.5">
                {modalSystem.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
              >
                {t.close}
              </button>
              
              {modalSystem.link && modalSystem.link !== "(Đang triển khai)" ? (
                <a
                  href={modalSystem.link.startsWith('http') ? modalSystem.link : 'https://' + modalSystem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl shadow-lg transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: modalSystem.color }}
                >
                  <span>{t.accessNow}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="px-3 py-1.5 text-xs font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl border border-white/20 dark:border-slate-700">
                  {t.underDevelopment}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

export default Systems;
