import { CaseStudy } from "../projectsData";

export const group6CaseStudies: Record<string, CaseStudy> = {
  "6.1 · Thiết lập khung quản trị chất lượng dịch vụ": {
    summary:
      "Kiến trúc và thiết lập Hệ thống Quản trị Chất lượng Dịch vụ Toàn diện (Total Quality Assurance Framework - TQA), chuẩn hóa bộ tiêu chí đánh giá chất lượng cuộc gọi/tin nhắn theo chuẩn COPC quốc tế, xây dựng quy trình hiệu chuẩn định kỳ (Calibration Sessions) và chương trình huấn luyện 1-on-1 có mục tiêu (Targeted Coaching), giúp nâng điểm chất lượng QA Score toàn hệ thống lên trên 95% và triệt tiêu hoàn toàn các lỗi nghiêm trọng (Fatal Errors).",
    context: {
      currentStatus:
        "Hoạt động chấm điểm chất lượng (QA) mang tính hình thức, thiếu công bằng và phụ thuộc vào cảm tính cá nhân của từng chuyên viên chấm điểm, dẫn đến mâu thuẫn nội bộ gay gắt giữa nhân viên và đội ngũ QA.",
      cause:
        "Bộ tiêu chí đánh giá lỗi thời, định tính, chưa có quy định rõ ràng về các lỗi vi phạm nghiêm trọng (Auto-Fail/Fatal) và thiếu quy trình hiệu chuẩn thống nhất (Calibration).",
      needForChange:
        "Xây dựng Khung Quản trị Chất lượng Dịch vụ chuẩn mực, minh bạch, biến hoạt động QA từ 'Bắt lỗi - Phạt tiền' thành 'Đồng hành - Huấn luyện - Phát triển năng lực'.",
    },
    problems: [
      {
        problem: "Chấm điểm không nhất quán gây ức chế và mất lòng tin của nhân viên",
        cause:
          "Cùng một tình huống xử lý nhưng chuyên viên QA A chấm 95 điểm, trong khi chuyên viên QA B chấm 60 điểm.",
        impact:
          "Tỷ lệ khiếu nại kết quả chấm điểm QA lên tới trên 25%, nhân viên phản đối và không hợp tác.",
      },
      {
        problem: "Điểm QA cao nhưng khách hàng vẫn phàn nàn và bức xúc",
        cause:
          "Tiêu chí chấm điểm quá chú trọng vào câu chữ chào hỏi máy móc rập khuôn mà bỏ qua kỹ năng lắng nghe, thấu cảm và giải quyết triệt để vấn đề thực tế.",
        impact:
          "Số liệu QA 'ảo', không phản ánh đúng mức độ hài lòng thực tế của khách hàng ngoài thị trường.",
      },
    ],
    objectives: {
      strategic: [
        "Xây dựng văn hóa Chất lượng Xuất sắc (Culture of Quality Excellence) thấm sâu vào từng tương tác của nhân viên.",
        "Đưa hệ thống Quản trị Chất lượng CSKH đạt chuẩn chứng chỉ quốc tế uy tín (COPC / ISO 9001).",
      ],
      operational: [
        "Ban hành Bảng Tiêu chí Đánh giá Chất lượng 100 điểm với định nghĩa hành vi minh bạch cho 4 nhóm kỹ năng.",
        "Thiết lập cơ chế kiểm soát lỗi nghiêm trọng (Zero Tolerance for Fatal Errors) về bảo mật và gian lận.",
      ],
      customer: [
        "Mỗi khách hàng liên hệ đều nhận được sự phục vụ chân thành, chuẩn xác và thấu cảm tối đa.",
      ],
      kpi: [
        "Nâng điểm QA Score trung bình toàn đội ngũ từ 76% lên ≥ 95%.",
        "Độ lệch điểm số trong các phiên hiệu chuẩn (Calibration Variance) giảm xuống dưới 3%.",
        "Triệt tiêu 100% các lỗi nghiêm trọng về bảo mật thông tin và thái độ bất nhã.",
      ],
    },
    solutions: {
      modelOverview:
        "Khung TQA 4 Cột Trụ: Bộ Tiêu chí Chuẩn hóa Hành vi ➔ Cơ chế Hiệu chuẩn Độc lập (Weekly Calibration) ➔ Huấn luyện 1-on-1 Có Mục tiêu (Targeted Coaching) ➔ Bảng Điều khiển Phân tích Lỗ hổng Kỹ năng (QA Analytics Dashboard).",
      imageUrl: "https://i.ibb.co/VWVw4z4P/6-1-Thi-t-l-p-khung-qu-n-tr-ch-t-l-ng.png",
      cards: [
        {
          name: "01 · Behavioral Quality Scorecard Matrix",
          purpose: "Định lượng chính xác từng hành vi giao tiếp thành các thang điểm cụ thể.",
          implementation:
            "Cấu trúc bảng điểm 4 phần: Kỹ năng lắng nghe & thấu cảm (30%), Độ chuẩn xác thông tin & giải quyết triệt để (35%), Tuân thủ quy trình & hệ thống (20%), Tác phong & chuẩn mực thương hiệu (15%). Phân loại rõ Lỗi Nghiêm trọng (Fatal) và Lỗi Nhẹ (Non-fatal).",
          value: "Minh bạch 100%, xóa bỏ hoàn toàn sự cảm tính trong chấm điểm.",
          iconName: "ShieldCheck",
        },
        {
          name: "02 · Weekly Cross-Calibration Protocol",
          purpose: "Đồng nhất chuẩn mực chấm điểm giữa tất cả các Quản lý và Chuyên viên QA.",
          implementation:
            "Hàng tuần tổ chức phiên hiệu chuẩn: Toàn bộ QA Leads và Team Leads cùng nghe chung 3 cuộc gọi ngẫu nhiên và chấm điểm độc lập. Thảo luận chi tiết từng điểm chênh lệch để thống nhất một chuẩn mực duy nhất.",
          value: "Đảm bảo tính công bằng tuyệt đối cho mọi nhân viên ở bất kỳ ca trực nào.",
          iconName: "BarChart",
        },
        {
          name: "03 · Targeted 1-on-1 Coaching Playbook",
          purpose: "Chuyển hóa kết quả chấm điểm thành hành động tiến bộ cụ thể.",
          implementation:
            "Sau mỗi đợt đánh giá, Team Lead tiến hành phiên coaching 1-on-1 kéo dài 30 phút: Cùng nghe lại đoạn ghi âm, chỉ ra điểm làm tốt để khen ngợi và thảo luận phương án khắc phục điểm yếu.",
          value: "Nhân viên cảm nhận được sự hỗ trợ tận tình, liên tục tiến bộ qua từng tuần.",
          iconName: "Award",
        },
        {
          name: "04 · Automated QA Analytics & Heatmap",
          purpose: "Nhận diện sớm các lỗ hổng kiến thức phổ biến trong toàn đội ngũ.",
          implementation:
            "Bảng điều khiển tự động phân tích hàng ngàn phiếu chấm: Phát hiện kỹ năng nào đang bị trừ điểm nhiều nhất (VD: Kỹ năng xử lý từ chối hay tra cứu biểu phí mới) để phòng Đào tạo can thiệp kịp thời.",
          value: "Đào tạo đúng trọng tâm, không lãng phí thời gian vào những nội dung nhân viên đã giỏi.",
          iconName: "TrendingUp",
        },
      ],
    },
    implementation: [
      "Khảo sát và rà soát toàn bộ các bất cập trong bảng tiêu chí chấm điểm chất lượng cũ",
      "Biên soạn bảng tiêu chuẩn QA mới và tổ chức hội thảo lấy ý kiến đóng góp từ đội ngũ Team Lead",
      "Tổ chức khóa đào tạo hiệu chuẩn chuyên sâu cho 100% chuyên viên QA và Trưởng nhóm",
      "Triển khai phần mềm quản lý chấm điểm QA tự động và kết nối với hệ thống ghi âm tổng đài",
      "Thiết lập lịch hiệu chuẩn chất lượng định kỳ hàng tuần và cơ chế phúc khảo điểm minh bạch",
      "Liên kết kết quả điểm QA với chính sách khen thưởng và lộ trình thăng tiến của nhân viên",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Quality Assurance Director",
      responsibilities: [
        "Kiến trúc toàn bộ hệ thống quản trị chất lượng dịch vụ khách hàng của tổ chức.",
        "Chủ trì các phiên hiệu chuẩn chất lượng cấp cao và xử lý các ca tranh chấp phức tạp.",
        "Báo cáo định kỳ trước Ban Giám đốc về xu hướng chất lượng và đề xuất các giải pháp nâng chuẩn dịch vụ.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Total Quality Assurance (TQA)",
        "COPC Quality Standards",
        "QA Calibration Methodology",
        "Targeted 1-on-1 Coaching",
      ],
      toolsList: [
        "Scorebuddy / Playvox QA Management Hub",
        "Call Recording & Screen Capture System",
        "Quality Heatmap & Skill Gap Analytics",
      ],
    },
    results: {
      operational: [
        "Chuẩn hóa 100% quy trình đánh giá chất lượng cho hơn 300 nhân sự trực tiếp tác nghiệp.",
        "Độ lệch điểm số chấm chéo giữa các đánh giá viên giảm từ 18% xuống dưới 2.5%.",
      ],
      customer: [
        "Khách hàng nhận xét tích cực về thái độ ân cần, tác phong chuyên nghiệp và sự chuẩn xác của đội ngũ.",
      ],
      hr: [
        "Quan hệ giữa nhân viên và đội ngũ QA trở nên gắn kết, thân thiện; tỷ lệ khiếu nại điểm QA giảm 90%.",
      ],
      business: [
        "Nâng cao rõ rệt uy tín thương hiệu và chỉ số đo lường sự hài lòng khách hàng toàn diện.",
      ],
      kpiBeforeAfter: [
        "Điểm QA Score trung bình toàn hệ thống: 76.5% ➔ 95.8%",
        "Tỷ lệ lỗi nghiêm trọng (Fatal Error Rate): 6.8% ➔ 0.05%",
        "Độ lệch hiệu chuẩn chấm điểm (Calibration Variance): 18.2% ➔ 2.3%",
        "Tỷ lệ khiếu nại kết quả chấm điểm QA: 24% ➔ 1.5%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Được trải nghiệm chất lượng dịch vụ đẳng cấp, đồng nhất và đáng tin cậy trong mọi lần tương tác.",
      businessValue:
        "Bảo vệ uy tín thương hiệu khỏi các rủi ro phát ngôn sai lệch hoặc vi phạm quy định pháp lý.",
      organizationValue:
        "Xây dựng đội ngũ nhân sự chuẩn mực, chuyên nghiệp và có kỷ luật tự giác cao.",
      lessons: [
        "Đích đến của QA không phải là bắt lỗi để phạt, mà là phát hiện tiềm năng để đào tạo phát triển con người.",
        "Một bảng điểm chất lượng tốt phải đo lường được giá trị thực tế mà khách hàng nhận được, không chỉ là hình thức.",
      ],
      nextSteps: [
        "Ứng dụng công nghệ AI tự động nghe và chấm điểm 100% cuộc gọi (Auto-QA) theo thời gian thực.",
      ],
    },
  },

  "6.2 · Quản trị sự thay đổi và khủng hoảng dịch vụ": {
    summary:
      "Xây dựng Khung Ứng phó Khủng hoảng Dịch vụ & Quản trị Biến động (Service Crisis Incident Management & Change Governance Framework), thiết lập ma trận cảnh báo sớm 4 cấp độ (Green - Yellow - Orange - Red), quy trình kích hoạt phòng điều hành khẩn cấp (War Room Command) và bộ kịch bản truyền thông thấu cảm, giúp xử lý êm đẹp các đợt đứt gãy hệ thống lớn mà không làm bùng phát khủng hoảng truyền thông.",
    context: {
      currentStatus:
        "Khi hệ thống kỹ thuật gặp sự cố sập server, nghẽn cổng thanh toán hoặc giao hàng đình trệ diện rộng, phòng CSKH rơi vào thế bị động, tổng đài quá tải cháy máy, nhân viên không biết giải thích thế nào khiến khách hàng phẫn nộ tràn lên mạng xã hội tẩy chay.",
      cause:
        "Thiếu quy trình quản trị khủng hoảng chuyên biệt, chưa có cơ chế thông báo nội bộ tức thời giữa phòng Kỹ thuật và CSKH.",
      needForChange:
        "Thiết lập năng lực ứng phó khủng hoảng dịch vụ chuyên nghiệp, chuyển hóa nguy cơ thành cơ hội chứng minh trách nhiệm và sự chân thành của thương hiệu.",
    },
    problems: [
      {
        problem: "Tổng đài bị 'tê liệt' hoàn toàn khi xảy ra sự cố lớn",
        cause:
          "Hàng chục ngàn khách hàng cùng gọi đến trong 10 phút, tỷ lệ nhỡ cuộc gọi vượt 80%.",
        impact:
          "Khách hàng mất niềm tin, cho rằng công ty trốn tránh trách nhiệm và bắt đầu phát tán thông tin tiêu cực.",
      },
      {
        problem: "Nhân viên phát ngôn lúng túng và mâu thuẫn trên báo chí/mạng xã hội",
        cause:
          "Không có thông điệp truyền thông chuẩn (Holding Statement) được duyệt sẵn để phản hồi trong 15 phút đầu.",
        impact:
          "Mỗi nhân viên trả lời một kiểu, tạo thêm bằng chứng bất lợi gây tổn hại nghiêm trọng đến danh tiếng công ty.",
      },
    ],
    objectives: {
      strategic: [
        "Bảo vệ tuyệt đối danh tiếng và uy tín thương hiệu trước mọi sự cố kỹ thuật và vận hành bất khả kháng.",
        "Xây dựng khả năng thích ứng linh hoạt và khả năng phục hồi nhanh chóng (Business Resilience) của khối dịch vụ.",
      ],
      operational: [
        "Thiết lập cơ chế kích hoạt Phòng Điều hành Khủng hoảng (War Room) trong vòng dưới 15 phút từ khi phát hiện sự cố.",
        "Biên soạn sẵn 20+ bộ kịch bản truyền thông và chính sách bồi thường thiện chí (Goodwill Compensation Playbook).",
      ],
      customer: [
        "Khách hàng luôn được thông báo minh bạch, chủ động và cảm nhận được sự đồng hành chân thành của doanh nghiệp.",
      ],
      kpi: [
        "Thời gian ban hành thông điệp phản hồi chuẩn (First Holding Statement): ≤ 15 phút.",
        "Kiểm soát và ngăn chặn 100% nguy cơ bùng phát khủng hoảng truyền thông tiêu cực lan rộng.",
        "Tỷ lệ khách hàng hài lòng sau khi nhận chính sách bồi thường thiện chí đạt ≥ 88%.",
      ],
    },
    solutions: {
      modelOverview:
        "Mô hình Ứng phó Khủng hoảng 4 Tầng: Cảnh báo Sớm & Kích hoạt War Room ➔ Thông điệp Đồng nhất Đa kênh ➔ Điều phối Tải & Chống Nghẽn Kênh ➔ Khắc phục & Đền bù Thiện chí (Post-Incident Goodwill).",
      imageUrl: "https://i.ibb.co/h1KSm64L/6-2-Qu-n-tr-s-thay-i-v-kh-ng-ho-ng-d-ch-v.png",
      cards: [
        {
          name: "01 · Early Warning & Incident War Room",
          purpose: "Hội quân khẩn cấp giữa Lãnh đạo CSKH, Kỹ thuật, PR và Pháp chế.",
          implementation:
            "Khi lỗi ảnh hưởng trên 1,000 người dùng, chuông báo động tự động kích hoạt: Nhóm tác chiến lập tức họp War Room trực tuyến để xác định nguyên nhân, thời gian sửa chữa và thống nhất phương án xử lý.",
          value: "Hành động thống nhất, nhanh chóng chỉ trong 10 phút đầu tiên.",
          iconName: "AlertTriangle",
        },
        {
          name: "02 · Unified Empathy Holding Statements",
          purpose: "Đồng nhất 100% phát ngôn trên mọi mặt trận trong vòng 15 phút.",
          implementation:
            "Ban hành ngay thông điệp chuẩn: Thừa nhận sự cố một cách chân thành, nêu rõ hành động đang khắc phục và cam kết bảo toàn quyền lợi khách hàng. Đẩy thông điệp lên Banner Website, App, IVR Tổng đài và Fanpage.",
          value: "Trấn an tâm lý khách hàng ngay từ đầu, dập tắt các tin đồn thất thiệt.",
          iconName: "MessageSquare",
        },
        {
          name: "03 · Emergency IVR & Call Deflection",
          purpose: "Bảo vệ tổng đài không bị sập nguồn khi lưu lượng tăng đột biến gấp 20 lần.",
          implementation:
            "Tự động bật lời chào khẩn cấp tại đầu số Hotline: 'Hệ thống đang bảo trì đột xuất, dự kiến hoàn tất lúc 15:00, mọi quyền lợi của quý khách đều được đảm bảo an toàn'.",
          value: "Giải tỏa ngay 70% lượng cuộc gọi lo lắng mà không cần Agent nghe máy.",
          iconName: "Clock",
        },
        {
          name: "04 · Proactive Goodwill Compensation Matrix",
          purpose: "Chuyển hóa cảm xúc tiêu cực thành sự cảm kích sau khi sự cố kết thúc.",
          implementation:
            "Ngay khi khắc phục xong: Tự động gửi tin nhắn xin lỗi kèm mã giảm giá, tặng ngày sử dụng hoặc hoàn tiền thiện chí vào tài khoản của toàn bộ khách hàng bị ảnh hưởng.",
          value: "Khách hàng cảm nhận được sự tử tế và trách nhiệm cao thượng của doanh nghiệp.",
          iconName: "HeartHandshake",
        },
      ],
    },
    implementation: [
      "Xây dựng Ma trận Phân loại Khủng hoảng 4 Cấp độ (Severity 1 đến Severity 4)",
      "Biên soạn trọn bộ 'Cẩm nang Ứng phó Khủng hoảng Dịch vụ' (Crisis Management Playbook)",
      "Thiết lập kênh liên lạc khẩn cấp tốc độ cao giữa CSKH, IT Operations và Ban Truyền thông",
      "Tổ chức diễn tập xử lý tình huống khẩn cấp (Crisis Simulation Drill) định kỳ 6 tháng/lần",
      "Cấu hình các kịch bản bật/tắt nhanh thông báo khẩn cấp trên hệ thống tổng đài và ứng dụng",
      "Thực hiện báo cáo đánh giá rút kinh nghiệm sau sự cố (Post-Mortem Review) để vá lỗi quy trình",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Incident Command Lead",
      responsibilities: [
        "Chỉ huy trực tiếp phòng điều hành khẩn cấp (War Room Commander) trong các đợt sự cố nghiêm trọng.",
        "Phê duyệt thông điệp truyền thông chăm sóc khách hàng và chính sách bồi thường thiện chí.",
        "Chủ trì các phiên đánh giá rút kinh nghiệm và tái cấu trúc quy trình phòng ngừa rủi ro.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Incident Management Framework (ITIL)",
        "Crisis Communication Playbook",
        "Post-Mortem Root Cause Analysis",
        "Business Continuity Planning (BCP)",
      ],
      toolsList: [
        "War Room Incident Management System",
        "Emergency Broadcast SMS / Zalo Gateway",
        "Social Listening & Brand Sentiment Tracker",
      ],
    },
    results: {
      operational: [
        "Xử lý thành công 100% các sự cố vận hành lớn mà không để xảy ra bất kỳ khủng hoảng truyền thông nào trên báo chí và mạng xã hội.",
        "Thời gian kích hoạt thông điệp trấn an khách hàng rút ngắn từ 2 giờ xuống còn 12 phút.",
      ],
      customer: [
        "Khách hàng đánh giá rất cao thái độ thẳng thắn, minh bạch và cách đền bù tử tế, hào hiệp của công ty.",
      ],
      business: [
        "Bảo vệ an toàn giá trị vốn hóa thương hiệu và duy trì tỷ lệ giữ chân khách hàng trên 95% sau sự cố lớn.",
      ],
      kpiBeforeAfter: [
        "Thời gian phát ngôn thông điệp khẩn cấp: 120 phút ➔ 12 phút",
        "Tỷ lệ phản hồi tiêu cực trên mạng xã hội trong sự cố: Giảm 82%",
        "Tỷ lệ giữ chân khách hàng bị ảnh hưởng bởi sự cố: 65% ➔ 96.2%",
        "Chỉ số CSAT sau chương trình đền bù thiện chí: 89.5%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Tuyệt đối an tâm về quyền lợi và cảm nhận được sự tôn trọng, minh bạch cao nhất từ doanh nghiệp.",
      businessValue:
        "Xây dựng lá chắn vững chắc bảo vệ tài sản danh tiếng và củng cố lòng trung thành sâu sắc của khách hàng.",
      organizationValue:
        "Rèn luyện bản lĩnh kiên cường, sự điềm tĩnh và tính kỷ luật tác chiến cao độ của toàn bộ bộ máy.",
      lessons: [
        "Khủng hoảng là thước đo chân thực nhất cho văn hóa doanh nghiệp: Sự chân thành và tốc độ luôn thắng mọi sự bao biện.",
        "Khách hàng sẵn sàng tha thứ cho một lỗi kỹ thuật nếu doanh nghiệp biết nhận lỗi và xử lý có trách nhiệm.",
      ],
      nextSteps: [
        "Tích hợp hệ thống cảnh báo tự động phát hiện sớm sự cố kỹ thuật thông qua phân tích biến động cảm xúc cuộc gọi theo thời gian thực.",
      ],
    },
  },

  "6.3 · Ứng dụng trí tuệ nhân tạo nâng cao hiệu suất CSKH": {
    summary:
      "Tiên phong triển khai Hệ sinh thái Trí tuệ Nhân tạo Toàn diện Thế hệ mới (Generative AI Agent Copilot & Automated 100% Speech-to-Text Call QA), trang bị trợ lý ảo thông minh đồng hành cùng Agent theo thời gian thực, tự động tóm tắt cuộc gọi, gợi ý câu trả lời và tự động lắng nghe, chấm điểm chất lượng 100% cuộc gọi thoại, giúp tăng 40% năng suất làm việc và nâng chuẩn chất lượng dịch vụ vượt bậc.",
    context: {
      currentStatus:
        "Nhân viên CSKH phải chịu áp lực ghi nhớ hàng ngàn trang tài liệu, vừa nghe khách nói vừa gõ máy tính ghi chép tóm tắt sau cuộc gọi (After-Call Work) mất rất nhiều thời gian. Trong khi đó, đội QA chỉ có thể nghe và chấm điểm thủ công được 1-2% tổng số cuộc gọi.",
      cause:
        "Chưa khai thác sức mạnh của các mô hình Ngôn ngữ Lớn (LLMs) và công nghệ Chuyển giọng nói thành văn bản (Speech-to-Text) trong vận hành hàng ngày.",
      needForChange:
        "Ứng dụng AI như một người đồng nghiệp thông minh hỗ trợ Agent từng giây (Agent Copilot) và tự động hóa kiểm soát chất lượng 100% tương tác trên toàn hệ thống.",
    },
    problems: [
      {
        problem: "Thời gian xử lý sau cuộc gọi (After-Call Work - ACW) quá lâu",
        cause:
          "Agent mất 60-90 giây sau mỗi cuộc gọi để gõ tay tóm tắt nội dung và cập nhật trường dữ liệu trên CRM.",
        impact:
          "Lãng phí 25% tổng thời gian làm việc trong ngày chỉ để làm việc ghi chép hành chính cơ học.",
      },
      {
        problem: "Đội ngũ QA bị 'mù' trước 98% các cuộc gọi còn lại",
        cause:
          "Do nguồn lực có hạn, QA chỉ nghe mẫu ngẫu nhiên 2 cuộc/Agent/tháng nên bỏ lọt hàng loạt vi phạm nghiêm trọng và khiếu nại tiềm ẩn.",
        impact:
          "Rủi ro pháp lý và chất lượng dịch vụ không được kiểm soát toàn diện.",
      },
    ],
    objectives: {
      strategic: [
        "Định hình mô hình 'Human-in-the-Loop AI Contact Center' - Con người làm chủ công nghệ để tối ưu hóa năng suất và trải nghiệm thấu cảm.",
        "Thiết lập vị thế dẫn đầu trong chuyển đổi số và ứng dụng Trí tuệ Nhân tạo trong ngành Dịch vụ Khách hàng.",
      ],
      operational: [
        "Triển khai AI Agent Copilot gợi ý tài liệu, câu trả lời mẫu và tự động sinh bản tóm tắt cuộc gọi chuẩn sau 1 giây.",
        "Triển khai hệ thống AI Speech Analytics tự động chuyển văn bản và chấm điểm chất lượng 100% cuộc gọi thoại.",
      ],
      kpi: [
        "Rút ngắn thời gian xử lý sau cuộc gọi (ACW) từ 75s xuống còn dưới 10s.",
        "Nâng độ phủ kiểm soát chất lượng cuộc gọi (QA Coverage) từ 1.5% lên 100% toàn bộ tương tác.",
        "Tăng năng suất phục vụ trung bình của mỗi Agent lên 35-40%.",
      ],
    },
    solutions: {
      modelOverview:
        "Hệ sinh thái AI 4 Tầng: AI Speech-to-Text Realtime ➔ Generative AI Copilot Đồng hành ➔ Auto Call Summary & CRM Logging ➔ AI Automated 100% Quality Auditing.",
      imageUrl: "https://i.ibb.co/hFSX8q8w/6-3-ng-d-ng-AI-n-ng-cao-hi-u-su-t-CSKH.png",
      cards: [
        {
          name: "01 · Realtime AI Agent Copilot",
          purpose: "Trợ lý ảo thông minh mớm lời và gợi ý thông tin chuẩn xác theo thời gian thực.",
          implementation:
            "Khi khách hàng vừa cất lời hỏi, AI phân tích giọng nói theo thời gian thực và lập tức hiện lên màn hình Agent: Câu trả lời mẫu chuẩn xác nhất, đường dẫn SOP liên quan và các cảnh báo chính sách quan trọng.",
          value: "Agent mới vào nghề cũng có thể trả lời tự tin như một chuyên gia 5 năm kinh nghiệm.",
          iconName: "Sparkles",
        },
        {
          name: "02 · One-Click AI Call Summarization",
          purpose: "Tự động tóm tắt cuộc gọi hoàn chỉnh chỉ sau 1 cú nhấp chuột.",
          implementation:
            "Ngay khi khách hàng gác máy, AI tự động trích xuất: Lý do liên hệ, Hành động Agent đã xử lý, Cam kết tiếp theo và tự động điền vào các ô trường tương ứng trên CRM trong 1 giây.",
          value: "Triệt tiêu hoàn toàn gánh nặng gõ phím sau cuộc gọi của nhân viên.",
          iconName: "FileText",
        },
        {
          name: "03 · 100% Speech-to-Text & Sentiment Radar",
          purpose: "Lắng nghe, nhận diện cảm xúc và phát hiện rủi ro trên toàn bộ cuộc gọi.",
          implementation:
            "Chuyển đổi 100% âm thanh cuộc gọi sang văn bản tiếng Việt chính xác 96%. Phân tích sắc thái cảm xúc: Phát hiện các cuộc gọi có từ khóa tiêu cực, bức xúc hoặc khách hàng đe dọa khiếu nại để gắn cờ đỏ khẩn cấp.",
          value: "Quản lý nắm bắt ngay các ổ rủi ro tiềm ẩn trong ngày mà không cần nghe từng file ghi âm.",
          iconName: "BarChart",
        },
        {
          name: "04 · AI Auto-QA & Compliance Scoring",
          purpose: "Tự động chấm điểm chất lượng và tuân thủ quy trình cho 100% cuộc gọi.",
          implementation:
            "Thuật toán AI tự động kiểm tra: Agent có chào đúng tên không, có đọc câu cảnh báo bảo mật không, có nói lời cảm ơn không và tính toán điểm QA sơ bộ cho 100% cuộc gọi.",
          value: "Giải phóng chuyên viên QA khỏi các công việc chấm máy móc để tập trung huấn luyện chuyên sâu cho nhân viên.",
          iconName: "ShieldCheck",
        },
      ],
    },
    implementation: [
      "Thử nghiệm và lựa chọn mô hình Ngôn ngữ Lớn (LLM) và công nghệ nhận diện giọng nói tiếng Việt tối ưu nhất",
      "Huấn luyện mô hình AI với bộ từ điển chuyên ngành và dữ liệu nghiệp vụ của doanh nghiệp",
      "Lập trình tích hợp tiện ích mở rộng AI Copilot trực tiếp vào giao diện làm việc của Agent",
      "Thiết lập các tiêu chí chấm điểm tự động trên hệ thống Speech Analytics",
      "Thử nghiệm thực tế với nhóm 20 Agent tiên phong và đo lường sự cải thiện năng suất",
      "Mở rộng triển khai cho toàn bộ 100% nhân viên và liên tục tinh chỉnh thuật toán AI",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / AI Transformation Lead",
      responsibilities: [
        "Khởi xướng và chỉ đạo chiến lược chuyển đổi số ứng dụng AI trong toàn bộ khối CSKH.",
        "Thiết kế luồng phối hợp giữa Người và Trí tuệ Nhân tạo (Human-AI Interaction Architecture).",
        "Đảm bảo an toàn thông tin, bảo mật dữ liệu khách hàng và tính đạo đức của AI trong vận hành.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Generative AI & LLMs in Customer Service",
        "Speech-to-Text & NLP Analytics",
        "Automated Quality Assurance (Auto-QA)",
        "Human-in-the-loop (HITL) Workflow",
      ],
      toolsList: [
        "OpenAI / Anthropic / Google Gemini API",
        "Vietnamese Speech-to-Text AI Engine",
        "Custom In-house Agent Copilot Extension",
      ],
    },
    results: {
      operational: [
        "Triển khai thành công AI Copilot cho hơn 250 chuyên viên tư vấn hàng ngày.",
        "Hệ thống AI tự động chấm điểm và phân tích cảm xúc 100% cuộc gọi thoại (hơn 300,000 cuộc/tháng).",
      ],
      customer: [
        "Khách hàng nhận được câu trả lời chính xác, nhanh chóng và không bao giờ phải chịu cảm giác chờ đợi Agent tra cứu tài liệu.",
      ],
      hr: [
        "Nhân viên vô cùng phấn khởi khi được giải phóng khỏi các việc ghi chép cơ học, giảm 40% áp lực tinh thần.",
      ],
      business: [
        "Năng suất vận hành tăng 38%, giúp doanh nghiệp phục vụ khối lượng khách hàng tăng gấp đôi mà không cần tăng định biên nhân sự.",
      ],
      kpiBeforeAfter: [
        "Thời gian xử lý sau cuộc gọi (After-Call Work): 75s ➔ 8s",
        "Tỷ lệ giám sát chất lượng cuộc gọi (QA Coverage): 1.5% ➔ 100%",
        "Average Handling Time (AHT): 310s ➔ 195s",
        "Tỷ lệ giải đáp đúng chính sách ngay lần đầu: 82% ➔ 98.4%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Tận hưởng trải nghiệm hỗ trợ đỉnh cao: nhanh như máy nhưng ấm áp, thấu cảm như người thân.",
      businessValue:
        "Đột phá năng suất và tối ưu hóa vượt bậc chi phí phục vụ (Cost-to-Serve) trên quy mô lớn.",
      organizationValue:
        "Khẳng định vị thế tiên phong chuyển đổi số xuất sắc, thu hút nhân tài thế hệ mới yêu thích công nghệ.",
      lessons: [
        "AI là trợ thủ đắc lực nhất của con người, chứ không phải kẻ thù thay thế con người.",
        "Thành công của AI phụ thuộc 80% vào chất lượng dữ liệu huấn luyện và sự chuẩn hóa của quy trình nghiệp vụ.",
      ],
      nextSteps: [
        "Phát triển AI Agent tự chủ có khả năng tự động xử lý các giao dịch phức tạp đa phòng ban theo chỉ đạo của khách hàng.",
      ],
    },
  },
};
