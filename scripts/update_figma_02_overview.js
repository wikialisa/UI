/**
 * Figma Console Helper Script: Cập nhật "📁 02 Product Overview"
 * 
 * Cách dùng:
 * 1. Mở file Figma "nlpgroup -Smart Solar App + Admin Panel + UI Kit" trên Figma Desktop.
 * 2. Mở Console (F12 hoặc Menu -> Plugins -> Development -> Open Console).
 * 3. Copy toàn bộ code dưới đây và dán vào Console rồi nhấn Enter.
 */

(async () => {
  console.log("🚀 Bắt đầu cập nhật Page 02 Product Overview...");

  // Tìm page "📁 02 Product Overview"
  const pages = figma.root.children;
  const page02 = pages.find(p => p.name.includes("02 Product Overview") || p.id === "9:74");
  
  if (!page02) {
    console.error("❌ Không tìm thấy page '📁 02 Product Overview'!");
    return;
  }

  await figma.setCurrentPageAsync(page02);
  console.log("✅ Đã chuyển tới page:", page02.name);

  // Tìm frame tiếng Việt
  const viFrame = page02.findOne(n => n.name.includes("Tài liệu sáu giai đoạn") || n.id === "2287:10629");
  if (!viFrame) {
    console.error("❌ Không tìm thấy frame 'Tài liệu sáu giai đoạn — Tiếng Việt'!");
    return;
  }

  // Load fonts cần thiết
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  console.log("✅ Đã tải fonts. Bắt đầu đối chiếu và cập nhật các text node...");

  // Mapping text cập nhật cho Giai đoạn 01
  const updates = [
    {
      keyword: "Hệ thống Quản lý",
      newText: "Hệ thống Quản lý Pin Năng lượng Mặt trời Mái nhà\n\nBộ thiết bị chủ yếu bao gồm:\n• Tấm pin năng lượng mặt trời (cốt lõi) — lắp trên mái nhà, thu năng lượng mặt trời.\n• Bộ điều khiển/Biến tần năng lượng mặt trời (cốt lõi) — điều tiết và chuyển đổi điện năng từ tấm pin.\n• Máy bơm nước (tùy chọn) — sử dụng điện từ hệ thống pin, phục vụ tưới tiêu nông nghiệp.\n\nỨng dụng di động dựa trên vai trò giúp quản lý toàn bộ chu kỳ vận hành của hệ thống pin năng lượng mặt trời lắp trên mái nhà — từ giao hàng, lắp đặt, kiểm tra chất lượng đến dịch vụ hậu mãi và bán hàng.\n\nMỗi người dùng đăng nhập vào cùng một ứng dụng di động nhưng thấy các tính năng và nhiệm vụ khác nhau dựa trên vai trò được phân công."
    },
    {
      keyword: "Giao bộ thiết bị",
      newText: "Mục tiêu chính: Giao bộ thiết bị pin năng lượng mặt trời mái nhà được phân công cho khách hàng."
    },
    {
      keyword: "Lắp đặt hệ thống pin",
      newText: "Mục tiêu chính: Lắp đặt hệ thống pin năng lượng mặt trời mái nhà (tấm pin, bộ điều khiển/biến tần và máy bơm nước nếu có) đã được giao."
    }
  ];

  let count = 0;
  const allTexts = viFrame.findAllWithCriteria({ types: ['TEXT'] });
  for (const textNode of allTexts) {
    for (const u of updates) {
      if (textNode.characters.includes(u.keyword)) {
        try {
          // Load font hiện tại của node
          if (textNode.fontName !== figma.mixed) {
            await figma.loadFontAsync(textNode.fontName);
          }
          textNode.characters = u.newText;
          count++;
          console.log(`Updated text node [${textNode.id}]:`, textNode.name);
        } catch (e) {
          console.warn("Could not update node:", textNode.id, e);
        }
      }
    }
  }

  console.log(`🎉 Hoàn tất! Đã cập nhật ${count} khối nội dung văn bản tiếng Việt.`);
})();
