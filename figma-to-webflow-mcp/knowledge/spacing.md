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

## Stacked Sections Gap Issue (Double Padding & Custom Gaps)

**The Problem:**
When two 7-layer architecture sections are adjacent, they both contribute vertical padding. For example, if a `padding-section-[size]` class (e.g., 8rem top/bottom) is used on both, the default visual gap becomes 16rem. However, Figma designs often have specific, varying gaps between sections (e.g., 20rem, 14rem, 11rem) that don't match the default sum.

**The Solution (Contextual Combo Classes):**
**Never** alter the global base padding classes. Do **not** rely on rigid utility classes like `is-padding-bottom-0` because they don't allow for custom pixel-perfect adjustments. Instead, use **contextual combo classes** to adjust the padding exactly.

1. **Calculate the Target Gap:** Identify the exact gap required from Figma (e.g., 14rem).
2. **Naming Convention:** Create a contextual combo class named after the section context, e.g., `is-[section-name]` (like `is-hero`, `is-contact`, `is-testimonials`).
3. **Apply the Math:** Adjust the `padding-top` or `padding-bottom` on this combo class so that:
   `padding-bottom (Upper Section) + padding-top (Lower Section) = Figma Target Gap`
4. **Implementation:** Create this combo class as a child of the specific `padding-section-[size]` that the section is currently using (e.g., `padding-section-large`, `padding-section-medium`, or `padding-section-small`).

**Example Implementation:**
If Figma requires a 20rem gap between Hero and Section B, and both currently use a base padding class that contributes 8rem:
```javascript
// Step 1: Create contextual combo class for the Hero section
{
  "create_style": {
    "name": "is-hero",
    "parent_style_names": ["padding-section-[size]"], // Use the specific size being used (e.g. padding-section-large, padding-section-medium)
    "properties": [
      { "property_name": "padding-bottom", "property_value": "12rem" } // 12rem + 8rem (Section B top) = 20rem
    ]y
  }
}

// Step 2: Apply `is-hero` to the padding-section wrapper of the Hero section.
```
This ensures pixel-perfect spacing matching Figma exactly, without breaking the underlying Client-First methodology.
