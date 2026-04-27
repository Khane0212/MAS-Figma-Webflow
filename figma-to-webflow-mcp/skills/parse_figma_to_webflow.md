# Skill: parse_figma_to_webflow

## Role

Chuyên gia Webflow Engineering. Kết nối thiết kế Figma sang Webflow Pixel-Perfect với Client-First naming convention.

---

## COMMANDS

| User Input | Action |
|-----------|--------|
| `scan [nodeId]` | PARSE + GENERATE (HTML + JSON) |
| `scan [nodeId] [fileKey]` | PARSE + GENERATE với fileKey cụ thể |
| `build [nodeId]` | FULL: PARSE + GENERATE + BUILD + VERIFY + UPDATE |
| `preview` | Hiển thị memory/figma-reference.html |

---

## WORKFLOW (8 Bước) - VỚI Option A (generate.html)

```
┌───────────────────────────────────────────────────────────────────────┐
│  1. LOAD        → Đọc inventory + checklist                     │
│  2. READ FIGMA  → Gọi API lấy Figma design               │
│  3. PARSE       → Map Figma → inventory classes         │
│  4. GENERATE   → Tạo figma-reference.html (TRƯỚC)       │
│  5. GENERATE   → Tạo scan-result.json (SAU)            │
│  6. STYLE GUIDE → Check combo classes (BẮT BUỘC)       │
│  7. BUILD      → Build Webflow từ scan-result.json  │
│  8. VERIFY     → Snapshot check                    │
│  9. UPDATE     → Ghi inventory (CHỈ SAU VERIFY PASS)│
└───────────────────────────────────────────────────────────────────────┘
```

### Thứ tự QUAN TRỌNG:
1. **figma-reference.html** → Tạo TRƯỚC (nội dung đầy đủ từ Figma)
2. **scan-result.json** → Tạo SAU (DỰA TRÊN figma-reference.html)

---

## Bước 1: LOAD

**Đọc files bắt buộc:**

| File | Lấy data |
|------|----------|
| `memory/classes-inventory.json` | Classes, variables |
| `rules/code-style.md` | Core Structure |
| `rules/naming-convention.md` | Client-First patterns |
| `rules/design-system.md` | Spacing scale, breakpoints |
| `rules/content-extraction.md` | **Content extraction - không thiếu text** |
| `rules/style-guide-checklist.md` | **Style Guide checklist - tránh lỗi class** |

**Tạo Context từ inventory:**

```javascript
const context = {
  colors: inventory.variables.colors,
  typography: inventory.variables.typography,
  spacing: inventory.variables.spacing,
  existingClasses: inventory.classes
}
```

---

## Bước 2: READ FIGMA

```javascript
figma_get_design_context(nodeId, fileKey)
figma_get_metadata(nodeId, fileKey)
```

---

## Bước 3: PARSE (Mapping + Conversion + Cross-check)

### 3.1 Map Figma → Client-First Naming

| Figma (Sai) | Client-First (Đúng) |
|-------------|---------------------|
| `Frame 1` | `section_hero` |
| `Group 23` | `hero_content` |
| `Rectangle` | `cta-button` |
| `Text 2` | `heading-style-h2` |

### 3.2 Convert Units (px → REM)

```
px → REM (÷16)
```

### 3.3 Map HEX → CSS Variables

```
Figma HEX → inventory.variables.colors[key] → var(--color-[key])
```

### 3.4 Cross-check vs Inventory

```javascript
const parseResult = {
  reuse: [],    // Classes đã tồn tại → REUSE
  create: []    // Classes missing → CREATE
}
```

---

## Bước 4: GENERATE

### Output Files (THỨ TỰ QUAN TRỌNG):

| File | Thứ tự | Nguồn dữ liệu |
|------|--------|---------------|
| `memory/figma-reference.html` | **1 (TRƯỚC)** | Từ Figma API + MAP inventory |
| `memory/scan-results/[nodeId].json` | **2 (SAU)** | Từ figma-reference.html |

### Logic generate (THỨ TỰ ĐÚNG):

```
Bước 1: LOAD → đọc inventory
Bước 2: READ FIGMA → gọi figma_get_design_context(nodeId, fileKey)
Bước 3: PARSE → map data
Bước 4: GENERATE → tạo figma-reference.html (TRƯỚC)
Bước 5: GENERATE → tạo scan-result.json (DỰA TRÊN figma-reference.html)
```

### figma-reference.html

> **Tạo TRƯỚC scan-result.json**
> Nội dung đầy đủ từ Figma design
> MAP từ inventory classes

