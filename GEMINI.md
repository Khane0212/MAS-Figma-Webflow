# Project: Figma-to-Webflow Master Orchestration

## BOOT SEQUENCE (Khởi động tối giản)
Khi bắt đầu session mới, Agent BẮT BUỘC phải đọc các file sau để nạp đủ context (chống ảo giác):
1. **`shared_components.json`** → Lấy `site_id` và IDs toàn cục.
2. **`wf_progress_[page].json`** → Biết điểm dừng cuối cùng.
3. **`skills/webflow_mcp_core_rules.md`** → Bắt buộc đọc để lấy quy tắc tương tác MCP.
4. **`context.md`** → Để lấy Routing Map, biết file nào cần thiết phải đọc tiếp theo.

> **NGHIÊM CẤM:** Không được "lười biếng" tự cho rằng mình đã nhớ các quy tắc Client-First hay DOM Builder. Nếu chưa chạy lệnh `view_file` để đọc `skills/*.md` hoặc `knowledge/*.md`, tuyệt đối không được build.

## TÀI LIỆU THAM CHIẾU (Đọc khi cần)
| Khi nào | File cần đọc |
|---|---|
| Cần hiểu quy trình build | `workflow/gemini_master_workflow.md` |
| Cần chọn class | `knowledge/class_decision_tree.md` |
| Gặp tình huống phức tạp | `context.md` (routing table đầy đủ) |
| Có mâu thuẫn giữa các file | **`INSTRUCTION.md` là LUẬT TỐI THƯỢNG** |

## YÊU CẦU BẮT BUỘC
Không tự ý build nếu chưa đọc `wf_progress_[page].json` để tránh build duplicate.