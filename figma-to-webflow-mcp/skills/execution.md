# Atomic Execution

## 5-Step Process

### Step 1: Identify
- Get existing IDs from `list_styles`
- Resolve variable IDs
- Resolve class IDs
- Resolve asset IDs

### Step 2: Prepare
- Upload assets if needed
- Create missing variables
- Verify all references exist

### Step 3: Styles
- Create/update styles
- For combo classes: collect all class IDs
- Link to variables

### Step 4: Build
- Create node with parent_id
- Attach `data-figma-id` attribute
- Set classes

### Step 5: Verify
- `get_node` to verify attributes
- `element_snapshot_tool` for visual
- Log to progress file

## Error Handling

| Error | Response |
|-------|----------|
| 409 Conflict | Use `patch_style` instead |
| Timeout | Search by `data-figma-id` before retry |
| Missing parent | Re-analyze DOM position |

## Rate Limiting
- Pause 2s after every 5 writes
- Batch reads when possible
- Minimize API calls
