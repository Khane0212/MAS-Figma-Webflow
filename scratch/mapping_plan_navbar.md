# MAPPING PLAN: NAVBAR COMPONENT (nodeID: 715:963)

## A. THÔNG SỐ QUY ĐỔI (Figma Inspection)
- **Kích thước:** Chiều cao chính xác `92px` (5.75rem).
- **Màu sắc:** 
  - Nền: `#1C1E53` (Dark Blue)
  - Link Active (Home): `#FFFFFF`
  - Link Inactive: `#bbbbcb`
  - Viền Button: `rgba(244,246,252,0.2)`
- **Font chữ:** Poppins (16px = 1rem, Medium 500, Line-height 28px = 1.75rem).

---

## B. DOM HIERARCHY & EXACT CSS

```
navbar_component (DOM Tag: <nav>)
│ CSS: bg `#1C1E53`, height `5.75rem`, font-family `"Poppins", sans-serif`
│
└── nav_padding (DivBlock)
    │ CSS: padding-left `10rem`, padding-right `10rem`, height `100%`
    └── container-large (DivBlock)
        │ CSS: height `100%`
        └── nav_flex (DivBlock)
            │ CSS: display flex, justify-content space-between, align-items center, height `100%`
            │
            ├── ── TRÁI (Left) ──
            ├── Image (Logo)
            │   CSS: height `1.5rem` (24px)
            │
            └── ── PHẢI (Right) ──
                └── nav_right-wrapper (DivBlock)
                    │ CSS: display flex, align-items center, gap `3rem` (48px)
                    │
                    ├── nav_links-wrapper (DivBlock)
                    │   │ CSS: display flex, gap `2rem` (32px)
                    │   ├── TextLink "Home" [nav_link is-active] (color #FFFFFF)
                    │   ├── TextLink "About us" [nav_link] (color #bbbbcb)
                    │   ├── TextLink "Features" [nav_link]
                    │   ├── TextLink "Pricing" [nav_link]
                    │   ├── TextLink "FAQ" [nav_link]
                    │   └── TextLink "Blog" [nav_link]
                    │
                    └── Button "Contact us" [button is-nav-outline]
                        CSS (is-nav-outline): padding `1rem 2.875rem`, border `2px solid rgba(244,246,252,0.2)`, border-radius `2.5625rem` (41px), bg `transparent`, color `#FFFFFF`
```

## C. DANH SÁCH CUSTOM/COMBO CLASSES CẦN TẠO
*(Tuân thủ Bước 7 SOP: Phải gán `parent_style_names` cho combo class)*

| Class Name | Loai | Properties / Parent |
|---|---|---|
| `navbar_component` | Custom | `bg-color: #1C1E53`, `height: 5.75rem`, `font-family: Poppins` |
| `nav_padding` | Custom | `padding: 0 10rem`, `height: 100%` |
| `nav_flex` | Custom | `display: flex`, `justify-content: space-between`, `align-items: center`, `height: 100%` |
| `nav_right-wrapper` | Custom | `display: flex`, `align-items: center`, `gap: 3rem` |
| `nav_links-wrapper` | Custom | `display: flex`, `gap: 2rem` |
| `nav_link` | Custom | `text-decoration: none`, `color: #bbbbcb`, `font-size: 1rem`, `font-weight: 500` |
| `is-active` | Combo | Parent: `nav_link`. Override: `color: #FFFFFF` |
| `is-nav-outline` | Combo | Parent: `button`. Override: `bg: transparent`, `border`, `radius`, `color: #FFFFFF`, `padding` |
