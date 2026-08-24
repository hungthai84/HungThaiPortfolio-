import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  Bot,
  Send,
  Sparkles,
  Copy,
  Check,
  Volume2,
  VolumeX,
  User,
  RefreshCw,
  Award,
  TrendingUp,
  Cpu,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  X,
  Layers,
  BarChart3,
  List,
  ChevronDown,
  LucideIcon,
  Minimize2,
  Maximize2,
  Minus,
  Bookmark,
  Paperclip,
  MessageSquare,
  HelpCircle,
  Search,
  History,
  Trash2,
  RotateCcw,
  Save,
  Sliders,
  Settings2,
  Smile,
  Mic,
  Zap,
  SlidersHorizontal,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { aiCategories, findPredefinedAnswer } from "../data/aiQuestions";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { TypewriterMarkdown } from "../components/TypewriterMarkdown";
import {
  getDefaultVietnameseVoice,
  getDefaultEnglishVoice,
  formatVoiceLabel,
  getVietnameseVoices,
  getEnglishVoices,
} from "../utils/speechUtils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  modelUsed?: string;
}

export interface SampleCategory {
  id: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  icon: LucideIcon;
  color: string;
  questions: {
    id: string;
    titleVi: string;
    titleEn: string;
    promptVi: string;
    promptEn: string;
  }[];
}

const SAMPLE_CATEGORIES: SampleCategory[] = [
  {
    id: "career",
    nameVi: "Sự nghiệp & Thành tựu 22 năm",
    nameEn: "Career & 22-Year Milestones",
    descVi: "Hành trình sự nghiệp tại MoMo, Garena, Shopee, Prudential",
    descEn: "Executive career trajectory across enterprise companies",
    icon: Award,
    color:
      "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    questions: [
      {
        id: "c1",
        titleVi: "Hành trình 22 năm làm Trưởng phòng / Giám đốc CX",
        titleEn: "22 Years of CX Executive Leadership",
        promptVi:
          "Hãy tóm tắt những mốc phát triển quan trọng nhất trong hành trình 22 năm làm CX của ông Nguyễn Hùng Thái.",
        promptEn:
          "Summarize key milestones in Mr. Nguyen Hung Thai's 22-year CX leadership career.",
      },
      {
        id: "c2",
        titleVi: "Kinh nghiệm quản lý Call Center quy mô hơn 500 nhân sự",
        titleEn: "Managing 500+ Agent Call Center Operations",
        promptVi:
          "Kinh nghiệm điều hành Call Center và Contact Center quy mô hàng trăm nhân sự tại các tập đoàn lớn của ông Thái là gì?",
        promptEn:
          "What is Mr. Thai's experience in managing large-scale 500+ agent Call Centers?",
      },
      {
        id: "c3",
        titleVi: "Những giải thưởng & Bằng khen ấn tượng nhất",
        titleEn: "Top Awards & Recognized Achievements",
        promptVi:
          "Những giải thưởng, chứng chỉ chuyên môn và đóng góp nổi bật nhất của ông Nguyễn Hùng Thái trong ngành CX?",
        promptEn:
          "What are the top awards, certifications, and key contributions of Mr. Thai in CX?",
      },
    ],
  },
  {
    id: "cx-strategy",
    nameVi: "Chiến lược CX & Văn hóa Khách hàng",
    nameEn: "CX Strategy & Customer Culture",
    descVi:
      "Xây dựng tư duy lấy khách hàng làm trung tâm & tăng trưởng NPS/CSAT",
    descEn: "Building customer-centric culture & growing NPS/CSAT",
    icon: TrendingUp,
    color:
      "from-indigo-500/20 to-blue-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    questions: [
      {
        id: "cx1",
        titleVi: "Chuyển đổi NPS/CSAT thành chỉ số tăng trưởng doanh thu",
        titleEn: "Converting NPS/CSAT into Business Growth",
        promptVi:
          "Làm thế nào để chuyển đổi chỉ số NPS/CSAT từ lý thuyết thành kết quả tăng trưởng doanh thu & giữ chân khách hàng?",
        promptEn:
          "How to convert NPS/CSAT from theoretical metrics into tangible revenue growth and retention?",
      },
      {
        id: "cx2",
        titleVi: "Phương pháp lan tỏa tư duy Customer-Centric toàn công ty",
        titleEn: "Promoting Customer-Centric Culture Company-wide",
        promptVi:
          "Phương pháp nào giúp ông Thái lan tỏa văn hóa lấy khách hàng làm trung tâm tới mọi phòng ban trong tập đoàn?",
        promptEn:
          "What methodology does Mr. Thai use to drive a customer-centric culture across all corporate departments?",
      },
      {
        id: "cx3",
        titleVi: "Cá nhân hóa trải nghiệm khách hàng quy mô hàng triệu người",
        titleEn: "Personalizing CX for Millions of Users",
        promptVi:
          "Chiến lược cá nhân hóa trải nghiệm người dùng (Personalized CX) ở quy mô hàng triệu giao dịch mỗi ngày?",
        promptEn:
          "What is the strategy for personalizing customer experience at scale for millions of daily transactions?",
      },
    ],
  },
  {
    id: "crm-momo",
    nameVi: "Kiến trúc CRM & Omnichannel MoMo",
    nameEn: "MoMo CRM Architecture & Omnichannel",
    descVi: "Tái cấu trúc hệ thống hỗ trợ đa kênh Fintech & tối ưu AHT",
    descEn: "Restructuring omnichannel CRM & optimizing AHT in Fintech",
    icon: Layers,
    color:
      "from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
    questions: [
      {
        id: "crm1",
        titleVi: "Dấu ấn tái cấu trúc CRM tại MoMo (2018-2021)",
        titleEn: "MoMo CRM Restructuring Footprint (2018-2021)",
        promptVi:
          "Chiến lược tái cấu trúc CRM đa kênh và tối ưu vận hành tại MoMo (2018-2021) đã đem lại kết quả cụ thể ra sao?",
        promptEn:
          "What were the key results of restructuring the omnichannel CRM system at MoMo (2018-2021)?",
      },
      {
        id: "crm2",
        titleVi: "Đồng bộ dữ liệu khách hàng 360 độ Realtime",
        titleEn: "360-Degree Realtime Customer Data Sync",
        promptVi:
          "Cách tích hợp dữ liệu realtime 360 độ giữa App ticket, Call Center và LiveChat để giảm 45% thời gian xử lý (AHT)?",
        promptEn:
          "How was 360-degree realtime data synced across App tickets, Call Center, and LiveChat to cut AHT by 45%?",
      },
      {
        id: "crm3",
        titleVi: "Thiết kế hành trình khách hàng (Customer Journey Mapping)",
        titleEn: "End-to-End Customer Journey Mapping",
        promptVi:
          "Quy trình thiết kế và vẽ sơ đồ hành trình khách hàng (Customer Journey Mapping) trên ứng dụng Fintech?",
        promptEn:
          "How to design and map end-to-end customer journeys on Fintech mobile apps?",
      },
    ],
  },
  {
    id: "ai-automation",
    nameVi: "Lộ trình AI & Tự động hóa Contact Center",
    nameEn: "AI Roadmap & Contact Center Automation",
    descVi: "Ứng dụng AI Chatbot, Smart Routing và Agent AI Copilot",
    descEn: "Deploying AI Chatbots, Smart Routing, and Agent AI Copilot",
    icon: Cpu,
    color:
      "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    questions: [
      {
        id: "ai1",
        titleVi: "Lộ trình 3 giai đoạn ứng dụng AI vào Contact Center",
        titleEn: "3-Phase Roadmap for AI Contact Center Integration",
        promptVi:
          "Lộ trình 3 giai đoạn ứng dụng AI Chatbot và công nghệ tự động hóa trong Contact Center bao gồm những bước nào?",
        promptEn:
          "What are the 3 phases of deploying AI Chatbots and automation into Contact Centers?",
      },
      {
        id: "ai2",
        titleVi: "Tự động hóa 60%+ yêu cầu hỗ trợ thường gặp",
        titleEn: "Automating 60%+ Routine Tier-1 Support Tickets",
        promptVi:
          "Làm thế nào để tự động hóa hơn 60% yêu cầu hỗ trợ cơ bản bằng AI mà vẫn duy trì chỉ số hài lòng CSAT cao?",
        promptEn:
          "How to automate over 60% of routine tier-1 support requests using AI while maintaining high CSAT?",
      },
      {
        id: "ai3",
        titleVi: "AI Copilot hỗ trợ nhân viên tư vấn tăng năng suất",
        titleEn: "AI Copilot Assisting Contact Center Agents",
        promptVi:
          "Mô hình AI Copilot hỗ trợ nhân viên trả lời khách hàng nhanh hơn và giảm thiểu sai sót vận hành ra sao?",
        promptEn:
          "How does an AI Copilot assist contact center agents to respond faster and eliminate operational errors?",
      },
    ],
  },
  {
    id: "crisis",
    nameVi: "Quản trị Khủng hoảng & Sự cố Dịch vụ",
    nameEn: "Crisis Management & Outage Protocols",
    descVi: "Quy trình War-Room 15 phút & thông báo chủ động cho người dùng",
    descEn: "15-minute War-Room protocol & proactive communication",
    icon: ShieldAlert,
    color:
      "from-rose-500/20 to-red-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30",
    questions: [
      {
        id: "cr1",
        titleVi: "Nguyên tắc vàng khi xử lý khủng hoảng dịch vụ",
        titleEn: "Gold Rules for Service Outage & Crisis Handling",
        promptVi:
          "Nguyên tắc vàng và quy trình xử lý khủng hoảng truyền thông / sự cố hệ thống dịch vụ của ông Thái là gì?",
        promptEn:
          "What are Mr. Thai's gold rules and protocols for handling PR crises and service outages?",
      },
      {
        id: "cr2",
        titleVi: "Kích hoạt quy trình War-Room trong vòng 15 phút",
        titleEn: "15-Minute Emergency War-Room Protocol",
        promptVi:
          "Quy trình kích hoạt War-Room trong vòng 15 phút khi xảy ra sự cố nghẽn mạng hoặc thanh toán bị gián đoạn?",
        promptEn:
          "How is the emergency War-Room protocol activated within 15 minutes during system or payment outages?",
      },
      {
        id: "cr3",
        titleVi: "Chiến lược thông báo chủ động (Proactive Alert)",
        titleEn: "Proactive Alert Strategy to Calm Customers",
        promptVi:
          "Chiến lược thông báo chủ động (Proactive Alert) đến người dùng để giảm tải áp lực cho tổng đài khi gặp sự cố?",
        promptEn:
          "How does proactive alert strategy reduce contact center overload during crisis situations?",
      },
    ],
  },
  {
    id: "metrics",
    nameVi: "Tối ưu Vận hành & Đo lường KPI",
    nameEn: "Operational Optimization & KPIs",
    descVi: "Quản trị FCR, AHT, CES, Churn Rate & Outsourced Vendors",
    descEn: "Managing FCR, AHT, CES, Churn Rate & Outsourced Vendors",
    icon: BarChart3,
    color:
      "from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    questions: [
      {
        id: "m1",
        titleVi: "Bộ chỉ số KPI cốt lõi điều hành Contact Center",
        titleEn: "Core KPIs for Contact Center Operations",
        promptVi:
          "Bộ chỉ số KPI quan trọng nhất (FCR, AHT, CSAT, CES, Churn Rate) để đánh giá sức khỏe vận hành Contact Center là gì?",
        promptEn:
          "What are the core KPIs (FCR, AHT, CSAT, CES, Churn Rate) for evaluating Contact Center health?",
      },
      {
        id: "m2",
        titleVi: "Đàm phán và quản lý đối tác Outsourced Call Center",
        titleEn: "Managing Outsourced Call Center Vendors",
        promptVi:
          "Bí quyết đàm phán hợp đồng SLA và quản lý chất lượng dịch vụ khi hợp tác với các nhà cung cấp Call Center bên ngoài?",
        promptEn:
          "What are the best practices for SLA contract negotiation and quality control with outsourced Call Center vendors?",
      },
      {
        id: "m3",
        titleVi: "Cân bằng giữa tối ưu chi phí và trải nghiệm khách hàng",
        titleEn: "Balancing Cost Optimization & High CX Quality",
        promptVi:
          "Làm thế nào để vừa cắt giảm chi phí vận hành vừa đảm bảo duy trì trải nghiệm khách hàng xuất sắc?",
        promptEn:
          "How to strike the right balance between cost reduction and maintaining superior customer experiences?",
      },
    ],
  },
];

