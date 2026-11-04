---
name: nlpgroup-use-figjam
description: >-
  Use when working with the use_figma MCP tool in a FigJam file context.
  Load alongside figma-use which has foundational context for using the use_figma tool.
  Covers FigJam-specific node types, sticky notes, connectors, sections, shapes, and stamps.
---

# Figma Use — FigJam

Load alongside `/figma-use` (which covers the foundational API). This skill adds FigJam-specific node types and patterns.

## FigJam vs Design — Key Differences

| Concept | Design file | FigJam file |
|---|---|---|
| Primary canvas unit | Frame | Section |
| Free-form text | Text node | Sticky note |
| Connections | Smart animate / prototype links | Connector node |
| Drawing | Vector shapes | Stamps, highlights |
| Layout | Auto-layout frames | Free placement |
| Components | Full component support | Stickers only |

## FigJam Node Types

```js
// Sticky note
const sticky = figma.createSticky();
sticky.text.characters = "My idea";
sticky.fills = [{ type: "SOLID", color: { r: 1, g: 0.95, b: 0.4 } }]; // yellow

// Connector between two nodes
const connector = figma.createConnector();
connector.connectorStart = { endpointNodeId: nodeA.id, magnet: "AUTO" };
connector.connectorEnd = { endpointNodeId: nodeB.id, magnet: "AUTO" };

// Section (grouping in FigJam)
const section = figma.createSection();
section.name = "Phase 1";
section.resizeWithoutConstraints(600, 400);

// Shape with text (rounded rectangle, etc.)
const shape = figma.createShapeWithText();
shape.shapeType = "ROUNDED_RECTANGLE";
shape.text.characters = "Process step";
```

## Sticky Note Colors (Common Figma defaults)

| Color name | RGB (0–1) |
|---|---|
| Yellow | `{ r:1, g:0.95, b:0.4 }` |
| Pink | `{ r:1, g:0.6, b:0.7 }` |
| Green | `{ r:0.6, g:0.95, b:0.6 }` |
| Blue | `{ r:0.6, g:0.8, b:1 }` |
| Purple | `{ r:0.8, g:0.6, b:1 }` |
| White | `{ r:1, g:1, b:1 }` |

## Building a FigJam Board

### Affinity map pattern
```js
// 1. Create sections for each category
const categories = ["Insights", "Pain Points", "Opportunities"];
categories.forEach((name, i) => {
  const sec = figma.createSection();
  sec.name = name;
  sec.x = i * 650;
  sec.y = 0;
  sec.resizeWithoutConstraints(600, 800);
});

// 2. Add stickies inside each section
const sticky = figma.createSticky();
sticky.text.characters = "User can't find the button";
sticky.x = 20; sticky.y = 60;
sections[1].appendChild(sticky); // Pain Points
```

### Flowchart pattern
```js
// Create nodes
const steps = ["Start", "User logs in", "Dashboard loads", "End"];
const nodes = steps.map((label, i) => {
  const shape = figma.createShapeWithText();
  shape.shapeType = i === 0 || i === steps.length - 1 ? "ELLIPSE" : "ROUNDED_RECTANGLE";
  shape.text.characters = label;
  shape.x = i * 200; shape.y = 100;
  return shape;
});

// Connect sequentially
for (let i = 0; i < nodes.length - 1; i++) {
  const conn = figma.createConnector();
  conn.connectorStart = { endpointNodeId: nodes[i].id, magnet: "RIGHT" };
  conn.connectorEnd = { endpointNodeId: nodes[i + 1].id, magnet: "LEFT" };
}
```

## FigJam Constraints

- FigJam does NOT support auto-layout — all positioning is absolute (x, y).
- FigJam does NOT support component instances from Design libraries.
- Connectors need both endpoints set before they render correctly.
- `figma.currentPage` in a FigJam file returns a `PageNode` — same API as Design.
- Sections in FigJam use `createSection()`, not `createFrame()`.
