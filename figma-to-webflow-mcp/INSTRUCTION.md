# Agent Protocol v2.0

## Khoi dong - KHONG BO QUA BUOC NAO

Truoc khi nhan lenh build, phai hoan thanh:

1. Doc `CHECKLIST.md` - hieu ro 6 phase
2. Doc `GEMINI.md` - thu tu file
3. Doc `SYSTEM.md` - cau truc he thong
4. Kiem tra `project.json` - co `site_id`?
5. Kiem tra `build_[page].json` - section nay chua build?

**Neu thieu 1 buoc -> Tu choi thuc thi.**

---

## Workflow 4 Phases

### Phase 1: Extract
Nhiem vu: Lay data thu tu Figma.

```
Input: Figma node ID
Output: Design spec document
```

- Colors (HEX -> variables)
- Typography (px -> rem)
- Spacing (gap, padding, margin)
- Layout hierarchy (auto layout structure)
- Assets (images, icons)

### Phase 2: Transform
Nhiem vu: Chuyen doi sang Client-First.

**Quy tac chuyen doi:**

| Figma | Client-First |
|-------|--------------|
| Frame | section_ hoac container- |
| Auto Layout (vertical) | flex flex-column |
| Auto Layout (horizontal) | flex flex-row |
| Fixed width | container-small / medium / large |
| Color styles | variables |
| Text styles | utility classes |

### Phase 3: Construct
Nhiem vu: Build tren Webflow.

**Thu tu build:**

1. Body (page-wrapper, main-wrapper)
2. Sections (section_[name])
3. Containers (container-[size])
4. Content (headings, text, images)

**Luon check truoc khi tao:**
- Variable da co chua?
- Style da co chua?
- Component da co chua?

### Phase 4: Validate
Nhiem vu: Kiem tra va ghi log.

**Checklist validation:**
- [ ] DOM structure dung 7 lop
- [ ] Classes dung naming convention
- [ ] Colors dung variables
- [ ] Spacing dung rem
- [ ] Typography dung scale

**Ghi log:**
```javascript
tracker.record(page, section, element_id);
```

---

## Naming Convention

### Utility Classes (dung dau)
- `margin-top`, `margin-bottom`, `padding-section`
- `text-size-regular`, `text-weight-medium`
- `text-color-dark`, `background-color-primary`

### Custom Classes (underscore)
- `navbar_wrapper`
- `footer_grid`
- `hero_content-wrapper`

### Combo Classes (is-)
- `button is-secondary`
- `container is-narrow`

---

## REM Conversion

```
16px = 1rem
```

**Cong thuc:**
```
rem = px / 16
```

**Vi du:**
- 32px -> 2rem
- 24px -> 1.5rem
- 8px -> 0.5rem

---

## DOM Structure (7 Layers)

```
page-wrapper
  main-wrapper
    section_[name]
      padding-global
        container-[size]
          padding-section-[size]
            [content]
```

---

## Blockers

**KHONG duoc build neu:**
1. Thieu `site_id` trong project.json
2. Checklist chua dat 100%
3. Page dang bi lock (build_[page].json -> locked: true)
4. Section da build roi (tracker.isBuilt() === true)

---

## Commands

### Build moi
```javascript
const tracker = require('./tracker');

// 1. Lock page
tracker.lock('page-name');

// 2. Build...

// 3. Record sections
tracker.record('page-name', 'section_hero', elementId);
tracker.record('page-name', 'section_content', elementId);

// 4. Unlock
tracker.unlock('page-name');
```

### Build global component
```javascript
// Sau khi build xong
tracker.updateInventory('navbar', componentId);
```

---

## Rules

**Luon:**
- Doc file truoc khi viet
- Check ton tai truoc khi tao moi
- Dung variables thay vi static values
- Ghi log moi section da build

**Khong bao gio:**
- Skip checklist
- Tao duplicate variables/styles
- Dung px thay vi rem
- Build ma khong lock page

---

## Emergency Contacts

**Loi thuong gap:**
- MCP timeout -> Refresh Webflow tab
- Site not found -> Kiem tra site_id
- Element khong tao duoc -> Kiem tra parent element

**Rollback:**
```javascript
tracker.reset('page-name');
```
