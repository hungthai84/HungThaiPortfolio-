import React from "react";
import { 
  Diamond, Rocket, TrendingUp, ShieldAlert, 
  Target, Bot, Heart, BarChart3, Monitor, 
  Cpu, Users, DollarSign,
  CheckCircle, AlertCircle,
  Briefcase, Trophy, Globe
} from "lucide-react";
import { cn } from "../lib/utils";

const CircularProgress = ({ 
  value, 
  colorClass, 
  trackClass = "text-slate-100",
  size = 72,
  strokeWidth = 8,
  children
}: { 
  value: number, 
  colorClass: string,
  trackClass?: string,
  size?: number,
  strokeWidth?: number,
  children?: React.ReactNode
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className={trackClass} />
        <circle 
          cx={size/2} cy={size/2} r={radius} 
          stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          className={colorClass}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex items-center justify-center flex-col text-center">
        {children}
      </div>
    </div>
  );
};

const SkillItem = ({ 
  item, 
  colorClass, 
  trackClass, 
  barGradient, 
  icon: Icon 
}: { 
  item: { name: string, score: string }, 
  colorClass: string,
  trackClass: string,
  barGradient: string,
  icon: React.ElementType
}) => {
  const id = `skill-${item.name.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="dropdown w-full">
      <input
        hidden
        className="sr-only"
        name={id}
        id={id}
        type="checkbox"
      />
      <label
        aria-label="dropdown"
        htmlFor={id}
        className="trigger flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-t-xl"
      >
        <div className={cn("p-2 rounded-lg bg-white shadow-sm border border-slate-100", colorClass)}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-black text-slate-800 dark:text-slate-100">{item.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className={cn("flex-1 h-1.5 rounded-full overflow-hidden", trackClass)}>
              <div 
                className={cn("h-full rounded-full transition-all duration-1000", barGradient)} 
                style={{ width: item.score }} 
              />
            </div>
            <span className={cn("text-[10px] font-black uppercase tracking-tighter", colorClass)}>{item.score}</span>
          </div>
        </div>
        <div className="trigger-arrow transition-transform duration-300">
          <TrendingUp size={14} className="text-slate-400" />
        </div>
      </label>

      <ul className="list webkit-scrollbar overflow-hidden transition-all duration-300 max-h-0 opacity-0 bg-slate-50/50 dark:bg-slate-900/30 rounded-b-xl" role="list">
        <li className="listitem p-3 pt-0" role="listitem">
          <article className="article text-[11px] font-bold text-slate-500 leading-relaxed">
            Năng lực thực chiến được đánh giá ở mức <span className={cn("font-black", colorClass)}>{item.score}</span> dựa trên các dự án đã triển khai và kết quả vận hành thực tế trong hơn 22 năm kinh nghiệm.
          </article>
        </li>
      </ul>
      
      <style dangerouslySetInnerHTML={{ __html: `
        #${id}:checked ~ .list {
          max-height: 200px;
          opacity: 1;
          padding-top: 0.5rem;
        }
        #${id}:checked + .trigger .trigger-arrow {
          transform: rotate(180deg);
        }
        .dropdown {
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 12px;
          background: white;
          transition: all 0.3s ease;
        }
        .dark .dropdown {
          background: rgba(30, 41, 59, 0.4);
          border-color: rgba(255,255,255,0.05);
        }
        .dropdown:hover {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}} />
    </div>
  );
};

