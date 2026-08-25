import React, { useState, useEffect, useMemo } from "react";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  ShieldCheck,
  Wallet,
  Layers,
  Gamepad,
  Briefcase,
  CheckCircle2,
  Building2,
  Sparkles,
  X,
  Search,
  ExternalLink,
} from "lucide-react";
import { contentData } from "../data";
import { PageLayout } from "../components/PageLayout";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  TowerControl: Smartphone,
  Smartphone: Smartphone,
  ShoppingCart: ShoppingCart,
  ShieldCheck: ShieldCheck,
  Wallet: Wallet,
  Layers: Layers,
  Gamepad: Gamepad,
  Globe: Globe,
};

const COLOR_PALETTE = [
  "#f25a2b",
  "#0088cc",
  "#16a34a",
  "#f59e0b",
  "#4f46e5",
  "#8b5cf6",
];

// Detailed Industry Master Information for Modal & Enhanced Visual Cards
const INDUSTRY_DETAILS_MAP: Record<
  string,
  {
    tagline: string;
    experienceYears: string;
    headcountScope: string;
    keyProjects: string[];
    achievements: string[];
    techStack: string[];
    coreRole: string;
  }
> = {
  "Viễn thông di động": {
    tagline:
      "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
    experienceYears: "10+ Năm",
    headcountScope: "50 - 130+ Nhân sự",
    keyProjects: [
      "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng",
      "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng",
      "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
    ],
    achievements: [
      "Quản lý & duy trì chỉ số SLA tổng đài luôn đạt trên 98%",
      "Chuẩn hóa 100% kịch bản tư vấn và xử lý khiếu nại cước dịch vụ",
      "Xây dựng đội ngũ tư vấn viên chuyên nghiệp có tỷ lệ nghỉ việc < 3%",
    ],
    techStack: ["Avaya CallCenter", "AICC System", "SOP Matrix", "CRM Telecom"],
    coreRole: "Trưởng phòng CSKH / Quản lý Vận hành Tổng đài",
  },
  "Thương mại điện tử": {
    tagline:
      "Xử lý hàng triệu giao dịch & Chăm sóc khách hàng đa kênh tốc độ cao",
    experienceYears: "6+ Năm",
    headcountScope: "100+ Nhân sự CSKH & Fraud",
    keyProjects: [
      "2.3 · Tự động hóa quy trình chăm sóc khách hàng",
      "3.1 · Xây dựng hệ thống quản lý thông tin khách hàng",
      "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng",
    ],
    achievements: [
      "Tối ưu tỷ lệ phản hồi Chatbot & Live Chat giảm thời gian chờ xuống < 30 giây",
      "Xây dựng bộ quy trình kiểm soát gian lận đơn hàng & thanh toán trực tuyến",
      "Nâng chỉ số hài lòng khách hàng CSAT từ 88% lên 96.5%",
    ],
    techStack: [
      "Zendesk Omnichannel",
      "Shopee Admin CRM",
      "Live Chat Auto-router",
      "Power BI",
    ],
    coreRole: "Customer Service Operations Manager",
  },
  "Bảo hiểm nhân thọ": {
    tagline:
      "Xây dựng sự tin cậy tuyệt đối & Chuẩn hóa quy trình chăm sóc khách hàng cao cấp",
    experienceYears: "3+ Năm",
    headcountScope: "40+ Chuyên viên tư vấn",
    keyProjects: [
      "1.3 · Nâng cao chất lượng trải nghiệm khách hàng",
      "2.5 · Quản lý đối tác thuê ngoài chăm sóc khách hàng",
      "3.3 · Khảo sát và đánh giá mức độ hài lòng",
    ],
    achievements: [
      "Kiến tạo trải nghiệm khách hàng tiêu chuẩn 5 sao ngành tài chính - bảo hiểm",
      "Giảm 45% thời gian xử lý yêu cầu thay đổi thông tin hợp đồng",
      "Đạt tỷ lệ giải quyết khiếu nại thành công ngay từ lần gọi đầu tiên (FCR) > 92%",
    ],
    techStack: [
      "Prudential Life CRM",
      "AS400 System",
      "Voice Recording Quality Checklist",
    ],
    coreRole: "Call Center Project & Quality Manager",
  },
  "Thể thao điện tử": {
    tagline:
      "Hỗ trợ cộng đồng hàng triệu Gamers & Đồng hành cùng các giải đấu eSports đỉnh cao",
    experienceYears: "5+ Năm",
    headcountScope: "80+ Game Supporter",
    keyProjects: [
      "1.4 · Quản lý và triển khai dự án chăm sóc khách hàng",
      "3.4 · Xây dựng trợ lý ảo chăm sóc khách hàng",
      "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng",
    ],
    achievements: [
      "Vận hành hệ thống Ticket hỗ trợ game thủ với lưu lượng xử lý 50,000+ yêu cầu/ngày",
      "Bảo mật tài khoản & hỗ trợ khôi phục vật phẩm game tức thì",
      "Phối hợp tổ chức trực tiếp các điểm hỗ trợ CSKH tại giải đấu eSports lớn",
    ],
    techStack: [
      "Garena Customer Desk",
      "Gcafe Management Tool",
      "AI Ticket Classifier",
    ],
    coreRole: "Head of Game Customer Support",
  },
  "Ví điện tử": {
    tagline:
      "An toàn giao dịch tài chính số & Chăm sóc người dùng FinTech 24/7",
    experienceYears: "5+ Năm",
    headcountScope: "120+ Nhân sự FinTech CS",
    keyProjects: [
      "1.6 · Quản lý khủng hoảng và giảm khách hàng rời bỏ",
      "2.4 · Quản lý hoạt động chăm sóc khách hàng chủ động",
      "3.2 · Phân tích và báo cáo dữ liệu khách hàng",
    ],
    achievements: [
      "Hỗ trợ xác minh định danh eKYC & xử lý sự cố giao dịch tức thì",
      "Xây dựng kịch bản ứng phó sự cố gián đoạn kết nối ngân hàng đối tác",
      "Tự động hóa 40% truy vấn lịch sử giao dịch bằng AI Voicebot & Chatbot",
    ],
    techStack: [
      "MoMo Care Core",
      "AirPay Risk Portal",
      "Fraud Monitoring Tool",
      "Power BI",
    ],
    coreRole: "FinTech CS Operation Lead",
  },
  "Xây dựng hệ thống": {
    tagline:
      "Tư vấn chuyển đổi số, thiết lập CRM & Quy trình CSKH toàn diện cho Doanh nghiệp",
    experienceYears: "8+ Năm",
    headcountScope: "Tư vấn Doanh nghiệp",
    keyProjects: [
      "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động",
      "4.1 · Phát triển chương trình đào tạo trực tuyến",
      "4.2 · Xây dựng khung năng lực và lộ trình phát triển",
    ],
    achievements: [
      "Thiết kế trọn gói mô hình Contact Center từ 10 đến 100+ vị trí ngồi",
      "Đóng gói tài liệu SOP, kịch bản giao tiếp & KPI scorecard chuẩn hóa",
      "Đào tạo & chuyển giao công nghệ cho đội ngũ quản lý kế thừa",
    ],
    techStack: [
      "Zoho CRM",
      "Salesforce",
      "Notion SOP Matrix",
      "Process Flowcharting",
    ],
    coreRole: "CX & Service System Consultant",
  },
};

