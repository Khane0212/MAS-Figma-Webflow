# Skill: Status Reporting & User Checkpoint Protocol

## 1. Reporting Structure
Mọi báo cáo từ @PM phải tuân thủ format:
```
### 📊 Trạng thái Hệ thống [Phase X/Y]
- **Công việc vừa làm:** [Mô tả ngắn gọn]
- **Agent thực hiện:** [@Reader/@Analyst/...]
- **Kiểm duyệt bởi @QA:** [✅ Pass / ❌ Rejected - Lý do]
- **Dữ liệu hiện tại:** [Link file JSON hoặc tóm tắt số lượng Node]

### 🎯 Hành động tiếp theo
- [Mô tả bước tiếp theo]
- [Dự kiến kết quả]

### 🛑 Checkpoint - Cần xác nhận
[Câu hỏi hoặc yêu cầu Approval từ User]
```

## 2. Checkpoint Severity Levels
- **LEVEL 1 (Critical):** Thay đổi Style Guide toàn cục, Xóa Node cũ, Ghi đè Variables -> **Bắt buộc dừng và chờ Approval.**
- **LEVEL 2 (Standard):** Xây dựng Section mới theo Blueprint -> **Thông báo và chờ lệnh "Next".**
- **LEVEL 3 (Minor):** Sửa lỗi chính tả class, cập nhật log -> **Có thể làm liên tục (Auto-pilot nếu được bật).**

## 3. Post-Action Summary
Sau mỗi lần kết thúc một Section, @PM phải cung cấp một bảng đối soát:
| Figma Node | Webflow Element | Status |
|---|---|---|
| ID-1 | Div-Hero | Success |
| ID-2 | Text-Heading | Success |
