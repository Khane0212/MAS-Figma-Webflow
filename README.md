# MAS-Cursor: Figma to Webflow Client-First Orchestrator (V2)

Hệ thống này là một bộ khung **Agentic Workflow nâng cao** mô phỏng kiến trúc Multi-Agent System (Simulated MAS) thông qua kỹ thuật **Role-playing / Persona Prompting**. Hệ thống được thiết kế chuyên dụng để tự động hóa chuyển đổi thiết kế từ Figma sang Webflow theo tiêu chuẩn **Client-First V2** với tính kỷ luật cực cao, đảm bảo tuân thủ quy trình (SOP) qua quản lý trạng thái bằng các file `workspace`.

*Lưu ý về kiến trúc: Thay vì khởi tạo các luồng AI riêng biệt, toàn bộ các "Agent" trong hệ thống chia sẻ chung một Context Window và được kích hoạt tuần tự. Chúng lưu trữ và giao tiếp thông tin qua việc đọc/ghi các file JSON trung gian (State Management).*

## Kiến trúc Agent (Role-playing Personas)
Hệ thống vận hành bằng cách luân chuyển linh hoạt giữa các vai trò (Personas) dưới sự điều phối của một luồng chính:

*   **@PM (The Orchestrator):** Vai trò chủ đạo giám sát dự án, quản lý Log trạng thái, điều phối các "Mũ" (Hats/Personas) khác và bảo đảm quy trình QA.
*   **@Reader (The Scout):** Nhiệm vụ chuyên biệt để trích xuất và làm sạch dữ liệu từ Figma (Auto Layout, Node trees, Variables).
*   **@Analyst (The Architect):** Chuyên tư duy thiết kế Blueprint logic, vạch ra các quy đổi Class và Variable tuân theo Design System Client-First.
*   **@Executor (The Builder):** Khởi tạo hành động thông qua Webflow MCP Server (Giao tiếp an toàn bằng shell args kiểu Node.js eval/Base64).
*   **@QA (The Gatekeeper):** Vai trò chốt chặn cuối cùng, kiểm duyệt chéo nội dung payload và cấu trúc HTML/CSS trước khi thực thi write đẩy lên Webflow.

## Quy trình vận hành (Pipeline)
1.  **Phase 0 - Pre-flight Audit:** Đối soát Style Guide giữa Figma và Webflow.
2.  **Phase 1 - Chunked Discovery:** Trích xuất dữ liệu Figma theo từng Section.
3.  **Phase 2 - Logic Analysis:** Tạo Blueprint và kiểm duyệt bởi @QA.
4.  **Phase 3 - Human-in-the-loop:** User phê duyệt Blueprint.
5.  **Phase 4 - QA & Build:** Phác thảo payload -> QA Gate -> Thực thi -> Verify post-build.

## Hướng dẫn Khởi động
Để bắt đầu hệ thống với độ chính xác cao nhất, hãy sử dụng **Master Start Prompt**:

> "Kích hoạt hệ thống MAS. Chỉ định Agent @PM làm người điều phối duy nhất. Đọc `workspace/03-execution-log.json` và tuân thủ nghiêm ngặt `SOP.md`. TUYỆT ĐỐI không vượt rào.
> 
> - Figma Link: [Link]
> - Webflow Site ID: [ID]
> - Bắt đầu từ Giai đoạn: [Số]"

## Cấu trúc Thư mục chính
*   `/agents`: Chứa định nghĩa vai trò và tính cách của các Agent.
*   `/skills`: Các bộ kỹ năng xử lý logic (Layout, Orchestration, QA).
*   `/workspace`: Lưu trữ dữ liệu tạm thời, log thực thi và các bản blueprint.
*   `/knowledge-base`: Lưu trữ Style Guide Map và các bài học kinh nghiệm (Lessons Learned).

## Nguyên tắc Thép
*   **Log-First:** @PM luôn đọc Log trước khi hành động.
*   **QA-Gate:** Không có lệnh Write nào được thực thi nếu @QA chưa "Pass".
*   **Rem-Only:** Tuyệt đối không sử dụng đơn vị Pixel trong Webflow.
*   **Variable-First:** Ưu tiên sử dụng Webflow Variables cho mọi thông số thiết kế.
