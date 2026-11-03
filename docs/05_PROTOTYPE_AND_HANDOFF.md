# Giai đoạn 05 & 06 — Đặc tả Nguyên mẫu & Hướng dẫn Bàn giao (Handoff)

## 1. Kịch bản Nguyên mẫu (Phase 05)
Mỗi vai trò được xây dựng trên 3 nhánh luồng tương tác:
- **Đường đi thành công (Happy Path)**: Toàn bộ tác vụ được hoàn tất chuẩn chỉ.
- **Đường đi lỗi (Error Path)**: Xử lý sai mã OTP, không nhận diện QR, lệch tọa độ GPS.
- **Đường đi ngoại tuyến (Offline Path)**: Lưu trữ tạm thời trên máy, hiển thị dải thông báo `☁️ Pending`.

## 2. Quy chuẩn Bàn giao Kỹ thuật (Phase 06)
- **Tỷ lệ khung nhìn**: Base width chuẩn 390px (iPhone & Android tiêu chuẩn).
- **Vùng bấm tối thiểu (Touch Target)**: Tối thiểu 48 × 48 pt cho mọi nút điều khiển ngoài trời.
- **Tokens Export**: Đồng bộ tự động qua định dạng JSON, CSS Variables, TypeScript và Dart Theme.
