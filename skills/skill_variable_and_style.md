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

3. **Quy trình kết hợp Cheatsheet và `class.json` (Vô cùng quan trọng):**
   - **BƯỚC CHỌN LỌC (Dùng Cheatsheet):** Khi xây dựng DOM, chỉ đọc `knowledge/client_first_cheatsheet.md` để quyết định xem sẽ dùng TÊN CLASS nào (VD: chọn `margin-large` để tạo khoảng cách 3rem). Việc này giúp Agent tư duy cấu trúc cực nhanh.
   - **BƯỚC THỰC THI (Dùng `class.json`):** Mặc định Webflow chỉ cần nhận tên class. Tuy nhiên, nếu bạn dùng `get_all_styles` và phát hiện class đó CHƯA TỒN TẠI trên Webflow, bạn **BẮT BUỘC phải tra cứu file `class.json`** (thông qua `grep_search` hoặc đọc file) để lấy chính xác các thông số CSS (`padding`, `margin`, `font-size`...) rồi mới dùng lệnh `create_style`. KHÔNG được tự "đoán" thông số.

4. **Tuân thủ Tuyệt đối Naming Convention của Client-First:**
   - **KHÔNG TỰ Ý TẠO BASE CLASS RÁC:** Nghiêm cấm việc đẻ ra các class bừa bãi (như `detail-value-1`, `button-send`, `contact-form-col`). Mọi Base Class đều phải có cơ sở từ Client-First.
   - **Ứng dụng triệt để COMBO CLASS:** 
     + Khi một Base Class cần biến tấu một vài thuộc tính nhỏ (đổi màu, in đậm, đổi kích thước), BẮT BUỘC dùng Combo Class bằng cách xếp chồng (stack) các Utility Class lên nhau thay vì tạo base class mới.
     + *Ví dụ Text:* Gắn base class `text-size-medium`, sau đó add thêm combo class `text-weight-bold` và `text-color-alternate`.
     + *Ví dụ Component:* Dùng `form_input` kết hợp combo class `is-text-area` (có sẵn) để làm ô nhập tin nhắn.
   - **Sử dụng Standard Components:** Đối với cấu trúc cốt lõi, bắt buộc gọi đúng class chuẩn của Finsweet (VD: `form_component`, `container-large`, `icon-1x1-large`).
   - **Quy tắc tạo Custom Component Class:** Chỉ được phép tạo class độc lập MỚI khi một khối có giao diện quá đặc thù không thể ráp bằng Utility (VD: Khối có nền màu `#F0F2FE` và bo góc `24px` thì tạo class `contact_component`). Tên class phải chuẩn cú pháp: `[tên-component]_[thành-phần]`.

---

## 5. PRE-BUILD STYLE CHECK (BẮT BUỘC TRƯỚC KHI TẠO STYLE)

> [!IMPORTANT]
> Agent PHẢI thực hiện bước này trước mỗi lần gọi `create_style`. Bỏ qua bước này sẽ gây ra duplicate styles, phá vỡ kiến trúc Client-First.

**Quy trình kiểm tra trước khi tạo style:**

1. **Query trước:** Gọi `style_tool` với action `query_styles`, truyền `name_path: ["tên-class-cần-tạo"]`.
2. **Nếu có kết quả trả về** → KHÔNG TẠO MỚI. Lấy `style_id` từ kết quả và dùng trực tiếp.
3. **Nếu trả về mảng rỗng** → Được phép gọi `create_style`. Tra cứu `class.json` để lấy CSS chính xác.

```
FLOW: Cần style "margin-large"
│
├─► query_styles({name_path: ["margin-large"]})
│     ├─► Trả về style_id → DÙNG LUÔN, KHÔNG create_style
│     └─► Trả về rỗng → Tra class.json → create_style với CSS đúng
│
Chỉ sau Pre-Check mới được build DOM
```

**Tối ưu hóa theo batch:** Khi cần nhiều styles, gom tất cả tên class vào 1 lần `query_styles` (array nhiều queries) thay vì gọi nhiều lần riêng lẻ để tiết kiệm token.