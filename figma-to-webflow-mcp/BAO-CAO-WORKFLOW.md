# 📊 BÁO CÁO WORKFLOW - Figma to Webflow MCP

**Ngày**: 2026-04-20 | **Phiên bản**: 3.0 (Có Style Guide)

---

## 🔁 LUỒNG HOẠT ĐỘNG CHÍNH

```
Figma URL → Scanner → [Style Guide] → Transformation → Sync → QA → 🛑
```

### Luồng chi tiết:

| Thứ tự | Bước | User làm | Hệ thống làm | Output |
|--------|------|----------|--------------|--------|
| **1** | Bootstrap | - | Đọc INSTRUCTIONS.md, load MCP | Rules |
| **2** | Research | Cung cấp Figma URL | Phân tích brand | `brand-context.md` |
| **3** | Scanner | - | Quét Figma | Design data |
| **4** | **Style Guide** | **Xác nhận (lần đầu)** | Build Style Guide | Style Guide page |
| **5** | Transformation | - | Map classes + Auto-convert | `[frame]-payload.json` |
| **6** | Sync | - | Build Webflow | Webflow Page |
| **7** | QA | - | Audit | `project-history.log` |

> **Lưu ý quan trọng**: Style Guide chạy **1 lần đầu tiên**, các page sau **reuse classes** + **auto-add class mới** nếu cần.

---

## 🎯 QUY TẮC STYLE GUIDE

### 1. Auto-Convert Classes (TỰ ĐỘNG)
Khi mapping class, tự động thêm combo class từ Style Guide:

| Class cũ | Auto-convert thành | Điều kiện |
|----------|-------------------|------------|
| `hero-heading` | `hero-heading heading-style-h1` | font-size = H1 |
| `section-title` | `section-title heading-style-h2` | font-size = H2 |
| `heading-h1` | `heading-h1 heading-style-h1` | - |
| `text-body` | `text-body text-size-regular` | font-size = body |
| `text-caption` | `text-caption text-size-small` | font-size = small |
| `cta-button` | `cta-button button is-primary` | button primary |
| `button-outline` | `button-outline button is-secondary` | button secondary |

### 2. Auto-Add Class Mới (TỰ ĐỘNG)
Khi phát hiện style mới chưa có trong Style Guide:

```
1. Phát hiện style mới (ví dụ: font-size 1.125rem)
2. Map sang Client-First standard (text-size-medium)
3. Auto-tạo class mới vào Style Guide
4. Cập nhật classes-inventory.json
```

**Ví dụ:**
- Style Guide có: `text-size-small` (0.875rem), `text-size-regular` (1rem)
- About page có: 1.125rem → Auto-add `text-size-medium` vào Style Guide

### 3. Ưu tiên Classes
| Ưu tiên | Nguồn |
|---------|-------|
| 1 | Style Guide classes (heading-style-*, text-size-*, button) |
| 2 | Inventory classes (từ các page trước) |
| 3 | Class mới (chỉ khi thực sự cần) |

---

## 📂 CẤU TRÚC FILE

```
rules/              → Quy chuẩn
├── naming-convention.md
├── code-style.md
└── design-system.md

skills/             → Kỹ năng xử lý
├── figma-scanner.md
├── variable-mapper.md
├── naming-mapper.md
├── content-generator.md
├── semantic-mapper.md
├── style-guide-generator.md  ← MỚI
└── webflow-sync.md

agents/             → Chuyên gia
├── research-agent.md
└── qa-tester.md

memory/             → Lưu trữ
├── classes-inventory.json
├── brand-context.md
├── project-history.log
└── [frame]-payload.json
```

---

## ✅ ƯU ĐIỂM V3.0

| # | Điểm mạnh |
|---|-----------|
| 1 | Style Guide = Foundation cho toàn dự án |
| 2 | Auto-convert classes theo Client-First |
| 3 | Auto-add class mới vào inventory |
| 4 | Reuse classes tối đa |
| 5 | Nhất quán giữa các pages |

---

## ⚙️ CẤU HÌNH MCP

| MCP | Tools | Dùng cho |
|-----|-------|---------|
| Figma | `get_design_context`, `get_variable_defs` | Quét Figma |
| Webflow | `element_builder`, `style_tool`, `variable_tool` | Build Webflow |

---

**Status**: ✅ Đã cập nhật workflow với Style Guide + Auto-Convert + Auto-Add
