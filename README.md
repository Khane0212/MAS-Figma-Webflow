# MAS-Cursor V3: AI-Driven Figma to Webflow Orchestrator

MAS V3 (Multi-Agent System) là một nền tảng tự động hóa giúp bạn chuyển đổi thiết kế từ Figma sang Webflow một cách chính xác theo tiêu chuẩn **Client-First V2** (Finsweet). 

Hệ thống hoạt động như một **Team sản xuất Web ảo**, nơi bạn đóng vai trò là Khách hàng (User), giao tiếp với Quản lý Dự án ảo (`@pm`) để ra lệnh cho các chuyên gia ảo (`@architect` và `@operator`) thực thi công việc.

---

## 🛠 Cách Cài đặt & Khởi động Dự án Mới

Dữ liệu của dự án được lưu cục bộ trong thư mục `workspace/`. Để đảm bảo dữ liệu không bị lẫn lộn giữa các dự án khác nhau, MAS V3 sử dụng cơ chế **Xoay vòng Workspace**.

Bạn cần thao tác qua Terminal (Command Prompt / PowerShell) trước khi giao việc cho AI.

### 1. Khởi tạo một Dự án Mới
Mở terminal trong thư mục `agentic-workflow` và chạy lệnh sau:
```bash
node scripts/init-workspace.js --project "Tên Dự Án Của Bạn"
```
*Lệnh này sẽ tạo ra các thư mục trống và sạch sẽ để AI bắt đầu làm việc.*

### 2. Dọn dẹp & Lưu trữ Dự án Cũ
Khi bạn đã hoàn thành một dự án và muốn bắt đầu dự án mới, hãy cất dự án cũ đi:
```bash
node scripts/archive-workspace.js
```
*Lệnh này sẽ nén toàn bộ dữ liệu dự án hiện tại thành một file `.zip` cất vào thư mục `archives/` và xóa sạch `workspace/`.*

### 3. Phục hồi Dự án Cũ
Nếu khách hàng yêu cầu sửa lại dự án tháng trước, hãy lấy lại dữ liệu:
```bash
node scripts/restore-workspace.js
```
*Hệ thống sẽ liệt kê các file backup. Bạn chỉ cần làm theo hướng dẫn trên màn hình để giải nén lại dữ liệu.*

---

## 🤖 Hướng dẫn Giao tiếp với AI (Master Prompts)

Trong giao diện chat của Cursor/Gemini, bạn **CHỈ CẦN** giao tiếp với `@PM`. `@PM` sẽ tự động chỉ đạo các Sub-Agent khác.

Dưới đây là các mẫu câu lệnh (Prompts) chuẩn để bạn copy & paste khi làm việc:

### Giai đoạn 0: Bắt đầu & Phân tích (Audit)
*Dùng khi mới bắt đầu dự án. AI sẽ quét màu sắc, font chữ để đồng bộ.*

> **Prompt:**
> "Đóng vai trò @PM. Hãy bắt đầu Phase 0 (Audit) cho dự án:
> - Figma URL: `[Dán Link Figma của bạn vào đây]`
> - Webflow Site ID: `[Dán Site ID của bạn vào đây]`
> 
> Hãy thực hiện quét Style Guide và báo cáo cho tôi."

### Giai đoạn 1: Ra lệnh Thiết kế (Blueprint)
*Dùng khi bạn muốn AI bắt đầu làm một phần (Section) cụ thể trên trang web (Vd: Hero, Footer, Contact Form).*

> **Prompt:**
> "Đóng vai trò @PM. Hãy làm Phase 1 (Thiết kế Blueprint) cho phần:
> - Tên Section: `[Vd: Contact Form]`
> - Figma Node ID: `[Vd: 706:793 - Lấy từ URL Figma]`
> 
> Hãy trích xuất dữ liệu, lập bản vẽ kiến trúc 6 lớp và trình bày cho tôi duyệt trước khi code."

### Giai đoạn 2: Cho phép Xây dựng trên Webflow (Execute)
*Dùng SAU KHI bạn đã đọc bản vẽ (Blueprint) của AI ở Giai đoạn 1 và thấy hợp lý.*

> **Prompt:**
> "Bản vẽ (Blueprint) OK. Đóng vai trò @PM, hãy thực thi Phase 2 (Build) và Phase 3 (QA). 
> Cứ tự động xây dựng trên Webflow Designer và tự sửa lỗi nếu có. Xong xuôi thì báo cáo kết quả cuối cùng cho tôi."

---

## 🏗 Kiến trúc Hệ thống (Dành cho Developer)

Hệ thống hoạt động dựa trên cơ chế **Local File Chunking** để tối ưu hóa bộ nhớ cho AI (ngăn chặn lỗi Context Overflow).

*   **`@pm` (Quản lý):** Đọc `SOP.md` và điều phối toàn bộ quy trình.
*   **`@architect` (Kiến trúc sư):** Lập logic cấu trúc DOM, đặt tên class chuẩn Client-First. Đóng vai trò QA kiểm tra lỗi.
*   **`@operator` (Thợ xây):** Gọi công cụ (MCP Tools) để đọc Figma và thao tác kéo thả trên Webflow.

**Cấu trúc dữ liệu Workspace:**
*   `workspace/meta.json`: Lưu thông tin dự án hiện tại.
*   `workspace/blueprints/`: Chứa các file `.json` cấu trúc (DOM Tree) được băm nhỏ theo từng Section.
*   `workspace/contents/`: Chứa các file `.json` nội dung (Text, Image) của từng Section.
*   `workspace/design-system.json`: Biến màu sắc, Typo toàn cục.
*   `workspace/error-logs.json`: Ghi nhận lỗi hệ thống.
*   `workspace/state.json`: Nhật ký vết chân của các Agent.

---

## 👨‍💻 Credits
*   **Tác giả / Kiến trúc sư:** Khang Nguyễn
