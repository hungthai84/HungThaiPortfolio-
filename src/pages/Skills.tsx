import React from "react";
import { PageLayout } from "../components/PageLayout";
import { SwotAnalysis } from "../components/SwotAnalysis";
import { useLanguage } from "../context/LanguageContext";
import { Award } from "lucide-react";

export function Skills() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const [activeSection, setActiveSection] = React.useState("all");

  return (
    <PageLayout
      id="skills-main-card"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      pageId="skills"
      pageName="Skills & Personal SWOT"
      title={isVi ? "Kỹ Năng & SWOT" : "Skills & SWOT"}
      subtitle={
        isVi
          ? "Phân tích năng lực chuyên môn, định hướng nghề nghiệp và chiến lược phát triển bản thân."
          : "Professional skills analysis, career orientation, and personal development strategy."
      }
      icon={Award}
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300 !bg-transparent !border-none !shadow-none !backdrop-blur-none"
      headerContainerClassName="!px-0 !bg-transparent"
      groupOptions={[
        {
          id: "all",
          labelVi: "Tất cả các phần",
          labelEn: "All Sections",
        },
        {
          id: "overview",
          labelVi: "Tổng quan năng lực",
          labelEn: "Overview",
        },
        {
          id: "swot",
          labelVi: "Ma trận SWOT",
          labelEn: "SWOT Matrix",
        },
        {
          id: "languages",
          labelVi: "Trình độ ngoại ngữ",
          labelEn: "Languages",
        },
      ]}
      activeGroup={activeSection}
      onGroupChange={setActiveSection}
      groupLabel={{ vi: "Mục:", en: "Section:" }}
      onReset={() => setActiveSection("all")}
    >
      <SwotAnalysis activeSection={activeSection} />
    </PageLayout>
  );
}
