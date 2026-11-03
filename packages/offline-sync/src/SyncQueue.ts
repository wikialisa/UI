/**
 * WikiAlisa UI — Persistent Sync Queue
 * Hàng đợi lưu trữ ngoại tuyến hỗ trợ SQLite, IndexedDB hoặc LocalStorage adapter.
 */

import { SyncRecord, SyncStatus } from './types';

export class SyncQueue {
  private memoryQueue: Map<string, SyncRecord> = new Map();
  private storageKey: string;

  constructor(storageKey = 'wikialisa_sync_queue_v1') {
    this.storageKey = storageKey;
    this.loadFromStorage();
  }

  public enqueue(record: SyncRecord): void {
    this.memoryQueue.set(record.id, record);
    this.persistToStorage();
  }

  public getPending(): SyncRecord[] {
    return Array.from(this.memoryQueue.values()).filter(
      r => r.status === 'PENDING' || (r.status === 'FAILED' && r.retryCount < r.maxRetries)
    );
  }

  public updateStatus(id: string, status: SyncStatus, error?: string): void {
    const record = this.memoryQueue.get(id);
    if (record) {
      record.status = status;
      if (status === 'FAILED') {
        record.retryCount += 1;
        record.errorMessage = error;
      }
      this.persistToStorage();
    }
  }

  public remove(id: string): void {
    this.memoryQueue.delete(id);
    this.persistToStorage();
  }

  public getPendingCount(): number {
    return this.getPending().length;
  }

  public getAll(): SyncRecord[] {
    return Array.from(this.memoryQueue.values());
  }

  public clear(): void {
    this.memoryQueue.clear();
    this.persistToStorage();
  }

  private persistToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const serialized = JSON.stringify(Array.from(this.memoryQueue.values()));
        localStorage.setItem(this.storageKey, serialized);
      } catch (e) {
        console.warn('[SyncQueue] Storage write error:', e);
      }
    }
  }

  private loadFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const item = localStorage.getItem(this.storageKey);
        if (item) {
          const parsed: SyncRecord[] = JSON.parse(item);
          parsed.forEach(r => this.memoryQueue.set(r.id, r));
        }
      } catch (e) {
        console.warn('[SyncQueue] Storage read error:', e);
      }
    }
  }
}
