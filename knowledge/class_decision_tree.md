# CÂY QUYẾT ĐỊNH CHỌN CLASS (CLASS DECISION TREE)

> [!IMPORTANT]
> Khi gặp bất kỳ phần tử nào từ Figma, Agent PHẢI đi qua cây quyết định này TRƯỚC KHI tra cứu bất kỳ file nào khác. Mục tiêu: ra quyết định class trong ≤ 30 giây.

---

## BƯỚC 0: PHẦN TỬ NÀY LÀ GÌ VỀ MẶT CHỨC NĂNG?

```
Phần tử từ Figma
│
├─► LÀ BỌC NGOÀI TOÀN TRANG?
│     └─► page-wrapper  (div bọc tất cả, overflow: hidden)
│         └─► main-wrapper  (thẻ <main>, bọc nội dung chính)
│
├─► LÀ PHÂN VÙNG NỘI DUNG (Section)?
│     └─► section.section_[name]  (thẻ <section>, KHÔNG có padding/margin)
│         └─► div.padding-global  (tạo lề trái/phải)
│             └─► div.container-[size]  (xem BƯỚC 1)
│                 └─► div.padding-section-[size]  (xem BƯỚC 2)
│                     └─► div.[name]_component
│
├─► LÀ VĂN BẢN / TIÊU ĐỀ?  →  xem BƯỚC 3
│
├─► LÀ NÚT BẤM?  →  xem BƯỚC 4
│
├─► LÀ FORM?  →  xem BƯỚC 5
│
├─► LÀ KHOẢNG CÁCH?  →  xem BƯỚC 6
│
├─► LÀ ICON / HÌNH ẢNH?  →  xem BƯỚC 7
│
└─► KHÔNG THUỘC LOẠI NÀO TRÊN?  →  xem BƯỚC 8 (Custom Class)
```

---

## BƯỚC 1: CHỌN CONTAINER SIZE

> Câu hỏi: Nội dung bên trong là gì?

| Nội dung bên trong | Class Container | Max-width |
| :--- | :--- | :--- |
| Văn bản dài, paragraph đơn | `container-small` | ~40rem (640px) |
| Form, card trung bình | `container-medium` | ~48rem (768px) |
| Grid nhiều cột, Header, Footer | `container-large` | ~80rem (1280px) |
| Figma có padding tùy chỉnh lớn hơn | Tạo custom class `[section]_padding` | Đúng với Figma |

---

## BƯỚC 2: CHỌN PADDING-SECTION SIZE

> Câu hỏi: Khoảng cách trên/dưới section là bao nhiêu?

| Khoảng cách (px) | Class |
| :--- | :--- |
| ≥ 96px (6rem) | `padding-section-large` |
| 48–95px | `padding-section-medium` |
| < 48px | `padding-section-small` |
| Khác biệt lớn vs các mốc trên | Tạo custom class với padding chính xác |

---

## BƯỚC 3: VĂN BẢN / TIÊU ĐỀ

```
Phần tử text
│
├─► TIÊU ĐỀ (Heading)?
│     ├─► Dùng thẻ HTML đúng ngữ nghĩa (H1, H2, H3...) cho SEO
│     └─► Gán class style: heading-style-h1 → heading-style-h6
│         └─► Thêm combo nếu cần:
│               text-align-center / text-align-left
│               text-weight-bold / text-weight-medium
│               text-color-primary / text-color-alternate
│
└─► ĐOẠN VĂN / TEXT THƯỜNG?
      ├─► text-size-large    (1.5rem)
      ├─► text-size-medium   (1.25rem)
      ├─► text-size-regular  (1rem)     ← mặc định
      ├─► text-size-small    (0.875rem)
      └─► text-size-tiny     (0.75rem)
      
      Kết hợp với:
      text-weight-bold / semibold / medium / normal / light
      text-style-muted  (opacity 0.6)
      text-color-primary / secondary / alternate
```

> [!TIP]
> Một thẻ `<p>` có thể mang `heading-style-h3` để trông to như heading nhưng giữ ngữ nghĩa paragraph. Đây là cách đúng để tách biệt cấu trúc và giao diện.

---

## BƯỚC 4: NÚT BẤM (Button)

```
Button
│
├─► Luôn bắt đầu bằng Base Class: button
│
└─► Thêm Combo Class cho màu sắc/style:
      ├─► button is-primary    (nút chính, màu đậm)
      ├─► button is-secondary  (nút phụ, outlined)
      └─► button is-text       (nút dạng text link)

Nếu có nhóm nhiều nút: bọc trong div.button-group
```

> [!CAUTION]
> TUYỆT ĐỐI KHÔNG tạo class như `btn-send`, `button-submit`, `cta-btn`. Luôn dùng `button` + combo.

---

