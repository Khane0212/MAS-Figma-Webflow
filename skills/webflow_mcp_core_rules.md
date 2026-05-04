# NGUYÊN TẮC CỐT LÕI (WEBFLOW MCP CORE RULES)

Để đảm bảo an toàn và hiệu quả, việc sử dụng Webflow MCP Tool PHẢI tuân thủ các nguyên tắc sau:

1.  **Bước 0: Phục Hồi Ngữ Cảnh Local (Local Context Recovery)**:
    -   TRƯỚC KHI gọi bất kỳ công cụ Webflow nào, BẮT BUỘC phải đọc:
        1. `shared_components.json` để lấy `site_id`.
        2. `wf_progress_[page].json` để biết các thành phần đã hoàn thành.
    -   Mục đích: Tiết kiệm token và tránh build lặp lại dữ liệu đã tồn tại.

2.  **Lệnh Bắt Buộc Đầu Tiên (System Init)**:
    -   Gọi `webflow_guide_tool` ngay sau khi đã có `site_id` từ local.
    -   Mục đích: Đồng bộ hóa best practices của Webflow API.

2.  **Phân Biệt Nhóm Tool (Designer vs. Data)**:
    -   **Designer Tools**: Dùng để xây dựng UI/Layout (CHỈ SỬ DỤNG `element_builder`, `style_tool`, `variable_tool`, `whtml_builder`, `de_page_tool`).
    -   **Data Tools**: CHỈ dùng khi cần quản lý database hoặc CMS (`data_cms_tool`, `data_pages_tool`). Không dùng Data Tools để thay đổi style hay structure của element.

3.  **Xử Lý Sự Cố & Debug**:
    -   Dùng `element_snapshot_tool` để lấy phản hồi trực quan (Visual Feedback) nếu không chắc chắn về kết quả của một element vừa tạo.
    -   Dùng `ask_webflow_ai` để tra cứu tài liệu Webflow API chính thức nếu gặp lỗi không xác định từ server.

4.  **Tiết Kiệm Token (Optimization)**:
    -   "Read before Write": Luôn đọc trạng thái hiện tại (Page/Element) trước khi gửi lệnh update.
    -   Tránh gửi các query quá rộng (như `get_all_elements`) nếu chỉ cần tác động lên một element cụ thể.

---

## 5. SESSION RECOVERY PROTOCOL (KHI BỊ MẤT CONTEXT / TIMEOUT)

> [!CAUTION]
> Đây là tình huống nguy hiểm nhất: Agent không biết mình đã build đến đâu, dẫn đến build lại, tạo duplicate DOM, hoặc ghi đè lên nội dung đã có.

**Khi bị đứt kết nối hoặc khởi động lại session, PHẢI thực hiện đúng thứ tự này:**

```
BƯỚC 1: ĐỌC LOCAL STATE
├─► Đọc shared_components.json → lấy site_id và các component ID global
└─► Đọc wf_progress_[page].json → biết các section đã được đánh dấu "done"

BƯỚC 2: XÁC MINH VỚI WEBFLOW
├─► Gọi query_elements{type: "Section"} hoặc get_all_elements
└─► Lấy danh sách tất cả Section hiện có trên Webflow

BƯỚC 3: ĐỐI CHIẾU & RESUME (Reconciliation & Incremental Resume)
├─► Kiểm tra trường hợp đang build dở dang (lỗi API timeout, rate limit)
├─► Nếu có data trong `in_progress_section`, lấy ID của thẻ `completed_elements` cuối cùng làm điểm neo.
└─► Resume việc build bằng cách nối tiếp vào thẻ neo đó. Tuyệt đối không xóa làm lại trừ khi thẻ neo cũng bị lỗi.

BƯỚC 4: INCREMENTAL TRACKING MỚI 
└─► LUÔN ghi nhận ID thẻ vừa build (đặc biệt là section, container, wrappers) vào `wf_progress_[page].json` ngay lập tức để làm điểm neo cho lần đứt kết nối tiếp theo.
```

**Sau khi xác minh, báo cáo ngắn gọn:**
```
Trạng thái khôi phục:
- Site ID: [id]
- Sections đã hoàn thành: [list]
- Section tiếp theo cần build: [name]
- Bắt đầu từ: [điểm tiếp theo]
```