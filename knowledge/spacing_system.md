# HỆ THỐNG KHOẢNG CÁCH — BẢNG THAM CHIẾU REM

> Tài liệu này chỉ chứa **dữ liệu cứng** (bảng REM và mốc size). Quy tắc MACRO/MICRO và chiến lược chọn spacing xem tại `knowledge/class_decision_tree.md` §BƯỚC 6.

---

## Bảng Mốc REM Chuẩn

| Figma (px) | REM | Utility Class |
|:---|:---|:---|
| 2px | 0.125rem | `margin-tiny` |
| 4px | 0.25rem | `margin-xxsmall` |
| 8px | 0.5rem | `margin-xsmall` |
| 16px | 1rem | `margin-small` |
| 32px | 2rem | `margin-medium` |
| 48px | 3rem | `margin-large` |
| 64px | 4rem | `margin-xlarge` |
| 80px | 5rem | `margin-xxlarge` |
| 96px | 6rem | `margin-huge` |
| Không khớp | Tính chính xác | Tạo utility mới (VD: `margin-custom-xxs`) |

**Công thức:** `REM = PX ÷ 16`. Không làm tròn. 77px = 4.8125rem.

---

## Margin Utility — Cú Pháp

```
Hướng: margin-bottom | margin-left | margin-right (TUYỆT ĐỐI CẤM: margin-top)
Size:  tiny | xxsmall | xsmall | small | medium | large | xlarge | xxlarge | huge | xhuge | xxhuge

Ví dụ: div.margin-bottom.margin-large → đẩy phần tử bên dưới xuống 3rem
```

---

## Padding-Section — Khi Nào Dùng

| Khoảng cách trên/dưới Section | Class |
|:---|:---|
| ≥ 96px (6rem) | `padding-section-large` |
| 48–95px | `padding-section-medium` |
| < 48px | `padding-section-small` |
| Khác biệt lớn vs mốc trên | Tạo custom class với padding chính xác |

`padding-global`: Bắt buộc cho mọi section để giữ lề trái/phải đồng nhất (2.5rem = 40px mặc định).