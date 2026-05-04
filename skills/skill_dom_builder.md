# KỸ NĂNG XÂY DỰNG CẤU TRÚC DOM

> Quy tắc về whtml_builder, Anonymous Div và Form Bug xem tại `INSTRUCTION.md` §1 (Single Source of Truth).

---

## Chiến Lược Chọn Tool

| Tình huống | Tool | Lý do |
|:---|:---|:---|
| Tạo element từng bước, gán class chi tiết | `element_builder` | An toàn, kiểm soát tốt |
| HTML thuần class (không có `style=""`) | `whtml_builder` | Nhanh hơn cho cụm lớn |
| Có bất kỳ `style=""` inline | **TUYỆT ĐỐI CẤM** `whtml_builder` | Phá kiến trúc Client-First |
| Không chắc chắn | `element_builder` | Luôn an toàn hơn |

> **Nguyên tắc:** Khi nghi ngờ → chọn `element_builder`.

---

## Quy Trình Build DOM (3 Bước)

**Bước 1 — Định vị:**
```
de_page_tool (get_current_page) → xác nhận đang ở đúng trang
```

**Bước 2 — Pre-check (ANTI-DUPLICATE):**
```
element_tool (query_elements) → kiểm tra section/component đã tồn tại chưa
→ Nếu đã có: DỪNG, không build lại
→ Nếu chưa có: tiếp tục
```

**Bước 3 — Build (ngoài → trong):**
```
element_builder:
  D1: page-wrapper + main-wrapper (nếu chưa có)
  D2: section_[name]
  D3: padding-global > container-[size] > padding-section-[size]
  D4: [name]_component
  D5: Các element con
→ element_tool.set_style → gán class cho từng element
```

> [!TIP]
> `element_builder` hỗ trợ tối đa 3 cấp lồng nhau mỗi lần gọi. Build cấu trúc sâu hơn theo nhiều lần gọi kế tiếp.