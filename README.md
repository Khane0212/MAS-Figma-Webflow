# Figma2Webflow-AW: AI-Driven Agentic Workflow (MAS V3)

Figma2Webflow-AW là hệ thống tự động hóa giúp chuyển đổi thiết kế từ Figma sang Webflow một cách chính xác theo tiêu chuẩn Client-First V2 (Finsweet). Hệ thống sử dụng các AI chuyên biệt phối hợp với nhau để thực thi dự án.

Hệ thống hoạt động như một Team sản xuất Web ảo, nơi bạn đóng vai trò là Khách hàng (User), giao tiếp với Quản lý Dự án ảo (@pm) để điều phối các chuyên gia chuyên biệt (@architect và @operator).

---

## Hướng dẫn Vận hành

Dữ liệu dự án được quản lý trong thư mục workspace để tránh lỗi quá tải ngữ cảnh cho AI.

### Mô hình Đội ngũ AI
- @pm (Quản lý dự án): Người nhận yêu cầu từ bạn, điều phối quy trình và báo cáo tiến độ.
- @architect (Kiến trúc sư): Thiết kế bản vẽ kỹ thuật và kiểm tra chất lượng (QA).
- @operator (Thợ xây): Trích xuất dữ liệu từ Figma và xây dựng trên Webflow Designer.

### Quy trình Làm việc chuẩn (SOP)
1. Giai đoạn 0 (Audit): AI quét thông tin dự án để đồng bộ màu sắc, font chữ.
2. Giai đoạn 1 (Thiết kế): AI lập bản vẽ kỹ thuật (Blueprint) và trình bạn duyệt.
3. Giai đoạn 2 (Xây dựng): Sau khi duyệt bản vẽ, AI sẽ tự động xây dựng trên Webflow.
4. Giai đoạn 3 (Kiểm tra): AI tự đối soát Webflow với Figma để đảm bảo độ chính xác.

---

## Lưu ý quan trọng cho Người dùng

### 1. File SESSION_HANDOFF.md (Bắt buộc)
Trước khi bắt đầu bất kỳ phiên làm việc nào hoặc khi chuyển giao nhiệm vụ, bạn CẦN đảm bảo có file SESSION_HANDOFF.md trong thư mục gốc. Đây là nơi AI lưu trữ và đọc trạng thái hiện tại của dự án để đảm bảo tính liên tục. File này đã được đưa vào danh sách bỏ qua của Git để tránh lộ thông tin tiến độ riêng tư lên repository.

### 2. Thư mục workspace
Dữ liệu trong thư mục này là tạm thời. Không nên tự ý chỉnh sửa trừ khi được AI yêu cầu.

Tác giả: Khang Nguyễn
Tiêu chuẩn: Finsweet Client-First V2
