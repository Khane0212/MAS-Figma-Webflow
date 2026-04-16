# Skill: Webflow Sync

## 📝 Quyền Ghi (Write Permissions)

**Không có quyền ghi vào memory files**

- ❌ **KHÔNG ĐƯỢC GHI**: `memory/brand-context.md` (chủ sở hữu: Research Agent)
- ❌ **KHÔNG ĐƯỢC GHI**: `memory/project-history.log` (chủ sở hữu: QA Agent)
- ❌ **KHÔNG ĐƯỢC GHI**: `.cursorrules`, `rules/`, `skills/`

**Thao tác duy nhất**: Ghi trực tiếp lên Webflow qua MCP APIs
- Variables, Styles, Components, Pages trên Webflow Designer

> ⚠️ **Quy tắc vàng**: Một file chỉ có 1 chủ sở hữu ghi. Webflow Sync KHÔNG ghi vào local memory.

---

## Mục đích
Đồng bộ Style Guide từ Figma sang Webflow tự động:
- Color variables
- Typography styles
- CSS classes (Client-First)
- Components

## Prerequisites
- Webflow Designer đã mở
- MCP Webflow connection active
- `[frame-name]-payload.json` đã được Content Generator tạo xong

## 🛑 QUY TẮC ĐIỀU PHỐI

> **CRITICAL**: **KHÔNG tạo Draft Style Guide** - Build trực tiếp từng Frame!
>
> Sau khi hoàn thành một Frame, AI **PHẢI DỪNG LẠI** và nói:
> 
> *"✅ Frame '[frame-name]' đã hoàn thành. Vui lòng cung cấp link Frame tiếp theo hoặc 'done' để kết thúc."*

---

## Workflow: Frame-by-Frame Build (No Draft)

### Phase 1: Class Inventory Management
```
Tool: Đọc từ @memory/classes-inventory.json

Trước khi build frame mới:
  1. Đọc classes đã tạo từ frames trước
  2. So sánh với classes cần cho frame hiện tại
  3. Tái sử dụng classes đã có
  4. Chỉ tạo classes mới khi thực sự cần
  5. Cập nhật inventory sau khi build
```

### Phase 2: Variables (Global) - Tạo khi cần
```
Tool: mcp1_variable_tool (create_*_variable)
Chỉ tạo khi chưa có:
  - Color variables
  - Typography variables
  - Spacing variables
```

### Phase 3: Frame Build Process
```
Input: `[frame-name]-payload.json` từ Content Generator

Steps:
  1. Đọc payload.json (classes, variables, structure, content)
  2. Kiểm tra classes trong inventory
  3. Create/Navigate page trong Webflow
  4. Tạo variables (colors, typography) nếu chưa có
  5. Tạo styles/classes mới trên Webflow
  6. Build structure theo payload hierarchy
  7. Apply content & responsive
  8. QA checklist
  9. 🛑 STOP - Yêu cầu frame tiếp theo
```

### Phase 4: Update Inventory
```
Sau mỗi frame:
  - Ghi lại classes mới tạo
  - Cập nhật @memory/classes-inventory.json
  - Lưu WHTML reference
```

## Command Template

### Frame Build (User Triggered)
```markdown
## Webflow Sync: Frame Build

⚠️ **Input Required**: Figma Frame URL

Format: `https://figma.com/file/XXX/Project?node-id=YYY-ZZZ`

---

### 📋 Class Inventory Check
**Đọc từ**: @memory/classes-inventory.json

**Classes có sẵn**:
- ✅ [existing-class-1]
- ✅ [existing-class-2]

**Classes mới cần tạo**:
- � [new-class-1]
- 🆕 [new-class-2]

---

### 🔧 Build Process

**Step 1**: Đọc payload → Parse classes & structure
**Step 2**: Create/Navigate Webflow page
**Step 3**: Create variables (color, typography) nếu cần
**Step 4**: Create styles/classes (existing + new)
**Step 5**: Build structure → Content → Responsive

---

### ✅ QA Checklist
- [ ] Match Figma design
- [ ] Client-First structure
- [ ] Classes reused properly
- [ ] Responsive working
- [ ] Payload updated in memory/

### 📝 Output
- Webflow Page: [PAGE_NAME] (đã build với đầy đủ sections)
- Classes: Applied trực tiếp lên Webflow
- Inventory: Đã cập nhật (nếu có classes mới)

🛑 **Frame done! Next frame or 'done'?**
```


## Mapping Reference

### Figma → Webflow
| Figma | Webflow |
|-------|---------|
| Frame/Section | Section element |
| Group | Div Block |
| Component | Component |
| Text | Text Block |
| Rectangle/Div | Div Block |
| Image | Image element |
| Vector/SVG | Icon font hoặc SVG |

### Class Naming
```
Figma Layer: "Hero Section"
↓ Semantic Analysis
↓ Webflow Class: "home-hero-section"

Figma Layer: "Primary Button"  
↓ Semantic Analysis
↓ Webflow Class: "button-primary"
```

## Validation Checklist

- [ ] Variables được tạo đúng collection
- [ ] Colors có đủ variants (default, hover, active)
- [ ] Typography dùng REM units
- [ ] Classes follow Client-First naming
- [ ] Components có đủ states
- [ ] Responsive breakpoints được thiết lập
- [ ] Không có duplicate classes
- [ ] Assets đã upload đầy đủ
