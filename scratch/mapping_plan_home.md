# MAPPING PLAN: Trang Home (nodeID: 69c1f873abdc413d5fc090da)

## THONG TIN CHUNG
- **Site ID**: `69c1f872abdc413d5fc090b2` (Ngô's Fabulous Site)
- **Font**: `Poppins`
- **Color Tokens tu Figma**:
  - `Trắng`: `#FFFFFF` -> `text-color-white`
  - `Đen / Tối`: `#1B1B1B` -> `text-color-primary`
  - `Xanh (Accent)`: `#D9FB52` -> `text-color-secondary` / `background-color-alternate`

## CAU TRUC DOM & RAW DATA (Tu ngoai vao trong)
> **LUẬT TỐI THƯỢNG:** Mọi khối phải đủ 7 lớp: `Section` -> `Padding-Global` -> `Container` -> `Padding-Section` -> `Component`.

```text
page-wrapper (DivBlock)
├── loader_component (DivBlock, position: fixed)
│   └── loader_mask (DivBlock)
│
├── navbar_component (Nav Tag, position: fixed) ← (Cấu trúc Header/Navbar chuẩn 7 lớp)
│   └── padding-global (DivBlock)
│       └── container-large (DivBlock)
│           └── padding-section-none (DivBlock)
│               └── navbar_container (DivBlock)
│                   ├── navbar_logo-wrapper (DivBlock)
│                   │   └─ Logo SVG letters (S-P-O-R-T-L-I-N-K)
│                   └── navbar_content (DivBlock)
│                       ├── text-size-medium (P)
│                       │   └─ TEXT: "Watch epic sports in 4k..."
│                       └── button-group (DivBlock)
│                           ├── button is-secondary (LinkBlock)
│                           └── button is-primary (LinkBlock)
│
├── navbar_menu-wrapper (DivBlock, position: fixed) ← (Menu Fullscreen)
│   └── padding-global (DivBlock)
│       └── container-large (DivBlock)
│           └── padding-section-medium (DivBlock)
│               └── menu_component (DivBlock)
│                   ├── menu_header (Flex)
│                   └── menu_sport-list-wrapper (Collection List)
│
├── main-wrapper (Tag: <main>)
│   │
│   ├── section_hero (Tag: <section>)
│   │   ├── hero_background-video (DivBlock, position: absolute)
│   │   └── padding-global (DivBlock)
│   │       └── container-large (DivBlock)
│   │           └── padding-section-large (DivBlock)
│   │               └── hero_component (DivBlock) ← (Spacer rỗng để giữ diện tích video)
│   │
│   └── paper_component (DivBlock - Khối giấy trắng)
│       │
│       ├── section_features (Tag: <section>)
│       │   └── padding-global (DivBlock)
│       │       └── container-large (DivBlock)
│       │           └── padding-section-medium (DivBlock)
│       │               └── features_component (DivBlock)
│       │                   ├── features_grid (Grid)
│       │                   │   └─ feature_items (Go, Plan, Manage)
│       │                   └── marquee_component (DivBlock)
│       │                       └─ TEXT: "// Unleasing the power... //"
│       │
│       ├── section_recent-events (Tag: <section>)
│       │   └── padding-global (DivBlock)
│       │       └── container-large (DivBlock)
│       │           └── padding-section-medium (DivBlock)
│       │               └── events_component (DivBlock)
│       │                   ├── events_header (Flex: Title + View all)
│       │                   └── swiper_component (DivBlock)
│       │
│       ├── section_members (Tag: <section>)
│       │   └── padding-global (DivBlock)
│       │       └── container-large (DivBlock)
│       │           └── padding-section-medium (DivBlock)
│       │               └── members_component (DivBlock)
│       │                   └── member_card (Grid)
│       │
│       └── section_calendar (Tag: <section>)
│           └── padding-global (DivBlock)
│               └── container-large (DivBlock)
│                   └── padding-section-medium (DivBlock)
│                       └── calendar_component (DivBlock)
│                           ├── calendar_header (Title)
│                           ├── calendar_filter (Form)
│                           └── calendar_list (Collection List)
│
└── section_footer (Tag: <section>)
    └── padding-global (DivBlock)
        └── container-large (DivBlock)
            └── padding-section-medium (DivBlock)
                └── footer_component (DivBlock)
                    ├── footer_header (BE EPIC)
                    ├── footer_content (Text + Links)
                    └── footer_copyright
```

## BANG LIET KE CLASS CAN DUNG

### A. Utility & Combo Classes
| Class Name (Base + Combo)                | Loai       | Ghi chu                              |
|:-----------------------------------------|:-----------|:-------------------------------------|
| `page-wrapper`                           | Structure  | Bọc ngoài cùng trang                 |
| `main-wrapper`                           | Structure  | Tag `<main>`                         |
| `padding-global`                         | Structure  | Padding trái/phải toàn cục           |
| `container-large`                        | Structure  | Max-width 80rem, căn giữa            |
| `padding-section-large`                  | Structure  | Padding top/bottom lớn (6-10rem)     |
| `padding-section-medium`                 | Structure  | Padding top/bottom vừa (4-6rem)      |
| `padding-section-none`                   | Structure  | No padding (thường cho Navbar)       |

### B. Custom Classes (CAN TAO MOI)
| Class Name                    | Loai    | CSS Can Thiet                                          |
|:------------------------------|:--------|:-------------------------------------------------------|
| `navbar_component`            | Custom  | Thẻ Nav chính, `position: fixed`                       |
| `navbar_container`            | Custom  | Lớp Component bọc nội dung Navbar                      |
| `paper_component`             | Custom  | Wrapper tờ giấy trắng (BG trắng, border-radius)        |
| `[name]_component`            | Custom  | Lớp Component cuối cùng của mỗi section                |

## GHI CHU QUAN TRONG
1. **[Navbar Content]**: Toàn bộ Text "Watch epic..." và Logo SVG khổng lồ được đưa vào `navbar_container` để phục vụ animation scroll.
2. **[Sự nhất quán]**: Không section nào được phép thiếu các lớp Wrapper trung gian.
3. **[Footer]**: Đã được chuyển thành `section_footer` đúng chuẩn 7 lớp.