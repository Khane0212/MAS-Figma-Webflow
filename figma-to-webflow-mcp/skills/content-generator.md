# Skill: Content Generator & Refiner (Figma-Driven)

## 📝 Quyền Ghi (Write Permissions)

  **Đọc + Ghi (Read-Write)**

- ✅ **ĐỌC**: `memory/brand-context.md` (Brand context từ Research Agent)
- ✅ **ĐỌC**: Figma Design Context qua MCP (Dữ liệu gốc từ Figma)
- ✅ **ĐỌC**: `memory/classes-inventory.json` (Hệ thống Class hiện tại)
- ❌ **CHỈ ĐỌC**: `rules/`, `skills/`
- ✅ **GHI**: `memory/[frame-name]-payload.json` (Output sau khi xử lý)

**Thao tác**: 
1. Đọc Figma Design Context qua MCP
2. Đối chiếu với `classes-inventory.json` để tái sử dụng classes
3. Gán semantic classes dựa trên thuộc tính Figma
4. Ghi kết quả vào `[frame-name]-payload.json` để Webflow Builder sử dụng

---

## Mục đích
Đảm bảo nội dung từ Figma được chuẩn hóa về mặt ngôn ngữ (Copywriting) và cấu trúc kỹ thuật (Mapping Class) trước khi đồng bộ lên Webflow.

## Luồng xử lý (Workflow Integration)

### Input từ Figma Scanner
- Figma Scanner gọi `mcp0_get_design_context(nodeId)` để lấy dữ liệu
- Truyền dữ liệu này cho Content Generator

### 1. Phân tích Nội dung Figma (Input)
- Duyệt qua toàn bộ Text Nodes từ Figma Design Context.
- **Giữ nguyên (Preserve)**: Nếu nội dung đã có ý nghĩa, giữ nguyên 100% văn bản.
- **Thay thế (Generate)**: Nếu phát hiện "Lorem Ipsum" hoặc text giả, sử dụng `brand-context.md` để tạo nội dung mới phù hợp.

### 2. Chuẩn hóa Class (Dynamic Semantic Mapping)
**KHÔNG gán Class cố định.** Việc chọn Class phải dựa trên dữ liệu thực tế của Node trong Figma:

**Ưu tiên 1 (Existing Classes)**: 
- Đọc `memory/classes-inventory.json` để lấy danh sách classes đã có
- Kiểm tra xem Frame hiện tại có trong inventory không
- **Tái sử dụng**: Nếu có classes từ frame trước (ví dụ: `page-wrapper`, `container-large`), dùng lại
- **Đánh dấu mới**: Nếu chưa có, đánh dấu là class mới cần tạo

**Ưu tiên 2 (Style Matching)**:
- Nếu Node có `text-style` hoặc `layer-name` khớp với Class trong inventory → dùng Class đó
- Dựa vào font-size để gán heading level (64px=h1, 40px=h2, 24px=h3, 20px=h4)

**Ưu tiên 3 (Client-First Naming)**:
- Đặt tên Class mới theo quy tắc: `[page]-[block]_[element]` hoặc `section_[name]`
- Ví dụ: `section_nav`, `newstand-hero`, `heading-h2`, `tag-badge`

### 3. Đóng gói Cấu trúc (Payload Generation)
- Tạo file `memory/[frame-name]-payload.json` với cấu trúc:
  - `project`, `frame`, `siteId`
  - `classes`: { `reused`: [...], `newClasses`: {...} }
  - `variables`: colors, typography, spacing
  - `structure`: HTML hierarchy phản ánh Figma layers
  - `content`: Text content cho từng element

- **Wrapper Structure** (bắt buộc):
  ```
  page-wrapper
    └── main-wrapper
        └── section_[frame-name]
        └── ...
  ```

---

### Ví dụ đầy đủ:
```html
<div class="page-wrapper">
  <div class="main-wrapper">
    <section class="section_hero">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-large">
            <!-- Hero content here -->
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
```

## 📋 Core Classes

### Wrappers
| Class | Purpose |
|-------|---------|
| `.page-wrapper` | Wrap toàn bộ trang |
| `.main-wrapper` | Wrap nội dung chính (không include nav/footer) |

### Sections
| Pattern | Example | Purpose |
|---------|---------|---------|
| `.section_[name]` | `.section_hero`, `.section_about`, `.section_pricing` | Define section theo chức năng |

### Padding Global
| Class | Purpose |
|-------|---------|
| `.padding-global` | Horizontal padding responsive (1.5rem → 3rem) |

### Containers
| Class | Max Width | Purpose |
|-------|-----------|---------|
| `.container-large` | 80rem (1280px) | Main content container |
| `.container-medium` | 64rem (1024px) | Medium content |
| `.container-small` | 48rem (768px) | Small content, text blocks |

### Section Padding
| Class | Vertical Padding |
|-------|------------------|
| `.padding-section-small` | 3rem top/bottom |
| `.padding-section-medium` | 5rem top/bottom |
| `.padding-section-large` | 7rem top/bottom |

---
## Quy tắc Tông giọng (Brand Alignment)
Khi phải tạo mới nội dung (thay cho Lorem Ipsum), phải đối chiếu với `brand-context.md` để áp dụng đúng:
- **Tone of voice**: Professional, Casual, Luxury, v.v.
- **Keywords**: Chèn các từ khóa ngành (Semantic keywords) để tối ưu SEO.

---

## Lệnh kích hoạt (Command Template)

```markdown
## Content Generate Command

Input: Figma Design Context (từ mcp0_get_design_context)
Frame: [Name of the frame]
Task: Generate Payload + Class Mapping

### Workflow:
1. **Đọc Inventory**: `memory/classes-inventory.json`
   - Kiểm tra frame hiện tại đã tồn tại chưa
   - Liệt kê classes có thể tái sử dụng từ frames trước

2. **Phân tích Figma Context**:
   - Trích xuất: text nodes, images, colors, typography
   - Xác định semantic structure (nav, hero, features, etc.)

3. **Class Mapping**:
   - Reused classes: từ inventory (wrapper, container, etc.)
   - New classes: dựa trên Figma layers (section-specific)

4. **Generate Payload**:
   - Write to: `memory/[frame-name]-payload.json`
   - Include: classes, variables, structure, content

5. **Output Summary**:
   - Reused classes list
   - New classes to create
   - Ready for Webflow Builder
```

### Output Format (payload.json)
```json
{
  "project": "World Peas",
  "frame": "newstand",
  "siteId": "69da69c0603d5b8c1cbd992e",
  "classes": {
    "reused": ["page-wrapper", "container-large", "section_nav"],
    "newClasses": {
      "hero": ["section_newstand-hero", "heading-h1"],
      "featured": ["section_featured-article", "heading-h2"]
    }
  },
  "variables": { "colors": {...}, "typography": {...} },
  "structure": { ... },
  "content": { ... }
}
```
