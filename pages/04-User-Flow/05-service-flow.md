# 🔴 Service & Maintenance Flow — Tiếp Nhận Khiếu Nại & Bảo Trì Sự Cố

> **Vai trò**: Service Technician (Kỹ thuật viên dịch vụ bảo hành & bảo dưỡng trạm bơm)  
> **Chuẩn di động**: 390 × 844 px • **Offline-First Ready**

---

## 1. Sơ Đồ Quy Trình 10 Bước

```mermaid
flowchart TD
    S1["1. Dashboard<br/>Lịch sửa chữa & bảo trì khẩn cấp"] --> S2["2. Complaint List<br/>Danh sách khiếu nại của nông dân"]
    S2 --> S3["3. Complaint Details<br/>Mã lỗi E-04 Dry-run Protection"]
    S3 --> S4["4. Navigate<br/>Dẫn đường đến trạm bơm sự cố"]
    S4 --> S5["5. Inspection<br/>Kiểm tra mực nước & cuộn dây"]
    S5 --> S6["6. Spare Parts<br/>Xuất kho cảm biến mực nước mới"]
    S6 --> S7["7. Repair Report<br/>Hạ sâu cảm biến thêm 3m"]
    S7 --> S8["8. Upload Photos<br/>Ảnh trước & sau khi xử lý"]
    S8 --> S9["9. Customer Feedback<br/>Bác Ba Phi đánh giá 5 sao"]
    S9 --> S10["10. Close Ticket<br/>Khóa phiếu thành công"]
```

---

## 2. Các Mã Lỗi Phổ Biến Cần Xử Lý
- `E-01: OVER_VOLTAGE`: Quá áp dàn pin mặt trời do nắng quá gắt hoặc đấu nối sai chuỗi.
- `E-04: DRY_RUN_PROTECTION`: Bơm ngắt an toàn vì nước giếng cạn dưới mức cảm biến.
- `E-07: MOTOR_OVERHEAT`: Động cơ kẹt cát hoặc nhiệt độ biến tần vượt ngưỡng an toàn 75°C.
