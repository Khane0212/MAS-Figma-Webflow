# Skill: Figma to Web Layout Interpretation (Client-First V2 Optimized)

## 1. Auto Layout to Flexbox/Grid Mapping
- **Direction:** - `Vertical` -> `display: flex; flex-direction: column;`
  - `Horizontal` -> `display: flex; flex-direction: row;`
  - `Wrap` (MỚI) -> `flex-wrap: wrap;`
- **Resizing Logic (Crucial):**
  - `Fill Container` (Width/Height) -> `flex-grow: 1; align-self: stretch;` (hoặc `width: 100%`).
  - `Hug Contents` -> `width: auto; height: auto;` (Không set cứng thông số).
  - `Fixed` -> Set giá trị cụ thể bằng `rem`.
- **Alignment:**
  - `Packed` -> `justify-content` (start/center/end).
  - `Space between` -> `justify-content: space-between`.
  - `Baseline` -> `align-items: baseline`.

## 2. Client-First Structure Recognition
- **Section Detection:** Frame cao nhất chứa các nhóm nội dung lớn -> `section_[name]`.
- **Container Logic:** - Nếu Frame có `max-width` lặp lại (vd: 1200px - 1440px) -> `container-large`.
  - Nếu Frame bọc ngoài cùng có padding trái/phải cố định -> `padding-global`.
- **Vertical Spacing:** Khoảng cách giữa các Section -> `padding-section-large` (hoặc tương đương trong Style Guide).

## 3. Handling "Dirty" Layouts (Non-Auto Layout)
- **Scanning Order:** Quét tọa độ từ trên xuống dưới, trái sang phải.
- **Grouping Strategy:** - Nếu các layer có tọa độ Y gần bằng nhau (lệch < 5px) -> Nhóm vào một `flex-row`.
  - Nếu các layer xếp chồng -> Nhóm vào một `flex-column`.
- **Absolute Fallback:** Chỉ sử dụng `position: absolute` cho các layer có thuộc tính `locked` hoặc nằm ngoài luồng flow tự nhiên mà không ảnh hưởng đến nội dung chính (vd: Background shapes, floating icons).

## 4. Constraint & Clean-up
- **Negative Gap:** Nếu Figma dùng Gap âm -> Ánh xạ sang `margin-left/top` âm (hoặc sử dụng Webflow Negative Margin).
- **Unit Sanitization:** Luôn gọi `tools/utils.js` để:
  - `snapValue()` cho mọi khoảng cách Gap/Padding.
  - `toRem()` cho mọi kích thước.
- **Icon recognition:** Nếu một Group/Frame chứa toàn Vectors -> Đánh dấu là `Asset/Icon` và đề xuất xuất SVG.