## BƯỚC 5: FORM

```
Form Block
│
├─► Bọc ngoài cùng:    form_component  (thẻ <form>)
│
├─► Hàng input:        form_row  (div, display: flex, gap)
│
├─► Ô nhập liệu đơn:   form_input  (thẻ <input>)
│
├─► Ô textarea:        form_input is-text-area  (combo)
│
├─► Label:             form_label
│
└─► Nút Submit:        button is-primary  (hoặc is-secondary)
```

> [!CAUTION]
> Webflow tự động sinh input/button mặc định khi tạo Form. BẮT BUỘC phải dùng `set_style` để gán đúng class cho tất cả phần tử con ngay sau khi tạo.

---

## BƯỚC 6: KHOẢNG CÁCH (Spacing)

> Câu hỏi 1: Khoảng cách này ở đâu?

```
Khoảng cách
│
├─► GIỮA CÁC SECTION lớn (≥ 48px)?
│     └─► Dùng padding-section-* trên wrapper, KHÔNG dùng margin element
│
├─► GIỮA CÁC BLOCK trong cùng section (≥ 32px)?
│     └─► margin-bottom [size] gắn trực tiếp vào element con
│         (KHÔNG tạo div rỗng để chứa margin)
│
└─► GIỮA CÁC ELEMENT trong cùng component (< 32px)?
      └─► gap trên flex/grid container (row-gap / column-gap)
          TUYỆT ĐỐI KHÔNG dùng spacer div
```

> Câu hỏi 2: Kích thước cụ thể?

| Figma (px) | REM | Utility Class |
| :--- | :--- | :--- |
| 2px | 0.125rem | `margin-tiny` |
| 4px | 0.25rem | `margin-xxsmall` |
| 8px | 0.5rem | `margin-xsmall` |
| 16px | 1rem | `margin-small` |
| 32px | 2rem | `margin-medium` |
| 48px | 3rem | `margin-large` |
| 64px | 4rem | `margin-xlarge` |
| 80px | 5rem | `margin-xxlarge` |
| 96px | 6rem | `margin-huge` |
| Không khớp | Tính REM chính xác | Tạo utility mới (VD: `margin-custom-xxs`) |

**Ngưỡng phân biệt MACRO vs MICRO:**
- **MICRO (< 32px, gap):** Khoảng cách giữa các phần tử bên trong component — dùng `gap`
- **MACRO (≥ 32px, margin/padding):** Khoảng cách giữa các block hoặc section — dùng margin utility hoặc padding-section

---

## BƯỚC 7: ICON / HÌNH ẢNH

```
Icon / Image
│
├─► ICON VUÔNG (SVG/PNG)?
│     ├─► icon-1x1-large   (2.5rem / 40px)
│     ├─► icon-1x1-medium  (2rem / 32px)
│     └─► icon-1x1-small   (1rem / 16px)
│
└─► HÌNH ẢNH NỘI DUNG?
      └─► Thẻ <img> với class phù hợp từ component
          Nếu full-width: w-full hoặc max-width: 100%
          Luôn set width: 100% để responsive
```

---

## BƯỚC 8: KHÔNG KHỚP UTILITY NÀO → TẠO CUSTOM CLASS

> Điều kiện được phép tạo Custom Class:
> 1. Phần tử có **≥ 2 thuộc tính đặc thù** (background + border-radius + padding riêng)
> 2. Không thể ghép từ utility classes có sẵn

```
Cú pháp bắt buộc:
[tên-component]_[tên-thành-phần]-[modifier]

Ví dụ:
contact_form-block     ← wrapper chứa form contact
hero_content-left      ← cột trái trong hero section
card_image-wrapper     ← bọc hình ảnh trong card
```

> [!CAUTION]
> Trước khi tạo Custom Class, hỏi lại: "Có thể ghép từ các utility không?" Nếu CÓ → KHÔNG tạo custom. Chỉ tạo khi THỰC SỰ cần thuộc tính đặc thù.

---

## TÓM TẮT NHANH (QUICK REFERENCE)

| Tình huống | Class ngay |
| :--- | :--- |
| Bọc toàn trang | `page-wrapper` |
| Nội dung chính | `main-wrapper` |
| Section | `section_[name]` > `padding-global` > `container-[size]` > `padding-section-[size]` |
| Component wrapper | `[name]_component` |
| Tiêu đề | `heading-style-h[1-6]` |
| Văn bản | `text-size-[size]` + combo |
| Nút | `button is-primary` |
| Form | `form_component` > `form_input` > `button is-primary` |
| Icon | `icon-1x1-[size]` |
| Khoảng cách lớn | `margin-[size]` utility |
| Khoảng cách nhỏ | `gap` trên flex/grid |
| Không biết | → Bước 8: tạo custom `[component]_[element]` |
