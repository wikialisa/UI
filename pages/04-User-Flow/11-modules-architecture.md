# 📦 11 Core Modules Architecture — Agriculture Solar Pump System

> Đặc tả kiến trúc linh kiện và phân chia màn hình theo 11 khối chức năng tiêu chuẩn của WikiAlisa UI.

---

## Module 1 — Authentication & Onboarding
* **Screens**:
  1. `Splash Screen`: Khởi động, hiển thị logo, kiểm tra cập nhật v2.4.1.
  2. `Onboarding`: Giới thiệu 6 giá trị cốt lõi của nền tảng.
  3. `Login`: Đăng nhập đa phương thức (Employee ID / Mobile Number).
  4. `OTP Verification / Password`: Xác thực mã bảo mật 6 số qua SMS.
  5. `Forgot Password`: Nhập số điện thoại yêu cầu khôi phục.
  6. `Reset Password`: Thiết lập mật khẩu mới có kiểm tra độ mạnh.
  7. `Session Expired`: Khóa phiên sau 30 phút không hoạt động để bảo mật.
  8. `Permission Setup`: Cấp quyền GPS, Camera, SQLite Cache, Notifications.
  9. `Role Detection`: Nhận diện vai trò người dùng thực địa tự động.
  10. `Sync Configuration (Offline Ready)`: Tải sẵn dữ liệu tuyến đường để chạy ngoại tuyến.

---

## Module 2 — Global Navigation
* **Shared Screens**:
  1. `Dashboard Shell`: Khung điều hướng chung có Bottom Tab Bar thích ứng.
  2. `Notifications`: Trung tâm thông báo theo thời gian thực (đơn mới, cảnh báo cạn giếng).
  3. `Profile`: Thông tin nhân sự và mã định danh EMP ID.
  4. `Settings`: Cài đặt giao diện Tối/Sáng, ngôn ngữ tiếng Việt, âm thanh phản hồi.
  5. `Help & Support`: Đường dây nóng hỗ trợ kỹ thuật thực địa 24/7.
  6. `About App`: Thông tin phiên bản, bản quyền WikiAlisa Corporation.
  7. `Privacy Policy`: Chính sách bảo vệ dữ liệu cá nhân nông dân và tọa độ giếng.
  8. `Terms & Conditions`: Điều khoản dịch vụ và cam kết bảo hành.

---

## Module 3 — Dashboards (Khác Biệt Theo 5 Vai Trò)
1. **Delivery Dashboard**:
   - `Today's Deliveries`: Số chuyến giao trong ngày.
   - `Pending Deliveries`: Các đơn đang chờ bốc dỡ.
   - `Completed Deliveries`: Đơn đã giao xong có chữ ký POD.
   - `Quick Actions`: Mở bản đồ dẫn đường, quét mã QR nhanh.
   - `Recent Activity`: Dòng thời gian các điểm giao hoàn tất.
2. **Installation Dashboard**:
   - `Assigned Installations`: Danh sách trạm bơm được phân công.
   - `Today's Work`: Tiến độ lắp đặt thực tế.
   - `Installation Progress`: Tỷ lệ hoàn thành theo từng bước kỹ thuật.
   - `Pending Tasks`: Các trạm chờ nghiệm thu nước giếng.
3. **QA Dashboard**:
   - `Pending Inspections`: Hồ sơ chờ duyệt.
   - `Approved Today`: Số trạm đã đóng dấu đạt chuẩn.
   - `Rejected Today`: Trạm không đạt yêu cầu làm lại.
   - `High Priority Cases`: Các trường hợp lệch tọa độ hoặc lỗi Voc.
4. **Service Dashboard**:
   - `Open Tickets`: Phiếu sự cố đang mở.
   - `Assigned Complaints`: Khiếu nại được giao xử lý.
   - `Emergency Requests`: Báo cạn giếng khẩn cấp E-04.
   - `Today's Schedule`: Lịch di chuyển bảo trì trạm.
