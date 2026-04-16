# BẢNG ĐỒNG BỘ BIẾN (VARIABLES MAPPING)

Để đảm bảo tính linh hoạt khi thay đổi theme, KHÔNG ĐƯỢC dùng mã màu tĩnh (HEX/RGB) trực tiếp. Mọi thuộc tính màu PHẢI được tham chiếu từ Webflow Variables:

1.  **Hệ thống Màu (Color Tokens)**:
    -   **Figma**: `Color / Text / Primary` -> **Webflow**: `text-color-primary`.
    -   **Figma**: `Color / Background / Alternate` -> **Webflow**: `background-color-alternate`.
    -   *Ghi chú*: Luôn kiểm tra `shared_components.json` để lấy mã màu dự án trước khi thực hiện mapping.

2.  **Cách sử dụng Utility Class cho Màu**:
    -   Màu chữ: `text-color-primary`, `text-color-secondary`, `text-color-alternate`.
    -   Màu nền: `background-color-primary`, `background-color-secondary`, `background-color-tertiary`.

> [!IMPORTANT]
> TRƯỚC KHI tạo một thuộc tính style mới, Agent PHẢI kiểm tra xem giá trị đó đã tồn tại trong `class.json` hoặc Webflow Native Variables hay chưa. Tuyệt đối tránh tạo trùng lặp.