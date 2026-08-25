import React, { useState, useMemo } from 'react';
import { GraduationCap, Copy, Check, Search, Award, BookOpen, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface EducationalCardData {
  id: string;
  categoryKey: 'degree' | 'certificate' | 'training';
  categoryVi: string;
  title: string;
  iconKey: string;
  color: string;
  year: string;
  school: string;
  cred: string;
  img: string;
  diplomaImg?: string;
  summaryVi: string;
  learnedVi: string[];
  resultsVi: string[];
}

const EDUCATIONAL_DATA: EducationalCardData[] = [
  {
    id: 'web-design-2024',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Thiết kế Webpages & AI',
    iconKey: 'code',
    color: '#0284c7',
    year: 'Năm 2024',
    school: 'Tự học & Phát triển chuyên môn',
    cred: 'WEB-DES-2024-001',
    img: 'https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png',
    diplomaImg: '',
    summaryVi: 'Được trang bị kiến thức về phát triển website hiện đại với HTML5, CSS3, JavaScript, PHP và C++, đồng thời nâng cao kỹ năng thiết kế giao diện Responsive, tối ưu trải nghiệm người dùng (UI/UX) và ứng dụng AI trong phát triển website.',
    learnedVi: [
      'Phát triển Website hiện đại với HTML5, CSS3, JavaScript, PHP & C++.',
      'Thiết kế giao diện Responsive & Tối ưu trải nghiệm người dùng (UI/UX).',
      'Ứng dụng Generative AI & AI Agents trong lập trình website.',
      'Tối ưu hiệu năng, chuẩn SEO và nâng cao tương tác người dùng.'
    ],
    resultsVi: [
      'Nắm vững nguyên lý thiết kế và trải nghiệm người dùng trên website.',
      'Xây dựng giao diện trực quan, hiện đại và tối ưu chuyển đổi.',
      'Ứng dụng phát triển cổng thông tin và công cụ số cho doanh nghiệp.'
    ]
  },
  {
    id: 'data-analytics',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Phân tích dữ liệu Big Data',
    iconKey: 'chart',
    color: '#0284c7',
    year: 'Năm 2019',
    school: 'Phát triển chuyên môn',
    cred: 'DATA-BD-2019-088',
    img: 'https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png',
    diplomaImg: '',
    summaryVi: 'Nâng cao năng lực phân tích và trực quan hóa dữ liệu, xây dựng hệ thống báo cáo, KPI và Dashboard nhằm hỗ trợ quản trị và ra quyết định dựa trên dữ liệu (Data-driven Management).',
    learnedVi: [
      'Khái niệm và kiến trúc Big Data.',
      'Thu thập, tổ chức và xử lý dữ liệu khối lượng lớn.',
      'Làm sạch và chuẩn hóa dữ liệu thô.',
      'Phân tích dữ liệu phục vụ quản trị doanh nghiệp.',
      'Phân tích xu hướng và hành vi khách hàng.',
      'Trực quan hóa dữ liệu (Data Visualization).',
      'Xây dựng báo cáo quản trị, KPI & Dashboard.'
    ],
    resultsVi: [
      'Tiếp cận vấn đề quản trị dựa trên dữ liệu thay vì chỉ dựa vào cảm tính.',
      'Xây dựng hệ thống báo cáo, KPI và Dashboard phục vụ quản lý.',
      'Phân tích dữ liệu vận hành và dữ liệu khách hàng để tìm ra xu hướng.',
      'Hỗ trợ nhà quản lý xác định vấn đề, nguyên nhân và cơ hội cải tiến.'
    ]
  },
  {
    id: 'risk-management',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Quản lý rủi ro',
    iconKey: 'shield',
    color: '#e11d48',
    year: 'Năm 2017',
    school: 'Prudential Việt Nam',
    cred: 'PRU-RM-2017-104',
    img: 'https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png',
    diplomaImg: 'https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png',
    summaryVi: 'Được đào tạo phương pháp nhận diện, đánh giá và kiểm soát rủi ro, xây dựng kế hoạch ứng phó nhằm giảm thiểu tác động và đảm bảo hiệu quả vận hành an toàn.',
    learnedVi: [
      'Nhận diện rủi ro trong hoạt động và dự án.',
      'Phân loại rủi ro theo mức độ ảnh hưởng.',
      'Đánh giá khả năng xảy ra và mức độ tác động.',
      'Xây dựng Risk Matrix & Thiết lập kiểm soát.',
      'Xây dựng phương án phòng ngừa và ứng phó sự cố.',
      'Theo dõi và kiểm soát rủi ro trong quá trình vận hành.'
    ],
    resultsVi: [
      'Chủ động nhận diện rủi ro trước khi trở thành sự cố.',
      'Xây dựng phương án phòng ngừa và xử lý rủi ro bài bản.',
      'Giảm thiểu tác động của sự cố đến khách hàng và doanh nghiệp.',
      'Hình thành tư duy quản trị theo hướng chủ động phòng ngừa.'
    ]
  },
  {
    id: 'project-management',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Quản lý Dự án',
    iconKey: 'target',
    color: '#6366f1',
    year: 'Năm 2016',
    school: 'Prudential Việt Nam',
    cred: 'PRU-PM-2016-042',
    img: 'https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png',
    diplomaImg: 'https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png',
    summaryVi: 'Nắm vững quy trình quản lý dự án từ lập kế hoạch, phân bổ nguồn lực, quản lý tiến độ, ngân sách, chất lượng đến đánh giá hiệu quả sau khi triển khai.',
    learnedVi: [
      'Xác định mục tiêu và phạm vi dự án (Project Scope).',
      'Lập kế hoạch triển khai & Xây dựng timeline milestone.',
      'Phân bổ nguồn lực & Quản lý ngân sách dự án.',
      'Quản lý chất lượng & Quản trị rủi ro dự án.',
      'Phối hợp các phòng ban và stakeholder liên quan.'
    ],
    resultsVi: [
      'Lập và điều phối kế hoạch dự án chuyên nghiệp.',
      'Kiểm soát toàn diện Scope – Time – Cost – Quality – Risk.',
      'Nâng cao năng lực phối hợp đa phòng ban.',
      'Tạo nền tảng triển khai các dự án CSKH, CRM & Chuyển đổi số.'
    ]
  },
  {
    id: 'executive-management',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Quản lý cấp cao',
    iconKey: 'crown',
    color: '#8b5cf6',
    year: 'Năm 2015',
    school: 'Dale Carnegie Training',
    cred: 'VED-EXEC-2015-992',
    img: 'https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png',
    diplomaImg: 'https://i.ibb.co/zT5MVFmt/Qu-n-l-c-p-cao.png',
    summaryVi: 'Phát triển tư duy lãnh đạo, quản trị chiến lược, xây dựng đội ngũ và nâng cao năng lực điều hành tổ chức trong môi trường doanh nghiệp quy mô lớn.',
    learnedVi: [
      'Tư duy lãnh đạo cấp cao & Quản trị chiến lược.',
      'Xây dựng tầm nhìn, mục tiêu và ra quyết định.',
      'Xây dựng và phát triển đội ngũ vững mạnh.',
      'Quản trị thay đổi & Tạo động lực cho nhân viên.',
      'Giao tiếp, tạo ảnh hưởng và giải quyết xung đột.'
    ],
    resultsVi: [
      'Nâng cao năng lực lãnh đạo và điều hành tổ chức.',
      'Xây dựng định hướng và mục tiêu dài hạn cho đội ngũ.',
      'Chuyển đổi tư duy từ quản lý công việc sang quản trị chiến lược.',
      'Nền tảng quản lý các bộ phận CSKH/Contact Center quy mô lớn.'
    ]
  },
  {
    id: 'middle-management',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Quản lý cấp trung',
    iconKey: 'users',
    color: '#059669',
    year: 'Năm 2014',
    school: 'Dale Carnegie Training',
    cred: 'VED-MID-2014-551',
    img: 'https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png',
    diplomaImg: 'https://i.ibb.co/v6JvfyR4/Qu-n-l-c-p-trung.png',
    summaryVi: 'Hoàn thiện kỹ năng quản lý nhân sự, phân công công việc, giám sát hiệu quả thực hiện, huấn luyện nhân viên và phối hợp nhịp nhàng giữa các phòng ban.',
    learnedVi: [
      'Quản lý, phân công và lập kế hoạch cho đội nhóm.',
      'Giám sát tiến độ & Đánh giá hiệu suất nhân viên.',
      'Kỹ năng Coaching và Mentoring nhân viên.',
      'Giao tiếp hiệu quả trong quản lý & Giải quyết xung đột.',
      'Thúc đẩy tinh thần làm việc nhóm gắn kết.'
    ],
    resultsVi: [
      'Tổ chức và điều hành đội nhóm đạt năng suất cao.',
      'Phân công công việc phù hợp với năng lực từng nhân sự.',
      'Thiết lập và theo dõi KPI rõ ràng, minh bạch.',
      'Phát triển năng lực nhân viên thông qua coaching liên tục.'
    ]
  },
  {
    id: 'presentation-training',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Đào tạo & Thuyết trình',
    iconKey: 'presentation',
    color: '#d97706',
    year: 'Năm 2013',
    school: 'VietnamWorks',
    cred: 'VNW-TRN-2013-118',
    img: 'https://i.ibb.co/TDD9zdST/o-t-o-Thuy-t-tr-nh.png',
    diplomaImg: 'https://i.ibb.co/GQ3gFt3S/Thuy-t-tr-nh.png',
    summaryVi: 'Nâng cao kỹ năng xây dựng chương trình đào tạo, thiết kế nội dung bài giảng, thuyết trình và truyền đạt kiến thức chuyên môn hiệu quả cho đội ngũ.',
    learnedVi: [
      'Phân tích nhu cầu đào tạo (TNA).',
      'Xây dựng mục tiêu và thiết kế khung giáo trình.',
      'Kỹ thuật thuyết trình chuyên nghiệp trước đám đông.',
      'Phương pháp sư phạm tương tác & Xử lý câu hỏi khó.',
      'Đánh giá kết quả và cải tiến chất lượng đào tạo.'
    ],
    resultsVi: [
      'Xây dựng và triển khai chương trình đào tạo nội bộ bài bản.',
      'Đào tạo nghiệp vụ CSKH và chuẩn hóa kỹ năng dịch vụ.',
      'Nâng cao khả năng thuyết trình và truyền cảm hứng.',
      'Chuyển đổi kinh nghiệm thực chiến thành tài liệu giảng dạy.'
    ]
  },
  {
    id: 'interview-skills',
    categoryKey: 'training',
    categoryVi: 'Đào tạo chuyên môn',
    title: 'Kỹ năng Phỏng vấn Tuyển dụng',
    iconKey: 'briefcase',
    color: '#0d9488',
    year: 'Năm 2013',
    school: 'VietnamWorks',
    cred: 'VNW-INT-2013-302',
    img: 'https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png',
    diplomaImg: 'https://i.ibb.co/0RhVggb5/Ph-ng-v-n.png',
    summaryVi: 'Trang bị phương pháp tuyển dụng hiện đại, kỹ thuật phỏng vấn, đánh giá năng lực ứng viên và lựa chọn nhân sự phù hợp với yêu cầu công việc.',
    learnedVi: [
      'Quy trình tuyển dụng và phân tích nhu cầu nhân sự.',
      'Xây dựng tiêu chí tuyển dụng và ngân hàng câu hỏi.',
      'Kỹ thuật phỏng vấn hành vi (Behavioral Interview).',
      'Đánh giá năng lực, thái độ và mức độ phù hợp văn hóa.',
      'Lựa chọn ứng viên tối ưu theo tiêu chuẩn công việc.'
    ],
    resultsVi: [
      'Nâng cao độ chính xác trong tuyển dụng và chọn lọc nhân tài.',
      'Đánh giá toàn diện ứng viên theo Năng lực – Thái độ – Văn hóa.',
      'Xây dựng đội ngũ CSKH chất lượng cao phù hợp vận hành thực tế.',
      'Tăng tỷ lệ giữ chân nhân sự nhờ tuyển chọn đúng người đúng việc.'
    ]
  },
  {
    id: 'bachelor-it',
    categoryKey: 'degree',
    categoryVi: 'Bằng cấp chính quy',
    title: 'Cử nhân Công nghệ Thông tin',
    iconKey: 'graduation',
    color: '#2563eb',
    year: 'Năm 2007',
    school: 'Trường Đại học Công nghệ Sài Gòn (STU)',
    cred: 'STU-BS-2007-0881',
    img: 'https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png',
    diplomaImg: '',
    summaryVi: 'Được đào tạo nền tảng chính quy về lập trình, cơ sở dữ liệu, phân tích thiết kế hệ thống, mạng máy tính và phát triển phần mềm, tạo nền tảng vững chắc cho sự nghiệp công nghệ.',
    learnedVi: [
      'Lập trình phần mềm, Cấu trúc dữ liệu và Giải thuật.',
      'Cơ sở dữ liệu quan hệ (RDBMS) & Truy vấn dữ liệu SQL.',
      'Phân tích và thiết kế hệ thống thông tin doanh nghiệp.',
      'Hệ điều hành, Kiến trúc máy tính & Mạng máy tính.',
      'Công nghệ phần mềm và quy trình phát triển ứng dụng.'
    ],
    resultsVi: [
      'Xây dựng nền tảng tư duy công nghệ và lập trình vững chắc.',
      'Phân tích yêu cầu nghiệp vụ theo tư duy hệ thống logic.',
      'Hiểu sâu thiết kế cơ sở dữ liệu và kiến trúc phần mềm.',
      'Trao đổi và phối hợp hiệu quả với đội ngũ kỹ thuật CNTT.',
      'Nền tảng kết nối CSKH + Quản trị + Giải pháp công nghệ số.'
    ]
  },
  {
    id: 'mobifone-cc',
    categoryKey: 'certificate',
    categoryVi: 'Chứng chỉ chuyên môn',
    title: 'Chứng nhận Tổng đài viên Chuyên nghiệp',
    iconKey: 'headset',
    color: '#0284c7',
    year: 'Năm 2007',
    school: 'MobiFone',
    cred: 'MBF-CC-2007-009',
    img: 'https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png',
    diplomaImg: 'https://i.ibb.co/vCKQGYB2/T-ng-i-vi-n-Mobifone.png',
    summaryVi: 'Được đào tạo chuyên sâu về nghiệp vụ Contact Center, quy trình chăm sóc khách hàng, kỹ năng giao tiếp qua điện thoại, xử lý tình huống và tiêu chuẩn chất lượng dịch vụ SLA/QA.',
    learnedVi: [
      'Nghiệp vụ Contact Center & Quy trình tiếp nhận cuộc gọi.',
      'Kỹ năng giao tiếp qua điện thoại, lắng nghe & đồng cảm.',
      'Kỹ thuật đặt câu hỏi khai thác nhu cầu & Xử lý khiếu nại.',
      'Tiêu chuẩn chất lượng dịch vụ (SLA & QA).',
      'Quy trình và tác phong chuyên nghiệp của tổng đài viên.'
    ],
    resultsVi: [
      'Hình thành nền tảng chuyên môn vững chắc về Contact Center.',
      'Trực tiếp xử lý các tình huống phức tạp với khách hàng.',
      'Phát triển phản xạ giải quyết vấn đề nhanh trong môi trường áp lực.',
      'Nền tảng thăng tiến: Agent → Team Leader → Supervisor → Head of CS.'
    ]
  },
  {
    id: 'ccna-cert',
    categoryKey: 'certificate',
    categoryVi: 'Chứng chỉ chuyên môn',
    title: 'Quản trị mạng CCNA (Cisco Certified)',
    iconKey: 'network',
    color: '#0891b2',
    year: 'Năm 2006',
    school: 'Trường Nghề Nhất Nghệ',
    cred: 'NN-CCNA-2006-441',
    img: 'https://i.ibb.co/DPVsnrfj/CCNA.png',
    diplomaImg: 'https://i.ibb.co/jZr4051t/CCNA.png',
    summaryVi: 'Được đào tạo về thiết kế, triển khai và quản trị hệ thống mạng Cisco, bao gồm Routing, Switching, TCP/IP, VLAN, Subnetting và các kỹ thuật đảm bảo an toàn mạng.',
    learnedVi: [
      'Kiến trúc mạng máy tính OSI & TCP/IP.',
      'Định tuyến (Routing) & Chuyển mạch (Switching).',
      'Cấu hình Router & Switch Cisco, Phân đoạn mạng VLAN.',
      'Địa chỉ IP, Subnetting & Thiết lập mạng WAN.',
      'Troubleshooting và các nguyên tắc bảo mật mạng căn bản.'
    ],
    resultsVi: [
      'Hiểu sâu nền tảng hạ tầng mạng doanh nghiệp.',
      'Nắm vững cách thiết kế, kết nối và vận hành hệ thống mạng.',
      'Trao đổi ăn ý với bộ phận IT về hạ tầng Contact Center.',
      'Chẩn đoán và phân tích các sự cố kết nối mạng trong vận hành.'
    ]
  },
  {
    id: 'mcsa-cert',
    categoryKey: 'certificate',
    categoryVi: 'Chứng chỉ chuyên môn',
    title: 'Quản trị Hệ thống MCSA (Microsoft Certified)',
    iconKey: 'server',
    color: '#7c3aed',
    year: 'Năm 2005',
    school: 'Trường Nghề Nhất Nghệ',
    cred: 'NN-MCSA-2005-312',
    img: 'https://i.ibb.co/ZRp6cDRz/MCSA.png',
    diplomaImg: 'https://i.ibb.co/VYMs5kRq/MCSA.png',
    summaryVi: 'Được trang bị kiến thức về quản trị hệ thống Windows Server, Active Directory, DNS, DHCP, bảo mật, quản lý tài nguyên và vận hành hạ tầng máy chủ doanh nghiệp.',
    learnedVi: [
      'Quản trị máy chủ Windows Server & Dịch vụ Active Directory.',
      'Cấu hình dịch vụ hạ tầng mạng DNS, DHCP.',
      'Quản lý tài nguyên, phân quyền người dùng và nhóm (User & Group).',
      'Thiết lập chính sách bảo mật hệ thống Group Policy (GPO).',
      'Sao lưu dữ liệu, khôi phục sau sự cố & Giám sát hạ tầng IT.'
    ],
    resultsVi: [
      'Hiểu kiến trúc và nguyên lý vận hành hệ thống Windows Server.',
      'Có kiến thức vững về quản trị hạ tầng CNTT doanh nghiệp.',
      'Phối hợp nhịp nhàng với đội ngũ IT triển khai phần mềm doanh nghiệp.',
      'Nền tảng kỹ thuật để triển khai Contact Center, CRM và Voice Gateway.'
    ]
  }
];

export function Education() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'degree' | 'certificate' | 'training'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const handleCopyCode = (cred: string, id: string) => {
    navigator.clipboard.writeText(cred);
    setCopiedId(id);
    triggerToast(`Đã sao chép mã: ${cred}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredData = useMemo(() => {
    return EDUCATIONAL_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.categoryKey === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.school.toLowerCase().includes(query) ||
        item.cred.toLowerCase().includes(query) ||
        item.year.toLowerCase().includes(query) ||
        item.summaryVi.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: EDUCATIONAL_DATA.length,
      degree: EDUCATIONAL_DATA.filter(i => i.categoryKey === 'degree').length,
      certificate: EDUCATIONAL_DATA.filter(i => i.categoryKey === 'certificate').length,
      training: EDUCATIONAL_DATA.filter(i => i.categoryKey === 'training').length
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 transition-colors duration-300 !bg-transparent">
      
      {/* Header Toolbar */}
      <header className="w-full max-w-6xl mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
                Học vấn & Đào tạo chuyên môn
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Tổng hợp bằng cấp chính quy, chứng chỉ năng lực và các chương trình đào tạo quản lý cao cấp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-1.5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cập nhật 2026</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="relative flex items-center gap-2 px-3 py-1">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm chứng chỉ, trường..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs font-semibold focus:outline-none placeholder-slate-400 w-36 sm:w-48 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { key: 'all', label: `Tất cả (${categoryCounts.all})`, icon: BookOpen },
            { key: 'degree', label: `Bằng cấp chính quy (${categoryCounts.degree})`, icon: GraduationCap },
            { key: 'certificate', label: `Chứng chỉ chuyên môn (${categoryCounts.certificate})`, icon: ShieldCheck },
            { key: 'training', label: `Đào tạo nâng cao (${categoryCounts.training})`, icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Grid Display: Static Clean Layout - No Hover Motions, No Popups */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredData.map(card => {
          return (
            <div
              key={card.id}
              className="rounded-2xl border border-white/20 bg-white/40 dark:bg-black/20 p-5 shadow-sm backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="w-full h-36 rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Header Tag and Year */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                    {card.categoryVi}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {card.year}
                  </span>
                </div>

                {/* Title and Institution */}
                <h2 className="text-base font-black text-slate-800 dark:text-white leading-snug mb-1">
                  {card.title}
                </h2>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  {card.school}
                </p>

                {/* Summary Quote */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  {card.summaryVi}
                </p>

                {/* Key Learnings List */}
                <div className="mb-4">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Nội dung cốt lõi:</span>
                  </h3>
                  <ul className="space-y-1.5 pl-1">
                    {card.learnedVi.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Results */}
                {card.resultsVi && card.resultsVi.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Kết quả & Ứng dụng:</span>
                    </h3>
                    <div className="flex flex-col gap-1.5">
                      {card.resultsVi.map((res, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40 text-[11px] font-medium text-emerald-800 dark:text-emerald-300"
                        >
                          {res}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Credential Code & Copy Action */}
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Mã chứng chỉ / Khóa học
                  </span>
                  <span className="font-mono text-xs font-black text-slate-700 dark:text-slate-200">
                    {card.cred}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyCode(card.cred, card.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  {copiedId === card.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast message */}
      {toastMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold shadow-xl z-[99999] border border-slate-700">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
