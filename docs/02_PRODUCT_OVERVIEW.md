# Tài liệu sáu giai đoạn — Tiếng Việt

**Phiên bản tiếng Việt** · Hệ thống Quản lý Pin Năng lượng Mặt trời Mái nhà

Tài liệu này ghi lại toàn bộ quy trình thiết kế sản phẩm qua sáu giai đoạn: từ khám phá sản phẩm đến bàn giao cho nhà phát triển. Đọc theo thứ tự từ trên xuống dưới.

---

## GIAI ĐOẠN 01 — Khám phá sản phẩm

### Tổng quan dự án

Hệ thống Quản lý Pin Năng lượng Mặt trời Mái nhà

Bộ thiết bị **chủ yếu** bao gồm:
- **Tấm pin năng lượng mặt trời** *(cốt lõi)* — lắp trên mái nhà, thu năng lượng mặt trời.
- **Bộ điều khiển/Biến tần năng lượng mặt trời** *(cốt lõi)* — điều tiết và chuyển đổi điện năng từ tấm pin.
- **Máy bơm nước** *(tùy chọn)* — sử dụng điện từ hệ thống pin, phục vụ tưới tiêu nông nghiệp.

Ứng dụng di động dựa trên vai trò giúp quản lý toàn bộ chu kỳ vận hành của hệ thống pin năng lượng mặt trời lắp trên mái nhà — từ giao hàng, lắp đặt, kiểm tra chất lượng đến dịch vụ hậu mãi và bán hàng.

Mỗi người dùng đăng nhập vào cùng một ứng dụng di động nhưng thấy các tính năng và nhiệm vụ khác nhau dựa trên vai trò được phân công.

---

### Mục tiêu kinh doanh

Chuyển đổi toàn bộ hoạt động thực địa sang nền tảng kỹ thuật số duy nhất.

- Quản lý tất cả hoạt động thực địa trong một ứng dụng
- Theo dõi từng hệ thống pin năng lượng mặt trời mái nhà từ giao hàng đến dịch vụ
- Giảm thiểu lỗi thủ công
- Cải thiện sự phối hợp giữa các đội nhóm
- Hoàn thành lắp đặt nhanh hơn
- Giải quyết khiếu nại nhanh chóng
- Tăng tính minh bạch trong hoạt động
- Cải thiện sự hài lòng của nông dân
- Tạo báo cáo thời gian thực cho quản lý

---

### Tuyên bố vấn đề

Khi không có hệ thống kỹ thuật số:

- Các đội sử dụng biểu mẫu giấy.
- Quản lý không thể theo dõi công việc thực địa theo thời gian thực.
- Trạng thái giao hàng không rõ ràng.
- Tiến độ lắp đặt khó theo dõi.
- Kiểm tra QA bị trì hoãn.
- Việc giải quyết khiếu nại mất nhiều thời gian.
- Lịch sử bơm phân tán trong nhiều hồ sơ khác nhau.
- Giao tiếp giữa các đội nhóm chậm.

Những vấn đề này làm giảm hiệu quả và độ tin cậy của toàn bộ chuỗi vận hành.

---

### Tầm nhìn sản phẩm

Một ứng dụng di động cho phép các đội thực địa cập nhật tiến độ ngay lập tức và cung cấp thông tin cho quản lý qua dữ liệu thời gian thực.

- Đơn giản
- Nhanh
- Đáng tin cậy
- Dễ sử dụng
- Thân thiện với chế độ ngoại tuyến
- Phù hợp với công việc thực địa

---

### Tiêu chí thành công

Sản phẩm thành công cần giúp người dùng:

- Hoàn thành nhiệm vụ nhanh chóng.
- Giảm giấy tờ.
- Theo dõi từng bơm chính xác.
- Cải thiện giao tiếp giữa các đội nhóm.
- Giảm chậm trễ trong lắp đặt.
- Giải quyết khiếu nại nhanh hơn.
- Cải thiện sự hài lòng của nông dân.
- Tăng hiệu quả hoạt động.

---

### Các bên liên quan và trách nhiệm

Các bên liên quan là những người sử dụng, quản lý hoặc hưởng lợi từ hệ thống.

- **Quản lý công ty** — Giám sát hoạt động và hiệu suất tổng thể.
- **Nhóm quản trị** — Quản lý người dùng, phân công công việc và theo dõi tiến độ.
- **Nhóm kho** — Chuẩn bị bơm để giao hàng; được xử lý sau trong bảng điều khiển quản trị.
- **Đối tác giao hàng** — Giao bơm cho nông dân.
- **Nhóm lắp đặt** — Lắp đặt tấm pin, bộ điều khiển/biến tần và máy bơm nước (nếu có) lên mái nhà.
- **Bộ phận đảm bảo chất lượng** — Xác minh chất lượng lắp đặt.
- **Kỹ thuật viên dịch vụ** — Xử lý bảo trì và khiếu nại.

---

### Năm vai trò, một ứng dụng di động

Năm vai trò truy cập cùng một ứng dụng với quyền hạn khác nhau.

