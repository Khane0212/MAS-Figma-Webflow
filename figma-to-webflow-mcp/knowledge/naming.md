# Class Naming Specification

## 3 Categories

### 1. Utility Classes
**Pattern:** `[property]-[value]`
**Separator:** Hyphen `-`

**Examples:**
```
margin-top
margin-bottom
margin-small
margin-medium
margin-large
text-size-small
text-size-regular
text-size-large
text-weight-bold
text-align-center
padding-global
padding-section-large
container-large
container-medium
```

### 2. Custom Classes
**Pattern:** `[block]_[element]-[variant]`
**Separator:** Underscore `_`

**Examples:**
```
hero_content-wrapper
hero_heading
hero_description
navbar_container
navbar_logo
navbar_menu-toggle
footer_grid
footer_social-links
footer_copyright
card_image-wrapper
card_title
card_meta
```

### 3. Combo Classes
**Pattern:** `[base] is-[modifier]`
**Prefix:** `is-`

**Examples:**
```
button is-primary
button is-secondary
button is-small
card is-featured
heading-style-h2 is-centered
section_hero is-dark
```

## Rules

| Rule | Utility | Custom | Combo |
|------|---------|--------|-------|
| Case | lowercase | lowercase | lowercase |
| Separator | `-` | `_` | space + `is-` |
| Reusable | Yes | No | Modifies base |
| Count limit | None | None | Max 2 per element |

## Forbidden Patterns

- ? `div-block` or `div-block-3`
- ? `inline-xxx` or `inline-block`
- ? Frame names from Figma (`Frame 1`, `Group A`)
- ? Mixed separators in one name
