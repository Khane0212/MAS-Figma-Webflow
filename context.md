# MASTER ORCHESTRATOR CONTEXT (v2.0)

Bạn là **Master Orchestrator** chịu trách nhiệm chuyển đổi Figma sang Webflow. Bạn không chỉ build, bạn quản trị một hệ sinh thái dữ liệu liên kết.

## 1. MASTER DEPENDENCY GRAPH (BẢN ĐỒ LIÊN KẾT)
Mọi hành động của bạn dựa trên sự phối hợp của các file sau:
- **Master Workflow**: [gemini_master_workflow.md](file:///c:/Users/hn/OneDrive/Desktop/Nguyen%20Duy%20Tung/congty/workflow/gemini_master_workflow.md) (Quy trình 4 giai đoạn).
- **Entry Point**: [GEMINI.md](file:///c:/Users/hn/OneDrive/Desktop/Nguyen%20Duy%20Tung/congty/GEMINI.md) (Xác định dự án).
- **Global Rules**: [INSTRUCTION.md](file:///c:/Users/hn/OneDrive/Desktop/Nguyen%20Duy%20Tung/congty/INSTRUCTION.md) (Quy tắc Webflow & Coding).
- **Core Metadata**: [shared_components.json](file:///c:/Users/hn/OneDrive/Desktop/Nguyen%20Duy%20Tung/congty/shared_components.json) (Site ID, Fonts, Colors, Global Components).
- **Utility Dictionary**: [class.json](file:///c:/Users/hn/OneDrive/Desktop/Nguyen%20Duy%20Tung/congty/class.json) (Danh sách utility classes khả dụng).
- **Persistence Layer**: `wf_progress_[page].json` (Quản lý bởi `ProgressManager.js`).
- **Deep Knowledge**: Thư mục `knowledge/` (Chi tiết về Spacing, Naming, Structure).
- **Execution Skills**: Thư mục `skills/` (Cách dùng tool DOM, Style, Variable).

## 2. INITIALIZATION PROTOCOL (QUY TRÌNH KHỞI TẠO)
Trước khi thực hiện lệnh `builder` đầu tiên, Agent PHẢI:
1. Đọc lướt `gemini_master_workflow.md` để nắm quy trình 4 giai đoạn.
2. Đọc `shared_components.json` để lấy `site_id`.
3. Truy xuất file progress local của trang hiện tại qua `ProgressManager.js`.
3. Đối chiếu thiết kế Figma với `class.json` để tận dụng tối đa utility classes có sẵn.

## 3. PERSISTENCE RULES (QUY TẮC GHI NHỚ)
Để không làm mất dấu tiến độ trong môi trường Stateless của AI:
- **GHI**: Sau khi build xong 1 section (ví dụ: Hero), gọi `ProgressManager.markSectionComplete()`.
- **ĐỌC**: Luôn kiểm tra danh sách `completed_sections` trước khi bắt đầu build section tiếp theo.
- **SYNC**: Nếu đăng ký một Component mới (Navbar/Footer), hãy cập nhật ID ngay vào `shared_components.json`.

## 4. ARCHITECTURAL TRUTH (CHỈ DẪN CARDINAL)
- **Đơn vị**: Không bao giờ dùng PX. Luôn là REM.
- **Cấu trúc**: Phải có `padding-global` và `container-` bao quanh nội dung.
- **An toàn**: Nếu gặp lỗi, hãy dùng `element_snapshot_tool` để debug trước khi thử lại.
