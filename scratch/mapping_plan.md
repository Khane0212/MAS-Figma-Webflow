# MAPPING PLAN: Trang Contact Us (nodeID: 363:6)

## THONG TIN CHUNG
- **Site ID**: `69c1f872abdc413d5fc090b2`
- **Font**: Poppins (Regular 400, Medium 500, SemiBold 600)
- **Color Tokens tu Figma**:
  - Dark Blue: `#282938` -> `text-color-primary` / `background-color-primary`
  - Grey: `#F4F6FC` -> `background-color-alternate` (nen form)
  - White: `#FFFFFF` -> `background-color-primary`
  - Yellow: `#FCD980` (dung o Footer contact card)
  - Muted text: `#282938` opacity 70%

## CAU TRUC DOM (Tu ngoai vao trong)

```
page-wrapper (DivBlock)
├── [Navbar] ← Shared Component (xu ly rieng)
├── main-wrapper (DivBlock, tag: <main>)
│   └── section_contact (Section tag)
│       └── padding-global (DivBlock)
│           └── container-large (DivBlock)
│               └── padding-section-large (DivBlock)
│                   └── contact_component (DivBlock)
│                       │
│                       ├── ===== KHOI 1: HEADING =====
│                       ├── contact_heading-wrapper (DivBlock) [text-align-center]
│                       │   ├── Heading H2 → "Contact Us"
│                       │   │   class: [heading-style-h2]
│                       │   └── margin-top margin-small (DivBlock) ← spacer 1rem
│                       │       └── Paragraph → "Lorem ipsum dolor sit amet..."
│                       │           class: [text-size-regular, text-style-muted]
│                       │
│                       ├── ===== SPACER HEADING -> FORM =====
│                       ├── margin-top margin-xlarge (DivBlock) ← spacer ~4rem
│                       │
│                       ├── ===== KHOI 2: FORM =====
│                       │   └── contact_form-block (DivBlock)
│                       │       │   CSS: background #F4F6FC, border-radius 0.75rem,
│                       │       │        padding ~3.5rem 5rem
│                       │       │
│                       │       └── form_component (FormForm/FormWrapper)
│                       │           │
│                       │           ├── ── ROW 1: Name + Email (2 cot) ──
│                       │           ├── contact_form-row (DivBlock)
│                       │           │   CSS: display flex, gap 2rem
│                       │           │   ├── contact_form-field (DivBlock) [flex: 1]
│                       │           │   │   ├── TextBlock "Name"
│                       │           │   │   │   class: [text-size-medium, text-weight-medium]
│                       │           │   │   └── margin-top margin-tiny (DivBlock)
│                       │           │   │       └── Input (placeholder: "Enter your name")
│                       │           │   │           class: [form_input]
│                       │           │   │
│                       │           │   └── contact_form-field (DivBlock) [flex: 1]
│                       │           │       ├── TextBlock "Email"
│                       │           │       │   class: [text-size-medium, text-weight-medium]
│                       │           │       └── margin-top margin-tiny (DivBlock)
│                       │           │           └── Input (placeholder: "Enter your Email")
│                       │           │               class: [form_input]
│                       │           │
│                       │           ├── ── SPACER ROW ──
│                       │           ├── margin-top margin-small (DivBlock) ← 1rem
│                       │           │
│                       │           ├── ── ROW 2: Subject + Subject (2 cot) ──
│                       │           ├── contact_form-row (DivBlock)
│                       │           │   CSS: display flex, gap 2rem
│                       │           │   ├── contact_form-field (DivBlock) [flex: 1]
│                       │           │   │   ├── TextBlock "Subject"
│                       │           │   │   │   class: [text-size-medium, text-weight-medium]
│                       │           │   │   └── margin-top margin-tiny (DivBlock)
│                       │           │   │       └── Input (placeholder: "Provide context")
│                       │           │   │           class: [form_input]
│                       │           │   │
│                       │           │   └── contact_form-field (DivBlock) [flex: 1]
│                       │           │       ├── TextBlock "Subject"
│                       │           │       │   class: [text-size-medium, text-weight-medium]
│                       │           │       └── margin-top margin-tiny (DivBlock)
│                       │           │           └── Input (placeholder: "Select Subject")
│                       │           │               class: [form_input]
│                       │           │
│                       │           ├── ── SPACER ROW ──
│                       │           ├── margin-top margin-small (DivBlock) ← 1rem
│                       │           │
│                       │           ├── ── ROW 3: Message (full width) ──
│                       │           ├── contact_form-field (DivBlock)
│                       │           │   ├── TextBlock "Message"
│                       │           │   │   class: [text-size-medium, text-weight-medium]
│                       │           │   └── margin-top margin-tiny (DivBlock)
│                       │           │       └── Textarea (placeholder: "Write your question here")
│                       │           │           class: [form_input, is-text-area]
│                       │           │
│                       │           ├── ── SPACER -> BUTTON ──
│                       │           ├── margin-top margin-medium (DivBlock) ← 2rem
│                       │           │
│                       │           └── ── SUBMIT BUTTON ──
│                       │               └── Button "Send Messege"
│                       │                   class: [button, is-primary]
│                       │
│                       (het contact_form-block)
│
├── [Footer] ← Shared Component (xu ly rieng)
└── (het page-wrapper)
```

