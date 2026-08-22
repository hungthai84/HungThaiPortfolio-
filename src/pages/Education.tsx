import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Code,
  PieChart,
  ShieldAlert,
  ListChecks,
  UserCog,
  Users,
  Presentation,
  MessagesSquare,
  Headset,
  Network,
  Server,
  Building2,
  Calendar,
  Award,
  Briefcase,
  ListFilter,
  BookOpen,
  Filter,
} from "lucide-react";
import { contentData } from "../data";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import {
  BookEducationCard,
  EduItemDetails,
} from "../components/education/BookEducationCard";
import {
  CertificateLightbox,
  CertificateData,
} from "../components/education/CertificateLightbox";

const iconMap: Record<string, React.ElementType> = {
  Code,
  PieChart,
  ShieldAlert,
  ListChecks,
  UserCog,
  Users,
  Presentation,
  MessagesSquare,
  GraduationCap,
  Headset,
  Network,
  Server,
  Building2,
  Calendar,
  Award,
  Briefcase,
};

const CARD_COLOR_PALETTES = [
  {
    border: "",
    bg: "bg-transparent",
    text: "text-amber-800 dark:text-amber-200",
    titleColor: "text-amber-900 dark:text-amber-100",
    shadow: "",
    accentHex: "#D97706",
  },
  {
    border: "",
    bg: "bg-transparent",
    text: "text-indigo-800 dark:text-indigo-200",
    titleColor: "text-indigo-900 dark:text-indigo-100",
    shadow: "",
    accentHex: "#4F46E5",
  },
  {
    border: "",
    bg: "bg-transparent",
    text: "text-pink-800 dark:text-pink-200",
    titleColor: "text-pink-900 dark:text-pink-100",
    shadow: "",
    accentHex: "#DB2777",
  },
  {
    border: "",
    bg: "bg-transparent",
    text: "text-sky-800 dark:text-sky-200",
    titleColor: "text-sky-900 dark:text-sky-100",
    shadow: "",
    accentHex: "#0284C7",
  },
  {
    border: "",
    bg: "bg-transparent",
    text: "text-emerald-800 dark:text-emerald-200",
    titleColor: "text-emerald-900 dark:text-emerald-100",
    shadow: "",
    accentHex: "#059669",
  },
  {
    border: "",
    bg: "bg-transparent",
    text: "text-purple-800 dark:text-purple-200",
    titleColor: "text-purple-900 dark:text-purple-100",
    shadow: "",
    accentHex: "#9333EA",
  },
  {
    border: "",
    bg: "bg-transparent",
    text: "text-rose-800 dark:text-rose-200",
    titleColor: "text-rose-900 dark:text-rose-100",
    shadow: "",
    accentHex: "#E11D48",
  },
  {
    border: "",
    bg: "bg-transparent",
    text: "text-teal-800 dark:text-teal-200",
    titleColor: "text-teal-900 dark:text-teal-100",
    shadow: "",
    accentHex: "#0D9488",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

const EDU_METADATA_MAP: Record<
  string,
  {
    tags: string[];
    learnedVi: string[];
    learnedEn: string[];
    resultsVi: { text: string; highlights: string[] }[];
    resultsEn: { text: string; highlights: string[] }[];
    certImg: string;
    credentialId: string;
  }
> = {
  "Phân tích dữ liệu": {
    tags: [
      "#BigData",
      "#DataAnalytics",
      "#DataDriven",
      "#KPI",
      "#Dashboard",
      "#BusinessIntelligence",
      "#CustomerAnalytics",
    ],
    learnedVi: [
      "Khái niệm và kiến trúc Big Data.",
      "Thu thập, tổ chức và xử lý dữ liệu với khối lượng lớn.",
      "Làm sạch và chuẩn hóa dữ liệu.",
      "Phân tích dữ liệu phục vụ quản trị.",
      "Phân tích xu hướng và hành vi khách hàng.",
      "Trực quan hóa dữ liệu.",
      "Xây dựng báo cáo quản trị.",
      "Xây dựng hệ thống KPI và Dashboard.",
      "Phân tích chỉ số hiệu suất hoạt động.",
      "Sử dụng dữ liệu để hỗ trợ dự báo và ra quyết định.",
      "Chuyển đổi dữ liệu thô thành thông tin có giá trị cho doanh nghiệp.",
    ],
    learnedEn: [
      "Big Data principles and data pipeline concepts.",
      "Data ingestion, cleaning, and normalization techniques.",
      "Customer analytics and operational trend modeling.",
      "Data visualization, executive dashboards, and KPI tracking.",
      "Data-Driven decision making frameworks for executives.",
    ],
    resultsVi: [
      {
        text: "Tiếp cận vấn đề quản trị dựa trên dữ liệu thay vì chỉ dựa vào cảm tính.",
        highlights: ["Quản trị dựa trên dữ liệu"],
      },
      {
        text: "Xây dựng hệ thống báo cáo, KPI và Dashboard phục vụ quản lý.",
        highlights: ["Hệ thống báo cáo", "KPI", "Dashboard"],
      },
      {
        text: "Phân tích dữ liệu vận hành và dữ liệu khách hàng để tìm ra xu hướng.",
        highlights: ["Dữ liệu vận hành", "Dữ liệu khách hàng"],
      },
      {
        text: "Hỗ trợ nhà quản lý xác định vấn đề, nguyên nhân và cơ hội cải tiến.",
        highlights: ["Xác định vấn đề", "Cơ hội cải tiến"],
      },
      {
        text: "Hình thành tư duy Data-Driven Management trong quản trị doanh nghiệp.",
        highlights: ["Data-Driven Management"],
      },
    ],
    resultsEn: [
      {
        text: "Apply factual data-driven governance to management operations.",
        highlights: ["Data-Driven"],
      },
      {
        text: "Analyze complex customer and operational data pipelines.",
        highlights: ["Customer Data"],
      },
      {
        text: "Build interactive KPI reports and real-time management dashboards.",
        highlights: ["KPI Dashboards"],
      },
      {
        text: "Spot underlying operational bottlenecks and improvement opportunities.",
        highlights: ["Spot Bottlenecks"],
      },
      {
        text: "Embed data-driven decision frameworks across all leadership tiers.",
        highlights: ["Leadership Framework"],
      },
    ],
    certImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    credentialId: "DATA-BD-2019-088",
  },
  "Quản lý rủi ro": {
    tags: [
      "#RiskManagement",
      "#RiskAssessment",
      "#RiskMatrix",
      "#RiskControl",
      "#RiskPrevention",
      "#OperationalRisk",
    ],
    learnedVi: [
      "Nhận diện rủi rỏ trong hoạt động và dự án.",
      "Phân loại rủi rỏ theo mức độ ảnh hưởng.",
      "Đánh giá khả năng xảy ra và mức độ tác động.",
      "Xây dựng Risk Matrix.",
      "Xác định nguyên nhân và điểm kiểm soát.",
      "Xây dựng phương án phòng ngừa.",
      "Xây dựng kế hoạch ứng phó khi rủi ro xảy ra.",
      "Theo dõi và kiểm soát rủi ro trong quá trình vận hành.",
      "Đánh giá hiệu quả của các biện pháp kiểm soát.",
    ],
    learnedEn: [
      "Risk identification across daily operations and key projects.",
      "Risk classification and impact severity assessment.",
      "Risk Matrix formulation and critical control point tracking.",
      "Root cause analysis and preventive measures design.",
      "Contingency response planning and risk monitoring.",
      "Evaluating effectiveness of internal risk controls.",
    ],
    resultsVi: [
      {
        text: "Chủ động nhận diện rủi ro trước khi trở thành sự cố.",
        highlights: ["Chủ động nhận diện"],
      },
      {
        text: "Xây dựng phương án phòng ngừa và xử lý rủi ro.",
        highlights: ["Phương án phòng ngừa"],
      },
      {
        text: "Giảm thiểu tác động của sự cố đến khách hàng và hoạt động doanh nghiệp.",
        highlights: ["Giảm thiểu tác động"],
      },
      {
        text: "Tăng khả năng kiểm soát chất lượng và tính ổn định của dự án/vận hành.",
        highlights: ["Kiểm soát chất lượng"],
      },
      {
        text: "Hình thành tư duy quản trị theo hướng phòng ngừa thay vì chỉ xử lý sự cố.",
        highlights: ["Tư duy phòng ngừa"],
      },
    ],
    resultsEn: [
      {
        text: "Proactively identify risk vectors prior to operational failures.",
        highlights: ["Proactive Identification"],
      },
      {
        text: "Formulate robust prevention blueprints and crisis response guides.",
        highlights: ["Response Guides"],
      },
      {
        text: "Minimize operational disruption and protect customer SLAs.",
        highlights: ["Protect SLAs"],
      },
      {
        text: "Establish a preventive risk control culture across departments.",
        highlights: ["Preventive Culture"],
      },
    ],
    certImg: "https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png",
    credentialId: "PRU-RM-2017-104",
  },
  "Quản lý Dự án": {
    tags: [
      "#ProjectManagement",
      "#ProjectPlanning",
      "#RiskManagement",
      "#PMO",
      "#StakeholderManagement",
      "#CRM",
      "#DigitalTransformation",
    ],
    learnedVi: [
      "Xác định mục tiêu và phạm vi dự án.",
      "Lập kế hoạch triển khai.",
      "Xây dựng timeline và milestone.",
      "Phân bổ nguồn lực.",
      "Quản lý nhân sự tham gia dự án.",
      "Quản lý ngân sách và chi phí.",
      "Quản lý chất lượng.",
      "Quản lý rủi ro.",
      "Theo dõi tiến độ và xử lý vấn đề phát sinh.",
      "Phối hợp các phòng ban và stakeholder.",
      "Đánh giá kết quả sau khi hoàn thành dự án.",
    ],
    learnedEn: [
      "Defining project scope, objectives, and deliverables.",
      "Drafting timelines, critical milestones, and execution schedules.",
      "Resource allocation, budget tracking, and cost control.",
      "Quality assurance, risk control, and milestone monitoring.",
      "Cross-department coordination and stakeholder management.",
      "Post-project evaluation and audit reviews.",
    ],
    resultsVi: [
      {
        text: "Lập và điều phối kế hoạch dự án.",
        highlights: ["Điều phối kế hoạch"],
      },
      {
        text: "Kiểm soát Scope – Time – Cost – Quality – Risk.",
        highlights: ["Scope", "Time", "Cost", "Quality", "Risk"],
      },
      {
        text: "Nâng cao năng lực phối hợp đa phòng ban.",
        highlights: ["Phối hợp đa phòng ban"],
      },
      {
        text: "Theo dõi tiến độ và xử lý vấn đề phát sinh.",
        highlights: ["Theo dõi tiến độ"],
      },
      {
        text: "Tạo nền tảng triển khai các dự án CSKH, CRM, Contact Center và chuyển đổi số.",
        highlights: ["Dự án CSKH", "CRM", "Chuyển đổi số"],
      },
    ],
    resultsEn: [
      {
        text: "Lead and execute complex multi-tier project plans.",
        highlights: ["Execute Plans"],
      },
      {
        text: "Strict control over Scope, Time, Cost, Quality, and Risk parameters.",
        highlights: ["Scope & Budget"],
      },
      {
        text: "Enhance cross-departmental collaboration and communication.",
        highlights: ["Collaboration"],
      },
      {
        text: "Establish a solid baseline for CS, CRM, and digital transformation initiatives.",
        highlights: ["Digital Transformation"],
      },
    ],
    certImg: "https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png",
    credentialId: "PRU-PM-2016-042",
  },
  "Quản lý cấp cao": {
    tags: [
      "#SeniorManagement",
      "#Leadership",
      "#StrategicManagement",
      "#ChangeManagement",
      "#DecisionMaking",
      "#TeamLeadership",
    ],
    learnedVi: [
      "Tư duy lãnh đạo cấp cao.",
      "Quản trị chiến lược.",
      "Xây dựng tầm nhìn và mục tiêu.",
      "Ra quyết định trong quản trị.",
      "Xây dựng và phát triển đội ngũ.",
      "Tạo động lực cho nhân viên.",
      "Quản trị thay đổi.",
      "Giao tiếp và tạo ảnh hưởng.",
      "Giải quyết xung đột.",
      "Phát triển văn hóa tổ chức.",
      "Đánh giá hiệu quả đội ngũ.",
    ],
    learnedEn: [
      "Executive leadership philosophy and strategic management.",
      "Vision casting, target setting, and high-stakes decision making.",
      "Talent development, motivation, and empowerment.",
      "Change management, strategic influence, and communication.",
      "Conflict resolution and organizational culture building.",
    ],
    resultsVi: [
      {
        text: "Nâng cao năng lực lãnh đạo và điều hành.",
        highlights: ["Năng lực lãnh đạo"],
      },
      {
        text: "Xây dựng định hướng và mục tiêu cho đội ngũ.",
        highlights: ["Xây dựng định hướng"],
      },
      {
        text: "Phát triển tư duy từ quản lý công việc → quản trị con người → quản trị chiến lược.",
        highlights: ["Quản trị chiến lược"],
      },
      {
        text: "Nâng cao khả năng ra quyết định và xử lý vấn đề phức tạp.",
        highlights: ["Ra quyết định"],
      },
      {
        text: "Có nền tảng quản lý các bộ phận CSKH/Contact Center quy mô lớn.",
        highlights: ["Quản lý quy mô lớn"],
      },
    ],
    resultsEn: [
      {
        text: "Elevate executive leadership and operational governance prowess.",
        highlights: ["Executive Governance"],
      },
      {
        text: "Develop long-term strategic management mindsets.",
        highlights: ["Strategic Mindset"],
      },
      {
        text: "Enhance decisive problem-solving under complex conditions.",
        highlights: ["Decisive Problem-Solving"],
      },
      {
        text: "Build capabilities to direct large-scale CS and business units.",
        highlights: ["Large-scale Units"],
      },
    ],
    certImg: "https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png",
    credentialId: "VED-EXEC-2015-992",
  },
  "Quản lý cấp trung": {
    tags: [
      "#MiddleManagement",
      "#TeamManagement",
      "#Coaching",
      "#Mentoring",
      "#KPI",
      "#Leadership",
      "#PeopleManagement",
    ],
    learnedVi: [
      "Quản lý và phân công công việc.",
      "Lập kế hoạch công việc cho đội nhóm.",
      "Giám sát tiến độ.",
      "Đánh giá hiệu suất nhân viên.",
      "Coaching và mentoring.",
      "Đào tạo nhân viên.",
      "Giao tiếp trong quản lý.",
      "Giải quyết xung đột.",
      "Phối hợp liên phòng ban.",
      "Xây dựng tinh thần làm việc nhóm.",
    ],
    learnedEn: [
      "Team task allocation, scheduling, and delegation.",
      "Work planning and SLA timeline supervision.",
      "Employee performance evaluation and KPI tracking.",
      "Coaching, mentoring, and staff skill development.",
      "Managerial communication and conflict resolution.",
    ],
    resultsVi: [
      {
        text: "Tổ chức và điều hành đội nhóm.",
        highlights: ["Tổ chức", "Điều hành đội nhóm"],
      },
      {
        text: "Phân công công việc phù hợp với năng lực từng nhân sự.",
        highlights: ["Phân công công việc"],
      },
      { text: "Thiết lập và theo dõi KPI.", highlights: ["Thiết lập KPI"] },
      {
        text: "Phát triển nhân viên thông qua coaching và đào tạo.",
        highlights: ["Coaching", "Đào tạo"],
      },
      {
        text: "Nâng cao hiệu suất và tính chủ động của đội ngũ.",
        highlights: ["Nâng cao hiệu suất"],
      },
    ],
    resultsEn: [
      {
        text: "Organize and lead high-performing operational teams.",
        highlights: ["High-Performing Teams"],
      },
      {
        text: "Optimize workforce task distribution and SLA oversight.",
        highlights: ["SLA Oversight"],
      },
      {
        text: "Establish actionable numeric KPI frameworks.",
        highlights: ["KPI Frameworks"],
      },
      {
        text: "Upskill employees through targeted coaching and mentoring.",
        highlights: ["Coaching"],
      },
    ],
    certImg: "https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png",
    credentialId: "VED-MID-2014-551",
  },
  "Đào tạo Thuyết trình": {
    tags: [
      "#Training",
      "#Presentation",
      "#Trainer",
      "#PublicSpeaking",
      "#LearningDevelopment",
      "#CustomerServiceTraining",
    ],
    learnedVi: [
      "Phân tích nhu cầu đào tạo.",
      "Xây dựng mục tiêu đào tạo.",
      "Thiết kế chương trình và giáo trình.",
      "Xây dựng nội dung bài giảng.",
      "Kỹ thuật trình bày.",
      "Kỹ thuật thuyết trình trước nhóm đông người.",
      "Phương pháp truyền đạt kiến thức.",
      "Tương tác và xử lý câu hỏi.",
      "Đánh giá hiệu quả sau đào tạo.",
    ],
    learnedEn: [
      "Training Needs Analysis (TNA) for teams.",
      "Setting learning objectives and curriculum design.",
      "Developing training manuals, slides, and exercises.",
      "Facilitation, interactive engagement, and instruction.",
      "Post-training skill audit and evaluation.",
    ],
    resultsVi: [
      {
        text: "Xây dựng và triển khai chương trình đào tạo nội bộ.",
        highlights: ["Chương trình đào tạo"],
      },
      {
        text: "Đào tạo nghiệp vụ CSKH và kỹ năng dịch vụ.",
        highlights: ["Đào tạo nghiệp vụ CSKH"],
      },
      {
        text: "Nâng cao khả năng thuyết trình và truyền đạt kiến thức.",
        highlights: ["Khả năng thuyết trình"],
      },
      {
        text: "Chuyển đổi kinh nghiệm thực tế thành quy trình, tài liệu và chương trình đào tạo.",
        highlights: ["Chuyển đổi kinh nghiệm"],
      },
    ],
    resultsEn: [
      {
        text: "Build and execute effective internal training academies.",
        highlights: ["Internal Academies"],
      },
      {
        text: "Transform operational experience into structured training courses.",
        highlights: ["Structured Courses"],
      },
      {
        text: "Upskill call center agents in customer service protocols.",
        highlights: ["Upskill Agents"],
      },
      {
        text: "Drive continuous team competency and career development.",
        highlights: ["Career Development"],
      },
    ],
    certImg: "https://i.ibb.co/TDD9zdST/o-t-o-Thuy-t-tr-nh.png",
    credentialId: "VNW-TRN-2013-118",
  },
  "Kỹ năng Phỏng vấn": {
    tags: [
      "#Interview",
      "#Recruitment",
      "#Hiring",
      "#TalentAcquisition",
      "#CandidateAssessment",
      "#PeopleManagement",
    ],
    learnedVi: [
      "Quy trình tuyển dụng.",
      "Phân tích nhu cầu nhân sự.",
      "Xây dựng tiêu chí tuyển dụng.",
      "Xây dựng câu hỏi phỏng vấn.",
      "Kỹ thuật phỏng vấn ứng viên.",
      "Đánh giá năng lực.",
      "Đánh giá thái độ và mức độ phù hợp.",
      "Nhận diện điểm mạnh và điểm cần cải thiện.",
      "Lựa chọn ứng viên theo yêu cầu công việc.",
    ],
    learnedEn: [
      "End-to-end professional recruitment processes.",
      "Formulating competency frameworks and interview scorecards.",
      "Interviewing techniques and skill audits.",
      "Evaluating cultural fit, attitude, and long-term potential.",
    ],
    resultsVi: [
      {
        text: "Nâng cao khả năng tham gia tuyển dụng và lựa chọn nhân sự.",
        highlights: ["Lựa chọn nhân sự"],
      },
      {
        text: "Đánh giá ứng viên theo năng lực – thái độ – mức độ phù hợp.",
        highlights: ["Đánh giá ứng viên"],
      },
      {
        text: "Hỗ trợ xây dựng đội ngũ CSKH phù hợp với yêu cầu vận hành.",
        highlights: ["Đội ngũ CSKH"],
      },
      {
        text: "Tăng khả năng đúng người – đúng vị trí – đúng năng lực.",
        highlights: ["Đúng người đúng vị trí"],
      },
    ],
    resultsEn: [
      {
        text: "Elevate recruitment precision and talent acquisition velocity.",
        highlights: ["Recruitment Velocity"],
      },
      {
        text: "Audit candidates accurately using skill and attitude rubrics.",
        highlights: ["Candidate Auditing"],
      },
      {
        text: "Ensure high cultural and operational role compatibility.",
        highlights: ["Role Compatibility"],
      },
      {
        text: "Optimize talent placement to maximize team retention rates.",
        highlights: ["Talent Placement"],
      },
    ],
    certImg: "https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png",
    credentialId: "VNW-INT-2013-302",
  },
  "Cử nhân CNTT": {
    tags: [
      "#IT",
      "#InformationTechnology",
      "#SoftwareDevelopment",
      "#Database",
      "#SystemAnalysis",
      "#Technology",
    ],
    learnedVi: [
      "Lập trình.",
      "Cấu trúc dữ liệu và thuật toán.",
      "Cơ sở dữ liệu.",
      "Phân tích và thiết kế hệ thống.",
      "Hệ điều hành.",
      "Mạng máy tính.",
      "Công nghệ phần mềm.",
      "Phát triển ứng dụng.",
      "Thiết kế và xây dựng hệ thống thông tin.",
      "Kiến thức nền tảng về CNTT.",
    ],
    learnedEn: [
      "Software programming paradigms and data structures.",
      "Relational Database Management Systems (RDBMS) and SQL.",
      "Enterprise information system analysis and architecture.",
      "Computer networking, operating systems, and software engineering.",
      "Full lifecycle application design and engineering.",
    ],
    resultsVi: [
      {
        text: "Xây dựng nền tảng tư duy công nghệ và lập trình.",
        highlights: ["Tư duy công nghệ"],
      },
      {
        text: "Phân tích yêu cầu và tư duy theo hệ thống.",
        highlights: ["Tư duy hệ thống"],
      },
      {
        text: "Hiểu thiết kế cơ sở dữ liệu và hệ thống phần mềm.",
        highlights: ["Cơ sở dữ liệu"],
      },
      {
        text: "Trao đổi hiệu quả với đội ngũ IT và nhà cung cấp công nghệ.",
        highlights: ["Trao đổi bộ phận IT"],
      },
      {
        text: "Tạo nền tảng kết nối CSKH + Quản trị + Công nghệ.",
        highlights: ["CSKH", "Quản trị", "Công nghệ"],
      },
    ],
    resultsEn: [
      {
        text: "Build a strong computer science baseline for tech decisions.",
        highlights: ["Computer Science"],
      },
      {
        text: "Analyze operational needs with structured software engineering logic.",
        highlights: ["Software Engineering"],
      },
      {
        text: "Master relational database architecture and system design.",
        highlights: ["Database Architecture"],
      },
      {
        text: "Bridge communication gaps between technical teams and management.",
        highlights: ["Tech-Biz Bridge"],
      },
      {
        text: "Pave the way for leading CRM, Call Center, and administrative tools.",
        highlights: ["CRM & Call Center"],
      },
    ],
    certImg: "https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png",
    credentialId: "STU-BS-2007-0881",
  },
  "Tổng đài viên": {
    tags: [
      "#ContactCenter",
      "#CallCenter",
      "#CustomerService",
      "#CustomerCare",
      "#CustomerExperience",
      "#Telecom",
    ],
    learnedVi: [
      "Nghiệp vụ Contact Center.",
      "Quy trình tiếp nhận cuộc gọi.",
      "Quy trình chăm sóc khách hàng.",
      "Kỹ năng giao tiếp qua điện thoại.",
      "Kỹ thuật đặt câu hỏi và khai thác nhu cầu.",
      "Kỹ năng lắng nghe và đồng cảm.",
      "Xử lý tình huống khó.",
      "Xử lý khiếu cụ.",
      "Quy trình cung cấp thông tin.",
      "Tiêu chuẩn chất lượng dịch vụ.",
      "Quy trình và tác phong của tổng đài viên.",
    ],
    learnedEn: [
      "Standard MobiFone contact center representative protocols.",
      "Inbound call reception and request handling workflows.",
      "Customer communication, active listening, and empathy.",
      "Needs discovery questioning techniques.",
      "Conflict de-escalation and complaint resolution.",
      "Service Level Agreement (SLA) and Quality Assurance (QA) standards.",
    ],
    resultsVi: [
      {
        text: "Hình thành nền tảng chuyên môn về Contact Center.",
        highlights: ["Contact Center"],
      },
      {
        text: "Xử lý trực tiếp các tình huống với khách hàng.",
        highlights: ["Xử lý tình huống"],
      },
      {
        text: "Phát triển kỹ năng giao tiếp, lắng nghe và giải quyết vấn đề.",
        highlights: ["Giao tiếp", "Lắng nghe", "Giải quyết vấn đề"],
      },
      {
        text: "Đóng góp vào việc duy trì chất lượng dịch vụ của tổng đài.",
        highlights: ["Chất lượng dịch vụ"],
      },
      {
        text: "Tích lũy kinh nghiệm làm việc trong môi trường áp lực cao.",
        highlights: ["Môi trường áp lực cao"],
      },
    ],
    resultsEn: [
      {
        text: "Built solid foundation in telecom Contact Center operations.",
        highlights: ["Contact Center"],
      },
      {
        text: "Directly handled critical customer inquiries and complaints.",
        highlights: ["Handled Complaints"],
      },
      {
        text: "Mastered active listening, empathy, and rapid problem-solving.",
        highlights: ["Active Listening", "Problem-Solving"],
      },
      {
        text: "Consistently adhered to high service quality benchmarks.",
        highlights: ["Quality Benchmarks"],
      },
      {
        text: "Developed resilience and composure under high call volumes.",
        highlights: ["Resilience"],
      },
    ],
    certImg: "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
    credentialId: "MBF-CC-2007-009",
  },
  "Chứng nhận Tổng đài viên": {
    tags: [
      "#ContactCenter",
      "#CallCenter",
      "#CustomerService",
      "#CustomerCare",
      "#CustomerExperience",
      "#Telecom",
    ],
    learnedVi: [
      "Nghiệp vụ Contact Center.",
      "Quy trình tiếp nhận cuộc gọi.",
      "Quy trình chăm sóc khách hàng.",
      "Kỹ năng giao tiếp qua điện thoại.",
      "Kỹ thuật đặt câu hỏi và khai thác nhu cầu.",
      "Kỹ năng lắng nghe và đồng cảm.",
      "Xử lý tình huống khó.",
      "Xử lý khiếu cụ.",
      "Quy trình cung cấp thông tin.",
      "Tiêu chuẩn chất lượng dịch vụ.",
      "Quy trình và tác phong của tổng đài viên.",
    ],
    learnedEn: [
      "Standard MobiFone contact center representative protocols.",
      "Inbound call reception and request handling workflows.",
      "Customer communication, active listening, and empathy.",
      "Needs discovery questioning techniques.",
      "Conflict de-escalation and complaint resolution.",
      "Service Level Agreement (SLA) and Quality Assurance (QA) standards.",
    ],
    resultsVi: [
      {
        text: "Hình thành nền tảng chuyên môn về Contact Center.",
        highlights: ["Contact Center"],
      },
      {
        text: "Xử lý trực tiếp các tình huống với khách hàng.",
        highlights: ["Xử lý tình huống"],
      },
      {
        text: "Phát triển kỹ năng giao tiếp, lắng nghe và giải quyết vấn đề.",
        highlights: ["Kỹ năng giao tiếp"],
      },
      {
        text: "Hiểu sâu hoạt động vận hành Contact Center từ cấp nhân viên.",
        highlights: ["Hoạt động vận hành"],
      },
      {
        text: "Tạo nền tảng phát triển Team Leader → Supervisor → Manager → Head of Customer Service.",
        highlights: ["Phát triển sự nghiệp"],
      },
    ],
    resultsEn: [
      {
        text: "Establish a solid, battle-tested contact center foundation.",
        highlights: ["Contact Center"],
      },
      {
        text: "Directly handle and resolve diverse customer inquiries.",
        highlights: ["Direct Inquiries"],
      },
      {
        text: "Sharpen active listening, tone management, and empathy.",
        highlights: ["Active Listening"],
      },
      {
        text: "Pave the way for climbing into supervisor and manager roles.",
        highlights: ["Managerial Track"],
      },
    ],
    certImg: "https://i.ibb.co/vCwPY7T8/T-ng-i-vi-n-Mofone.png",
    credentialId: "MBF-CC-2007-009",
  },
  "Quản trị mạng CCNA": {
    tags: [
      "#CCNA",
      "#Cisco",
      "#Networking",
      "#NetworkAdministration",
      "#TCPIP",
      "#Routing",
      "#Switching",
    ],
    learnedVi: [
      "Kiến trúc mạng máy tính.",
      "TCP/IP.",
      "Routing.",
      "Switching.",
      "VLAN.",
      "IP Addressing.",
      "Thiết kế và triển khai mạng.",
      "Quản trị thiết bị Cisco.",
      "Troubleshooting hệ thống mạng.",
      "Các nguyên tắc bảo mật mạng.",
    ],
    learnedEn: [
      "Computer networking architectures, OSI, and TCP/IP stack.",
      "IP addressing, subnetting, static/dynamic routing, and switching.",
      "VLAN creation, trunking, and Cisco device configuration.",
      "Network design, physical deployment, and troubleshooting.",
      "Fundamental network security protocols and firewalls.",
    ],
    resultsVi: [
      {
        text: "Hiểu nền tảng hạ tầng mạng doanh nghiệp.",
        highlights: ["Hạ tầng mạng"],
      },
      {
        text: "Hiểu cách thiết kế và vận hành hệ thống mạng.",
        highlights: ["Thiết kế và vận hành"],
      },
      {
        text: "Trao đổi với IT về hạ tầng Contact Center và hệ thống CNTT.",
        highlights: ["Trao đổi bộ phận IT"],
      },
      {
        text: "Phân tích các vấn đề cơ bản liên quan đến kết nối mạng.",
        highlights: ["Kết nối mạng"],
      },
    ],
    resultsEn: [
      {
        text: "Understand enterprise network design and operation.",
        highlights: ["Network Design"],
      },
      {
        text: "Gain solid infrastructure knowledge for business networks.",
        highlights: ["Business Networks"],
      },
      {
        text: "Communicate seamlessly with IT network engineering teams.",
        highlights: ["IT Synergy"],
      },
      {
        text: "Troubleshoot connectivity bottlenecks in operational systems.",
        highlights: ["Troubleshooting"],
      },
    ],
    certImg: "https://i.ibb.co/DPVsnrfj/CCNA.png",
    credentialId: "NN-CCNA-2006-441",
  },
  "Quản trị hệ thống MCSA": {
    tags: [
      "#MCSA",
      "#WindowsServer",
      "#SystemAdministration",
      "#ActiveDirectory",
      "#ServerManagement",
      "#ITInfrastructure",
    ],
    learnedVi: [
      "Windows Server.",
      "Active Directory.",
      "DNS.",
      "DHCP.",
      "Quản lý User và Group.",
      "Quản lý tài nguyên hệ thống.",
      "Chính sách bảo mật.",
      "Phân quyền truy cập.",
      "Quản trị máy chủ.",
      "Sao lưu và phục hồi.",
      "Giám sát và vận hành hạ tầng IT.",
    ],
    learnedEn: [
      "Windows Server administration and server operating systems.",
      "Active Directory Domain Services, DNS, and DHCP configuration.",
      "User and group management, NTFS permissions, and security policies.",
      "Disaster recovery, backup plans, and IT infrastructure monitoring.",
    ],
    resultsVi: [
      {
        text: "Hiểu kiến trúc và nguyên lý vận hành Windows Server.",
        highlights: ["Windows Server"],
      },
      {
        text: "Có kiến thức quản trị hạ tầng CNTT doanh nghiệp.",
        highlights: ["Hạ tầng CNTT"],
      },
      {
        text: "Phối hợp với IT trong triển khai hệ thống ứng dụng.",
        highlights: ["Phối hợp bộ phận IT"],
      },
      {
        text: "Hình thành nền tảng kỹ thuật để hiểu sâu hơn về Contact Center, CRM và các nền tảng doanh nghiệp.",
        highlights: ["Contact Center", "CRM", "Nền tảng kỹ thuật"],
      },
    ],
    resultsEn: [
      {
        text: "Master fundamental server administration principles.",
        highlights: ["Server Administration"],
      },
      {
        text: "Understand Windows Server deployment and domain management.",
        highlights: ["Domain Management"],
      },
      {
        text: "Coordinate effectively with sysadmins during enterprise software rollouts.",
        highlights: ["Software Rollouts"],
      },
      {
        text: "Build a strong technical baseline for Contact Center and CRM infrastructure.",
        highlights: ["Contact Center & CRM"],
      },
    ],
    certImg: "https://i.ibb.co/ZRp6cDRz/MCSA.png",
    credentialId: "NN-MCSA-2005-312",
  },
  "Đào tạo Chuyên sâu": {
    tags: [
      "#Training",
      "#SkillDevelopment",
      "#ProfessionalTraining",
      "#InstructionalDesign",
    ],
    learnedVi: [
      "Phương pháp lập kế hoạch và tổ chức chương trình đào tạo.",
      "Xây dựng nội dung và giáo trình đào tạo chuyên sâu.",
      "Kỹ năng truyền đạt, hướng dẫn và phát triển năng lực nhân sự.",
      "Đánh giá hiệu quả sau đào tạo và cải tiến chương trình.",
    ],
    learnedEn: [
      "Methodologies for planning and organizing professional training.",
      "Curriculum design and specialized training module development.",
      "Facilitation, coaching, and staff capacity building.",
      "Post-training evaluation and continuous curriculum improvement.",
    ],
    resultsVi: [
      {
        text: "Chuẩn hóa quy trình đào tạo nội bộ cho doanh nghiệp.",
        highlights: ["Đào tạo nội bộ"],
      },
      {
        text: "Nâng cao năng lực chuyên môn và tác phong làm việc của đội ngũ.",
        highlights: ["Năng lực chuyên môn"],
      },
      {
        text: "Xây dựng văn hóa học tập và phát triển liên tục trong tổ chức.",
        highlights: ["Văn hóa học tập"],
      },
    ],
    resultsEn: [
      {
        text: "Standardize internal training frameworks for corporate teams.",
        highlights: ["Internal Frameworks"],
      },
      {
        text: "Elevate professional competencies and operational rigor.",
        highlights: ["Competencies"],
      },
      {
        text: "Foster a continuous learning and development culture.",
        highlights: ["Learning Culture"],
      },
    ],
    certImg: "https://i.ibb.co/ynL53f7X/o-t-o.png",
    credentialId: "TRN-ADV-2013-102",
  },
  "Thiết kế Website": {
    tags: ["#WebDesign", "#UIUX", "#Frontend", "#HTMLCSS", "#DigitalSkills"],
    learnedVi: [
      "Kiến thức nền tảng về thiết kế giao diện website.",
      "Nguyên lý UI/UX và bố cục trang web.",
      "Xây dựng và tối ưu giao diện đáp ứng (Responsive Design).",
      "Sử dụng công cụ thiết kế và lập trình web cơ bản.",
      "Tối ưu trải nghiệm người dùng trên môi trường số.",
    ],
    learnedEn: [
      "Fundamentals of website user interface design.",
      "UI/UX principles and web page layout structuring.",
      "Responsive web design and layout optimization.",
      "Digital tools and front-end design techniques.",
      "User experience optimization in digital environments.",
    ],
    resultsVi: [
      {
        text: "Nắm vững nguyên lý thiết kế và trải nghiệm người dùng trên website.",
        highlights: ["Trải nghiệm người dùng"],
      },
      {
        text: "Xây dựng giao diện trực quan, hiện đại và tối ưu chuyển đổi.",
        highlights: ["Giao diện trực quan"],
      },
      {
        text: "Ứng dụng trong việc phát triển cổng thông tin và công cụ số cho doanh nghiệp.",
        highlights: ["Công cụ số"],
      },
    ],
    resultsEn: [
      {
        text: "Master website UI/UX principles and modern layout aesthetics.",
        highlights: ["UI/UX"],
      },
      {
        text: "Create intuitive, responsive, and conversion-optimized web pages.",
        highlights: ["Intuitive"],
      },
      {
        text: "Apply design skills to build digital portals and corporate web tools.",
        highlights: ["Digital Portals"],
      },
    ],
    certImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    credentialId: "WEB-DES-2012-054",
  },
};

export function Education() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const [copiedNotification, setCopiedNotification] = useState(false);

  // Lightbox Modal State
  const [activeCertificate, setActiveCertificate] =
    useState<CertificateData | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const handleSoundClick = () => {
    try {
      playUiSound("click");
    } catch {
      // ignore
    }
  };

  const handleOpenCertificateLightbox = (certData: any) => {
    handleSoundClick();
    setActiveCertificate(certData);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    handleSoundClick();
    setIsLightboxOpen(false);
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Process Education Items
  const processedItems: EduItemDetails[] = useMemo(() => {
    return contentData.education.map((edu, originalIndex) => {
      const meta = EDU_METADATA_MAP[edu.title] || {
        tags: ["Training", "Professional"],
        learnedVi: [
          "Kiến thức chuyên môn và kỹ năng thực chiến.",
          "Ứng dụng trong quản trị và vận hành.",
        ],
        learnedEn: [
          "Core professional knowledge and practical skills.",
          "Applied in management and operations.",
        ],
        resultsVi: [
          {
            text: "Áp dụng hiệu quả vào công việc thực tế.",
            highlights: ["Practical"],
          },
        ],
        resultsEn: [
          {
            text: "Successfully applied to daily operational workflows.",
            highlights: ["Workflows"],
          },
        ],
        certImg:
          (edu as any).image ||
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
        credentialId: `CERT-${edu.year}-${originalIndex + 100}`,
      };

      const palette =
        CARD_COLOR_PALETTES[originalIndex % CARD_COLOR_PALETTES.length];
      const IconComp = edu.icon
        ? iconMap[edu.icon] || GraduationCap
        : GraduationCap;

      // Phân loại thẻ: Đào tạo chuyên môn, Bằng cấp chính quy, Chứng chỉ chuyên môn
      let categoryVi = "Đào tạo chuyên môn";
      let categoryEn = "Professional Training";

      const titleLower = edu.title.toLowerCase();
      if (
        titleLower.includes("bằng đại học") ||
        titleLower.includes("cử nhân") ||
        titleLower.includes("kỹ sư")
      ) {
        categoryVi = "Bằng cấp chính quy";
        categoryEn = "Formal Degree";
      } else if (
        titleLower.includes("ccna") ||
        titleLower.includes("mcsa") ||
        titleLower.includes("chứng nhận tổng đài viên") ||
        titleLower.includes("chứng chỉ")
      ) {
        categoryVi = "Chứng chỉ chuyên môn";
        categoryEn = "Professional Certificate";
      }

      const courseImg = (edu as any).image || meta.certImg;
      const diplomaImg = (edu as any).diplomaImage || "";

      return {
        ...edu,
        icon: IconComp,
        tags: meta.tags,
        categoryVi,
        categoryEn,
        palette,
        courseImage: courseImg,
        diplomaImage: diplomaImg,
        learnedListVi: meta.learnedVi,
        learnedListEn: meta.learnedEn,
        resultsListVi: meta.resultsVi,
        resultsListEn: meta.resultsEn,
        certInfo: {
          titleVi: edu.title,
          titleEn: edu.title,
          issuer: edu.school || "Đào tạo Chuyên nghiệp",
          school: edu.school || "Đơn vị Đào tạo",
          year: edu.year,
          imageUrl: diplomaImg || courseImg,
          credentialId: meta.credentialId,
        },
      };
    });
  }, []);

  const filteredItems = useMemo(() => {
    let items = processedItems;
    if (selectedCategory !== "All") {
      items = items.filter(
        (item) =>
          item.categoryEn === selectedCategory ||
          item.categoryVi === selectedCategory,
      );
    }

    return items;
  }, [processedItems, selectedCategory]);

  const handleCopySummary = (item: EduItemDetails) => {
    handleSoundClick();
    const summaryText = `${item.title} (${item.year})\nHọc tại: ${item.school}\n${item.desc}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: processedItems.length };
    processedItems.forEach((item) => {
      if (item.categoryEn) {
        counts[item.categoryEn] = (counts[item.categoryEn] || 0) + 1;
      }
      if (item.categoryVi) {
        counts[item.categoryVi] = (counts[item.categoryVi] || 0) + 1;
      }
    });
    return counts;
  }, [processedItems]);

  const filterOptionsWithIcons = [
    {
      id: "All",
      labelVi: "Tất cả",
      labelEn: "All",
      icon: ListFilter,
      activeBg: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white   "
    },
    {
      id: "Formal Degree",
      labelVi: "Bằng cấp chính quy",
      labelEn: "Formal Degree",
      icon: GraduationCap,
      activeBg: "bg-gradient-to-r from-amber-500 to-amber-600 text-white   "
    },
    {
      id: "Professional Certificate",
      labelVi: "Chứng chỉ chuyên môn",
      labelEn: "Professional Certificate",
      icon: Award,
      activeBg: "bg-gradient-to-r from-teal-500 to-emerald-600 text-white   "
    },
    {
      id: "Professional Training",
      labelVi: "Đào tạo chuyên môn",
      labelEn: "Professional Training",
      icon: BookOpen,
      activeBg: "bg-gradient-to-r from-purple-500 to-violet-600 text-white   "
    },
  ];

  const filterOptions = [
    { id: "All", labelVi: "Tất cả", labelEn: "All" },
    {
      id: "Formal Degree",
      labelVi: "Bằng cấp chính quy",
      labelEn: "Formal Degree",
    },
    {
      id: "Professional Certificate",
      labelVi: "Chứng chỉ chuyên môn",
      labelEn: "Professional Certificate",
    },
    {
      id: "Professional Training",
      labelVi: "Đào tạo chuyên môn",
      labelEn: "Professional Training",
    },
  ];

  return (
    <PageLayout
      id="education-main-card"
      rootClassName="main-info-card w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border border-[var(--border)] relative flex flex-1 flex-col !bg-white/50 dark:!bg-slate-900/50 transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="education"
      pageName="Education Main Card"
      title={
        isVi
          ? "Hệ thống Nền tảng Tri thức & Chứng chỉ Chuyên môn"
          : "Professional Knowledge Base & Certification Matrix"
      }
      subtitle={
        isVi
          ? "Thông tin về nền tảng học vấn và các chứng chỉ."
          : "Information about the educational background and professional certifications."
      }
      icon={GraduationCap}
      headerActions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border  bg-blue-500/10 px-3 py-1.5 text-xs font-black text-blue-700 dark:text-blue-300  backdrop-blur-md">
            <Award size={13} className="text-blue-600 dark:text-blue-400" />
            <span>
              {isVi
                ? `${processedItems.length} Văn bằng & Chứng chỉ`
                : `${processedItems.length} Degrees & Certs`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border  bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300  backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isVi ? "100% Xác thực thực tế" : "100% Verified"}
            </span>
          </div>
        </div>
      }
      filterOptions={[]}
      activeFilter={selectedCategory}
      onFilterChange={setSelectedCategory}
    >
      <motion.div
        id="education-main-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 p-2 sm:p-4 transition-colors duration-300"
      >

        {isLoading ? (
          /* SKELETON LOADING OVERLAY TO PREVENT LAYOUT SHIFT */
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="flex h-[320px] w-full flex-col justify-between rounded-[15px] border  bg-[var(--surface)]/70 p-5 "
              >
                <div className="space-y-3">
                  <div className="h-5 w-3/4 rounded-md bg-[var(--border)]/60" />
                  <div className="h-4 w-1/2 rounded-md bg-[var(--border)]/40" />
                  <div className="pt-4 space-y-2">
                    <div className="h-3 w-full rounded-md bg-[var(--border)]/30" />
                    <div className="h-3 w-5/6 rounded-md bg-[var(--border)]/30" />
                    <div className="h-3 w-2/3 rounded-md bg-[var(--border)]/30" />
                  </div>
                </div>
                <div className="h-10 w-full rounded-xl bg-[var(--border)]/40" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="mx-auto my-12 flex max-w-md flex-col items-center justify-center rounded-[15px] border  bg-white/80 p-8 text-center  backdrop-blur-xl dark: dark:bg-slate-900/80 sub-card with-ripple">
            <GraduationCap className="mb-3 h-12 w-12 text-amber-500 opacity-80" />
            <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
              {isVi ? "Không tìm thấy kết quả" : "No results found"}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {isVi
                ? "Vui lòng chọn danh mục bộ lọc khác."
                : "Please select another filter category."}
            </p>
          </div>
        ) : (
          /* INTERACTIVE 3D BOOK EDUCATION CARDS GRID */
          <motion.div
            className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredItems.map((edu, index) => (
              <BookEducationCard
                key={edu.title}
                item={edu}
                index={index}
                isVi={isVi}
                onCopySummary={handleCopySummary}
                copiedNotification={copiedNotification}
                onOpenCertificateLightbox={handleOpenCertificateLightbox}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        )}

        {/* FULLSCREEN CERTIFICATE LIGHTBOX MODAL */}
        <CertificateLightbox
          certData={activeCertificate}
          isOpen={isLightboxOpen}
          onClose={handleCloseLightbox}
          isVi={isVi}
        />
      </motion.div>
    </PageLayout>
  );
}
