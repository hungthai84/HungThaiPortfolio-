import { CaseStudy } from "../projectsData";

export const group4CaseStudies: Record<string, CaseStudy> = {
  "4.1 · Phát triển chương trình đào tạo trực tuyến": {
    summary:
      "Xây dựng Học viện Đào tạo Số Hóa Khối Dịch vụ Khách hàng (E-Learning CS Academy Platform), chuyển đổi toàn diện tài liệu đào tạo truyền thống sang các bài giảng tương tác đa phương tiện (Micro-Learning), kịch bản mô phỏng tình huống thực chiến (Scenario-Based Simulations) và hệ thống thi sát hạch tự động cấp chứng chỉ, giúp rút ngắn 65% thời gian Onboarding nhân sự mới.",
    context: {
      currentStatus:
        "Hoạt động đào tạo chủ yếu diễn ra theo hình thức truyền thống trong phòng họp (Off-line Classroom), phụ thuộc hoàn toàn vào lịch rảnh của giảng viên và tài liệu in giấy nhanh chóng bị lỗi thời sau mỗi đợt đổi chính sách.",
      cause:
        "Thiếu nền tảng số LMS (Learning Management System) chuyên biệt và chưa số hóa tài liệu thành các khóa học tự học tương tác.",
      needForChange:
        "Xây dựng nền tảng E-learning linh hoạt, cho phép nhân viên chủ động học tập 24/7 trên mọi thiết bị và chuẩn hóa 100% kiến thức nghiệp vụ cho toàn bộ hệ thống kể cả đối tác BPO.",
    },
    problems: [
      {
        problem: "Thời gian đào tạo Onboarding quá dài và tốn kém nguồn lực",
        cause:
          "Giảng viên phải dạy đi dạy lại những kiến thức cơ bản hàng tuần cho từng đợt tuyển dụng mới.",
        impact:
          "Nhân sự mất 4-5 tuần mới có thể bắt đầu tiếp nhận cuộc gọi đầu tiên, chi phí đào tạo trên mỗi nhân sự cao.",
      },
      {
        problem: "Khó kiểm soát mức độ tiếp thu và hiểu biết thực tế",
        cause:
          "Đánh giá sau đào tạo chỉ bằng bài thi trắc nghiệm trên giấy mang tính đối phó.",
        impact:
          "Khi vào ca trực thực tế, nhân viên lúng túng, quên thao tác và tư vấn sai lệch chính sách.",
      },
    ],
    objectives: {
      strategic: [
        "Xây dựng hệ sinh thái đào tạo số hiện đại, đưa văn hóa Học tập Suốt đời (Lifelong Learning) vào tổ chức.",
        "Chuẩn hóa 100% kiến thức và kỹ năng cho toàn bộ nhân sự nội bộ và đối tác thuê ngoài.",
      ],
      operational: [
        "Số hóa 100% giáo trình thành hơn 80+ mô-đun bài giảng Micro-learning (dưới 7 phút/bài).",
        "Triển khai nền tảng LMS tích hợp Gamification (Học tập trò chơi hóa: Huy hiệu, Bảng xếp hạng).",
      ],
      kpi: [
        "Rút ngắn thời gian Onboarding từ 28 ngày xuống còn 9 ngày.",
        "100% nhân viên vượt qua kỳ thi sát hạch thực chiến với điểm số ≥ 85/100 trước khi lên máy.",
        "Tiết kiệm 70% ngân sách đào tạo và chi phí giờ công giảng dạy trực tiếp.",
      ],
    },
    solutions: {
      modelOverview:
        "Khung Đào tạo Số 4 Trụ cột: Bài giảng Tinh gọn Micro-Learning ➔ Mô phỏng Tình huống Thực tế (Interactive Simulation) ➔ Sát hạch & Cấp Chứng chỉ Tự động ➔ Học tập Trò chơi hóa (Gamification).",
      imageUrl: "https://i.ibb.co/0yDjkH17/4-1-Ph-t-tri-n-o-t-o-tr-c-tuy-n.png",
      cards: [
        {
          name: "01 · Micro-Learning & Video Modules",
          purpose: "Giúp nhân viên tiếp thu kiến thức nhanh chóng mà không bị quá tải thông tin.",
          implementation:
            "Chia nhỏ toàn bộ nghiệp vụ thành các video hoạt họa và bài học ngắn 3-5 phút: Mỗi bài học chỉ tập trung giải quyết đúng 1 kỹ năng hoặc 1 nghiệp vụ cụ thể.",
          value: "Nhân viên dễ dàng ghi nhớ và có thể tra cứu học lại ngay trước ca trực.",
          iconName: "FileText",
        },
        {
          name: "02 · Interactive Call & System Simulations",
          purpose: "Luyện tập kỹ năng thao tác và giao tiếp an toàn trong môi trường ảo.",
          implementation:
            "Xây dựng phần mềm mô phỏng: Nhân viên nghe tình huống khách hàng giận dữ qua tai nghe và thực hành bấm chọn thao tác trên màn hình CRM giả lập y như thật.",
          value: "Thành thạo 100% phản xạ tác nghiệp trước khi tiếp xúc với khách hàng thật.",
          iconName: "Sparkles",
        },
        {
          name: "03 · Automated Skill Testing & Certification",
          purpose: "Đánh giá minh bạch, khách quan và tức thì năng lực của từng học viên.",
          implementation:
            "Ngân hàng câu hỏi tự động xáo trộn đề thi, chấm điểm ngay lập tức và tự động cấp chứng chỉ số (Digital Certificate) khi đạt chuẩn điểm đỗ.",
          value: "Xóa bỏ hoàn toàn tình trạng chấm điểm thiên vị hoặc gian lận trong kiểm tra.",
          iconName: "ShieldCheck",
        },
        {
          name: "04 · Gamification & Leaderboard",
          purpose: "Tạo động lực học tập hào hứng, thi đua lành mạnh trong toàn phòng ban.",
          implementation:
            "Tích hợp hệ thống tích điểm thưởng, mở khóa huy hiệu 'Bậc thầy Xử lý Khiếu nại', 'Chuyên gia Sản phẩm' và đổi điểm lấy quà tặng thực tế hàng tháng.",
          value: "Tỷ lệ hoàn thành các khóa học tự nguyện của nhân viên đạt trên 95%.",
          iconName: "Award",
        },
      ],
    },
    implementation: [
      "Kiểm toán toàn bộ nội dung giáo trình đào tạo hiện hữu và xây dựng đề cương số hóa",
      "Lựa chọn và triển khai nền tảng hệ thống quản lý học tập đám mây (LMS)",
      "Sản xuất video bài giảng, kịch bản tương tác và thiết kế đồ họa sinh động",
      "Xây dựng ngân hàng đề thi sát hạch với hơn 1,000+ câu hỏi tình huống thực tế",
      "Tổ chức khóa học thí điểm (Pilot Batch) và điều chỉnh nội dung theo phản hồi học viên",
      "Chính thức áp dụng làm tiêu chuẩn bắt buộc cho toàn bộ nhân sự mới và tái đào tạo định kỳ",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / E-Learning Director",
      responsibilities: [
        "Hoạch định chiến lược chuyển đổi số công tác đào tạo và phát triển nhân tài khối CSKH.",
        "Thiết kế cấu trúc chương trình khung và thẩm định chất lượng nội dung học liệu số.",
        "Giám sát hiệu quả đào tạo và mối tương quan với chất lượng phục vụ thực tế trên hệ thống.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Micro-learning Methodology",
        "Scenario-based Interactive Simulation",
        "Gamification in Corporate Learning",
        "Kirkpatrick 4-Level Training Evaluation",
      ],
      toolsList: [
        "TalentLMS / Moodle E-Learning Platform",
        "Articulate Storyline / Canva Studio",
        "Interactive Simulation Sandbox Engine",
      ],
    },
    results: {
      operational: [
        "Số hóa thành công 100% kho học liệu với hơn 85 khóa học trực tuyến hoàn chỉnh.",
        "Thời gian đưa một nhân viên mới lên vận hành chính thức rút ngắn từ 28 ngày xuống 9 ngày.",
      ],
      customer: [
        "Khách hàng nhận được sự phục vụ tự tin, chuẩn xác và chuyên nghiệp từ ngày đầu của nhân viên mới.",
      ],
      hr: [
        "Nhân sự yêu thích học tập, tỷ lệ tham gia các khóa học nâng cao tự nguyện đạt 96.8%.",
      ],
      business: [
        "Tiết kiệm hàng trăm triệu đồng chi phí tổ chức lớp học và in ấn tài liệu mỗi năm.",
      ],
      kpiBeforeAfter: [
        "Thời gian Onboarding nhân sự mới: 28 ngày ➔ 9 ngày",
        "Tỷ lệ đỗ sát hạch thực chiến lần đầu: 64% ➔ 94.2%",
        "Chi phí đào tạo trên mỗi nhân sự: Giảm 68%",
        "Chỉ số QA Score của nhân viên mới trong tháng đầu: 72% ➔ 91.5%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Luôn được phục vụ bởi những nhân sự am hiểu sâu sắc về sản phẩm và được huấn luyện bài bản.",
      businessValue:
        "Tăng tốc độ nhân rộng quy mô đội ngũ trong các giai đoạn phát triển nóng của doanh nghiệp.",
      organizationValue:
        "Xây dựng thư viện tài sản tri thức số vô giá và có thể chuyển giao bền vững cho các thế hệ tương lai.",
      lessons: [
        "Học qua tình huống thực hành (Simulations) mang lại hiệu quả ghi nhớ gấp 5 lần đọc tài liệu lý thuyết.",
        "Đào tạo ngắn, thường xuyên và có thưởng vui vẻ sẽ duy trì được sự gắn kết bền bỉ của nhân viên.",
      ],
      nextSteps: [
        "Ứng dụng AI Voice Roleplay để cho phép nhân viên thực hành hội thoại với khách hàng ảo AI có khả năng phản ứng cảm xúc linh hoạt.",
      ],
    },
  },

  "4.2 · Xây dựng khung năng lực và lộ trình phát triển": {
    summary:
      "Thiết lập Khung Năng lực Nghề nghiệp Chuẩn hóa (CS Competency Framework) theo mô hình ASK kết hợp Lộ trình Thăng tiến Minh bạch (Career Ladder & Pathing) cho 5 cấp bậc nhân sự Dịch vụ Khách hàng (Agent ➔ Senior Agent ➔ SME / Quality Specialist ➔ Team Lead ➔ CS Manager / Director), giúp gắn kết nhân tài và giảm 60% tỷ lệ nhảy việc.",
    context: {
      currentStatus:
        "Nghề CSKH thường bị xem là công việc tạm bợ, thiếu lộ trình thăng tiến rõ ràng, tiêu chí xét tăng lương/thăng chức mang tính cảm tính của người quản lý.",
      cause:
        "Thiếu từ điển năng lực chuẩn mực và chưa có các bậc thang chức danh (Job Banding) với các yêu cầu kỹ năng cụ thể.",
      needForChange:
        "Xây dựng lộ trình phát triển sự nghiệp minh bạch, tạo động lực gắn bó lâu dài và chuyển hóa nhân viên tuyến đầu thành các nhà quản lý tương lai của công ty.",
    },
    problems: [
      {
        problem: "Tỷ lệ nghỉ việc (Attrition Rate) trong ngành CSKH quá cao (> 35%/năm)",
        cause:
          "Nhân viên không nhìn thấy tương lai phát triển sau 1-2 năm làm việc tại vị trí nghe điện thoại/trả lời tin nhắn.",
        impact:
          "Doanh nghiệp liên tục mất đi nhân sự giỏi, tốn kém chi phí tuyển dụng và đào tạo lại từ đầu.",
      },
      {
        problem: "Bất đồng nội bộ khi bổ nhiệm cán bộ quản lý",
        cause:
          "Thiếu tiêu chí đánh giá năng lực minh bạch, chủ yếu chọn người có thâm niên thay vì người có năng lực lãnh đạo thực chất.",
        impact:
          "Quản lý mới thiếu kỹ năng điều hành, gây mất đoàn kết và giảm sút hiệu suất toàn đội.",
      },
    ],
    objectives: {
      strategic: [
        "Xây dựng đội ngũ nhân sự CSKH chất lượng cao, có tính kế thừa vững chắc và gắn kết bền vững với tổ chức.",
        "Biến khối Dịch vụ Khách hàng thành cái nôi ươm mầm tài năng cho toàn công ty.",
      ],
      operational: [
        "Ban hành Từ điển Khung Năng lực (Competency Dictionary) với 18 nhóm năng lực cốt lõi cho 5 cấp bậc.",
        "Thiết lập cơ chế đánh giá năng lực 360 độ định kỳ 6 tháng gắn liền với chính sách đãi ngộ.",
      ],
      kpi: [
        "Hạ tỷ lệ nghỉ việc (Employee Attrition Rate) từ 38% xuống dưới 12%/năm.",
        "Ít nhất 80% vị trí quản lý cấp trung (Team Lead, QA Lead, Trainer) được bổ nhiệm từ nguồn nhân sự nội bộ (Internal Promotion).",
        "Chỉ số gắn kết nhân viên (eNPS) đạt ≥ 65 điểm.",
      ],
    },
    solutions: {
      modelOverview:
        "Mô hình Phát triển Nhân tài 4 Tầng: Khung Năng lực Chuẩn ASK ➔ Thang Bậc Thăng tiến Kép (Dual Career Ladder) ➔ Đánh giá 360 Độ & Ma trận Năng lực ➔ Chương trình Ươm mầm Lãnh đạo (Management Trainee).",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      cards: [
        {
          name: "01 · ASK Competency Framework Dictionary",
          purpose: "Định nghĩa rõ ràng từng tiêu chuẩn năng lực cho từng cấp bậc.",
          implementation:
            "Xây dựng ma trận 3 khối: Thái độ/Tư duy (Attitude - 30%), Kỹ năng thực thi (Skills - 40%), Kiến thức chuyên sâu (Knowledge - 30%). Mỗi năng lực được chia thành 5 mức độ hành vi quan sát được (Behavioral Anchors).",
          value: "Minh bạch 100% tiêu chí, xóa bỏ hoàn toàn việc đánh giá cảm tính.",
          iconName: "Target",
        },
        {
          name: "02 · Dual Career Ladder (Lộ trình Kép)",
          purpose: "Mở rộng cơ hội phát triển theo cả 2 hướng: Quản lý hoặc Chuyên gia.",
          implementation:
            "Nhân viên có thể lựa chọn 2 nhánh: Nhánh Quản lý (Agent ➔ Team Lead ➔ Manager ➔ Director) HOẶC Nhánh Chuyên gia (Agent ➔ Senior Agent ➔ SME Chuyên gia nghiệp vụ / Giảng viên / Chuyên viên QA).",
          value: "Những nhân sự không thích làm sếp vẫn có thể thăng tiến và nhận mức lương tương đương quản lý.",
          iconName: "TrendingUp",
        },
        {
          name: "03 · Skill Gap Matrix & 360-Degree Review",
          purpose: "Nhận diện chính xác điểm mạnh và khoảng trống kỹ năng của từng cá nhân.",
          implementation:
            "Tổ chức đánh giá 360 độ định kỳ: Tự đánh giá + Đồng nghiệp đánh giá + Quản lý đánh giá. Xuất ra bản đồ kỹ năng (Spider Chart) và Kế hoạch Phát triển Cá nhân (IDP - Individual Development Plan).",
          value: "Nhân viên biết rõ mình cần rèn luyện thêm điều gì để đạt cấp bậc tiếp theo.",
          iconName: "BarChart",
        },
        {
          name: "04 · Future CS Leader Succession Program",
          purpose: "Đào tạo và chuẩn bị sẵn sàng đội ngũ kế cận cho các vị trí chủ chốt.",
          implementation:
            "Tuyển chọn top 10% nhân sự xuất sắc tham gia khóa huấn luyện 'Kỹ năng Lãnh đạo Thực chiến': Quản trị cảm xúc, Điều phối ca trực, Huấn luyện 1-on-1 và Phân tích số liệu điều hành.",
          value: "Tổ chức luôn có sẵn nhân sự kế thừa chất lượng cao khi mở rộng quy mô.",
          iconName: "Users",
        },
      ],
    },
    implementation: [
      "Khảo sát nguyện vọng phát triển nghề nghiệp của toàn bộ nhân viên trong phòng ban",
      "Xây dựng và hoàn thiện bộ Từ điển Khung Năng lực chi tiết cùng Phòng Nhân sự (HR)",
      "Thiết kế bản mô tả lộ trình nghề nghiệp (Career Path Roadmap) trực quan và truyền thông nội bộ",
      "Tổ chức các kỳ đánh giá năng lực 360 độ định kỳ vào tháng 6 và tháng 12 hàng năm",
      "Triển khai các chương trình cố vấn 1-on-1 (Mentorship) giữa Quản lý và nhân sự tiềm năng",
      "Tổ chức lễ vinh danh và trao quyết định thăng chức minh bạch trước toàn thể công ty",
    ],
    roleAndContribution: {
      role: "Trưởng Nhóm / Trưởng Phòng CSKH (Talent Development Lead)",
      responsibilities: [
        "Chủ trì xây dựng Khung Năng lực và thiết kế Lộ trình Phát triển Nghề nghiệp cho khối CSKH.",
        "Trực tiếp huấn luyện và cố vấn cho đội ngũ cán bộ quản lý cấp trung tiềm năng.",
        "Thiết lập các tiêu chuẩn đánh giá và phê duyệt đề bạt thăng chức công tâm, minh bạch.",
      ],
    },
    systemsAndTools: {
      methods: [
        "ASK Competency Framework",
        "Dual Career Pathing Architecture",
        "360-Degree Feedback Assessment",
        "Individual Development Plan (IDP)",
      ],
      toolsList: [
        "HR Competency Management Portal",
        "360-Degree Evaluation Engine",
        "Skill Radar Visualization Matrix",
      ],
    },
    results: {
      operational: [
        "100% nhân viên có lộ trình phát triển nghề nghiệp cá nhân hóa rõ ràng.",
        "85% vị trí Quản lý, Lead và Chuyên viên được bổ nhiệm thành công từ nguồn nhân sự nội bộ.",
      ],
      customer: [
        "Khách hàng được phục vụ bởi đội ngũ nhân sự gắn kết, tự hào và giàu kinh nghiệm thâm niên.",
      ],
      hr: [
        "Tỷ lệ nhảy việc (Attrition Rate) giảm kỷ lục từ 38% xuống còn 11.2% (thấp nhất ngành).",
        "Chỉ số gắn kết nhân viên eNPS tăng vọt lên +70 điểm.",
      ],
      business: [
        "Tiết kiệm hàng tỷ đồng chi phí tuyển dụng và đào tạo thay thế nhân sự mới mỗi năm.",
      ],
      kpiBeforeAfter: [
        "Tỷ lệ nghỉ việc hàng năm (Attrition Rate): 38% ➔ 11.2%",
        "Tỷ lệ bổ nhiệm nội bộ (Internal Promotion Rate): 20% ➔ 85%",
        "Employee Net Promoter Score (eNPS): +15 ➔ +70",
        "Thời gian gắn bó trung bình của nhân sự: 11 tháng ➔ 3.2 năm",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Nhận được sự phục vụ từ những chuyên viên lâu năm có sự thấu cảm sâu sắc và am hiểu nghiệp vụ tuyệt đối.",
      businessValue:
        "Duy trì tính liên tục và ổn định vững vàng của bộ máy vận hành, kiến tạo văn hóa trung thành và cống hiến.",
      organizationValue:
        "Xây dựng thương hiệu nhà tuyển dụng uy tín và môi trường làm việc đáng mơ ước.",
      lessons: [
        "Con người chỉ rời bỏ công ty khi họ không nhìn thấy tương lai của chính mình.",
        "Lộ trình thăng tiến rõ ràng và cơ chế ghi nhận công bằng quan trọng hơn cả những lời hứa suông.",
      ],
      nextSteps: [
        "Mở rộng cơ chế luân chuyển công tác liên phòng ban (Cross-department Job Rotation) cho nhân sự CSKH sang khối Product, Marketing và Operations.",
      ],
    },
  },
};