- **Đối tác giao hàng** — Giao bộ thiết bị pin năng lượng mặt trời mái nhà cho khách hàng và xác nhận giao hàng thành công.
- **Nhóm lắp đặt** — Lắp đặt tấm pin, bộ điều khiển/biến tần lên mái nhà và gửi báo cáo lắp đặt.
- **Kiểm tra viên QA** — Kiểm tra chất lượng lắp đặt, phê duyệt hoặc từ chối công việc đã hoàn thành.
- **Kỹ thuật viên dịch vụ** — Xử lý yêu cầu bảo trì và giải quyết khiếu nại của nông dân.
- **Nông dân (tùy chọn)** — Gửi khiếu nại, theo dõi yêu cầu dịch vụ và nhận cập nhật.

---

### Đối tác giao hàng — Quyền hạn

**Mục tiêu chính:** Giao bộ thiết bị pin năng lượng mặt trời mái nhà được phân công cho khách hàng.

- Đăng nhập
- Xem các giao hàng được phân công
- Xem thông tin nông dân
- Điều hướng đến vị trí nông dân
- Xác minh giao hàng bằng OTP
- Quét số sê-ri bơm
- Tải ảnh giao hàng lên
- Ghi lại chữ ký của nông dân
- Cập nhật trạng thái giao hàng
- Xem lịch sử giao hàng

---

### Nhóm lắp đặt — Quyền hạn

**Mục tiêu chính:** Lắp đặt hệ thống pin năng lượng mặt trời mái nhà (tấm pin, bộ điều khiển/biến tần và máy bơm nước nếu có) đã được giao.

- Xem các lắp đặt được phân công
- Xem thông tin nông dân
- Sử dụng danh sách kiểm tra lắp đặt
- Xác minh vật liệu
- Tải ảnh trước và sau lắp đặt lên
- Kiểm tra bơm
- Nộp báo cáo lắp đặt
- Ghi lại chữ ký của nông dân
- Cập nhật trạng thái lắp đặt

---

### Kiểm tra viên QA — Quyền hạn

**Mục tiêu chính:** Xác minh chất lượng lắp đặt.

- Xem các kiểm tra đang chờ
- Xem chi tiết lắp đặt
- Xác minh vị trí GPS
- Kiểm tra ảnh đã tải lên
- Hoàn thành danh sách kiểm tra QA
- Phê duyệt lắp đặt
- Từ chối lắp đặt
- Yêu cầu làm lại
- Nộp báo cáo QA

---

### Kỹ thuật viên dịch vụ — Quyền hạn

**Mục tiêu chính:** Giải quyết khiếu nại của nông dân.

- Xem các phiếu dịch vụ được phân công
- Liên hệ với nông dân
- Điều hướng đến vị trí
- Chẩn đoán vấn đề
- Tải ảnh sửa chữa lên
- Thay thế linh kiện
- Đóng phiếu dịch vụ
- Thu thập phản hồi

---

### Nông dân (tùy chọn) — Quyền hạn

**Mục tiêu chính:** Theo dõi lắp đặt và yêu cầu hỗ trợ.

- Đăng nhập
- Xem thông tin bơm
- Xem trạng thái lắp đặt
- Gửi khiếu nại
- Theo dõi tiến trình khiếu nại
- Xem lịch sử dịch vụ
- Đánh giá dịch vụ đã hoàn thành

---

### Phạm vi di động hiện tại

- Quản lý giao hàng
- Quản lý lắp đặt
- Đảm bảo chất lượng
- Quản lý dịch vụ và khiếu nại
- Thông báo
- Theo dõi GPS
- Tải ảnh lên
- Chữ ký điện tử
- Xác minh OTP
- Hỗ trợ ngoại tuyến

---

### Không thuộc phạm vi di động hiện tại

- Bảng điều khiển quản trị trên web
- Bảng điều khiển phân tích nâng cao
- Quản lý nhà cung cấp
- Quản lý kho

Các nội dung này sẽ được xử lý sau khi thiết kế bảng điều khiển quản trị.

---

### MVP — Phiên bản 1

Tập trung vào chức năng cốt lõi để ra mắt phiên bản đầu tiên nhanh chóng.

- **Xác thực** — Đăng nhập; quên mật khẩu.
- **Bảng điều khiển** — Nhiệm vụ được phân công; tóm tắt nhiệm vụ.
- **Quản lý nhiệm vụ** — Xem danh sách; xem chi tiết; cập nhật trạng thái nhiệm vụ.
- **Xác minh** — Xác minh OTP; quét số sê-ri; ghi lại GPS.
- **Phương tiện** — Tải ảnh lên; ghi lại chữ ký.
- **Thông báo** — Cảnh báo nhiệm vụ; cập nhật trạng thái.
- **Hồ sơ** — Thông tin cá nhân.

---

### Cải tiến tương lai — Phiên bản 2

- Hỗ trợ đa ngôn ngữ
- Đề xuất bằng trí tuệ nhân tạo
- Hỗ trợ giọng nói
- Hỗ trợ trò chuyện
- Phân tích nâng cao
- Giải quyết xung đột ngoại tuyến
- Giám sát bơm qua mạng lưới thiết bị kết nối
- Bảo trì dự đoán
- Nội dung giáo dục cho nông dân
- Nhắc nhở thông minh

---

### Sản phẩm bàn giao khám phá — Đã hoàn thành

- Tổng quan dự án
- Mục tiêu kinh doanh
- Tuyên bố vấn đề
- Tầm nhìn sản phẩm
- Người dùng mục tiêu
- Phạm vi sản phẩm
- Tiêu chí thành công

