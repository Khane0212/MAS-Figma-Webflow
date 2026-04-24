# Client-First Action Rules (Directives)

Bộ kỹ năng này chuyển đổi tri thức Client-First thành các chỉ thị hành động bắt buộc cho Architect và Operator. 

**MANDATE:** Mọi Agent phải đọc và hiểu thấu đáo [knowledge-base/client-first-theory.md] trước khi áp dụng các quy tắc dưới đây.

---

## 1. Chỉ thị cho Architect (Giai đoạn Phân tích Blueprint)

Architect phải áp dụng "Luật sắt" dựa trên lý thuyết chuẩn (Theory Chapters 1 & 2):

- **BẮT BUỘC** phân rã mọi Section theo cấu trúc 6 lớp lý thuyết: `section` > `padding-global` > `container` > `padding-section` > `[Content Wrapper]`.
- **BẮT BUỘC** đặt tên lớp theo đúng Chương 1 (Naming Strategy): 
    - Custom: `[component]_[element]` (Bắt buộc dùng dấu `_` để phân tách component/element).
    - Utility: `[property]-[value]` (Chỉ dùng dấu `-`, không được dùng `_`).
- **REJECT** (Từ chối) mọi tên lớp viết tắt. Phải dùng tên đầy đủ để đảm bảo tính "Human-readable".
- **KIỂM SOÁT REM (Chapter 4):** Trong Blueprint, mọi thông số phải được ghi chú rõ giá trị PX gốc và giá trị REM (PX/16).
- **STRATEGY:** Chỉ định rõ layout Flex/Grid dựa trên logic Auto Layout của Figma.

---

## 2. Chỉ thị cho Operator (Giai đoạn Thực thi Webflow)

Operator thực thi dựa trên các tiêu chuẩn kỹ thuật (Theory Chapters 3, 4 & 5):

- **TRANSFORMATION (Chapter 4):** Mọi giá trị PX từ Figma **BẮT BUỘC** phải chạy qua hàm `toRem()`. Tuyệt đối không để giá trị PX lọt vào Webflow.
- **DISCOVERY FIRST:** Trước khi tạo Style mới, phải kiểm tra hệ thống hiện có để tái sử dụng, tránh rác code.
- **VARIABLE BINDING (Chapter 5):** Ưu tiên gán thuộc tính vào Webflow Variables nếu Figma có sử dụng Tokens.
- **TRACEABILITY:** Gắn `data-figma-id` vào mọi element để phục vụ QA 1:1.
- **STYLE GUIDE SYNC:** Mọi Variable/Global Class mới phải được đồng bộ trực quan lên trang Style Guide theo đúng quy trình tại `skills/operator-logic.md`.

---

## 3. Quy trình Kiểm soát Chất lượng (QA Gate)

Architect thực hiện QA đối soát dựa trên toàn bộ nền tảng tri thức:
1.  **Visual Fidelity:** Đạt độ tương đồng 100% so với Figma (Snapshot vs Figma).
2.  **Naming Consistency:** Đối soát với Chương 1 của tài liệu tri thức. Sai chuẩn `_` hoặc `-` -> **FAIL**.
3.  **Structural Integrity:** Đối soát với Chương 2 (Core Structure). Thiếu lớp layout hoặc nesting sai -> **FAIL**.
4.  **Unit & Variable Safety:** Đối soát với Chương 4 & 5. Dùng PX hoặc quên Bind Variable -> **FAIL**.
