# Skill: Variable Mapper

## 📝 Quyền Ghi (Write Permissions)

**Chỉ đọc (Read-Only) / Xử lý dữ liệu trong bộ nhớ**

- ✅ **ĐỌC**: `rules/design-system.md` (Để map đúng scale và naming)
- ✅ **ĐỌC**: Figma Variables & Styles (Dữ liệu từ Scanner)
- ❌ **KHÔNG GHI FILE**: Skill này chỉ trả về mapping data.

---

## Mục đích
Đảm bảo mọi thông số thiết kế (Màu sắc, Typography, Spacing) từ Figma được chuyển đổi chính xác sang hệ thống biến CSS/Webflow theo quy chuẩn của dự án.

## Chức năng chính

### 1. Mapping Màu sắc (Colors)
- Chuyển đổi màu từ Figma (HEX/RGBA) sang biến màu dự án.
- Áp dụng quy tắc: `--color-[purpose]-[variant]-[state]`.
- Ví dụ: `Figma: Brand Blue #0066CC` -> `--color-primary-default`.

### 2. Mapping Typography
- Chuyển đổi Font family, Font size, Font weight, Line height.
- Luôn convert `px` sang `rem` (16px = 1rem).
- Áp dụng quy tắc: `--font-[property]-[variant]`.
- Ví dụ: `Figma: Inter Bold 32px` -> `--font-family-body`, `--font-weight-bold`, `--font-size-h2`.

### 3. Mapping Spacing & Layout
- Chuyển đổi Margin, Padding, Gap sang Scale chuẩn của dự án.
- Áp dụng quy tắc: `--space-[scale]`.
- Ví dụ: `24px` -> `--space-lg`.

---

## Quy trình thực hiện (Internal Task)
1. Tiếp nhận dữ liệu thô từ Figma Scanner.
2. Đối chiếu với `rules/design-system.md`.
3. Kiểm tra các biến hiện có để tái sử dụng hoặc đề xuất biến mới.
4. Trả về đối tượng `mappedVariables` cho Semantic Mapper.

## Success Criteria
- [ ] 100% biến màu tuân thủ `--color-` prefix.
- [ ] 100% font size sử dụng đơn vị `rem`.
- [ ] 100% spacing khớp với scale chuẩn (xs -> 4xl).