Nguồn ghi nhận các sản phẩm bàn giao Giai đoạn 1 này đã hoàn thành.

---

### Nền tảng sản phẩm — Đã hoàn thành

- Các bên liên quan
- Vai trò và quyền hạn người dùng
- Quy trình làm việc từ đầu đến cuối
- Kiến trúc thông tin
- Tính năng MVP
- Cải tiến tương lai

Nguồn ghi nhận các sản phẩm Giai đoạn 1.2 này đã hoàn thành. Quy trình và kiến trúc đã được xác định.

---

## GIAI ĐOẠN 02 — Lập kế hoạch trải nghiệm người dùng

### Quy trình từ đầu đến cuối

01 Bơm được phân công → 02 Đối tác giao hàng nhận đơn hàng được phân công → 03 Di chuyển đến nông dân → 04 Xác minh OTP → 05 Giao hàng hoàn tất → 06 Nhóm lắp đặt nhận nhiệm vụ lắp đặt → 07 Đến địa điểm → 08 Lắp đặt bơm → 09 Tải ảnh lên → 10 Lắp đặt hoàn tất → 11 Kiểm tra viên QA nhận nhiệm vụ QA → 12 Xác minh lắp đặt → 13 Được phê duyệt → 14 Bơm được kích hoạt → 15 Nông dân sử dụng bơm → 16 Gửi khiếu nại (nếu cần) → 17 Kỹ thuật viên dịch vụ nhận phiếu → 18 Đến gặp nông dân → 19 Sửa chữa bơm → 20 Đóng phiếu dịch vụ

Toàn bộ hành trình của một hệ thống pin năng lượng mặt trời mái nhà (tấm pin + bộ điều khiển/biến tần + máy bơm nước nếu có) trong hệ thống di động, từ phân công đến hoàn thành vòng đời dịch vụ.

---

### Kiến trúc thông tin cấp cao

Ứng dụng di động dùng một kiến trúc đơn. Nội dung trong mỗi mô-đun thay đổi theo quyền của người dùng đã đăng nhập.

- Ứng dụng di động
- Xác thực
- Bảng điều khiển
- Nhiệm vụ được phân công
- Chi tiết nhiệm vụ
- Điều hướng GPS
- Xác minh → OTP; quét QR; số sê-ri
- Tải phương tiện lên → Ảnh; tài liệu; chữ ký
- Cập nhật trạng thái
- Thông báo
- Lịch sử
- Hồ sơ
- Cài đặt

---

### Hành trình người dùng chung

01 Đăng nhập → 02 Bảng điều khiển → 03 Nhiệm vụ được phân công → 04 Chọn nhiệm vụ → 05 Xem chi tiết → 06 Đến vị trí nông dân → 07 Hoàn thành công việc được giao → 08 Tải bằng chứng bắt buộc lên → 09 Nộp nhiệm vụ → 10 Nhiệm vụ hoàn thành → 11 Nhận phân công tiếp theo

---

### Hành trình đối tác giao hàng

01 Đăng nhập → 02 Bảng điều khiển → 03 Giao hàng được phân công → 04 Chi tiết giao hàng → 05 Điều hướng đến nông dân → 06 Xác minh OTP → 07 Quét số sê-ri bơm → 08 Tải ảnh giao hàng lên → 09 Ghi lại chữ ký nông dân → 10 Giao hàng hoàn tất

---

### Hành trình nhóm lắp đặt

01 Đăng nhập → 02 Bảng điều khiển → 03 Lắp đặt được phân công → 04 Chi tiết lắp đặt → 05 Xác minh vật liệu → 06 Danh sách kiểm tra lắp đặt → 07 Tải ảnh trước lắp đặt lên → 08 Lắp đặt bơm → 09 Kiểm tra → 10 Tải ảnh sau lắp đặt lên → 11 Chữ ký nông dân → 12 Lắp đặt hoàn tất

---

### Hành trình kiểm tra viên QA

01 Đăng nhập → 02 Bảng điều khiển → 03 Nhiệm vụ QA đang chờ → 04 Chi tiết lắp đặt → 05 Xác minh GPS → 06 Xác minh ảnh → 07 Danh sách kiểm tra QA → 08 Phê duyệt HOẶC từ chối → 09 Nộp báo cáo QA

---

### Hành trình kỹ thuật viên dịch vụ

01 Đăng nhập → 02 Bảng điều khiển → 03 Khiếu nại được phân công → 04 Chi tiết khiếu nại → 05 Điều hướng → 06 Kiểm tra vấn đề → 07 Sửa chữa bơm → 08 Tải ảnh lên → 09 Cập nhật giải pháp → 10 Thu thập phản hồi → 11 Đóng phiếu

---

### Hành trình nông dân — Tùy chọn

01 Đăng nhập → 02 Trang chủ → 03 Chi tiết bơm → 04 Gửi khiếu nại → 05 Theo dõi khiếu nại → 06 Xem lịch sử dịch vụ → 07 Đánh giá

---

### Chiến lược điều hướng

01 Màn hình khởi động → 02 Đăng nhập → 03 Nhận diện vai trò → 04 Bảng điều khiển → 05 Mô-đun nhiệm vụ → 06 Thông báo → 07 Hồ sơ

---

### Chiến lược bảng điều khiển

