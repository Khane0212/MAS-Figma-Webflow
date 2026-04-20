# Standard Operating Procedure (SOP) - Figma to Webflow MAS (V2 Refactored)

## 0. Quy trình Điều phối Dự án (Orchestration - Managed by @PM)
- **Nhiệm vụ:**
    - @PM là Agent dẫn dắt. Trước mỗi hành động, @PM phải:
        1. **Check State:** Đọc `workspace/03-execution-log.json`.
        2. **Dispatch:** Chỉ định Agent chuyên trách và cung cấp context cô đọng.
        3. **QA Verification:** Gọi @QA kiểm duyệt kết quả trước khi cho phép đi tiếp.
        4. **User Sync:** Báo cáo trạng thái theo quy chuẩn `skills/status-reporting-protocol.md`.

## 0.5. Quy trình Style & Variable Audit (Pre-flight)
- **Nhiệm vụ:**
    - @PM ra lệnh @Executor quét Webflow site và @Reader quét Figma.
    - @Analyst đối soát để tạo `/knowledge-base/style-guide-map.json`.
- **Nguyên tắc ưu tiên:** Nếu trùng tên nhưng khác giá trị, @Analyst báo cáo @PM để @PM xin ý kiến User.

## 0.7. Khởi tạo & Đồng bộ Style Guide (Mandatory Prerequisite)
- **Prerequisite:** Dự án Webflow phải được bắt đầu từ Template Client-First Starter.
- **Two-Way Sync:** Khi @Executor tạo mới bất kỳ một Variable hoặc Global Class nào, BẮT BUỘC phải tạo thêm một Node trực quan trên trang `Style Guide`.
- **Error Fallback:** Nếu thiếu trang `Style Guide`, @PM phải đình chỉ tiến trình ngay lập tức.

## 1. Quy trình Handoff (Bàn giao & Chunking)
- **Từ @Reader sang @Analyst (Dưới sự giám sát của @PM):** 
    - Dữ liệu Figma phải được chia nhỏ theo **Section**.
    - Phải bảo tồn Variable ID nếu có (theo `skills/figma-layout-interpretation.md`).
- **Từ @Analyst sang @Executor:**
    - Blueprint phải chỉ định rõ: Thuộc tính nào dùng Class, thuộc tính nào dùng Variable ID.
- **Từ @Executor sang @QA (Gatekeeping):** 
    - @Executor trình bày payload dự kiến.
    - @QA kiểm duyệt. Nếu Reject, @PM ra lệnh sửa lại.

## 2. Quy trình Xử lý Ngoại lệ (Exceptions)
- **Figma "Dirty" (Thiếu Auto Layout):** @Analyst đề xuất cấu trúc Flexbox tối ưu dựa trên tọa độ `absoluteBoundingBox` và hỏi ý kiến User.
- **Webflow API Rate Limit:** - @Executor áp dụng Exponential Backoff (5s -> 15s -> 60s).
    - Sau 3 lần: Ghi trạng thái "Paused" vào Log và lưu Cache phiên làm việc.

## 3. Quy trình Kiểm soát Chất lượng (Quality Gate)
- **Lớp 1 (Internal QA):** @QA rà soát kỹ thuật (Pre-build).
- **Lớp 2 (User Approval):** @PM báo cáo và chờ User duyệt Blueprint.
- **Lớp 3 (Post-build Verification):** @Executor so sánh `get_page_dom` với Blueprint. @PM ghi nhận vào Log.

## 4. Quản lý State & Memory
- **Atomic Logging:** Ghi nhật ký ngay sau mỗi Node thành công. 
- **Cấu trúc Log:** `{ "figma_id": "...", "webflow_id": "...", "type": "variable|class|element", "status": "success" }`.
- **Học tập (Learning):** Sau khi hoàn thành một Section, @Analyst phải tự vấn: "User đã sửa gì ở Blueprint?" và ghi các quy tắc mới vào `/knowledge-base/04-lessons-learned.json`.

## 5. Quy trình Xử lý Sự cố (Incident Response)
- **Idempotency:** Kiểm tra Log theo `figma_id` trước mọi lệnh Write.
- **Ghost Search:** Nếu gặp lỗi Network, phải dùng `discovery_tool` tìm kiếm Element theo `custom_attribute` (được gắn kèm lúc tạo) trước khi tạo lại.
- **Cleanup:** Nếu User yêu cầu "Rollback", @Executor dựa vào Log của phiên gần nhất để xóa các node vừa tạo theo thứ tự ngược lại (Bottom-up).
