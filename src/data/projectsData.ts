import { caseStudiesMap } from "./caseStudiesData";
import img62 from "../assets/images/regenerated_image_1787183521535.jpg";
import img63 from "../assets/images/regenerated_image_1787183530294.jpg";

export interface CaseStudy {
  summary: string;
  context: {
    currentStatus: string;
    cause: string;
    needForChange: string;
  };
  problems: Array<{
    problem: string;
    cause: string;
    impact: string;
  }>;
  objectives: {
    strategic?: string[];
    operational?: string[];
    customer?: string[];
    development?: string[];
    kpi?: string[];
  };
  solutions: {
    modelOverview: string;
    imageUrl?: string;
    cards: Array<{
      name: string;
      purpose: string;
      implementation: string;
      value: string;
      iconName?: string;
    }>;
  };
  implementation: Array<string>;
  roleAndContribution: {
    role: string;
    responsibilities: string[];
  };
  systemsAndTools: {
    systems?: string[];
    technologies?: string[];
    methods?: string[];
    toolsList?: string[];
  };
  results: {
    operational?: string[];
    customer?: string[];
    hr?: string[];
    business?: string[];
    kpiBeforeAfter?: string[];
  };
  valueAndDevelopment: {
    customerValue: string;
    businessValue: string;
    organizationValue: string;
    lessons: string[];
    nextSteps: string[];
  };
}

export interface Project {
  group: string;
  phase: string;
  title: string;
  desc: string;
  tags: string;
  img: string;
  mindmapImg?: string;
  period: string;
  role: string;
  company?: string;
  caseStudy?: CaseStudy;
}