Bảng điều khiển cần trả lời ba câu hỏi:

- **Hôm nay tôi cần làm gì?** Ví dụ: 8 giao hàng; 5 lắp đặt; 3 kiểm tra QA; 2 phiếu dịch vụ.
- **Tiến độ của tôi thế nào?** Ví dụ: Đã hoàn thành; Đang chờ; Đang thực hiện.
- **Điều gì cần chú ý ngay?** Ví dụ: Nhiệm vụ ưu tiên cao; nhiệm vụ chậm trễ; xác minh thất bại; QA bị từ chối.

---

### Điều hướng dưới cùng

- Trang chủ
- Nhiệm vụ
- Thông báo
- Hồ sơ

---

### Thành phần trải nghiệm dùng chung

Để duy trì tính nhất quán, mọi vai trò sử dụng cùng các mẫu thiết kế sau:

- Tìm kiếm
- Bộ lọc
- Nhãn trạng thái
- Thẻ nội dung
- Danh sách kiểm tra
- Tải ảnh lên
- Truy cập máy ảnh
- Trình quét QR và mã vạch
- Bản đồ GPS
- Nhập OTP
- Chữ ký điện tử
- Dòng thời gian
- Bảng trượt từ dưới
- Hộp thoại xác nhận
- Màn hình thành công
- Màn hình lỗi
- Trạng thái trống
- Dải thông báo ngoại tuyến
- Trạng thái đang tải

---

### Định nghĩa trạng thái trải nghiệm

Mọi màn hình quan trọng cần hỗ trợ các trạng thái sau:

- **Đang tải** — Dữ liệu đang được truy xuất.
- **Trống** — Không có nhiệm vụ được phân công hoặc bản ghi.
- **Thành công** — Nhiệm vụ đã hoàn thành thành công.
- **Lỗi** — Đã xảy ra sự cố.
- **Ngoại tuyến** — Không có kết nối mạng; công việc sẽ được đồng bộ sau.
- **Yêu cầu cấp quyền** — Cần quyền truy cập máy ảnh, vị trí hoặc bộ nhớ.
- **Đang đồng bộ** — Dữ liệu đang chờ được tải lên máy chủ.

---

## GIAI ĐOẠN 03 — Hệ thống thiết kế

Thư viện thành phần, giá trị thiết kế và mẫu dùng chung cho hệ thống quản lý bơm.

### Nền tảng

- Màu sắc
- Kiểu chữ
- Lưới bố cục
- Biểu tượng
- Hiệu ứng

---

### Thành phần

- Nút
- Trường nhập liệu
- Thẻ nội dung
- Nhãn
- Điều hướng
- Hộp thoại
- Tải lên
- Dòng thời gian
- Bản đồ
- Trạng thái trống

---

### Mẫu thiết kế

- Bảng điều khiển
- Danh sách nhiệm vụ
- Biểu mẫu
- Trang chi tiết
- Quy trình công việc

---

### Danh mục mẫu tái sử dụng

Áp dụng nhất quán giữa các vai trò. Các mẫu trải nghiệm ở Giai đoạn 2 được chuẩn hóa để tái sử dụng trong thư viện.

- Tìm kiếm · Bộ lọc · Nhãn trạng thái · Thẻ nội dung · Danh sách kiểm tra · Tải ảnh lên · Truy cập máy ảnh · Trình quét QR và mã vạch · Bản đồ GPS · Nhập OTP · Chữ ký điện tử · Dòng thời gian · Bảng trượt từ dưới · Hộp thoại xác nhận · Màn hình thành công · Màn hình lỗi · Trạng thái trống · Dải thông báo ngoại tuyến · Trạng thái đang tải

---

### Trạng thái dùng chung

Thư viện cần hỗ trợ các trạng thái đã định nghĩa cho mọi màn hình quan trọng.

- **Đang tải** — Dữ liệu đang được truy xuất.
- **Trống** — Không có nhiệm vụ được phân công hoặc bản ghi.
- **Thành công** — Nhiệm vụ đã hoàn thành thành công.
- **Lỗi** — Đã xảy ra sự cố.
- **Ngoại tuyến** — Không có kết nối mạng; công việc sẽ được đồng bộ sau.
- **Yêu cầu cấp quyền** — Cần quyền truy cập máy ảnh, vị trí hoặc bộ nhớ.
- **Đang đồng bộ** — Dữ liệu đang chờ được tải lên máy chủ.

---

### Màu trạng thái — Tài liệu tham khảo

| Trạng thái | Màu |
|---|---|
| Thành công | #2E7D32 |
| Cảnh báo | #F9A825 |
| Lỗi | #D32F2F |
| Thông tin | #1976D2 |
| Đang chờ | #FB8C00 |
| Đã hoàn thành | #43A047 |
| Bị từ chối | #C62828 |
| Đang thực hiện | #1565C0 |

---

### Màu trung tính — Tài liệu tham khảo

| Màu | Mã hex | Dùng cho |
|---|---|---|
| Trắng | #FFFFFF | Nền |
| Xám 50 | #FAFAFA | Thẻ nội dung |
| Xám 100 | #F5F5F5 | Khu vực |
| Xám 300 | #E0E0E0 | Đường viền |
| Xám 500 | #9E9E9E | Chữ phụ |
| Xám 700 | #616161 | Chữ chính |
| Xám 900 | #212121 | Tiêu đề |