const INDUSTRY_CATEGORIES = [
  { id: "all", title: "Tất cả lĩnh vực" },
  { id: "telecom", title: "Viễn thông" },
  { id: "fintech", title: "FinTech & eCommerce" },
  { id: "insurance", title: "Bảo hiểm & Khác" },
];

interface BrandLogo {
  name: string;
  url: string;
  color?: string;
}

interface IndustryItem {
  id: string;
  title: string;
  titleEn?: string;
  icon: string;
  category?: string;
  desc: string;
  descEn?: string;
  highlights?: string[];
  logos?: BrandLogo[];
}

export function Industries() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const items = contentData.industries as unknown as IndustryItem[];
  const [colorStep, setColorStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedItemTitle, setExpandedItemTitle] = useState<string | null>(
    null,
  );

  // Auto color rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setColorStep((prev) => (prev + 1) % COLOR_PALETTE.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const cardConfigs = [
    {
      color: "#f25a2b",
      icon: Smartphone,
      title: "Viễn thông di động",
      category: "telecom",
      desc: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, tạo nền tảng vững chắc về vận hành và Chăm Sóc Khách Hàng quy mô lớn.",
      logos: [
        {
          name: "Mobifone",
          url: "https://i.ibb.co/qYBWg57r/Mobifone.png",
          color: "#2563eb",
        },
        {
          name: "Call-V247",
          url: "https://i.ibb.co/2Y3tNsnd/Call-V247.png",
          color: "#f97316",
        },
        {
          name: "LBC",
          url: "https://i.ibb.co/DDYsQ20B/LBC.png",
          color: "#9333ea",
        },
      ],
    },
    {
      color: "#0088cc",
      icon: ShoppingCart,
      category: "fintech",
      title: "Thương mại điện tử",
      desc: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vận hành, xử lý khiếu nại, gian lận và chăm sóc khách hàng đa kênh.",
      logos: [
        {
          name: "Shopee",
          url: "https://i.ibb.co/F4T7Zr0k/Shoppe.png",
          color: "#ee4d2d",
        },
        {
          name: "Finviet",
          url: "https://i.ibb.co/Pvq9crKN/Finviet.png",
          color: "#eab308",
        },
      ],
    },
    {
      color: "#16a34a",
      icon: ShieldCheck,
      category: "insurance",
      title: "Bảo hiểm nhân thọ",
      desc: "Quản lý tổng đài và triển khai các dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành, nâng cao chất lượng tư vấn và trải nghiệm khách hàng.",
      logos: [
        {
          name: "Prudential",
          url: "https://i.ibb.co/LThmXHs/Prudentinal.png",
          color: "#dc2626",
        },
      ],
    },
    {
      color: "#f59e0b",
      icon: Gamepad,
      category: "fintech",
      title: "Thể thao điện tử",
      desc: "Xây dựng và quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống hỗ trợ quy mô lớn và đồng hành cùng các sự kiện eSports.",
      logos: [
        {
          name: "Garena",
          url: "https://i.ibb.co/rKSr7zN9/Garena.png",
          color: "#df2027",
        },
        {
          name: "VED",
          url: "https://i.ibb.co/r8XjWP0/VED.png",
          color: "#6b7280",
        },
        {
          name: "Gcafe",
          url: "https://i.ibb.co/ktcFs29/Gcafe.png",
          color: "#ff6600",
        },
      ],
    },
    {
      color: "#ec4899",
      icon: Wallet,
      category: "fintech",
      title: "Ví điện tử",
      desc: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng, xử lý giao dịch đến kiểm soát rủi ro và hỗ trợ đối tác tài chính.",
      logos: [
        {
          name: "MoMo",
          url: "https://i.ibb.co/jXJXLvT/Momo.png",
          color: "#ec4899",
        },
        {
          name: "Airpay",
          url: "https://i.ibb.co/F4YGDfft/Airpay.png",
          color: "#00b4ff",
        },
        {
          name: "Shopee Pay",
          url: "https://i.ibb.co/RTPz5Cc3/Shopee-Pay.png",
          color: "#ee4d2d",
        },
      ],
    },
    {
      color: "#16a34a",
      icon: Layers,
      category: "insurance",
      title: "Xây dựng hệ thống",
      desc: "Tư vấn xây dựng và tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến CRM và tự động hóa, nâng cao hiệu quả vận hành doanh nghiệp.",
      logos: [
        {
          name: "Hành trình kiến tạo",
          url: "https://i.ibb.co/Lzz7Nh83/H-nh-tr-nh-ki-n-t-o.png",
          color: "#16a34a",
        },
        {
          name: "VED Group",
          url: "https://i.ibb.co/7NxjMvdF/Logo-VED.gif",
          color: "#ef4444",
        },
      ],
    },
  ];

  // Merge items with fallback config
  const combinedItems = useMemo(() => {
    return items.map((item, idx) => {
      const cfg = cardConfigs[idx % cardConfigs.length];
      const title = item.title || cfg.title;
      const desc = item.desc || cfg.desc;
      const logos =
        item.logos && item.logos.length > 0 ? item.logos : cfg.logos;
      const details =
        INDUSTRY_DETAILS_MAP[title] ||
        INDUSTRY_DETAILS_MAP["Viễn thông di động"];

      return {
        ...item,
        title,
        desc,
        logos,
        cfg,
        details,
        category: cfg.category,
      };
    });
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return combinedItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [combinedItems, selectedCategory, searchQuery]);

  return (
    <PageLayout
      id="industries-main-card"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
      pageId="industries"
      pageName="Industries Main Card"
      title={isVi ? "Lĩnh Vực Hoạt Động" : "Industry Expertise"}
      subtitle={
        isVi
          ? "Thực chiến quản trị trên 6+ ngành công nghiệp trọng điểm."
          : "Executive management across 6+ business verticals."
      }
      icon={Globe}
    >
      <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-[10px] p-0 text-center">
        {/* MAIN CARDS GRID - CENTERED LAYOUT WITH EMBEDDED ABSOLUTE OVERLAY */}
        <LayoutGroup>
          <div className="relative mx-auto w-full max-w-[1080px] flex-1">
            {/* The Grid of all 6 cards */}
            <div className="mx-auto grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto place-content-center items-stretch justify-items-center justify-center gap-[10px] !p-[10px]">
              {filteredItems.map((item, index) => {
                const colorIndex =
                  (index - colorStep + COLOR_PALETTE.length * 100) %
                  COLOR_PALETTE.length;
                const currentColor = COLOR_PALETTE[colorIndex];
                const MappedIcon = iconMap[item.icon];
                const Icon = MappedIcon || item.cfg.icon || Globe;
                const isSomeCardExpanded = expandedItemTitle !== null;
                const isThisExpanded = expandedItemTitle === item.title;

                return (
                  <motion.div
                    key={`card-${item.title}`}
                    layout
                    layoutId={`industry-card-${item.title}`}
                    onClick={() => {
                      if (!isSomeCardExpanded) {
                        playUiSound("click");
                        setExpandedItemTitle(item.title);
                      }
                    }}
                    className={cn(
                      "group relative col-span-1 flex h-full min-h-[280px] w-full max-w-[340px] cursor-pointer flex-col mx-auto justify-self-center transition-all duration-500",
                      isSomeCardExpanded && !isThisExpanded ? "opacity-20 blur-[2px] scale-95 pointer-events-none" : "",
                      isThisExpanded ? "opacity-0 pointer-events-none" : ""
                    )}
                  >
                    {/* Main Glass Card */}
                    <div
                      className="industries-card group/card relative z-10 flex h-full w-full flex-col items-center justify-between rounded-[12px] border-2 p-5 text-center shadow-md backdrop-blur-xl transition-all overflow-hidden"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${currentColor} 5%, rgba(255, 255, 255, 0.05))`,
                        borderColor: currentColor,
                        transition: "all 1000ms ease-in-out",
                      }}
                    >
                      {/* Expanding Hover Circle */}
                      <div 
                        className="absolute z-0 w-8 h-8 rounded-full transition-all duration-700 ease-in-out scale-0 group-hover/card:scale-[35] opacity-0 group-hover/card:opacity-100"
                        style={{ 
                          backgroundColor: currentColor,
                          top: '40px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          transformOrigin: 'center'
                        }}
                      />

                      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-between text-center">
                        {/* Header: Icon, Title & Experience Badge */}
                        <div className="mb-3 flex w-full shrink-0 items-center justify-center">
                          <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-[var(--bg)]/20 p-2 transition-all duration-500 group-hover/card:bg-white group-hover/card:border-white"
                              style={{
                                borderColor: `${currentColor}35`,
                                color: currentColor,
                                transition: "all 1000ms ease-in-out",
                              }}
                            >
                              <Icon className="h-6 w-6 transition-colors duration-500 group-hover/card:text-[currentColor]" style={{ color: 'inherit' }} strokeWidth={2} />
                            </div>
                            <div className="text-center">
                              <h3
                                className="text-center text-lg font-black tracking-tight transition-colors duration-500 group-hover/card:text-white"
                                style={{
                                  color: currentColor,
                                  transition: "color 1000ms ease-in-out",
                                }}
                              >
                                {item.title}
                              </h3>
                              <span className="flex items-center justify-center gap-1 text-center text-[10px] font-bold text-[var(--muted)] transition-colors duration-500 group-hover/card:text-white/80">
                                <span>
                                  {item.details.experienceYears} kinh nghiệm
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Body Description */}
                        <p className="my-auto line-clamp-3 text-center text-xs leading-relaxed font-medium text-[var(--text)] sm:text-sm transition-colors duration-500 group-hover/card:text-white">
                          {item.desc}
                        </p>
                      </div>

                      {/* Brand Logos Footer */}
                      {item.logos && item.logos.length > 0 && (
                        <div className="relative z-10 mt-auto flex w-full shrink-0 items-center justify-center border-t border-[var(--border)]/50 pt-3 pb-1 transition-colors duration-500 group-hover/card:border-white/20">
                          <div className="flex items-center justify-center -space-x-3 flex-nowrap">
                            {item.logos.map((logoObj: BrandLogo, lIdx: number) => (
                              <div
                                key={lIdx}
                                className="group/logo relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-white shadow-md transition-all duration-300 hover:z-20 hover:scale-110 hover:shadow-xl"
                                style={{
                                  borderColor: logoObj.color || currentColor,
                                  boxShadow: `0 4px 12px ${logoObj.color || currentColor}30`,
                                }}
                                title={logoObj.name}
                              >
                                <img
                                  src={logoObj.url}
                                  alt={logoObj.name}
                                  className="h-full w-full rounded-full object-cover object-center"
                                  onError={(
                                    e: React.SyntheticEvent<HTMLImageElement>,
                                  ) => {
                                    const target = e.currentTarget;
                                    target.onerror = null;
                                    target.src = `https://placehold.co/100x100/ffffff/${currentColor.replace("#", "")}?text=${encodeURIComponent(logoObj.name)}`;
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                     </div>
                       )}
                     </div>
                   </motion.div>
                );
              })}
            </div>

            {/* Absolute overlay mimicking standard container dimension and containing the detailed information beautifully */}
            <AnimatePresence>
              {expandedItemTitle && (() => {
                const expandedItem = filteredItems.find((i) => i.title === expandedItemTitle);
                if (!expandedItem) return null;
                const index = filteredItems.findIndex((i) => i.title === expandedItemTitle);
                const colorIndex =
                  (index - colorStep + COLOR_PALETTE.length * 100) %
                  COLOR_PALETTE.length;
                const currentColor = COLOR_PALETTE[colorIndex];
                const MappedIcon = iconMap[expandedItem.icon];
                const Icon = MappedIcon || expandedItem.cfg.icon || Globe;

                return (
                  <motion.div
                    key={`card-expanded-${expandedItem.title}`}
                    layout
                    layoutId={`industry-card-${expandedItem.title}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 1, 0.2, 1],
                    }}
                    className="absolute inset-3 sm:inset-5 z-30 flex flex-col gap-4 rounded-[16px] border-2 text-left shadow-2xl backdrop-blur-2xl p-5 sm:p-6 overflow-hidden"
                    style={{
                      borderColor: currentColor,
                      backgroundColor: `color-mix(in srgb, ${currentColor} 8%, rgba(255, 255, 255, 0.92))`,
                    }}
                  >
                    {/* Background fallback for better readability in both dark and light modes */}
                    <div className="absolute inset-0 -z-10 bg-white/80 dark:bg-slate-900/90 backdrop-blur-3xl" />

                    {/* Header Bar */}
                    <div className="relative border-b border-[var(--border)] pr-12 pb-4 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playUiSound("click");
                          setExpandedItemTitle(null);
                        }}
                        className="absolute top-0 right-0 z-30 cursor-pointer rounded-full border-2 border-solid border-[var(--border)] bg-[var(--bg)]/85 p-2.5 text-[var(--muted)] shadow-md transition-all hover:bg-rose-500 hover:text-white hover:scale-105 active:scale-95"
                        title={
                          isVi ? "Đóng / Thu gọn thẻ" : "Close / Collapse Card"
                        }
                      >
                        <X size={20} />
                      </button>

                      <div className="flex flex-col gap-2 text-left">
                        {/* Title & Icon */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border p-2.5 sm:h-12 sm:w-12"
                            style={{
                              borderColor: `${currentColor}35`,
                              color: currentColor,
                              backgroundColor: `${currentColor}10`,
                            }}
                          >
                            <Icon
                              className="h-6 w-6 sm:h-7 sm:w-7"
                              strokeWidth={2.5}
                            />
                          </div>
                          <h3
                            className="text-2xl leading-none font-black tracking-tight sm:text-3xl"
                            style={{ color: currentColor }}
                          >
                            {expandedItem.title}
                          </h3>
                        </div>

                        {/* Badges */}
                        <div>
                          <span
                            className="inline-block rounded-full border px-3 py-1 text-[10px] font-black tracking-widest uppercase sm:text-xs"
                            style={{
                              borderColor: `${currentColor}35`,
                              color: currentColor,
                              backgroundColor: `${currentColor}15`,
                            }}
                          >
                            {expandedItem.details.coreRole}
                          </span>
                        </div>

                        {/* Tagline */}
                        <p className="mt-1 text-xs font-semibold text-[var(--muted)] sm:text-sm">
                          {expandedItem.details.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Scrollable Content Container */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        {/* Col 1: Scope & Details & Associated Brands */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2.5 rounded-[10px] border-2 border-solid border-[var(--border)] bg-[var(--bg)]/50 p-3 shadow-inner">
                            <div>
                              <span className="block text-[10px] font-bold text-[var(--muted)]">
                                {isVi ? "Thâm niên:" : "Experience:"}
                              </span>
                              <span className="text-xs font-black text-[var(--text)] sm:text-sm">
                                {expandedItem.details.experienceYears}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold text-[var(--muted)]">
                                {isVi ? "Quy mô:" : "Headcount:"}
                              </span>
                              <span className="text-xs font-black text-[var(--text)] sm:text-sm">
                                {expandedItem.details.headcountScope}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs leading-relaxed font-semibold text-[var(--text)] sm:text-sm">
                            {expandedItem.desc}
                          </p>

                          {/* Brand Logos */}
                          {expandedItem.logos && expandedItem.logos.length > 0 && (
                            <div className="space-y-2 border-t border-[var(--border)] pt-4">
                              <span className="block text-[10px] font-black tracking-wider text-[var(--muted)] uppercase">
                                {isVi
                                  ? "Thương hiệu trực thuộc:"
                                  : "Associated Brands:"}
                              </span>
                              <div className="flex w-full items-center justify-start -space-x-3 flex-nowrap py-1">
                                {expandedItem.logos.map(
                                  (logoObj: BrandLogo, lIdx: number) => (
                                     <div
                                       key={lIdx}
                                       className="group/logo relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-white shadow-md transition-all duration-300 hover:z-20 hover:scale-115 hover:shadow-xl"
                                       style={{
                                         borderColor: logoObj.color || currentColor,
                                         boxShadow: `0 4px 12px ${logoObj.color || currentColor}30`,
                                       }}
                                       title={logoObj.name}
                                     >
                                      <img
                                        src={logoObj.url}
                                        alt={logoObj.name}
                                        className="h-full w-full rounded-full object-cover"
                                        onError={(
                                          e: React.SyntheticEvent<HTMLImageElement>,
                                        ) => {
                                          const target = e.currentTarget;
                                          target.onerror = null;
                                          target.src = `https://placehold.co/100x100/ffffff/${currentColor.replace("#", "")}?text=${encodeURIComponent(logoObj.name)}`;
                                        }}
                                      />
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Col 2: Key Achievements */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-1.5 text-xs font-black tracking-wider text-[var(--muted)] uppercase">
                              <CheckCircle2
                                size={14}
                                className="text-emerald-500"
                              />
                              <span>
                                {isVi
                                  ? "Thành tựu nổi bật:"
                                  : "Key Achievements:"}
                              </span>
                            </h4>
                            <ul className="space-y-2">
                              {expandedItem.details.achievements.map(
                                (ach: string, aIdx: number) => (
                                  <li
                                    key={aIdx}
                                    className="flex items-start gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-3 text-xs font-semibold text-[var(--text)] hover:bg-emerald-500/10 transition-colors"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                    <span>{ach}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>

                        {/* Col 3: Key Projects & Tech Stack */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-1.5 text-xs font-black tracking-wider text-[var(--muted)] uppercase">
                              <Briefcase size={14} className="text-purple-500" />
                              <span>
                                {isVi
                                  ? "Dự án chính (Xem chi tiết):"
                                  : "Key Projects (Click to view):"}
                              </span>
                            </h4>
                            <div className="flex flex-col gap-2">
                              {expandedItem.details.keyProjects.map(
                                (proj: string, pIdx: number) => (
                                  <button
                                    key={pIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playUiSound("click");
                                      sessionStorage.setItem(
                                        "pending_project_title",
                                        proj,
                                      );
                                      window.dispatchEvent(
                                        new CustomEvent("app-navigate", {
                                          detail: "projects",
                                        }),
                                      );
                                      window.dispatchEvent(
                                        new CustomEvent("app-select-project", {
                                          detail: proj,
                                        }),
                                      );
                                    }}
                                    className="group/proj flex cursor-pointer items-center justify-between rounded-xl border-2 border-solid border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-left text-xs font-bold text-[var(--text)] shadow-xs transition-all hover:bg-purple-600 hover:text-white"
                                    title={
                                      isVi
                                        ? `Xem chi tiết dự án: ${proj}`
                                        : `View project details: ${proj}`
                                    }
                                  >
                                    <span className="truncate font-semibold">
                                      📌 {proj}
                                    </span>
                                    <ExternalLink
                                      size={13}
                                      className="ml-1 shrink-0 opacity-70 transition-opacity group-hover/proj:opacity-100"
                                    />
                                  </button>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="space-y-2 border-t border-[var(--border)] pt-4">
                            <h4 className="flex items-center gap-1.5 text-xs font-black tracking-wider text-[var(--muted)] uppercase">
                              <Sparkles size={14} className="text-sky-500" />
                              <span>
                                {isVi ? "Công nghệ & Công cụ:" : "Tech & Tools:"}
                              </span>
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {expandedItem.details.techStack.map(
                                (tech: string, tIdx: number) => (
                                  <span
                                    key={tIdx}
                                    className="rounded-lg border-2 border-solid border-[var(--border)] bg-[var(--bg)]/50 px-2.5 py-1 font-mono text-[11px] font-bold text-[var(--text)] shadow-xs"
                                  >
                                    {tech}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </PageLayout>
  );
}
