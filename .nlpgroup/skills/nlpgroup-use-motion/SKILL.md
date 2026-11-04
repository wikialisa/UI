---
name: nlpgroup-use-motion
description: >-
  Motion and animation context for the use_figma MCP tool — animating Figma nodes via manual keyframes,
  animation styles, easing, and timeline duration. Load alongside figma-use whenever a task involves
  adding, editing, or inspecting animation on a node. Also covers working with custom animation styles.
---

# Figma Use — Motion

Load alongside `/figma-use`. This skill covers adding and editing animations on Figma nodes via the Plugin API.

## Figma Animation Model

Figma prototype animations are defined on **transitions** between frames, not on nodes directly. The animation data lives on the `Reaction` object attached to a node's `reactions` array.

```ts
interface Reaction {
  trigger: Trigger;      // what starts the animation
  action: Action;        // what happens (navigate, overlay, etc.)
  // The transition is part of the Action when action.type is "NODE"
}
```

## Setting a Prototype Transition

```js
const sourceFrame = figma.currentPage.findOne(n => n.name === "Screen A");
const targetFrame = figma.currentPage.findOne(n => n.name === "Screen B");

sourceFrame.reactions = [
  {
    trigger: { type: "ON_CLICK" },
    action: {
      type: "NODE",
      destinationId: targetFrame.id,
      navigation: "NAVIGATE",
      transition: {
        type: "SMART_ANIMATE",        // or DISSOLVE, MOVE_IN, MOVE_OUT, PUSH, SLIDE_IN, SLIDE_OUT
        duration: 0.3,                // seconds
        easing: { type: "EASE_OUT" }, // or EASE_IN, EASE_IN_AND_OUT, LINEAR, SPRING
      },
      preserveScrollPosition: false,
    },
  },
];
```

## Transition Types

| Type | Description |
|---|---|
| `DISSOLVE` | Fade between frames |
| `SMART_ANIMATE` | Morphs matching layers by name between frames |
| `MOVE_IN` | New frame slides in from a direction |
| `MOVE_OUT` | Current frame slides out |
| `PUSH` | Both frames move together (one pushes the other) |
| `SLIDE_IN` | New frame slides in, overlaid on current |
| `SLIDE_OUT` | Current frame slides out, revealing next |

## Easing Types

```js
// Simple easing
{ type: "EASE_IN" }
{ type: "EASE_OUT" }
{ type: "EASE_IN_AND_OUT" }
{ type: "LINEAR" }

// Spring physics
{ type: "SPRING", mass: 1, stiffness: 100, damping: 15 }

// Custom cubic bezier
{ type: "CUSTOM_CUBIC_BEZIER", x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 }
```

## Trigger Types

```js
{ type: "ON_CLICK" }
{ type: "ON_HOVER" }
{ type: "MOUSE_DOWN" }
{ type: "MOUSE_UP" }
{ type: "ON_DRAG" }
{ type: "AFTER_TIMEOUT", timeout: 2000 }  // milliseconds
{ type: "MOUSE_ENTER" }
{ type: "MOUSE_LEAVE" }
```

## Reading Existing Animations

```js
const node = figma.currentPage.findOne(n => n.name === "Button");
node.reactions.forEach(reaction => {
  console.log("Trigger:", reaction.trigger.type);
  if (reaction.action.type === "NODE") {
    console.log("Transition:", reaction.action.transition);
    console.log("Duration:", reaction.action.transition.duration);
  }
});
```

## Removing All Animations

```js
node.reactions = [];
```

## SMART_ANIMATE Requirements

For `SMART_ANIMATE` to work correctly between two frames:
- Layers with the **same name** in both frames will be morphed.
- Layer structure does not need to be identical — only matched names are animated.
- Unmatched layers dissolve in/out.

## Common Patterns

### Hover state transition
```js
frame.reactions = [{
  trigger: { type: "ON_HOVER" },
  action: {
    type: "NODE",
    destinationId: hoverFrame.id,
    navigation: "OVERLAY",
    transition: { type: "DISSOLVE", duration: 0.15, easing: { type: "EASE_OUT" } },
    preserveScrollPosition: false,
  },
}];
```

### Auto-advance after delay
```js
frame.reactions = [{
  trigger: { type: "AFTER_TIMEOUT", timeout: 3000 },
  action: {
    type: "NODE",
    destinationId: nextFrame.id,
    navigation: "NAVIGATE",
    transition: { type: "DISSOLVE", duration: 0.5, easing: { type: "EASE_IN_AND_OUT" } },
    preserveScrollPosition: false,
  },
}];
```
