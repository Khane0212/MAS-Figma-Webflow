# Skill: Atomic Webflow Deployment (Variable-First & Resilient)

## 1. Quy trình thực thi Atomic 5 bước (Enhanced)
- **B1: Identification (Nhận diện):**
    - Kiểm tra `/knowledge-base/style-guide-map.json` và gọi `list_styles` qua native MCP tool hoặc qua CLI fallback (VD: `node tools/webflow.mjs style_tool '[{"label":"styles","get_styles":{"query":"all"}}]'`) để lấy `class_id` hoặc `variable_id` chính xác.
    - Tuyệt đối không tự ý đoán ID.
- **B2: Asset & Variable Pre-sync:**
    - Nếu phần tử có ảnh/icon: Upload Assets trước để lấy `asset_id`.
    - Nếu phần tử dùng Variable mới: Khởi tạo Variable qua API để lấy `variable_id`.
- **B3: Style Preparation:**
    - Tạo hoặc cập nhật Style. Nếu là Combo Class, phải thu thập đủ mảng các `class_id`.
- **B4: Node Creation (The Build):**
    - Sử dụng `create_node` với `parent_id` được xác định từ Log.
    - Gán kèm `custom_attribute`: `data-figma-id` để phục vụ việc Discovery phục hồi sau này.
- **B5: Verification & Mapping:**
    - Gọi `get_node` để đối soát thuộc tính.
    - Ghi Webflow_ID chính thức vào `/workspace/03-execution-log.json`.

## 2. Quản lý Style & Variable (Variable-First)
- **Ưu tiên Variable:** Nếu Blueprint cung cấp Variable ID, phải sử dụng tham chiếu biến (vd: `{"color": "var(--variable-id)"}`) thay vì đẩy giá trị thô.
- **Unit Safety:** Chỉ sử dụng `rem` cho các thuộc tính kích thước. Nếu Blueprint gửi `px`, bắt buộc gọi `utils.toRem()` để convert trước khi đẩy lên API.

## 3. Xử lý lỗi & Idempotency
- **Lỗi 409 (Conflict):** Không dừng lại. Chuyển sang lệnh `patch_style` hoặc `patch_variable` để đồng bộ dữ liệu mới nhất.
- **Lỗi Timeout (Ghost Node):** Nếu API hết thời gian chờ nhưng không rõ kết quả, bắt buộc gọi `search_node_by_attribute` với `data-figma-id` trước khi thử tạo lại.
- **Parent Missing:** Nếu không tìm thấy `parent_id` trong Log, phải quay lại bước `@Analyst` để xác định lại vị trí trong cây DOM.

## 4. Constraints
- **Clean Registry:** Không tạo Style mới nếu Style đó có cùng giá trị với một Global Variable hiện có.
- **Transaction Safety:** Mỗi bước (B1-B5) phải được xác nhận thành công trước khi chuyển sang bước kế tiếp.
- **Rate Limit Aware:** Sau mỗi 5 lệnh Write liên tiếp, tự động nghỉ 2s để "xả" hàng chờ API của Webflow.