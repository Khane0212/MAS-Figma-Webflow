# CẨM NANG: QUY TRÌNH PHÂN TÍCH VÀ MAPPING THÔNG SỐ FIGMA SANG WEBFLOW (PIXEL-PERFECT SOP)

Tài liệu này là **kim chỉ nam BẮT BUỘC** cho mọi Agent khi đọc dữ liệu từ Figma MCP và chuyển hóa thành code/Webflow. Mục tiêu là đạt độ chính xác 100% (Pixel-Perfect), không tự ý suy đoán, không làm tròn số.

## BƯỚC 0: CHIẾN LƯỢC EXTRACT DỮ LIỆU QUA MCP (Anti-Truncation Protocol)

> [!CAUTION]
> **KHÔNG extract cả section/component lớn trong một lần** — MCP sẽ truncate output, mất data. Luôn extract từng node nhỏ riêng biệt.

### Quy Trình 4 Lớp (Bắt Buộc)

**Lớp 1 — Lấy cây ID:**
```
get_metadata(nodeId: "[SECTION_ID]")
→ Lấy danh sách tên + ID của tất cả nodes con quan trọng
```

**Lớp 2 — Extract FRAME/CONTAINER (spacing):**
```
get_design_context(nodeId: "[MỖI_FRAME_ID]") — gọi riêng từng frame
→ Cần: width, height, padding (T/R/B/L), gap, flex-direction,
        background-color, border-radius, border, opacity
```

**Lớp 3 — Extract TEXT LAYER (typography):**
```
get_design_context(nodeId: "[MỖI_TEXT_NODE_ID]") — gọi riêng từng text
→ Cần: font-family, font-size(px), font-weight(số), line-height(px),
        letter-spacing(px), color, text-align, opacity
```

**Lớp 4 — Resolve Variables:**
```
get_variable_defs(nodeId: "[NODE_ID]")
→ Map variable name → giá trị thực (#hex, px, rem)
→ Thay thế mọi variable reference tìm thấy ở Lớp 2 & 3
```

### Bảng Xử Lý Lỗi Thiếu Data Phổ Biến

| Triệu chứng | Nguyên nhân | Fix |
|---|---|---|
| Không thấy `padding` trên element | Padding nằm trên Frame cha | Extract Frame cha (lên 1 cấp) |
| Color hiện là tên variable | Color là Variable, không phải hex | Gọi `get_variable_defs` |
| Thiếu `line-height` | Text style reference gộp | Target trực tiếp text node ID |
| `font-weight` là tên ("SemiBold") | Figma dùng tên thay vì số | SemiBold=600, Bold=700, Medium=500, Regular=400 |
| `opacity` không thấy | Opacity nằm trên Group cha | Extract Group cha |

---

## BƯỚC 1: QUÉT TOÀN DIỆN THÔNG SỐ ELEMENT (Figma Inspection)

Khi nhận data từ một node Figma, Agent không chỉ nhìn vào text hay màu sắc, mà phải quét theo checklist sau:
1. **Kích thước & Bao bọc (Dimensions & Constraints):**
   - Element này đang có Width/Height là Fixed (Cố định), Fill (Tràn viền) hay Hug (Ôm nội dung)?
   - Nếu là form, card, container: Phải check chính xác Width (VD: 1061px) và chuyển sang `max-width` thay vì để nó tự giãn 100%.
2. **Khoảng cách (Spacing & Auto Layout):**
   - Ghi nhận chính xác `padding` bên trong (Top/Right/Bottom/Left).
   - Ghi nhận chính xác `gap` giữa các thành phần con.
   - Ghi nhận `margin` (khoảng cách tới phần tử liền kề).
3. **Kiểu chữ (Typography):**
   - Đừng chỉ nhìn `font-size` và `font-weight`. 
   - BẮT BUỘC quét thêm: `font-family` (VD: Poppins hay Manrope?), `line-height` (chiều cao dòng), `letter-spacing`, và `color` (kèm opacity).
4. **Trang trí (Decoration):**
   - `border-radius` (Bo góc): Bao nhiêu px?
   - `border` (Viền): Độ dày, kiểu viền, mã màu và opacity của viền (VD: rgba(0,0,0,0.12)).
   - `box-shadow` (Đổ bóng) và `background-color`.

## BƯỚC 2: CHUYỂN ĐỔI ĐƠN VỊ (Unit Conversion)

