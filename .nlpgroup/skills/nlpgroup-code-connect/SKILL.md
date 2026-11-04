---
name: nlpgroup-code-connect
description: >-
  Creates and maintains Figma Code Connect template files that map Figma components to code snippets.
  Use when the user mentions Code Connect, Figma component mapping, design-to-code translation,
  or asks to create/update .figma.ts or .figma.js files.
---

# Figma Code Connect

Activated when creating or maintaining Code Connect files that link Figma components to their code implementations.

## What is Code Connect?

Figma Code Connect maps a Figma component node to a real code component, so that when a designer selects a component in Figma, the correct usage snippet appears in the Dev Mode panel — with real props, not placeholders.

## File Conventions

| Extension | Use case |
|---|---|
| `.figma.ts` | TypeScript / React projects |
| `.figma.js` | JavaScript projects |
| `.figma.tsx` | React with JSX in TypeScript |

Place Code Connect files alongside the component they describe, e.g.:
```
src/components/Button/
  Button.tsx
  Button.figma.ts   ← Code Connect file
```

## Minimal Template

```ts
// Button.figma.ts
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, "https://www.figma.com/design/<FILE_KEY>?node-id=<NODE_ID>", {
  props: {
    label: figma.string("Label"),
    variant: figma.enum("Variant", {
      Primary: "primary",
      Secondary: "secondary",
      Danger: "danger",
    }),
    disabled: figma.boolean("Disabled"),
  },
  example: ({ label, variant, disabled }) => (
    <Button variant={variant} disabled={disabled}>
      {label}
    </Button>
  ),
});
```

## Prop Mapping Reference

| Figma property type | Code Connect helper |
|---|---|
| Text / String | `figma.string("Prop Name")` |
| Boolean | `figma.boolean("Prop Name")` |
| Enum / Variant | `figma.enum("Prop Name", { FigmaValue: "codeValue" })` |
| Instance swap | `figma.instance("Prop Name")` |
| Nested children | `figma.children("Layer Name")` |
| Boolean with children | `figma.boolean("Prop Name", { true: <Icon />, false: figma.children("Default") })` |

## Workflow

1. Identify the Figma component node URL (select component → right-click → Copy link to selection).
2. Extract `FILE_KEY` and `NODE_ID` from the URL:
   `https://www.figma.com/design/<FILE_KEY>/...?node-id=<NODE_ID>`
3. Inspect the component's properties in Figma Dev Mode panel (Properties tab).
4. Map each Figma property to the correct `figma.*` helper (see table above).
5. Write the `figma.connect()` call in a `.figma.ts` file next to the component.
6. Run `npx figma connect publish` to push to Figma, or `npx figma connect parse` to validate locally.

## Publishing

```bash
# Validate without publishing
npx figma connect parse

# Publish to Figma (requires FIGMA_ACCESS_TOKEN env var)
npx figma connect publish

# Unpublish a component
npx figma connect unpublish
```

Set `FIGMA_ACCESS_TOKEN` in `.env.local` — never commit it.

## Common Mistakes

- Node ID in URL uses `-` (hyphen) but the API uses `:` (colon) — `figma.connect` accepts both.
- Enum keys must match Figma variant names exactly (case-sensitive).
- `figma.children()` only works for layers that are direct children of the component frame.
- One `figma.connect()` call per variant set if variants need different code examples.
