/**
 * WikiAlisa UI — Offline-First Sync Engine Types
 */

export type SyncOperationType = 'CREATE' | 'UPDATE' | 'DELETE' | 'PHOTO_UPLOAD' | 'SIGNATURE_UPLOAD';

export type SyncStatus = 'PENDING' | 'SYNCING' | 'SUCCESS' | 'FAILED' | 'CONFLICT';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface SyncRecord<T = any> {
  id: string;
  entityType: 'DELIVERY_POD' | 'INSTALLATION_CHECKLIST' | 'QA_INSPECTION' | 'MAINTENANCE_TICKET' | 'FARMER_LOG';
  operation: SyncOperationType;
  payload: T;
  clientTimestamp: number;
  serverTimestamp?: number;
  status: SyncStatus;
  retryCount: number;
  maxRetries: number;
  errorMessage?: string;
  geoLocation?: GeoLocation;
  checksum: string;
}

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: 'wifi' | 'cellular' | 'none' | 'unknown';
}

export interface SyncEngineConfig {
  syncEndpoint: string;
  storageKey?: string;
  autoSyncIntervalMs?: number;
  maxRetries?: number;
  batchSize?: number;
  onNetworkChange?: (state: NetworkState) => void;
  onSyncStateChange?: (pendingCount: number, isSyncing: boolean) => void;
}
