/**
 * WikiAlisa UI — Offline-First Synchronization Engine
 * Quản lý phát hiện mạng, hàng đợi ngoại tuyến và đẩy dữ liệu lên máy chủ theo lô.
 */

import { SyncEngineConfig, SyncRecord, NetworkState } from './types';
import { SyncQueue } from './SyncQueue';
import { ConflictResolver } from './ConflictResolver';

export class OfflineSyncEngine {
  private queue: SyncQueue;
  private config: SyncEngineConfig;
  private isOnline = true;
  private isSyncing = false;
  private timer: any = null;

  constructor(config: SyncEngineConfig) {
    this.config = {
      autoSyncIntervalMs: 15000,
      maxRetries: 3,
      batchSize: 10,
      storageKey: 'wikialisa_offline_sync_queue',
      ...config,
    };
    this.queue = new SyncQueue(this.config.storageKey);
    this.initNetworkListener();
    this.startAutoSync();
  }

  public setOnlineStatus(online: boolean): void {
    const wasOffline = !this.isOnline;
    this.isOnline = online;

    if (this.config.onNetworkChange) {
      this.config.onNetworkChange({
        isConnected: online,
        isInternetReachable: online,
        type: online ? 'cellular' : 'none',
      });
    }

    this.notifyState();

    // Tự động kích hoạt đồng bộ khi có mạng trở lại
    if (wasOffline && online) {
      console.log('[OfflineSyncEngine] 🌐 Sóng di động đã khôi phục. Đang tự động đẩy hàng đợi...');
      this.syncNow();
    }
  }

  public recordFieldOperation<T>(
    entityType: SyncRecord['entityType'],
    operation: SyncRecord['operation'],
    payload: T,
    geoLocation?: SyncRecord['geoLocation']
  ): SyncRecord<T> {
    const record: SyncRecord<T> = {
      id: 'REC_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      entityType,
      operation,
      payload,
      clientTimestamp: Date.now(),
      status: 'PENDING',
      retryCount: 0,
      maxRetries: this.config.maxRetries || 3,
      geoLocation,
      checksum: 'SHA256_' + Math.random().toString(16).substring(2, 10),
    };

    this.queue.enqueue(record);
    this.notifyState();

    if (this.isOnline) {
      this.syncNow();
    }

    return record;
  }

  public async syncNow(): Promise<{ synced: number; failed: number }> {
    if (this.isSyncing || !this.isOnline) {
      return { synced: 0, failed: 0 };
    }

    const pending = this.queue.getPending();
    if (pending.length === 0) {
      return { synced: 0, failed: 0 };
    }

    this.isSyncing = true;
    this.notifyState();

    let synced = 0;
    let failed = 0;

    const batch = pending.slice(0, this.config.batchSize || 10);

    for (const record of batch) {
      try {
        this.queue.updateStatus(record.id, 'SYNCING');
        // Giả lập gửi lên máy chủ API hoặc thực hiện fetch
        await this.mockServerPost(record);
        this.queue.updateStatus(record.id, 'SUCCESS');
        this.queue.remove(record.id);
        synced++;
      } catch (err: any) {
        this.queue.updateStatus(record.id, 'FAILED', err.message);
        failed++;
      }
    }

    this.isSyncing = false;
    this.notifyState();
    return { synced, failed };
  }

  public getPendingCount(): number {
    return this.queue.getPendingCount();
  }

  public getQueueRecords(): SyncRecord[] {
    return this.queue.getAll();
  }

  private notifyState(): void {
    if (this.config.onSyncStateChange) {
      this.config.onSyncStateChange(this.getPendingCount(), this.isSyncing);
    }
  }

  private startAutoSync(): void {
    if (this.config.autoSyncIntervalMs && this.config.autoSyncIntervalMs > 0) {
      this.timer = setInterval(() => {
        if (this.isOnline && this.getPendingCount() > 0) {
          this.syncNow();
        }
      }, this.config.autoSyncIntervalMs);
    }
  }

  private initNetworkListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.setOnlineStatus(true));
      window.addEventListener('offline', () => this.setOnlineStatus(false));
      this.isOnline = navigator.onLine;
    }
  }

  private mockServerPost(record: SyncRecord): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Tỷ lệ giả lập thành công 98%
        if (Math.random() < 0.02) {
          reject(new Error('Network timeout'));
        } else {
          resolve();
        }
      }, 400);
    });
  }

  public destroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
