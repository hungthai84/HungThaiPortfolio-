import React from "react";
import { motion } from "motion/react";
import {
  Radio,
  Users,
  Monitor,
  Gamepad2,
  ShoppingCart,
  ShieldCheck,
  Smartphone,
  LucideIcon,
} from "lucide-react";
import { useLanguageContent } from "../../hooks/useCoverLetter";
import { cn } from "../../lib/utils";

export interface TimelineMilestone {
  year: string;
  company: string;
  roleVi: string;
  roleEn: string;
  descVi: string;
  descEn: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  tag?: string;
  logos: { name: string; url: string }[];
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: "2003",
    company: "MobiFone",
    roleVi: "Chuyên viên Tổng đài CSKH",
    roleEn: "Customer Service Specialist",
    descVi:
      "Bắt đầu sự nghiệp từ năm 2003 tại MobiFone, nơi tôi được đào tạo nền tảng về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn viễn thông.",
    descEn:
      "Started career in 2003 at MobiFone, receiving rigorous training in customer service standards, call center operations, incident management, and telecom service workflows.",
    icon: Radio,
    iconBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    logos: [
      { name: "MobiFone", url: "https://i.ibb.co/qYBWg57r/Mobifone.png" },
    ],
  },
  {
    year: "2007",
    company: "Viễn Liên V247",
    roleVi: "Giám sát Vận hành CSKH",
    roleEn: "CS Operations Supervisor",
    descVi:
      "Tiếp đó, tại Viễn Liên V247, tôi phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng.",
    descEn:
      "At Vien Lien V247, advanced into leadership by overseeing team performance, QA monitoring, and optimizing contact center operational efficiency.",
    icon: Users,
    iconBg: "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    logos: [
      { name: "Viễn Liên V247", url: "https://i.ibb.co/2Y3tNsnd/Call-V247.png" },
    ],
  },
  {
    year: "2011",
    company: "LBC – HTV Cable",
    roleVi: "Trưởng phòng CSKH",
    roleEn: "Head of Customer Care",
    descVi:
      "Lần đầu tiên đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng. Đây là giai đoạn giúp tôi chuyển mình từ một nhà quản lý vận hành sang một nhà quản trị toàn diện: xây dựng quy trình, phát triển đội ngũ, thiết lập KPI và tối ưu trải nghiệm khách hàng.",
    descEn:
      "First role as Head of Customer Care. A key transformative era evolving from operational supervisor to comprehensive executive: standardizing SOPs, setting KPIs, and leading talent development.",
    icon: Monitor,
    iconBg: "bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800",
    iconColor: "text-sky-600 dark:text-sky-400",
    logos: [
      { name: "LBC – HTV Cable", url: "https://i.ibb.co/DDYsQ20B/LBC.png" },
    ],
  },
  {
    year: "2013",
    company: "Garena",
    roleVi: "Head of Customer Support",
    roleEn: "Head of Customer Support",
    descVi:
      "Quản lý hoạt động chăm sóc khách hàng trong lĩnh vực eSports & game, đòi hỏi tốc độ xử lý nhanh, chính xác và khả năng đáp ứng khối lượng khách hàng cực lớn.",
    descEn:
      "Spearheaded 24/7 gamer support operations in high-velocity eSports & digital entertainment, mastering rapid ticket resolution and high-volume surge management.",
    icon: Gamepad2,
    iconBg: "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
    iconColor: "text-purple-600 dark:text-purple-400",
    logos: [
      { name: "Garena", url: "https://i.ibb.co/BHxMzQFk/Garena.png" },
    ],
  },
  {
    year: "2015",
    company: "Shopee / AirPay",
    roleVi: "CS & Operations Lead",
    roleEn: "CS & Operations Lead",
    descVi:
      "Tham gia xây dựng trải nghiệm khách hàng trong lĩnh vực thương mại điện tử và thanh toán số, với định hướng lấy khách hàng làm trung tâm.",
    descEn:
      "Built hyper-growth customer experience ecosystems for top-tier E-commerce and digital payments (AirPay/ShopeePay) centered on customer obsession.",
    icon: ShoppingCart,
    iconBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    logos: [
      { name: "Shopee", url: "https://i.ibb.co/F4T7Zr0k/Shoppe.png" },
      { name: "AirPay", url: "https://i.ibb.co/HTPmHMMQ/Airpay.png" },
    ],
  },
  {
    year: "2016",
    company: "Prudential",
    roleVi: "Quality & Project Manager",
    roleEn: "Quality & Project Manager",
    descVi:
      "Hiểu sâu sắc về trải nghiệm khách hàng ngành Bảo hiểm nhân thọ, đòi hỏi sự chính xác, minh bạch và củng cố niềm tin tuyệt đối.",
    descEn:
      "Mastered premium Life Insurance CX standards, requiring absolute precision, strict regulatory compliance, trust-building, and seamless claim support.",
    icon: ShieldCheck,
    iconBg: "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    logos: [
      { name: "Prudential", url: "https://i.ibb.co/LThmXHs/Prudentinal.png" },
    ],
  },
  {
    year: "2018",
    company: "MoMo",
    roleVi: "FinTech CS Manager",
    roleEn: "FinTech CS Manager",
    descVi:
      "Mở rộng kinh nghiệm trong lĩnh vực dịch vụ tài chính số, tối ưu quy trình hỗ trợ khách hàng và nâng cao hiệu quả vận hành trên nền tảng công nghệ.",
    descEn:
      "Scaled digital wallet and payment gateway CX, automating workflows, reducing ticket latency, and elevating CSAT across millions of FinTech users.",
    icon: Smartphone,
    iconBg: "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800",
    iconColor: "text-rose-600 dark:text-rose-400",
    logos: [
      { name: "MoMo", url: "https://i.ibb.co/jXJXLvT/Momo.png" },
    ],
  },
  {
    year: "2023",
    company: "VI ECO",
    roleVi: "Operations & CS Advisor",
    roleEn: "Operations & CS Advisor",
    descVi:
      "Hiểu sâu hơn về trải nghiệm khách hàng trong lĩnh vực tài chính, nơi sự chính xác, minh bạch và niềm tin luôn được đặt lên hàng đầu.",
    descEn:
      "Deepened strategic insights in FinTech & digital banking, where operational rigor, financial compliance, and unwavering client trust remain paramount.",
    icon: Smartphone,
    iconBg: "bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800",
    iconColor: "text-violet-600 dark:text-violet-400",
    logos: [
      { name: "Ví ECO", url: "https://i.ibb.co/mVfX9RkG/Finviet.png" },
    ],
  },
];

