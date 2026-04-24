# Finsweet Client-First: The Definitive Guide (Knowledge Base)

Hệ thống Client-First là một phương pháp luận xây dựng Webflow ưu tiên tính rõ ràng, khả năng mở rộng và sự thân thiện với người dùng cuối. Đây là bộ tri thức cốt lõi mà mọi Agent trong hệ thống MAS phải tuân thủ tuyệt đối.

---

## Chương 1: Chiến lược Đặt tên (Naming Strategy)

Mục tiêu tối thượng: Tên lớp (class) phải tự giải thích chức năng (Human-readable).

### 1.1. Custom Classes (Sử dụng dấu gạch dưới `_`)
Custom classes được tạo ra cho các thành phần đặc thù của một component hoặc một section duy nhất.
- **Cấu trúc:** `[Tiền tố Component]_[Tên Element]`
- **Dấu phân cách:** Sử dụng một dấu gạch dưới (`_`) duy nhất để phân tách tên component và element. Sử dụng dấu gạch ngang (`-`) cho các từ bên trong tên.
- **Ví dụ đúng:** `home-hero_image-wrapper`, `nav_link`, `footer_legal-text`.
- **Ví dụ sai:** `home-hero-image-wrapper` (thiếu `_`), `HomeHero_Image` (không dùng PascalCase).
- **Tại sao dùng `_`?** Để AI và con người nhận biết ngay lập tức đây là một phần tử con thuộc về một component cha cụ thể.

### 1.2. Utility Classes (Sử dụng dấu gạch ngang `-`)
Utility classes là các lớp dùng chung toàn site, có thể tái sử dụng trên bất kỳ phần tử nào.
- **Cấu trúc:** Chỉ sử dụng dấu gạch ngang (`-`). Tuyệt đối KHÔNG dùng dấu gạch dưới (`_`).
- **Quy tắc không viết tắt:** Không được dùng `mb-10`, `pl-large`. Phải viết đầy đủ: `margin-bottom`, `padding-left`.
- **Ví dụ:** `text-size-large`, `background-color-brand`, `margin-bottom-medium`.

### 1.3. Combo Classes (Sử dụng tiền tố `is-`)
Combo classes dùng để tạo biến thể cho một lớp cơ sở.
- **Tiền tố:** Bắt đầu bằng `is-`.
- **Ví dụ:** `button` + `is-secondary`, `nav_link` + `is-active`.
- **Lưu ý:** Tránh việc "chồng class" (class stacking) quá 2 lớp nếu có thể thay thế bằng Custom class.

---

## Chương 2: Cấu trúc Trang Chuẩn (Core Structure)

Client-First yêu cầu một cấu trúc phân cấp nghiêm ngặt gồm 6 lớp chính để đảm bảo tính nhất quán.

1.  **`page-wrapper`**: Div bao ngoài cùng (100% width). Chứa toàn bộ nội dung trang.
2.  **`main-wrapper`**: Bao quanh nội dung chính (trừ Nav và Footer). **Bắt buộc** dùng tag HTML `<main>`.
3.  **`section_[name]`**: Sử dụng Custom class (ví dụ: `section_hero`). Quản lý vị trí của section trên trang.
4.  **`padding-global`**: Nằm trực tiếp bên trong `section`. Quản lý khoảng cách lề trái/phải (gutters) đồng nhất cho toàn site.
5.  **`container-[size]`**: Nằm bên trong `padding-global`. Quản lý chiều rộng tối đa (`max-width`) của nội dung (ví dụ: `container-large`).
6.  **`padding-section-[size]`**: Nằm bên trong `container` hoặc thay thế vị trí tùy layout, dùng để tạo padding top/bottom cho section.

---

## Chương 3: Hệ thống Typography & Accessibility

- **Tag-First Strategy:** Luôn style cho các thẻ HTML mặc định (`All H1 Headers`, `All Paragraphs`, `All Links`) trước khi tạo class.
- **Heading Styles:** Sử dụng class `heading-style-h#` (ví dụ: `heading-style-h2`) khi một heading về mặt ngữ nghĩa (SEO) là H3 nhưng về mặt thẩm mỹ (Visual) cần giống H2.
- **Text Sizes:** Sử dụng hệ thống `text-size-tiny`, `small`, `medium`, `large`, `huge`.

---

## Chương 4: Hệ thống Spacing & Units

### 4.1. Spacing Wrappers (Giải pháp tối ưu)
Client-First khuyến khích không đặt margin/padding trực tiếp vào các class nội dung (như text).
- **Cách làm:** Sử dụng một Div Wrapper bao quanh phần tử. Áp dụng class utility về hướng và kích thước (ví dụ: `margin-bottom` + `margin-medium`).
- **Ưu điểm:** Giúp thay đổi khoảng cách linh hoạt mà không cần sửa class của chính phần tử đó.

### 4.2. Đơn vị REM (Luật sắt)
- **Base:** 1rem = 16px.
- **Lợi ích:** Đảm bảo khả năng truy cập (accessibility) khi người dùng thay đổi font size trình duyệt và hỗ trợ fluid responsive.
- **Cách tính:** `Giá trị PX trong Figma / 16 = Giá trị REM`.

---

## Chương 5: Phân tích Figma theo Client-First

Khi đọc thiết kế từ Figma, Architect phải thực hiện các bước sau:
1.  **Nhận diện Component:** Phân loại đâu là Global Component (Navbar, Footer), đâu là Section độc lập.
2.  **Bóc tách Layout:** Nhìn vào Auto Layout của Figma để xác định dùng Flexbox (Align/Justify) hay Grid.
3.  **Ánh xạ biến:** 
    - Màu sắc -> Webflow Variables.
    - Khoảng cách (Gap, Padding) -> Spacing System (Utility hoặc Variables).
4.  **Visual Fidelity:** Đảm bảo Border-radius, Shadow, Gradients được lấy chính xác 1:1 nhưng được áp dụng vào các Class chuẩn.
