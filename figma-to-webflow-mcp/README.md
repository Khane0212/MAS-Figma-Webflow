# Figma → Webflow Converter

System for AI Agent to convert Figma designs to Webflow using Client-First methodology.

## Quick Start

```bash
# 1. Read entry
↓ GEMINI.md

# 2. Read protocol  
↓ CHECKLIST.md
↓ INSTRUCTION.md

# 3. Verify state
↓ project.json (site_id)
↓ build_[page].json (not built)

# 4. Execute
↓ scan [nodeId]
↓ build [nodeId] --verify
```

## Structure

```
.
+-- CHECKLIST.md          # 6-phase validation
+-- GEMINI.md             # Entry point
+-- INSTRUCTION.md        # Protocol spec
+-- SYSTEM.md             # Architecture
+-- project.json          # Site config
+-- class.json            # Utility classes
+-- tracker.js            # State lib
+-- workflow/             # Process docs
+-- knowledge/            # Client-First spec
+-- skills/               # Tool guides
+-- memory/               # Runtime data
```

## Workflow

1. **Extract** → Figma data
2. **Transform** → Client-First mapping  
3. **Construct** → Webflow build
4. **Validate** → Quality check

## Gate System

Build chỉ chay khi:
- [x] Checklist 100% complete
- [x] site_id confirmed
- [x] Section chua built
- [x] All PX → REM converted

## Commands

| Command | Phase | Condition |
|---------|-------|-----------|
| `scan [id]` | 1-2 | None |
| `build [id]` | 3-4 | Checklist 100% |
