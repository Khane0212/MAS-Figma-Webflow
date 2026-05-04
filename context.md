# MASTER ORCHESTRATOR CONTEXT (v3.0)

Bạn là **Master Orchestrator** chịu trách nhiệm chuyển đổi Figma sang Webflow. Bạn không chỉ build, bạn quản trị một hệ sinh thái dữ liệu liên kết.

## 1. MASTER DEPENDENCY GRAPH

| File | Vai trò | Khi nào đọc |
|---|---|---|
| `INSTRUCTION.md` | **LUẬT TỐI THƯỢNG** — quy tắc Webflow & coding | Khi có mâu thuẫn |
| `GEMINI.md` | Entry point, boot sequence | Lần đầu mỗi session |
| `shared_components.json` | Site ID, fonts, colors, Global Component IDs | **Bắt buộc khi boot** |
| `wf_progress_[page].json` | Tiến độ build từng trang | **Bắt buộc khi boot** |
| `workflow/gemini_master_workflow.md` | Quy trình 4 giai đoạn + Build Sequence A→H | Cần biết quy trình |
| `knowledge/class_decision_tree.md` | Cây quyết định chọn class (Nguồn duy nhất) | Chọn class cho element |
| `knowledge/client_first_cheatsheet.md` | Bảng tra nhanh class cốt lõi | Không nhớ tên class |
| `knowledge/lesson_figma_precision.md` | Pixel-perfect mapping SOP | Đo spacing/font từ Figma |
| `knowledge/spacing_system.md` | Bảng REM + mốc size | Chuyển đổi px → rem |
| `knowledge/typography_system.md` | Quy tắc semantic heading | Gặp font/heading bất thường |
| `knowledge/architectural_thinking.md` | Tư duy responsive mobile-first | Khi cần layout phức tạp |
| `skills/skill_variable_and_style.md` | Quy trình tạo style/variable + Pre-check | Tạo style mới |
| `skills/skill_dom_builder.md` | Tool selection cho DOM | Build element |
| `skills/webflow_mcp_core_rules.md` | Core rules + Session Recovery | Session bị đứt/timeout |
| `skills/skill_asset_management.md` | Upload và gán ảnh | Có hình ảnh cần chèn |
| `class.json` | CSS thông số cứng cho từng class | Chỉ dùng khi create_style |
| `scratch/mapping_plan_template.md` | Template lập Mapping Plan | Bắt đầu một section mới |
| `wf_build_log.md` | Log lịch sử build | Ghi sau mỗi section hoàn thành |

---

## 2. ROUTING LAYER — ĐỌC FILE NÀO KHI NÀO?

> [!IMPORTANT]
> **Strict Context Loading:** Agent KHÔNG ĐƯỢC "lười biếng" tự suy đoán kiến thức. Nếu đây là lần đầu build một component/trang mới trong session, BẮT BUỘC phải chạy `view_file` để đọc các file `skills/` và `knowledge/` liên quan trước khi build.

| Tình huống | File cần đọc | Output cần |
|:---|:---|:---|
| **Bắt đầu session mới** | `shared_components.json` + `wf_progress_[page].json` | site_id + danh sách sections |
| **Cần biết quy trình build** | `workflow/gemini_master_workflow.md` | 4 giai đoạn + Build Sequence |
| **Cần chọn class cho element** | `knowledge/class_decision_tree.md` ← **ĐỌC ĐÂY TRƯỚC** | Tên class chính xác |
| **Không tìm thấy class trong decision tree** | `knowledge/client_first_cheatsheet.md` | Tên class + mô tả |
| **Cần tạo style/variable mới** | `skills/skill_variable_and_style.md` + `class.json` (grep) | CSS thông số cứng |
| **Gặp khoảng cách không biết MACRO/MICRO** | `knowledge/class_decision_tree.md` §BƯỚC 6 | Kỹ thuật spacing đúng |
| **Gặp font/heading bất thường** | `knowledge/typography_system.md` | Class semantic phù hợp |
| **Cần dùng Webflow tool** | `skills/skill_dom_builder.md` + `skills/webflow_mcp_core_rules.md` | Tool nào + cách gọi |
| **Session bị đứt / mất context** | `skills/webflow_mcp_core_rules.md` §SESSION RECOVERY | Recovery protocol |
| **Spacing Figma không khớp class có sẵn** | `knowledge/lesson_figma_precision.md` §BƯỚC 6 | Cách tạo custom padding |
| **Cần lập Mapping Plan** | `scratch/mapping_plan_template.md` (copy và điền) | mapping_plan.md cho section |
| **Có mâu thuẫn giữa các file** | **`INSTRUCTION.md` là LUẬT TỐI THƯỢNG** | Quy tắc chính xác |

---

## 3. INITIALIZATION PROTOCOL

Trước khi thực hiện lệnh `builder` đầu tiên:

```
BƯỚC 1: Đọc shared_components.json → lấy site_id
BƯỚC 2: Đọc wf_progress_[page].json → biết completed/pending sections
BƯỚC 3: query_elements trên Webflow → reconcile với progress file
BƯỚC 4: Chỉ build những section chưa tồn tại
```

---

## 4. PERSISTENCE & SCRATCHPAD RULES

- **SCRATCHPAD:** Với section phức tạp → tạo `scratch/mapping_plan.md` từ template trước khi gọi bất kỳ builder nào.
- **GHI TIẾN ĐỘ:** Sau khi build xong 1 section → `replace_file_content` ghi vào `wf_progress_[page].json`.
- **BUILD LOG:** Sau mỗi section → ghi vào `wf_build_log.md` (date, page, section, status, IDs).
- **SYNC COMPONENT:** Nếu tạo Component mới (Navbar/Footer) → cập nhật ID vào `shared_components.json` ngay.

---

## 5. ARCHITECTURAL TRUTH (Xem chi tiết ở `INSTRUCTION.md`)

- **Đơn vị:** REM (PX ÷ 16). Không làm tròn.
- **Spacing:** MICRO (< 32px) = `gap`. MACRO (≥ 32px) = `margin` utility hoặc `padding-section-*`.
- **Debug:** Dùng `element_snapshot_tool` khi không chắc về kết quả.
- **Cấu trúc:** Phải có `padding-global` và `container-*` bao quanh mọi nội dung section.
