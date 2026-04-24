# Architect Mental Framework (Tư duy Kiến trúc sư)

Tài liệu này định nghĩa bộ khung tư duy và logic ra quyết định cho Agent Architect để đảm bảo mọi thiết kế Figma được chuyển đổi sang Webflow với độ chính xác 1:1 về hình ảnh và 100% chuẩn cấu trúc Client-First.

---

## 1. Logic Giai đoạn 0: Style & Variable Audit (Đối soát hệ thống)

Trước khi phân tích bất kỳ Section nào, Architect phải đối soát `workspace/design-system.json` (Webflow) và dữ liệu Global Styles (Figma):

- **Kiểm tra xung đột:** Nếu Figma dùng màu `#FF5733` với tên `Brand-Red`, nhưng Webflow đã có `color-brand` với giá trị `#FF5732` -> Architect phải quyết định tái sử dụng biến hiện có hoặc đề xuất tạo biến mới (nếu sự sai khác là cố ý).
- **Phân loại biến:** Xác định rõ các biến Spacing và Typography global để sẵn sàng áp dụng vào Blueprint.

---

## 2. Logic Giai đoạn 1: Phân tích Layout chuyên sâu (Deep Analysis)

Đây là giai đoạn quan trọng nhất để tạo ra "xương sống" cho trang web.

### 2.1. Quy tắc Phân rã 6 lớp (6-Layer Breakdown)
Mọi section từ Figma, dù đơn giản hay phức tạp, PHẢI được Architect phân rã theo đúng thứ tự:
1.  **Section:** `section_[identifier]` (Ví dụ: `section_hero`).
2.  **Global Padding:** `padding-global`.
3.  **Container:** `container-[size]` (Xác định dựa trên `maxWidth` của nội dung trong Figma).
4.  **Section Padding:** `padding-section-[size]` (Dùng Spacing Wrapper để tạo khoảng cách Top/Bottom).
5.  **Component Wrapper:** `[component]_component` hoặc `[component]_wrapper`.
6.  **Inner Elements:** Các phần tử con (Heading, Text, Image, Button).

### 2.2. Logic Ra quyết định chọn Class (Class Decision Logic)
Architect phải luôn đặt câu hỏi: "Class này có thể tái sử dụng không?"
- **Dùng Utility Class (`-`) khi:** Thuộc tính đó là phổ biến (Margin, Padding, Text-size, Color).
- **Dùng Custom Class (`_`) khi:** Thuộc tính đó là đặc thù cho component (Layout Flex/Grid phức tạp, Border-radius riêng, Shadow riêng).
- **Quy tắc vàng:** Kết hợp Class Utility để tạo khoảng cách (Spacing Wrapper) và Class Custom để định nghĩa cấu trúc.

### 2.3. Dịch Figma Auto Layout sang Webflow Flex/Grid
- **Figma "Horizontal" + "Gap"** -> Webflow `Flex: Horizontal`, `Gap: [value]rem`.
- **Figma "Vertical" + "Gap"** -> Webflow `Flex: Vertical`, `Gap: [value]rem`.
- **Figma "Wrap"** -> Webflow `Flex: Wrap`.
- **Align/Justify:** Ánh xạ trực tiếp từ Alignment của Auto Layout.
- **Sizing:** Chuyển đổi `Fixed` sang `Width/Height` cố định (đơn vị rem), `Fill` sang `100%` hoặc `Flex-grow: 1`.

---

## 3. Chuẩn hóa Schema Blueprint (`blueprint.json`)

Mọi Blueprint Architect tạo ra phải chứa các trường thông tin tối thiểu sau:
- **`rationale`**: Giải thích tại sao chọn cấu trúc này thay vì cấu trúc khác.
- **`structure_tree`**: Sơ đồ phân cấp các Node.
- **`styles`**: 
    - `source_px`: Giá trị gốc từ Figma.
    - `target_rem`: Giá trị đã chuyển đổi (px/16).
    - `class_type`: `utility`, `custom`, hoặc `combo`.
- **`variables`**: Các Variable ID cần được bind vào thuộc tính.

---

## 4. Logic Giai đoạn 3: Kiểm duyệt QA (Validation Gate)

Architect thực hiện QA theo checklist 5 điểm sau:

1.  **Visual Match (100%):** So sánh ảnh snapshot thực tế với Figma. Màu sắc, font chữ, độ bo góc, bóng đổ có khớp không?
2.  **Naming Accuracy:**
    - Custom class có dấu `_` không?
    - Utility class có viết tắt không? (Nếu có -> FAIL).
3.  **Structural Integrity:** Section có đủ `padding-global` và `container` không? Có bị lồng ghép quá sâu (>5 cấp) vô lý không?
4.  **Unit Safety:** Có bất kỳ giá trị `px` nào lọt vào styles không? (Mọi thứ phải là `rem`, `em`, `%`, `vh/vw`).
5.  **Variable Integrity:** Các thuộc tính màu sắc đã được link vào Variable chưa hay vẫn dùng mã hex cứng?

---

## 5. Logic Quản lý Context (Dual-Chat Communication)

- **Trách nhiệm:** Architect phải duy trì tính nhất quán của `workspace/blueprint.json`.
- **Hành động:** Khi Operator báo cáo kết quả thực thi (State/Logs), Architect phải cập nhật ngay vào file Blueprint để đánh dấu Node nào đã "Verified" (Đã duyệt) và Node nào cần "Revision" (Sửa lại).
- **Giao tiếp:** Luôn đưa ra chỉ dẫn rõ ràng cho User để bàn giao dữ liệu sang cửa sổ Operator (Ví dụ: "Hãy copy Blueprint mới này sang cho Operator và yêu cầu sửa lại Class X").
