# Figma2Webflow-AW: AI-Driven Agentic Workflow (MAS V3)

Figma2Webflow-AW (Agentic Workflow) là một hệ thống tự động hóa chuyên dụng giúp chuyển đổi thiết kế từ Figma sang Webflow một cách chính xác theo tiêu chuẩn **Client-First V2** (Finsweet), vận hành dựa trên kiến trúc **Multi-Agent Orchestration (MAS V3)**.

Hệ thống hoạt động như một **Team sản xuất Web ảo**, nơi bạn đóng vai trò là Khách hàng (User), giao tiếp với Quản lý Dự án ảo (`@pm`) để điều phối các chuyên gia chuyên biệt (`@architect` và `@operator`) thực thi công việc.

---

## Cách Vận hành Hệ thống (MAS V3)

Dữ liệu dự án được cách ly và quản lý chặt chẽ trong thư mục `workspace/` để tránh lỗi tràn ngữ cảnh (Context Overflow).

### Mô hình Multi-Agent
- **`@pm` (The Orchestrator):** Điều phối viên trung tâm, thực thi nghiêm ngặt `SOP.md` và quản lý `SESSION_HANDOFF.md`.
- **`@architect` (Logic & QA):** Chuyên gia về Finsweet Client-First. Lập Blueprint kỹ thuật và thực hiện QA đối soát 1:1 (Pixel-Perfect) thông qua snapshot thực tế.
- **`@operator` (Execution):** Chuyên gia thực thi. Trích xuất dữ liệu sâu từ Figma và xây dựng Webflow bằng bộ công cụ Native Primitives (`element_builder`), TUYỆT ĐỐI không dùng code nhúng.

### Quy trình 4 Giai đoạn (SOP)
1.  **Phase 0 (Setup & Audit):** Quét Site ID, Node ID và đồng bộ Style Guide vào `design-system.json`.
2.  **Phase 1 (Deep Extraction & Blueprint):** Trích xuất dữ liệu thô (`rawdata/`), tách nội dung (`contents/`) và lập bản vẽ kỹ thuật (`blueprints/`).
3.  **Phase 2 (Automated Execution):** Xây dựng Webflow bằng thuật toán **Micro-Chunking (MCP-352)** (Xây nông, chèn sâu, kiểm soát liên tục).
4.  **Phase 3 (QA Loop):** Đối soát snapshot thực tế với Figma. Chỉ cấp trạng thái `[APPROVED]` khi đạt độ khớp 1:1.

---

## Cấu trúc Dữ liệu Workspace (File Chunking)

Hệ thống băm nhỏ dữ liệu để AI luôn hoạt động trong trạng thái minh mẫn nhất:
*   `workspace/meta.json`: Thông tin cấu hình dự án & link Figma.
*   `workspace/page_structure.json`: Bản đồ chỉ mục (Index Map) định tuyến toàn trang.
*   `workspace/blueprints/`: Chứa các bản vẽ DOM Tree Client-First của từng Section.
*   `workspace/contents/`: Chứa nội dung tĩnh (Text, Images) đã được gộp để chống phân mảnh.
*   `workspace/rawdata/`: Dữ liệu thiết kế thô trích xuất từ Figma API.
*   `workspace/design-system.json`: Tri thức về Variables và Styles của Site.
*   `workspace/state.json`: Nhật ký thực thi thời gian thực.
*   `workspace/error-logs.json`: Truy vết và xử lý lỗi QA.

---

## Credits & Copyright
*   **Kiến trúc sư hệ thống:** Khang Nguyễn
*   **Tiêu chuẩn:** Finsweet Client-First V2