---

### Danh mục màn hình thuộc Giai đoạn 4

Các nhóm màn hình từ cấu trúc thư viện gốc gồm: Xác thực, Giao hàng, Lắp đặt, QA, Dịch vụ và Nông dân (tùy chọn). Danh mục đầy đủ gồm 11 mô-đun và mọi trạng thái được lưu trong Giai đoạn 4, không nằm trong danh mục thành phần.

---

## GIAI ĐOẠN 04 — Thiết kế ứng dụng di động

Danh mục đầy đủ 11 mô-đun cho Giao hàng, Lắp đặt, QA, Dịch vụ và Nông dân (tùy chọn).

### Mô-đun 1 — Xác thực

- Màn hình khởi động
- Giới thiệu ban đầu (tùy chọn)
- Đăng nhập
- Xác minh OTP hoặc mật khẩu
- Quên mật khẩu
- Đặt lại mật khẩu
- Phiên đã hết hạn
- Thiết lập quyền — Vị trí, máy ảnh, bộ nhớ
- Nhận diện vai trò
- Cấu hình đồng bộ — Sẵn sàng ngoại tuyến

---

### Mô-đun 2 — Điều hướng toàn cục

Các màn hình dùng chung:

- Bảng điều khiển
- Thông báo
- Hồ sơ
- Cài đặt
- Trợ giúp và hỗ trợ
- Giới thiệu ứng dụng
- Chính sách quyền riêng tư
- Điều khoản và điều kiện

---

### Mô-đun 3 — Bảng điều khiển

Khác nhau theo từng vai trò.

- **Bảng điều khiển giao hàng** — Giao hàng hôm nay; giao hàng đang chờ; giao hàng đã hoàn thành; thao tác nhanh; hoạt động gần đây.
- **Bảng điều khiển lắp đặt** — Lắp đặt được phân công; công việc hôm nay; tiến độ lắp đặt; nhiệm vụ đang chờ.
- **Bảng điều khiển QA** — Kiểm tra đang chờ; phê duyệt hôm nay; từ chối hôm nay; trường hợp ưu tiên cao.
- **Bảng điều khiển dịch vụ** — Phiếu đang mở; khiếu nại được phân công; yêu cầu khẩn cấp; lịch trình hôm nay.
- **Bảng điều khiển nông dân** — Trạng thái bơm; khiếu nại đang xử lý; lịch sử dịch vụ; thông báo.

---

### Mô-đun 4 — Giao hàng

- Danh sách giao hàng
- Chi tiết giao hàng
- Chi tiết nông dân
- Bản đồ điều hướng
- Xác minh OTP
- Quét số sê-ri
- Tải ảnh lên
- Ghi lại chữ ký
- Xác nhận giao hàng
- Giao hàng thành công

---

### Mô-đun 5 — Lắp đặt

- Danh sách lắp đặt
- Chi tiết lắp đặt
- Xác minh vật liệu
- Danh sách kiểm tra
- Ảnh trước lắp đặt
- Biểu mẫu lắp đặt
- Kiểm tra bơm
- Ảnh sau lắp đặt
- Chữ ký
- Báo cáo hoàn thành
- Lắp đặt thành công

---

### Mô-đun 6 — QA

- Danh sách nhiệm vụ QA
- Chi tiết kiểm tra
- Xác minh GPS
- Xác minh ảnh
- Danh sách kiểm tra QA
- Ghi chú
- Phê duyệt
- Từ chối
- Làm lại
- Báo cáo QA

---

### Mô-đun 7 — Dịch vụ

- Danh sách khiếu nại
- Chi tiết khiếu nại
- Chi tiết khách hàng
- Điều hướng
- Kiểm tra
- Linh kiện thay thế
- Báo cáo sửa chữa
- Tải ảnh lên
- Phản hồi khách hàng
- Đóng phiếu

---

### Mô-đun 8 — Nông dân (tùy chọn)

- Trang chủ
- Chi tiết bơm
- Đăng ký khiếu nại
- Trạng thái khiếu nại
- Lịch sử dịch vụ
- Thông báo
- Đánh giá
- Hồ sơ

---

### Mô-đun 9 — Thông báo

- Danh sách thông báo
- Chi tiết thông báo
- Đánh dấu đã đọc

---

### Mô-đun 10 — Hồ sơ

- Hồ sơ của tôi
- Chỉnh sửa hồ sơ
- Đổi mật khẩu
- Ngôn ngữ
- Đăng xuất

> Mục Ngôn ngữ được giữ từ danh mục nguồn; hỗ trợ đa ngôn ngữ trong ứng dụng vẫn là tính năng tương lai, chưa được xác nhận cho MVP.

---

### Mô-đun 11 — Trường hợp ngoại lệ

Thiết kế tất cả trạng thái hỗ trợ.

**Trạng thái trống:**
- Không có nhiệm vụ
- Không có thông báo
- Không có khiếu nại
- Không có kết nối mạng

**Trạng thái lỗi:**
- OTP không hợp lệ
- Quét QR thất bại
- GPS không khả dụng
- Tải lên thất bại
- Đồng bộ thất bại

**Trạng thái đang tải:**
- Tải lần đầu
- Tải với khung nội dung giữ chỗ
- Tiến độ tải lên

