import 'package:flutter/material.dart';

class SolarInputField extends StatelessWidget {
  final String? label;
  final String? hintText;
  final String? errorText;
  final String? helperText;
  final bool isReadonly;
  final bool isDisabled;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;

  const SolarInputField({
    Key? key,
    this.label,
    this.hintText,
    this.errorText,
    this.helperText,
    this.isReadonly = false,
    this.isDisabled = false,
    this.controller,
    this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          Text(
            label!,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: Color(0xFF374151),
            ),
          ),
          const SizedBox(height: 6),
        ],
        Container(
          height: 44,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            color: (isDisabled || isReadonly) ? const Color(0xFFF9FAFB) : Colors.white,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: errorText != null
                  ? const Color(0xFFDC2626)
                  : const Color(0xFFE5E7EB),
              width: errorText != null ? 1.5 : 1.0,
            ),
          ),
          alignment: Alignment.center,
          child: TextField(
            controller: controller,
            enabled: !isDisabled && !isReadonly,
            onChanged: onChanged,
            style: TextStyle(
              fontSize: 14,
              color: isDisabled ? const Color(0xFF9CA3AF) : const Color(0xFF111827),
            ),
            decoration: InputDecoration(
              isDense: true,
              hintText: hintText,
              hintStyle: const TextStyle(color: Color(0xFF9CA3AF), fontSize: 14),
              border: InputBorder.none,
              contentPadding: EdgeInsets.zero,
            ),
          ),
        ),
        if (errorText != null) ...[
          const SizedBox(height: 4),
          Text(
            errorText!,
            style: const TextStyle(fontSize: 12, color: Color(0xFFDC2626)),
          ),
        ] else if (helperText != null) ...[
          const SizedBox(height: 4),
          Text(
            helperText!,
            style: const TextStyle(fontSize: 12, color: Color(0xFF6B7280)),
          ),
        ],
      ],
    );
  }
}
