# INSTRUCTIONS.md - Central Brain

## Role

Senior Webflow Developer + UI Engineer. Chuyên đổi thiết kế Figma sang Webflow bằng MCP tools.

---

## QUICK START

```
scan [nodeId]    → Phân tích Figma (PARSE) + Tạo HTML + JSON
build [nodeId]   → scan + BUILD + VERIFY + UPDATE inventory
preview         → Xem memory/figma-reference.html
```

---

## PRE-BUILD PROTOCOL

**TUYỆT ĐỐI KHÔNG build nếu chưa parse.**

```
LOAD → READ FIGMA → PARSE → GENERATE (HTML) → GENERATE (JSON) → BUILD → VERIFY → UPDATE
```

### THỨ TỰ QUAN TRỌNG:
1. **figma-reference.html** → Tạo TRƯỚC (nội dung đầy đủ từ Figma)
2. **scan-result.json** → Tạo SAU (DỰA TRÊN figma-reference.html)

### KHÔNG BAO GIỜ THIẾU CONTENT:
> **Đọc**: `rules/content-extraction.md`
- Copy **toàn bộ** text từ Figma (không tóm tắt)
- Giữ nguyên số paragraphs và độ dài
- Kiểm tra đếm trước khi lưu file

### STYLE GUIDE CHECK (BẮT BUỘC TRƯỚC BUILD)

**Step 1: Switch to Style Guide page**
```
switch_page → Style Guide (page_id: 69e9d8d41e9590186727c6d2)
```

**Step 2: Document available combo classes**
```
[DYNAMIC] - Liệt kê từ Style Guide page:
- Query tất cả elements trong Style Guide
- Ghi chú combo classes thực tế có sẵn
- Ví dụ: text-size-regular + text-color-dark-70
- Ví dụ: text-size-regular + opacity-70
- [Thêm các combo khác dựa trên thực tế]
```

**Step 3: Switch to target page**
```
switch_page → [target_page]
```

**Step 4: Apply ONLY documented combo classes**
- ❌ KHÔNG tạo classes mới (inline-p-1, div-block)
- ✅ Dùng chính xác combo classes từ Style Guide
- ✓ Kiểm tra mỗi element có combo class phù hợp

**Step 5: Verify no violations**
- ❌ Không có "inline-*" classes
- ❌ Không có "div-block" classes  
- ✅ Tất cả elements dùng combo classes documented

| Step | Action | Output |
|------|--------|--------|
| 1 | LOAD | Đọc inventory + rules |
| 2 | READ FIGMA | Lấy specs gốc từ API |
| 3 | PARSE | Map Figma → inventory classes |
| 4 | GENERATE | **figma-reference.html (TRƯỚC)** |
| 5 | GENERATE | **scan-result.json (SAU)** |
| 6 | BUILD | Tạo Webflow (REUSE classes) |
| 7 | VERIFY | Snapshot check |
| 8 | UPDATE | Ghi inventory (CHỈ SAU VERIFY PASS) |

---

## PARSE CHECKLIST

| # | Item | Rule | Status |
|---|------|------|--------|
| 1 | **Naming** | Client-First: `section_[name]`, `heading-style-h2` | Pass/Fail |
| 2 | **Structure** | `section > padding-global > container > padding-section` | Pass/Fail |
| 3 | **Colors** | Chỉ CSS variables: `var(--color-*)` | Pass/Fail |
| 4 | **Typography** | REM units: `var(--[name]-size)` | Pass/Fail |
| 5 | **Spacing** | Utility classes | Pass/Fail |
| 6 | **Classes** | REUSE vs CREATE check vs inventory | Pass/Fail |

### Checklist Format:

```json
{
  "checklist": {
    "naming": { "status": "pass", "issues": [] },
    "structure": { "status": "pass", "issues": [] },
    "colors": { "status": "pass", "issues": [] },
    "typography": { "status": "pass", "issues": [] },
    "spacing": { "status": "pass", "issues": [] },
    "classes": { "status": "pass", "reuse": [], "create": [] }
  },
  "overall": "pass"
}
```

---

## RULES

### RULE 1: Client-First Naming Only

