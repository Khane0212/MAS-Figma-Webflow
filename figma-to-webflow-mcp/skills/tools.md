# MCP Rules

## Pre-Flight Checklist

Before calling any tool:

1. Read `shared_components.json` ? confirm site_id
2. Read `wf_progress_[page].json` ? confirm section not built
3. Call `webflow_guide_tool` ? sync best practices

**Missing any ? STOP.**

## Tool Categories

### Designer Tools (UI/Layout)
- `variable_tool`
- `style_tool`
- `element_builder`
- `whtml_builder`
- `de_page_tool`
- `element_tool`
- `asset_tool`

### Data Tools (CMS only)
- `data_cms_tool`
- `data_pages_tool`

**Never use Data Tools for styling.**

## Debug Tools

| Tool | Use when |
|------|----------|
| `element_snapshot_tool` | Need visual confirmation |
| `ask_webflow_ai` | API error unclear |

## Optimization

- Read before write
- Target specific elements
- Avoid `get_all_elements`
- Cache IDs locally
