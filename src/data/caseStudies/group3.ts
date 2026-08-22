import { CaseStudy } from "../projectsData";

export const group3CaseStudies: Record<string, CaseStudy> = {
  "3.1 · Xây dựng hệ thống quản lý thông tin khách hàng": {
    summary:
      "Thiết kế và triển khai Hệ thống Quản trị Quan hệ Khách hàng Hiện đại (CRM 360-Degree View), tích hợp toàn diện dữ liệu định danh, lịch sử giao dịch, vòng đời tài khoản và dữ liệu tương tác đa kênh từ Core Banking / E-Commerce / App vào một nền tảng quản trị duy nhất.",
    context: {
      currentStatus:
        "Dữ liệu khách hàng bị phân mảnh ở nhiều nơi: dữ liệu giao dịch nằm ở Core Backend, thông tin đơn hàng nằm ở Web/App, lịch sử gọi điện nằm ở Tổng đài và email nằm ở hộp thư riêng.",
      cause:
        "Thiếu kiến trúc dữ liệu tập trung (Customer Master Data) và chưa xây dựng nền tảng CRM chuyên dụng cho khối dịch vụ khách hàng.",
      needForChange:
        "Xây dựng một hệ thống CRM mạnh mẽ, cung cấp góc nhìn 360 độ về khách hàng trong 1 giây để phục vụ cá nhân hóa và giải quyết sự cố chính xác tuyệt đối.",
    },
    problems: [
      {
        problem: "Thời gian tra cứu thông tin quá lâu trong cuộc gọi",
        cause:
          "Agent phải mở 4-5 phần mềm nội bộ khác nhau và gõ lại mã khách hàng trên từng màn hình.",
        impact:
          "Thời gian chết (Dead Air) trong cuộc gọi kéo dài hơn 90 giây, làm tăng AHT và gây khó chịu cho người dùng.",
      },
      {
        problem: "Không nhận diện được khách hàng ưu tiên (VIP Tiering)",
        cause:
          "CRM không tự động phân hạng khách hàng theo giá trị chi tiêu thực tế.",
        impact:
          "Khách hàng đóng góp doanh thu lớn vẫn phải xếp hàng chờ đợi như người dùng thông thường, nguy cơ mất khách cao.",
      },
    ],
    objectives: {
      strategic: [
        "Biến dữ liệu khách hàng thành tài sản chiến lược cốt lõi của doanh nghiệp.",
        "Thiết lập nền tảng CRM trung tâm có khả năng mở rộng phục vụ hàng triệu tài khoản người dùng.",
      ],
      operational: [
        "Tích hợp thành công 100% các nguồn dữ liệu cốt lõi vào màn hình CRM 360 độ.",
        "Tự động hóa hiển thị thông tin tức thời (Screen Pop-up) khi có cuộc gọi/tin nhắn đến.",
      ],
      customer: [
        "Khách hàng được nhận diện ngay lập tức và được phục vụ cá nhân hóa theo đúng lịch sử và nhu cầu.",
      ],
      kpi: [
        "Rút ngắn 65% thời gian tra cứu dữ liệu khách hàng của Agent.",
        "Giảm thời gian xử lý trung bình mỗi cuộc gọi (AHT) từ 320s xuống 185s.",
        "Độ chính xác và toàn vẹn của dữ liệu hồ sơ khách hàng đạt 99.9%.",
      ],
    },
    solutions: {
      modelOverview:
        "Kiến trúc CRM 360 4 Tầng: Tích hợp API Đa Nguồn ➔ Hồ sơ Khách hàng Động 360 Độ ➔ Tự động Bật Màn hình (Screen Pop-up) ➔ Phân luồng Định tuyến VIP Thông minh.",
      imageUrl: "https://i.ibb.co/Xxgqd4Rn/3-1-X-y-d-ng-h-th-ng-CRM.png",
      cards: [
        {
          name: "01 · Enterprise API Data Integration Hub",
          purpose: "Kết nối và đồng bộ dữ liệu thời gian thực từ mọi hệ sinh thái.",
          implementation:
            "Xây dựng các cổng API an toàn kết nối CRM với Core Backend, Cổng thanh toán, Hệ thống kho vận và Tổng đài VoIP. Đồng bộ thông tin giao dịch trong dưới 1 giây.",
          value: "Xóa bỏ hoàn toàn các ốc đảo dữ liệu phân mảnh (Data Silos).",
          iconName: "Network",
        },
        {
          name: "02 · 360-degree Customer Timeline",
          purpose: "Trực quan hóa toàn bộ lịch sử hành vi và tương tác của khách hàng.",
          implementation:
            "Giao diện dòng thời gian (Timeline) hiển thị: Mọi đơn hàng đã mua, sự cố từng gặp, cuộc gọi gần nhất, điểm hài lòng CSAT và ghi chú quan trọng từ các phòng ban khác.",
          value: "Agent nắm bắt ngữ cảnh khách hàng chỉ trong 3 giây lướt mắt.",
          iconName: "Users",
        },
        {
          name: "03 · CTI & Intelligent Screen Pop-up",
          purpose: "Tự động kích hoạt thông tin trước khi Agent nhấc máy.",
          implementation:
            "Tích hợp CTI (Computer Telephony Integration): Khi có cuộc gọi hoặc tin nhắn, hệ thống tự động nhận diện số điện thoại và mở sẵn tab thông tin hồ sơ tương ứng.",
          value: "Agent cất lời chào đúng tên khách hàng ngay từ giây đầu tiên, gây ấn tượng mạnh mẽ.",
          iconName: "Zap",
        },
        {
          name: "04 · Dynamic Customer Segmentation & VIP Routing",
          purpose: "Phân khúc tự động và ưu tiên phục vụ theo giá trị khách hàng.",
          implementation:
            "Gán nhãn tự động theo quy tắc: VIP Gold, Platinum, Khách hàng mới, Khách hàng có khiếu nại chưa giải quyết. Định tuyến cuộc gọi của khách VIP đến nhóm chăm sóc đặc biệt.",
          value: "Bảo vệ tối đa tệp khách hàng mang lại 80% lợi nhuận cho công ty.",
          iconName: "Target",
        },
      ],
    },
    implementation: [
      "Khảo sát cấu trúc dữ liệu hiện tại và xác định các trường dữ liệu bắt buộc (Data Dictionary)",
      "Thiết kế kiến trúc hệ thống CRM và các luồng tích hợp API bảo mật cao",
      "Lập trình và kết nối hệ thống CRM với Core System và Tổng đài liên lạc",
      "Xây dựng các quy tắc làm sạch dữ liệu (Data Cleansing) và gộp trùng lặp (Deduplication)",
      "Tổ chức đào tạo toàn diện và bàn giao cho 100% đội ngũ nhân sự tác nghiệp",
      "Định kỳ tối ưu hóa hiệu năng truy vấn dữ liệu dưới tải cao",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / CRM System Architect",
      responsibilities: [
        "Chủ trì toàn diện đề án thiết kế và triển khai hệ thống CRM cho khối Dịch vụ Khách hàng.",
        "Thiết kế luồng trải nghiệm người dùng (UX) trên giao diện tác nghiệp của Agent.",
        "Phối hợp với Giám đốc Công nghệ (CTO) đảm bảo an toàn thông tin và bảo mật dữ liệu khách hàng.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Customer 360-Degree Architecture",
        "Computer Telephony Integration (CTI)",
        "Data Hygiene & Deduplication",
        "Role-Based Access Control (RBAC)",
      ],
      toolsList: [
        "Salesforce / Zendesk / Custom In-house CRM",
        "RESTful API Data Gateway",
        "Elasticsearch Fast Query Engine",
      ],
    },
    results: {
      operational: [
        "Triển khai thành công hệ thống CRM 360 phục vụ hơn 5 triệu tài khoản khách hàng hoạt động.",
        "Thời gian phản hồi thông tin của Agent trong lúc đàm thoại giảm 65%.",
      ],
      customer: [
        "Khách hàng cảm nhận được sự chuyên nghiệp vượt bậc khi không bao giờ phải khai báo lại thông tin cá nhân.",
      ],
      business: [
        "Tăng 25% tỷ lệ bán thêm/bán chéo (Up-sell/Cross-sell) thành công nhờ nắm rõ lịch sử tiêu dùng của khách.",
      ],
      kpiBeforeAfter: [
        "Thời gian tra cứu thông tin: 90s ➔ 3s",
        "Average Handling Time (AHT): 320s ➔ 185s",
        "Tỷ lệ nhận diện đúng khách hàng khi gọi đến: 40% ➔ 99.2%",
        "Agent Satisfaction với công cụ làm việc: 62% ➔ 96%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Trải nghiệm được cá nhân hóa trọn vẹn, cảm thấy được thấu hiểu và tôn trọng trong từng giao dịch.",
      businessValue:
        "Tạo lập kho dữ liệu tài sản vô giá giúp doanh nghiệp ra quyết định kinh doanh và sản phẩm chuẩn xác.",
      organizationValue:
        "Chuẩn hóa hạ tầng công nghệ thông tin tiệm cận với tiêu chuẩn của các tập đoàn quốc tế.",
      lessons: [
        "Giao diện CRM phải được thiết kế tối giản cho Agent tuyến đầu, đừng làm phức tạp hóa bằng quá nhiều trường thông tin rác.",
        "Bảo mật và phân quyền dữ liệu nghiêm ngặt là yếu tố sống còn của hệ thống CRM.",
      ],
      nextSteps: [
        "Tích hợp thuật toán gợi ý hành động tiếp theo thông minh (Next Best Action - NBA) bằng AI.",
      ],
    },
  },

  "3.2 · Phân tích và báo cáo dữ liệu khách hàng": {
    summary:
      "Xây dựng Trung tâm Phân tích Dữ liệu Trải nghiệm Khách hàng Thời gian thực (Real-time CX Analytics Hub), tự động hóa toàn bộ luồng thu thập, xử lý và trực quan hóa các chỉ số đo lường hiệu suất vận hành (AHT, FCR, SLA, Abandonment) và chỉ số cảm xúc người dùng (CSAT, NPS, CES, Sentiment) lên hệ thống Executive Dashboards phục vụ việc ra quyết định chiến lược tức thời của Ban Điều Hành.",
    context: {
      currentStatus:
        "Báo cáo hoạt động phòng CSKH được tổng hợp thủ công vào cuối tuần hoặc cuối tháng trên các file Excel nặng nề, thiếu tính chính xác và không thể hiện được xu hướng thời gian thực.",
      cause:
        "Chưa có hạ tầng kho dữ liệu (Data Warehouse) kết nối trực tiếp và thiếu các mô hình phân tích dữ liệu chuyên sâu (Predictive Analytics).",
      needForChange:
        "Chuyển đổi sang mô hình quản trị vận hành dựa trên dữ liệu thời gian thực (Real-time Data-Driven Management), giúp nhận diện sớm rủi ro và tối ưu hóa nguồn lực liên tục.",
    },
    problems: [
      {
        problem: "Báo cáo bị trễ khiến quyết định điều hành chậm chân",
        cause:
          "Mất 3-4 ngày sau khi kết thúc tháng mới có số liệu tổng hợp về tỷ lệ cuộc gọi nhỡ và khiếu nại.",
        impact:
          "Khi phát hiện sự cố thì khách hàng đã rời bỏ và cơ hội khắc phục đã trôi qua.",
      },
      {
        problem: "Thiếu khả năng phân tích đa chiều tìm nguyên nhân gốc rễ",
        cause:
          "Số liệu chỉ dừng lại ở con số tổng quan, không thể drill-down chi tiết theo từng ca trực, nhóm sản phẩm hay tính năng cụ thể.",
        impact:
          "Không thể tìm ra đúng phòng ban hoặc cá nhân chịu trách nhiệm cho các chỉ số giảm sút.",
      },
    ],
    objectives: {
      strategic: [
        "Đưa dữ liệu trải nghiệm khách hàng thành một trong 3 trụ cột định hướng chiến lược kinh doanh của công ty.",
        "Xây dựng văn hóa Data-driven minh bạch ở tất cả các cấp quản lý.",
      ],
      operational: [
        "Tự động hóa 100% việc tạo và gửi các báo cáo định kỳ hàng ngày, hàng tuần, hàng tháng.",
        "Xây dựng Real-time Command Center Dashboard hiển thị trực quan các chỉ số vận hành nóng.",
      ],
      kpi: [
        "Thời gian tổng hợp báo cáo rút ngắn từ 4 ngày xuống còn 0 phút (hoàn toàn tự động).",
        "Khả năng phân tích sâu (Drill-down) đến từng giao dịch chỉ với 2 cú nhấp chuột.",
        "Dự báo chính xác lưu lượng cuộc gọi/ticket trước 14 ngày với độ tin cậy ≥ 90%.",
      ],
    },
    solutions: {
      modelOverview:
        "Hệ thống Analytics 4 Tầng: Data Pipeline Tự động ➔ Mô hình Phân tích Đa chiều (OLAP) ➔ Real-time Executive Dashboards ➔ Cảnh báo Thông minh (Smart Alerting Engine).",
      imageUrl: "https://i.ibb.co/cj0W4bJ/3-2-Ph-n-t-ch-B-o-c-o.png",
      cards: [
        {
          name: "01 · Automated Data Pipeline & Warehouse",
          purpose: "Tự động trích xuất, làm sạch và lưu trữ dữ liệu từ mọi nguồn.",
          implementation:
            "Xây dựng luồng ETL (Extract, Transform, Load) tự động hút dữ liệu từ Tổng đài, CRM, Khảo sát và Core Banking đổ về Data Warehouse mỗi 5 phút.",
          value: "Dữ liệu luôn sẵn sàng, sạch sẽ và chuẩn hóa tuyệt đối.",
          iconName: "Layers",
        },
        {
          name: "02 · Realtime Command Center Wallboard",
          purpose: "Giám sát sức khỏe vận hành từng giây cho đội ngũ quản lý ca.",
          implementation:
            "Màn hình lớn hiển thị thời gian thực: Số cuộc gọi đang chờ, thời gian chờ lâu nhất, trạng thái từng Agent (Available, In-call, Break), SLA hiện tại và điểm CSAT hôm nay.",
          value: "Team Lead nhận biết nguy cơ nghẽn mạng để điều phối nhân sự ngay trong 30 giây.",
          iconName: "BarChart",
        },
        {
          name: "03 · Executive C-Level CX Dashboard",
          purpose: "Cung cấp bức tranh toàn cảnh cho Ban Giám đốc chỉ trong 1 trang duy nhất.",
          implementation:
            "Dashboard trực quan hóa các chỉ số chiến lược: Xu hướng NPS theo tháng, Cost per Contact, Top 5 lý do khiếu nại nhiều nhất, Bản đồ nhiệt phân bố lưu lượng theo khung giờ.",
          value: "Giúp CEO và Ban Điều Hành nắm trọn tình hình khách hàng để ra quyết định kinh doanh.",
          iconName: "TrendingUp",
        },
        {
          name: "04 · AI Anomaly Detection & Smart Alert",
          purpose: "Tự động phát hiện các biến động bất thường và gửi cảnh báo tức thì.",
          implementation:
            "Thuật toán AI tự động học ngưỡng chuẩn: Khi một chỉ số (VD: Khiếu nại nạp tiền) tăng đột biến 30% so với cùng giờ tuần trước, hệ thống tự động gửi tin nhắn Telegram/Lark cho Trưởng phòng.",
          value: "Chủ động kiểm soát sự cố trước khi lan rộng.",
          iconName: "AlertTriangle",
        },
      ],
    },
    implementation: [
      "Xác định danh mục chỉ số đo lường (Metric Catalog) và các công thức tính toán chuẩn mực",
      "Thiết kế cấu trúc cơ sở dữ liệu phân tích Data Warehouse trên nền tảng đám mây",
      "Xây dựng các báo cáo trực quan trên nền tảng Power BI / Google Looker Studio",
      "Cấu hình các bộ lọc tương tác phân cấp (Drill-down theo Phòng ban, Nhóm, Agent, Thời gian)",
      "Đào tạo kỹ năng phân tích và đọc hiểu dữ liệu (Data Literacy) cho toàn bộ đội ngũ Team Lead",
      "Vận hành báo cáo tự động định kỳ qua Email và hệ thống kênh nội bộ",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / CX Analytics Lead",
      responsibilities: [
        "Kiến trúc toàn bộ hệ sinh thái báo cáo và chỉ số đo lường hiệu suất của khối CSKH.",
        "Trực tiếp chủ trì các buổi thuyết trình phân tích insight khách hàng trước Ban Giám đốc.",
        "Thiết lập các mô hình dự báo lưu lượng và tối ưu hóa định biên nhân sự dựa trên số liệu.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Data Pipeline ETL",
        "Multi-dimensional Analysis (OLAP)",
        "Anomaly Detection",
        "Predictive Volume Forecasting",
      ],
      toolsList: [
        "Microsoft Power BI / Looker Studio",
        "PostgreSQL / Google BigQuery",
        "Python Data Analysis & Pandas",
      ],
    },
    results: {
      operational: [
        "Tự động hóa 100% hệ thống báo cáo, xóa bỏ hoàn toàn hàng chục giờ lập file Excel mỗi tuần.",
        "Ban Lãnh đạo có thể truy cập báo cáo tình trạng khách hàng 24/7 từ điện thoại di động.",
      ],
      customer: [
        "Các sự cố dịch vụ được phát hiện và xử lý sớm, giảm 70% tác động tiêu cực đến trải nghiệm người dùng.",
      ],
      business: [
        "Dự báo chính xác lưu lượng giúp tối ưu 25% chi phí phân ca nhân sự, tránh lãng phí giờ công rảnh rỗi.",
      ],
      kpiBeforeAfter: [
        "Thời gian lập báo cáo định kỳ: 16 giờ/tuần ➔ 0 giờ (Auto)",
        "Độ trễ dữ liệu báo cáo: 7 ngày ➔ 60 giây",
        "Độ chính xác dự báo lưu lượng tiếp nhận: 68% ➔ 92.5%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Được hưởng chất lượng dịch vụ ổn định, không bị gián đoạn hay nghẽn mạng vào các giờ cao điểm.",
      businessValue:
        "Tối ưu hóa tối đa chi phí vận hành và cung cấp dữ liệu thị trường quý giá cho các chiến dịch phát triển.",
      organizationValue:
        "Nâng tầm trình độ chuyên môn của đội ngũ quản lý cấp trung thông qua việc làm chủ công nghệ dữ liệu số.",
      lessons: [
        "Dữ liệu đẹp mắt trên biểu đồ không có ý nghĩa nếu không dẫn đến một hành động cải tiến cụ thể.",
        "Hãy bắt đầu từ câu hỏi kinh doanh cần giải quyết trước khi bắt tay vào xây dựng biểu đồ.",
      ],
      nextSteps: [
        "Ứng dụng AI phân tích dự đoán xu hướng nhu cầu khách hàng theo mùa vụ và thời tiết.",
      ],
    },
  },

  "3.3 · Khảo sát và đánh giá mức độ hài lòng": {
    summary:
      "Thiết kế và triển khai Hệ thống Lắng nghe và Đánh giá Sự Hài lòng Toàn diện (Automated Customer Satisfaction Measurement System), tự động hóa việc thu thập phản hồi qua các chỉ số chuẩn quốc tế CSAT (Điểm Hài lòng), NPS (Mức độ Giới thiệu), CES (Nỗ lực Khách hàng) và vận hành Quy trình Đóng vòng Cứu vãn Khách hàng Không hài lòng (Closed-Loop Detractor Recovery Action Plan).",
    context: {
      currentStatus:
        "Doanh nghiệp chỉ thực hiện khảo sát qua loa một năm vài lần bằng cách gọi điện thủ công vài trăm mẫu, mẫu khảo sát thiên vị và không phản ánh đúng bức tranh trải nghiệm thực tế.",
      cause:
        "Thiếu công cụ khảo sát tự động gắn liền với từng giao dịch và chưa có cơ chế xử lý ngay các phản hồi tiêu cực.",
      needForChange:
        "Xây dựng hệ thống khảo sát tức thời tự động tại mọi điểm chạm, biến các phản hồi thành cơ hội vàng để cải tiến dịch vụ và giữ chân khách hàng.",
    },
    problems: [
      {
        problem: "Tỷ lệ phản hồi khảo sát quá thấp (< 3%)",
        cause:
          "Bộ câu hỏi quá dài dòng, phức tạp và gửi khảo sát sai thời điểm (gửi sau 3-4 ngày).",
        impact:
          "Dữ liệu thu về không đủ tính đại diện và không có giá trị thống kê để ra quyết định.",
      },
      {
        problem: "Khách hàng chấm điểm 1 sao nhưng không có ai liên hệ giải quyết",
        cause:
          "Hệ thống khảo sát tách rời khỏi hệ thống CRM tạo ticket xử lý.",
        impact:
          "Khách hàng cảm thấy khảo sát chỉ mang tính hình thức, gia tăng sự bức xúc và rời bỏ dịch vụ.",
      },
    ],
    objectives: {
      strategic: [
        "Xây dựng cơ chế lắng nghe phản hồi của khách hàng thành quy trình bắt buộc tại mọi điểm chạm dịch vụ.",
        "Hạ thấp tỷ lệ khách hàng chỉ trích (Detractors) và nhân rộng tỷ lệ khách hàng ủng hộ (Promoters).",
      ],
      operational: [
        "Tự động gửi khảo sát vi mô 1 chạm (Micro-Survey) ngay sau khi cuộc gọi/tin nhắn hỗ trợ kết thúc.",
        "Thiết lập quy trình tự động tạo Ticket Cứu vãn Khách hàng (Detractor Recovery) cho mọi đánh giá dưới 3 sao.",
      ],
      customer: [
        "Khách hàng cảm thấy ý kiến của mình được tôn trọng tuyệt đối và được lắng nghe lập tức.",
      ],
      kpi: [
        "Nâng tỷ lệ phản hồi khảo sát (Response Rate) từ 3% lên trên 35%.",
        "Liên hệ giải quyết thành công ≥ 90% các phản hồi tiêu cực trong vòng 60 phút.",
        "Nâng điểm CSAT tổng thể toàn công ty lên ≥ 94% và NPS đạt ≥ 68 điểm.",
      ],
    },
    solutions: {
      modelOverview:
        "Hệ sinh thái Khảo sát 4 Tầng: Khảo sát Vi mô Tự động (Micro-Surveys) ➔ Phân tích Ngữ nghĩa Tự do (Verbatim Analytics) ➔ Quy trình Cứu vãn Detractor Tức thời ➔ Tinh chỉnh Quy trình Vận hành.",
      imageUrl: "https://i.ibb.co/wFmLP6wQ/3-3-Kh-o-s-t-nh-gi-kh-ch-h-ng.png",
      cards: [
        {
          name: "01 · Micro-Survey Automation (1-Click)",
          purpose: "Tối đa hóa tỷ lệ phản hồi bằng trải nghiệm khảo sát siêu tiện lợi.",
          implementation:
            "Ngay khi kết thúc tương tác, hệ thống tự động đẩy lời mời khảo sát 1 câu hỏi duy nhất với biểu tượng cảm xúc (Emoji/Sao) qua SMS, Zalo ZNS hoặc Pop-up in-app.",
          value: "Khách hàng chỉ mất 2 giây để chấm điểm, tỷ lệ phản hồi tăng gấp 10 lần.",
          iconName: "Star",
        },
        {
          name: "02 · CSAT - NPS - CES Multi-Metric Matrix",
          purpose: "Đo lường đa chiều từ độ hài lòng tức thời đến lòng trung thành dài hạn.",
          implementation:
            "Áp dụng CSAT (Sau hỗ trợ kỹ thuật), CES (Sau quy trình đăng ký/thanh toán) và NPS (Định kỳ 90 ngày cho toàn bộ người dùng active).",
          value: "Hiểu rõ chính xác khách hàng đang gặp khó khăn ở khâu nào trong hành trình.",
          iconName: "BarChart",
        },
        {
          name: "03 · Realtime Detractor Alarm & Recovery",
          purpose: "Cứu vãn khách hàng bức xúc ngay khi họ vừa chấm điểm xấu.",
          implementation:
            "Khi có điểm 1-2 sao hoặc NPS 0-6: Hệ thống tự động tạo ticket VIP khẩn cấp gửi thẳng tới Trưởng ca trực. Quản lý gọi lại lắng nghe, xin lỗi chân thành và giải quyết triệt để trong 60 phút.",
          value: "Hóa giải 85% trường hợp khách hàng giận dữ thành người ủng hộ thương hiệu.",
          iconName: "ShieldCheck",
        },
        {
          name: "04 · Verbatim AI Text Analytics",
          purpose: "Khai phá insight giá trị từ hàng ngàn lời bình luận tự do.",
          implementation:
            "Sử dụng AI phân tích từ khóa và sắc thái tình cảm trong ô ghi chú góp ý tự do để gom nhóm các chủ đề nóng (VD: 'App lag', 'Phí cao', 'Nhân viên nhiệt tình').",
          value: "Tìm ra chính xác nguyên nhân gốc rễ đằng sau các con số điểm số khô khan.",
          iconName: "MessageSquare",
        },
      ],
    },
    implementation: [
      "Thiết kế bộ câu hỏi chuẩn mực cho từng chỉ số CSAT, NPS và CES",
      "Lập trình tích hợp Webhook gửi khảo sát tự động trên các kênh Tổng đài, Chat, App",
      "Thiết lập luồng tự động tạo ticket nóng khi có phản hồi tiêu cực trên CRM",
      "Huấn luyện quy trình 'Detractor Recovery Playbook' cho đội ngũ Quản lý và Team Lead",
      "Xây dựng Dashboard theo dõi điểm số theo thời gian thực và phân tích xu hướng",
      "Tổ chức cuộc họp đánh giá phản hồi hàng tuần để đưa ra các cải tiến quy trình thực tế",
    ],
    roleAndContribution: {
      role: "Trưởng Nhóm / Trưởng Phòng CSKH (CX Research Lead)",
      responsibilities: [
        "Thiết kế toàn bộ phương pháp luận và hạ tầng khảo sát ý kiến khách hàng.",
        "Chỉ đạo thực thi quy trình cứu vãn khách hàng không hài lòng trên diện rộng.",
        "Phân tích dữ liệu khảo sát và kiến nghị các giải pháp điều chỉnh quy trình vận hành toàn công ty.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Customer Satisfaction (CSAT)",
        "Net Promoter Score (NPS)",
        "Customer Effort Score (CES)",
        "Closed-Loop Feedback Strategy",
      ],
      toolsList: [
        "Automated Survey Trigger Engine",
        "Zalo ZNS / SMS Feedback Gateway",
        "Sentiment & Text Mining Analytics",
      ],
    },
    results: {
      operational: [
        "Thu thập thành công hơn 50,000 lượt phản hồi khảo sát mỗi tháng với tỷ lệ phản hồi đạt 38.5%.",
        "100% phản hồi tiêu cực được xử lý trong vòng 60 phút.",
      ],
      customer: [
        "Khách hàng vô cùng ấn tượng khi thấy ý kiến đánh giá của mình lập tức được lãnh đạo lắng nghe và giải quyết.",
      ],
      business: [
        "Tăng 22% tỷ lệ giữ chân khách hàng nhờ cứu vãn kịp thời các khách hàng gặp sự cố.",
      ],
      kpiBeforeAfter: [
        "Tỷ lệ phản hồi khảo sát (Response Rate): 2.8% ➔ 38.5%",
        "CSAT Score: 79% ➔ 95.2%",
        "Net Promoter Score (NPS): +28 ➔ +71",
        "Tỷ lệ cứu vãn Detractor thành công: 15% ➔ 86%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Cảm nhận rõ rệt quyền lực và tiếng nói của mình luôn được doanh nghiệp tôn trọng và hành động ngay lập tức.",
      businessValue:
        "Bảo vệ uy tín thương hiệu, ngăn chặn làn sóng tẩy chay và gia tăng lòng trung thành bền vững.",
      organizationValue:
        "Hình thành văn hóa lắng nghe thực chất, không ngại đối diện với sự thật để hoàn thiện mỗi ngày.",
      lessons: [
        "Khảo sát mà không có hành động khắc phục đi kèm còn tệ hơn là không khảo sát.",
        "Nội dung lời bình luận tự do (Verbatim) luôn chứa đựng giá trị cải tiến gấp 10 lần điểm số định lượng.",
      ],
      nextSteps: [
        "Ứng dụng AI phân tích giọng điệu thời gian thực trong cuộc gọi để đánh giá độ hài lòng ngay khi đang đàm thoại mà không cần gửi khảo sát.",
      ],
    },
  },

  "3.4 · Xây dựng trợ lý ảo chăm sóc khách hàng": {
    summary:
      "Nghiên cứu, phát triển và triển khai Trợ lý Ảo AI Thông minh (Generative AI Chatbot & Voicebot) tích hợp công nghệ Xử lý Ngôn ngữ Tự nhiên (NLP), cơ chế RAG (Retrieval-Augmented Generation) tra cứu tri thức chuẩn xác và luồng Chuyển giao Thông minh cho Con người (Smart Human Handoff), giúp giải quyết tự động 24/7 hơn 65% các câu hỏi thường gặp với thời gian phản hồi dưới 1 giây.",
    context: {
      currentStatus:
        "Khách hàng liên hệ với tần suất rất cao vào ban đêm, cuối tuần và các đợt khuyến mãi lớn khiến tổng đài quá tải, khách hàng phải chờ đợi lâu để được giải đáp các câu hỏi đơn giản, quen thuộc.",
      cause:
        "Chưa có kênh tự phục vụ thông minh hoạt động 24/7, chatbot thế hệ cũ hoạt động theo cây menu cứng nhắc (Button-based) thường xuyên trả lời sai hoặc 'Xin lỗi tôi không hiểu'.",
      needForChange:
        "Xây dựng Trợ lý Ảo AI thế hệ mới có khả năng hiểu ngữ cảnh tự nhiên, trả lời chính xác, thân thiện và liền mạch kết nối với nhân viên tư vấn khi cần thiết.",
    },
    problems: [
      {
        problem: "Chatbot cũ cứng nhắc làm tăng sự ức chế của người dùng",
        cause:
          "Bot chỉ nhận diện đúng từ khóa cố định, không hiểu được từ ngữ tiếng Việt địa phương, viết tắt hay sai chính tả.",
        impact:
          "Khách hàng bấm thoát bot và yêu cầu gặp nhân viên ngay lập tức, tỷ lệ tự giải quyết (Containment Rate) chỉ đạt dưới 10%.",
      },
      {
        problem: "Mất ngữ cảnh khi chuyển tiếp từ Bot sang Nhân viên",
        cause:
          "Khi Bot chuyển cuộc trò chuyện sang Agent, Agent không nhận được lịch sử trao đổi trước đó và bắt khách hàng gõ lại từ đầu.",
        impact:
          "Thời gian xử lý kéo dài gấp đôi và trải nghiệm khách hàng bị đứt gãy.",
      },
    ],
    objectives: {
      strategic: [
        "Đưa Trí tuệ Nhân tạo (AI) trở thành kênh tiếp xúc đầu tiên (First Line of Defense) tin cậy, thông minh và thân thiện của doanh nghiệp.",
        "Giảm áp lực khối lượng công việc cho đội ngũ nhân sự tuyến đầu, tối ưu hóa mạnh mẽ chi phí vận hành 24/7.",
      ],
      operational: [
        "Xây dựng cơ sở tri thức số (Knowledge Base) với hơn 500+ chủ đề nghiệp vụ được chuẩn hóa định dạng Q&A.",
        "Thiết kế cơ chế Smart Human Handoff chuyển tiếp mượt mà kèm tóm tắt tóm lược ngữ cảnh cho Agent.",
      ],
      customer: [
        "Phục vụ khách hàng ngay lập tức (Zero-waiting time) 24/7/365 trên mọi nền tảng số.",
      ],
      kpi: [
        "Tỷ lệ Bot tự động giải quyết thành công không cần can thiệp của con người (Bot Containment Rate): ≥ 65%.",
        "Thời gian phản hồi câu hỏi (Bot Response Time): ≤ 1.5 giây.",
        "Độ chính xác câu trả lời (Bot Accuracy Rate): ≥ 95%.",
      ],
    },
    solutions: {
      modelOverview:
        "Kiến trúc Trợ lý AI 4 Lớp: Nhận diện Ý định Đa ngôn ngữ (NLU/NLP) ➔ Tra cứu Tri thức Chuẩn xác (RAG & Knowledge Base) ➔ Tích hợp Nghiệp vụ Giao dịch (Transactional API) ➔ Chuyển giao Ngữ cảnh Thông minh (Smart Agent Handoff).",
      imageUrl: "https://i.postimg.cc/pTCsXBmh/8-X-y-d-ng-Al-Bot.jpg",
      cards: [
        {
          name: "01 · Advanced Natural Language Processing (NLP)",
          purpose: "Hiểu sâu sắc ngôn ngữ tự nhiên, tiếng lóng, viết tắt và lỗi chính tả tiếng Việt.",
          implementation:
            "Huấn luyện mô hình ngôn ngữ với hơn 100,000 mẫu câu thực tế từ các cuộc chat cũ. Nhận diện chính xác Ý định (Intent) và Thực thể (Entities) trong câu nói của người dùng.",
          value: "Giao tiếp tự nhiên, mượt mà như một chuyên viên tư vấn tận tâm thực thụ.",
          iconName: "Sparkles",
        },
        {
          name: "02 · Enterprise RAG Knowledge Retrieval",
          purpose: "Cung cấp câu trả lời chính xác tuyệt đối, triệt tiêu hoàn toàn hiện tượng 'ảo giác' (Hallucination).",
          implementation:
            "Tích hợp công nghệ RAG (Retrieval-Augmented Generation) tra cứu trực tiếp từ kho tài liệu chính sách và hướng dẫn sử dụng đã được kiểm duyệt của công ty.",
          value: "Đảm bảo 100% thông tin cung cấp cho khách hàng luôn đúng chính sách và cập nhật mới nhất.",
          iconName: "ShieldCheck",
        },
        {
          name: "03 · Transactional Action Bot (Tra cứu & Thao tác)",
          purpose: "Không chỉ trả lời lý thuyết, Bot có thể trực tiếp thực thi các tác vụ cho khách hàng.",
          implementation:
            "Kết nối API xác thực OTP: Bot có thể trực tiếp tra cứu số dư, kiểm tra lộ trình đơn hàng, khóa thẻ tạm thời hoặc kích hoạt mã khuyến mại ngay trong khung chat.",
          value: "Khách hàng tự giải quyết xong việc trong 15 giây mà không cần nhân viên hỗ trợ.",
          iconName: "Zap",
        },
        {
          name: "04 · Seamless Human Handoff & Auto-Summary",
          purpose: "Chuyển giao êm đẹp cho nhân viên khi gặp câu hỏi phức tạp hoặc khách hàng yêu cầu.",
          implementation:
            "Khi Bot phát hiện cảm xúc khách hàng giận dữ hoặc vượt ngoài tri thức, hệ thống chuyển cuộc chat sang Agent phù hợp kèm 3 dòng tóm tắt vấn đề được AI tạo tự động.",
          value: "Agent tiếp quản ngay lập tức theo đúng ngữ cảnh, không bắt khách hàng lặp lại.",
          iconName: "Users",
        },
      ],
    },
    implementation: [
      "Tổng hợp và làm sạch dữ liệu lịch sử hơn 200,000 cuộc trò chuyện của khách hàng",
      "Xây dựng bộ từ điển tri thức nghiệp vụ và kịch bản đối thoại (Conversation Flow)",
      "Lập trình tích hợp AI Bot vào website, ứng dụng di động và Zalo/Facebook Fanpage",
      "Thiết lập các cổng API xác thực tài khoản và tra cứu giao dịch tự động",
      "Tiến hành thử nghiệm nội bộ (Alpha/Beta Testing) với hơn 5,000 tình huống giả định",
      "Đưa vào vận hành chính thức, theo dõi tỷ lệ hiểu đúng và liên tục huấn luyện bot hàng tuần",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / AI Chatbot Project Lead",
      responsibilities: [
        "Chủ trì toàn diện đề án ứng dụng Trí tuệ Nhân tạo vào hệ sinh thái Dịch vụ Khách hàng.",
        "Thiết kế cấu trúc kịch bản hội thoại (Tone of Voice) và tiêu chuẩn chất lượng của Bot.",
        "Quản lý đội ngũ Huấn luyện viên AI (AI Trainers) hiệu chuẩn và nâng cấp tri thức liên tục.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Natural Language Understanding (NLU)",
        "Retrieval-Augmented Generation (RAG)",
        "Conversation Design (CxD)",
        "Human-in-the-loop (HITL)",
      ],
      toolsList: [
        "Google Dialogflow / Rasa / Generative AI Studio",
        "Vector Database & Embeddings",
        "Omnichannel Livechat Routing Platform",
      ],
    },
    results: {
      operational: [
        "AI Bot tự động xử lý thành công hơn 180,000 lượt yêu cầu mỗi tháng mà không cần can thiệp của nhân sự.",
        "Giảm 60% khối lượng tin nhắn dồn về đội ngũ nhân viên tư vấn.",
      ],
      customer: [
        "Khách hàng nhận được câu trả lời tức thì 24/7 trong 1 giây, kể cả vào lúc 2 giờ sáng.",
      ],
      business: [
        "Tiết kiệm hơn 40% chi phí vận hành ca đêm và chi phí nhân sự tổng đài.",
      ],
      kpiBeforeAfter: [
        "Bot Containment Rate (Tự giải quyết): 8% ➔ 68.5%",
        "Thời gian phản hồi đầu tiên (FRT): 4 phút ➔ 1.2 giây",
        "CSAT Đánh giá Trợ lý Ảo AI: 65% ➔ 92.4%",
        "Chi phí phục vụ trên mỗi cuộc chat: Giảm 62%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Tận hưởng dịch vụ hỗ trợ siêu tốc, tức thời mọi lúc mọi nơi mà không bao giờ phải xếp hàng chờ máy.",
      businessValue:
        "Mở rộng năng lực phục vụ không giới hạn vào các đợt cao điểm mà không phải tuyển dụng ồ ạt nhân sự thời vụ.",
      organizationValue:
        "Khẳng định vị thế tiên phong của doanh nghiệp trong ứng dụng công nghệ Trí tuệ Nhân tạo hiện đại.",
      lessons: [
        "AI không thể thay thế hoàn toàn con người; sự kết hợp nhịp nhàng giữa AI và chuyên viên thấu cảm mới tạo ra trải nghiệm đỉnh cao.",
        "Cơ sở tri thức (Knowledge Base) chuẩn xác và cập nhật liên tục là linh hồn quyết định sự thông minh của Bot.",
      ],
      nextSteps: [
        "Triển khai AI Voicebot tự động nhận và thực hiện cuộc gọi thoại với giọng đọc cảm xúc như người thật.",
      ],
    },
  },
};
