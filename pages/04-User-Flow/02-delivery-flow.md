# 🔵 Delivery Flow — Chuỗi Tác Vụ Giao Vận (Del 01 – Del 18)

> **Vai trò**: Delivery Partner (Tài xế giao vận & bàn giao thiết bị trạm bơm mặt trời)  
> **Chuẩn di động**: 390 × 844 px • **Offline-First Ready**

---

## 1. Sơ Đồ Tiến Trình 13 Bước Chi Tiết

```mermaid
flowchart TD
    D1["1. Dashboard (Delivery)<br/>Tổng quan ca làm việc"] --> D2["2. Assigned Delivery List<br/>Đơn #SP-8942 cách 2.4km"]
    D2 --> D3["3. Delivery Details<br/>Bơm hỏa tiễn 3HP, 8 pin, Inverter"]
    D3 --> D4["4. Navigate to Farmer<br/>Bản đồ vệ tinh GPS"]
    D4 --> D5["5. Farmer Details<br/>Hộ Bác Ba Phi (0918.234.567)"]
    D5 --> D6["6. QR / Serial Scan<br/>SP-8942-SOLAR-3HP"]
    D6 --> D7["7. OTP Verification<br/>Nhập 4 số SMS khách hàng"]
    D7 --> D8["8. GPS Verification<br/>Khóa tọa độ 10.6542°N, 105.7891°E"]
    D8 --> D9["9. Upload Photos<br/>4 góc ảnh hạ bãi an toàn"]
    D9 --> D10["10. Farmer Signature<br/>Ký nhận điện tử"]
    D10 --> D11["11. Delivery Remarks<br/>Ghi chú hiện trường"]
    D11 --> D12["12. Delivery Confirmation<br/>Cấp biên bản POD-8942-VN"]
    D12 --> D13["13. Back Dashboard<br/>Hoàn tất chuyến giao"]
```

---

## 2. Tiêu Chí Nghiệm Thu Từng Bước
1. **Quét mã QR**: Phải khớp chính xác số sê-ri máy bơm trong lệnh điều động xuất kho.
2. **Khóa GPS**: Sai số tọa độ cho phép ≤ 25 mét so với vị trí đã khảo sát.
3. **Chữ ký**: Lưu trữ vector nét vẽ và thời gian epoch UTC.
4. **Mất sóng 4G**: Chuyển ngay sang chế độ Offline Sync, ghi vào bộ đệm SQLite.