const PRESET_PROMPTS = [
  {
    icon: Award,
    title: "Mốc son 22 năm",
    prompt:
      "Hãy tóm tắt những mốc phát triển quan trọng nhất trong hành trình 22 năm làm CX của ông Nguyễn Hùng Thái.",
    color:
      "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/30",
  },
  {
    icon: TrendingUp,
    title: "Chiến lược CRM MoMo",
    prompt:
      "Chiến lược tái cấu trúc CRM đa kênh và tối ưu vận hành tại MoMo (2018-2021) đã đem lại kết quả cụ thể ra sao?",
    color:
      "from-indigo-500/20 to-blue-500/20 text-indigo-500 border-indigo-500/30",
  },
  {
    icon: Cpu,
    title: "Lộ trình AI & CSKH",
    prompt:
      "Lộ trình 3 giai đoạn ứng dụng AI Chatbot và công nghệ tự động hóa trong Contact Center bao gồm những bước nào?",
    color:
      "from-purple-500/20 to-pink-500/20 text-purple-500 border-purple-400/30",
  },
  {
    icon: ShieldAlert,
    title: "Xử lý khủng hoảng",
    prompt:
      "Nguyên tắc vàng và quy trình xử lý khủng hoảng truyền thông / sự cố hệ thống dịch vụ của ông Thái là gì?",
    color: "from-rose-500/20 to-red-500/20 text-rose-500 border-rose-400/30",
  },
];

const QUICK_CHIPS = [
  {
    id: "cat-1",
    textVi: "👤 1. Giới thiệu cá nhân",
    textEn: "👤 1. Personal Intro",
  },
  {
    id: "cat-2",
    textVi: "🎯 2. Tầm nhìn & Chiến lược",
    textEn: "🎯 2. Vision & Strategy",
  },
  {
    id: "cat-3",
    textVi: "👥 3. Quản lý & Đào tạo",
    textEn: "👥 3. Management & Training",
  },
  {
    id: "cat-4",
    textVi: "🛡️ 4. Tình huống & Khủng hoảng",
    textEn: "🛡️ 4. Crises & Incidents",
  },
  {
    id: "cat-5",
    textVi: "⚙️ 5. Công nghệ & Quy trình",
    textEn: "⚙️ 5. Tech & Processes",
  },
  {
    id: "cat-6",
    textVi: "❤️ 6. Văn hóa & Thấu cảm",
    textEn: "❤️ 6. Culture & Empathy",
  },
  {
    id: "cat-7",
    textVi: "🤝 7. Tổ chức & Phối hợp",
    textEn: "🤝 7. Org & Collaboration",
  },
  {
    id: "cat-8",
    textVi: "💡 8. Lãnh đạo & Tư duy khác biệt",
    textEn: "💡 8. Leadership & Mindset",
  },
];

interface AIChatProps {
  isPopup?: boolean;
  onClose?: () => void;
}

export interface VoicePresetParams {
  pitch: number;          // 0.10 - 2.00
  rate: number;           // 0.50x - 2.00x
  robotLevel: number;     // 0 - 100%
  childTone: number;      // 0 - 100%
  emotion: number;        // 0 - 100%
  energy: number;         // 0 - 100%
  expressiveness: number; // 0 - 100%
  stability: number;      // 0 - 100%
  clarity: number;        // 0 - 100%
  warmth: number;         // 0 - 100%
  pause: number;          // 0.05s - 1.00s
}

export interface VoicePreset {
  id: string;
  nameVi: string;
  nameEn: string;
  icon: string;
  badge?: string;
  tags?: string;
  descriptionVi: string;
  descriptionEn: string;
  isFeatured?: boolean;
  params: VoicePresetParams;
}

export const VOICE_PRESETS: Record<string, VoicePreset> = {
  robotMouseBoy: {
    id: "robotMouseBoy",
    nameVi: "Robot Chuột Bé Trai",
    nameEn: "Robot Mouse Boy",
    icon: "🐭",
    badge: "MẶC ĐỊNH CHỌN",
    tags: "Cute • Young • Smart • Friendly",
    descriptionVi: "Giọng AI bé trai phong cách chuột robot tương lai",
    descriptionEn: "Futuristic young boy AI mouse robot voice",
    isFeatured: true,
    params: {
      pitch: 0.72,
      rate: 0.95,
      robotLevel: 58,
      childTone: 70,
      emotion: 80,
      energy: 78,
      expressiveness: 75,
      stability: 45,
      clarity: 88,
      warmth: 48,
      pause: 0.20,
    },
  },
  deepMetal: {
    id: "deepMetal",
    nameVi: "Trầm Kim Loại",
    nameEn: "Deep Metal",
    icon: "🤖",
    descriptionVi: "Giọng robot kim loại trầm ấm, uy lực",
    descriptionEn: "Deep metallic synth robot voice",
    params: {
      pitch: 0.20,
      rate: 0.85,
      robotLevel: 85,
      childTone: 10,
      emotion: 30,
      energy: 60,
      expressiveness: 30,
      stability: 80,
      clarity: 90,
      warmth: 20,
      pause: 0.30,
    },
  },
  classicSynth: {
    id: "classicSynth",
    nameVi: "Robot Chuẩn",
    nameEn: "Classic Synth",
    icon: "⚡",
    descriptionVi: "Giọng robot tiêu chuẩn rõ tiếng, ổn định",
    descriptionEn: "Standard balanced AI synth voice",
    params: {
      pitch: 0.35,
      rate: 0.95,
      robotLevel: 70,
      childTone: 20,
      emotion: 50,
      energy: 70,
      expressiveness: 50,
      stability: 60,
      clarity: 90,
      warmth: 40,
      pause: 0.25,
    },
  },
  cyberBot: {
    id: "cyberBot",
    nameVi: "Cyber Bot",
    nameEn: "Cyber Bot",
    icon: "🛸",
    descriptionVi: "Giọng robot viễn tưởng nhịp nhanh năng động",
    descriptionEn: "Futuristic fast-paced cyber bot voice",
    params: {
      pitch: 0.60,
      rate: 1.10,
      robotLevel: 75,
      childTone: 40,
      emotion: 65,
      energy: 85,
      expressiveness: 65,
      stability: 50,
      clarity: 92,
      warmth: 35,
      pause: 0.15,
    },
  },
  childBot: {
    id: "childBot",
    nameVi: "Robot Trẻ Em",
    nameEn: "Child Bot",
    icon: "👶",
    descriptionVi: "Giọng robot nhí nhảnh cao vút tươi vui",
    descriptionEn: "Playful high-pitched child robot voice",
    params: {
      pitch: 1.85,
      rate: 1.15,
      robotLevel: 60,
      childTone: 95,
      emotion: 90,
      energy: 90,
      expressiveness: 85,
      stability: 35,
      clarity: 85,
      warmth: 55,
      pause: 0.15,
    },
  },
};

export interface VoiceMood {
  id: string;
  nameVi: string;
  nameEn: string;
  icon: string;
  modifiers: {
    emotionDelta?: number;
    energyDelta?: number;
    rateDelta?: number;
    pitchDelta?: number;
    expressivenessDelta?: number;
    pauseDelta?: number;
    warmthDelta?: number;
    stabilityDelta?: number;
  };
}

export const VOICE_MOODS: VoiceMood[] = [
  { id: "happy", nameVi: "Vui vẻ", nameEn: "Joyful", icon: "😊", modifiers: { emotionDelta: 10, energyDelta: 5, rateDelta: 0.03 } },
  { id: "welcome", nameVi: "Chào khách", nameEn: "Welcome", icon: "👋", modifiers: { warmthDelta: 15, energyDelta: 8, expressivenessDelta: 10 } },
  { id: "smart", nameVi: "Thông minh", nameEn: "Smart", icon: "🧠", modifiers: { stabilityDelta: 15, rateDelta: -0.03 } },
  { id: "friendly", nameVi: "Thân thiện", nameEn: "Friendly", icon: "🤗", modifiers: { warmthDelta: 20, emotionDelta: 10 } },
  { id: "playful", nameVi: "Tinh nghịch", nameEn: "Playful", icon: "😄", modifiers: { pitchDelta: 0.03, expressivenessDelta: 15 } },
  { id: "gentle", nameVi: "Nhẹ nhàng", nameEn: "Gentle", icon: "💤", modifiers: { energyDelta: -15, rateDelta: -0.05, pauseDelta: 0.10 } },
  { id: "urgent", nameVi: "Khẩn cấp", nameEn: "Alert", icon: "🚨", modifiers: { energyDelta: 20, rateDelta: 0.10 } },
];

