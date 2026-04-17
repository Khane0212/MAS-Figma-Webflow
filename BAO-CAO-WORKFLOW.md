# 📊 BÁO CÁO WORKFLOW - Figma to Webflow MCP

**Ngày**: 2026-04-16 | **Phiên bản**: 2.0

---

## 🔁 LUỒNG HOẠT ĐỘNG

```
Figma URL → Scanner (data) → Generator (map + payload.json) → Sync (build) → QA (audit) → 🛑
```

**Chi tiết**:

| Thứ tự | File | Cách hoạt động | Output |
|--------|------|----------------|--------|
| **1** | `.cursorrules` | Bootstrap: Đọc `INSTRUCTIONS.md` trước mọi action | Rules |
| **2** | `agents/research-agent.md` | Phân tích Figma URL → Xác định ngành, keywords, tone | `brand-context.md` |
| **3** | `skills/figma-scanner.md` | Gọi `mcp0_get_design_context()` → Trích xuất colors, typography, layout | Data (no file) |
| **4** | `skills/content-generator.md` | Đọc `classes-inventory.json` → Map classes (3 priorities) → Generate content | `[frame]-payload.json` |
| **5** | `skills/webflow-sync.md` | Đọc `payload.json` → Tạo variables/styles → Build page trên Webflow | Webflow Page |
| **6** | `agents/qa-tester.md` | Đối chiếu với rules → Audit → Ghi log | `project-history.log` |

**3 Priority Mapping**:
1. Đọc `classes-inventory.json` → Reuse existing classes
2. Style Matching → Font-size 64px=h1, 40px=h2, 24px=h3
3. Client-First Naming → `[page]-[block]_[element]` hoặc `section_[name]`

---

## � CHI TIẾT CÁCH HOẠT ĐỘNG TỪNG FILE

### **`.cursorrules`** (System)
- **Khi nào chạy**: Đầu tiên, trước mọi action
- **Hoạt động**: Bootstrap - Bắt buộc đọc `INSTRUCTIONS.md`
- **Output**: Orchestration rules

### **`agents/research-agent.md`** (Research Agent)
- **Khi nào chạy**: User cung cấp Figma URL
- **Hoạt động**: 
  1. Phân tích Figma file structure
  2. Xác định ngành nghề (SaaS, Healthcare...)
  3. Trích xuất semantic keywords
  4. Định nghĩa brand voice/tone
- **Đọc**: Figma metadata
- **Ghi**: `memory/brand-context.md`

### **`skills/figma-scanner.md`** (Figma MCP)
- **Khi nào chạy**: Sau khi có brand context
- **Hoạt động**:
  1. Gọi `mcp0_get_design_context(nodeId)`
  2. Trích xuất: colors (HEX → CSS variables), typography (px → rem), spacing, layout
  3. Map Figma layers → Webflow elements
- **Đọc**: Figma Dev Mode
- **Output**: Design context (trả về data, **KHÔNG ghi file**)

### **`skills/variable-mapper.md`** (Internal)
- **Khi nào chạy**: Nhận data từ Figma Scanner
- **Hoạt động**:
  1. Đọc `rules/design-system.md`
  2. Map colors → `--color-[purpose]-[variant]`
  3. Map typography → `--font-[property]` (rem units)
  4. Map spacing → `--space-[scale]`
- **Đọc**: `design-system.md`
- **Output**: `mappedVariables` (object)

### **`skills/naming-mapper.md`** (Internal)
- **Khi nào chạy**: Nhận data từ Figma Scanner
- **Hoạt động**:
  1. Đọc `rules/naming-convention.md` (philosophy)
  2. Đọc `rules/code-style.md` (Core Classes)
  3. Đọc `memory/classes-inventory.json`
  4. Gán Core Classes (wrappers, containers)
  5. Đặt tên semantic `[page]-[block]_[element]`
- **Đọc**: `naming-convention.md`, `code-style.md`, `classes-inventory.json`
- **Output**: `mappedClasses` (object)

