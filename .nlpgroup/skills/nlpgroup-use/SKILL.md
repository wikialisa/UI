---
name: nlpgroup-use
description: >-
  MANDATORY prerequisite — you MUST invoke this skill BEFORE every use_figma tool call.
  NEVER call use_figma directly without loading this skill first. Skipping it causes common hard-to-debug failures.
  Trigger whenever the user wants to perform a write action or unique read action requiring JavaScript execution
  in the Figma file context — create/edit/delete nodes, set up variables or tokens, build components and variants,
  modify auto-layout or fills, bind variables to properties, or inspect file structure programmatically.
---

# Figma Use

**MANDATORY** — load this skill before every `use_figma` tool call.

## What `use_figma` Does

`use_figma` executes a JavaScript snippet in the Figma plugin sandbox. The script has full access to the Figma Plugin API (`figma.*`) and runs in the context of the currently open file.

## Pre-flight Checklist

Before writing the script:

1. **Target node** — do you have the node ID? Get it from the URL (`?node-id=<ID>`) or by calling `figma.root.findAll()`.
2. **Font loading** — any text node edit requires `await figma.loadFontAsync(node.fontName)` before setting `characters`.
3. **Async/await** — the script runs as an async IIFE. Use `await` for font loading and any async API.
4. **Return value** — `use_figma` only returns what you explicitly pass to `figma.ui.postMessage()` or the last expression. To read data back, end with a `return` statement.

## Script Template

```js
// All use_figma scripts should follow this pattern:
(async () => {
  // 1. Find target node
  const node = figma.currentPage.findOne(n => n.name === "Button/Primary");
  if (!node) { figma.notify("Node not found"); return; }

  // 2. Load fonts if editing text
  if (node.type === "TEXT") {
    await figma.loadFontAsync(node.fontName);
    node.characters = "New label";
  }

  // 3. Make changes
  node.fills = [{ type: "SOLID", color: { r: 0.231, g: 0.510, b: 0.965 } }];

  // 4. Notify user
  figma.notify("Done!");
})();
```

## Common API Patterns

### Find nodes
```js
// By name (first match)
figma.currentPage.findOne(n => n.name === "Card")

// By type
figma.currentPage.findAll(n => n.type === "COMPONENT")

// By ID
figma.getNodeById("<NODE_ID>")
```

### Create nodes
```js
const frame = figma.createFrame();
frame.name = "My Frame";
frame.resize(375, 812);
frame.x = 0; frame.y = 0;
figma.currentPage.appendChild(frame);
```

### Auto-layout
```js
frame.layoutMode = "VERTICAL";            // or HORIZONTAL
frame.primaryAxisSizingMode = "HUG";      // or FIXED
frame.counterAxisSizingMode = "FIXED";    // or HUG
frame.itemSpacing = 16;
frame.paddingTop = 24;
frame.paddingBottom = 24;
frame.paddingLeft = 16;
frame.paddingRight = 16;
```

### Set fills
```js
// Solid color (r/g/b are 0–1)
node.fills = [{ type: "SOLID", color: { r: 0.231, g: 0.510, b: 0.965 }, opacity: 1 }];

// Remove fills
node.fills = [];
```

### Bind a variable to a fill
```js
const vars = figma.variables.getLocalVariables();
const colorVar = vars.find(v => v.name === "color/primary/500");
node.setBoundVariable("fills", colorVar);
```

### Add text
```js
const text = figma.createText();
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
text.characters = "Hello world";
text.fontSize = 16;
parent.appendChild(text);
```

## Critical Rules

- **NEVER call `use_figma` without loading this skill first.**
- **NEVER edit text without `await figma.loadFontAsync()` first** — it throws a silent error and the text is unchanged.
- **NEVER use `var`** — use `const`/`let` only.
- **NEVER assume node existence** — always null-check after `findOne`.
- Colors in Figma API are 0–1 floats (not 0–255).
- `resize()` sets width and height; do not set `width`/`height` properties directly on most node types.
- `figma.currentPage` is the active page — use `figma.root` to traverse all pages.

## Debugging

If a script fails silently:
1. Add `figma.notify(JSON.stringify(error))` in a try/catch.
2. Check if the node was found (`console.log(node)` logs to the browser console in Figma desktop).
3. Verify font was loaded before any text edit.
4. Check if you're on the correct page (`figma.currentPage.name`).
