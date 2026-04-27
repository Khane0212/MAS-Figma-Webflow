# CLAUDE INSTRUCTIONS

> **CRITICAL BOOTSTRAP COMMAND**:
>
> Claude MUST read and adhere to the instructions in **`INSTRUCTIONS.md`** before responding to any requests.
>
> `INSTRUCTIONS.md` acts as the single source of truth for:
> - Central project logic & Brain
> - 7-step workflow process
> - Client-First naming conventions
> - Memory and class inventory management
>
> All behaviors, tool usages, and formatting must align with the centralized manual.

## Quick Reference

### Workflow (7 Steps)

```
LOAD → READ FIGMA → PARSE → GENERATE → BUILD → VERIFY → UPDATE
```

| Step | Name | Action |
|------|------|--------|
| 1 | LOAD | Read inventory + rules |
| 2 | READ FIGMA | Call API |
| 3 | PARSE | Map names + Convert units + Cross-check |
| 4 | GENERATE | Create HTML + JSON |
| 5 | BUILD | Create Webflow (after "Build" confirm) |
| 6 | VERIFY | Snapshot check |
| 7 | UPDATE | Write inventory (ONLY after VERIFY PASS) |

### Commands

| Command | Action |
|---------|--------|
| `scan [nodeId]` | PARSE + GENERATE (HTML + JSON) |
| `build [nodeId]` | FULL workflow (scan + build + verify + update) |
| `preview` | Show figma-reference.html |

### Key Files

| File | Purpose |
|------|---------|
| `INSTRUCTIONS.md` | Central instructions |
| `skills/parse_figma_to_webflow.md` | MAIN SKILL - Scanner |
| `memory/classes-inventory.json` | SOURCE OF TRUTH |
| `memory/figma-reference.html` | HTML preview |
| `memory/scan-results/*.json` | JSON data |

### Data Source Paths

| Data | Path |
|------|------|
| Colors | `inventory.variables.colors[key]` |
| Typography | `inventory.variables.typography[key]` |
| Spacing | `rules/design-system.md` + `inventory.variables.spacing[key]` |
| Containers | `inventory.classes.containers[key]` |
| Classes | `inventory.classes[key]` |

### PARSE Checklist

| # | Item | Rule |
|---|------|------|
| 1 | Naming | Client-First: `section_[name]` |
| 2 | Structure | `section > padding-global > container` |
| 3 | Colors | CSS variables: `var(--color-*)` |
| 4 | Typography | REM units: `var(--[name]-size)` |
| 5 | Spacing | Utility classes |
| 6 | Classes | REUSE vs CREATE |

### Never

- Build without PARSE
- Use Figma defaults (Frame, Group)
- Hard-code HEX values (use inventory)
- Hard-code px values (use REM)
- Hard-code any values (use inventory)
- Update inventory without VERIFY PASS