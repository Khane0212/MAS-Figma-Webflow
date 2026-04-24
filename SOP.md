# Standard Operating Procedure (SOP) - Architect & Operator Model (Professional Edition)

Tài liệu này quy định quy trình vận hành chuẩn cho hệ thống MAS (Architect & Operator) để đảm bảo chất lượng thiết kế 1:1 và cấu trúc Client-First 100%.

---

## Giai đoạn 0: Khởi tạo & Audit hệ thống (Setup & Audit)

Mục tiêu: Thiết lập môi trường và nhận diện hệ thống Style hiện tại.

1.  **Thiết lập:** User cung cấp Figma Link/Node ID và Webflow Site ID.
2.  **Operator (Chat 2):**
    - Đọc `knowledge-base/project-rules.md`.
    - **Bắt buộc:** Gọi `webflow_guide_tool` đầu tiên.
    - Quét toàn bộ Webflow Variables và Global Classes hiện có.
    - Quét Global Styles (Colors, Typography) từ Figma.
    - Ghi dữ liệu vào `workspace/design-system.json`.
3.  **Architect (Chat 1):**
    - Đọc `knowledge-base/project-rules.md`.
    - Đọc `workspace/design-system.json`.
    - Đối soát xung đột: Phát hiện các Style trùng tên nhưng khác giá trị hoặc trùng giá trị nhưng khác tên.
    - Đề xuất phương án đồng bộ hệ thống Style cho User duyệt.

---

## Giai đoạn 1: Trích xuất & Phân tích chuyên sâu (Blueprint)

Mục tiêu: Tạo ra bản vẽ kỹ thuật chi tiết nhất trước khi xây dựng.

1.  **Operator (Chat 2):**
    - Đọc `knowledge-base/project-rules.md`.
    - Thực hiện **Deep Extraction** cho Section được chỉ định. Phải lấy đủ thông số "Vàng" (Layout, Typo, Spacing, Visuals). Lưu vào `workspace/blueprint.json` (phần raw data).
2.  **Architect (Chat 1):**
    - Đọc `knowledge-base/project-rules.md`.
    - Đọc `knowledge-base/client-first-theory.md` và `skills/client-first-rules.md`.
    - Phân tích Raw Data để lập cấu trúc 6 lớp: `section` > `padding-global` > `container` > `padding-section` > `component_wrapper` > `elements`.
    - Đặt tên Class (Custom `_` và Utility `-`) chuẩn Client-First.
    - **Bắt buộc:** Viết phần `rationale` giải thích logic chọn cấu trúc layout.
    - Hoàn thiện `workspace/blueprint.json`.
3.  **DỪNG:** User duyệt Blueprint.

---

## Giai đoạn 2: Thực thi & Chốt chặn phê duyệt (Execution & Approval Gate)

Mục tiêu: Xây dựng chính xác và an toàn trên Webflow Designer.

1.  **Operator (Chat 2):** 
    - Đọc `knowledge-base/project-rules.md`.
    - Tiếp nhận Blueprint đã duyệt.
2.  **Snapshot:** Sử dụng `element_snapshot_tool` để chụp ảnh trạng thái hiện tại của khu vực sẽ sửa đổi.
3.  **Pre-Execution Approval (Chốt chặn):**
    - Operator trình bày kế hoạch thực thi chi tiết (Ví dụ: "Tôi sẽ tạo 3 class mới, chèn 5 element vào section hero...").
    - **Chờ User xác nhận:** Chỉ thực hiện khi User gõ `Đồng ý` hoặc `Tiếp tục`.
4.  **Thực thi:** 
    - Bước 1: Tạo/Cập nhật Styles và Variables.
    - Bước 2: Xây dựng cấu trúc HTML (Nesting).
    - Bước 3: Áp dụng thuộc tính và nội dung.
    - Bước 4: Đồng bộ trực quan lên trang `Style Guide`.
5.  **Báo cáo:** Ghi nhật ký vào `workspace/state.json`.

---

## Giai đoạn 3: Kiểm duyệt chất lượng chuyên nghiệp (Professional QA Gate)

Mục tiêu: Đảm bảo độ khớp 1:1 và cấu trúc hoàn hảo.

1.  **Architect (Chat 1):** 
    - Đọc `knowledge-base/project-rules.md`.
    - Đọc `workspace/state.json` và tự chụp ảnh Snapshot kết quả thực tế từ Webflow.
2.  **Checklist đối soát 5 điểm:**
    - **Visual:** Khớp 100% màu sắc, font, hiệu ứng so với thiết kế Figma.
    - **Naming:** Custom class dùng `_`, Utility class dùng `-`, không viết tắt.
    - **Structure:** Đầy đủ 6 lớp layout, không lồng ghép dư thừa.
    - **Units:** 100% sử dụng đơn vị `rem`.
    - **Variables:** Đã bind đúng các biến Global thay vì dùng mã màu hex cứng.
3.  **Kết luận:** Trình thẻ `[APPROVED]` để hoàn tất Section hoặc `[FIX]` kèm chỉ dẫn chi tiết lỗi.

---

## Quy tắc giao tiếp & Bàn giao dữ liệu

- **Vai trò của User:** Là người "vận chuyển" dữ liệu JSON giữa 2 cửa sổ chat.
- **Bàn giao Blueprint:** Sau Giai đoạn 1, User copy `blueprint.json` từ Architect sang Operator.
- **Bàn giao Log/State:** Sau Giai đoạn 2, User copy `state.json` từ Operator sang Architect để QA.
- **Tính nhất quán:** Các Agent không được tự ý sửa file JSON nếu không có lệnh hoặc không thuộc phạm vi trách nhiệm của mình.
