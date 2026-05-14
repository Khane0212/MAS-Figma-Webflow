# Figma2Webflow-AW: AI-Driven Agentic Workflow (MAS V3)

Figma2Webflow-AW là một hệ thống tự động hóa giúp chuyển đổi thiết kế từ Figma sang Webflow một cách chính xác theo tiêu chuẩn Client-First V2 (Finsweet). Hệ thống vận hành dựa trên kiến trúc Multi-Agent Orchestration (MAS V3), nơi các AI chuyên biệt phối hợp với nhau để thực thi dự án.

Hệ thống hoạt động như một Team sản xuất Web ảo, nơi bạn đóng vai trò là Khách hàng (User), giao tiếp với Quản lý Dự án ảo (@pm) để điều phối các chuyên gia chuyên biệt (@architect và @operator) thực thi công việc.

---

<<<<<<< HEAD
## Trạng thái Dự án Hiện tại

Dự án: Client-First Template 9
Trang đang triển khai: About Us

Các phần đã hoàn thành:
1. Navbar (Global Component)
2. About Hero
3. Who we are
4. Process
5. Mission/Vision
6. Benefits

---

=======
>>>>>>> 1082220af2bfb04984de13360d61422677b479db
## Cách Vận hành Hệ thống (MAS V3)

Dữ liệu dự án được quản lý trong thư mục workspace để tránh lỗi quá tải ngữ cảnh cho AI.

<<<<<<< HEAD
### Mô hình Đội ngũ AI
- @pm (Quản lý dự án): Người nhận yêu cầu từ bạn, điều phối quy trình và báo cáo tiến độ.
- @architect (Kiến trúc sư): Thiết kế bản vẽ kỹ thuật và kiểm tra chất lượng (QA) để đảm bảo độ chính xác tuyệt đối.
- @operator (Thợ xây): Trích xuất dữ liệu từ Figma và trực tiếp xây dựng trên Webflow Designer.

### Quy trình Làm việc chuẩn (SOP)
1. Giai đoạn 0 (Audit): AI quét thông tin dự án và Site Webflow để đồng bộ màu sắc, font chữ.
2. Giai đoạn 1 (Thiết kế): AI trích xuất dữ liệu Figma, lập bản vẽ kỹ thuật (Blueprint) và trình bạn duyệt.
3. Giai đoạn 2 (Xây dựng): Sau khi bạn duyệt bản vẽ, AI sẽ tự động xây dựng trên Webflow theo từng khối nhỏ (Micro-Chunking).
4. Giai đoạn 3 (Kiểm tra): AI tự chụp ảnh màn hình Webflow và đối soát với Figma. Chỉ khi khớp 100% mới báo cáo hoàn thành.

---

## Cấu trúc Dữ liệu
=======
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
>>>>>>> 1082220af2bfb04984de13360d61422677b479db

Hệ thống băm nhỏ dữ liệu để AI luôn hoạt động hiệu quả:
- workspace/meta.json: Thông tin dự án và link Figma.
- workspace/blueprints/: Các bản vẽ kỹ thuật của từng phần.
- workspace/contents/: Nội dung văn bản và hình ảnh.
- workspace/rawdata/: Dữ liệu thô từ Figma.
- workspace/design-system.json: Cấu hình màu sắc và kiểu chữ.
- workspace/state.json: Nhật ký công việc của AI.

---

<<<<<<< HEAD
## Lưu ý cho Người dùng
Dữ liệu trong thư mục workspace là tạm thời và được AI sử dụng để ghi nhớ tiến độ. Bạn không nên tự ý chỉnh sửa các file trong thư mục này trừ khi được AI yêu cầu.

Tác giả: Khang Nguyễn
Tiêu chuẩn: Finsweet Client-First V2
=======
## Credits & Copyright
*   **Kiến trúc sư hệ thống:** Khang Nguyễn
*   **Tiêu chuẩn:** Finsweet Client-First V2
>>>>>>> 1082220af2bfb04984de13360d61422677b479db
