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

## Hướng dẫn Khởi động (Master Start Prompts)
Để giao tiếp và điều phối hệ thống MAS một cách chính xác nhất, hãy sử dụng các mẫu Prompt chuẩn dưới đây tùy theo tình huống:

### 1. Khởi tạo Dự án Mới (Bắt đầu Giai đoạn 0)
*Dùng khi bạn bắt đầu làm một dự án hoàn toàn mới hoặc muốn xóa sạch bộ nhớ tạm của dự án cũ.*

```markdown
Đóng vai trò @PM.
Yêu cầu: Dọn dẹp thông tin cũ (Clean Start Protocol).
Dự án mới đã sẵn sàng. Đây là thông tin đầu vào:
- Figma URL/ID: [Dán link Figma hoặc Figma ID vào đây]
- Webflow Site ID: [Dán Webflow Site ID vào đây, hoặc bỏ trống nếu đã hardcode trong webflow-client.mjs]

Hãy bắt đầu Giai đoạn 0 (Pre-flight Audit):
1. Ra lệnh @Executor quét Webflow Variables/Styles hiện tại.
2. Ra lệnh @Reader quét Global Styles từ Figma.
3. Ra lệnh @Analyst đối soát để tạo bản đồ `style-guide-map.json`.
Dừng lại và báo cáo kết quả tóm tắt cho tôi duyệt trước khi đi tiếp.
```

### 2. Bắt đầu Dựng một Section cụ thể (Giai đoạn 1 & 2)
*Dùng sau khi Giai đoạn 0 đã hoàn tất, và bạn muốn chỉ định hệ thống cắt HTML/CSS cho một khu vực cụ thể trên Figma (ví dụ: Header, Hero, Footer).*

```markdown
Đóng vai trò @PM.
Hãy bắt đầu Giai đoạn 1 (Chunked Discovery) và Giai đoạn 2 (Logic Analysis) cho Section sau:
- Node ID trên Figma: [Dán Node ID của thẻ cha chứa Section, ví dụ: 12:345]
- Tên Section: [Ví dụ: Hero Section / Navigation Bar]

Yêu cầu:
1. @Reader trích xuất dữ liệu thô.
2. @Analyst phân tích, ánh xạ biến (Variable-First) và xuất Blueprint JSON. Đảm bảo tuân thủ nghiêm ngặt Fluid Responsive (rem/clamp) và Semantic HTML.
Dừng lại và in ra Blueprint cho tôi duyệt trước khi cho phép QA và Executor làm việc.
```

### 3. Cấp phép Thực thi (Giai đoạn 3 & 4)
*Dùng khi hệ thống đang DỪNG LẠI chờ bạn duyệt bản nháp HTML/JSON hoặc sau khi QA báo PASS.*

```markdown
Blueprint hợp lệ. Tôi đồng ý duyệt.
Đóng vai trò @PM. Hãy xử lý QA Gate (Cách ly Vật lý):
1. Yêu cầu @Executor phác thảo Draft HTML/JSON và lưu vào `workspace/03-draft-payloads.json`.
2. DỪNG HỆ THỐNG. Yêu cầu tôi (User) đem file nháp và `agents/qa.md` sang một cửa sổ chat hoàn toàn mới để thẩm định độc lập.
3. Chờ tôi nhập kết quả [PASS] hoặc [FAIL] để đi tiếp Giai đoạn 4 hoặc sửa lỗi.
4. Nếu [PASS], ra lệnh tiêm (inject) Payload lên Webflow qua MCP, Verify DOM và cập nhật Log.
```

### 4. Khôi phục Phiên làm việc (Resume)
*Dùng khi bạn vừa mở lại hệ thống sau khi tắt máy hoặc bị crash.*

```markdown
Đóng vai trò @PM.
Hãy đọc file `workspace/00-project-state.json` và `workspace/03-execution-log.json` để kiểm tra tiến độ hiện tại.
Báo cáo cho tôi biết dự án đang dừng ở Giai đoạn nào, Section nào, và đề xuất bước chạy tiếp theo theo đúng SOP.
```

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
