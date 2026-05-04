# KỸ NĂNG XỬ LÝ HÌNH ẢNH & ASSETS

Khi cấu trúc JSON yêu cầu chèn thẻ `<img>`:

1. **Kiểm tra và Tải Asset:**
   - Dùng `asset_tool` để upload hình ảnh từ URL xuất ra bởi Figma (nếu quy trình cho phép) hoặc tìm kiếm hình ảnh đã có sẵn trong dự án.
   - Bạn có thể tạo thư mục (create folder) trong hệ thống Asset của Webflow để quản lý ảnh (VD: tạo thư mục `Hero Section Assets`).

2. **Gắn vào Element:**
   - Sau khi có được Asset ID hoặc URL của Webflow, sử dụng `element_builder` hoặc cập nhật thuộc tính `src` của thẻ `<img>` hiện tại.
   - Nếu ảnh có dấu hiệu bị lỗi hiển thị URL, dùng `get_image_preview` để test xem định dạng ảnh (JPG, PNG, WEBP, AVIF) có được Webflow hỗ trợ hay không trước khi chèn.