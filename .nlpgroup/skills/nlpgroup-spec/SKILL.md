---
name: nlpgroup-spec
description: >-
  Required to create, read, edit, review, or comment on Figma specs.
  Use when working on a PRD, brief, RFC or any kind of document in either a standalone Figma spec
  or a Figma spec embedded in a Figma Design or FigJam file.
---

# Figma Spec

Activated when creating, reading, editing, reviewing, or commenting on Figma specs (PRDs, briefs, RFCs, documentation).

## What is a Figma Spec?

A Figma Spec is a structured document embedded in Figma (Design or FigJam file) used for PRDs, briefs, RFCs, design rationale, and component documentation. It uses Figma's native text and section nodes — not a separate file format.

## Reading a Spec

1. Obtain the Figma file key and the spec node ID.
2. Call `get_design_context` (load `/figma-design-to-code` first) on the spec frame.
3. Extract text nodes: iterate `node.children` where `type === "TEXT"`.
4. Preserve heading hierarchy: map `fontSize` to heading level:
   - ≥ 24px → H1
   - ≥ 18px → H2
   - ≥ 14px → H3
   - Default → body

## Creating a Spec

### Structure Template

```
Spec Frame
├── Title (H1)
├── Metadata section
│   ├── Author, Date, Status (Draft/Review/Approved)
│   └── Links (Figma file, JIRA, GitHub)
├── Overview (H2) — 2–3 sentence summary
├── Problem statement (H2)
├── Goals (H2) — bulleted list
├── Non-goals (H2) — bulleted list
├── Design decisions (H2)
│   ├── Decision 1 (H3) + rationale
│   └── Decision 2 (H3) + rationale
├── Open questions (H2) — with owner and due date
└── Changelog (H2)
```

### Creating via `use_figma`

Load `/figma-use` alongside this skill, then:

```js
// Create spec frame
const spec = figma.createFrame();
spec.name = "Spec / PRD — Feature Name";
spec.layoutMode = "VERTICAL";
spec.primaryAxisSizingMode = "HUG";
spec.counterAxisSizingMode = "FIXED";
spec.resize(760, spec.height); // standard spec width
spec.itemSpacing = 24;
spec.paddingTop = 48;
spec.paddingBottom = 48;
spec.paddingLeft = 48;
spec.paddingRight = 48;

// Add title
const title = figma.createText();
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
title.characters = "Feature Name — PRD";
title.fontSize = 28;
title.fontName = { family: "Inter", style: "Bold" };
spec.appendChild(title);
```

## Editing a Spec

1. Locate the text node by name or content.
2. Load the font before editing: `await figma.loadFontAsync(node.fontName)`.
3. Update `node.characters` with the new content.
4. Preserve existing styles unless explicitly changing them.

## Reviewing a Spec

When reviewing (not editing), produce a structured review:

| Section | Review checklist |
|---|---|
| Overview | Is it ≤ 3 sentences? Does it answer "what and why"? |
| Problem statement | Is there a measurable user pain point? |
| Goals | Are goals specific and measurable (not "improve UX")? |
| Non-goals | Are the boundaries clear? |
| Design decisions | Is each decision's rationale documented? |
| Open questions | Does each question have an owner and due date? |

## Commenting on a Spec

Use the Figma REST API to add comments:

```
POST /v1/files/{file_key}/comments
{
  "message": "Comment text",
  "client_meta": { "node_id": "<NODE_ID>", "node_offset": { "x": 0, "y": 0 } }
}
```

Requires a personal access token with `comments:write` scope.

## Status Labels

Use consistent status labels in the metadata section:

| Status | Meaning |
|---|---|
| 🟡 Draft | Work in progress, not ready for review |
| 🔵 In Review | Awaiting stakeholder feedback |
| 🟢 Approved | Sign-off complete, ready to build |
| ⚫ Archived | Superseded or cancelled |
