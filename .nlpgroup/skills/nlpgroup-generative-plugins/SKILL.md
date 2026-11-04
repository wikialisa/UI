---
name: nlpgroup-generative-plugins
description: >-
  MANDATORY prerequisite — load this skill before calling create_generative_plugin or update_generative_plugin.
  Use when the user asks to create, author, change, fix, or extend a reusable generative Figma plugin.
---

# Figma Generative Plugins

**MANDATORY** — load this skill before every `create_generative_plugin` or `update_generative_plugin` call.

## What is a Generative Plugin?

A generative Figma plugin is a reusable piece of JavaScript that runs inside Figma's plugin sandbox. Unlike one-shot `use_figma` scripts, a plugin persists and can be triggered repeatedly by users via the Plugins menu.

## Pre-flight Checklist

Before calling `create_generative_plugin` or `update_generative_plugin`:

1. **Name** — concise, unique, title-cased (e.g. `Token Audit`, `Bulk Rename`)
2. **Trigger type** — how does it run?
   - `"command"` — runs immediately, no UI
   - `"ui"` — shows a panel (HTML + JS bridge)
3. **Scope** — what nodes does it target?
   - Current selection (`figma.currentPage.selection`)
   - Entire document (`figma.root`)
   - Current page (`figma.currentPage`)
4. **Output** — what does it produce? (new nodes, modified properties, exported data)

## Plugin Code Architecture

### Command Plugin (no UI)

```js
// Runs immediately, no window
figma.showUI(__html__, { visible: false }); // or skip if no async work

// Main logic
const selection = figma.currentPage.selection;
selection.forEach(node => {
  // do work
});

figma.closePlugin("Done!");
```

### UI Plugin (panel)

```js
// plugin.js (main thread)
figma.showUI(__html__, { width: 300, height: 400 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "run") {
    // do work with figma API
    figma.ui.postMessage({ type: "done" });
  }
};

// ui.html (sandboxed iframe)
// Use postMessage to communicate with main thread
```

## Constraints (Plugin Sandbox Rules)

- **No `fetch()`** in the main thread — use the UI thread for network requests, then pass data via `postMessage`.
- **No `require()`** — the sandbox has no module system; inline all dependencies or use a bundler (esbuild/rollup) before passing to `create_generative_plugin`.
- **No `localStorage` / `sessionStorage`** — use `figma.clientStorage` for persistence.
- **No DOM access** in the main thread — only in `ui.html`.
- Plugin runs synchronously in the main thread — avoid blocking loops on large documents; use `figma.notify()` for progress.

## Tool Call Pattern

```js
// Load this skill first, then:
figma.createGenerativePlugin({
  name: "My Plugin",
  code: `<plugin JS source>`,
  ui: `<optional HTML for UI panel>`,
})
```

## Update Pattern

```js
figma.updateGenerativePlugin({
  plugin_id: "<existing plugin ID>",
  code: `<updated JS source>`,
})
```

## Common Plugin Templates

### Bulk rename layers by pattern
```js
figma.currentPage.selection.forEach(node => {
  node.name = node.name.replace(/Frame \d+/, "Section");
});
figma.closePlugin("Renamed!");
```

### Export selection as JSON spec
```js
const spec = figma.currentPage.selection.map(node => ({
  id: node.id,
  name: node.name,
  type: node.type,
  width: "width" in node ? node.width : null,
  height: "height" in node ? node.height : null,
}));
figma.ui.postMessage({ type: "export", data: JSON.stringify(spec, null, 2) });
```

## After Creation

1. Confirm the plugin ID returned by the tool.
2. Test by triggering the plugin via Plugins menu in Figma.
3. If updating, always re-run tests on the same file used for initial testing.
