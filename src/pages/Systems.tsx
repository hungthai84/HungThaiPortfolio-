import React, { useState, useEffect } from "react";
import {
  Brain,
  Users2,
  Star,
  BarChart2,
  Globe,
  X,
  Code,
  Languages,
  Building,
  Layers,
  Briefcase,
  ShieldCheck,
  Activity,
  Database,
  BrainCircuit,
  Workflow,
  Zap,
  Server,
  GraduationCap,
  Gauge,
  Headphones,
  Presentation,
  Compass,
  Heart,
  Sparkles,
  Network,
  Cloud,
  Sliders,
  ShieldAlert,
  TrendingUp,
  CheckCircle2,
  RotateCcw,
  Award,
  Target,
  Clock,
} from "lucide-react";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { contentData } from "../data";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { PageLayout } from "../components/PageLayout";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

// Skill Decorative Category Icon Mapping
const SKILL_ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  "Quản trị CRM": Database,
  "Phân tích Dữ liệu": BarChart2,
  "Phân tích Hành vi": BrainCircuit,
  "Thiết kế Quy trình": Workflow,
  "Tự động hóa Quy trình": Zap,
  "Phát triển ứng dụng": Code,
  "Lãnh đạo Đội ngũ": Users2,
  "Đào tạo Nhân sự": GraduationCap,
  "Quản lý Hiệu suất": Gauge,
  "Giải quyết Vấn đề": ShieldCheck,
  "Quản lý Khiếu nại": Headphones,
  "Giao tiếp Thuyết trình": Presentation,
  "Hoạch định Chiến lược": Compass,
  "Quản lý Dự án": Briefcase,
  "Định hướng Khách hàng": Heart,
  "Quản trị Trải nghiệm": Sparkles,
  "Phối hợp Liên phòng": Network,
  "Xây dựng Văn hóa": Building,
  "Chuyển đổi Số": Cloud,
  "Cải tiến Quy trình": Sliders,
  "Quản trị Rủi ro": ShieldAlert,
  "Tối ưu Vận hành": TrendingUp,
  "Tiếng Việt": Globe,
  "Tiếng Anh": Languages,
};

const getSkillIcon = (
  skillName: string,
  fallback: React.ComponentType<{ size?: number; className?: string }> = Star,
) => {
  return SKILL_ICON_MAP[skillName] || fallback;
};

const CATEGORY_ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  "01": Database,
  "02": Users2,
  "03": Heart,
  "04": Zap,
  "05": Globe,
};

const getCategoryIcon = (
  catId: string,
  fallback: React.ComponentType<{
    size?: number;
    className?: string;
  }> = Sparkles,
) => {
  return CATEGORY_ICON_MAP[catId] || fallback;
};

// Mastery level helper
const getSkillMasteryInfo = (level: number, isVi: boolean) => {
  if (level >= 90) {
    return {
      label: isVi ? "Thành thạo" : "Mastery",
      badgeClass:
        "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 "
    };
  }
  if (level >= 85) {
    return {
      label: isVi ? "Chuyên sâu" : "Expert",
      badgeClass:
        "bg-blue-500/15 text-blue-600 dark:text-blue-400 "
    };
  }
  if (level >= 80) {
    return {
      label: isVi ? "Nâng cao" : "Advanced",
      badgeClass:
        "bg-amber-500/15 text-amber-600 dark:text-amber-400 "
    };
  }
  return {
    label: isVi ? "Lành nghề" : "Proficient",
    badgeClass:
      "bg-purple-500/15 text-purple-600 dark:text-purple-400 "
  };
};

const SKILL_DETAILS_MAP: Record<
  string,
  {
    desc: string;
    tools: string[];
    application: string;
    categoryName: string;
    expVi: string;
    expEn: string;
    contextVi: string;
    contextEn: string;
  }
