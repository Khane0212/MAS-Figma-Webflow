# MAPPING PLAN: Trang Contact Us (nodeID: 363:6)

## THONG TIN CHUNG
- **Site ID**: 69d878332f3a71727615fabf
- **Font**: Poppins (Medium 500, Regular 400, SemiBold 600)
- **Color Tokens tu Figma**:
  - `#F4F6FC`: `[Color: Light Grey]` -> `bg-light-grey` (or similar utility if exists)
  - `#FFFFFF`: `[Color: White]` -> `bg-white` / `text-white`
  - `#1A1A1A`: `[Color: Dark Text]` -> `text-dark`
  - `#1c1e53`: `[Color: Dark Blue]` -> `bg-dark-blue`
  - `#f4f6fc`: `[Color: Light Grey background for form]` -> `bg-light-grey`
  - `#282938`: `[Color: Primary Dark]` -> `bg-primary-dark`, `text-primary-dark`
  - `#fcd980`: `[Color: Yellow Accent]` -> `bg-yellow-accent`
  - `#bbbbcb`: `[Color: Secondary Text]` -> `text-secondary-grey`
  - `#f4f6fc` (opacity 80%): `[Color: Light Grey with opacity]` -> `text-light-grey-opacity-80`
  - `#282938` (opacity 80%): `[Color: Primary Dark with opacity]` -> `text-primary-dark-opacity-80`
  - `#282938` (in footer): `[Color: Footer Text]` -> `text-footer-dark`
  - `#f4f6fc` (in button): `[Color: Button Text]` -> `text-button-light`

## CAU TRUC DOM (Tu ngoai vao trong)

```text
page-wrapper (DivBlock)
├── section-navbar (DivBlock/Section - Assuming Navbar is a section for now)
│   ├── padding-global (DivBlock)
│   │   └── container-large (DivBlock)
│   │       └── padding-section-small (DivBlock)
│   │           └── navbar_component (DivBlock)
│   │               ├── Logo (Image element)
│   │               ├── Home (Text element)
│   │               ├── About us (Text element)
│   │               ├── Features (Text element)
│   │               ├── Pricing (Text element)
│   │               ├── FAQ (Text element)
│   │               ├── Blog (Text element)
│   │               └── Button: Contact us (Button element)
│
├── main-wrapper (DivBlock, tag: <main>)
│   └── section-contact-us (Section tag)
│       └── padding-global (DivBlock)
│           └── container-large (DivBlock)
│               └── padding-section-medium (DivBlock)
│                   └── contact-us_component (DivBlock)
│                       
│                       ├── ===== KHỐI TIÊU ĐỀ LIÊN HỆ =====
│                       ├── heading-contact-us (DivBlock - wrapper for heading and paragraph)
│                       │   ├── Contact Us (Heading H1 or H2)
│                       │   └── (Paragraph below heading)
│                       │
│                       ├── ===== KHOẢNG CÁCH =====
│                       ├── margin-section-large (DivBlock - spacer 6rem)
│                       │
│                       ├── ===== KHỐI FORM =====
│                       ├── contact-form_wrapper (DivBlock - wrapper for the form elements)
│                       │   ├── Form Block (Form element - form_component)
│                       │   │   ├── Form Row 2-Col (DivBlock - contact-form_row-2-col)
│                       │   │   │   ├── Column 1 (DivBlock - contact-form_field-wrapper)
│                       │   │   │   │   ├── Label: Name (form_label)
│                       │   │   │   │   └── Input: Enter your name (form_input)
│                       │   │   │   └── Column 2 (DivBlock - contact-form_field-wrapper)
│                       │   │   │       ├── Label: Email (form_label)
│                       │   │   │       └── Input: Enter your Emial (form_input)
│                       │   │   ├── Form Row 2-Col (DivBlock - contact-form_row-2-col)
│                       │   │   │   ├── Column 1 (DivBlock - contact-form_field-wrapper)
│                       │   │   │   │   ├── Label: Subject (form_label)
│                       │   │   │   │   └── Input: Provide context (form_input)
│                       │   │   │   └── Column 2 (DivBlock - contact-form_field-wrapper)
│                       │   │   │       ├── Label: Subject (form_label)
│                       │   │   │       └── Input: Select Subject (form_input)
│                       │   │   ├── Form Row 1-Col (DivBlock - contact-form_row-1-col)
│                       │   │   │   ├── Label: Message (form_label)
│                       │   │   │   └── Textarea: Write your question here (form_input is-text-area)
│                       │   │   └── Button: Send Messege (Button element - button is-primary contact-form_button)
│                       │   └── (End Form Element)
│                       │
│                       ├── ===== KHOẢNG CÁCH =====
│                       ├── margin-section-medium (DivBlock - spacer 3rem)
│                       │
│                       └── ===== KHOI CUOI (KHONG CO) =====
│
├── section-footer (DivBlock/Section - Assuming Footer is a section)
│   ├── padding-global (DivBlock)
│   │   └── container-large (DivBlock)
│   │       └── padding-section-large (DivBlock)
│   │           └── footer_component (DivBlock)
│   │               ├── Footer Content Area (DivBlock)
│   │               │   ├── Social Media Icons (DivBlock)
│   │               │   │   ├── Facebook Icon
│   │               │   │   ├── Twitter Icon
│   │               │   │   ├── Instagram Icon
│   │               │   │   └── LinkedIn Icon
│   │               │   ├── Text: We are always open... (Paragraph)
│   │               │   ├── Heading: Lets Talk! (Heading H2)
│   │               │   └── Contact Info (DivBlock)
│   │               │       ├── Email: contact@website.com (Text)
│   │               │       ├── Call us: 0927 6277 28525 (Text)
│   │               ├── Footer Links Area (DivBlock)
│   │               │   ├── Home (Text)
│   │               │   ├── About us (Text)
│   │               │   ├── Features (Text)
│   │               │   ├── Pricing (Text)
│   │               │   ├── FAQ (Text)
│   │               │   └── Blog (Text)
│   │               ├── Logo (Image element)
│   │               └── Copyright Text (Text element)
│
└── (het page-wrapper)
```

