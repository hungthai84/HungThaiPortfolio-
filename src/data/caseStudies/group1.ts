import { CaseStudy } from "../projectsData";

export const group1CaseStudies: Record<string, CaseStudy> = {
  "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng": {
    summary:
      "Chuyển đổi phòng CSKH từ một trung tâm chi phí thụ động (Cost Center) thành bệ phóng trải nghiệm và trung tâm giá trị (Value Center). Thiết lập bộ máy vận hành hoàn chỉnh từ Tầm nhìn, Sơ đồ tổ chức 6 khối chuyên trách, Luồng xử lý 3 tuyến, Khung năng lực tuyển dụng đến Văn hóa Customer-Centric.",
    context: {
      currentStatus:
        "Doanh nghiệp chưa có bộ máy CSKH chuyên trách bài bản, các phản hồi của khách hàng bị đùn đẩy và phản hồi chậm trễ, dẫn đến tỷ lệ rời bỏ cao.",
      cause:
        "Thiếu sơ đồ tổ chức phân cấp, thiếu bộ quy trình chuẩn SOP, hạ tầng CRM rời rạc và nhân sự tuyến đầu chưa được chuẩn hóa năng lực.",
      needForChange:
        "Thiết lập phòng CSKH toàn diện từ số 0 để xây dựng bệ phóng trải nghiệm khách hàng, chuẩn hóa SLA/SOP và tối ưu giữ chân khách hàng.",
    },
    problems: [
      {
        problem: "Chưa có bộ máy vận hành CSKH chuyên trách",
        cause: "Xử lý đùn đẩy giữa các phòng ban, thiếu quy trình chuẩn hóa SOP & SLA.",
        impact: "Thời gian phản hồi trễ 45 phút, CSAT chỉ đạt 72%, tỷ lệ rời bỏ dịch vụ 8.5%.",
      },
      {
        problem: "Hạ tầng CRM và công nghệ tiếp nhận phân tán",
        cause: "Khách hàng nhắn tin qua nhiều kênh lẻ tẻ không được quản lý hội tụ.",
        impact: "Ticket bị thất lạc, thông tin phản hồi không đồng bộ, chi phí xử lý cao ($4.50/ticket).",
      },
    ],
    objectives: {
      strategic: [
        "Định vị CSKH là Trung tâm Giá trị (Value Center) bệ phóng trải nghiệm khách hàng.",
        "Thiết lập Tầm nhìn đối tác tin cậy và bộ 6 Giá trị cốt lõi (Tận tâm, Lắng nghe, Đồng cảm, Chủ động, Chính trực, Trao quyền).",
      ],
      operational: [
        "100% Phủ Kênh CSKH Omnichannel (Hotline, Chat, Zalo, Mail, Social).",
        "Cam kết thời gian phản hồi SLA < 15 phút, FCR >= 85%.",
        "Thiết lập bộ chuẩn SOP và quy trình phối hợp xử lý 3 Tuyến.",
      ],
      customer: [
        "Nâng chỉ số CSAT từ 72% lên >= 95%.",
        "Tăng điểm số NPS lên mức xuất sắc (> 50).",
      ],
      development: [
        "Chuẩn hóa Khung năng lực 3 cấp (Agent, Team Leader, CS Manager) & Quy trình tuyển dụng 5 bước.",
      ],
      kpi: [
        "FRT < 3 phút (thực tế đạt 2.8 phút).",
        "FCR đạt 88.2%.",
        "Tỷ lệ tuân thủ SLA phản hồi đạt 98.5%.",
        "Tiết kiệm 40% chi phí xử lý / Ticket (xuống $2.70).",
        "Giảm Churn Rate xuống 2.1%.",
      ],
    },
    solutions: {
      modelOverview:
        "Bản đồ thực thi 4 Trụ cột giải pháp: Tầm nhìn & Sứ mệnh, Sơ đồ tổ chức 6 khối chuyên trách & 3 tuyến, Khung năng lực tuyển dụng 5 bước, Văn hóa Customer-Centric.",
      imageUrl: "https://i.ibb.co/ymvZmbMM/1-1-X-y-d-ng-Ph-ng-D-ch-v-Kh-ch-h-ng.png",
      cards: [
        {
          name: "01 · TẦM NHÌN & SỨ MỆNH",
          purpose: "Định hình rõ vai trò và đóng góp chiến lược của phòng CSKH trong bức tranh chung của doanh nghiệp.",
          implementation: "Xây dựng tuyên ngôn Tầm nhìn đối tác tin cậy; 4 định hướng Sứ mệnh và bộ 6 Giá trị cốt lõi.",
          value: "Thống nhất tư duy và kim chỉ nam hành động cho toàn bộ đội ngũ.",
        },
        {
          name: "02 · THIẾT KẾ SƠ ĐỒ TỔ CHỨC 6 KHỐI",
          purpose: "Tối ưu hóa hiệu suất vận hành nhờ tính chuyên trách và luồng phối hợp 3 tuyến nhịp nhàng.",
          implementation: "Thiết lập sơ đồ cây 3 tầng đứng đầu bởi Giám Đốc CSKH, quản lý 6 khối chuyên biệt: Inbound, Outbound, Escalation, QA, Data & Social.",
          value: "Phân định rõ trách nhiệm, xử lý đúng tuyến và dễ dàng mở rộng quy mô.",
        },
        {
          name: "03 · KHUNG NĂNG LỰC & TUYỂN DỤNG",
          purpose: "Đảm bảo tuyển dụng đúng người, đúng năng lực và giảm thiểu tỷ lệ tiêu hao nhân sự.",
          implementation: "Chuẩn hóa Khung năng lực cho 3 cấp (Nhân viên, Trưởng nhóm, Quản lý) và ban hành Quy trình tuyển dụng 5 bước nghiêm ngặt.",
          value: "Xây dựng lực lượng nhân sự chất lượng cao, giỏi chuyên môn và vững tư duy dịch vụ.",
        },
        {
          name: "04 · VĂN HÓA CUSTOMER-CENTRIC",
          purpose: "Đưa khách hàng vào trung tâm của mọi quyết định nội bộ.",
          implementation: "Triển khai 4 trụ cột (Lắng nghe, Đồng cảm, Trao quyền, Ghi nhận) thông qua các chương trình đào tạo định hướng.",
          value: "Biến tinh thần phục vụ thành DNA của bộ phận, tạo ra các tương tác vượt kỳ vọng.",
        },
      ],
    },
    implementation: [
      "Bước 1: Khảo sát & Đánh giá hiện trạng vận hành CSKH.",
      "Bước 2: Khuôn mẫu & Thiết kế ban hành Tầm nhìn & Sơ đồ 6 khối.",
      "Bước 3: Tuyển dụng Onboarding theo quy trình 5 bước HR.",
      "Bước 4: Đào tạo chuẩn hóa kỹ năng & quy trình SOP.",
      "Bước 5: Vận hành thử, chấm điểm QA & Báo cáo KPI.",
      "Bước 6: Tối ưu & Mở rộng sẵn sàng tích hợp CRM/AI.",
    ],
    roleAndContribution: {
      role: "Senior Project Architect / CX Strategist",
      responsibilities: [
        "Nghiên cứu và hoạch định toàn bộ mô hình tổ chức CSKH.",
        "Thiết kế khung năng lực, tiêu chuẩn tuyển dụng và văn hóa vận hành.",
        "Chủ trì quy định phối hợp 3 tuyến giữa 6 khối chuyên trách.",
        "Áp dụng nguyên tắc Trao quyền cho nhân sự tuyến đầu bồi thường nhanh.",
        "Thiết lập bộ chỉ số đo lường trải nghiệm CSAT & NPS realtime.",
      ],
    },
    systemsAndTools: {
      methods: ["Model 6 Khối Chuyên Trách", "Phân Cấp 3 Tuyến (Tier 1, 2, 3)", "Văn Hóa 4 Trụ Cột Customer-Centric"],
      toolsList: [
        "Công cụ tính Định biên Headcount",
        "Bảng chấm điểm QA Đàm thoại",
        "Đo lường CSAT & NPS Realtime Calculator",
        "Helpdesk Omnichannel Ticket System",
      ],
    },
    results: {
      operational: [
        "Thời gian phản hồi ban đầu (FRT) giảm từ 45 phút xuống 2.8 phút (Nhanh hơn 93.7%).",
        "Tỷ lệ giải quyết lần đầu (FCR) tăng từ 52.0% lên 88.2%.",
        "Tỷ lệ tuân thủ SLA phản hồi đạt 98.5%.",
      ],
      customer: [
        "Chỉ số hài lòng khách hàng (CSAT) tăng từ 72.0% lên 96.8%.",
        "Điểm số NPS đạt +62 (Mức Xuất Sắc).",
        "Giảm tỷ lệ rời bỏ dịch vụ Churn Rate từ 8.5% xuống 2.1%.",
      ],
      hr: [
        "Xây dựng xong bộ Khung năng lực 3 cấp độ và Quy trình tuyển dụng 5 bước HR chuẩn hóa.",
      ],
      business: [
        "Chi phí xử lý trung bình / Ticket giảm 40% từ $4.50 xuống $2.70.",
        "Đạt chỉ số ROI 210%, chuyển đổi CSKH từ Cost Center thành Value Center.",
      ],
      kpiBeforeAfter: [
        "FRT: 45 Phút -> 2.8 Phút (Nhanh hơn 93.7%)",
        "FCR: 52.0% -> 88.2% (Tăng +36.2%)",
        "CSAT: 72.0% -> 96.8% (Tăng +24.8%)",
        "SLA: 68.5% -> 98.5% (Tăng +30.0%)",
        "Cost/Ticket: $4.50 -> $2.70 (Tiết kiệm 40.0%)",
        "Churn Rate: 8.5% -> 2.1% (Giảm 6.4%)",
      ],
    },
    valueAndDevelopment: {
      customerValue: "Nhận được sự hỗ trợ nhanh chóng, tận tâm và được tôn trọng giải quyết tận gốc vấn đề.",
      businessValue: "Tiết kiệm 40% chi phí vận hành, gia tăng LTV và tạo bảo chứng tài chính ROI 210%.",
      organizationValue: "Sở hữu bộ máy CSKH 6 khối chuyên trách bài bản, sẵn sàng mở rộng quy mô.",
      lessons: [
        "Trao quyền cho nhân viên tuyến đầu giúp giải tỏa ức chế của khách hàng ngay lập tức.",
        "Đo lường dữ liệu Realtime giúp phát hiện sớm các điểm nghẽn vận hành.",
      ],
      nextSteps: [
        "Tích hợp AI Bot trợ lý ảo để tự động hóa trả lời các yêu cầu Tuyến 1.",
        "Mở rộng mô hình Omnichannel kết hợp Voicebot đàm thoại tự động.",
      ],
    },
  },

  "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động": {
    summary:
      "Chuyển đổi Phòng CSKH từ trung tâm chi phí (Cost Center) thành trung tâm giá trị (Value Center) thông qua việc kết hợp hệ thống đo lường hiệu suất KPI vận hành với mục tiêu tham vọng OKR gắn liền với chiến lược tăng trưởng toàn công ty.",
    context: {
      currentStatus:
        'Phòng CSKH hoạt động thiếu mục tiêu định lượng cụ thể, chủ yếu xử lý thụ động theo sự việc phát sinh và báo cáo định kỳ bằng file thủ công.',
      cause:
        "Chưa có sự phân định giữa chỉ tiêu duy trì vận hành ổn định (KPI) và mục tiêu đột phá nâng tầm trải nghiệm (OKR).",
      needForChange:
        "Xây dựng hệ thống chỉ tiêu đo lường chuẩn xác, minh bạch thời gian thực để liên kết mọi nỗ lực của cá nhân với thành công của doanh nghiệp.",
    },
    problems: [
      {
        problem: "Mục tiêu phòng ban bị cô lập khỏi mục tiêu công ty",
        cause:
          "CSKH chỉ đo số cuộc gọi mà không liên kết với tỷ lệ giữ chân khách hàng (Retention) hay doanh thu trọn đời (LTV).",
        impact:
          "Bộ phận CSKH bị xem là gánh nặng chi phí thay vì nguồn tạo ra giá trị bền vững.",
      },
      {
        problem: "Dữ liệu hiệu suất bị trễ và thiếu tính minh bạch",
        cause: "Phụ thuộc vào báo cáo Excel cuối tuần/cuối tháng.",
        impact:
          "Không phát hiện kịp thời các điểm nghẽn vận hành, nhân viên thiếu cơ sở để tự hoàn thiện.",
      },
    ],
    objectives: {
      strategic: [
        "Định vị CSKH là Trung tâm Giá trị (Value Center) đóng góp trực tiếp vào mục tiêu giữ chân khách hàng của công ty.",
        "Đồng bộ hóa 100% mục tiêu của từng nhân viên với mục tiêu chiến lược của Ban Điều Hành.",
      ],
      operational: [
        "Thiết lập bộ chỉ số KPI vận hành chuẩn quốc tế: FCR (First Contact Resolution), AHT, SLA, CSAT, CES.",
        "Xây dựng Real-time Analytics Dashboard cập nhật số liệu mỗi 60 giây.",
      ],
      development: [
        "Ứng dụng OKR hàng quý để thúc đẩy các dự án sáng tạo và bứt phá hiệu suất.",
      ],
      kpi: [
        "Nâng CSAT từ 80% lên 92% trong 2 quý.",
        "Tăng chỉ số NPS từ 32 lên 65 điểm.",
        "Giảm 25% tỷ lệ khiếu nại lặp lại nhiều lần.",
      ],
    },
    solutions: {
      modelOverview:
        "Mô hình Quản trị Hiệu suất Đa tầng: Khung KPI Vận hành Hàng ngày + Mục tiêu Đột phá OKR Hàng quý + Real-time Dashboard Trực quan hóa Dữ liệu.",
      imageUrl: "https://i.ibb.co/1fNzL0x5/1-2-Thi-t-l-p-m-c-ti-u-ph-ng-ban.png",
      cards: [
        {
          name: "01 · Kết hợp Ma trận KPI & OKR",
          purpose: "Đảm bảo cân bằng giữa vận hành ổn định và đổi mới bứt phá.",
          implementation:
            "Áp dụng KPI cho các chỉ số cốt lõi (AHT, FCR, Service Level, Quality Score). Áp dụng OKR cho các chiến dịch cải tiến lớn (VD: Giảm 50% thời gian chờ kênh Chat).",
          value: "Nhân sự vừa giữ vững kỷ luật vừa có không gian sáng tạo.",
          iconName: "Target",
        },
        {
          name: "02 · Strategic Alignment (Liên kết Chiến lược)",
          purpose: "Tạo sợi dây liên kết xuyên suốt từ công ty đến từng cá nhân.",
          implementation:
            "Thiết kế cây mục tiêu: Mục tiêu Doanh Nghiệp ➔ Mục tiêu Khối Vận hành ➔ OKR Phòng CSKH ➔ KPI cá nhân từng ca trực.",
          value: "Mỗi nhân viên nhận thức rõ mỗi cuộc gọi của mình đóng góp gì cho doanh nghiệp.",
          iconName: "Network",
        },
        {
          name: "03 · Realtime Operational Dashboard",
          purpose: "Số hóa dữ liệu và minh bạch hóa hiệu suất thời gian thực.",
          implementation:
            "Tích hợp dữ liệu từ tổng đài và CRM lên màn hình Dashboard chung: hiển thị Call Queue, SLA, Agent Status và điểm CSAT trực tiếp.",
          value: "Phát hiện ngay lập tức tình trạng quá tải để linh hoạt điều phối nhân sự.",
          iconName: "BarChart",
        },
        {
          name: "04 · Cơ chế Đánh giá & Khen thưởng Linh hoạt",
          purpose: "Ghi nhận xứng đáng các nỗ lực vượt bậc của đội ngũ.",
          implementation:
            "Xây dựng bảng vinh danh 'Hero of the Month', thưởng KPI theo cấp bậc hiệu suất và gắn liền với chất lượng phục vụ thực chất.",
          value: "Thúc đẩy động lực nội tại và tinh thần thi đua lành mạnh.",
          iconName: "Award",
        },
      ],
    },
    implementation: [
      "Họp chiến lược cùng Ban Giám đốc để thấu hiểu mục tiêu kinh doanh cả năm",
      "Thiết kế khung phân bổ chỉ số KPI và OKR cho từng nhóm chuyên môn",
      "Xây dựng từ điển chỉ số (KPI Dictionary) định nghĩa rõ công thức và cách đo lường",
      "Xây dựng hệ thống Dashboard thời gian thực kết nối trực tiếp cơ sở dữ liệu",
      "Tổ chức workshop hướng dẫn nhân viên thiết lập OKR cá nhân và theo dõi KPI",
      "Thiết lập chu kỳ Review tuần, tháng và Retro quý để điều chỉnh kịp thời",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng Dịch vụ Khách hàng (Head of CS)",
      responsibilities: [
        "Thiết kế toàn bộ khung quản trị mục tiêu OKR và hệ thống KPI của phòng ban.",
        "Xây dựng kiến trúc liên kết mục tiêu và đàm phán cam kết SLA liên phòng ban.",
        "Chỉ đạo triển khai hệ thống Dashboard giám sát hiệu suất tự động.",
      ],
    },
    systemsAndTools: {
      methods: [
        "OKR Framework",
        "KPI Cascading Methodology",
        "Real-time Telemetry & SLA Tracking",
        "Data-driven Governance",
      ],
      toolsList: [
        "Google Data Studio / Power BI",
        "Realtime Call Center Analytics",
        "Internal Performance Tracker",
      ],
    },
    results: {
      operational: [
        "100% nhân sự nắm vững chỉ số và chủ động theo dõi hiệu suất qua Dashboard cá nhân.",
        "Thời gian xử lý sự cố giảm 35% nhờ cơ chế cảnh báo sớm.",
      ],
      customer: [
        "Chỉ số CSAT tăng vọt từ 80% lên 93.5% sau 2 quý áp dụng liên tục.",
        "NPS tăng từ +30 lên +62 điểm.",
      ],
      hr: [
        "Tỷ lệ gắn kết nhân viên tăng 40%, nhân sự tự hào về vai trò tạo ra giá trị.",
      ],
      business: [
        "CSKH được vinh danh là phòng ban xuất sắc nhất trong việc hỗ trợ giữ chân khách hàng trung thành.",
      ],
      kpiBeforeAfter: [
        "CSAT: 80% ➔ 93.5%",
        "NPS: +30 ➔ +62",
        "First Contact Resolution (FCR): 68% ➔ 86%",
        "SLA Tuân thủ thời gian tiếp nhận: 82% ➔ 98%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Được phục vụ bởi đội ngũ nhân sự có mục tiêu rõ ràng, tốc độ phản hồi nhanh và chất lượng xuất sắc.",
      businessValue:
        "Tối ưu chi phí phục vụ (Cost per Contact) đồng thời tăng tỷ lệ khách hàng quay lại mua hàng.",
      organizationValue:
        "Xây dựng văn hóa minh bạch, làm việc dựa trên dữ liệu chuẩn xác thay vì cảm tính.",
      lessons: [
        "KPI là thước đo sàn để duy trì chất lượng, còn OKR là đòn bẩy để tạo nên đột phá.",
        "Dữ liệu trực quan hóa theo thời gian thực giúp trao quyền tự chủ tối đa cho nhân viên.",
      ],
      nextSteps: [
        "Tích hợp AI dự báo lưu lượng tiếp nhận theo mùa vụ để tối ưu hóa việc phân ca tự động.",
      ],
    },
  },

  "1.3 · Nâng cao chất lượng trải nghiệm khách hàng": {
    summary:
      "Chuyển đổi toàn diện trải nghiệm khách hàng (CX) từ hỗ trợ phản ứng (Reactive Support) sang thiết kế hành trình chủ động và thấu cảm (Proactive & Emotional CX), kết hợp bản đồ hành trình 6 giai đoạn với hệ thống đo lường cảm xúc thời gian thực (CSAT/NPS/CES).",
    context: {
      currentStatus:
        'CSKH chủ yếu tập trung giải quyết sự cố đơn lẻ theo từng ticket, thiếu cái nhìn toàn diện về hành trình cảm xúc và các điểm chạm xuyên suốt vòng đời khách hàng.',
      cause:
        "Chưa có Bản đồ Hành trình Khách hàng chuẩn (CJM), các kênh tương tác hoạt động phân mảnh và chưa có quy trình lắng nghe tiếng nói khách hàng (VoC) đa chiều.",
      needForChange:
        'Chuyển đổi sang thiết kế trải nghiệm liền mạch, tạo ra các khoảnh khắc đáng nhớ (Moments of Truth) và biến khách hàng thành đại sứ thương hiệu.',
    },
    problems: [
      {
        problem: "Trải nghiệm bị đứt gãy giữa các phòng ban",
        cause:
          "Thông tin từ Marketing, Sales và CSKH không đồng bộ, khách hàng phải lặp lại thông tin nhiều lần.",
        impact:
          "Chỉ số nỗ lực khách hàng (CES) cao, khách hàng thất vọng và dễ chuyển sang đối thủ.",
      },
      {
        problem: "Thiếu dữ liệu định lượng về cảm xúc khách hàng",
        cause: "Chỉ đo lường sau khi sự cố nghiêm trọng đã xảy ra.",
        impact:
          "Không nhận diện được khách hàng có nguy cơ rời bỏ (Detractor) để cứu vãn kịp thời.",
      },
    ],
    objectives: {
      strategic: [
        "Xây dựng trải nghiệm khách hàng xuất sắc trở thành giá trị cốt lõi và lợi thế cạnh tranh của doanh nghiệp.",
        "Thiết lập hệ thống lắng nghe Tiếng nói Khách hàng (VoC) 360 độ.",
      ],
      operational: [
        "Thiết kế và chuẩn hóa Bản đồ Hành trình Khách hàng (CJM) cho 100% dòng sản phẩm chủ lực.",
        "Triển khai đo lường tức thời CSAT, NPS và CES tại từng điểm chạm quan trọng.",
      ],
      customer: [
        "Giảm thiểu chỉ số nỗ lực khách hàng (CES) xuống mức tối thiểu.",
        "Tạo ra các điểm chạm vượt kỳ vọng (Moments of Magic).",
      ],
      kpi: [
        "Tăng điểm CSAT tổng thể lên ≥ 95%.",
        "Nâng NPS lên ≥ 70 điểm.",
        "Giảm 40% số trường hợp khách hàng phàn nàn về sự đứt gãy thông tin.",
      ],
    },
    solutions: {
      modelOverview:
        "Kiến trúc CX 4 Tầng: Bản đồ Hành trình 6 Giai đoạn ➔ Hệ thống Đo lường Cảm xúc Đa điểm chạm ➔ Quy trình Đóng vòng Phản hồi (Closed-Loop Feedback) ➔ Đào tạo Tư duy Phục vụ Thấu cảm.",
      imageUrl: "https://i.ibb.co/BkVdp76/1-3-N-ng-cao-tr-i-nghi-m-kh-ch-h-ng.png",
      cards: [
        {
          name: "01 · Customer Journey Mapping (CJM)",
          purpose: "Nhận diện toàn bộ điểm chạm và các khoảnh khắc chân thực (Moments of Truth).",
          implementation:
            "Vẽ bản đồ hành trình qua 6 giai đoạn: Nhận biết ➔ Tìm hiểu ➔ Mua hàng ➔ Onboarding ➔ Sử dụng ➔ Tái tục. Phân tích chi tiết Điểm đau (Pain Points) và Kỳ vọng.",
          value: "Hiểu rõ chính xác khách hàng cần gì tại từng thời điểm.",
          iconName: "Map",
        },
        {
          name: "02 · Realtime VoC & Sentiment Tracking",
          purpose: "Đo lường cảm xúc khách hàng ngay sau mỗi tương tác.",
          implementation:
            "Tự động gửi khảo sát 1 chạm qua SMS/Zalo/In-app sau khi kết thúc hỗ trợ, kết hợp phân tích từ khóa cảm xúc (Sentiment Analysis).",
          value: "Bắt trọn phản hồi nóng để can thiệp trong vòng 15 phút.",
          iconName: "Heart",
        },
        {
          name: "03 · Closed-Loop Detractor Recovery",
          purpose: "Xử lý triệt để các phản hồi tiêu cực để biến khách hàng giận dữ thành trung thành.",
          implementation:
            "Quy trình kích hoạt tự động: Bất kỳ đánh giá 1-2 sao sẽ tạo ticket khẩn cấp cho Quản lý gọi lại lắng nghe và bồi thường trải nghiệm trong 2 giờ.",
          value: "Cứu vãn thành công 85% khách hàng có nguy cơ rời bỏ.",
          iconName: "ShieldCheck",
        },
        {
          name: "04 · Empathy-First Service Standards",
          purpose: "Nâng chuẩn giao tiếp từ đúng kịch bản sang chạm đến trái tim.",
          implementation:
            "Biên soạn bộ quy tắc 'Giao tiếp Thấu cảm 5T': Thấu hiểu - Tôn trọng - Tận tình - Tức thì - Trách nhiệm. Đào tạo kỹ năng lắng nghe chủ động.",
          value: "Biến các cuộc gọi giải quyết sự cố thành cơ hội gia tăng tình cảm thương hiệu.",
          iconName: "Smile",
        },
      ],
    },
    implementation: [
      "Tổ chức workshop liên phòng ban để xây dựng Customer Journey Map tổng thể",
      "Tích hợp hệ thống khảo sát tự động CSAT/NPS/CES vào CRM và Tổng đài",
      "Thiết lập quy trình cứu vãn khách hàng không hài lòng (Detractor Action Plan)",
      "Đào tạo toàn bộ đội ngũ nhân sự về bộ tiêu chuẩn Empathy-First",
      "Thiết lập báo cáo CX hàng tuần gửi Ban Điều Hành phân tích xu hướng cảm xúc",
      "Định kỳ review và cập nhật lại CJM mỗi 6 tháng dựa trên dữ liệu thực tế",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Head of CX",
      responsibilities: [
        "Hoạch định chiến lược trải nghiệm khách hàng tổng thể của doanh nghiệp.",
        "Chủ trì thiết kế Bản đồ Hành trình Khách hàng và cơ chế đo lường VoC.",
        "Dẫn dắt các sáng kiến cải tiến liên phòng ban để xóa bỏ điểm đau khách hàng.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Customer Journey Mapping (CJM)",
        "Voice of Customer (VoC)",
        "Closed-loop Feedback System",
        "Moments of Truth Design",
      ],
      toolsList: [
        "Miro / Figma Journey Mapping",
        "Survey Automated Trigger Engine",
        "Omnichannel CRM & CX Analytics",
      ],
    },
    results: {
      operational: [
        "Xóa bỏ 100% tình trạng khách hàng phải nhắc lại vấn đề nhiều lần khi chuyển kênh.",
        "Thời gian xử lý khiếu nại cảm xúc giảm từ 48h xuống 4h.",
      ],
      customer: [
        "Chỉ số CSAT duy trì ổn định ở mức 96.2%.",
        "NPS tăng vọt lên mức +72 điểm (thuộc top đầu ngành).",
      ],
      business: [
        "Tỷ lệ giữ chân khách hàng (Retention Rate) tăng thêm 18%, đóng góp hàng chục tỷ doanh thu.",
      ],
      kpiBeforeAfter: [
        "CSAT: 82% ➔ 96.2%",
        "NPS: +32 ➔ +72",
        "Tỷ lệ giải quyết khiếu nại trong 24h: 70% ➔ 98%",
        "Customer Effort Score (CES): Giảm 45%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Trải nghiệm dịch vụ mượt mà, cảm thấy tiếng nói của mình luôn được tôn trọng và quan tâm sâu sắc.",
      businessValue:
        "Tăng giá trị vòng đời khách hàng (LTV) và giảm thiểu tối đa chi phí thu hút khách hàng mới.",
      organizationValue:
        "Lan tỏa tư duy 'Khách hàng là trọng tâm' tới toàn thể các phòng ban trong công ty.",
      lessons: [
        "Trải nghiệm khách hàng là sự nghiệp của toàn công ty, không chỉ riêng phòng CSKH.",
        "Một khách hàng được giải quyết khiếu nại xuất sắc sẽ trung thành hơn cả khách hàng chưa từng gặp sự cố.",
      ],
      nextSteps: [
        "Ứng dụng AI phân tích giọng nói (Speech Analytics) để nhận diện cảm xúc tự động trong từng giây đàm thoại.",
      ],
    },
  },

  "1.4 · Quản lý và triển khai dự án chăm sóc khách hàng": {
    summary:
      "Áp dụng phương pháp luận quản trị dự án Agile / Scrum & Kanban chuyên sâu cho khối Dịch vụ Khách hàng, thiết lập guồng máy cải tiến liên tục (Continuous Improvement Engine) giúp triển khai thành công hàng chục dự án số hóa và tối ưu vận hành đúng tiến độ, đúng ngân sách.",
    context: {
      currentStatus:
        "Phòng CSKH có rất nhiều sáng kiến cải tiến nhưng thường bị chậm tiến độ, thiếu nguồn lực chuyên trách và khó phối hợp với các đội ngũ Công nghệ / Sản phẩm.",
      cause:
        "Cách quản lý dự án truyền thống (Waterfall) quá cồng kềnh, thiếu tính linh hoạt và không có cơ chế quản lý khối lượng công việc đang xử lý (WIP Limits).",
      needForChange:
        "Thiết lập khung quản trị dự án tinh gọn theo chuẩn Agile/Kanban để tăng tốc độ ra mắt giải pháp, giảm thiểu rủi ro và thích ứng nhanh với biến động thị trường.",
    },
    problems: [
      {
        problem: "Dự án bị nghẽn và trễ hạn bàn giao",
        cause:
          "Ôm đồm quá nhiều đầu việc cùng lúc mà không phân định rõ mức độ ưu tiên (Priority Matrix).",
        impact:
          "Nhân sự kiệt sức, các tính năng quan trọng phục vụ khách hàng bị đình trệ nhiều tháng.",
      },
      {
        problem: "Thiếu sự phối hợp nhịp nhàng giữa CSKH và Tech/Product",
        cause:
          "Ngôn ngữ nghiệp vụ chưa được chuẩn hóa thành User Stories và Acceptance Criteria cụ thể.",
        impact:
          "Sản phẩm bàn giao không khớp với kỳ vọng thực tế của người dùng và đội ngũ tuyến đầu.",
      },
    ],
    objectives: {
      strategic: [
        "Xây dựng năng lực quản trị dự án chuyên nghiệp nội bộ cho khối CSKH.",
        "Rút ngắn 50% thời gian từ khi phát hiện ý tưởng cải tiến đến khi triển khai thực tế (Time-to-Market).",
      ],
      operational: [
        "Thiết lập bảng Kanban trực quan hóa 100% luồng công việc của phòng ban.",
        "Áp dụng triệt để nguyên tắc Giới hạn Công việc Đang Làm (WIP Limit) và Daily Stand-up 15 phút.",
      ],
      development: [
        "Đào tạo tư duy Agile Mindset và kỹ năng Product Owner / Scrum Master cho đội ngũ quản lý cấp trung.",
      ],
      kpi: [
        "Tỷ lệ dự án hoàn thành đúng hạn: ≥ 95%.",
        "Tốc độ giải phóng công việc (Cycle Time) giảm 40%.",
        "Năng suất hoàn thành sáng kiến cải tiến tăng gấp 2.5 lần.",
      ],
    },
    solutions: {
      modelOverview:
        "Hệ thống Quản trị Dự án Agile-CS: Quản lý Backlog Tinh gọn ➔ Bảng Kanban Trực quan ➔ Kiểm soát WIP Limit ➔ Nghi thức Sprint & Retrospective Đều đặn.",
      imageUrl: "https://i.ibb.co/4ZtQD8gK/1-4-Qu-n-l-d-n-CSKH.png",
      cards: [
        {
          name: "01 · Project Charter & Prioritization",
          purpose: "Định hình rõ mục tiêu, phạm vi và thứ tự ưu tiên của từng dự án.",
          implementation:
            "Áp dụng ma trận định giá giá trị/nỗ lực (Value vs Effort Matrix) và phương pháp RICE Score để xếp hạng các sáng kiến cải tiến quan trọng nhất.",
          value: "Tập trung 100% nguồn lực vào những dự án tạo ra tác động lớn nhất cho trải nghiệm khách hàng.",
          iconName: "Target",
        },
        {
          name: "02 · Kanban Board & WIP Limits",
          purpose: "Trực quan hóa luồng công việc và ngăn chặn tình trạng quá tải.",
          implementation:
            "Thiết lập bảng Jira/Lark với các luồng rõ ràng: Backlog ➔ To-do ➔ In Progress (WIP Limit: 3) ➔ Testing / Pilot ➔ Done. Đảm bảo 'Stop Starting, Start Finishing'.",
          value: "Loại bỏ hoàn toàn điểm nghẽn, tăng tính minh bạch và nhịp độ làm việc ổn định.",
          iconName: "Layers",
        },
        {
          name: "03 · Daily Stand-up & Sprint Cadence",
          purpose: "Tháo gỡ rào cản và duy trì tính gắn kết liên tục của dự án.",
          implementation:
            "Tổ chức họp đứng 15 phút mỗi sáng với 3 câu hỏi cốt lõi: Hôm qua làm gì? Hôm nay làm gì? Đang gặp khó khăn gì cần hỗ trợ?",
          value: "Giải quyết ngay các vướng mắc phát sinh trong ngày, không để tồn đọng.",
          iconName: "Clock",
        },
        {
          name: "04 · Sprint Review & Retrospective",
          purpose: "Học hỏi và liên tục tối ưu hóa quy trình sau mỗi chu kỳ dự án.",
          implementation:
            "Sau mỗi sprint 2 tuần, tổ chức buổi đánh giá kết quả thực tế và đúc kết bài học theo mô hình: Mad - Sad - Glad / Start - Stop - Continue.",
          value: "Đội ngũ liên tục tiến bộ, văn hóa hợp tác ngày càng gắn kết và bền vững.",
          iconName: "TrendingUp",
        },
      ],
    },
    implementation: [
      "Đào tạo phương pháp luận Agile/Kanban cho toàn bộ nhân sự quản lý và chuyên viên dự án",
      "Khởi tạo hệ thống quản trị dự án trên nền tảng số (Jira / Lark Base / Trello)",
      "Thiết lập quy trình chuẩn tiếp nhận và sàng lọc yêu cầu cải tiến (Initiative Intake)",
      "Vận hành các nghi thức Agile: Sprint Planning, Daily Stand-up, Sprint Demo, Retrospective",
      "Xây dựng Dashboard theo dõi tiến độ Burndown Chart và Velocity của đội dự án",
      "Đo lường ROI và tác động của từng dự án sau khi golive đối với chỉ số CSAT/NPS",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Project Lead (Agile Coach)",
      responsibilities: [
        "Chỉ đạo và bảo trợ toàn bộ danh mục dự án chiến lược của khối CSKH.",
        "Thiết lập khung phương pháp luận Agile, huấn luyện đội ngũ quản lý thực thi chuẩn xác.",
        "Phối hợp với CTO, CPO để đảm bảo nguồn lực kỹ thuật ưu tiên cho các dự án trải nghiệm khách hàng.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Agile / Scrum Framework",
        "Kanban & WIP Limit Management",
        "RICE Scoring & Value vs Effort",
        "Sprint Retrospective",
      ],
      toolsList: [
        "Jira Software & Confluence",
        "Lark Base Project Workflows",
        "Miro Visual Collaboration",
      ],
    },
    results: {
      operational: [
        "Triển khai thành công 15+ dự án lớn nhỏ trong 1 năm mà không bị trễ hạn.",
        "Thời gian hoàn thành một tính năng cải tiến rút ngắn từ 60 ngày xuống còn 18 ngày.",
      ],
      customer: [
        "Khách hàng liên tục nhận được các bản cập nhật tính năng tiện ích và mượt mà hơn.",
      ],
      hr: [
        "Đội ngũ làm việc chủ động, tự tổ chức (Self-organizing) và giảm 60% mức độ căng thẳng do deadline.",
      ],
      business: [
        "Tiết kiệm hàng tỷ đồng chi phí cơ hội nhờ đưa các giải pháp tự động hóa vào vận hành sớm.",
      ],
      kpiBeforeAfter: [
        "Tỷ lệ dự án On-time Delivery: 55% ➔ 96%",
        "Lead Time triển khai cải tiến: 60 ngày ➔ 18 ngày",
        "Số dự án cải tiến hoàn thành/năm: 4 dự án ➔ 16 dự án",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Mọi phản hồi và kỳ vọng của khách hàng được biến thành giải pháp thực tế trong thời gian nhanh nhất.",
      businessValue:
        "Tối đa hóa hiệu quả sử dụng nguồn lực và gia tăng tốc độ thích ứng của doanh nghiệp.",
      organizationValue:
        "Hình thành văn hóa linh hoạt, minh bạch và không ngừng đổi mới sáng tạo trong tổ chức.",
      lessons: [
        "Giới hạn số việc đang làm (WIP Limit) là chìa khóa để hoàn thành công việc nhanh hơn.",
        "Giao tiếp trực tiếp và họp ngắn 15 phút hiệu quả hơn hàng chục email trao đổi qua lại.",
      ],
      nextSteps: [
        "Mở rộng mô hình Agile sang các bộ phận liên đới như Vận hành, Kế toán đối soát và Pháp chế.",
      ],
    },
  },

  "1.5 · Cải tiến sản phẩm từ ý kiến khách hàng": {
    summary:
      "Thiết lập Vòng lặp Phản hồi Tiếng nói Khách hàng khép kín (Closed-Loop Voice of Customer - VoC), chuyển hóa hàng triệu phản ánh, thắc mắc và đóng góp từ tiền tuyến CSKH thành nguồn dữ liệu định lượng có giá trị cao nhất, thúc đẩy đội ngũ Product/Tech liên tục hoàn thiện sản phẩm.",
    context: {
      currentStatus:
        "CSKH tiếp nhận hàng ngàn ý kiến phản hồi mỗi ngày nhưng thông tin bị trôi dạt trong các báo cáo định kỳ, Product Team không có dữ liệu cụ thể để ưu tiên sửa lỗi hoặc phát triển tính năng mới.",
      cause:
        "Thiếu cơ chế phân loại lỗi có hệ thống, thiếu mã định danh điểm đau (Pain Point Tagging) và chưa có cầu nối giao ban định kỳ giữa CSKH và Product.",
      needForChange:
        "Biến CSKH thành 'Mỏ vàng Insight' của doanh nghiệp, giúp cải tiến sản phẩm trúng đích và ngăn chặn sự cố từ gốc.",
    },
    problems: [
      {
        problem: "Sản phẩm liên tục phát sinh lỗi cũ sau mỗi đợt Release",
        cause:
          "Thiếu kênh phản hồi tức thời từ tuyến đầu hỗ trợ về các bất cập người dùng gặp phải trong 24h đầu ra mắt.",
        impact:
          "Tổng đài quá tải, khách hàng bức xúc đánh giá 1 sao và tỷ lệ gỡ app tăng cao.",
      },
      {
        problem: "Tranh cãi cảm tính giữa các phòng ban về tính cấp thiết của tính năng",
        cause:
          "Ý kiến khách hàng chưa được định lượng bằng số liệu và tác động tài chính cụ thể.",
        impact:
          "Product ưu tiên phát triển tính năng hoa mỹ nhưng người dùng lại cần tính năng cơ bản ổn định.",
      },
    ],
    objectives: {
      strategic: [
        "Định vị CSKH là nguồn cung cấp dữ liệu sản phẩm chiến lược nhất của doanh nghiệp.",
        "Thiết lập cơ chế hợp tác liên phòng ban khép kín: CS ➔ Data ➔ Product ➔ Tech ➔ CS.",
      ],
      operational: [
        "Chuẩn hóa cây phân loại chủ đề (Taxonomy & Tagging) trên CRM với hơn 150+ mã lỗi chi tiết.",
        "Thiết lập buổi họp giao ban sản phẩm hàng tuần (Weekly VoC Sync) với sự tham gia của Head of Product.",
      ],
      customer: [
        "Giảm thiểu tối đa các lỗi giao diện, tính năng gây khó khăn cho người dùng.",
      ],
      kpi: [
        "Giảm 45% lượng khiếu nại lặp lại liên quan đến lỗi sản phẩm quen thuộc.",
        "100% lỗi nghiêm trọng phát sinh (P0/P1) được phát hiện và kích hoạt xử lý trong dưới 15 phút.",
        "Ít nhất 80% tính năng mới ra mắt có sự đóng góp trực tiếp từ dữ liệu VoC.",
      ],
    },
    solutions: {
      modelOverview:
        "Quy trình VoC 4 Giai đoạn: Thu thập Đa kênh Chuẩn hóa ➔ Định lượng & Phân tích Tác động ➔ Đồng bộ & Ưu tiên cùng Product ➔ Đóng vòng và Thông báo Khách hàng.",
      imageUrl: "https://i.ibb.co/Fk5Vd9bV/1-5-Th-c-y-c-i-ti-n-s-n-ph-m.png",
      cards: [
        {
          name: "01 · Standardized Pain-Point Tagging",
          purpose: "Số hóa và phân loại chính xác mọi vấn đề khách hàng gặp phải.",
          implementation:
            "Xây dựng cây nhãn dán 3 cấp độ trên CRM: Nhóm sản phẩm ➔ Tính năng cụ thể ➔ Loại sự cố (Giao diện, Logic hệ thống, Tốc độ, Hiểu nhầm).",
          value: "Mọi cuộc gọi, tin nhắn đều được chuyển hóa thành dữ liệu có thể đo lường và truy vấn tức thì.",
          iconName: "FileText",
        },
        {
          name: "02 · Realtime Emergency Bug Protocol",
          purpose: "Cảnh báo tức thì khi xuất hiện sự cố diện rộng sau bản cập nhật.",
          implementation:
            "Thiết lập cảnh báo tự động: Khi số lượng ticket cùng mã lỗi tăng gấp 3 lần ngưỡng chuẩn trong 10 phút, hệ thống tự động kích hoạt War-room trên Slack/Lark nối thẳng CS - Tech.",
          value: "Phát hiện sự cố sớm hơn cả hệ thống giám sát server, ngăn chặn khủng hoảng diện rộng.",
          iconName: "Zap",
        },
        {
          name: "03 · Weekly VoC & Product Priority Matrix",
          purpose: "Định lượng mức độ ưu tiên xử lý dựa trên dữ liệu thực tế.",
          implementation:
            "Báo cáo VoC hàng tuần trình bày theo ma trận: Số lượng người bị ảnh hưởng x Mức độ nghiêm trọng x Giá trị doanh thu mất đi. Quyết định rõ Sprint Backlog tiếp theo.",
          value: "Xóa bỏ mọi tranh cãi cảm tính, tập trung giải quyết triệt để vấn đề nhức nhối nhất của khách hàng.",
          iconName: "BarChart",
        },
        {
          name: "04 · Close-the-Loop Notification",
          purpose: "Tri ân và thông báo lại cho khách hàng khi sản phẩm đã được nâng cấp.",
          implementation:
            "Khi lỗi được khắc phục hoặc tính năng mới ra mắt, hệ thống tự động gửi thông báo cá nhân hóa tới danh sách khách hàng từng phản ánh để cảm ơn và mời trải nghiệm lại.",
          value: "Khách hàng cảm thấy tiếng nói của mình được trân trọng, chuyển từ bức xúc sang gắn bó trung thành.",
          iconName: "CheckCircle2",
        },
      ],
    },
    implementation: [
      "Khảo sát và thiết kế lại toàn bộ danh mục cây phân loại lỗi (Ticket Hierarchy) trên CRM",
      "Đào tạo 100% Agent cách gắn nhãn chuẩn xác và ghi nhận mô tả chi tiết từ khách hàng",
      "Thiết lập kênh cảnh báo khẩn cấp (Emergency Alert) tích hợp trực tiếp vào Slack/Lark kỹ thuật",
      "Tổ chức phiên họp giao ban VoC hàng tuần giữa Trưởng phòng CSKH và Giám đốc Sản phẩm",
      "Xây dựng Dashboard theo dõi tỷ lệ lỗi được khắc phục và tác động đến lượng ticket giảm tải",
      "Vận hành luồng thông báo tri ân người dùng sau khi fix lỗi thành công",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Voice of Customer Lead",
      responsibilities: [
        "Đại diện tiếng nói của hàng triệu khách hàng trong các phiên họp chiến lược sản phẩm.",
        "Thiết kế kiến trúc phân loại dữ liệu phản hồi và quy trình hợp tác liên phòng ban.",
        "Trực tiếp thẩm định các đề xuất cải tiến trải nghiệm trước khi chuyển giao cho khối Product.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Closed-Loop Voice of Customer (VoC)",
        "Root Cause Analysis (5 Whys & Fishbone)",
        "Impact vs Effort Prioritization",
        "Emergency Bug Escalation",
      ],
      toolsList: [
        "Salesforce / Zendesk CRM Tagging",
        "Jira Product Backlog Integration",
        "Power BI VoC Executive Dashboard",
      ],
    },
    results: {
      operational: [
        "Khắc phục thành công hơn 200+ điểm nghẽn UX/UI và lỗi tính năng lớn nhỏ trong năm.",
        "Thời gian nhận biết và xử lý lỗi diện rộng giảm từ 4 giờ xuống còn dưới 15 phút.",
      ],
      customer: [
        "Khách hàng đánh giá cao tốc độ hoàn thiện sản phẩm, tỷ lệ đánh giá 5 sao trên App Store/Google Play tăng 35%.",
      ],
      business: [
        "Giảm 45% tổng khối lượng ticket liên quan đến các lỗi quen thuộc, tiết kiệm hàng tỷ đồng chi phí vận hành tổng đài.",
      ],
      kpiBeforeAfter: [
        "Product Defect Complaint Rate: Giảm 45%",
        "Mean Time to Detect (MTTD) lỗi nghiêm trọng: 4 giờ ➔ 15 phút",
        "App Store Rating: 3.6 ⭐ ➔ 4.7 ⭐",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Sở hữu sản phẩm ngày càng mượt mà, tiện dụng và luôn cảm nhận được sự lắng nghe chân thành.",
      businessValue:
        "Tối ưu chi phí phát triển sản phẩm, hạn chế tình trạng làm ra tính năng không ai dùng.",
      organizationValue:
        "Xây dựng văn hóa phối hợp gắn kết chặt chẽ giữa khối Kinh doanh/Phục vụ và khối Kỹ thuật/Sản phẩm.",
      lessons: [
        "Dữ liệu phản hồi của khách hàng chỉ có sức nặng khi được quy đổi thành các con số định lượng cụ thể.",
        "Đóng vòng lặp thông báo lại cho khách hàng là vũ khí tuyệt vời nhất để biến người khó tính thành fan trung thành.",
      ],
      nextSteps: [
        "Ứng dụng công nghệ xử lý ngôn ngữ tự nhiên (NLP) để tự động phân tích hàng triệu comment mạng xã hội và đánh giá app theo thời gian thực.",
      ],
    },
  },

  "1.6 · Quản lý khủng hoảng và giảm khách hàng rời bỏ": {
    summary:
      "Thiết lập Chiến lược Quản trị Khủng hoảng Dịch vụ Toàn diện kết hợp Khung Giữ chân Khách hàng Chủ động (Churn Mitigation & Crisis Playbook), giúp bảo vệ danh tiếng thương hiệu, xử lý dứt điểm các sự cố nghiêm trọng và hạ thấp tỷ lệ khách hàng rời bỏ xuống mức kỷ lục.",
    context: {
      currentStatus:
        "Khi xảy ra sự cố kỹ thuật hoặc tranh chấp dịch vụ quy mô lớn, doanh nghiệp lúng túng trong phát ngôn, đường dây tổng đài tê liệt và khách hàng ồ ạt rời bỏ dịch vụ sang đối thủ.",
      cause:
        "Chưa có Kịch bản Ứng phó Khủng hoảng chuẩn (Crisis SOP), thiếu cơ chế phân loại khách hàng có nguy cơ rời bỏ (At-risk Customers) và chưa trao quyền xử lý đặc biệt cho tuyến đầu.",
      needForChange:
        "Xây dựng cơ chế phòng vệ chủ động, phản ứng nhanh trong mọi kịch bản khủng hoảng và thiết lập hệ thống cảnh báo sớm nguy cơ rời bỏ.",
    },
    problems: [
      {
        problem: "Tổng đài nghẽn mạng và bùng phát khủng hoảng truyền thông",
        cause:
          "Khi sự cố xảy ra, hàng chục ngàn người gọi cùng lúc mà không có thông điệp đồng bộ hoặc kênh giải tỏa áp lực tự động.",
        impact:
          "Khách hàng lan truyền sự bức xúc lên mạng xã hội, ảnh hưởng nghiêm trọng đến uy tín thương hiệu.",
      },
      {
        problem: "Mất mát lượng lớn khách hàng giá trị cao (VIP Churn)",
        cause:
          "Khách hàng VIP gặp sự cố nhưng chỉ nhận được câu trả lời máy móc thông thường mà không có chính sách chăm sóc đặc quyền.",
        impact:
          "Tổn thất doanh thu lớn và suy giảm thị phần nghiêm trọng.",
      },
    ],
    objectives: {
      strategic: [
        "Bảo vệ an toàn tối đa cho thương hiệu và duy trì niềm tin của khách hàng trong mọi tình huống khẩn cấp.",
        "Hạ tỷ lệ rời bỏ (Churn Rate) của nhóm khách hàng chủ lực xuống dưới 1.5%/tháng.",
      ],
      operational: [
        "Biên soạn và diễn tập thành thạo Bộ Kịch bản Khủng hoảng (Crisis Playbook) cho 12 tình huống rủi ro cao nhất.",
        "Thành lập Biệt đội Phản ứng Nhanh (Tiger Team) trực 24/7 sẵn sàng kích hoạt trong 5 phút.",
      ],
      customer: [
        "Đảm bảo khách hàng luôn nhận được thông tin minh bạch, lời xin lỗi chân thành và chính sách đền bù thỏa đáng.",
      ],
      kpi: [
        "Khống chế 100% sự cố dịch vụ không để leo thang thành khủng hoảng truyền thông.",
        "Cứu vãn thành công ≥ 80% khách hàng gửi yêu cầu hủy dịch vụ.",
        "Thời gian đưa ra thông điệp đồng bộ toàn hệ thống: ≤ 10 phút.",
      ],
    },
    solutions: {
      modelOverview:
        "Hệ thống Phòng thủ & Giữ chân 4 Lớp: Kịch bản Khủng hoảng Đa kịch bản ➔ Biệt đội Phản ứng Nhanh (War-room) ➔ Cảnh báo Sớm Nguy cơ Rời bỏ (Churn Early-Warning) ➔ Gói Quyền lợi Đền bù Thấu cảm.",
      imageUrl: "https://i.ibb.co/nMJCLcjz/1-6-Qu-n-l-kh-ng-ho-ng-v-gi-m-kh-ch-h-ng-r-i-b.jpg",
      cards: [
        {
          name: "01 · Crisis Playbook & War-Room Protocol",
          purpose: "Chuẩn bị sẵn sàng kịch bản phản ứng cho mọi tình huống xấu nhất.",
          implementation:
            "Xây dựng tài liệu hướng dẫn chi tiết cho 12 kịch bản (Sập server, Lỗi giao dịch thanh toán, Rò rỉ dữ liệu, Bão truyền thông). Quy định rõ ai phát ngôn, ai duyệt bồi thường và kích hoạt phòng tác chiến (War-room) trong 5 phút.",
          value: "Bình tĩnh, nhất quán và dập tắt nguy cơ khủng hoảng ngay từ trong trứng nước.",
          iconName: "ShieldCheck",
        },
        {
          name: "02 · IVR & Broadcast Overflow Relief",
          purpose: "Giải tỏa tức thời áp lực cho tổng đài khi lưu lượng tăng đột biến.",
          implementation:
            "Kích hoạt thông báo tự động (IVR Announcement & In-app Banner) nhận diện sự cố, thông báo thời gian khắc phục dự kiến và hướng dẫn tự xử lý trước khi khách hàng gặp điện thoại viên.",
          value: "Giảm 60% lượng cuộc gọi đổ dồn, tránh nghẽn tổng đài và xoa dịu tâm lý sốt ruột của người dùng.",
          iconName: "Clock",
        },
        {
          name: "03 · AI Churn Prediction & Early Alert",
          purpose: "Nhận diện khách hàng có dấu hiệu muốn rời bỏ trước khi họ hành động.",
          implementation:
            "Phân tích hành vi: Tần suất giao dịch giảm, số lần khiếu nại chưa hài lòng tăng, điểm NPS thấp ➔ Tự động gán cờ 'At-Risk' và điều hướng tới nhóm Chuyên viên Giữ chân (Retention Specialists).",
          value: "Chủ động liên hệ chăm sóc và tặng ưu đãi trước khi khách hàng quyết định từ bỏ dịch vụ.",
          iconName: "AlertTriangle",
        },
        {
          name: "04 · Empathy Retention & Recovery Offer",
          purpose: "Hóa giải bức xúc bằng giải pháp bồi thường thỏa đáng và thấu cảm.",
          implementation:
            "Trao quyền cho chuyên viên áp dụng gói 'Win-back Voucher / Miễn phí dịch vụ / Quà tri ân đặc quyền' kết hợp thư xin lỗi từ Ban Giám đốc.",
          value: "Biến nguy cơ mất khách thành cơ hội chứng minh sự chính trực và trách nhiệm cao nhất của doanh nghiệp.",
          iconName: "Heart",
        },
      ],
    },
    implementation: [
      "Đánh giá rủi ro toàn diện và xây dựng bộ Kịch bản Khủng hoảng (Crisis Playbook)",
      "Thành lập Biệt đội Phản ứng Nhanh (Tiger Team) và phân công ma trận trách nhiệm RACI",
      "Cấu hình các kịch bản phát âm thông báo tự động trên hệ thống tổng đài và app",
      "Xây dựng thuật toán chấm điểm nguy cơ rời bỏ (Health Score) trên CRM",
      "Đào tạo chuyên sâu kỹ năng đàm phán, xoa dịu tâm lý và giữ chân khách hàng cho đội ngũ",
      "Tổ chức diễn tập xử lý sự cố giả định định kỳ hàng quý (Drill Simulation)",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Crisis Management Lead",
      responsibilities: [
        "Chỉ huy phòng tác chiến (War-room) điều phối toàn bộ hoạt động hỗ trợ khách hàng khi xảy ra sự cố lớn.",
        "Phối hợp với Ban Giám đốc, Phòng Truyền thông và Pháp chế để thống nhất thông điệp phát ngôn.",
        "Thiết kế chính sách giữ chân khách hàng và định biên quỹ ngân sách đền bù trải nghiệm.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Crisis Management Framework",
        "Churn Risk Scoring & Mitigation",
        "War-Room Protocol",
        "Empathy-based Win-back Strategy",
      ],
      toolsList: [
        "Emergency Broadcast Engine",
        "CRM Churn Prediction Dashboard",
        "Crisis Communication Matrix",
      ],
    },
    results: {
      operational: [
        "Xử lý thành công 100% các sự cố kỹ thuật lớn mà không để xảy ra bất kỳ khủng hoảng truyền thông tiêu cực nào.",
        "Khôi phục trạng thái vận hành ổn định trong thời gian kỷ lục sau mỗi sự cố.",
      ],
      customer: [
        "Tỷ lệ giữ chân khách hàng VIP sau sự cố đạt 94.5%.",
        "Chỉ số tin cậy thương hiệu tăng cao nhờ thái độ minh bạch và chịu trách nhiệm đến cùng.",
      ],
      business: [
        "Bảo vệ doanh thu ước tính hàng chục tỷ đồng từ tập khách hàng trung thành được giữ chân thành công.",
      ],
      kpiBeforeAfter: [
        "Monthly Churn Rate: 4.8% ➔ 1.2%",
        "Tỷ lệ giữ chân khách hàng sau khiếu nại lớn: 42% ➔ 84%",
        "Thời gian kích hoạt kịch bản ứng phó sự cố: 2 giờ ➔ 5 phút",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Cảm nhận sự an tâm tuyệt đối khi luôn được doanh nghiệp bảo vệ quyền lợi và tôn trọng trong mọi hoàn cảnh.",
      businessValue:
        "Xây dựng tấm lá chắn kiên cố bảo vệ tài sản vô hình lớn nhất của công ty là niềm tin thương hiệu.",
      organizationValue:
        "Nâng cao bản lĩnh, sự điềm tĩnh và tính chuyên nghiệp của toàn thể đội ngũ trước mọi áp lực.",
      lessons: [
        "Minh bạch và nhận trách nhiệm nhanh chóng luôn là phương thuốc tốt nhất để dập tắt khủng hoảng.",
        "Giữ chân một khách hàng cũ luôn rẻ hơn từ 5 đến 7 lần so với việc tìm kiếm một khách hàng mới.",
      ],
      nextSteps: [
        "Ứng dụng Machine Learning để tự động điều chỉnh hạn mức bồi thường linh hoạt theo giá trị trọn đời của từng khách hàng.",
      ],
    },
  },
};
