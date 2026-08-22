import React, { useRef, useState, useEffect } from "react";
import {
  Video,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sparkles,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle2,
  MessageSquare,
  Award,
  Zap,
  HelpCircle,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

// Video assets
const VIDEO_1_URL =
  "https://cdn.scena.ai/project/9741/f7053626ae15c847304143dc6cf41f1fd2cf1611b27c30ff75ac9da6e47d005b.mp4";
const VIDEO_2_URL =
  "https://cdn.scena.ai/project/9741/021c21b2f677c4341e06c62c9432d06d251e22c83716e55b927633e254a67730.mp4";

interface InterviewQuestion {
  id: number;
  stt: string;
  timestamp: string;
  startSec: number;
  endSec: number;
  questionVi: string;
  questionEn: string;
  answerVi: string;
  answerEn: string;
  summaryVi: string;
  summaryEn: string;
}

const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    stt: "01",
    timestamp: "00:00:00 – 00:00:09",
    startSec: 0,
    endSec: 9,
    questionVi:
      "Anh có thể giới thiệu ngắn gọn về bản thân cũng như hành trình hơn 22 năm trong lĩnh vực chăm sóc khách hàng không?",
    questionEn:
      "Could you briefly introduce yourself and your 22+ year journey in customer service?",
    answerVi:
      "Tôi bắt đầu từ vị trí tổng đài viên tại MobiFone vào năm 2003. Trong hơn 22 năm, tôi đã đảm nhiệm các vai trò Trưởng nhóm, Trưởng phòng Chăm sóc khách hàng và xây dựng, quản lý đội ngũ CSKH tại nhiều doanh nghiệp.",
    answerEn:
      "I started as a call center agent at MobiFone in 2003. Over 22+ years, I have served as Team Lead and Head of Customer Service, building and managing CS teams across multiple enterprises.",
    summaryVi:
      "22+ năm kinh nghiệm CSKH, phát triển từ tổng đài viên đến quản lý cấp phòng.",
    summaryEn:
      "22+ years CS experience, growing from agent to department head.",
  },
  {
    id: 2,
    stt: "02",
    timestamp: "00:00:24 – 00:00:34",
    startSec: 24,
    endSec: 34,
    questionVi: "Có điều gì khiến anh gắn bó lâu dài với nghề?",
    questionEn:
      "What keeps you passionate and committed to this profession for so long?",
    answerVi:
      "Tôi tin rằng mỗi tương tác đều tạo nên giá trị. Chăm sóc khách hàng không chỉ là công việc mà còn là hành trình tạo dựng niềm tin.",
    answerEn:
      "I believe every interaction creates value. Customer service is not just a job; it is a journey of building trust.",
    summaryVi: "CSKH là hành trình tạo dựng giá trị và niềm tin.",
    summaryEn: "CS is a journey of creating value and trust.",
  },
  {
    id: 3,
    stt: "03",
    timestamp: "00:00:34 – 00:00:44",
    startSec: 34,
    endSec: 44,
    questionVi:
      "Theo anh, điều quan trọng nhất khi xây dựng phòng chăm sóc khách hàng là gì?",
    questionEn:
      "In your opinion, what is the most critical element when building a customer service department?",
    answerVi:
      "Sự kết nối giữa quy trình, con người và công nghệ. Khi ba yếu tố này đồng bộ thì trải nghiệm khách hàng sẽ tạo ra khác biệt.",
    answerEn:
      "The alignment of process, people, and technology. When these three elements harmonize, customer experience creates true differentiation.",
    summaryVi: "Con người + Quy trình + Công nghệ → Trải nghiệm khách hàng.",
    summaryEn:
      "People + Process + Technology → Distinctive Customer Experience.",
  },
  {
    id: 4,
    stt: "04",
    timestamp: "00:00:44 – 00:00:54",
    startSec: 44,
    endSec: 54,
    questionVi: "Đâu là thành tựu anh tự hào nhất?",
    questionEn: "What is your most proud achievement?",
    answerVi:
      "Tôi tự hào khi xây dựng Trung tâm hỗ trợ khách hàng MoMo từ con số 0, xử lý hơn 1 triệu yêu cầu mỗi tháng với mức hài lòng trên 82%.",
    answerEn:
      "I am proud to have built MoMo's Customer Support Center from scratch, handling over 1 million requests per month with over 82% CSAT.",
    summaryVi:
      "Xây dựng hệ thống CSKH từ số 0, quy mô hơn 1 triệu yêu cầu/tháng.",
    summaryEn:
      "Built CS system from ground zero, scaling to 1M+ requests/month.",
  },
  {
    id: 5,
    stt: "05",
    timestamp: "00:00:54 – 00:01:03",
    startSec: 54,
    endSec: 63,
    questionVi:
      "Phong cách lãnh đạo của anh trong vai trò Trưởng phòng Chăm sóc khách hàng là gì?",
    questionEn: "What is your leadership style as Head of Customer Service?",
    answerVi:
      "Tôi theo hướng trao quyền, đồng hành và phản hồi nhanh. Tôi muốn xây dựng đội ngũ chủ động.",
    answerEn:
      "I lead through empowerment, companionship, and rapid feedback. My goal is to build a proactive team.",
    summaryVi: "Trao quyền – Đồng hành – Phản hồi nhanh – Đội ngũ chủ động.",
    summaryEn: "Empowerment - Companionship - Rapid Feedback - Proactive Team.",
  },
  {
    id: 6,
    stt: "06",
    timestamp: "00:01:03 – 00:01:15",
    startSec: 63,
    endSec: 75,
    questionVi:
      "Quan điểm của anh về ứng dụng chuyển đổi số trong chăm sóc khách hàng?",
    questionEn:
      "What is your perspective on digital transformation in customer service?",
    answerVi:
      "Tôi tin vào việc ứng dụng Big Data, trí tuệ nhân tạo và tự động hóa để dịch chuyển từ mô hình phản ứng sang mô hình dự đoán nhu cầu khách hàng.",
    answerEn:
      "I believe in utilizing Big Data, AI, and automation to shift from a reactive support model to predictive customer care.",
    summaryVi:
      "Chuyển từ CSKH phản ứng sang dự đoán nhu cầu bằng dữ liệu, AI và tự động hóa.",
    summaryEn:
      "Shift from reactive to predictive CS using data, AI & automation.",
  },
  {
    id: 7,
    stt: "07",
    timestamp: "00:01:15 – 00:01:27",
    startSec: 75,
    endSec: 87,
    questionVi:
      "Nếu phải xây dựng phòng chăm sóc khách hàng từ đầu, anh sẽ ưu tiên những việc gì?",
    questionEn:
      "If building a CS department from scratch, what would be your top priorities?",
    answerVi:
      "Tôi sẽ bắt đầu từ cấu trúc tổ chức, xây dựng quy trình vận hành chuẩn hóa, tuyển chọn nhân sự có tư duy dịch vụ và chọn giải pháp công nghệ phù hợp với định hướng phát triển 3 năm tới.",
    answerEn:
      "I would start with organizational structure, standardized operating processes, recruiting service-minded talent, and adopting technology tailored for a 3-year growth roadmap.",
    summaryVi: "Tổ chức → Quy trình → Nhân sự → Công nghệ → Định hướng 3 năm.",
    summaryEn: "Structure → Process → People → Tech → 3-Year Roadmap.",
  },
  {
    id: 8,
    stt: "08",
    timestamp: "00:01:27 – 00:01:39",
    startSec: 87,
    endSec: 99,
    questionVi:
      "Nếu được tuyển, mục tiêu 90 ngày đầu của anh tại đây sẽ là gì?",
    questionEn: "If hired, what would be your goals for the first 90 days?",
    answerVi:
      "Đánh giá thực trạng hệ thống, xử lý các điểm nghẽn nhanh, mang lại kết quả Quick Win, đồng thời xây dựng lộ trình 12 tháng để nâng cấp toàn diện hệ thống CSKH.",
    answerEn:
      "Assess current system status, resolve immediate bottlenecks for Quick Wins, and craft a 12-month roadmap for comprehensive CS upgrade.",
    summaryVi: "90 ngày tạo Quick Win; 12 tháng nâng cấp toàn diện.",
    summaryEn: "90-day Quick Wins; 12-month comprehensive system upgrade.",
  },
  {
    id: 9,
    stt: "09",
    timestamp: "00:01:39 – 00:01:50",
    startSec: 99,
    endSec: 110,
    questionVi:
      "Văn hóa dịch vụ của công ty ưu tiên lấy trải nghiệm khách hàng làm trọng tâm hay tập trung vào việc tuân thủ quy trình?",
    questionEn:
      "Does the company service culture prioritize Customer Experience or strict process compliance?",
    answerVi:
      "Công ty hiện đang chuẩn hóa vận hành theo quy trình và trong hai năm tới đặt mục tiêu chuyển sang lấy trải nghiệm khách hàng làm trọng tâm.",
    answerEn:
      "The company is currently standardizing operations via processes, aiming to transition into a Customer-Centric model within 2 years.",
    summaryVi:
      "Doanh nghiệp đang chuyển từ chuẩn hóa quy trình sang Customer Centric.",
    summaryEn:
      "Transitioning from process standardization to Customer Centricity.",
  },
  {
    id: 10,
    stt: "10",
    timestamp: "00:01:59 – 00:02:13",
    startSec: 119,
    endSec: 133,
    questionVi:
      "Trong 6 tháng đầu, lãnh đạo mong đợi phòng chăm sóc khách hàng tạo ra thay đổi rõ rệt nhất ở điểm nào?",
    questionEn:
      "In the first 6 months, what key transformation does executive leadership expect from CS?",
    answerVi:
      "Tối ưu hóa quy trình xử lý yêu cầu, rút ngắn thời gian phản hồi khách hàng, xây dựng KPI bài bản và cải thiện cảm nhận thương hiệu qua từng tương tác.",
    answerEn:
      "Optimizing resolution workflows, shortening response times, establishing structured KPIs, and enhancing brand perception across all touchpoints.",
    summaryVi:
      "Tối ưu quy trình – nhanh phản hồi – KPI – nâng trải nghiệm thương hiệu.",
    summaryEn:
      "Process optimization - Faster response - Structured KPIs - Brand perception.",
  },
  {
    id: 11,
    stt: "11",
    timestamp: "00:02:14 – 00:02:27",
    startSec: 134,
    endSec: 147,
    questionVi:
      "Công ty đã đầu tư hệ thống công nghệ chăm sóc khách hàng nào như CRM, Chatbot chưa?",
    questionEn:
      "Has the company invested in CS technology systems such as CRM or Chatbot?",
    answerVi:
      "Công ty đang sử dụng CRM nội bộ và hệ thống tổng đài nhưng chưa có Helpdesk hoặc Chatbot tự động. Trưởng phòng CSKH mới sẽ được toàn quyền đề xuất và triển khai.",
    answerEn:
      "The company uses an internal CRM and call center system, but lacks automated Helpdesk or Chatbot. The new Head of CS will be empowered to propose and implement them.",
    summaryVi:
      "Hệ thống hiện tại còn thiếu Helpdesk/Chatbot; mở cơ hội chuyển đổi công nghệ.",
    summaryEn:
      "Current setup lacks Helpdesk/Chatbot; great opportunity for tech transformation.",
  },
  {
    id: 12,
    stt: "12",
    timestamp: "00:02:27 – 00:02:41",
    startSec: 147,
    endSec: 161,
    questionVi:
      "Cơ chế phối hợp giữa chăm sóc khách hàng với các phòng ban khác hiện được vận hành ra sao?",
    questionEn:
      "How is the cross-departmental coordination between CS and other teams currently operated?",
    answerVi:
      "Hiện các phòng ban phối hợp chủ yếu qua email và họp. Sắp tới công ty sẽ áp dụng cơ chế phản hồi qua hệ thống và giao cho Trưởng phòng CSKH xây dựng.",
    answerEn:
      "Currently departments coordinate mainly via email and meetings. Going forward, system-based SLA tracking will be implemented, led by the Head of CS.",
    summaryVi: "Từ phối hợp thủ công → xây dựng cơ chế phối hợp trên hệ thống.",
    summaryEn:
      "Moving from manual email coordination to system-driven SLA mechanisms.",
  },
  {
    id: 13,
    stt: "13",
    timestamp: "00:02:41 – 00:02:58",
    startSec: 161,
    endSec: 178,
    questionVi:
      "Anh có mong muốn trao đổi điều gì thêm hoặc đặt câu hỏi cho chúng tôi không?",
    questionEn:
      "Do you have any further questions or topics you would like to discuss with us?",
    answerVi:
      "Tôi rất đồng tình với mục tiêu xây dựng hệ thống tập trung vào nâng cao trải nghiệm khách hàng và hy vọng có cơ hội đồng hành cùng công ty.",
    answerEn:
      "I strongly align with the company's vision of building a customer-centric experience system and look forward to the opportunity to partner together.",
    summaryVi:
      "Thể hiện sự đồng thuận với định hướng Customer Experience và mong muốn đồng hành.",
    summaryEn:
      "Strong alignment with Customer Experience vision & eager to contribute.",
  },
];

