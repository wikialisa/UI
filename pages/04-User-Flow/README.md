# 📁 04 — User Flow & Lifecycle Journeys

## 1. Chuỗi Quy trình Vận hành Toàn diện (20 Bước)

> **Chi tiết Flow Map 01**: Xem đặc tả 14 màn hình đăng nhập & onboarding tại [01-authentication-onboarding-flow.md](file:///c:/Users/Admin/Downloads/wikialisa/user/pages/04-User-Flow/01-authentication-onboarding-flow.md) (Figma Node `213:252`).

```text
[01 Bơm được phân công] ➔ [02 Tài xế nhận đơn] ➔ [03 Dẫn đường GPS] ➔ [04 Xác minh OTP] ➔ [05 Giao hàng xong]
         │
         ▼
[06 Đội lắp đặt nhận] ➔ [07 Đến địa điểm] ➔ [08 Lắp đặt hệ thống] ➔ [09 Tải ảnh nghiệm thu] ➔ [10 Hoàn tất lắp]
         │
         ▼
[11 QA nhận nhiệm vụ] ➔ [12 Đo kiểm Voc/Imp] ➔ [13 Phê duyệt QA] ➔ [14 Kích hoạt bơm] ➔ [15 Nông dân sử dụng]
         │
         ▼
[16 Gửi khiếu nại] ➔ [17 Kỹ thuật viên nhận] ➔ [18 Đến thực địa] ➔ [19 Sửa chữa/Thay thế] ➔ [20 Đóng phiếu]
```

---

## 2. Hành trình Người dùng theo 5 Vai trò

### 1. Delivery Partner (Đối tác Giao hàng)
1. Đăng nhập ➔ Bảng điều khiển giao vận
2. Chọn đơn hàng được phân công ➔ Xem chi tiết & số điện thoại nông dân
3. Bật định vị GPS dẫn đường
4. Đến nơi: Yêu cầu nông dân đọc mã OTP ➔ Quét mã vạch số sê-ri thùng bơm
5. Chụp ảnh kiện hàng nguyên vẹn ➔ Lấy chữ ký số của nông dân ➔ Hoàn thành chuyến giao.

### 2. Installation Team (Nhóm Lắp đặt)
1. Mở danh sách lắp đặt hôm nay ➔ Xem vị trí & đặc điểm thổ nhưỡng
2. Kiểm tra vật tư (khung pin, biến tần, dây cáp, phụ kiện)
3. Chụp ảnh hiện trạng trước lắp đặt
4. Thi công lắp dàn pin (15° Nam) & kết nối giếng bơm
5. Kích hoạt chạy thử nước ➔ Chụp ảnh sau lắp đặt ➔ Nộp hồ sơ nghiệm thu.

### 3. QA Inspector (Kiểm định viên QA)
1. Tiếp nhận hồ sơ từ đội lắp đặt
2. Đối chiếu tọa độ GPS thực địa với tọa độ cấp phép
3. Kiểm tra độ nét ảnh dàn pin & mối nối điện
4. Đo kiểm tra thông số điện (Điện áp hở mạch Voc, Dòng tải đỉnh Imp)
5. **Quyết định**: Phê duyệt (Kích hoạt cấp nước) HOẶC Từ chối (Kèm lý do làm lại).

### 4. Service Technician (Kỹ thuật viên Dịch vụ)
1. Nhận thông báo sự cố (bơm quá nhiệt, cạn nước, đứt cáp)
2. Liên hệ xác nhận với nông dân ➔ Di chuyển đến trạm
3. Kiểm tra bảng mã lỗi biến tần ➔ Tiến hành bảo dưỡng/thay linh kiện
4. Chụp ảnh trước/sau sửa chữa ➔ Thu thập đánh giá hài lòng ➔ Đóng phiếu.

### 5. Farmer (Nông dân - Chủ hộ)
1. Xem thông số thời gian thực: Công suất phát điện mặt trời (kW), Lưu lượng nước (m³/h)
2. Bật/Tắt máy bơm bằng nút điều khiển cảm ứng
3. Tạo phiếu báo sự cố nhanh (chụp ảnh, ghi âm giọng nói)
4. Theo dõi lịch bảo dưỡng định kỳ và lịch sử tiêu thụ điện.
