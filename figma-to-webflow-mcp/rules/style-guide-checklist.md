# Style Guide Checklist - Trước khi build

## Mục đích
Ngăn chặn lỗi tạo classes mới, đảm bảo chỉ dùng combo classes từ Style Guide.

## Checklist BẮT BUỘC

### 1. Kiểm tra Style Guide
- [ ] Switch to Style Guide page
- [ ] Liệt kê tất cả combo classes có sẵn
- [ ] Chụp ảnh/ghi chú danh sách combo classes

### 2. Kiểm tra Naming Convention
- [ ] Không có "inline-*" classes
- [ ] Không có "div-block" classes  
- [ ] Không có "Frame [0-9]+" classes
- [ ] Không có "Group [0-9]+" classes

### 3. Kiểm tra Combo Class Usage
**DYNAMIC - Dựa trên Style Guide page:**
- [ ] Text content có combo `text-size-*` + `text-color-*` từ Style Guide
- [ ] Hero text có combo documented trong Style Guide
- [ ] Content text có combo documented trong Style Guide  
- [ ] Footer text có combo documented trong Style Guide
- [ ] Links dùng combo `text-color-link` từ Style Guide
- [ ] Elements nhỏ dùng combo `text-size-small` từ Style Guide

**Quy trình:**
1. Switch to Style Guide → Liệt kê combo classes
2. Switch to target page → Apply chính xác combo đã liệt kê
3. Verify → Không có element dùng combo ngoài danh sách

### 4. Kiểm tra Core Structure
- [ ] page-wrapper > main-wrapper > sections
- [ ] padding-global trong mỗi section
- [ ] container-[size] trong mỗi section
- [ ] padding-section-[size] cho spacing

### 5. Content Verification
- [ ] Độ dài text khớp Figma
- [ ] Số paragraphs khớp Figma
- [ ] Links đầy đủ
- [ ] Bullet items đầy đủ

## Flow Quy trình

```
1. switch_page → Style Guide
2. query_elements → Liệt kê combo classes  
3. switch_page → Target page
4. query_elements → Kiểm tra violations
5. set_style → Apply đúng combo classes
6. verify → Không có violations
```

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|--------|-----|
| inline-p-1 | Tự tạo class mới | Dùng combo từ Style Guide |
| text-size-regular đơn | Thiếu color combo | Thêm text-color-dark-70 |
| div-block | Naming sai | Dùng đúng Client-First |
| thiếu opacity | Combo không đầy đủ | Thêm opacity-70/80 |

## Quy tắc vàng
- **LUÔN** kiểm tra Style Guide trước
- **KHÔNG BAO GIỜ** tạo class mới
- **LUÔN** dùng combo classes documented
