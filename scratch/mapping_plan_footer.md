# MAPPING PLAN: FOOTER COMPONENT (nodeID: 706:590)

## A. THÔNG SỐ QUY ĐỔI (Figma Inspection)
- **Màu sắc:** 
  - Nền trên (Top): `#1C1E53` (Dark Blue)
  - Nền dưới (Bottom): `#FFFFFF` (White)
  - Card Liên hệ: `#FCD980` (Yellow)
  - Chữ trắng: `#FFFFFF` (Heading), `#F4F6FC` opacity 80% (Paragraph)
  - Chữ đen: `#282938` (Copyright, Links, Info Text)
- **Font chữ:** Poppins toàn bộ.

---

## B. DOM HIERARCHY & EXACT CSS

```
footer_component (DOM Tag: <footer>)
│
├── footer_top-wrapper (DivBlock)
│   │ CSS: bg `#1C1E53`, padding-top `6rem`, padding-bottom `0rem`
│   └── padding-global
│       └── container-large
│           └── footer_top-grid (DivBlock)
│               │ CSS: display grid, grid-template-columns `1fr 1fr`, gap `8.8125rem`, align-items start
│               │
│               ├── ── CỘT TRÁI (Left Column) ──
│               ├── footer_col-left (DivBlock)
│               │   │ CSS: display flex, flex-direction column, max-width `32.3125rem`
│               │   ├── Image (Logo)
│               │   │   CSS: height `2rem` (32px), margin-bottom `1.5rem` (24px)
│               │   ├── Paragraph ("We are always open...")
│               │   │   class: [text-size-regular, text-style-muted] + CSS: color `#F4F6FC`, margin-bottom `5.375rem` (86px)
│               │   │
│               │   └── footer_contact-card (DivBlock)
│               │       │ CSS: bg `#FCD980`, padding `1.125rem 2rem` (18px 32px), display flex, gap `3rem` (48px)
│               │       ├── footer_contact-item (DivBlock)
│               │       │   ├── TextBlock "Email me at" [text-size-medium, text-weight-medium] (color #282938)
│               │       │   └── TextBlock "contact@website.com" [text-size-regular] (opacity 80%)
│               │       └── footer_contact-item (DivBlock)
│               │           ├── TextBlock "Call us" [text-size-medium, text-weight-medium]
│               │           └── TextBlock "0927 6277 28525" [text-size-regular] (opacity 80%)
│               │
│               └── ── CỘT PHẢI (Right Column) ──
│                   └── footer_col-right (DivBlock)
│                       │ CSS: display flex, flex-direction column, max-width `25rem`
│                       ├── H2 "Lets Talk!" 
│                       │   class: [heading-style-h2] + CSS: color `#FFFFFF`, margin-bottom `0.875rem` (14px)
│                       ├── Paragraph ("We are always open...")
│                       │   class: [text-size-regular, text-style-muted] + CSS: color `#F4F6FC`, margin-bottom `3.5rem` (56px)
│                       └── footer_social-wrapper (DivBlock)
│                           │ CSS: display flex, gap `1.5rem` (24px)
│                           ├── Image (Facebook) [icon-1x1-small]
│                           ├── Image (Twitter) [icon-1x1-small]
│                           ├── Image (Instagram) [icon-1x1-small]
│                           └── Image (LinkedIn) [icon-1x1-small]
│
└── footer_bottom-wrapper (DivBlock)
    │ CSS: bg `#FFFFFF`, padding `2rem 0` (32px 0)
    └── padding-global
        └── container-large
            └── footer_bottom-flex (DivBlock)
                │ CSS: display flex, justify-content space-between, align-items center
                ├── TextBlock "Copyright 2021..." 
                │   class: [text-size-regular, text-weight-medium] + CSS: color `#282938`
                └── footer_links-wrapper (DivBlock)
                    │ CSS: display flex, gap `2rem` (32px)
                    ├── TextLink "Home" [text-size-regular, text-weight-medium, text-color-primary]
                    ├── TextLink "About us"
                    ├── TextLink "Features"
                    ├── TextLink "Pricing"
                    ├── TextLink "FAQ"
                    └── TextLink "Blog"
```

## C. DANH SÁCH CUSTOM CLASSES CẦN TẠO
| Class Name | Thuộc tính CSS (Pixel-perfect) |
|---|---|
| `footer_component` | `font-family: "Poppins", sans-serif` |
| `footer_top-wrapper` | `background-color: #1c1e53`, `padding-top: 6rem` |
| `footer_top-grid` | `display: grid`, `grid-template-columns: 1fr 1fr`, `grid-column-gap: 8.8125rem` |
| `footer_col-left` | `display: flex`, `flex-direction: column`, `max-width: 32.3125rem` |
| `footer_col-right` | `display: flex`, `flex-direction: column`, `max-width: 25rem` |
| `footer_contact-card` | `background-color: #fcd980`, `padding: 1.125rem 2rem`, `display: flex`, `gap: 3rem`, `color: #282938` |
| `footer_social-wrapper` | `display: flex`, `gap: 1.5rem` |
| `footer_bottom-wrapper` | `background-color: #ffffff`, `padding-top: 2rem`, `padding-bottom: 2rem` |
| `footer_bottom-flex` | `display: flex`, `justify-content: space-between`, `align-items: center` |
| `footer_links-wrapper` | `display: flex`, `gap: 2rem` |
| `text-style-footer-p` | `color: #f4f6fc`, `opacity: 0.8`, `line-height: 1.75rem` |