**Công thức REM:** `REM = PX ÷ 16`. Không làm tròn số.
- 77px = `4.8125rem` ✅ | Không được làm tròn thành `4.8rem` hay `5rem` ❌
- 24px gap = `1.5rem` | 16px = `1rem` | 48px = `3rem`

### Bảng Chọn Đơn Vị CSS (Nguồn: Finsweet Client-First + W3C)

| Thuộc tính | Đơn vị đúng | Lý do |
|:---|:---|:---|
| `font-size`, `line-height`, `letter-spacing` | **REM** | Scale với user browser settings |
| `margin`, `padding`, `gap` | **REM** | Scale cùng text → tỷ lệ nhất quán trên mọi thiết bị |
| `max-width` container | **REM** hoặc **%** | REM nếu fixed, % nếu fluid |
| `width` container fluid | **%** hoặc `100%` | Fluid theo parent |
| `border` | **px** (1px, 2px) | Giá trị quá nhỏ, scale sẽ gây anti-aliasing |
| `box-shadow` | **px** | Chi tiết pixel-perfect, không cần scale |
| `border-radius` lớn | **rem** | Responsive với kích thước tổng thể |
| `border-radius` nhỏ (≤4px) | **px** | Quá nhỏ để scale |

> [!NOTE]
> **Hiểu lầm phổ biến:** REM không chỉ dành cho typography. REM là đơn vị chuẩn cho **cả spacing** vì nó đảm bảo accessibility (khi user tăng font trình duyệt, text và padding cùng scale — container không bị vỡ). Finsweet Client-First dùng REM cho toàn bộ spacing system của họ.
>
> **% dùng cho width, không phải vertical spacing.** `padding-top: 10%` = 10% width của parent (không phải height) → gây ra hành vi bất ngờ cho vertical spacing.


## BƯỚC 3: CHIẾN LƯỢC ĐẶT CLASS (Client-First Strategy)
1. **Khi nào dùng Utility Class?**
   - Cho các thuộc tính đơn lẻ, phổ biến: text-size, text-color, margin định hướng (VD: `margin-top`).
   - Nếu Figma có khoảng cách `48px`, hãy dùng `margin-large` (3rem). 
   - *Lưu ý:* Nếu Figma có khoảng cách `6px` (0.375rem) mà hệ thống Client-First không có sẵn, hãy tạo Utility mới (VD: `margin-xxs-custom`) chứ KHÔNG ép dùng `margin-xsmall` (8px).
2. **Khi nào tạo Custom Class?**
   - Khi một khối (Block/Card/Form) mang **nhiều thuộc tính đặc thù cùng lúc** (có background, có padding riêng, có border-radius riêng).
   - *Ví dụ:* Thay vì ghép 1 đống class rác, hãy tạo `contact_form-block` chứa toàn bộ: `padding`, `max-width`, `border-radius`, `background`.

## BƯỚC 4: CÁC "BẪY" MẶC ĐỊNH CỦA WEBFLOW VÀ HTML (Gotchas)
Agent phải luôn nhớ các hành vi mặc định này để Override (Ghi đè):
1. **Thẻ `<input>` và `<textarea>`:** Mặc định của trình duyệt là có kích thước cố định (khoảng 150px). Khi đặt trong Flex/Grid, BẮT BUỘC phải set `width: 100%` trong style class để nó căng tràn vùng chứa.
2. **Thẻ `<button>`:** Webflow có padding mặc định cho button. Phải đọc padding từ Figma (VD: 15px 51px) và ghi đè vào combo class (VD: `is-primary`) để ra đúng hình dáng.
3. **Font-family mất tích:** Webflow mặc định xài Arial/Sans-serif. Nếu design dùng font khác, phải gán `font-family` tại cấp độ `page-wrapper` (cho toàn trang) hoặc trực tiếp vào custom class (như Button, Heading).

## BƯỚC 5: GHI CHÉP VÀO MAPPING-PLAN (BƯỚC BẮT BUỘC)
- **Sai lầm:** Chỉ ghi tên class vào file `scratch/mapping_plan.md` (VD: `contact_form-block`) mà không ghi thông số, dẫn đến lúc build Agent bị quên và tự bịa ra thông số.
- **Quy tắc (Rule of Thumb):** 
  + Mọi thông số Pixel-Perfect đo được từ Bước 1 và 2 **BẮT BUỘC phải được ghi chi tiết** vào bên cạnh tên class trong `mapping_plan.md` TRƯỚC KHI gọi bất kỳ lệnh tạo style hay build DOM nào.
  + *Ví dụ ghi chuẩn trong Mapping Plan:* 
    `└── contact_form-block (DivBlock)`
    `    CSS: max-width 66.3125rem, margin 0 auto, padding 3.4375rem 4.8125rem 4.3125rem 4.8125rem, bg #F4F6FC, radius 0.75rem`
    `└── Row 1 [contact_form-row]`
    `    CSS: display flex, grid-column-gap 1rem, grid-row-gap 2rem`
  + Chỉ khi nào bản Mapping Plan chứa đầy đủ các "Hard Data" (dữ liệu cứng) này, Agent mới được phép chuyển sang Giai đoạn Build.

