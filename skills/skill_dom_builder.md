# KỸ NĂNG XÂY DỰNG CẤU TRÚC DOM (LAYOUT)


**Chiến lược sử dụng Tool:**

1. **Định vị và Chọn (Selection):**
   - Luôn sử dụng `de_page_tool` (action: `get_current_page`) để đảm bảo bạn đang ở đúng trang cần build.
   - Sử dụng `element_tool` (action: `select_element`) để chọn Node cha trước khi chèn Node con. Bạn phải luôn biết mình đang "đứng" ở đâu trong cây DOM.

2. **Tạo Element (Có 2 cách linh hoạt):**
   - **Cách 1 - Dùng `element_builder`:** Tạo từng thẻ (div, section, img) một cách tuần tự. Phù hợp cho cấu trúc phức tạp cần gán class chi tiết từng bước.
   - **Cách 2 - Dùng `whtml_builder` (Ưu tiên cho tốc độ):** Nếu cấu trúc từ Gemini JSON có thể quy đổi ra mã HTML thuần kèm class (VD: `<div class="padding-global">...</div>`), hãy tạo một chuỗi WHTML (Webflow HTML) và dùng tool này để chèn thẳng toàn bộ cụm đó vào thẻ cha. Cách này giúp build các section lớn cực kỳ nhanh chóng.

3. **Gán Style cho Element:**
   - Sau khi tạo element, lập tức đối chiếu mảng `client_first_utilities` và `custom_class` trong JSON.
   - Áp dụng đúng các class đó vào element. Lưu ý thứ tự: Class tổng (Utility) trước, Class riêng (Custom) sau.