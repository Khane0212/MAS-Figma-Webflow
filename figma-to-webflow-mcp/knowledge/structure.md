# DOM Specification

## 7-Layer Architecture

```
Layer 1: page-wrapper
    +- Layer 2: main-wrapper
        +- Layer 3: section_[name]
            +- Layer 4: padding-global
                +- Layer 5: container-[size]
                    +- Layer 6: padding-section-[size]
                        +- Layer 7: [name]_component
```

## Layer Definitions

### Layer 1: page-wrapper
- **Tag:** `div`
- **Purpose:** Page-level wrapper
- **CSS:** `overflow: hidden`
- **Required:** Yes

### Layer 2: main-wrapper
- **Tag:** `main`
- **Purpose:** Content wrapper (excludes nav/footer)
- **Required:** Yes

### Layer 3: section_[name]
- **Tag:** `section`
- **Pattern:** `section_{descriptor}`
- **Examples:** `section_hero`, `section_features`
- **CSS:** No padding/margin directly
- **Required:** Yes

### Layer 4: padding-global
- **Tag:** `div`
- **Purpose:** Horizontal page padding
- **CSS:** `padding-left: 5%`, `padding-right: 5%`
- **Required:** Yes

### Layer 5: container-[size]
- **Tag:** `div`
- **Variants:** `container-large`, `container-medium`, `container-small`
- **Purpose:** Max-width constraint
- **Required:** Yes

### Layer 6: padding-section-[size]
- **Tag:** `div`
- **Variants:** `padding-section-small`, `padding-section-medium`, `padding-section-large`
- **Purpose:** Vertical section spacing
- **Required:** Yes

### Layer 7: [name]_component
- **Tag:** `div`
- **Pattern:** `{section}_component`
- **Examples:** `hero_component`, `features_component`
- **Purpose:** Component content wrapper
- **Required:** Yes

## Validation Rules

1. No skipping layers
2. No padding/margin on `section_[name]`
3. `padding-global` on every section
4. Container must have max-width
