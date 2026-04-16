# HỆ THỐNG KHOẢNG CÁCH (SPACING SYSTEM)

TUYỆT ĐỐI KHÔNG set margin/padding vào Custom Class trừ khi đó là layout nội bộ rất phức tạp (như thẻ Grid/Flex gap).
Hãy sử dụng hệ thống Utility Wrapper theo quy chuẩn Client-First:

1. **Margin Utility (Đẩy các khối ra xa nhau):**
   - Cấu trúc: `margin-top` + `[size]` (Ví dụ: `margin-top margin-medium`).
   - Các mốc size khả dụng: `tiny`, `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`, `huge`, `xhuge`, `xxhuge`.
   
   > [!TIP]
   > Khi quan sát Figma thấy 2 khối cách nhau, Agent PHẢI bọc khối dưới bằng một thẻ Div có class `margin-top margin-[size]`.

2. **Các mốc kích thước chuẩn (REM):**
   - `tiny`: 0.125rem
   - `xxsmall`: 0.25rem
   - `xsmall`: 0.5rem
   - `small`: 1rem
   - `medium`: 2rem
   - `large`: 3rem
   - `xlarge`: 4rem
   - `xxlarge`: 5rem
   - `huge`: 6rem

3. **Padding Utility (Khoảng cách nội bộ):**
   - Sử dụng tương tự như Margin nhưng cho padding (VD: `padding-section-medium`).
   - `padding-global`: Bắt buộc cho mọi section để giữ lề trái/phải đồng nhất.