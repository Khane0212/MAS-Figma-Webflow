# Figma to Webflow Workflow

## 4-Phase Process

```
Phase 1: EXTRACT
    ↓ Get Figma node data
    ↓ Colors, typography, spacing, assets
    
Phase 2: TRANSFORM
    ↓ Convert to Client-First
    ↓ px → rem, HEX → variables
    ↓ Auto Layout → Flexbox / Grid
    
Phase 3: CONSTRUCT
    ↓ Create variables (variable_tool)
    ↓ Create styles (style_tool)
    ↓ Build DOM (whtml_builder, element_builder)
    
Phase 4: VALIDATE
    ↓ Check structure
    ↓ Apply assets
    ↓ Log to tracker
```

## Gate System

Build chi chay khi:
- [x] Checklist 100% complete
- [x] site_id confirmed
- [x] Section chua built
- [x] MCP connected

## Tools by Phase

| Phase | Tools |
|-------|-------|
| Extract | `mcp0_get_design_context` |
| Transform | Internal logic |
| Construct | `mcp1_variable_tool`, `mcp1_style_tool`, `mcp1_element_builder`, `mcp1_whtml_builder` |
| Validate | `mcp1_element_snapshot_tool` |

## Error Handling

| Error | Fix |
|-------|-----|
| MCP timeout | Refresh Webflow tab |
| 409 Conflict | Use `patch` instead of `create` |
| Missing parent | Re-check DOM hierarchy |