### **`skills/content-generator.md`** (Internal)
- **Khi nào chạy**: Nhận text nodes từ Figma Scanner
- **Hoạt động**:
  1. Đọc `memory/brand-context.md`
  2. Phân loại: Heading, Paragraph, Button, Tag
  3. Xử lý Lorem Ipsum → Generate content mới
  4. Tinh chỉnh real text (nếu cần)
  5. Tối ưu SEO (alt text, keywords)
- **Đọc**: `brand-context.md`
- **Output**: `refinedContent` (object)

### **`skills/semantic-mapper.md`** (Orchestrator)
- **Khi nào chạy**: Nhận outputs từ 3 mapper
- **Hoạt động**:
  1. Nhận: `mappedVariables`, `mappedClasses`, `refinedContent`
  2. Xây dựng DOM tree (wrapper hierarchy)
  3. Lắp ghép: classes + variables + content
  4. Tạo payload JSON
- **Đọc**: 3 mapper outputs
- **Ghi**: `memory/[frame-name]-payload.json`

### **`skills/webflow-sync.md`** (Webflow MCP)
- **Khi nào chạy**: Có `payload.json`
- **Hoạt động**:
  1. Đọc `payload.json`
  2. Create/Navigate Webflow page
  3. Tạo variables (colors, typography)
  4. Tạo styles/classes
  5. Build structure → Apply content
  6. **Cập nhật Inventory**: Ghi lại các class mới vào `classes-inventory.json`
- **Đọc**: `payload.json`, `classes-inventory.json`
- **Ghi**: `memory/classes-inventory.json`
- **Output**: Webflow Page (online) + Updated Inventory

### **`agents/qa-tester.md`** (QA Agent)
- **Khi nào chạy**: Sau khi build xong
- **Hoạt động**:
  1. Đọc `payload.json`
  2. Đối chiếu `naming-convention.md`, `code-style.md`, `design-system.md`
  3. Kiểm tra: Naming, REM, Fidelity, Content
  4. Ghi audit result
- **Đọc**: `payload.json`, `brand-context.md`, rules/
- **Ghi**: `memory/project-history.log`

---

## �📁 CẤU TRÚC FILE

```
rules/              → Quy chuẩn
  ├── naming-convention.md  (naming philosophy)
  ├── code-style.md         (Core Structure + REM)
  └── design-system.md      (colors, typography)

skills/             → Kỹ năng xử lý
  ├── figma-scanner.md      (extract - KHÔNG ghi file)
  ├── variable-mapper.md     (map colors → `mappedVariables`)
  ├── naming-mapper.md       (map classes → `mappedClasses`)
  ├── content-generator.md   (refine content → `refinedContent`)
  ├── semantic-mapper.md     (orchestrator → `payload.json`)
  └── webflow-sync.md        (build Webflow)

agents/             → Chuyên gia
  ├── research-agent.md
  └── qa-tester.md

memory/             → Lưu trữ
  ├── classes-inventory.json
  ├── brand-context.md
  ├── project-history.log
  └── [frame]-payload.json
```

---

## ✅ ƯU ĐIỂM

| # | Điểm mạnh |
|---|-----------|
| 1 | Frame-by-frame build (không draft) |
| 2 | Memory-first (reuse classes) |
| 3 | 3-Priority mapping logic rõ ràng |
| 4 | Modular (dễ thêm skill/agent) |
| 5 | Client-First + REM units |

---

## ⚠️ NHƯỢC ĐIỂM

| # | Vấn đề | Mức độ |
|---|--------|--------|
| 1 | INSTRUCTIONS.md ≠ .cursorrules | 🔴 Cao |
| 2 | No Error Recovery Workflow | 🟡 TB |
| 3 | Content Generator quá nặng | 🟡 TB |

---

## 📊 ĐÁNH GIÁ: **8.5/10**

| Tiêu chí | Điểm |
|----------|------|
| Nhất quán | 9/10 |
| Mở rộng | 9/10 |
| Hoàn thiện | 8/10 |
| Maintain | 8/10 |

---

**File mapper đã đầy đủ**: `variable-mapper.md`, `naming-mapper.md`, `semantic-mapper.md`, `content-generator.md` ✅
