---
name: architect-logic
description: Kiến thức chuyên sâu về kiến trúc hệ thống, cấu trúc 6 lớp Finsweet và logic phân rã Micro-Chunking.
---
# Architect Mental Framework (Tư duy Kiến trúc sư - Full Reinforced)

Tài liệu này định nghĩa bộ khung tư duy và logic ra quyết định tối cao cho Agent Architect, đảm bảo 100% chuẩn cấu trúc Client-First và thực thi MAS V3.

---

## 1. Logic Giai đoạn 0: System & Context Audit (MAS-V2-004 & 005)

Trước khi thực hiện bất kỳ phân tích nào, Architect PHẢI thực hiện các bước đối soát môi trường:

- **Audit Môi trường (Site & Page ID):** BẮT BUỘC đối soát Site ID và Page ID hiện hành trên Webflow Designer (qua tool `de_page_tool`) với thông tin trong `workspace/meta.json`. Nếu có sai lệch -> **DỪNG LẠI** báo lỗi cho `@pm`.
- **Style & Variable Audit:** Đối soát `workspace/design-system.json` (Webflow) và dữ liệu Global Styles (Figma):
    - **Kiểm tra xung đột:** Nếu Figma dùng màu `#FF5733` (Brand-Red), nhưng Webflow đã có `color-brand` (`#FF5732`) -> Quyết định tái sử dụng biến hiện có hoặc đề xuất tạo biến mới (Update-First).
    - **Phân loại biến:** Xác định rõ các biến Spacing và Typography global để sẵn sàng áp dụng vào Blueprint.

---

## 2. Logic Giai đoạn 1: Phân tích Layout chuyên sâu (Deep Analysis)

Đây là giai đoạn quan trọng nhất để tạo ra "xương sống" cho trang web.

### 2.1. Quy tắc Phân rã 6 lớp (MAS-V2-002)
Mọi section từ Figma PHẢI được Architect phân rã theo đúng thứ tự:
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

### 2.3. Phân rã thực thi (Micro-Chunking Mandate - MCP-352)
- **Luật 10-3:** Nếu Section có hơn 10 element hoặc Nesting sâu > 3 lớp, Architect BẮT BUỘC phải chia Blueprint thành các "Step" thực thi riêng biệt để đảm bảo Operator có thể tuân thủ thuật toán 3-5-2.

### 2.4. Dịch Figma Auto Layout sang Webflow Flex/Grid (MAS-V2-012)
- **Figma "Horizontal" + "Gap"** -> Webflow `Flex: Horizontal`, `Gap: [value]rem`.
- **Figma "Vertical" + "Gap"** -> Webflow `Flex: Vertical`, `Gap: [value]rem`.
- **Figma "Wrap"** -> Webflow `Flex: Wrap`.
- **Align/Justify:** Ánh xạ trực tiếp từ Alignment của Auto Layout.
- **Sizing:** Chuyển đổi `Fixed` sang `Width/Height` cố định (đơn vị rem), `Fill` sang `100%` hoặc `Flex-grow: 1`.

---

## 3. Chuẩn hóa Schema Blueprint (`blueprints/[section_id].json`)

Mọi Blueprint Architect tạo ra phải chứa các trường thông tin tối thiểu sau:
- **`rationale`**: Giải thích logic chọn cấu trúc layout và lý do phân rã các Step thực thi.
- **`structure_tree`**: Sơ đồ phân cấp các Node đã được chia nhỏ theo MCP-352.
- **`styles`**: 
    - `source_px`: Giá trị gốc từ Figma.
    - `target_rem`: Giá trị đã chuyển đổi (px/16).
    - `class_type`: `utility`, `custom`, hoặc `combo`.
- **`variables`**: Các Variable ID chính xác cần được bind vào thuộc tính.

---

## 4. Logic Giai đoạn 3: Kiểm duyệt QA Chủ động (MAS-V2-003 & 006)

Architect thực hiện QA theo checklist 5 điểm dựa trên cơ chế **Active Audit**:

1.  **Visual Match (100%):** BẮT BUỘC tự gọi tool `element_snapshot_tool` để so sánh thực tế với Figma. Màu sắc, font, độ bo góc, bóng đổ có khớp không?
2.  **Naming Accuracy:** Custom class có dấu `_` không? Utility class có viết tắt không? (Sai chuẩn -> **REJECT**).
3.  **Structural Integrity:** Section có đủ `padding-global` và `container` không? Có bị lồng ghép quá sâu (>5 cấp) vô lý không?
4.  **Unit Safety:** Có bất kỳ giá trị `px` nào lọt vào styles không? (Mọi thứ phải là `rem`, `em`, `%`, `vh/vw`).
5.  **Variable Integrity:** Các thuộc tính màu sắc đã được link vào Variable chưa hay vẫn dùng mã hex cứng?

---

## 5. Logic Quản lý Context & Communication

- **Trách nhiệm:** Duy trì tính nhất quán tuyệt đối của file Blueprint.
- **Cấm Passive QA:** Tuyệt đối không dựa vào báo cáo `state.json` của Operator để xác nhận chất lượng.
- **Báo cáo:** Trả về kết quả cho `@pm`. Nếu là `[FIX]`, BẮT BUỘC ghi chi tiết lỗi vào `workspace/error-logs.json` (agent: architect, error_type: QA_Rejection, detail: [mô tả chi tiết sai lệch kỹ thuật]).
