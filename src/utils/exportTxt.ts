import { contentData } from "../data";
import {
  principlesData,
  timelineData,
  coreValuesData,
} from "../data/coverLetterData";
import { caseStudiesMap } from "../data/caseStudiesData";
import { projectsData } from "../data/projectsData";
import { PREDEFINED_ANSWERS, aiCategories } from "../data/aiQuestions";
import { INTERVIEW_QUESTIONS, INTERVIEW_VIDEO_1_URL, INTERVIEW_VIDEO_2_URL } from "../data/interviewQuestions";

export const generateTxtString = (): string => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const fullYear = now.getFullYear();

  let text = "";
  const sepLine = "========================================================================================\n";
  const subLine = "----------------------------------------------------------------------------------------\n";

  // HEADER & BANNER
  text += sepLine;
  text += "                 HỒ SƠ NĂNG LỰC TOÀN DIỆN (EXECUTIVE CV & PORTFOLIO DATA)\n";
  text += "                            ỨNG VIÊN: NGUYỄN HÙNG THÁI\n";
  text += `                VỊ TRÍ: HEAD OF CUSTOMER EXPERIENCE / CS DIRECTOR\n`;
  text += `                    NGÀY XUẤT DỮ LIỆU: ${dd}/${mm}/${fullYear}\n`;
  text += sepLine;
  text += "\n";

  const data: any = contentData;

  // =========================================================================
  // 1. TRANG CHỦ (HOME)
  // =========================================================================
  text += sepLine;
  text += "1. TRANG CHỦ (HOME) - TỔNG QUAN HỒ SƠ & ĐỊNH VỊ CHUYÊN GIA\n";
  text += sepLine;
  text += "Tuyên ngôn định vị & Khẩu hiệu hành động:\n";
  data.taglines?.forEach((t: string, idx: number) => {
    text += `  [${idx + 1}] ${t}\n`;
  });
  text += "\nThông tin cá nhân & Liên hệ chính thức:\n";
  data.personalInfo?.forEach((info: any) => {
    text += `  - ${info.label.padEnd(20, " ")}: ${info.value}\n`;
  });
  text += "\nCác chỉ số thực chiến cốt lõi:\n";
  text += "  * Thâm niên chuyên môn     : 22+ năm liên tục trong ngành Dịch vụ Khách hàng & Contact Center\n";
  text += "  * Quy mô quản trị nhân sự  : Lên đến 150+ nhân sự điều hành đa ca, đa kênh\n";
  text += "  * Lĩnh vực thực chiến      : 6+ Ngành (FinTech, Bảo hiểm, Bưu chính, Game/eSports, Viễn thông, CRM)\n";
  text += "  * Chỉ số hài lòng CSAT/NPS : Đạt trên 95% - 98% qua các nhiệm kỳ quản lý\n";
  text += "\n";

  // =========================================================================
  // 2. THƯ NGỎ (COVER LETTER)
  // =========================================================================
  text += sepLine;
  text += "2. THƯ NGỎ (COVER LETTER) - TUYÊN NGÔN SỨ MỆNH NÂNG TẦM TRẢI NGHIỆM KHÁCH HÀNG\n";
  text += sepLine;
  text += "Kính gửi: Quý Ban Lãnh Đạo & Hội đồng Tuyển dụng Doanh nghiệp,\n\n";
  text += "Tôi là Nguyễn Hùng Thái – Chuyên gia Quản trị Trải nghiệm Khách hàng (Head of CX / CS Director)\n";
  text += "với hơn 22 năm cống hiến và đồng hành cùng các thương hiệu đầu ngành như MoMo, Prudential,\n";
  text += "VED/Garena, Mobifone, Finviet...\n\n";
  text += "Trong kỷ nguyên số hóa và trí tuệ nhân tạo (AI), tôi tin rằng dịch vụ khách hàng xuất sắc\n";
  text += "không chỉ là giải quyết sự cố, mà là kiến tạo một hệ sinh thái chăm sóc chủ động, thấu cảm\n";
  text += "và tối ưu hóa chi phí vận hành (Cost-to-Serve) bằng công nghệ hiện đại.\n\n";
  
  text += subLine;
  text += "CÁC NGUYÊN TẮC QUẢN TRỊ THEN CHỐT (CORE PRINCIPLES):\n";
  principlesData?.forEach((p: any, idx: number) => {
    text += `  ${idx + 1}. ${p.titleVi}\n`;
    text += `     ${p.descVi}\n`;
  });

  text += "\nHÀNH TRÌNH PHÁT TRIỂN & CỘT MỐC (TIMELINE):\n";
  timelineData?.forEach((t: any) => {
    text += `  * [${t.year}] - ${t.roleVi}\n`;
    text += `    ${t.descVi}\n`;
  });

  text += "\nGIÁ TRỊ CỐT LÕI (CORE VALUES):\n";
  coreValuesData?.forEach((c: any, idx: number) => {
    text += `  [${idx + 1}] ${c.titleVi}: ${c.descVi}\n`;
  });
  text += "\n";

  // =========================================================================
  // 3. GIỚI THIỆU (ABOUT)
  // =========================================================================
  text += sepLine;
  text += "3. GIỚI THIỆU (ABOUT) - HỒ SƠ NĂNG LỰC & TRIẾT LÝ QUẢN TRỊ CX\n";
  text += sepLine;
  text += "Triết lý Quản trị: “Lấy Khách Hàng Làm Trọng Tâm – Dẫn Dắt Bằng Dữ Liệu & Thấu Cảm”\n\n";
  text += "Mô hình Kim Tự Tháp 4 Trụ Cột Vận Hành CX:\n";
  text += "  1. CON NGƯỜI (PEOPLE)   : Tuyển dụng chuẩn xác, đào tạo chuyên sâu, truyền lửa văn hóa thấu cảm.\n";
  text += "  2. QUY TRÌNH (PROCESS)  : Chuẩn hóa SOP, SLA, FCR, xử lý khiếu nại phân tầng minh bạch.\n";
  text += "  3. CÔNG NGHỆ (TECH/AI)  : Ứng dụng CRM Omnichannel, AI Chatbot 24/7, VoIP Cloud PBX.\n";
  text += "  4. DỮ LIỆU (DATA/KPI)   : Giám sát Dashboard thời gian thực, phân tích Voice of Customer (VoC).\n\n";
  text += "Định hướng hợp tác & Giá trị gia tăng cho tổ chức:\n";
  text += "  - Tối ưu hóa chi phí phục vụ mỗi lượt tương tác (Cost-per-Contact reduction).\n";
  text += "  - Nâng tỷ lệ giải quyết cuộc gọi đầu tiên (First Call Resolution - FCR) lên trên 85%.\n";
  text += "  - Xây dựng đội ngũ kế thừa vững chuyên môn, tâm huyết và gắn kết lâu dài.\n\n";

  // =========================================================================
  // 4. HỌC VẤN & PHÁT TRIỂN CHUYÊN MÔN (EDUCATION)
  // =========================================================================
  text += sepLine;
  text += "4. HỌC VẤN (EDUCATION) - BẰNG CẤP & ĐÀO TẠO CHUYÊN SÂU\n";
  text += sepLine;
  text += "* 1. Cử nhân Công nghệ Thông tin (Bachelor of Information Technology)\n";
  text += "  - Chuyên ngành : Kỹ thuật Mạng máy tính & Hệ thống Viễn thông\n";
  text += "  - Nền tảng     : Thiết kế hạ tầng mạng, cơ sở dữ liệu, viễn thông và bảo mật hệ thống.\n\n";
  text += "* 2. Khóa đào tạo Quản lý Cấp cao (Executive Management)\n";
  text += "  - Đơn vị đào tạo : Prudential Vietnam & Các tổ chức Quản trị uy tín\n";
  text += "  - Nội dung       : Nghệ thuật lãnh đạo, hoạch định chiến lược phòng ban, truyền cảm hứng đội ngũ.\n\n";
  text += "* 3. Quản lý Dự án Chuyên nghiệp (Project Management)\n";
  text += "  - Đơn vị đào tạo : Prudential Vietnam\n";
  text += "  - Mã chứng chỉ   : PRU-PM-2016-042\n";
  text += "  - Nội dung       : Quản trị tiến độ, tối ưu ngân sách, kiểm soát phạm vi và rủi ro dự án.\n\n";
  text += "* 4. Quản trị Rủi ro Doanh nghiệp (Risk Management)\n";
  text += "  - Đơn vị đào tạo : Prudential Vietnam\n";
  text += "  - Mã chứng chỉ   : PRU-RM-2017-104\n";
  text += "  - Nội dung       : Nhận diện rủi ro vận hành, xử lý khủng hoảng truyền thông & khiếu nại VIP.\n\n";
  text += "* 5. Phân tích Dữ liệu Nâng cao (Data Analytics & Big Data)\n";
  text += "  - Năm thực hiện  : 2019\n";
  text += "  - Nội dung       : Phân tích hành vi khách hàng, trực quan hóa Dashboard KPI & Data-driven Decision.\n\n";
  text += "* 6. Phát triển Web & Ứng dụng AI (Modern Web & AI Integration)\n";
  text += "  - Năm thực hiện  : 2024 - 2026\n";
  text += "  - Nội dung       : React, TypeScript, AI Agent Workflows, kiến trúc CRM & Automation Bots.\n\n";

  // =========================================================================
  // 5. KINH NGHIỆM LÀM VIỆC (EXPERIENCE)
  // =========================================================================
  text += sepLine;
  text += "5. KINH NGHIỆM LÀM VIỆC (EXPERIENCE) - 22+ NĂM LỊCH SỬ CÔNG TÁC THỰC CHIẾN\n";
  text += sepLine;
  data.experience?.forEach((exp: any, idx: number) => {
    text += `[Mốc ${idx + 1}] ${exp.company} ${exp.subTitle || ""}\n`;
    text += `  - Vai trò / Chức danh : ${exp.role}\n`;
    text += `  - Thời gian công tác  : ${exp.time} (${exp.yearStart} - ${exp.yearEnd})\n`;
    text += `  - Quy mô nhân sự      : ${exp.staff > 0 ? `${exp.staff} nhân sự trực tiếp` : "Lãnh đạo cấp phòng ban / Chiến lược gia"}\n`;
    text += `  - Lĩnh vực hoạt động  : ${exp.categoryName || exp.category}\n`;
    text += `  - Tổng quan mô tả     :\n`;
    const cleanDesc = (exp.desc || "").replace(/## /g, "").replace(/\*\*/g, "");
    text += `    ${cleanDesc.split("\n").join("\n    ")}\n`;
    
    if (exp.tasks && exp.tasks.length > 0) {
      text += `  - Trách nhiệm & Nhiệm vụ then chốt:\n`;
      exp.tasks.forEach((t: string) => text += `    + ${t}\n`);
    }

    if (exp.achievements && exp.achievements.length > 0) {
      text += `  - Thành tựu & Chỉ số ghi nhận:\n`;
      exp.achievements.forEach((a: any) => text += `    * ${a.name}: ${a.score}%\n`);
    }

    if (exp.projects && exp.projects.length > 0) {
      text += `  - Các dự án trọng điểm đã điều hành:\n`;
      exp.projects.forEach((p: string) => text += `    > ${p}\n`);
    }
    text += "\n";
  });

  // =========================================================================
  // 6. LĨNH VỰC HOẠT ĐỘNG (INDUSTRIES)
  // =========================================================================
  text += sepLine;
  text += "6. LĨNH VỰC HOẠT ĐỘNG (INDUSTRIES) - 6+ MIỀN NGHIỆP VỤ CHUYÊN SÂU\n";
  text += sepLine;
  data.domains?.forEach((d: any, idx: number) => {
    text += `* Lĩnh vực ${idx + 1}: ${d.title} (${d.badge || ""})\n`;
    text += `  - Mô tả năng lực  : ${d.desc}\n`;
    if (d.highlights) {
      text += `  - Điểm sáng thực thi:\n`;
      d.highlights.forEach((h: string) => text += `    + ${h}\n`);
    }
    if (d.logos) {
      text += `  - Doanh nghiệp & Thương hiệu tiêu biểu: ${d.logos.map((l: any) => l.name).join(", ")}\n`;
    }
    text += "\n";
  });

  // =========================================================================
  // 7. BẢN ĐỒ KỸ NĂNG (SKILLS MATRIX)
  // =========================================================================
  text += sepLine;
  text += "7. BẢN ĐỒ KỸ NĂNG (SKILLS) - NĂNG LỰC CHUYÊN MÔN & ĐÁNH GIÁ THỰC TẾ\n";
  text += sepLine;
  if (data.skills) {
    text += "A. KỸ NĂNG CHUYÊN MÔN CRM & CONTACT CENTER:\n";
    data.skills.professional?.forEach((s: any) => {
      text += `  - ${s.name.padEnd(28, " ")}: ${s.level}% ${"█".repeat(Math.round(s.level / 10))}\n`;
    });

    text += "\nB. LÃNH ĐẠO, QUẢN TRỊ ĐỘI NGŨ & DỰ ÁN:\n";
    data.skills.leadership?.forEach((s: any) => {
      text += `  - ${s.name.padEnd(28, " ")}: ${s.level}% ${"█".repeat(Math.round(s.level / 10))}\n`;
    });

    text += "\nC. PHỐI HỢP LIÊN PHÒNG & TRẢI NGHIỆM KHÁCH HÀNG:\n";
    data.skills.collaboration?.forEach((s: any) => {
      text += `  - ${s.name.padEnd(28, " ")}: ${s.level}% ${"█".repeat(Math.round(s.level / 10))}\n`;
    });

    text += "\nD. ĐỔI MỚI SÁNG TẠO & CHUYỂN ĐỔI SỐ:\n";
    data.skills.innovation?.forEach((s: any) => {
      text += `  - ${s.name.padEnd(28, " ")}: ${s.level}% ${"█".repeat(Math.round(s.level / 10))}\n`;
    });

    text += "\nE. NĂNG LỰC NGOẠI NGỮ:\n";
    data.skills.languages?.forEach((s: any) => {
      text += `  - ${s.name.padEnd(28, " ")}: ${s.level}% ${s.name === "Tiếng Việt" ? "(Bản ngữ)" : "(Giao tiếp & Tài liệu chuyên ngành)"}\n`;
    });
  }
  text += "\n";

  // =========================================================================
  // 8. DỰ ÁN TRỌNG ĐIỂM (PROJECTS & CASE STUDIES)
  // =========================================================================
  text += sepLine;
  text += "8. DỰ ÁN TRỌNG ĐIỂM (PROJECTS) - DANH MỤC DỰ ÁN & CASE STUDY STAR\n";
  text += sepLine;
  projectsData?.forEach((p: any, idx: number) => {
    text += `[Dự án ${idx + 1}] ${p.title}\n`;
    text += `  - Phân nhóm      : ${p.group} (${p.phase || ""})\n`;
    text += `  - Thời gian      : ${p.period || "Thực thi hoàn thành"}\n`;
    text += `  - Vai trò        : ${p.role}\n`;
    text += `  - Mô tả tóm tắt  : ${p.desc}\n`;
    if (p.tags) {
      text += `  - Thẻ định danh  : ${p.tags}\n`;
    }
    if (p.caseStudy) {
      const cs = p.caseStudy;
      text += `  --- CASE STUDY STAR CHI TIẾT ---\n`;
      text += `  * Tóm tắt giải pháp: ${cs.summary}\n`;
      if (cs.context?.currentStatus) {
        text += `  * Bối cảnh thực trạng: ${cs.context.currentStatus}\n`;
      }
      if (cs.solutions?.cards) {
        text += `  * Các hành động then chốt:\n`;
        cs.solutions.cards.forEach((card: any) => {
          text += `    + ${card.name}: ${card.purpose} (Giá trị: ${card.value})\n`;
        });
      }
      if (cs.results?.operational) {
        text += `  * Kết quả vận hành:\n`;
        cs.results.operational.forEach((r: string) => text += `    - ${r}\n`);
      }
    }
    text += "\n";
  });

  // =========================================================================
  // 9. PHỎNG VẤN TRỰC TIẾP (INTERVIEW / SIMULATION)
  // =========================================================================
  text += sepLine;
  text += "9. PHỎNG VẤN (INTERVIEW) - MÔ PHỎNG PHỎNG VẤN TRỰC TIẾP VỚI LÃNH ĐẠO CX\n";
  text += sepLine;
  text += `Liên kết Video Phỏng vấn trực tiếp:\n`;
  text += `  - Video Phỏng vấn 01: ${INTERVIEW_VIDEO_1_URL}\n`;
  text += `  - Video Phỏng vấn 02: ${INTERVIEW_VIDEO_2_URL}\n\n`;
  text += "Danh mục các câu hỏi & Trả lời phỏng vấn tiêu biểu:\n";
  INTERVIEW_QUESTIONS.forEach((q) => {
    text += `* Câu hỏi [${q.stt}] (${q.timestamp}):\n`;
    text += `  Hỏi : ${q.questionVi}\n`;
    text += `  Đáp : ${q.answerVi}\n`;
    text += `  Tóm lược: ${q.summaryVi}\n\n`;
  });

  // =========================================================================
  // 10. TỬ VI BẢN MỆNH (HOROSCOPE & FIVE ELEMENTS)
  // =========================================================================
  text += sepLine;
  text += "10. TỬ VI BẢN MỆNH (HOROSCOPE) - GIÁP TÝ 1984 & TRIẾT LÝ QUẢN TRỊ NGŨ HÀNH\n";
  text += sepLine;
  text += "* Bản Mệnh: Giáp Tý (1984) - Hải Trung Kim (Vàng trong biển lớn)\n";
  text += "* Cung Mệnh: Đoài Kim (Tây Tứ Trạch)\n";
  text += "* Khí chất: Điềm tĩnh, trọng chữ Tín, tư duy chiến lược thâm sâu và kiên định trước áp lực lớn.\n\n";
  text += "Sáu Cung Vị Trọng Yếu Trong Lá Số Tử Vi:\n";
  text += "  1. Cung Mệnh (Tý)      : Chủ về trí tuệ mưu lược, nội lực bền bỉ và tài quy tụ lòng người.\n";
  text += "  2. Cung Quan Lộc (Thìn): Sự nghiệp gắn liền với dịch vụ quy mô lớn, chuyển đổi số và công nghệ CRM.\n";
  text += "  3. Cung Tài Bạch (Thân): Tài lộc vững chắc từ tối ưu hóa chi phí vận hành và hiệu quả thực chiến.\n";
  text += "  4. Cung Thiên Di (Ngọ) : Ngoại giao xuất sắc, nhiều quý nhân tương trợ, hội nhập môi trường đa văn hóa.\n";
  text += "  5. Cung Nô Bộc (Tỵ)    : Đội ngũ đoàn kết, phong cách lãnh đạo thấu cảm (Empathetic Leadership).\n";
  text += "  6. Cung Phúc Đức (Dần) : Tâm sáng – Vận thông, đạo đức nghề nghiệp là kim chỉ nam vượt mọi thử thách.\n\n";
  text += "Ứng dụng Ma Trận Ngũ Hành Trong Vận Hành Doanh Nghiệp:\n";
  text += "  * KIM  (Mệnh Chủ)  : Chuẩn hóa quy trình SOP, hệ thống đo lường KPI/SLA sắc bén, minh bạch.\n";
  text += "  * THỦY (Tương Sinh): Dòng chảy dữ liệu CRM, hệ thống AI Chatbot tự động hóa và lắng nghe khách hàng.\n";
  text += "  * MỘC  (Phát Triển): Đào tạo, phát triển con người và nuôi dưỡng các thế hệ lãnh đạo kế thừa.\n";
  text += "  * HỎA  (Nhiệt Huyết): Truyền lửa đam mê phụng sự, sự ấm áp trong từng điểm chạm trải nghiệm (CX).\n";
  text += "  * THỔ  (Nền Tảng)  : Hạ tầng tổng đài vững chãi, cơ sở dữ liệu an toàn và văn hóa doanh nghiệp kiên cố.\n\n";
  text += "* Vận Trình Chiến Lược 2026+: Giai đoạn thiên thời hội tụ 22 năm kinh nghiệm thực chiến và sức mạnh công nghệ AI, sẵn sàng đảm nhiệm vai trò Head of CX / CS Director.\n\n";

  // =========================================================================
  // 11. HỆ THỐNG NĂNG LỰC CỐT LÕI (SYSTEMS)
  // =========================================================================
  text += sepLine;
  text += "11. HỆ THỐNG NĂNG LỰC CỐT LÕI (SYSTEMS) - KIẾN TRÚC VẬN HÀNH TOÀN DIỆN\n";
  text += sepLine;
  text += "Khung Kiến Trúc 5 Phân Hệ Năng Lực Cốt Lõi:\n";
  text += "  Phân hệ 1: Hệ thống Quản trị Quan hệ Khách hàng (CRM Omnichannel System)\n";
  text += "    - Tích hợp đa kênh: Thoại, Chat, Email, Social Media, In-app ticket.\n";
  text += "    - Hợp nhất hồ sơ khách hàng 360 độ (Single Customer View).\n\n";
  text += "  Phân hệ 2: Hệ thống Tổng đài Thông minh & AI Agent (Smart Call Center & AI)\n";
  text += "    - Phân bổ cuộc gọi thông minh theo kỹ năng (Skill-based Routing).\n";
  text += "    - Trợ lý AI hỗ trợ nhân viên thời gian thực (Real-time Agent Copilot).\n\n";
  text += "  Phân hệ 3: Hệ thống Đo lường & Đảm bảo Chất lượng (QA/QC & SLA Management)\n";
  text += "    - Đánh giá chất lượng cuộc gọi và tương tác theo tiêu chuẩn đa tầng.\n";
  text += "    - Giám sát chỉ số SLA (Service Level Agreement) và CSAT theo thời gian thực.\n\n";
  text += "  Phân hệ 4: Hệ thống Quản trị Tri thức & Đào tạo (Knowledge Base & LMS)\n";
  text += "    - Kho tài liệu nghiệp vụ tập trung, cập nhật tự động.\n";
  text += "    - Khung năng lực đào tạo nhân viên mới từ 0 đến thành thạo trong 14 ngày.\n\n";
  text += "  Phân hệ 5: Hệ thống Phân tích & Báo cáo Thông minh (CX Business Intelligence)\n";
  text += "    - Dashboard phân tích giọng nói khách hàng (Voice of Customer - VoC).\n";
  text += "    - Dự báo xu hướng khiếu nại và tối ưu định biên nhân sự (Workforce Management).\n\n";

  // =========================================================================
  // 12. KHO KỶ NIỆM & HÌNH ẢNH DẤU ẤN (MEMORIES)
  // =========================================================================
  text += sepLine;
  text += "12. KHO KỶ NIỆM (MEMORIES) - DẤU ẤN 22 NĂM HÀNH TRÌNH CỐNG HIẾN\n";
  text += sepLine;
  const memoryItems = [
    { org: "Mobifone (2003 - 2008)", items: ["Mobifone 1: https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp", "Mobifone 2: https://i.ibb.co/0HHrmyz/Mobifone-2.webp", "Mobifone 3: https://i.ibb.co/TDgZqxG9/Mobifone-3.webp"] },
    { org: "HTVC Cable TV (2008 - 2011)", items: ["HTVC 1: https://i.ibb.co/ZzjXpjsX/HTVC-1.webp", "HTVC 2: https://i.ibb.co/BKjZQfY5/HTVC-2.webp", "HTVC 3: https://i.ibb.co/357kHb63/HTVC-3.webp", "HTVC 4: https://i.ibb.co/39Sjm7S0/HTVC-4.webp"] },
    { org: "VED / Garena (2011 - 2015)", items: ["VED 1: https://i.ibb.co/ds1qm1WD/VED-1.webp", "VED 2: https://i.ibb.co/7d9BFsS6/VED-2.webp", "VED 3: https://i.ibb.co/1f4dHTyV/VED-3.webp", "VED 4: https://i.ibb.co/7xNbsP5j/VED-4.webp"] },
    { org: "Prudential Vietnam (2015 - 2018)", items: ["Prudential 1: https://i.ibb.co/CK2Y62Zy/Prudential-1.webp", "Prudential 2: https://i.ibb.co/HD71024V/Prudential-2.webp", "Prudential 3: https://i.ibb.co/TM32Dg85/Prudential-3.webp", "Prudential 4: https://i.ibb.co/sd8bZfsk/Prudential-4.webp", "Prudential 5: https://i.ibb.co/XZXnp2Dw/Prudential-5.webp", "Prudential 6: https://i.ibb.co/1t8kkHGm/Prudential-6.webp", "Prudential 7: https://i.ibb.co/Mk5S8vYR/Prudential-7.webp"] },
    { org: "MoMo (2018 - 2021)", items: ["Momo 1: https://i.ibb.co/S7ySGnvC/Momo-1.webp", "Momo 2: https://i.ibb.co/v6K5jLsQ/Momo-2.webp", "Momo 3: https://i.ibb.co/DsvVt9C/Momo-3.webp", "Momo 4: https://i.ibb.co/gLdK4ss8/Momo-4.webp", "Momo 5: https://i.ibb.co/svYWnsHK/Momo-5.webp", "Momo 6: https://i.ibb.co/BVH5GdtT/Momo-6.webp", "Momo 7: https://i.ibb.co/G3MgYJp3/Momo-7.webp", "Momo 8: https://i.ibb.co/398WZf65/Momo-8.webp"] },
    { org: "Finviet (2023 - 2024)", items: ["Finviet 1: https://i.ibb.co/Rp4jmTWF/Finviet-1.webp"] },
    { org: "V247 (2021 - 2023)", items: ["V247-1: https://i.ibb.co/9HwPTKGg/V247-1.jpg", "V247-2: https://i.ibb.co/vr4hB1m/V247-2.jpg", "V247-3: https://i.ibb.co/gM7nPptY/V247-3.jpg", "V247-4: https://i.ibb.co/s9gsmSHs/V247-4.jpg", "V247-5: https://i.ibb.co/WNQkxzYQ/V247-5.jpg"] },
  ];

  memoryItems.forEach((mem) => {
    text += `* Tổ chức: ${mem.org}\n`;
    mem.items.forEach((item) => text += `  + ${item}\n`);
    text += "\n";
  });

  // =========================================================================
  // 13. TRỢ LÝ AI (AI KNOWLEDGE BASE & SIMULATED Q&A)
  // =========================================================================
  text += sepLine;
  text += "13. TRỢ LÝ AI (AI ASSISTANT) - CƠ SỞ TRI THỨC & CÂU HỎI MÔ PHỎNG TRẢ LỜI\n";
  text += sepLine;

  if (aiCategories && aiCategories.length > 0) {
    aiCategories.forEach((cat: any) => {
      text += `\n=== CHỦ ĐỀ: ${cat.title} ===\n`;
      cat.questions?.forEach((qText: string) => {
        const answer = PREDEFINED_ANSWERS[qText] || "Dữ liệu phân tích chuyên sâu từ kinh nghiệm 22 năm vận hành.";
        text += `\n* CÂU HỎI: ${qText}\n`;
        text += `  TRẢ LỜI: ${answer}\n`;
      });
    });
  } else {
    Object.entries(PREDEFINED_ANSWERS || {}).forEach(([q, a], idx) => {
      text += `[Q&A ${idx + 1}]\n`;
      text += `* Q: ${q}\n`;
      text += `  A: ${a}\n\n`;
    });
  }
  text += "\n";

  // =========================================================================
  // 14. QUẢN TRỊ HỆ THỐNG (WEBSITE MANAGEMENT & CONFIGURATION)
  // =========================================================================
  text += sepLine;
  text += "14. QUẢN TRỊ (WEBSITE MANAGEMENT) - THÔNG SỐ CẤU HÌNH & HIỆN TRẠNG HỆ THỐNG\n";
  text += sepLine;
  text += "Bảng Chỉ Số Vận Hành Hệ Thống (System Metrics):\n";
  text += "  - Tổng số Đối tượng (Objects)     : 248 objects\n";
  text += "  - Tổng số Trang (Pages)           : 12 views/routes\n";
  text += "  - Tổng số Phân đoạn (Sections)    : 64 sections\n";
  text += "  - Tổng số Linh kiện (Components)  : 38 reusable components\n";
  text += "  - Số biến thể giao diện (Variants): 21 variants\n";
  text += "  - Chỉ số Sức khỏe Hệ thống        : 94% (High Integrity & Security)\n";
  text += "  - Lỗi phát hiện (Errors)          : 0 errors\n\n";

  text += "Danh mục 23 Phân hệ Quản trị (Admin Modules Inventory):\n";
  const modulesList = [
    "Scan Website (Quét nhận diện Pages, Routes, Sections)",
    "Object Inventory (Kiểm kê vị trí & tần suất đối tượng)",
    "Classify Objects (Phân loại Page, Section, Component, Media)",
    "Find Similar Objects (Phát hiện trùng lặp & đồng nhất phong cách)",
    "Component System (Quản trị linh kiện dùng chung)",
    "Variant Manager (Quản lý biến thể Default, Glass, Featured)",
    "Design System (Chuẩn hóa Colors, Typography, Spacing, Radius)",
    "Layout System (Kiểm tra Container, Grid, Columns bố cục)",
    "Responsive System (Tương thích Desktop, Tablet, Mobile)",
    "Page Structure (Quản lý cấu trúc phân cấp từng trang)",
    "Section Structure (Quản lý khối nội dung bên trong)",
    "Global Settings (Cấu hình toàn diện website)",
    "Component Settings (Cấu hình riêng cho từng linh kiện)",
    "Sync Components (Đồng bộ hóa thay đổi toàn hệ thống)",
    "Layout Order (Sắp xếp thứ tự các section)",
    "Add Section (Thêm section mới từ template/custom)",
    "External Section (Tích hợp nguồn nhúng URL/Embed bên ngoài)",
    "Custom Component (Khởi tạo component cấu trúc riêng)",
    "Custom HTML (Tùy chỉnh mã HTML nâng cao)",
    "Custom CSS (Tùy chỉnh mã CSS ghi đè giao diện)",
    "Custom JS (Tùy chỉnh mã JavaScript tương tác)",
    "Validate Website (Kiểm tra tính toàn vẹn và bảo mật)",
    "System Report (Báo cáo tổng quan sức khỏe hệ thống)"
  ];
  modulesList.forEach((m, idx) => {
    text += `  [${String(idx + 1).padStart(2, "0")}] ${m}\n`;
  });
  text += "\n";

  // =========================================================================
  // 15. DANH BẠ LIÊN KẾT TOÀN HỆ THỐNG (MASTER URLS & ASSET LINKS)
  // =========================================================================
  text += sepLine;
  text += "15. TỔNG HỢP TOÀN BỘ LIÊN KẾT HỆ THỐNG (MASTER LINKS & URL DIRECTORY)\n";
  text += sepLine;
  text += "* 1. Hồ sơ cá nhân & Mạng xã hội:\n";
  text += "  - Website Portfolio : https://nguyenhungthai.powerservice.one/\n";
  text += "  - LinkedIn Profile  : https://www.linkedin.com/in/hungthai84/\n";
  text += "  - Email Trực tiếp   : hungthai84@gmail.com\n";
  text += "  - Hotline / Zalo    : 0909097882\n\n";

  text += "* 2. Video Tư liệu & Phỏng vấn:\n";
  text += `  - Video Phỏng vấn 01 : ${INTERVIEW_VIDEO_1_URL}\n`;
  text += `  - Video Phỏng vấn 02 : ${INTERVIEW_VIDEO_2_URL}\n`;
  text += `  - Audio Luận giải Tử vi: https://cdn.scena.ai/project/8606/astrology-commentary.mp3\n\n`;

  text += "* 3. Logo Doanh nghiệp & Thương hiệu cộng tác:\n";
  text += "  - MoMo             : https://i.ibb.co/9HZ68Vrd/Momo.png\n";
  text += "  - ShopeePay        : https://i.ibb.co/Xxt6KK5V/Shopee-Paye.png\n";
  text += "  - AirPay           : https://i.ibb.co/HTPmHMMQ/Airpay.png\n";
  text += "  - Finviet          : https://i.ibb.co/5fHPVCy/Finviet.png\n";
  text += "  - Prudential       : https://i.ibb.co/CK2Y62Zy/Prudential-1.webp\n";
  text += "  - Hành Trình Kiến Tạo: https://i.ibb.co/JRL6khNV/Power-Service.png\n\n";

  text += "* 4. Minh chứng Bằng cấp & Chứng chỉ:\n";
  text += "  - Quản lý Rủi ro   : https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png\n";
  text += "  - Quản lý Dự án    : https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png\n";
  text += "  - Thiết kế Website : https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png\n";
  text += "  - Phân tích Dữ liệu: https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png\n\n";

  text += sepLine;
  text += "           --- HẾT NỘI DUNG TỔNG HỢP HỒ SƠ NGUYỄN HÙNG THÁI ---\n";
  text += "        Bản quyền thông tin thuộc về Nguyễn Hùng Thái (Head of CX / CS Director)\n";
  text += sepLine;

  return text;
};

