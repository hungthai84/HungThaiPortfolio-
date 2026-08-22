import { CaseStudy } from "../projectsData";

export const group2CaseStudies: Record<string, CaseStudy> = {
  "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng": {
    summary:
      "Kiến trúc và chuẩn hóa toàn bộ hệ thống Quy trình Vận hành Chuẩn (SOP - Standard Operating Procedures) từ tiếp nhận, xử lý, phối hợp đa phòng ban đến đóng hồ sơ khiếu nại, kết hợp ma trận phân tầng xử lý 3 cấp (Tier 1-2-3) và bộ tiêu chí kiểm soát chất lượng (QA Rubric) nghiêm ngặt.",
    context: {
      currentStatus:
        "Nhân sự hỗ trợ xử lý theo kinh nghiệm cá nhân ('mỗi người một phách'), thiếu tài liệu hướng dẫn chuẩn mực, dẫn đến cùng một vấn đề nhưng khách hàng nhận được câu trả lời khác nhau tùy vào người tiếp nhận.",
      cause:
        "Quy trình vận hành truyền miệng, chưa được văn bản hóa thành sơ đồ trực quan (Workflow Diagram) và chưa có cam kết thời gian xử lý (SLA/OLA) liên phòng ban.",
      needForChange:
        "Xây dựng thư viện SOP toàn diện, đồng nhất chất lượng phục vụ trên mọi ca trực và rút ngắn tối đa thời gian đào tạo nhân sự mới.",
    },
    problems: [
      {
        problem: "Chất lượng giải đáp không đồng đều và hay sai sót",
        cause:
          "Agent không có tài liệu tra cứu nhanh (Quick Reference Guide), phải ghi nhớ máy móc hàng trăm chính sách phức tạp.",
        impact:
          "Tỷ lệ giải đáp sai chính sách lên đến 15%, khách hàng bức xúc và phát sinh khiếu nại chéo.",
      },
      {
        problem: "Khiếu nại bị tắc nghẽn giữa các phòng ban liên quan",
        cause:
          "Thiếu thỏa thuận mức độ dịch vụ nội bộ (OLA - Operational Level Agreement) giữa CSKH, Kế toán, Kỹ thuật và Vận hành.",
        impact:
          "Hồ sơ chuyển giao bị ngâm nhiều ngày, không ai chịu trách nhiệm chính về thời hạn phản hồi khách hàng.",
      },
    ],
    objectives: {
      strategic: [
        "Chuẩn hóa 100% hoạt động vận hành CSKH theo tiêu chuẩn chất lượng quốc tế.",
        "Thiết lập cơ chế phối hợp liên phòng ban minh bạch và có trách nhiệm giải trình cao.",
      ],
      operational: [
        "Biên soạn và ban hành trọn bộ 50+ tài liệu SOP chi tiết cho toàn bộ nghiệp vụ.",
        "Phân định rõ ràng ma trận phân cấp hỗ trợ 3 tầng (Tier 1 Frontline ➔ Tier 2 Specialist ➔ Tier 3 Tech/Product).",
      ],
      customer: [
        "Đảm bảo khách hàng nhận được thông tin chính xác, nhất quán 100% bất kể tiếp xúc với nhân sự nào.",
      ],
      kpi: [
        "Tăng tỷ lệ giải quyết ngay trong lần liên hệ đầu (FCR) từ 65% lên 88%.",
        "Giảm 60% thời gian xử lý khiếu nại chuyển tiếp liên phòng ban.",
        "Nâng điểm chất lượng QA Score toàn đội ngũ lên ≥ 92%.",
      ],
    },
    solutions: {
      modelOverview:
        "Khung Kiến trúc Quy trình 4 Cấp: Thư viện SOP Trực quan ➔ Ma trận Phân tầng Tiếp nhận (Tier 1-2-3) ➔ Cam kết OLA/SLA Liên phòng ban ➔ Hệ thống Kiểm soát Chất lượng QA Khép kín.",
      imageUrl: "https://i.ibb.co/F4TQSP1H/2-1-Chu-n-h-a-quy-tr-nh-CSKH.png",
      cards: [
        {
          name: "01 · Visual SOP & Flowchart Library",
          purpose: "Trực quan hóa từng bước xử lý để nhân viên tra cứu nhanh trong 5 giây.",
          implementation:
            "Chuyển đổi toàn bộ tài liệu chữ dài dòng thành sơ đồ luồng (Flowchart) kèm kịch bản mẫu (Script) và bộ câu hỏi phân loại tình huống nhanh.",
          value: "Rút ngắn 70% thời gian tìm kiếm thông tin của Agent trong lúc đàm thoại.",
          iconName: "FileText",
        },
        {
          name: "02 · 3-Tier Escalation Framework",
          purpose: "Định tuyến chính xác hồ sơ đến đúng người có thẩm quyền giải quyết.",
          implementation:
            "Tier 1 (Agent): Giải quyết 80% yêu cầu cơ bản trong 3 phút; Tier 2 (SME/Lead): Xử lý case phức tạp, tranh chấp trong 2 giờ; Tier 3 (Tech/Product/Pháp chế): Xử lý lỗi hệ thống trong 24 giờ.",
          value: "Giảm tải cho chuyên gia cấp cao, tập trung nguồn lực đúng chỗ.",
          iconName: "Network",
        },
        {
          name: "03 · Inter-departmental OLA & SLA",
          purpose: "Xác lập kỷ luật phối hợp nghiêm ngặt giữa các phòng ban.",
          implementation:
            "Ký kết cam kết OLA (Operational Level Agreement): Kế toán tra soát hoàn tiền trong 4h, Tech phản hồi lỗi trong 2h, Kho vận cập nhật trạng thái đơn trong 1h. Ticket tự động kích hoạt cảnh báo đỏ khi chạm 80% thời hạn SLA.",
          value: "Xóa bỏ tình trạng đùn đẩy trách nhiệm, tăng tốc độ xử lý tổng thể.",
          iconName: "Clock",
        },
        {
          name: "04 · 360-degree Quality Assurance (QA)",
          purpose: "Đánh giá, hiệu chuẩn và cải tiến liên tục kỹ năng thực thi của đội ngũ.",
          implementation:
            "Xây dựng bảng tiêu chuẩn chấm điểm QA 100 điểm với 4 nhóm tiêu chí: Kỹ năng lắng nghe/thấu cảm (30%), Độ chính xác nghiệp vụ (40%), Tuân thủ quy trình & bảo mật (20%), Tác phong chuyên nghiệp (10%).",
          value: "Phát hiện lỗ hổng kỹ năng để đào tạo bù đắp kịp thời.",
          iconName: "ShieldCheck",
        },
      ],
    },
    implementation: [
      "Kiểm toán toàn diện hiện trạng vận hành và lập danh mục toàn bộ điểm nghẽn nghiệp vụ",
      "Thành lập ban soạn thảo SOP và phối hợp với các phòng ban liên quan chuẩn hóa nội dung",
      "Vẽ sơ đồ luồng quy trình (Flowcharts) và xuất bản lên cổng thông tin nội bộ (Wiki/Notion/Confluence)",
      "Ký kết thỏa thuận cam kết OLA giữa Trưởng phòng CSKH và các Trưởng bộ phận đối tác",
      "Tổ chức đào tạo chuyển giao 100% SOP mới và kiểm tra sát hạch bắt buộc",
      "Đưa bộ tiêu chí QA vào vận hành, tổ chức phiên hiệu chuẩn chất lượng (Calibration) định kỳ hàng tuần",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Process Architecture Lead",
      responsibilities: [
        "Kiến trúc toàn bộ hệ thống SOP và khung phân tầng xử lý của tổ chức.",
        "Trực tiếp đàm phán và thiết lập các cam kết OLA với lãnh đạo các phòng ban đối tác.",
        "Xây dựng bộ chuẩn mực QA và chủ trì các phiên hiệu chuẩn chất lượng định kỳ.",
      ],
    },
    systemsAndTools: {
      methods: [
        "SOP Standard Operating Procedures",
        "3-Tier Escalation Model",
        "Operational Level Agreement (OLA)",
        "QA Calibration Rubric",
      ],
      toolsList: [
        "Lucidchart / Miro Process Flow",
        "Confluence / Notion Knowledge Wiki",
        "Scorebuddy / QA CRM Module",
      ],
    },
    results: {
      operational: [
        "100% nghiệp vụ được văn bản hóa và chuẩn hóa sơ đồ luồng tra cứu tức thì.",
        "Thời gian đào tạo nhân viên mới (Ramp-up Time) rút ngắn từ 4 tuần xuống còn 10 ngày.",
      ],
      customer: [
        "Tỷ lệ khiếu nại về thông tin sai lệch giảm 85%.",
        "Khách hàng cảm nhận được sự chuyên nghiệp, chuẩn xác và nhất quán vượt trội.",
      ],
      hr: [
        "Nhân viên tự tin tác nghiệp, giảm 50% áp lực tâm lý khi gặp ca khó.",
      ],
      business: [
        "Tối ưu năng suất phục vụ toàn phòng ban tăng 35% mà không cần bổ sung thêm nhân sự.",
      ],
      kpiBeforeAfter: [
        "First Contact Resolution (FCR): 65% ➔ 88%",
        "Average Handling Time (AHT): 360s ➔ 210s",
        "QA Quality Score trung bình: 76% ➔ 94.5%",
        "SLA Tuân thủ thời hạn giải quyết: 72% ➔ 97.8%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Luôn nhận được câu trả lời chính xác, thỏa đáng và được giải quyết dứt điểm ngay từ lần liên hệ đầu tiên.",
      businessValue:
        "Xây dựng hệ thống vận hành có tính chuyển giao cao, không phụ thuộc vào cá nhân đơn lẻ.",
      organizationValue:
        "Tạo dựng tác phong làm việc chuẩn mực, chuyên nghiệp và có tính kỷ luật cao.",
      lessons: [
        "Quy trình sinh ra để phục vụ con người và khách hàng, không phải để làm rào cản hành chính.",
        "SOP phải luôn là tài liệu sống (Living Document) được cập nhật liên tục theo thực tế biến đổi.",
      ],
      nextSteps: [
        "Tích hợp trợ lý AI gợi ý SOP tự động theo thời gian thực dựa trên giọng nói và ngữ cảnh cuộc gọi.",
      ],
    },
  },

  "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng": {
    summary:
      "Chuyển đổi từ mô hình hỗ trợ đa kênh phân mảnh (Multi-Channel) sang Hợp nhất Đa kênh Toàn diện (True Omni-Channel Support Platform), đồng bộ dữ liệu lịch sử tương tác trên Hotline, Livechat, Email, Facebook Fanpage, Zalo OA và In-app Support vào một giao diện làm việc duy nhất (Single Agent Workspace).",
    context: {
      currentStatus:
        "Khách hàng liên hệ qua nhiều kênh khác nhau (gọi tổng đài, nhắn tin Facebook, gửi email) nhưng mỗi kênh lại nằm ở một phần mềm riêng biệt, nhân viên phải mở 5-6 tab trình duyệt cùng lúc.",
      cause:
        "Hệ thống công nghệ chắp vá, các kênh không được tích hợp chung về một nền tảng quản lý ticket tập trung.",
      needForChange:
        "Hợp nhất toàn bộ kênh tiếp nhận về một điểm quản trị duy nhất, giúp nhân viên nắm trọn bức tranh khách hàng và tối ưu hóa thời gian phản hồi.",
    },
    problems: [
      {
        problem: "Mất dấu lịch sử tương tác khi khách hàng đổi kênh",
        cause:
          "Dữ liệu kênh Chat không liên thông với kênh Thoại và Email.",
        impact:
          "Khách hàng vừa gọi điện xong lại phải nhắn tin giải thích lại từ đầu trên Facebook, gây ức chế tột độ.",
      },
      {
        problem: "Phân bổ nhân sự lệch pha và lãng phí nguồn lực",
        cause:
          "Kênh hotline quá tải trong khi kênh chat rảnh rỗi nhưng không thể linh hoạt luân chuyển nhân sự hỗ trợ chéo.",
        impact:
          "Tỷ lệ cuộc gọi nhỡ (Abandonment Rate) tăng vọt trên 12%, thời gian chờ tin nhắn chat kéo dài.",
      },
    ],
    objectives: {
      strategic: [
        "Kiến tạo trải nghiệm liền mạch không gián đoạn (Seamless Omni-Channel Experience) cho khách hàng trên mọi điểm chạm số.",
        "Tối ưu hóa tổng chi phí vận hành kênh liên lạc (Contact Channel Optimization).",
      ],
      operational: [
        "Triển khai nền tảng Omni-channel hợp nhất 100% kênh Hotline, Chat, Email, Social Media về 1 màn hình duy nhất.",
        "Ứng dụng cơ chế định tuyến thông minh dựa trên kỹ năng (Skills-Based Routing & Blended Agent).",
      ],
      customer: [
        "Cho phép khách hàng chuyển đổi linh hoạt giữa các kênh mà không bao giờ phải nhắc lại thông tin cũ.",
      ],
      kpi: [
        "Rút ngắn thời gian phản hồi đầu tiên kênh Chat/Social (FRT) xuống dưới 30 giây.",
        "Giảm tỷ lệ cuộc gọi nhỡ (Abandonment Rate) xuống dưới 3%.",
        "Tăng năng suất xử lý đồng thời của Agent lên gấp 2.5 lần.",
      ],
    },
    solutions: {
      modelOverview:
        "Hệ sinh thái Omni-Channel 4 Trụ cột: Nền tảng Hợp nhất Single Workspace ➔ Định tuyến Thông minh Đa kỹ năng (Skills-Based Routing) ➔ Đồng bộ Lịch sử 360 Độ ➔ Tối ưu Hóa Cơ cấu Kênh (Channel Shift Strategy).",
      imageUrl: "https://i.ibb.co/hFBv9tcX/2-2-T-i-u-h-a-k-nh-h-tr.png",
      cards: [
        {
          name: "01 · Single Agent Workspace",
          purpose: "Xóa bỏ việc chuyển đổi qua lại giữa nhiều ứng dụng.",
          implementation:
            "Tích hợp API tổng đài VoIP, Zalo OA, Facebook Messenger, Livechat Web/App và Email về một màn hình làm việc duy nhất. Agent chỉ cần đăng nhập 1 nơi để nhận mọi yêu cầu.",
          value: "Tiết kiệm 20% thời gian thao tác vô ích của nhân sự.",
          iconName: "Layers",
        },
        {
          name: "02 · Skills-Based & Blended Routing",
          purpose: "Tự động phân bổ đúng việc cho đúng người vào đúng thời điểm.",
          implementation:
            "Thuật toán phân luồng tự động: Agent có thể vừa trả lời 3 cuộc chat vừa sẵn sàng nhận cuộc gọi ưu tiên khi hàng đợi hotline tăng cao. Khách VIP tự động kết nối thẳng tới Agent cao cấp.",
          value: "Cân bằng tải hoàn hảo, triệt tiêu tình trạng 'nơi thừa nơi thiếu'.",
          iconName: "Network",
        },
        {
          name: "03 · Unified Customer Profile",
          purpose: "Hiển thị tức thời toàn bộ hành trình tương tác của khách hàng.",
          implementation:
            "Khi có cuộc gọi hoặc tin nhắn đến, màn hình pop-up lập tức hiện thông tin: Họ tên, lịch sử đơn hàng, điểm thành viên, các ticket đã tạo trên mọi kênh trước đó kèm ghi chú của Agent trước.",
          value: "Agent chào đón thân thiện theo đúng ngữ cảnh, không hỏi lại câu thừa.",
          iconName: "Users",
        },
        {
          name: "04 · Channel Shift Strategy (Dịch chuyển Kênh)",
          purpose: "Điều hướng khách hàng từ kênh đắt đỏ sang kênh số tiện lợi và tiết kiệm.",
          implementation:
            "Tích hợp Visual IVR và nút 'Chat ngay' trên website/app để khuyến khích khách hàng sử dụng Livechat và Zalo thay vì gọi Hotline truyền thống.",
          value: "Giảm 35% chi phí cước viễn thông đắt đỏ cho doanh nghiệp.",
          iconName: "TrendingUp",
        },
      ],
    },
    implementation: [
      "Khảo sát lưu lượng và chi phí vận hành từng kênh tiếp nhận hiện hữu",
      "Lựa chọn và cấu hình nền tảng Omnichannel Contact Center hiện đại",
      "Thiết lập kết nối API với Tổng đài ảo, Facebook Graph API, Zalo OA và Email Server",
      "Xây dựng ma trận phân quyền kỹ năng (Skill Matrix) và quy tắc định tuyến tự động",
      "Tổ chức huấn luyện kỹ năng 'Blended Agent' (vừa chat vừa nghe thoại chuyên nghiệp)",
      "Triển khai chiến dịch điều hướng người dùng sang kênh chat tự phục vụ",
    ],
    roleAndContribution: {
      role: "Trưởng Nhóm / Trưởng Phòng CSKH (Omni-Channel Lead)",
      responsibilities: [
        "Chỉ đạo đề án chuyển đổi số hợp nhất hệ thống hỗ trợ đa kênh toàn diện.",
        "Thiết kế kiến trúc định tuyến và tối ưu hóa chi phí vận hành các kênh liên lạc.",
        "Đào tạo và chuyển đổi tư duy làm việc của đội ngũ sang mô hình Blended Contact Center.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Omni-Channel Architecture",
        "Skills-based Routing",
        "Channel Shift Optimization",
        "Customer 360-degree Context",
      ],
      toolsList: [
        "Zendesk / Freshdesk Omni Suite",
        "Stringee / Cloud Contact Center VoIP",
        "Meta & Zalo Developers API Hub",
      ],
    },
    results: {
      operational: [
        "100% kênh liên lạc được hợp nhất về 1 màn hình duy nhất, không còn sót lọt bất kỳ tin nhắn nào.",
        "Năng suất tiếp nhận yêu cầu của mỗi nhân sự tăng 140%.",
      ],
      customer: [
        "Khách hàng vô cùng hài lòng khi có thể liên hệ qua bất kỳ kênh nào tiện nhất mà vẫn được xử lý thông suốt.",
      ],
      business: [
        "Tiết kiệm 30% tổng chi phí viễn thông và vận hành hàng tháng nhờ chiến lược dịch chuyển kênh thông minh.",
      ],
      kpiBeforeAfter: [
        "First Response Time (FRT) Chat/Social: 8 phút ➔ 25 giây",
        "Tỷ lệ cuộc gọi nhỡ (Call Abandonment Rate): 14% ➔ 2.1%",
        "Số lượng ticket xử lý/Agent/ngày: 45 ➔ 110",
        "CSAT Kênh Chat & Social: 78% ➔ 95.8%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Trải nghiệm tiện lợi vượt bậc, tự do lựa chọn kênh giao tiếp yêu thích với tốc độ phản hồi chớp nhoáng.",
      businessValue:
        "Tối ưu hóa chi phí trên mỗi lượt tương tác (Cost per Contact) và nâng cao hiệu quả khai thác tài nguyên nhân sự.",
      organizationValue:
        "Xây dựng nền tảng công nghệ hỗ trợ khách hàng hiện đại, bắt kịp xu thế chuyển đổi số toàn cầu.",
      lessons: [
        "Omni-channel thực sự không chỉ là có nhiều kênh, mà là sự đồng nhất dữ liệu hoàn hảo giữa các kênh.",
        "Trang bị công cụ tốt giúp nhân viên giảm 50% thao tác thừa và tập trung trọn vẹn vào khách hàng.",
      ],
      nextSteps: [
        "Ứng dụng AI Bot đồng hành hỗ trợ soạn câu trả lời mẫu thông minh theo ngữ cảnh (Agent Copilot).",
      ],
    },
  },

  "2.3 · Tự động hóa quy trình chăm sóc khách hàng": {
    summary:
      "Triển khai chiến lược Tự động hóa Quy trình Thông minh (Intelligent Process Automation - IPA & RPA), giải phóng nhân viên khỏi 80% thao tác thủ công lặp lại, tự động hóa luồng phân loại ticket, cập nhật trạng thái đơn, đối soát hoàn tiền và kích hoạt thông báo chăm sóc khách hàng tức thời.",
    context: {
      currentStatus:
        "Hơn 40% thời gian của nhân viên bị lãng phí vào các thao tác 'copy - paste' dữ liệu giữa các phần mềm, tạo ticket thủ công và gửi email thông báo theo mẫu có sẵn.",
      cause:
        "Hệ thống vận hành chưa có các luồng Webhook, Trigger tự động và thiếu tích hợp RPA (Robotic Process Automation) giữa các phần mềm kế thừa (Legacy Systems).",
      needForChange:
        "Số hóa và tự động hóa toàn bộ các tác vụ lặp lại để giảm thiểu sai sót do con người, đẩy nhanh tốc độ phục vụ và tập trung nhân lực vào các case phức tạp đòi hỏi sự thấu cảm.",
    },
    problems: [
      {
        problem: "Chậm trễ trong xử lý các tác vụ lặp lại đơn giản",
        cause:
          "Khách hàng yêu cầu hủy đơn, mở khóa tài khoản hoặc tra soát phải chờ duyệt thủ công qua 3 cấp.",
        impact:
          "Thời gian chờ kéo dài từ 24h đến 48h cho những tác vụ hoàn toàn có thể tự động hóa trong 3 giây.",
      },
      {
        problem: "Sai sót dữ liệu do nhập liệu thủ công bằng tay",
        cause:
          "Agent gõ lại số tài khoản, mã đơn hàng từ file chat sang hệ thống kế toán.",
        impact:
          "Chuyển nhầm tiền, cập nhật sai trạng thái, gây thiệt hại tài chính và khiếu nại phát sinh.",
      },
    ],
    objectives: {
      strategic: [
        "Đưa công nghệ tự động hóa trở thành đòn bẩy đột phá năng suất và tối ưu hóa chi phí vận hành (Cost-to-Serve).",
        "Xây dựng hệ thống CSKH vận hành thông minh không phụ thuộc vào thao tác cơ học của con người.",
      ],
      operational: [
        "Tự động hóa 100% các luồng: Phân loại ticket, gán nhãn, phân bổ nhân sự, gửi email xác nhận và đóng ticket tự động.",
        "Triển khai RPA bot tự động đối soát và kích hoạt hoàn tiền tức thì cho các đơn lỗi đủ điều kiện.",
      ],
      customer: [
        "Cung cấp trải nghiệm hỗ trợ tức thì (Zero-wait time) cho các yêu cầu nghiệp vụ chuẩn.",
      ],
      kpi: [
        "Tự động hóa hoàn toàn ≥ 65% các tác vụ vận hành lặp lại.",
        "Rút ngắn thời gian xử lý các nghiệp vụ chuẩn từ 24h xuống dưới 60 giây.",
        "Triệt tiêu 100% lỗi sai sót dữ liệu do nhập liệu thủ công.",
      ],
    },
    solutions: {
      modelOverview:
        "Kiến trúc Tự động hóa 4 Tầng: Auto-Ticketing & Smart Routing ➔ Workflow Triggers & Macro Engine ➔ RPA Bot Xử lý Giao dịch ➔ Event-Driven Customer Alerts.",
      imageUrl: "https://i.postimg.cc/T1HQnYqT/9-T-ng-ho.png",
      cards: [
        {
          name: "01 · Smart Auto-Ticketing & Triage",
          purpose: "Tự động khởi tạo, nhận diện ý định và gán nhãn ticket ngay khi có tín hiệu.",
          implementation:
            "Sử dụng AI & Quy tắc từ khóa để tự động đọc nội dung email/tin nhắn, nhận diện chủ đề (VD: 'Hủy đơn', 'Lỗi thanh toán'), gán mức độ ưu tiên và chuyển thẳng cho Agent chuyên trách.",
          value: "Loại bỏ hoàn toàn công đoạn phân loại ticket thủ công bằng tay.",
          iconName: "Zap",
        },
        {
          name: "02 · Macro & One-Click Workflows",
          purpose: "Rút ngắn 10 thao tác phức tạp thành 1 cú nhấp chuột duy nhất.",
          implementation:
            "Xây dựng bộ Macro chuẩn: Khi Agent bấm chọn 'Lỗi đơn hàng', hệ thống tự động: Gửi email giải thích chuẩn cho KH, tạo task tra soát cho Kho vận, cập nhật trạng thái CRM và đặt lịch nhắc nhở sau 4h.",
          value: "Tiết kiệm 3-4 phút thao tác cho mỗi lượt hỗ trợ.",
          iconName: "Clock",
        },
        {
          name: "03 · RPA Transaction Bot (Đối soát & Hoàn tiền)",
          purpose: "Tự động hóa xử lý giao dịch tài chính nhanh chóng và chính xác tuyệt đối.",
          implementation:
            "RPA Bot tự động đăng nhập cổng thanh toán, kiểm tra trạng thái giao dịch ngân hàng, đối soát logic và thực hiện lệnh hoàn tiền trong 30 giây khi thỏa điều kiện chính sách.",
          value: "Xử lý hàng ngàn giao dịch hoàn tiền mỗi ngày mà không tốn một phút nhân lực.",
          iconName: "ShieldCheck",
        },
        {
          name: "04 · Event-Driven Proactive Alerts",
          purpose: "Thông báo trạng thái chủ động trước khi khách hàng kịp lo lắng hỏi.",
          implementation:
            "Tích hợp Webhook kết nối hệ thống giao hàng và server: Tự động gửi tin nhắn Zalo ZNS/SMS khi đơn hàng bị trễ do thời tiết hoặc khi tài khoản nạp tiền thành công.",
          value: "Ngăn chặn trước 40% lượng cuộc gọi hỏi thăm trạng thái đơn hàng.",
          iconName: "MessageSquare",
        },
      ],
    },
    implementation: [
      "Kiểm kê và đo lường thời gian thực hiện toàn bộ tác vụ thủ công của đội ngũ",
      "Lập ma trận đánh giá mức độ khả thi tự động hóa (Automation Feasibility Matrix)",
      "Cấu hình các bộ lọc Trigger, Automation Rules và Macro trên hệ thống CRM",
      "Lập trình và tích hợp RPA Bot cho các quy trình kế toán, kho vận phức tạp",
      "Kiểm thử nghiêm ngặt (Sandbox Testing) độ chính xác của bot trước khi chạy thật",
      "Đo lường thời gian tiết kiệm được và liên tục mở rộng các luồng tự động mới",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Automation Lead",
      responsibilities: [
        "Xây dựng lộ trình chiến lược tự động hóa quy trình dịch vụ khách hàng tổng thể.",
        "Thiết kế logic các luồng Workflow và kiểm soát rủi ro vận hành của hệ thống bot.",
        "Đo lường ROI và giải phóng năng suất cho đội ngũ nhân sự tuyến đầu.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Intelligent Process Automation (IPA)",
        "Robotic Process Automation (RPA)",
        "Event-driven Architecture",
        "Workflow Optimization",
      ],
      toolsList: [
        "Zapier / Make Automation Engine",
        "UiPath / Python RPA Scripts",
        "Zendesk / Salesforce Workflow Builder",
      ],
    },
    results: {
      operational: [
        "Tự động hóa thành công 70% các tác vụ lặp lại trong vận hành hàng ngày.",
        "Thời gian xử lý yêu cầu hoàn tiền rút ngắn từ 48 giờ xuống còn 90 giây.",
      ],
      customer: [
        "Khách hàng vô cùng bất ngờ trước tốc độ giải quyết nhanh như chớp và chính xác tuyệt đối.",
      ],
      hr: [
        "Giải phóng hơn 120 giờ làm việc thủ công mỗi tuần cho đội ngũ, nhân viên vui vẻ và sáng tạo hơn.",
      ],
      business: [
        "Tiết kiệm chi phí nhân sự ước tính tương đương 6 nhân sự full-time mỗi năm.",
      ],
      kpiBeforeAfter: [
        "Tỷ lệ tác vụ được tự động hóa: 5% ➔ 70%",
        "Thời gian xử lý tác vụ hoàn tiền: 48h ➔ 90s",
        "Sai sót nhập liệu nghiệp vụ: 8.5% ➔ 0%",
        "Chi phí vận hành trên mỗi ticket: Giảm 48%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Nhận được kết quả xử lý ngay lập tức mà không phải chờ đợi qua các khâu phê duyệt rườm rà.",
      businessValue:
        "Tăng khả năng mở rộng quy mô vận hành gấp 10 lần mà không cần tăng tương ứng số lượng nhân viên.",
      organizationValue:
        "Chuyển đổi toàn diện tổ chức sang tư duy làm việc công nghệ cao và tự động hóa.",
      lessons: [
        "Đừng tự động hóa một quy trình đang bị lỗi; hãy tối ưu hóa quy trình trước khi áp dụng công nghệ.",
        "Tự động hóa không nhằm thay thế con người, mà là giải phóng con người để thực hiện sứ mệnh thấu cảm.",
      ],
      nextSteps: [
        "Ứng dụng AI Agent tự chủ (Autonomous AI Agents) có khả năng tự suy luận và giải quyết các case phức tạp đa bước.",
      ],
    },
  },

  "2.4 · Quản lý hoạt động chăm sóc khách hàng chủ động": {
    summary:
      "Chuyển dịch mô hình vận hành từ 'Ngồi chờ khách hàng gọi đến' (Reactive) sang 'Chủ động tiếp cận và chăm sóc có mục tiêu' (Proactive & Outbound Care), triển khai các chiến dịch chào đón khách mới (Welcome Journey), hướng dẫn sử dụng, khảo sát chất lượng, cảnh báo rủi ro và tái kích hoạt khách hàng ngủ đông (Winback Campaigns).",
    context: {
      currentStatus:
        "Phòng CSKH chỉ hoạt động khi có sự cố phát sinh từ phía người dùng, dẫn đến hình ảnh thương hiệu trong mắt khách hàng chỉ gắn liền với phiền phức và lỗi dịch vụ.",
      cause:
        "Thiếu chiến lược Outbound CS chuyên biệt, chưa có công cụ quản lý chiến dịch gọi tự động (Predictive Auto-Dialer) và phân khúc dữ liệu người dùng theo hành vi.",
      needForChange:
        "Xây dựng đội ngũ và quy trình Chăm sóc Chủ động để nâng cao giá trị trải nghiệm, gia tăng tỷ lệ kích hoạt tài khoản và chủ động ngăn ngừa khách hàng rời bỏ.",
    },
    problems: [
      {
        problem: "Tỷ lệ khách hàng đăng ký xong nhưng không sử dụng (Drop-off sau Onboarding)",
        cause:
          "Khách hàng mới chưa hiểu hết giá trị sản phẩm và không biết bắt đầu từ đâu, không có ai chủ động đồng hành.",
        impact:
          "Lãng phí 60% chi phí Marketing thu hút khách ban đầu (CAC), khách hàng rời bỏ trong âm thầm.",
      },
      {
        problem: "Hoạt động gọi Outbound thủ công năng suất rất thấp",
        cause:
          "Agent bấm số bằng tay từng số điện thoại trên điện thoại bàn, mất nhiều thời gian cho cuộc gọi không nghe máy/máy bận.",
        impact:
          "Mỗi nhân viên chỉ gọi được 40-50 cuộc/ngày, chi phí trên mỗi cuộc gọi thành công quá cao.",
      },
    ],
    objectives: {
      strategic: [
        "Biến hoạt động CSKH thành động cơ thúc đẩy tăng trưởng doanh thu và gắn kết người dùng (Engagement Engine).",
        "Xây dựng mối quan hệ thân tình, chủ động đồng hành xuyên suốt vòng đời khách hàng.",
      ],
      operational: [
        "Triển khai hệ thống tổng đài gọi tự động thông minh (Predictive & Progressive Auto-Dialer).",
        "Thiết kế 6 gói kịch bản chăm sóc chủ động chuyên biệt cho từng giai đoạn trong vòng đời người dùng.",
      ],
      customer: [
        "Giúp khách hàng cảm nhận được sự quan tâm chân thành, đúng lúc và đúng nhu cầu.",
      ],
      kpi: [
        "Tăng tỷ lệ kích hoạt tài khoản thành công sau Onboarding từ 45% lên 78%.",
        "Nâng năng suất cuộc gọi Outbound kết nối thành công lên gấp 3 lần (≥ 150 cuộc/Agent/ngày).",
        "Tái kích hoạt thành công ≥ 25% tệp khách hàng ngừng giao dịch trên 60 ngày.",
      ],
    },
    solutions: {
      modelOverview:
        "Mô hình Chăm sóc Chủ động 4 Bước: Phân khúc Dữ liệu Hành vi ➔ Kịch bản Tiếp cận May đo ➔ Tổng đài Tự động Auto-Dialer ➔ Đánh giá Tác động & Tối ưu.",
      imageUrl: "https://i.ibb.co/4nt76fLN/2-4-Qu-n-l-chi-n-d-ch-Outbound.png",
      cards: [
        {
          name: "01 · Onboarding Welcome Call Journey",
          purpose: "Đồng hành và hướng dẫn khách hàng mới trải nghiệm giá trị cốt lõi đầu tiên.",
          implementation:
            "Tự động kích hoạt cuộc gọi chào mừng trong 48h đầu sau đăng ký: Hướng dẫn kích hoạt tính năng, giải đáp thắc mắc ban đầu và gửi tặng cẩm nang sử dụng qua Zalo.",
          value: "Tạo ấn tượng chuyên nghiệp ngay từ đầu, giảm 50% tỷ lệ từ bỏ sản phẩm.",
          iconName: "Smile",
        },
        {
          name: "02 · Predictive Auto-Dialer Engine",
          purpose: "Tối đa hóa thời gian đàm thoại thực chất của nhân viên.",
          implementation:
            "Hệ thống tự động quay số thông minh, lọc bỏ các cuộc gọi bận/máy bàn/thuê bao, chỉ chuyển tiếp cuộc gọi đến tai nghe Agent khi khách hàng đã thực sự nhấc máy.",
          value: "Tăng năng suất từ 50 cuộc lên 160+ cuộc kết nối thành công/ngày cho mỗi Agent.",
          iconName: "Clock",
        },
        {
          name: "03 · Proactive Risk Alert & Health Check",
          purpose: "Cảnh báo và hỗ trợ trước khi sự cố ảnh hưởng đến quyền lợi khách hàng.",
          implementation:
            "Chủ động gọi điện/nhắn tin nhắc nhở: Sắp hết hạn gói cước, biến động số dư bất thường, bảo trì hệ thống hoặc cập nhật chính sách pháp lý quan trọng.",
          value: "Khách hàng cảm kích vì sự chu đáo, hạn chế tối đa tranh chấp và khiếu nại.",
          iconName: "ShieldCheck",
        },
        {
          name: "04 · Dormant Win-back Campaigns",
          purpose: "Đánh thức và mang khách hàng không hoạt động quay trở lại sử dụng dịch vụ.",
          implementation:
            "Lọc danh sách khách hàng không phát sinh giao dịch trong 60-90 ngày: Gọi điện thăm hỏi lý do, lắng nghe khó khăn và gửi tặng mã ưu đãi đặc biệt cá nhân hóa.",
          value: "Khôi phục doanh thu từ tệp khách hàng cũ mà không tốn chi phí Marketing mới.",
          iconName: "Target",
        },
      ],
    },
    implementation: [
      "Phân tích dữ liệu CRM để xác định các nhóm đối tượng mục tiêu cần chăm sóc chủ động",
      "Biên soạn bộ kịch bản đàm thoại (Script) thấu cảm, tránh phong cách mời chào bán hàng thô",
      "Cài đặt và hiệu chuẩn hệ thống tổng đài quay số tự động Predictive Dialer",
      "Đào tạo chuyên sâu kỹ năng lắng nghe, gợi mở nhu cầu và xử lý từ chối cho đội Outbound",
      "Thiết lập cơ chế kiểm soát chất lượng QA cuộc gọi Outbound nghiêm ngặt",
      "Báo cáo đo lường tỷ lệ chuyển đổi (Conversion Rate) và doanh thu mang lại định kỳ",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / Outbound Campaign Lead",
      responsibilities: [
        "Hoạch định chiến lược và danh mục các chiến dịch chăm sóc khách hàng chủ động toàn diện.",
        "Thiết kế kịch bản tiếp cận và quản trị hệ thống tổng đài quay số tự động.",
        "Đảm bảo tuân thủ nghiêm ngặt các quy định về tần suất liên hệ và bảo mật thông tin khách hàng.",
      ],
    },
    systemsAndTools: {
      methods: [
        "Proactive Customer Engagement",
        "Predictive & Progressive Auto-Dialing",
        "Winback & Retention Campaigns",
        "Behavioral Segmentation",
      ],
      toolsList: [
        "Auto-Dialer Call Center Solution",
        "CRM Campaign Management Hub",
        "Zalo ZNS / SMS Proactive Gateway",
      ],
    },
    results: {
      operational: [
        "Vận hành liên tục các chiến dịch Outbound với năng suất trung bình 165 cuộc kết nối/Agent/ngày.",
        "Tỷ lệ kết nối thành công đạt 88.5%.",
      ],
      customer: [
        "Khách hàng đánh giá rất cao sự ân cần, chu đáo và tác phong chuyên nghiệp của thương hiệu.",
      ],
      business: [
        "Tỷ lệ kích hoạt tài khoản mới tăng từ 45% lên 78%.",
        "Tái kích hoạt thành công hơn 35,000 khách hàng ngủ đông, mang lại hàng chục tỷ doanh thu bổ sung.",
      ],
      kpiBeforeAfter: [
        "Tỷ lệ kích hoạt người dùng mới (Activation Rate): 45% ➔ 78%",
        "Năng suất cuộc gọi kết nối/Agent/ngày: 50 ➔ 165 cuộc",
        "Tỷ lệ tái kích hoạt khách hàng ngủ đông: 8% ➔ 28.5%",
        "CSAT Khách hàng được chăm sóc chủ động: 96.8%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Cảm nhận được sự trân trọng đặc biệt, luôn được hướng dẫn tận tình và đồng hành trên từng bước đi.",
      businessValue:
        "Tối đa hóa giá trị trọn đời (LTV), bảo toàn chi phí thu hút khách hàng và gia tăng doanh số bền vững.",
      organizationValue:
        "Hình thành tinh thần chủ động, xông xáo và tự tin tạo ra giá trị cho toàn thể nhân sự.",
      lessons: [
        "Chăm sóc chủ động phải xuất phát từ mong muốn giúp đỡ khách hàng, tuyệt đối không biến thành cuộc gọi 'spam' làm phiền.",
        "Chọn đúng thời điểm (Timing) liên hệ quyết định 70% sự thành công của cuộc gọi.",
      ],
      nextSteps: [
        "Tích hợp AI Voicebot để thực hiện các cuộc gọi thông báo khảo sát cơ bản, dành nhân sự cho các cuộc gọi chăm sóc VIP chuyên sâu.",
      ],
    },
  },

  "2.5 · Quản lý đối tác thuê ngoài chăm sóc khách hàng": {
    summary:
      "Thiết lập Khung Quản trị Đối tác Thuê ngoài Toàn diện (BPO Vendor Management Framework), chuẩn hóa quy trình thẩm định, đàm phán hợp đồng SLA/KPI, kiểm soát chất lượng độc lập, đào tạo hiệu chuẩn (Calibration) và điều phối linh hoạt nguồn lực BPO quy mô hàng trăm nhân sự phục vụ các đợt cao điểm.",
    context: {
      currentStatus:
        "Khi doanh nghiệp mở rộng quy mô hoặc vào các mùa chiến dịch cao điểm (Sale 11/11, Tết), khối lượng cuộc gọi tăng gấp 4-5 lần khiến đội ngũ nội bộ (In-house) bị quá tải hoàn toàn, cần thuê ngoài đối tác BPO (Business Process Outsourcing).",
      cause:
        "Thiếu kinh nghiệm quản lý đối tác thứ ba, chưa có bộ chỉ số ràng buộc pháp lý và tài chính (Penalty/Bonus SLA) và thiếu cơ chế giám sát chất lượng độc lập.",
      needForChange:
        "Xây dựng năng lực quản trị đối tác BPO chuyên nghiệp, đảm bảo chất lượng phục vụ của BPO đồng nhất 100% như đội ngũ nội bộ với chi phí tối ưu nhất.",
    },
    problems: [
      {
        problem: "Chất lượng phục vụ của đối tác BPO kém và thiếu trách nhiệm",
        cause:
          "BPO sử dụng nhân sự thời vụ thay đổi liên tục, đào tạo qua loa và không thấu hiểu văn hóa doanh nghiệp.",
        impact:
          "Điểm CSAT của BPO chỉ đạt dưới 70%, phát sinh hàng loạt khiếu nại về thái độ và thông tin sai.",
      },
      {
        problem: "Chi phí phát sinh không kiểm soát được và tranh chấp nghiệm thu",
        cause:
          "Hợp đồng thuê ngoài chỉ tính theo giờ công (Man-hour) thay vì gắn liền với chất lượng cuộc gọi và tỷ lệ giải quyết triệt để (Outcome-based).",
        impact:
          "Doanh nghiệp tốn kém ngân sách lớn nhưng hiệu quả thực tế không tương xứng.",
      },
    ],
    objectives: {
      strategic: [
        "Xây dựng mối quan hệ đối tác chiến lược cùng thắng (Win-Win Partnership) với các nhà cung cấp dịch vụ BPO hàng đầu.",
        "Đảm bảo chất lượng trải nghiệm khách hàng tại kênh BPO đồng nhất 100% với tiêu chuẩn In-house.",
      ],
      operational: [
        "Thiết lập bộ hợp đồng dịch vụ SLA/KPI chuẩn mực có điều khoản thưởng/phạt rõ ràng.",
        "Triển khai cơ chế 'Shadow Quality Assurance' - Đội QA nội bộ tái thẩm định độc lập 10% mẫu cuộc gọi của BPO.",
      ],
      customer: [
        "Khách hàng hoàn toàn không cảm nhận thấy sự khác biệt dù đang nói chuyện với nhân sự In-house hay BPO.",
      ],
      kpi: [
        "Nâng chỉ số CSAT của BPO lên ngang bằng đội In-house (≥ 92%).",
        "Tỷ lệ tuân thủ cam kết SLA thời gian tiếp nhận của BPO đạt ≥ 98%.",
        "Tiết kiệm 30% chi phí mở rộng nhân sự trong các mùa cao điểm.",
      ],
    },
    solutions: {
      modelOverview:
        "Mô hình Quản trị BPO 4 Cột Trụ: Lựa chọn & Hợp đồng SLA Ràng buộc ➔ Đào tạo & Chuyển giao Chuẩn hóa ➔ Giám sát & Hiệu chuẩn Chất lượng (Calibration) ➔ Đánh giá Hiệu suất & Nghiệm thu Định kỳ.",
      imageUrl: "https://i.ibb.co/Z6472L7S/2-5-Qu-n-l-i-t-c-thu-ngo-i-ch-m-s-c-kh-ch-h-ng.jpg",
      cards: [
        {
          name: "01 · Outcome-based SLA Contract",
          purpose: "Gắn kết quyền lợi tài chính của BPO với chất lượng phục vụ thực tế.",
          implementation:
            "Thiết lập cấu trúc hợp đồng: 70% phí cố định + 30% phí biến đổi dựa trên điểm CSAT, FCR, QA Score và tỷ lệ tuân thủ SLA. Áp dụng mức thưởng khi vượt chỉ tiêu và phạt khi vi phạm cam kết.",
          value: "BPO chủ động tuyển dụng nhân sự tốt và đầu tư nâng cao chất lượng.",
          iconName: "ShieldCheck",
        },
        {
          name: "02 · Train-the-Trainer & Certification",
          purpose: "Đảm bảo kiến thức sản phẩm và kỹ năng được chuyển giao nguyên vẹn.",
          implementation:
            "Đào tạo và cấp chứng chỉ trực tiếp cho đội ngũ Giảng viên (Trainer) và Trưởng nhóm của BPO. Bắt buộc 100% Agent của BPO phải vượt qua bài thi sát hạch chuẩn của In-house trước khi được cấp quyền nghe máy.",
          value: "Triệt tiêu hoàn toàn tình trạng Agent BPO thiếu kiến thức tư vấn sai lệch.",
          iconName: "Award",
        },
        {
          name: "03 · Weekly QA Calibration Session",
          purpose: "Đồng nhất thước đo đánh giá chất lượng giữa hai bên.",
          implementation:
            "Hàng tuần, đội QA In-house và QA BPO cùng nghe và chấm điểm chung 5-10 cuộc gọi mẫu. Phân tích sự chênh lệch điểm số để đưa ra chuẩn mực giải thích chung nhất quán.",
          value: "Độ lệch chấm điểm QA giữa hai bên giảm xuống dưới 3%.",
          iconName: "BarChart",
        },
        {
          name: "04 · Real-time WFM & Surge Capacity Management",
          purpose: "Linh hoạt điều phối quy mô nhân sự theo biến động lưu lượng thực tế.",
          implementation:
            "Kết nối hệ thống Quản lý Nguồn lực (Workforce Management - WFM): Dự báo lưu lượng trước 2 tuần, yêu cầu BPO tăng/giảm quy mô chỗ ngồi (Seats) linh hoạt trong 48h.",
          value: "Đảm bảo tổng đài luôn thông suốt trong mọi đợt bùng nổ chiến dịch mà không bị lãng phí chi phí.",
          iconName: "TrendingUp",
        },
      ],
    },
    implementation: [
      "Xây dựng tiêu chí lựa chọn nhà cung cấp BPO (RFP) và tổ chức đấu thầu minh bạch",
      "Soạn thảo hợp đồng dịch vụ SLA/KPI và cơ chế thưởng phạt hiệu suất chi tiết",
      "Triển khai chương trình đào tạo chuyển giao (Train-the-Trainer) và sát hạch Agent BPO",
      "Thiết lập kết nối hạ tầng công nghệ và phân quyền bảo mật dữ liệu an toàn",
      "Vận hành các buổi họp điều hành hàng ngày (Daily Call), hàng tuần và hàng tháng (MBR)",
      "Đánh giá hiệu suất định kỳ và tái đàm phán hợp đồng dựa trên kết quả thực tế",
    ],
    roleAndContribution: {
      role: "Trưởng Phòng CSKH / BPO Vendor Manager",
      responsibilities: [
        "Quản lý toàn diện mối quan hệ đối tác với các nhà cung cấp dịch vụ BPO quy mô lớn.",
        "Thiết kế khung cam kết SLA, giám sát chất lượng và phê duyệt quyết toán nghiệm thu.",
        "Chỉ đạo công tác đào tạo chuyển giao và hiệu chuẩn chất lượng liên tục.",
      ],
    },
    systemsAndTools: {
      methods: [
        "BPO Governance Framework",
        "SLA & KPI Management",
        "QA Calibration Methodology",
        "Workforce Management (WFM)",
      ],
      toolsList: [
        "Centralized Contact Center Platform",
        "BPO Real-time Monitoring Wallboard",
        "QA Shared Audit Portal",
      ],
    },
    results: {
      operational: [
        "Mở rộng quy mô phục vụ lên 150+ vị trí (seats) BPO thành công chỉ trong 2 tuần chuẩn bị cho mùa Mega-sale.",
        "Tỷ lệ tuân thủ thời gian tiếp nhận cuộc gọi SLA đạt 98.6%.",
      ],
      customer: [
        "Chỉ số hài lòng khách hàng (CSAT) của kênh BPO đạt 93.8% (tương đương In-house).",
      ],
      business: [
        "Tiết kiệm 35% tổng chi phí nhân sự so với phương án tự tuyển dụng và duy trì bộ máy cồng kềnh quanh năm.",
      ],
      kpiBeforeAfter: [
        "BPO CSAT Score: 68% ➔ 93.8%",
        "BPO QA Quality Score: 71% ➔ 92.5%",
        "SLA Tuân thủ tiếp nhận cuộc gọi BPO: 81% ➔ 98.6%",
        "Tỷ lệ chênh lệch chấm điểm QA (Calibration Variance): 18% ➔ 2.8%",
      ],
    },
    valueAndDevelopment: {
      customerValue:
        "Luôn được hỗ trợ nhanh chóng 24/7 ngay cả trong những đợt cao điểm nghẽn mạng khốc liệt nhất.",
      businessValue:
        "Tạo ra sự linh hoạt tuyệt đối về quy mô vận hành (Elastic Capacity), tối ưu hóa dòng tiền doanh nghiệp.",
      organizationValue:
        "Nâng cao năng lực quản trị nhà thầu quốc tế và làm chủ các mô hình vận hành hiện đại.",
      lessons: [
        "Đối tác BPO là cánh tay nối dài của doanh nghiệp; hãy đối xử với họ như đồng đội, không phải bên làm thuê.",
        "Chỉ có cơ chế kiểm soát chất lượng độc lập và thưởng phạt minh bạch mới duy trì được sự cam kết lâu dài.",
      ],
      nextSteps: [
        "Mở rộng mạng lưới đối tác BPO đa vùng miền để phòng ngừa rủi ro thiên tai và gián đoạn cục bộ.",
      ],
    },
  },
};
