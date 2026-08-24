import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { PageLayout } from "../components/PageLayout";
import { GraduationCap } from "lucide-react";
import { playGlassSound } from "../lib/sound";

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
    title: 'Thiết kế Webpages',
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
    title: 'Kỹ năng Phỏng vấn',
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
    title: 'Cử nhân CNTT',
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
    title: 'Chứng nhận Tổng đài viên',
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
    title: 'Quản trị mạng CCNA',
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
    title: 'Quản trị MCSA',
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

const renderSVGIcon = (key: string) => {
  switch (key) {
    case 'code':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'target':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'crown':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-6 7-4-7z" />
          <path d="M5 20h14" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'presentation':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <path d="M2 3h20v14H2z" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 10l3 3 7-7" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'graduation':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'headset':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2H3z" />
        </svg>
      );
    case 'network':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <path d="M12 8v4M5 16v-4h14v4" />
        </svg>
      );
    case 'server':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        </svg>
      );
  }
};

const playBookSound = (type: 'flip' | 'click' = 'flip') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'flip') {
      const bufferSize = Math.floor(ctx.sampleRate * 0.22);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.2);
      filter.Q.setValueAtTime(2.2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.21);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.22);
    }
  } catch (e) {
    // Fallback if audio unsupported
  }
};

export function Education() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'degree' | 'certificate' | 'training'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal & Book Opening States
  const [activeCard, setActiveCard] = useState<EducationalCardData | null>(null);
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [isOpenFlap, setIsOpenFlap] = useState<boolean>(false);
  const [isOpenSpread, setIsOpenSpread] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const cardElementsMap = useRef<Record<string, HTMLDivElement | null>>({});

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const filteredData = useMemo(() => {
    return EDUCATIONAL_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.categoryKey === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.school.toLowerCase().includes(query) ||
        item.cred.toLowerCase().includes(query) ||
        item.year.toLowerCase().includes(query);
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

  const triggerCardBookOpening = (card: EducationalCardData) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setClickedCardId(card.id);
    setActiveCard(card);

    playBookSound('flip');

    setIsOpenFlap(false);
    setIsOpenSpread(false);
    setIsOverlayOpen(true);
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      setClickedCardId(null);
      setIsAnimating(false);
    }, 580);
  };

  const triggerFlapOpenInsidePopup = () => {
    if (isAnimating || isOpenSpread) return;
    setIsAnimating(true);

    playBookSound('flip');

    setIsOpenFlap(true);

    setTimeout(() => {
      setIsOpenSpread(true);
      setIsAnimating(false);
    }, 580);
  };

  const closeModal = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    playBookSound('flip');

    if (isOpenSpread) {
      setIsOpenSpread(false);
      setTimeout(() => {
        setIsOpenFlap(false);
        setTimeout(() => {
          setIsOverlayOpen(false);
          dialogRef.current?.close();
          setActiveCard(null);
          document.body.style.overflow = '';
          setIsAnimating(false);
        }, 350);
      }, 200);
    } else {
      setIsOverlayOpen(false);
      dialogRef.current?.close();
      setActiveCard(null);
      document.body.style.overflow = '';
      setIsAnimating(false);
    }
  }, [isAnimating, isOpenSpread]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCard && e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCard, closeModal]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-3 sm:p-6 transition-colors duration-500 overflow-x-hidden">
      
      <style>{`
        /* 3D Static Book Card Structure */
        .book-3d-card {
          position: relative;
          width: 200px;
          height: 250px;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        /* Card Blob Wrapper styling */
        .card-blob-wrapper {
          position: relative;
          width: 200px;
          height: 250px;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-blob-bg {
          position: absolute;
          top: 5px;
          left: 5px;
          width: 190px;
          height: 240px;
          z-index: 2;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 10px;
          overflow: hidden;
          outline: 2px solid white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px;
        }

        .dark .card-blob-bg {
          background: #0f172a;
          outline: 2px solid rgba(255, 255, 255, 0.2);
        }

        .blob {
          position: absolute;
          z-index: 1;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          opacity: 0.85;
          filter: blur(14px);
          animation: blob-bounce 5s infinite ease;
        }

        @keyframes blob-bounce {
          0% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
          25% { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
          50% { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
          75% { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
          100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
        }

        @keyframes popupCardSpinEmerge {
          0% { opacity: 0; transform: scale(0.35) rotateY(-360deg) translateY(80px); }
          65% { opacity: 1; transform: scale(1.06) rotateY(12deg) translateY(-8px); }
          100% { opacity: 1; transform: scale(1) rotateY(0deg) translateY(0); }
        }

        .popup-spin-emerge {
          animation: popupCardSpinEmerge 0.58s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .book-3d-stage {
          perspective: 1600px;
          perspective-origin: 50% 50%;
        }

        .book-3d-wrapper {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
        }

        .book-cover-flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.35, 1), box-shadow 0.65s ease;
          z-index: 20;
          backface-visibility: hidden;
        }

        .book-cover-flap.is-open {
          transform: rotateY(-155deg);
          box-shadow: -15px 15px 35px rgba(0, 0, 0, 0.3);
        }

        .book-inside-spread {
          opacity: 0;
          transform: scale(0.96) translateY(6px);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        .book-inside-spread.is-visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* Scrim / Backdrop Styling */
        dialog::backdrop {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        dialog[open]::backdrop {
          opacity: 1;
        }

        /* Prevent body scroll when dialog is open */
        body:has(dialog[open]) {
          overflow: hidden;
          overscroll-behavior: contain;
        }

        dialog {
          border: none;
          background: transparent;
          max-width: none;
          max-height: none;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          overflow: visible;
        }
      `}</style>

      {/* Header Toolbar */}
      <header className="w-full max-w-[1100px] mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </span>
            <span>Học vấn & Đào tạo</span>
          </h1>

          <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-white/10 p-1.5 rounded-full shadow-lg">
            <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cập nhật 2024</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="relative flex items-center gap-2 px-3 py-1">
              <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs font-bold focus:outline-none placeholder-slate-400 w-32"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { key: 'all', label: `Tất cả (${categoryCounts.all})` },
            { key: 'degree', label: `Bằng cấp (${categoryCounts.degree})` },
            { key: 'certificate', label: `Chứng chỉ (${categoryCounts.certificate})` },
            { key: 'training', label: `Đào tạo (${categoryCounts.training})` }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === tab.key
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white/40 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-900/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Grid Display */}
      <div className="w-full max-w-[1100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center pb-20">
        {filteredData.map(card => (
          <article
            key={card.id}
            onClick={() => triggerCardBookOpening(card)}
            className={`book-3d-card cursor-pointer transition-all duration-300 ${
              clickedCardId === card.id ? 'scale-90 opacity-50' : ''
            }`}
          >
            <div className="card-blob-wrapper relative bg-white dark:bg-slate-900">
              <div className="blob" style={{ backgroundColor: card.color }} />
              <div className="card-blob-bg shadow-inner">
                <div className="w-full h-24 rounded-lg overflow-hidden relative bg-slate-900/20 backdrop-blur-sm mb-2 border border-white/50 dark:border-white/10">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 mb-1">
                    {card.categoryVi}
                  </span>
                  <h2 className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight mb-1 line-clamp-2">
                    {card.title}
                  </h2>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 italic">
                    {card.school}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {card.year}
                  </span>
                  <span className="text-[10px] font-black text-indigo-500 transition-transform">
                    OPEN →
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal / Book Viewer */}
      <dialog
        ref={dialogRef}
        onClose={() => {
          if (isOverlayOpen) closeModal();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeModal();
        }}
      >
        {activeCard && (
          <div className="book-3d-stage relative w-full max-w-4xl flex items-center justify-center p-4">
            
            <button
              onClick={closeModal}
              className="absolute -top-12 right-4 md:right-0 p-2 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="book-3d-wrapper w-full">
              {!isOpenSpread ? (
                <div className="popup-spin-emerge flex flex-col items-center">
                  <div
                    onClick={triggerFlapOpenInsidePopup}
                    className={`book-cover-flap card-blob-wrapper cursor-pointer bg-white dark:bg-slate-900 ${isOpenFlap ? 'is-open' : ''}`}
                  >
                    <div className="blob" style={{ backgroundColor: activeCard.color }} />
                    <div className="card-blob-bg">
                      <div className="w-full h-24 rounded-lg overflow-hidden mb-2">
                        <img src={activeCard.img} alt={activeCard.title} className="w-full h-full object-cover" />
                      </div>
                      <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                        {activeCard.title}
                      </h2>
                      <p className="text-xs text-slate-500 mb-2">{activeCard.school}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-500">MỞ SÁCH ĐỂ XEM CHI TIẾT</span>
                        <span className="animate-bounce">👉</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="book-inside-spread is-visible bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
                  {/* Left Page */}
                  <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
                    <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-white/50">
                      <img src={activeCard.img} alt={activeCard.title} className="w-full h-48 object-cover" />
                    </div>
                    <div className="mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-indigo-500">
                        {activeCard.categoryVi}
                      </span>
                      <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight mt-1">
                        {activeCard.title}
                      </h2>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500">{activeCard.year}</span>
                        <span>{activeCard.school}</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                        "{activeCard.summaryVi}"
                      </p>
                    </div>
                  </div>

                  {/* Right Page */}
                  <div className="flex-1 p-8 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                        <span className="w-8 h-px bg-slate-200 dark:bg-slate-800" />
                        Nội dung đào tạo
                      </h3>
                      <div className="space-y-2">
                        {activeCard.learnedVi.map((item, idx) => (
                          <div key={idx} className="flex gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span className="text-indigo-500 mt-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
                        <span className="w-8 h-px bg-emerald-500/20" />
                        Kết quả & Ứng dụng
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {activeCard.resultsVi.map((res, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            {res}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(activeCard.cred);
                          triggerToast('Đã sao chép mã!');
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors"
                      >
                        Sao chép mã
                      </button>
                      <button 
                        onClick={closeModal}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg hover:bg-indigo-500 transition-colors"
                      >
                        Đóng sách
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>

      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl z-[10000] animate-bounce">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
