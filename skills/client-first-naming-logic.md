# Skill: Advanced Client-First Naming (Variable-First Edition)

## 1. Cấu trúc Class chuẩn (Finsweet Style)
- **Công thức:** `[folder]_[component]-[part]` + `.is-[modifier]`
- **Quy tắc ngăn cách:** - Dùng gạch dưới `_` để phân tách Folder/Category (vd: `section_`, `header_`, `card_`).
  - Dùng gạch ngang `-` để nối các từ trong cùng một phần tử (vd: `nav-menu`).
  - Dùng `.is-` cho Combo Classes (vd: `.is-dark`, `.is-active`).
- **Ví dụ chuẩn:** `section_home-hero_content-wrapper` và `.is-centered`.

## 2. Chiến lược đặt tên (Folder Strategy)
- **Global:** `padding-global`, `container-large`, `section-spacing-top`.
- **Component-based:** Ưu tiên đặt tên theo chức năng hơn là vị trí (vd: `card-blog_image-wrapper` tốt hơn là `home-row-2_image`).
- **Nesting:** Tên Class con phải chứa tên Class cha để dễ quản lý (vd: `pricing_list` -> `pricing_list-item`).

## 3. Hệ thống ưu tiên (Hierarchy of Styles)
1. **Variable (MỚI):** Mọi thông số Spacing, Color, Typography phải được map vào Variable IDs trước khi tạo Style mới.
2. **Global Tags:** Sử dụng trực tiếp thẻ H1-H6, P, Body cho các style mặc định.
3. **Utility Classes:** Chỉ dùng cho các hành vi layout/behavior lặp lại (vd: `text-align-center`, `hide-mobile`).
4. **Custom Class:** Chỉ tạo khi cần can thiệp vào Layout phức tạp hoặc khi phần tử có phong cách độc bản.

## 4. Xử lý Combo Class (`is-xxx`)
- **Nguyên tắc 2-Class:** Không chồng quá 2 combo classes. Nếu cần biến đổi quá nhiều, hãy tạo một Custom Class mới với suffix `-special` hoặc `-unique`.
- **Logic:** Chỉ dùng combo class cho sự thay đổi về trạng thái (State) hoặc biến thể màu sắc (Color variation). Tuyệt đối không dùng combo class để thay đổi cấu trúc Layout chính.

## 5. Tích hợp với Tools
- Luôn gọi `utils.slugify()` để đảm bảo tên class không chứa ký tự lạ.
- Luôn gọi `utils.generateClassIntent()` để tách Base và Modifiers trước khi gửi cho @Executor.