- ✅ `section_navbar`, `heading-style-h1`, `text-color-white`, `button is-primary`
- ❌ `Frame 1`, `Group 23`, `div-block`

### RULE 2: Core Structure (BẮT BUỘC)

```
.page-wrapper
  └── .main-wrapper
      └── .section_[name]
          └── .padding-global
              └── .container-[size]
                  └── .padding-section-[size]
                      └── CONTENT_WRAPPER
                          └── elements...
```

**TUYỆT ĐỐI KHÔNG được:**
- ❌ Tạo style mới (heading-style-h3-1, heading-style-h2-1...)
- ❌ Bỏ qua container/padding
- ❌ Inline styles

**Phải REUSE:**
- ✅ heading-style-h2 (đã có trong inventory)
- ✅ heading-style-h3 (đã có trong inventory)
- ✅ Tất cả classes từ inventory

### RULE 3: Colors - CSS Variables Only

> **Load từ: inventory.variables.colors**

```
Figma HEX → var(--color-[key])
```

### RULE 4: Typography - REM Units

> **Load từ: inventory.variables.typography**

```
Figma px → REM → var(--[key])
```

### RULE 5: Spacing - Utility Classes

> **Load từ: rules/design-system.md + inventory.variables.spacing**

```
design-system.md → spacing scale
inventory.variables.spacing[key]
```

### RULE 6: Container Sizes

> **Load từ: inventory.classes.containers**

```
inventory.classes.containers[key].maxWidth
```

---

## WORKFLOW DETAILS

### 1. LOAD

Đọc files bắt buộc:
- `memory/classes-inventory.json` → Variables + Classes
- `rules/code-style.md` → Core Structure
- `rules/naming-convention.md` → Client-First patterns
- `rules/design-system.md` → Spacing scale

### 2. READ FIGMA

```javascript
figma_get_design_context(nodeId, fileKey)
figma_get_metadata(nodeId, fileKey)
```

### 3. PARSE (Mapping + Conversion)

**3.1 Map Figma → Client-First:**
```
"Frame 1" → "section_hero"
```

**3.2 Convert px → REM (÷16)**

**3.3 Map HEX → CSS Variables (từ inventory):**
```
Figma HEX → inventory.variables.colors[key] → var(--color-[key])
```

**3.4 Cross-check vs inventory (REUSE vs CREATE):**

- ✅ **REUSE**: Classes đã tồn tại trong inventory → SỬ DỤNG
- ⚠️ **CREATE**: Classes MISSING trong inventory → Tạo mới (CHỈ khi thực sự cần)
- ❌ **TUYỆT ĐỐI KHÔNG**: Tạo heading-style-h3-1, heading-style-h2-1...

### 4. GENERATE (VỚI THỨ TỰ ĐÚNG)

| File | Thứ tự | Nguồn |
|------|--------|-------|
| figma-reference.html | **1 (TRƯỚC)** | Từ Figma API + MAP inventory |
| scan-results/[nodeId].json | **2 (SAU)** | DỰA TRÊN figma-reference.html |

**Đặc biệt:** 
- figma-reference.html TẠO TRƯỚC với nội dung đầy đủ
- scan-result.json TẠO SAU, reference đến figma-reference.html

### 5. BUILD (Sau user "Build")

```
PRE-BUILD CHECKLIST:
├─ [STRUCTURE] page-wrapper > main-wrapper > sections
├─ [CLASSES] REUSE vs CREATE
└─ [REPLY "Build" TO PROCEED]
```

### 6. VERIFY

```javascript
element_snapshot_tool(action={"id": {...}})
```

### 7. UPDATE (CHỈ SAU VERIFY PASS)

**Điều kiện:**
- ✅ PARSE PASS
- ✅ BUILD SUCCESS
- ✅ VERIFY PASS

---

## FILES GENERATED (THỨ TỰ QUAN TRỌNG)

| File | Thứ tự | Mô tả |
|------|--------|-------|
| `figma-reference.html` | **1 (TRƯỚC)** | HTML đầy đủ từ Figma + MAP inventory |
| `scan-results/[nodeId].json` | **2 (SAU)** | JSON DỰA TRÊN figma-reference.html + **PHẢI có content section** |

