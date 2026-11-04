---
name: nlpgroup-generate-design
description: >-
  Use this skill alongside figma-use when translating an application page, view, or multi-section layout into Figma.
  Triggers: 'write to Figma', 'create in Figma from code', 'push page to Figma', 'take this app/page and build it in Figma',
  'create a screen', 'build a landing page in Figma', 'update the Figma screen to match code',
  'convert this modal/dialog/drawer/panel to Figma'. Preferred workflow whenever the user wants to build or update
  a full page, modal, dialog, drawer, sidebar, panel, form, dashboard, list, table, card, header, or composed product UI
  in Figma from code or a description. Discovers design system components, variables, and styles, then assembles
  views section-by-section using design tokens instead of hardcoded values.
---

# Figma Generate Design

Activated when pushing code or a description into Figma as a composed layout. Always load `/figma-use` alongside this skill.

## Pre-flight

Before starting, confirm:
1. **Source** — code file(s), a description, or a screenshot?
2. **Target** — existing Figma file (provide key) or new file (use `/figma-create-new-file` first)?
3. **Fidelity** — wireframe, mid-fi, or pixel-perfect?

## Step 1 — Discover Design System Resources

Search the project for Code Connect files and token files:

```bash
# Find Code Connect files
find . -name "*.figma.ts" -o -name "*.figma.js"

# Find token files
find . -path "*/tokens*" -name "*.json" -o -name "tokens.ts"
```

Also run `figma.searchComponents("<component name>")` via `use_figma` to find library components before creating from scratch.

## Step 2 — Decompose the Layout

Break the UI into sections (top → bottom, or logical groupings):

```
Page
├── Header / NavBar
├── Hero / Banner
├── Section A
│   ├── Card grid
│   └── Pagination
├── Section B
└── Footer
```

Build section-by-section — do not attempt the full page in one `use_figma` call.

## Step 3 — Map Code → Figma Nodes

| Code concept | Figma equivalent |
|---|---|
| `<div>` with flex-row | Frame, `layoutMode: HORIZONTAL` |
| `<div>` with flex-col | Frame, `layoutMode: VERTICAL` |
| `gap: 16px` | `itemSpacing: 16` |
| `padding: 24px` | `paddingTop/Right/Bottom/Left: 24` |
| `border-radius: 8px` | `cornerRadius: 8` |
| `background-color: var(--color-x)` | Resolve token → Figma variable binding |
| `font-size: 16px; font-weight: 600` | Text style or manual `fontSize: 16, fontWeight: 600` |
| `<Button variant="primary">` | Component instance from library |

## Step 4 — Resolve Tokens to Figma Variables

Never hardcode colors, spacing, or typography. Map tokens to Figma variables:

```js
// In use_figma script:
const colorVar = figma.variables.getLocalVariables()
  .find(v => v.name === "color/primary/500");
// Then bind: node.setBoundVariable("fills", colorVar)
```

## Step 5 — Build Section by Section

For each section:
1. Create a top-level frame (the section container).
2. Set auto-layout: direction, gap, padding.
3. Add child nodes: text, images, component instances.
4. Bind variables to fills, strokes, and text styles.
5. Name layers clearly: `Section/Hero`, `Card/Product`, `Button/Primary`.

## Step 6 — Assemble the Page

After all sections are built:
1. Create a page-level frame (`width: 1440` for desktop, `375` for mobile).
2. Stack sections vertically with the page's background color.
3. Apply constraints: horizontal STRETCH for full-width sections.

## Step 7 — Verify

- Every color/spacing must use a Figma variable, not a hardcoded value.
- Layer names must match the component hierarchy in code.
- Run `figma.viewport.scrollAndZoomIntoView([pageFrame])` to check the result.

## Anti-patterns

- Do NOT create one massive frame with absolute positioning — use auto-layout.
- Do NOT hardcode `#3B82F6` — resolve to a variable.
- Do NOT skip section decomposition and try to build the whole page at once.
