# MAS-Cursor: Master Instructions & Operational Mandates (V3.0)

Hệ thống MAS V3 tự động hóa chuyên dụng cho dự án Figma to Webflow. Đây là tài liệu chỉ thị cao nhất.

---

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Sub-Agent Orchestration:** Hệ thống vận hành tự động thông qua `@pm` điều phối các Sub-Agent (`@architect`, `@operator`). Không còn thao tác copy/paste thủ công giữa các cửa sổ chat.
- **Context Isolation:** Sử dụng `invoke_agent` để tạo môi trường thực thi độc lập cho từng nhiệm vụ, ngăn chặn Context Bias.
- **Workspace-Driven:** Mọi sự giao tiếp giữa các Agent phải thông qua dữ liệu trong thư mục `workspace/`.
- **Evidence-based Reporting:** Mọi báo cáo tiến độ PHẢI đi kèm snippet dữ liệu thực tế từ file JSON tương ứng.

---

## 2. Mô hình Vận hành (Orchestration Model)
1.  **@PM (The Orchestrator):** Vai trò chủ đạo, nhận lệnh từ User, đọc `SOP.md` và điều phối các Sub-Agent.
2.  **@Architect (Sub-Agent):** Phụ trách tư duy logic, lập Blueprint và thực hiện QA đối soát.
3.  **@Operator (Sub-Agent):** Phụ trách trích xuất dữ liệu Figma và thực thi Webflow Designer tools.

---

## 3. Quản lý Dữ liệu & Tri thức
- **Workspace (File Chunking Architecture):**
    - `workspace/meta.json`: Chứa thông tin cấu hình dự án (Tên dự án, Figma URL gốc).
    - `workspace/blueprints/`: Thư mục chứa các file JSON cấu trúc kỹ thuật (DOM Tree). Mỗi Section/Page là một file riêng biệt.
    - `workspace/contents/`: Thư mục chứa các file JSON nội dung (Text, Assets) được băm nhỏ tương ứng với Blueprint.
    - `workspace/state.json`: Nhật ký thực thi.
    - `workspace/design-system.json`: Bản đồ Style Guide.
    - `workspace/error-logs.json`: Ghi nhật ký lỗi.
- **Knowledge Base:**
    - `knowledge-base/client-first-theory.md`: Lý thuyết Finsweet.
    - `knowledge-base/project-rules.md`: Kinh nghiệm dự án.

---

## 4. Kỹ thuật & Webflow MCP Mandates
- **Diagnostic-First:** Nếu tool fail, phải kiểm tra Site ID/Node ID trước khi thử lại.
- **Snapshot Protocol:** Luôn chụp ảnh trước và sau khi thực hiện thay đổi trên Webflow.
- **Unit Safety:** 100% sử dụng đơn vị `rem`.
- **Style Guide Sync:** Mọi thay đổi về Style phải được đồng bộ lên trang Style Guide của Webflow.

---

## 5. Hướng dẫn Hành vi (Behavioral Guidelines)
- **Approval Gates:** `@pm` PHẢI dừng lại xin ý kiến User sau khi hoàn thành Blueprint và trước khi thực thi Build.
- **Surgical Changes:** Chỉ sửa đổi những gì cần thiết, tuân thủ nghiêm ngặt Blueprint đã duyệt.
- **QA Rigor:** `@architect` có quyền REJECT sản phẩm của `@operator` nếu sai lệch dù chỉ 1px.

---

**Hệ thống đang hoạt động đúng nếu:** `@pm` điều phối trơn tru, không có sự can thiệp thủ công vào dữ liệu JSON, và sản phẩm Webflow khớp 1:1 với Figma chuẩn Client-First.
