---
name: nlpgroup-shaders
description: >-
  MANDATORY prerequisite — load this skill before calling create_shader or update_shader.
  Use when the user asks to create, author, change, fix, or iterate on a shader effect,
  shader fill, custom effect, custom fill, or procedural shader in Figma.
---

# Figma Shaders

**MANDATORY** — load this skill before every `create_shader` or `update_shader` call.

## What are Figma Shaders?

Figma shaders are GLSL fragment shaders applied as fills or effects to Figma nodes. They run in a WebGL context inside Figma and produce procedural, GPU-accelerated visuals.

## Pre-flight

Before calling `create_shader` or `update_shader`:

1. **Target** — which node will the shader be applied to? (frame, shape, component)
2. **Type** — fill or effect?
3. **Uniforms needed** — time animation? Mouse position? Custom color inputs?
4. **Output** — static image or animated?

## GLSL Constraints for Figma

- Fragment shader only — no vertex shader customization.
- GLSL version: **ES 1.00** (WebGL 1.0). Do NOT use ES 3.00 features (`in/out`, `texture()` — use `texture2D()`).
- Built-in uniforms Figma provides:

| Uniform | Type | Description |
|---|---|---|
| `u_time` | `float` | Elapsed time in seconds |
| `u_resolution` | `vec2` | Node dimensions in pixels |
| `u_mouse` | `vec2` | Mouse position (0–1 normalized) |
| `u_texture` | `sampler2D` | The node's current content as texture |

## Minimal Shader Template

```glsl
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Example: animated gradient
  vec3 color = vec3(uv.x, uv.y, abs(sin(u_time)));
  
  gl_FragColor = vec4(color, 1.0);
}
```

## Common Patterns

### Noise-based texture
```glsl
// Classic value noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f); // smoothstep
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
```

### Radial gradient
```glsl
vec2 uv = gl_FragCoord.xy / u_resolution;
vec2 center = vec2(0.5);
float dist = length(uv - center);
float gradient = 1.0 - smoothstep(0.0, 0.5, dist);
gl_FragColor = vec4(vec3(gradient), 1.0);
```

### Animated wave distortion
```glsl
vec2 uv = gl_FragCoord.xy / u_resolution;
uv.x += sin(uv.y * 10.0 + u_time) * 0.02;
vec4 tex = texture2D(u_texture, uv);
gl_FragColor = tex;
```

## Tool Call Pattern

```js
// Load this skill first, then:
figma.createShader({
  node_id: "<TARGET_NODE_ID>",
  type: "fill",   // or "effect"
  glsl: `<fragment shader source>`,
})
```

## Update Pattern

```js
figma.updateShader({
  shader_id: "<SHADER_ID>",
  glsl: `<updated source>`,
})
```

## Debugging Tips

- If the shader is blank/black: check `precision mediump float;` is declared first.
- If `u_time` doesn't animate: confirm the node is visible and the shader type is `"fill"` not static.
- Divide by `u_resolution` to get normalized UVs — never use raw `gl_FragCoord` directly.
- GLSL ES 1.00 has no `uint` or `uint` arrays — use `float` and `int` only.
- Test with a solid color first (`gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0)`) to confirm the shader applies at all.
