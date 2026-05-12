# Webflow MCP Combo Class Creation Skill

## 🎯 Overview
Combo class trong Webflow = Base class + Override class. Dùng để customize specific elements mà không ảnh hưởng đến global style.

---

## 📝 Công thức tạo Combo Class

### Step 1: Tạo Combo Class mới

```javascript
mcp1_style_tool với actions:
{
  "label": "Tên action",
  "create_style": {
    "name": "is-[tên-combo]",           // Ví dụ: is-navbar, is-footer
    "parent_style_names": ["base-class"], // Class gốc cần extend
    "properties": [
      { "property_name": "property-1", "property_value": "value-1" },
      { "property_name": "property-2", "property_value": "value-2" }
    ]
  }
}
```

### Step 2: Apply Combo Class vào Element

```javascript
mcp1_element_tool với actions:
{
  "label": "Apply combo class",
  "set_style": {
    "id": {
      "component": "component-id",
      "element": "element-id"
    },
    "style_names": ["base-class", "is-[tên-combo]"]  // LUÔN truyền cả 2 class!
  }
}
```

---

## 💡 Ví dụ thực tế

### Ví dụ 1: `is-navbar` (Zero padding cho navbar)

**Mục đích:** Navbar có fixed height 92px, cần bỏ padding để content không bị cắt

```javascript
// Step 1: Tạo combo class
{
  "label": "Create is-navbar combo class",
  "create_style": {
    "name": "is-navbar",
    "parent_style_names": ["padding-section-small"],
    "properties": [
      { "property_name": "padding-top", "property_value": "0px" },
      { "property_name": "padding-bottom", "property_value": "0px" },
      { "property_name": "height", "property_value": "100%" }
    ]
  }
}

// Step 2: Apply vào element
{
  "label": "Apply is-navbar to navbar padding",
  "set_style": {
    "id": { "component": "69f82db49f58fdd1cabf48a8", "element": "d0b11bb7-eefa-6e6a-57eb-8ef1115a102d" },
    "style_names": ["padding-section-small", "is-navbar"]
  }
}
```

**Kết quả:**
```html
<div class="padding-section-small is-navbar" style="padding-top: 0; padding-bottom: 0; height: 100%;">
```

---

### Ví dụ 2: `is-footer` (Remove bottom padding cho footer)

**Mục đích:** Footer không cần padding-bottom vì đã là cuối trang

```javascript
// Step 1: Tạo combo class
{
  "label": "Create is-footer combo class",
  "create_style": {
    "name": "is-footer",
    "parent_style_names": ["padding-section-large"],
    "properties": [
      { "property_name": "padding-bottom", "property_value": "0rem" }
    ]
  }
}

// Step 2: Apply vào element
{
  "label": "Apply is-footer to footer",
  "set_style": {
    "id": { "component": "...", "element": "..." },
    "style_names": ["padding-section-large", "is-footer"]
  }
}
```

**Kết quả:**
```html
<section class="padding-section-large is-footer" style="padding-bottom: 0rem;">
```

---

### Ví dụ 3: Typography Combo Class (heading-style-h1 + privacy_page_heading)

**Mục đích:** Tạo heading style riêng cho page Privacy, kế thừa từ heading-style-h1

```javascript
// Step 1: Tạo base typography class trước (nếu chưa có)
{
  "label": "Create base heading-style-h1",
  "create_style": {
    "name": "heading-style-h1",
    "properties": [
      { "property_name": "font-family", "property_value": "Poppins, sans-serif" },
      { "property_name": "font-size", "property_value": "3rem" },
      { "property_name": "font-weight", "property_value": "600" },
      { "property_name": "line-height", "property_value": "4rem" },
      { "property_name": "color", "property_value": "#282938" }
    ]
  }
}

// Step 2: Tạo combo class cho Privacy page
{
  "label": "Create privacy_page_heading combo",
  "create_style": {
    "name": "privacy_page_heading",
    "parent_style_names": ["heading-style-h1"],
    "properties": [
      { "property_name": "margin-top", "property_value": "0" },
      { "property_name": "margin-bottom", "property_value": "1rem" },
      { "property_name": "text-align", "property_value": "center" }
    ]
  }
}

// Step 3: Apply vào element
{
  "label": "Apply combo to privacy heading",
  "set_style": {
    "id": { "component": "...", "element": "..." },
    "style_names": ["heading-style-h1", "privacy_page_heading"]
  }
}
```

**Kết quả:**
```html
<h1 class="heading-style-h1 privacy_page_heading" style="margin-top: 0; margin-bottom: 1rem; text-align: center;">
```

---

### Ví dụ 4: Typography Combo Class (heading-style-h2 + privacy_body_heading)

**Mục đích:** Body heading cho Privacy page

