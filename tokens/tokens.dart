/**
 * Agriculture Solar Pump Design System
 * Flutter (Dart) Design Tokens
 */

import 'package:flutter/material.dart';

class SolarPumpColors {
  // Brand Solar
  static const Color solar50 = Color(0xFFFFF9E6);
  static const Color solar500 = Color(0xFFE59800);
  static const Color solar600 = Color(0xFFC68200);

  // Brand Agriculture
  static const Color agri50 = Color(0xFFEBF7EE);
  static const Color agri500 = Color(0xFF1B873F);
  static const Color agri600 = Color(0xFF146830);

  // Brand Sky / Water
  static const Color sky50 = Color(0xFFF0F9FF);
  static const Color sky500 = Color(0xFF0284C7);

  // Neutrals
  static const Color neutral50 = Color(0xFFF8FAFC);
  static const Color neutral100 = Color(0xFFF1F5F9);
  static const Color neutral200 = Color(0xFFE2E8F0);
  static const Color neutral400 = Color(0xFF94A3B8);
  static const Color neutral600 = Color(0xFF475569);
  static const Color neutral900 = Color(0xFF0F172A);

  // Semantics
  static const Color success = Color(0xFF16A34A);
  static const Color warning = Color(0xFFD97706);
  static const Color danger = Color(0xFFDC2626);
  static const Color info = Color(0xFF2563EB);

  // Surfaces
  static const Color surfacePage = Color(0xFFF8FAFC);
  static const Color surfaceCard = Colors.white;
  static const Color surfaceOffline = Color(0xFFFEF2F2);
}

class SolarPumpSpacing {
  static const double space4 = 4.0;
  static const double space8 = 8.0;
  static const double space12 = 12.0;
  static const double space16 = 16.0;
  static const double space20 = 20.0;
  static const double space24 = 24.0;
  static const double space32 = 32.0;
  static const double space48 = 48.0;
  static const double space64 = 64.0;
}

class SolarPumpRadius {
  static const BorderRadius xs = BorderRadius.all(Radius.circular(4.0));
  static const BorderRadius sm = BorderRadius.all(Radius.circular(8.0));
  static const BorderRadius md = BorderRadius.all(Radius.circular(12.0));
  static const BorderRadius lg = BorderRadius.all(Radius.circular(16.0));
  static const BorderRadius pill = BorderRadius.all(Radius.circular(999.0));
}

class SolarPumpTypography {
  static const String fontFamily = 'Inter';

  static const TextStyle displayXL = TextStyle(
    fontFamily: fontFamily,
    fontSize: 48,
    height: 56 / 48,
    fontWeight: FontWeight.w700,
  );

  static const TextStyle heading1 = TextStyle(
    fontFamily: fontFamily,
    fontSize: 32,
    height: 38 / 32,
    fontWeight: FontWeight.w600,
  );

  static const TextStyle bodyL = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 24 / 16,
    fontWeight: FontWeight.w400,
  );

  static const TextStyle bodyM = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 20 / 14,
    fontWeight: FontWeight.w400,
  );

  static const TextStyle button = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 24 / 16,
    fontWeight: FontWeight.w600,
  );
}
