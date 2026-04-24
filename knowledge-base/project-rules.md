# Project Rules & Lessons Learned

Kế thừa các kinh nghiệm và quy tắc đặc thù rút ra trong quá trình làm dự án Figma to Webflow.

## Quy tắc hệ thống
- **MAS-V2-001 (2026-04-23):** Khi xử lý các Global Components (Navbar, Footer), không được sử dụng placeholder. Architect phải thiết kế đầy đủ cấu trúc chi tiết trong Blueprint để QA thẩm định trước khi Operator thực thi. Sau khi Operator tiêm cấu trúc, phải chuyển đổi ngay thành Master Component trên Webflow.
- **MAS-V2-002 (2026-04-24):** Mọi Blueprint phải bắt đầu bằng việc định nghĩa cấu trúc phân cấp toàn trang (Page Hierarchy) bao gồm `page-wrapper` và `main-wrapper` (thẻ <main>) theo đúng Chương 2 của Client-First. Không được chỉ tập trung vào một Section lẻ loi mà thiếu đi khung sườn của trang.

## Quy tắc Design System
- **MAS-DS-001 (2026-04-24):** Khi xây dựng Navbar, ưu tiên phương án "Build from scratch" bằng Div Blocks thay vì dùng component mặc định của Webflow để đảm bảo kiểm soát 100% naming convention (không rác class `w-nav`) và cấu trúc 6 lớp.
- **MAS-DS-002 (2026-04-24):** **Combo Class First Strategy:** Architect phải ưu tiên tạo các biến thể bằng combo class (tiền tố `is-`) thay vì tạo custom class mới cho những thay đổi nhỏ về visual như màu sắc, opacity, hoặc alignment. Điều này giúp giảm thiểu rác class và tăng tính tái sử dụng theo đúng triết lý Client-First.
- **MAS-V2-003 (2026-04-24):** Tuyệt đối không được rút gọn (over-simplify) dữ liệu thô (raw data) khi thiết kế Blueprint cho các Global Components (Footer, Navbar). Phải phân tích đầy đủ hệ thống lưới (CSS Grid) và liệt kê không sót bất kỳ phần nội dung nào (cột trái, cột phải, bottom links).
  - **Grid Asymmetry:** Khi các cột trong Grid có điểm kết thúc không bằng nhau (VD: Cột trái chạm đáy, cột phải có khoảng không), KHÔNG gán `padding-bottom` cho toàn bộ wrapper (`padding-bottom: 0`). Thay vào đó, set `align-items: stretch` cho Grid và chỉ gán `padding-bottom` cho cột nào cần tạo khoảng không. Điều này giúp các khối như `footer_contact-box` sát vào khối tiếp theo.
  - **Image Dimensions:** Các SVG/Icons trong thành phần lưới (Grid/Flex) BẮT BUỘC phải được set kích thước cứng (`width`, `height` bằng `rem`) và `object-fit: contain` để tránh bị biến dạng (stretch) do thuộc tính kéo giãn mặc định của parent container.
  - **QA Mandate:** Architect BẮT BUỘC phải tự gọi tool snapshot thực tế trên Webflow để thẩm định QA, không được đoán mò hoặc phụ thuộc vào báo cáo text.
- **MAS-V2-004 (2026-04-24):** **Routing & Page Context:** Trước khi bắt đầu Giai đoạn 1 (Blueprint), Architect BẮT BUỘC phải xác định rõ tên trang và **Page ID** đích đến. Mọi Blueprint phải chứa trường `"target_page"` rõ ràng. Tuyệt đối không để Operator tự động tiêm code vào trang Home mặc định khi đang làm việc trên các trang con.
