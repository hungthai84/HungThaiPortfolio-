export interface InterviewQuestion {
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

export const INTERVIEW_VIDEO_1_URL =
  "https://cdn.scena.ai/project/9741/f7053626ae15c847304143dc6cf41f1fd2cf1611b27c30ff75ac9da6e47d005b.mp4";
export const INTERVIEW_VIDEO_2_URL =
  "https://cdn.scena.ai/project/9741/021c21b2f677c4341e06c62c9432d06d251e22c83716e55b927633e254a67730.mp4";

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
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
