import 'package:flutter/material.dart';

class SolarOfflineSyncBadge extends StatelessWidget {
  final bool isOnline;
  final int pendingCount;
  final bool isSyncing;
  final VoidCallback? onSyncPressed;

  const SolarOfflineSyncBadge({
    Key? key,
    required this.isOnline,
    required this.pendingCount,
    this.isSyncing = false,
    this.onSyncPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bgColor = !isOnline
        ? const Color(0xFFFEF2F2)
        : (pendingCount > 0 ? const Color(0xFFFFFBEB) : const Color(0xFFF0FDF4));
    final borderColor = !isOnline
        ? const Color(0xFFFECACA)
        : (pendingCount > 0 ? const Color(0xFFFDE68A) : const Color(0xFFBBF7D0));
    final dotColor = !isOnline
        ? const Color(0xFFEF4444)
        : (pendingCount > 0 ? const Color(0xFFF59E0B) : const Color(0xFF10B981));

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(9999),
        border: Border.all(color: borderColor),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(color: dotColor, shape: BoxShape.circle),
          ),
          const SizedBox(width: 8),
          Text(
            !isOnline
                ? 'Offline ($pendingCount pending)'
                : (isSyncing
                    ? 'Đang đồng bộ...'
                    : (pendingCount > 0
                        ? '$pendingCount bản ghi chờ đồng bộ'
                        : 'Đã đồng bộ máy chủ')),
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: Color(0xFF1E293B),
            ),
          ),
          if (isSyncing) ...[
            const SizedBox(width: 8),
            const SizedBox(
              width: 14,
              height: 14,
              child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF1B873F)),
            ),
          ] else if (isOnline && pendingCount > 0 && onSyncPressed != null) ...[
            const SizedBox(width: 8),
            GestureDetector(
              onTap: onSyncPressed,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: const Color(0xFF1B873F),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Text(
                  'Đồng bộ ngay',
                  style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
