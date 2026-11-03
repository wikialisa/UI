# 📁 06 — High-Fidelity Mobile UI (49 Màn hình 390px)

## 1. Màn hình Xác thực & Thiết lập (Auth Flow)
1. `auth-splash`: Màn hình khởi động, logo WikiAlisa Solar
2. `auth-login`: Đăng nhập số điện thoại / mật khẩu
3. `auth-otp-verification`: Xác thực mã OTP 4 số có đếm ngược
4. `auth-role-detection`: Tự động nhận diện quyền và tải giao diện phù hợp
5. `auth-permission-setup`: Cấp quyền GPS, Camera và Bộ nhớ
6. `auth-data-sync`: Tải trước dữ liệu ngoại tuyến (Offline cache)
7. `auth-session-expired`: Cảnh báo hết phiên đăng nhập an toàn
8. `auth-success`: Thông báo đăng nhập thành công

---

## 2. Giao diện 5 Nhóm Người dùng Thực địa

### Nhóm 1: Đối tác Giao hàng (Delivery Partner - 18 Màn hình)
- `Dash / 01 - Delivery Partner`: Bảng điều khiển giao nhận hôm nay
- `Del / 01 - Delivery List`: Danh sách các trạm cần giao
- `Del / 02 - Delivery Details`: Thông tin nông dân, chủng loại bơm
- `Del / 03 - Route Navigation`: Bản đồ GPS dẫn đường thực địa
- `Del / 04 - Farmer Contact`: Gọi điện / nhắn tin cho chủ hộ
- `Del / 05 - OTP Verification`: Nhập OTP bàn giao thiết bị
- `Del / 06 - Serial Verification`: Quét barcode / mã QR trên vỏ thùng
- `Del / 07 - Photo Upload`: Chụp 4 góc ảnh kiện hàng bàn giao
- `Del / 08 - Farmer Signature`: Chữ ký điện tử của nông dân
- `Del / 09 - GPS Verification`: Khóa tọa độ thực tế giao hàng
- `Del / 10 - Delivery Remarks`: Ghi chú tình trạng đường đi / thời tiết
- `Del / 11 - Delivery Confirmation`: Xác nhận chuyến giao thành công
- `Del / 12 - Offline Sync`: Đồng bộ dữ liệu khi có sóng 4G
- `Del / 13 - Delivery Timeline`: Nhật ký trạng thái từ kho đến hộ
- `Del / 14 -> 18`: Bottom sheets, dialogs, empty states, error states.

### Nhóm 2: Đội ngũ Lắp đặt (Installation Team)
- Danh sách công việc hôm nay, bảng kiểm tra kỹ thuật (góc nghiêng dàn pin 15°, độ sâu giếng, tiếp địa an toàn), chụp ảnh geo-tag trước và sau thi công.

### Nhóm 3: Kiểm định viên QA (QA Inspector)
- Danh sách nghiệm thu đang chờ, màn hình đo kiểm điện áp Voc/Imp, chụp ảnh chất lượng tấm pin, đóng dấu phê duyệt hoặc gửi biên bản làm lại.

### Nhóm 4: Kỹ thuật viên Dịch vụ (Service Tech)
- Danh sách phiếu bảo trì, bản đồ trạm bơm gặp sự cố, nhật ký thay thế linh kiện (inverter, cánh quạt, cảm biến cạn nước), đóng phiếu khiếu nại.

### Nhóm 5: Chủ hộ Nông dân (Farmer Portal)
- Màn hình giám sát công suất phát điện năng lượng mặt trời (kW), lưu lượng nước bơm (m³/h), nút bật/tắt bơm khẩn cấp, nút tạo phiếu báo hỏng.

---

## 3. Màn hình Cảnh báo & Trạng thái Ngoại lệ
- `You Are Currently Offline`: Dải thông báo ngoại tuyến màu đỏ nhạt
- `Session Expiring Soon`: Thông báo phiên làm việc sắp hết hạn
- `Confirm Operational Logout?`: Hộp thoại xác nhận đăng xuất nghiệp vụ
