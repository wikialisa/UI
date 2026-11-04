---
name: nlpgroup-generate-library
description: >-
  Build or update a professional-grade design system in Figma from a codebase.
  Use when the user wants to create variables/tokens, build component libraries, create individual components
  with proper variant sets and variable bindings, set up theming (light/dark modes), document foundations,
  or reconcile gaps between code and Figma. Also use when the user asks to create or generate any component
  in Figma — even a single one — since components require proper variable foundations, variant states,
  and design token bindings to be production-quality. Load alongside figma-use which teaches HOW to call the Plugin API.
---

# Figma Generate Library

Activated when building or updating a design system library in Figma. Load `/figma-use` alongside this skill.

## Build Order (Critical — Do Not Skip Steps)

```
1. Primitives (colors, radii, shadows, motion)
2. Typography (font families, sizes, weights, line heights)
3. Spacing scale
4. Variables / Tokens (bind primitives to semantic tokens)
5. Theming (light/dark mode variable sets)
6. Base components (atoms: Button, Input, Badge, Icon…)
7. Composite components (molecules: Card, Form, Modal…)
8. Page templates (organisms: Header, Sidebar, Dashboard…)
```

Never skip to components before variables are established.

## Step 1 — Create Primitive Variables

```js
// In use_figma script:
const collection = figma.variables.createVariableCollection("Primitives");
const lightMode = collection.modes[0];
lightMode.name = "Light";
const darkMode = collection.addMode("Dark");

// Color primitive
const blue500 = figma.variables.createVariable("color/blue/500", collection, "COLOR");
blue500.setValueForMode(lightMode.modeId, { r: 0.231, g: 0.510, b: 0.965, a: 1 });
blue500.setValueForMode(darkMode.modeId, { r: 0.388, g: 0.604, b: 0.980, a: 1 });
```

## Step 2 — Create Semantic Token Variables

```js
const tokens = figma.variables.createVariableCollection("Tokens");
const tokenLight = tokens.modes[0]; tokenLight.name = "Light";
const tokenDark = tokens.addMode("Dark");

const primaryBg = figma.variables.createVariable("color/primary/background", tokens, "COLOR");
// Alias to primitive:
primaryBg.setValueForMode(tokenLight.modeId, figma.variables.createVariableAlias(blue500));
```

## Step 3 — Typography Styles

Create text styles for every typography scale step:

```js
const bodyM = figma.createTextStyle();
bodyM.name = "Body/Medium";
bodyM.fontSize = 14;
bodyM.fontName = { family: "Inter", style: "Regular" };
bodyM.lineHeight = { unit: "PERCENT", value: 150 };
bodyM.letterSpacing = { unit: "PIXELS", value: 0 };
```

## Step 4 — Component Structure Rules

Every component must have:
- A **base frame** set as a component (`figma.createComponent()`)
- **Variant property** for each interactive state: `Default`, `Hover`, `Pressed`, `Disabled`
- **Boolean property** for optional sub-elements (e.g. `hasIcon: boolean`)
- **Text property** for user-editable labels
- All fills and strokes bound to **variables**, not hardcoded

## Step 5 — Variant Set Pattern

```js
const set = figma.combineAsVariants([defaultComp, hoverComp, pressedComp, disabledComp], figma.currentPage);
set.name = "Button";
// Add variant property:
set.addComponentProperty("Variant", "VARIANT", "Default");
// Values auto-populated from component names: "Variant=Default", "Variant=Hover"…
```

## Step 6 — Light/Dark Theme

1. Create two mode collections: `Primitives` (Light/Dark) and `Tokens` (Light/Dark).
2. Tokens alias primitives — switching the token mode switches the entire theme.
3. In components, bind all fills to Token variables (never Primitive variables directly).
4. Test theme switch: `figma.variables.setLocalVariableCollectionModeById(tokens.id, tokenDark.modeId)`.

## Step 7 — Documentation Frame

For each component, add a documentation frame on the "📖 Docs" page:
- Component name (Heading 1)
- Usage guidelines (Body text)
- Variants grid (all states visible)
- Do / Don't examples

## Reconciling Code ↔ Figma Gaps

| Code has, Figma missing | Action |
|---|---|
| New token in `tokens.ts` | Add variable to Figma collection |
| New component variant | Add variant to existing component set |
| Deprecated component | Move to "🗄 Archive" page, do not delete |
| Renamed token | Update variable name + all bindings |

## Anti-patterns

- Never hardcode `#3B82F6` in a component fill — always bind to a variable.
- Never create components before the variable collections exist.
- Never use separate files for light/dark — use modes in one collection.
- Never name layers "Frame 123" — use descriptive names matching code.
