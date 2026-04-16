# Skill: Cấu trúc phân cấp & Fluid Strategy (Client-First)

## 1. Core Structure (Cấu trúc cốt lõi)
- Bắt buộc mọi trang phải bám sát cấu trúc phân cấp chuẩn của Client-First:
  `page-wrapper` > `main-wrapper` > `section_[name]` > `padding-global` > `container-[size]` > `padding-section-[size]` > `[component]_component`.
- **Tuyệt đối không:** Gán max-width hoặc padding/margin hai bên lề trực tiếp vào thẻ Section. Phải sử dụng `padding-global` và `container`.

## 2. Container & Padding Logic
- **`padding-global`**: Quản lý khoảng cách lề trái/phải thống nhất toàn trang (thường dùng biến `--padding-horizontal`).
- **`container-[size]`**: Quản lý max-width (ví dụ: `container-large` ~ 80rem, `container-medium` ~ 60rem).
- Nếu phát hiện nội dung có độ rộng đặc thù, ưu tiên chọn `container` gần nhất thay vì tạo custom class mới cho độ rộng.

## 3. Fluid Responsive Strategy
- Khuyến khích sử dụng giá trị Fluid (sử dụng hàm `clamp()`) cho Typography và Spacing (Padding/Margin theo chiều dọc).
- Hạn chế việc tạo quá nhiều breakpoint tĩnh.
- Tự động hóa tính toán Fluid: @Analyst cần tính toán và gán giá trị Fluid vào Variable dựa trên giá trị tối thiểu (mobile) và tối đa (desktop).