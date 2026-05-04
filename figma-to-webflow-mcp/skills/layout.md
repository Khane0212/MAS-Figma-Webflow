# Layout Translation

## Auto Layout → CSS

### Direction
| Figma | CSS Property |
|-------|--------------|
| Vertical | `flex-direction: column` |
| Horizontal | `flex-direction: row` |
| Wrap | `flex-wrap: wrap` |

### Resizing
| Figma Behavior | CSS Implementation |
|----------------|-------------------|
| Fill Container | `flex-grow: 1`, `width: 100%` |
| Hug Contents | `width: auto`, `height: auto` |
| Fixed | `width: {x}rem`, `height: {y}rem` |

### Distribution
| Figma | CSS |
|-------|-----|
| Packed | `justify-content: flex-start/center/flex-end` |
| Space Between | `justify-content: space-between` |
| Space Around | `justify-content: space-around` |

## Element Detection

### Section Boundary
```
Condition: Frame is highest level container
Action: Create section_[name]
```

### Container Detection
```
Condition: Frame has repeated max-width (80rem/1280px)
Action: Use container-large
```

### Padding Detection
```
Condition: Frame has consistent horizontal padding
Action: Use padding-global
```

## Non-Auto Layout Handling

### Grouping Logic
1. Scan Y coordinates (top to bottom)
2. Elements with Y diff < 5px → flex-row
3. Elements stacked → flex-column

### Absolute Positioning
Use only for:
- Background decorative elements
- Floating icons
- Locked layers

## Gap Conversion

```
Figma gap: 32px → margin-top margin-large (3rem)
Figma gap: 16px → margin-top margin-small (1rem)
```

Round to nearest standard token.
