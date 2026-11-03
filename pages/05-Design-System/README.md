# 📁 05 — Design System Foundations & Tokens

## 1. Hệ thống Màu sắc (48 Color Tokens)

### A. Màu Nhận diện Thương hiệu (Brand Colors)
- **Solar Gold**:
  - `solar-50`: `#FFF9E6` (Nền sáng nhẹ)
  - `solar-500`: `#E59800` (Màu chính: Năng lượng mặt trời, Cảnh báo vừa)
  - `solar-600`: `#C68200` (Hover / Pressed)
- **Agriculture Leaf Green**:
  - `agri-50`: `#EBF7EE` (Nền thẻ thành công)
  - `agri-500`: `#1B873F` (Màu chính: Nông nghiệp xanh, Nút hành động)
  - `agri-600`: `#146830` (Màu nhấn mạnh)
- **Sky Water Blue**:
  - `sky-50`: `#F0F9FF` (Nền thẻ lưu lượng)
  - `sky-500`: `#0284C7` (Lưu lượng nước, Trạng thái bơm)

### B. Màu Ngữ nghĩa (Semantics)
- `semantic/success`: `#16A34A` (QA Phê duyệt, Đạt chuẩn)
- `semantic/warning`: `#D97706` (Nắng yếu, Bụi bám pin mặt trời)
- `semantic/danger`: `#DC2626` (Quá nhiệt, Cạn nước, Bị từ chối)
- `semantic/info`: `#2563EB` (Cập nhật lịch, Thông báo)

---

## 2. Thang Đo Khoảng Cách (8pt Grid Spacing)
- `4px` (spacing-4): Khoảng cách icon + label siêu nhỏ
- `8px` (spacing-8): Padding nội bộ trong button, icon khoảng cách
- `12px` (spacing-12): Khoảng cách giữa các phần tử compact
- `16px` (spacing-16): **Khoảng cách tiêu chuẩn di động**, padding thẻ card
- `20px` (spacing-20): Khoảng cách giữa các ô nhập liệu form
- `24px` (spacing-24): Gutter phân tách các khối nội dung lớn
- `32px` (spacing-32): Margin trên/dưới các section
- `48px` (spacing-48): **Chiều cao vùng bấm tối thiểu (Touch Target)**
- `64px` (spacing-64): Khoảng cách minh họa empty state
- `80px` (spacing-80): Khoảng cách an toàn phía dưới (Bottom Navigation)

---

## 3. Thang Typography (Phông chữ Inter)

| Cấp bậc | Kích thước | Chiều cao dòng | Độ đậm | Ứng dụng |
| :--- | :--- | :--- | :--- | :--- |
| `Display XL` | 48px | 56px | Bold (700) | Số liệu KW điện / Lưu lượng bơm tức thời |
| `Heading 1`  | 32px | 38px | SemiBold (600)| Tiêu đề màn hình chính |
| `Heading 2`  | 28px | 34px | SemiBold (600)| Tiêu đề Bottom Sheet |
| `Heading 3`  | 24px | 30px | SemiBold (600)| Tiêu đề Section |
| `Heading 4`  | 20px | 26px | SemiBold (600)| Tên thẻ máy bơm, Tên nông dân |
| `Body L`     | 16px | 24px | Regular (400) | Văn bản đọc chính |
| `Body M`     | 14px | 20px | Regular (400) | Mô tả phụ trong danh sách |
| `Button`     | 16px | 24px | SemiBold (600)| Chữ trên nút bấm |
| `Caption`    | 12px | 16px | Medium (500)  | Nhãn nhãn ô nhập, Helper text |
| `Overline`   | 11px | 14px | Bold (700)    | MÃ THIẾT BỊ, SERIAL IN HOA |

---

## 4. Chế độ Sáng & Tối (Light vs Dark Mode)
- **Light Mode (Mặc định)**: Nền trang `#F8FAFC`, bề mặt thẻ `#FFFFFF`, chữ chính `#0F172A` (chống chói nắng ngoài trời).
- **Dark Mode**: Nền trang `#0B1120`, bề mặt thẻ `#1E293B`, chữ chính `#F8FAFC`.
