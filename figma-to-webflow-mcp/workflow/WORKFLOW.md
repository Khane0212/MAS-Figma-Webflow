# Build Process

## Phase 1: Extract (Figma)

**Input:** Figma Node ID
**Output:** Design Spec

### Steps
1. Call Figma MCP - get design context
2. Extract color tokens (HEX values)
3. Extract typography (font, size, weight)
4. Extract spacing (gap, padding, margin in px)
5. Extract layout (auto layout properties)
6. List all assets (images, icons)

**Deliverable:** JSON spec with all raw values

---

## Phase 2: Transform (Mapping)

**Input:** Design Spec
**Output:** Build Plan

### Conversion Table

| Source | Target | Formula |
|--------|--------|---------|
| px | rem | ÷ 16 |
| HEX | variable | Map to `class.json` |
| Auto Layout Vertical | CSS | `flex-direction: column` |
| Auto Layout Horizontal | CSS | `flex-direction: row` |
| Fill Container | CSS | `flex-grow: 1` |
| Hug Contents | CSS | `width: auto` |
| Frame (top) | Class | `section_[name]` |
| Max-width repeat | Class | `container-large` |
| Horizontal padding | Class | `padding-global` |
| Vertical gap | Class | `padding-section-large` |
| Element gap | Class | `margin-top margin-[size]` |

### DOM Structure Template
```html
<div class="page-wrapper">
  <main class="main-wrapper">
    <section class="section_{name}">
      <div class="padding-global">
        <div class="container-{size}">
          <div class="padding-section-{size}">
            <div class="{name}_component">
              [CONTENT]
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
```

**Deliverable:** Build plan with mapped classes

---

## Phase 3: Construct (Webflow)

**Input:** Build Plan
**Output:** Live Section

### Sequence
1. **Variables**
   - `variable_tool` ? create color variables
   - `variable_tool` ? create spacing variables

2. **Styles**
   - `style_tool` ? create utility classes
   - `style_tool` ? create custom classes

3. **Structure**
   - `whtml_builder` ? insert 7-layer DOM
   - `element_builder` ? fine-tune if needed

4. **Assets**
   - `asset_tool` ? upload images
   - Update img src attributes

**Deliverable:** Section on Webflow

---

## Phase 4: Validate (QA)

**Input:** Built Section
**Output:** Verified Build

### Checklist
- [ ] 7-layer DOM complete
- [ ] All px converted to rem
- [ ] No inline styles
- [ ] Utility classes use `-`
- [ ] Custom classes use `_`
- [ ] Variables linked correctly
- [ ] Visual match (snapshot)

### Tools
- `element_snapshot_tool` ? capture render
- Compare with Figma reference

### State Update
```javascript
tracker.markSectionComplete(sectionName, elementId)
```

**Deliverable:** Logged progress + snapshot