### scan-result.json

> **Tạo SAU figma-reference.html**
> **DỰA TRÊN figma-reference.html** để map data
> **PHẢI include `content` section với actual text content**

### Content Verification (BẮT BUỘC)

Trước khi lưu file, kiểm tra:

```
✓ Đếm paragraphs trong Figma = paragraphs trong HTML
✓ Độ dài text trong Figma ≈ độ dài text trong HTML  
✓ Links trong Figma = links trong HTML
✓ Bullet items trong Figma = <li> trong HTML
```

**Nếu thiếu → Quét lại Figma, không được tự ý rút gọn**

**JSON output format:**

```json
{
  "meta": {
    "nodeId": "[FROM API]",
    "fileKey": "[FROM API]",
    "scannedAt": "[TIMESTAMP]",
    "project": "[FROM API]",
    "siteId": "[FROM API]"
  },

  "figmaReference": {
    "source": "memory/figma-reference.html",
    "generatedAt": "[TIMESTAMP]"
  },

  "layout": {
    "width": "[FROM API]",
    "height": "[FROM API]",
    "sections": "[FROM API]"
  },

  "content": {
    "description": "FULL TEXT CONTENT - Map từ figma-reference.html",
    "sections": {
      "navbar": {
        "logo": "...",
        "links": ["Home", "About us", ...],
        "cta": "Contact us"
      },
      "hero": {
        "heading": "Privacy Policy",
        "subtitle": "When you're ready..."
      },
      "content": {
        "block1": {
          "heading": "Lorem ipsum dolor.",
          "paragraphs": ["Lorem ipsum dolor sit amet...", "Sunt in culpa..."],
          "links": [{"text": "Excepteur sint occaecat", "href": "#"}]
        },
        "block2": {
          "heading": "Lorem ipsum dolor sit amet.",
          "paragraphs": ["Lorem ipsum...", {"text": "cupidatat", "href": "#"}],
          "bulletItems": ["Lorem ipsum", "Consectetur", "Sed do"]
        }
      }
    }
  },

  "elements": {
    "[element-name]": {
      "type": "nav|section|div|p|img|...",
      "class": "[inventory-class-name]",
      "children": ["child-element-1", "child-element-2"],
      "generate": {
        "html": "<nav class='section_navbar padding-global container-large navbar_wrapper'>...</nav>",
        "description": "Navbar section với logo, nav links"
      }
    }
  },

  "colors": { ... },
  "typography": { ... }
}
```

### CRITICAL: `content` section PHẢI có

**KHÔNG BAO GIỜ được để scan-result.json thiếu content!**

```
❌ SAI:
{
  "elements": { ... },
  "colors": { ... }  // THIẾU content!
}

✅ ĐÚNG:
{
  "content": { ... },  // MỚI include content TRƯỚC
  "elements": { ... },
  "colors": { ... }
}
```

```json
{
  // ===== META =====
  "meta": {
    "nodeId": "[FROM API]",
    "fileKey": "[FROM API]",
    "scannedAt": "[TIMESTAMP]",
    "project": "[FROM API]",
    "siteId": "[FROM API]"
  },

  // ===== LAYOUT =====
  "layout": {
    "width": "[FROM API]",
    "height": "[FROM API]",
    "sections": "[FROM API]"
  },

  // ===== 1. COLORS (đầy đủ) =====
  "colors": {
    // Map từ Figma design context colors
    "[key]": { "hex": "...", "rgb": "...", "variable": "...", "opacity": 1 }
  },

  // ===== 2. TYPOGRAPHY (đầy đủ) =====
  "typography": {
    // Map từ Figma fonts
    "[key]": { "element": "...", "fontFamily": "...", "fontSize": { "px": 48, "rem": 3 }, ... }
  },

  // ===== 3-8. TƯƠNG TỰ =====

---

### HTML Output (MAP từ inventory generate.html)

> **LƯU Ý**: HTML được MAP TRỰC TIẾP từ inventory classes (generate.html field).
> Ko tạo HTML mới - chỉ MAP từ inventory.

**Logic:**
1. Đọc elements từ Figma API
2. Map mỗi Figma element → inventory class (có generate.html)
3. Ghép generate.html từ các classes → scan-result JSON

**Structure chuẩn (theo RULE 2):**

```
page-wrapper
└── main-wrapper
    └── section_[name]
        └── padding-global
            └── container-[size]
                └── padding-section-[size]
                    └── CONTENT_WRAPPER
                        └── elements...
