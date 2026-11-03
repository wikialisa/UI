# Giai đoạn 03 — Hệ thống Thiết kế (Design System & Tokens)

## 1. Nền tảng Biến số (Tokens)
- **Colors (48 Tokens)**:
  - Brand Solar: `#E59800` (Solar 500)
  - Brand Agri: `#1B873F` (Agri 500)
  - Brand Sky / Water: `#0284C7` (Sky 500)
  - Semantics: Success (`#16A34A`), Warning (`#D97706`), Danger (`#DC2626`), Info (`#2563EB`)
- **Spacing (8pt Grid)**:
  `4px`, `8px`, `12px`, `16px` (Base), `20px`, `24px`, `32px`, `40px`, `48px` (Touch target), `56px`, `64px`, `80px`.
- **Typography (Inter Font Family)**:
  Thang chữ từ `Display XL (48px)` đến `Overline (11px)`, chuẩn WCAG 2.1 AA.
- **Corner Radius**: `4px` đến `999px (Pill)`.

## 2. 27 Master Component Sets
Tổ chức chuẩn Atomic Design theo định dạng `Components/{Category}/{Name}` hỗ trợ Auto Layout, Variant Set và Variable Bindings.
