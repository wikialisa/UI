# 📁 08 — Prototype & Interactive Flows

## 1. Kế hoạch Xây dựng Nguyên mẫu (Figma Prototype)
Nguyên mẫu tương tác mô phỏng trải nghiệm thực tế với 3 nhánh đường đi bắt buộc cho từng nhóm người dùng:

### A. Đường đi Thành công (Happy Path)
- Người dùng đăng nhập ➔ Nhận diện vai trò tự động ➔ Mở chi tiết công việc.
- Dẫn đường GPS đến thực địa ➔ Xác thực OTP hợp lệ ➔ Quét mã QR số sê-ri chuẩn.
- Tải ảnh bằng chứng chất lượng cao ➔ Ký nhận điện tử ➔ Màn hình thành công rực rỡ.

### B. Đường đi Lỗi & Phục hồi (Error & Recovery Path)
- **Sai mã OTP**: Hiển thị thông báo đỏ, rung phản hồi xúc giác (Haptic feedback), đếm ngược gửi lại mã.
- **Từ chối quyền Camera/GPS**: Mở hộp thoại hướng dẫn truy cập Cài đặt hệ điều hành để cấp lại quyền.
- **Lệch tọa độ GPS**: Cảnh báo kiểm tra lại vị trí lắp đặt so với hồ sơ đăng ký.
- **Tải ảnh thất bại**: Nút "Thử lại ngay" (Retry with local cache).

### C. Đường đi Ngoại tuyến (Offline Path)
- Kích hoạt chế độ mất sóng (mô phỏng ngoài đồng ruộng).
- Toàn bộ thao tác checklist, chụp ảnh và lấy chữ ký vẫn diễn ra mượt mà, lưu vào bộ nhớ đệm thiết bị.
- Dải thông báo `☁️ 3 bản ghi đang chờ đồng bộ`.
- Tự động đồng bộ lên máy chủ ngay khi có sóng di động trở lại.

---

## 2. Tiêu chuẩn Đánh giá & Phê duyệt Nguyên mẫu
- **Đánh giá nội bộ**: Trưởng nhóm thiết kế kiểm tra tính nhất quán linh kiện và độ mượt của chuyển động (transitions).
- **Phỏng vấn người dùng thực tế**: Cho tài xế và nông dân thử nghiệm bấm trên màn hình điện thoại 390px dưới ánh nắng.
- **Biên bản phê duyệt**: Đạt tiêu chí thời gian hoàn thành tác vụ < 3 phút cho một ca giao hàng hoặc nghiệm thu.