```javascript
// Step 1: Tạo base heading-style-h2 (nếu chưa có)
{
  "label": "Create base heading-style-h2",
  "create_style": {
    "name": "heading-style-h2",
    "properties": [
      { "property_name": "font-family", "property_value": "Poppins, sans-serif" },
      { "property_name": "font-size", "property_value": "2.375rem" },
      { "property_name": "font-weight", "property_value": "600" },
      { "property_name": "line-height", "property_value": "3.5rem" },
      { "property_name": "color", "property_value": "#282938" }
    ]
  }
}

// Step 2: Tạo combo class
{
  "label": "Create privacy_body_heading combo",
  "create_style": {
    "name": "privacy_body_heading",
    "parent_style_names": ["heading-style-h2"],
    "properties": [
      { "property_name": "margin-top", "property_value": "2rem" },
      { "property_name": "margin-bottom", "property_value": "1rem" }
    ]
  }
}

// Step 3: Apply
{
  "label": "Apply combo to body heading",
  "set_style": {
    "id": { "component": "...", "element": "..." },
    "style_names": ["heading-style-h2", "privacy_body_heading"]
  }
}
```

---

## 🎨 Naming Convention cho Typography

| Loại | Pattern | Ví dụ |
|------|---------|-------|
| **Base typography** | `heading-style-h1`, `text-style-regular` | Dùng chung toàn site |
| **Page heading** | `[page]_page_heading` | `privacy_page_heading`, `about_page_heading` |
| **Body heading** | `[page_or_section]_body_heading` | `privacy_body_heading`, `features_body_heading` |
| **Description** | `[page_or_section]_description` | `privacy_description`, `hero_description` |
| **Content text** | `[page_or_section]_content` | `privacy_content`, `blog_content` |
| **CTA heading** | `[section]_cta_heading` | `footer_cta_heading`, `hero_cta_heading` |
| **Brand text** | `[section]_brand_text` | `footer_brand_text`, `navbar_brand_text` |
| **Meta text** | `[section]_meta_text` | `blog_meta_text`, `card_meta_text` |

---

## ⚠️ Common Mistakes (Hay quên!)

| ❌ Sai | ✅ Đúng |
|--------|---------|
| Chỉ truyền `is-navbar` vào `style_names` | Truyền cả `base-class` VÀ `is-navbar` |
| Quên `parent_style_names` | Luôn có `parent_style_names` |
| Tạo combo class mà không apply | Tạo xong PHẢI apply vào element |
| Tạo base typography sau combo class | Tạo base TRƯỚC, combo SAU |
| Đặt tên combo quá chung chung (heading_1, description) | Đặt tên theo context (privacy_page_heading, footer_cta_text) |

---

## 🔄 Complete Workflow

```javascript
// 1. Kiểm tra combo class đã tồn tại chưa
mcp1_style_tool: {
  "actions": [{
    "label": "Check if exists",
    "query_styles": {
      "queries": [{ "name_path": ["is-navbar"] }]
    }
  }]
}

// 2. Nếu chưa có → Tạo combo class
mcp1_style_tool: {
  "actions": [{
    "label": "Create combo class",
    "create_style": {
      "name": "is-navbar",
      "parent_style_names": ["padding-section-small"],
      "properties": [
        { "property_name": "padding-top", "property_value": "0px" },
        { "property_name": "padding-bottom", "property_value": "0px" }
      ]
    }
  }]
}

// 3. Apply vào element
mcp1_element_tool: {
  "actions": [{
    "label": "Apply combo class",
    "set_style": {
      "id": { "component": "...", "element": "..." },
      "style_names": ["padding-section-small", "is-navbar"]
    }
  }]
}
```

---

## 📚 Quick Reference

### Properties thường override

```javascript
// Padding
{ "property_name": "padding-top", "property_value": "0px" }
{ "property_name": "padding-bottom", "property_value": "0px" }
{ "property_name": "padding-left", "property_value": "0px" }
{ "property_name": "padding-right", "property_value": "0px" }

// Margin
{ "property_name": "margin-top", "property_value": "0px" }
{ "property_name": "margin-bottom", "property_value": "0px" }

// Height/Width
{ "property_name": "height", "property_value": "100%" }
{ "property_name": "min-height", "property_value": "auto" }

// Typography
{ "property_name": "text-align", "property_value": "center" }
{ "property_name": "font-size", "property_value": "2.5rem" }
{ "property_name": "color", "property_value": "#ffffff" }

// Background
{ "property_name": "background-color", "property_value": "transparent" }
```

### Tool cần dùng

| Mục đích | Tool |
|----------|------|
| Tạo combo class | `mcp1_style_tool` với `create_style` |
| Apply combo class | `mcp1_element_tool` với `set_style` |
| Kiểm tra class | `mcp1_style_tool` với `query_styles` |

---

## ✅ Checklist (Trước khi tạo)

- [ ] Xác định base class cần extend
- [ ] Xác định properties cần override
- [ ] Đặt tên combo class theo naming convention
- [ ] Kiểm tra base class đã tồn tại chưa (tạo base trước nếu chưa có)
- [ ] Tạo combo class với `parent_style_names`
- [ ] Apply vào element với cả 2 class (base + combo)
- [ ] Verify kết quả

---

**Ghi chú:** Luôn đọc skill này trước khi tạo combo class để không quên các bước!
