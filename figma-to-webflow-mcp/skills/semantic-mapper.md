# Skill: Semantic Mapper (Orchestrator)

## 📝 Quyền Ghi (Write Permissions)

**Chủ sở hữu duy nhất**: `memory/[frame-name]-payload.json`

- ✅ **ĐỌC**: Figma Design Context (Scanner)
- ✅ **ĐỌC**: Mapped Variables (Variable Mapper)
- ✅ **ĐỌC**: Mapped Classes (Naming Mapper)
- ✅ **ĐỌC**: Refined Content (Content Generator)
- ✅ **GHI**: `memory/[frame-name]-payload.json` (Output cuối cùng để build)

---

## Mục đích
Đóng vai trò "Tổng chỉ huy" để lắp ghép các mảnh dữ liệu từ các Skill chuyên biệt thành một Payload hoàn chỉnh, sẵn sàng cho việc build Webflow.

## Chức năng chính

### 1. Điều phối Dữ liệu (Orchestration)
- Tiếp nhận kết quả từ `Variable Mapper` (Variables), `Naming Mapper` (Classes), và `Content Generator` (Content).
- Kết hợp chúng với cấu trúc phân cấp Layer (Hierarchy) từ `Figma Scanner`.

### 2. Xây dựng Cấu trúc Layout (Hierarchy)
- Tự động áp dụng cấu trúc bao bọc (wrapper) Client-First cho mọi Frame.
- Xây dựng cây phân cấp HTML phản ánh chính xác Figma layers nhưng tối ưu theo Webflow components.

### 3. Tổng hợp Payload
- Kiểm tra tính nhất quán giữa Class Name và Style Variables.
- Đóng gói toàn bộ thông tin vào file `memory/[frame-name]-payload.json`.

---

## Quy trình thực hiện (Internal Task)

1. **Nhận Input**: Dữ liệu Layout từ Scanner + Outputs từ 3 mapper chuyên biệt.
2. **Xây dựng Cây phân cấp (DOM Tree)**: Tạo cấu trúc HTML lồng nhau chuẩn Client-First.
3. **Lắp ghép**:
   - Gán `mappedClasses` vào các node tương ứng.
   - Gán `mappedVariables` (styles) vào các class/node.
   - Gán `refinedContent` (text/images) vào các element.
4. **Generate Payload**: Ghi file payload JSON cuối cùng.

---

## Output Format (`payload.json`)

```json
{
  "project": "Tên dự án",
  "frame": "Tên frame",
  "variables": { "mapped_from_variable_mapper": true },
  "classes": { "mapped_from_naming_mapper": true },
  "structure": { "tag": "div", "class": "page-wrapper", "children": [...] },
  "content": { "mapped_from_content_generator": true }
}
```

## Success Criteria
- [ ] Payload chứa đầy đủ thông tin để build trực tiếp lên Webflow.
- [ ] Cấu trúc HTML tuân thủ 100% Client-First wrapper hierarchy.
- [ ] Không có dữ liệu thô (raw data) chưa qua xử lý trong payload.
