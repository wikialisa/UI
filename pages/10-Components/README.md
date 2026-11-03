# 📁 10 — Component Library (27 Master Components)

Toàn bộ 27 bộ Master Components được tổ chức theo chuẩn Atomic Design:

## 1. Atoms & Controls
1. `Components/Buttons/Button`: Primary Agri, Solar Warning, Danger, Ghost (60 variants).
2. `Components/Buttons/Icon Button`: 3 kích thước (16, 20, 24px) × 4 trạng thái (12 variants).
3. `Components/Buttons/FAB`: Floating Action Button quét mã QR, gọi khẩn cấp (12 variants).
4. `Components/Selection/Checkbox`: Default, Checked, Indeterminate, Disabled.
5. `Components/Selection/Radio Button`: Selected, Unselected, Disabled.
6. `Components/Selection/Switch`: Bật/Tắt chế độ bơm, tự ngắt ban đêm.
7. `Components/Selection/Segmented Control`: Chuyển tab Ngày/Tuần/Tháng (3-segment).
8. `Components/Badges/Badge`: Huy hiệu thông báo đỏ, đếm bản ghi chờ đồng bộ.
9. `Components/Avatars/Avatar`: Ảnh đại diện tài xế, kỹ thuật viên kèm cờ trạng thái vai trò.

---

## 2. Molecules & Inputs
10. `Components/Inputs/Text Field`: Nhập họ tên nông dân, địa chỉ, số điện thoại (36 variants).
11. `Components/Inputs/OTP Input`: Ô nhập mã xác thực OTP 4 số có tự động nhảy con trỏ.
12. `Components/Inputs/Dropdown`: Hộp chọn chủng loại giếng, công suất tấm pin.
13. `Components/Chips/Status Chip`: **14 trạng thái nghiệp vụ trạm bơm**:
    - `DRAFT`, `DISPATCHED`, `DELIVERED`, `INSTALLING`, `TESTING_PUMP`, `QA_PENDING`, `QA_APPROVED`, `QA_REJECTED`, `ACTIVE_PUMPING`, `SOLAR_INSUFFICIENT`, `FAULT_OVERHEAT`, `DRY_RUN_PROTECTION`, `MAINTENANCE_DUE`, `OFFLINE_SYNC_PENDING`.
14. `Components/Feedback/Snackbar`: Thông báo tạm (Thành công, Cảnh báo, Thất bại, Thông tin).
15. `Components/Feedback/Banner`: Dải thông báo ngoại tuyến cố định (Offline Banner).
16. `Components/Feedback/Empty State`: 7 màn hình rỗng (Không có chuyến giao, chưa có sự cố).
17. `Components/Feedback/Progress`: Thanh tiến độ tải ảnh, vòng quay chờ đồng bộ, khung xương skeleton.
18. `Components/Upload/Upload`: Hộp chụp ảnh từ camera thực địa, đính kèm tài liệu, lấy chữ ký điện tử.

---

## 3. Organisms & Structural Layout
19. `Components/Cards/Card`: Thẻ công việc, thông tin hộ nông dân, thẻ serial máy bơm.
20. `Components/Dashboard/KPI Widget`: Khối đo công suất phát điện (kW), lưu lượng nước (m³/h).
21. `Components/Map/Map Card`: Bản đồ GPS thu nhỏ hiển thị vị trí trạm bơm và hướng di chuyển.
22. `Components/Timeline/Timeline Item`: Dòng thời gian giao vận ➔ lắp đặt ➔ QA ➔ bảo trì (15 variants).
23. `Components/Lists/List Item`: Dòng danh sách nhiệm vụ hôm nay, nhật ký cảnh báo sự cố.
24. `Components/Navigation/Bottom Navigation`: Thanh điều hướng chân trang 5 tab chuẩn iOS/Android.
25. `Components/Navigation/Tabs`: Bộ chuyển đổi tab danh sách Đang chờ / Đã xong / Làm lại.
26. `Components/Navigation/Stepper`: Thanh tiến trình 4 bước hoàn thành lắp đặt trạm bơm.
27. `Components/Dialogs/Dialog`: Hộp thoại xác nhận hoàn thành, cảnh báo ngắt bơm khẩn cấp, từ chối QA.