const rawProjectsData: Project[] = [
  // 1. Nhóm 01 · Xây dựng & Phát triển
  {
    group: "Nhóm 01 · Xây dựng & Phát triển",
    phase: "Giai đoạn 1",
    title: "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng",
    desc: "Thiết lập cơ cấu – sơ đồ tổ chức – định hướng hoạt động",
    tags: "#PhátTriển #Structure",
    img: "https://i.ibb.co/ymvZmbMM/1-1-X-y-d-ng-Ph-ng-D-ch-v-Kh-ch-h-ng.png",
    mindmapImg:
      "https://i.ibb.co/sdxtx0hR/1-1-X-y-d-ng-Ph-ng-D-ch-v-Kh-ch-h-ng.png",
    period: "2011 – 2024",
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    company: "HTVC (LBC), VED (Shopee/Garena), MoMo, Ví ECO",
  },
  {
    group: "Nhóm 01 · Xây dựng & Phát triển",
    phase: "Giai đoạn 1",
    title: "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động",
    desc: "OKR, KPI ngắn - dài hạn, phù hợp chiến lược toàn công ty",
    tags: "#PhátTriển #OKR",
    img: "https://i.ibb.co/jv0GzTdF/1-2-Thi-t-l-p-m-c-ti-u-ph-ng-ban.png",
    mindmapImg:
      "https://i.ibb.co/1fNzL0x5/1-2-Thi-t-l-p-m-c-ti-u-ph-ng-ban.png",
    period: "2011 – 2024",
    role: "Trưởng Phòng Dịch vụ Khách hàng (Head of CS)",
    company: "HTVC (LBC), VED (Shopee/Garena), MoMo, Ví ECO",
  },
  {
    group: "Nhóm 01 · Xây dựng & Phát triển",
    phase: "Giai đoạn 3",
    title: "1.3 · Nâng cao chất lượng trải nghiệm khách hàng",
    desc: "Thiết lập tiêu chuẩn trải nghiệm, đo lường cảm xúc, đồng bộ hành trình",
    tags: "#PhátTriển #CXDesign",
    img: "https://i.ibb.co/wHMFW7f/1-3-N-ng-cao-tr-i-nghi-m-kh-ch-h-ng.png",
    mindmapImg:
      "https://i.ibb.co/BkVdp76/1-3-N-ng-cao-tr-i-nghi-m-kh-ch-h-ng.png",
    period: "2013 – 2024",
    role: "Trưởng Phòng CSKH / Head of CX",
    company: "VED (Shopee/Garena), MoMo, Ví ECO",
  },
  {
    group: "Nhóm 01 · Xây dựng & Phát triển",
    phase: "Giai đoạn 3",
    title: "1.4 · Quản lý và triển khai dự án chăm sóc khách hàng",
    desc: "Áp dụng Agile / Kanban, giám sát triển khai cải tiến",
    tags: "#PhátTriển #ProjectManagement",
    img: "https://i.ibb.co/0RtGZR9b/1-4-Qu-n-l-d-n-CSKH.png",
    mindmapImg: "https://i.ibb.co/4ZtQD8gK/1-4-Qu-n-l-d-n-CSKH.png",
    period: "2013 – 2021",
    role: "Trưởng Phòng CSKH / Project Lead",
    company: "VED (Shopee/Garena), Prudential, MoMo",
  },
  {
    group: "Nhóm 01 · Xây dựng & Phát triển",
    phase: "Giai đoạn 3",
    title: "1.5 · Cải tiến sản phẩm từ ý kiến khách hàng",
    desc: "Góp ý sản phẩm từ dữ liệu CS, xây “vòng phản hồi” liên phòng ban",
    tags: "#PhátTriển #VoiceOfCustomer",
    img: "https://i.ibb.co/VcxnwPrH/1-5-Th-c-y-c-i-ti-n-s-n-ph-m.png",
    mindmapImg: "https://i.ibb.co/Fk5Vd9bV/1-5-Th-c-y-c-i-ti-n-s-n-ph-m.png",
    period: "2011 – 2024",
    role: "Trưởng Phòng CSKH / Voice of Customer Lead",
    company: "HTVC (LBC), VED, Prudential, MoMo, Ví ECO",
  },
  {
    group: "Nhóm 01 · Xây dựng & Phát triển",
    phase: "Giai đoạn 3",
    title: "1.6 · Quản lý khủng hoảng và giảm khách hàng rời bỏ",
    desc: "Chiến lược giữ chân khách hàng, xử lý khủng hoảng truyền thông và dịch vụ",
    tags: "#PhátTriển #CrisisManagement",
    img: "https://i.ibb.co/Df95199p/1-6-Qu-n-l-kh-ng-ho-ng-v-gi-m-kh-ch-h-ng-r-i-b.png",
    mindmapImg:
      "https://i.ibb.co/Df95199p/1-6-Qu-n-l-kh-ng-ho-ng-v-gi-m-kh-ch-h-ng-r-i-b.png",
    period: "2013 – 2024",
    role: "Trưởng Phòng CSKH / Crisis Management Lead",
    company: "VED (Shopee/Garena), MoMo, Ví ECO",
  },

  // 2. Nhóm 02 · Vận hành & Tối ưu
  {
    group: "Nhóm 02 · Vận hành & Tối ưu",
    phase: "Giai đoạn 1",
    title: "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng",
    desc: "SOP từ tiếp nhận đến xử lý, phối hợp liên phòng",
    tags: "#VậnHành #SOP",
    img: "https://i.ibb.co/SDRxyVYm/2-1-Chu-n-h-a-quy-tr-nh-CSKH.png",
    mindmapImg: "https://i.ibb.co/F4TQSP1H/2-1-Chu-n-h-a-quy-tr-nh-CSKH.png",
    period: "2011 – 2024",
    role: "Trưởng Phòng CSKH / Process Architecture Lead",
    company: "HTVC (LBC), VED, MoMo, Ví ECO",
  },
  {
    group: "Nhóm 02 · Vận hành & Tối ưu",
    phase: "Giai đoạn 2",
    title: "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
    desc: "Hợp nhất kênh hotline, chat, email, mạng xã hội",
    tags: "#VậnHành #OmniChannel",
    img: "https://i.ibb.co/BVbDG6yQ/2-2-T-i-u-h-a-k-nh-h-tr.png",
    mindmapImg: "https://i.ibb.co/hFBv9tcX/2-2-T-i-u-h-a-k-nh-h-tr.png",
    period: "2007 – 2024",
    role: "Trưởng Nhóm / Trưởng Phòng CSKH",
    company: "V247, Prudential, MoMo, Ví ECO",
  },
  {
    group: "Nhóm 02 · Vận hành & Tối ưu",
    phase: "Giai đoạn 3",
    title: "2.3 · Tự động hóa quy trình chăm sóc khách hàng",
    desc: "Ứng dụng RPA, auto workflow, giảm thao tác lặp lại",
    tags: "#VậnHành #Automation",
    img: "https://i.ibb.co/vvXvMjZ1/2-3-Tri-n-khai-t-ng-h-a-2.png",
    mindmapImg: "https://i.ibb.co/KzLgL3YG/2-3-Tri-n-khai-t-ng-h-a.png",
    period: "2016 – 2024",
    role: "Trưởng Phòng CSKH / Automation Lead",
    company: "Prudential, MoMo, Ví ECO",
  },
  {
    group: "Nhóm 02 · Vận hành & Tối ưu",
    phase: "Giai đoạn 3",
    title: "2.4 · Quản lý hoạt động chăm sóc khách hàng chủ động",
    desc: "Kịch bản gọi/email chủ động: chăm sóc, tái kích hoạt, survey...",
    tags: "#VậnHành #OutboundCS",
    img: "https://i.ibb.co/HDWHvvHN/2-4-Qu-n-l-chi-n-d-ch-Outbound.png",
    mindmapImg: "https://i.ibb.co/4nt76fLN/2-4-Qu-n-l-chi-n-d-ch-Outbound.png",
    period: "2011 – 2024",
    role: "Trưởng Phòng CSKH / Outbound Lead",
    company: "HTVC (LBC), Ví ECO",
  },
  {
    group: "Nhóm 02 · Vận hành & Tối ưu",
    phase: "Giai đoạn 3",
    title: "2.5 · Quản lý đối tác thuê ngoài chăm sóc khách hàng",
    desc: "Tiêu chuẩn hóa dịch vụ, SLA và giám sát chất lượng BPO",
    tags: "#VậnHành #BPO",
    img: "https://i.ibb.co/RTzjNW01/2-5-Qu-n-l-i-t-c-thu-ngo-i-ch-m-s-c-kh-ch-h-ng.png",
    mindmapImg:
      "https://i.ibb.co/RTzjNW01/2-5-Qu-n-l-i-t-c-thu-ngo-i-ch-m-s-c-kh-ch-h-ng.png",
    period: "2018 – 2021",
    role: "Trưởng Phòng CSKH / BPO Manager",
    company: "MoMo (Mắt Bão BPO)",
  },

  // 3. Nhóm 03 · Hệ thống & Dữ liệu
  {
    group: "Nhóm 03 · Hệ thống & Dữ liệu",
    phase: "Giai đoạn 2",
    title: "3.1 · Xây dựng hệ thống quản lý thông tin khách hàng",
    desc: "Tích hợp điểm chạm khách hàng – dữ liệu hành trình – báo cáo",
    tags: "#CôngNghệ #CRM",
    img: "https://i.ibb.co/xt535vdy/3-1-X-y-d-ng-h-th-ng-CRM.png",
    mindmapImg: "https://i.ibb.co/Xxgqd4Rn/3-1-X-y-d-ng-h-th-ng-CRM.png",
    period: "2013 – 2024",
    role: "Trưởng Phòng CSKH / CRM System Architect",
    company: "VED (Garena/Shopee), MoMo, Ví ECO",
  },
  {
    group: "Nhóm 03 · Hệ thống & Dữ liệu",
    phase: "Giai đoạn 2",
    title: "3.2 · Phân tích và báo cáo dữ liệu khách hàng",
    desc: "Realtime Dashboard: CSAT, NPS, CES, phản hồi – KPI",
    tags: "#CôngNghệ #Insight",
    img: "https://i.ibb.co/ymm7WSMJ/3-2-Ph-n-t-ch-B-o-c-o.png",
    mindmapImg: "https://i.ibb.co/cj0W4bJ/3-2-Ph-n-t-ch-B-o-c-o.png",
    period: "2011 – 2024",
    role: "Trưởng Phòng CSKH / CX Analytics Lead",
    company: "HTVC (LBC), VED, MoMo, Ví ECO",
  },
  {
    group: "Nhóm 03 · Hệ thống & Dữ liệu",
    phase: "Giai đoạn 3",
    title: "3.3 · Khảo sát và đánh giá mức độ hài lòng",
    desc: "Thu thập ý kiến sau tương tác – tạo trigger cải tiến",
    tags: "#CôngNghệ #Survey",
    img: "https://i.ibb.co/JjJN6vL1/3-3-Kh-o-s-t-nh-gi-kh-ch-h-ng.png",
    mindmapImg: "https://i.ibb.co/wFmLP6wQ/3-3-Kh-o-s-t-nh-gi-kh-ch-h-ng.png",
    period: "2007 – 2024",
    role: "Trưởng Nhóm / Trưởng Phòng CSKH",
    company: "V247, HTVC, MoMo, Ví ECO",
  },
  {
    group: "Nhóm 03 · Hệ thống & Dữ liệu",
    phase: "Giai đoạn 3",
    title: "3.4 · Xây dựng trợ lý ảo chăm sóc khách hàng",
    desc: "Triển khai chatbot trả lời nhanh câu hỏi đơn giản",
    tags: "#CôngNghệ #Chatbot",
    img: "https://i.ibb.co/603Z7tXj/3-4-X-y-d-ng-AI-Bot.png",
    mindmapImg: "https://i.ibb.co/Z658Pr76/3-4-X-y-d-ng-AI-Bot.png",
    period: "2023 – 2026+",
    role: "Trưởng Phòng CSKH / AI Chatbot Project Lead",
    company: "Ví ECO & Generative AI Strategy",
  },

  // 4. Nhóm 04 · Đào tạo & Năng lực
  {
    group: "Nhóm 04 · Đào tạo & Năng lực",
    phase: "Giai đoạn 3",
    title: "4.1 · Phát triển chương trình đào tạo trực tuyến",
    desc: "E-learning: onboarding, cập nhật quy trình, kiểm tra chất lượng",
    tags: "#PhátTriển #CSAcademy",
    img: "https://i.ibb.co/svQ9F4Tz/4-1-Ph-t-tri-n-o-t-o-tr-c-tuy-n.png",
    mindmapImg: "https://i.ibb.co/0yDjkH17/4-1-Ph-t-tri-n-o-t-o-tr-c-tuy-n.png",
    period: "2013 – 2024",
    role: "Trưởng Phòng CSKH / E-Learning Director",
    company: "VED (Garena/Shopee), Ví ECO",
  },
  {
    group: "Nhóm 04 · Đào tạo & Năng lực",
    phase: "Giai đoạn 2",
    title: "4.2 · Xây dựng khung năng lực và lộ trình phát triển",
    desc: "Định hướng phát triển nghề nghiệp cho nhân sự Dịch vụ Khách hàng",
    tags: "#PhátTriển #CareerPath",
    img: "https://i.ibb.co/JRd7wxyC/4-2-X-y-d-ng-khung-n-ng-l-c-v-l-tr-nh-ph-t-tri-n.png",
    mindmapImg: "https://i.ibb.co/0yDjkH17/4-1-Ph-t-tri-n-o-t-o-tr-c-tuy-n.png",
    period: "2003 – 2026+",
    role: "Trưởng Nhóm / Trưởng Phòng CSKH (Talent Lead)",
    company: "MobiFone, V247, VED, MoMo, Ví ECO",
  },

  // 5. Nhóm 05 · Hỗ trợ Khách hàng
  {
    group: "Nhóm 05 · Hỗ trợ Khách hàng",
    phase: "Giai đoạn 2",
    title: "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng",
    desc: "Tạo Helpcenter, cổng ticket, thư viện kiến thức FAQ",
    tags: "#HỗTrợ #HelpDesk",
    img: "https://i.ibb.co/5bcHqqz/5-1-Th-nh-l-p-trung-t-m-h-tr.png",
    mindmapImg: "https://i.ibb.co/BVc2W8bJ/5-1-Th-nh-l-p-trung-t-m-h-tr.png",
    period: "2013 – 2021",
    role: "Trưởng Phòng CSKH / Helpdesk Operations Director",
    company: "VED (Garena/Shopee), MoMo",
  },

  // 6. Nhóm 06 · Phân tích & Cải tiến
  {
    group: "Nhóm 06 · Phân tích & Cải tiến",
    phase: "Xuyên suốt",
    title: "6.1 · Thiết lập khung quản trị chất lượng dịch vụ",
    desc: "Kiến trúc và thiết lập Hệ thống Quản trị Chất lượng Dịch vụ Toàn diện (Total Quality Assurance Framework - TQA) theo chuẩn COPC",
    tags: "#CảiTiến #TQA #COPC",
    img: "https://i.ibb.co/dsN12n0H/6-1-Kh-ch-h-ng-l-trung-t-m.png",
    mindmapImg: "https://i.ibb.co/VWVw4z4P/6-1-Thi-t-l-p-khung-qu-n-tr-ch-t-l-ng.png",
    period: "2011 – 2026+",
    role: "Head of CX / CS Director",
    company: "HTVC, VED, Prudential, MoMo, Ví ECO",
  },
  {
    group: "Nhóm 06 · Phân tích & Cải tiến",
    phase: "Xuyên suốt",
    title: "6.2 · Quản trị sự thay đổi và khủng hoảng dịch vụ",
    desc: "Xây dựng Khung Ứng phó Khủng hoảng Dịch vụ & Quản trị Biến động, thiết lập ma trận cảnh báo sớm 4 cấp độ",
    tags: "#CảiTiến #CrisisManagement",
    img: img62,
    mindmapImg: "https://i.ibb.co/h1KSm64L/6-2-Qu-n-tr-s-thay-i-v-kh-ng-ho-ng-d-ch-v.png",
    period: "2011 – 2026+",
    role: "Head of CS / Voice of Customer Lead",
    company: "HTVC, VED, Prudential, MoMo, Ví ECO",
  },
  {
    group: "Nhóm 06 · Phân tích & Cải tiến",
    phase: "Xuyên suốt",
    title: "6.3 · Ứng dụng trí tuệ nhân tạo nâng cao hiệu suất CSKH",
    desc: "Tiên phong triển khai Hệ sinh thái Trí tuệ Nhân tạo Toàn diện Thế hệ mới (Generative AI Agent Copilot & Automated 100% Speech-to-Text Call QA)",
    tags: "#CảiTiến #GenerativeAI #AutoQA",
    img: img63,
    mindmapImg: "https://i.ibb.co/hFSX8q8w/6-3-ng-d-ng-AI-n-ng-cao-hi-u-su-t-CSKH.png",
    period: "2018 – 2026+",
    role: "Head of CS / CX Data Strategist",
    company: "MoMo, Ví ECO",
  },
];

export const projectsData: Project[] = rawProjectsData.map((project) => ({
  ...project,
  caseStudy: project.caseStudy || caseStudiesMap[project.title],
}));

export const categories = [
  "Tất cả",
  "Nhóm 01 · Xây dựng & Phát triển",
  "Nhóm 02 · Vận hành & Tối ưu",
  "Nhóm 03 · Hệ thống & Dữ liệu",
  "Nhóm 04 · Đào tạo & Năng lực",
  "Nhóm 05 · Hỗ trợ Khách hàng",
  "Nhóm 06 · Phân tích & Cải tiến",
];

export const phases = [
  "Tất cả",
  "Giai đoạn 1",
  "Giai đoạn 2",
  "Giai đoạn 3",
  "Xuyên suốt",
];

export const groups = [
  "Tất cả",
  "Nhóm 01 · Xây dựng & Phát triển",
  "Nhóm 02 · Vận hành & Tối ưu",
  "Nhóm 03 · Hệ thống & Dữ liệu",
  "Nhóm 04 · Đào tạo & Năng lực",
  "Nhóm 05 · Hỗ trợ Khách hàng",
  "Nhóm 06 · Phân tích & Cải tiến",
];
