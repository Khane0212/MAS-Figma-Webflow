# MAPPING PLAN: Trang [Tên Trang] (nodeID: [ID])

## THONG TIN CHUNG
- **Site ID**: `[Điền Site ID]`
- **Font**: `[Điền các font và weight sử dụng, VD: Poppins (Regular 400, Medium 500, SemiBold 600)]`
- **Color Tokens tu Figma**:
  - `[Tên màu]`: `[Hex]` -> `[Biến/Class tương ứng, VD: text-color-primary]`

## CAU TRUC DOM (Tu ngoai vao trong)

```text
page-wrapper (DivBlock)
├── [Navbar] ← Shared Component (xu ly rieng)
├── main-wrapper (DivBlock, tag: <main>)
│   └── section_[name] (Section tag)
│       └── padding-global (DivBlock)
│           └── container-[size] (DivBlock)
│               └── padding-section-[size] (DivBlock)
│                   └── [name]_component (DivBlock)
│                       │
│                       ├── ===== KHOI 1: [TÊN KHỐI] =====
│                       ├── [element_wrapper] (DivBlock)
│                       │   ├── [Element con]
│                       │   └── [Element con]
│                       │
│                       ├── ===== SPACER =====
│                       ├── margin-top margin-[size] (DivBlock) ← spacer [x]rem
│                       │
│                       ├── ===== KHOI 2: [TÊN KHỐI] =====
│                       │   └── [element]
│                       ...
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
| `container-[size]`       | Structure  | Max-width tương ứng, can giua        |
| `padding-section-[size]` | Structure  | Padding top/bottom tương ứng         |
| `[utility-class]`        | `[Loại]`   | `[Ghi chú / Kích thước]`             |

### B. Custom Classes (CAN TAO MOI)
| Class Name                | Loai    | CSS Can Thiet                                          |
|:--------------------------|:--------|:-------------------------------------------------------|
| `[component_name]`        | Custom  | Wrapper chinh, `[các thuộc tính CSS]`                  |
| `[custom_class]`          | Custom  | `[Thuộc tính CSS cần thiết]`                           |

## GHI CHU QUAN TRONG
1. **[Navbar & Footer]**: `[La Shared Component hay tự build?]`
2. **[Đơn vị]**: Tat ca gia tri PX tu Figma -> chuyen sang REM (chia 16).
3. **[Ghi chú khác 1]**: `[Mô tả các lưu ý đặc biệt về cấu trúc/style/thẻ HTML]`
4. **[Ghi chú khác 2]**: `[...]`
