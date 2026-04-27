# Content Extraction Rules - Không bao giờ thiếu nội dung

## Nguyên tắc vàng

### 1. Khi đọc Figma
- **Không tóm tắt** - Copy toàn bộ text từ Figma
- **Không rút gọn** - Giữ nguyên từng câu, từng đoạn
- **Kiểm tra đếm** - Đếm số dòng trong Figma và đảm bảo số dòng trong HTML khớp

### 2. Format text từ Figma

```
Figma output: <p className="...">{`Long text here...`}</p>
                 ↓
HTML: <p class="...">Long text here...</p>
                 ↓
JSON: {"text": "Long text here..."}  (Đầy đủ, không cắt)
```

### 3. Checklist trước khi lưu file

| Kiểm tra | Cách làm |
|----------|----------|
| Đếm paragraphs | Figma có X paragraphs → HTML có X paragraphs |
| Độ dài text | Figma text dài → HTML text phải dài tương đương |
| Links | Figma có link → HTML phải có `<a>` tương ứng |
| Bullet items | Figma có X items → HTML có X `<li>` |

### 4. Ví dụ đúng

**Figma:**
```jsx
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
consequat. Duis aute irure dolor in reprehenderit...</p>
```

**HTML (ĐÚNG - đầy đủ):**
```html
<p class="text-size-regular">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
  consequat. Duis aute irure dolor in reprehenderit...
</p>
```

**HTML (SAI - thiếu):**
```html
<p class="text-size-regular">Lorem ipsum dolor sit amet...</p>  ❌
```

### 5. Quy trình 3 lớp kiểm tra

```
Lớp 1: Figma API → Extract full text (không truncate)
Lớp 2: HTML → Giữ nguyên độ dài text
Lớp 3: JSON → Copy exact từ HTML
```

### 6. Dấu hiệu nhận biết thiếu content

| Dấu hiệu | Nguyên nhân | Fix |
|----------|-------------|-----|
| Text ngắn bất thường | Bị truncate khi copy | Copy lại từ Figma |
| "..." trong text | Bị cắt | Mở rộng thành full text |
| Thiếu paragraph | Skip khi parse | Thêm paragraph bị thiếu |

### 7. Lệnh kiểm tra

Trước khi BUILD, chạy:
```
check content → Đếm paragraphs
check length → So sánh độ dài
check links → Xác nhận links đầy đủ
```

## Không bao giờ được:
- ❌ Copy chỉ 1-2 câu khi Figma có 5+ câu
- ❌ Dùng "..." để thay thế text dài
- ❌ Skip paragraph vì "dài quá"
- ❌ Tự ý edit/tóm tắt nội dung
