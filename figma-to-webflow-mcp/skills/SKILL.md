# Webflow Designer Tools - SKILL.md

## Role
Design và manage pages, elements, components, styles trong Webflow Designer.

## ⚠️ CRITICAL: Validate First

**LUÔN gọi `webflow_guide_tool` TRƯỚC bất kỳ tool nào khác.**

```
1. webflow_guide_tool (LUÔN TRƯỚC)
2. data_sites_tool → list_sites
3. de_page_tool → get_current_page
4. element_tool → get_all_elements
5. ANALYZE & VALIDATE ← THEO PROTOCOL
6. Nếu Pass → Present DOM → Đợi "Build"
7. Nếu Fail → Report issues
8. Sau confirm → Build
9. element_snapshot_tool → Verify
```

---

## Discovery Phase

### 1. Always Start Here
```bash
webflow_guide_tool()  # Get best practices
```

### 2. Identify Site
```bash
data_sites_tool(action="list_sites")
```

### 3. Identify Page
```bash
de_page_tool(actions=[{"get_current_page": true}])
```

### 4. Get Elements
```bash
element_tool(actions=[{"get_all_elements": true}])
```

---

## Pre-Build Validation (REQUIRED)

Trước khi build, phải validate:

### A. Naming Check
- [ ] Không có Figma defaults (Frame, Group, div-block)
- [ ] Dùng `prefix_element` pattern

### B. Structure Check
- [ ] Có `section_[name]`
- [ ] Có `padding-global`
- [ ] Có `container-[size]`
- [ ] Có `padding-section-[size]`

### C. Styles Check
- [ ] Dùng Variables cho colors
- [ ] Warning nếu có HEX hard-coded
- [ ] Warning nếu có pixel hard-coded

### D. Spacing Check
- [ ] Dùng Utility Classes
- [ ] Không inline px values

---

## Planning Phase

### Snapshot Current State
```bash
element_snapshot_tool(action={...})
```

### Present Plan
Mô tả CHÍNH XÁC:
- Elements sẽ tạo
- Styles sẽ apply
- Structure hierarchy

### Request Confirmation
```
"Here's my plan:
1. Create section_navbar with padding-global
2. Add heading-style-h1 for H1
3. Add nav links with nav-link class

Shall I proceed? Reply 'Build' to continue."
```

---

## Execution Phase (After Confirmation)

### Build Elements
```bash
webflow_whtml_builder()
  # Use HTML with Client-First classes
```

### Apply Styles
```bash
webflow_style_tool()
  # Create missing classes
  # Apply to elements
```

### Modify if Needed
```bash
element_tool(actions=[
  {"set_text": {...}},
  {"add_or_update_attribute": {...}},
  {"set_link": {...}}
])
```

---

## Verification Phase

### Snapshot Result
```bash
element_snapshot_tool(action={...})
```

### Report Changes
```
✅ Created: section_navbar
✅ Applied: heading-style-h1, text-color-white
✅ Created: nav-link with 6 links
```

---

## Common Scenarios

### Scenario 1: Build Navbar
```
1. webflow_guide_tool()
2. element_snapshot_tool()
3. Present plan
4. User: "Build"
5. webflow_whtml_builder() → navbar HTML
6. webflow_style_tool() → nav-link class
7. element_snapshot_tool() → verify
```

### Scenario 2: Build Privacy Page
```
1. webflow_guide_tool()
2. de_page_tool() → switch to privacy page
3. element_tool() → get current structure
4. Analyze Figma specs
5. Pre-build checklist
6. Pass → Present DOM
7. User: "Build"
8. webflow_whtml_builder() → full page
9. element_snapshot_tool() → verify
```

### Scenario 3: Update Component
```
1. webflow_guide_tool()
2. data_components_tool() → list_components
3. data_components_tool() → get_component_content
4. element_snapshot_tool()
5. Present changes
6. User: "Update"
7. data_components_tool() → update_component_content
8. Verify
```

---

## Quick Reference

| Task | Tool | Action |
|------|------|--------|
| Start workflow | webflow_guide_tool | - |
| List sites | data_sites_tool | list_sites |
| Get page | de_page_tool | get_current_page |
| Get elements | element_tool | get_all_elements |
| Preview | element_snapshot_tool | get_element_snapshot |
| Create HTML | webflow_whtml_builder | insert_whtml |
| Create styles | webflow_style_tool | create_style |
| Update text | element_tool | set_text |
| Update link | element_tool | set_link |
| Create page | de_page_tool | create_page |
| List components | data_components_tool | list_components |