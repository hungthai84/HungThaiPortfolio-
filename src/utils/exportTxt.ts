import { contentData } from "../data";
import { principlesData, timelineData, coreValuesData } from "../data/coverLetterData";
import { caseStudiesMap } from "../data/caseStudiesData";
import { projectsData } from "../data/projectsData";
import { PREDEFINED_ANSWERS } from "../data/aiQuestions";

export const generateAndDownloadTxt = () => {
  let text = "========================================================================\n";
  text += "                      DỮ LIỆU TỔNG HỢP (WEBSITE DATA)\n";
  text += "========================================================================\n\n";

  const data: any = contentData;

  // 1. Trang chủ (Home)
  text += "=== 1. TRANG CHỦ (HOME) ===\n";
  text += `Tên: ${data.personalInfo?.find((i: any) => i.label === "Email")?.value || ""}\n`;
  text += "Taglines:\n";
  data.taglines?.forEach((t: any) => text += `- ${t}\n`);
  text += "\n";

  // 2. Thư ngỏ (Cover Letter)
  text += "=== 2. THƯ NGỎ (COVER LETTER) ===\n";
  text += "Các nguyên tắc:\n";
  principlesData?.forEach((p: any) => text += `- ${p.titleVi}: ${p.descVi}\n`);
  text += "\nHành trình (Timeline):\n";
  timelineData?.forEach((t: any) => text += `- ${t.year}: ${t.roleVi}\n`);
  text += "\nGiá trị cốt lõi:\n";
  coreValuesData?.forEach((c: any) => text += `- ${c.titleVi}: ${c.descVi}\n`);
  text += "\n";

  // 3. Thông tin cá nhân (Personal Profile)
  text += "=== 3. THÔNG TIN CÁ NHÂN (PERSONAL PROFILE) ===\n";
  text += "Thông tin cá nhân:\n";
  data.personalInfo?.forEach((info: any) => {
    text += `- ${info.label}: ${info.value}\n`;
  });
  text += "\n";

  // 4. Kinh nghiệm (Experience)
  text += "=== 4. KINH NGHIỆM (EXPERIENCE) ===\n";
  data.experience?.forEach((exp: any) => {
    text += `* Công ty: ${exp.company} ${exp.subTitle ? exp.subTitle : ""}\n`;
    text += `  - Vai trò: ${exp.role}\n`;
    text += `  - Thời gian: ${exp.time}\n`;
    text += `  - Mô tả: ${exp.desc}\n`;
    if (exp.tasks && exp.tasks.length > 0) {
      text += `  - Nhiệm vụ:\n`;
      exp.tasks.forEach((t: any) => text += `    + ${t.name}\n`);
    }
    if (exp.achievements && exp.achievements.length > 0) {
      text += `  - Thành tựu:\n`;
      exp.achievements.forEach((a: any) => text += `    + ${a.name} (${a.score}%)\n`);
    }
    text += "\n";
  });

  // 5. Kỹ năng (Skills)
  text += "=== 5. KỸ NĂNG (SKILLS) ===\n";
  if (data.skills) {
    data.skills.forEach((skillGroup: any) => {
      text += `* ${skillGroup.category}:\n`;
      skillGroup.items?.forEach((item: any) => text += `  - ${item.name} (${item.level}%)\n`);
    });
  } else {
    text += "Dữ liệu đang cập nhật...\n";
  }
  text += "\n";

  // 6. Lĩnh vực (Domains)
  text += "=== 6. LĨNH VỰC (DOMAINS/SERVICES) ===\n";
  if (data.domains) {
    data.domains.forEach((d: any) => {
      text += `* ${d.title}\n`;
      text += `  - ${d.desc}\n`;
    });
  } else {
    text += "Dữ liệu đang cập nhật...\n";
  }
  text += "\n";

  // 7. Dự án (Projects)
  text += "=== 7. DỰ ÁN (PROJECTS) ===\n";
  projectsData?.forEach((p: any) => {
    text += `* Dự án: ${p.title}\n`;
    text += `  - Nhóm: ${p.group}\n`;
    text += `  - Giai đoạn: ${p.phase}\n`;
    text += `  - Vai trò: ${p.role}\n`;
    text += `  - Mô tả: ${p.desc}\n\n`;
  });

  // 8. Phỏng vấn (Interview)
  text += "=== 8. PHỎNG VẤN (INTERVIEW/CASE STUDIES) ===\n";
  Object.values(caseStudiesMap || {})?.forEach((c: any) => {
    text += `* Câu hỏi/Tình huống: ${c.titleVi}\n`;
    text += `  - Bối cảnh: ${c.situationVi}\n`;
    text += `  - Hành động: ${c.actionVi}\n`;
    text += `  - Kết quả: ${c.resultVi}\n\n`;
  });





  // 11. Trợ lý AI (AI Assistant)
  text += "=== 11. TRỢ LÝ AI (AI KNOWLEDGE BASE) ===\n";
  Object.entries(PREDEFINED_ANSWERS || {}).forEach(([q, a]) => {
    text += `* Q: ${q}\n`;
    text += `  A: ${a}\n\n`;
  });

  // 12. Hệ thống (System)
  text += "=== 12. HỆ THỐNG (SYSTEM SETTINGS/CONFIG) ===\n";
  text += "Dữ liệu cấu hình hệ thống hiện tại đang được nạp từ các module React.\n";
  text += "\n";
  text += "========================================================================\n";
  text += "                           KẾT THÚC DỮ LIỆU\n";
  text += "========================================================================\n";

  // Download logic
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "WEBSITE_CONTENT_MASTER.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
