# 🟣 QA Inspection Flow — Quy Trình Kiểm Định & Nghiệm Thu Chất Lượng

> **Vai trò**: QA Inspector (Chuyên viên nghiệm thu chất lượng & an toàn điện mặt trời)  
> **Chuẩn di động**: 390 × 844 px • **Offline-First Ready**

---

## 1. Sơ Đồ Quy Trình 9 Bước

```mermaid
flowchart TD
    Q1["1. Dashboard<br/>Hàng đợi kiểm định chất lượng"] --> Q2["2. QA Queue<br/>Danh sách hồ sơ chờ duyệt"]
    Q2 --> Q3["3. Inspection Details<br/>Đối chiếu bản vẽ thiết kế"]
    Q3 --> Q4["4. GPS Verify<br/>Kiểm tra tọa độ giếng cấp phép"]
    Q4 --> Q5["5. Photo Verify<br/>Kiểm tra cọc tiếp địa & dàn pin"]
    Q5 --> Q6["6. QA Checklist<br/>Đo Voc (420V), Imp (11.2A)"]
    Q6 --> Q7["7. Notes<br/>Ghi nhận quan sát kỹ thuật"]
    Q7 --> Q8{"8. Quyết Định"}
    Q8 -->|Phê Duyệt| Q9["9. QA Report & Success<br/>Đóng dấu QA APPROVED"]
    Q8 -->|Từ Chối/Sửa| Q10["Yêu cầu đội thi công làm lại"]
```

---

## 2. Tiêu Chí Nghiệm Thu Điện Mặt Trời
- **Điện áp hở mạch (Voc)**: Nằm trong dải an toàn 380V – 450V DC.
- **Dòng ngắn mạch/đỉnh (Imp)**: Đạt từ 10.5A – 12.0A khi nắng chuẩn.
- **Quyền lực quyết định**: Phê duyệt QA là quyết định cao nhất, tự động cấp phép kích hoạt đóng điện biến tần.
