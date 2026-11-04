---
name: nlpgroup-implement-motion
description: >-
  Translates Figma motion and animations into production-ready application code.
  Use when implementing animation or motion from a Figma design — user mentions 'implement this motion',
  'add animation from Figma', 'animate this component', provides a Figma URL whose node is animated,
  or when get_design_context returns motion data or instructs you to call get_motion_context.
---

# Figma Implement Motion

Activated when translating Figma motion/animation data into code.

## When to Call `get_motion_context`

Call `get_motion_context` (instead of or after `get_design_context`) when:
- The node has a prototype interaction (hover, click, drag)
- `get_design_context` returns a `motion` or `interactions` field
- The user explicitly asks for animation implementation

## Motion Data Model

```ts
interface FigmaMotion {
  trigger: "ON_HOVER" | "ON_CLICK" | "MOUSE_DOWN" | "AFTER_TIMEOUT" | "ON_DRAG";
  action: "NAVIGATE" | "OVERLAY" | "SCROLL_TO" | "BACK";
  transition: {
    type: "DISSOLVE" | "SMART_ANIMATE" | "MOVE_IN" | "MOVE_OUT" | "PUSH" | "SLIDE_IN" | "SLIDE_OUT";
    duration: number;      // seconds
    easing: "EASE_IN" | "EASE_OUT" | "EASE_IN_AND_OUT" | "LINEAR" | "EASE_IN_BACK" | "EASE_OUT_BACK" | "EASE_IN_AND_OUT_BACK" | "CUSTOM_CUBIC_BEZIER";
    easingFunctionCubicBezier?: { x1: number; y1: number; x2: number; y2: number };
  };
}
```

## Easing Mapping

| Figma easing | CSS / JS equivalent |
|---|---|
| `EASE_IN` | `cubic-bezier(0.42, 0, 1, 1)` |
| `EASE_OUT` | `cubic-bezier(0, 0, 0.58, 1)` |
| `EASE_IN_AND_OUT` | `cubic-bezier(0.42, 0, 0.58, 1)` |
| `LINEAR` | `linear` |
| `EASE_IN_BACK` | `cubic-bezier(0.36, 0, 0.66, -0.56)` |
| `EASE_OUT_BACK` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `EASE_IN_AND_OUT_BACK` | `cubic-bezier(0.68, -0.6, 0.32, 1.6)` |
| `CUSTOM_CUBIC_BEZIER` | Use `x1, y1, x2, y2` directly |

## Transition Type → Code Pattern

### DISSOLVE (fade)
```css
transition: opacity var(--duration) var(--easing);
```
```ts
// Framer Motion
<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} />
```

### SMART_ANIMATE (layout transition)
```ts
// Framer Motion with layout
<motion.div layout transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }} />
```

### MOVE_IN / MOVE_OUT / PUSH / SLIDE_IN / SLIDE_OUT
```ts
// Example: SLIDE_IN from right
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ duration: 0.35, ease: "easeOut" }}
/>
```

### AFTER_TIMEOUT trigger
```ts
useEffect(() => {
  const t = setTimeout(() => setVisible(true), delayMs);
  return () => clearTimeout(t);
}, []);
```

## React Native (Animated API)

```ts
const opacity = useRef(new Animated.Value(0)).current;

Animated.timing(opacity, {
  toValue: 1,
  duration: 300,          // from Figma: transition.duration * 1000
  easing: Easing.out(Easing.ease),
  useNativeDriver: true,
}).start();
```

## Flutter

```dart
AnimationController controller = AnimationController(
  duration: Duration(milliseconds: 300),  // from Figma
  vsync: this,
);
final anim = CurvedAnimation(
  parent: controller,
  curve: Curves.easeOut,  // mapped from Figma easing
);
FadeTransition(opacity: anim, child: child);
```

## Implementation Checklist

- [ ] Extract `duration` (convert seconds → ms for JS/Flutter)
- [ ] Map easing to CSS cubic-bezier or framework-specific enum
- [ ] Map transition type to enter/exit animation pattern
- [ ] Handle `trigger` — hover, click, or timeout
- [ ] Use `useNativeDriver: true` in React Native for performance
- [ ] Respect `prefers-reduced-motion` in web implementations

## `prefers-reduced-motion` Rule (Web)

Always wrap animations:
```css
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```
