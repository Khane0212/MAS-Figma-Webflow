# Figma to Webflow MCP

AI-powered Figma-to-Webflow workflow with Frame-by-Frame build, Memory-First approach, and Client-First naming convention.

---

## ⚡ Quick Workflow

```
Figma URL → Scanner → 4 Mappers → Payload → Sync → QA → 🛑
```

| Step | Component | Action | Output |
|------|-----------|--------|--------|
| 1 | `.cursorrules` | Bootstrap → Read `INSTRUCTIONS.md` | Rules |
| 2 | `research-agent` | Analyze Figma URL → Industry/Keywords | `brand-context.md` |
| 3 | `figma-scanner` | Extract design (colors, typography, layout) | Data |
| 4 | `variable-mapper` | Map colors, spacing → CSS variables | `mappedVariables` |
| 5 | `naming-mapper` | Map semantic classes (Client-First) | `mappedClasses` |
| 6 | `content-generator` | Refine text, generate content | `refinedContent` |
| 7 | `semantic-mapper` | Orchestrate → Build DOM tree | `[frame]-payload.json` |
| 8 | `webflow-sync` | Read payload → Build on Webflow | Live Page |
| 9 | `qa-tester` | Audit → Log to history | `project-history.log` |

---

## 📁 Structure

### Rules (Quy chuẩn)
| File | Purpose |
|------|---------|
| `rules/naming-convention.md` | Semantic naming philosophy |
| `rules/code-style.md` | Core Structure (wrappers, containers), REM units |
| `rules/design-system.md` | Colors, typography, spacing tokens |

### Skills (Kỹ năng xử lý)
| File | Purpose | Output |
|------|---------|--------|
| `skills/figma-scanner.md` | Extract Figma (no file write) | Design Context |
| `skills/variable-mapper.md` | Map colors, typography, spacing | `mappedVariables` |
| `skills/naming-mapper.md` | Map classes (Client-First) | `mappedClasses` |
| `skills/content-generator.md` | Refine content, Brand Voice | `refinedContent` |
| `skills/semantic-mapper.md` | Orchestrate all mappers | `payload.json` |
| `skills/webflow-sync.md` | Build on Webflow via MCP | Webflow Page |

### Agents (Chuyên gia)
| File | Purpose |
|------|---------|
| `agents/research-agent.md` | Brand context & industry analysis |
| `agents/qa-tester.md` | Audit & logging |

### Memory (Lưu trữ)
| File | Purpose |
|------|---------|
| `memory/brand-context.md` | Industry, keywords, tone |
| `memory/classes-inventory.json` | Reusable classes & variables |
| `memory/[frame]-payload.json` | Frame build state |
| `memory/project-history.log` | Audit logs |

---

## 🎯 3-Priority Class Mapping

1. **Reuse** → Check `classes-inventory.json` first
2. **Style Match** → Font-size 64px=h1, 40px=h2, 24px=h3, 20px=h4
3. **New Naming** → `[page]-[block]_[element]` or `section_[name]`

---

## �️ Core Structure (Required)

```html
<div class="page-wrapper">
  <div class="main-wrapper">
    <section class="section_[name]">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-large">
            <!-- Content -->
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
```

---

## ⚡ Key Rules

1. **Frame-by-frame** - Build one frame at a time, STOP after each
2. **Memory-first** - Always read `classes-inventory.json` before mapping
3. **No WHTML** - Read from `payload.json`, not intermediate files
4. **Auto-logging** - All actions logged to `project-history.log`

---

## 🔧 MCP Tools

- **Figma**: `mcp0_get_design_context()`
- **Webflow**: `mcp1_style_tool`, `mcp1_element_builder`, `mcp1_navigate_to_page`