export const runDataValidation = () => {
  const data: any = contentData;
  let totalItems = 0;

  totalItems += (data.personalInfo?.length || 0) + (data.taglines?.length || 0);
  totalItems += (principlesData?.length || 0) + (timelineData?.length || 0) + (coreValuesData?.length || 0);
  totalItems += (data.experience?.length || 0) + (data.domains?.length || 0);
  if (data.skills) {
    totalItems += (data.skills.professional?.length || 0) +
                 (data.skills.leadership?.length || 0) +
                 (data.skills.collaboration?.length || 0) +
                 (data.skills.innovation?.length || 0) +
                 (data.skills.languages?.length || 0);
  }
  totalItems += (projectsData?.length || 0) + (INTERVIEW_QUESTIONS?.length || 0);
  totalItems += Object.keys(PREDEFINED_ANSWERS || {}).length;
  totalItems += 23; // admin modules
  totalItems += 32; // memory photos

  const txtString = generateTxtString();
  const textLength = txtString.length;

  return {
    isValid: totalItems > 50 && textLength > 10000,
    totalItems,
    textLength,
  };
};

export const generateAndDownloadTxt = () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);

  const text = generateTxtString();
  const filename = `Data CV NguyenHungThai - (${dd}.${mm}.${yy}).txt`;

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
