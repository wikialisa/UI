---
name: nlpgroup-use-slides
description: >-
  Use when working with the use_figma MCP tool in a Figma Slides file context.
  Can be used alongside figma-use which has foundational context for using the use_figma tool.
  Covers Slides-specific node types, slide layouts, presenter notes, and slide navigation.
---

# Figma Use — Slides

Load alongside `/figma-use`. This skill covers Figma Slides-specific node types and patterns.

## Figma Slides vs Design — Key Differences

| Concept | Design file | Slides file |
|---|---|---|
| Primary canvas unit | Frame | Slide |
| Canvas flow | Free-form | Linear (slide 1 → 2 → N) |
| Text layout | Free-form text nodes | Slide template slots |
| Presenter tools | None | Presenter notes, timer |
| Export | PNG/SVG/PDF | PDF, MP4 (via Figma) |

## Slides-Specific API

```js
// Get all slides (slides are top-level children of the page)
const slides = figma.currentPage.children;

// A slide is a FrameNode with specific properties
const slide = slides[0];
console.log(slide.type);  // "FRAME"
console.log(slide.name);  // "Slide 1"
```

## Creating a New Slide

```js
// Clone an existing slide (preserves layout)
const templateSlide = figma.currentPage.children[0];
const newSlide = templateSlide.clone();
newSlide.name = "Slide " + (figma.currentPage.children.length + 1);
figma.currentPage.appendChild(newSlide);
// Position slides left-to-right with gap
newSlide.x = templateSlide.x + templateSlide.width + 100;
newSlide.y = templateSlide.y;
```

## Editing Slide Content

```js
// Find the title text node inside a slide
const slide = figma.currentPage.children[0];
const titleNode = slide.findOne(n => n.name === "Title" && n.type === "TEXT");

if (titleNode) {
  await figma.loadFontAsync(titleNode.fontName);
  titleNode.characters = "New Slide Title";
}

// Find the body text node
const bodyNode = slide.findOne(n => n.name === "Body" && n.type === "TEXT");
if (bodyNode) {
  await figma.loadFontAsync(bodyNode.fontName);
  bodyNode.characters = "Bullet point content\nSecond bullet";
}
```

## Adding Presenter Notes

Presenter notes in Figma Slides are stored as a text layer named `"Presenter Notes"` or similar, typically outside the visible slide area or on a dedicated layer:

```js
const notesNode = slide.findOne(n => n.name === "Notes" || n.name === "Presenter Notes");
if (notesNode && notesNode.type === "TEXT") {
  await figma.loadFontAsync(notesNode.fontName);
  notesNode.characters = "Speaker note: emphasize the key metric here.";
}
```

## Slide Layout Templates

Standard slide layer names to target when filling content:

| Layer name | Content type |
|---|---|
| `Title` | Main heading |
| `Subtitle` | Secondary heading |
| `Body` | Bullet points / paragraph |
| `Image` | Full-bleed or inset image |
| `Notes` / `Presenter Notes` | Speaker notes |
| `Slide Number` | Auto-incrementing page number |
| `Background` | Full-slide background fill |

## Reordering Slides

```js
// Move slide at index 3 to index 1
const slide = figma.currentPage.children[3];
figma.currentPage.insertChild(1, slide);
```

## Batch-fill a Deck from Data

```js
const data = [
  { title: "Q1 Results", body: "Revenue up 12%\nNPS score: 42" },
  { title: "Q2 Outlook", body: "Target: $2.4M\nKey initiative: mobile" },
];

const templateSlide = figma.currentPage.children[0];

for (let i = 0; i < data.length; i++) {
  const slide = templateSlide.clone();
  slide.x = templateSlide.x + (i + 1) * (templateSlide.width + 100);
  figma.currentPage.appendChild(slide);

  const titleNode = slide.findOne(n => n.name === "Title" && n.type === "TEXT");
  const bodyNode = slide.findOne(n => n.name === "Body" && n.type === "TEXT");

  if (titleNode) {
    await figma.loadFontAsync(titleNode.fontName);
    titleNode.characters = data[i].title;
  }
  if (bodyNode) {
    await figma.loadFontAsync(bodyNode.fontName);
    bodyNode.characters = data[i].body;
  }
}
```

## Constraints

- Slides are standard `FrameNode` objects — all Design file frame APIs apply.
- There is no dedicated `SlideNode` type in the Plugin API.
- Slide transitions (animations between slides) are set via `reactions` — use `/figma-use-motion` for that.
- Slide size defaults: 1920×1080 (16:9) or 1280×720.
