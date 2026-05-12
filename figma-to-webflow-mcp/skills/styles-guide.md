# Variables & Styles

## Creation Sequence

```
Phase A: Variables (First)
+-- Colors
�   +-- text-color-primary
�   +-- text-color-secondary
�   +-- background-color-primary
�
+-- Spacing
    +-- spacing-small (1rem)
    +-- spacing-medium (2rem)
    +-- spacing-large (3rem)

Phase B: Styles (Second)
+-- Utility classes
�   +-- margin-top (link to spacing vars)
�   +-- padding-global
�
+-- Custom classes
    +-- hero_component (component-specific)
```

## Tools

### variable_tool
```javascript
// Create color variable
{
  action: "create_color_variable",
  variable_name: "text-color-primary",
  value: { static_value: "#232536" }
}

// Create size variable
{
  action: "create_size_variable",
  variable_name: "spacing-medium",
  value: { static_value: { value: 2, unit: "rem" } }
}
```

### Style Creation Order (CRITICAL)

**Step 1: Create ALL global base classes first (standalone)**

Principle:
- Typography scale and reusable “look” classes are **base** (standalone).
- Page/section/component naming classes (e.g. `privacy_description`) should be **combo/variants** layered on top.
- Combo class names must be **semantic by content role**, not vague by position.

Recommended base naming:
- Headings: `heading-style-h1`, `heading-style-h2`, `heading-style-h3`
- Text: `text-style-regular`, `text-style-muted`, `text-style-link`

```javascript
// Base classes - create these FIRST (standalone)
{
  action: "create_style",
  name: "heading-style-h1",
  properties: [{ property_name: "fontSize", property_value: "2rem" }]
},
{
  action: "create_style",
  name: "heading-style-h2",
  properties: [{ property_name: "fontSize", property_value: "1rem" }]
},
{
  action: "create_style",
  name: "text-style-regular",
  properties: [{ property_name: "fontSize", property_value: "1rem" }]
},
{
  action: "create_style",
  name: "text-style-muted",
  properties: [{ property_name: "fontSize", property_value: "1rem" }]
}
```

**Step 2: Create page/section/component classes as combo (MUST reference base class)**
```javascript
// Combo classes - create AFTER base classes exist
// Webflow Style Selector: [base] [combo]
{
  action: "create_style",
  name: "privacy_body_heading",
  parent_style_names: ["heading-style-h2"],  // ← REQUIRED: references base
  properties: [{ property_name: "marginBottom", property_value: "1rem" }]
},
{
  action: "create_style",
  name: "privacy_page_heading",
  parent_style_names: ["heading-style-h1"],  // ← REQUIRED: references base
  properties: [{ property_name: "marginBottom", property_value: "1rem" }]
},
{
  action: "create_style",
  name: "privacy_description",
  parent_style_names: ["text-style-muted"],  // ← REQUIRED: references base
  properties: [{ property_name: "color", property_value: "#666666" }]
},
{
  action: "create_style",
  name: "privacy_content",
  parent_style_names: ["text-style-regular"],  // ← REQUIRED: references base
  properties: [{ property_name: "lineHeight", property_value: "1.5" }]
},
{
  action: "create_style",
  name: "footer_cta_heading",
  parent_style_names: ["heading-style-h1"],  // ← REQUIRED: references base
  properties: [{ property_name: "color", property_value: "#ffffff" }]
}
```

**Step 3: Apply to elements (base + combo)**
```javascript
{
  action: "set_style",
  id: { component: "xxx", element: "yyy" },
  style_names: ["text-style-muted", "privacy_description"]  // base + combo
}
```

**Visual in Webflow Style Selector:**
```
[text-style-muted] [privacy_description]  ← Side by side
```

## Avoiding “Inheritance stacking” (NOT combo class)

If you see “Inheriting 3-6 selectors” like:
- `Body (All Pages)`
- `All Paragraphs` / `All H2s`
- Your page/section class
- Your combo class

That is **tag/global styles** stacking with your classes.

Rules:
- Keep `Body (All Pages)` and tag styles (`All Paragraphs`, `All H2s`) **minimal** (only true global defaults).
- Do **not** style typography heavily on `All Paragraphs` / `All H2s` if you also use base typography classes (`heading-style-*`, `text-style-*`).
- When refactoring, pick ONE system:
  - System A (recommended here): typography comes from **base classes** + combos; tag styles are near-empty.
  - System B: typography comes from **tag styles**; then keep classes only for exceptions.

Quick fix workflow in Webflow:
- Select `All Paragraphs` (or `All H2s`) in Style panel and clear conflicting properties (font-size, line-height, color, etc.).
- Re-apply the element with exactly: `[text-style-*]` (base) + `[your_section_class]` (combo).

## Naming policy (anti-regression)

Use these naming rules to prevent the same issue from happening again:
- Prefer **content-role names** over location names:
  - Good: `privacy_page_heading`, `privacy_body_heading`, `footer_cta_text`
  - Avoid: `privacy_section_heading`, `privacy-description-style`, `heading-variant-2`
- If one class starts being reused for multiple roles, split it into specific semantic combos.
- During refactor, remove old vague class names after migrating usages.

## Flex vs Grid decision tree (5 lines)

1. If layout is single-axis flow (row OR column) -> use `flex`.
2. If layout is two-dimensional (rows + columns at the same time) -> use `grid`.
3. If Figma shows repeated card matrix (2xN, 3xN, etc.) -> use `grid`.
4. If requirement needs explicit column control across breakpoints -> use `grid` (not wrapped flex).
5. If unsure between `flex-wrap` and `grid`, choose `grid` for content blocks; keep `flex` for nav/button/icon rows.

## Validation

Before creating:
- Check existing with `get_styles`
- Avoid duplicates
- Link to variables, not static values
