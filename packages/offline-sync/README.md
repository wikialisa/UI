# @wikialisa/offline-sync

> **Offline-First Synchronization Engine** cho hoạt động thực địa nông nghiệp trạm bơm năng lượng mặt trời.

---

## 1. Tính Năng Cốt Lõi
- **Tự động bắt mạng (Network Detection)**: Lắng nghe trạng thái sóng di động thực địa, tự động kích hoạt đẩy hàng đợi khi có mạng.
- **Hàng đợi bền bỉ (Persistent Sync Queue)**: Lưu trữ các thao tác (Checklist, Quét QR, Ký tên, Tọa độ GPS) vào bộ nhớ cục bộ SQLite / IndexedDB / LocalStorage.
- **Giải quyết xung đột (Conflict Resolution)**: 
  - Quy tắc ưu tiên theo quyền vai trò (QA Inspector Approval được ưu tiên cao nhất).
  - Thuật toán Last-Write-Wins (LWW) đối soát theo timestamp UTC chuẩn.
  - Bảo lưu chữ ký điện tử nông dân và ảnh thực địa có gắn watermark GPS.
- **Thử lại lũy tiến (Exponential Backoff)**: Tự động thử lại khi gặp sự cố nghẽn mạng thực địa.

---

## 2. Cách Sử Dụng Trong Dự Án

```typescript
import { OfflineSyncEngine } from '@wikialisa/offline-sync';

// Khởi tạo engine
const syncEngine = new OfflineSyncEngine({
  syncEndpoint: 'https://api.wikialisa.vn/v1/sync',
  autoSyncIntervalMs: 15000,
  maxRetries: 3,
  onSyncStateChange: (pendingCount, isSyncing) => {
    console.log(`Đang có ${pendingCount} bản ghi chờ đồng bộ. Trạng thái: ${isSyncing ? 'Đang đẩy dữ liệu...' : 'Nghỉ'}`);
  }
});

// Ghi nhận thao tác thực địa (kể cả khi mất sóng 4G)
syncEngine.recordFieldOperation(
  'DELIVERY_POD',
  'SIGNATURE_UPLOAD',
  {
    orderId: 'SP-8942',
    farmerName: 'Bác Ba Phi',
    signature: 'data:image/svg+xml;base64,...',
  },
  {
    latitude: 10.6542,
    longitude: 105.7891,
    accuracy: 3.5,
    timestamp: Date.now()
  }
);
```
