# MAPPING PLAN: Trang Home (nodeID: 69c1f873abdc413d5fc090da)

## THONG TIN CHUNG
- **Site ID**: `69c1f872abdc413d5fc090b2` (Ngô's Fabulous Site)
- **Font**: `Poppins` (Mặc định từ hệ thống)
- **Color Tokens tu Figma**:
  - `Trắng`: `#FFFFFF` -> `text-color-white`
  - `Đen / Tối`: `#1B1B1B` -> `text-color-primary`
  - `Xanh (Accent)`: `#D9FB52` -> `text-color-secondary` / `background-color-alternate`
  - `Hồng`: `#FB52D9` (Phát hiện trong custom CSS)

## CAU TRUC DOM & RAW DATA (Tu ngoai vao trong)
Cấu trúc đã được tinh chỉnh để phục vụ hiệu ứng Scroll-to-Sticky của Navbar và chuẩn Client-First.

```text
page-wrapper (DivBlock)
├── loader_component (DivBlock)
│   └── loader_mask (DivBlock)
│       └── loader_logo-wrapper
│
├── navbar_component (DivBlock) ← (Đóng vai trò Hero Overlay ban đầu, animate thành Sticky Header)
│   ├── navbar_logo-wrapper (DivBlock)
│   │   └─ Logo SVG letters (S-P-O-R-T-L-I-N-K để animate thu nhỏ lại)
│   ├── navbar_content (DivBlock)
│   │   ├── text-size-medium text-color-white (P)
│   │   │   └─ TEXT: "Watch epic sports in 4k streaming video on demand. Share special moments with other fans and connect to the best community for sports fans."
│   │   └── button-group (DivBlock)
│   │       ├── button is-secondary is-white (LinkBlock)
│   │       │   └─ TEXT: "Login"
│   │       └── button is-primary (LinkBlock)
│   │           └─ TEXT: "Discover"
│   │
│   └── navbar_menu-wrapper (DivBlock) ← (Biến đổi từ menu-mask hiện tại, menu fullscreen)
│       ├── menu_header (DivBlock)
│       │   ├── heading-style-h2 (DivBlock)
│       │   │   └─ TEXT: "DISCOVER"
│       │   └── menu_close-button (DivBlock)
│       └── menu_sport-list-wrapper (Collection List Wrapper)
│           └─ ... (CMS Items: Winter Sports, Extreme, etc.)
│
├── main-wrapper (DivBlock, tag: <main>)
│   │
│   ├── section_hero (Section tag)
│   │   └── hero_background-video (Background Video Component)
│   │       └─ Video làm nền tĩnh cho Navbar overlay phía trên
│   │
│   └── paper_component (DivBlock)
│       │
│       ├── paper_features (Section tag) ← (Biến đổi từ maquee-section cũ)
│       │   ├── features_grid (DivBlock)
│       │   │   ├── feature_item (Go + Icon)
│       │   │   ├── feature_item (Plan + Icon)
│       │   │   └── feature_item (manage + Icon)
│       │   └── marquee_component (DivBlock)
│       │       └── marquee_content (DivBlock)
│       │           └─ TEXT: "// Unleasing the power of sporting events //"
│       │
│       ├── paper_recent-events (Section tag)
│       │   └── padding-global (DivBlock)
│       │       └── container-large (DivBlock)
│       │           └── padding-section-medium (DivBlock)
│       │               ├── events_header (DivBlock)
│       │               │   ├── heading-style-h3 (H2)
│       │               │   │   └─ TEXT: "Event recent"
│       │               │   └── button is-secondary (LinkBlock)
│       │               │       └─ TEXT: "View all"
│       │               └── swiper_component (DivBlock) ← (Swiper slider)
│       │
│       ├── paper_members (Section tag)
│       │   └── padding-global (DivBlock)
│       │       └── container-large (DivBlock)
│       │           └── padding-section-medium (DivBlock)
│       │               └── member_card (DivBlock)
│       │                   ├── heading-style-h3 (H2)
│       │                   │   └─ TEXT: "MEMBER ONLY"
│       │                   └── ... (Grid CMS Items)
│       │
│       └── paper_calendar (Section tag)
│           └── padding-global (DivBlock)
│               └── container-large (DivBlock)
│                   └── padding-section-medium (DivBlock)
│                       ├── calendar_header (DivBlock)
│                       │   └── heading-style-h2 (H2)
│                       │       └─ TEXT: "Calender of events"
│                       ├── calendar_filter (Form Block)
│                       │   ├── heading-style-h4 (H3)
│                       │   │   └─ TEXT: "Show me"
│                       │   └── Filter checkboxes (Winter Sports, Extreme,...)
│                       └── calendar_list (Collection List Wrapper)
│                           └─ ... (CMS Items)
│
└── footer_component (Footer tag) ← (Tách footer-section khỏi paper-wrapper)
    └── padding-global (DivBlock)
        └── container-large (DivBlock)
            └── padding-section-medium (DivBlock)
                ├── footer_header (DivBlock)
                │   └─ TEXT: "BE EPIC"
                ├── footer_content-wrapper (DivBlock)
                │   ├── text-size-regular (P)
                │   │   └─ TEXT: "WATCH EPIC SPORTS IN 4K STREAMING VIDEO ON DEMAND. SHARE SPECIAL MOMENTS WITH OTHER FANS AND CONNECT TO THE BEST COMMUNITY FOR SPORTS FANS."
                │   └── footer_links-grid (DivBlock)
                │       └─ Links (Member zone, Instagram,...)
                └── footer_copyright (DivBlock)
                    └─ TEXT: "All right reserverd"
```

## BANG LIET KE CLASS CAN DUNG

### A. Utility & Combo Classes
| Class Name (Base + Combo)                | Loai       | Ghi chu                              |
|:-----------------------------------------|:-----------|:-------------------------------------|
| `page-wrapper`                           | Structure  | Bọc ngoài cùng trang                 |
| `main-wrapper`                           | Structure  | Tag `<main>`                         |
| `padding-global`                         | Structure  | Padding trái/phải toàn cục           |
| `container-large`                        | Structure  | Max-width 80rem, căn giữa            |
| `padding-section-medium`                 | Structure  | Padding top/bottom vừa (cho Sections)|
| `margin-bottom` + `margin-small`         | Utility    | Spacer 1rem                          |
| `margin-bottom` + `margin-medium`        | Utility    | Spacer 2rem                          |
| `heading-style-h1` -> `h4`               | Typography | Kích thước chuẩn cho tiêu đề         |
| `text-size-medium`, `text-size-regular`  | Typography | Kích thước chữ                       |
| `text-weight-bold`                       | Typography | Chữ đậm                              |
| `text-color-white`, `text-color-primary` | Utility    | Màu chữ                              |
| `button` + `is-primary`                  | Component  | Nút bấm chính                        |
| `button` + `is-secondary`                | Component  | Nút bấm phụ (View all, Login)        |
| `button-group`                           | Utility    | Bọc các nút nằm ngang (Flex gap)     |

### B. Custom Classes (CAN TAO MOI)
| Class Name                    | Loai    | CSS Can Thiet                                          |
|:------------------------------|:--------|:-------------------------------------------------------|
| `loader_component`, `loader_mask`| Custom | Quản lý màn hình loading toàn trang                    |
| `navbar_component`            | Custom  | Bọc toàn bộ Header/Nav, `position: fixed`, z-index cao |
| `navbar_logo-wrapper`         | Custom  | Bọc các chữ cái SVG để làm animation thu nhỏ           |
| `navbar_content`              | Custom  | Bọc text và button group để ẩn đi khi scroll           |
| `navbar_menu-wrapper`         | Custom  | Bọc menu overlay toàn màn hình (thay thế menu-mask)    |
| `hero_background-video`       | Custom  | Lớp nền video `position: absolute`, z-index -1         |
| `paper_component`             | Custom  | Wrapper tờ giấy trắng (border-radius, shadow)          |
| `paper_features`, `paper_recent-events`, v.v. | Custom | Sections con bên trong tờ giấy     |
| `marquee_component`           | Custom  | Bọc hiệu ứng chữ chạy ngang                            |
| `footer_component`            | Custom  | `<footer>` chính, nằm ngoài tờ giấy                    |

## GHI CHU QUAN TRONG
1. **[Navbar Animation]**: `navbar_component` đóng vai trò là khối Header overlay lớn lúc ban đầu, sau đó thu nhỏ thành sticky navbar khi cuộn trang. Nội dung chữ và nút bên trong sẽ được thiết lập animation để mờ đi.
2. **[Refactor]**: Xóa bỏ hoàn toàn các class rác mang hậu tố số và các class mặc định `text-block-5`, `text-block-6`.
3. **[Empty Section]**: Thay thế hoàn toàn thẻ `empty-section` bằng cấu trúc Div kết hợp Utility class `margin-bottom`.
4. **[Footer]**: Chắc chắn rằng Footer được gắp ra khỏi `paper_component` và nằm độc lập ở cuối trang.