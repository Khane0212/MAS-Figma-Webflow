---
name: client-first-rules
description: Toàn bộ quy tắc, quy chuẩn đặt tên và cấu trúc DOM của hệ sinh thái Finsweet Client-First.
---
# Client-First Action Rules (Directives - Full Reinforced)

Bộ kỹ năng này chuyển đổi tri thức Client-First thành các chỉ thị hành động bắt buộc cho Architect và Operator. 

**MANDATE:** Mọi Agent phải đọc và hiểu thấu đáo [knowledge-base/client-first-theory.md] trước khi áp dụng các quy tắc dưới đây.

---

## 1. Chỉ thị cho Architect (Giai đoạn Phân tích Blueprint)

Architect phải áp dụng "Luật sắt" dựa trên lý thuyết chuẩn (Theory Chapters 1 & 2):

- **BẮT BUỘC Phân rã 6 lớp (MAS-V2-002):** Phân rã mọi Section theo cấu trúc: `section` > `padding-global` > `container` > `padding-section` > `[Content Wrapper]`.
- **BẮT BUỘC Chiến lược đặt tên (MAS-V2-001):** 
    - Custom: `[component]_[element]` (Bắt buộc dùng dấu `_` để phân tách component/element).
    - Utility: `[property]-[value]` (Chỉ dùng dấu `-`, không được dùng `_`).
- **REJECT (Từ chối) mọi tên viết tắt:** Phải dùng tên đầy đủ (vd: dùng `button` thay vì `btn`) để đảm bảo tính "Human-readable".
- **KIỂM SOÁT REM (Chapter 4):** Trong Blueprint, mọi thông số phải ghi chú rõ giá trị PX gốc và giá trị REM mục tiêu (PX/16).
- **STRATEGY:** Chỉ định rõ layout Flex/Grid dựa trên logic Auto Layout của Figma.

---

## 2. Chỉ thị cho Operator (Giai đoạn Thực thi Webflow)

Operator thực thi dựa trên các tiêu chuẩn kỹ thuật (Theory Chapters 3, 4 & 5):

- **NATIVE BUILD ONLY (MAS-V2-012):** **TUYỆT ĐỐI CẤM** dùng `whtml_builder`. Sử dụng `element_builder` cho 100% phần tử để đảm bảo tính trong sạch của DOM.
- **TRANSFORMATION (Chapter 4):** Mọi giá trị PX từ Figma **BẮT BUỘC** phải chạy qua hàm `toRem()`. Tuyệt đối không để giá trị PX lọt vào Webflow Styles.
- **DISCOVERY FIRST:** Trước khi tạo Style mới, BẮT BUỘC phải kiểm tra hệ thống hiện có để tái sử dụng, tránh rác code.
- **VARIABLE BINDING (Chapter 5):** Ưu tiên gán thuộc tính vào Webflow Variables nếu Figma có sử dụng Tokens.
- **TRACEABILITY:** Gắn thuộc tính `data-figma-id` vào mọi element trên Webflow để phục vụ QA 1:1.
- **ASSET POLICY (MAS-V2-007):** Sử dụng Placeholder cho toàn bộ ảnh/icon để ưu tiên hoàn thiện Layout và Cấu trúc.

---

## 3. Quy trình Kiểm soát Chất lượng (QA Gate - MAS-V2-006)

Architect thực hiện QA đối soát dựa trên toàn bộ nền tảng tri thức:
1.  **Visual Fidelity:** Đạt độ tương đồng 100% so với Figma (Snapshot vs Figma).
2.  **Naming Consistency:** Đối soát với Chương 1 của tài liệu tri thức. Sai chuẩn `_` hoặc `-` -> **FAIL**.
3.  **Structural Integrity:** Đối soát với Chương 2 (Core Structure). Thiếu lớp layout hoặc nesting sai -> **FAIL**.
4.  **Unit & Variable Safety:** Đối soát với Chương 4 & 5. Dùng PX hoặc quên Bind Variable -> **FAIL**.
