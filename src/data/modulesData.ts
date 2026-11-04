// src/data/modulesData.ts
import { ModuleDefinition } from '../types';

export const MODULES_DATA: ModuleDefinition[] = [
  {
    id: '01',
    slug: 'module-01-auth',
    title: 'Xác Thực, Đăng Nhập & Phân Quyền (RBAC)',
    titleEn: 'Authentication, Onboarding & RBAC',
    tag: 'Bảo Mật & Khởi Tạo',
    color: 'emerald',
    icon: 'ShieldCheck',
    summary: 'Quy trình khởi tạo phiên làm việc bảo mật cao với OTP 6 số, cấp quyền phần cứng (Camera, GPS, Bộ nhớ) và phân quyền 5 vai trò theo cơ chế RBAC phân tầng.',
    roles: ['Đối tác giao hàng', 'Đội ngũ lắp đặt', 'Kiểm tra viên QA', 'Kỹ thuật viên dịch vụ', 'Nông dân (Chủ trạm)'],
    kpis: [
      { label: 'Thời gian xác thực OTP', val: '< 2.1s' },
      { label: 'Độ trễ phân quyền RBAC', val: '12ms' },
      { label: 'Chu kỳ làm mới JWT', val: '24 giờ' },
      { label: 'Tỷ lệ phiên hợp lệ', val: '99.98%' }
    ],
    figmaScreens: [
      { name: 'Splash Screen & Brand Identity', node: '9:78', img: 'auth-data-sync.png' },
      { name: 'Login with Phone & Password', node: '213:252', img: 'auth-role-detection.png' },
      { name: 'OTP Verification (6 Digits)', node: '213:260', img: 'auth-otp-verification.png' },
      { name: 'Permission Setup (GPS, Cam, Storage)', node: '213:280', img: 'auth-permission-setup.png' },
      { name: 'Role Detection & SQLite Cache', node: '213:295', img: 'auth-loading-states.png' }
    ]
  },
  {
    id: '02',
    slug: 'module-02-navigation',
    title: 'Điều Hướng Toàn Cục & Kiến Trúc Vai Trò',
    titleEn: 'Global Navigation & Role Architecture',
    tag: 'Giao Diện & Trải Nghiệm',
    color: 'blue',
    icon: 'Compass',
    summary: 'Hệ thống thanh điều hướng đáy động học 5 tab thích ứng theo từng vai trò, kèm thanh chỉ báo ngoại tuyến và drawer điều hướng nhanh đa cấp.',
    roles: ['Toàn bộ 5 nhóm vai trò thực địa & Admin'],
    kpis: [
      { label: 'Thời gian chuyển tab', val: '< 16ms' },
      { label: 'Số tab thích ứng vai trò', val: '5 layout' },
      { label: 'Tương thích màn hình 390px', val: '100% Pixel' },
      { label: 'Hỗ trợ thao tác 1 tay', val: 'Tối ưu 44px+' }
    ],
    figmaScreens: [
      { name: '5-Tab Bottom Navigation Bar', node: '215:100', img: 'Role-Based Bars.png' },
      { name: 'Floating Navigation Profiles', node: '215:120', img: 'Floating bottom navigation profiles.png' },
      { name: 'Home Indicator Container', node: '215:140', img: 'home-indicator-container.png' },
      { name: 'Interactive Overlays & Drawers', node: '215:160', img: 'Interactive Overlays.png' },
      { name: 'Empty & Loading States', node: '215:180', img: 'Screen-19-Loading-States.png' }
    ]
  },
  {
    id: '03',
    slug: 'module-03-dashboards',
    title: 'Bảng Điều Khiển Tác Nghiệp Theo Vai Trò',
    titleEn: 'Operational Role Dashboards',
    tag: 'Trung Tâm Chỉ Huy',
    color: 'indigo',
    icon: 'LayoutDashboard',
    summary: 'Trung tâm chỉ huy trực quan hóa hiệu suất theo từng vai trò: tiến độ lộ trình giao, khối lượng lắp đặt, hàng đợi nghiệm thu QA, và giám sát trạm bơm mặt trời.',
    roles: ['Tất cả 5 vai trò thực địa + Ban Quản Trị Trung Tâm'],
    kpis: [
      { label: 'Số trạm bơm giám sát', val: '248 trạm' },
      { label: 'Tổng công suất Solar', val: '1.42 MWp' },
      { label: 'Lưu lượng bơm tích lũy', val: '45,820 m³' },
      { label: 'Thời gian phản hồi SLA', val: '< 2.4 giờ' }
    ],
    figmaScreens: [
      { name: 'Delivery Partner Dashboard', node: '220:10', img: 'Dash/01 - Delivery Partner.png' },
      { name: 'Installation Team Dashboard', node: '220:40', img: '2. Installation Team.png' },
      { name: 'QA Inspector Dashboard', node: '220:70', img: '3. QA Inspector.png' },
      { name: 'Service Technician Dashboard', node: '220:90', img: '4. Service Technician.png' },
      { name: 'Farmer Smart Solar Hub', node: '220:110', img: '5. Farmer (Consumer).png' }
    ]
  },
  {
    id: '04',
    slug: 'module-04-delivery',
    title: 'Nghiệp Vụ Giao Hàng & Chuỗi Cung Ứng (Del 01–18)',
    titleEn: 'Delivery Operations & Supply Chain',
    tag: 'Thực Địa & Kho Vận',
    color: 'amber',
    icon: 'Truck',
    summary: 'Chuỗi quy trình 18 bước khép kín từ kho trung tâm đến trang trại nông dân: định vị dẫn đường, đối chiếu mã QR serial kiện hàng, OTP xác thực và chữ ký số POD.',
    roles: ['Đối tác giao hàng', 'Thủ kho trung tâm', 'Điều phối viên vận tải'],
    kpis: [
      { label: 'Tốc độ quét mã Serial', val: '0.6s' },
      { label: 'Độ chính xác GPS giao hàng', val: '< 3m' },
      { label: 'Tỷ lệ hoàn tất POD', val: '99.4%' },
      { label: 'Số kiện hàng giao/ngày', val: '38 bộ solar' }
    ],
    figmaScreens: [
      { name: 'Del 01 - Delivery Tasks List', node: '230:10', img: 'Del/01 - Delivery List.png' },
      { name: 'Del 02 - Delivery Details Sheet', node: '230:20', img: 'Del/02 - Delivery Details.png' },
      { name: 'Del 03 - GPS Route Navigation', node: '230:30', img: 'Del/03 - Route Navigation.png' },
      { name: 'Del 06 - Serial QR Scanner', node: '230:60', img: 'Del/06 - Serial Verification.png' },
      { name: 'Del 08 - Farmer Signature Capture', node: '230:80', img: 'Del/08 - Farmer Signature.png' },
      { name: 'Del 11 - Delivery Confirmation (POD)', node: '230:110', img: 'Del/11 - Delivery Confirmation.png' }
    ]
  },
  {
    id: '05',
    slug: 'module-05-installation',
    title: 'Thi Công Lắp Đặt & Nghiệm Thu Kỹ Thuật',
    titleEn: 'Installation Operations & Engineering',
    tag: 'Kỹ Thuật Xây Lắp',
    color: 'orange',
    icon: 'Wrench',
    summary: 'Bộ công cụ kiểm định kỹ thuật lắp ráp pin mặt trời, biến tần VFD, dây dẫn chống sét, đo điện trở nối đất và chạy thử nghiệm lưu lượng bơm thực tế đạt chuẩn.',
    roles: ['Kỹ sư lắp đặt', 'Thợ điện năng lượng mặt trời', 'Trưởng nhóm kỹ thuật'],
    kpis: [
      { label: 'Thời gian thi công bình quân', val: '4.5 giờ/trạm' },
      { label: 'Tiêu chuẩn góc nghiêng pin', val: '15° Nam' },
      { label: 'Lưu lượng thử nghiệm đạt', val: '35 m³/h' },
      { label: 'Tỷ lệ kiểm định đạt vòng 1', val: '96.2%' }
    ],
    figmaScreens: [
      { name: 'BOM Material Checklist', node: '240:10', img: 'MODULE 02   Installation Team App Flow.png' },
      { name: 'Solar PV Array Mounting Check', node: '240:30', img: 'MODULE 02   Installation execution - checks to QA handoff.png' },
      { name: 'Inverter Wiring & Grounding Check', node: '240:50', img: 'Frame-2.png' },
      { name: 'Pump Flow Test (35 m³/h)', node: '240:70', img: 'Frame-3.png' },
      { name: 'Before/After Photo Verification', node: '240:90', img: 'Frame-4.png' }
    ]
  },
  {
    id: '06',
    slug: 'module-06-qa',
    title: 'Kiểm Định Chất Lượng & Tuân Thủ (QA)',
    titleEn: 'Quality Assurance & Compliance',
    tag: 'Kiểm Định & Pháp Lý',
    color: 'purple',
    icon: 'CheckCircle2',
    summary: 'Hệ thống kiểm định hiện trường nghiêm ngặt với xác thực vị trí GPS trong bán kính 50m, bộ tiêu chuẩn an toàn điện TCVN, phê duyệt giải ngân hỗ trợ công nghệ.',
    roles: ['Kiểm tra viên QA độc lập', 'Đại diện cơ quan bảo trợ năng lượng'],
    kpis: [
      { label: 'Bán kính Geofence hợp lệ', val: '≤ 50 mét' },
      { label: 'Số tiêu chí an toàn TCVN', val: '18 mục' },
      { label: 'Thời gian duyệt hồ sơ', val: '< 15 phút' },
      { label: 'Tính toàn vẹn hồ sơ nghiệm thu', val: '100% SHA-256' }
    ],
    figmaScreens: [
      { name: 'QA Inspection Queue', node: '250:10', img: 'MODULE 03   QA Inspector App Flow.png' },
      { name: 'GPS Geofence Radius Verification', node: '250:30', img: 'Frame-5.png' },
      { name: 'TCVN Electrical Standard Checklist', node: '250:50', img: 'Frame-6.png' },
      { name: 'Approve & Subsidy Disbursement', node: '250:70', img: 'Frame-7.png' },
      { name: 'Rework Ticket Dispatch', node: '250:90', img: 'Frame-8.png' }
    ]
  },
  {
    id: '07',
    slug: 'module-07-service',
    title: 'Bảo Hành, Sửa Chữa & Quản Lý Sự Cố',
    titleEn: 'Service, Maintenance & SLA Ticketing',
    tag: 'Dịch Vụ & Hậu Mãi',
    color: 'rose',
    icon: 'LifeBuoy',
    summary: 'Quy trình xử lý sự cố trong vòng 24 giờ: tiếp nhận mã lỗi từ xa (E-04 Cạn nước, E-01 Quá dòng), xuất linh kiện từ kho dự phòng và khôi phục hoạt động tưới tiêu.',
    roles: ['Kỹ thuật viên dịch vụ lưu động', 'Điều phối viên bảo hành', 'Thủ kho linh kiện'],
    kpis: [
      { label: 'Thời gian đáp ứng SLA', val: '< 2.8 giờ' },
      { label: 'Tỷ lệ giải quyết lần đầu (FCR)', val: '93.5%' },
      { label: 'Độ sẵn sàng linh kiện thay thế', val: '98.1%' },
      { label: 'Mức độ hài lòng của Nông dân', val: '4.9 / 5.0' }
    ],
    figmaScreens: [
      { name: 'Service Ticket Intake & Routing', node: '260:10', img: 'MODULE 04   Service Technician App Flow.png' },
      { name: 'Inverter Fault Diagnosis (E-04 Dry Run)', node: '260:30', img: 'Frame-9.png' },
      { name: 'Spare Parts Requisition & Stock', node: '260:50', img: 'Frame.png' },
      { name: 'Farmer Customer Sign-off', node: '260:70', img: 'States and all hover Effects.png' },
      { name: 'SLA Performance & Ticket Closure', node: '260:90', img: 'DOCUMENTATION SAMPLES.png' }
    ]
  },
  {
    id: '08',
    slug: 'module-08-farmer',
    title: 'Cổng Trải Nghiệm Nông Dân & Quản Lý Nước',
    titleEn: 'Farmer Consumer Portal & Water Quotas',
    tag: 'Nông Nghiệp Thông Minh',
    color: 'green',
    icon: 'Sprout',
    summary: 'Ứng dụng di động thân thiện dành cho nông dân: bật/tắt bơm 1 chạm qua sóng di động/LoRa, theo dõi lượng điện phát sinh, hẹn giờ tưới và gửi báo lỗi tức thì.',
    roles: ['Nông dân chủ sở hữu trạm bơm', 'Hợp tác xã nông nghiệp địa phương'],
    kpis: [
      { label: 'Độ trễ lệnh bật/tắt bơm', val: '< 1.2s' },
      { label: 'Nước bơm bình quân ngày', val: '185 m³/ngày' },
      { label: 'Tiết kiệm chi phí dầu diesel', val: '100% Zero-Carbon' },
      { label: 'Thời gian tưới tự động', val: '08:00 - 15:30' }
    ],
    figmaScreens: [
      { name: '1-Touch Pump Remote Control', node: '270:10', img: 'MODULE 05   Farmer App Flow.png' },
      { name: 'Real-time Flow Rate & Solar Power', node: '270:30', img: '5. Farmer (Consumer).png' },
      { name: 'Smart Irrigation Schedule', node: '270:50', img: 'Screen-20-Accessibility.png' },
      { name: 'Daily Water Quota & Subsidy Meter', node: '270:70', img: 'Del/14 - Dashboard Widgets.png' },
      { name: 'SOS Breakdown Request Button', node: '270:90', img: 'Del/16 - Dialogs.png' }
    ]
  },
  {
    id: '09',
    slug: 'module-09-notifications',
    title: 'Thông Báo Thời Gian Thực & Phát Sóng Khẩn Cấp',
    titleEn: 'Real-time Notifications & Emergency Broadcast',
    tag: 'Truyền Thông & Cảnh Báo',
    color: 'cyan',
    icon: 'BellRing',
    summary: 'Trung tâm phát tin tức và cảnh báo đa kênh: thông báo giờ nắng đỉnh điểm (Peak Sun Hours), cảnh báo giông lốc bảo vệ tấm pin, và lệnh điều phối hiện trường.',
    roles: ['Tất cả người dùng di động', 'Cán bộ điều độ thiên tai & thời tiết'],
    kpis: [
      { label: 'Tốc độ đẩy thông báo Push', val: '< 450ms' },
      { label: 'Tỷ lệ mở thông báo (CTR)', val: '87.4%' },
      { label: 'Độ tin cậy gửi SMS dự phòng', val: '99.95%' },
      { label: 'Số tin phát khẩn cấp/tháng', val: '4 sự kiện' }
    ],
    figmaScreens: [
      { name: 'In-app Notification Inbox', node: '280:10', img: 'Del/15 - Bottom Sheets.png' },
      { name: 'Solar Peak Generation Push', node: '280:30', img: 'State Popup.png' },
      { name: 'Severe Weather Storm Advisory', node: '280:50', img: 'Del/10 - Delivery Remarks.png' },
      { name: 'Admin Emergency Broadcast Center', node: '280:70', img: 'Del/13 - Delivery Timeline.png' }
    ]
  },
  {
    id: '10',
    slug: 'module-10-profile',
    title: 'Hồ Sơ Nhân Sự, Chấm Công & An Toàn Lao Động',
    titleEn: 'Workforce Profile, Shift & Field Safety',
    tag: 'Nhân Sự & An Toàn',
    color: 'teal',
    icon: 'UserCheck',
    summary: 'Hồ sơ số hóa dành cho lực lượng kỹ thuật viên: chứng chỉ thợ điện năng lượng mặt trời, bộ đồng hồ chấm công theo tọa độ GPS và bảng kiểm tra trang bị bảo hộ PPE.',
    roles: ['Kỹ thuật viên thực địa', 'Trưởng phòng an toàn lao động (EHS)', 'Quản lý nhân sự'],
    kpis: [
      { label: 'Tỷ lệ tuân thủ trang bị PPE', val: '99.6%' },
      { label: 'Thời gian bấm ca làm việc', val: '< 5 giây' },
      { label: 'Chứng chỉ điện còn hiệu lực', val: '100% Verified' },
      { label: 'Số giờ công an toàn lũy kế', val: '14,200 giờ' }
    ],
    figmaScreens: [
      { name: 'Technician Digital Identity & Badge', node: '290:10', img: 'Confirm Operational Logout_.png' },
      { name: 'PV Electrician Certification Wallet', node: '290:30', img: 'Session Expiring Soon.png' },
      { name: 'Daily GPS Shift Check-in / Check-out', node: '290:50', img: 'Del/09 - GPS Verification.png' },
      { name: 'PPE Safety Compliance Checklist', node: '290:70', img: 'Del/04 - Farmer Contact.png' }
    ]
  },
  {
    id: '11',
    slug: 'module-11-edge-cases',
    title: 'Xử Lý Ngoại Lệ, Chế Độ Ngoại Tuyến & Phục Hồi Dữ Liệu',
    titleEn: 'Edge Cases, Offline SQLite & Data Resilience',
    tag: 'Khả Năng Chịu Lỗi & Ngoại Tuyến',
    color: 'red',
    icon: 'WifiOff',
    summary: 'Kiến trúc bảo vệ dữ liệu tuyệt đối với 16 kịch bản ngoại lệ: mất sóng 4G giữa cánh đồng, từ chối quyền camera, xung đột mã linh kiện và cơ chế đồng bộ nền SQLite.',
    roles: ['Đội ngũ kỹ thuật phần mềm', 'Kỹ thuật viên hiện trường vùng sâu vùng xa'],
    kpis: [
      { label: 'Dung lượng bộ đệm ngoại tuyến', val: '500+ tác vụ' },
      { label: 'Tỷ lệ mất mát dữ liệu', val: '0.00% Zero-Loss' },
      { label: 'Thời gian tái đồng bộ khi có 4G', val: '< 3.2s' },
      { label: 'Độ bền cơ chế tự phục hồi', val: 'Chuẩn Công Nghiệp' }
    ],
    figmaScreens: [
      { name: 'Offline Mode Banner & SQLite Queue', node: '300:10', img: 'You Are Currently Offline.png' },
      { name: 'Camera Permission Denied Fallback', node: '300:30', img: 'Del/18 - Error States.png' },
      { name: 'QR Serial Scan Conflict Resolution', node: '300:50', img: 'Del/17 - Empty States.png' },
      { name: 'Inverter Overheating / Dry Run Trip', node: '300:70', img: 'Error States Reference.png' },
      { name: 'Sync Retry & Data Reconciliation', node: '300:90', img: 'Del/12 - Offline Sync.png' }
    ]
  }
];