**Trạng thái thành công:**
- Giao hàng hoàn tất
- Lắp đặt hoàn tất
- QA được phê duyệt
- Khiếu nại đã đóng

---

### Ước tính số lượng màn hình

| Mô-đun | Số màn hình ước tính |
|---|---|
| Xác thực | 10 |
| Điều hướng toàn cục | Chưa xác định |
| Bảng điều khiển | 5 |
| Giao hàng | 10 |
| Lắp đặt | 11 |
| QA | 10 |
| Dịch vụ | 10 |
| Nông dân (tùy chọn) | 8 |
| Thông báo | Chưa xác định |
| Hồ sơ | Chưa xác định |
| Trường hợp ngoại lệ | Chưa xác định |

> Chỉ giữ các ước tính đã được cung cấp. Bảng nguồn chưa đầy đủ; ước tính còn thiếu được ghi là Chưa xác định. Không suy ra tổng số.

---

## GIAI ĐOẠN 05 — Xây dựng nguyên mẫu

> **ĐỀ XUẤT — Chưa bắt đầu**

Kế hoạch kịch bản theo vai trò và đánh giá xác nhận; chưa bắt đầu thực hiện.

### Chỉ là tài liệu lập kế hoạch

Không xác định liên kết nguyên mẫu tương tác, hoạt ảnh, chuyển tiếp hoặc sự kiện kích hoạt ở đây. Việc xây dựng nguyên mẫu sẽ được thực hiện trong một luồng nguyên mẫu Figma riêng sau khi các màn hình được phê duyệt. Tài liệu này không tạo tương tác, hành động hay kết nối nguyên mẫu.

---

### 1. Phạm vi nguyên mẫu

Các luồng nguyên mẫu sẽ được tạo cho vai trò người dùng cốt lõi. Mỗi luồng bao gồm đường đi thành công chính cùng các trạng thái lỗi và ngoại tuyến quan trọng.

**Trong phạm vi:**
- Luồng đối tác giao hàng
- Luồng nhóm lắp đặt
- Luồng kiểm tra viên QA
- Luồng kỹ thuật viên dịch vụ
- Luồng nông dân — Tùy chọn

**Ngoài phạm vi:**
- Bảng điều khiển quản trị trên web
- Phân tích nâng cao
- Quản lý nhà cung cấp
- Quản lý kho

---

### 2. Phạm vi kịch bản cốt lõi

Mỗi kịch bản nguyên mẫu phải bao gồm ba loại đường đi:

- **Đường đi thành công** — Mọi bước hoàn thành thành công; dữ liệu tải lên chính xác; OTP được xác minh; chữ ký được ghi lại; nhiệm vụ được nộp.
- **Đường đi lỗi** — OTP không hợp lệ; quét QR thất bại; GPS không khả dụng; tải lên thất bại; lỗi kiểm tra tính hợp lệ của biểu mẫu; QA bị từ chối.
- **Đường đi ngoại tuyến** — Người dùng hoàn thành nhiệm vụ không có mạng. Dữ liệu được xếp hàng cục bộ. Hiển thị dải thông báo đồng bộ. Khi kết nối lại, dữ liệu được tải lên máy chủ.

---

### 3. Kịch bản đối tác giao hàng

**Đường đi thành công:**
Đăng nhập → Bảng điều khiển → Giao hàng được phân công → Chi tiết giao hàng → Điều hướng đến nông dân → Xác minh OTP → Quét số sê-ri bơm → Tải ảnh giao hàng lên → Ghi lại chữ ký nông dân → Giao hàng hoàn tất

- **Đường đi lỗi:** OTP sai → Thông báo lỗi → Thử lại OTP → Thành công.
- **Đường đi lỗi:** Từ chối quyền máy ảnh → Nhắc cấp quyền → Cấp quyền → Tiếp tục.
- **Đường đi ngoại tuyến:** Điều hướng ngoại tuyến → GPS được lưu đệm → OTP lưu tự động → Chữ ký lưu cục bộ → Đồng bộ khi kết nối lại.

---

### 4. Kịch bản nhóm lắp đặt

**Đường đi thành công:**
Đăng nhập → Bảng điều khiển → Lắp đặt được phân công → Chi tiết lắp đặt → Xác minh vật liệu → Danh sách kiểm tra lắp đặt → Tải ảnh trước lắp đặt lên → Lắp đặt bơm → Kiểm tra → Tải ảnh sau lắp đặt lên → Chữ ký nông dân → Lắp đặt hoàn tất

- **Đường đi lỗi:** Thiếu vật liệu → Đánh dấu mục → Ghi lý do → Tiếp tục các mục còn lại.
- **Đường đi lỗi:** Tải lên thất bại → Thử lại → Thành công.
- **Đường đi ngoại tuyến:** Hoàn thành danh sách kiểm tra ngoại tuyến → Lưu đệm dữ liệu → Xếp hàng tải lên → Đồng bộ khi kết nối lại.

---

### 5. Kịch bản kiểm tra viên QA

**Đường đi thành công:**
Đăng nhập → Bảng điều khiển → Nhiệm vụ QA đang chờ → Chi tiết lắp đặt → Xác minh GPS → Xác minh ảnh → Danh sách kiểm tra QA → Phê duyệt → Nộp báo cáo QA

