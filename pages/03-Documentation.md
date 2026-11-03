# 📁 03 — Documentation & Design Guidelines

## 1. Triết lý Thiết kế Cốt lõi
- **Mobile First (390px Base Width)**: Khung nhìn chuẩn hóa theo iPhone 14/15/16/17 và thiết bị Android tương đương.
- **Khả năng Tiếp cận (WCAG 2.1 AA)**:
  - Tương phản văn bản thông thường tối thiểu **4.5:1**.
  - Tương phản thành phần đồ họa & văn bản lớn tối thiểu **3.0:1**.
- **Lưới Cơ sở 8pt Grid**: Mọi Spacing, Padding, Dimensions và Line Height đều căn chỉnh theo bội số 4 hoặc 8px.
- **Kích thước Vùng bấm (Touch Target)**: Tối thiểu **48 × 48 pt** cho mọi nút bấm, icon button nhằm hỗ trợ thao tác chính xác ngoài trời nắng.

---

## 2. Quy tắc Auto Layout & Responsive
1. **Container Cards**:
   - `Horizontal Sizing`: Fill container
   - `Vertical Sizing`: Hug contents
   - `Padding`: 16px (spacing-16) hoặc 20px (spacing-20)
2. **Typography Text Containers**:
   - Tiêu đề đa dòng: `textAutoResize = 'HEIGHT'`, chiều rộng cố định hoặc Fill.
   - Nhãn nút & Status Chips: `textAutoResize = 'WIDTH_AND_HEIGHT'`.

---

## 3. Kiến trúc Ngoại tuyến (Offline-First Architecture)
- **Offline Banner**: Xuất hiện ngay dưới Top App Bar với nền `#FEF2F2` khi mất kết nối mạng.
- **Sync Counter Badge**: Hiển thị số lượng giao dịch / biên bản đang chờ đồng bộ (ví dụ: `☁️ 3`).
- **Conflict Resolution**: Cơ sở dữ liệu cục bộ SQLite/WatermelonDB với quy tắc ghi đè phiên bản theo dấu thời gian có kiểm tra chéo (Timestamp-based with QA validation).
