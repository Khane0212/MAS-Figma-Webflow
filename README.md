# MAS-Cursor: Figma to Webflow Client-First Orchestrator (V3.0)

Hệ thống MAS V3 là một bộ khung **Agentic Workflow tự động hóa** chuyên dụng để chuyển đổi thiết kế từ Figma sang Webflow theo tiêu chuẩn **Client-First V2**. 

Kiến trúc V3 chuyển đổi từ việc điều phối thủ công sang **Sub-Agent Orchestration**, nơi `@pm` (The Orchestrator) tự động gọi các Sub-Agent chuyên biệt thông qua môi trường thực thi độc lập, đảm bảo tính khách quan và hiệu quả cao nhất.

## Kiến trúc Agent (MAS V3)
Hệ thống vận hành thông qua sự điều phối của `@pm` và các Sub-Agent:

*   **@PM (The Orchestrator):** Trung tâm điều phối, quản lý quy trình (SOP), và là điểm giao tiếp duy nhất với User.
*   **@Architect (Sub-Agent):** Chuyên gia logic, lập Blueprint thiết kế chuẩn Finsweet và thực hiện QA đối soát 1:1.
*   **@Operator (Sub-Agent):** Chuyên gia thực thi, trích xuất dữ liệu Figma và xây dựng trên Webflow Designer.

## Quy trình vận hành (Automated Pipeline)
1.  **Phase 0 - Audit:** Đồng bộ Style Guide giữa Figma và Webflow.
2.  **Phase 1 - Blueprint:** Trích xuất dữ liệu và thiết kế bản vẽ kỹ thuật.
3.  **Phase 2 - Execution:** Thực thi xây dựng tự động trên Webflow.
4.  **Phase 3 - QA Loop:** Kiểm duyệt chất lượng và sửa lỗi tự động.

## Hướng dẫn Khởi động (Master Start Prompts V3)

### 1. Khởi tạo Dự án (Phase 0)
```markdown
Đóng vai trò @PM. 
Hãy bắt đầu Phase 0 (Audit) cho dự án mới:
- Figma URL/ID: [Link/ID]
- Webflow Site ID: [Site ID]

Yêu cầu: Điều phối các Sub-Agent để hoàn thành `workspace/design-system.json` và báo cáo kết quả cho tôi.
```

### 2. Thiết kế Section (Phase 1)
```markdown
Đóng vai trò @PM. 
Hãy thực hiện Phase 1 (Blueprint) cho Section sau:
- Node ID Figma: [Node ID]
- Tên Section: [Tên]

Yêu cầu: Điều phối @operator trích xuất và @architect thiết kế Blueprint chuẩn Client-First. Dừng lại báo cáo Blueprint cho tôi duyệt.
```

### 3. Thực thi Xây dựng (Phase 2 & 3)
```markdown
Blueprint đã duyệt. Đóng vai trò @PM, hãy thực hiện Phase 2 (Execution) và Phase 3 (QA).
Yêu cầu: 
1. Điều phối @operator xây dựng trên Webflow.
2. Điều phối @architect thực hiện QA.
3. Nếu có lỗi, tự động điều phối sửa đổi cho đến khi đạt thẻ [APPROVED].
```

## Nguyên tắc Thép
*   **No Manual Copy:** Cấm mọi hình thức copy/paste dữ liệu JSON thủ công giữa các Agent.
*   **Independent Threads:** Sub-Agent phải được gọi qua `invoke_agent` để đảm bảo tính độc lập.
*   **Evidence-First:** Mọi báo cáo phải dựa trên dữ liệu thực tế từ thư mục `workspace/`.
*   **rem-Only:** Tuyệt đối không dùng pixel trong Webflow.

## Cấu trúc Thư mục
*   `/agents`: Định nghĩa vai trò @pm, @architect, @operator.
*   `/workspace`: Dữ liệu trạng thái dự án (Blueprint, State, Design System).
*   `/knowledge-base`: Tri thức nền tảng và quy tắc dự án.
*   `/skills`: Kỹ năng chuyên môn cho từng vai trò.
