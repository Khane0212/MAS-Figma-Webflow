# Skill: Tối ưu hóa, Tái sử dụng & Gom nhóm (Folders)

## 1. Global Classes vs Custom Classes
- **Pattern Recognition:** Khi @Analyst phân tích Blueprint, phải có bước quét chéo (cross-check) các sections để tìm sự lặp lại về layout hoặc style.
- **Tái sử dụng Utility:** Nếu một thẻ chỉ chứa các thuộc tính căn chỉnh phổ biến (ví dụ: flex-center, text-align-center, margin-bottom-large), hãy sử dụng Utility Classes của Client-First thay vì tạo Custom Class.

## 2. Folders (Tính năng V2)
- Mọi Custom Class và Variable mới phải được phân loại vào đúng Folder trên Webflow để dễ quản lý.
- **Quy tắc tạo Folder:** Dựa vào tiền tố trước dấu gạch dưới `_`. 
  - Ví dụ: `section_hero` -> Folder `section`.
  - Ví dụ: `card_blog-item` -> Folder `card`.
- @Executor bắt buộc phải gán `folder_id` khi tạo Class hoặc Variable qua MCP.

## 3. Garbage Collection (Dọn dẹp rác từ Figma)
- Figma Designer thường group các layer (thư mục lồng nhau) một cách thừa thãi.
- **Flattening:** Trước khi chốt DOM tree trong Blueprint, @Analyst phải "làm phẳng" (flatten) các thẻ `div` bọc nhau không có ý nghĩa về mặt layout hoặc semantic.
- Nếu một `div` không mang style (no background, no padding, no flex/grid) và chỉ chứa 1 `div` con duy nhất, hãy loại bỏ nó khỏi Blueprint.