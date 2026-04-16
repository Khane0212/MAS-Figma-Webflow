# Skill: Figma Scanner

## 📝 Quyền Ghi (Write Permissions)

**Chỉ đọc (Read-Only) tất cả files**

- ❌ **CHỈ ĐỌC**: `memory/brand-context.md` (chủ sở hữu: Research Agent)
- ❌ **CHỈ ĐỌC**: `memory/project-history.log` (chủ sở hữu: QA Agent)
- ❌ **CHỈ ĐỌC**: `.cursorrules`, `rules/`, `skills/`

**Thao tác duy nhất**: Đọc từ Figma MCP APIs → Trả về analysis results

> ⚠️ **Quy tắc vàng**: Một file chỉ có 1 chủ sở hữu ghi. Figma Scanner KHÔNG GHI vào bất kỳ file nào.

---

## Mục đích
Quét và phân tích thực thể từ Figma Dev Mode để trích xuất:
- Color variables
- Typography styles
- Component structures
- Layout measurements
- Asset references

## Input
- Figma file URL hoặc Node ID
- Figma Dev Mode MCP connection

## Output
**KHÔNG GHI FILE** - Chỉ trả về data qua MCP response

Data structure trả về:
- `colors`: { variableName, hexValue, usage }
- `typography`: { fontFamily, sizes, weights, lineHeights }
- `components`: { name, type, children, styles }
- `spacing`: { margins, paddings, gaps in REM }
- `assets`: { images, icons with references }

> ⚠️ **Figma Scanner KHÔNG GHI vào bất kỳ file nào**. 
> Data được truyền trực tiếp cho Content Generator qua MCP response.

## Workflow: Frame-by-Frame Direct Build (Không Draft Page)

### Phase 1: Khởi động - Yêu cầu Figma Frame URL
```
🟢 AI chào hỏi, thông báo sẵn sàng
🛑 STOP - Yêu cầu: "Vui lòng cung cấp link Figma Frame cụ thể để bắt đầu build"
```

### Phase 2: Build Frame (User Triggered)
```
Input: User cung cấp Figma Frame URL (vd: https://figma.com/file/...?node-id=123-456)
Output: File WHTML trong memory/ + Webflow page
```

**Bước 2.1: Phân tích Figma Frame**
```
Tool: mcp0_get_design_context(nodeId)
→ Trích xuất: colors, typography, spacing, layout
→ Mapping: Figma layers → Webflow elements
→ Generate: Semantic class names
```

**Bước 2.2: Kiểm tra Classes tồn tại**
```
Đọc file: @memory/classes-inventory.json
→ Kiểm tra classes đã tạo từ frames trước
→ Tái sử dụng classes có sẵn
→ Đánh dấu classes mới cần tạo
```

**Bước 2.3: Truyền Data cho Content Generator**
```
→ Truyền Figma context (colors, typography, layout, text nodes)
→ Content Generator sẽ:
   - Đọc classes-inventory.json
   - Map semantic classes
   - GHI payload.json
```

**Bước 2.4: Webflow Builder nhận Payload**
```
Webflow Sync (Builder) đọc từ: memory/[frame-name]-payload.json
→ Build trên Webflow qua MCP APIs
```

> 🛑 **STOP sau mỗi Frame** - "✅ Frame hoàn thành. Link tiếp theo?"

### Phase 3: Frame tiếp theo (Loop)
```
Nếu User cung cấp link Frame mới → Quay lại Phase 2
Nếu User nói "done" → Kết thúc
```

## Quy trình chi tiết

### 1. Scan Colors
```
Sử dụng: mcp0_get_variable_defs
Trích xuất: Tất cả color variables từ Figma
Convert: HEX → CSS variables
Naming: Theo quy tắc --color-[purpose]-[variant]
```

### 2. Scan Typography
```
Sử dụng: mcp0_get_design_context
Trích xuất: Font families, sizes, weights
Convert: PX → REM
Naming: Theo quy tắc --font-[property]-[variant]
```

### 3. Scan Components
```
Sử dụng: mcp0_get_metadata + mcp0_get_design_context
Trích xuất: Component tree, nested elements
Mapping: Figma layers → Webflow elements
```

### 4. Generate Semantic Names
```
Input: Component name từ Figma
Process: 
  1. Xác định industry context (từ brand-context.md)
  2. Xác định function/intent
  3. Áp dụng naming convention
Output: Semantic class name
```

## Command Template: Frame-by-Frame Workflow

### Phase 1: Initial Request - Yêu cầu Figma Frame URL
```markdown
## � Figma-to-Webflow Builder

Chào! Tôi sẵn sàng build từng Frame Figma sang Webflow.

**Không cần tạo Draft Style Guide** - Build trực tiếp từng frame!

🛑 **Vui lòng cung cấp link Figma Frame cụ thể để bắt đầu.**

Format: `https://figma.com/file/XXX/Project?node-id=YYY-ZZZ`
```

### Phase 2: Build Frame Process
```markdown
## � Nhận Link Frame

**Input**: [Figma Frame URL]

---

## � Class Management
### Classes từ frames trước (trong memory/):
- ✅ [existing-class-1]
- ✅ [existing-class-2]
- ...

### Classes mới cần tạo:
- 🆕 [new-class-1]
- 🆕 [new-class-2]
- ...

---

## 🚀 Build Steps

### 1. Tạo File WHTML trong memory/
```
Path: @memory/[frame-name].whtml
Content: HTML + CSS classes
```

### 2. Build Webflow Page
- [ ] Create/Navigate page
- [ ] Apply existing classes
- [ ] Create new classes if needed
- [ ] Build Figma hierarchy
- [ ] Apply content & responsive

### 3. QA Checklist
- [ ] Match Figma design
- [ ] Client-First structure
- [ ] Responsive working
- [ ] Classes documented

---

## ✅ Output
- File WHTML: `memory/[frame-name].whtml`
- Classes inventory updated
- Webflow page: [PAGE_NAME]

🛑 **Frame hoàn thành! Link tiếp theo hoặc 'done'?**
```

### Output Format (Sau scan)
```json
{
  "scanSummary": {
    "fileName": "...",
    "totalPages": 5,
    "totalFrames": 23,
    "totalComponents": 47
  },
  "popularComponents": [
    { "name": "Button/Primary", "count": 24, "semanticName": "button-primary" },
    { "name": "Card/Feature", "count": 18, "semanticName": "feature-card" }
  ],
  "allFrames": [
    { "name": "Homepage - Hero", "pageId": "0:1", "nodeId": "123:456" },
    { "name": "Homepage - Features", "pageId": "0:1", "nodeId": "123:789" }
  ],
  "designTokens": { "colors": [...], "typography": [...], "spacing": [...] }
}
```

## Ví dụ Output

```json
{
  "project": "MediCare Plus",
  "industry": "healthcare",
  "colors": {
    "primary": {
      "default": { "value": "#0066CC", "var": "--color-primary-default" },
      "hover": { "value": "#0052A3", "var": "--color-primary-hover" }
    }
  },
  "typography": {
    "heading": {
      "font": "Inter",
      "sizes": { "h1": "3rem", "h2": "2.25rem" }
    }
  },
  "components": [
    {
      "figmaName": "Hero Section",
      "semanticName": "home-hero-section",
      "type": "section",
      "children": [
        { "figmaName": "Title", "semanticName": "hero-heading", "type": "h1" },
        { "figmaName": "CTA Button", "semanticName": "hero-cta-button", "type": "button" }
      ]
    }
  ]
}
```
