# Code Style Rules

## Client-First Methodology

### Cấu trúc thư mục Class
```
.[page/section]-[block]-[element]-[modifier]
```

### Quy tắc đặt tên Class

#### 1. Page/Section (Bối cảnh cao nhất)
- `.home-hero` - Hero section trang Home
- `.about-team` - Team section trang About
- `.product-detail` - Detail page của Product

#### 2. Block (Khối chức năng)
- `.hero-wrapper` - Wrapper của hero
- `.navbar-container` - Container của navbar
- `.card-component` - Component card
- `.form-block` - Block form

#### 3. Element (Phần tử con)
- `.hero-heading` - Heading trong hero
- `.card-image` - Image trong card
- `.form-input` - Input trong form

#### 4. Modifier (Trạng thái/Biến thể)
- `.button-primary` - Button kiểu primary
- `.card-large` - Card size lớn
- `.text-center` - Text căn giữa
- `.is-active` - Trạng thái active
- `.is-hidden` - Trạng độ ẩn

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
