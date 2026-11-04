---
name: nlpgroup-design-to-code
description: >-
  MANDATORY prerequisite — you MUST invoke this skill BEFORE calling the get_design_context Figma MCP tool.
  Trigger whenever the user wants to implement, build, port, or code up a Figma design as code.
  Example prompts: 'implement this Figma design', 'build this screen from Figma', 'turn this Figma into code',
  'design to code'. Provides critical steps for correctly implementing Figma designs in code.
---

# Figma Design-to-Code

**MANDATORY** — load this skill before every `get_design_context` call.

## Step-by-Step Workflow

### Step 1 — Identify the Target

Confirm the Figma URL or node. Extract:
- `FILE_KEY` from the URL: `https://www.figma.com/design/<FILE_KEY>/...`
- `NODE_ID` from `?node-id=<NODE_ID>` (or selected node in Dev Mode)

### Step 2 — Call `get_design_context`

```js
figma.getDesignContext({ node_id: "<NODE_ID>" })
```

This returns: node tree, styles, variables, component instances, and layout data.

### Step 3 — Analyse Before Coding

Before writing a single line of code, extract and document:

| What to extract | Where to find it |
|---|---|
| Layout type | `layoutMode`: NONE / HORIZONTAL / VERTICAL |
| Spacing | `paddingTop/Right/Bottom/Left`, `itemSpacing` |
| Corner radius | `cornerRadius` or per-corner values |
| Colors | `fills[].color` (r/g/b 0–1 → multiply ×255) |
| Typography | `style.fontFamily`, `style.fontSize`, `style.fontWeight`, `style.lineHeight` |
| Effects | `effects[]` — shadows, blurs |
| Component props | `componentProperties` |
| Bound variables | `boundVariables` — map to design tokens |

### Step 4 — Map to Code

| Figma concept | React/HTML equivalent |
|---|---|
| Frame with `layoutMode: HORIZONTAL` | `display: flex; flex-direction: row` |
| Frame with `layoutMode: VERTICAL` | `display: flex; flex-direction: column` |
| `primaryAxisSizingMode: FIXED` | `width: <value>px` |
| `counterAxisSizingMode: HUG` | height determined by content |
| `constraints.horizontal: STRETCH` | `width: 100%` |
| `itemSpacing` | `gap: <value>px` |
| `opacity` | `opacity: <value>` |

### Step 5 — Handle Component Instances

If a node is a component instance:
1. Check if a Code Connect file (`.figma.ts`) exists for it — use that snippet directly.
2. If not, look up the master component and map props manually.
3. Never hardcode instance values that should be props.

### Step 6 — Token Resolution

If `boundVariables` is present, resolve tokens before hardcoding:
```ts
// BAD:  color: "#3B82F6"
// GOOD: color: var(--color-primary-500)   // or tokens.color.primary[500]
```

Check the project's token file (commonly `tokens/`, `styles/tokens.ts`, or CSS custom properties).

### Step 7 — Write the Code

- Match pixel-perfect spacing, colors, and typography from the design context.
- Use the project's component library if available (check `src/components/` or the design system skill).
- For responsive: note which constraints are STRETCH vs FIXED and apply accordingly.
- Write one component per Figma frame/component unless the frame is purely decorative.

### Step 8 — Verify

After writing code:
1. Cross-check every spacing, color, and font value against the extracted data from Step 3.
2. Check that no design token was hardcoded when a variable binding existed.
3. Confirm component props cover all `componentProperties` from the design.

## Critical Rules

- **NEVER skip `get_design_context`** — do not estimate values from a screenshot or URL alone.
- **NEVER call `get_design_context` without loading this skill first.**
- Color channels from Figma are 0–1 floats; multiply by 255 for RGB (e.g. `r: 0.23` → `59`).
- `lineHeight` may be `{ unit: "PERCENT", value: 150 }` — convert to `1.5` (unitless) for CSS.
- Auto-layout `itemSpacing` is gap between children, NOT padding.
