# Audit Logic

## Color Audit

### Merge Rules
```
IF color_distance < 15 AND same_role:
    ↓ Merge to existing variable
ELSE IF color_distance == 0 AND different_role:
    ↓ Keep separate (Brand vs Success)
ELSE IF same_hex AND different_alpha:
    ↓ Create [Name]-[Opacity] variable
```

### Alpha Handling
- Primary-Blue at 100% → `text-color-primary`
- Primary-Blue at 50% → `text-color-primary-50`

## Spacing Audit

1. Run `snapValue` on all measurements
2. Match to closest standard token
3. Create variable if exact match needed
4. Reference variable in styles

## Typography Audit

- Prefer typography variables over classes
- Round font-weight to standard (400, 500, 600, 700)
- Use `text-weight-{x}` classes

## Conflict Resolution Priority

1. Webflow Variables (highest)
2. Figma Local Styles
3. Generated values

## Audit Output

Required format:
```json
{
  "figma_id": "123:456",
  "webflow_variable_id": "var_xxx",
  "original_value": "#FF0000",
  "mapped_value": "var(--color-primary)",
  "reason": "Within 15 threshold, same role"
}
```

## Constraints

- No hard-coded HEX in final output
- Border < 2px: precise values only
- Ask user for semantic duplicates
