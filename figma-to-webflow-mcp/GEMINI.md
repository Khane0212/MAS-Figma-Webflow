# Entry Point

## Thu tu doc file

Khi nhan lenh, phai doc theo thu tu:

1. **CHECKLIST.md** - Kiem tra dieu kien
2. **GEMINI.md** (file nay) - Hieu thu tu
3. **SYSTEM.md** - Kien truc he thong
4. **INSTRUCTION.md** - Protocol chi tiet
5. **project.json** - Site config

## Blockers

**KHONG duoc lam neu:**
- Chua doc CHECKLIST.md
- project.json khong co site_id
- build_[page].json dang locked

## Build Commands

```javascript
// Khoi tao tracker
const tracker = require('./tracker');

// Kiem tra section da build chua
if (tracker.isBuilt('page-name', 'section_hero')) {
  // Skip
}

// Lock page truoc khi build
tracker.lock('page-name');

// Record sau khi build xong
tracker.record('page-name', 'section_name', elementId);

// Unlock
tracker.unlock('page-name');
```

## Figma to Webflow Flow

1. **Extract** - Lay Figma node
2. **Transform** -> Chuyen Client-First
3. **Construct** -> Build Webflow
4. **Validate** -> Check & Log

## Important

- Luon dung `tracker.js` de quan ly state
- Khong bao gio skip checklist
- Moi section phai co element_id trong log
