# WikiAlisa Kit — All-in-One Atomic Design System & UI Kits

[![Chromatic Visual Tests](https://github.com/wikialisa/UI/actions/workflows/chromatic.yml/badge.svg)](https://github.com/wikialisa/UI/actions/workflows/chromatic.yml)
[![Deploy to GitHub Pages](https://github.com/wikialisa/UI/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/wikialisa/UI/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Bộ công cụ thiết kế và phát triển giao diện đa nền tảng do **WikiAlisa** nghiên cứu, thiết kế và phát triển. Hệ thống tích hợp sẵn mã nguồn cho **React Native**, **Flutter** và **HTML / Tailwind CSS**, chuẩn hóa theo quy trình thiết kế sáu giai đoạn cho ứng dụng **Agriculture Solar Pump Management System**.

- **Tác giả / Bản quyền**: WikiAlisa (`wikialisa`)
- **Repository chính thức**: [`https://github.com/wikialisa/UI`](https://github.com/wikialisa/UI)
- **Website Showcase Trực tuyến**: [`https://wikialisa.github.io/UI`](https://wikialisa.github.io/UI)
- **Bảng Quản lý Dự án (Roadmap Project)**: [`https://github.com/users/wikialisa/projects/3`](https://github.com/users/wikialisa/projects/3)
- **Hướng dẫn Kiểm thử Thị giác CI với Chromatic**: [`docs/AUTOMATE_WITH_CI.md`](docs/AUTOMATE_WITH_CI.md)

---

## 🛠️ Lập Trình Với Framework TypeScript / TSX & Đóng Gói Tĩnh Bằng `pnpm`

Dự án được xây dựng trên kiến trúc Single Page Application bằng **React 19**, **TypeScript**, **TSX**, **Tailwind CSS v4** và **Vite**. Dữ liệu được đóng gói tối ưu ra thư mục tĩnh `dist/` phục vụ triển khai linh hoạt:

```bash
# 1. Cài đặt các thư viện phụ thuộc bằng pnpm
pnpm install

# 2. Khởi chạy môi trường phát triển (Vite Dev Server với HMR)
pnpm dev

# 3. Kiểm tra kiểu dữ liệu tĩnh TypeScript
pnpm type-check

# 4. Đóng gói ra thư mục tĩnh dist/ phục vụ production
pnpm build

# 5. Xem thử bản dựng tĩnh trên local server
pnpm preview
```

---

## 🛠️ Tự Động Hóa CI/CD & Kiểm Thử Thị Giác (Chromatic)

Hệ thống tích hợp sẵn 2 pipeline tự động hóa qua GitHub Actions:
1. **[Chromatic Visual Tests](deploy/chromatic-workflow.yml)**: Template GitHub Actions tự động chạy visual regression testing mỗi khi mở Pull Request hoặc push code lên `main`. So sánh từng pixel giao diện với baseline và đính kèm PR status badges (`UI Tests` & `UI Review`).
2. **[Deploy to GitHub Pages](deploy/github-pages-workflow.yml)**: Template tự động triển khai showcase web tĩnh lên `https://wikialisa.github.io/UI`.

```bash
# Cài đặt và chạy visual test cục bộ
npm install
npm run chromatic
```

---

## 📁 Cấu trúc 12 Pages Chuẩn Hệ Thống

```text
wikialisa/kit/
├── deploy/
│   ├── chromatic-workflow.yml   # Template CI: Chromatic Visual Regression & UI Review
│   └── github-pages-workflow.yml # Template CD: Tự động triển khai GitHub Pages
├── package.json                 # Cấu hình scripts chromatic và npm workspaces
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
├── packages/
│   ├── react-native/            # Thư viện component React Native & 390px Simulator
│   ├── flutter/                 # Thư viện widget Flutter (Dart)
│   ├── html/                    # Vanilla CSS & Tailwind components
│   └── offline-sync/            # SDK Offline-first sync engine
├── tokens/
│   ├── tokens.json              # Chuẩn W3C / Figma Tokens Studio
│   ├── tokens.css               # Biến CSS (Light / Dark Mode)
│   ├── tokens.ts                # TypeScript / React Native Tokens
│   └── tokens.dart              # Flutter ThemeData & Consts
├── CONTRIBUTING.md              # Hướng dẫn đóng góp mã nguồn
└── LICENSE                      # MIT License - Bản quyền thuộc WikiAlisa
```

---

## 🚀 Các Tính Năng Nổi Bật

1. **Design Tokens Explorer**:
   - 48 Tokens màu sắc (Brand `Solar Gold`, `Agri Green`, `Sky Blue`, Semantics, Neutral).
   - Thang Spacing lưới chuẩn 8pt (từ `4px` đến `80px`).
   - Thang Typography Inter (Display XL 48px -> Overline 11px), chuẩn WCAG 2.1 AA.
2. **Interactive Component Showcase (20 Nhóm Atomic)**:
   - Nút bấm (5 biến thể × 3 kích cỡ), Icon button, FAB bo tròn 16px.
   - Form inputs 6 trạng thái, Checkbox, Radio, Switch bật/tắt.
   - 13 Huy hiệu trạng thái nghiệp vụ chuẩn Figma.
   - Hộp thoại Dialog Modal & Toast thông báo nổi.
3. **Mã Nguồn Đa Nền Tảng (1-Click Copy)**:
   - ⚛️ **React Native**: Chuẩn TypeScript, StyleSheet, Accessible Touch Target 48pt.
   - 💙 **Flutter (Dart)**: `StatelessWidget`, Material 3, Token mapping.
   - 🌐 **HTML / Tailwind**: Semantic HTML5, dark mode ready.
4. **Trình Mô Phỏng 390px Mobile First (5 Roles + Auth)**:
   - 100% Live Code HTML/CSS tương tác thực tế + Component React TSX.
   - `Delivery Partner`: Dẫn đường GPS, bàn phím OTP, quét QR & ảnh, ký cảm ứng.
   - `Installation Team`: Checklist an toàn, thử biến tần Voc/Imp/Lưu lượng.
   - `QA Inspector`: Thẩm định tiêu chuẩn TCVN, phê duyệt/từ chối/rework.
   - `Service Tech`: Phiếu lỗi E-04 chống cạn, chọn linh kiện thay thế.
   - `Farmer`: Đồng hồ công suất 4.8 kW, công tắc điều khiển bơm từ xa.
