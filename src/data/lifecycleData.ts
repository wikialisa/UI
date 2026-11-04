// src/data/lifecycleData.ts
import { LifecycleStep, SystemState } from '../types';

export const LIFECYCLE_STEPS: LifecycleStep[] = [
  { step: '01', title: 'Phân Công Trạm Bơm', role: 'Admin Dispatch', moduleSlug: 'module-03-dashboards', description: 'Điều phối viên giao trạm bơm và bộ linh kiện theo yêu cầu địa phương.' },
  { step: '02', title: 'Đối Tác Giao Nhận', role: 'Delivery Partner', moduleSlug: 'module-04-delivery', description: 'Tài xế tiếp nhận đơn hàng tại kho trung tâm và kiểm tra mã kiện.' },
  { step: '03', title: 'Di Chuyển Định Vị GPS', role: 'Delivery Route', moduleSlug: 'module-04-delivery', description: 'Định vị vệ tinh dẫn đường tối ưu lộ trình đến tận trang trại.' },
  { step: '04', title: 'Xác Minh OTP Nông Dân', role: 'Security Handshake', moduleSlug: 'module-04-delivery', description: 'Nông dân cung cấp mã 6 số để xác thực giao nhận đúng người.' },
  { step: '05', title: 'Hoàn Tất Giao Hàng (POD)', role: 'Digital Signature', moduleSlug: 'module-04-delivery', description: 'Quét QR serial, chụp ảnh và lấy chữ ký số Proof Of Delivery.' },
  { step: '06', title: 'Nhóm Lắp Đặt Nhận Lệnh', role: 'Install Queue', moduleSlug: 'module-05-installation', description: 'Tổ đội kỹ thuật nhận thông báo bàn giao và chuẩn bị công cụ thi công.' },
  { step: '07', title: 'Đến Vị Trí Hiện Trường', role: 'Geofence Fix', moduleSlug: 'module-05-installation', description: 'Xác nhận tọa độ GPS tại vị trí lắp đặt thực tế trong bán kính 50m.' },
  { step: '08', title: 'Lắp Tấm Pin & Biến Tần', role: 'PV & Inverter', moduleSlug: 'module-05-installation', description: 'Lắp khung giàn nghiêng 15° Nam, đấu nối tủ điện VFD và tiếp địa.' },
  { step: '09', title: 'Tải Ảnh Nghiệm Thu Kỹ Thuật', role: 'Photo Evidence', moduleSlug: 'module-05-installation', description: 'Chụp ảnh trước và sau khi lắp đặt theo tiêu chuẩn kỹ thuật.' },
  { step: '10', title: 'Hoàn Tất Lắp Đặt 35m³/h', role: 'Flow Test Pass', moduleSlug: 'module-05-installation', description: 'Chạy thử nghiệm máy bơm, đạt lưu lượng nước tiêu chuẩn 35m³/h.' },
  { step: '11', title: 'QA Nhận Nhiệm Vụ Audit', role: 'QA Inspector', moduleSlug: 'module-06-qa', description: 'Chuyên viên kiểm định tiếp nhận hồ sơ trong hàng đợi nghiệm thu.' },
  { step: '12', title: 'Xác Minh GPS & Tiêu Chuẩn', role: 'TCVN Electrical', moduleSlug: 'module-06-qa', description: 'Kiểm tra 18 tiêu chí an toàn điện TCVN và đối chiếu vị trí.' },
  { step: '13', title: 'Phê Duyệt Nghiệm Thu', role: 'Approval Grant', moduleSlug: 'module-06-qa', description: 'Ký số biên bản nghiệm thu đạt chuẩn không cần giấy tờ.' },
  { step: '14', title: 'Kích Hoạt Trợ Cấp & IoT', role: 'Subsidy Release', moduleSlug: 'module-06-qa', description: 'Mở khóa giải ngân nguồn vốn hỗ trợ năng lượng sạch cho nông dân.' },
  { step: '15', title: 'Nông Dân Bật Bơm Tưới', role: 'Farmer 1-Touch', moduleSlug: 'module-08-farmer', description: 'Nông dân điều khiển bật/tắt bơm 1 chạm trên điện thoại di động.' },
  { step: '16', title: 'Cảnh Báo Sự Cố E-04', role: 'Inverter Alarm', moduleSlug: 'module-07-service', description: 'Biến tần phát hiện cạn nước và gửi cảnh báo tự động về trung tâm.' },
  { step: '17', title: 'Kỹ Thuật Viên Nhận Phiếu', role: 'Service Tech', moduleSlug: 'module-07-service', description: 'Kỹ sư lưu động tiếp nhận phiếu sự cố SLA 24h và đến trạm bơm.' },
  { step: '18', title: 'Xuất Linh Kiện Dự Phòng', role: 'Spare Parts Hub', moduleSlug: 'module-07-service', description: 'Cấp phát cảm biến hoặc tụ bù thay thế từ kho xe lưu động.' },
  { step: '19', title: 'Khắc Phục & Thử Tải', role: 'Repair On-site', moduleSlug: 'module-07-service', description: 'Thay thế linh kiện, khởi động lại hệ thống và đo kiểm tải.' },
  { step: '20', title: 'Đóng Phiếu & Đánh Giá 5★', role: 'SLA Met & Closed', moduleSlug: 'module-07-service', description: 'Nông dân ký xác nhận hoàn thành, đánh giá 5 sao chất lượng dịch vụ.' }
];

export const SYSTEM_STATES: SystemState[] = [
  { name: 'Đang Tải', code: 'Loading', desc: 'Skeleton animation 120ms', color: 'blue' },
  { name: 'Trống', code: 'Empty', desc: 'Minh họa & Nút hành động', color: 'slate' },
  { name: 'Thành Công', code: 'Success', desc: 'Badge xanh & Mã giao dịch', color: 'emerald' },
  { name: 'Có Lỗi', code: 'Error', desc: 'Mã lỗi kỹ thuật & Thử lại', color: 'red' },
  { name: 'Ngoại Tuyến', code: 'Offline', desc: 'Thanh chỉ báo & SQLite cache', color: 'amber' },
  { name: 'Cấp Quyền', code: 'Permission', desc: 'Hộp thoại Camera/GPS/Storage', color: 'purple' },
  { name: 'Đang Đồng Bộ', code: 'Syncing', desc: 'Biểu tượng xoay & Đếm gói tin', color: 'teal' }
];
