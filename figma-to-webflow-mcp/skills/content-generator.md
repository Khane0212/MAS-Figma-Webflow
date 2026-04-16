# Skill: Content Generator & Refiner

## 📝 Quyền Ghi (Write Permissions)

**Chỉ đọc (Read-Only) / Xử lý dữ liệu trong bộ nhớ**

- ✅ **ĐỌC**: `memory/brand-context.md` (Để biết Brand Voice & Keywords)
- ✅ **ĐỌC**: Figma Text Nodes (Dữ liệu từ Scanner)
- ❌ **KHÔNG GHI FILE**: Skill này chỉ trả về refined text data.

---

## Mục đích
Đảm bảo toàn bộ nội dung văn bản (copy) trên website chuyên nghiệp, đúng tông giọng thương hiệu và tối ưu SEO dựa trên bối cảnh dự án.

## Chức năng chính

### 1. Phân tích Nội dung Figma
- Tiếp nhận danh sách các Text Nodes từ Figma Scanner.
- Phân loại nội dung: Heading, Paragraph, Button Text, Tag, v.v.

### 2. Tinh chỉnh & Sáng tạo (Copywriting)
- **Xử lý Lorem Ipsum**: Tự động tạo nội dung mới dựa trên `Brand Voice` và `Keywords` trong `brand-context.md`.
- **Cải thiện ngôn từ**: Tinh chỉnh text gốc nếu cần chuyên nghiệp hơn nhưng vẫn giữ nguyên ý nghĩa cốt lõi.

### 3. Tối ưu SEO
- Đề xuất `Alt Text` cho các hình ảnh dựa trên bối cảnh của Section.
- Chèn các `Semantic Keywords` một cách tự nhiên vào các thẻ Heading và Paragraph.

---

## Quy trình thực hiện (Internal Task)
1. Tiếp nhận text nodes từ Figma Scanner.
2. Đọc `brand-context.md` để lấy bối cảnh.
3. Duyệt từng node:
   - Nếu là Lorem Ipsum -> Generate content mới.
   - Nếu là real text -> Refine (nếu cần).
4. Trả về đối tượng `refinedContent` cho Semantic Mapper.

## Success Criteria
- [ ] 0% Lorem Ipsum còn sót lại trong payload cuối cùng.
- [ ] 100% nội dung khớp với Brand Voice (Professional, Bold...).
- [ ] Keywords được phân bổ hợp lý trong các Section.
