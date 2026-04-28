# Standard Operating Procedure (SOP) - MAS V3 (Sub-Agent Orchestration)

Tài liệu này quy định quy trình vận hành tự động cho hệ thống MAS V3, nơi `@pm` đóng vai trò điều phối các Sub-Agent (`@architect` và `@operator`).

---

## Giai đoạn 0: Khởi tạo & Audit (Setup & Audit)
*Mục tiêu: Đồng bộ hóa tri thức về Style giữa Figma và Webflow.*

1.  **Nhận lệnh:** `@pm` tiếp nhận Figma URL/ID và Webflow Site ID từ User.
2.  **Audit Thực thi:** `@pm` gọi `invoke_agent("operator")` để:
    - Quét Webflow Variables & Global Classes.
    - Quét Figma Global Styles (Colors, Typo).
    - Ghi dữ liệu vào `workspace/design-system.json`.
3.  **Audit Kiến trúc:** `@pm` gọi `invoke_agent("architect")` để:
    - Đối soát xung đột Style.
    - Đề xuất phương án đồng bộ.
4.  **Báo cáo:** `@pm` tóm tắt kết quả Audit và xin phép User đi tiếp Phase 1.

---

## Giai đoạn 1: Thiết lập Bản vẽ (Blueprint)
*Mục tiêu: Tạo Blueprint chuẩn Client-First cho từng Section.*

1.  **Trích xuất:** `@pm` gọi `invoke_agent("operator")` thực hiện **Deep Extraction** section Figma. Dữ liệu thô được ghi vào `workspace/blueprint.json`.
2.  **Context Sync:** `@pm` cung cấp thông tin về cấu trúc trang hiện tại (đã có page-wrapper/main-wrapper chưa?) cho `@architect`.
3.  **Thiết kế:** `@pm` gọi `invoke_agent("architect")` để:
    - Phân tích Raw Data và thông tin Context Sync.
    - Lập cấu trúc 6 lớp và đặt tên Class chuẩn Finsweet.
    - Xác định vị trí chèn (Vd: Nằm trong main-wrapper có sẵn).
    - Viết `rationale` giải thích logic.
    - Hoàn thiện `workspace/blueprint.json`.
4.  **DỪNG (Approval Gate):** `@pm` trình Blueprint cho User. Phải nhận được `Duyệt` mới chuyển sang Phase 2.

---

## Giai đoạn 2: Xây dựng Tự động (Automated Execution)
*Mục tiêu: Thực thi xây dựng trên Webflow Designer.*

1.  **Page Routing:** `@pm` yêu cầu `@operator` kiểm tra và di chuyển đến đúng trang đích (Target Page) tương ứng với Blueprint. Nếu trang chưa tồn tại, `@operator` phải tạo mới.
2.  **Thực thi:** `@pm` gọi `invoke_agent("operator")` để:
    - Đọc Blueprint đã duyệt.
    - Chụp Snapshot khu vực mục tiêu.
    - Tạo Styles, Variables và xây dựng cấu trúc HTML (Nesting).
    - Đảm bảo không tạo thừa page-wrapper/main-wrapper nếu đã có sẵn.
    - Đồng bộ trang Style Guide.
    - Ghi nhật ký vào `workspace/state.json`.
2.  **Báo cáo:** `@pm` thông báo hoàn tất thực thi và chuyển sang QA.

---

## Giai đoạn 3: Kiểm soát Chất lượng (QA Loop)
*Mục tiêu: Đảm bảo độ khớp 1:1 và không có lỗi kỹ thuật.*

1.  **Kiểm duyệt:** `@pm` gọi `invoke_agent("architect")` để:
    - Đối soát `state.json` với `blueprint.json`.
    - Kiểm tra 5 điểm (Visual, Naming, Structure, Units, Variables).
2.  **Xử lý kết quả:**
    - Nếu `@architect` báo `[APPROVED]`: `@pm` báo cáo User hoàn thành Section.
    - Nếu `@architect` báo `[FIX]`: `@pm` chuyển yêu cầu fix kèm chỉ dẫn chi tiết cho `@operator`. Sau khi fix, quay lại bước 1 của Giai đoạn 3.

---

## Giao thức Quản lý Lỗi (Error Logging Protocol)

Để đảm bảo tính minh bạch và khả năng truy vết, mọi Agent phải tuân thủ quy tắc ghi log sau:

1.  **Vị trí ghi log:** File `workspace/error-logs.json`.
2.  **Cấu trúc Log (theo Logger.formatEntry):**
    - `timestamp`: ISO String.
    - `agent`: "pm", "architect", hoặc "operator".
    - `phase`: Tên giai đoạn hiện tại (vd: "Blueprint").
    - `error_type`: Phân loại lỗi (vd: "Technical_Error", "QA_Rejection", "API_Timeout").
    - `message`: Mô tả lỗi ngắn gọn bằng tiếng Việt.
    - `context`: Chứa Node ID, Site ID, hoặc Snippet dữ liệu gây lỗi.
3.  **Quy trình xử lý:**
    - Khi gặp lỗi, Sub-Agent ghi log và báo cáo cho `@pm`.
    - `@pm` đọc log, thông báo cho User và đề xuất hướng giải quyết (tự fix hoặc chờ User can thiệp).
    - Sau khi lỗi được giải quyết, `@pm` cập nhật trạng thái `resolution: "fixed"` trong entry log tương ứng.

---

## Quy tắc Phối hợp (Orchestration Rules)

1.  **Tính độc lập:** Mỗi lần gọi `invoke_agent`, Sub-Agent hoạt động trong môi trường sạch, không bị ảnh hưởng bởi lịch sử trò chuyện của Agent khác.
2.  **Bằng chứng:** Mọi kết quả chuyển giao giữa các Agent PHẢI thông qua các file trong thư mục `workspace/`.
3.  **Quyền hạn:** 
    - `@pm`: Điều phối, báo cáo, hỏi ý kiến User.
    - `@architect`: Đọc/Ghi Blueprint, Đọc State, QA.
    - `@operator`: Đọc Blueprint, Ghi State, Gọi MCP Tools.
