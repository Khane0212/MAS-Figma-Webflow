# MAS-Cursor: Figma to Webflow Client-First Orchestrator (V2)

Hệ thống MAS (Multi-Agent System) là bộ khung điều phối AI chuyên dụng để chuyển đổi thiết kế từ Figma sang Webflow theo tiêu chuẩn **Client-First V2**. Hệ thống được thiết kế với tính kỷ luật cực cao, đảm bảo 100% tuân thủ quy trình và an toàn dữ liệu.

## Kiến trúc Agent
Hệ thống vận hành dưới sự điều hành của một Agent Orchestrator duy nhất:

*   **@PM (The Orchestrator):** Giám sát toàn bộ dự án, quản lý Log trạng thái, điều phối các Agent con và đảm bảo QA.
*   **@Reader (The Scout):** Trích xuất và làm sạch dữ liệu từ Figma (Auto Layout, Variables).
*   **@Analyst (The Architect):** Thiết kế Blueprint logic, quy đổi Class và Variable theo Client-First.
*   **@Executor (The Builder):** Thực thi lệnh thông qua Webflow MCP Server (Node.js eval/Base64).
*   **@QA (The Gatekeeper):** Chốt chặn cuối cùng, kiểm duyệt payload và cấu trúc HTML/CSS trước khi thực thi.

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
