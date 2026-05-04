# Variables Specification

## Core Rule
No hard-coded colors. Always use CSS variables.

## Color Tokens

### Text Colors
```
text-color-primary
text-color-secondary
text-color-alternate
text-color-muted
```

### Background Colors
```
background-color-primary
background-color-secondary
background-color-alternate
background-color-tertiary
```

## Variable Creation Flow

```
Phase 1: Extract
    ? Figma HEX values
Phase 2: Transform
    ? Create variables (variable_tool)
    ? Name: text-color-primary, etc.
Phase 3: Link
    ? Apply to styles
    ? color: var(--text-color-primary)
```

## Mapping Table

| Figma Path | Variable Name | Usage |
|-------------|---------------|-------|
| Colors/Text/Primary | text-color-primary | Body text |
| Colors/Text/Secondary | text-color-secondary | Subtitle |
| Colors/Background/Primary | background-color-primary | Main bg |
| Colors/Background/Alt | background-color-alternate | Section bg |

## Utility Classes

Apply via classes, not inline:

```html
<p class="text-color-primary">...</p>
<div class="background-color-alternate">...</div>
```

## Creation Order

1. Define variables first (colors, spacing)
2. Create styles that reference variables
3. Build DOM with utility classes

## Validation

Before build, verify:
- [ ] All colors mapped to variables
- [ ] No HEX in final CSS
- [ ] Variables exist in Webflow
- [ ] Classes reference variables correctly
