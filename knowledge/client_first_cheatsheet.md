# CLIENT-FIRST CORE CHEATSHEET

> **LUẬT TỐI THƯỢNG:** AI (Agent) TRƯỚC KHI BUILD UI BẮT BUỘC PHẢI THAM CHIẾU BẢNG NÀY.
> Tuyệt đối KHÔNG tự tạo class mới. KHÔNG dùng raw HTML/inline CSS. Mọi style phải ghép từ các class dưới đây.

## 1. Structure & Layout (Cấu trúc & Căn lề)
| Class Name | Mô tả & Cách dùng |
| :--- | :--- |
| `page-wrapper` | Bọc ngoài cùng toàn bộ trang. |
| `main-wrapper` | Bọc toàn bộ nội dung chính (trừ Navbar/Footer). |
| `padding-global` | Tạo khoảng cách an toàn 2 bên màn hình (dùng bên trong section). |
| `container-large` | Giới hạn chiều rộng tối đa (max-width 80rem). Căn giữa màn hình. |
| `padding-section-large` | Khoảng cách top/bottom cực lớn (thường dùng bọc các phần nội dung chính của Section). |
| `padding-section-medium`| Khoảng cách top/bottom vừa phải (thường dùng cho Navbar, form). |

## 2. Spacing (Khoảng cách)
*Ghi chú: Để tạo khoảng cách, dùng Utility (ví dụ: `margin-bottom` kết hợp với `margin-large`). KHÔNG thêm margin trực tiếp vào Component.*
| Class Name | Kích thước |
| :--- | :--- |
| `margin-top`, `margin-bottom`, `margin-left`, `margin-right` | Dùng để xác định HƯỚNG khoảng cách. |
| `margin-tiny` | Rất nhỏ (0.125rem). Dùng cho khoảng cách các thành phần dính sát. |
| `margin-small` | Nhỏ (1rem). Dùng khoảng cách giữa các input, đoạn văn. |
| `margin-medium` | Vừa (2rem). Khoảng cách giữa các khối nội dung nhỏ. |
| `margin-large` | Lớn (3rem). Khoảng cách giữa các tiêu đề, nút bấm. |
| `margin-huge` | Rất lớn (6rem). Khoảng cách giữa các khối lớn. |

## 3. Typography (Văn bản)
| Class Name | Thuộc tính |
| :--- | :--- |
| `heading-style-h1` -> `h6` | Dùng chuẩn hóa kích thước Heading (H1: 4rem, H2: 3rem, H3: 2rem...). |
| `text-size-large` | Chữ lớn (1.5rem). |
| `text-size-medium` | Chữ vừa (1.25rem). |
| `text-size-regular` | Chữ cơ bản (1rem). |
| `text-size-small` | Chữ nhỏ (0.875rem). |
| `text-weight-bold` | Font weight 700 (Combo class). |
| `text-weight-normal` | Font weight 400 (Combo class). |
| `text-style-muted` | Chữ mờ đi (opacity 0.6) (Combo class). |
| `text-align-center` | Căn giữa text. |
| `text-color-primary`, `secondary` | Màu chữ theo hệ thống. |

## 4. Components (Thành phần phổ biến)
| Class Name | Mô tả & Cách dùng |
| :--- | :--- |
| `button` | Base class cho tất cả các nút. Luôn gắn thêm combo class màu. |
| `is-primary`, `is-secondary`| Combo class cho button (ví dụ: `button is-primary`). |
| `button-group` | Bọc nhiều button lại để tự động chia khoảng cách (flex gap). |
| `form_component` | Bọc ngoài cùng của một Form block. |
| `form_input` | Base class cho mọi trường nhập liệu (Input text, email). |
| `is-text-area` | Combo class gắn vào `form_input` để biến nó thành textarea lớn. |
| `icon-1x1-large`, `medium`, `small` | Quy chuẩn kích thước cho các icon vuông (2.5rem, 2rem, 1rem). |

---
**Quy tắc Cốt lõi cho Agent:**
- **Không tự ý đẻ class rác:** Ví dụ: thay vì tạo class `detail-title`, hãy dùng `text-size-medium text-weight-bold`.
- **Combo Class:** Xếp chồng các class lên nhau để tinh chỉnh (VD: `form_input is-text-area`).
- **Custom Class:** CHỈ được phép tạo class mới khi giao diện có màu sắc hoặc layout quá đặc biệt (VD: `contact_card` chứa `background-color` tím và `border-radius` 24px).
