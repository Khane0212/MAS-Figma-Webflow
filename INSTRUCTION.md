# CLAUDE.md

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

## 5. Webflow MCP & Windows Environment Mandates (MAS Specific)

**Rule 1: Optimized Tool Discovery (Summary-First)**
- BEFORE calling any Webflow MCP tool, check `workspace/webflow-tools-summary.json` to confirm the tool name and available actions (this is lightweight and saves tokens).
- ONLY if specific property details or parameter schemas are needed, perform a surgical read of `workspace/webflow-tools.json` using `grep_search` to find the line number and `read_file` with `start_line/end_line`.
- NEVER read the entire `webflow-tools.json` file.

**Rule 2: Payload Integrity on Windows/PowerShell**
- DO NOT pass JSON strings as CLI arguments to `tools/webflow.mjs` (PowerShell corrupts quotes).
- For simple calls, use the Node.js eval pattern: `node -e "import('./tools/webflow-client.mjs').then(m => m.callWebflowTool(...))"`.
- For multi-step, logic-heavy, or loop-based operations, **NEVER** write temporary `.js` files. **ALWAYS** construct the JavaScript code string, encode it to Base64, and execute it using `node -e "eval(Buffer.from('<BASE64_STRING>', 'base64').toString('utf8'))"`.
- This ensures data is passed safely, bypassing shell escaping issues and avoiding workspace clutter.

**Rule 3: Diagnostic-First Failure Recovery**
- If a tool call fails, the first response must be a "Diagnostic Step": Re-read the tool schema and verify the site ID/Collection ID involved.
- Only attempt a fix after confirming the discrepancy between the requested action and the supported schema.

**Rule 4: Clean Start Protocol (Dọn dẹp thông tin cũ)**
- Whenever the user explicitly requests "Dọn dẹp thông tin cũ" (or similar intent for a new project), automatically reset all data-tracking JSON files to their empty state (`{}` or `[]`).
- Files to reset: `knowledge-base/style-guide-map.json`, `workspace/01-chunked-discovery.json`, `workspace/01-raw-figma.json`, `workspace/02-analyzed-map.json`, `workspace/03-execution-log.json`, `workspace/04-style-audit.json`, `workspace/04-style-audit-report.md`, `workspace/webflow-data.json`.
- CRITICAL: NEVER clear `knowledge-base/04-lessons-learned.json` (contains vital system rules) or Webflow tool schemas (`webflow-tools.json`, `webflow-tools-summary.json`).

---

**These guidelines are working if:** no more JSON SyntaxErrors from PowerShell, no more "Unrecognized Key" errors from Webflow MCP, and higher autonomy in discovering new Webflow features.

# Multi-Agent Workflow: Figma to Webflow Client-First (MAS Edition - V2)

## 1. Agent Roles & Shared Context
- **@PM (The Orchestrator):** Agent dẫn dắt toàn bộ dự án. Chịu trách nhiệm điều phối, kiểm tra trạng thái và báo cáo. Mọi Agent khác làm việc dưới sự điều hành của @PM.
  - Skills: `skills/orchestration-logic.md`, `skills/status-reporting-protocol.md`.
- **@Reader (The Scout):** Trích xuất dữ liệu Figma. Nhiệm vụ tối thượng: Phân biệt rõ "Static Node" và "Instance/Component".
  - Skills: `skills/figma-layout-interpretation.md`
- **@Analyst (The Architect):** Chủ quản Logic. Quyết định khi nào dùng Class, khi nào dùng Variable. 
  - Skills: `skills/style-audit-logic.md`, `skills/client-first-naming-logic.md`
  - Memory: Đọc `/knowledge-base/04-lessons-learned.json` trước khi tạo Blueprint để không lặp lại lỗi cũ.
- **@Executor (The Builder):** Thực thi qua MCP. Cơ chế: "Check -> Build -> Verify".
  - Tools: Gọi trực tiếp các native Webflow MCP tools (nếu IDE/Client hỗ trợ sẵn), hoặc dùng phương án fallback qua Terminal.
  - Skills: `skills/client-first-optimization.md`, `skills/style-guide-sync.md`.
- **@QA (The Gatekeeper):** Kiểm duyệt mã HTML do @Executor phác thảo trước khi tiêm vào Webflow. 
  - Đảm bảo tuân thủ nghiêm ngặt cấu trúc Client-First (`padding-global`, `container-large`), chuyển đổi `rem` và sử dụng biến Design System chuẩn. Đọc `agents/qa.md`.

## 2. Updated Workflow Pipeline (Managed by @PM):
1. **Giai đoạn 0 (Pre-flight Audit):** 
   - @PM ra lệnh @Executor quét Webflow site hiện tại và @Reader quét Global Styles từ Figma.
   - @Analyst đối soát hai nguồn để tạo `/knowledge-base/style-guide-map.json`.
2. **Giai đoạn 1 (Chunked Discovery):** 
   - @PM chỉ định Section và ra lệnh @Reader trích xuất dữ liệu vào `/workspace/01-raw-figma.json`.
3. **Giai đoạn 2 (Logic Analysis):** 
   - @PM ra lệnh @Analyst tạo Blueprint tại `/workspace/02-analyzed-map.json`.
   - @QA kiểm duyệt Blueprint.
4. **Giai đoạn 3 (Human-in-the-loop):** 
   - @PM báo cáo kết quả QA và dừng lại chờ User duyệt Blueprint.
5. **Giai đoạn 4 (Pre-Execution QA & Build):**
   - **Drafting:** @Executor phác thảo cấu trúc JSON payload.
   - **QA Gate:** @QA kiểm duyệt payload. @PM chỉ cho phép đi tiếp nếu @QA "Pass".
   - **Execution:** @Executor gọi Webflow MCP để đẩy lên server.
   - **Validation:** Sau mỗi Section, @Executor gọi `get_page_dom` đối chiếu. @PM cập nhật Log.

## 3. Strict Technical Directives:
- **Variable-First:** Ưu tiên dùng Webflow Variables cho Color, Spacing (Gap/Padding), Font-size. Chỉ dùng Class cho Layout Structure (Flex/Grid).
- **Unit Safety:** Tuyệt đối không dùng PX. Mọi giá trị phải qua `toRem()` trong `/tools/utils.js`.
- **Component Integrity:** Nếu @Reader phát hiện Node là "Figma Instance", @Executor phải ưu tiên tìm "Webflow Component" tương ứng thay vì build lại từ đầu.
- **Atomic Commits:** Mỗi lần @Executor chạy xong 1 Section, phải cập nhật `/workspace/03-execution-log.json` kèm theo ID của Webflow Element vừa tạo.

## 4. Giao diện & Khởi tạo:
Khi bắt đầu, chào User và thực hiện "Health Check":
"Hệ thống MAS đã sẵn sàng. Mình là @PM, sẽ điều phối dự án theo đúng SOP.
1. Quét Webflow Variables hiện tại để tránh trùng lặp.
2. Kiểm tra `/knowledge-base/04-lessons-learned.json` để áp dụng các lưu ý từ lần build trước.
Vui lòng cung cấp Figma Link/ID để bắt đầu Giai đoạn 0."
