# Webflow Builder - Build Methodology

## Role
Build Webflow pages từ Figma design sử dụng Client-First methodology.

## Write Permissions
- `memory/webflow-build-log.json`
- `memory/classes-inventory.json`
- Webflow via MCP APIs

## Forbidden
- Không write: `brand-context.md`, `project-history.log`
- Không modify: `rules/`, `skills/`

---

## Pre-Build Validation (REQUIRED)

**TRƯỚC KHI build bất kỳ thứ gì:**

### Step 1: Read Inventory
```bash
# Check existing classes, variables, components
cat memory/classes-inventory.json
```

### Step 2: Read Figma Design
```bash
figma_get_design_context(nodeId="XXX")
```

### Step 3: Validate Checklist

| # | Item | Check |
|---|------|-------|
| 1 | Naming | Classes theo `prefix_element` pattern |
| 2 | Structure | `section_[name]` > `padding-global` > `container-[size]` |
| 3 | Styles | Variables tồn tại, no hard-coded HEX |
| 4 | Spacing | Utility classes tồn tại |

### Step 4: Decision

```
IF any checklist item = FAIL:
  → Report issues
  → STOP (do not build)
  → Ask user to fix

IF all checklist items = PASS:
  → Present DOM structure
  → Wait for "Build" confirmation
  → Proceed with build
```

---

## Build Order

### 1. Create Variables (if needed)
```bash
variable_tool(actions=[
  {"create_color_variable": {...}},
  {"create_size_variable": {...}}
])
```

### 2. Create Styles/Classes
```bash
webflow_style_tool(actions=[
  {"create_style": {"name": "heading-style-h1", "properties": [...]}},
  {"create_style": {"name": "text-size-regular", "properties": [...]}},
  {"create_style": {"name": "section_navbar", "properties": [...]}}
])
```

### 3. Build HTML Structure
```bash
webflow_whtml_builder(actions=[
  {
    "html": "<nav class='section_navbar'>...",
    "css": ".section_navbar { background: var(--color-primary); }",
    "parent_element_id": {...}
  }
])
```

### 4. Apply Styles to Elements
```bash
webflow_style_tool(actions=[
  {"update_style": {"style_name": "...", "properties": [...]}}
])
```

---

## Structure Template

```html
<!-- Page Wrapper -->
<div class="page-wrapper">
  
  <!-- Navbar Section -->
  <nav class="section_navbar">
    <div class="padding-global">
      <div class="container-large">
        <div class="navbar_wrapper">
          <img src="logo" class="navbar_logo">
          <div class="navbar_links">
            <a href="/" class="nav-link">Home</a>
            <a href="/about" class="nav-link">About</a>
          </div>
          <div class="button is-secondary">Contact us</div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="section_privacy-hero">
    <div class="padding-global">
      <div class="container-small">
        <div class="padding-section-large text-align-center">
          <h1 class="heading-style-h1">Privacy Policy</h1>
          <p class="text-size-regular text-color-dark">Description</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Content Section -->
  <section class="section_privacy-content">
    <div class="padding-global">
      <div class="container-medium">
        <div class="padding-section-large">
          <h2 class="heading-style-h3">Title</h2>
          <p class="text-size-regular text-color-dark">Content</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="section_footer">
    <div class="padding-global">
      <div class="container-large">
        <div class="footer_3col">
          <!-- Footer content -->
        </div>
      </div>
    </div>
  </footer>

</div>
```

---

## Class Naming Convention

### Sections
```css
section_[name]
  section_navbar
  section_hero
  section_footer
  section_privacy-hero
  section_privacy-content
```

### Typography
```css
heading-style-h1    /* 3rem, 600 */
heading-style-h2    /* 2.375rem, 600 */
heading-style-h3    /* 1.125rem, 500 */
text-size-regular  /* 1rem, 400 */
text-size-medium  /* 1rem, 500 */
text-size-small   /* 0.875rem, 400 */
```

### Colors
```css
text-color-white    /* #ffffff */
text-color-dark    /* #282938 */
text-color-muted   /* #bbbbcb */
text-color-light  /* #f4f6fc */
text-color-link    /* #2405f2 */

background-color-primary  /* #1c1e53 */
background-color-dark    /* #282938 */
background-color-yellow /* #fcd980 */
background-color-white  /* #ffffff */
background-color-grey   /* #f4f6fc */
```

### Buttons
```css
button           /* Base */
button.is-primary     /* Dark bg */
button.is-secondary   /* Transparent + border */
button.is-yellow      /* Yellow bg */
```

### Spacing
```css
padding-global         /* 1.5rem horizontal */
padding-section-small   /* 3rem vertical */
padding-section-medium /* 5rem vertical */
padding-section-large   /* 7rem vertical */

margin-top margin-small    /* 1rem */
margin-top margin-large  /* 3rem */
margin-bottom margin-small
```

### Layout
```css
container-large   /* max-width: 80rem */
container-medium /* max-width: 64rem */
container-small  /* max-width: 48rem */
```

---

## Error Handling

### If Style Tool Fails
```
1. Check property names are valid
2. Try alternative property syntax
3. Use CSS in html/css parameter as fallback
```

### If Element Tool Fails
```
1. Check element_id format
2. Verify element exists
3. Use whtml_builder to recreate
```

### If Build Fails
```
1. Check Webflow Designer connection
2. Verify siteId
3. Snapshot current state
4. Report error
```

---

## Post-Build Actions

### 1. Update Inventory
```bash
# Add new classes to classes-inventory.json
{
  "classes": {
    "new_class": {...}
  }
}
```

### 2. Log Activity
```bash
# Append to project-history.log
[BUILD] Built section_name
[CLASS] Created class_name
```

### 3. Verify
```bash
element_snapshot_tool()
# Compare with Figma screenshot
```

---

## Success Criteria

✅ Page exists in Webflow
✅ All sections built
✅ All styles applied correctly
✅ Inventory updated
✅ Visual matches Figma