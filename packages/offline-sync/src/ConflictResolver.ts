/**
 * WikiAlisa UI — Conflict Resolver
 * Triển khai thuật toán Last-Write-Wins (LWW) kết hợp kiểm tra quyền ưu tiên theo vai trò thực địa.
 */

import { SyncRecord } from './types';

export class ConflictResolver {
  /**
   * Giải quyết xung đột giữa bản ghi client và bản ghi server
   * Quy tắc ưu tiên:
   * 1. QA Inspector Approval có độ ưu tiên cao nhất, không bị ghi đè bởi Installation.
   * 2. Bản ghi có chữ ký số hoặc ảnh thực địa được bảo lưu.
   * 3. Thuật toán Last-Write-Wins (LWW) dựa trên timestamp chuẩn UTC.
   */
  public static resolve<T extends Record<string, any>>(
    clientRecord: SyncRecord<T>,
    serverRecord: SyncRecord<T>
  ): { resolvedRecord: SyncRecord<T>; conflictReason?: string } {
    // 1. Kiểm tra ưu tiên vai trò QA
    if (serverRecord.entityType === 'QA_INSPECTION' && serverRecord.payload?.decision === 'APPROVED') {
      return {
        resolvedRecord: serverRecord,
        conflictReason: 'QA Inspector decision is final and overrides pending modifications.'
      };
    }

    // 2. Kiểm tra chữ ký điện tử
    if (clientRecord.operation === 'SIGNATURE_UPLOAD' && clientRecord.payload?.signatureData) {
      return {
        resolvedRecord: clientRecord,
        conflictReason: 'Farmer signature on client is preserved.'
      };
    }

    // 3. Last-Write-Wins (LWW)
    const clientTime = clientRecord.clientTimestamp;
    const serverTime = serverRecord.serverTimestamp || serverRecord.clientTimestamp;

    if (clientTime >= serverTime) {
      return {
        resolvedRecord: clientRecord,
        conflictReason: 'Client timestamp is more recent (LWW resolution).'
      };
    } else {
      return {
        resolvedRecord: serverRecord,
        conflictReason: 'Server record has newer timestamp (LWW resolution).'
      };
    }
  }
}
