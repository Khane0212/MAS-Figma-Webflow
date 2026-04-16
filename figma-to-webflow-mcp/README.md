# Figma to Webflow MCP

Automated Figma-to-Webflow workflow using AI agents + MCP integration.

## � Quick Workflow

```
Figma URL → Scanner (extract) → Generator (map + write payload) → Sync (build Webflow)
```

## 📁 Structure

| Path | Purpose |
|------|---------|
| `.cursorrules` | Orchestration rules |
| `rules/` | Naming conventions & design tokens |
| `skills/figma-scanner.md` | Extract Figma data |
| `skills/content-generator.md` | Map classes, write `payload.json` |
| `skills/webflow-sync.md` | Build on Webflow |
| `memory/classes-inventory.json` | Class storage |
| `memory/*-payload.json` | Frame build state |

## ⚡ Key Rules

1. **Frame-by-frame** - Build one at a time, STOP after each
2. **Read memory first** - Always check `classes-inventory.json`
3. **Re-use classes** - Only create new when necessary

## 🎨 Core Classes

```html
<div class="page-wrapper">
  <div class="main-wrapper">
    <section class="section_nav">...</section>
    <section class="section_[frame]-hero">...</section>
  </div>
</div>
```

## 📋 Data Flow

| Step | Input | Output | File |
|------|-------|--------|------|
| 1 | Figma URL | Design Context | - |
| 2 | Design Context | Mapped Classes | `[frame]-payload.json` |
| 3 | payload.json | Webflow Page | - |

## 🔧 MCP Tools

- **Figma**: `mcp0_get_design_context()`
- **Webflow**: `mcp1_style_tool`, `mcp1_element_builder`, `mcp1_whtml_builder`

---

**Version**: 2.0 | Updated: 2026-04-16
