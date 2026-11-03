# WikiAlisa Kit — All-in-One Atomic Design System & UI Kits

Bộ công cụ thiết kế và phát triển giao diện đa nền tảng do **WikiAlisa** nghiên cứu, thiết kế và phát triển. Hệ thống tích hợp sẵn mã nguồn cho **React Native**, **Flutter** và **HTML / Tailwind CSS**, chuẩn hóa theo quy trình thiết kế sáu giai đoạn cho ứng dụng **Agriculture Solar Pump Management System**.

- **Tác giả / Bản quyền**: WikiAlisa (`wikialisa`)
- **Repository chính thức**: [`https://github.com/wikialisa/UI`](https://github.com/wikialisa/UI)
- **Website Showcase Trực tuyến**: [`https://wikialisa.github.io/UI`](https://wikialisa.github.io/UI)

---

## 📁 Cấu trúc 12 Pages Chuẩn Hệ Thống

```text
wikialisa/kit/
├── index.html                   # Showcase Website SPA tương tác trực tiếp (GitHub Pages)
├── pages/                       # 12 Trang tài liệu chuẩn hóa tương ứng Figma
│   ├── 01-Cover.md              # 📁 01: Bìa & Metadata dự án
│   ├── 02-Product-Overview.md   # 📁 02: Tài liệu sáu giai đoạn Tiếng Việt
│   ├── 03-Documentation.md      # 📁 03: Hướng dẫn kỹ thuật & chuẩn WCAG 2.1 AA
│   ├── 04-User-Flow.md          # 📁 04: Chuỗi quy trình 20 bước & 5 vai trò
│   ├── 05-Design-System.md      # 📁 05: Tokens màu sắc, lưới 8pt, typography Inter
│   ├── 06-High-Fidelity-UI.md   # 📁 06: 49 Màn hình di động 390px (Auth, 5 Roles)
│   ├── 07-Admin-Panel.md        # 📁 07: Bảng điều khiển Quản trị Desktop Web
│   ├── 08-Prototype.md          # 📁 08: Kịch bản kiểm thử nguyên mẫu tương tác
│   ├── 09-Developer-Handoff.md  # 📁 09: Quy chuẩn bàn giao cho kỹ sư lập trình
│   ├── 10-Components.md         # 📁 10: 27 Bộ Master Components chuẩn Atomic
│   ├── 11-Icons.md              # 📁 11: Hệ thống Icon Material Symbols Rounded
│   └── 12-Changelog-Roadmap.md  # 📁 12: Nhật ký phát hành & Lộ trình v2.0
├── tokens/
│   ├── tokens.json              # Chuẩn W3C / Figma Tokens Studio
│   ├── tokens.css               # Biến CSS (Light / Dark Mode)
│   ├── tokens.ts                # TypeScript / React Native Tokens
│   └── tokens.dart              # Flutter ThemeData & Consts
├── scripts/
│   └── update_figma_02_overview.js # Script tự động hóa cho Figma Console
├── CONTRIBUTING.md              # Hướng dẫn đóng góp mã nguồn
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