## BƯỚC 6: CẠM BẪY LẠM DỤNG CLASS MẶC ĐỊNH (ANTI-GLOBAL PADDING)
- **Sai lầm:** Nhắm mắt dùng các class layout có sẵn của Client-First như `padding-global` (chỉ có 2.5rem = 40px) mà không đo lường khoảng cách thực tế từ mép viền thiết kế (Screen edge) tới nội dung. Hậu quả là nội dung bị tràn ra hoặc khoảng cách lề sai lệch hoàn toàn so với Figma (VD: Figma yêu cầu 160px = 10rem).
- **Quy tắc:**
  + Không được tin tưởng tuyệt đối vào hệ thống class có sẵn. Hệ thống chỉ hỗ trợ, con số trên Figma mới là chân lý.
  + Phải TỰ ĐO khoảng cách từ rìa màn hình (Figma width) vào đến mép nội dung.
  + Nếu khoảng cách lớn hơn/nhỏ hơn `padding-global`, BẮT BUỘC phải tạo class bọc ngoài riêng (VD: `footer_padding` với `padding: 0 10rem`) để tái tạo chính xác tuyệt đối khoảng cách lề.
  + Kiểm tra kỹ cả `gap` lưới (VD: 142px = 8.875rem thì không được làm tròn thành 8.8rem hay 9rem).

## BƯỚC 7: TẠO COMBO CLASS ĐÚNG CHUẨN API (BẮT BUỘC DÙNG `parent_style_names`)
- **Sai lầm:** Khi tạo các Modifier Class (như `is-primary`, `is-text-area`, `margin-small`), Agent chỉ truyền tên class vào API mà bỏ quên tham số `parent_style_names`. Hậu quả là Webflow tạo ra một đống Global Class rác rưởi, phá nát kiến trúc kế thừa của Client-First.
- **Quy tắc:**
  + Bất cứ khi nào tạo một Combo Class (có tiền tố `is-`, hoặc class bổ trợ), **BẮT BUỘC phải gán nó vào một Base Class**.
  + Khi sử dụng `webflow_style_tool > create_style`, **phải truyền tham số `parent_style_names`**.
  + *Ví dụ ĐÚNG:* Tạo class `is-primary` phải đi kèm `parent_style_names: ["button"]`.
  + *Ví dụ ĐÚNG:* Tạo class `margin-small` phải đi kèm `parent_style_names: ["margin-top"]`.
  + Tuyệt đối không để Combo Class tồn tại như một Global Class độc lập.

## BƯỚC 9: TƯ DUY SPACING HIỆN ĐẠI (CHỐNG RÁC DOM / DIVCEPTION)
- **Sai lầm:** Sử dụng thẻ `DivBlock` rỗng để đẩy khoảng cách (Spacer Div) hoặc bọc nội dung vào trong một `DivBlock` chỉ với mục đích để mượn class `margin-top`. Điều này gây ra hiện tượng "Divception" (Thẻ bọc thẻ vô tội vạ), làm rác cấu trúc DOM, HTML phình to và cực kỳ khó chỉnh sửa khi làm Responsive.
- **Quy tắc:**
  + **Tuyệt đối KHÔNG** tạo thẻ `<div>` chỉ để chứa margin.
  + **Ưu tiên dùng GAP:** Cấp thuộc tính `display: flex`, `flex-direction: column` cho thẻ Cha bọc ngoài và dùng thuộc tính `gap` (row-gap) để tạo khoảng cách đều đặn giữa các thẻ con.
  + **Dùng Margin trực tiếp:** Nếu khoảng cách giữa các phần tử không đều nhau, hãy cấp `margin-bottom` trực tiếp cho bản thân thẻ con đó (hoặc tạo Combo Class), tuyệt đối không tạo thẻ `div` bọc ngoài chỉ để chứa margin.