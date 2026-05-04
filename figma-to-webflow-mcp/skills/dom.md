# DOM Construction

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
