# Standard Operating Procedure (SOP) - MAS V3 (Native Multi-Agent Orchestration)

Tài liệu này quy định quy trình vận hành tự động cho hệ thống MAS V3, sử dụng các Native Agents (`@pm`, `@architect`, `@operator`) để thực thi chặt chẽ các quy tắc hệ thống (MAS-V2-xxx).

---

## Giai đoạn 0: Khởi tạo & Audit (Setup & Audit)
*Mục tiêu: Đồng bộ hóa tri thức và bảo vệ tính toàn vẹn của Site.*

1.  **Dọn dẹp & Khởi tạo (Workspace Management):**
    - **Trường hợp Dự án Mới:** `@pm` điều phối `@operator` chạy `node scripts/archive-workspace.js` để sao lưu và xóa sạch. Sau đó chạy `node scripts/init-workspace.js --project "Tên Dự Án"`.
    - **Trường hợp Chuyển Trang (Page Transition):** TUYỆT ĐỐI KHÔNG xóa `design-system.json`, `meta.json`, `page_structure.json`. Chỉ dọn dẹp thư mục `blueprints/`, `contents/`, `rawdata/` của section cũ. (**MAS-V2-014**)
2.  **Audit Thực thi (Mandatory State Check):** Trước khi nhận lệnh build mới, `@pm` yêu cầu `@operator` thực hiện:
    - Quét toàn bộ Element Tree của trang đích (`get_all_elements`).
    - Quét danh sách Component (`get_all_components`).
    - Cập nhật tri thức vào `workspace/design-system.json`.
3.  **Đối soát Mapping (Update-First):** `@pm` đối soát Node ID Figma với Element ID hiện có. ƯU TIÊN phương án cập nhật (Update-First) nếu cấu trúc cũ đạt chuẩn. Chỉ tạo bản V2 nếu cấu trúc cũ không thể cứu vãn. (**MAS-V2-005, MAS-V2-014**)

---

## Giai đoạn 1: Thiết lập Bản vẽ (Blueprint)
*Mục tiêu: Tạo Blueprint chuẩn Client-First và cách ly dữ liệu.*

1.  **Trích xuất & Cách ly (Raw Data Isolation):** `@pm` gọi `@operator` thực hiện **Deep Extraction**.
    - Dữ liệu thô Figma ghi vào `workspace/rawdata/[section_id]_raw.json`. (**MAS-V2-011**)
    - Toàn bộ nội dung text và asset placeholder gộp vào một file `workspace/contents/[section_id]_content.json`. (**MAS-V2-009**)
2.  **Thiết kế (Blueprint Mandate):** `@pm` gọi `@architect` thực hiện:
    - Xác định rõ `"target_page"` và **Page ID**. (**MAS-V2-004**)
    - Thiết lập cấu trúc phân cấp toàn trang gồm `page-wrapper` và `main-wrapper` (<main>). (**MAS-V2-002**)
    - Đối với Global Components (Navbar, Footer), không được dùng placeholder, phải thiết kế cấu trúc chi tiết. (**MAS-V2-001**)
    - Sử dụng `workspace/page_structure.json` làm bản đồ chỉ mục định tuyến (Index Map). Tuyệt đối không lưu raw data tại đây. (**MAS-V2-010**)
3.  **DỪNG (Approval Gate):** `@pm` trình Blueprint cho User. Phải nhận được `Duyệt` mới thực thi.

---

## Giai đoạn 2: Xây dựng Tự động (Automated Execution)
*Mục tiêu: Thực thi xây dựng bằng Native Primitives.*

1.  **Thực thi (Micro-Chunking Protocol - MCP-352):** `@pm` điều phối `@operator` thực hiện theo thuật toán 3-5-2:
    - **Max 3 Nesting:** Build tối đa 3 lớp lồng nhau mỗi lượt.
    - **Max 5 Actions:** Không quá 5 hành động mỗi Turn.
    - **Verify every 2:** Cập nhật Element Tree sau mỗi 2 Micro-tasks.
2.  **Native Build Mandate:** **TUYỆT ĐỐI KHÔNG DÙNG `whtml_builder`**. Sử dụng `element_builder` cho 100% phần tử. (**MAS-V2-012**)
3.  **Placeholder Strategy:** Không tải asset thực tế, chỉ xây layout với placeholder chuẩn. (**MAS-V2-007**)
4.  **Sync:** Sau khi xây dựng xong cấu trúc Global Component, `@operator` phải chuyển đổi ngay thành Webflow Component. (**MAS-V2-001**)
5.  **Ghi nhật ký:** Ghi chi tiết vào `workspace/state.json`.

---

## Giai đoạn 3: Kiểm soát Chất lượng (QA Loop)
*Mục tiêu: Đảm bảo độ khớp 1:1 và không có lỗi kỹ thuật.*

1.  **Kiểm duyệt (QA Mandate):** `@pm` gọi `@architect` để:
    - BẮT BUỘC tự gọi tool snapshot thực tế trên Webflow để thẩm định, không đoán mò. (**MAS-V2-003**)
    - Trạng thái `[APPROVED]` chỉ được cấp khi đạt độ khớp 1:1 (Pixel-Perfect). (**MAS-V2-006**)
2.  **Xử lý lỗi:** Ghi nhật ký vào `workspace/error-logs.json`. Nếu `@architect` báo `[FIX]`, `@pm` điều phối `@operator` sửa lại.