interface MilestoneCardProps {
  item: TimelineMilestone;
  isVi: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

function MilestoneCard({ item, isVi, isSelected, onSelect }: MilestoneCardProps) {
  const Icon = item.icon;

  return (
    <div className="relative flex items-start gap-3 sm:gap-4 group">
      {/* Node icon on vertical line */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className={cn(
            "flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition-all duration-300 group-hover:scale-110",
            item.iconBg,
            item.iconColor,
            isSelected && "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900"
          )}
        >
          <Icon size={18} />
        </div>
      </div>

      {/* Card Content */}
      <motion.div
        whileHover={{ y: -2 }}
        onClick={onSelect}
        className={cn(
          "flex-1 rounded-none border bg-[var(--card)]/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 sm:p-4.5 shadow-sm transition-all duration-300 border-[var(--border)] hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/40 mb-3",
          isSelected && "border-indigo-400/80 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/40 ring-1 ring-indigo-400/50"
        )}
      >
        {/* Header: Year + Logos + Company */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
              {item.year}
            </span>
            <div className="flex items-center gap-1.5">
              {item.logos.map((logo, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="h-4.5 w-4.5 rounded-full object-contain border border-slate-200/60 dark:border-slate-700 bg-white"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Role title */}
        <p className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
          {isVi ? item.roleVi : item.roleEn}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
          {isVi ? item.descVi : item.descEn}
        </p>
      </motion.div>
    </div>
  );
}

interface CareerTimelineProps {
  activeYear?: string | null;
  onToggleYear?: (year: string) => void;
}

export function CareerTimeline({ activeYear, onToggleYear }: CareerTimelineProps) {
  const { language } = useLanguageContent();
  const isVi = language === "vi";

  const phase1 = TIMELINE_MILESTONES.slice(0, 4);
  const phase2 = TIMELINE_MILESTONES.slice(4, 8);

  return (
    <div className="relative w-full py-4">
      {/* 2-Column Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        {/* Column 1: Phase 2003 - 2013 */}
        <div className="relative flex flex-col">
          {/* Phase Header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                {isVi ? "GIAI ĐOẠN 2003 – 2013" : "PERIOD 2003 – 2013"}
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/50">
              {isVi ? "Nền Tảng & Tăng Trưởng" : "Foundation & Growth"}
            </span>
          </div>

          {/* Timeline track container */}
          <div className="relative pl-0">
            {/* Vertical connector line */}
            <div className="absolute left-[18px] sm:left-[20px] top-5 bottom-8 w-0.5 bg-gradient-to-b from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 z-0" />

            <div className="space-y-0.5">
              {phase1.map((item) => (
                <MilestoneCard
                  key={item.year}
                  item={item}
                  isVi={isVi}
                  isSelected={activeYear === item.year}
                  onSelect={() => onToggleYear?.(item.year)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Phase 2015 - 2023 */}
        <div className="relative flex flex-col">
          {/* Phase Header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-sky-400" />
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                {isVi ? "GIAI ĐOẠN 2015 – 2023" : "PERIOD 2015 – 2023"}
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/50">
              {isVi ? "FinTech & Công Nghệ Số" : "FinTech & Digital Scale"}
            </span>
          </div>

          {/* Timeline track container */}
          <div className="relative pl-0">
            {/* Vertical connector line */}
            <div className="absolute left-[18px] sm:left-[20px] top-5 bottom-8 w-0.5 bg-gradient-to-b from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 z-0" />

            <div className="space-y-0.5">
              {phase2.map((item) => (
                <MilestoneCard
                  key={item.year}
                  item={item}
                  isVi={isVi}
                  isSelected={activeYear === item.year}
                  onSelect={() => onToggleYear?.(item.year)}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
