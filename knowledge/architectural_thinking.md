# TƯ DUY KIẾN TRÚC UI & RESPONSIVE (ARCHITECTURAL THINKING)

> Tài liệu này cung cấp **phương pháp luận** để Agent tự ra quyết định cấu trúc DOM và xử lý Responsive. Nội dung về Naming Convention và Container Size xem tại `knowledge/class_decision_tree.md` (Single Source of Truth).

---

## 1. NGUYÊN LÝ PHÂN TÁCH KHÔNG GIAN (MACRO vs MICRO)

> [!IMPORTANT]
> Quy tắc spacing chính xác nằm tại `INSTRUCTION.md` §2 và `knowledge/class_decision_tree.md` §BƯỚC 6.

**MACRO SPACING (≥ 32px — giữa các Block hoặc Section):**
- Dùng `margin-bottom` utility gắn trực tiếp vào element CẤP TRÊN.
- Hoặc `padding-section-*` cho khoảng cách giữa các Section.
- **TUYỆT ĐỐI CẤM:** Tạo `<div>` rỗng để chứa margin hoặc dùng `margin-top` làm xáo trộn luồng (flow) từ trên xuống dưới.

**MICRO SPACING (< 32px — trong cùng một Component):**
- CHỈ dùng `gap` (row-gap / column-gap) trên flex/grid container.
- TUYỆT ĐỐI KHÔNG dùng spacer div.

*Lý do phân tách:* MACRO spacing thường cần thay đổi riêng trên Mobile (chỉ đổi class utility 1 chỗ). MICRO spacing cần sự gắn kết nội bộ, `gap` tự điều chỉnh khi phần tử con thay đổi.

---

## 2. TƯ DUY RESPONSIVE TỪ TRONG TRỨNG (MOBILE-FIRST AWARENESS)

Khi nhìn vào thiết kế Desktop từ Figma, Agent PHẢI dự trù ngay kịch bản Tablet/Mobile:

1. **Flex Flow Collapse:** Cụm nằm ngang (`flex-direction: row`) → dự trù sẽ đổi thành `flex-direction: column` trên màn hình `tiny`. Đồng thời `column-gap` → `row-gap`.

2. **Grid Collapse:** Grid nhiều cột Desktop (VD: `grid-template-columns: 1fr 1fr`) → mặc định gom về `1fr` ở Tablet/Mobile (`medium` hoặc `tiny`).

3. **Reset Width:** `width: 100%` trên `input`/`textarea` là BẮT BUỘC. Mọi `max-width` fixed (VD: 500px) phải reset về `100%` trên Mobile.