# Standard Operating Procedure (SOP) - Figma to Webflow MAS (V2 Refactored)

## 0. Quy trình Style & Variable Audit (Pre-flight)
- **Nhiệm vụ:** - @Executor: Chạy `list_variables` và `list_styles` trên Webflow thông qua native MCP tool hoặc dùng lệnh fallback `node tools/webflow.mjs ...`.
    - @Reader: Quét Global Styles/Variables từ Figma.
    - @Analyst: Đối soát hai nguồn để tạo `/knowledge-base/style-guide-map.json`.
- **Nguyên tắc ưu tiên:** Nếu trùng tên nhưng khác giá trị, @Analyst phải báo cáo để User chọn "Override" hoặc "Create New with Suffix".
- **Output:** File `/knowledge-base/style-guide-map.json` (Nguồn sự thật duy nhất).

## 0.5. Khởi tạo & Đồng bộ Style Guide (Mandatory Prerequisite)
- **Prerequisite:** Dự án Webflow phải được bắt đầu từ Template Client-First Starter (bắt buộc đã có sẵn trang Style Guide).
- **Two-Way Sync:** Khi @Executor tạo mới bất kỳ một Variable (Color, Spacing, Typography) hoặc Global Class nào thông qua MCP, BẮT BUỘC phải tạo thêm một Node trực quan trên trang `Style Guide` để đảm bảo khách hàng có thể quản lý sau handoff.
- **Error Fallback:** Nếu @Executor quét không thấy trang `Style Guide` (hoặc bị xóa nhầm), hệ thống MAS phải báo lỗi và dừng toàn bộ tiến trình, yêu cầu User khôi phục trang này trước khi đi tiếp.

## 1. Quy trình Handoff (Bàn giao & Chunking)
- **Từ @Reader sang @Analyst:** - Dữ liệu Figma phải được chia nhỏ theo **Section** (tránh tràn Context).
    - Phân loại rõ: `New_Element` vs `Component_Instance`.
    - Spacing/Color phải được map trực tiếp sang ID của Variable trong `/knowledge-base/style-guide-map.json`.
- **Từ @Analyst sang @Executor:**
    - Blueprint phải chỉ định rõ: Thuộc tính nào dùng Class, thuộc tính nào dùng Variable ID.
    - Kiểm tra `/knowledge-base/04-lessons-learned.json` để tránh các cấu trúc gây lỗi API trước đây.

## 2. Quy trình Xử lý Ngoại lệ (Exceptions)
- **Figma "Dirty" (Thiếu Auto Layout):** @Analyst đề xuất cấu trúc Flexbox tối ưu dựa trên tọa độ `absoluteBoundingBox` và hỏi ý kiến User.
- **Webflow API Rate Limit:** - @Executor áp dụng Exponential Backoff (5s -> 15s -> 60s).
    - Sau 3 lần: Ghi trạng thái "Paused" vào Log và lưu Cache phiên làm việc.

## 3. Quy trình Kiểm soát Chất lượng (Quality Gate)
- **Approval:** User gõ "Approved". @Analyst tự động tóm tắt các thay đổi lớn (ví dụ: "Sẽ tạo 5 Class mới, 2 Variable mới").
- **Verification:** Sau mỗi Section, @Executor so sánh `get_page_dom` với Blueprint. Nếu sai lệch > 5% (về cấu trúc), phải dừng lại và yêu cầu @Analyst giải trình.

## 4. Quản lý State & Memory
- **Atomic Logging:** Ghi nhật ký ngay sau mỗi Node thành công. 
- **Cấu trúc Log:** `{ "figma_id": "...", "webflow_id": "...", "type": "variable|class|element", "status": "success" }`.
- **Học tập (Learning):** Sau khi hoàn thành một Section, @Analyst phải tự vấn: "User đã sửa gì ở Blueprint?" và ghi các quy tắc mới vào `/knowledge-base/04-lessons-learned.json`.

## 5. Quy trình Xử lý Sự cố (Incident Response)
- **Idempotency:** Kiểm tra Log theo `figma_id` trước mọi lệnh Write.
- **Ghost Search:** Nếu gặp lỗi Network, phải dùng `discovery_tool` tìm kiếm Element theo `custom_attribute` (được gắn kèm lúc tạo) trước khi tạo lại.
- **Cleanup:** Nếu User yêu cầu "Rollback", @Executor dựa vào Log của phiên gần nhất để xóa các node vừa tạo theo thứ tự ngược lại (Bottom-up).