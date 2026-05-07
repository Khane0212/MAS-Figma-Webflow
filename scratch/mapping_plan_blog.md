# MAPPING PLAN: Trang Blog Page (nodeID: 89:117)

## THONG TIN CHUNG
- **Site ID**: `69d878332f3a71727615fabf`
- **Font**: Poppins (Regular 400, Medium 500, SemiBold 600)
- **Color Tokens tu Figma**:
  - `Dark blue`: `#282938` -> `text-color-primary`
  - `Royal Blue`: `#2405F2` -> `text-color-accent` (Custom)
  - `Tint blue`: `#1C1E53` -> `text-color-secondary`
  - `Grey`: `#F4F6FC` -> `background-color-grey` (Custom)
  - `White`: `#FFFFFF` -> `text-color-white`

## CAU TRUC DOM & RAW DATA (Tu ngoai vao trong)

```text
page-wrapper (DivBlock)
├── [Navbar] ← Shared Component (node-id="715:924")
├── main-wrapper (DivBlock, tag: <main>)
│   │
│   ├── section_blog-featured (Section tag, node-id="778:538")
│   │   └── padding-global (DivBlock)
│   │       └── container-large (DivBlock)
│   │           └── padding-section-large (DivBlock) <-- Padding-top: 8rem (128px)
│   │               └── blog_featured-component (DivBlock)
│   │                   │
│   │                   ├── ===== KHOI 1: HEADING =====
│   │                   ├── blog_featured-heading-wrapper (DivBlock, display: flex, direction: column, align: center) <-- CSS: margin-bottom: 2rem
│   │                   │   ├── heading-style-h2 text-align-center (H1)
│   │                   │   │   └─ TEXT: "A UX Case Study on Creating a Studious Environment for Students"
│   │                   │   │
│   │                   │   └── blog_featured-meta (DivBlock, display: flex, gap: 1rem)
│   │                   │       ├── text-size-regular text-weight-medium (P)
│   │                   │       │   └─ TEXT: "Andrew Jonson"
│   │                   │       └── text-size-regular (P)
│   │                   │           └─ TEXT: "Posted on 27th January 2021"
│   │                   │
│   │                   ├── ===== KHOI 2: FEATURED IMAGE =====
│   │                   ├── blog_featured-image-wrapper (DivBlock) <-- CSS: Width 100%, Height: 29.8125rem (477px), margin-bottom: 3rem
│   │                   │   └── blog_featured-image (Image)
│   │                   │
│   │                   ├── ===== KHOI 3: SUMMARY =====
│   │                   ├── blog_featured-summary-wrapper (DivBlock, max-width: 51.9375rem / 831px, margin: 0 auto)
│   │                   │   ├── text-size-regular text-style-muted text-align-center (P) <-- CSS: margin-bottom: 1rem
│   │                   │   │   └─ TEXT: "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside."
│   │                   │   │
│   │                   │   └── text-align-center (DivBlock)
│   │                   │       └── text-size-regular text-weight-medium text-color-accent (A)
│   │                   │           └─ TEXT: "Read more"
│   │
│   ├── section_blog_list (Section tag, node-id="239:80")
│   │   └── padding-global (DivBlock)
│   │       └── container-large (DivBlock)
│   │           └── padding-section-large (DivBlock)
│   │               └── blog_list-component (DivBlock)
│   │                   │
│   │                   ├── heading-style-h2 text-align-center (H2) <-- CSS: margin-bottom: 4rem
│   │                   │   └─ TEXT: "Our Blog"
│   │                   │
│   │                   └── blog_list-grid (DivBlock, display: grid, columns: 3, gap: 2rem)
│   │                       │
│   │                       └── blog_item (DivBlock, display: flex, direction: column)
│   │                           ├── blog_item-image-wrapper (DivBlock, height: 17.8125rem / 285px)
│   │                           │   └── blog_item-image (Image)
│   │                           │
│   │                           └── blog_item-content (DivBlock, margin-top: 2rem)
│   │                               ├── text-size-small text-style-muted (P)
│   │                               │   └─ TEXT: "27 Jan 2021"
│   │                               │
│   │                               ├── heading-style-h6 (H3)
│   │                               │   └─ TEXT: "How one Webflow user grew his single person consultancy from $0-100K in 14 months"
│   │                               │
│   │                               ├── text-size-regular text-style-muted (P)
│   │                               │   └─ TEXT: "See how pivoting to Webflow changed one person’s sales strategy and allowed him to attract"
│   │                               │
│   │                               └── blog_item-link (Link Block, display: flex, align: center, gap: 0.75rem, margin-top: 1.5rem)
│   │                                   ├── text-size-regular text-weight-medium (Text)
│   │                                   │   └─ TEXT: "Read More"
│   │                                   └── blog_item-link-icon (Icon)
│
├── [Footer] ← Shared Component (node-id="904:788")
└── (het page-wrapper)
```

## BANG LIET KE CLASS CAN DUNG

### A. Utility & Combo Classes (Da co san / Can kiem tra)
| Class Name (Base + Combo)                | Loai       | Ghi chu / Kich thuoc                 |
|:-----------------------------------------|:-----------|:-------------------------------------|
| `page-wrapper`                           | Structure  | Boc ngoai cung trang                 |
| `main-wrapper`                           | Structure  | Tag `<main>`                         |
| `padding-global`                         | Structure  | Padding trai/phai 2.5rem             |
| `container-large`                        | Structure  | Max-width 80rem (1280px)             |
| `padding-section-large`                  | Structure  | Padding top/bottom 6rem (96px)       |
| `heading-style-h2`                       | Typography | Font-size 3rem, SemiBold             |
| `heading-style-h6`                       | Typography | Font-size 1.5rem, Medium             |
| `text-size-regular`                      | Typography | Font-size 1rem                       |
| `text-size-small`                        | Typography | Font-size 0.875rem                   |
| `text-weight-medium`                     | Typography | Font-weight 500                      |
| `text-style-muted`                       | Typography | Opacity 0.7                          |
| `text-align-center`                      | Typography | Align center                         |
| `margin-bottom margin-small`             | Spacing    | Margin-bottom 1rem                   |
| `margin-bottom margin-medium`            | Spacing    | Margin-bottom 2rem                   |
| `margin-bottom margin-large`             | Spacing    | Margin-bottom 3rem                   |
| `margin-bottom margin-huge`              | Spacing    | Margin-bottom 4rem                   |

### B. Custom Classes (CAN TAO MOI)
| Class Name                | Loai    | CSS Can Thiet                                          |
|:--------------------------|:--------|:-------------------------------------------------------|
| `blog_featured-image-wrapper`| Custom  | Width: 100%, Height: 29.8125rem, Overflow: Hidden     |
| `blog_list-grid`          | Custom  | Display: Grid, Grid-template-columns: 1fr 1fr 1fr, Gap: 2rem |
| `blog_item-image-wrapper` | Custom  | Width: 100%, Height: 17.8125rem, Radius: 0            |
| `text-color-accent`       | Utility | Color: #2405F2                                         |

## GHI CHU QUAN TRONG
1. **Navbar & Footer**: Su dung component da build san (Shared Components).
2. **Don vi**: Tat ca spacing va size chuyen sang REM (PX/16).
3. **Noi dung Text**: Copy chinh xac tu raw data XML de dam bao khong sai sot.
4. **Responsive**: Grid 3 cot se chuyen ve 1 cot tren Mobile (Tiny). `blog_featured-image-wrapper` reset height ve auto tren Mobile.
