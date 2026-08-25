export interface PageObjectItem {
  id: string;
  nameVi: string;
  nameEn: string;
  pageId: string;
  pageNameVi: string;
  type: 'section' | 'card' | 'component' | 'banner' | 'modal' | 'media' | 'interactive' | 'navigation';
  typeLabelVi: string;
  selector: string;
  dimensions?: string;
  status: 'active' | 'shared' | 'responsive' | 'interactive';
  descriptionVi: string;
  tags: string[];
}

export const SITE_PAGE_OBJECTS: PageObjectItem[] = [
  // --- TRANG CHỦ (HOME) ---
  {
    id: 'obj-home-banner',
    nameVi: 'Khung Banner & Slogan Hành động',
    nameEn: 'Hero Banner & Dynamic Tagline',
    pageId: 'home',
    pageNameVi: 'Trang chủ',
    type: 'banner',
    typeLabelVi: 'Banner / Hero',
    selector: '#home-hero-banner',
    dimensions: '100% x Auto (Fluid)',
    status: 'active',
    descriptionVi: 'Khối banner chính hiển thị ảnh đại diện, chức danh Head of CX và chuỗi 6 khẩu hiệu hành động chuyển động.',
    tags: ['Hero', 'Tagline', 'Motion', 'Profile']
  },
  {
    id: 'obj-home-kpi-grid',
    nameVi: 'Khối 4 Chỉ Số Thực Chiến Cốt Lõi',
    nameEn: '4 Core Operational KPI Metric Cards',
    pageId: 'home',
    pageNameVi: 'Trang chủ',
    type: 'card',
    typeLabelVi: 'Thẻ chỉ số / Metric',
    selector: '#home-metrics-grid',
    dimensions: 'Grid 4 Cột (Responsive)',
    status: 'active',
    descriptionVi: 'Hiển thị 22+ năm kinh nghiệm, 150+ nhân sự điều hành, 6+ ngành thực chiến và CSAT 95%+.',
    tags: ['KPI', 'Metrics', 'Grid', 'Stats']
  },
  {
    id: 'obj-home-personal-info',
    nameVi: 'Khối Thông Tin Cá Nhân & Liên Hệ',
    nameEn: 'Personal Info & Contact Summary',
    pageId: 'home',
    pageNameVi: 'Trang chủ',
    type: 'section',
    typeLabelVi: 'Khối nội dung (Section)',
    selector: '#home-personal-info-card',
    dimensions: 'Card Rounded-2xl',
    status: 'active',
    descriptionVi: 'Tổng hợp họ tên, ngày sinh, email, hotline, LinkedIn, triết lý vận hành và chứng chỉ.',
    tags: ['Bio', 'Contact', 'Profile']
  },
  {
    id: 'obj-home-quick-actions',
    nameVi: 'Cụm Phím Tác Vụ Nhanh (In, Tải CV, Chat AI)',
    nameEn: 'Quick Action Floating Cluster',
    pageId: 'home',
    pageNameVi: 'Trang chủ',
    type: 'interactive',
    typeLabelVi: 'Tương tác (Interactive)',
    selector: '#home-action-buttons',
    dimensions: 'Inline Flex / Pill',
    status: 'interactive',
    descriptionVi: 'Nút mở cửa sổ In PDF, Xuất file TXT và kích hoạt trợ lý ảo AI tư vấn.',
    tags: ['Print', 'Export', 'PDF', 'AI Chat']
  },

  // --- THƯ NGỎ (COVER LETTER) ---
  {
    id: 'obj-letter-principles',
    nameVi: 'Khung 4 Nguyên Tắc Quản Trị Then Chốt',
    nameEn: '4 Core Management Principles Grid',
    pageId: 'coverLetter',
    pageNameVi: 'Thư ngỏ',
    type: 'card',
    typeLabelVi: 'Thẻ nội dung (Card)',
    selector: '#letter-principles-matrix',
    dimensions: '2x2 Grid Layout',
    status: 'active',
    descriptionVi: 'Mô tả 4 nguyên tắc: Lấy KH làm trọng tâm, Tối ưu quy trình, Lãnh đạo thấu cảm và Đổi mới số.',
    tags: ['Principles', 'Leadership', 'Grid']
  },
  {
    id: 'obj-letter-timeline',
    nameVi: 'Dòng Thời Gian Phát Triển (Career Journey)',
    nameEn: 'Vertical Career Milestone Timeline',
    pageId: 'coverLetter',
    pageNameVi: 'Thư ngỏ',
    type: 'section',
    typeLabelVi: 'Khối nội dung (Section)',
    selector: '#letter-timeline-flow',
    dimensions: 'Vertical Stepper Track',
    status: 'responsive',
    descriptionVi: 'Hành trình phát triển từ 2003 đến nay qua các mốc khởi đầu, bứt phá, khẳng định và dẫn dắt.',
    tags: ['Timeline', 'Milestones', 'History']
  },
  {
    id: 'obj-letter-values',
    nameVi: 'Bảng 5 Giá Trị Cốt Lõi (Core Values)',
    nameEn: '5 Core Values Grid Cards',
    pageId: 'coverLetter',
    pageNameVi: 'Thư ngỏ',
    type: 'card',
    typeLabelVi: 'Thẻ nội dung (Card)',
    selector: '#letter-core-values',
    dimensions: 'Flex / Grid 5 Cột',
    status: 'active',
    descriptionVi: 'Tâm - Tầm - Trí - Tín - Tốc trong đạo đức nghề nghiệp và cam kết phụng sự doanh nghiệp.',
    tags: ['Core Values', 'Ethics', 'Commitment']
  },

  // --- GIỚI THIỆU (ABOUT) ---
  {
    id: 'obj-about-pyramid',
    nameVi: 'Mô Hình Kim Tự Tháp 4 Trụ Cột CX',
    nameEn: '4-Pillar CX Operations Pyramid',
    pageId: 'about',
    pageNameVi: 'Giới thiệu',
    type: 'interactive',
    typeLabelVi: 'Tương tác (Interactive)',
    selector: '#about-pyramid-container',
    dimensions: 'SVG / CSS 3D Layer',
    status: 'active',
    descriptionVi: 'Trực quan hóa 4 tầng vận hành: Con người (People) - Quy trình (Process) - Công nghệ (Tech) - Dữ liệu (Data).',
    tags: ['Pyramid', 'Architecture', '4 Pillars']
  },
  {
    id: 'obj-about-leadership-style',
    nameVi: 'Khung Phong Cách Lãnh Đạo Thấu Cảm',
    nameEn: 'Empathetic Leadership Philosophy Block',
    pageId: 'about',
    pageNameVi: 'Giới thiệu',
    type: 'card',
    typeLabelVi: 'Thẻ nội dung (Card)',
    selector: '#about-leadership-style',
    dimensions: 'Glass Container Card',
    status: 'active',
    descriptionVi: 'Chi tiết phương pháp quản trị dựa trên sự thấu cảm, khích lệ nhân tài và xây dựng đội ngũ kế thừa vững mạnh.',
    tags: ['Leadership', 'Culture', 'People']
  },

  // --- HỌC VẤN (EDUCATION) ---
  {
    id: 'obj-edu-filters',
    nameVi: 'Thanh Bộ Lọc & Tìm Kiếm Chứng Chỉ',
    nameEn: 'Education Category Filter & Search Bar',
    pageId: 'education',
    pageNameVi: 'Học vấn',
    type: 'navigation',
    typeLabelVi: 'Điều hướng / Bộ lọc',
    selector: '#edu-filter-toolbar',
    dimensions: 'Horizontal Scrollable Bar',
    status: 'interactive',
    descriptionVi: 'Lọc nhanh theo Bằng cấp chính quy, Chứng chỉ chuyên môn, Đào tạo nâng cao và ô tìm kiếm tức thì.',
    tags: ['Filter', 'Search', 'Tabs']
  },
  {
    id: 'obj-edu-card-grid',
    nameVi: 'Danh Sách 12 Thẻ Bằng Cấp & Khóa Học',
    nameEn: '12 Detailed Educational Credential Cards',
    pageId: 'education',
    pageNameVi: 'Học vấn',
    type: 'card',
    typeLabelVi: 'Thẻ nội dung (Card)',
    selector: '#edu-cards-grid-container',
    dimensions: 'Grid 3 Cột (Responsive)',
    status: 'active',
    descriptionVi: 'Mỗi thẻ chứa ảnh văn bằng, trường đào tạo, mã chứng chỉ, tóm tắt, nội dung học và nút sao chép mã.',
    tags: ['Credentials', 'Degrees', 'Certificates', 'Copy Code']
  },

  // --- KINH NGHIỆM (EXPERIENCE) ---
  {
    id: 'obj-exp-timeline-stepper',
    nameVi: 'Trục Lịch Sử Công Tác 22+ Năm',
    nameEn: '22-Year Work History Timeline Stepper',
    pageId: 'experience',
    pageNameVi: 'Kinh nghiệm',
    type: 'section',
    typeLabelVi: 'Khối nội dung (Section)',
    selector: '#experience-timeline-stepper',
    dimensions: 'Interactive Master Timeline',
    status: 'interactive',
    descriptionVi: 'Chi tiết kinh nghiệm qua từng doanh nghiệp MoMo, Finviet, Prudential, VED/Garena, HTVC, MobiFone.',
    tags: ['Work History', 'Roles', 'Companies', 'Milestones']
  },
  {
    id: 'obj-exp-metric-badges',
    nameVi: 'Khối Huy Hiệu Thành Tựu Định Lượng (%)',
    nameEn: 'Quantitative Achievement Score Badges',
    pageId: 'experience',
    pageNameVi: 'Kinh nghiệm',
    type: 'component',
    typeLabelVi: 'Linh kiện (Component)',
    selector: '#experience-score-badges',
    dimensions: 'Badge Pill Cluster',
    status: 'active',
    descriptionVi: 'Huy hiệu phần trăm vượt mức SLA, FCR 85%+, CSAT 95%+ và giảm chi phí vận hành theo từng nhiệm kỳ.',
    tags: ['Badges', 'Scores', 'SLA', 'CSAT']
  },

  // --- LĨNH VỰC (INDUSTRIES) ---
  {
    id: 'obj-domain-carousel',
    nameVi: 'Bản Đồ 6 Miền Lĩnh Vực Chuyên Sâu',
    nameEn: '6 Core Industry Domain Cards',
    pageId: 'industries',
    pageNameVi: 'Lĩnh vực',
    type: 'card',
    typeLabelVi: 'Thẻ nội dung (Card)',
    selector: '#industries-domain-grid',
    dimensions: 'Grid 3x2 (Responsive)',
    status: 'active',
    descriptionVi: 'FinTech (Ví MoMo, ShopeePay), Bảo hiểm (Prudential), Bưu chính & Logistics, Game/eSports (Garena), Viễn thông (MobiFone), CRM & Automation.',
    tags: ['FinTech', 'Telecom', 'Gaming', 'Logistics', 'Insurance']
  },
  {
    id: 'obj-domain-partner-logos',
    nameVi: 'Dải Logo Đối Tác & Thương Hiệu Tiêu Biểu',
    nameEn: 'Enterprise Partner & Brand Logo Strip',
    pageId: 'industries',
    pageNameVi: 'Lĩnh vực',
    type: 'media',
    typeLabelVi: 'Đa phương tiện (Media)',
    selector: '#industries-partner-logos',
    dimensions: 'Marquee / Flex Logo Strip',
    status: 'shared',
    descriptionVi: 'Logo chính thức của MoMo, ShopeePay, AirPay, Finviet, Prudential, VED, V247.',
    tags: ['Logos', 'Brands', 'Partners']
  },

  // --- KỸ NĂNG (SKILLS) ---
  {
    id: 'obj-skills-radar-chart',
    nameVi: 'Biểu Đồ Radar Đa Năng Lực',
    nameEn: 'Multi-Dimensional Skills Radar Chart',
    pageId: 'skills',
    pageNameVi: 'Kỹ năng',
    type: 'interactive',
    typeLabelVi: 'Biểu đồ (Chart/SVG)',
    selector: '#skills-radar-canvas',
    dimensions: 'Responsive SVG Canvas',
    status: 'interactive',
    descriptionVi: 'Biểu đồ trực quan hóa 5 nhóm kỹ năng: Chuyên môn, Lãnh đạo, Phối hợp, Đổi mới và Ngoại ngữ.',
    tags: ['Radar', 'Charts', 'Data Viz']
  },
  {
    id: 'obj-skills-progress-bars',
    nameVi: 'Cụm Thanh Tiến Trình Kỹ Năng (%)',
    nameEn: 'Skill Percentage Progress Bars Matrix',
    pageId: 'skills',
    pageNameVi: 'Kỹ năng',
    type: 'component',
    typeLabelVi: 'Linh kiện (Component)',
    selector: '#skills-progress-matrix',
    dimensions: 'Progress Bar Stack',
    status: 'active',
    descriptionVi: 'Các thanh đo phần trăm chi tiết cho Contact Center (98%), Workforce Planning (94%), Risk Control (92%).',
    tags: ['Progress', 'Skill Bars', 'Metrics']
  },

  // --- DỰ ÁN (PROJECTS) ---
  {
    id: 'obj-proj-case-study-modal',
    nameVi: 'Khung Case Study STAR Chi Tiết',
    nameEn: 'STAR Methodology Case Study Inspector',
    pageId: 'projects',
    pageNameVi: 'Dự án',
    type: 'modal',
    typeLabelVi: 'Cửa sổ / Popup (Modal)',
    selector: '#projects-case-study-view',
    dimensions: 'Modal Max-w-4xl Glass',
    status: 'interactive',
    descriptionVi: 'Phân tích dự án theo mô hình Situation (Bối cảnh) - Task (Nhiệm vụ) - Action (Hành động) - Result (Kết quả).',
    tags: ['STAR', 'Case Study', 'Modal', 'Analysis']
  },
  {
    id: 'obj-proj-tags-filter',
    nameVi: 'Bộ Lọc Nhóm Dự Án (Chuyển đổi số, Tối ưu SLA)',
    nameEn: 'Project Category & Tag Switcher',
    pageId: 'projects',
    pageNameVi: 'Dự án',
    type: 'navigation',
    typeLabelVi: 'Điều hướng / Bộ lọc',
    selector: '#projects-category-tabs',
    dimensions: 'Tabs Navigation Bar',
    status: 'interactive',
    descriptionVi: 'Lọc nhanh các dự án theo giai đoạn, quy mô ngân sách và công nghệ ứng dụng.',
    tags: ['Filter', 'Tabs', 'Projects']
  },

  // --- PHỎNG VẤN (INTERVIEW) ---
  {
    id: 'obj-interview-video-players',
    nameVi: 'Cụm 2 Trình Phát Video Phỏng Vấn Trực Tiếp',
    nameEn: 'Dual Video Interview Stream Players',
    pageId: 'interview',
    pageNameVi: 'Phỏng vấn',
    type: 'media',
    typeLabelVi: 'Đa phương tiện (Media)',
    selector: '#interview-video-players-cluster',
    dimensions: 'Responsive 16:9 Video Frames',
    status: 'active',
    descriptionVi: 'Phát video phỏng vấn thực tế của ứng viên trao đổi về tư duy quản trị và xử lý khủng hoảng CSKH.',
    tags: ['Video', 'Interview', 'Stream', 'Voice']
  },
  {
    id: 'obj-interview-qna-accordion',
    nameVi: 'Danh Sách Câu Hỏi Phỏng Vấn Phân Tầng',
    nameEn: 'Interview Q&A Accordion Stack',
    pageId: 'interview',
    pageNameVi: 'Phỏng vấn',
    type: 'interactive',
    typeLabelVi: 'Tương tác (Interactive)',
    selector: '#interview-qna-accordion',
    dimensions: 'Accordion Stack Container',
    status: 'interactive',
    descriptionVi: 'Ngân hàng câu hỏi tình huống: cách xử lý cuộc gọi quá tải, xây dựng KPI cho Agent và chuyển đổi số CRM.',
    tags: ['Q&A', 'Accordion', 'Knowledge']
  },

  // --- TỬ VI (TU VI) ---
  {
    id: 'obj-tuvi-bazi-plate',
    nameVi: 'Lá Số Tử Vi Bát Tự & Cung Mệnh Giáp Tý 1984',
    nameEn: 'Bazi Astrology Natal Chart Plate',
    pageId: 'tuvi',
    pageNameVi: 'Tử vi',
    type: 'card',
    typeLabelVi: 'Thẻ nội dung (Card)',
    selector: '#tuvi-natal-chart-card',
    dimensions: 'Golden Ratio Ornament Card',
    status: 'active',
    descriptionVi: 'Phân tích Mệnh Hải Trung Kim, Cung Đoài Kim, Thủy - Kim tương sinh và bản lĩnh kiên định trong quản trị.',
    tags: ['Astrology', 'Bazi', 'Five Elements', 'Gold']
  },
  {
    id: 'obj-tuvi-five-elements-matrix',
    nameVi: 'Ma Trận Ngũ Hành Trong Quản Trị Vận Hành',
    nameEn: 'Five-Elements Management Dynamics Matrix',
    pageId: 'tuvi',
    pageNameVi: 'Tử vi',
    type: 'interactive',
    typeLabelVi: 'Tương tác (Interactive)',
    selector: '#tuvi-five-elements-grid',
    dimensions: '5-Card Harmony Matrix',
    status: 'active',
    descriptionVi: 'Kim (Quy trình SLA) - Thủy (Dữ liệu CRM/AI) - Mộc (Phát triển nhân tài) - Hỏa (Nhiệt huyết CX) - Thổ (Hạ tầng).',
    tags: ['Five Elements', 'Philosophy', 'Operations']
  },
  {
    id: 'obj-tuvi-audio-commentary',
    nameVi: 'Trình Phát Audio Luận Giải Vận Trình 2026+',
    nameEn: 'Audio Player - Horoscope Commentary',
    pageId: 'tuvi',
    pageNameVi: 'Tử vi',
    type: 'media',
    typeLabelVi: 'Đa phương tiện (Media)',
    selector: '#tuvi-audio-stream-player',
    dimensions: 'Audio Player Waveform Bar',
    status: 'interactive',
    descriptionVi: 'Nghe file âm thanh bình giải vận thế, thời cơ bứt phá và chiến lược dẫn dắt tổ chức.',
    tags: ['Audio', 'Podcast', 'Stream']
  },

  // --- HỆ THỐNG (SYSTEMS) ---
  {
    id: 'obj-systems-architecture-diagram',
    nameVi: 'Sơ Đồ Kiến Trúc 5 Phân Hệ Vận Hành',
    nameEn: '5-Core Operational Architecture Blueprint',
    pageId: 'systems',
    pageNameVi: 'Hệ thống',
    type: 'interactive',
    typeLabelVi: 'Tương tác (Interactive)',
    selector: '#systems-blueprint-diagram',
    dimensions: 'Interactive Blueprint Map',
    status: 'active',
    descriptionVi: 'Kiến trúc kết nối CRM Omnichannel, Cloud PBX VoIP, AI Agent Copilot, QA/QC Scorecard và CX BI Dashboard.',
    tags: ['Architecture', 'Blueprint', 'CRM', 'VoIP', 'AI']
  },
  {
    id: 'obj-systems-subsystem-cards',
    nameVi: 'Cụm Thẻ 5 Phân Hệ Công Nghệ Chi Tiết',
    nameEn: '5 Subsystem Technical Specification Cards',
    pageId: 'systems',
    pageNameVi: 'Hệ thống',
    type: 'card',
    typeLabelVi: 'Thẻ nội dung (Card)',
    selector: '#systems-subsystem-cards-grid',
    dimensions: 'Grid 5 Phân Hệ',
    status: 'active',
    descriptionVi: 'Mỗi phân hệ có bảng thông số kỹ thuật, khả năng tích hợp API và chỉ số hiệu năng.',
    tags: ['Specs', 'Subsystems', 'Integration']
  },

  // --- KỶ NIỆM (MEMORIES) ---
  {
    id: 'obj-memories-gallery-grid',
    nameVi: 'Bộ Sưu Tập Hình Ảnh & Dấu Ấn 22 Năm',
    nameEn: '22-Year Career Milestone Image Gallery Grid',
    pageId: 'memories',
    pageNameVi: 'Kỷ niệm',
    type: 'media',
    typeLabelVi: 'Đa phương tiện (Media)',
    selector: '#memories-photo-gallery-grid',
    dimensions: 'Masonry / Responsive Grid',
    status: 'active',
    descriptionVi: 'Kho ảnh kỷ niệm thực tế tại MobiFone, HTVC, VED/Garena, Prudential, MoMo, Finviet, V247.',
    tags: ['Gallery', 'Photos', 'History', 'Proof']
  },

  // --- TRỢ LÝ AI (AI CHAT) ---
  {
    id: 'obj-ai-chat-interface',
    nameVi: 'Giao Diện Hội Thoại Trợ Lý AI 24/7',
    nameEn: '24/7 AI Chatbot & Agent Dialog Window',
    pageId: 'aiChat',
    pageNameVi: 'Trợ lý AI',
    type: 'interactive',
    typeLabelVi: 'Tương tác (Interactive)',
    selector: '#ai-chat-dialog-interface',
    dimensions: 'Full View / Popup Modal',
    status: 'interactive',
    descriptionVi: 'Cửa sổ hội thoại trực tiếp giải đáp câu hỏi của nhà tuyển dụng về kinh nghiệm, phong cách quản trị và các dự án của ứng viên.',
    tags: ['AI Agent', 'Chatbot', 'Knowledge Base']
  },
  {
    id: 'obj-ai-suggested-prompts',
    nameVi: 'Cụm Gợi Ý Câu Hỏi Thông Minh Theo Chủ Đề',
    nameEn: 'Smart Prompt Chips & Topic Suggestions',
    pageId: 'aiChat',
    pageNameVi: 'Trợ lý AI',
    type: 'component',
    typeLabelVi: 'Linh kiện (Component)',
    selector: '#ai-chat-prompt-chips',
    dimensions: 'Horizontal Chip Bar',
    status: 'active',
    descriptionVi: 'Gợi ý nhanh các câu hỏi về Chiến lược CX, Quản trị rủi ro, Tuyển dụng và Công nghệ AI.',
    tags: ['Prompts', 'Chips', 'Suggestions']
  },

  // --- KHUNG ĐIỀU HƯỚNG & HỆ THỐNG CHUNG ---
  {
    id: 'obj-global-left-sidebar',
    nameVi: 'Thanh Menu Điều Hướng Bên Trái (Left Sidebar)',
    nameEn: 'Left Primary Navigation Sidebar',
    pageId: 'global',
    pageNameVi: 'Hệ thống chung (Global)',
    type: 'navigation',
    typeLabelVi: 'Điều hướng / Hệ thống',
    selector: '#global-left-sidebar-nav',
    dimensions: 'Fixed 260px (Desktop)',
    status: 'shared',
    descriptionVi: 'Thanh menu chứa 12 trang chính từ Trang chủ, Thư ngỏ, Học vấn đến Kỷ niệm.',
    tags: ['Sidebar', 'Nav', 'Global']
  },
  {
    id: 'obj-global-right-sidebar',
    nameVi: 'Thanh Công Cụ Bên Phải (Widget Thời Tiết, Trợ Lý AI, Quản Trị)',
    nameEn: 'Right Tool & Widget Sidebar',
    pageId: 'global',
    pageNameVi: 'Hệ thống chung (Global)',
    type: 'navigation',
    typeLabelVi: 'Điều hướng / Hệ thống',
    selector: '#global-right-sidebar-panel',
    dimensions: 'Fixed 72px / Collapsible',
    status: 'shared',
    descriptionVi: 'Widget thời tiết TP.HCM trong suốt, nút kích hoạt nhanh Trợ lý AI và nút Quản trị hệ thống DEV.',
    tags: ['Right Sidebar', 'Weather', 'Admin', 'AI Quick']
  },
  {
    id: 'obj-global-pdf-preview-modal',
    nameVi: 'Cửa Sổ Xem Trước In Ấn & Xuất File TXT',
    nameEn: 'Print PDF Preview & Master TXT Export Modal',
    pageId: 'global',
    pageNameVi: 'Hệ thống chung (Global)',
    type: 'modal',
    typeLabelVi: 'Cửa sổ / Popup (Modal)',
    selector: '#global-pdf-preview-modal',
    dimensions: 'Full Screen Modal Overlay',
    status: 'shared',
    descriptionVi: 'Xem trước bản in A4, chọn ngôn ngữ (VI/EN) và nút tải file "Data CV NguyenHungThai - (dd.mm.yy).txt".',
    tags: ['PDF Modal', 'TXT Export', 'Print']
  }
];
