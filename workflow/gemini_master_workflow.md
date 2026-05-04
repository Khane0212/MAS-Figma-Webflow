# QUY TRÌNH ALL-IN-ONE: TỪ FIGMA LÊN WEBFLOW

> [!IMPORTANT]
> **Quy tắc lập trình tổng quát:** Xem `INSTRUCTION.md` (LUẬT TỐI THƯỢNG)
> **Chọn class cụ thể:** Xem `knowledge/class_decision_tree.md`

---

## GIAI ĐOẠN 1: ĐỌC HIỂU FIGMA
**Input:** Figma Node ID từ user  
**Output:** Bảng Design Tokens + cấu trúc Auto Layout

1. Gọi Figma MCP (`get_design_context`) để quét Node ID được yêu cầu.
2. Trích xuất theo checklist:
   - **Dimensions**: Width/Height (Fixed / Fill / Hug)
   - **Spacing**: padding (T/R/B/L), gap giữa các con, margin với phần tử liền kề
   - **Typography**: font-family, font-size, font-weight, line-height, letter-spacing, color+opacity
   - **Decoration**: border-radius, border (width/color/opacity), box-shadow, background-color

> [!CAUTION]
> Tuyệt đối không làm tròn số. 77px = 4.8125rem, không phải 4.8rem hay 5rem (công thức: REM = PX ÷ 16).

---

## GIAI ĐOẠN 2: MAPPING & SCRATCHPAD
**Input:** Kết quả từ Giai đoạn 1  
**Output:** File `scratch/mapping_plan.md` hoàn chỉnh (copy từ `scratch/mapping_plan_template.md`)

1. Tạo `scratch/mapping_plan.md`.
2. Đi qua từng phần tử, dùng `knowledge/class_decision_tree.md` để chọn class.
3. **LUẬT THÉP:** Mọi DivBlock PHẢI có tên class. Tuyệt đối không để div vô danh.
4. Ghi đầy đủ thông số CSS cứng cạnh tên class (xem template). Chỉ khi đủ "Hard Data" mới được sang Giai đoạn 3.

---

## GIAI ĐOẠN 3: THỰC THI WEBFLOW
**Input:** `scratch/mapping_plan.md` hoàn chỉnh  
**Output:** Các element được build trên Webflow, có class đúng

### BUILD SEQUENCE (Thực hiện đúng thứ tự A→H)

> [!WARNING]
> **INCREMENTAL DOM TRACKING (Theo dõi & Resume Mid-build):** 
> 1. Mỗi khi dùng `element_builder` tạo xong một thẻ quan trọng (như section, container, form_block), BẮT BUỘC phải ghi nhận ID thẻ đó vào `wf_progress_[page].json` (trong mảng `in_progress_section.completed_elements`).
> 2. Nếu session bị ngắt và phải resume, Agent hãy đọc `in_progress_section`, lấy ID của thẻ DOM cuối cùng đã build thành công làm điểm neo (parent_element_id) để build nối tiếp, thay vì xóa sạch làm lại từ đầu.

```
A → Variables     : variable_tool → tạo color/size variables
B → Base Styles   : style_tool → pre-check bằng query_styles, chỉ create_style nếu chưa có
C → Custom Styles : style_tool → tạo component-specific classes
D → DOM Structure : element_builder (ngoài → trong)
      D1: page-wrapper + main-wrapper (nếu chưa có)
      D2: section_[name]
      D3: padding-global > container-[size] > padding-section-[size]
      D4: [name]_component
      D5: Các element con (heading, text, image, button, form...)
E → Link Styles   : element_tool.set_style cho từng element
F → Assets        : asset_tool → upload và gán image IDs
G → Audit DOM     : query_elements → kiểm tra không có div rác ("Divception")
H → Snapshot      : element_snapshot_tool → xác nhận trực quan
```

> [!TIP]
> **Chọn tool builder:** Dùng `element_builder` mặc định. Chỉ dùng `whtml_builder` nếu HTML thuần class (không có `style=""` inline). Khi nghi ngờ, chọn `element_builder`.

---

## GIAI ĐOẠN 4A: AUDIT & BÁO CÁO LỖI (CHỜ USER APPROVE)
**Input:** Section vừa build xong  
**Output:** Báo cáo lỗi gửi user — KHÔNG tự fix

### Quy Trình Audit
1. `query_elements` → lấy toàn bộ DOM section vừa build
2. So sánh từng element với `mapping_plan.md`, lập danh sách lỗi:

```
CHECKLIST AUDIT:
[ ] Có Div Block nào vô danh (không có class)?
[ ] Class nào sai/thiếu so với mapping plan?
[ ] Text nào còn Lorem ipsum / placeholder?
[ ] Element nào thừa (không có trong mapping plan)?
[ ] Style nào chưa được gán (set_style chưa chạy)?
[ ] Responsive breakpoint nào còn thiếu?
```

3. Ghi tất cả lỗi vào `wf_build_log.md` theo format ERR-XXX
4. **Xuất báo cáo rõ ràng cho user theo format sau:**

```
=== AUDIT REPORT: [section_name] ===
Tổng lỗi phát hiện: X

[ERR-001] Loại: DOM Structure
  Element: [tên element]
  Vấn đề: [mô tả cụ thể]
  Vị trí: [path trong DOM, VD: section > div > div]

[ERR-002] Loại: Class Naming
  Element: [tên element]
  Hiện tại: [class đang có hoặc "không có class"]
  Đúng phải là: [class theo mapping plan]

[ERR-003] Loại: Text Content
  Element: [tên element]
  Hiện tại: "Lorem ipsum..."
  Đúng phải là: "[text thật]"
=====================================
Bạn có muốn tôi fix những lỗi trên không?
```

> [!CAUTION]
> **STOP — KHÔNG TỰ FIX.** Sau khi xuất báo cáo, Agent PHẢI dừng và chờ user xác nhận. Chỉ tiến hành fix khi user trả lời "fix" hoặc chỉ định lỗi cụ thể cần fix.

---

## GIAI ĐOẠN 4B: FIX & GHI NHẬN (Chỉ chạy sau khi user approve)
**Input:** Danh sách lỗi user muốn fix  
**Output:** `wf_progress_[page].json` + `wf_build_log.md` được cập nhật

1. Chỉ fix những lỗi user đã xác nhận — không fix thêm bất cứ thứ gì khác.
2. Với mỗi lỗi fixed: cập nhật entry trong `wf_build_log.md` → đổi status `[OPEN]` → `[FIXED]`.
3. Ghi tên Section vào `completed_sections` trong `wf_progress_[page].json` khi tất cả lỗi đã fixed.
4. Chạy lại Audit (Giai đoạn 4A) sau khi fix để xác nhận không còn lỗi mới.