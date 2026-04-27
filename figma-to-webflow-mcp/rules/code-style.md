# Code Style Rules

## 🏗️ Core Structure (Bắt buộc)

### Page Layout Hierarchy
```
.page-wrapper
  └── .main-wrapper
      └── .section_[name]
          └── .padding-global
              └── .container-[size]
                  └── .padding-section-[size]
                      └── CONTENT
```

### Ví dụ đầy đủ:
```html
<div class="page-wrapper">
  <div class="main-wrapper">
    <section class="section_hero">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-large">
            <!-- Hero content here -->
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
```

### Core Classes

| Class | Purpose |
|-------|---------|
| `.page-wrapper` | Wrap toàn bộ trang |
| `.main-wrapper` | Wrap nội dung chính (không include nav/footer) |
| `.section_[name]` | Define section theo chức năng |
| `.padding-global` | Horizontal padding responsive (1.5rem → 3rem) |
| `.container-large` | 80rem (1280px) - Main content container |
| `.container-medium` | 64rem (1024px) - Medium content |
| `.container-small` | 48rem (768px) - Small content, text blocks |
| `.padding-section-small` | 3rem vertical |
| `.padding-section-medium` | 5rem vertical |
| `.padding-section-large` | 7rem vertical |

---

### 🛑 COMBO CLASSES PATTERN (ÁP DỤNG MỌI TRƯỜNG HỢP)

> **Pattern bắt BUỘC cho mọi variant classes - phải tạo base class trước, combo class sau**

**Cấu trúc:**

| Loại | Base Class | Combo Class | Khi Apply |
|------|-----------|-------------|----------|
| Button | `button` | `is-primary`, `is-secondary`, `is-text` | ["button", "is-primary"] |
| Background | `background` | `is-dark`, `is-light`, `is-accent` | ["background", "is-dark"] |
| Text | `text` | `is-muted`, `is-error`, `is-success` | ["text", "is-muted"] |
| Layout | `container` | `is-fluid`, `is-narrow` | ["container", "is-fluid"] |

**SAI (TUYỆT ĐỐI TRÁNH):**
- ❌ Tạo `button is-primary` là standalone class chứa toàn bộ styles
- ❌ Tạo `background is-dark` là standalone class
- ❌ Gộp tên: `button is-primary` = 1 class

**ĐÚNG (BẮT BUỘC):**
- ✅ Tạo `button` (base) trước - chứa padding, font, radius...
- ✅ Tạo `is-primary` (combo) với `parent_style_names: ["button"]` - CHỈ chứa override
- ✅ Tạo `background` (base) trước
- ✅ Tạo `is-dark` (combo) với `parent_style_names: ["background"]`
- ✅ `isComboClass: true` cho combo classes
- ✅ Khi apply: `style_names: ["button", "is-primary"]` (2 classes riêng biệt)
- ✅ Verify: kiểm tra `isComboClass: true` sau khi tạo

---

### 🛑 QUY TẮC TẠO STYLE TRONG WEBFLOW

1. **Tạo styles bằng Style Tool** trước khi build content
2. **Đặt tên theo Client-First**: `heading-style-h1`, `text-size-regular`, `button is-primary` 
3. **Verify tên class đúng** trước khi publish
4. **WHTML Builder chỉ dùng để layout**, Style Tool dùng để tạo classes

---

## REM Units

### Nguyên tắc
- **ALWAYS** sử dụng REM cho mọi kích thước
- Base font-size: 16px (1rem = 16px)

### Conversion
```
px → rem (divide by 16)
4px   = 0.25rem
8px   = 0.5rem
12px  = 0.75rem
16px  = 1rem
20px  = 1.25rem
24px  = 1.5rem
32px  = 2rem
48px  = 3rem
64px  = 4rem
```

## Flexbox & Grid

### Khi nào dùng Flexbox
- Navigation menus
- Button groups
- Card layouts đơn giản
- Centering single elements

### Khi nào dùng Grid
- Complex page layouts
- Card grids
- Masonry layouts
- Multi-dimensional layouts

## Responsive

### Mobile-first approach
```css
/* Mobile styles first */
.component { }

/* Tablet */
@media (min-width: 768px) {
  .component { }
}

/* Desktop */
@media (min-width: 992px) {
  .component { }
}
```
