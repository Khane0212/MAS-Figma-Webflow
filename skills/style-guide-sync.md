# Skill: Style Guide Sync (Đồng bộ Style Guide)

## 1. Ưu tiên Base HTML Tags
- Trước khi tạo typography class (như `text-size-large`, `heading-style-h1`), phải đảm bảo rằng các thẻ HTML gốc (`All H1 Headings`, `All Paragraphs`, `All Links`) đã được style chính xác trên trang Style Guide theo cấu hình Variable.

## 2. Rich Text Styling
- Cần có hệ thống class mặc định cho Rich Text Block (ví dụ: `text-rich-text`).
- Khi quét Figma thấy nội dung dạng bài viết/blog, không bóc tách từng đoạn văn thành phần tử riêng rẽ mà gộp chung vào một khối Rich Text.

## 3. Đồng bộ hai chiều (Two-way Sync)
- Mọi Variable (Color, Spacing, Typography) sinh ra từ quá trình Audit (`style-audit-logic.md`) phải được ánh xạ và hiển thị trực quan lên trang Style Guide của Webflow.
- **Nhiệm vụ của @Executor:** Khi tạo Variable mới, đồng thời phải tạo một Node nhỏ trên trang "Style Guide" hiển thị Variable đó để khách hàng có thể review và tùy chỉnh sau này.