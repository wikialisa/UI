---
name: nlpgroup-create-new-file
description: >-
  Always use this skill when the user wants to create a new Figma Design, FigJam, or Slides file.
  You MUST invoke this skill BEFORE every create_new_file tool call.
---

# Figma — Create New File

This skill MUST be loaded before calling `create_new_file` via the Figma MCP tool.

## Pre-flight Checklist

Before calling `create_new_file`, confirm all of the following:

1. **File type** — which type does the user want?
   - `design` — standard Figma design file
   - `figjam` — FigJam whiteboard
   - `slides` — Figma Slides presentation

2. **File name** — get an explicit name from the user, or derive a sensible one from context.

3. **Team / project destination** — where should the file live?
   - Personal drafts (default if not specified)
   - A named team and project (requires team_id and project_id)

4. **Initial content** — does the user want:
   - A blank file
   - A specific page setup (e.g. "Cover, Components, Screens")
   - A template applied after creation

If any of these are unclear, ask before calling the tool.

## Tool Call Pattern

```js
// Load this skill first, then:
figma.createFile({
  name: "<file name>",
  type: "design" | "figjam" | "slides",
  // team_id and project_id only if placing in a team project
})
```

## After Creation

1. Confirm the file URL/key with the user.
2. If the user wants pages: use `use_figma` (load `/figma-use` first) to rename Page 1 and add additional pages.
3. If the user wants a library set up: offer to load `/figma-generate-library`.
4. If the user wants to push a design: offer to load `/figma-generate-design`.

## Common Mistakes

- Do NOT call `create_new_file` without loading this skill first — the call may succeed but the follow-up steps will be wrong.
- Do NOT assume "component" means a new file — it usually means adding to an existing file.
- FigJam and Slides files have different node types than Design files; subsequent edits must use the correct skill (`/figma-use-figjam` or `/figma-use-slides`).
