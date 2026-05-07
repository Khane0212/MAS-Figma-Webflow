# Standard Operating Procedure (SOP) - MAS V3 (Sub-Agent Orchestration)

Tài liệu này quy định quy trình vận hành tự động cho hệ thống MAS V3, nơi `@pm` đóng vai trò điều phối các Sub-Agent (`@architect` và `@operator`).

---

## Giai đoạn 0: Khởi tạo & Audit (Setup & Audit)
*Mục tiêu: Đồng bộ hóa tri thức về Style giữa Figma và Webflow và đảm bảo Workspace sạch sẽ.*

1.  **Dọn dẹp & Khởi tạo (Workspace Rotation):** `@pm` kiểm tra thư mục `workspace/`. 
    - Nếu có dữ liệu cũ chưa dọn dẹp, `@pm` sẽ xin phép User chạy lệnh `node scripts/archive-workspace.js` để sao lưu và làm sạch.
    - Tiếp theo, chạy `node scripts/init-workspace.js --project "Tên Dự Án"` để khởi tạo cấu trúc thư mục mới (`blueprints/`, `contents/`) và file `meta.json`.
2.  **Nhận lệnh:** `@pm` tiếp nhận Figma URL/ID và Webflow Site ID từ User.
3.  **Audit Thực thi:** `@pm` gọi `invoke_agent("generalist")` nhập vai **@operator** để:
    - Quét Webflow Variables & Global Classes.
    - Quét Figma Global Styles (Colors, Typo).
    - Ghi dữ liệu vào `workspace/design-system.json`.
4.  **Audit Kiến trúc:** `@pm` gọi `invoke_agent("generalist")` nhập vai **@architect** để:
    - Đối soát xung đột Style.
    - Đề xuất phương án đồng bộ.
5.  **Báo cáo:** `@pm` tóm tắt kết quả Audit và xin phép User đi tiếp Phase 1.

---

## Giai đoạn 1: Thiết lập Bản vẽ (Blueprint)
*Mục tiêu: Tạo Blueprint chuẩn Client-First cho từng Section.*

1.  **Trích xuất:** `@pm` gọi `invoke_agent("generalist")` nhập vai **@operator** thực hiện **Deep Extraction** section Figma. 
    - Cấu trúc kỹ thuật được ghi vào một file riêng lẻ trong thư mục `workspace/blueprints/[section_id].json`.
    - Toàn bộ nội dung text và asset được tách vào thư mục `workspace/contents/` dưới dạng các file nhỏ (VD: `[content_key].json`) để tối ưu bộ nhớ.
2.  **Context Sync:** `@pm` cung cấp thông tin về cấu trúc trang hiện tại (đã có page-wrapper/main-wrapper chưa?) cho `@architect`.
3.  **Thiết kế:** `@pm` gọi `invoke_agent("generalist")` nhập vai **@architect** để:
    - Phân tích Raw Data và thông tin Context Sync.
    - Lập cấu trúc 6 lớp và đặt tên Class chuẩn Finsweet.
    - Xác định vị trí chèn (Vd: Nằm trong main-wrapper có sẵn).
    - Viết `rationale` giải thích logic.
    - Hoàn thiện file `workspace/blueprints/[section_id].json` và kiểm tra khớp nối các `[content_key].json`.
4.  **DỪNG (Approval Gate):** `@pm` trình Blueprint và Content cho User. Phải nhận được `Duyệt` mới chuyển sang Phase 2.

## Giai đoạn 2: Xây dựng Tự động (Automated Execution)
*Mục tiêu: Thực thi xây dựng trên Webflow Designer.*

1.  **Page Routing:** `@pm` yêu cầu `invoke_agent("generalist")` nhập vai **@operator** kiểm tra và di chuyển đến đúng trang đích (Target Page) tương ứng với Blueprint. Nếu trang chưa tồn tại, `@operator` phải tạo mới.
2.  **Thực thi:** `@pm` gọi `invoke_agent("generalist")` nhập vai **@operator** để:
    - Đọc file Blueprint của section tương ứng.
    - **Smart Data Access:** Đọc trực tiếp các file `[content_key].json` tương ứng trong thư mục `workspace/contents/` thay vì quét toàn bộ thư mục.
    - **Placeholder Strategy (MAS-V2-007):** Bỏ qua việc load và mapping các Assets hình ảnh/icon thực tế. `@operator` chỉ xây dựng cấu trúc DOM hoàn chỉnh và sử dụng các thẻ hình ảnh trống hoặc Div placeholder với class và kích thước chuẩn.
    - Chụp Snapshot khu vực mục tiêu.
    - Tạo Styles, Variables và xây dựng cấu trúc HTML (Nesting).
    - Đảm bảo không tạo thừa page-wrapper/main-wrapper nếu đã có sẵn.
    - Đồng bộ trang Style Guide.
    - Ghi nhật ký vào `workspace/state.json`.
2.  **Báo cáo:** `@pm` thông báo hoàn tất thực thi và chuyển sang QA.

---

## Giai đoạn 3: Kiểm soát Chất lượng (QA Loop)
*Mục tiêu: Đảm bảo độ khớp 1:1 và không có lỗi kỹ thuật.*

1.  **Kiểm duyệt:** `@pm` gọi `invoke_agent("generalist")` nhập vai **@architect** để:
    - Đối soát `state.json` với file Blueprint của section tương ứng trong `blueprints/`.
    - Kiểm tra 5 điểm (Visual, Naming, Structure, Units, Variables).
2.  **Xử lý kết quả:**
    - Nếu `@architect` báo `[APPROVED]`: `@pm` báo cáo User hoàn thành Section.
    - Nếu `@architect` báo `[FIX]`: `@pm` chuyển yêu cầu fix kèm chỉ dẫn chi tiết cho `invoke_agent("generalist")` nhập vai **@operator**. Sau khi fix, quay lại bước 1 của Giai đoạn 3.

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

1. **Tính độc lập:** Sử dụng `invoke_agent("generalist")` kèm theo chỉ thị persona cụ thể (đọc từ `agents/operator.md` hoặc `agents/architect.md`). Điều này đảm bảo Sub-Agent hoạt động trong môi trường sạch, không bị ảnh hưởng bởi lịch sử trò chuyện của Agent khác.
2. **Rule-Compliance Audit (BẮT BUỘC):** Mọi Sub-Agent khi thực hiện nhiệm vụ BẮT BUỘC phải đọc file `knowledge-base/project-rules.md`. Trong báo cáo kết quả, Sub-Agent phải liệt kê các mã quy tắc (VD: MAS-V2-002, MAS-DS-001) đã được áp dụng và đối soát.
3.  **Bằng chứng:** Mọi kết quả chuyển giao giữa các Agent PHẢI thông qua các file trong thư mục `workspace/`.
4.  **Quyền hạn:** 
    - `@pm`: Điều phối, báo cáo, hỏi ý kiến User. Có quyền REJECT ngay lập tức nếu Sub-Agent không thực hiện bước Rule-Compliance Audit.
    - `@architect`: Đọc/Ghi Blueprint, Đọc State, QA.
    - `@operator`: Đọc Blueprint, Ghi State, Gọi MCP Tools.
