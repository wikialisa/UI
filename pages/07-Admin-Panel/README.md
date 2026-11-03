# 📁 07 — Admin Panel (Bảng điều khiển Quản trị Desktop)

## 1. Tổng quan Kiến trúc Web Admin
Bảng điều khiển quản trị trên nền tảng Web Desktop dành cho Giám đốc vận hành, Quản trị viên hệ thống và Quản lý kho:
- **Độ phân giải chuẩn**: 1440 × 900 px (Responsive lên màn hình lớn 4K).
- **Cấu trúc khung nhìn**: Sidebar điều hướng bên trái (thu gọn/mở rộng) + Top Header tìm kiếm/thông báo + Khung nội dung trung tâm.

---

## 2. Hệ thống Menu Điều hướng (Sidebar Sub-menus)
1. **Operations (Điều hành Thực địa)**:
   - Theo dõi tiến độ giao nhận theo thời gian thực trên bản đồ vệ tinh.
   - Quản lý lịch trình lắp đặt và hiệu suất của các đội thi công.
   - Thống kê tỷ lệ nghiệm thu đạt/từ chối của kiểm định viên QA.
2. **Orders (Quản lý Đơn hàng & Hợp đồng)**:
   - Danh sách hồ sơ đăng ký trạm bơm nông nghiệp của nông dân.
   - Quản lý hợp đồng bảo dưỡng và trạng thái thanh toán.
3. **Warehouse (Quản lý Kho & Thiết bị)**:
   - Quản lý tồn kho tấm pin quang điện, biến tần inverter, máy bơm và phụ tùng thay thế.
   - Quét mã vạch xuất/nhập kho và gán dải số sê-ri cho từng chuyến giao vận.
4. **Service & Tickets (Khiếu nại & Hậu mãi)**:
   - Hàng đợi phiếu khiếu nại theo mức độ khẩn cấp (P1: Giếng cạn/Quá nhiệt, P2: Nắng yếu, P3: Cập nhật định kỳ).

---

## 3. Khối Dashboard KPIs Tổng hợp
- **Tổng công suất phát điện hôm nay**: Tổng MWh năng lượng mặt trời sinh ra trên toàn mạng lưới trạm bơm.
- **Tổng lưu lượng nước tưới**: Hàng nghìn m³ nước sạch cung cấp cho ruộng lúa và vườn cây ăn trái.
- **Chỉ số Sức khỏe Mạng lưới (Network Uptime)**: 99.4% trạm bơm hoạt động ổn định.
- **Tỷ lệ Xử lý Ngoại tuyến (Offline Sync Rate)**: 100% dữ liệu đồng bộ thành công sau khi kết nối lại mạng.
