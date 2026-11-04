---
name: nlpgroup-generate-diagram
description: >-
  MANDATORY prerequisite — load this skill BEFORE every generate_diagram tool call.
  NEVER call generate_diagram directly without loading this skill first.
  Trigger whenever the user asks to create, generate, draw, render, sketch, or build a diagram —
  flowchart, architecture diagram, sequence diagram, ERD or entity-relationship diagram,
  state diagram or state machine, gantt chart, timeline, Mermaid syntax, system architecture,
  decision tree, dependency graph, API call flow, auth handshake, schema, or pipeline in FigJam.
---

# Figma Generate Diagram

**MANDATORY** — load this skill before every `generate_diagram` call.

## Supported Diagram Types

| Type | Use `generate_diagram`? | Notes |
|---|---|---|
| Flowchart | ✅ Yes | Default choice for process flows |
| Sequence diagram | ✅ Yes | API flows, auth handshakes |
| Architecture diagram | ✅ Yes | System topology, service maps |
| ERD / entity-relationship | ✅ Yes | Database schema |
| State machine | ✅ Yes | State transitions |
| Gantt chart | ✅ Yes | Timelines, project plans |
| Mindmap | ❌ No | Use FigJam sticky notes + connectors via `use_figma` |
| Pie chart | ❌ No | Use a chart plugin or Figma chart component |
| Class diagram | ❌ No | Not supported — describe structure in text |

## Mermaid Constraints (Universal)

All diagrams are generated from Mermaid syntax. Rules:

- **No HTML tags** inside node labels — use plain text only.
- **No special characters** in node IDs: only `[a-zA-Z0-9_]`.
- **Max node label length**: 80 characters. Wrap long text with `<br/>` (Mermaid supports this in labels).
- **No duplicate node IDs** — each node in a diagram must have a unique ID.
- **Subgraphs** must have unique names; nesting more than 2 levels deep often breaks rendering.
- **Sequence diagrams**: use `participant` declarations before messages; avoid `->>+` without a matching `->>-`.

## Pre-flight

Before calling `generate_diagram`:

1. **Choose diagram type** — match to the table above. If unsure, default to flowchart.
2. **Draft Mermaid syntax** — write and validate the Mermaid source first (use `read_file` to check existing diagrams if relevant).
3. **Confirm target** — existing FigJam file (provide key) or new FigJam (use `/figma-create-new-file` first).
4. **Check for unsupported types** — mindmaps, pie charts, class diagrams → do NOT call `generate_diagram`; use the fallback approach instead.

## Tool Call Pattern

```js
// Load this skill first, then:
figma.generateDiagram({
  mermaid: `
    flowchart TD
      A[User] --> B{Auth?}
      B -- Yes --> C[Dashboard]
      B -- No --> D[Login]
  `,
  file_key: "<FIGJAM_FILE_KEY>",
})
```

## After Generation

1. Confirm the diagram rendered correctly (no broken nodes).
2. If nodes overlap: increase spacing in the Mermaid source (add more newlines / restructure).
3. Offer to apply FigJam styles (colors, connector types) via `use_figma` + `/figma-use-figjam`.

## Fallback — Unsupported Types

For mindmaps: create a central sticky note, then radiate connector lines to child stickies via `use_figma`.
For pie charts: use a Figma chart component or recommend a charting library in code.
