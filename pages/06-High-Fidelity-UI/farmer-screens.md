# 📁 06 — High-Fidelity UI: Nhóm 5 — Chủ Hộ Nông Dân (Farmer Portal)

Giao diện dành cho **Chủ Hộ Nông Dân** — giao diện đơn giản, dễ dùng cho người không rành công nghệ,
hỗ trợ theo dõi trạm bơm, điều khiển bơm và báo sự cố ngay trên điện thoại.
Tất cả màn hình **390 × 844px**, lưới 8pt, Touch Target **tối thiểu 48pt**.

> **Lưu ý thiết kế**: Nhóm người dùng này ưu tiên chữ to, ít bước thao tác, hình ảnh minh họa rõ ràng
> và phản hồi xúc giác (haptic) khi nhấn nút quan trọng. Font size body tối thiểu 16px, icon 24px.

---

## Danh Sách Màn Hình (Farmer Portal — 12 Màn Hình)

### Module FAR-01: Tổng Quan Trạm Bơm (Pump Overview)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `FAR-01-DASH` | Màn Hình Chính Nông Dân | Card lớn tình trạng bơm (đang chạy / tắt / sự cố). Công suất pin mặt trời (kW), lưu lượng nước (m³/h). Tiết kiệm điện hôm nay (đồng VNĐ). |
| `FAR-01-STATUS-CARD` | Thẻ Trạng Thái Trực Quan | Chip trạng thái to: ✅ ĐANG BƠM / ⛔ ĐÃ TẮT / ⚠️ SỰ CỐ. Màu nền thay đổi theo trạng thái. |
| `FAR-01-DAILY-STATS` | Thống Kê Hôm Nay | Tổng nước bơm (m³), số giờ hoạt động, công suất đỉnh. Biểu đồ thanh đơn giản theo giờ trong ngày. |

---

### Module FAR-02: Điều Khiển Bơm (Pump Control)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `FAR-02-PUMP-ON` | Bật Bơm | Nút BẬT BƠM cỡ to (64px height). Confirmation dialog "Bạn có chắc muốn bật bơm không?" trước khi thực hiện. |
| `FAR-02-PUMP-OFF` | Tắt Bơm Thường | Nút TẮT BƠM màu xám / slate. Toast xác nhận sau khi tắt thành công. |
| `FAR-02-EMERGENCY-STOP` | Tắt Bơm Khẩn Cấp | Nút màu đỏ đậm cỡ lớn "⛔ TẮT KHẨN CẤP". Dialog cảnh báo rõ ràng trước khi thực hiện. Chuyển trạng thái ngay lập tức. Haptic feedback mạnh. |

---

### Module FAR-03: Giám Sát Năng Lượng (Energy Monitoring)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `FAR-03-SOLAR-POWER` | Theo Dõi Pin Năng Lượng Mặt Trời | Đồng hồ dạng gauge hiển thị % bức xạ mặt trời hiện tại. Số kW, dự báo điện tạo ra trong ngày. Biểu tượng mặt trời animation. |
| `FAR-03-WATER-FLOW` | Theo Dõi Lưu Lượng Nước | Biểu đồ đường lưu lượng nước (m³/h) theo thời gian thực. Tổng m³ đã bơm hôm nay và tuần này. |
| `FAR-03-SAVINGS` | Tiết Kiệm Chi Phí Điện | Bảng hiển thị tiền điện tiết kiệm được (đồng/tháng), so sánh với bơm diesel. Đơn giản, dễ hiểu. |

---

### Module FAR-04: Báo Sự Cố & Hỗ Trợ (Report & Support)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `FAR-04-REPORT-ISSUE` | Tạo Phiếu Báo Hỏng | Chọn loại sự cố từ 6 lựa chọn hình ảnh (Bơm không lên nước, Máy kêu tiếng lạ, Bảng điều khiển lỗi, Pin bị bóng, Khác). Thêm ảnh chụp tùy chọn. |
| `FAR-04-CALL-SUPPORT` | Gọi Kỹ Thuật Viên | Nút GỌI NGAY (large, green). Thông tin kỹ thuật viên phụ trách kèm ảnh đại diện. Lịch sử cuộc gọi. |
| `FAR-04-TICKET-SENT` | Phiếu Đã Gửi | Xác nhận phiếu báo hỏng đã gửi thành công. Mã phiếu, thời gian dự kiến xử lý (24h). |

---

## Lưu Ý Accessibility (Khả Năng Tiếp Cận)

- **Font size**: Body text tối thiểu 16px, heading tối thiểu 20px.
- **Touch target**: Tối thiểu 56px cho các nút điều khiển chính (BẬT/TẮT BƠM).
- **Contrast**: Đảm bảo tỷ lệ tương phản ≥ 4.5:1 cho text thường, ≥ 3:1 cho text lớn (WCAG 2.1 AA).
- **Icon kèm label**: Tất cả icon quan trọng đều có label chữ đi kèm.
- **Ít bước thao tác**: Tối đa 3 bước từ màn hình chính đến bất kỳ hành động nào.

---

## Token & Component Mapping

| UI Element | Token / Component |
|---|---|
| Main pump control button | `Components/Buttons/Button` (height: 56px, `border-radius: full`) |
| Emergency stop button | `Components/Buttons/Button` (danger variant, height: 64px) |
| Pump status chip | `Components/Chips/Status Chip` (`ACTIVE_PUMPING`, `DRY_RUN_PROTECTION`, `FAULT_OVERHEAT`) |
| Energy gauge | `Components/Dashboard/KPI Widget` |
| Report issue form | `Components/Selection/Radio Button` + `Components/Upload/Upload` |
| Support call action | `Components/Buttons/Button` (sky-500 variant) |
| Power savings card | `Components/Cards/Card` + `color.brand.agri.50` background |
