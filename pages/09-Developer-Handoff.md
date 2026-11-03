# 📁 09 — Developer Handoff (Hướng dẫn Bàn giao cho Kỹ sư Lập trình)

## 1. Quy tắc Đặt tên Linh kiện (Component Naming Convention)
Mọi component trong thư viện được chuẩn hóa theo cú pháp phân cấp:
```text
Components/{Category}/{Component_Name}
```
*Ví dụ:*
- `Components/Buttons/Button`
- `Components/Inputs/Text Field`
- `Components/Chips/Status Chip`
- `Components/Cards/Card`
- `Components/Dashboard/KPI Widget`

---

## 2. Tiêu chuẩn Vùng bấm & Căn chỉnh Kỹ thuật
- **Minimum Touch Target**: 48 × 48 pt cho tất cả nút bấm và icon button.
- **Auto Layout Sizing Rules**:
  - Thẻ chứa (Cards): `Horizontal: Fill Container`, `Vertical: Hug Contents`.
  - Không sử dụng tọa độ cố định (`x, y`) cho các phần tử bên trong màn hình.
- **Zero Hardcoded Values**: Nghiêm cấm gán mã màu hex hoặc kích thước số nguyên cứng vào code. Mọi giá trị phải trỏ về Tokens Object:
  ```typescript
  // React Native / TypeScript
  backgroundColor: tokens.color.brand.agri[500],
  padding: tokens.spacing[16],
  borderRadius: tokens.radius.md,
  ```

---

## 3. Đồng bộ Tokens Đa Nền tảng
- **Figma Variables**: Xuất định dạng JSON W3C tương thích Tokens Studio / Style Dictionary.
- **Web**: Biến CSS Variables tại `:root` và `[data-theme="dark"]`.
- **Flutter**: File lớp hằng số `SolarPumpColors`, `SolarPumpSpacing`, `SolarPumpTypography`.
- **React Native**: File `tokens.ts` trỏ tới theme StyleSheet.