> = {
  "Quản trị CRM": {
    desc: "Kiến trúc & vận hành CRM đa kênh cho hàng triệu khách hàng tại Shopee, MoMo, Generali; đảm bảo lưu vết 100% lịch sử tương tác.",
    tools: ["Salesforce", "Zendesk", "Zoho CRM", "Custom CRM"],
    application: "",
    categoryName: "Chuyên môn",
    expVi: "15+ năm kinh nghiệm",
    expEn: "15+ years exp",
    contextVi: "15+ năm kiến trúc & vận hành hệ thống CRM đa kênh quy mô triệu người dùng tại Mobifone, Shopee, MoMo, Generali.",
    contextEn: "15+ years architecting & managing multi-channel CRM systems for millions of users at Mobifone, Shopee, MoMo, Generali.",
  },
  "Phân tích Dữ liệu": {
    desc: "Khai thác dữ liệu vận hành & xây dựng Dashboard phân tích xu hướng (FCR, CSAT, NPS) giúp tối ưu hiệu suất tổng đài.",
    tools: ["Power BI", "SQL", "Excel Advanced", "Google Analytics"],
    application: "",
    categoryName: "Chuyên môn",
    expVi: "12+ năm kinh nghiệm",
    expEn: "12+ years exp",
    contextVi: "12+ năm xây dựng hệ thống báo cáo BI & SQL phân tích xu hướng FCR/CSAT/NPS hỗ trợ ra quyết định điều hành.",
    contextEn: "12+ years building BI & SQL dashboards analyzing FCR/CSAT/NPS metrics for executive decision-making.",
  },
  "Phân tích Hành vi": {
    desc: "Nghiên cứu tâm lý & hành vi khách hàng qua các điểm chạm để dự báo và cải tiến luồng phản hồi trên ứng dụng.",
    tools: ["Behavioral Analytics", "User Journey Mapping", "Empathy Map"],
    application: "",
    categoryName: "Chuyên môn",
    expVi: "10+ năm kinh nghiệm",
    expEn: "10+ years exp",
    contextVi: "10+ năm phân tích hành trình người dùng và tâm lý khách hàng để cải tiến điểm chạm dịch vụ FinTech & E-commerce.",
    contextEn: "10+ years mapping user journeys and behavioral psychology to optimize FinTech & E-commerce touchpoints.",
  },
  "Thiết kế Quy trình": {
    desc: "Chuẩn hóa bộ quy trình SOP & kịch bản nghiệp vụ CSKH cho hơn 130 nhân sự tại VED (Garena) & MoMo.",
    tools: ["SOP Matrix", "Visio", "Flowchart", "Notion"],
    application: "",
    categoryName: "Chuyên môn",
    expVi: "14+ năm kinh nghiệm",
    expEn: "14+ years exp",
    contextVi: "14+ năm thiết kế & chuẩn hóa bộ SOPs kịch bản vận hành tổng đài quy mô hàng trăm nhân sự.",
    contextEn: "14+ years designing & standardizing SOP operational playbooks for large-scale contact centers.",
  },
  "Tự động hóa Quy trình": {
    desc: "Ứng dụng AI Chatbot & Voicebot tự động hóa 40% yêu cầu FAQs, tối ưu thời gian phản hồi cho khách hàng.",
    tools: ["AI Chatbot", "Voicebot", "Zapier", "n8n / Make"],
    application: "",
    categoryName: "Chuyên môn",
    expVi: "8+ năm kinh nghiệm",
    expEn: "8+ years exp",
    contextVi: "8+ năm tiên phong triển khai AI Chatbot, Voicebot & n8n/Zapier tự động hóa 40% yêu cầu lặp lại.",
    contextEn: "8+ years pioneering AI Chatbots, Voicebots & Zapier/n8n automation reducing 40% repetitive queries.",
  },
  "Phát triển ứng dụng": {
    desc: "Tự phát triển Web App quản trị nội bộ (React/Node.js) để theo dõi trực quan chỉ số vận hành & CSAT/NPS.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    application: "",
    categoryName: "Chuyên môn",
    expVi: "6+ năm kinh nghiệm",
    expEn: "6+ years exp",
    contextVi: "6+ năm phát triển ứng dụng web React/Node.js phục vụ quản trị nội bộ và tự động hóa báo cáo.",
    contextEn: "6+ years developing custom React/Node.js internal portals for real-time operational monitoring.",
  },
  "Lãnh đạo Đội ngũ": {
    desc: "Dẫn dắt đội ngũ quy mô lớn, xây dựng văn hóa kết nối và tối ưu tỷ lệ biến động nhân sự (Attrition Rate).",
    tools: ["Leadership Matrix", "1-on-1 Coaching", "Team Building"],
    application: "",
    categoryName: "Lãnh đạo",
    expVi: "15+ năm kinh nghiệm",
    expEn: "15+ years exp",
    contextVi: "15+ năm lãnh đạo đội ngũ lớn (>130 nhân sự), duy trì tỷ lệ nghỉ việc < 5%/năm và năng suất vượt trội.",
    contextEn: "15+ years leading large teams (130+ staff), maintaining attrition < 5%/year with high engagement.",
  },
  "Quản lý Dự án": {
    desc: "Điều phối dự án chuyển đổi số & thiết lập Contact Center Prudential/MoMo đúng tiến độ, tối ưu ngân sách.",
    tools: ["Agile/Scrum", "Jira", "Trello", "MS Project"],
    application: "",
    categoryName: "Lãnh đạo",
    expVi: "12+ năm kinh nghiệm",
    expEn: "12+ years exp",
    contextVi: "12+ năm quản trị dự án Contact Center & Chuyển đổi số theo chuẩn Agile/Scrum đúng tiến độ và ngân sách.",
    contextEn: "12+ years directing Contact Center & Digital Transformation projects using Agile/Scrum frameworks.",
  },
  "Đào tạo Nhân sự": {
    desc: "Xây dựng giáo trình & huấn luyện hàng nghìn nhân sự tổng đài đạt chuẩn chất lượng dịch vụ trước khi vận hành.",
    tools: ["LMS Platform", "Training Modules", "Mentorship"],
    application: "",
    categoryName: "Lãnh đạo",
    expVi: "14+ năm kinh nghiệm",
    expEn: "14+ years exp",
    contextVi: "14+ năm thiết kế chương trình đào tạo & coaching trực tiếp cho hàng nghìn tư vấn viên chuyên nghiệp.",
    contextEn: "14+ years designing training curricula & mentoring 1000s of agents to reach top service quality.",
  },
  "Quản lý Hiệu suất": {
    desc: "Thiết lập hệ thống OKRs/KPIs giúp duy trì tỷ lệ hài lòng khách hàng CSAT > 95% và cam kết SLA > 98%.",
    tools: ["KPI Scorecard", "OKR Framework", "Performance Review"],
    application: "",
    categoryName: "Lãnh đạo",
    expVi: "12+ năm kinh nghiệm",
    expEn: "12+ years exp",
    contextVi: "12+ năm thiết lập thẻ điểm KPI/OKR giúp duy trì CSAT > 95% và cam kết SLA > 98% cho doanh nghiệp.",
    contextEn: "12+ years establishing KPI/OKR scorecards maintaining CSAT > 95% and SLA > 98% consistently.",
  },
  "Giải quyết Vấn đề": {
    desc: "Phân tích căn nguyên (5 Whys) và xử lý triệt để các sự cố lỗi giao dịch FinTech & khủng hoảng dịch vụ.",
    tools: ["5 Whys", "Fishbone Diagram", "Crisis Management"],
    application: "",
    categoryName: "Lãnh đạo",
    expVi: "15+ năm kinh nghiệm",
    expEn: "15+ years exp",
    contextVi: "15+ năm áp dụng mô hình 5 Whys & sơ đồ Xương cá giải quyết sự cố giao dịch tài chính & khủng hoảng dịch vụ.",
    contextEn: "15+ years employing 5 Whys & Fishbone diagrams for root-cause crisis resolution in FinTech.",
  },
  "Quản lý Khiếu nại": {
    desc: "Xử lý khiếu nại chuyên sâu (HEAR) đạt tỷ lệ giải quyết thành công ngay lần đầu (FCR) trên 90%.",
    tools: ["De-escalation", "HEAR Framework", "Complaint Escalation"],
    application: "",
    categoryName: "Lãnh đạo",
    expVi: "15+ năm kinh nghiệm",
    expEn: "15+ years exp",
    contextVi: "15+ năm ứng dụng khung HEAR giải quyết khiếu nại phức tạp, đạt chỉ số FCR > 90%.",
    contextEn: "15+ years mastering the HEAR framework for complex dispute de-escalation with FCR > 90%.",
  },
  "Giao tiếp Thuyết trình": {
    desc: "Thuyết trình đề án đổi mới vận hành & báo cáo chỉ số CX thuyết phục trước Ban Tổng Giám đốc.",
    tools: ["Public Speaking", "Executive Presentation", "Business Writing"],
    application: "",
    categoryName: "Lãnh đạo",
    expVi: "15+ năm kinh nghiệm",
    expEn: "15+ years exp",
    contextVi: "15+ năm thuyết trình báo cáo chiến lược CX & đề án đầu tư công nghệ trước C-Level và Ban Giám Đốc.",
    contextEn: "15+ years presenting CX strategy & technology proposals to C-Level executives and Board of Directors.",
  },
  "Hoạch định Chiến lược": {
    desc: "Xây dựng lộ trình nâng tầm trải nghiệm Omnichannel gắn liền với mục tiêu tăng trưởng dài hạn của doanh nghiệp.",
    tools: ["SWOT Analysis", "Balanced Scorecard", "Strategic Roadmap"],
    application: "",
    categoryName: "Lãnh đạo",
    expVi: "10+ năm kinh nghiệm",
    expEn: "10+ years exp",
    contextVi: "10+ năm hoạch định chiến lược trải nghiệm đa kênh (Omnichannel) gắn liền với mục tiêu tăng trưởng doanh thu.",
    contextEn: "10+ years formulating long-term Omnichannel CX roadmaps aligned with business growth goals.",
  },
  "Định hướng Khách hàng": {
    desc: "Thúc đẩy tư duy phục vụ tận tâm 'Customer First' trong toàn bộ đội ngũ để tối ưu sự hài lòng của khách hàng.",
    tools: ["Customer First Mindset", "CSAT / NPS Alignment"],
    application: "",
    categoryName: "Hợp tác",
    expVi: "15+ năm kinh nghiệm",
    expEn: "15+ years exp",
    contextVi: "15+ năm thúc đẩy tư duy 'Customer First' làm kim chỉ nam trong mọi hoạt động vận hành.",
    contextEn: "15+ years instilling a 'Customer First' mindset across multi-tier organization structures.",
  },
  "Quản trị Trải nghiệm": {
    desc: "Quản trị toàn diện điểm chạm tương tác, tối ưu hành trình người dùng trên ví MoMo & dịch vụ sau bán hàng.",
    tools: [
      "CX Management",
      "Touchpoint Governance",
      "VOC (Voice of Customer)",
    ],
    application: "",
    categoryName: "Hợp tác",
    expVi: "12+ năm kinh nghiệm",
    expEn: "12+ years exp",
    contextVi: "12+ năm quản trị hệ thống điểm chạm tương tác và đo lường trải nghiệm khách hàng Voice of Customer (VOC).",
    contextEn: "12+ years governing customer interaction touchpoints & implementing Voice of Customer (VOC) frameworks.",
  },
  "Phối hợp Liên phòng": {
    desc: "Kết nối hiệu quả giữa CSKH với IT/Product/Marketing để phản hồi & sửa lỗi sản phẩm nhanh chóng.",
    tools: ["Cross-functional Alignment", "Service Level Agreement (SLA)"],
    application: "",
    categoryName: "Hợp tác",
    expVi: "15+ năm kinh nghiệm",
    expEn: "15+ years exp",
    contextVi: "15+ năm làm cầu nối phối hợp nhịp nhàng giữa CSKH với IT, Product, Legal & Marketing.",
    contextEn: "15+ years driving seamless collaboration between Customer Service, IT, Product, and Marketing.",
  },
  "Xây dựng Văn hóa": {
    desc: "Gia tăng chỉ số gắn kết nhân viên qua việc xây dựng văn hóa doanh nghiệp lấy khách hàng làm trung tâm.",
    tools: ["Internal NPS", "Company Culture", "Employee Engagement"],
    application: "",
    categoryName: "Hợp tác",
    expVi: "12+ năm kinh nghiệm",
    expEn: "12+ years exp",
    contextVi: "12+ năm kiến tạo môi trường làm việc tích cực, gắn kết nhân sự và xây dựng văn hóa dịch vụ đỉnh cao.",
    contextEn: "12+ years fostering high-engagement team culture focused on customer-centric service values.",
  },
  "Chuyển đổi Số": {
    desc: "Tiên phong ứng dụng AI, Cloud CRM & Power BI để số hóa 100% quy trình tiếp nhận & xử lý yêu cầu khách hàng.",
    tools: ["Digital Transformation", "Generative AI", "CRM Cloud"],
    application: "",
    categoryName: "Đổi mới",
    expVi: "8+ năm kinh nghiệm",
    expEn: "8+ years exp",
    contextVi: "8+ năm trực tiếp dẫn dắt các dự án chuyển đổi số, áp dụng Generative AI & Cloud CRM vào tổng đài.",
    contextEn: "8+ years leading digital transformation initiatives integrating Generative AI & Cloud CRM.",
  },
  "Cải tiến Quy trình": {
    desc: "Áp dụng Kaizen & Lean giúp rút ngắn 15% thời gian xử lý trung bình (AHT) nhờ tinh chỉnh thao tác vận hành.",
    tools: ["Kaizen", "PDCA Cycle", "Lean Management"],
    application: "",
    categoryName: "Đổi mới",
    expVi: "10+ năm kinh nghiệm",
    expEn: "10+ years exp",
    contextVi: "10+ năm áp dụng triết lý Kaizen & Lean loại bỏ lãng phí vận hành, giảm 15% thời gian AHT.",
    contextEn: "10+ years applying Kaizen & Lean methodologies reducing Average Handling Time (AHT) by 15%.",
  },
  "Quản trị Rủi ro": {
    desc: "Nhận diện rủi ro & xây dựng kịch bản BCP đảm bảo tổng đài vận hành thông suốt 24/7 trong mọi tình huống.",
    tools: ["Risk Assessment", "BCP Framework", "Disaster Recovery"],
    application: "",
    categoryName: "Đổi mới",
    expVi: "12+ năm kinh nghiệm",
    expEn: "12+ years exp",
    contextVi: "12+ năm thiết lập kịch bản ứng phó sự cố BCP đảm bảo tổng đài hoạt động liên tục 24/7/365.",
    contextEn: "12+ years constructing BCP disaster recovery frameworks maintaining 24/7 operational resilience.",
  },
  "Tối ưu Vận hành": {
    desc: "Dự báo lưu lượng & điều phối WFM giúp tiết kiệm 15-20% chi phí vận hành hàng năm nhờ phân bổ nhân sự thông minh.",
    tools: [
      "Workforce Management (WFM)",
      "Operational Efficiency",
      "Cost Optimization",
    ],
    application: "",
    categoryName: "Đổi mới",
    expVi: "14+ năm kinh nghiệm",
    expEn: "14+ years exp",
    contextVi: "14+ năm hoạch định WFM & tối ưu chi phí nhân sự tổng đài giúp tiết kiệm 15-20% chi phí vận hành.",
    contextEn: "14+ years optimizing Workforce Management (WFM) saving 15-20% annual operational overhead.",
  },
  "Tiếng Việt": {
    desc: "Ngôn ngữ mẹ đẻ, thành thạo chuyên sâu trong giao tiếp, viết báo cáo và thuyết trình chuyên nghiệp.",
    tools: ["Tiếng Việt"],
    application: "",
    categoryName: "Ngôn ngữ",
    expVi: "Mẹ đẻ (Native)",
    expEn: "Native",
    contextVi: "Ngôn ngữ mẹ đẻ, sử dụng thành thạo cho các báo cáo C-level, thuyết trình và soạn thảo văn bản quy phạm.",
    contextEn: "Native fluency utilized for C-level reporting, executive keynote speeches, and official policy writing.",
  },
  "Tiếng Anh": {
    desc: "Sử dụng thành thạo trong giao tiếp công việc, đọc tài liệu chuyên ngành và làm việc với đối tác quốc tế.",
    tools: ["English"],
    application: "",
    categoryName: "Ngôn ngữ",
    expVi: "Thành thạo (10+ năm)",
    expEn: "Professional (10+ yrs)",
    contextVi: "10+ năm làm việc với tài liệu hệ thống quốc tế (Salesforce, Zendesk), đọc tài liệu chuyên ngành & giao tiếp đối tác.",
    contextEn: "10+ years utilizing professional English for international system tools (Salesforce, Zendesk) & business communications.",
  },
};

