import { CaseStudy } from "../projectsData";

export const group5CaseStudies: Record<string, CaseStudy> = {
  "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng": {
    summary:
      "Kiến trúc và xây dựng Trung tâm Hỗ trợ Khách hàng Tự Phục Vụ Đa Phương Tiện (Modern Self-Service Help Center & Knowledge Base), chuẩn hóa hơn 600+ bài viết hướng dẫn nghiệp vụ, video trực quan và cổng theo dõi tiến độ ticket minh bạch, giúp tăng tỷ lệ tự giải quyết vấn đề của người dùng (Ticket Deflection Rate) lên trên 45% và giảm tải hàng chục ngàn yêu cầu hỗ trợ mỗi tháng.",
    context: {
      currentStatus:
        "Doanh nghiệp không có cổng thông tin trợ giúp chính thức, người dùng khi gặp bất kỳ thắc mắc nào dù là nhỏ nhất (cách đổi mật khẩu, biểu phí) đều phải gọi hotline hoặc nhắn tin cho nhân viên hỗ trợ.",
      cause:
        "Thiếu cơ sở tri thức công khai (Public Knowledge Base) và chưa có cổng theo dõi trạng thái yêu cầu (Customer Portal) dành riêng cho người dùng.",
      needForChange:
        "Xây dựng Trung tâm Hỗ trợ Khách hàng chuẩn mực, cung cấp trải nghiệm tự phục vụ (Self-service) tiện lợi, giúp khách hàng tìm thấy câu trả lời trong 30 giây mà không cần chờ đợi.",
    },
    problems: [
      {
        problem: "Tổng đài bị quá tải bởi các câu hỏi lặp đi lặp lại cực kỳ cơ bản",
        cause:
          "Hơn 60% cuộc gọi đến tổng đài chỉ để hỏi các thông tin có sẵn trong hướng dẫn sử dụng.",
        impact:
          "Các khách hàng gặp sự cố thực sự nghiêm trọng không thể kết nối được với nhân viên do nghẽn mạng.",
      },
      {
        problem: "Khách hàng sốt ruột và hoang mang khi gửi ticket qua email",
        cause:
          "Khách hàng gửi yêu cầu xong không biết hồ sơ của mình đã được tiếp nhận chưa, ai đang xử lý và khi nào có kết quả.",
        impact:
          "Khách hàng liên tục gọi lại nhiều lần để hối thúc (Repeat Contact), gây tắc nghẽn kép cho hệ thống.",
      },
    ],
    objectives: {
      strategic: [
        "Xây dựng Trung tâm Hỗ trợ Khách hàng trở thành kênh thông tin chính thống, đáng tin cậy và tiện lợi nhất của doanh nghiệp.",
        "Dịch chuyển thói quen người dùng sang mô hình Hỗ trợ Tự Phục Vụ Hiện Đại (Modern Self-Service First Strategy).",
      ],
      operational: [
        "Quy hoạch và xuất bản hơn 600+ bài viết, infographic và video hướng dẫn ngắn chuẩn SEO trên Help Center.",
        "Triển khai Cổng Khách hàng (Customer Portal) cho phép người dùng đăng nhập tra cứu tiến độ xử lý ticket theo thời gian thực.",
      ],
      customer: [
        "Khách hàng có thể tự tìm thấy giải pháp chính xác trong vòng dưới 30 giây vào bất kỳ thời điểm nào trong ngày.",
      ],
      kpi: [
        "Tỷ lệ ngăn chặn ticket dồn về tổng đài (Ticket Deflection Rate) đạt ≥ 45%.",
        "Thu hút hơn 500,000 lượt truy cập tra cứu tự phục vụ mỗi tháng.",
        "Điểm đánh giá hữu ích của bài viết (Article Helpfulness Score) đạt ≥ 90%.",
      ],
    },
    solutions: {
      modelOverview:
        "Kiến trúc Help Center 4 Cột Trụ: Kiến trúc Thông tin Trực quan (Information Architecture) ➔ Công cụ Tìm kiếm Thông minh (Smart AI Search) ➔ Cổng Tra cứu Ticket Minh bạch (Customer Portal) ➔ Tích hợp Đa Kênh Liền mạch (Omnichannel Embedded Widget).",
      imageUrl: "https://i.ibb.co/BVc2W8bJ/5-1-Th-nh-l-p-trung-t-m-h-tr.png",
      cards: [
        {
          name: "01 · Information Architecture & Content Hub",
          purpose: "Sắp xếp tri thức khoa học theo danh mục chủ đề để khách hàng dễ duyệt.",
          implementation:
            "Quy hoạch danh mục theo hành trình người dùng: Bắt đầu ➔ Tài khoản & Bảo mật ➔ Thanh toán & Nạp rút ➔ Sự cố thường gặp. Biên soạn bài viết theo chuẩn ngôn ngữ bình dân dễ hiểu kèm hình ảnh minh họa từng bước.",
          value: "Khách hàng tìm thấy thông tin mình cần chỉ qua 2 lần nhấp chuột.",
          iconName: "FileText",
        },
        {
          name: "02 · AI-Powered Smart Search Engine",
          purpose: "Gợi ý chính xác bài viết ngay khi người dùng gõ từ khóa đầu tiên.",
          implementation:
            "Cấu hình thanh tìm kiếm tự động gợi ý (Autocomplete & Fuzzy Search), xử lý từ đồng nghĩa, viết tắt và lỗi chính tả tiếng Việt. Tự động đề xuất các chủ đề thịnh hành nhất trong tuần.",
          value: "Rút ngắn thời gian tìm kiếm từ 3 phút xuống còn 10 giây.",
          iconName: "Sparkles",
        },
        {
          name: "03 · Realtime Ticket Tracking Portal",
          purpose: "Minh bạch hóa tiến độ giải quyết yêu cầu, triệt tiêu sự sốt ruột của khách hàng.",
          implementation:
            "Cung cấp giao diện quản lý yêu cầu cá nhân: Khách hàng đăng nhập là thấy ngay danh sách các ticket đã gửi, trạng thái hiện tại (Đang xử lý / Chờ đối soát / Hoàn thành), chuyên viên phụ trách và thời gian dự kiến xong.",
          value: "Giảm 75% các cuộc gọi hỏi thăm tiến độ hồ sơ lặp lại.",
          iconName: "Clock",
        },
        {
          name: "04 · In-app Embedded Contextual Widget",
          purpose: "Mang câu trả lời đến ngay tại nơi khách hàng đang gặp khó khăn.",
          implementation:
            "Nhúng widget trợ giúp thông minh ngay trong ứng dụng di động: Khi khách hàng ở màn hình 'Chuyển tiền', widget tự động hiển thị sẵn 3 bài viết hướng dẫn về hạn mức và phí chuyển tiền.",
          value: "Giải tỏa ngay thắc mắc tại chỗ mà không cần rời khỏi màn hình giao dịch.",
          iconName: "Layers",
        },
      ],
    },
    implementation: [
      "Khảo sát top 50 câu hỏi phổ biến nhất trên tổng đài để quy hoạch danh mục nội dung",
      "Thiết kế giao diện Help Center chuẩn Responsive thân thiện trên cả điện thoại và máy tính",
      "Biên tập, thiết kế hình ảnh và quay video ngắn cho 600+ bài viết hướng dẫn nghiệp vụ",
      "Tích hợp công cụ tìm kiếm thông minh và kết nối cơ sở dữ liệu với nền tảng CRM Contact Center",
      "Cấu hình tính năng đánh giá bài viết hữu ích (Thích / Không thích) và hộp góp ý cải tiến",
      "Theo dõi dữ liệu từ khóa tìm kiếm không có kết quả (No-result Searches) để liên tục viết thêm bài mới",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Helpdesk Operations Director",
      responsibilities: [
        "Chỉ đạo toàn diện đề án xây dựng và vận hành Trung tâm Hỗ trợ Khách hàng của doanh nghiệp.",
        "Quy hoạch kiến trúc thông tin và phê duyệt chất lượng nội dung tri thức xuất bản.",
        "Định hướng chiến lược thúc đẩy tỷ lệ tự phục vụ (Self-service Deflection) trên toàn hệ thống.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Self-Service Support Strategy",
        "Knowledge-Centered Service (KCS)",
        "Information Architecture (IA)",
        "Search Engine Optimization (SEO)",
      ],
      toolsList: [
        "Zendesk Guide / Freshdesk HelpCenter",
        "Algolia / Elastic AI Search Engine",
        "Canva / Loom Video Production Hub",
      ],
    },
    results: {
      operational: [
        "Vận hành thành công Help Center với hơn 650 bài viết chất lượng cao, phục vụ hơn 800,000 lượt xem trang mỗi tháng.",
        "Giảm 45% tổng khối lượng ticket cơ bản dồn về cho nhân viên tổng đài.",
      ],
      customer: [
        "Khách hàng vô cùng hài lòng khi có thể tự chủ giải quyết vấn đề nhanh chóng bất kỳ lúc nào mà không phải chờ đợi.",
      ],
      business: [
        "Tiết kiệm chi phí vận hành ước tính hàng tỷ đồng mỗi năm nhờ giảm tải hàng trăm ngàn lượt liên hệ thủ công.",
      ],
      kpiBeforeAfter: [
        "Ticket Deflection Rate (Tỷ lệ tự giải quyết): 4% ➔ 48.5%",
        "Lượng truy cập Help Center hàng tháng: 15,000 ➔ 820,000 lượt",
        "Article Helpfulness Score (Hữu ích): 65% ➔ 93.8%",
        "Khối lượng cuộc gọi hỏi thông tin cơ bản: Giảm 62%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Tự do làm chủ trải nghiệm, tìm thấy câu trả lời chính xác, dễ hiểu trong 30 giây mà không cần làm phiền ai.",
      businessValue:
        "Tối ưu hóa mạnh mẽ chi phí vận hành (Cost-to-Serve) và nâng cao năng lực hỗ trợ khách hàng quy mô lớn.",
      organizationValue:
        "Chuẩn hóa và số hóa toàn bộ tài sản tri thức của công ty thành nguồn tư liệu mở tiện ích.",
      lessons: [
        "Nội dung Help Center phải được viết bằng ngôn ngữ của khách hàng, không dùng thuật ngữ kỹ thuật khó hiểu của nội bộ.",
        "Liên tục phân tích từ khóa khách hàng tìm kiếm mà không ra kết quả để bổ sung bài viết mới kịp thời.",
      ],
      nextSteps: [
        "Tích hợp AI Tạo Sinh (Generative AI) tự động sinh câu trả lời tóm tắt ngắn từ các bài viết Help Center cho người dùng ngay trên trang tìm kiếm.",
      ],
    },
  },
};
