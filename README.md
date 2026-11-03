# WikiAlisa Kit — All-in-One Atomic Design System & UI Kits

Bộ công cụ thiết kế và phát triển giao diện đa nền tảng do **WikiAlisa** nghiên cứu, thiết kế và phát triển. Hệ thống tích hợp sẵn mã nguồn cho **React Native**, **Flutter** và **HTML / Tailwind CSS**, chuẩn hóa theo quy trình thiết kế sáu giai đoạn cho ứng dụng **Agriculture Solar Pump Management System**.

- **Tác giả / Bản quyền**: WikiAlisa (`wikialisa`)
- **Repository chính thức**: [`https://github.com/wikialisa/kit`](https://github.com/wikialisa/kit)
- **Website Showcase Trực tuyến**: [`https://wikialisa.github.io/UI`](https://wikialisa.github.io/UI)

---

## 📁 Cấu trúc Bộ Công cụ

```text
wikialisa/kit/
├── index.html                   # Showcase Website SPA tương tác trực tiếp (GitHub Pages)
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD tự động xuất bản lên GitHub Pages
├── docs/
│   ├── 01_PRODUCT_DISCOVERY.md  # Giai đoạn 01: Khám phá sản phẩm & 5 vai trò
│   ├── 02_PRODUCT_OVERVIEW.md   # Giai đoạn 02: Tài liệu sáu giai đoạn Tiếng Việt
│   ├── 03_DESIGN_SYSTEM.md      # Giai đoạn 03: Hệ thống Tokens, Spacing 8pt, Inter
│   ├── 04_MOBILE_ARCHITECTURE.md# Giai đoạn 04: 11 Mô-đun & Offline-First Pattern
│   └── 05_PROTOTYPE_AND_HANDOFF.md # Giai đoạn 05 & 06: Kịch bản kiểm thử & Handoff
├── tokens/
│   ├── tokens.json              # Chuẩn W3C / Figma Tokens Studio
│   ├── tokens.css               # Biến CSS (Light / Dark Mode)
│   ├── tokens.ts                # TypeScript / React Native Tokens
│   └── tokens.dart              # Flutter ThemeData & Consts
├── scripts/
│   └── update_figma_02_overview.js # Script tự động hóa cho Figma Console
├── CONTRIBUTING.md              # Hướng dẫn đóng góp
└── LICENSE                      # MIT License - Bản quyền thuộc WikiAlisa
```

---

## 🚀 Các Tính Năng Nổi Bật

1. **Design Tokens Explorer**:
   - 48 Tokens màu sắc (Brand `Solar Gold`, `Agri Green`, `Sky Blue`, Semantics, Neutral).
   - Thang Spacing lưới chuẩn 8pt (từ `4px` đến `80px`).
   - Thang Typography Inter (Display XL 48px -> Overline 11px), chuẩn WCAG 2.1 AA.
2. **Interactive Component Showcase**:
   - Nút bấm, FAB quét mã QR, công tắc ngắt khẩn cấp.
   - 14 Domain Status Chips ứng dụng bơm nước mặt trời (`ACTIVE_PUMPING`, `QA_APPROVED`, `DRY_RUN_PROTECTION`, v.v.).
   - Pattern xử lý ngoại tuyến (Offline Banner & Sync Counter `☁️ 3`).
   - Thẻ theo dõi công suất bơm năng lượng mặt trời theo thời gian thực (`PumpKpiCard`).
3. **Mã Nguồn Đa Nền Tảng (1-Click Copy)**:
   - ⚛️ **React Native**: Chuẩn TypeScript, StyleSheet, Accessible Touch Target 48pt.
   - 💙 **Flutter (Dart)**: `StatelessWidget`, Material 3, Token mapping.
   - 🌐 **HTML / Tailwind**: Semantic HTML5, dark mode ready.
4. **Trình Mô Phỏng 390px Mobile First (5 Roles)**:
   - `Delivery Partner`: Điều hướng GPS, quét QR bàn giao.
   - `Installation Team`: Checklist thực địa, chụp ảnh giếng & pin.
   - `QA Inspector`: Biên bản đo kiểm Voc/Imp, phê duyệt/từ chối.
   - `Service Tech`: Cảnh báo cạn nước, nhật ký sửa chữa.
   - `Farmer`: Điều khiển máy bơm, theo dõi tiền tiết kiệm.

---

## 🛠 Hướng Dẫn Đẩy Mã Nguồn Lên GitHub

```bash
git add .
git commit -m "feat: update project identity to WikiAlisa Kit"
git push -u origin main
```