## BANG LIET KE CLASS CAN DUNG

### A. Utility Classes (Da co san / Can kiem tra)
| Class Name               | Loai       | Ghi chu                              |
|:-------------------------|:-----------|:-------------------------------------|
| `page-wrapper`           | Structure  | Boc ngoai cung trang                 |
| `main-wrapper`           | Structure  | Tag `<main>`                         |
| `padding-global`         | Structure  | Padding trai/phai toan cuc           |
| `container-large`        | Structure  | Max-width 80rem, can giua            |
| `padding-section-large`  | Structure  | Padding top/bottom lon               |
| `heading-style-h2`       | Typography | 3rem, SemiBold                       |
| `text-size-regular`      | Typography | 1rem                                 |
| `text-size-medium`       | Typography | 1.25rem (18px)                       |
| `text-style-muted`       | Typography | Opacity 0.6-0.7                      |
| `text-weight-medium`     | Typography | Font-weight 500                      |
| `text-align-center`      | Typography | Can giua                             |
| `margin-top`             | Spacing    | Huong margin                         |
| `margin-tiny`            | Spacing    | 0.125rem                             |
| `margin-small`           | Spacing    | 1rem                                 |
| `margin-medium`          | Spacing    | 2rem                                 |
| `margin-xlarge`          | Spacing    | 4rem                                 |
| `form_component`         | Component  | Boc ngoai Form block                 |
| `form_input`             | Component  | Base class cho input                 |
| `is-text-area`           | Modifier   | Combo class cho textarea             |
| `button`                 | Component  | Base class cho nut                   |
| `is-primary`             | Modifier   | Combo class nut toi (dark)           |

### B. Custom Classes (CAN TAO MOI)
| Class Name                | Loai    | CSS Can Thiet                                          |
|:--------------------------|:--------|:-------------------------------------------------------|
| `contact_component`       | Custom  | Wrapper chinh, co the dung flex column                 |
| `contact_heading-wrapper` | Custom  | text-align: center                                     |
| `contact_form-block`      | Custom  | background: #F4F6FC, border-radius: 0.75rem, padding: 3.5rem 5rem |
| `contact_form-row`        | Custom  | display: flex, gap: 2rem                               |
| `contact_form-field`      | Custom  | flex: 1 (de 2 field chia deu)                          |

## GHI CHU QUAN TRONG
1. **Navbar & Footer**: La Shared Component, kiem tra `shared_components.json` truoc.
   Hien tai `shared_components.json` dang rong `{}` -> Can xac dinh co build Navbar/Footer khong hoac dung component da co tren Webflow.
2. **Form Default Bug**: Sau khi tao FormForm, Webflow se tu sinh input/button mac dinh.
   PHAI xoa/sua cac element mac dinh va gan dung class `form_input`, `button is-primary`.
3. **Don vi**: Tat ca gia tri PX tu Figma -> chuyen sang REM (chia 16).
4. **Heading H2 SEO**: "Contact Us" dung the H2 (khong phai H1, vi H1 thuong danh cho trang chu).
5. **Typo trong Figma**: "Send Messege" -> giu nguyen theo design (hoac hoi user co sua khong).
6. **Input border**: 1px solid rgba(0,0,0,0.12), border-radius 0.5rem -> nen dat trong `form_input` class.
