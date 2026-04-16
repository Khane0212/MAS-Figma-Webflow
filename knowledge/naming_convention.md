# QUY TẮC ĐẶT TÊN CLASS (NAMING CONVENTION)

Để duy trì tính hệ thống, việc đặt tên class PHẢI tuân thủ các quy tắc sau:

1.  **Chữ thường (Lowercase)**: Tất cả tên class phải viết thường hoàn toàn.
2.  **Phân loại Class**:
    -   **Utility Class** (Dùng chung): Dùng dấu gạch ngang `-`. 
        -   *Ví dụ*: `margin-top`, `text-color-primary`, `z-index-2`.
    -   **Custom Class** (Dành riêng cho component): Dùng dấu gạch dưới `_`. 
        -   *Ví dụ*: `faq_list`, `team_item`, `header_content`.
3.  **Biến thể (Combo Class & Modifier)**:
    -   Sử dụng prefix **`is-`** kết hợp dấu gạch ngang.
    -   **Trạng thái**: `.is-active`, `.is-hidden`, `.is-open`.
    -   **Phong cách**: `button is-secondary`, `heading-style-h1 is-tiny`.

> [!TIP]
> Khi build một phần tử, hãy tự hỏi: "Phần tử này có thể dùng lại ở chỗ khác không?". Nếu có, hãy ưu tiên dùng Utility Class. Nếu không, hãy dùng Custom Class với prefix của component đó.