export function AIChat({ isPopup = false, onClose }: AIChatProps = {}) {
  const { language } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [typedMessageIds, setTypedMessageIds] = useState<
    Record<string, boolean>
  >({});
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: "welcome-1",
        role: "assistant",
        content:
          language === "en"
            ? "Hello! I am Trí Nhân, an AI assistant ready to help you answer questions related to Mr. Thái."
            : "Xin chào Anh Chị Tôi là Trí Nhân, trợ lý AI của anh Hùng Thái. Tôi có thể giúp gì cho bạn !\n\nBạn có thể hỏi tôi về thông tin của anh Hùng Thái hoặc có danh sách câu hỏi mẫu bên dưới .",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: "Trí Nhân AI (Gemini 3.7 Flash)",
      },
    ];
  });

  // Read voice configurations from local storage
  const [selectedVoiceVi, setSelectedVoiceVi] = useState(() => {
    return localStorage.getItem("app_ai_voice_vi") || "";
  });
  const [selectedVoiceEn, setSelectedVoiceEn] = useState(() => {
    return localStorage.getItem("app_ai_voice_en") || "";
  });

  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<"general" | "complex" | "fast">(
    "general",
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<{ role: "user" | "model"; content: string }[]>([]);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [welcomeSpoken, setWelcomeSpoken] = useState(false);

  // Persist autoSpeak state to localStorage, default to true
  const [autoSpeak, setAutoSpeak] = useState(() => {
    const saved = localStorage.getItem("app_ai_chat_autospeak");
    return saved !== null ? saved === "true" : true;
  });

  // Robot Voice Preset & Parameters System States
  const [robotPresetId, setRobotPresetId] = useState<string>(() => {
    return localStorage.getItem("app_ai_robot_preset_id") || "robotMouseBoy";
  });
  const [robotVoiceEnabled, setRobotVoiceEnabled] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_voice_enabled");
    return saved !== null ? saved === "true" : true;
  });
  const [robotPitch, setRobotPitch] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_pitch");
    return saved ? parseFloat(saved) : 0.72;
  });
  const [robotRate, setRobotRate] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_rate");
    return saved ? parseFloat(saved) : 0.95;
  });
  const [robotLevel, setRobotLevel] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_level");
    return saved ? parseInt(saved) : 58;
  });
  const [robotChildTone, setRobotChildTone] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_child_tone");
    return saved ? parseInt(saved) : 70;
  });
  const [robotEmotion, setRobotEmotion] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_emotion");
    return saved ? parseInt(saved) : 80;
  });
  const [robotEnergy, setRobotEnergy] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_energy");
    return saved ? parseInt(saved) : 78;
  });
  const [robotExpressiveness, setRobotExpressiveness] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_expressiveness");
    return saved ? parseInt(saved) : 75;
  });
  const [robotStability, setRobotStability] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_stability");
    return saved ? parseInt(saved) : 45;
  });
  const [robotClarity, setRobotClarity] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_clarity");
    return saved ? parseInt(saved) : 88;
  });
  const [robotWarmth, setRobotWarmth] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_warmth");
    return saved ? parseInt(saved) : 48;
  });
  const [robotPause, setRobotPause] = useState(() => {
    const saved = localStorage.getItem("app_ai_robot_pause");
    return saved ? parseFloat(saved) : 0.20;
  });

  const [activeVoiceMood, setActiveVoiceMood] = useState<string | null>(null);
  const [testAudioStatus, setTestAudioStatus] = useState<"idle" | "playing" | "done">("idle");
  const [showCustomSaveModal, setShowCustomSaveModal] = useState<boolean>(false);
  const [customVoiceNameInput, setCustomVoiceNameInput] = useState<string>("");
  const [showAdvancedParams, setShowAdvancedParams] = useState<boolean>(true);
  const [savedCustomVoices, setSavedCustomVoices] = useState<
    Array<{ id: string; name: string; date: string; params: VoicePresetParams }>
  >(() => {
    const saved = localStorage.getItem("app_ai_saved_custom_voices");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("app_ai_chat_autospeak", String(autoSpeak));
  }, [autoSpeak]);

  useEffect(() => {
    localStorage.setItem("app_ai_robot_preset_id", robotPresetId);
    localStorage.setItem("app_ai_robot_voice_enabled", String(robotVoiceEnabled));
    localStorage.setItem("app_ai_robot_pitch", String(robotPitch));
    localStorage.setItem("app_ai_robot_rate", String(robotRate));
    localStorage.setItem("app_ai_robot_level", String(robotLevel));
    localStorage.setItem("app_ai_robot_child_tone", String(robotChildTone));
    localStorage.setItem("app_ai_robot_emotion", String(robotEmotion));
    localStorage.setItem("app_ai_robot_energy", String(robotEnergy));
    localStorage.setItem("app_ai_robot_expressiveness", String(robotExpressiveness));
    localStorage.setItem("app_ai_robot_stability", String(robotStability));
    localStorage.setItem("app_ai_robot_clarity", String(robotClarity));
    localStorage.setItem("app_ai_robot_warmth", String(robotWarmth));
    localStorage.setItem("app_ai_robot_pause", String(robotPause));
  }, [
    robotPresetId,
    robotVoiceEnabled,
    robotPitch,
    robotRate,
    robotLevel,
    robotChildTone,
    robotEmotion,
    robotEnergy,
    robotExpressiveness,
    robotStability,
    robotClarity,
    robotWarmth,
    robotPause,
  ]);

  useEffect(() => {
    localStorage.setItem("app_ai_saved_custom_voices", JSON.stringify(savedCustomVoices));
  }, [savedCustomVoices]);

  const applyPreset = (presetKey: string) => {
    const preset = VOICE_PRESETS[presetKey];
    if (!preset) return;
    setRobotPresetId(presetKey);
    setRobotPitch(preset.params.pitch);
    setRobotRate(preset.params.rate);
    setRobotLevel(preset.params.robotLevel);
    setRobotChildTone(preset.params.childTone);
    setRobotEmotion(preset.params.emotion);
    setRobotEnergy(preset.params.energy);
    setRobotExpressiveness(preset.params.expressiveness);
    setRobotStability(preset.params.stability);
    setRobotClarity(preset.params.clarity);
    setRobotWarmth(preset.params.warmth);
    setRobotPause(preset.params.pause);
    setActiveVoiceMood(null);
    playUiSound("click");
  };

  const currentPreset = VOICE_PRESETS[robotPresetId] || VOICE_PRESETS.robotMouseBoy;

  const isCustomized =
    Math.abs(robotPitch - currentPreset.params.pitch) > 0.01 ||
    Math.abs(robotRate - currentPreset.params.rate) > 0.01 ||
    robotLevel !== currentPreset.params.robotLevel ||
    robotChildTone !== currentPreset.params.childTone ||
    robotEmotion !== currentPreset.params.emotion ||
    robotEnergy !== currentPreset.params.energy ||
    robotExpressiveness !== currentPreset.params.expressiveness ||
    robotStability !== currentPreset.params.stability ||
    robotClarity !== currentPreset.params.clarity ||
    robotWarmth !== currentPreset.params.warmth ||
    Math.abs(robotPause - currentPreset.params.pause) > 0.01;

  const handleRestorePreset = () => {
    applyPreset(robotPresetId);
  };

  const applyMood = (mood: VoiceMood) => {
    if (activeVoiceMood === mood.id) {
      setActiveVoiceMood(null);
      return;
    }
    setActiveVoiceMood(mood.id);
    const base = currentPreset.params;
    if (mood.modifiers.emotionDelta) {
      setRobotEmotion(Math.min(100, Math.max(0, base.emotion + mood.modifiers.emotionDelta)));
    }
    if (mood.modifiers.energyDelta) {
      setRobotEnergy(Math.min(100, Math.max(0, base.energy + mood.modifiers.energyDelta)));
    }
    if (mood.modifiers.rateDelta) {
      setRobotRate(Number((base.rate + mood.modifiers.rateDelta).toFixed(2)));
    }
    if (mood.modifiers.pitchDelta) {
      setRobotPitch(Number((base.pitch + mood.modifiers.pitchDelta).toFixed(2)));
    }
    if (mood.modifiers.expressivenessDelta) {
      setRobotExpressiveness(Math.min(100, Math.max(0, base.expressiveness + mood.modifiers.expressivenessDelta)));
    }
    if (mood.modifiers.pauseDelta) {
      setRobotPause(Number((base.pause + mood.modifiers.pauseDelta).toFixed(2)));
    }
    if (mood.modifiers.warmthDelta) {
      setRobotWarmth(Math.min(100, Math.max(0, base.warmth + mood.modifiers.warmthDelta)));
    }
    if (mood.modifiers.stabilityDelta) {
      setRobotStability(Math.min(100, Math.max(0, base.stability + mood.modifiers.stabilityDelta)));
    }
    playUiSound("click");
  };

  const handleSaveCustomVoice = () => {
    const title = customVoiceNameInput.trim() || `🐭 ${currentPreset.nameVi} Custom`;
    const newCustom = {
      id: `custom-${Date.now()}`,
      name: title,
      date: new Date().toLocaleDateString("vi-VN"),
      params: {
        pitch: robotPitch,
        rate: robotRate,
        robotLevel,
        childTone: robotChildTone,
        emotion: robotEmotion,
        energy: robotEnergy,
        expressiveness: robotExpressiveness,
        stability: robotStability,
        clarity: robotClarity,
        warmth: robotWarmth,
        pause: robotPause,
      },
    };
    setSavedCustomVoices((prev) => [newCustom, ...prev]);
    setCustomVoiceNameInput("");
    setShowCustomSaveModal(false);
    playUiSound("click");
  };

  const handleLoadCustomVoice = (params: VoicePresetParams) => {
    setRobotPitch(params.pitch);
    setRobotRate(params.rate);
    setRobotLevel(params.robotLevel);
    setRobotChildTone(params.childTone);
    setRobotEmotion(params.emotion);
    setRobotEnergy(params.energy);
    setRobotExpressiveness(params.expressiveness);
    setRobotStability(params.stability);
    setRobotClarity(params.clarity);
    setRobotWarmth(params.warmth);
    setRobotPause(params.pause);
    playUiSound("click");
  };

  const handleDeleteCustomVoice = (id: string) => {
    setSavedCustomVoices((prev) => prev.filter((item) => item.id !== id));
    playUiSound("reset");
  };

  const testRobotVoice = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setTestAudioStatus("playing");

    const testText = language === "en"
      ? "Hello Mr. Nguyen Hung Thai! I am Tri Nhan, your friendly AI mouse assistant! I am always ready to support you. Let's get started!"
      : "Xin chào anh Hùng Thái! Em là Trí Nhân, chú chuột AI nhỏ bé của anh đây! 🐭 Em luôn sẵn sàng hỗ trợ anh. Mình cùng bắt đầu nhé!";

    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.lang = language === "en" ? "en-US" : "vi-VN";

    if (robotVoiceEnabled) {
      utterance.pitch = robotPitch;
      utterance.rate = robotRate;
    } else {
      utterance.pitch = 0.95;
      utterance.rate = 1.0;
    }

    const voiceVi = localStorage.getItem("app_ai_voice_vi") || "";
    const voiceEn = localStorage.getItem("app_ai_voice_en") || "";
    const targetVoiceUri = language === "en" ? voiceEn : voiceVi;

    const voices = window.speechSynthesis.getVoices();
    let targetVoice = voices.find((v) => v.voiceURI === targetVoiceUri);
    if (!targetVoice) {
      targetVoice = language === "en"
        ? getDefaultEnglishVoice(voices)
        : getDefaultVietnameseVoice(voices);
    }
    if (targetVoice) utterance.voice = targetVoice;

    utterance.onend = () => {
      setTestAudioStatus("done");
      setTimeout(() => setTestAudioStatus("idle"), 2500);
    };

    utterance.onerror = () => {
      setTestAudioStatus("idle");
    };

    window.speechSynthesis.speak(utterance);
  };

  const [showSavedPresets, setShowSavedPresets] = useState(false);
  const [showQuestionCategoriesDropdown, setShowQuestionCategoriesDropdown] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string | null>(null);
  const [chatCategorySearch, setChatCategorySearch] = useState("");
  const [activeWidgetTab, setActiveWidgetTab] = useState<"chat" | "questions" | "voice" | "history">("chat");
  const [questionSearchQuery, setQuestionSearchQuery] = useState("");
  const [selectedQuestionCategory, setSelectedQuestionCategory] = useState<string | null>(null);

  const getPitchStatusText = (pitchVal: number) => {
    if (pitchVal < 0.50) {
      return language === "vi" ? "Giọng đang khá trầm" : "Deep Voice";
    }
    if (pitchVal >= 0.60 && pitchVal <= 0.85) {
      return language === "vi" ? "Phù hợp Robot Chuột Bé Trai" : "Ideal for Robot Mouse Boy";
    }
    if (pitchVal > 1.20) {
      return language === "vi" ? "Giọng rất cao – có thể tạo cảm giác hoạt hình" : "Cartoon Style";
    }
    return language === "vi" ? "Cao độ cân bằng" : "Balanced Pitch";
  };

  const savedPresets = [
    {
      title: language === "en" ? "CX Strategy 2026" : "Chiến lược CX 2026",
      prompt: language === "en" 
        ? "What is Mr. Nguyen Hung Thai's strategic vision for Customer Experience in 2026?"
        : "Hãy phân tích chiến lược và tầm nhìn định hướng Trải nghiệm Khách hàng (CX) 2026 của ông Nguyễn Hùng Thái."
    },
    {
      title: language === "en" ? "22-Year Executive Career" : "Hành trình sự nghiệp 22 năm",
      prompt: language === "en"
        ? "Summarize the 22-year career milestones across MoMo, Garena, Shopee, and Prudential."
        : "Tóm tắt các dấu mốc quản lý cấp cao 22 năm qua tại MoMo, Garena, Shopee và Prudential."
    },
    {
      title: language === "en" ? "5-Step Crisis SOP" : "Quy trình 5 bước xử lý khủng hoảng",
      prompt: language === "en"
        ? "Explain the 5-step escalation and crisis management SOP developed by Mr. Thai."
        : "Trình bày chi tiết ma trận ASK và quy trình xử lý khủng hoảng & khiếu nại dịch vụ 5 bước."
    },
    {
      title: language === "en" ? "Leadership Manifesto" : "Tuyên ngôn Lãnh đạo CX",
      prompt: language === "en"
        ? "What are the core values and leadership philosophy championed by Mr. Thai?"
        : "Những giá trị cốt lõi và tuyên ngôn lãnh đạo CX nào được ông Nguyễn Hùng Thái tâm đắc nhất?"
    }
  ];

  const autoSpeakRef = useRef(autoSpeak);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    autoSpeakRef.current = autoSpeak;
  }, [autoSpeak]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadVoices = () => {
      if (!("speechSynthesis" in window)) return;
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      const viVoices = voices.filter(
        (v) =>
          v.lang.toLowerCase().includes("vi") ||
          v.name.toLowerCase().includes("tiếng việt"),
      );
      const enVoices = voices.filter((v) =>
        v.lang.toLowerCase().includes("en"),
      );
      setAvailableVoices(voices);

      // Auto-populate default voice settings with browser-specific preference
      if (viVoices.length > 0) {
        const bestViVoice = getDefaultVietnameseVoice(voices);
        const existingSaved = localStorage.getItem("app_ai_voice_vi");

        if (!existingSaved && bestViVoice) {
          localStorage.setItem("app_ai_voice_vi", bestViVoice.voiceURI);
          setSelectedVoiceVi(bestViVoice.voiceURI);
        } else if (existingSaved) {
          // If saved voice exists in current voices list, keep it; otherwise set default
          const matchedSaved = viVoices.find(
            (v) => v.voiceURI === existingSaved,
          );
          if (matchedSaved) {
            setSelectedVoiceVi(existingSaved);
          } else if (bestViVoice) {
            localStorage.setItem("app_ai_voice_vi", bestViVoice.voiceURI);
            setSelectedVoiceVi(bestViVoice.voiceURI);
          }
        }
      }

      if (enVoices.length > 0) {
        const bestEnVoice = getDefaultEnglishVoice(voices);
        const existingSaved = localStorage.getItem("app_ai_voice_en");
        if (!existingSaved && bestEnVoice) {
          localStorage.setItem("app_ai_voice_en", bestEnVoice.voiceURI);
          setSelectedVoiceEn(bestEnVoice.voiceURI);
        } else if (existingSaved) {
          setSelectedVoiceEn(existingSaved);
        }
      }
    };

    if ("speechSynthesis" in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }, [messages, isLoading]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Listen for question trigger events from RightSidebar or elsewhere
  useEffect(() => {
    const handleOpenWithQuestion = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        handleSend(custom.detail);
      }
    };
    window.addEventListener("app-open-ai-chat-question", handleOpenWithQuestion);
    return () => {
      window.removeEventListener("app-open-ai-chat-question", handleOpenWithQuestion);
    };
  }, [isLoading]);

  const handleSend = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    playUiSound("click");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          history: messages.slice(-10).map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            content: msg.content
          }))
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: "Trí Nhân AI (Gemini 3.7 Flash)",
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
      playUiSound("click");

      if (autoSpeak) {
        handleSpeak(assistantMsg.id, assistantMsg.content);
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `Rất tiếc, Trí Nhân gặp lỗi kết nối: ${err.message}. Vui lòng thử lại sau.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: "System Error",
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    playUiSound("reset");
    setTypedMessageIds({});
    setWelcomeSpoken(false);
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          language === "en"
            ? "Chat history cleared. I am Trí Nhân, how can I assist you today?"
            : "Xin chào Anh Chị Tôi là Trí Nhân, trợ lý AI của anh Hùng Thái. Tôi có thể giúp gì cho bạn !\n\nBạn có thể hỏi tôi về thông tin của anh Hùng Thái hoặc có danh sách câu hỏi mẫu bên dưới .",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: "Trí Nhân AI (Gemini 3.7 Flash)",
      },
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playUiSound("click");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      activeUtteranceRef.current = null;
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Small delay to ensure synthesis queue is fully reset before playing next
    setTimeout(() => {
      try {
        // Clean markdown formatting, links, bullets, and extra spaces for clear reading
        let plainText = text
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // remove markdown links [text](url) -> text
          .replace(/[*_#`~:-]/g, " ") // replace markdown characters and dashes with spaces
          .replace(/\s+/g, " ") // compress multiple spaces
          .trim();

        if (!plainText) {
          return;
        }

        // Splitting into clean sentences to prevent Chrome's 15-second cut-off bug
        const sentences = plainText.match(/[^.!?\n;]+[.!?\n;]*/g) || [
          plainText,
        ];
        const cleanSentences = sentences
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        if (cleanSentences.length === 0) {
          return;
        }

        setSpeakingId(id);

        let currentIndex = 0;

        const speakNextSentence = () => {
          if (currentIndex >= cleanSentences.length) {
            setSpeakingId(null);
            activeUtteranceRef.current = null;
            return;
          }

          const sentenceText = cleanSentences[currentIndex];
          const utterance = new SpeechSynthesisUtterance(sentenceText);

          // Store reference to prevent garbage collection stopping playback
          activeUtteranceRef.current = utterance;

          const isEnText = language === "en";
          utterance.lang = isEnText ? "en-US" : "vi-VN";

          if (robotVoiceEnabled) {
            utterance.pitch = robotPitch;
            utterance.rate = robotRate;
          } else {
            utterance.rate = 1.0;
            utterance.pitch = 0.95;
          }

          const voiceVi = localStorage.getItem("app_ai_voice_vi") || "";
          const voiceEn = localStorage.getItem("app_ai_voice_en") || "";
          const targetVoiceUri = isEnText ? voiceEn : voiceVi;

          const voices = window.speechSynthesis.getVoices();
          let targetVoice = voices.find((v) => v.voiceURI === targetVoiceUri);
          if (!targetVoice) {
            targetVoice = isEnText
              ? getDefaultEnglishVoice(voices)
              : getDefaultVietnameseVoice(voices);
          }
          if (!targetVoice) {
            targetVoice = voices.find((v) =>
              v.lang.toLowerCase().includes(isEnText ? "en" : "vi"),
            );
          }

          if (targetVoice) {
            utterance.voice = targetVoice;
          }

          utterance.onend = () => {
            currentIndex++;
            speakNextSentence();
          };

          utterance.onerror = (event) => {
            if (
              event.error === "interrupted" ||
              event.error === "canceled" ||
              event.error === "not-allowed"
            ) {
              setSpeakingId(null);
              activeUtteranceRef.current = null;
            } else {
              currentIndex++;
              if (currentIndex < cleanSentences.length) {
                speakNextSentence();
              } else {
                setSpeakingId(null);
                activeUtteranceRef.current = null;
              }
            }
          };

          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          try {
            window.speechSynthesis.speak(utterance);
          } catch (speakErr) {
            setSpeakingId(null);
            activeUtteranceRef.current = null;
          }
        };

        speakNextSentence();
      } catch (err) {
        setSpeakingId(null);
        activeUtteranceRef.current = null;
      }
    }, 50);
  };

  useEffect(() => {
    if (autoSpeak && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (
        lastMsg.role === "assistant" &&
        !isLoading &&
        lastMsg.id !== speakingId &&
        !lastMsg.id.startsWith("welcome-")
      ) {
        handleSpeak(lastMsg.id, lastMsg.content);
      }
    }
  }, [messages, autoSpeak, isLoading]);

  // Handle welcoming speech trigger (bypassing browser autoplay gesture requirement)
  useEffect(() => {
    if (!autoSpeak || welcomeSpoken) return;

    const welcomeMsg = messages.find((m) => m.id.startsWith("welcome-"));
    if (!welcomeMsg) return;

    const speakWelcome = () => {
      if (welcomeSpoken) return;
      handleSpeak(welcomeMsg.id, welcomeMsg.content);
      setWelcomeSpoken(true);

      // Remove gesture listeners immediately
      window.removeEventListener("click", speakWelcome, { capture: true });
      window.removeEventListener("touchstart", speakWelcome, { capture: true });
      window.removeEventListener("keydown", speakWelcome, { capture: true });
      document.removeEventListener("click", speakWelcome, { capture: true });
    };

    // Try to speak automatically after voices load
    const timer = setTimeout(() => {
      if (!welcomeSpoken && "speechSynthesis" in window) {
        handleSpeak(welcomeMsg.id, welcomeMsg.content);
        if (window.speechSynthesis.speaking) {
          setWelcomeSpoken(true);
        }
      }
    }, 1000);

    // Register temporary interaction listeners to catch first user touch/click/key
    window.addEventListener("click", speakWelcome, { capture: true });
    window.addEventListener("touchstart", speakWelcome, { capture: true });
    window.addEventListener("keydown", speakWelcome, { capture: true });
    document.addEventListener("click", speakWelcome, { capture: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", speakWelcome, { capture: true });
      window.removeEventListener("touchstart", speakWelcome, { capture: true });
      window.removeEventListener("keydown", speakWelcome, { capture: true });
      document.removeEventListener("click", speakWelcome, { capture: true });
    };
  }, [messages, autoSpeak, welcomeSpoken, availableVoices]);

  const content = (
    <div className="flex h-full min-h-0 w-full max-w-full flex-grow flex-col gap-3 p-[15px]">
      {/* ENTERPRISE AI CHAT BANNER - HIDDEN as requested */}
      <div className="relative hidden shrink-0 overflow-hidden rounded-[10px] border border-blue-500/30 bg-gradient-to-r from-blue-950/90 via-indigo-950/85 to-slate-900/95 p-5 text-white shadow-xl backdrop-blur-xl sm:p-6">
        {/* Ambient Lighting Gradients */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-3xl space-y-3">
            <h2 className="flex items-center gap-2 text-xl font-black tracking-tight text-white sm:text-2xl">
              <Bot className="shrink-0 text-blue-400" size={24} />
              <span>
                {language === "en"
                  ? "Trí Nhân AI Chat - Voice-Interactive Executive Advisor"
                  : "Trực quan hóa Trợ lý Trí Nhân AI - Tư vấn Chiến lược & Vận hành"}
              </span>
            </h2>

            <p className="border-l-2 border-blue-400/60 pl-3 text-xs leading-relaxed font-medium text-slate-300 italic sm:text-sm">
              {language === "en"
                ? "Artificial intelligence is a powerful driver, but deep human understanding and operational wisdom remain the core of elevating customer experiences."
                : "Trí tuệ nhân tạo là công cụ đắc lực, nhưng sự thấu hiểu sâu sắc hành vi con người và tư duy quản trị vận hành mới là cốt lõi nâng tầm trải nghiệm khách hàng."}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid shrink-0 grid-cols-3 gap-2.5 self-start lg:self-center">
            <div className="min-w-[85px] rounded-[10px] border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md">
              <div className="text-lg font-black text-amber-300">Live</div>
              <div className="text-[10px] font-bold tracking-wider text-slate-300">
                {language === "en" ? "Mic" : "Thu âm"}
              </div>
            </div>
            <div className="min-w-[85px] rounded-[10px] border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md">
              <div className="text-lg font-black text-emerald-400">99%</div>
              <div className="text-[10px] font-bold tracking-wider text-slate-300">
                {language === "en" ? "Precision" : "Độ khớp"}
              </div>
            </div>
            <div className="min-w-[85px] rounded-[10px] border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md">
              <div className="text-lg font-black text-sky-300">TTS</div>
              <div className="text-[10px] font-bold tracking-wider text-slate-300">
                {language === "en" ? "Speech" : "Phát âm"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Frame */}
      <div className="relative flex min-h-0 w-full flex-grow flex-col overflow-hidden rounded-[15px] border-2 border-solid border-[var(--border)] bg-white/85 shadow-[4px_0_24px_-8px_rgba(0,0,0,0.05)] backdrop-blur-[45px] backdrop-saturate-[180%] dark:border-white/10 dark:bg-slate-900/85 dark:shadow-[4px_0_24px_-8px_rgba(0,0,0,0.4)] transition-all">
        {/* Chat Frame Custom Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 border-b border-[var(--border)] bg-transparent p-4">
          <div className="flex w-full min-w-0 items-center gap-2.5 md:w-auto">
            <div className="flex min-w-0 flex-col text-left">
              <h1 className="m-0 flex items-center gap-2 text-[20px] font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                <Bot size={20} className="shrink-0" />
                <span className="truncate">
                  {language === "vi"
                    ? "Hệ thống Trí Tuệ Nhân Tạo Conversational CX & Quản trị"
                    : "Conversational CX & Executive Intelligence Engine"}
                </span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-[var(--text-secondary)]">
                  {language === "vi"
                    ? "Trải nghiệm tương tác với hệ thống trí tuệ nhân tạo."
                    : "Interactive experience with the conversational artificial intelligence system."}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-wrap items-center justify-end gap-2 md:w-auto">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-black text-teal-700 shadow-xs backdrop-blur-md dark:text-teal-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
                <span>{language === "vi" ? "Gemini AI Trợ Lý" : "Gemini AI Engine"}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-black text-indigo-700 shadow-xs backdrop-blur-md dark:text-indigo-300">
                <Sparkles size={13} className="text-indigo-500" />
                <span>{language === "vi" ? "Đa Ngữ & Đa Phương Thức" : "Multimodal"}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Message Stream Area - Flexible height in popup mode */}
        <div
          className={cn(
            "no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto p-3 sm:p-4",
            !isPopup && "min-h-[480px]",
          )}
        >
          {/* Messages list */}
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex max-w-[88%] items-start gap-2.5 sm:max-w-[80%]",
                  isUser ? "flex-row-reverse self-end" : "self-start",
                )}
              >
                {/* Avatar Badge */}
                <div
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold shadow-md",
                    isUser
                      ? "border-indigo-400/50 bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                      : "border-purple-400/50 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white",
                  )}
                >
                  {isUser ? (
                    <User size={16} />
                  ) : (
                    <img
                      src="https://i.ibb.co/S4Ddv53M/Avata-Chu-t-Tr-Nh-n.gif"
                      alt="Trí Nhân"
                      className="h-full w-full rounded-full object-cover"
                    />
                  )}
                </div>

                {/* Message Bubble Container */}
                <div className="flex flex-col gap-1">
                  <div
                    className={cn(
                      "group relative rounded-[10px] border p-3.5 text-xs leading-relaxed shadow-sm backdrop-blur-xl sm:text-sm",
                      isUser
                        ? "rounded-tr-xs border-indigo-400/40 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white"
                        : "rounded-tl-xs border-[var(--border)] bg-white/60 dark:bg-slate-800/60 text-[var(--text-primary)]",
                    )}
                  >
                    {!isUser ? (
                      msg.id === messages[messages.length - 1]?.id &&
                      !typedMessageIds[msg.id] &&
                      !msg.id.startsWith("welcome-") ? (
                        <TypewriterMarkdown
                          content={msg.content}
                          onComplete={() => {
                            setTypedMessageIds((prev) => ({
                              ...prev,
                              [msg.id]: true,
                            }));
                          }}
                        />
                      ) : (
                        <div className="markdown-body prose dark:prose-invert max-w-none text-xs sm:text-sm">
                          <Markdown>{msg.content}</Markdown>
                        </div>
                      )
                    ) : (
                      <p className="font-medium whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    )}

                    {/* Action buttons on AI message */}
                    {!isUser && (
                      <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-[var(--border)] pt-2 text-[10px] text-[var(--muted)]">
                        {msg.modelUsed && (
                          <span className="mr-auto inline-flex items-center gap-1 rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-700 shadow-sm dark:text-purple-300">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                            {msg.modelUsed.includes("pro")
                              ? "Gemini 3.1 Pro"
                              : msg.modelUsed.includes("lite")
                                ? "Gemini 3.1 Flash-Lite"
                                : "Gemini 3.5 Flash"}
                          </span>
                        )}
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="cursor-pointer p-1 transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                          title="Sao chép"
                        >
                          {copiedId === msg.id ? (
                            <Check size={13} className="text-emerald-500" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                        <button
                          onClick={() => handleSpeak(msg.id, msg.content)}
                          className={cn(
                            "cursor-pointer p-1 transition-colors",
                            speakingId === msg.id
                              ? "animate-pulse font-bold text-purple-600"
                              : "hover:text-purple-600 dark:hover:text-purple-400",
                          )}
                          title="Đọc văn bản"
                        >
                          {speakingId === msg.id ? (
                            <VolumeX size={13} />
                          ) : (
                            <Volume2 size={13} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span
                    className={cn(
                      "px-1 text-[9px] font-bold text-[var(--muted)]",
                      isUser ? "text-right" : "text-left",
                    )}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="animate-fade-in flex max-w-[88%] items-start gap-2.5 self-start sm:max-w-[80%]">
              {/* Avatar Badge with Animated Glow Aura */}
              <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-80 blur-xs" />
                <div className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-purple-400/50 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white shadow-md">
                  <img
                    src="https://i.ibb.co/S4Ddv53M/Avata-Chu-t-Tr-Nh-n.gif"
                    alt="Trí Nhân"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Message Bubble Container with Animated Typing Dots */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 rounded-[10px] rounded-tl-xs border border-purple-500/30 bg-white/60 dark:bg-slate-800/60 px-4 py-3 shadow-md backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
                    </span>
                    <span className="animate-pulse bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-xs font-bold text-transparent">
                      {language === "en"
                        ? "Trí Nhân AI is thinking & writing..."
                        : "Trợ lý AI Trí Nhân đang suy nghĩ & soạn câu trả lời..."}
                    </span>
                  </div>

                  {/* Animated Typing Wave / Bouncing Dots */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.32s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-pink-500 [animation-delay:-0.16s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
                    <div className="ml-1 h-1.5 w-16 animate-pulse rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar & Controls Panel */}
      <div className="flex w-full shrink-0 flex-col gap-3 rounded-[15px] border-2 border-solid border-[var(--border)] bg-white/85 p-[15px] shadow-sm backdrop-blur-2xl dark:bg-slate-900/85 transition-all">
        {/* Chat Frame Header */}
        <div className="flex w-full shrink-0 flex-wrap items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold tracking-wide text-[var(--muted)]">
              {language === "en"
                ? "Trí Nhân Chat Consultation Active"
                : "Hệ thống trợ lý ảo trực tuyến hoạt động"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Auto-Speak Toggle */}
            <button
              type="button"
              onClick={() => {
                setAutoSpeak(!autoSpeak);
                playUiSound("click");
              }}
              className={cn(
                "flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-bold shadow-xs transition-all active:scale-95",
                autoSpeak
                  ? "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300"
                  : "border-[var(--border)] bg-[var(--bg)] text-[var(--muted)]",
              )}
              title={
                language === "en"
                  ? "Auto-speak AI responses"
                  : "Tự động phát giọng đọc"
              }
            >
              {autoSpeak ? (
                <Volume2
                  size={13}
                  className="animate-pulse text-purple-600 dark:text-purple-400"
                />
              ) : (
                <VolumeX size={13} />
              )}
              <span className="xs:inline hidden text-[10px]">
                {language === "en" ? "Speech: On" : "Giọng đọc: Bật"}
              </span>
            </button>

            {/* Voice Select */}
            {availableVoices.length > 0 && autoSpeak && (
              <div className="relative shrink-0">
                <select
                  value={language === "en" ? selectedVoiceEn : selectedVoiceVi}
                  onChange={(e) => {
                    const selectedVoiceUri = e.target.value;
                    if (language === "en") {
                      setSelectedVoiceEn(selectedVoiceUri);
                      localStorage.setItem("app_ai_voice_en", selectedVoiceUri);
                    } else {
                      setSelectedVoiceVi(selectedVoiceUri);
                      localStorage.setItem("app_ai_voice_vi", selectedVoiceUri);
                    }
                    playUiSound("click");
                  }}
                  className="w-full max-w-[200px] min-w-[140px] cursor-pointer appearance-none truncate rounded-full border-2 border-solid border-[var(--border)] bg-[var(--bg)] py-1.5 pr-6 pl-2.5 text-[10px] font-bold text-[var(--text-secondary)] focus:ring-2 focus:ring-purple-500 focus:outline-none sm:max-w-[240px]"
                  title={
                    language === "en" ? "Select AI Voice" : "Chọn giọng đọc"
                  }
                >
                  {(language === "en" ? getEnglishVoices(availableVoices) : getVietnameseVoices(availableVoices))
                    .map((voice) => (
                      <option key={voice.voiceURI} value={voice.voiceURI}>
                        {formatVoiceLabel(voice, language === "vi")}
                      </option>
                    ))}
                </select>
                <ChevronDown
                  size={10}
                  className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-slate-400"
                />
              </div>
            )}

            {/* Trợ lý CX Dropdown */}
            <div className="relative shrink-0">
              <select
                value={chatMode}
                onChange={(e) => {
                  setChatMode(e.target.value as any);
                  playUiSound("click");
                }}
                className="cursor-pointer appearance-none rounded-full border border-slate-200/80 bg-slate-100 py-1.5 pr-7 pl-3 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="general">
                  {language === "en" ? "General CX" : "Trợ lý CX"}
                </option>
                <option value="complex">
                  {language === "en" ? "Deep Strategy" : "Tư vấn Nâng cao"}
                </option>
                <option value="fast">
                  {language === "en" ? "Fast Facts" : "Phản hồi Nhanh"}
                </option>
              </select>
              <ChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500"
              />
            </div>

            {/* Danh sách câu hỏi Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowQuestionCategoriesDropdown(!showQuestionCategoriesDropdown);
                  setShowSavedPresets(false);
                  playUiSound("click");
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-xs transition-all active:scale-95",
                  showQuestionCategoriesDropdown
                    ? "border-indigo-500 bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30"
                    : "border-indigo-200 bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 dark:border-indigo-900/35 dark:text-indigo-300"
                )}
                title={language === "en" ? "Question List" : "Danh sách câu hỏi"}
              >
                <HelpCircle size={12} className="text-indigo-600 dark:text-indigo-400" />
                <span>{language === "en" ? "Question List" : "Danh sách câu hỏi"}</span>
                <ChevronDown size={11} className={cn("transition-transform", showQuestionCategoriesDropdown && "rotate-180")} />
              </button>

              {/* Danh sách câu hỏi Dropdown */}
              {showQuestionCategoriesDropdown && (
                <div className="absolute right-0 bottom-full mb-2 w-80 sm:w-96 rounded-2xl border-2 border-solid border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl backdrop-blur-2xl z-50">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-2">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <HelpCircle size={13} className="text-indigo-500" />
                      {language === "en" ? "Question Categories" : "Danh mục câu hỏi tư vấn"}
                    </span>
                    <button
                      onClick={() => setShowQuestionCategoriesDropdown(false)}
                      className="rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  {/* Search bar */}
                  <div className="relative mb-2">
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={chatCategorySearch}
                      onChange={(e) => setChatCategorySearch(e.target.value)}
                      placeholder={language === "vi" ? "Tìm nhanh câu hỏi..." : "Filter questions..."}
                      className="w-full rounded-xl border-2 border-solid border-[var(--border)] bg-[var(--bg)]/90 py-1 pl-7 pr-7 text-[11px] font-medium text-[var(--text-primary)] placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                    />
                    {chatCategorySearch && (
                      <button
                        onClick={() => setChatCategorySearch("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={11} />
                      </button>
                    )}
                  </div>

                  {/* Categories Accordion */}
                  <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto custom-scrollbar">
                    {aiCategories
                      .filter((cat) => {
                        if (!chatCategorySearch) return true;
                        const matchCat = cat.title.toLowerCase().includes(chatCategorySearch.toLowerCase());
                        const matchQ = cat.questions.some((q) => q.toLowerCase().includes(chatCategorySearch.toLowerCase()));
                        return matchCat || matchQ;
                      })
                      .map((cat) => {
                        const isOpen = selectedCategoryTab === cat.id || Boolean(chatCategorySearch);
                        const filteredQ = cat.questions.filter((q) =>
                          !chatCategorySearch || q.toLowerCase().includes(chatCategorySearch.toLowerCase())
                        );
                        if (chatCategorySearch && filteredQ.length === 0) return null;

                        return (
                          <div
                            key={cat.id}
                            className="rounded-xl border border-slate-200/60 bg-white/50 dark:bg-slate-800/50 overflow-hidden"
                          >
                            <div className="w-full flex items-center justify-between p-2 text-left text-xs font-bold text-slate-800 dark:text-slate-200">
                              <button
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setSelectedCategoryTab((prev) => (prev === cat.id ? null : cat.id));
                                }}
                                className="flex-1 flex items-center gap-1.5 truncate hover:text-indigo-600 text-left cursor-pointer"
                              >
                                <span className="flex h-4 w-4 items-center justify-center rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] shrink-0">
                                  {cat.id.replace("cat-", "")}
                                </span>
                                <span className="truncate text-[11px] font-bold text-slate-900 dark:text-slate-100">{cat.title}</span>
                                <ChevronDown size={11} className={cn("text-slate-400 transition-transform shrink-0", isOpen && "rotate-180")} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInput(cat.title);
                                  setShowQuestionCategoriesDropdown(false);
                                  playUiSound("click");
                                }}
                                className="ml-1.5 shrink-0 px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-500/25 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                title={language === "vi" ? "Nhập tiêu đề header này vào ô chat" : "Insert header into chat box"}
                              >
                                <Plus size={10} />
                                <span>{language === "vi" ? "Nhập header" : "Insert header"}</span>
                              </button>
                            </div>

                            {isOpen && (
                              <div className="border-t border-[var(--border)] p-1.5 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
                                {filteredQ.map((q, idx) => (
                                  <div key={idx} className="flex items-center justify-between gap-1 rounded-lg p-1.5 text-[11px] hover:bg-indigo-500/10 transition-colors group/q">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowQuestionCategoriesDropdown(false);
                                        handleSend(q);
                                      }}
                                      className="flex-1 text-left font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-start gap-1.5 cursor-pointer"
                                    >
                                      <Sparkles size={11} className="text-indigo-500 shrink-0 mt-0.5 opacity-60 group-hover/q:opacity-100" />
                                      <span className="leading-snug">{q}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setInput(q);
                                        setShowQuestionCategoriesDropdown(false);
                                        playUiSound("click");
                                      }}
                                      className="shrink-0 px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-[9px] font-bold hover:bg-indigo-500 hover:text-white cursor-pointer transition-colors"
                                      title={language === "vi" ? "Nhập câu hỏi này vào ô chat" : "Insert into chat box"}
                                    >
                                      {language === "vi" ? "Nhập ô chat" : "Insert"}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Nội dung lưu sẵn Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSavedPresets(!showSavedPresets);
                  setShowQuestionCategoriesDropdown(false);
                  playUiSound("click");
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-xs transition-all active:scale-95",
                  showSavedPresets
                    ? "border-amber-500 bg-amber-500/20 text-amber-700 dark:text-amber-300"
                    : "border-amber-200 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 dark:border-amber-900/35 dark:text-amber-300"
                )}
                title={language === "en" ? "Saved Presets" : "Nội dung lưu sẵn"}
              >
                <Bookmark size={12} />
                <span>{language === "en" ? "Saved Presets" : "Nội dung lưu sẵn"}</span>
              </button>

              {/* Saved Presets Dropdown */}
              {showSavedPresets && (
                <div className="absolute right-0 bottom-full mb-2 w-72 sm:w-80 rounded-2xl border-2 border-solid border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl backdrop-blur-2xl z-50">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-2">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Bookmark size={13} className="text-amber-500" />
                      {language === "en" ? "Saved Preset Content" : "Nội dung & Mẫu câu hỏi lưu sẵn"}
                    </span>
                    <button
                      onClick={() => setShowSavedPresets(false)}
                      className="rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto custom-scrollbar">
                    {savedPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInput(preset.prompt);
                          setShowSavedPresets(false);
                          playUiSound("click");
                        }}
                        className="flex flex-col items-start rounded-xl border border-slate-200/60 bg-white/50 dark:bg-slate-800/50 p-2.5 text-left text-xs transition-all hover:border-amber-500/50 hover:bg-amber-500/10 dark:border-slate-700 dark:hover:border-amber-500/40"
                      >
                        <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                          <Sparkles size={11} className="text-amber-500 shrink-0" />
                          {preset.title}
                        </span>
                        <span className="mt-1 text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                          {preset.prompt}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Trò chuyện mới Button */}
            <button
              onClick={handleClearChat}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-rose-200 bg-rose-500/10 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-rose-700 shadow-xs transition-all hover:bg-rose-500/20 active:scale-95 dark:border-rose-900/35 dark:text-rose-300"
              title={language === "en" ? "New Chat" : "Trò chuyện mới"}
            >
              <RefreshCw size={12} />
              <span>{language === "en" ? "New Chat" : "Trò chuyện mới"}</span>
            </button>
          </div>
        </div>

        {/* Quick Header Topics Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 border-t border-[var(--border)] pt-2">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
            <Plus size={11} className="text-indigo-500" />
            <span>{language === "vi" ? "Nhập header nhanh:" : "Quick header:"}</span>
          </span>
          {[
            "Tóm tắt hồ sơ & tiểu sử",
            "Kinh nghiệm CRM & Omnichannel MoMo",
            "Trụ cột Năng lực & CX Governance",
            "Dự án Nổi bật & Thành tựu",
            "Thông tin liên hệ & Hợp tác",
          ].map((headerText, hIdx) => (
            <button
              key={hIdx}
              type="button"
              onClick={() => {
                setInput(headerText);
                playUiSound("click");
              }}
              className="shrink-0 px-2.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1 shadow-2xs"
              title={language === "vi" ? "Bấm để nhập header này vào khung chat" : "Click to insert this header"}
            >
              <Plus size={10} className="text-indigo-500" />
              <span>{headerText}</span>
            </button>
          ))}
        </div>

        {/* Actual Input Row */}
        <div className="flex w-full items-center gap-2">
          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={
              language === "en"
                ? "Type your message..."
                : "Nhập câu hỏi tại đây..."
            }
            className="flex-grow bg-transparent px-3 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none sm:text-sm dark:text-white"
          />

          {/* Clear Input button if populated */}
          {input.trim() && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              title="Xóa nội dung ô nhập"
            >
              <X size={14} />
            </button>
          )}

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={cn(
              "flex shrink-0 cursor-pointer items-center justify-center rounded-xl p-2.5 shadow-md transition-all active:scale-95",
              input.trim() && !isLoading
                ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-purple-500/30 hover:scale-105"
                : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800",
            )}
            title="Gửi câu hỏi"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );

      if (isPopup) {
    if (isMinimized) {
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-6 bottom-6 z-50 flex items-center gap-3"
          >
            <motion.button
              type="button"
              onClick={() => setIsMinimized(false)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex cursor-pointer items-center gap-3 rounded-[999px] border border-white/50 bg-white/40 px-4 py-2.5 text-slate-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] backdrop-blur-3xl transition-all duration-300 hover:border-white/80 hover:bg-white/60 dark:border-white/10 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-900/70"
            >
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-indigo-300/80 shadow-xs">
                <img
                  src="https://i.ibb.co/S4Ddv53M/Avata-Chu-t-Tr-Nh-n.gif"
                  alt="Trí Nhân"
                  className="h-full w-full object-cover"
                />
                <span className="absolute right-0 bottom-0 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
              </div>
              <div className="flex flex-col pr-1 text-left">
                <span className="text-xs font-black tracking-wide text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-amber-300">
                  {language === "en" ? "Trí Nhân AI" : "Trợ Lý AI"}
                </span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
                  {language === "en" ? "Click to expand" : "Mở rộng Trợ lý AI"}
                </span>
              </div>
              <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      );
    }

    return (
      <AnimatePresence>
        <div
          className={cn(
            "fixed z-[100] transition-all duration-300",
            isMaximized 
              ? "inset-0 flex items-center justify-center bg-slate-900/35 backdrop-blur-md p-0" 
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col justify-end pointer-events-none"
          )}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "relative flex w-full flex-col backdrop-blur-3xl border border-white/80 dark:border-white/20 shadow-[0_20px_60px_-15px_rgba(31,38,135,0.3)] bg-gradient-to-b from-white/70 via-white/50 to-white/40 dark:from-slate-900/85 dark:via-slate-900/75 dark:to-slate-900/65 rounded-[28px] overflow-hidden transition-all duration-300 pointer-events-auto",
              isMaximized
                ? "h-[100dvh] w-[100vw] max-w-none rounded-none border-none bg-white dark:bg-[#1A1A24]"
                : "h-[85vh] max-h-[720px] w-[90vw] max-w-[420px]"
            )}
          >
            {/* Mirror Glass Reflection Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none z-0" />

            {/* PERSISTENT POPUP HEADER BAR */}
            <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-[#DDE3F0] dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3.5 py-2.5 backdrop-blur-xl">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-purple-300/80 shadow-xs">
                  <img
                    src="https://i.ibb.co/S4Ddv53M/Avata-Chu-t-Tr-Nh-n.gif"
                    alt="Trí Nhân"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute right-0 bottom-0 h-2 w-2 animate-pulse rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#1A1F4C] dark:text-white">
                    <span className="truncate">Trí Nhân</span>
                    <span className="rounded bg-gradient-to-r from-purple-600 to-indigo-600 px-1 py-0.2 text-[8px] font-black text-white shrink-0">
                      AI
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 truncate">
                    {activeWidgetTab === "voice"
                      ? (language === "vi" ? "ĐIỀU CHỈNH GIỌNG NÓI AI" : "AI Voice Control")
                      : activeWidgetTab === "questions"
                      ? (language === "vi" ? "Danh mục câu hỏi" : "Questions Directory")
                      : activeWidgetTab === "history"
                      ? (language === "vi" ? "Lịch sử hội thoại" : "Chat History")
                      : (language === "vi" ? "Trợ lý Trí Nhân AI" : "AI Assistant")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsMaximized(!isMaximized);
                    playUiSound("click");
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title={isMaximized ? (language === "vi" ? "Thu nhỏ cửa sổ" : "Restore window") : (language === "vi" ? "Phóng to toàn màn hình" : "Maximize window")}
                >
                  {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMinimized(true);
                    playUiSound("click");
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title={language === "vi" ? "Thu nhỏ bong bóng" : "Minimize bubble"}
                >
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onClose) onClose();
                    playUiSound("click");
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-900/40 dark:hover:text-rose-300 transition-colors cursor-pointer"
                  title={language === "vi" ? "Đóng" : "Close"}
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col bg-white/35 dark:bg-slate-900/45 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              {activeWidgetTab === "questions" ? (
                /* Question List View */
                <div className="no-scrollbar flex min-h-0 w-full flex-1 flex-col overflow-y-auto p-4 bg-[#F4F6F9] dark:bg-slate-900">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DDE3F0] dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1A1F4C] text-white">
                        <HelpCircle size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1F4C] dark:text-white">
                          {language === "vi" ? "Danh mục câu hỏi tư vấn AI" : "AI Consultation Questions"}
                        </h4>
                        <p className="text-[10px] text-[#4A5578] dark:text-slate-400">
                          {language === "vi" ? "Chọn câu hỏi để Trí Nhân giải đáp" : "Select a question for Trí Nhân"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveWidgetTab("chat")}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      {language === "vi" ? "Quay lại" : "Back"}
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative mb-2.5">
                    <Search size={14} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={questionSearchQuery}
                      onChange={(e) => setQuestionSearchQuery(e.target.value)}
                      placeholder={language === "vi" ? "Tìm kiếm câu hỏi..." : "Search questions..."}
                      className="w-full rounded-xl border border-[#DDE3F0] bg-white dark:bg-slate-800 dark:border-slate-700 py-1.5 pl-8 pr-8 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#1A1F4C]"
                    />
                    {questionSearchQuery && (
                      <button
                        onClick={() => setQuestionSearchQuery("")}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* Categories List */}
                  <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
                    {aiCategories
                      .filter((cat) => {
                        if (!questionSearchQuery) return true;
                        const matchCat = cat.title.toLowerCase().includes(questionSearchQuery.toLowerCase());
                        const matchQ = cat.questions.some((q) => q.toLowerCase().includes(questionSearchQuery.toLowerCase()));
                        return matchCat || matchQ;
                      })
                      .map((cat) => {
                        const isOpen = selectedQuestionCategory === cat.id || Boolean(questionSearchQuery);
                        const filteredQ = cat.questions.filter(
                          (q) => !questionSearchQuery || q.toLowerCase().includes(questionSearchQuery.toLowerCase())
                        );
                        if (questionSearchQuery && filteredQ.length === 0) return null;

                        return (
                          <div
                            key={cat.id}
                            className="rounded-xl border border-[#DDE3F0] dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-2xs"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                playUiSound("click");
                                setSelectedQuestionCategory((prev) => (prev === cat.id ? null : cat.id));
                              }}
                              className="w-full flex items-center justify-between px-3 py-2 text-left text-xs font-bold text-[#1A1F4C] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"
                            >
                              <span className="truncate pr-2">{cat.title}</span>
                              <ChevronDown
                                size={14}
                                className={cn("text-slate-400 transition-transform duration-200 shrink-0", isOpen && "rotate-180")}
                              />
                            </button>

                            {isOpen && (
                              <div className="border-t border-[#DDE3F0] dark:border-slate-700 p-2 space-y-1 bg-[#F8FAFC] dark:bg-slate-900/60">
                                {filteredQ.map((q, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      handleSend(q);
                                      setActiveWidgetTab("chat");
                                    }}
                                    className="w-full text-left rounded-lg p-2 text-[12px] font-medium text-slate-700 dark:text-slate-200 hover:bg-[#1A1F4C]/10 dark:hover:bg-indigo-500/20 hover:text-[#1A1F4C] dark:hover:text-indigo-300 transition-all flex items-start gap-1.5 group/q cursor-pointer"
                                  >
                                    <Sparkles
                                      size={12}
                                      className="shrink-0 mt-0.5 text-indigo-500 opacity-70 group-hover/q:opacity-100 group-hover/q:scale-110"
                                    />
                                    <span className="leading-snug">{q}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : activeWidgetTab === "voice" ? (
                /* Voice View - Advanced AI Voice Control System */
                <div className="no-scrollbar flex min-h-0 w-full flex-1 flex-col overflow-y-auto p-3.5 sm:p-4 bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl space-y-3">
                  {/* Top Header Card */}
                  <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-cyan-500/10 border border-purple-500/20 dark:border-purple-500/30 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
                      <Sparkles size={48} className="text-purple-500" />
                    </div>
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-lg mb-1.5">
                      <Cpu size={22} className="animate-pulse" />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border-2 border-white dark:border-slate-900"></span>
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-[#1A1F4C] dark:text-white flex items-center gap-1.5">
                      <span>{language === "vi" ? "ĐIỀU CHỈNH GIỌNG NÓI AI" : "AI VOICE CONTROL"}</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-purple-600 text-[9px] font-black text-white">PRO</span>
                    </h4>
                    <p className="text-[10px] text-[#4A5578] dark:text-slate-300 mt-0.5 max-w-[280px]">
                      {language === "vi"
                        ? "Tùy chỉnh giọng đọc Robot Trí Nhân theo thời gian thực"
                        : "Real-time AI Assistant voice synthesis"}
                    </p>
                  </div>

                  {/* Active Character Spotlight Card */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/15 via-indigo-500/10 to-cyan-500/15 border-2 border-purple-500/40 dark:border-purple-400/40 backdrop-blur-md shadow-md relative overflow-hidden">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-2xl shadow-md border border-white/30">
                          {currentPreset.icon}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-extrabold text-[#1A1F4C] dark:text-white">
                              {language === "vi" ? currentPreset.nameVi : currentPreset.nameEn}
                            </span>
                            {isCustomized ? (
                              <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-[9px] font-bold text-slate-950 flex items-center gap-1">
                                Custom
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-[9px] font-bold text-white flex items-center gap-0.5">
                                <Check size={10} /> {language === "vi" ? "Đang sử dụng" : "Active"}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-bold text-purple-700 dark:text-purple-300 mt-0.5">
                            {currentPreset.tags || "Cute • Young • Smart • Friendly"}
                          </div>
                          <div className="text-[9px] text-slate-600 dark:text-slate-400 mt-0.5">
                            {language === "vi" ? currentPreset.descriptionVi : currentPreset.descriptionEn}
                          </div>
                        </div>
                      </div>

                      {/* Restore Button if customized */}
                      {isCustomized && (
                        <button
                          onClick={handleRestorePreset}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 dark:text-purple-200 text-[9px] font-bold border border-purple-500/30 cursor-pointer transition-all shrink-0 active:scale-95"
                          title={language === "vi" ? "Khôi phục preset mặc định" : "Restore default preset"}
                        >
                          <RotateCcw size={11} />
                          <span>{language === "vi" ? "Khôi phục" : "Restore"}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Premium Waveform Visualizer & Animation styles */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-100/40 via-purple-500/5 to-cyan-500/5 dark:from-slate-900/50 dark:via-purple-950/20 dark:to-cyan-950/20 border border-purple-500/20 dark:border-purple-500/30 backdrop-blur-md flex flex-col items-center justify-center space-y-3 relative overflow-hidden group">
                    <style dangerouslySetInnerHTML={{__html: `
                      @keyframes soundWave {
                        0%, 100% { transform: scaleY(0.25); }
                        50% { transform: scaleY(1.3); }
                      }
                      @keyframes breathWave {
                        0%, 100% { transform: scaleY(0.5); opacity: 0.4; }
                        50% { transform: scaleY(0.8); opacity: 0.8; }
                      }
                      .animate-soundWave {
                        animation: soundWave 1s ease-in-out infinite;
                        transform-origin: bottom;
                      }
                      .animate-breathWave {
                        animation: breathWave 3s ease-in-out infinite;
                        transform-origin: bottom;
                      }
                    `}} />
                    
                    <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent pointer-events-none opacity-40" />
                    
                    {/* Visualizer bars wrapper */}
                    <div className="flex items-end justify-center gap-1.5 h-10 relative z-10">
                      {[...Array(14)].map((_, i) => {
                        const hClass = [
                          "h-3", "h-5", "h-8", "h-10", "h-6", "h-4", "h-9", "h-7", "h-10", "h-5", "h-8", "h-6", "h-3", "h-2"
                        ][i % 14];
                        const animDelay = `${i * 0.08}s`;
                        return (
                          <div
                            key={i}
                            style={{ animationDelay: animDelay }}
                            className={cn(
                              "w-1 rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300",
                              testAudioStatus === "playing"
                                ? "animate-soundWave"
                                : "animate-breathWave",
                              hClass
                            )}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Status subtitle */}
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider relative z-10 flex items-center gap-1.5">
                      {testAudioStatus === "playing" ? (
                        <>
                          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {language === "vi" ? "Trí Nhân đang phát giọng..." : "Trí Nhân is speaking..."}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-500/50" />
                          <span className="text-slate-500 dark:text-slate-400">
                            {language === "vi" ? "Trợ lý ảo đang sẳn sàng" : "AI Assistant ready"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Robot Voice FX & Auto Speak Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Auto Speak Toggle */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md shadow-2xs hover:shadow-md transition-shadow">
                      <div className="text-left">
                        <div className="text-[11px] font-bold text-[#1A1F4C] dark:text-white">
                          {language === "vi" ? "Tự động đọc" : "Auto Read"}
                        </div>
                        <div className="text-[9px] text-slate-500 dark:text-slate-400">
                          {language === "vi" ? "Tự động phát lời" : "Auto play sound"}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setAutoSpeak(!autoSpeak);
                          playUiSound("click");
                        }}
                        className={cn(
                          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          autoSpeak ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
                            autoSpeak ? "translate-x-4" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Robot FX Toggle */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10 dark:bg-purple-900/20 border border-purple-500/20 backdrop-blur-md shadow-2xs hover:shadow-md transition-shadow">
                      <div className="text-left">
                        <div className="text-[11px] font-bold text-[#1A1F4C] dark:text-white flex items-center gap-1">
                          <span>Giọng Robot</span>
                        </div>
                        <div className="text-[9px] text-purple-700 dark:text-purple-300">
                          {language === "vi" ? "Bật hiệu ứng AI" : "AI Robot Effect"}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setRobotVoiceEnabled(!robotVoiceEnabled);
                          playUiSound("click");
                        }}
                        className={cn(
                          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          robotVoiceEnabled ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-700"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
                            robotVoiceEnabled ? "translate-x-4" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Quick Preset Selector Grid */}
                  <div className="space-y-1.5 p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md shadow-sm">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1A1F4C] dark:text-white pb-1">
                      <span className="flex items-center gap-1.5">
                        <Zap size={14} className="text-amber-500" />
                        <span>{language === "vi" ? "Mẫu cấu hình Robot nhanh:" : "Quick Robot Presets:"}</span>
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">
                        5 {language === "vi" ? "mẫu" : "presets"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {Object.values(VOICE_PRESETS).map((preset) => {
                        const isActive = robotPresetId === preset.id;
                        return (
                          <button
                            key={preset.id}
                            onClick={() => applyPreset(preset.id)}
                            className={cn(
                              "w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-300 cursor-pointer border group/p shadow-2xs relative overflow-hidden hover:scale-[1.01] active:scale-[0.99]",
                              isActive
                                ? "bg-gradient-to-r from-purple-600/15 via-indigo-600/15 to-purple-600/10 border-purple-500 dark:border-purple-400 shadow-xs"
                                : "bg-white/50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:border-purple-300/60 dark:hover:border-purple-700/60"
                            )}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-lg shrink-0 transition-transform group-hover/p:scale-110">{preset.icon}</span>
                              <div className="min-w-0 text-left">
                                <div className="text-[11px] font-bold text-[#1A1F4C] dark:text-white flex items-center gap-1.5">
                                  <span className="truncate">{language === "vi" ? preset.nameVi : preset.nameEn}</span>
                                  {preset.isFeatured && (
                                    <span className="px-1 py-0.2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-[8px] font-black text-white shrink-0">
                                      HOT
                                    </span>
                                  )}
                                </div>
                                <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                                  {language === "vi" ? preset.descriptionVi : preset.descriptionEn}
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 pl-2">
                              {isActive ? (
                                <span className="px-1.5 py-0.5 rounded-full bg-purple-600 text-[9px] font-bold text-white flex items-center gap-0.5 shadow-2xs">
                                  <Check size={9} />
                                </span>
                              ) : (
                                <span className="text-[9px] font-mono text-slate-400 group-hover/p:text-purple-600 dark:group-hover/p:text-purple-400 font-bold">
                                  {preset.params.pitch} / {preset.params.rate}x
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Voice Parameters Sliders */}
                  {robotVoiceEnabled && (
                    <div className="space-y-3.5 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md shadow-sm">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-bold text-[#1A1F4C] dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                        <span className="flex items-center gap-1.5">
                          <SlidersHorizontal size={14} className="text-purple-600 dark:text-purple-400 shrink-0" />
                          <span>{language === "vi" ? "Bảng điều chỉnh giọng nói" : "Voice Control Panel"}</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full shrink-0">
                          Pitch: {robotPitch.toFixed(2)} | Rate: {robotRate.toFixed(2)}x
                        </span>
                      </div>

                      {/* Pitch Slider */}
                      <div className="space-y-1.5 text-left p-2.5 rounded-xl bg-slate-500/5 dark:bg-slate-900/40 border border-slate-100/50 dark:border-slate-800/40">
                        <div className="flex justify-between items-center text-[11px] font-bold text-[#1A1F4C] dark:text-slate-200">
                          <span className="flex items-center gap-1.5">
                            <span className="text-purple-600 dark:text-purple-400">♫</span>
                            <span>{language === "vi" ? "Cao độ Robot (Pitch)" : "Robot Pitch"}</span>
                          </span>
                          <span className="font-mono text-purple-600 dark:text-purple-400 font-extrabold bg-purple-500/10 px-2 py-0.5 rounded text-[10px]">{robotPitch.toFixed(2)}</span>
                        </div>
                        <div className="relative flex items-center h-5">
                          <input
                            type="range"
                            min="0.10"
                            max="2.00"
                            step="0.01"
                            value={robotPitch}
                            onChange={(e) => setRobotPitch(parseFloat(e.target.value))}
                            className="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg hover:accent-purple-500 transition-all"
                          />
                        </div>
                        <div className="flex justify-between items-center text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                          <span>0.10 (Trầm)</span>
                          <span className="text-purple-600 dark:text-purple-300 font-black bg-purple-500/10 px-2 py-0.5 rounded-full text-[8px] tracking-wider uppercase">
                            {getPitchStatusText(robotPitch)}
                          </span>
                          <span>2.00 (Cao)</span>
                        </div>
                      </div>

                      {/* Rate Slider */}
                      <div className="space-y-1.5 text-left p-2.5 rounded-xl bg-slate-500/5 dark:bg-slate-900/40 border border-slate-100/50 dark:border-slate-800/40">
                        <div className="flex justify-between items-center text-[11px] font-bold text-[#1A1F4C] dark:text-slate-200">
                          <span className="flex items-center gap-1.5">
                            <span className="text-indigo-600 dark:text-indigo-400">⚡</span>
                            <span>{language === "vi" ? "Tốc độ đọc (Speed Rate)" : "Speech Rate"}</span>
                          </span>
                          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold bg-indigo-500/10 px-2 py-0.5 rounded text-[10px]">{robotRate.toFixed(2)}x</span>
                        </div>
                        <div className="relative flex items-center h-5">
                          <input
                            type="range"
                            min="0.50"
                            max="2.00"
                            step="0.05"
                            value={robotRate}
                            onChange={(e) => setRobotRate(parseFloat(e.target.value))}
                            className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg hover:accent-indigo-500 transition-all"
                          />
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                          <span>0.50x ({language === "vi" ? "Chậm" : "Slow"})</span>
                          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/10 px-2 py-0.5 rounded-full text-[8px] tracking-wider uppercase">
                            {robotRate < 1.0 ? (language === "vi" ? "Chậm rãi" : "Slow pace") : robotRate > 1.3 ? (language === "vi" ? "Cực nhanh" : "Sprint") : (language === "vi" ? "Tiêu chuẩn" : "Standard")}
                          </span>
                          <span>2.00x ({language === "vi" ? "Nhanh" : "Fast"})</span>
                        </div>
                      </div>

                      {/* Advanced Parameters Accordion Toggle */}
                      <button
                        onClick={() => setShowAdvancedParams(!showAdvancedParams)}
                        className="w-full flex items-center justify-between pt-1 text-[11px] font-bold text-purple-700 dark:text-purple-300 hover:underline cursor-pointer border-t border-slate-200/60 dark:border-slate-700/60"
                      >
                        <span className="flex items-center gap-1">
                          <Settings2 size={13} />
                          <span>{language === "vi" ? "Thông số bổ sung giọng AI" : "Advanced Voice Parameters"}</span>
                        </span>
                        <ChevronDown
                          size={14}
                          className={cn("transition-transform duration-200", showAdvancedParams && "rotate-180")}
                        />
                      </button>

                      {/* Extended Parameters Grid */}
                      {showAdvancedParams && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 animate-fadeIn">
                          {/* Robot Level */}
                          <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 text-left">
                            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              <span>🤖 Robot Level</span>
                              <span className="font-mono text-purple-600">{robotLevel}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={robotLevel}
                              onChange={(e) => setRobotLevel(parseInt(e.target.value))}
                              className="w-full accent-purple-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"
                            />
                          </div>

                          {/* Child Tone */}
                          <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 text-left">
                            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              <span>🧒 Child Tone</span>
                              <span className="font-mono text-indigo-600">{robotChildTone}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={robotChildTone}
                              onChange={(e) => setRobotChildTone(parseInt(e.target.value))}
                              className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"
                            />
                          </div>

                          {/* Emotion */}
                          <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 text-left">
                            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              <span>😊 Emotion</span>
                              <span className="font-mono text-pink-600">{robotEmotion}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={robotEmotion}
                              onChange={(e) => setRobotEmotion(parseInt(e.target.value))}
                              className="w-full accent-pink-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"
                            />
                          </div>

                          {/* Energy */}
                          <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 text-left">
                            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              <span>⚡ Energy</span>
                              <span className="font-mono text-amber-600">{robotEnergy}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={robotEnergy}
                              onChange={(e) => setRobotEnergy(parseInt(e.target.value))}
                              className="w-full accent-amber-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"
                            />
                          </div>

                          {/* Expressiveness */}
                          <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 text-left">
                            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              <span>🎭 Expressive</span>
                              <span className="font-mono text-cyan-600">{robotExpressiveness}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={robotExpressiveness}
                              onChange={(e) => setRobotExpressiveness(parseInt(e.target.value))}
                              className="w-full accent-cyan-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"
                            />
                          </div>

                          {/* Stability */}
                          <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 text-left">
                            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              <span>🧠 Stability</span>
                              <span className="font-mono text-emerald-600">{robotStability}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={robotStability}
                              onChange={(e) => setRobotStability(parseInt(e.target.value))}
                              className="w-full accent-emerald-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"
                            />
                          </div>

                          {/* Clarity */}
                          <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 text-left">
                            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              <span>🔊 Clarity</span>
                              <span className="font-mono text-blue-600">{robotClarity}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={robotClarity}
                              onChange={(e) => setRobotClarity(parseInt(e.target.value))}
                              className="w-full accent-blue-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"
                            />
                          </div>

                          {/* Warmth */}
                          <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 text-left">
                            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              <span>💛 Warmth</span>
                              <span className="font-mono text-rose-600">{robotWarmth}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={robotWarmth}
                              onChange={(e) => setRobotWarmth(parseInt(e.target.value))}
                              className="w-full accent-rose-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Voice Mood Selector */}
                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md text-left space-y-1.5">
                    <div className="text-xs font-bold text-[#1A1F4C] dark:text-white flex items-center gap-1.5">
                      <Smile size={14} className="text-indigo-500" />
                      <span>{language === "vi" ? "🎭 Chế độ Sắc thái (Voice Mood):" : "🎭 Voice Mood:"}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {VOICE_MOODS.map((m) => {
                        const isSelected = activeVoiceMood === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => applyMood(m)}
                            className={cn(
                              "px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 shadow-2xs",
                              isSelected
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-indigo-500/10"
                            )}
                          >
                            <span>{m.icon}</span>
                            <span>{language === "vi" ? m.nameVi : m.nameEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Voice Test Button */}
                  <div className="space-y-1.5">
                    <button
                      onClick={() => {
                        playUiSound("click");
                        testRobotVoice();
                      }}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white shadow-md transition-all cursor-pointer active:scale-98 relative overflow-hidden",
                        testAudioStatus === "playing"
                          ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 animate-pulse"
                          : testAudioStatus === "done"
                          ? "bg-emerald-600"
                          : "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500"
                      )}
                    >
                      {testAudioStatus === "playing" ? (
                        <>
                          <div className="flex items-center gap-1">
                            <span className="text-sm animate-bounce">🐭</span>
                            <span className="text-xs">→ 👂 →</span>
                            <Volume2 size={16} className="animate-spin" />
                          </div>
                          <span>{language === "vi" ? "🔊 Đang phát thử..." : "🔊 Playing Preview..."}</span>
                        </>
                      ) : testAudioStatus === "done" ? (
                        <>
                          <Check size={16} />
                          <span>{language === "vi" ? "✓ Đã phát xong" : "✓ Preview Finished"}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={16} />
                          <span>{language === "vi" ? "🔊 Thử âm thanh giọng Robot ngay" : "Test Robot Voice Now"}</span>
                        </>
                      )}
                    </button>

                    {/* Preview Prompt Box */}
                    <div className="p-2.5 rounded-xl bg-purple-500/5 dark:bg-purple-900/10 border border-purple-500/15 text-[10px] text-slate-600 dark:text-slate-300 text-left italic">
                      “Xin chào anh Hùng Thái! Em là Trí Nhân, chú chuột AI nhỏ bé của anh đây! 🐭 Em luôn sẵn sàng hỗ trợ anh. Mình cùng bắt đầu nhé!”
                    </div>
                  </div>

                  {/* Save Custom Voice Section */}
                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1A1F4C] dark:text-white">
                      <span className="flex items-center gap-1.5">
                        <Save size={14} className="text-purple-600" />
                        <span>{language === "vi" ? "Lưu & Quản lý Cấu hình" : "Save & Custom Voices"}</span>
                      </span>
                      <button
                        onClick={() => setShowCustomSaveModal(!showCustomSaveModal)}
                        className="text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                      >
                        {showCustomSaveModal ? "Đóng" : "💾 Lưu giọng hiện tại"}
                      </button>
                    </div>

                    {showCustomSaveModal && (
                      <div className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          value={customVoiceNameInput}
                          onChange={(e) => setCustomVoiceNameInput(e.target.value)}
                          placeholder={language === "vi" ? "Tên cấu hình (VD: Chuột Vui Vẻ)..." : "Custom profile title..."}
                          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                        />
                        <button
                          onClick={handleSaveCustomVoice}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 cursor-pointer shadow-xs shrink-0"
                        >
                          Lưu
                        </button>
                      </div>
                    )}

                    {savedCustomVoices.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-left">
                          {language === "vi" ? "Các giọng custom đã lưu:" : "Saved custom voices:"}
                        </div>
                        {savedCustomVoices.map((custom) => (
                          <div
                            key={custom.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                          >
                            <span className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2">
                              {custom.name}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleLoadCustomVoice(custom.params)}
                                className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold hover:bg-indigo-500/20 cursor-pointer"
                              >
                                Dùng
                              </button>
                              <button
                                onClick={() => handleDeleteCustomVoice(custom.id)}
                                className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* System Voice Profiles Dropdown */}
                  <div className="w-full text-left space-y-2 p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md mb-2">
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {language === "vi" ? "Mẫu giọng đọc hệ thống:" : "System Voice Profile:"}
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">Tiếng Việt:</label>
                      <select
                        value={selectedVoiceVi}
                        onChange={(e) => {
                          setSelectedVoiceVi(e.target.value);
                          localStorage.setItem("app_ai_voice_vi", e.target.value);
                        }}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-[11px] text-slate-800 dark:text-slate-200 focus:outline-none"
                      >
                        {getVietnameseVoices(availableVoices).map((v) => (
                            <option key={v.voiceURI} value={v.voiceURI}>
                              {formatVoiceLabel(v, true)}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveWidgetTab("chat")}
                    className="mt-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    ← {language === "vi" ? "Quay lại hội thoại" : "Back to Chat"}
                  </button>
                </div>
              ) : activeWidgetTab === "history" ? (
                /* History View */
                <div className="flex flex-1 flex-col items-center justify-center p-6 text-center bg-[#F4F6F9] dark:bg-slate-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-md mb-3">
                    <History size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-[#1A1F4C] dark:text-white mb-1">
                    {language === "vi" ? "Quản lý lịch sử hội thoại" : "Chat History"}
                  </h4>
                  <p className="text-[11px] text-[#4A5578] dark:text-slate-400 mb-5">
                    {messages.length} {language === "vi" ? "tin nhắn trong phiên làm việc" : "messages in current session"}
                  </p>

                  <button
                    onClick={() => {
                      handleClearChat();
                      setActiveWidgetTab("chat");
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 font-bold text-xs transition-all border border-red-500/20 cursor-pointer"
                  >
                    <Trash2 size={15} />
                    <span>{language === "vi" ? "Xóa lịch sử & Tạo hội thoại mới" : "Clear History & New Chat"}</span>
                  </button>

                  <button
                    onClick={() => setActiveWidgetTab("chat")}
                    className="mt-5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    ← {language === "vi" ? "Quay lại hội thoại" : "Back to Chat"}
                  </button>
                </div>
              ) : (
                /* Chat Messages & Input View */
                <>
                  {/* Chat Messages */}
                  <div className="no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5 pb-2">
                    {messages.map((msg) => {
                      const isUser = msg.role === "user";
                      return (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex w-full items-start gap-2.5",
                            isUser ? "max-w-[88%] sm:max-w-[85%] flex-row-reverse self-end" : "flex-col self-start w-[92%]",
                          )}
                        >
                          {/* Message Bubble */}
                          <div className={cn("flex flex-col gap-1 w-full", !isUser && "max-w-[95%]")}>
                            <div
                              className={cn(
                                "group relative text-[14px] sm:text-[15px] leading-relaxed",
                                isUser
                                  ? "rounded-[16px] rounded-br-sm bg-[#E2E6F0] text-[#1A1F4C] dark:bg-slate-700 dark:text-white p-3.5 shadow-sm"
                                  : "rounded-[16px] rounded-tl-sm bg-white dark:bg-slate-800 text-[#1A1F4C] dark:text-white p-3.5 shadow-sm border border-slate-200 dark:border-slate-700"
                              )}
                            >
                              {!isUser ? (
                                msg.id === messages[messages.length - 1]?.id &&
                                !typedMessageIds[msg.id] &&
                                !msg.id.startsWith("welcome-") ? (
                                  <TypewriterMarkdown
                                    content={msg.content}
                                    onComplete={() => {
                                      setTypedMessageIds((prev) => ({
                                        ...prev,
                                        [msg.id]: true,
                                      }));
                                    }}
                                  />
                                ) : (
                                  <div className="markdown-body prose dark:prose-invert max-w-none text-[14px] sm:text-[15px] bg-transparent">
                                    <Markdown>{msg.content}</Markdown>
                                  </div>
                                )
                              ) : (
                                <p className="font-medium whitespace-pre-wrap">
                                  {msg.content}
                                </p>
                              )}
                              
                              {!isUser && msg.id.startsWith("welcome-") && (
                                <div className="mt-3 flex items-center gap-2 border-t border-slate-100 dark:border-slate-700 pt-3">
                                  <button onClick={() => setAutoSpeak(!autoSpeak)} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors shadow-sm cursor-pointer active:scale-95", autoSpeak ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600")}>
                                    {autoSpeak ? <Volume2 size={13} /> : <VolumeX size={13} />}
                                    <span>{autoSpeak ? (language === "vi" ? "Đang phát âm thanh" : "Sound On") : (language === "vi" ? "Đã tắt âm thanh" : "Sound Off")}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {isLoading && (
                      <div className="self-start">
                         <span className="flex gap-1 items-center h-8 px-4 rounded-[16px] rounded-tl-sm bg-[#E2E6F0] dark:bg-slate-800 shadow-sm text-slate-500">
                            <span className="h-1.5 w-1.5 bg-current rounded-full animate-bounce"></span>
                            <span className="h-1.5 w-1.5 bg-current rounded-full animate-bounce delay-100"></span>
                            <span className="h-1.5 w-1.5 bg-current rounded-full animate-bounce delay-200"></span>
                         </span>
                      </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                  </div>
                  
                  {/* Input Area */}
                  <div className="shrink-0 bg-[#F4F6F9] dark:bg-slate-900 px-4 pt-2 pb-4">
                    <div className="flex w-full items-center gap-2 rounded-[20px] bg-[#E9EDF5] dark:bg-slate-800 px-2 py-1.5">
                        <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#4A5578] hover:text-[#1A1F4C] dark:text-slate-400 dark:hover:text-slate-200">
                          <Paperclip size={18} />
                        </button>
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                          placeholder={language === "en" ? "Type here" : "Nhập câu hỏi tại đây"}
                          className="flex-grow bg-transparent px-2 text-[15px] text-slate-900 placeholder-[#8A95B5] focus:outline-none dark:text-white"
                        />
                        <button
                          onClick={() => handleSend()}
                          disabled={!input.trim() && isLoading}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#1A1F4C] text-white shadow-md transition-all active:scale-95 disabled:opacity-80"
                        >
                          {input.trim() ? (
                             <Send size={15} className="-ml-0.5" />
                          ) : (
                             <div className="flex gap-[3px] items-center justify-center h-4">
                               <div className="w-[3px] h-2 bg-white rounded-full"></div>
                               <div className="w-[3px] h-3.5 bg-white rounded-full"></div>
                               <div className="w-[3px] h-2 bg-white rounded-full"></div>
                             </div>
                          )}
                        </button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="w-full px-4"><div className="w-full h-[1px] bg-[#DDE3F0] dark:bg-slate-700"></div></div>

              {/* Bottom Nav Tabs */}
              <div className="shrink-0 flex items-center justify-around bg-[#F4F6F9] dark:bg-slate-900 px-2 pt-3 pb-3.5 rounded-b-[24px]">
                <button
                  onClick={() => setActiveWidgetTab("chat")}
                  className={cn(
                    "flex flex-col items-center gap-1 min-w-[60px] relative transition-colors cursor-pointer",
                    activeWidgetTab === "chat"
                      ? "text-[#1A1F4C] dark:text-indigo-400 font-bold"
                      : "text-[#8A95B5] dark:text-slate-500 hover:text-[#4A5578] dark:hover:text-slate-300"
                  )}
                >
                  {activeWidgetTab === "chat" && (
                    <div className="absolute -top-3 left-0 right-0 h-[2px] bg-[#1A1F4C] dark:bg-indigo-400 rounded-full" />
                  )}
                  <MessageSquare size={20} className="fill-current" />
                  <span className="text-[12px] font-bold">Chat</span>
                </button>

                <button
                  onClick={() => setActiveWidgetTab("questions")}
                  className={cn(
                    "flex flex-col items-center gap-1 min-w-[60px] relative transition-colors cursor-pointer",
                    activeWidgetTab === "questions"
                      ? "text-[#1A1F4C] dark:text-indigo-400 font-bold"
                      : "text-[#8A95B5] dark:text-slate-500 hover:text-[#4A5578] dark:hover:text-slate-300"
                  )}
                >
                  {activeWidgetTab === "questions" && (
                    <div className="absolute -top-3 left-0 right-0 h-[2px] bg-[#1A1F4C] dark:bg-indigo-400 rounded-full" />
                  )}
                  <HelpCircle size={20} className="stroke-[2.2]" />
                  <span className="text-[12px] font-bold">
                    {language === "vi" ? "Câu hỏi" : "Questions"}
                  </span>
                </button>

                <button
                  onClick={() => setActiveWidgetTab("voice")}
                  className={cn(
                    "flex flex-col items-center gap-1 min-w-[60px] relative transition-colors cursor-pointer",
                    activeWidgetTab === "voice"
                      ? "text-[#1A1F4C] dark:text-indigo-400 font-bold"
                      : "text-[#8A95B5] dark:text-slate-500 hover:text-[#4A5578] dark:hover:text-slate-300"
                  )}
                >
                  {activeWidgetTab === "voice" && (
                    <div className="absolute -top-3 left-0 right-0 h-[2px] bg-[#1A1F4C] dark:bg-indigo-400 rounded-full" />
                  )}
                  <Mic size={20} className="stroke-[2]" />
                  <span className="text-[12px] font-bold">Voice</span>
                </button>

                <button
                  onClick={() => setActiveWidgetTab("history")}
                  className={cn(
                    "flex flex-col items-center gap-1 min-w-[60px] relative transition-colors cursor-pointer",
                    activeWidgetTab === "history"
                      ? "text-[#1A1F4C] dark:text-indigo-400 font-bold"
                      : "text-[#8A95B5] dark:text-slate-500 hover:text-[#4A5578] dark:hover:text-slate-300"
                  )}
                >
                  {activeWidgetTab === "history" && (
                    <div className="absolute -top-3 left-0 right-0 h-[2px] bg-[#1A1F4C] dark:bg-indigo-400 rounded-full" />
                  )}
                  <History size={20} className="stroke-[2]" />
                  <span className="text-[12px] font-bold">History</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <PageLayout
      hideHeader={true}
      id="aichat-main-card"
      rootClassName="w-full max-w-full !p-0 !border-none !rounded-none relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="aiChat"
      pageName="AIChat Main Card"
      title={
        language === "vi"
          ? "Hệ thống Trí Tuệ Nhân Tạo Conversational CX & Quản trị"
          : "Conversational CX & Executive Intelligence Engine"
      }
      subtitle={
        language === "vi"
          ? "Trải nghiệm tương tác với hệ thống trí tuệ nhân tạo."
          : "Interactive experience with the conversational artificial intelligence system."
      }
      icon={Bot}
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-[10px]">
        {content}
      </div>
    </PageLayout>
  );
}
