# Atomic Execution

## 5-Step Process

### Step1: Identify
- Get existing IDs from `list_styles`
- Resolve variable IDs
- Resolve class IDs
- Resolve asset IDs
- Read and cache `knowledge/structure.md` 7-layer requirements
- Read and cache `skills/dom.md` tool-selection rules

### Step2: Prepare
- Upload assets if needed
- Create missing variables
- Verify all references exist

### Step2.5: Layout classification (CRITICAL)

Before any create/build action, classify each container:
- `flex` when content flow is single-axis (row OR column), no true matrix requirement.
- `grid` when content is two-dimensional (rows + columns), repeated cards, or explicit multi-column section.

Quick signals from Figma:
- Auto layout vertical/horizontal list -> flex
- Matrix/card set (2xN, 3xN) -> grid
- Footer with top columns plus separate bottom row -> grid + dedicated bottom-row wrapper

Hard rule:
- Do not use `flex-wrap` as a replacement for a true grid layout when Figma clearly implies column/row structure.

### Step3: Styles
- Create/update styles
- For combo classes: collect all class IDs
- Link to variables

⚠️ **CRITICAL: Combo Class Creation**
```javascript
// ❌ WRONG - Creates standalone style (isComboClass: false)
{
  action: "create_style",
  name: "privacy_description",
  properties: [...]
}

// ✅ CORRECT - Creates combo class (isComboClass: true)
{
  action: "create_style",
  name: "privacy_description",
  parent_style_names: ["text-style-muted"],  // ← REQUIRED! base typography first
  properties: [...]
}
```

**Validation checklist:**
- [ ] If a class is meant to be a variant of another (section/component class) → MUST have `parent_style_names`
- [ ] After creation, verify `isComboClass: true` in query result
- [ ] Base typography classes (`heading-style-*`, `text-style-*`) must be standalone (no parent)
- [ ] Class names reflect actual content role (`*_page_heading`, `*_body_heading`, `*_cta_text`) instead of vague names (`*_section_heading`)

### Step4: Build
- Create node with parent_id
- Attach `data-figma-id` attribute
- Set classes

DOM safety checks before first write:
- [ ] Parent currently selected and verified (`de_page_tool.get_current_page`, `element_tool.select_element`)
- [ ] 7-layer wrapper plan exists (no skipped layer)
- [ ] `section_[name]` does not receive direct spacing styles meant for wrapper layers
- [ ] Builder choice is explicit (`whtml_builder` for skeleton, `element_builder` for incremental edits)

### Step5: Verify
- `get_node` to verify attributes
- `element_snapshot_tool` for visual
- Log to progress file

Layout verification checklist:
- [ ] If section is two-dimensional in Figma, `display` is grid (not wrapped flex)
- [ ] `grid-template-columns` and `row/column gap` are explicitly set
- [ ] Breakpoint behavior preserves intended column count transitions

## Common mistake: “Inheritance stacking” (NOT combo)

Symptom in Webflow: Style panel shows “Inheriting N selectors” like:
- `Body (All Pages)`
- `All Paragraphs` / `All H2s`
- `text-style-*`
- `privacy_*`

Fix strategy (recommended):
- Keep `All Paragraphs` / `All H2s` mostly empty (only true global defaults).
- Drive typography via `[text-style-*]` / `[heading-style-*]` base classes, and use `privacy_*` as combo for local overrides.

## Naming guardrails (must-pass before handoff)

- No new standalone classes with ambiguous role names (`section_heading`, `description_style`, `content_style`).
- Heading mapping must be explicit and semantic:
  - Page title → `heading-style-h1` + `*_page_heading`
  - Section/body title → `heading-style-h2` + `*_body_heading`
  - Footer CTA title → `heading-style-h1` + `footer_cta_heading`
- Remove old classes after migration so the style panel does not keep conflicting legacy names.

## Error Handling

| Error | Response |
|-------|----------|
| 409 Conflict | Use `patch_style` instead |
| Timeout | Search by `data-figma-id` before retry |
| Missing parent | Re-analyze DOM position |

## Rate Limiting
- Pause 2s after every 5 writes
- Batch reads when possible
- Minimize API calls