5. **Farmer Dashboard**:
   - `Pump Status`: Trạng thái máy bơm (Đang chạy / Tắt nghỉ).
   - `Active Complaints`: Khiếu nại đang chờ kỹ thuật viên đến.
   - `Service History`: Lịch sử các lần thay thế linh kiện.
   - `Notifications`: Cảnh báo nắng mạnh tối ưu hóa lưu lượng bơm.

---

## Module 4 — Delivery (Giao Vận)
* **Screens**:
  1. `Delivery List`: Danh sách đơn giao xếp theo khoảng cách địa lý.
  2. `Delivery Detail`: Cấu hình máy bơm 3HP, 8 tấm pin 540W, Inverter MPPT.
  3. `Farmer Detail`: Tên chủ hộ Bác Ba Phi, số điện thoại, địa chỉ ấp.
  4. `Navigation Map`: Bản đồ vệ tinh dẫn đường tránh cầu yếu.
  5. `OTP Verification`: Nhập mã bàn giao do nông dân cung cấp.
  6. `Serial Number Scan`: Kính ngắm quét mã vạch thùng bơm.
  7. `Photo Upload`: Chụp 4 góc ảnh hàng hóa hạ bãi an toàn kèm Watermark.
  8. `Signature Capture`: Vùng ký nhận cảm ứng ngón tay.
  9. `Delivery Confirmation`: Cấp mã biên bản POD-8942-VN.
  10. `Delivery Success`: Màn hình hoàn thành rực rỡ và nhận chuyến tiếp theo.

---

## Module 5 — Installation (Thi Công Lắp Đặt)
* **Screens**:
  1. `Installation List`: Danh sách các trạm cần thi công cơ điện.
  2. `Installation Detail`: Bản vẽ kỹ thuật góc nghiêng dàn pin và giếng.
  3. `Material Verification`: Kiểm đếm phụ kiện, cọc tiếp địa, giàn khung.
  4. `Checklist`: Tích chọn 3 tiêu chuẩn bắt buộc (Góc 15° Nam, Giếng 35m, Tiếp địa < 10 Ohm).
  5. `Before Photos`: Chụp mặt bằng giếng trước khi thi công.
  6. `Installation Form`: Nhập số liệu mực nước tĩnh và công suất biến tần.
  7. `Pump Testing`: Vận hành chạy thử 30 phút, kiểm tra áp lực nước.
  8. `After Photos`: Chụp toàn cảnh công trình hoàn thiện.
  9. `Signature`: Kỹ thuật viên trưởng ký biên bản nghiệm thu kỹ thuật.
  10. `Completion Report`: Bản tổng hợp thông số thi công.
  11. `Installation Success`: Chuyển hồ sơ sang hàng đợi QA Inspector.

---

## Module 6 — QA (Nghiệm Thu Chất Lượng)
* **Screens**:
  1. `QA Task List`: Hàng đợi trạm bơm cần kiểm định.
  2. `Inspection Detail`: So sánh số liệu đăng ký và thi công thực tế.
  3. `GPS Verification`: Xác minh vị trí giếng khoan không lệch quá 50m.
  4. `Photo Verification`: Phóng to kiểm tra mối nối dây điện và cọc chống sét.
  5. `QA Checklist`: Đo kiểm Voc (420V) và Imp (11.2A).
  6. `Notes`: Ghi nhận khuyến nghị vận hành.
  7. `Approve`: Phê duyệt cấp phép vận hành chính thức.
  8. `Reject`: Từ chối nghiệm thu, chỉ rõ hạng mục vi phạm.
  9. `Rework`: Yêu cầu đội lắp đặt điều chỉnh lại trong 24h.
  10. `QA Report & Success`: Phát hành chứng nhận an toàn điện mặt trời.

---

