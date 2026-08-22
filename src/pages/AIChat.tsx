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
        modelUsed: "gemini-3.6-flash",
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
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [welcomeSpoken, setWelcomeSpoken] = useState(false);

  // Persist autoSpeak state to localStorage, default to true
  const [autoSpeak, setAutoSpeak] = useState(() => {
    const saved = localStorage.getItem("app_ai_chat_autospeak");
    return saved !== null ? saved === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("app_ai_chat_autospeak", String(autoSpeak));
  }, [autoSpeak]);

  const [showSavedPresets, setShowSavedPresets] = useState(false);
  const [showQuestionCategoriesDropdown, setShowQuestionCategoriesDropdown] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string | null>(null);
  const [chatCategorySearch, setChatCategorySearch] = useState("");
  const [activeWidgetTab, setActiveWidgetTab] = useState<"chat" | "questions" | "voice" | "history">("chat");
  const [questionSearchQuery, setQuestionSearchQuery] = useState("");
  const [selectedQuestionCategory, setSelectedQuestionCategory] = useState<string | null>(null);

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

    // Short-circuit if there is a predefined answer
    const predefined = findPredefinedAnswer(messageContent);
    if (predefined) {
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: predefined,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          modelUsed: "Trí Nhân AI (Predefined)",
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(false);
        playUiSound("click");
        if (autoSpeak) {
          handleSpeak(assistantMsg.id, assistantMsg.content);
        }
      }, 300);
      return;
    }

    // Using client-side knowledge base directly as per user request to remove API features.
    setTimeout(() => {
      const predefined = findPredefinedAnswer(messageContent);
      const fallbackContent =
        predefined ||
        (language === "en"
          ? `Mr. Nguyễn Hùng Thái has over 22 years of hands-on experience in Customer Experience & Operations across Mobifone, V247, Garena, Shopee, Prudential, MoMo, and Finviet.\n\n*   **Core Expertise:** Standardizing 100% operational processes, omnichannel CRM transformation, AI workflow integration, and crisis management.\n*   **Operating Philosophy:** The essence of exceptional service lies in the harmony between precise processes and genuine empathy.`
          : `Anh Nguyễn Hùng Thái có hơn 22 năm kinh nghiệm thực chiến trong lĩnh vực Chăm sóc Khách hàng & Quản trị Vận hành qua các tập đoàn Mobifone, V247, Garena, Shopee, Prudential, MoMo, Finviet.\n\n*   **Thế mạnh cốt lõi:** Chuẩn hóa 100% quy trình hệ thống, chuyển đổi số CRM đa kênh, ứng dụng AI hỗ trợ tự động và quản trị rủi ro truyền thông.\n*   **Triết lý vận hành:** Cốt lõi của dịch vụ xuất sắc nằm ở sự cân bằng giữa Quy trình chuẩn xác và Sự thấu cảm chân thành.`);

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: fallbackContent,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: "Trí Nhân AI (Knowledge Base)",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      playUiSound("click");
      setIsLoading(false);
      if (autoSpeak) {
        handleSpeak(assistantMsg.id, assistantMsg.content);
      }
    }, 600);
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
        modelUsed: "gemini-3.6-flash",
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
          utterance.rate = 1.0;
          utterance.pitch = 0.95;

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
      <div className="relative flex min-h-0 w-full flex-grow flex-col overflow-hidden rounded-[15px] border border-[var(--border)] bg-white/85 shadow-sm backdrop-blur-2xl dark:bg-slate-900/85 transition-all">
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
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border text-xs font-bold shadow-md",
                    isUser
                      ? "border-indigo-400/50 bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                      : "border-purple-400/50 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white",
                  )}
                >
                  {isUser ? (
                    <User size={16} />
                  ) : (
                    <img
                      src="https://i.ibb.co/x8Spz9Qm/Avata-AI-POW.gif"
                      alt="Trí Nhân"
                      className="h-full w-full rounded-[10px] object-cover"
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
                <div className="absolute -inset-1 animate-pulse rounded-[10px] bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-80 blur-xs" />
                <div className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-[10px] border border-purple-400/50 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white shadow-md">
                  <img
                    src="https://i.ibb.co/x8Spz9Qm/Avata-AI-POW.gif"
                    alt="Trí Nhân"
                    className="h-full w-full rounded-[10px] object-cover"
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
      <div className="flex w-full shrink-0 flex-col gap-3 rounded-[15px] border border-[var(--border)] bg-white/85 p-[15px] shadow-sm backdrop-blur-2xl dark:bg-slate-900/85 transition-all">
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
                  className="w-full max-w-[200px] min-w-[140px] cursor-pointer appearance-none truncate rounded-full border border-[var(--border)] bg-[var(--bg)] py-1.5 pr-6 pl-2.5 text-[10px] font-bold text-[var(--text-secondary)] focus:ring-2 focus:ring-purple-500 focus:outline-none sm:max-w-[240px]"
                  title={
                    language === "en" ? "Select AI Voice" : "Chọn giọng đọc"
                  }
                >
                  {availableVoices
                    .filter(
                      (v) =>
                        v.lang
                          .toLowerCase()
                          .includes(language === "en" ? "en" : "vi") ||
                        v.name.toLowerCase().includes("tiếng việt"),
                    )
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
                <div className="absolute right-0 bottom-full mb-2 w-80 sm:w-96 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl backdrop-blur-2xl z-50">
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
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)]/90 py-1 pl-7 pr-7 text-[11px] font-medium text-[var(--text-primary)] placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
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
                            <button
                              type="button"
                              onClick={() => {
                                playUiSound("click");
                                setSelectedCategoryTab((prev) => (prev === cat.id ? null : cat.id));
                              }}
                              className="w-full flex items-center justify-between p-2 text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10"
                            >
                              <span className="truncate text-[11px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                                <span className="flex h-4 w-4 items-center justify-center rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px]">
                                  {cat.id.replace("cat-", "")}
                                </span>
                                {cat.title}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="text-[9px] text-slate-400 font-bold">{cat.questions.length}</span>
                                <ChevronDown size={11} className={cn("text-slate-400 transition-transform", isOpen && "rotate-180")} />
                              </div>
                            </button>

                            {isOpen && (
                              <div className="border-t border-[var(--border)] p-1.5 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
                                {filteredQ.map((q, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      setShowQuestionCategoriesDropdown(false);
                                      handleSend(q);
                                    }}
                                    className="w-full text-left rounded-lg p-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-start gap-1.5 group/q"
                                  >
                                    <Sparkles size={11} className="text-indigo-500 shrink-0 mt-0.5 opacity-60 group-hover/q:opacity-100" />
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
                <div className="absolute right-0 bottom-full mb-2 w-72 sm:w-80 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl backdrop-blur-2xl z-50">
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
                  src="https://i.ibb.co/x8Spz9Qm/Avata-AI-POW.gif"
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
              "relative flex w-full flex-col shadow-[0_12px_48px_0_rgba(31,38,135,0.15)] transition-all duration-300 pointer-events-auto rounded-[24px]",
              isMaximized
                ? "h-[100dvh] w-[100vw] max-w-none rounded-none border-none bg-white dark:bg-[#1A1A24]"
                : "h-[85vh] max-h-[700px] w-[90vw] max-w-[400px] bg-[#E1E5F1] dark:bg-slate-800",
            )}
          >
            {/* POPUP HEADER BAR - Widget Style */}
            <div className="relative flex w-full shrink-0 items-start justify-between px-5 pt-6 pb-6">
              <div className="absolute left-4 bottom-[-14px] z-20 h-[105px] w-[95px]">
                <img
                  src="https://i.ibb.co/x8Spz9Qm/Avata-AI-POW.gif"
                  alt="Trí Nhân"
                  className="h-full w-full object-cover object-top drop-shadow-md rounded-b-[40px] pointer-events-none"
                />
              </div>

              <div className="flex w-full justify-between items-start relative z-10 pl-[95px]">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#1A1F4C] dark:text-white">
                      Trí Nhân
                    </h3>
                    <span className="rounded-md bg-[#1A1F4C] px-[5px] py-[3px] text-[10px] font-black text-white dark:bg-white dark:text-[#1A1F4C] leading-none">
                      AI
                    </span>
                  </div>
                  <p className="text-[13px] text-[#4A5578] dark:text-slate-300">
                    {language === "en" ? "Information Request Chatbot" : "Trợ lý thông tin AI"}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-white text-slate-800 shadow-sm transition-colors hover:bg-slate-50 active:scale-95 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col rounded-t-[24px] bg-[#F4F6F9] dark:bg-slate-900 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
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
                /* Voice View */
                <div className="flex flex-1 flex-col items-center justify-center p-6 text-center bg-[#F4F6F9] dark:bg-slate-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1F4C] text-white shadow-lg mb-3 animate-pulse">
                    <Volume2 size={26} />
                  </div>
                  <h4 className="text-sm font-bold text-[#1A1F4C] dark:text-white mb-1">
                    {language === "vi" ? "Chế độ đọc giọng nói AI" : "AI Voice Mode"}
                  </h4>
                  <p className="text-[11px] text-[#4A5578] dark:text-slate-400 mb-5 max-w-[240px]">
                    {language === "vi"
                      ? "Trí Nhân sẽ tự động thuyết minh câu trả lời bằng giọng nói tiếng Việt tự nhiên."
                      : "Trí Nhân auto-reads answers using natural speech synthesis."}
                  </p>

                  <button
                    onClick={() => {
                      setAutoSpeak(!autoSpeak);
                      playUiSound("click");
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer",
                      autoSpeak
                        ? "bg-[#1A1F4C] text-white dark:bg-indigo-600"
                        : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    )}
                  >
                    <Volume2 size={15} />
                    <span>
                      {autoSpeak
                        ? language === "vi" ? "Đã bật thuyết minh" : "Voice Enabled"
                        : language === "vi" ? "Đã tắt thuyết minh" : "Voice Disabled"}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveWidgetTab("chat")}
                    className="mt-5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
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
                            "flex max-w-[88%] items-start gap-2.5 sm:max-w-[85%]",
                            isUser ? "flex-row-reverse self-end" : "self-start",
                          )}
                        >
                          {/* Message Bubble */}
                          <div className="flex flex-col gap-1 w-full">
                            <div
                              className={cn(
                                "group relative text-[14px] sm:text-[15px] leading-relaxed",
                                isUser
                                  ? "rounded-[16px] rounded-br-sm bg-[#E2E6F0] text-[#1A1F4C] dark:bg-slate-700 dark:text-white p-3.5 shadow-sm"
                                  : "text-[#1A1F4C] dark:text-white p-0 bg-transparent"
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
                              
                              {/* Bot Quick Replies */}
                              {!isUser && msg.id.startsWith("welcome-") && (
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <button onClick={() => handleSend("Tôi muốn tìm hiểu thêm về tiểu sử của bạn.")} className="px-3 py-1.5 rounded-lg border border-[#DDE3F0] bg-transparent text-[#1A1F4C] text-[13px] font-bold hover:bg-[#E2E6F0] transition-colors dark:border-slate-700 dark:text-slate-300 cursor-pointer">
                                    {language === "en" ? "Learn more" : "Tìm hiểu thêm"}
                                  </button>
                                  <button onClick={() => handleSend("Các dự án nổi bật của bạn là gì?")} className="px-3 py-1.5 rounded-lg border border-[#DDE3F0] bg-transparent text-[#1A1F4C] text-[13px] font-bold hover:bg-[#E2E6F0] transition-colors dark:border-slate-700 dark:text-slate-300 cursor-pointer">
                                    {language === "en" ? "Explore options" : "Khám phá tùy chọn"}
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
              <div className="shrink-0 flex items-center justify-around bg-[#F4F6F9] dark:bg-slate-900 px-2 py-3">
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
                  <div className="flex gap-[3px] items-end justify-center h-[20px] mb-[2px]">
                    <div className="w-[3px] h-2 bg-current rounded-full"></div>
                    <div className="w-[3px] h-4 bg-current rounded-full"></div>
                    <div className="w-[3px] h-3 bg-current rounded-full"></div>
                    <div className="w-[3px] h-1.5 bg-current rounded-full"></div>
                  </div>
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
              
              {/* Footer watermark */}
              <div className="shrink-0 flex items-center justify-center pb-4 bg-[#F4F6F9] dark:bg-slate-900">
                <span className="text-[11px] font-semibold text-[#8A95B5] dark:text-slate-400 flex items-center gap-1">
                  Powered by <Sparkles size={12} className="text-[#1A1F4C] dark:text-indigo-400 ml-0.5" /><span className="text-[#1A1F4C] dark:text-slate-200 font-bold">Gemini AI</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <PageLayout
      id="aichat-main-card"
      rootClassName="w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border border-[var(--border)] relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
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
      headerActions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-black text-teal-700 dark:text-teal-300 shadow-xs backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span>{language === "vi" ? "Gemini AI Trợ Lý" : "Gemini AI Engine"}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-black text-indigo-700 dark:text-indigo-300 shadow-xs backdrop-blur-md">
            <Sparkles size={13} className="text-indigo-500" />
            <span>{language === "vi" ? "Đa Ngữ & Đa Phương Thức" : "Multimodal"}</span>
          </div>
        </div>
      }
    >
      {content}
      {/* ENTERPRISE AI CHAT BANNER */}
    </PageLayout>
  );
}
