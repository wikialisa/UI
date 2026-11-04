---
name: nlpgroup-swiftui
description: >-
  SwiftUI and Figma translation in both directions. Use whenever the user mentions Swift, SwiftUI,
  iOS, iPhone, or iPad — translating a Figma design into SwiftUI (design to code), or pushing
  SwiftUI views or screens or tokens back into a Figma file (code to design). Triggers on:
  'implement this Figma design in SwiftUI', 'build this screen in Swift', 'push this SwiftUI view to Figma',
  'mirror my Swift code in a Figma file', or whenever a Figma URL appears alongside .swift files or an .xcodeproj.
  Load alongside figma-use for the code to design path.
---

# Figma ↔ SwiftUI

Activated for any translation between Figma and SwiftUI in either direction.

## Direction A — Figma → SwiftUI (Design to Code)

### Step 1 — Load `/figma-design-to-code` first

Always load the `figma-design-to-code` skill and call `get_design_context` before writing any Swift.

### Step 2 — Map Figma Layout to SwiftUI

| Figma | SwiftUI |
|---|---|
| Frame, `layoutMode: VERTICAL` | `VStack(spacing: itemSpacing)` |
| Frame, `layoutMode: HORIZONTAL` | `HStack(spacing: itemSpacing)` |
| Frame, `layoutMode: NONE` | `ZStack` or `GeometryReader` |
| `paddingTop/Right/Bottom/Left` | `.padding(.top, x).padding(.trailing, y)…` or `.padding(EdgeInsets(...))` |
| `cornerRadius` | `.cornerRadius(x)` or `.clipShape(RoundedRectangle(cornerRadius: x))` |
| `constraints: STRETCH` | `.frame(maxWidth: .infinity)` |
| `opacity` | `.opacity(x)` |
| Shadow effect | `.shadow(color:, radius:, x:, y:)` |

### Step 3 — Color Mapping

Figma colors are 0–1 floats → multiply ×255 for UIColor, or convert directly to SwiftUI Color:
```swift
// Figma: r: 0.231, g: 0.510, b: 0.965, a: 1.0
Color(red: 0.231, green: 0.510, blue: 0.965)

// Or as hex extension:
extension Color {
    init(hex: UInt, alpha: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xff) / 255,
            green: Double((hex >> 8) & 0xff) / 255,
            blue: Double(hex & 0xff) / 255,
            opacity: alpha
        )
    }
}
```

### Step 4 — Typography

| Figma | SwiftUI |
|---|---|
| `fontSize: 28, fontWeight: Bold` | `.font(.system(size: 28, weight: .bold))` |
| Named text style | Map to `Font` extension or custom `TextStyle` |
| `lineHeight: 150%` | `.lineSpacing(fontSize * 0.5)` (approx) |

### Step 5 — Component Instances

Check for Code Connect files (`.figma.ts`) — the snippet shows the correct SwiftUI usage. If unavailable, map component props to SwiftUI view parameters.

---

## Direction B — SwiftUI → Figma (Code to Design)

Load `/figma-use` alongside this skill for this direction.

### Step 1 — Parse the SwiftUI View

Identify:
- Layout containers: `VStack`, `HStack`, `ZStack`, `LazyVGrid`
- Modifiers: `.padding`, `.frame`, `.background`, `.foregroundColor`, `.cornerRadius`
- Text: `.font`, `.fontWeight`, `.lineSpacing`

### Step 2 — Map SwiftUI → Figma Nodes

| SwiftUI | Figma |
|---|---|
| `VStack(spacing: 16)` | Frame, `layoutMode: VERTICAL`, `itemSpacing: 16` |
| `HStack(spacing: 8)` | Frame, `layoutMode: HORIZONTAL`, `itemSpacing: 8` |
| `.padding(16)` | `paddingTop/Right/Bottom/Left: 16` |
| `.frame(maxWidth: .infinity)` | `constraints.horizontal: STRETCH` |
| `Color.blue` | Resolve to design token; bind as fill variable |
| `Text("Hello")` | Text node, `characters: "Hello"` |
| `Image(systemName: "star")` | Icon component or SVG node |

### Step 3 — Resolve Tokens

Map SwiftUI `Color` and `Font` references to Figma variables:
- `Color("primary-500")` → Figma variable `color/primary/500`
- `Font.custom("Inter", size: 16)` → Figma text style `Body/Medium`

### Step 4 — Build in Figma

Use the build order from `/figma-generate-library` if creating new components. For existing screens, build section-by-section following `/figma-generate-design`.

## iOS-Specific Notes

- Safe area insets: add padding equivalent to `safeAreaInsets` at top/bottom of page frame.
- Dynamic Type: use named text styles in Figma that match iOS Dynamic Type scale.
- Dark Mode: always create Light/Dark variable modes in Figma to match iOS appearance modes.
- `@Environment(\.colorScheme)` → Figma variable mode switch.
