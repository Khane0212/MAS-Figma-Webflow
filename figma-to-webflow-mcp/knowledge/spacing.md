# Spacing Specification

## Core Rule
**Never** apply margin/padding directly to custom classes. Use utility wrappers.

## Margin (Between Elements)

**Class Structure:** `margin-[direction]` + `margin-[size]`

**Directions:**
- `margin-top`
- `margin-bottom`
- `margin-left`
- `margin-right`

**Sizes (rem):**

| Token | Value |
|-------|-------|
| tiny | 0.125rem |
| xxsmall | 0.25rem |
| xsmall | 0.5rem |
| small | 1rem |
| medium | 2rem |
| large | 3rem |
| xlarge | 4rem |
| xxlarge | 5rem |
| huge | 6rem |
| xhuge | 8rem |
| xxhuge | 12rem |

**Usage:**
```html
<!-- Two elements with gap -->
<div class="element-a">...</div>
<div class="margin-top margin-medium">
  <div class="element-b">...</div>
</div>
```

## Padding (Section Spacing)

**Global:**
- `padding-global` - Horizontal page padding (5% left/right)

**Section Vertical:**
- `padding-section-small` - 3rem top/bottom
- `padding-section-medium` - 5rem top/bottom
- `padding-section-large` - 7rem top/bottom

## Conversion Formula

```
Figma px ? rem ? utility class

16px  ? 1rem  ? small
32px  ? 2rem  ? medium
48px  ? 3rem  ? large
```

Always round to nearest standard token.
