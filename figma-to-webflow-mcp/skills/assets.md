# Asset Pipeline

## Upload Flow

```
Figma Export URL
    ?
asset_tool (upload)
    ?
Webflow Asset ID
    ?
element_builder (set src)
    ?
Image rendered
```

## Organization

Create folders by section:
- `Hero Assets`
- `Product Images`
- `Icons`

## Validation

Before insertion:
1. `get_image_preview` ? verify format
2. Supported: JPG, PNG, WEBP, AVIF
3. Max size check

## Implementation

### Method 1: Asset ID
```javascript
element_builder({
  type: "Image",
  set_image_asset: {
    image_asset_id: "asset_xxx"
  }
})
```

### Method 2: URL
```html
<img src="https://cdn.webflow.com/..." alt="...">
```

## Error Cases

| Issue | Resolution |
|-------|------------|
| Unsupported format | Convert before upload |
| Broken URL | Re-upload from Figma |
| Missing alt text | Add before completion |
