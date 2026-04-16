# KỸ NĂNG KHỞI TẠO VARIABLES & STYLES

1. **Tạo Variables (Biến màu sắc/kích thước):**
   - Sử dụng `variable_tool`.
   - Action: `create_variable`.
   - Quét toàn bộ mảng `colors` trong JSON. Tạo các biến Native trên Webflow theo đúng tên quy định (VD: `background-color-primary`, `text-color-secondary`).

2. **Tạo Styles (Class Client-First):**
   - Sử dụng `style_tool`.
   - Luôn kiểm tra xem style đã tồn tại chưa bằng `get_all_styles` trước khi tạo mới (`create_style`) để tránh duplicate.
   - Khi tạo Style, hãy liên kết các giá trị màu sắc với các Variables vừa tạo ở bước 1.
   - **Đặc biệt lưu ý:** Khi tạo các Utility Class của Client-First (như `padding-global`, `margin-top`), đảm bảo tên class chính xác từng ký tự (dùng dấu gạch ngang `-`).