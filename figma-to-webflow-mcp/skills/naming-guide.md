# Naming Logic

## Decision Tree

```
Is this element reusable?
+-- Yes ? Utility class
¦   +-- Pattern: [property]-[value]
¦   +-- Example: margin-top, text-size-large
¦
+-- No ? Custom class
    +-- Is this a variant of another class?
    ¦   +-- Yes ? Combo class
    ¦   ¦   +-- Pattern: [base] is-[modifier]
    ¦   ¦   +-- Example: button is-primary
    ¦   ¦
    ¦   +-- No ? Unique custom class
    ¦       +-- Pattern: [block]_[element]-[variant]
    ¦       +-- Example: hero_heading
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

```html
<!-- Utility only -->
<div class="margin-top margin-large padding-global">

<!-- Custom only -->
<div class="hero_content-wrapper">

<!-- Base + combo -->
<button class="button is-primary is-small">

<!-- Utility + custom -->
<h2 class="heading-style-h2 hero_heading">
```
