# Variables & Styles

## Creation Sequence

```
Phase A: Variables (First)
+-- Colors
¦   +-- text-color-primary
¦   +-- text-color-secondary
¦   +-- background-color-primary
¦
+-- Spacing
    +-- spacing-small (1rem)
    +-- spacing-medium (2rem)
    +-- spacing-large (3rem)

Phase B: Styles (Second)
+-- Utility classes
¦   +-- margin-top (link to spacing vars)
¦   +-- padding-global
¦
+-- Custom classes
    +-- hero_component (component-specific)
```

## Tools

### variable_tool
```javascript
// Create color variable
{
  action: "create_color_variable",
  variable_name: "text-color-primary",
  value: { static_value: "#232536" }
}

// Create size variable
{
  action: "create_size_variable",
  variable_name: "spacing-medium",
  value: { static_value: { value: 2, unit: "rem" } }
}
```

### style_tool
```javascript
// Create style
{
  action: "create_style",
  name: "margin-top",
  properties: [
    { property_name: "marginTop", variable_as_value: "spacing-medium-id" }
  ]
}
```

## Validation

Before creating:
- Check existing with `get_styles`
- Avoid duplicates
- Link to variables, not static values
