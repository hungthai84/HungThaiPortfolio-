import { PageId } from "../types";

export interface PageSummaryQnA {
  qVi: string;
  aVi: string;
  qEn: string;
  aEn: string;
}

export interface PageSummaryInfo {
  pageId: PageId;
  titleVi: string;
  titleEn: string;
  bannerQuoteVi: string;
  bannerQuoteEn: string;
  qnaList: PageSummaryQnA[];
}

export const pageSummariesData: Record<PageId, PageSummaryInfo> = {
  home: {
    pageId: "home",
    titleVi: "Tổng Kết Trang Chủ (Home Summary)",
    titleEn: "Home Page Summary",
    bannerQuoteVi:
      "“Lấy khách hàng làm trung tâm là kim chỉ nam cho mọi hành trình chuyển đổi số và phát triển bền vững.”",
    bannerQuoteEn:
      "“Customer-centricity is the compass for every digital transformation and sustainable development journey.”",
    qnaList: [
      {
        qVi: "Hùng Thái là ai và có vị thế gì trong ngành Trải nghiệm Khách hàng?",
        aVi: "Chuyên gia Trải nghiệm Khách hàng (Head of CX / CS Director) với 22+ năm kinh nghiệm quản lý hệ thống Contact Center quy mô lớn tại Ví MoMo, Prudential, Mobifone, Garena...",
        qEn: "Who is Hung Thai and what is his status in Customer Experience?",
        aEn: "Customer Experience Expert (Head of CX / CS Director) with 22+ years managing large-scale Contact Centers at MoMo E-Wallet, Prudential, Mobifone, Garena...",
      },
      {
        qVi: "Điểm mạnh cốt lõi nổi bật nhất là gì?",
        aVi: "Kết hợp hoàn hảo giữa tư duy vận hành thực chiến và ứng dụng công nghệ CRM Omnichannel & AI Chatbot tự động hóa.",
        qEn: "What is the most prominent core strength?",
        aEn: "A perfect combination of hands-on operational thinking and automated CRM Omnichannel & AI Chatbot technology.",
      },
    ],
  },
  coverLetter: {
    pageId: "coverLetter",
    titleVi: "Tổng Kết Thư Ngỏ (Cover Letter Summary)",
    titleEn: "Cover Letter Summary",
    bannerQuoteVi:
      "“Customer Experience là chiến lược toàn diện nâng cao giá trị thương hiệu và tối ưu chi phí phục vụ.”",
    bannerQuoteEn:
      "“Customer Experience is a comprehensive strategy to enhance brand value and optimize cost-to-serve.”",
    qnaList: [
      {
        qVi: "Thông điệp chính trong thư ngỏ gửi nhà tuyển dụng là gì?",
        aVi: "Tuyên ngôn nâng tầm trải nghiệm khách hàng, giảm chi phí vận hành (Cost-to-Serve) và tối ưu tỷ lệ giữ chân (Retention Rate).",
        qEn: "What is the core message of the cover letter to recruiters?",
        aEn: "A manifesto to elevate customer experience, reduce Cost-to-Serve, and optimize Retention Rate.",
      },
      {
        qVi: "Mục tiêu đồng hành cùng doanh nghiệp là gì?",
        aVi: "Xây dựng văn hóa lấy khách hàng làm trung tâm và kiến tạo hệ thống CS tự động hóa hiện đại.",
        qEn: "What is the goal when joining an enterprise?",
        aEn: "Building a customer-centric culture and establishing a modern automated CS system.",
      },
    ],
  },
  about: {
    pageId: "about",
    titleVi: "Tổng Kết Trang Giới Thiệu (About Summary)",
    titleEn: "About Page Summary",
    bannerQuoteVi:
      "“Tận tâm chăm sóc – Vận hành hiệu quả! Sự hài lòng của khách hàng là thước đo giá trị bền vững.”",
    bannerQuoteEn:
      "“Dedicated care – Efficient operation! Customer satisfaction is the measure of sustainable value.”",
    qnaList: [
      {
        qVi: "Triết lý quản trị nổi bật của Hùng Thái là gì?",
        aVi: "Lắng nghe chân thành, thấu hiểu chiều sâu và giải quyết vấn đề với tinh thần trách nhiệm cao nhất.",
        qEn: "What is Hung Thai's core management philosophy?",
        aEn: "Sincere listening, deep understanding, and solving problems with the highest sense of responsibility.",
      },
      {
        qVi: "Định hướng phát triển sự nghiệp trong tương lai?",
        aVi: "Trở thành Giám đốc Trải nghiệm Khách hàng (Chief Customer Officer - CCO) dẫn dắt chuyển đổi số CX toàn diện.",
        qEn: "What is the future career orientation?",
        aEn: "To become a Chief Customer Officer (CCO) leading comprehensive CX digital transformation.",
      },
    ],
  },
  experience: {
    pageId: "experience",
    titleVi: "Tổng Kết Kinh Nghiệm Thực Chiến (Experience Summary)",
    titleEn: "Experience Summary",
    bannerQuoteVi:
      "“Hơn 22 năm tâm huyết: Mỗi trải nghiệm khách hàng là cơ hội khẳng định chất lượng dịch vụ đỉnh cao.”",
    bannerQuoteEn:
      "“22+ years of dedication: Every customer interaction is an opportunity to assert top service quality.”",
    qnaList: [
      {
        qVi: "Các tập đoàn lớn Hùng Thái đã từng quản lý vận hành?",
        aVi: "Ví MoMo, Prudential Vietnam, Mobifone, VED (Garena), HTVC và Finviet.",
        qEn: "Which major corporations has Hung Thai managed?",
        aEn: "MoMo E-Wallet, Prudential Vietnam, Mobifone, VED (Garena), HTVC, and Finviet.",
      },
      {
        qVi: "Quy mô đội ngũ và hệ thống lớn nhất đã từng dẫn dắt?",
        aVi: "Quản lý trực tiếp đội ngũ 150+ nhân sự và tổng đài phục vụ hàng triệu khách hàng giao dịch hàng ngày.",
        qEn: "What was the largest team size and system managed?",
        aEn: "Directly managed a team of 150+ members and call centers serving millions of daily active customers.",
      },
    ],
  },
  education: {
    pageId: "education",
    titleVi: "Tổng Kết Học Vấn & Bằng Cấp (Education Summary)",
    titleEn: "Education & Certifications Summary",
    bannerQuoteVi:
      "“Tri thức là nền tảng vững chắc cho sự cải tiến liên tục và phát triển chuyên môn sâu sắc.”",
    bannerQuoteEn:
      "“Knowledge is the firm foundation for continuous improvement and deep professional expertise.”",
    qnaList: [
      {
        qVi: "Trình độ chuyên môn và chứng chỉ quốc tế sở hữu?",
        aVi: "Cử nhân ĐH Kỹ Thuật Công Nghệ, cùng các chứng chỉ quản lý Contact Center & CX Leadership cao cấp.",
        qEn: "What are the academic qualifications and certificates?",
        aEn: "Bachelor Degree from HUTECH, alongside advanced Contact Center & CX Leadership certificates.",
      },
      {
        qVi: "Phương châm học tập và trau dồi tri thức?",
        aVi: "Học tập liên tục (Lifelong Learning) và cập nhật xu hướng công nghệ AI mới nhất trong quản trị.",
        qEn: "What is the learning motto?",
        aEn: "Lifelong Learning and constantly updating the latest AI technology trends in management.",
      },
    ],
  },
  skills: {
    pageId: "skills",
    titleVi: "Tổng Kết Bản Đồ Kỹ Năng (Skills Summary)",
    titleEn: "Skills Matrix Summary",
    bannerQuoteVi:
      "“Sức mạnh của chuyên môn không nằm ở lý thuyết, mà nằm ở hệ thống vận hành thực chiến tối ưu.”",
    bannerQuoteEn:
      "“The power of expertise lies not in theory, but in an optimized hands-on operational system.”",
    qnaList: [
      {
        qVi: "Bộ kỹ năng CX/CS cốt lõi gồm những gì?",
        aVi: "Thiết kế hành trình khách hàng (Journey Mapping), Quản trị KPI CSAT/NPS/FCR, Vận hành CRM Omnichannel.",
        qEn: "What are the core CX/CS skills?",
        aEn: "Customer Journey Mapping, CSAT/NPS/FCR KPI Management, and CRM Omnichannel Operations.",
      },
      {
        qVi: "Kỹ năng ứng dụng công nghệ và lãnh đạo?",
        aVi: "Lập kế hoạch chiến lược, đào tạo đội ngũ, triển khai AI Bot & Tự động hóa quy trình (Automation Workflows).",
        qEn: "What about tech application and leadership skills?",
        aEn: "Strategic planning, team training, AI Bot deployment & Automation Workflows.",
      },
    ],
  },
  industries: {
    pageId: "industries",
    titleVi: "Tổng Kết Lĩnh Vực Hoạt Động (Industries Summary)",
    titleEn: "Industries Domain Summary",
    bannerQuoteVi:
      "“Thấu hiểu đặc thù từng ngành nghề là chìa khóa xây dựng giải pháp chăm sóc khách hàng tối ưu.”",
    bannerQuoteEn:
      "“Understanding industry nuances is key to crafting optimal customer care solutions.”",
    qnaList: [
      {
        qVi: "Những lĩnh vực ngành nghề chính đã từng kinh qua?",
        aVi: "FinTech & Ví điện tử, Bảo hiểm nhân thọ, Viễn thông, Game & Giải trí trực tuyến, Bưu chính & Thương mại điện tử.",
        qEn: "Which main industry sectors has he operated in?",
        aEn: "FinTech & E-Wallets, Life Insurance, Telecom, Gaming & Entertainment, Post & E-Commerce.",
      },
      {
        qVi: "Mỗi lĩnh vực mang lại giá trị thực chiến gì?",
        aVi: "Khả năng thích ứng linh hoạt với mọi mô hình nghiệp vụ phức tạp và đòi hỏi tiêu chuẩn chất lượng cao nhất.",
        qEn: "What practical value does each industry experience bring?",
        aEn: "Flexible adaptability to complex business models requiring the highest quality standards.",
      },
    ],
  },
  projects: {
    pageId: "projects",
    titleVi: "Tổng Kết Dự Án Trọng Điểm (Projects Summary)",
    titleEn: "Key Projects Summary",
    bannerQuoteVi:
      "“Biến tầm nhìn chiến lược thành kết quả thực tế qua từng giải pháp chuyển đổi CX toàn diện.”",
    bannerQuoteEn:
      "“Turning strategic vision into concrete results through comprehensive CX transformation solutions.”",
    qnaList: [
      {
        qVi: "Những dự án trọng điểm nổi bật đã hoàn thành?",
        aVi: "Xây dựng Tổng đài Chăm sóc Khách hàng CSKH Goal, Chuyển đổi số CRM Omnichannel, Triển khai AI Chatbot 24/7.",
        qEn: "What are the key completed benchmark projects?",
        aEn: "CSKH Goal Contact Center construction, CRM Omnichannel Digital Transformation, 24/7 AI Chatbot Deployment.",
      },
      {
        qVi: "Kết quả đo lường cụ thể từ các dự án?",
        aVi: "Tăng tỷ lệ CSAT lên 98%, giảm 35% thời gian xử lý khiếu nại và tiết kiệm 25% chi phí vận hành hàng năm.",
        qEn: "What were the measurable results of these projects?",
        aEn: "Increased CSAT to 98%, reduced complaint handling time by 35%, and saved 25% annual operational costs.",
      },
    ],
  },
  systems: {
    pageId: "systems",
    titleVi: "Tổng Kết Kiến Trúc Hệ Thống (Systems Architecture Summary)",
    titleEn: "Systems Architecture Summary",
    bannerQuoteVi:
      "“Quy trình chuẩn mực và tự động hóa thông minh là nền tảng bứt phá của doanh nghiệp hiện đại.”",
    bannerQuoteEn:
      "“Standardized workflows and smart automation form the foundation for modern enterprise breakthroughs.”",
    qnaList: [
      {
        qVi: "Mô hình kiến trúc hệ thống CRM & Call Center tiêu chuẩn?",
        aVi: "Tích hợp Omnichannel Call Center, AI Voicebot, Ticketing System & Báo cáo Real-time Dashboard.",
        qEn: "What is the standard CRM & Call Center architecture model?",
        aEn: "Integrated Omnichannel Call Center, AI Voicebot, Ticketing System & Real-time Dashboard reporting.",
      },
      {
        qVi: "Khả năng mở rộng và độ tin cậy của hệ thống?",
        aVi: "Khả năng mở rộng linh hoạt, uptime 99.99% và đáp ứng quy mô hàng triệu tương tác mỗi tháng.",
        qEn: "What is the system scalability and reliability?",
        aEn: "Flexible scalability, 99.99% uptime, serving millions of monthly interactions.",
      },
    ],
  },
  interview: {
    pageId: "interview",
    titleVi: "Tổng Kết Phỏng Vấn AI (AI Interview Summary)",
    titleEn: "AI Mock Interview Summary",
    bannerQuoteVi:
      "“Công nghệ AI kết hợp thấu cảm con người tạo nên trải nghiệm tương tác trực quan và hiệu quả.”",
    bannerQuoteEn:
      "“AI technology combined with human empathy creates an intuitive and efficient interaction experience.”",
    qnaList: [
      {
        qVi: "Tính năng phỏng vấn AI hỗ trợ những gì?",
        aVi: "Mô phỏng buổi phỏng vấn tuyển dụng vị trí Head of CS / CX Director với bộ câu hỏi tình huống thực chiến.",
        qEn: "What does the AI Interview feature support?",
        aEn: "Simulates a recruitment interview for Head of CS / CX Director with real-world situational questions.",
      },
      {
        qVi: "Lợi ích dành cho nhà tuyển dụng?",
        aVi: "Đánh giá nhanh năng lực xử lý tình huống, phản xạ điều hành và tư duy quản trị dịch vụ.",
        qEn: "What is the benefit for recruiters?",
        aEn: "Rapid assessment of problem-solving ability, operational reflexes, and service management mindset.",
      },
    ],
  },
  astrology: {
    pageId: "astrology",
    titleVi: "Tổng Kết Tử Vi & Phong Thủy Nghề Nghiệp (Astrology Summary)",
    titleEn: "Career Astrology & Feng Shui Summary",
    bannerQuoteVi:
      "“Lấy cái TÂM làm gốc, lấy sự ĐIỀM TĨNH làm sức mạnh để dẫn dắt con người và hệ thống.”",
    bannerQuoteEn:
      "“Mindfulness as the root, composure as the strength to guide people and systems.”",
    qnaList: [
      {
        qVi: "Khám phá chỉ số phong thủy và tử vi nghề nghiệp?",
        aVi: "Sự kết hợp giữa mệnh phong thủy và tính cách lãnh đạo: Điềm tĩnh, kiên trì, sâu sắc và lấy tâm làm gốc.",
        qEn: "What does the career astrology insight reveal?",
        aEn: "A harmony of Feng Shui elements and leadership traits: Composed, persistent, deep, and mindful.",
      },
      {
        qVi: "Ý nghĩa trong công việc và quan hệ đồng nghiệp?",
        aVi: "Lắng nghe chân thành, tạo dựng niềm tin và truyền cảm hứng tích cực cho đội ngũ nhân sự.",
        qEn: "What is the significance in teamwork and culture?",
        aEn: "Sincere listening, building trust, and inspiring positive energy across teams.",
      },
    ],
  },
  memories: {
    pageId: "memories",
    titleVi: "Tổng Kết Kỷ Niệm & Hoạt Động (Memories Summary)",
    titleEn: "Memories & Highlights Summary",
    bannerQuoteVi:
      "“Những khoảnh khắc đáng nhớ cùng đội ngũ là minh chứng cho tinh thần đoàn kết và khát vọng vươn lên.”",
    bannerQuoteEn:
      "“Memorable team moments demonstrate unity and relentless ambition for excellence.”",
    qnaList: [
      {
        qVi: "Bộ sưu tập hình ảnh lưu giữ những khoảnh khắc nào?",
        aVi: "Các sự kiện teambuilding, lễ trao giải cống hiến, hoạt động đào tạo và kỷ niệm đồng hành cùng các đội ngũ.",
        qEn: "What moments does the photo collection capture?",
        aEn: "Teambuilding events, dedication awards, training programs, and memorable team milestones.",
      },
      {
        qVi: "Văn hóa doanh nghiệp được thể hiện ra sao?",
        aVi: "Tinh thần đoàn kết, gắn kết bền chặt và môi trường làm việc sáng tạo, chuyên nghiệp.",
        qEn: "How is corporate culture reflected?",
        aEn: "Solidarity, strong engagement, and a creative, professional work environment.",
      },
    ],
  },
  aiChat: {
    pageId: "aiChat",
    titleVi: "Tổng Kết Trợ Lý AI (AI Assistant Summary)",
    titleEn: "AI Assistant Summary",
    bannerQuoteVi:
      "“Sẵn sàng tư vấn và giải đáp 24/7 mọi thông tin về năng lực, kinh nghiệm và dự án của Hùng Thái.”",
    bannerQuoteEn:
      "“Ready 24/7 to answer all queries regarding Hung Thai's skills, experience, and projects.”",
    qnaList: [
      {
        qVi: "Trợ lý AI Hùng Thái có thể giải đáp những thông tin gì?",
        aVi: "Tư vấn chi tiết kinh nghiệm làm việc, bộ kỹ năng, các dự án đã thực hiện và hỗ trợ kết nối đặt lịch hẹn 24/7.",
        qEn: "What information can Hung Thai AI Assistant provide?",
        aEn: "Detailed insights into work experience, skills, completed projects, and 24/7 booking support.",
      },
      {
        qVi: "Mức độ chính xác và phản hồi như thế nào?",
        aVi: "Phản hồi tức thì, chính xác 100% dựa trên toàn bộ cơ sở dữ liệu hồ sơ năng lực của Hùng Thái.",
        qEn: "How accurate and fast is the response?",
        aEn: "Instant responses, 100% accurate based on Hung Thai's comprehensive portfolio database.",
      },
    ],
  },
  wallpapers: {
    pageId: "wallpapers",
    titleVi: "Tổng Kết Bộ Sưu Tập Hình Nền (Wallpapers Summary)",
    titleEn: "Wallpapers Collection Summary",
    bannerQuoteVi:
      "“Không gian làm việc thị giác đẹp mắt khơi nguồn cảm hứng sáng tạo và gia tăng hiệu suất vận hành.”",
    bannerQuoteEn:
      "“A visually stunning workspace sparks creative inspiration and boosts operational productivity.”",
    qnaList: [
      {
        qVi: "Trang Hình Nền hỗ trợ những tính năng gì?",
        aVi: "Duyệt 25+ hình nền chất lượng cao 4K, tải ảnh tùy chỉnh từ máy tính hoặc dán URL, xóa và khôi phục hình nền linh hoạt.",
        qEn: "What features does the Wallpapers page provide?",
        aEn: "Browse 25+ 4K wallpapers, upload custom files or paste URLs, delete and restore wallpapers seamlessly.",
      },
      {
        qVi: "Hình nền có tự động thích ứng với giao diện không?",
        aVi: "Hệ thống tự động đồng bộ chế độ Sáng/Tối và màu nhấn chủ đạo tương thích với sắc thái của từng hình nền.",
        qEn: "Do wallpapers adapt to the UI theme automatically?",
        aEn: "The system automatically synchronizes Light/Dark modes and accent colors to match the mood of each wallpaper.",
      },
    ],
  },
};
