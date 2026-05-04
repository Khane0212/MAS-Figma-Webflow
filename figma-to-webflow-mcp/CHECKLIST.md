# Build Checklist - BẮT BUỘC 100%

> **KHÔNG ĐƯỢC BUILD** nếu thiếu bất kỳ mục nào.

## Phase 1: Context Loading [BLOCKER]

| # | Kiểm tra | Trạng thái |
|---|----------|------------|
| 1.1 | Đã đọc `GEMINI.md` | ☐ |
| 1.2 | Đã đọc `INSTRUCTION.md` | ☐ |
| 1.3 | Đã đọc `SYSTEM.md` | ☐ |
| 1.4 | Đã lấy `site_id` từ `project.json` | ☐ |
| 1.5 | Đã kiểm tra `build_[page].json` | ☐ |
| 1.6 | Section này CHƯA được build trước đó | ☐ |

**Nếu FAIL bất kỳ mục → DỪNG. Không được build.**

---

## Phase 2: Figma Analysis [BLOCKER]

| # | Kiểm tra | Trạng thái |
|---|----------|------------|
| 2.1 | Đã quét node ID từ Figma MCP | ☐ |
| 2.2 | Đã trích xuất color palette | ☐ |
| 2.3 | Đã trích xuất typography scale | ☐ |
| 2.4 | Đã trích xuất spacing/gap values | ☐ |
| 2.5 | Đã xác định layout structure (auto layout) | ☐ |
| 2.6 | Đã liệt kê tất cả images/assets cần thiết | ☐ |

**Nếu FAIL bất kỳ mục → DỪNG. Không được build.**

---

## Phase 3: Mapping Validation [BLOCKER]

| # | Kiểm tra | Trạng thái |
|---|----------|------------|
| 3.1 | Tất cả px đã convert sang rem (÷16) | ☐ |
| 3.2 | Colors đã map vào variables (không dùng HEX) | ☐ |
| 3.3 | Typography đã chọn đúng classes từ `class.json` | ☐ |
| 3.4 | Spacing đã chọn đúng utility classes | ☐ |
| 3.5 | Layout đã chuyển đổi từ Auto Layout sang Flexbox logic | ☐ |
| 3.6 | Đã lên cấu trúc DOM đầy đủ 7 lớp | ☐ |

**Nếu FAIL bất kỳ mục → DỪNG. Không được build.**

---

## Phase 4: Pre-Build Verification [BLOCKER]

| # | Kiểm tra | Trạng thái |
|---|----------|------------|
| 4.1 | Tên class utility dùng gạch ngang `-` | ☐ |
| 4.2 | Tên class custom dùng gạch dưới `_` | ☐ |
| 4.3 | Không có class dạng `div-block`, `inline-xxx` | ☐ |
| 4.4 | Không dùng PX, chỉ dùng REM | ☐ |
| 4.5 | Đã check duplicate classes trong `class.json` | ☐ |
| 4.6 | Variables đã được tạo trước styles | ☐ |

**Nếu FAIL bất kỳ mục → DỪNG. Không được build.**

---

## Phase 5: Build Execution [PROCEED]

Chỉ được thực hiện khi tất cả 4 phase trên đạt 100%.

| # | Thao tác | Trạng thái |
|---|----------|------------|
| 5.1 | Tạo variables (colors, spacing) | ☐ |
| 5.2 | Tạo utility styles | ☐ |
| 5.3 | Build HTML structure theo cấu trúc 7 lớp | ☐ |
| 5.4 | Apply classes cho từng element | ☐ |
| 5.5 | Upload và gán assets | ☐ |
| 5.6 | Verify bằng `element_snapshot_tool` | ☐ |

---

## Phase 6: Post-Build [REQUIRED]

| # | Thao tác | Trạng thái |
|---|----------|------------|
| 6.1 | Kiểm tra visual bằng snapshot | ☐ |
| 6.2 | So sánh với Figma (pixel nếu cần) | ☐ |
| 6.3 | Ghi `tracker.markSectionComplete()` | ☐ |
| 6.4 | Cập nhật `build_[page].json` | ☐ |

---

## Lệnh Build

**Chỉ chạy khi checklist đạt 100%:**

```
build [nodeId] --verify
```

**Nếu thiếu 1 checkmark → KHÔNG ĐƯỢC CHẠY LỆNH.**
