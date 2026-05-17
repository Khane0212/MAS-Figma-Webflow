# Agent Protocol v2.0

## Khoi dong - KHONG BO QUA BUOC NAO

Truoc khi nhan lenh build, phai hoan thanh:

1. Doc `CHECKLIST.md` - hieu ro 6 phase
2. Doc `GEMINI.md` - thu tu file
3. Doc `SYSTEM.md` - cau truc he thong
4. Doc `knowledge/structure.md` - bat buoc nho 7-layer architecture
5. Doc `skills/dom.md` - chon dung tool va thu tu dung DOM
6. **Doc `skills/combo-class.md` - cach tao combo class (QUAN TRONG!)**
7. **Doc `knowledge/fidelity.md` - Quy tac bao toan noi dung (NEW!)**
8. Kiem tra `project.json` - co `site_id`?
9. Kiem tra `build_[page].json` - section nay chua build?

---

## RTK-Style Efficiency (ACTIVE)

Du an nay su dung **RTK (Rust Token Killer)** proxy de tiet kiem 60-90% token:

1.  **Ultra-Compact Output:** Tuyet doi khong preamble/postamble. Tra ra ket qua thuan tuy (< 3 dong text).
2.  **High-Signal Summary:** Tap trung vao intent va logic technical. Tom tat output tool neu qua lon.
3.  **MANDATORY Prefix:** Su dung prefix `rtk` (vi du: `rtk ls`, `rtk cat`) cho tat ca cac lenh shell de kich hoat trinh nen output.

---

## Workflow 4 Phases (Synced with WORKFLOW.md)

### Phase1: Extract
Lay data tu Figma: Colors (HEX), Typography (px), Spacing, Layout hierarchy, Assets. 
**MANDATORY:** Tao Content Manifest (text, links, assets) de kiem doi sau nay.

### Phase2: Transform
Logic noi bo: px -> rem, HEX -> variables, Auto Layout -> Flex/Grid.

### Phase3: Construct (STRICT ORDER)
Build tren Webflow theo dung thu tu:
1. **Variables (`variable_tool`):** Tao Variables tu HEX Figma TRUOC KHI tao style.
2. **Styles (`style_tool`):** Tao Class. BẮT BUỘC dung `variable_as_value`, CẤM dung HEX.
3. **Build DOM (`whtml_builder`):** Lap rap HTML bang cac Class da tao. 
   - **Audit Rule:** Check HTML so voi Content Manifest de dam bao khong thieu content.

**Gate kiem duyet truoc khi build DOM:**
- Kiem tra 7-layer architecture (page -> main -> section -> global -> container -> section-size -> component).
- Tuyet doi khong dán padding/margin truc tiep vao `section_[name]`.
- **CẤM** tạo hình ảnh bằng thẻ `DOM` thô (raw `imgraw`). **LUÔN LUÔN** dùng thẻ `Image` native của Webflow và liên kết với Webflow Asset ID (`set_image_asset`).

### Phase4: Validate
1. **Content Fidelity Check:** So sanh Webflow DOM thuc te voi Content Manifest.
2. **Visual Fidelity:** Kiem tra visual qua `element_snapshot_tool`.
3. **Logging:** Ghi log vao `tracker.record()`.

---

## Naming Convention

### Utility Classes (dung dau)
- `margin-top`, `margin-bottom`, `padding-section`, `text-size-regular`, `text-weight-medium`.

### Custom Classes (underscore)
- `navbar_wrapper`, `footer_grid`, `hero_content-wrapper`.

### Combo Classes (ngang hang voi base)
- **Cấu trúc:** `[context]_[role]` (vd: `privacy_page_heading`, `footer_cta_text`).
- **Parent:** Luon trỏ ve Base typography class tuong ung.
- **is- prefix:** Dung cho component variants (vd: `button is-primary`, `card is-featured`).

---

## REM Conversion
`16px = 1rem`. Cong thuc: `rem = px / 16`.

---

## DOM Structure (7 Layers)
`page-wrapper` > `main-wrapper` > `section_[name]` > `padding-global` > `container-[size]` > `padding-section-[size]` > `[content]`.

---

## Blockers
- project.json thieu `site_id`.
- Checklist < 100%.
- Page dang bi lock.

---

## Behavioral guidelines (LLM Code Mandates)
- **Think Before Coding:** Explicit assumptions. Push back on ambiguity.
- **Simplicity First:** Minimum code. No speculative abstractions.
- **Surgical Changes:** Touch only what you must.
- **Goal-Driven Execution:** Loop until verified.