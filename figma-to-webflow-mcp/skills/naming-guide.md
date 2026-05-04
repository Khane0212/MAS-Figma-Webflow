# Naming Logic

## Decision Tree

```
Is this element reusable?
+-- Yes → Utility class
|   +-- Pattern: [property]-[value]
|   +-- Example: margin-top, text-size-large
|
+-- No → Custom class
    +-- Is this a variant of another class?
    |   +-- Yes → Combo class
    |   |   +-- Pattern: [base] is-[modifier]
    |   |   +-- Example: button is-primary
    |   |
    |   +-- No → Unique custom class
    |       +-- Pattern: [block]_[element]-[variant]
    |       +-- Example: hero_heading
```

## Priority Order

1. **Variable first** - Map to CSS variables before creating styles
2. **Utility second** - Use existing utility classes from `class.json`
3. **Custom last** - Create only when layout requires unique styling

## Combo Class Rules

- Maximum 2 combo classes per element
- Only for state or color variations
- Never for layout changes

## Examples

### Utility Classes
```
padding-global
margin-top
margin-large
text-size-regular
text-weight-medium
```

### Custom Classes
```
hero_content-wrapper
hero_heading
navbar_logo
footer_grid
```

### Combo Classes
```
button is-primary
button is-secondary
card is-featured
```

## Forbidden Patterns

- ❌ `div-block` or `div-block-3`
- ❌ `inline-xxx` or `inline-block`
- ❌ Frame names from Figma (`Frame 1`, `Group A`)
- ❌ Mixed separators in one name
