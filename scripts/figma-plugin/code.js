// WikiAlisa — Connect Prototype Plugin
// Chạy một lần để nối tất cả frames trên page "🎯 06 High-Fidelity UI"

(async () => {
  const page = figma.currentPage;

  const f = (name) => page.children.find(n => n.type === "FRAME" && n.name === name);

  const link = (srcName, dstName, transType = "SMART_ANIMATE") => {
    const src = f(srcName);
    const dst = f(dstName);
    if (!src) { console.warn(`MISS SRC: "${srcName}"`); return false; }
    if (!dst) { console.warn(`MISS DST: "${dstName}"`); return false; }
    src.reactions = [
      ...src.reactions,
      {
        trigger: { type: "ON_CLICK" },
        action: {
          type: "NODE",
          destinationId: dst.id,
          navigation: "NAVIGATE",
          transition: { type: transType, duration: 0.3, easing: { type: "EASE_OUT" } },
          preserveScrollPosition: false,
        },
      },
    ];
    return true;
  };

  let count = 0;

  // AUTH FLOW
  if (link("auth-otp-verification", "auth-permission-setup")) count++;
  if (link("auth-permission-setup", "auth-role-detection"))   count++;
  if (link("auth-role-detection",   "auth-data-sync"))        count++;
  if (link("auth-data-sync",        "auth-success"))          count++;
  if (link("auth-loading-states",   "auth-data-sync"))        count++;
  if (link("auth-success",          "auth-role-detection"))   count++;

  // ROLE → DASHBOARD
  if (link("1. Delivery Partner", "Dash / 01 - Delivery Partner")) count++;

  // DELIVERY FLOW
  const flow = [
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
  for (let i = 0; i < flow.length - 1; i++) {
    if (link(flow[i], flow[i + 1])) count++;
  }

  // ALERTS (DISSOLVE overlay)
  if (link("Del / 01 - Delivery List", "You Are Currently Offline",    "DISSOLVE")) count++;
  if (link("Del / 01 - Delivery List", "Session Expiring Soon",        "DISSOLVE")) count++;
  if (link("Del / 01 - Delivery List", "Confirm Operational Logout?",  "DISSOLVE")) count++;

  figma.notify(`✅ Đã nối ${count} prototype connections!`);
  figma.closePlugin();
})();
