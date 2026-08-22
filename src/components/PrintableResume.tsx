import { Phone, Briefcase, GraduationCap, Award, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface PrintableResumeProps {
  forceLanguage?: "vi" | "en";
  isForPreview?: boolean;
}

export function PrintableResume({
  forceLanguage,
  isForPreview = false,
}: PrintableResumeProps) {
  const { language } = useLanguage();
  const activeLang = forceLanguage || language;
  const isVi = activeLang === "vi";

  // SVGs of Hexagonal constellation network matching the background in the PDF screenshots
  const HexBg = () => (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      style={{ opacity: 0.04 }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hexGrid"
            width="60"
            height="103.92"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            <path
              d="M 30 0 L 60 17.32 L 60 51.96 L 30 69.28 L 0 51.96 L 0 17.32 Z"
              fill="none"
              stroke="#000000"
              strokeWidth="0.8"
            />
            <path
              d="M 30 103.92 L 60 86.6 L 60 51.96 L 30 69.28 L 0 51.96 L 0 86.6 Z"
              fill="none"
              stroke="#000000"
              strokeWidth="0.8"
            />
            <circle cx="30" cy="0" r="1.5" fill="#000000" />
            <circle cx="60" cy="17.32" r="1.5" fill="#000000" />
            <circle cx="60" cy="51.96" r="1.5" fill="#000000" />
            <circle cx="30" cy="69.28" r="1.5" fill="#000000" />
            <circle cx="0" cy="51.96" r="1.5" fill="#000000" />
            <circle cx="0" cy="17.32" r="1.5" fill="#000000" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>
    </div>
  );

  return (
    <div
      id="printable-resume"
      className={` ${isForPreview ? "mx-auto block w-full max-w-[820px] text-slate-800" : "hidden print:m-0 print:block print:w-full print:bg-white print:p-0 print:text-slate-900"} relative font-sans`}
      style={{
        color: "#1e293b",
        backgroundColor: "#ffffff",
      }}
    >
      {/* ==================== PAGE 1 ==================== */}
      <div
        className="relative overflow-hidden border border-slate-200 bg-white p-[25px] shadow-xl sm:p-[35px] print:border-none print:p-0 print:shadow-none"
        style={{
          width: "100%",
          minHeight: isForPreview ? "auto" : "297mm",
          aspectRatio: isForPreview ? "1 / 1.414" : "auto",
          boxSizing: "border-box",
          pageBreakAfter: "always",
          breakAfter: "page",
        }}
      >
        <HexBg />

        {/* TOP ROW HEADER */}
        <div className="relative z-10 mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="text-[14px] font-black tracking-widest text-slate-900 uppercase">
            {isVi ? "NGUYỄN HÙNG THÁI" : "NGUYEN HUNG THAI"}
          </div>
          <div className="text-[10px] font-semibold text-slate-400 italic">
            {isVi ? "Nguyễn Hùng Thái - Trang 1" : "Nguyen Hung Thai - Page 1"}
          </div>
        </div>

        {/* WEBSITE ALERT BOX */}
        <div className="relative z-10 mb-5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-center shadow-xs">
          <p className="text-[10px] leading-tight font-bold text-amber-800 sm:text-[11px]">
            {isVi
              ? "Hãy truy cập Website để xem thông tin và click vào sẽ vào trang website: "
              : "Please visit our Website to explore more details or click to direct link: "}
            <a
              href="https://www.nguyenhungthai.powerservice.one/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-block font-black break-all text-indigo-600 hover:underline"
            >
              https://www.nguyenhungthai.powerservice.one/
            </a>
          </p>
        </div>

        {/* MAIN TWO-COLUMN CONTENT */}
        <div className="relative z-10 grid grid-cols-12 gap-5 text-left">
          {/* LEFT COLUMN (GIỚI THIỆU & WORK EXP 1,2,3) */}
          <div className="col-span-7 space-y-4 border-r border-slate-100 pr-1.5">
            {/* GIỚI THIỆU */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                  alt="Hùng Thái"
                  className="h-16 w-16 shrink-0 rounded-full border-2 border-amber-500/80 object-cover shadow-md"
                />
                <div>
                  <h2 className="text-[13px] font-black tracking-widest text-indigo-900 uppercase">
                    {isVi ? "GIỚI THIỆU" : "ABOUT ME"}
                  </h2>
                  <p className="text-[11px] leading-tight font-extrabold text-amber-600">
                    {isVi
                      ? "Trưởng Phòng Dịch Vụ Khách Hàng"
                      : "Customer Service Director"}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-justify text-[10.5px] leading-relaxed font-medium text-slate-600">
                <p>
                  {isVi
                    ? "Một chuyên gia dịch vụ khách hàng với hơn 22 năm kinh nghiệm thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi."
                    : "A customer service expert with over 22 years of hands-on experience. For me, customer care is not just service, but a partnership. Every conversation, every moment, no matter how small, is a precious opportunity: to listen, to understand, and to create experiences that exceed expectations."}
                </p>
                <p>
                  {isVi
                    ? "Tôi tin rằng sự hài lòng của khách hàng không đến từ sự hoàn hảo tuyệt đối, mà đến từ sự tận tâm kịp thời và sự đồng cảm chân thành. Trong suốt sự nghiệp, tôi đã trực tiếp thiết kế và tối ưu hóa hàng chục quy trình, hệ thống Chăm Sóc Khách Hàng, luôn đặt trên nền tảng ba giá trị cốt lõi."
                    : "I believe customer satisfaction comes not from absolute perfection, but from timely dedication and sincere empathy. Throughout my career, I have directly designed and optimized dozens of Customer Care processes and systems, always based on three core values."}
                </p>
              </div>
            </div>

            {/* TRIẾT LÝ HÀNH ĐỘNG */}
            <div className="rounded-r-lg border-l-3 border-amber-500 bg-amber-50/50 p-2.5">
              <h3 className="mb-0.5 text-[9.5px] font-black tracking-wider text-amber-800 uppercase">
                {isVi ? "TRIẾT LÝ HÀNH ĐỘNG" : "OPERATIONAL PHILOSOPHY"}
              </h3>
              <p className="text-[10px] leading-snug font-bold text-slate-700 italic">
                {isVi
                  ? '"Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi: Họ luôn được lắng nghe."'
                  : '"I always strive to deliver high-quality products and services at a reasonable cost. And above all, to make every customer feel a simple yet fundamental thing: They are always heard."'}
              </p>
            </div>

            {/* KINH NGHIỆM LÀM VIỆC (1,2,3) */}
            <div className="space-y-2.5">
              <h2 className="flex items-center gap-1.5 border-b border-indigo-100 pb-0.5 text-[11.5px] font-black tracking-wider text-indigo-900 uppercase">
                <Briefcase size={12} className="text-indigo-600" />
                <span>{isVi ? "KINH NGHIỆM LÀM VIỆC" : "WORK EXPERIENCE"}</span>
              </h2>

              <div className="space-y-3">
                {/* Mobifone */}
                <div className="relative border-l-2 border-indigo-500/30 pl-3">
                  <span className="absolute top-[4px] -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500" />
                  <div className="mb-0.5 flex items-baseline justify-between">
                    <span className="py-0.2 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[9px] font-black text-amber-600">
                      2003 - 2007
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">
                      {isVi ? "Quản lý: 12 nhân sự" : "Managed: 12 staff"}
                    </span>
                  </div>
                  <h4 className="text-[10.5px] leading-tight font-extrabold text-slate-900">
                    {isVi
                      ? "Tổng Công ty Viễn thông Mobifone"
                      : "Mobifone Telecommunications Corporation"}
                  </h4>
                  <p className="mb-1 text-[10px] font-bold text-indigo-700">
                    {isVi
                      ? "Tổng đài viên (Trưởng nhóm từ 2007)"
                      : "Agent (Team Leader from 2007)"}
                  </p>
                  <p className="text-justify text-[9.5px] leading-relaxed text-slate-600">
                    {isVi
                      ? "Phụ trách tư vấn, hỗ trợ khách hàng qua tổng đài, xử lý khiếu nại và đào tạo nhân viên mới. Quản lý 12 nhân sự và đảm bảo chất lượng dịch vụ khách hàng."
                      : "Responsible for customer consultation, support via call center, complaint handling, and training new staff. Appointed Team Leader, managing 12 staff and ensuring customer service quality."}
                  </p>
                </div>

                {/* V247 */}
                <div className="relative border-l-2 border-indigo-500/30 pl-3">
                  <span className="absolute top-[4px] -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500" />
                  <div className="mb-0.5 flex items-baseline justify-between">
                    <span className="py-0.2 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[9px] font-black text-amber-600">
                      2007 - 2011
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">
                      {isVi ? "Quản lý: 12 nhân sự" : "Managed: 12 staff"}
                    </span>
                  </div>
                  <h4 className="text-[10.5px] leading-tight font-extrabold text-slate-900">
                    {isVi ? "Công ty Viễn Liên V247" : "V247 Call"}
                  </h4>
                  <p className="mb-1 text-[10px] font-bold text-indigo-700">
                    {isVi ? "Trưởng nhóm CSKH" : "CS Team Leader"}
                  </p>
                  <p className="text-justify text-[9.5px] leading-relaxed text-slate-600">
                    {isVi
                      ? "Quản lý vận hành đội ngũ CSKH đa kênh, giám sát chất lượng dịch vụ, đào tạo nhân viên và xử lý các vấn đề khiếu nại khách hàng nhằm nâng cao hiệu quả vận hành."
                      : "Managed the customer service team, monitored call allocation, and evaluated staff performance. Handled customer requests and complaints across multiple channels."}
                  </p>
                </div>

                {/* LBC */}
                <div className="relative border-l-2 border-indigo-500/30 pl-3">
                  <span className="absolute top-[4px] -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500" />
                  <div className="mb-0.5 flex items-baseline justify-between">
                    <span className="py-0.2 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[9px] font-black text-amber-600">
                      2011 - 2013
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">
                      {isVi ? "Quản lý: 12 nhân sự" : "Managed: 12 staff"}
                    </span>
                  </div>
                  <h4 className="text-[10.5px] leading-tight font-extrabold text-slate-900">
                    {isVi
                      ? "Công ty CPTT Băng Rộng Cuộc Sống (LBC)"
                      : "Life Broadband Communication (LBC)"}
                  </h4>
                  <p className="mb-1 text-[10px] font-bold text-indigo-700">
                    {isVi
                      ? "Trưởng Phòng Dịch Vụ Khách Hàng"
                      : "Head of Customer Service"}
                  </p>
                  <p className="text-justify text-[9.5px] leading-relaxed text-slate-600">
                    {isVi
                      ? "Điều hành hoạt động dịch vụ khách hàng, xây dựng quy trình, chương trình chăm sóc khách hàng và hệ thống đào tạo. Phối hợp các phòng ban để nâng cao trải nghiệm khách hàng."
                      : "Managed and supervised the customer service department. Handled customer complaints, improved products, and planned training and coaching programs."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (THÔNG TIN CÁ NHÂN & KỸ NĂNG) */}
          <div className="col-span-5 space-y-4">
            {/* THÔNG TIN CÁ NHÂN */}
            <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <h2 className="flex items-center gap-1.5 border-b border-indigo-100 pb-0.5 text-[11.5px] font-black tracking-wider text-indigo-900 uppercase">
                <Award size={12} className="text-indigo-600" />
                <span>{isVi ? "THÔNG TIN CÁ NHÂN" : "PERSONAL INFO"}</span>
              </h2>

              <div className="space-y-1.5 text-[10px] font-semibold text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {isVi ? "Sinh nhật:" : "Birthday:"}
                  </span>
                  <span>22/06/1984</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {isVi ? "Giới tính:" : "Gender:"}
                  </span>
                  <span>{isVi ? "Nam giới" : "Male"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {isVi ? "Tình trạng:" : "Marital Status:"}
                  </span>
                  <span>{isVi ? "Độc thân" : "Single"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {isVi ? "Tạm trú:" : "Temp Residence:"}
                  </span>
                  <span
                    className="max-w-[130px] truncate text-right"
                    title={isVi ? "Q7, Hồ Chí Minh" : "District 7, HCM"}
                  >
                    {isVi ? "Q7, Hồ Chí Minh" : "District 7, HCMC"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {isVi ? "Cư trú:" : "Permanent:"}
                  </span>
                  <span
                    className="max-w-[130px] truncate text-right"
                    title={isVi ? "Mỹ Tho, Tiền Giang" : "My Tho, Tien Giang"}
                  >
                    {isVi ? "Mỹ Tho, Tiền Giang" : "My Tho, Tien Giang"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {isVi ? "Điện thoại:" : "Phone:"}
                  </span>
                  <span>0909097882</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-indigo-600">hungthai84@gmail.com</span>
                </div>
              </div>
            </div>

            {/* KỸ NĂNG CHUYÊN MÔN (Orange bars) */}
            <div className="space-y-2">
              <h2 className="border-b border-indigo-100 pb-0.5 text-[11px] font-black tracking-wider text-indigo-900 uppercase">
                {isVi ? "KỸ NĂNG CHUYÊN MÔN" : "HARD SKILLS"}
              </h2>

              <div className="space-y-1.5">
                {[
                  {
                    name: isVi
                      ? "Kiến thức sâu về hệ thống CRM"
                      : "In-depth CRM System Knowledge",
                    val: 95,
                  },
                  {
                    name: isVi
                      ? "Phân tích dữ liệu khách hàng"
                      : "Customer Data Analysis",
                    val: 90,
                  },
                  {
                    name: isVi
                      ? "Xây dựng quy trình dịch vụ"
                      : "Service Process Development",
                    val: 90,
                  },
                  {
                    name: isVi
                      ? "Tự động hóa & Công nghệ CSKH"
                      : "CS Automation & Technology",
                    val: 85,
                  },
                  {
                    name: isVi
                      ? "Phân tích dữ liệu Khách hàng"
                      : "Voice of the Customer (VoC) Analysis",
                    val: 85,
                  },
                  {
                    name: isVi
                      ? "Tư duy lấy khách hàng làm trung tâm"
                      : "Customer-Centric Mindset",
                    val: 90,
                  },
                  {
                    name: isVi
                      ? "Quản lý dự án & thời gian"
                      : "Project & Time Management",
                    val: 80,
                  },
                ].map((sk, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[8.5px] leading-tight font-bold text-slate-700">
                      <span className="max-w-[160px] truncate">{sk.name}</span>
                      <span className="text-amber-600">{sk.val}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${sk.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KỸ NĂNG MỀM (Blue/Violet bars) */}
            <div className="space-y-2">
              <h2 className="border-b border-indigo-100 pb-0.5 text-[11px] font-black tracking-wider text-indigo-900 uppercase">
                {isVi ? "KỸ NĂNG MỀM" : "SOFT SKILLS"}
              </h2>

              <div className="space-y-1.5">
                {[
                  {
                    name: isVi
                      ? "Lãnh đạo & Phát triển đội ngũ"
                      : "Leadership & Team Development",
                    val: 90,
                  },
                  {
                    name: isVi
                      ? "Đào tạo & Phản hồi hiệu quả"
                      : "Effective Training & Feedback",
                    val: 90,
                  },
                  {
                    name: isVi
                      ? "Quản lý hiệu suất (KPIs, OKRs)"
                      : "Performance Management (KPIs, OKRs)",
                    val: 85,
                  },
                  {
                    name: isVi
                      ? "Giải quyết vấn đề & Quản lý khủng hoảng"
                      : "Problem Solving & Crisis Management",
                    val: 90,
                  },
                  {
                    name: isVi
                      ? "Giao tiếp – Đàm phán – Thuyết phục"
                      : "Communication – Negotiation – Persuasion",
                    val: 85,
                  },
                  {
                    name: isVi
                      ? "Quản lý xung đột & Khiếu nại"
                      : "Conflict & Complaint Management",
                    val: 85,
                  },
                  {
                    name: isVi
                      ? "Tư duy dịch vụ chuyên nghiệp"
                      : "Professional Service Mindset",
                    val: 85,
                  },
                  {
                    name: isVi
                      ? "Ra quyết định nhanh & chính xác"
                      : "Quick & Accurate Decision Making",
                    val: 85,
                  },
                  {
                    name: isVi
                      ? "Tư duy chiến lược & Tầm nhìn dài hạn"
                      : "Strategic Thinking & Long-term Vision",
                    val: 80,
                  },
                ].map((sk, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[8.5px] leading-tight font-bold text-slate-700">
                      <span className="max-w-[160px] truncate">{sk.name}</span>
                      <span className="text-indigo-600">{sk.val}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{ width: `${sk.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== PAGE 2 ==================== */}
      <div
        className="relative overflow-hidden border border-slate-200 bg-white p-[25px] shadow-xl sm:p-[35px] print:mt-0 print:border-none print:p-0 print:shadow-none"
        style={{
          width: "100%",
          minHeight: isForPreview ? "auto" : "297mm",
          aspectRatio: isForPreview ? "1 / 1.414" : "auto",
          boxSizing: "border-box",
          pageBreakAfter: "always",
          breakAfter: "page",
        }}
      >
        <HexBg />

        {/* TOP ROW HEADER */}
        <div className="relative z-10 mb-4 flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="text-[14px] font-black tracking-widest text-slate-900 uppercase">
            {isVi ? "NGUYỄN HÙNG THÁI" : "NGUYEN HUNG THAI"}
          </div>
          <div className="text-[10px] font-semibold text-slate-400 italic">
            {isVi ? "Nguyễn Hùng Thái - Trang 2" : "Nguyen Hung Thai - Page 2"}
          </div>
        </div>

        {/* MAIN TWO-COLUMN CONTENT */}
        <div className="relative z-10 grid grid-cols-12 gap-5 text-left">
          {/* LEFT COLUMN (EXPERIENCE CONTINUED: VED, PRU, MOMO, FINVIET) */}
          <div className="col-span-7 space-y-4 border-r border-slate-100 pr-1.5">
            <h2 className="flex items-center gap-1.5 border-b border-indigo-100 pb-0.5 text-[11.5px] font-black tracking-wider text-indigo-900 uppercase">
              <Briefcase size={12} className="text-indigo-600" />
              <span>
                {isVi ? "LỊCH SỬ KINH NGHIỆM" : "WORK EXPERIENCE (Cont.)"}
              </span>
            </h2>

            <div className="space-y-3.5">
              {/* VED / Shopee */}
              <div className="relative border-l-2 border-indigo-500/30 pl-3">
                <span className="absolute top-[4px] -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500" />
                <div className="mb-0.5 flex items-baseline justify-between">
                  <span className="py-0.2 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[9px] font-black text-amber-600">
                    2013 - 2016
                  </span>
                  <span className="text-[9px] font-bold text-slate-500">
                    {isVi ? "Quản lý: 130 nhân sự" : "Managed: 130 staff"}
                  </span>
                </div>
                <h4 className="text-[10px] leading-tight font-extrabold text-slate-900 sm:text-[10.5px]">
                  {isVi
                    ? "Công ty Cổ Phần Việt Nam eSport (VED, Shopee, Garena, ShopeePay)"
                    : "Vietnam eSport (VED) - (Shopee, Garena, ShopeePay)"}
                </h4>
                <p className="mb-1 text-[9.5px] font-bold text-indigo-700">
                  {isVi
                    ? "Trưởng Phòng Dịch Vụ Khách Hàng"
                    : "Head of Customer Service"}
                </p>
                <p className="text-justify text-[9.5px] leading-relaxed text-slate-600">
                  {isVi
                    ? "Quản lý hơn 150 nhân sự, xây dựng hệ thống CRM, Call Center và quy trình vận hành dịch vụ khách hàng. Tham gia phát triển sản phẩm, quản lý KPI và triển khai các dự án chuyển đổi số."
                    : "Participated in building new projects and products. Managed and organized the Customer Service Department, built CRM systems and operational processes."}
                </p>
              </div>

              {/* Prudential */}
              <div className="relative border-l-2 border-indigo-500/30 pl-3">
                <span className="absolute top-[4px] -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500" />
                <div className="mb-0.5 flex items-baseline justify-between">
                  <span className="py-0.2 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[9px] font-black text-amber-600">
                    2016 - 2018
                  </span>
                  <span className="text-[9px] font-bold text-slate-500">
                    {isVi ? "Quản lý: 12 nhân sự" : "Managed: 12 staff"}
                  </span>
                </div>
                <h4 className="text-[10px] leading-tight font-extrabold text-slate-900 sm:text-[10.5px]">
                  {isVi
                    ? "Công ty Bảo hiểm nhân thọ Prudential Vietnam"
                    : "Prudential Vietnam Assurance"}
                </h4>
                <p className="mb-1 text-[9.5px] font-bold text-indigo-700">
                  {isVi ? "Trưởng Phòng CallCenter" : "Call Center Manager"}
                </p>
                <p className="text-justify text-[9.5px] leading-relaxed text-slate-600">
                  {isVi
                    ? "Trưởng phòng CallCenter, tối ưu vận hành và triển khai các dự án tích hợp công nghệ, bao gồm Videocall, E-Commerce và hệ thống quản trị dịch vụ khách hàng."
                    : "Managed the Call Center system, arranged personnel for the new system, and integrated E-commerce with the Call Center. Implemented Videocall consultations."}
                </p>
              </div>

              {/* MoMo */}
              <div className="relative border-l-2 border-indigo-500/30 pl-3">
                <span className="absolute top-[4px] -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500" />
                <div className="mb-0.5 flex items-baseline justify-between">
                  <span className="py-0.2 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[9px] font-black text-amber-600">
                    2018 - 2021
                  </span>
                  <span className="text-[9px] font-bold text-slate-500">
                    {isVi ? "Quản lý: 60 nhân sự" : "Managed: 60 staff"}
                  </span>
                </div>
                <h4 className="text-[10px] leading-tight font-extrabold text-slate-900 sm:text-[10.5px]">
                  {isVi
                    ? "Công ty Cổ Phần Mservice (Ví điện tử MoMo)"
                    : "Mservice (MoMo E-Wallet)"}
                </h4>
                <p className="mb-1 text-[9.5px] font-bold text-indigo-700">
                  {isVi
                    ? "Trưởng Phòng Dịch Vụ Khách Hàng"
                    : "Head of Customer Service"}
                </p>
                <p className="text-justify text-[9.5px] leading-relaxed text-slate-600">
                  {isVi
                    ? "Quản lý hoạt động chăm sóc khách hàng đa kênh, xây dựng CRM, tối ưu quy trình và hệ thống KPI. Tham gia xây dựng các giải pháp tự động hóa nhằm nâng cao trải nghiệm khách hàng."
                    : "Managed the CS department for MoMo e-wallet across all channels. Built CRM systems, improved processes, and enhanced customer experience through automation."}
                </p>
              </div>

              {/* Finviet */}
              <div className="relative border-l-2 border-indigo-500/30 pl-3">
                <span className="absolute top-[4px] -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500" />
                <div className="mb-0.5 flex items-baseline justify-between">
                  <span className="py-0.2 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[9px] font-black text-amber-600">
                    2023 - 2024
                  </span>
                  <span className="text-[9px] font-bold text-slate-500">
                    {isVi ? "Quản lý: 17 nhân sự" : "Managed: 17 staff"}
                  </span>
                </div>
                <h4 className="text-[10px] leading-tight font-extrabold text-slate-900 sm:text-[10.5px]">
                  {isVi
                    ? "Công ty Cổ Phần Công Nghệ Finviet"
                    : "Finviet Technology Group"}
                </h4>
                <p className="mb-1 text-[9.5px] font-bold text-indigo-700">
                  {isVi
                    ? "Trưởng Phòng Dịch Vụ Khách Hàng"
                    : "Head of Customer Service"}
                </p>
                <p className="text-justify text-[9.5px] leading-relaxed text-slate-600">
                  {isVi
                    ? "Điều hành đội ngũ CSKH, chuẩn hóa quy trình, nâng cao trải nghiệm dịch vụ và triển khai các chương trình cải tiến trải nghiệm khách hàng trên toàn hệ thống."
                    : "Managed and supervised the customer service team, tracked call allocation, and evaluated staff performance. Conducted training and improved customer satisfaction."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (DỰ ÁN & HỌC VẤN) */}
          <div className="col-span-5 space-y-4">
            {/* DỰ ÁN */}
            <div className="space-y-1.5">
              <h2 className="flex items-center gap-1.5 border-b border-indigo-100 pb-0.5 text-[11px] font-black tracking-wider text-indigo-900 uppercase">
                <Check size={12} className="text-indigo-600" />
                <span>{isVi ? "DỰ ÁN" : "PROJECTS"}</span>
              </h2>

              <div className="grid grid-cols-1 gap-y-0.5 text-[8.5px] font-semibold text-slate-700">
                {[
                  {
                    id: 1,
                    vi: "Xây dựng Phòng Dịch vụ Khách hàng",
                    en: "Building a Customer Service Department",
                  },
                  {
                    id: 2,
                    vi: "Thiết lập mục tiêu phòng ban",
                    en: "Setting Departmental Goals",
                  },
                  {
                    id: 3,
                    vi: "Nâng cao trải nghiệm khách hàng",
                    en: "Enhancing Customer Experience",
                  },
                  {
                    id: 4,
                    vi: "Quản lý dự án CSKH",
                    en: "CS Project Management",
                  },
                  {
                    id: 5,
                    vi: "Thúc đẩy cải tiến sản phẩm",
                    en: "Driving Product Improvement",
                  },
                  {
                    id: 6,
                    vi: "Chuẩn hóa quy trình CSKH",
                    en: "Standardizing CS Processes",
                  },
                  {
                    id: 7,
                    vi: "Tối ưu hóa kênh hỗ trợ",
                    en: "Optimizing Support Channels",
                  },
                  {
                    id: 8,
                    vi: "Triển khai tự động hóa",
                    en: "Implementing Automation",
                  },
                  {
                    id: 9,
                    vi: "Quản lý chiến dịch Outbound",
                    en: "Managing Outbound Campaigns",
                  },
                  {
                    id: 10,
                    vi: "Xây dựng hệ thống CRM",
                    en: "Building a CRM System",
                  },
                  {
                    id: 11,
                    vi: "Phân tích & Báo cáo",
                    en: "Analysis & Reporting",
                  },
                  {
                    id: 12,
                    vi: "Khảo sát & Đánh giá khách hàng",
                    en: "Customer Surveys & Feedback",
                  },
                  { id: 13, vi: "Xây dựng AI Bot", en: "Building an AI Bot" },
                  {
                    id: 14,
                    vi: "Phát triển đào tạo trực tuyến",
                    en: "Developing Online Training",
                  },
                  {
                    id: 15,
                    vi: "Thành lập Trung tâm Hỗ trợ Khách hàng",
                    en: "Help Center & Self-Service Portal Development",
                  },
                  {
                    id: 16,
                    vi: "Chiến lược Lấy Khách hàng làm Trung tâm",
                    en: "Customer-Centric Transformation",
                  },
                ].map((pj) => (
                  <div key={pj.id} className="flex items-start gap-1">
                    <span className="w-3 text-right font-extrabold text-amber-500">
                      {pj.id}.
                    </span>
                    <span className="max-w-[190px] truncate leading-tight text-slate-800">
                      {isVi ? pj.vi : pj.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* HỌC VẤN & CHỨNG CHỈ */}
            <div className="space-y-1.5">
              <h2 className="flex items-center gap-1.5 border-b border-indigo-100 pb-0.5 text-[11px] font-black tracking-wider text-indigo-900 uppercase">
                <GraduationCap size={12} className="text-indigo-600" />
                <span>{isVi ? "HỌC VẤN" : "EDUCATION"}</span>
              </h2>

              <div className="space-y-2 text-[8px] leading-tight text-slate-700 sm:text-[8.5px]">
                {[
                  {
                    yr: "2024",
                    viTitle: "Thiết kế hệ thống Webpages",
                    viSch: "Tự học & Phát triển",
                    enTitle: "Webpages System Design",
                    enSch: "Self-study & Development",
                  },
                  {
                    yr: "2019",
                    viTitle: "Phân tích dữ liệu Bigdata",
                    viSch: "Phát triển chuyên môn",
                    enTitle: "Big Data Analysis",
                    enSch: "Professional Development",
                  },
                  {
                    yr: "2017",
                    viTitle: "Quản lý rủi ro",
                    viSch: "Prudential",
                    enTitle: "Risk Management",
                    enSch: "Prudential",
                  },
                  {
                    yr: "2016",
                    viTitle: "Quản lý Dự án",
                    viSch: "Prudential",
                    enTitle: "Project Management",
                    enSch: "Prudential",
                  },
                  {
                    yr: "2015",
                    viTitle: "Quản lý cấp cao",
                    viSch: "VED",
                    enTitle: "Senior Management",
                    enSch: "VED",
                  },
                  {
                    yr: "2014",
                    viTitle: "Quản lý cấp trung",
                    viSch: "VED",
                    enTitle: "Middle Management",
                    enSch: "VED",
                  },
                  {
                    yr: "2013",
                    viTitle: "Thuyết trình",
                    viSch: "VietnamWorks",
                    enTitle: "Presentation Skills",
                    enSch: "VietnamWorks",
                  },
                  {
                    yr: "2013",
                    viTitle: "Đào tạo",
                    viSch: "VietnamWorks",
                    enTitle: "Training Skills",
                    enSch: "VietnamWorks",
                  },
                  {
                    yr: "2013",
                    viTitle: "Phỏng vấn",
                    viSch: "VietnamWorks",
                    enTitle: "Interviewing Skills",
                    enSch: "VietnamWorks",
                  },
                  {
                    yr: "2007",
                    viTitle: "Bằng Đại học CNTT",
                    viSch: "ĐH Công Nghệ STU",
                    enTitle: "Bachelor of IT",
                    enSch: "STU University of Technology",
                  },
                  {
                    yr: "2007",
                    viTitle: "Chứng nhận Tổng đài viên Mobifone",
                    viSch: "Mobifone",
                    enTitle: "Mobifone Call Center Agent Cert",
                    enSch: "Mobifone",
                  },
                  {
                    yr: "2006",
                    viTitle: "Quản trị hệ thống CCNA",
                    viSch: "Trường Nghệ Nhất Nghệ",
                    enTitle: "CCNA System Administration",
                    enSch: "Truong Nghe Nhat Nghe",
                  },
                  {
                    yr: "2005",
                    viTitle: "Quản trị hệ thống MCSA",
                    viSch: "Trường Nghệ Nhất Nghệ",
                    enTitle: "MCSA System Administration",
                    enSch: "Truong Nghe Nhat Nghe",
                  },
                ].map((edu, idx) => (
                  <div
                    key={idx}
                    className="border-b border-slate-100 pb-1 last:border-none last:pb-0"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-extrabold text-indigo-700">
                        {isVi ? edu.viTitle : edu.enTitle}
                      </span>
                      <span className="ml-1 shrink-0 font-bold text-slate-400">
                        {isVi ? `Năm: ${edu.yr}` : `Year: ${edu.yr}`}
                      </span>
                    </div>
                    <div className="mt-0.2 font-medium text-slate-500 italic">
                      {isVi ? edu.viSch : edu.enSch}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