export function Interview() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const videoRef = useRef<HTMLVideoElement>(null);

  // States for Video & Audio
  const [isInterviewPlaying, setIsInterviewPlaying] = useState(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);

  // Card Expand 1.1x & Blur State
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  // Active Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuestionsListOpen, setIsQuestionsListOpen] = useState(false);

  // Sync Active Question with Video Playback Time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isInterviewPlaying) return;
      const time = video.currentTime;
      let idx = INTERVIEW_QUESTIONS.findIndex(
        (q) => time >= q.startSec && time <= q.endSec
      );
      if (idx === -1) {
        // Fallback: find the last question that started before current time
        for (let i = INTERVIEW_QUESTIONS.length - 1; i >= 0; i--) {
          if (time >= INTERVIEW_QUESTIONS[i].startSec) {
            idx = i;
            break;
          }
        }
      }
      if (idx !== -1 && idx !== currentQuestionIndex) {
        setCurrentQuestionIndex(idx);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isInterviewPlaying]);

  // Handle video end event
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (isInterviewPlaying) {
        setIsInterviewPlaying(false);
        video.src = VIDEO_1_URL;
        video.loop = true;
        video.muted = true;
        video.load();
        video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isInterviewPlaying]);

  const toggleInterview = () => {
    playUiSound("click");
    const video = videoRef.current;
    if (!video) return;

    if (isInterviewPlaying) {
      setIsInterviewPlaying(false);
      video.src = VIDEO_1_URL;
      video.loop = true;
      video.muted = true;
      video.load();
      video.play().catch(() => {});
    } else {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.play().catch(() => {});
    }
  };

  // Seek video to specific question
  const handleSelectQuestion = (index: number) => {
    playUiSound("click");
    setCurrentQuestionIndex(index);
    const q = INTERVIEW_QUESTIONS[index];
    const video = videoRef.current;
    if (!video) return;

    if (!isInterviewPlaying || video.src !== VIDEO_2_URL) {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.currentTime = q.startSec;
      video.play().catch(() => {});
    } else {
      video.currentTime = q.startSec;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  };

  const currentQ = INTERVIEW_QUESTIONS[currentQuestionIndex];

  return (
    <PageLayout
      id="interview-main-card"
      rootClassName="w-full max-w-full !p-[5px] rounded-[15px] sm:rounded-[20px] border border-[var(--border)] relative flex flex-1 flex-col !bg-transparent transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 !rounded-full transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto !bg-transparent"
      pageId="interview"
      pageName="Interview Main Card"
      title={isVi ? "Phỏng Vấn Chiến Lược" : "Strategic Interview"}
      subtitle={
        isVi
          ? "Video phỏng vấn mẫu trả lời câu hỏi chiến lược về CX/CS."
          : "Sample video answering core CX/CS and operational questions."
      }
      icon={Video}
      headerActions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-black text-rose-700 dark:text-rose-300 shadow-xs backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span>{isVi ? "Video Q&A Trực Tuyến" : "Interactive Q&A Video"}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-black text-indigo-700 dark:text-indigo-300 shadow-xs backdrop-blur-md">
            <Sparkles size={13} className="text-indigo-500" />
            <span>{isVi ? "10 Câu Hỏi Chiến Lược" : "10 Strategic Qs"}</span>
          </div>
        </div>
      }
    >
      {/* BLUR BACKDROP WHEN CARD IS EXPANDED TO 1.1x */}
      <AnimatePresence>
        {isCardExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playUiSound("click");
              setIsCardExpanded(false);
            }}
            className="fixed inset-0 z-[90] flex cursor-pointer items-center justify-center bg-slate-950/80 backdrop-blur-xl transition-all duration-300"
          />
        )}
      </AnimatePresence>

      <div className="relative mx-auto flex w-full flex-1 flex-col gap-6 space-y-2 !p-0">
        {/* MAIN RELATIVE CARD WITH EXPAND ON CLICK, 2-COLUMN GRID & BORDER GLOW */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isCardExpanded ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "card-border-glow relative mx-auto w-full max-w-6xl rounded-[15px] !p-0 backdrop-blur-none transition-all duration-500 !bg-transparent !shadow-none !border-none",
            isCardExpanded
              ? "z-[100] border-indigo-400 !bg-transparent text-white shadow-[0_0_80px_rgba(99,102,241,0.6)] ring-2 ring-indigo-400"
              : "z-10 text-slate-900 dark:text-white",
          )}
        >
          {/* VIDEO PLAYER CANVAS */}
          <div className="w-full">
            <div className="flex flex-col justify-between space-y-3">
              <div className="group relative aspect-video min-h-[260px] w-full overflow-hidden rounded-[15px] border border-slate-700/50 bg-slate-950 shadow-2xl sm:min-h-[340px]">
                {/* VIDEO ELEMENT */}
                <video
                  ref={videoRef}
                  controls={isInterviewPlaying}
                  autoPlay
                  loop={!isInterviewPlaying}
                  muted={!isInterviewPlaying || !isVideoAudioOn}
                  playsInline
                  poster="https://i.ibb.co/ynnj4BXr/H-nh-tr-nh-ki-n-t-o.png"
                  className="h-full w-full rounded-[15px] object-cover transition-transform duration-700"
                  src={isInterviewPlaying ? VIDEO_2_URL : VIDEO_1_URL}
                />

                {/* TRANSPARENT OVERLAY LAYER */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-transparent" />

                {/* CIRCULAR QUESTION TRIGGER AT BOTTOM LEFT */}
                <div className="pointer-events-auto absolute left-3 bottom-3 z-30">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playUiSound("click");
                      setIsQuestionsListOpen(!isQuestionsListOpen);
                    }}
                    type="button"
                    title={isVi ? "Danh sách câu hỏi phỏng vấn" : "Interview questions list"}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-slate-950/90 p-1 px-3.5 py-2 text-xs font-black text-white shadow-lg backdrop-blur-md transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-sm",
                      isQuestionsListOpen
                        ? "from-emerald-600 to-teal-600 bg-gradient-to-r shadow-[0_0_20px_rgba(16,185,129,0.5)] border-emerald-400"
                        : "from-blue-600 via-indigo-600 to-violet-600 bg-gradient-to-r shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:from-blue-500 hover:to-violet-500"
                    )}
                  >
                    <div className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full shadow-inner sm:h-7 sm:w-7 transition-transform duration-500",
                      isQuestionsListOpen ? "rotate-[360deg] bg-emerald-500/20 text-emerald-300" : "bg-indigo-500/20 text-indigo-300"
                    )}>
                      <HelpCircle size={14} className="sm:size-[16px]" />
                    </div>
                    <span>
                      {isQuestionsListOpen
                        ? (isVi ? "Câu hỏi hiện tại" : "Show Current Question")
                        : (isVi ? "Xem 13 Câu hỏi" : "Show 13 Questions")}
                    </span>
                    <Sparkles
                      size={14}
                      className={cn(
                        "shrink-0 text-amber-300",
                        isQuestionsListOpen ? "animate-spin" : "animate-bounce"
                      )}
                    />
                  </motion.button>
                </div>

                {/* UNIFIED PLAY & AUDIO CONTROL BUTTON AT BOTTOM RIGHT */}
                <div className="pointer-events-auto absolute right-3 bottom-3 z-20">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleInterview}
                    type="button"
                    className="flex w-[281px] h-[51px] cursor-pointer items-center justify-between px-3.5 py-2 rounded-full border-2 border-indigo-400/80 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_25px_rgba(99,102,241,0.6)] backdrop-blur-md transition-all duration-300 hover:from-blue-500 hover:to-violet-500 text-xs font-black text-white sm:text-sm"
                    style={{ width: '281px', height: '51px' }}
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-md sm:h-7 sm:w-7">
                      {!isInterviewPlaying ? (
                        <Play
                          size={14}
                          className="translate-x-0.5 fill-indigo-600"
                        />
                      ) : (
                        <Pause size={14} className="fill-indigo-600" />
                      )}
                    </div>
                    <span>
                      {!isInterviewPlaying
                        ? isVi
                          ? "Phát phỏng vấn mẫu"
                          : "Play Sample Interview"
                        : isVi
                          ? "Tạm dừng phỏng vấn"
                          : "Pause Interview"}
                    </span>
                    {!isInterviewPlaying && (
                      <Sparkles
                        size={14}
                        className="shrink-0 animate-bounce text-amber-300"
                      />
                    )}

                    {/* Integrated Divider and Audio Button */}
                    <div className="mx-1 h-4 w-px shrink-0 bg-white/20" />

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiSound("click");
                        const nextAudio = !isVideoAudioOn;
                        setIsVideoAudioOn(nextAudio);
                        if (videoRef.current) {
                          videoRef.current.muted = !nextAudio;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          playUiSound("click");
                          const nextAudio = !isVideoAudioOn;
                          setIsVideoAudioOn(nextAudio);
                          if (videoRef.current) {
                            videoRef.current.muted = !nextAudio;
                          }
                        }
                      }}
                      title={
                        isVideoAudioOn
                          ? isVi
                            ? "Tắt âm thanh"
                            : "Mute Audio"
                          : isVi
                            ? "Bật âm thanh"
                            : "Unmute Audio"
                      }
                      className={cn(
                        "flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all text-white hover:bg-white/10 active:scale-90",
                        isVideoAudioOn ? "bg-white/15" : "bg-rose-500/80"
                      )}
                    >
                      {isVideoAudioOn ? (
                        <Volume2 size={13} className="animate-pulse" />
                      ) : (
                        <VolumeX size={13} />
                      )}
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE SPOTLIGHT QUESTION CARD */}
          <div className="mt-[10px] rounded-[15px] border border-indigo-200/80 dark:border-indigo-500/40 bg-white/90 dark:bg-slate-900/90 pt-[20px] pb-4 px-4 sm:pt-[20px] sm:pb-5 sm:px-5 backdrop-blur-xl min-h-[160px] text-slate-800 dark:text-slate-100 shadow-xl">
            <AnimatePresence mode="wait">
              {isQuestionsListOpen ? (
                <motion.div
                  key="questions-list"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/80 dark:border-indigo-500/30 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-black text-white shadow-md animate-pulse">
                        ?
                      </span>
                      <h3 className="text-sm font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {isVi ? "Danh sách 13 câu hỏi phỏng vấn" : "13 Interview Questions Timeline"}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-bold">
                      {isVi ? "Chọn một câu hỏi dưới đây để nhảy tới phần tương ứng" : "Select a question below to jump to that section"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                    {INTERVIEW_QUESTIONS.map((q, idx) => {
                      const isActive = currentQuestionIndex === idx;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => {
                            handleSelectQuestion(idx);
                            setIsQuestionsListOpen(false); // return to details view on selection
                          }}
                          className={cn(
                            "w-full flex items-start gap-2.5 rounded-xl h-[51px] px-[15px] py-[15px] text-left text-xs transition-all border",
                            isActive
                              ? "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-400 dark:border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                              : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                          )}
                          style={{ height: '51px', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '15px', paddingRight: '15px' }}
                        >
                          <span className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-lg text-[10px] font-black shadow-sm transition-colors",
                            isActive ? "bg-indigo-600 text-white animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          )}>
                            {q.stt}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-0.5">
                                <Clock size={9} />
                                {q.timestamp}
                              </span>
                              {isActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              )}
                            </div>
                            <p className="mt-1 text-xs leading-normal font-medium line-clamp-2 text-slate-800 dark:text-slate-200">
                              {isVi ? q.questionVi : q.questionEn}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="active-question-detail"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/80 dark:border-indigo-500/30 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white shadow-md">
                        {currentQ.stt}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-indigo-300 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-500/20 px-3 py-0.5 text-xs font-bold text-indigo-800 dark:text-indigo-200">
                        <Clock size={12} />
                        {currentQ.timestamp}
                      </span>
                    </div>
                    <span className="rounded-full border border-amber-500/35 bg-amber-50 dark:bg-amber-500/20 px-3 py-1 text-xs font-black text-amber-900 dark:text-amber-300 shadow-2xs">
                      {isVi ? "Tóm tắt: " : "Summary: "}
                      {isVi ? currentQ.summaryVi : currentQ.summaryEn}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-indigo-700 dark:text-indigo-300 sm:text-lg">
                      {isVi ? currentQ.questionVi : currentQ.questionEn}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-200 sm:text-sm">
                      {isVi ? currentQ.answerVi : currentQ.answerEn}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </PageLayout>
  );
}
