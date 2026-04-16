# Figma-to-Webflow Master Orchestration (Agent-Oriented)

Chào mừng bạn đến với hệ thống điều phối chuyển đổi thiết kế Figma sang Webflow chuyên nghiệp. Đây là một không gian làm việc được tối ưu hóa đặc biệt cho các AI Agent (như Gemini) phối hợp cùng hệ thống MCP (Model Context Protocol).

## 🚀 Tổng quan dự án
Dự án này là một **Hệ điều hành cho AI Agent**, giúp tự động hóa quá trình xây dựng website tuân thủ tiêu chuẩn **Finsweet Client-First**.

## 📂 Cấu trúc thư mục
- `context`: Bản đồ liên kết file và bộ não điều phối dự án.
- `workflow/`: Quy trình 4 giai đoạn thực thi (Figma -> Tư duy -> Webflow -> Audit).
- `knowledge/`: Quy chuẩn thiết kế (Structure, Naming, Spacing, Typography).
- `skills/`: Hướng dẫn chuyên sâu cho từng nhóm công cụ MCP.
- `shared_components.json`: Metadata về site và các thành phần toàn cục.
- `ProgressManager.js`: Logic quản lý tiến độ build.

## 🛠 Hướng dẫn sử dụng cho Agent
Nếu bạn là một AI Agent mới "bước vào" dự án này, hãy tuân thủ nghiêm ngặt lộ trình sau:
1. Đọc **`GEMINI.md`** để nhận diện Entry Point.
2. Đọc **`INSTRUCTION.md`** để hiểu quy định chung và Workflow.
3. Đọc **`context`** để nắm bắt Master Dependency Graph.
4. Kiểm tra **`shared_components.json`** để xác định Site thực thi.
5. Kiểm tra file progress local để biết điểm dừng cuối cùng.

## 📐 Quy chuẩn Client-First
Dự án yêu cầu tuân thủ đúng cấu trúc phân cấp:
`page-wrapper` > `main-wrapper` > `section_` > `padding-global` > `container-` > `padding-section-` > `_component`.

## 📝 Đóng góp & Phát triển
Mọi thay đổi về kiến trúc hệ thống cần được cập nhật vào file `context` và `INSTRUCTION.md` để đảm bảo tính nhất quán cho các phiên làm việc của AI về sau.
