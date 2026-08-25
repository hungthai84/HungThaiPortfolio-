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
      "“Lắng nghe là nền tảng của mọi mối quan hệ bền vững.”",
    bannerQuoteEn:
      "“Listening is the foundation of every sustainable relationship.”",
    qnaList: [
      {
        qVi: "Trang Giới Thiệu thể hiện thông tin gì?",
        aVi: "Tổng quan về lãnh đạo CX Nguyễn Hùng Thái: 22+ năm kinh nghiệm, thông tin cá nhân, 3 trụ cột vận hành cốt lõi và định hướng hợp tác.",
        qEn: "What does the About page showcase?",
        aEn: "An executive overview of CX Leader Nguyễn Hùng Thái: 22+ years experience, personal info, 3 core operational pillars, and strategic partnership.",
      },
      {
        qVi: "3 Trụ cột vận hành cốt lõi là gì?",
        aVi: "01. Hiệu quả (SOP, FCR >85%, SLA), 02. Nhân văn (Thấu cảm, lắng nghe), 03. Bền vững (CRM & AI Automation).",
        qEn: "What are the 3 core operational pillars?",
        aEn: "01. Efficiency (SOP, FCR >85%, SLA), 02. Human-centric (Empathy, active listening), 03. Sustainability (CRM & AI Automation).",
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
  skills: {
    pageId: "skills",
    titleVi: "Tổng Kết Kỹ Năng & SWOT (Skills & SWOT Summary)",
    titleEn: "Skills & Personal SWOT Summary",
    bannerQuoteVi:
      "“Sự chuẩn bị tốt nhất cho tương lai chính là phát triển bản thân ở hiện tại.”",
    bannerQuoteEn:
      "“The best preparation for tomorrow is developing yourself today.”",
    qnaList: [
      {
        qVi: "Bộ kỹ năng quản trị cốt lõi là gì?",
        aVi: "Quản trị Contact Center, CRM Omnichannel, AI Chatbot/Voicebot, Đào tạo & Phát triển đội ngũ, Phân tích dữ liệu CSKH.",
        qEn: "What are the core management skills?",
        aEn: "Contact Center Management, Omnichannel CRM, AI Chatbot/Voicebot, Team Training & Development, CX Data Analytics.",
      },
      {
        qVi: "Phân tích Personal SWOT thể hiện điều gì?",
        aVi: "Điểm mạnh chuyên môn 20+ năm, điểm yếu cần cải thiện, cơ hội bứt phá công nghệ AI và thách thức thích ứng thị trường.",
        qEn: "What does the Personal SWOT analysis reveal?",
        aEn: "20+ years expertise strengths, areas for improvement, AI technology opportunities, and market adaptation challenges.",
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
  memories: {
    pageId: "memories",
    titleVi: "Tổng Kết Trang Kỷ Niệm (Memories Summary)",
    titleEn: "Memories Page Summary",
    bannerQuoteVi:
      "“Mỗi khoảnh khắc là một dấu ấn trong hành trình 22 năm cống hiến và phát triển chuyên môn.”",
    bannerQuoteEn:
      "“Every moment is a milestone in a 22-year journey of dedication and professional growth.”",
    qnaList: [
      {
        qVi: "Trang Kỷ niệm lưu trữ những gì?",
        aVi: "Kho lưu trữ hình ảnh về các sự kiện, dấu ấn làm việc tại các tập đoàn lớn như MoMo, Prudential, Mobifone...",
        qEn: "What does the Memories page store?",
        aEn: "A gallery of images from events and milestones at major corporations like MoMo, Prudential, Mobifone...",
      },
      {
        qVi: "Layout của trang Kỷ niệm có gì đặc biệt?",
        aVi: "Sử dụng bố cục Masonry (Pinterest-style) hiện đại, giúp hiển thị hình ảnh với nhiều kích thước khác nhau một cách thẩm mỹ.",
        qEn: "What is special about the Memories page layout?",
        aEn: "Uses a modern Masonry (Pinterest-style) layout, displaying images of varying sizes aesthetically.",
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
  education: {
    pageId: "education",
    titleVi: "Tổng Kết Học Vấn & Đào Tạo (Education Summary)",
    titleEn: "Education & Training Summary",
    bannerQuoteVi:
      "“Hành trình học tập suốt đời là nền tảng vững chắc cho mọi sự đổi mới và bứt phá trong sự nghiệp chuyên môn.”",
    bannerQuoteEn:
      "“A lifelong learning journey is the solid foundation for every innovation and breakthrough in professional career.”",
    qnaList: [
      {
        qVi: "Nền tảng học vấn chính quy của Hùng Thái là gì?",
        aVi: "Hùng Thái là Cử nhân Công nghệ thông tin (STU), tốt nghiệp năm 2007, đây là nền tảng quan trọng giúp kết hợp giữa Quản trị và Công nghệ.",
        qEn: "What is Hung Thai's formal educational background?",
        aEn: "Hung Thai is a Bachelor of Information Technology (STU), graduated in 2007, which is a key foundation for bridging Management and Technology.",
      },
      {
        qVi: "Hùng Thái có những chứng chỉ chuyên môn nào?",
        aVi: "Hùng Thái sở hữu nhiều chứng chỉ quốc tế và chuyên sâu như CCNA, MCSA, Quản trị rủi ro, Quản trị dự án và Quản lý cấp cao từ Dale Carnegie.",
        qEn: "What professional certifications does Hung Thai hold?",
        aEn: "Hung Thai holds several international and advanced certifications such as CCNA, MCSA, Risk Management, Project Management, and Executive Management from Dale Carnegie.",
      },
    ],
  },
  systems: {
    pageId: "systems",
    titleVi: "Tổng Kết Hệ Thống Năng Lực (Systems Summary)",
    titleEn: "Capability Systems Summary",
    bannerQuoteVi:
      "“Kiến trúc năng lực đa chiều là nền tảng vững chắc cho mọi thành công trong quản trị và vận hành.”",
    bannerQuoteEn:
      "“Multidimensional competency architecture is the solid foundation for all management and operational success.”",
    qnaList: [
      {
        qVi: "Hệ thống năng lực của Hùng Thái được chia như thế nào?",
        aVi: "Bao gồm 5 trụ cột chính: Chuyên môn CRM & Dữ liệu, Đổi mới & Số hóa, Lãnh đạo & Quản trị, Hợp tác & CX, và Ngôn ngữ toàn cầu.",
        qEn: "How are Hung Thai's capability systems categorized?",
        aEn: "Includes 5 main pillars: CRM & Data Expertise, Innovation & Digitalization, Leadership & Management, Collaboration & CX, and Global Languages.",
      },
      {
        qVi: "Điểm nổi bật nhất trong biểu đồ năng lực radar là gì?",
        aVi: "Sự cân bằng cao giữa năng lực công nghệ (AI/CRM) và quản trị lãnh đạo quy mô lớn với điểm trung bình ấn tượng.",
        qEn: "What is the most highlight in the radar competency chart?",
        aEn: "High balance between technology capabilities (AI/CRM) and large-scale leadership management with an impressive average score.",
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
  templateTest: {
    pageId: "templateTest",
    titleVi: "Tổng Kết Trang Mẫu Kiểm Thử (Template Test Summary)",
    titleEn: "Template Test Showcase Summary",
    bannerQuoteVi:
      "“Mẫu dữ liệu chuẩn hóa giúp kiểm thử toàn diện giao diện, hiệu ứng ánh sáng pháp thuật và công cụ X-Ray.”",
    bannerQuoteEn:
      "“Standardized template data enables comprehensive testing of UI components, magical lighting, and X-Ray.”",
    qnaList: [
      {
        qVi: "Trang mẫu kiểm thử có chức năng gì?",
        aVi: "Cung cấp các widget tương tác, biểu mẫu test, bảng dữ liệu mẫu và hiển thị hiệu ứng ánh sáng pháp thuật chuột.",
        qEn: "What is the purpose of the template test page?",
        aEn: "Provides interactive widgets, sample form inputs, data tables, and magical cursor lighting effects.",
      },
      {
        qVi: "Có thể chỉnh sửa trang này bằng X-Ray không?",
        aVi: "Hoàn toàn có thể. Mọi phần tử trên trang mẫu này đều tương thích đầy đủ với trình biên tập X-Ray Prompt.",
        qEn: "Can this page be inspected with X-Ray?",
        aEn: "Yes, every element on this template page is fully compatible with the X-Ray Prompt Editor.",
      },
    ],
  },
  tuvi: {
    pageId: "tuvi",
    titleVi: "Tổng Kết Tử Vi Bản Mệnh (Horoscope Summary)",
    titleEn: "Horoscope & Five-Elements Destiny Summary",
    bannerQuoteVi:
      "“Tâm tĩnh như thủy, trí sáng như kim – 22 năm rèn giũa đạo tâm và mưu lược vận hành.”",
    bannerQuoteEn:
      "“Mind calm as water, intellect sharp as gold – 22 years of cultivating operational wisdom and ethical leadership.”",
    qnaList: [
      {
        qVi: "Bản mệnh Giáp Tý 1984 mang ý nghĩa gì trong sự nghiệp quản trị?",
        aVi: "Mệnh Hải Trung Kim tượng trưng cho nguồn nội lực thâm sâu, bền bỉ, tính cách điềm tĩnh và tư duy chiến lược dài hạn.",
        qEn: "What does the 1984 Giáp Tý destiny signify in management?",
        aEn: "Sea Metal (Hải Trung Kim) represents deep inner resilience, steady composure, and strategic long-term execution.",
      },
      {
        qVi: "Triết lý ngũ hành được ứng dụng vào vận hành CX như thế nào?",
        aVi: "Hài hòa giữa Kim (quy trình SLA), Thủy (luồng dữ liệu CRM/AI), Mộc (phát triển nhân tài), Hỏa (nhiệt huyết CX) và Thổ (hạ tầng vững chắc).",
        qEn: "How is the five-elements philosophy applied to CX operations?",
        aEn: "Harmonizes Metal (SLA processes), Water (CRM/AI data flow), Wood (talent coaching), Fire (CX passion), and Earth (infrastructure stability).",
      },
    ],
  },
  websiteManagement: {
    pageId: "websiteManagement",
    titleVi: "Hệ Thống Quản Trị Website (Website System)",
    titleEn: "Website Management System",
    bannerQuoteVi:
      "“Kiểm soát tập trung, cấu trúc đồng bộ và quy trình xác thực độc lập là chìa khóa của một hệ thống bền vững.”",
    bannerQuoteEn:
      "“Centralized control, synchronized structure, and independent validation are keys to a sustainable system.”",
    qnaList: [
      {
        qVi: "Hệ thống quản trị cung cấp những module nào?",
        aVi: "Bao gồm 24 module độc lập từ Quét Website, Kho đối tượng, Hệ thống Component đến Tùy chỉnh mã nguồn (Custom Code).",
        qEn: "What modules does the management system provide?",
        aEn: "Includes 24 independent modules from Website Scan, Object Inventory, Component System to Custom Code integration.",
      },
      {
        qVi: "Quy trình thực hiện thay đổi diễn ra như thế nào?",
        aVi: "Hệ thống tuân thủ nguyên tắc: Kiểm tra → Preview → Người dùng xác nhận → Thực hiện. Tuyệt đối không tự động thay đổi dữ liệu.",
        qEn: "How does the change process work?",
        aEn: "The system follows: Check → Preview → User Confirm → Apply. It never automatically modifies data without approval.",
      },
    ],
  },
};
