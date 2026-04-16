# Skill: Naming Mapper (Client-First)

## 📝 Quyền Ghi (Write Permissions)

**Chỉ đọc (Read-Only) / Xử lý dữ liệu trong bộ nhớ**

- ✅ **ĐỌC**: `rules/naming-convention.md` (Semantic naming philosophy)
- ✅ **ĐỌC**: `rules/code-style.md` (Core Classes: wrappers, containers, padding)
- ✅ **ĐỌC**: `memory/classes-inventory.json` (Để tái sử dụng Class)
- ✅ **ĐỌC**: Figma Layer Names & Node Hierarchy (Dữ liệu từ Scanner)
- ❌ **KHÔNG GHI FILE**: Skill này chỉ trả về class mapping data.

---

## Mục đích
Tự động gán các Class Name chuẩn Client-First cho từng Layer/Component từ Figma, đảm bảo hệ thống Class gọn gàng và dễ bảo trì.

## Chức năng chính

### 1. Phân loại Layer (Element Identification)
- Nhận diện loại element từ Figma (Section, Wrapper, Container, Grid, Button, Text...).
- Tự động gán các Core Classes (VD: `page-wrapper`, `main-wrapper`, `padding-global`, `container-large`).

### 2. Tái sử dụng Class (Class Reusability)
- Luôn kiểm tra `classes-inventory.json` trước khi đặt tên mới.
- Nếu layer có style tương đồng với class đã tồn tại (VD: `blog-card_image`), ưu tiên sử dụng lại class đó.

### 3. Đặt tên Semantic (Semantic Naming)
- Áp dụng quy tắc: `[page]-[block]_[element]`.
- Ví dụ: `home-hero_content-wrapper`.
- Áp dụng quy tắc Industry-Specific Naming (từ Research Agent/Brand Context).
- Ví dụ: `patient-portal_appointment-card`.

---

## Quy trình thực hiện (Internal Task)
1. Tiếp nhận dữ liệu cây thư mục layer từ Figma Scanner.
2. Đọc `classes-inventory.json` để đồng bộ trạng thái.
3. Duyệt từng Node:
   - Nếu là Layout Core -> Gán Core Classes.
   - Nếu là Component -> Đặt tên theo BEM/Client-First.
4. Trả về đối tượng `mappedClasses` cho Semantic Mapper.

## Success Criteria
- [ ] 100% Class name tuân thủ chuẩn Client-First (không dùng style-based names).
- [ ] Tối đa hóa khả năng tái sử dụng class từ inventory.
- [ ] Tên class phản ánh đúng chức năng (Function-based).
