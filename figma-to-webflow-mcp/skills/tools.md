# MCP Tool Usage Guide

> **ALWAYS** use Webflow MCP tools for all operations. No other methods allowed.

## Pre-Flight Requirements

Before any tool call:

1. **Call `webflow_guide_tool` first** - Always the first MCP call
2. **Include `context` parameter** - 15-25 words, third-person perspective
3. **Designer connection required** - User must have Webflow Designer open

**Missing any → STOP and notify user.**

---

## Phase 1: Discovery

### Step 1: Get Site
- `data_sites_tool` → `list_sites` - Identify target site
- If only one site → use automatically

### Step 2: Get Current Page
- `de_page_tool` → `get_current_page` - Check active page
- If different page needed → `switch_page`

### Step 3: Identify Task Type
| Type | Action |
|------|--------|
| Inspect | Go to Phase 2 (read-only) |
| Build/Modify/Delete | Go to Phase 3 |
| Components | Phase 2 or 3 (read vs write) |

---

## Phase 2: Inspection (Read-Only)

### List Elements
- `element_tool` → `get_all_elements` - Full page structure
- `element_tool` → `query_elements` - Filtered search
- Present: Sections, elements, nesting summary

### Preview
- `element_snapshot_tool` - Visual capture before/after

### Components
- `data_components_tool` → `list_components` - All site components
- `data_components_tool` → `get_component_content` - Inspect internals
- `de_component_tool` - Designer instance management

---

## Phase 3: Planning (Before Mutation)

### Required Steps
1. **Snapshot current state** - `element_snapshot_tool`
2. **Present exact plan** - Describe what will change
3. **Request confirmation** - Ask user explicitly

### Confirmation Phrases
- "Would you like me to proceed with these changes?"
- "Shall I go ahead and create this?"
- "Do you want me to apply these changes?"
- "Before I make changes, here's what I'll do: [plan]. Confirm?"

### Destructive Operations
- Require "confirm" or "delete" explicitly
- Warn about affected child elements

---

## Phase 4: Execution (After Confirmation)

### Build Elements
| Tool | Use Case |
|------|----------|
| `whtml_builder` | Bulk HTML insertion (fast, primary) |
| `element_builder` | Single element (slow, precise) |

**Limit:** Max 3 levels deep per call. Deeper → multiple passes.

### Style Elements
- `style_tool` → Create/update styles
- `variable_tool` → Create CSS variables first
- Link styles to variables (not hardcoded)

### Modify Elements
- `element_tool` → `add_or_update_attribute` - Attributes/text/links
- `element_tool` → `set_style` - Apply classes
- `element_tool` → `set_text` - Update content

### Component Management
- `data_components_tool` → `update_component_content` - Change content
- `data_components_tool` → `update_component_properties` - Change props
- `de_component_tool` - Designer-level instance changes

### Asset Management
- `asset_tool` → `get_all_assets_and_folders` - List assets
- `asset_tool` → `update_asset` - Move/rename assets

---

## Phase 5: Verification

1. **Snapshot result** - `element_snapshot_tool`
2. **Report changes** - Summarize what was modified
3. **Log to tracker** - Update `build_[page].json`

---

## Tool Reference

### Designer Tools (UI/Layout)
```
webflow_guide_tool          - ALWAYS call first
data_sites_tool             - Site identification
de_page_tool                - Page management
element_tool                 - CRUD operations
element_builder              - Create elements
element_snapshot_tool        - Visual capture
style_tool                   - Style management
variable_tool                - CSS variables
asset_tool                   - Asset management
```

### Data Tools (CMS/Content)
```
data_cms_tool                - CMS collections
data_pages_tool              - Page metadata
data_components_tool         - Component management
de_component_tool            - Designer components
```

### Utility Tools
```
ask_webflow_ai              - API error help
get_image_preview           - Asset validation
```

---

## Critical Rules

1. **Always `webflow_guide_tool` first** - No exceptions
2. **Read before write** - Check existing state
3. **Confirm before mutate** - Never skip Phase 3
4. **Include context** - 15-25 words, third-person
5. **Log everything** - Update tracker after each section

---

## Error Handling

| Error | Response |
|-------|----------|
| MCP timeout | Check Designer tab is active |
| 409 Conflict | Use `patch` instead of `create` |
| Missing parent | Re-analyze DOM hierarchy |
| Asset not found | Re-upload via `asset_tool` |
