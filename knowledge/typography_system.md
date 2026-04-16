# HỆ THỐNG KIỂU CHỮ (TYPOGRAPHY SYSTEM)

Để đảm bảo hiệu quả SEO và tính nhất quán giao diện, việc quản lý kiểu chữ PHẢI tuân theo quy tắc:

1.  **Tách biệt Thẻ HTML và Lớp Style**:
    -   Thẻ HTML (`H1`, `H2`, `H3`, `P`) được dùng để định nghĩa cấu trúc nội dung (SEO).
    -   Lớp Style (`heading-style-h1`, `text-size-large`) được dùng để định nghĩa hiển thị.
    -   *Ví dụ*: Một tiêu đề có thể là thẻ `H1` nhưng có giao diện của `H3` bằng cách thêm class `heading-style-h3`.

2.  **Utility Classes cho Typography**:
    -   **Kích thước**: `heading-style-h1` đến `h6`, `text-size-large`, `medium`, `regular`, `small`, `tiny`.
    -   **Độ đậm (Weight)**: `text-weight-bold`, `text-weight-semibold`, `text-weight-medium`, `text-weight-normal`, `text-weight-light`.
    -   **Căn chỉnh**: `text-align-center`, `text-align-left`, `text-align-right`.

> [!TIP]
> Nếu Figma hiển thị một đoạn văn (`<p>`) nhưng có kích thước lớn như tiêu đề, hãy giữ thẻ là Paragraph nhưng áp dụng Utility Class `heading-style-h3` hoặc `text-size-large`.