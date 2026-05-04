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

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

Tradeoff: These guidelines bias toward caution over speed. For trivial tasks, use judgment.

 1. Think Before Coding Don't assume. Don't hide confusion. Surface tradeoffs.
Before implementing:

State your assumptions explicitly. If uncertain, ask. If multiple interpretations exist, present them - don't pick silently. If a simpler approach exists, say so. Push back when warranted. If something is unclear, stop. Name what's confusing. Ask. 
 2.  Simplicity First Minimum code that solves the problem. Nothing speculative.

No features beyond what was asked. No abstractions for single-use code. No "flexibility" or "configurability" that wasn't requested. No error handling for impossible scenarios. If you write 200 lines and it could be 50, rewrite it. Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

 3. Surgical Changes Touch only what you must. Clean up only your own mess.
When editing existing code:

Don't "improve" adjacent code, comments, or formatting. Don't refactor things that aren't broken. Match existing style, even if you'd do it differently. If you notice unrelated dead code, mention it - don't delete it. When your changes create orphans:

Remove imports/variables/functions that YOUR changes made unused. Don't remove pre-existing dead code unless asked. The test: Every changed line should trace directly to the user's request.

  4. Goal-Driven Execution Define success criteria. Loop until verified.
Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass" "Fix the bug" → "Write a test that reproduces it, then make it pass" "Refactor X" → "Ensure tests pass before and after" For multi-step tasks, state a brief plan:

1.[Step] → verify: [check]
2.[Step] → verify: [check]
3.[Step] → verify: [check] Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.