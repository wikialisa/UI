# 14 Trạng thái Nghiệp vụ Trạm Bơm (Status Chips)

Bảng phân loại chi tiết 14 trạng thái chuyên dụng cho trạm bơm năng lượng mặt trời:

1. `DRAFT`: Hồ sơ trạm bơm mới đăng ký
2. `DISPATCHED`: Đang vận chuyển từ kho đến thực địa
3. `DELIVERED`: Đã bàn giao cho hộ nông dân
4. `INSTALLING`: Đội ngũ kỹ thuật đang thi công lắp đặt
5. `TESTING_PUMP`: Đang chạy thử nghiệm nước
6. `QA_PENDING`: Đang chờ kiểm định viên nghiệm thu
7. `QA_APPROVED`: Nghiệm thu đạt chuẩn, sẵn sàng cấp nước
8. `QA_REJECTED`: Lỗi kỹ thuật, yêu cầu lắp đặt lại
9. `ACTIVE_PUMPING`: Nắng tốt, bơm đang hoạt động
10. `SOLAR_INSUFFICIENT`: Nắng yếu / mây che, giảm công suất
11. `FAULT_OVERHEAT`: Quá nhiệt biến tần inverter
12. `DRY_RUN_PROTECTION`: Giếng cạn nước, tự ngắt bảo vệ
13. `MAINTENANCE_DUE`: Đến hạn bảo dưỡng định kỳ
14. `OFFLINE_SYNC_PENDING`: Dữ liệu cục bộ chờ đồng bộ đám mây
