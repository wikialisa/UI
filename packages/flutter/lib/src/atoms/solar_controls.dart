import 'package:flutter/material.dart';

class SolarCheckbox extends StatelessWidget {
  final bool value;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final bool disabled;

  const SolarCheckbox({
    Key? key,
    required this.value,
    required this.onChanged,
    this.label,
    this.disabled = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Opacity(
      opacity: disabled ? 0.4 : 1.0,
      child: GestureDetector(
        onTap: disabled ? null : () => onChanged?.call(!value),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                color: value ? const Color(0xFF15803D) : Colors.white,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(
                  color: value ? const Color(0xFF15803D) : const Color(0xFFD1D5DB),
                  width: 2,
                ),
              ),
              child: value
                  ? const Icon(Icons.check, size: 14, color: Colors.white)
                  : null,
            ),
            if (label != null) ...[
              const SizedBox(width: 8),
              Text(
                label!,
                style: const TextStyle(fontSize: 14, color: Color(0xFF374151)),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class SolarSwitch extends StatelessWidget {
  final bool value;
  final ValueChanged<bool>? onChanged;
  final bool disabled;

  const SolarSwitch({
    Key? key,
    required this.value,
    required this.onChanged,
    this.disabled = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Opacity(
      opacity: disabled ? 0.4 : 1.0,
      child: GestureDetector(
        onTap: disabled ? null : () => onChanged?.call(!value),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: 44,
          height: 24,
          padding: const EdgeInsets.all(2),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: value ? const Color(0xFF15803D) : const Color(0xFFE5E7EB),
          ),
          alignment: value ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 20,
            height: 20,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 2,
                  offset: Offset(0, 1),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
