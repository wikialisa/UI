# Giai đoạn 04 — Kiến trúc Ứng dụng Di động (Mobile Architecture)

## 1. 11 Mô-đun Chức năng
1. **Xác thực (Authentication)**: Đăng nhập, quên mật khẩu, phân quyền theo vai trò.
2. **Điều hướng toàn cục (Global Navigation)**: Top App Bar, Bottom Navigation 5 tab.
3. **Bảng điều khiển (Dashboard)**: Tùy biến hiển thị số liệu phù hợp từng vai trò.
4. **Quản lý Giao hàng (Delivery)**: Lộ trình GPS, quét QR/Barcode, chữ ký số.
5. **Quản lý Lắp đặt (Installation)**: Checklist vật tư, ảnh geo-tag thực địa.
6. **Kiểm định chất lượng (QA)**: Đo kiểm điện áp, lưu lượng nước, phê duyệt/từ chối.
7. **Bảo trì & Dịch vụ (Service)**: Xử lý phiếu khiếu nại, chẩn đoán, thay thế phụ tùng.
8. **Chủ hộ Nông dân (Farmer Portal)**: Giám sát năng lượng, điều khiển bơm.
9. **Thông báo (Notifications)**: Cảnh báo sự cố tức thời, lịch bảo trì.
10. **Hồ sơ & Tài khoản (Profile)**: Thông tin cá nhân, cài đặt bảo mật.
11. **Trường hợp ngoại lệ (Edge Cases)**: Xử lý trạng thái trống, lỗi mạng, mất sóng.

## 2. Mô hình Ngoại tuyến (Offline-First Pattern)
- Lưu đệm dữ liệu cục bộ SQLite / WatermelonDB khi mất sóng viễn thông ngoài đồng ruộng.
- Hàng đợi đồng bộ (Sync Queue) tự động kích hoạt khi có kết nối trở lại kèm cơ chế chống xung đột phiên bản.
