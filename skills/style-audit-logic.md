# Skill: Style Audit & Mapping Logic (Variable-First & Alpha-aware)

## 1. Variable-First Color Clustering
- **Công cụ:** Sử dụng `utils.getColorDistance` (có tính đến Alpha).
- **Quy tắc gộp:** - Nếu `Distance < 15` VÀ có cùng vai trò (vd: cùng là Text): Đề xuất gộp vào Variable hiện có.
    - Nếu `Distance = 0` nhưng khác vai trò (vd: 1 cái là Brand, 1 cái là Success): Tuyệt đối KHÔNG gộp để giữ tính linh hoạt.
- **Xử lý Alpha:** Nếu màu giống HEX nhưng khác Alpha, ưu tiên tạo Variable mới theo công thức: `[Name]-[Opacity]` (vd: `Primary-Blue-10`).

## 2. Spacing & Typography Normalization
- **Spacing (Gap/Padding/Margin):**
    - Luôn chạy `utils.snapValue` trước.
    - Đối soát với `/knowledge-base/style-guide-map.json`: Nếu giá trị sau khi snap khớp với một Variable Spacing (vd: 32px -> `--spacing-32`), bắt buộc phải dùng ID của Variable đó.
- **Typography:**
    - Ưu tiên map vào Webflow Typography Variables thay vì tạo Class mới.
    - Nếu font-weight không chuẩn, ưu tiên sử dụng Variable cho `font-weight` (vd: `var(--font-weight-bold)`).

## 3. Conflict Resolution (Nguồn sự thật)
1. **Webflow Variables (Sự thật tối cao):** Nếu Webflow đã có biến `--brand-blue`, hãy ép màu Figma về biến này dù nó lệch nhẹ (trong ngưỡng Threshold).
2. **Figma Local Styles:** Chỉ dùng tên từ Figma nếu Webflow chưa có biến tương đương.
3. **Lessons Learned:** Luôn check `/workspace/04-lessons-learned.json`. Nếu User từng từ chối gộp màu X sang màu Y, Agent không được đề xuất lại.

## 4. Audit Output Requirement
Kết quả của Audit (Giai đoạn 0) phải được ghi vào `/knowledge-base/style-guide-map.json` với cấu trúc:
- `figma_style_id` -> `webflow_variable_id`
- `value_mapping`: { "original": "...", "sanitized": "...", "mapped_to": "..." }
- `reasoning`: Giải thích ngắn gọn lý do gộp hoặc tách.

## 5. Constraint
- **No Hard-coding:** Tuyệt đối không để giá trị màu (HEX/RGBA) hoặc Spacing (REM) trực tiếp trong Blueprint nếu đã có Variable tương ứng.
- **Precision Guard:** Các giá trị Border/Stroke (< 2px) không được gộp hoặc snap bừa bãi.
- **Semantic First:** Luôn hỏi User nếu phát hiện 2 màu giống nhau nhưng nằm ở 2 Component khác nhau (vd: Button vs Link).