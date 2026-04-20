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
- **Absolute to Flexbox Conversion (CRITICAL):** Tuyệt đối KHÔNG được "ước lượng" (heuristic guessing) kích thước. Khi Figma (hoặc Tailwind `inset-[%]`) trả về các giá trị định vị theo phần trăm (%), BẮT BUỘC phải tính toán kích thước thực tế bằng công thức:
  - `Chiều cao (px) = (100% - %top - %bottom) * Chiều cao Frame cha`
  - `Chiều rộng (px) = (100% - %left - %right) * Chiều rộng Frame cha`
  Sau khi có giá trị Pixel chính xác, mới được quy đổi sang `rem`.
- **Absolute Fallback:** Chỉ sử dụng `position: absolute` cho các layer có thuộc tính `locked` hoặc nằm ngoài luồng flow tự nhiên mà không ảnh hưởng đến nội dung chính (vd: Background shapes, floating icons).

## 4. Constraint & Clean-up
- **Negative Gap:** Nếu Figma dùng Gap âm -> Ánh xạ sang `margin-left/top` âm (hoặc sử dụng Webflow Negative Margin).
- **Unit Sanitization & Variable Preservation (QUAN TRỌNG):**
  - **Ưu tiên Variable:** Nếu một thuộc tính (Color, Spacing, Number) có `boundVariables`, BẮT BUỘC phải báo cáo ID/Tên Variable đó.
  - **Fallback to Rem:** Chỉ khi không có Variable gán kèm, mới gọi `tools/utils.js` để `snapValue()` và `toRem()`.
  - Dữ liệu đầu ra phải rõ ràng: `width: { value: "60rem", variableId: "var-123", isVariable: true }`. Điều này giúp @QA duyệt Check 2 & 3.
- **Icon recognition:** Nếu một Group/Frame chứa toàn Vectors -> Đánh dấu là `Asset/Icon` và đề xuất xuất SVG.