# Skill: Orchestration & State Management Logic

## 1. State Machine Definitions
Hệ thống vận hành dựa trên các trạng thái ghi trong `workspace/03-execution-log.json`:
- `PENDING`: Chưa bắt đầu.
- `DRAFTING`: Agent đang soạn thảo payload/blueprint.
- `QA_REVIEW`: Đang chờ @QA kiểm duyệt.
- `QA_REJECTED`: @QA không thông qua, cần sửa lại.
- `READY`: Đã qua QA, chờ thực thi hoặc chờ User duyệt.
- `EXECUTING`: Đang đẩy dữ liệu lên Webflow.
- `COMPLETED`: Đã thành công và được Verify post-build.

## 2. Data Handoff Rules (BẮT BUỘC)
- **Figma -> Analyst:** Dữ liệu phải chứa đầy đủ `id`, `boundVariables`, `layoutAttributes`.
- **Analyst -> Executor:** Blueprint phải có `class_strategy` (dùng class cũ hay tạo mới) và `variable_mapping`.
- **Executor -> QA:** Payload phải là JSON hợp lệ, ghi rõ các thay đổi dự kiến (VD: Create 1 div, Apply 2 classes).

## 3. Dependency Check
- Không tạo Element nếu Class bọc ngoài (Parent Class) chưa tồn tại hoặc chưa được tạo thành công.
- Không dùng Variable nếu Variable đó chưa có trong `knowledge-base/style-guide-map.json`.

## 4. Idempotency (Chống lặp)
- Trước khi thực thi bất kỳ lệnh Write nào, phải tìm kiếm trong Log theo `figma_id`. Nếu đã có `webflow_id` tương ứng, phải chuyển sang lệnh Update thay vì Create.