### QUAN TRỌNG:
- **figma-reference.html** phải tạo TRƯỚC scan-result.json
- **scan-result.json** phải reference đến figma-reference.html
- **scan-result.json PHẢI include `content` section với actual text content từ Figma**

### CRITICAL - KHÔNG BAO GIỜ thiếu content:
```
❌ SAI: scan-result.json không có content section
✅ ĐÚNG: scan-result.json có content sections đầy đủ
```

---

## DATA SOURCE PATHS

### Colors

```
inventory.variables.colors[key] → var(--color-[key])
```

### Typography

```
inventory.variables.typography[key] → var(--[key])
```

### Spacing Scale

```
rules/design-system.md
inventory.variables.spacing[key]
```

### Container Sizes

```
inventory.classes.containers[key].maxWidth
```

### Existing Classes

```
inventory.classes[key][]
```

---

## COMBO CLASSES PATTERN - REUSE ONLY

**Tất cả styles ĐÃ CÓ trong Webflow (REUSE):**

| Class Name | ID | Dùng cho |
|-----------|-----|----------|
| heading-style-h2 | 90000bf3-f0da-af74-e306-c8ba210559e1 | H2 titles |
| heading-style-h3 | 90000bf3-f0da-af74-e306-c8ba210559e2 | H3 titles |
| text-size-regular | 90000bf3-f0da-af74-e306-c8ba210559e3 | Body text |
| section_navbar | 748d9e0f-d2a4-9884-69dc-bd9809b6e858 | Navbar section |
| section_privacy-hero | de4d3087-aee1-3536-d97b-4c24761bdead | Hero section |
| section_privacy-content | 21557837-11b6-9c2a-da72-693413bf75da | Content section |
| section_footer | fc469cfa-481d-06df-9384-9b0eda4a45da | Footer section |
| text-color-dark | 80c778bf-c78b-32b6-1807-39ab7fc9a60b | Dark text |
| text-color-white | 80c778bf-c78b-32b6-1807-39ab7fc9a60a | White text |
| container-large | 90000bf3-f0da-af74-e306-c8ba210559e6 | Container 80rem |
| padding-global | 90000bf3-f0da-af74-e306-c8ba210559e7 | Global padding |

**TUYỆT ĐỐI KHÔNG ĐƯỢC:**
- ❌ Tạo heading-style-h2-1, heading-style-h3-1
- ❌ Tạo text-size-regular-1
- ❌ Tạo section-*-1

---

## NEVER (BẮT BUỘC)

- ❌ Build without PARSE
- ❌ Use Figma defaults (Frame, Group)
- ❌ Hard-code values (dùng inventory)
- ❌ Update inventory WITHOUT verify pass
- ❌ Tạo HTML mới (phải MAP từ inventory)
- ❌ **Tạo style MỚI như heading-style-h3-1** (REUSE từ inventory)
- ❌ **Bỏ qua cấu trúc Core Structure**

---

## TOOLS REFERENCE

| Tool | Use For |
|------|---------|
| `figma_get_design_context` | Lấy design specs |
| `figma_get_metadata` | Layout structure |
| `webflow_whtml_builder` | Insert HTML structure |
| `webflow_style_tool` | Create/apply styles |
| `webflow_element_tool` | Modify elements |
| `element_snapshot_tool` | Preview changes |

---

## FILE STRUCTURE

```
figma-to-webflow-mcp/
├── INSTRUCTIONS.md
├── skills/
│   ├── parse_figma_to_webflow.md   # MAIN SKILL
│   └── ...
├── rules/
│   ├── code-style.md
│   ├── naming-convention.md
│   └── design-system.md
└── memory/
    ├── classes-inventory.json  # SOURCE OF TRUTH
    ├── figma-reference.html
    └── scan-results/
        └── [nodeId].json
```

---

## PROTOCOL SUMMARY

```
LOAD → READ FIGMA → PARSE → GENERATE → BUILD → VERIFY → UPDATE
```

**Never: Build without parse**

**Never: Hard-code values**