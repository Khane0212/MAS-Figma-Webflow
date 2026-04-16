Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

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
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

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
The test: Every changed line should trace directly to the user's request.

4. Goal-Driven Execution
Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## WEBFLOW PROJECT WORKFLOW (QUY TRÌNH WEBFLOW)

Dự án này tuân thủ các quy tắc đặc thù sau đây để đảm bảo tính đồng nhất giữa thiết kế Figma và Webflow:

### 1. Kiến trúc Client-First (Finsweet)
- Toàn bộ layout phải tuân thủ cấu trúc: `page-wrapper` > `main-wrapper` > `section_[name]` > `padding-global` > `container-[size]` > `padding-section-[size]`.
- Class tiện ích (Utility) dùng gạch ngang `-` (ví dụ: `margin-top`).
- Class tùy chỉnh (Custom) dùng gạch dưới `_` (ví dụ: `header_content-wrapper`).

### 2. Đơn vị & Quy chuẩn
- **REM Concept**: Luôn chuyển đổi PX từ Figma sang REM (PX / 16).
- **Spacing**: Không áp dụng margin/padding trực tiếp vào các thẻ Heading/Paragraph. Sử dụng các wrapper hoặc thẻ spacer chuyên dụng.

### 3. Đồng bộ & Bộ nhớ (Persistence)
- **Shared Metadata**: Luôn kiểm tra `shared_components.json` để lấy `site_id` và IDs của Navbar/Footer.
- **Progress Manager**: Sử dụng `ProgressManager.js` để ghi lại tiến độ build từng section. Không build lại các phần đã có trạng thái hoàn thành trong file `wf_progress_[page].json`.

### 4. Thứ tự thực thi cho Agent
1. Đọc `GEMINI.md` -> `INSTRUCTION.md` -> `context`.
2. Kiểm tra `shared_components.json` để xác định Site thực thi.
3. Kiểm tra file progress local để biết điểm dừng cuối cùng.
4. Chỉ thực hiện build sau khi đã đồng bộ đủ ngữ cảnh.

These guidelines are working if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
