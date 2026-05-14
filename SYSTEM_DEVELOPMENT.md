# Báo cáo Phát triển Hệ thống (System Development Report)

## 1. Thông tin kỹ thuật hiện tại (Current Technical Status)
- **Tech Stack & Tools:** Figma, Webflow, Gemini CLI, Các Sub-agents (Architect, Operator, PM), Data Engineering logic.
- **Kiến trúc dữ liệu:** Sự tách biệt rõ ràng giữa cấu trúc tổng thể (`page_structure.json`), bản vẽ chi tiết (`blueprints/`), và nội dung thực tế (`contents/`).
- **Luồng dữ liệu (Data Flow):** Trích xuất từ Figma -> Chuyển đổi thành JSON -> AI xử lý và đưa lên Webflow.

## 2. Các vấn đề kỹ thuật (Technical Debt & Issues)

#### 2.1. Phân mảnh nội dung quá mức (Extreme Content Fragmentation)
*   **Mô tả:** Thư mục `workspace/contents/` đang lưu mỗi đoạn text/ảnh thành một file JSON riêng biệt (hơn 100 file cho một trang Home).
*   **Tác động (Impact):** Khi AI Operator cần ráp nội dung vào Webflow, nó sẽ phải gọi công cụ (tool call) hàng chục lần để đọc từng file. Điều này dẫn đến cạn kiệt Token rất nhanh, tăng độ trễ (latency), và khiến AI dễ bị "bội thực" (Context bloat).
*   **Xác suất xảy ra:** 95% (Chắc chắn xảy ra khi làm trang web có nhiều text).
*   **Đề xuất khắc phục (Mitigation):** Gộp toàn bộ nội dung của một Section thành một file duy nhất (ví dụ: `contents/home_hero_content.json`).

#### 2.2. Rủi ro mất dữ liệu do Script Archive (Destructive Archiving)
*   **Mô tả:** Trong file `scripts/archive-workspace.js`, lệnh xóa thư mục workspace (`fs.rmSync(workspaceDir)`) được gọi ngay lập tức sau khi lệnh zip chạy.
*   **Tác động (Impact):** Nếu tiến trình tạo file zip bị lỗi (do đầy ổ đĩa, kẹt file lock), thư mục gốc vẫn bị xóa trắng. Điều này dẫn đến mất trắng toàn bộ tiến độ làm việc (Total data loss).
*   **Xác suất xảy ra:** 75% (Khi hệ thống chạy tự động liên tục trên máy chủ server/CI).
*   **Đề xuất khắc phục (Mitigation):** Thêm bước xác minh file `.zip` đã tồn tại và có dung lượng hợp lệ (> 0 byte) trước khi chạy lệnh `rmSync`.

#### 2.3. Thiếu Validate Cấu trúc JSON (Lack of Schema Validation)
*   **Mô tả:** Các AI (PM, Architect, Operator) đang truyền dữ liệu JSON cho nhau (qua file `page_structure.json` hoặc các `blueprints`) nhưng không có bước kiểm tra định dạng (JSON Schema).
*   **Tác động (Impact):** Nếu Architect tạo ra một blueprint bị thiếu dấu ngoặc hoặc gõ sai tên trường (`class` thay vì `classes`), Operator sẽ bị lỗi parsing và dừng toàn bộ luồng làm việc.
*   **Xác suất xảy ra:** 85% (AI LLM thỉnh thoảng vẫn tạo ra JSON không hợp lệ - hallucination).
*   **Đề xuất khắc phục (Mitigation):** Thêm một bước validate (dùng thư viện Zod hoặc AJV trong Node.js) vào các script tiện ích để từ chối file lỗi ngay từ đầu.

#### 2.4. Dữ liệu thô nguyên khối (Monolithic Raw Data Bottleneck)
*   **Mô tả:** File `page_structure.json` hiện đang lưu toàn bộ dữ liệu thiết kế thô (typography, màu sắc) của mọi section. 
*   **Tác động (Impact):** Với một trang dài (như Landing Page có 15+ section), file này sẽ vượt quá giới hạn Token Window của AI ở giai đoạn đầu, khiến Agent bị "ngợp" ngay khi mới bắt đầu đọc kiến trúc trang.
*   **Xác suất xảy ra:** 90% (Khi scale lên các dự án E-commerce hoặc Blog nhiều thành phần).
*   **Đề xuất khắc phục (Mitigation):** Áp dụng chiến lược "Data Normalization" (như đã phân tích ở trên) - Tách cấu trúc (structure) và giao diện (styles) ra riêng biệt.

#### 2.5. Gánh nặng ánh xạ tài sản (Asset Mapping Debt - MAS-V2-007)
*   **Mô tả:** Theo luật dự án, AI sẽ bỏ qua việc upload ảnh/icon thật mà chỉ gắn Placeholder, đẩy phần việc này lại cho User (End-user).
*   **Tác động (Impact):** Tuy tiết kiệm thời gian cho AI lúc đầu, nhưng khi tạo 1 dự án có 50 icon và 20 ảnh, User sẽ phải thực hiện một khối lượng công việc thủ công khổng lồ để đối chiếu lại file JSON với Webflow, làm mất đi lợi thế tự động hóa (Automation) của hệ thống.
*   **Xác suất xảy ra:** 100% (Theo đúng luật hiện tại).
*   **Đề xuất khắc phục (Mitigation):** Đưa thêm script tự động tải asset lên Webflow qua API, hoặc tạo một file báo cáo "Asset Checklist" sinh tự động để User dễ theo dõi.

## 3. Dự định phát triển tương lai (Future Roadmap)
- Áp dụng Component hóa (Deduplication) để giảm trùng lặp cấu trúc trong các danh sách dài.
- Tái cấu trúc file JSON sang định dạng YAML/Markdown để tối ưu chi phí Token.

## 4. Tiến độ phát triển kỹ thuật (Technical Changelog)
- **[Hôm nay]:** Khởi tạo báo cáo. Phân tách theo dõi tiến độ kỹ thuật và tiến độ công việc. Xác định 5 rủi ro kỹ thuật chính cần ưu tiên giải quyết.
