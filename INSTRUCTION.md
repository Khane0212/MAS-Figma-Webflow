Behavioral guidelines to reduce common LLM coding mistakes.

Tradeoff: These guidelines bias toward caution over speed. For trivial tasks, use judgment.

1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

State your assumptions explicitly. If uncertain, ask.
If multiple interpretations exist, present them - don't pick silently.
If a simpler approach exists, say so. Push back when warranted.
If something is unclear, stop. Name what's confusing. Ask.

2. Simplicity First
Minimum code that solves the problem. Nothing speculative.

No features beyond what was asked.
No abstractions for single-use code.
No "flexibility" or "configurability" that wasn't requested.
No error handling for impossible scenarios.
If you write 200 lines and it could be 50, rewrite it.

3. Surgical Changes
Touch only what you must. Clean up only your own mess.

When editing existing code:

Don't "improve" adjacent code, comments, or formatting.
Don't refactor things that aren't broken.
Match existing style, even if you'd do it differently.
If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:

Remove imports/variables/functions that YOUR changes made unused.
Don't remove pre-existing dead code unless asked.

4. Goal-Driven Execution
Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"

---

## WEBFLOW PROJECT RULES (QUY TẮC WEBFLOW — LUẬT TỐI THƯỢNG)

Khi có mâu thuẫn giữa bất kỳ file nào, INSTRUCTION.md luôn thắng.

### 1. Kiến trúc Client-First (Finsweet)

**Cấu trúc DOM bắt buộc:**
```
page-wrapper > main-wrapper > section_[name] > padding-global > container-[size] > padding-section-[size] > [name]_component
```

**Quy tắc DivBlock (ANTI-ANONYMOUS-DIV):**
- **TUYỆT ĐỐI CẤM** đẻ ra DivBlock không có class. Mọi div đều PHẢI có class.
- Trước khi build bất kỳ section/component nào: `query_elements` để kiểm tra đã có chưa.

**Quy tắc Tool Builder:**
- Dùng `element_builder` mặc định.
- Chỉ dùng `whtml_builder` nếu HTML chỉ chứa `class="..."` (TUYỆT ĐỐI CẤM nếu có `style="..."` inline).

**Quy tắc Form (DEFAULT FORM BUG):**
- Webflow tự sinh input/button không class → BẮT BUỘC dùng `set_style` gán ngay:
  - Form wrapper → `form_component`
  - Input → `form_input` (thêm `is-text-area` cho textarea)
  - Submit button → `button is-primary`

**Anti-Amnesia / Duplicate DOM (Incremental Recovery Protocol):**
- Sau timeout/reconnect/lỗi API (gemini is way too hot): PHẢI đọc `wf_progress_[page].json` trước, đặc biệt kiểm tra `in_progress_section`.
- **LUẬT SKIP:** Nếu tên Section đã nằm trong mảng `completed_sections`, BẮT BUỘC phải BỎ QUA hoàn toàn, tuyệt đối không build lại.
- **LUẬT PARENT ID CHO SECTION MỚI:** Khi bắt đầu build một Section mới, `parent_element_id` PHẢI LÀ ID của `main-wrapper` (hoặc `page-wrapper`). TUYỆT ĐỐI KHÔNG gắn section mới vào bên trong container của section cũ.
- LUẬT TỐI THƯỢNG CHO RESUME: Nếu session bị ngắt giữa chừng (có dữ liệu trong `in_progress_section`), lấy ID của thẻ DOM cuối cùng trong `completed_elements` làm điểm neo (parent) để build tiếp các thẻ con bên trong nó.
- KHÔNG BAO GIỜ xóa làm lại từ đầu (trừ khi chính thẻ neo bị lỗi) để tiết kiệm thời gian và resource, nhưng phải build nối tiếp một cách cực kỳ chính xác vào đúng thẻ cha.

### 2. Đơn vị & Spacing

**REM Conversion:** PX ÷ 16 = REM. Không làm tròn. 77px = 4.8125rem.

**Naming Convention:**
- Utility Class (dùng chung): dấu gạch ngang `-` → `margin-top`, `text-color-primary`
- Custom Class (riêng component): dấu gạch dưới `_` → `contact_form-block`, `hero_content-left`

**Spacing Rules (Single Source of Truth):**
- **MICRO (< 32px, trong cùng component):** Dùng `gap` trên flex/grid. KHÔNG tạo spacer div.
- **MACRO (≥ 32px, giữa các block/section):** Dùng `margin-bottom` utility hoặc `padding-section-*`.
- TUYỆT ĐỐI KHÔNG tạo `<div>` rỗng không có class để tạo khoảng cách.

### 3. Đồng bộ & Bộ nhớ

- **Startup:** Đọc `shared_components.json` (site_id, navbar/footer IDs) + `wf_progress_[page].json` (tiến độ).
- **Sau mỗi section:** Ghi vào `wf_progress_[page].json` + `wf_build_log.md`.
- **Shared component mới:** Cập nhật ID vào `shared_components.json` ngay lập tức.

These guidelines are working if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.