## BANG LIET KE CLASS CAN DUNG

### A. Utility Classes (Da co san / Can kiem tra)
| Class Name               | Loai       | Ghi chu                              |
|:-------------------------|:-----------|:-------------------------------------|
| `page-wrapper`           | Structure  | Boc ngoai cung trang                 |
| `main-wrapper`           | Structure  | Tag `<main>`                         |
| `padding-global`         | Structure  | Padding trai/phai toan cuc           |
| `container-large`        | Structure  | Max-width: 80rem (1280px), can giua  |
| `padding-section-medium` | Structure  | Padding top/bottom ~48px (3rem)      |
| `padding-section-small`  | Structure  | Padding top/bottom <48px             |
| `padding-section-large`  | Structure  | Padding top/bottom >=96px (6rem)     |
| `section-navbar`         | Structure  | Section wrapper for Navbar           |
| `section-contact-us`     | Structure  | Section wrapper for Contact Us       |
| `section-footer`         | Structure  | Section wrapper for Footer           |
| `heading-style-h1`       | Typography | For main headings (48px, Poppins SemiBold) |
| `heading-style-h2`       | Typography | For sub-headings (if any)            |
| `text-size-regular`      | Typography | Font size 16px (1rem), Poppins Regular |
| `text-size-large`        | Typography | Font size 18px (1.125rem), Poppins Medium |
| `text-weight-bold`       | Typography | Font weight Bold                     |
| `text-weight-medium`     | Typography | Font weight Medium                   |
| `text-weight-semibold`   | Typography | Font weight SemiBold                 |
| `text-weight-normal`     | Typography | Font weight Normal                   |
| `text-color-primary`     | Color      | Dark Text (#1A1A1A)                  |
| `text-color-white`       | Color      | White Text (#FFFFFF)                 |
| `text-color-secondary-grey` | Color   | Light grey text (#bbbbcb)           |
| `text-color-light-grey-opacity-80` | Color | Light grey with 80% opacity         |
| `text-color-primary-dark-opacity-80` | Color | Primary dark with 80% opacity       |
| `text-color-footer-dark` | Color      | Footer text color (#282938)          |
| `text-color-button-light`| Color      | Button text color (#f4f6fc)          |
| `bg-white`               | Color      | White background                     |
| `bg-light-grey`          | Color      | Light grey background (#F4F6FC)      |
| `bg-dark-blue`           | Color      | Dark blue background (#1c1e53)      |
| `bg-primary-dark`        | Color      | Primary dark background (#282938)    |
| `bg-yellow-accent`       | Color      | Yellow accent background (#FCD980)   |
| `button`                 | Component  | Base button class                    |
| `is-primary`             | Modifier   | Primary button style                 |
| `is-secondary`           | Modifier   | Secondary button style               |
| `is-text`                | Modifier   | Text button style                    |
| `form_label`             | Component  | Form label style                     |
| `form_input`             | Component  | Form input style                     |
| `is-text-area`           | Modifier   | Text area modifier for form_input    |
| `form_row`               | Layout     | Wrapper for form input and label     |
| `gap-[size]`             | Layout     | Flex/Grid gap (e.g., `gap-4` for 1rem) |
| `margin-small`           | Spacing    | Margin 1rem (16px)                   |
| `margin-medium`          | Spacing    | Margin 2rem (32px)                   |
| `margin-large`           | Spacing    | Margin 3rem (48px)                   |
| `margin-xlarge`          | Spacing    | Margin 4rem (64px)                   |
| `margin-xxlarge`         | Spacing    | Margin 5rem (80px)                   |
| `margin-huge`            | Spacing    | Margin 6rem (96px)                   |
| `icon-1x1-medium`        | Component  | Medium square icon                   |
| `icon-1x1-small`         | Component  | Small square icon                    |

### B. Custom Classes (CAN TAO MOI)
| Class Name                | Loai    | CSS Can Thiet                                                                                                                                                                                                                                                                  |
|:--------------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `navbar_component`        | Custom  | `display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; height: 92px;`                                                                                                                                                                              |
| `navbar_logo`             | Custom  | `width: 160px;` (Adjust based on actual logo size)                                                                                                                                                                                                                              |
| `footer_component`        | Custom  | `position: relative; background-color: #1c1e53; padding: 81.19px 0 0 0;`                                                                                                                                                                                                        |
| `footer_content-area`     | Custom  | `position: absolute; inset: 19.63% 23.88% 38.24% 10%;`                                                                                                                                                                                                                          |
| `footer_social-icons`     | Custom  | `display: flex; justify-content: flex-start; gap: 20px;` (Adjust gap as needed)                                                                                                                                                                                                 |
| `footer_contact-info`     | Custom  | `position: absolute; inset: 61.76% 57.69% 18.81% 10%;`                                                                                                                                                                                                                         |
| `footer_links-area`       | Custom  | `position: absolute; inset: 81.19% 0 0 0;`                                                                                                                                                                                                                                       |
| `contact-us_component`    | Custom  | `display: flex; flex-direction: column; align-items: center;` (General wrapper for content within the contact section)                                                                                                                                                           |
| `contact-heading-wrapper` | Custom  | `text-align: center;`                                                                                                                                                                                                                                                           |
| `contact-form_wrapper`    | Custom  | `display: flex; justify-content: center; width: 100%;`                                                                                                                                                                                                                          |
| `contact-form_block`      | Custom  | `background-color: #f4f6fc; border-radius: 12px; padding: 3rem; width: 100%; max-width: 1061px; display: flex; flex-direction: column; gap: 2rem;`                                                                                                                                  |
| `contact-form_row-2-col`  | Custom  | `display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; width: 100%;`                                                                                                                                                                                                        |
| `contact-form_row-1-col`  | Custom  | `display: flex; flex-direction: column; width: 100%;`                                                                                                                                                                                                                           |
| `contact-form_field-wrapper`| Custom| `display: flex; flex-direction: column; gap: 0.5rem; width: 100%;`                                                                                                                                                                                                              |
| `contact-form_input`      | Custom  | `padding: 18px 32px; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; width: 100%; font-size: 16px; line-height: 28px;`                                                                                                                                                  |
| `contact-form_input is-text-area` | Custom | `height: 138px; resize: vertical;` (for message input)                                                                                                                                                                                                                                          |
| `contact-form_button`     | Custom  | `background-color: #282938; color: #f4f6fc; padding: 15px 51px; border-radius: 41px; font-size: 18px; font-weight: 600; line-height: 32px; align-self: flex-start;`                                                                                                             |
| `contact-form_select-input` | Custom | `border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; padding: 18px 32px; width: 100%;` (For the subject dropdown if it's a custom select)                                                                                                                             |

## GHI CHU QUAN TRONG
1. **[Navbar & Footer]**: Assume these are to be built as sections/components as per the Figma output, not necessarily pre-existing shared components unless their IDs from `shared_components.json` are explicitly used as Webflow components.
2. **[Đơn vị]**: All PX values from Figma have been converted to REM (divided by 16).
3. **[Ghi chú khác 1]**: The "Subject" input for the form appears twice in the Figma data. One is a placeholder "Select Subject", and another has a similar structure but no explicit placeholder text. I've mapped them as distinct elements that might need clarification or merging.
4. **[Ghi chú khác 2]**: Tailwind's `calc()` expressions for positioning have been translated into approximate relative spacing or absolute positioning considerations for Webflow. Specific `left`, `top`, `right`, `bottom`, `inset` values from Figma will need to be applied as absolute or relative positioning in Webflow as necessary. The `w-[1600px]` implies a fixed width container, which might need to be adjusted for responsiveness.