## Module 7 — Service (Bảo Trì & Sửa Chữa)
* **Screens**:
  1. `Complaint List`: Danh sách báo hỏng từ nông dân.
  2. `Complaint Detail`: Báo cạn nước, đứt cáp nguồn hoặc quạt tản nhiệt ngắt.
  3. `Customer Detail`: Liên hệ xác nhận giờ hẹn tới đồng ruộng.
  4. `Navigate`: Tìm đường đến tọa độ trạm bơm sự cố.
  5. `Inspection`: Đo điện trở cuộn dây động cơ bơm chìm.
  6. `Spare Parts`: Xuất kho vật tư thay thế (phao điện tử, tụ khởi động).
  7. `Repair Report`: Nhật ký khắc phục và mã lỗi xử lý.
  8. `Upload Photos`: Chụp ảnh chi tiết trước và sau khi thay linh kiện.
  9. `Customer Feedback`: Nông dân chấm sao và xác nhận máy bơm hoạt động trở lại.
  10. `Close Ticket`: Hoàn tất phiếu sự cố.

---

## Module 8 — Farmer (Cổng Nông Dân)
* **Screens**:
  1. `Home`: Đồng hồ đo lưu lượng nước tưới (m³/h) và trạng thái máy bơm.
  2. `Pump Details`: Thống kê tiền điện tiết kiệm và số giờ nắng hữu ích.
  3. `Complaint Registration`: Báo hỏng nhanh bằng ảnh chụp hiện trường.
  4. `Complaint Status`: Xem kỹ thuật viên đang đến cách bao xa.
  5. `Service History`: Danh sách các lần kiểm định và bảo trì.
  6. `Notifications`: Nhắc nhở vệ sinh bề mặt tấm pin năng lượng mặt trời.
  7. `Ratings`: Đánh giá mức độ hài lòng về lưu lượng nước tưới.
  8. `Profile`: Thông tin diện tích vườn cây và mã số giếng khoan.

---

## Module 9 — Notifications
* **Screens**:
  1. `Notification List`: Phân loại thông báo (Công việc, Cảnh báo kỹ thuật, Hệ thống).
  2. `Notification Detail`: Chi tiết nội dung thông báo kèm nút thao tác nhanh.
  3. `Mark as Read`: Xóa hoặc đánh dấu đã đọc toàn bộ.

---

## Module 10 — Profile & Account
* **Screens**:
  1. `My Profile`: Thẻ nhân viên số hóa có mã QR định danh.
  2. `Edit Profile`: Cập nhật số điện thoại liên lạc khẩn cấp.
  3. `Change Password`: Đổi mã bảo mật định kỳ.
  4. `Language`: Chọn tiếng Việt hoặc tiếng Khmer (cho nông dân Tây Nam Bộ).
  5. `Logout`: Đăng xuất kèm kiểm tra an toàn dữ liệu ngoại tuyến.

---

## Module 11 — Edge Cases & Supporting States
1. **Empty States**:
   - `No Tasks`: Không có đơn hàng/trạm bơm phân công hôm nay.
   - `No Notifications`: Không có thông báo mới.
   - `No Complaints`: Không có sự cố nào ghi nhận.
   - `No Internet`: Mất kết nối viễn thông 4G (hiển thị hướng dẫn lưu ngoại tuyến).
2. **Error States**:
   - `Invalid OTP`: Báo đỏ và đếm ngược yêu cầu nhập lại mã.
   - `QR Scan Failed`: Không đọc được mã vạch do mờ/rách (cho phép nhập tay).
   - `GPS Unavailable`: Mất tín hiệu vệ tinh ngoài đồng ruộng.
   - `Upload Failed`: Lỗi tải ảnh lên đám mây (lưu tạm vào SQLite).
   - `Sync Failed`: Xung đột phiên bản dữ liệu (áp dụng Conflict Resolver).
3. **Loading States**:
   - `Initial Loading`: Màn hình khởi tạo ứng dụng.
   - `Skeleton Loading`: Khung giao diện chờ tải danh sách đơn hàng.
   - `Upload Progress`: Thanh tiến độ % tải ảnh và video thực địa.
4. **Success States**:
   - `Delivery Completed`: Hoàn tất giao hàng.
   - `Installation Completed`: Hoàn tất thi công.
   - `QA Approved`: Phê duyệt đạt chuẩn kiểm định.
   - `Complaint Closed`: Đóng phiếu xử lý sự cố.
