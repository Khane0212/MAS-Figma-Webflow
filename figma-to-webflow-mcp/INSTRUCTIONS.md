# FIGMA-TO-WEBFLOW MCP: CENTRAL INSTRUCTIONS

## 🧠 PROJECT BRAIN & ORCHESTRATION
Dự án này tự động hóa quy trình chuyển đổi thiết kế từ Figma sang Webflow theo chuẩn Client-First và Semantic Naming.

---

## 🛑 QUY TẮC ĐIỀU PHỐI (MANDATORY)

> **RULE 1 (Initialization)**: Bất kể Agent nào (Claude, Cursor, GPT), hành động đầu tiên PHẢI là đọc `memory/classes-inventory.json` để đồng bộ trạng thái.
> 
> **RULE 2 (Source of Truth)**: File `INSTRUCTIONS.md` này là tài liệu hướng dẫn cao nhất. Mọi thay đổi về workflow phải được cập nhật tại đây.
> 
> **RULE 3 (Frame-by-Frame)**: Chỉ xử lý từng Frame một. Xong một Frame PHẢI dừng lại xác nhận với User trước khi tiếp tục.
> 
> **RULE 4 (Memory First)**: Luôn kiểm tra `figma-to-webflow-mcp/memory/` trước khi tạo mới bất cứ thứ gì trên Webflow.
> 
> **RULE 5 (Auto-Logging)**: Mọi hành động (Sync, Generate, Scan) sau khi thành công PHẢI tự động ghi một dòng tóm tắt vào `figma-to-webflow-mcp/memory/project-history.log`.

---

## 🛠 WORKFLOW CHI TIẾT (MANDATORY FILE ACCESS)

### 1. Phân tích & Nghiên cứu (Research Agent)
- **Hành động**: Đọc Figma Context.
- **Tài liệu bắt buộc**: Đọc `agents/research-agent.md`.
- **Đầu ra**: Tạo/Cập nhật `memory/brand-context.md`.
- **Quy tắc đặt tên**: Tuân thủ `rules/naming-convention.md`.

### 2. Quét Figma (Figma Scanner)
- **Hành động**: Trích xuất Variables & Layout.
- **Tài liệu bắt buộc**: Đọc `skills/figma-scanner.md` và `rules/design-system.md`.
- **Đơn vị**: Luôn convert sang REM theo `rules/code-style.md`.

### 3. Đồng bộ Webflow (Webflow Sync)
- **Hành động**: Build trực tiếp qua MCP.
- **Tài liệu bắt buộc**: Đọc `skills/webflow-sync.md`.
- **Kiểm tra**: Luôn đối chiếu `memory/classes-inventory.json` để tái sử dụng class.
- **Nội dung**: Sử dụng `skills/content-generator.md` để tạo copy.

### 4. Kiểm tra chất lượng (QA Tester)
- **Hành động**: Audit & Checklist.
- **Tài liệu bắt buộc**: Đọc `agents/qa-tester.md`.
- **Đầu ra**: Ghi kết quả vào `memory/project-history.log`.

---

## 📂 CẤU TRÚC DANH MỤC (DIRECTORY MAPPING)
- `/rules`: Quy chuẩn chi tiết về Code, Design, Naming.
- `/agents`: Hướng dẫn chuyên biệt cho từng loại Agent.
- `/skills`: Các kỹ năng xử lý dữ liệu (Scanner, Sync, Generator).
- `/memory`: Nơi lưu trữ trạng thái và "trí nhớ" của dự án.

---

## 🎨 DESIGN SYSTEM RULES
- **Colors**: `--color-[purpose]-[variant]-[state]`
- **Typography**: `--font-[property]-[variant]` (Luôn dùng REM)
- **Spacing**: `--space-[scale]` (Scale Finsweet)

---

## 📝 GHI CHÚ CHO AI AGENT
Khi làm việc, hãy luôn giữ thái độ của một Senior Webflow Developer. Ưu tiên sự gọn gàng của Class hơn là tốc độ build.


Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.