import 'package:flutter/material.dart';
import '../../../../tokens/tokens.dart';

enum PumpDomainStatus {
  draft,
  dispatched,
  delivered,
  installing,
  testingPump,
  qaPending,
  qaApproved,
  qaRejected,
  activePumping,
  solarInsufficient,
  faultOverheat,
  dryRunProtection,
  maintenanceDue,
  offlineSyncPending,
}

class SolarStatusChip extends StatelessWidget {
  final PumpDomainStatus status;

  const SolarStatusChip({
    Key? key,
    required this.status,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final config = _getStatusConfig(status);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: config.backgroundColor,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: config.borderColor),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (config.hasPulse) ...[
            Container(
              width: 6,
              height: 6,
              decoration: BoxDecoration(
                color: config.textColor,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 4),
          ],
          Text(
            config.label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: config.textColor,
            ),
          ),
        ],
      ),
    );
  }

  _StatusConfig _getStatusConfig(PumpDomainStatus status) {
    switch (status) {
      case PumpDomainStatus.activePumping:
        return _StatusConfig(
          label: 'ĐANG BƠM NƯỚC',
          backgroundColor: const Color(0xFFECFDF5),
          textColor: const Color(0xFF047857),
          borderColor: const Color(0xFF6EE7B7),
          hasPulse: true,
        );
      case PumpDomainStatus.qaApproved:
        return _StatusConfig(
          label: 'QA ĐẠT CHUẨN',
          backgroundColor: const Color(0xFFDCFCE7),
          textColor: const Color(0xFF15803D),
          borderColor: const Color(0xFF86EFAC),
        );
      case PumpDomainStatus.dryRunProtection:
        return _StatusConfig(
          label: 'GIẾNG CẠN NƯỚC',
          backgroundColor: const Color(0xFFFFE4E6),
          textColor: const Color(0xFFBE123C),
          borderColor: const Color(0xFFFDA4AF),
        );
      case PumpDomainStatus.faultOverheat:
        return _StatusConfig(
          label: 'QUÁ NHIỆT',
          backgroundColor: const Color(0xFFFEE2E2),
          textColor: const Color(0xFFDC2626),
          borderColor: const Color(0xFFF87171),
        );
      case PumpDomainStatus.solarInsufficient:
        return _StatusConfig(
          label: 'NẮNG YẾU',
          backgroundColor: const Color(0xFFFEF3C7),
          textColor: const Color(0xFFB45309),
          borderColor: const Color(0xFFFCD34D),
        );
      default:
        return _StatusConfig(
          label: 'ĐĂNG KÝ MỚI',
          backgroundColor: SolarPumpColors.neutral100,
          textColor: SolarPumpColors.neutral600,
          borderColor: SolarPumpColors.neutral200,
        );
    }
  }
}

class _StatusConfig {
  final String label;
  final Color backgroundColor;
  final Color textColor;
  final Color borderColor;
  final bool hasPulse;

  _StatusConfig({
    required this.label,
    required this.backgroundColor,
    required this.textColor,
    required this.borderColor,
    this.hasPulse = false,
  });
}
