# MAPPING PLAN: Trang [Tên Trang] (nodeID: [ID])

## THONG TIN CHUNG
- **Site ID**: `[Điền Site ID]`
- **Font**: `[Điền các font và weight sử dụng, VD: Poppins (Regular 400, Medium 500, SemiBold 600)]`
- **Color Tokens tu Figma**:
  - `[Tên màu]`: `[Hex]` -> `[Biến/Class tương ứng, VD: text-color-primary]`

## CAU TRUC DOM & RAW DATA (Tu ngoai vao trong)
> **LƯU Ý QUAN TRỌNG:** PHẢI trích xuất ĐẦY ĐỦ NỘI DUNG TEXT (RAW DATA) từ Figma. Tuyệt đối không để trống hoặc ghi tắt nội dung. Cần phân rõ các thẻ có combo class.

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
├── ===== ELEMENT BLOCK =====
├── [element_wrapper] (DivBlock) <-- CSS: margin-bottom [size]
│   ├── heading-style-h1 (H1)
│   │   └─ TEXT: "[...] "
│   │
│   └── text-size-regular (P)
│       └─ TEXT: "[...]"

│                       │
│                       ├── ===== KHOI 2: [TÊN KHỐI] =====
│                       │   └── [element]
│                       ...
│
├── [Footer] ← Shared Component (xu ly rieng)
└── (het page-wrapper)
```

## BANG LIET KE CLASS CAN DUNG

### A. Utility & Combo Classes (Da co san / Can kiem tra)
> **LƯU Ý:** Ghi rõ CẢ BASE CLASS và COMBO CLASS đi kèm với nhau.
| Class Name (Base + Combo)                | Loai       | Ghi chu                              |
|:-----------------------------------------|:-----------|:-------------------------------------|
| `page-wrapper`                           | Structure  | Boc ngoai cung trang                 |
| `main-wrapper`                           | Structure  | Tag `<main>`                         |
| `padding-global`                         | Structure  | Padding trai/phai toan cuc           |
| `container-[size]`                       | Structure  | Max-width tương ứng, can giua        |
| `padding-section-[size]`                 | Structure  | Padding top/bottom tương ứng         |
| `[base-class] [combo-class]`             | `[Loại]`   | `[Ghi chú / Kích thước]`             |

### B. Custom Classes (CAN TAO MOI)
> **LƯU Ý:** Nếu phần tử có yêu cầu kích thước tĩnh bắt buộc từ Figma (VD: Image Hero), BẮT BUỘC ghi rõ Width/Height vào phần CSS Cần Thiết.
| Class Name                | Loai    | CSS Can Thiet                                          |
|:--------------------------|:--------|:-------------------------------------------------------|
| `[component_name]`        | Custom  | Wrapper chinh, `[các thuộc tính CSS]`                  |
| `[custom_class]`          | Custom  | `[VD: Width: 1280px, Height: 477px, ...]`              |

## GHI CHU QUAN TRONG
1. **[Navbar & Footer]**: `[La Shared Component hay tự build?]`
2. **[Đơn vị]**: Tat ca gia tri PX tu Figma -> chuyen sang REM (chia 16).
3. **[Nội dung Text]**: TOÀN BỘ RAW data phải được copy đầy đủ. Đặc biệt các text có màu/style riêng phải được bọc bằng thẻ `span` và gán class tương ứng.
4. **[Combo Class]**: Bắt buộc ghi rõ ràng các combo class đã kết hợp cho mỗi element trong Sơ đồ DOM và Bảng Class.
5. **[Kích thước]**: Kiểm tra lại các element đặc thù (như ảnh, hero background), nếu Figma fix cứng width/height thì phải ghi rõ vào Mapping Plan.