export const SwotAnalysis = () => {
  const strengths = [
    { name: "Kiến thức sâu về CRM", score: "95%" },
    { name: "Phân tích dữ liệu khách hàng", score: "90%" },
    { name: "Xây dựng quy trình dịch vụ", score: "90%" },
    { name: "Tư duy lấy khách hàng làm trung tâm", score: "90%" },
    { name: "Lãnh đạo & Phát triển đội ngũ", score: "90%" },
    { name: "Giải quyết vấn đề", score: "90%" },
    { name: "Trải nghiệm khách hàng (CX)", score: "90%" },
  ];

  const weaknesses = [
    { name: "Tư duy chiến lược & Tầm nhìn dài hạn", score: "80%" },
    { name: "Quản lý dự án", score: "80%" },
    { name: "Thiết kế & Lập trình Web (Responsive)", score: "85%" },
    { name: "Tự động hóa", score: "85%" },
    { name: "Quản lý hiệu suất (KPIs, OKRs)", score: "85%" },
    { name: "Giao tiếp", score: "85%" },
    { name: "Giải quyết khiếu nại", score: "85%" },
    { name: "Xây dựng văn hóa dịch vụ nội bộ", score: "85%" },
    { name: "Quản lý rủi ro dịch vụ", score: "85%" },
    { name: "Thích ứng với công nghệ", score: "85%" },
  ];

  const opportunities = [
    { icon: Bot, title: "AI & Automation", desc: "Ứng dụng AI, Chatbot, RPA và Automation để tối ưu vận hành & trải nghiệm." },
    { icon: Heart, title: "CX Strategy & Transformation", desc: "Dẫn dắt chiến lược CX, nâng cao trải nghiệm khách hàng toàn diện." },
    { icon: BarChart3, title: "Data-driven CX Management", desc: "Khai thác dữ liệu, đo lường & cá nhân hóa trải nghiệm khách hàng." },
    { icon: Monitor, title: "Digital Transformation", desc: "Thúc đẩy chuyển đổi số, CRM, Self-service và hệ sinh thái số." }
  ];

  const threats = [
    { icon: Bot, title: "AI thay đổi ngành CSKH", desc: "AI & Automation thay thế nhiều nghiệp vụ, yêu cầu nâng cấp năng lực liên tục." },
    { icon: Cpu, title: "Công nghệ thay đổi nhanh", desc: "CRM, AI, Data, Automation tiếp tục đổi mới, đòi hỏi học hỏi & thích ứng nhanh." },
    { icon: Users, title: "Cạnh tranh nhân sự", desc: "Yêu cầu kết hợp đa năng: Business + Data + Tech + Leadership ngày càng cao." },
    { icon: DollarSign, title: "Áp lực tối ưu chi phí", desc: "Doanh nghiệp yêu cầu hiệu quả cao hơn với chi phí thấp hơn." }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-transparent p-4 md:p-6 rounded-[32px] flex flex-col items-center gap-6 md:gap-8">
      
      {/* Header */}
      <header className="relative flex flex-col items-center gap-4 text-center bg-transparent border-none shadow-none">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800">
          PERSONAL <span className="text-blue-600">SWOT</span>
        </h2>
        <h3 className="text-lg md:text-xl font-bold text-blue-600 uppercase tracking-widest">
          NĂNG LỰC & ĐỊNH HƯỚNG NGHỀ NGHIỆP
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm font-bold text-slate-600 mt-2">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-blue-500" />
            <span>Đánh giá năng lực hiện tại</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-blue-200" />
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-500" />
            <span>Xác định cơ hội phát triển</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-blue-200" />
          <div className="flex items-center gap-2">
            <Rocket size={18} className="text-blue-500" />
            <span>Chủ động thích ứng & bứt phá</span>
          </div>
        </div>
      </header>

      {/* Overview & Languages */}
      <div className="w-full flex flex-col gap-6">
        {/* Top Card: Overview Stats */}
        <div className="w-full bg-white/90 backdrop-blur-xs rounded-[24px] p-6 md:p-8 flex flex-col xl:flex-row items-center gap-6 shadow-xs border border-slate-100">
          
          <header className="relative flex flex-row items-center gap-5 w-full xl:w-auto shrink-0 bg-transparent border-none shadow-none">
            <CircularProgress value={88} colorClass="text-blue-500" size={80} strokeWidth={8}>
              {/* <span className="text-xl font-black text-blue-600">88<span className="text-sm">%</span></span> */}
            </CircularProgress>
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-800 tracking-tight uppercase">TỔNG QUAN NĂNG LỰC</span>
              <span className="text-2xl font-black text-blue-600 leading-none mt-1">88%</span>
              <span className="text-xs font-semibold text-slate-500 mt-1">Mức độ thành thạo trung bình</span>
            </div>
          </header>

          <div className="hidden xl:block w-px h-16 bg-slate-100" />
          <div className="w-full h-px bg-slate-100 xl:hidden" />

          <div className="flex flex-col md:flex-row gap-6 justify-between w-full">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-50/50 border-2 border-blue-100 flex items-center justify-center shrink-0">
                <Briefcase className="text-blue-600" size={26} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-black text-blue-600 leading-tight">20+</span>
                <span className="text-[13px] font-bold text-slate-800">Năm kinh nghiệm</span>
                <span className="text-[12px] font-medium text-slate-500">Quản lý & vận hành CSKH</span>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-50/50 border-2 border-purple-100 flex items-center justify-center shrink-0">
                <Users className="text-purple-600" size={26} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-black text-purple-600 leading-tight">100+</span>
                <span className="text-[13px] font-bold text-slate-800">Đội ngũ quản lý</span>
                <span className="text-[12px] font-medium text-slate-500">Nhân sự trực tiếp</span>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-green-50/50 border-2 border-green-100 flex items-center justify-center shrink-0">
                <Trophy className="text-green-600" size={26} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-black text-green-600 leading-tight">CX xuất sắc</span>
                <span className="text-[13px] font-bold text-slate-800">Cam kết giá trị</span>
                <span className="text-[12px] font-medium text-slate-500">Kết quả bền vững</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SWOT Grid */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* STRENGTHS */}
        <div className="group relative overflow-hidden rounded-[32px] md:rounded-br-none bg-white border border-teal-100 shadow-xs p-5 md:p-6 flex flex-col gap-6">
          {/* S - Corner Badge */}
          <div className="absolute bottom-0 right-0 w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] bg-gradient-to-br from-[#53ead0] to-[#25d3b6] rounded-tl-full flex items-end justify-end pb-4 pr-5 lg:pb-6 lg:pr-7 border-t-[4px] border-l-[4px] border-white z-0 transition-transform duration-300 group-hover:scale-105 origin-bottom-right">
            <span className="text-4xl lg:text-5xl font-black text-white">S</span>
          </div>

          <p className="relative z-10 text-sm font-medium text-slate-600 leading-relaxed pr-4 mb-3">
            Những năng lực cốt lõi đã được rèn luyện và chứng minh qua thực tiễn quản lý & vận hành.
          </p>
          <header className="relative z-10 flex items-start gap-5 bg-transparent border-none shadow-none">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-teal-100 bg-teal-50 text-teal-600 shadow-xs">
              <Diamond size={32} />
            </div>
            <div className="flex flex-col pt-1">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">STRENGTHS</h3>
              <h4 className="text-sm font-extrabold text-teal-600 uppercase tracking-widest mt-1">NĂNG LỰC CỐT LÕI</h4>
              <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-transparent mt-3 rounded-full" />
            </div>
          </header>
          <div className="relative z-10 flex flex-col gap-3 mt-2">
            {strengths.map((item, idx) => (
              <SkillItem 
                key={idx} 
                item={item} 
                colorClass="text-teal-600 dark:text-teal-400" 
                trackClass="bg-teal-100/50 dark:bg-teal-900/30" 
                barGradient="bg-gradient-to-r from-teal-400 to-teal-600"
                icon={CheckCircle}
              />
            ))}
          </div>

        </div>

        {/* OPPORTUNITIES */}
        <div className="group relative overflow-hidden rounded-[32px] md:rounded-bl-none bg-white border border-indigo-100 shadow-xs p-5 md:p-6 flex flex-col gap-6">
          {/* O - Corner Badge */}
          <div className="absolute bottom-0 left-0 w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] bg-gradient-to-br from-[#9cb5ff] to-[#718df2] rounded-tr-full flex items-end justify-start pb-4 pl-5 lg:pb-6 lg:pl-7 border-t-[4px] border-r-[4px] border-white z-0 transition-transform duration-300 group-hover:scale-105 origin-bottom-left">
            <span className="text-4xl lg:text-5xl font-black text-white">O</span>
          </div>

          <p className="relative z-10 text-sm font-medium text-slate-600 leading-relaxed text-right pl-4 mb-3">
            Xu hướng công nghệ & nhu cầu thị trường mở ra nhiều cơ hội để tạo bứt phá và nâng tầm sự nghiệp.
          </p>
          <header className="relative z-10 flex items-start justify-end gap-5 text-right bg-transparent border-none shadow-none">
            <div className="flex flex-col pt-1 items-end">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">OPPORTUNITIES</h3>
              <h4 className="text-sm font-extrabold text-indigo-600 uppercase tracking-widest mt-1">CƠ HỘI PHÁT TRIỂN</h4>
              <div className="h-1 w-24 bg-gradient-to-l from-indigo-500 to-transparent mt-3 rounded-full" />
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-indigo-100 bg-indigo-50 text-indigo-600 shadow-xs order-last">
              <Rocket size={32} />
            </div>
          </header>
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-4">
            {opportunities.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 pt-5 pb-4 px-3.5 rounded-2xl border border-indigo-100 bg-indigo-50/50 text-center hover:bg-indigo-50 transition-colors shadow-xs">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-indigo-100/60 rounded-xl mb-1">
                  <item.icon size={24} className="text-indigo-600" />
                </div>
                <div className="flex flex-col w-full items-center">
                  <h5 className="text-[13px] sm:text-sm font-black text-indigo-800 leading-tight mb-1.5">{item.title}</h5>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* WEAKNESSES */}
        <div className="group relative overflow-hidden rounded-[32px] md:rounded-tr-none bg-white border border-fuchsia-100 shadow-xs p-5 md:p-6 flex flex-col gap-6">
          {/* W - Corner Badge */}
          <div className="absolute top-0 right-0 w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] bg-gradient-to-br from-[#e09cf0] to-[#c166d8] rounded-bl-full flex items-start justify-end pt-4 pr-5 lg:pt-6 lg:pr-7 border-b-[4px] border-l-[4px] border-white z-0 transition-transform duration-300 group-hover:scale-105 origin-top-right">
            <span className="text-4xl lg:text-5xl font-black text-white">W</span>
          </div>

          <p className="relative z-10 text-sm font-medium text-slate-600 leading-relaxed pr-4 mb-3">
            Những năng lực cần tiếp tục nâng cao để đạt đến cấp độ chuyên gia và đáp ứng yêu cầu tương lai.
          </p>
          <header className="relative z-10 flex items-start gap-5 pr-16 lg:pr-20 bg-transparent border-none shadow-none">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-fuchsia-100 bg-fuchsia-50 text-fuchsia-600 shadow-xs">
              <TrendingUp size={32} />
            </div>
            <div className="flex flex-col pt-1">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">WEAKNESSES</h3>
              <h4 className="text-sm font-extrabold text-fuchsia-600 uppercase tracking-widest mt-1">ĐIỂM CẦN PHÁT TRIỂN</h4>
              <div className="h-1 w-24 bg-gradient-to-r from-fuchsia-500 to-transparent mt-3 rounded-full" />
            </div>
          </header>
          <div className="relative z-10 flex flex-col gap-3 mt-2">
            {weaknesses.map((item, idx) => (
              <SkillItem 
                key={idx} 
                item={item} 
                colorClass="text-fuchsia-600 dark:text-fuchsia-400" 
                trackClass="bg-fuchsia-100/50 dark:bg-fuchsia-900/30" 
                barGradient="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600"
                icon={AlertCircle}
              />
            ))}
          </div>

        </div>

        {/* THREATS */}
        <div className="group relative overflow-hidden rounded-[32px] md:rounded-tl-none bg-white border border-orange-100 shadow-xs p-5 md:p-6 flex flex-col gap-6">
          {/* T - Corner Badge */}
          <div className="absolute top-0 left-0 w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] bg-gradient-to-br from-[#ffb485] to-[#ff7895] rounded-br-full flex items-start justify-start pt-4 pl-5 lg:pt-6 lg:pl-7 border-b-[4px] border-r-[4px] border-white z-0 transition-transform duration-300 group-hover:scale-105 origin-top-left">
            <span className="text-4xl lg:text-5xl font-black text-white">T</span>
          </div>

          <p className="relative z-10 text-sm font-medium text-slate-600 leading-relaxed text-right pl-4 mb-3">
            Những yếu tố bên ngoài có thể ảnh hưởng đến hiệu quả công việc và lộ trình phát triển.
          </p>
          <header className="relative z-10 flex items-start justify-end gap-5 text-right bg-transparent border-none shadow-none">
            <div className="flex flex-col pt-1 items-end">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">THREATS</h3>
              <h4 className="text-sm font-extrabold text-orange-500 uppercase tracking-widest mt-1">THÁCH THỨC & RỦI RO</h4>
              <div className="h-1 w-24 bg-gradient-to-l from-orange-500 to-transparent mt-3 rounded-full" />
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-orange-100 bg-orange-50 text-orange-500 shadow-xs order-last">
              <ShieldAlert size={32} />
            </div>
          </header>
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-4">
            {threats.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 pt-5 pb-4 px-3.5 rounded-2xl border border-orange-100 bg-orange-50/50 text-center hover:bg-orange-50 transition-colors shadow-xs">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-orange-100/60 rounded-xl mb-1">
                  <item.icon size={24} className="text-orange-600" />
                </div>
                <div className="flex flex-col w-full items-center">
                  <h5 className="text-[13px] sm:text-sm font-black text-orange-800 leading-tight mb-1.5">{item.title}</h5>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Card: Languages */}
      <div className="w-full bg-white rounded-[24px] p-6 md:p-8 flex flex-col gap-6 shadow-xs border border-slate-100">
        <header className="relative flex items-center gap-3 bg-transparent border-none shadow-none">
          <Globe className="text-blue-600" size={20} />
          <h3 className="text-sm font-black tracking-widest text-slate-800 uppercase">NGÔN NGỮ</h3>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Vietnamese */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-blue-50/40 border border-blue-100/80 hover:bg-blue-50/80 transition-colors shadow-xs">
            {/* Ngôn ngữ nằm trên */}
            <div className="flex flex-col items-center gap-3 mb-3">
              <CircularProgress value={100} colorClass="text-blue-500" trackClass="text-blue-100" size={90} strokeWidth={10}>
                <span className="text-2xl font-black text-blue-600 tracking-tighter">100<span className="text-lg">%</span></span>
              </CircularProgress>
              <div className="flex flex-col items-center">
                <span className="text-base font-black text-slate-800 tracking-wide uppercase">TIẾNG VIỆT</span>
                <span className="text-xs font-semibold text-slate-500">(Ngôn ngữ mẹ đẻ)</span>
              </div>
            </div>
            {/* Chữ nằm dưới */}
            <div className="pt-3 border-t border-blue-100/80 w-full flex flex-col items-center gap-1 mt-auto">
              <span className="text-xs font-bold text-blue-600">Thành thạo tuyệt đối</span>
              <p className="text-[11px] font-semibold text-slate-500 max-w-[220px]">
                Giao tiếp, làm việc, biên soạn tài liệu & đàm phán bằng tiếng Việt chuyên nghiệp.
              </p>
            </div>
          </div>

          {/* English */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-purple-50/40 border border-purple-100/80 hover:bg-purple-50/80 transition-colors shadow-xs">
            {/* Ngôn ngữ nằm trên */}
            <div className="flex flex-col items-center gap-3 mb-3">
              <CircularProgress value={90} colorClass="text-purple-500" trackClass="text-purple-100" size={90} strokeWidth={10}>
                <span className="text-2xl font-black text-purple-600 tracking-tighter">90<span className="text-lg">%</span></span>
              </CircularProgress>
              <div className="flex flex-col items-center">
                <span className="text-base font-black text-slate-800 tracking-wide uppercase">TIẾNG ANH</span>
                <span className="text-xs font-semibold text-slate-500">(English)</span>
              </div>
            </div>
            {/* Chữ nằm dưới */}
            <div className="pt-3 border-t border-purple-100/80 w-full flex flex-col items-center gap-1 mt-auto">
              <span className="text-xs font-bold text-purple-600">Giao tiếp & Làm việc chuyên nghiệp</span>
              <p className="text-[11px] font-semibold text-slate-500 max-w-[220px]">
                Đọc hiểu tài liệu chuyên ngành, trao đổi công việc & hỗ trợ khách hàng quốc tế.
              </p>
            </div>
          </div>

          {/* AI */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-emerald-50/40 border border-emerald-100/80 hover:bg-emerald-50/80 transition-colors shadow-xs">
            {/* Ngôn ngữ nằm trên */}
            <div className="flex flex-col items-center gap-3 mb-3">
              <CircularProgress value={85} colorClass="text-emerald-500" trackClass="text-emerald-100" size={90} strokeWidth={10}>
                <span className="text-2xl font-black text-emerald-600 tracking-tighter">85<span className="text-lg">%</span></span>
              </CircularProgress>
              <div className="flex flex-col items-center">
                <span className="text-base font-black text-slate-800 tracking-wide uppercase">AI ĐA NGÔN NGỮ</span>
                <span className="text-xs font-semibold text-slate-500">(AI-Powered Communication)</span>
              </div>
            </div>
            {/* Chữ nằm dưới */}
            <div className="pt-3 border-t border-emerald-100/80 w-full flex flex-col items-center gap-1 mt-auto">
              <span className="text-xs font-bold text-emerald-600">Dùng AI Trao Đổi Đa Ngôn Ngữ</span>
              <p className="text-[11px] font-semibold text-slate-500 max-w-[220px]">
                Sử dụng AI hỗ trợ trao đổi đa ngôn ngữ, dịch thuật tài liệu & hợp tác quốc tế.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