- **Đường đi lỗi:** GPS không khớp → Đánh dấu → Thêm ghi chú → Tiếp tục.
- **Đường đi lỗi:** Chất lượng ảnh kém → Yêu cầu làm lại → Từ chối kèm lý do.
- **Đường đi ngoại tuyến:** Hoàn thành danh sách kiểm tra QA ngoại tuyến → Nộp vào hàng chờ → Đồng bộ khi kết nối lại.

---

### 6. Kịch bản kỹ thuật viên dịch vụ

**Đường đi thành công:**
Đăng nhập → Bảng điều khiển → Khiếu nại được phân công → Chi tiết khiếu nại → Điều hướng → Kiểm tra vấn đề → Sửa chữa bơm → Tải ảnh lên → Cập nhật giải pháp → Thu thập phản hồi → Đóng phiếu

- **Đường đi lỗi:** Không có linh kiện → Báo cáo lên cấp có thẩm quyền → Lên lịch theo dõi.
- **Đường đi lỗi:** Điều hướng thất bại → Nhập thủ công → Tiếp tục.

---

### 7. Đánh giá và xác nhận nguyên mẫu

Các hoạt động và đầu ra dự kiến, không phải công việc đã hoàn thành.

**Đánh giá nội bộ:**
- Nhóm thiết kế đi qua tất cả luồng.
- Xác minh cả ba loại đường đi cho mỗi vai trò.
- Kiểm tra tính nhất quán của thành phần.

**Đánh giá của các bên liên quan:**
- Trình bày nguyên mẫu cho quản lý dự án.
- Thu thập phản hồi theo từng vai trò.
- Ghi lại yêu cầu sửa đổi.

**Đầu ra xác nhận dự kiến:**
- Danh sách luồng được phê duyệt
- Nhật ký thay đổi
- Chấp thuận theo từng vai trò
- Danh sách kiểm tra sẵn sàng bàn giao

---

## GIAI ĐOẠN 06 — Bàn giao

> **ĐỀ XUẤT — Chưa bắt đầu**

Thông số kỹ thuật, tài nguyên, yêu cầu chấp nhận và quyết định chưa được giải quyết.

### Kế hoạch bàn giao cho nhà phát triển

Tài liệu lập kế hoạch bàn giao cho nhà phát triển. Xác định thông số kỹ thuật, tài nguyên, phạm vi vai trò và trạng thái, danh sách kiểm tra chấp nhận và vấn đề còn mở cần giải quyết trước khi bắt đầu phát triển.

Trạng thái: Đề xuất — Chưa bắt đầu. Các ô kiểm là yêu cầu chưa hoàn thành, không phải bằng chứng đã bàn giao.

---

### 1. Thông số bàn giao

Thông số kỹ thuật thiết kế cần chuẩn bị cho mỗi màn hình được bàn giao.

**Khoảng cách và bố cục:**
- Chú thích tất cả giá trị khoảng cách bằng tên giá trị thiết kế dùng chung.
- Ghi lại cấu trúc lưới cho từng loại màn hình.
- Ghi chú hướng bố cục tự động và căn chỉnh.

**Kiểu chữ:**
- Chỉ rõ họ phông, kích thước, độ đậm, chiều cao dòng và khoảng cách chữ cho từng phần tử văn bản.
- Tham chiếu giá trị thiết kế dùng chung cho mọi kiểu văn bản.

**Màu sắc:**
- Sử dụng tên giá trị thiết kế dùng chung cho tất cả màu nền và đường viền.
- Ghi lại ý nghĩa ngữ nghĩa của màu sắc.
- Có cờ sẵn sàng cho chế độ tối — Tương lai.

**Thành phần:**
- Liệt kê danh mục thành phần và tất cả biến thể.
- Chỉ rõ thuộc tính và trạng thái của từng thành phần.
- Ghi lại trạng thái tương tác: Mặc định, di chuột, nhấn, vô hiệu hóa và được chọn tiêu điểm.

---

### 2. Bàn giao tài nguyên

Tài nguyên cần xuất và tổ chức.

- **Biểu tượng** — Bộ biểu tượng đầy đủ ở định dạng SVG, đặt tên nhất quán.
- **Biến thể kích thước biểu tượng** — 12px, 16px, 20px và 24px.
- **Hình ảnh** — Thay mọi hình giữ chỗ bằng tài nguyên sản xuất cuối cùng hoặc đánh dấu rõ là Chưa xác định.
- **Hình ảnh** — Cung cấp hướng dẫn nén hình ảnh.
- **Hình minh họa** — Minh họa trạng thái trống, thành công và lỗi.
- **Xuất giá trị thiết kế dùng chung** — Màu sắc, khoảng cách, bán kính, đường viền và độ mờ ở định dạng JSON hoặc định dạng riêng cho nền tảng.
- **Tên giá trị thiết kế** — Theo quy ước đặt tên của cơ sở mã nguồn.

---

### 3. Kiểm tra phạm vi vai trò và trạng thái

Với mỗi vai trò, xác nhận các trạng thái đã được thiết kế trước khi bàn giao. Tất cả mục vẫn cần được kiểm tra.

**Phạm vi đối tác giao hàng:**
- [ ] Tất cả màn hình đường đi thành công
- [ ] Trạng thái lỗi OTP
- [ ] Trạng thái GPS không khả dụng
- [ ] Trạng thái từ chối quyền máy ảnh
- [ ] Trạng thái tải lên thất bại
- [ ] Trạng thái chế độ ngoại tuyến
- [ ] Trạng thái trống — Không có giao hàng