```

---

## Bước 5: BUILD (TỪ scan-result.json - Sau user xác nhận "Build")

### Pre-Build Checklist:

```
[SCAN-RESULT.JSON]
├── elements: { class, type, generate.html }
└── Layout: section > padding > container > content

[BUILD SOURCE]
┌─────────────────────────────────────────────────────┐
│ Input:  scan-result.json (đã có generate.html)      │
│ Output: Webflow page                               │
│ Build:  Duyệt elements → tạo style → build WHTML   │
└─────────────────────────────────────────────────────┘

[STRUCTURE]
.page-wrapper
  └─ .main-wrapper
      └─ .section_[name]
          └─ .padding-global
              └─ .container-[size]
                  └─ .padding-section-[size]
                      └─ CONTENT

[CLASSES]
┌─────────────────┬──────────┬─────────────────────────┐
│ Class           │ Status   │ Action                  │
├─────────────────┼──────────┼─────────────────────────┤
│ heading-h2     │ exists  │ REUSE                   │
│ container-large│ exists  │ REUSE                   │
│ hero_wrapper  │ missing │ CREATE + APPLY           │
└─────────────────┴──────────┴─────────────────────────┘

[REPLY "Build" TO PROCEED]
```

### Execution Order (từ scan-result.json):

1. **Đọc scan-result.json** (đã có generate.html)
2. **Duyệt elements** → tạo styles từ inventory classes
3. **Build structure** (section > padding-global > container > content)
4. **Apply generate.html** → tạo WHTML từ JSON
5. **Set content** → text, images từ API data

---

## Bước 6: VERIFY

```javascript
element_snapshot_tool(action={"id": {...}})
```

### Conditions:

| Build | Verify | Action |
|-------|--------|--------|
| Success | Pass | → UPDATE inventory |
| Success | Fail | → Rollback, báo lỗi |
| Fail | - | → Không update |

---

## Bước 7: UPDATE (CHỈ SAU VERIFY PASS)

**Điều kiện bắt buộc:**
- ✅ PARSE PASS
- ✅ BUILD SUCCESS
- ✅ VERIFY PASS

**Update `memory/classes-inventory.json`:**

```json
{
  "lastUpdated": "",
  "classes": { "NEW_CATEGORY": {} },
  "scanHistory": []
}
```

---

## DATA SOURCE PATHS

### Colors

```
inventory.variables.colors[key] → var(--color-[key])
```

### Typography Sizes

```
inventory.variables.typography[key] → var(--[key])
```

### Spacing Scale

```
rules/design-system.md → spacing scale
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

## COMBO CLASSES PATTERN

**Luôn tạo base class TRƯỚC, variant SAU:**

```
button (base)
  └── is-primary
  └── is-secondary
```

**Đúng:**
```javascript
webflow_style_tool(actions=[{
  "create_style": { "name": "button", "properties": [...] }
}])

webflow_style_tool(actions=[{
  "create_style": {
    "name": "is-primary",
    "parent_style_names": ["button"],
    "properties": [...]
  }
}])
```

---

## ERROR HANDLING

### PARSE Fail

```
❌ PARSE FAILED

Issues:
- [ ] "Frame 1" → cần rename sang "section_hero"
- [ ] Class missing in inventory

Fix issues hoặc reply "Skip" để tiếp tục với warnings.
```

### BUILD Fail

```
❌ BUILD FAILED

Error: [Webflow error message]

Không update classes-inventory.json. Fix errors và thử lại.
```

### VERIFY Fail

```
⚠️ VERIFY FAILED

Mismatch detected. Rollback applied. Không update inventory.
```

---

## EXAMPLES

### scan 103:4

```
→ LOAD inventory + rules
→ READ Figma nodeId 103:4
→ PARSE: Map names, convert units
→ GENERATE:
    - memory/scan-results/103-4.json
    - memory/figma-reference.html
```

### build 103:4

```
→ scan 103:4
→ PRE-BUILD CHECKLIST
→ Wait for "Build" confirm
→ BUILD: Create styles, build structure
→ VERIFY: Snapshot check
→ UPDATE: classes-inventory.json (sau verify pass)
```

### preview

```
→ Show memory/figma-reference.html
```

---

## KEY DIFFERENCES: OLD vs NEW (Option A)

| Aspect | OLD | NEW (Option A) |
|--------|-----|------------------|
| Inventory | CSS properties only | CSS + `generate.html` |
| Scan-result | Partial | **FULL** (có generate.html) |
| Build source | Parse lại | **MAP từ generate.html** |
| HTML output | Hard-coded | **Dynamic từ inventory** |