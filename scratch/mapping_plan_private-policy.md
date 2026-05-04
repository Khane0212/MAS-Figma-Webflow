# MAPPING PLAN: Private Policy

## THÔNG TIN SECTION

- **Tên Section:** `private-policy`
- **Page:** `private-policy`
- **Figma Node ID:** `103:4`
- **Kích thước Figma:** `1600px wide`

---

## DOM TREE

```
section.section_private-policy
└── div.padding-global
    └── div.container-large
        └── div.padding-section-large
            └── div.privacy-policy_component
                ├── div.privacy-policy_heading-block
                │   ├── h1.heading-style-h1 [text: "Privacy Policy"]
                │   └── p.text-size-regular.text-style-muted [text: "When you’re ready to go beyond prototyping in Figma, Webflow’s ready to help you bring your "]
                └── div.privacy-policy_content-block
                    ├── h2.heading-style-h2 [text: "Lorem ipsum dolor."]
                    ├── h2.heading-style-h2 [text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."]
                    ├── p.text-size-regular.text-style-muted [text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "]
                    ├── p.text-size-regular.text-style-muted [text: "Excepteur sint occaecat cupidatat non proident."]
                    ├── p.text-size-regular.text-style-muted [text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."]
                    └── div.privacy-policy_list-group
                        ├── div.list_item
                        │   ├── div.bullet
                        │   └── p.text-size-regular.text-style-muted [text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."]
                        ├── div.list_item
                        │   ├── div.bullet
                        │   └── p.text-size-regular.text-style-muted [text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."]
                        └── div.list_item
                            ├── div.bullet
                            └── p.text-size-regular.text-style-muted [text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."]
```

---

## CLASS REGISTRY

| Element | Base Class | Combo Class(es) | Custom Class | Cần tạo mới? | CSS (nếu cần tạo) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section | — | — | `section_private-policy` | Có | — |
| Padding Global | `padding-global` | — | — | Không | — |
| Container | `container-large` | — | — | Không | — |
| Padding Section | — | — | `padding-section-large` | Có | `padding-top: 8rem; padding-bottom: 8rem;` |
| Component Wrapper | — | — | `privacy-policy_component` | Có | `display: flex; flex-direction: column; gap: 8rem;` |
| Heading Block | — | — | `privacy-policy_heading-block` | Có | `text-align: center;` |
| Heading 1 | `heading-style-h1` | — | — | Không | — |
| Subheading | `text-size-regular` | `text-style-muted` | — | Không | — |
| Content Block | — | — | `privacy-policy_content-block` | Có | `display: flex; flex-direction: column; gap: 2rem;` |
| Heading 2 | `heading-style-h2` | — | — | Không | — |
| Body Text | `text-size-regular` | `text-style-muted` | — | Không | — |
| List Group | — | — | `privacy-policy_list-group` | Có | `display: flex; flex-direction: column; gap: 1rem;` |
| List Item | — | — | `list_item` | Có | `display: flex; align-items: flex-start; gap: 0.5rem;` |
| Bullet | — | — | `bullet` | Có | `width: 5px; height: 5px; flex-shrink: 0;` |

---

## PIXEL DATA

```
DIMENSIONS:
- Section width: 1600px
- Component max-width: 80rem (1280px)
- Component padding: Top 8rem, Bottom 8rem (Estimated from gap)

SPACING:
- Gap giữa Heading Block và Content Block: ~200px = 12.5rem
- Gap giữa các Heading/Paragraph trong content: ~144px = 9rem (from top 420 vs 564/796...) wait.
  - 420 (H1) to 508 (P1) is 88px = 5.5rem
  - 508 (P1) to 644 (P2) is 136px = 8.5rem
  - 644 (P2) to 796 (H2) is 152px = 9.5rem
  - 796 (H2) to 940 (P3) is 144px = 9rem
  - 940 (P3) to 1132 (List Group) is 192px = 12rem
  - 1132 (List Group) to 1212 (List 2) is 80px = 5rem
  - 1212 (List 2) to 1272 (List 3) is 60px = 3.75rem (Wait, list items seem to have gaps)

TYPOGRAPHY:
- Heading 1: Poppins, size 48px=3rem, weight 600, line-height 64px=4rem
- Heading 2: Poppins, size 38px=2.375rem, weight 600, line-height 56px=3.5rem
- Body/Paragraph: Poppins, size 16px=1rem, weight 400, line-height 28px=1.75rem, color #282938, opacity 70%
- Highlight Color: #2405f2

DECORATION:
- Background color: #FFFFFF
- Bullet color: imgEllipse224
```

---

## RESPONSIVE PLAN

| Breakpoint | Element | Thay đổi |
| :--- | :--- | :--- |
| `medium` (Tablet ≤ 991px) | `container-large` | `max-width: 100%` |
| | `heading-style-h1` | `font-size: 2.5rem` |
| | `heading-style-h2` | `font-size: 2rem` |
| `small` (Mobile ≤ 767px) | `padding-section-large` | `padding-top: 4rem; padding-bottom: 4rem;` |
| | `heading-style-h1` | `font-size: 2rem` |
| | `heading-style-h2` | `font-size: 1.75rem` |

---

## CHECKLIST TRƯỚC KHI BUILD (GỬI GIAI ĐOẠN 3)

- `[ ]` Mọi DivBlock trong DOM Tree đã có tên class
- `[ ]` Mọi Combo Class đã ghi rõ Base Class + Combo (VD: `button is-primary`)
- `[ ]` Mọi pixel data đã được chuyển sang REM (không làm tròn)
- `[ ]` Đã kiểm tra class.json / cheatsheet để xác nhận class tồn tại
- `[ ]` Responsive plan đã có ít nhất cho `medium` và `tiny`
- `[ ]` Pre-Build Style Check đã được lên kế hoạch (batch query)
