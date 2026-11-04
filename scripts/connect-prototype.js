/**
 * WikiAlisa — Prototype Connection Script
 * Paste vào Figma Plugin Console (Plugins > Development > Open Console)
 * Page: "🎯 06 High-Fidelity UI" (node 9:78)
 *
 * Flow:
 *   AUTH FLOW:    otp-verification → permission-setup → role-detection → data-sync → success
 *   ROLE SCREEN:  auth-success → role-detection (đã nối, dùng transition DISSOLVE)
 *   DELIVERY:     Dash/01 → Del/01 → Del/02 → ... → Del/18 → Screen-19 → Screen-20
 *   ALERTS:       auth-session-expired, offline, session-expiring (standalone overlay)
 */
(async () => {
  const page = figma.currentPage;

  // Helper: tìm frame theo tên chính xác
  const f = (name) => page.children.find(n => n.type === "FRAME" && n.name === name);

  // Helper: nối 2 frame với SMART_ANIMATE ON_CLICK
  const link = (srcName, dstName, trigger = "ON_CLICK", transType = "SMART_ANIMATE") => {
    const src = f(srcName);
    const dst = f(dstName);
    if (!src) { console.warn(`❌ Không tìm thấy SRC: "${srcName}"`); return false; }
    if (!dst) { console.warn(`❌ Không tìm thấy DST: "${dstName}"`); return false; }

    // Giữ reactions cũ, thêm mới vào
    src.reactions = [
      ...src.reactions,
      {
        trigger: { type: trigger },
        action: {
          type: "NODE",
          destinationId: dst.id,
          navigation: "NAVIGATE",
          transition: {
            type: transType,
            duration: 0.3,
            easing: { type: "EASE_OUT" },
          },
          preserveScrollPosition: false,
        },
      },
    ];
    console.log(`✅ ${srcName}  →  ${dstName}`);
    return true;
  };

  let count = 0;

  // ── 1. AUTH FLOW ──────────────────────────────────────────────────────────
  console.log("\n── AUTH FLOW ──");
  if (link("auth-otp-verification",  "auth-permission-setup")) count++;
  if (link("auth-permission-setup",  "auth-role-detection"))   count++;
  if (link("auth-role-detection",    "auth-data-sync"))        count++;
  if (link("auth-data-sync",         "auth-success"))          count++;
  // Loading states (intermediate screen before data-sync)
  if (link("auth-loading-states",    "auth-data-sync"))        count++;

  // ── 2. ROLE SELECTION → DASHBOARD ────────────────────────────────────────
  console.log("\n── ROLE → DASHBOARD ──");
  if (link("auth-success",           "auth-role-detection"))   count++;
  if (link("1. Delivery Partner",    "Dash / 01 - Delivery Partner")) count++;
  // Các role khác (Installation, QA, Service, Farmer) có thể thêm khi có dashboard tương ứng

  // ── 3. DELIVERY FLOW (Del/01 → Del/18) ───────────────────────────────────
  console.log("\n── DELIVERY FLOW ──");
  const deliveryFlow = [
    "Dash / 01 - Delivery Partner",
    "Del / 01 - Delivery List",
    "Del / 02 - Delivery Details",
    "Del / 03 - Route Navigation",
    "Del / 04 - Farmer Contact",
    "Del / 05 - OTP Verification",
    "Del / 06 - Serial Verification",
    "Del / 07 - Photo Upload",
    "Del / 08 - Farmer Signature",
    "Del / 09 - GPS Verification",
    "Del / 10 - Delivery Remarks",
    "Del / 11 - Delivery Confirmation",
    "Del / 12 - Offline Sync",
    "Del / 13 - Delivery Timeline",
    "Del / 14 - Dashboard Widgets",
    "Del / 15 - Bottom Sheets",
    "Del / 16 - Dialogs",
    "Del / 17 - Empty States",
    "Del / 18 - Error States",
    "Screen-19-Loading-States",
    "Screen-20-Accessibility",
  ];

  for (let i = 0; i < deliveryFlow.length - 1; i++) {
    if (link(deliveryFlow[i], deliveryFlow[i + 1])) count++;
  }

  // ── 4. GLOBAL ALERTS (Overlay) ────────────────────────────────────────────
  // Các màn hình alert nối từ delivery list như overlay
  console.log("\n── ALERTS / OVERLAYS ──");
  if (link("Del / 01 - Delivery List", "You Are Currently Offline", "ON_CLICK", "DISSOLVE")) count++;
  if (link("Del / 01 - Delivery List", "Session Expiring Soon",    "ON_CLICK", "DISSOLVE")) count++;
  if (link("Del / 01 - Delivery List", "Confirm Operational Logout?", "ON_CLICK", "DISSOLVE")) count++;

  // ── DONE ─────────────────────────────────────────────────────────────────
  console.log(`\n🎉 Hoàn thành: đã nối ${count} kết nối prototype trên trang "${page.name}"`);
  figma.notify(`✅ Đã nối ${count} luồng prototype!`);
})();
