# System Architecture

## Dependency Map

```
User Request
    ↓
CHECKLIST.md (validation layer)
    ↓
GEMINI.md (entry)
    ↓
INSTRUCTION.md (protocol)
    ↓
SYSTEM.md (this file)
    ↓
project.json (site_id)
    ↓
build_[page].json (state check)
    ↓
knowledge/*.md (rules)
    ↓
skills/*.md (tools)
    ↓
[BUILD EXECUTION]
    ↓
build_[page].json (state update)
```

## File Registry

### Core Files
| File | Type | Purpose |
|------|------|---------|
| CHECKLIST.md | Validation | 6-phase gate |
| GEMINI.md | Entry | Read order |
| INSTRUCTION.md | Protocol | 4-phase workflow |
| SYSTEM.md | Doc | This file |
| project.json | Config | Site metadata |
| styles.json | Data | Utility classes |
| tracker.js | Lib | State management |

### Directories
| Dir | Content |
|-----|---------|
| workflow/ | Build process |
| knowledge/ | Client-First spec |
| skills/ | Tool guides |
| memory/ | Runtime data |

## State Management

### Read State
- `project.json` → site_id
- `build_[page].json` → completed_sections[]
- `styles.json` → utility_classes[]

### Write State
- `build_[page].json` → markSectionComplete()
- `project.json` → update component IDs

## Build Gate

**Entry Condition:**
```javascript
if (checklist.phase1_4 === 100% && 
    site_id exists && 
    section not in completed_sections) {
    allow_build()
} else {
    reject("Complete checklist first")
}
```
