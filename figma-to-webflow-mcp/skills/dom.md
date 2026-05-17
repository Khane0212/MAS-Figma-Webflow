# DOM Construction

## Strict Rule: Image Elements
**NEVER** build structural or visual images using the generic `DOM` element type with a hardcoded `imgraw` tag and a CDN `src` URL. 
- Using raw DOM tags bypasses Webflow's native asset manager, making it impossible for the user to double-click and replace the image in the Webflow Designer.
- **ALWAYS** use the native Webflow `Image` element type.
- **ALWAYS** link the image directly to a Webflow Asset ID using the `set_image_asset` configuration during `element_builder` or after insertion.

## Global Component Standards (Navbar & Footer)

To ensure consistency across multiple pages and minimize redundant work, global elements must be identified and converted into **Webflow Components**.

### 1. Identification
- **Navbar:** Any `section_navbar` or top-level navigation container.
- **Footer:** Any `section_footer` or bottom-level global site info.

### 2. Implementation Workflow
Once the element structure is built using `whtml_builder` or `element_builder`, it must be immediately converted:

1. **Transform:** Call `transform_element_to_component` on the top-level Section ID.
2. **Naming:** Use standard naming: `Navbar` and `Footer`.
3. **Reuse:** On subsequent pages, use `insert_component_instance` instead of rebuilding the HTML.

```javascript
// Action: Convert to Component
{
  "transform_element_to_component": {
    "id": { "component": "...", "element": "..." },
    "name": "Footer",
    "group": "Global"
  }
}
```

### 3. Files Responsible
- **`skills/dom.md`**: Defines the structural logic for identification (this file).
- **`skills/execution.md`**: Dictates the sequence of transformation after build.
- **`workflow/WORKFLOW.md`**: Tracks the component status in the project lifecycle.

## Tool Selection

### whtml_builder (Primary)
Use for: Bulk HTML insertion
Best for: Initial section structure
Speed: Fast

Example:
```javascript
whtml_builder({
  html: `
    <div class="padding-global">
      <div class="container-large">
        <div class="padding-section-large">
          <div class="hero_component">
            <h1 class="heading-style-h1">Title</h1>
            <p class="text-size-regular">Content</p>
          </div>
        </div>
      </div>
    </div>
  `,
  parent_element_id: targetId
})
```

### element_builder (Secondary)
Use for: Single element insertion
Best for: Modifications, additions
Speed: Slower, more control

### Selection Required
Before any build:
1. `de_page_tool` → `get_current_page`
2. `element_tool` → `select_element` (parent)

## Construction Order

```
1. Select parent element
2. Create 7-layer wrapper structure
3. Apply utility classes to wrappers
4. Insert content elements
5. Apply custom classes to content
6. Set text content
7. Attach assets
```

## Class Application Order

```html
<!-- Utility first, custom last -->
<div class="margin-top margin-large hero_card">
  <!-- content -->
</div>
```
