# CẤU TRÚC LỒNG THẺ (DOM HIERARCHY)

Mọi trang Webflow PHẢI tuân thủ nghiêm ngặt cấu trúc bọc (wrapper) từ ngoài vào trong để đảm bảo tính đồng nhất của Client-First:

1.  **`page-wrapper`**: Thẻ Div bọc toàn bộ trang (thường set `overflow: hidden`).
2.  **`main-wrapper`**: Thẻ `<main>` bọc toàn bộ nội dung chính (trang không bao gồm Navbar và Footer).
3.  **`section_[name]`**: Thẻ `<section>` đại diện cho một phân vùng (VD: `section_hero`). 
    - *Lưu ý*: Không dùng padding/margin trực tiếp vào đây.
4.  **`padding-global`**: Thẻ Div quản lý padding trái/phải toàn cục.
5.  **`container-[size]`**: Thẻ Div giới hạn chiều rộng tối đa (VD: `container-large`).
6.  **`padding-section-[size]`**: Thẻ Div tạo khoảng cách trên/đưới cho section đó (VD: `padding-section-large`).
7.  **`[name]_component`**: Thẻ Div bọc toàn bộ nội dung/bố cục riêng của khối đó (VD: `hero_component`).

> [!IMPORTANT]
> Tuyệt đối không nhảy cóc các lớp bọc này. Việc thiếu `padding-global` hoặc `container-` sẽ làm vỡ tính nhất quán của layout.