**Phạm vi nhóm lắp đặt:**
- [ ] Tất cả màn hình đường đi thành công
- [ ] Trạng thái thiếu vật liệu
- [ ] Trạng thái tải lên thất bại
- [ ] Danh sách kiểm tra ngoại tuyến
- [ ] Trạng thái trống — Không có nhiệm vụ

**Phạm vi kiểm tra viên QA:**
- [ ] Tất cả màn hình đường đi thành công
- [ ] Luồng từ chối kèm lý do
- [ ] Trạng thái yêu cầu làm lại
- [ ] Trạng thái GPS không khớp
- [ ] Trạng thái trống — Không có kiểm tra

**Phạm vi kỹ thuật viên dịch vụ:**
- [ ] Tất cả màn hình đường đi thành công
- [ ] Trạng thái không có linh kiện
- [ ] Trạng thái báo cáo lên cấp có thẩm quyền
- [ ] Trạng thái điều hướng thất bại
- [ ] Trạng thái trống — Không có phiếu

**Phạm vi nông dân — Tùy chọn:**
- [ ] Màn hình đường đi thành công nếu được đưa vào
- [ ] Trạng thái nộp khiếu nại
- [ ] Trạng thái trống — Không có khiếu nại

**Phạm vi trạng thái toàn cục:**
- [ ] Khung nội dung giữ chỗ khi tải cho mọi màn hình lấy dữ liệu
- [ ] Màn hình lỗi mạng
- [ ] Màn hình phiên đã hết hạn
- [ ] Thành phần dải thông báo ngoại tuyến
- [ ] Màn hình thiết lập quyền

---

### 4. Danh sách kiểm tra chấp nhận

Tất cả mục phải hoàn thành trước khi coi việc bàn giao là xong. Dưới đây là các yêu cầu chấp nhận dự kiến.

**Chất lượng thiết kế:**
- [ ] Tất cả màn hình dùng thành phần hệ thống thiết kế.
- [ ] Không có màu ghi cứng — Tất cả dùng giá trị thiết kế dùng chung.
- [ ] Khoảng cách nhất quán với thang giá trị thiết kế.
- [ ] Kiểu chữ tuân theo các kiểu văn bản đã xác định.
- [ ] Tất cả trạng thái tương tác được thiết kế.
- [ ] Tất cả trạng thái trường hợp ngoại lệ được thiết kế.

**Xác nhận nguyên mẫu:**
- [ ] Tất cả luồng vai trò được trưởng nhóm thiết kế đánh giá.
- [ ] Nguyên mẫu được các bên liên quan phê duyệt.
- [ ] Các yêu cầu sửa đổi đã được giải quyết.

**Tài nguyên bàn giao:**
- [ ] Tất cả tài nguyên được xuất ở kích thước đúng.
- [ ] Các giá trị thiết kế dùng chung được xuất.
- [ ] Tệp Figma được tổ chức với tên lớp rõ ràng.
- [ ] Ghi chú bàn giao được thêm vào khung Figma.

**Đánh giá của nhà phát triển:**
- [ ] Hoàn thành buổi hướng dẫn cho nhà phát triển.
- [ ] Xác nhận tính khả thi kỹ thuật cho từng màn hình.
- [ ] Ghi lại yêu cầu giao diện lập trình ứng dụng.
- [ ] Ghi lại hành vi đồng bộ ngoại tuyến.

---

### 5. Vấn đề còn mở

Các vấn đề cần giải quyết trước khi bắt đầu bàn giao. Tất cả quyết định chưa được giải quyết vẫn là Chưa xác định ở giai đoạn này.

- **Ngôn ngữ ứng dụng** — Hai bộ ngôn ngữ tài liệu riêng không có nghĩa là ứng dụng hỗ trợ đa ngôn ngữ. Hỗ trợ đa ngôn ngữ vẫn là tính năng tương lai; quyết định ngôn ngữ ứng dụng cuối cùng là Chưa xác định.
- **Giải quyết xung đột ngoại tuyến** — Nếu chỉnh sửa ngoại tuyến xung đột với dữ liệu máy chủ khi đồng bộ, hành vi giải quyết là Chưa xác định.
- **Đưa vai trò nông dân vào phạm vi** — Nông dân là tùy chọn. Nhóm sản phẩm cần xác nhận các màn hình nông dân có nằm trong Phiên bản 1 hay không.
- **Ước tính màn hình còn lại** — Số lượng đã biết ở Giai đoạn 4; các số còn lại là Chưa xác định.
- **Bảng điều khiển quản trị trên web** — Không thuộc phạm vi di động hiện tại. Kế hoạch được hoãn sang một giai đoạn dự án riêng.
- **Phân tích nâng cao, quản lý nhà cung cấp và quản lý kho** — Ngoài phạm vi di động Phiên bản 1; hoãn sang các giai đoạn tương lai.

---

*Bộ tài liệu độc lập bằng tiếng Việt. Hỗ trợ đa ngôn ngữ trong ứng dụng vẫn là tính năng tương lai.*

**Giai đoạn 5 và 6: Đề xuất — Chưa bắt đầu**
