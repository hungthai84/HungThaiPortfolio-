import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Sparkles,
  Sun,
  Moon,
  Shield,
  Briefcase,
  Users,
  Award,
  TrendingUp,
  Brain,
  Layers,
  Heart,
  Globe,
  Star,
  CheckCircle2,
  Calendar,
  Zap,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { AudioPlayer } from "../components/AudioPlayer";
import { cn } from "../lib/utils";
import { playGlassSound } from "../lib/sound";

export function TuVi() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterOptions = [
    { id: "all", labelVi: "Tổng Quan Bản Mệnh", labelEn: "Destiny Overview" },
    { id: "chart12", labelVi: "12 Cung Tử Vi", labelEn: "12 Palaces Chart" },
    { id: "elements", labelVi: "Ngũ Hành & Quản Trị", labelEn: "5 Elements & Ops" },
    { id: "forecast", labelVi: "Vận Trình 2026+", labelEn: "2026+ Milestones" },
  ];

  // 12 Cung Số Tử Vi Đẩu Số của Giáp Tý 1984
  const palaces = [
    {
      id: "menh",
      nameVi: "Cung Mệnh (Tý)",
      nameEn: "Destiny Palace (Rat)",
      mainStars: ["Hải Trung Kim", "Thiên Phủ", "Hóa Khoa"],
      element: "Kim",
      color: "from-amber-500/20 via-yellow-500/10 to-amber-600/5 border-amber-400/40 text-amber-600 dark:text-amber-400",
      badge: isVi ? "Bản Mệnh Cốt Lõi" : "Core Destiny",
      descVi:
        "Chủ về trí tuệ mưu lược, tư duy nhạy bén và tính cách điềm tĩnh, trọng chữ Tín. Khí chất điềm đạm, có tài quy tụ lòng người và năng lực điều hành tổng thể.",
      descEn:
        "Reflects strategic intellect, calmness, integrity, and strong natural executive leadership with high emotional quotient.",
      traitsVi: ["Tư duy chiến lược dài hạn", "Chính trực & trọng danh dự", "Điềm đạm trước áp lực lớn"],
      traitsEn: ["Strategic long-term vision", "Integrity & honor-driven", "Resilient under high pressure"],
    },
    {
      id: "quan",
      nameVi: "Cung Quan Lộc (Thìn)",
      nameEn: "Career Palace (Dragon)",
      mainStars: ["Thái Âm", "Văn Xương", "Thiên Khôi"],
      element: "Thổ / Thủy",
      color: "from-blue-500/20 via-indigo-500/10 to-blue-600/5 border-blue-400/40 text-blue-600 dark:text-blue-400",
      badge: isVi ? "Sự Nghiệp Vận Hành" : "Career Path",
      descVi:
        "Sự nghiệp gắn liền với quản trị hệ thống, dịch vụ quy mô lớn, công nghệ và chuyển đổi số. Càng dấn thân phụng sự khách hàng càng tỏa sáng rực rỡ.",
      descEn:
        "Thrives in large-scale system operations, customer experience architecture, digital transformation, and leadership.",
      traitsVi: ["Vận hành Contact Center 150+", "Kiến trúc CRM & AI Bot", "22 năm cống hiến thực chiến"],
      traitsEn: ["150+ seat contact center ops", "CRM & AI chatbot architecture", "22+ years hands-on track record"],
    },
    {
      id: "tai",
      nameVi: "Cung Tài Bạch (Thân)",
      nameEn: "Wealth Palace (Monkey)",
      mainStars: ["Thiên Đồng", "Lộc Tồn", "Hóa Lộc"],
      element: "Kim",
      color: "from-emerald-500/20 via-teal-500/10 to-emerald-600/5 border-emerald-400/40 text-emerald-600 dark:text-emerald-400",
      badge: isVi ? "Tài Lộc Thực Chiến" : "Financial Engine",
      descVi:
        "Tài lộc vững chắc từ năng lực điều hành thực chiến và tối ưu hóa chi phí vận hành (Cost-to-Serve), tạo ra giá trị thặng dư bền vững cho tổ chức.",
      descEn:
        "Wealth is generated through tangible operational results, cost-to-serve optimization, and sustainable organizational growth.",
      traitsVi: ["Tối ưu chi phí vận hành", "Quản trị ngân sách minh bạch", "Đầu tư giá trị bền vững"],
      traitsEn: ["Cost-to-serve optimization", "Transparent budget control", "Sustainable value investing"],
    },
    {
      id: "di",
      nameVi: "Cung Thiên Di (Ngọ)",
      nameEn: "Travel & Expansion (Horse)",
      mainStars: ["Thất Sát", "Thiên Mã", "Quý Nhân"],
      element: "Hỏa",
      color: "from-purple-500/20 via-fuchsia-500/10 to-purple-600/5 border-purple-400/40 text-purple-600 dark:text-purple-400",
      badge: isVi ? "Ngoại Giao & Mở Rộng" : "External Relations",
      descVi:
        "Ra ngoài có nhiều quý nhân tương trợ, thích ứng nhanh với môi trường đa văn hóa, tập đoàn đa quốc gia và các thị trường công nghệ chuyển biến liên tục.",
      descEn:
        "Supported by mentors and allies, adapts swiftly to global enterprises, cross-functional cultures, and fast-paced tech environments.",
      traitsVi: ["Hòa nhập tập đoàn lớn", "Kết nối đối tác chiến lược", "Linh hoạt ứng biến thời cuộc"],
      traitsEn: ["Enterprise integration", "Strategic partner bridging", "Agile adaptability"],
    },
    {
      id: "no",
      nameVi: "Cung Nô Bộc (Tỵ)",
      nameEn: "Team & Associates (Snake)",
      mainStars: ["Tả Phù", "Hữu Bật", "Thiên Đức"],
      element: "Hỏa / Thổ",
      color: "from-rose-500/20 via-pink-500/10 to-rose-600/5 border-rose-400/40 text-rose-600 dark:text-rose-400",
      badge: isVi ? "Đội Ngũ Nhân Sự" : "Team & People",
      descVi:
        "Đội ngũ cấp dưới đoàn kết, tôn trọng kỷ luật và luôn được truyền cảm hứng qua phong cách lãnh đạo thấu cảm (Empathetic Leadership).",
      descEn:
        "Fosters highly loyal, unified teams inspired by empathetic leadership, clear coaching, and human-centric empowerment.",
      traitsVi: ["Lãnh đạo truyền cảm hứng", "Đào tạo đội ngũ kế thừa", "Giữ chân nhân tài (Low Churn)"],
      traitsEn: ["Inspirational leadership", "Succession coaching", "High talent retention"],
    },
    {
      id: "phuc",
      nameVi: "Cung Phúc Đức (Dần)",
      nameEn: "Ancestral Blessing (Tiger)",
      mainStars: ["Thiên Phúc", "Thiên Quan", "Long Trì"],
      element: "Mộc",
      color: "from-cyan-500/20 via-sky-500/10 to-cyan-600/5 border-cyan-400/40 text-cyan-600 dark:text-cyan-400",
      badge: isVi ? "Phúc Khí & Đạo Tâm" : "Virtue & Heritage",
      descVi:
        "Gốc rễ phúc đức vững bền, tâm niệm luôn đặt đạo đức nghề nghiệp và lòng nhân ái lên hàng đầu, biến nguy thành an qua mọi giai đoạn thử thách.",
      descEn:
        "Deep moral anchor, ethical compass, transforming hurdles into breakthroughs through persistent perseverance and goodwill.",
      traitsVi: ["Tâm sáng – Vận thông", "Kiên định trước biến động", "Lan tỏa năng lượng tích cực"],
      traitsEn: ["Ethical clarity", "Steady through adversity", "Positive influence"],
    },
  ];

  // Ngũ Hành trong Quản trị Vận hành
  const fiveElementsOps = [
    {
      elementVi: "KIM (Mệnh Chủ)",
      elementEn: "METAL (Core Element)",
      aspectVi: "Quy trình & Tiêu chuẩn",
      aspectEn: "Processes & Standard SOPs",
      color: "border-amber-400/50 bg-amber-500/10 text-amber-600 dark:text-amber-400",
      descVi:
        "Kim đại diện cho kỷ luật, tính chuẩn mực, hệ thống quy trình SOP sắc bén và chỉ số đo lường KPI/SLA rõ ràng, minh bạch.",
      descEn:
        "Embodies precision, rigorous standard operating procedures (SOPs), and crystal-clear KPI/SLA metrics.",
    },
    {
      elementVi: "THỦY (Tương Sinh)",
      elementEn: "WATER (Flow & Data)",
      aspectVi: "Dữ liệu & Công nghệ AI",
      aspectEn: "Data Streams & AI Bots",
      color: "border-blue-400/50 bg-blue-500/10 text-blue-600 dark:text-blue-400",
      descVi:
        "Thủy biểu trưng cho dòng chảy dữ liệu CRM, hệ thống AI Chatbot tự động và khả năng giao tiếp lắng nghe khách hàng linh hoạt, mềm mại.",
      descEn:
        "Represents CRM data flows, omnichannel routing, automation bots, and empathetic customer listening.",
    },
    {
      elementVi: "MỘC (Phát Triển)",
      elementEn: "WOOD (Growth & Talent)",
      aspectVi: "Đào tạo & Phát triển Con người",
      aspectEn: "People Coaching & Culture",
      color: "border-emerald-400/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      descVi:
        "Mộc nuôi dưỡng sự trưởng thành của đội ngũ nhân sự, kiến tạo văn hóa học tập suốt đời và nuôi dưỡng các thế hệ quản lý kế thừa.",
      descEn:
        "Nurtures team talent, builds continuous learning culture, and grooms next-generation leaders.",
    },
    {
      elementVi: "HỎA (Nhiệt Huyết)",
      elementEn: "FIRE (Passion & CX)",
      aspectVi: "Trải nghiệm Khách hàng Đỉnh cao",
      aspectEn: "Passionate CX Delivery",
      color: "border-rose-400/50 bg-rose-500/10 text-rose-600 dark:text-rose-400",
      descVi:
        "Hỏa truyền lửa tận tâm, sự ấm áp chân thành trong từng điểm chạm dịch vụ và khát vọng phụng sự nâng tầm thương hiệu.",
      descEn:
        "Sparks service passion, heartfelt customer care touchpoints, and brand elevation.",
    },
    {
      elementVi: "THỔ (Nền Tảng)",
      elementEn: "EARTH (Foundation)",
      aspectVi: "Hạ tầng & Giá trị Bền vững",
      aspectEn: "Infrastructure & Stability",
      color: "border-amber-600/50 bg-amber-700/10 text-amber-700 dark:text-amber-500",
      descVi:
        "Thổ là bệ đỡ hạ tầng tổng đài vững chãi, cơ sở dữ liệu an toàn bảo mật và nền móng văn hóa doanh nghiệp không lay chuyển.",
      descEn:
        "Anchors stable telecom infrastructure, bulletproof data security, and unwavering company culture.",
    },
  ];

  return (
    <PageLayout
      hideToolbar={true}
      id="tuvi-page-main"
      pageId="tuvi"
      pageName="Tử Vi Bản Mệnh"
      title={isVi ? "Tử vi" : "Horoscope"}
      subtitle={
        isVi
          ? "Bản Mệnh Giáp Tý 1984 – Luận giải Tử Vi Đẩu Số & Triết lý Quản trị Ngũ Hành"
          : "Giáp Tý 1984 Destiny Chart, Five-Elements Matrix & Strategic Operations Philosophy"
      }
      icon={Compass}
      filterOptions={filterOptions}
      activeFilter={activeFilter}
      onFilterChange={(tabId) => {
        playGlassSound("tap");
        setActiveFilter(tabId);
      }}
      rootClassName="w-full max-w-full relative flex flex-1 flex-col !bg-transparent !border-none !rounded-none shadow-none transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 !mb-0 transition-all duration-300"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent !border-none"
    >
      <div className="relative mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Audio commentary player floating widget */}
        <div className="relative flex justify-end">
          <AudioPlayer
            audioUrl="https://cdn.scena.ai/project/8606/astrology-commentary.mp3"
            hintTextVi="Bấm vào để nghe luận giải tử vi của tôi!"
            hintTextEn="Click to listen to my horoscope commentary!"
          />
        </div>

        {/* HERO CARD: Bản Mệnh Giáp Tý 1984 */}
        {(activeFilter === "all" || activeFilter === "elements") && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-yellow-500/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-amber-400/30"
          >
            {/* Background glowing mandala ring */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-yellow-500/15 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  <Sparkles size={14} className="animate-spin-slow" />
                  {isVi ? "Tử Vi Đẩu Số • Giáp Tý 1984" : "Eastern Astrology • 1984 Wood Rat"}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                  {isVi ? "Hải Trung Kim • Ốc Thượng Chi Thử" : "Sea Metal • Rat on the Roof"}
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  {isVi
                    ? "Người tuổi Giáp Tý sinh năm 1984 mang mệnh Hải Trung Kim (Vàng dưới đáy biển), đại diện cho nguồn nội lực thâm sâu, trí tuệ tích lũy dồi dào và phẩm chất trung trinh, điềm đạm. Trải qua 22 năm thử thách thực chiến, ngọc sáng giữa biển khơi càng mài giũa càng tỏ rạng, định hình nên phong cách lãnh đạo kiên cường nhưng giàu lòng trắc ẩn."
                    : "Born in 1984 (Giáp Tý), carrying the Sea Metal (Hải Trung Kim) destiny — embodying profound inner strength, refined intellect, and steadfast integrity. Honed through 22 years of operational rigor, this energy manifests as resilient leadership backed by empathy and strategic clarity."}
                </p>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="rounded-2xl border border-amber-300/40 bg-white/60 dark:bg-slate-900/60 p-3 text-center backdrop-blur-md">
                    <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      {isVi ? "Năm Sinh" : "Birth Year"}
                    </span>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                      Giáp Tý (1984)
                    </span>
                  </div>

                  <div className="rounded-2xl border border-amber-300/40 bg-white/60 dark:bg-slate-900/60 p-3 text-center backdrop-blur-md">
                    <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      {isVi ? "Ngũ Hành Mệnh" : "Five Elements"}
                    </span>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                      Hải Trung Kim
                    </span>
                  </div>

                  <div className="rounded-2xl border border-amber-300/40 bg-white/60 dark:bg-slate-900/60 p-3 text-center backdrop-blur-md">
                    <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      {isVi ? "Cung Mệnh" : "Destiny Palace"}
                    </span>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                      Đoài Kim (Tây Tứ)
                    </span>
                  </div>

                  <div className="rounded-2xl border border-amber-300/40 bg-white/60 dark:bg-slate-900/60 p-3 text-center backdrop-blur-md">
                    <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      {isVi ? "Màu Tương Hợp" : "Lucky Colors"}
                    </span>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                      {isVi ? "Vàng, Trắng, Xám" : "Gold, White, Grey"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphical Yin-Yang Medal */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-amber-400/60 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_35px_rgba(245,158,11,0.4)]">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-950 p-2 shadow-inner">
                    <Compass size={48} className="text-amber-400 animate-spin-slow" />
                  </div>
                  <span className="absolute -bottom-2.5 rounded-full bg-amber-500 px-3 py-0.5 text-[10px] font-black text-white shadow-md">
                    1984 • 2026+
                  </span>
                </div>
                <p className="mt-4 text-xs font-bold text-slate-600 dark:text-slate-300">
                  {isVi ? "“Tâm tĩnh như thủy – Trí sáng như kim”" : "“Mind calm as water – Intellect sharp as gold”"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 12 CUNG SỐ TỬ VI */}
        {(activeFilter === "all" || activeFilter === "chart12") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="text-amber-500" size={22} />
                {isVi ? "Lục Cung Trọng Yếu • Lá Số Tử Vi Đẩu Số" : "Key Palaces • Astrological Chart Analysis"}
              </h3>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {isVi ? "Tổng hợp 6 cung bản vị xuất sắc" : "Top 6 core operational palaces"}
              </span>
            </div>

            <div className="tuvi-palace-masonry w-full">
              {palaces.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={cn(
                    "tuvi-masonry-item relative flex flex-col justify-between rounded-2xl border p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white/70 dark:bg-slate-900/70",
                    p.color
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-black/5 dark:bg-white/10 px-2.5 py-1 text-xs font-black">
                        {isVi ? p.nameVi : p.nameEn}
                      </span>
                      <span className="text-[11px] font-bold opacity-80">{p.badge}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.mainStars.map((star, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-md border border-current/30 px-2 py-0.5 text-[11px] font-bold"
                        >
                          ✦ {star}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {isVi ? p.descVi : p.descEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-current/15 space-y-1.5">
                    {(isVi ? p.traitsVi : p.traitsEn).map((trait, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                        <CheckCircle2 size={13} className="shrink-0 text-emerald-500" />
                        <span>{trait}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* NGŨ HÀNH TRONG QUẢN TRỊ VẬN HÀNH */}
        {(activeFilter === "all" || activeFilter === "elements") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="text-indigo-500" size={22} />
                {isVi ? "Ma Trận Ngũ Hành Trong Vận Hành Doanh Nghiệp" : "Five Elements in Business Operations"}
              </h3>
            </div>

            <div className="tuvi-elements-masonry w-full">
              {fiveElementsOps.map((elem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className={cn(
                    "tuvi-masonry-item flex flex-col justify-between rounded-2xl border p-4 shadow-md backdrop-blur-md transition-all hover:scale-105",
                    elem.color
                  )}
                >
                  <div className="space-y-2">
                    <span className="block text-xs font-black uppercase tracking-wider">
                      {isVi ? elem.elementVi : elem.elementEn}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      {isVi ? elem.aspectVi : elem.aspectEn}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {isVi ? elem.descVi : elem.descEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* VẬN TRÌNH & ĐỊNH HƯỚNG 2026+ */}
        {(activeFilter === "all" || activeFilter === "forecast") && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-violet-300/40 bg-gradient-to-r from-violet-500/10 via-indigo-500/5 to-purple-500/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-violet-500/30"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-400/15 px-3 py-1 text-xs font-bold text-violet-700 dark:text-violet-300">
                  <TrendingUp size={14} />
                  {isVi ? "Vận Trình Đại Vận 2026+" : "Strategic Era 2026+"}
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {isVi
                    ? "Đại Vận Thiên Thời: Kết Hợp Kinh Nghiệm 22 Năm & Trí Tuệ Nhân Tạo AI"
                    : "Prime Cycle: Synergy of 22-Year Experience & Artificial Intelligence"}
                </h3>

                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {isVi
                    ? "Bước vào giai đoạn 2026+, vận trình hội tụ các yếu tố Thiên thời – Địa lợi – Nhân hòa. Đây là thời điểm hoàng kim để đảm nhận vai trò Head of CX / CS Director, kiến tạo các hệ sinh thái dịch vụ khách hàng tự động hóa, dẫn dắt đội ngũ tinh gọn và mang lại đột phá doanh thu bền vững cho doanh nghiệp."
                    : "Entering the 2026+ cycle with optimal alignment of market timing, deep domain expertise, and AI transformation. A prime era to serve as Head of CX / CS Director, orchestrating automated customer ecosystems and empowering high-performance teams."}
                </p>
              </div>

              <div className="shrink-0 flex flex-col gap-2.5 w-full sm:w-auto">
                <div className="flex items-center gap-3 rounded-2xl border border-violet-300/40 bg-white/80 dark:bg-slate-900/80 px-4 py-3 shadow-md">
                  <Zap className="text-amber-500" size={20} />
                  <div className="text-left">
                    <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {isVi ? "Sẵn sàng nhận nhiệm vụ" : "Ready for Deployment"}
                    </span>
                    <span className="text-sm font-black text-violet-600 dark:text-violet-400">
                      Head of CS / CX Director
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tuvi-palace-masonry {
          columns: 1;
          column-gap: 10px;
        }
        @media (min-width: 640px) {
          .tuvi-palace-masonry {
            columns: 2;
          }
        }
        @media (min-width: 1024px) {
          .tuvi-palace-masonry {
            columns: 3;
          }
        }

        .tuvi-elements-masonry {
          columns: 1;
          column-gap: 10px;
        }
        @media (min-width: 640px) {
          .tuvi-elements-masonry {
            columns: 2;
          }
        }
        @media (min-width: 768px) {
          .tuvi-elements-masonry {
            columns: 3;
          }
        }
        @media (min-width: 1024px) {
          .tuvi-elements-masonry {
            columns: 5;
          }
        }

        .tuvi-masonry-item {
          break-inside: avoid;
          margin-bottom: 10px;
          display: inline-block;
          width: 100%;
        }

        @supports (grid-template-rows: masonry) {
          .tuvi-palace-masonry {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: masonry;
            gap: 10px;
          }
          @media (min-width: 640px) {
            .tuvi-palace-masonry {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .tuvi-palace-masonry {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .tuvi-elements-masonry {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: masonry;
            gap: 10px;
          }
          @media (min-width: 640px) {
            .tuvi-elements-masonry {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 768px) {
            .tuvi-elements-masonry {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .tuvi-elements-masonry {
              grid-template-columns: repeat(5, 1fr);
            }
          }

          .tuvi-masonry-item {
            margin-bottom: 0;
            display: flex;
          }
        }
      `}} />
    </PageLayout>
  );
}
