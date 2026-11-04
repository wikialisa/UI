---
name: nlpgroup-code-workflows
description: >-
  Import or upload local HTML or project files into Figma, choose editable Design frames,
  runnable Code Layers or standalone Code (also known as Make), and repair imported previews.
  Use only when the user explicitly names editable Design layers, a runnable Code Layer,
  or a standalone Code/Make file, or supplies a Figma file key/link as the import destination.
  Generic code or code-component requests need output clarification before using this workflow.
---

# Figma Code Workflows

Activated when importing files into Figma or working with Code Layers / standalone Code (Make) files.

## Output Types — Choose Before Starting

Before any import, clarify which output type the user wants:

| Type | Description | When to use |
|---|---|---|
| **Design frame** (editable) | A Figma frame with editable layers — shapes, text, auto-layout | Static UI mockups, design handoff |
| **Code Layer** (runnable) | A frame that runs live code (HTML/CSS/JS) inside Figma | Interactive prototypes, live data |
| **Standalone Code / Make** | A `.make` or Code file that runs outside of a Design frame | Generative art, standalone widgets |

If the user says "import my HTML" without specifying, ask which type before proceeding.

## Workflow A — Import HTML / File as Design Frame

1. Open the target Figma file (or create a new one with `/figma-create-new-file`).
2. Use `Plugins → Import` or the REST API `POST /v1/files/{file_key}/images` to upload assets.
3. For HTML → Design conversion, use the **HTML to Figma** community plugin or the MCP `use_figma` tool to create frames programmatically.
4. After import, verify layer names match the component hierarchy.
5. Fix any missing previews: select the frame → right-click → Update thumbnail.

## Workflow B — Create a Runnable Code Layer

1. In the target Figma file, add a frame at the desired size.
2. Select the frame → right-click → **Add Code Layer**.
3. Paste the HTML/CSS/JS into the Code Layer panel.
4. Click **Run** to preview inside Figma.
5. To update: edit the code in the panel and click Run again.

## Workflow C — Standalone Code (Make) File

1. In Figma, go to **File → New → Code** (or **Make**).
2. Paste or type the code — this file is not tied to a design frame.
3. Run with the ▶ button. Output renders in the preview pane.
4. Share via the normal Figma share link.

## Repairing Imported Previews

If a preview is broken after import:
- Select the affected frame.
- Press `Ctrl/Cmd + Shift + E` to force re-render.
- If still broken, duplicate the frame and delete the original.
- For Code Layers: click **Reload** in the Code Layer panel.

## Key Constraints

- Code Layers support HTML, CSS, and vanilla JS only — no bundlers, no npm imports.
- External network requests from Code Layers may be blocked by Figma's CSP.
- Standalone Code files do not share variables with Design files.
- Always confirm the Figma file key/link before starting — work cannot be undone without version history.