interface SkillHoverTooltipProps {
  title: string;
  expText: string;
  contextText: string;
  tools?: string[];
  color?: string;
  isVisible: boolean;
  position?: "top" | "bottom";
}

function SkillHoverTooltip({
  title,
  expText,
  contextText,
  tools,
  color = "#7c3aed",
  isVisible,
  position = "top",
}: SkillHoverTooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position === "top" ? 6 : -6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position === "top" ? 4 : -4, scale: 0.95 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={cn(
            "pointer-events-none absolute z-50 w-[270px] sm:w-[290px] rounded-xl border  bg-slate-950/95 p-3 text-left  backdrop-blur-xl dark: dark:bg-slate-900/95 text-white",
            position === "top" && "-top-2 left-1/2 -translate-x-1/2 -translate-y-full",
            position === "bottom" && "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full",
          )}
        >
          <div className="flex items-center justify-between gap-2   pb-1.5">
            <span className="truncate text-xs font-black text-white" style={{ color: color !== "#7c3aed" ? color : undefined }}>
              {title}
            </span>
            <span className="flex shrink-0 items-center gap-1 rounded bg-amber-500/20 px-1.5 py-0.5 text-[9.5px] font-extrabold text-amber-300 border ">
              <Clock size={10} className="text-amber-400 shrink-0" />
              <span>{expText}</span>
            </span>
          </div>

          <p className="mt-1.5 text-[10.5px] leading-relaxed font-medium text-slate-200">
            {contextText}
          </p>

          {tools && tools.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1   pt-1.5">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="rounded px-1.5 py-0.5 text-[8.5px] font-extrabold text-violet-300"
                  style={{
                    backgroundColor: `${color}25`,
                    color: color,
                  }}
                >
                  #{tool}
                </span>
              ))}
            </div>
          )}

          {/* Pointer arrow */}
          <div
            className={cn(
              "absolute h-2.5 w-2.5 rotate-45 border bg-slate-950 dark:bg-slate-900",
              position === "top" && "-bottom-1.5 left-1/2 -translate-x-1/2   ",
              position === "bottom" && "-top-1.5 left-1/2 -translate-x-1/2   "
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SkillFlipCardProps {
  skill: { name: string; level: number };
  color?: string;
  isVi: boolean;
  index?: number;
}

function SkillFlipCard({ skill, color = "#007aff", isVi, index = 0 }: SkillFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const detail = SKILL_DETAILS_MAP[skill.name];
  const SkillIcon = getSkillIcon(skill.name, CheckCircle2);
  const mastery = getSkillMasteryInfo(skill.level, isVi);

  const handleToggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    playUiSound("toggle");
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="perspective-1000 group/flip relative h-[100px] w-full cursor-pointer text-left"
      onClick={handleToggleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SkillHoverTooltip
        title={skill.name}
        expText={isVi ? detail?.expVi || "Nhiều năm kinh nghiệm" : detail?.expEn || "Years experience"}
        contextText={isVi ? detail?.contextVi || detail?.desc || "" : detail?.contextEn || detail?.desc || ""}
        tools={detail?.tools}
        color={color}
        isVisible={isHovered && !isFlipped}
        position="top"
      />

      <motion.div
        className="relative h-full w-full rounded-xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE (MẶT TRƯỚC) */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-xl p-2.5",
            "flex flex-col justify-between overflow-hidden  bg-[var(--card)]  backdrop-blur-xl transition-all",
            isFlipped
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100",
          )}
          style={{
            borderColor: `${color}40`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Background Watermark Icon */}
          <div
            className="pointer-events-none absolute -right-3 -bottom-3 opacity-[0.08] transition-opacity duration-300 dark:opacity-[0.15]"
            style={{ color }}
          >
            <SkillIcon size={76} />
          </div>

          {/* Title Row */}
          <div className="z-10 flex w-full min-w-0 items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span
                style={{ color }}
                className="flex shrink-0 items-center justify-center"
              >
                <SkillIcon size={20} />
              </span>
              <h4
                className="truncate text-xs leading-tight font-extrabold tracking-tight sm:text-sm"
                style={{ color }}
              >
                {skill.name}
              </h4>
            </div>
            <span
              className={cn(
                "shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-black",
                mastery.badgeClass,
              )}
            >
              {mastery.label}
            </span>
          </div>

          {/* Progress bar + % badge with Framer Motion staggered growth */}
          <div className="z-10 my-auto flex w-full flex-col gap-1.5">
            <div className="flex w-full items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--border)]/60">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 1.1,
                    ease: [0.25, 1, 0.5, 1],
                    delay: index * 0.08,
                  }}
                />
              </div>
              <span
                className="shrink-0 rounded border  bg-[var(--surface)] px-1.5 py-0.5 text-[11px] font-black"
                style={{ color }}
              >
                {skill.level}%
              </span>
            </div>
          </div>

          {/* Bottom Row: Tag # */}
          <div className="z-10 flex max-h-[32px] flex-wrap items-center gap-1 overflow-hidden pt-0.5">
            {detail?.tools?.map((tool, idx) => (
              <span
                key={idx}
                className="shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-black tracking-tight"
                style={{
                  backgroundColor: `${color}12`,
                  color: color,
                  borderColor: `${color}35`,
                }}
              >
                #{tool}
              </span>
            ))}
          </div>
        </div>

        {/* BACK SIDE (MẶT SAU - KHI LẬT LẠI) */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-xl p-2.5",
            "flex flex-col justify-between overflow-hidden  bg-[var(--card)] text-left  backdrop-blur-xl transition-all",
            !isFlipped
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100",
          )}
          style={{
            borderColor: color,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Header Mặt Sau */}
          <div className="flex shrink-0 items-center justify-between   pb-1.5">
            <div className="flex min-w-0 items-center gap-2">
              <span
                style={{ color }}
                className="flex shrink-0 items-center justify-center"
              >
                <SkillIcon size={18} />
              </span>
              <h4
                className="truncate text-xs font-extrabold text-[var(--text-primary)]"
                style={{ color }}
              >
                {skill.name}
              </h4>
            </div>

            <span className="flex cursor-pointer items-center gap-1 rounded-full bg-[var(--surface)] p-1 px-2 text-[9px] font-bold text-[var(--muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-primary)]">
              <RotateCcw size={10} />
              <span>{isVi ? "Quay lại" : "Back"}</span>
            </span>
          </div>

          {/* Nội dung Mặt Sau */}
          <div className="no-scrollbar flex-1 overflow-y-auto py-1 text-[11px]">
            {/* Năng lực & Ứng dụng */}
            <div className="space-y-1.5 rounded-lg border  dark: bg-slate-50 dark:bg-slate-900/50 p-2.5">
              <span
                className="block text-[9.5px] font-extrabold tracking-wider uppercase text-slate-500 dark:text-slate-400"
              >
                {isVi ? "Năng lực & Ứng dụng:" : "Competency & Application:"}
              </span>
              <p className="m-0 text-justify text-[11px] leading-relaxed font-semibold text-slate-800 dark:text-slate-200">
                {detail?.desc ||
                  (isVi ? "Nội dung đang cập nhật." : "Content pending.")}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface SkillsInteractiveRadarProps {
  data: Array<{
    id: string;
    titleVi: string;
    titleEn: string;
    shortLabelVi: string;
    shortLabelEn: string;
    A: number;
    color: string;
    icon: any;
    descVi: string;
    descEn: string;
    tags?: string[];
  }>;
  hoveredCategory: string | null;
  onHoverCategory: (id: string | null) => void;
  isVi: boolean;
  overallAvg: string;
}

function SkillsInteractiveRadar({
  data,
  hoveredCategory,
  onHoverCategory,
  isVi,
  overallAvg,
}: SkillsInteractiveRadarProps) {
  const cx = 250;
  const cy = 205;
  const R = 130;
  const levels = [20, 40, 60, 80, 100];
  const numAxes = data.length;

  const [chartType, setChartType] = useState<"radar" | "polar" | "radial">("polar");
  const [activeTooltip, setActiveTooltip] = useState<{
    id: string;
    item: (typeof data)[0];
    x: number;
    y: number;
    rawX: number;
    rawY: number;
  } | null>(null);

  const getLevelPoints = (lvl: number) => {
    return data
      .map((_, i) => {
        const angleDeg = -90 + i * (360 / numAxes);
        const rad = (angleDeg * Math.PI) / 180;
        const x = cx + R * (lvl / 100) * Math.cos(rad);
        const y = cy + R * (lvl / 100) * Math.sin(rad);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  const targetDataPoints = data.map((item, i) => {
    const angleDeg = -90 + i * (360 / numAxes);
    const rad = (angleDeg * Math.PI) / 180;
    const finalR = R * (item.A / 100);
    const finalX = cx + finalR * Math.cos(rad);
    const finalY = cy + finalR * Math.sin(rad);
    return { x: finalX, y: finalY, finalX, finalY, item, i, angleDeg, rad };
  });

  const polygonPointsString = targetDataPoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const activeItem = data.find((d) => d.id === hoveredCategory);

  const handleVertexHover = (
    item: (typeof data)[0],
    pt: (typeof targetDataPoints)[0],
  ) => {
    onHoverCategory(item.id);
    setActiveTooltip({
      id: item.id,
      item,
      x: pt.finalX,
      y: pt.finalY,
      rawX: pt.finalX,
      rawY: pt.finalY,
    });
  };

  const handleVertexLeave = () => {
    onHoverCategory(null);
    setActiveTooltip(null);
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center select-none">
      <div className="mb-5 flex items-center gap-1 rounded-full border  bg-white/40 p-1  backdrop-blur-md dark: dark:bg-slate-900/40">
        <button
          type="button"
          onClick={() => { playUiSound("click"); setChartType("polar"); }}
          className={cn(
            "rounded-full px-3.5 py-1 text-[11px] font-black transition-all cursor-pointer",
            chartType === "polar"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white  scale-102"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          {isVi ? "Cánh hoa (Polar)" : "Polar Coxcomb"}
        </button>
        <button
          type="button"
          onClick={() => { playUiSound("click"); setChartType("radar"); }}
          className={cn(
            "rounded-full px-3.5 py-1 text-[11px] font-black transition-all cursor-pointer",
            chartType === "radar"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white  scale-102"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          {isVi ? "Mạng nhện (Radar)" : "Radar Web"}
        </button>
        <button
          type="button"
          onClick={() => { playUiSound("click"); setChartType("radial"); }}
          className={cn(
            "rounded-full px-3.5 py-1 text-[11px] font-black transition-all cursor-pointer",
            chartType === "radial"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white  scale-102"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          {isVi ? "Cột tròn (Radial)" : "Radial Rings"}
        </button>
      </div>

      <div className="relative w-full max-w-[480px]">
        <svg
          id="skills-radar-chart"
          viewBox="0 0 500 410"
          className="h-auto w-full overflow-visible select-none drop-"
        >
          <defs>
            <radialGradient id="fluentRadarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--app-primary-hex, #7c3aed)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--app-primary-hex, #7c3aed)" stopOpacity="0.1" />
            </radialGradient>
            <filter id="fluentRadarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {(chartType === "radar" || chartType === "polar") && levels.map((lvl, index) => {
            const isOuter = lvl === 100;
            const isMid = lvl === 60;
            return (
              <g key={lvl} className="pointer-events-none">
                <polygon
                  points={getLevelPoints(lvl)}
                  fill={index % 2 === 0 ? "var(--surface)" : "transparent"}
                  fillOpacity={index % 2 === 0 ? 0.5 : 0}
                  stroke="var(--border)"
                  strokeWidth={isOuter ? 1.5 : isMid ? 1 : 0.8}
                  strokeDasharray={isOuter ? "none" : "3 4"}
                  opacity={isOuter ? 0.95 : 0.5}
                />
                <circle cx={cx} cy={cy} r={R * (lvl / 100)} fill="none" stroke="var(--border)" strokeWidth={0.5} strokeDasharray="2 4" opacity={0.3} />
                <g transform={`translate(${cx}, ${cy - R * (lvl / 100)})`}>
                  <circle cx={0} cy={0} r={1.75} fill="var(--muted)" opacity={0.7} />
                  <rect x={-14} y={-14} width={28} height={12} rx={6} fill="var(--card)" stroke="var(--border)" strokeWidth={0.75} opacity={0.85} />
                  <text x={0} y={-8} textAnchor="middle" dominantBaseline="central" className="text-[8px] font-extrabold fill-[var(--muted)]">{lvl}%</text>
                </g>
              </g>
            );
          })}

          {(chartType === "radar" || chartType === "polar") && data.map((item, i) => {
            const angleDeg = -90 + i * (360 / numAxes);
            const rad = (angleDeg * Math.PI) / 180;
            const x2 = cx + R * Math.cos(rad);
            const y2 = cy + R * Math.sin(rad);
            const isHovered = hoveredCategory === item.id;
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={isHovered ? item.color : "var(--border)"} strokeWidth={isHovered ? 2.5 : 1} strokeOpacity={isHovered ? 0.95 : 0.4} strokeDasharray={isHovered ? "none" : "2 3"} />
                <circle cx={x2} cy={y2} r={isHovered ? 3.5 : 2} fill={isHovered ? item.color : "var(--border)"} />
              </g>
            );
          })}

          {chartType === "radar" && (
            <motion.polygon
              points={polygonPointsString}
              fill="url(#fluentRadarGradient)"
              stroke="var(--app-primary-hex, #7c3aed)"
              strokeWidth={2.5}
              strokeLinejoin="round"
              filter="url(#fluentRadarGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          )}

          {chartType === "polar" && data.map((item, i) => {
            const angleDeg = -90 + i * (360 / numAxes);
            const halfWidth = 360 / numAxes / 2 - 2;
            const startAngleDeg = angleDeg - halfWidth;
            const endAngleDeg = angleDeg + halfWidth;
            const startAngleRad = (startAngleDeg * Math.PI) / 180;
            const endAngleRad = (endAngleDeg * Math.PI) / 180;
            const rVal = Math.max(15, R * (item.A / 100));
            const xStart = cx + rVal * Math.cos(startAngleRad);
            const yStart = cy + rVal * Math.sin(startAngleRad);
            const xEnd = cx + rVal * Math.cos(endAngleRad);
            const yEnd = cy + rVal * Math.sin(endAngleRad);
            const isHovered = hoveredCategory === item.id;
            const pt = targetDataPoints[i];
            const dPath = `M ${cx} ${cy} L ${xStart} ${yStart} A ${rVal} ${rVal} 0 0 1 ${xEnd} ${yEnd} Z`;
            return (
              <g key={item.id}>
                <motion.path
                  d={dPath}
                  fill={item.color}
                  fillOpacity={isHovered ? 0.75 : 0.35}
                  stroke={item.color}
                  strokeWidth={isHovered ? 3 : 1.5}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => handleVertexHover(item, pt)}
                  onMouseLeave={handleVertexLeave}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isHovered ? 1.04 : 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              </g>
            );
          })}

          {chartType === "radial" && data.map((item, i) => {
            const ringR = 45 + i * 15;
            const angleRange = Math.min(359.9, (item.A / 100) * 360);
            const endAngleRad = ((-90 + angleRange) * Math.PI) / 180;
            const startX = cx;
            const startY = cy - ringR;
            const endX = cx + ringR * Math.cos(endAngleRad);
            const endY = cy + ringR * Math.sin(endAngleRad);
            const largeArcFlag = angleRange > 180 ? 1 : 0;
            const dPath = `M ${startX} ${startY} A ${ringR} ${ringR} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
            const isHovered = hoveredCategory === item.id;
            const pt = targetDataPoints[i];
            return (
              <g key={item.id}>
                <circle cx={cx} cy={cy} r={ringR} fill="none" stroke="var(--border)" strokeWidth={9} opacity={0.12} />
                <motion.path
                  d={dPath}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={9}
                  strokeLinecap="round"
                  opacity={isHovered ? 1 : 0.75}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => handleVertexHover(item, pt)}
                  onMouseLeave={handleVertexLeave}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </g>
            );
          })}

          {chartType === "radar" && targetDataPoints.map((pt, i) => {
            const isHovered = hoveredCategory === pt.item.id;
            return (
              <motion.g
                key={pt.item.id}
                className="cursor-pointer"
                onMouseEnter={() => handleVertexHover(pt.item, pt)}
                onMouseLeave={handleVertexLeave}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 + (i * 0.03) }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                {!isHovered && <circle cx={pt.x} cy={pt.y} r={7} fill="var(--app-primary-hex, #7c3aed)" fillOpacity={0.4} className="animate-ping" style={{ animationDuration: '3s', animationDelay: `${i * 0.15}s` }} />}
                {isHovered && (
                  <>
                    <circle cx={pt.x} cy={pt.y} r={20} fill="var(--app-primary-hex, #7c3aed)" fillOpacity={0.25} className="animate-ping" />
                    <circle cx={pt.x} cy={pt.y} r={13} fill="var(--app-primary-hex, #7c3aed)" fillOpacity={0.4} />
                  </>
                )}
                <circle cx={pt.x} cy={pt.y} r={isHovered ? 7.5 : 5} fill="var(--card)" stroke={pt.item.color} strokeWidth={2.5} />
                <circle cx={pt.x} cy={pt.y} r={isHovered ? 3.5 : 2.5} fill={pt.item.color} />
              </motion.g>
            );
          })}

          <g transform={`translate(${cx}, ${cy})`} className="cursor-default">
            <circle r={24} fill="var(--card)" stroke="var(--border)" strokeWidth={1.5} />
            <text y={-6} textAnchor="middle" dominantBaseline="central" className="text-[8px] font-black uppercase tracking-wider fill-[var(--muted)]">{isVi ? "ĐIỂM TB" : "OVERALL"}</text>
            <text y={7} textAnchor="middle" dominantBaseline="central" className="text-[12px] font-black" style={{ fill: "var(--app-primary-hex, #7c3aed)" }}>{overallAvg}%</text>
          </g>

          {data.map((item, i) => {
            const angleDeg = -90 + i * (360 / numAxes);
            const rad = (angleDeg * Math.PI) / 180;
            const labelDist = R + 18;
            let alignClass = "items-center";
            let offsetX = 0;
            let offsetY = 0;
            if (i === 0) { offsetY = -22; }
            else if (i === 1) { alignClass = "items-start"; offsetX = 14; offsetY = -8; }
            else if (i === 2) { alignClass = "items-start"; offsetX = 14; offsetY = 14; }
            else if (i === 3) { alignClass = "items-end"; offsetX = -14; offsetY = 14; }
            else if (i === 4) { alignClass = "items-end"; offsetX = -14; offsetY = -8; }
            const lx = cx + labelDist * Math.cos(rad) + offsetX;
            const ly = cy + labelDist * Math.sin(rad) + offsetY;
            const isHovered = hoveredCategory === item.id;
            const pt = targetDataPoints[i];
            return (
              <foreignObject key={item.id} x={lx - 70} y={ly - 24} width={140} height={48} className="overflow-visible">
                <div className={cn("flex h-full w-full flex-col justify-center", alignClass)} onMouseEnter={() => handleVertexHover(item, pt)} onMouseLeave={handleVertexLeave}>
                  <div className={cn("flex cursor-pointer flex-col items-center justify-center rounded-xl border  bg-white/70 px-3 py-1.5  backdrop-blur-xl transition-all duration-300 dark: dark:bg-slate-900/80", isHovered ? "scale-105  ring-2 ring-indigo-500/20" : "scale-100")}>
                    <span className={cn("text-[9.5px] font-black tracking-widest uppercase", isHovered ? "text-violet-600 dark:text-violet-400" : "text-[var(--text-primary)]")}>{isVi ? item.shortLabelVi : item.shortLabelEn}</span>
                    <span className="mt-0.5 text-[11px] font-extrabold leading-none" style={{ color: item.color }}>{item.A}%</span>
                  </div>
                </div>
              </foreignObject>
            );
          })}
        </svg>

        <AnimatePresence>
          {activeTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.94 }}
              className="pointer-events-none absolute z-40 w-64 -translate-x-1/2 rounded-2xl border  bg-[var(--card)]/95 p-3.5  backdrop-blur-2xl dark:"
              style={{
                left: `${(activeTooltip.rawX / 500) * 100}%`,
                top: `${(activeTooltip.rawY / 410) * 100}%`,
                transform: `translate(-50%, ${activeTooltip.rawY < 200 ? "14px" : "-115%"})`,
              }}
            >
              <div className="flex items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: activeTooltip.item.color }} />
                  <h4 className="truncate text-xs font-black text-[var(--text-primary)]">{isVi ? activeTooltip.item.titleVi : activeTooltip.item.titleEn}</h4>
                </div>
                <span className="shrink-0 rounded-lg px-2 py-0.5 text-xs font-black" style={{ backgroundColor: `${activeTooltip.item.color}22`, color: activeTooltip.item.color, borderColor: `${activeTooltip.item.color}50` }}>{activeTooltip.item.A}%</span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed font-medium text-[var(--text-secondary)]">{isVi ? activeTooltip.item.descVi : activeTooltip.item.descEn}</p>
              {activeTooltip.item.tags && (
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {activeTooltip.item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="rounded-md border px-1.5 py-0.5 text-[9px] font-black" style={{ backgroundColor: `${activeTooltip.item.color}12`, color: activeTooltip.item.color, borderColor: `${activeTooltip.item.color}30` }}>{tag}</span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {activeItem && !activeTooltip && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-2 rounded-xl border  bg-[var(--card)] px-3.5 py-1.5  backdrop-blur-md">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: activeItem.color }} />
          <span className="text-xs font-black text-[var(--text-primary)]">{isVi ? activeItem.titleVi : activeItem.titleEn}</span>
          <span className="rounded px-2 py-0.5 text-[10.5px] font-black" style={{ backgroundColor: `${activeItem.color}20`, color: activeItem.color }}>{activeItem.A}%</span>
        </motion.div>
      )}
    </div>
  );
}

export function Systems() {
  const { language } = useLanguage();
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const isVi = language === "vi";

  const [activeSkillModal, setActiveSkillModal] = useState<{
    name: string;
    level: number;
  } | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const professionalAvg = Math.round(
    contentData.skills.professional.reduce((sum, s) => sum + s.level, 0) /
      contentData.skills.professional.length,
  );
  const innovationAvg = Math.round(
    contentData.skills.innovation.reduce((sum, s) => sum + s.level, 0) /
      contentData.skills.innovation.length,
  );
  const leadershipAvg = Math.round(
    contentData.skills.leadership.reduce((sum, s) => sum + s.level, 0) /
      contentData.skills.leadership.length,
  );
  const collaborationAvg = Math.round(
    contentData.skills.collaboration.reduce((sum, s) => sum + s.level, 0) /
      contentData.skills.collaboration.length,
  );
  const languagesAvg = Math.round(
    contentData.skills.languages.reduce((sum, s) => sum + s.level, 0) /
      contentData.skills.languages.length,
  );

  const dynamicRadarData = [
    {
      id: "professional",
      shortLabelVi: "1. Chuyên môn",
      shortLabelEn: "1. Professional",
      titleVi: "Chuyên môn CRM & Dữ liệu",
      titleEn: "CRM & Data Systems",
      A: professionalAvg,
      color: "#007aff",
      icon: Database,
      descVi: "Kiến trúc CRM, Power BI, SQL, SOPs, Web/App Dev",
      descEn: "CRM Architecture, Power BI, SQL, SOPs, App Dev",
      tags: ["#CRM", "#PowerBI", "#SQL", "#SOPs"],
    },
    {
      id: "innovation",
      shortLabelVi: "2. Đổi mới",
      shortLabelEn: "2. Innovation",
      titleVi: "Đổi mới & Số hóa Tự động",
      titleEn: "Innovation & Digitalization",
      A: innovationAvg,
      color: "#ff9500",
      icon: Sparkles,
      descVi: "AI Chatbot, Voicebot, Kaizen, WFM & BCP",
      descEn: "AI Chatbot, Voicebot, Kaizen, WFM & BCP",
      tags: ["#AIChatbot", "#Voicebot", "#Kaizen", "#BCP"],
    },
    {
      id: "leadership",
      shortLabelVi: "3. Lãnh đạo",
      shortLabelEn: "3. Leadership",
      titleVi: "Lãnh đạo & Quản trị Đội ngũ",
      titleEn: "Leadership & Management",
      A: leadershipAvg,
      color: "#ff3b30",
      icon: Users2,
      descVi: "Quản trị quy mô lớn, OKRs/KPIs, Đào tạo & CSAT > 95%",
      descEn: "Large-scale management, OKRs/KPIs, Training & CSAT",
      tags: ["#OKRs", "#KPIs", "#Coaching", "#SLA"],
    },
    {
      id: "collaboration",
      shortLabelVi: "4. Hợp tác",
      shortLabelEn: "4. Collaboration",
      titleVi: "Hợp tác & Trải nghiệm (CX)",
      titleEn: "Collaboration & CX",
      A: collaborationAvg,
      color: "#af52de",
      icon: Network,
      descVi: "Customer First, VOC, liên phòng IT/Product/Marketing",
      descEn: "Customer First, VOC, cross-functional IT/Product",
      tags: ["#CustomerFirst", "#VOC", "#CrossDept"],
    },
    {
      id: "languages",
      shortLabelVi: "5. Ngôn ngữ",
      shortLabelEn: "5. Languages",
      titleVi: "Ngôn ngữ Toàn cầu",
      titleEn: "Global Languages",
      A: languagesAvg,
      color: "#34c759",
      icon: Globe,
      descVi: "Tiếng Việt (Mẹ đẻ) & Tiếng Anh (Giao tiếp & Báo cáo)",
      descEn: "Vietnamese (Native) & English (Professional)",
      tags: ["#Vietnamese", "#English", "#Reports"],
    },
  ];

  const overallAvgScore = (
    (professionalAvg +
      innovationAvg +
      leadershipAvg +
      collaborationAvg +
      languagesAvg) /
    5
  ).toFixed(1);

  const topPillar = [...dynamicRadarData].sort((a, b) => b.A - a.A)[0];

  return (
    <PageLayout
      id="systems"
      rootClassName="w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="systems"
      pageName="Systems Skills Card"
      title={isVi ? "Hệ Thống Năng Lực Cốt Lõi" : "Core Capability Systems"}
      subtitle={
        isVi
          ? "Phân tích kiến trúc kỹ năng chuyên môn, lãnh đạo và vận hành."
          : "Architecture analysis of professional, leadership, and operational skills."
      }
      icon={Server}
      headerActions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border  bg-violet-500/10 px-3 py-1.5 text-xs font-black text-violet-700 dark:text-violet-300  backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            <span>5 {isVi ? "Trụ Cột Năng Lực" : "Competency Pillars"}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border  bg-amber-500/10 px-3 py-1.5 text-xs font-black text-amber-700 dark:text-amber-300  backdrop-blur-md">
            <Star size={13} className="text-amber-500 fill-amber-500" />
            <span>
              {isVi
                ? `Thế mạnh: ${topPillar?.shortLabelVi || "CX"} (${topPillar?.A || 98}%)`
                : `Top: ${topPillar?.shortLabelEn || "CX"} (${topPillar?.A || 98}%)`}
            </span>
          </div>
        </div>
      }
    >
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-start justify-start gap-6 text-left bg-transparent">
        <div className="w-full space-y-6 bg-transparent">
          <div className="group magic-card relative w-full space-y-5 overflow-hidden rounded-[15px] border  bg-[var(--card)] p-5 sm:p-6 lg:p-7  backdrop-blur-2xl transition-all duration-300 sub-card with-ripple">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15" />
            <div className="relative z-10 flex flex-col gap-4 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border  bg-violet-500/50 text-white  backdrop-blur-md transition-all duration-300">
                  <BarChart2 size={22} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black tracking-tight text-[var(--text-primary)] sm:text-lg">
                      {isVi ? "Biểu Đồ Radar Đa Chiều Năng Lực" : "Multidimensional Skills Radar Chart"}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
                    {isVi ? "Phân tích trực quan mức độ thành thạo và cân bằng giữa 5 trụ cột năng lực" : "Visual analysis of competency balance and mastery across 5 core pillars"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <div className="flex items-center gap-2 rounded-full border  bg-violet-500/50 px-3.5 py-1.5 text-xs font-black text-white  backdrop-blur-md">
                  <Activity size={14} className="text-white" />
                  <span className="text-[11px] font-bold text-white/90">{isVi ? "Điểm TB:" : "Overall Avg:"}</span>
                  <span className="text-sm font-black text-white">{overallAvgScore}%</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="relative flex w-full min-w-0 flex-col items-center justify-center lg:col-span-7 py-2">
                <SkillsInteractiveRadar
                  data={dynamicRadarData}
                  hoveredCategory={hoveredCategory}
                  onHoverCategory={setHoveredCategory}
                  isVi={isVi}
                  overallAvg={overallAvgScore}
                />
              </div>

              <div className="flex flex-col gap-2.5 lg:col-span-5">
                <div className="flex items-center justify-between px-1 pb-1">
                  <span className="text-[11px] font-black tracking-wider text-[var(--muted)] uppercase">{isVi ? "Chi tiết 5 Trụ cột Năng lực" : "5 Core Competency Pillars"}</span>
                </div>
                {dynamicRadarData.map((item, idx) => {
                  const IconComp = item.icon;
                  const isHovered = hoveredCategory === item.id;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredCategory(item.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      onClick={() => { playUiSound("click"); setSelectedPillarId(item.id); }}
                      className={cn(
                        "group/pillar relative flex flex-col justify-between overflow-hidden rounded-xl border p-3 transition-all duration-200 cursor-pointer",
                        isHovered ? " bg-[var(--surface)]" : " bg-[var(--surface)]/50 hover:bg-[var(--surface)]"
                      )}
                    >
                      <div className={cn("absolute left-0 top-0 bottom-0 w-1 transition-all duration-200", isHovered ? "opacity-100" : "opacity-0")} style={{ backgroundColor: item.color }} />
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${item.color}18`, color: item.color }}>
                            <IconComp size={15} />
                          </div>
                          <h4 className="truncate text-xs font-extrabold text-[var(--text-primary)]">{isVi ? item.titleVi : item.titleEn}</h4>
                        </div>
                        <span className="rounded-md px-2 py-0.5 text-xs font-black" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.A}%</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: item.color }} initial={{ width: "0%" }} whileInView={{ width: `${item.A}%` }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: idx * 0.08 }} />
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {item.tags?.map((tag, tIdx) => (
                          <span key={tIdx} className="rounded px-1.5 py-0.5 text-[9px] font-bold text-[var(--muted)] bg-[var(--card)] border ">{tag}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 mt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border  bg-gradient-to-r from-violet-500/5 via-[var(--surface)] to-indigo-500/5 p-3.5 text-xs font-medium text-[var(--text-secondary)]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-600 dark:text-violet-400"><Award size={16} /></div>
                <p className="m-0 leading-relaxed text-left text-xs font-semibold text-[var(--text-primary)]">
                  {isVi ? "✨ Đánh giá tổng hợp: Năng lực cân bằng cao giữa kỹ năng công nghệ (CRM/Data/AI) và quản trị lãnh đạo quy mô lớn." : "✨ Summary Assessment: Highly balanced competency across tech/systems (CRM/Data/AI) and large-scale leadership governance."}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold text-violet-600 dark:text-violet-400"><ShieldCheck size={14} /><span>{isVi ? "Chuẩn hóa 100%" : "100% Standardized"}</span></div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPillarId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="relative w-full overflow-y-auto bg-[var(--bg)] p-2 sm:p-6 popup-card-80 custom-scrollbar max-w-4xl">
              <button onClick={() => { playUiSound("click"); setSelectedPillarId(null); }} className="absolute top-4 right-4 z-50 cursor-pointer rounded-full bg-rose-500/10 text-rose-500 p-2 transition-all hover:bg-rose-500 hover:text-white"><X size={20} /></button>
              <div className="mt-8 relative z-10 w-full mx-auto">
                {selectedPillarId === "professional" && (
                  <div className="group magic-card relative space-y-5 overflow-hidden rounded-[15px] border  bg-[var(--card)] p-6  backdrop-blur-2xl">
                    <div className="pointer-events-none absolute -right-6 -bottom-6 z-0 text-[#007aff] opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.20] dark:opacity-[0.14]"><Database size={180} /></div>
                    <div className="relative z-10 flex flex-col items-start gap-3 pb-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border  bg-[#007aff]/50 text-white  backdrop-blur-md"><Database size={18} className="shrink-0 text-white" /></div>
                        <h3 className="text-base font-black tracking-wide text-[#007aff] sm:text-lg">1. {isVi ? "Kỹ năng chuyên môn" : "1. Professional skills"}</h3>
                      </div>
                      <p className="pl-12 text-xs font-medium text-[var(--muted)] text-left">{isVi ? "Chi tiết các bộ kỹ năng chuyên môn, công cụ CRM/BI & quy trình SOPs" : "Detailed professional skill sets, CRM/BI tools & SOPs"}</p>
                    </div>
                    <div className="relative z-10 grid grid-cols-1 gap-3.5">
                      {contentData.skills.professional.map((item, idx) => (<SkillFlipCard key={idx} skill={item} color="#007aff" isVi={isVi} index={idx} />))}
                    </div>
                  </div>
                )}
                {selectedPillarId === "innovation" && (
                  <div className="group magic-card relative space-y-5 overflow-hidden rounded-[15px] border  bg-[var(--card)] p-6  backdrop-blur-2xl">
                    <div className="pointer-events-none absolute -right-6 -bottom-6 z-0 text-[#ff9500] opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.20] dark:opacity-[0.14]"><Sparkles size={180} /></div>
                    <div className="relative z-10 flex flex-col items-start gap-3 pb-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border  bg-[#ff9500]/50 text-white  backdrop-blur-md"><Sparkles size={18} className="shrink-0 text-white" /></div>
                        <h3 className="text-base font-black tracking-wide text-[#ff9500] sm:text-lg">2. {isVi ? "Kỹ năng đổi mới & số hóa" : "2. Innovation & Digital Transformation"}</h3>
                      </div>
                      <p className="pl-12 text-xs font-medium text-[var(--muted)] text-left">{isVi ? "Tự động hóa quy trình (AI Chatbot, Zapier/n8n), Kaizen & quản trị BCP" : "Process automation (AI, Zapier/n8n), Kaizen & BCP governance"}</p>
                    </div>
                    <div className="relative z-10 grid grid-cols-1 gap-3.5">
                      {contentData.skills.innovation.map((item, idx) => (<SkillFlipCard key={idx} skill={item} color="#ff9500" isVi={isVi} index={idx} />))}
                    </div>
                  </div>
                )}
                {selectedPillarId === "leadership" && (
                  <div className="group magic-card relative space-y-5 overflow-hidden rounded-[15px] border  bg-[var(--card)] p-6  backdrop-blur-2xl">
                    <div className="pointer-events-none absolute -right-6 -bottom-6 z-0 text-[#ff3b30] opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.20] dark:opacity-[0.14]"><Users2 size={180} /></div>
                    <div className="relative z-10 flex flex-col items-start gap-3 pb-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border  bg-[#ff3b30]/50 text-white  backdrop-blur-md"><Users2 size={18} className="shrink-0 text-white" /></div>
                        <h3 className="text-base font-black tracking-wide text-[#ff3b30] sm:text-lg">3. {isVi ? "Kỹ năng lãnh đạo & quản trị" : "3. Leadership & management"}</h3>
                      </div>
                      <p className="pl-12 text-xs font-medium text-[var(--muted)] text-left">{isVi ? "Biểu đồ năng lực quản trị quy mô kết hợp các Trụ cột Chứng minh Thực tế" : "Management competency + Leadership Achievement Pillars"}</p>
                    </div>
                    <div className="relative z-10 grid grid-cols-1 gap-4">
                      {[
                        { title: isVi ? "Lãnh đạo Nhân sự" : "Staff Leadership", desc: isVi ? "Xây dựng bộ máy VED (Garena) & MoMo mượt mà" : "Built scalable CS & Contact Center teams", icon: Users2, color: "#ff3b30", score: "92%" },
                        { title: isVi ? "Quản trị KPI & CSAT > 95%" : "KPI & CSAT > 95%", desc: isVi ? "Cam kết SLA > 98%, nâng tầm dịch vụ" : "SLA commitments and quality standards", icon: Gauge, color: "#30d158", score: "95%" },
                        { title: isVi ? "Ứng phó Khủng hoảng BCP" : "BCP Crisis Management", desc: isVi ? "Đảm bảo tổng đài vận hành 24/7 thông suốt" : "Ensured 24/7 uninterrupted operations", icon: ShieldCheck, color: "#007aff", score: "88%" },
                        { title: isVi ? "Đào tạo & Coaching" : "Training & Mentorship", desc: isVi ? "Đào tạo hàng nghìn tư vấn viên chuẩn nghề" : "Trained 1000s of professional agents", icon: GraduationCap, color: "#ff9500", score: "90%" },
                      ].map((pillar, idx) => (
                        <div key={idx} className="group magic-card relative space-y-2 overflow-hidden rounded-xl border  bg-[var(--card)] p-4 text-left transition-all hover:">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <pillar.icon size={16} style={{ color: pillar.color }} className="shrink-0" />
                              <span className="text-[10px] font-black tracking-wider uppercase" style={{ color: pillar.color }}>{pillar.title}</span>
                            </div>
                            <span className="rounded bg-[var(--bg)] px-2 py-0.5 text-xs font-black text-[var(--text-primary)]">{pillar.score}</span>
                          </div>
                          <p className="text-xs leading-snug font-bold text-[var(--text-secondary)]">{pillar.desc}</p>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                            <motion.div className="h-full rounded-full" style={{ backgroundColor: pillar.color }} initial={{ width: "0%" }} whileInView={{ width: pillar.score }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: idx * 0.08 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedPillarId === "collaboration" && (
                  <div className="magic-card group relative space-y-5 overflow-hidden rounded-[15px] border  bg-[var(--card)] p-6  backdrop-blur-2xl">
                    <div className="pointer-events-none absolute -right-6 -bottom-6 z-0 text-[#af52de] opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.20] dark:opacity-[0.14]"><Network size={180} /></div>
                    <div className="relative z-10 flex flex-col items-start gap-3 pb-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border  bg-[#af52de]/50 text-white  backdrop-blur-md"><Network size={18} className="shrink-0 text-white" /></div>
                        <h3 className="text-base font-black tracking-wide text-[#af52de] sm:text-lg">4. {isVi ? "Kỹ năng hợp tác & kết nối" : "4. Cross-functional collaboration"}</h3>
                      </div>
                      <p className="pl-12 text-xs font-medium text-[var(--muted)] text-left">{isVi ? "Sơ đồ mạng lưới tương tác đa chiều giữa CSKH với các khối Technology & Marketing" : "Network nodes between CS, IT, Product, Legal and Marketing"}</p>
                    </div>
                    <div className="relative z-10 grid grid-cols-1 gap-4">
                      {[
                        { department: "IT & Software Dev", impact: isVi ? "Phối hợp phản hồi & sửa lỗi sản phẩm nhanh" : "Bug fixing & feature integration", score: "90%", color: "#007aff", icon: Code },
                        { department: "Product Team", impact: isVi ? "Truyền tải VOC (Ý kiến KH) để cải tiến UX" : "Voice of Customer UX enhancements", score: "92%", color: "#30d158", icon: Layers },
                        { department: "Legal & Risk", impact: isVi ? "Chuẩn hóa quy trình tuân thủ & bảo mật" : "Compliance SOPs & security standards", score: "88%", color: "#ff9500", icon: ShieldCheck },
                        { department: "Marketing & PR", impact: isVi ? "Đồng bộ chương trình khuyến mãi & truyền thông" : "Campaign alignment & reputation protection", score: "89%", color: "#af52de", icon: Presentation },
                      ].map((item, idx) => (
                        <div key={idx} className="group magic-card relative space-y-2 overflow-hidden rounded-xl border  bg-[var(--card)] p-4 text-left transition-all hover:">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <item.icon size={16} style={{ color: item.color }} className="shrink-0" />
                              <span className="text-[10px] font-black tracking-wider uppercase" style={{ color: item.color }}>{item.department}</span>
                            </div>
                            <span className="rounded bg-[var(--bg)] px-2 py-0.5 text-xs font-black text-[var(--text-primary)]">{item.score}</span>
                          </div>
                          <p className="text-xs leading-snug font-bold text-[var(--text-secondary)]">{item.impact}</p>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                            <motion.div className="h-full rounded-full" style={{ backgroundColor: item.color }} initial={{ width: "0%" }} whileInView={{ width: item.score }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: idx * 0.08 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedPillarId === "languages" && (
                  <div className="magic-card relative z-10 space-y-5 rounded-[15px] border  bg-[var(--card)] p-6  backdrop-blur-2xl">
                    <div className="flex flex-col items-start gap-3 pb-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border  bg-[#34c759]/50 text-white  backdrop-blur-md"><Globe size={18} className="shrink-0 text-white" /></div>
                        <h3 className="text-base font-black tracking-wide text-[var(--text-primary)] sm:text-lg">5. {isVi ? "Kỹ năng ngôn ngữ" : "5. Language proficiency"}</h3>
                      </div>
                      <p className="pl-12 text-xs font-medium text-[var(--muted)] text-left">{isVi ? "Biểu đồ trình độ theo chuẩn quốc tế (Nghe, Nói, Đọc, Viết) trong môi trường chuyên nghiệp" : "Circular Dial Rings for Native Vietnamese & Professional Working English"}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="flex items-center justify-between gap-4 rounded-xl border  bg-gradient-to-br from-[#34c759]/10 via-[var(--card)] to-[#34c759]/5 p-5">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#34c759]" /><h4 className="text-base font-black text-[var(--text-primary)]">{isVi ? "Tiếng Việt (Native Speaker)" : "Vietnamese (Native)"}</h4></div>
                          <p className="text-xs font-medium text-[var(--muted)]">{isVi ? "Ngôn ngữ mẹ đẻ, thuyết trình, soạn thảo văn bản pháp lý & báo cáo cấp cao" : "Native fluency for executive presentations and formal reports"}</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">{["Thuyết trình", "Soạn SOPs", "Đào tạo", "Đàm phán"].map((t, idx) => (<span key={idx} className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{t}</span>))}</div>
                        </div>
                        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full text-center "><span className="text-xl font-black text-[var(--text-primary)]">100%</span><span className="text-[9px] font-bold text-[var(--muted)] uppercase">{isVi ? "Mẹ Đẻ" : "Native"}</span></div>
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded-xl border  bg-gradient-to-br from-[#007aff]/10 via-[var(--card)] to-[#007aff]/5 p-5">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#007aff]" /><h4 className="text-base font-black text-[var(--text-primary)]">{isVi ? "Tiếng Anh (Working Professional)" : "English (Working Proficiency)"}</h4></div>
                          <p className="text-xs font-medium text-[var(--muted)]">{isVi ? "Giao tiếp công việc, đọc tài liệu chuyên ngành CRM/AI và trao đổi với đối tác" : "Business communication, reading technical CRM & AI docs"}</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">{["Reading Docs", "Business Email", "System Tools", "Giao tiếp"].map((t, idx) => (<span key={idx} className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">{t}</span>))}</div>
                        </div>
                        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full text-center "><span className="text-xl font-black text-[var(--text-primary)]">60%</span><span className="text-[9px] font-bold text-[var(--muted)] uppercase">{isVi ? "Khá" : "Working"}</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeSkillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="magic-card relative w-[80vw] max-w-[80vw] space-y-4 rounded-[15px]   bg-[var(--card)] p-6 text-left  backdrop-blur-2xl">
              <button onClick={() => { playUiSound("click"); setActiveSkillModal(null); }} className="absolute top-4 right-4 cursor-pointer rounded-full bg-[var(--bg)] p-2 transition-all hover:bg-rose-500 hover:text-white"><X size={16} /></button>
              <div className="flex items-center gap-3 pr-8">
                <div className="rounded-xl border  bg-purple-500/15 p-3 text-[#5e5ce6] dark:text-[#5e5ce6]"><Brain size={24} /></div>
                <div>
                  <h3 className="text-lg font-black text-[var(--text-primary)]">{activeSkillModal.name}</h3>
                  <span className="rounded-full border  bg-purple-500/10 px-2.5 py-0.5 text-xs font-black text-[#5e5ce6] dark:text-[#5e5ce6]">{isVi ? `Mức độ thuần thục: ${activeSkillModal.level}%` : `Mastery level: ${activeSkillModal.level}%`}</span>
                </div>
              </div>
              {SKILL_DETAILS_MAP[activeSkillModal.name] ? (
                <div className="space-y-3.5 pt-2 text-xs">
                  <div className="space-y-1 rounded-xl border  dark: bg-purple-50/70 dark:bg-purple-950/10 p-3">
                    <span className="text-[10px] font-extrabold text-purple-700 dark:text-purple-300 uppercase">{isVi ? "Mô tả năng lực:" : "Capability description:"}</span>
                    <p className="m-0 text-justify text-[11.5px] leading-relaxed font-semibold text-slate-800 dark:text-slate-200">{SKILL_DETAILS_MAP[activeSkillModal.name].desc}</p>
                  </div>
                  <div className="space-y-1 rounded-xl border  dark: bg-indigo-50/70 dark:bg-indigo-950/10 p-3">
                    <span className="text-[10px] font-extrabold text-indigo-700 dark:text-indigo-300 uppercase">{isVi ? "Ứng dụng thực tế & dự án:" : "Practical cases & projects:"}</span>
                    <p className="m-0 text-justify text-[11.5px] leading-relaxed font-semibold text-slate-800 dark:text-slate-200">{SKILL_DETAILS_MAP[activeSkillModal.name].application}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[var(--muted)] uppercase">{isVi ? "Công cụ & khung chuẩn:" : "Tools & framework standards:"}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILL_DETAILS_MAP[activeSkillModal.name].tools.map((t, idx) => (
                        <span key={idx} className="rounded-lg border  bg-[#5e5ce6]/10 px-2.5 py-1 text-[11px] font-black text-[#5e5ce6]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-[var(--bg)] p-4 text-justify text-xs leading-relaxed font-medium text-[var(--muted)]">
                  {isVi ? "Kỹ năng chuyên môn được tích lũy qua hơn 22 năm quản trị vận hành Chăm sóc Khách hàng tại Mobifone, VED (Shopee/Garena), Prudential, MoMo và Finviet." : "Specialized skill acquired through over 22 years of executive Customer Experience operations at Mobifone, VED (Shopee/Garena), Prudential, MoMo, and Finviet."}
                </div>
              )}
              <div className="flex justify-end pt-3">
                <button onClick={() => { playUiSound("click"); setActiveSkillModal(null); }} className="cursor-pointer rounded-xl bg-[#5e5ce6] px-4 py-2 text-xs font-black text-white  transition-all hover:bg-[#5e5ce6]/90">{isVi ? "Đóng cửa sổ" : "Close window"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}

export default Systems;
