# Content Fidelity Protocol

## Goal
Ensure 100% content parity between Figma and Webflow. No text, link, or image should be omitted during the transition, especially when using `whtml_builder`.

## 1. Content Manifest (Phase 1: Extract)
Before building, the agent MUST generate a manifest of all content items found in the Figma node:

- **Text Manifest:** A list of every unique text string, including headings, paragraphs, buttons, and small labels.
- **Link Manifest:** All URLs, phone numbers, and emails attached to text or buttons.
- **Asset Manifest:** All images, icons, and background images.

## 2. WHTML Generation Rules (Phase 3: Construct)
When generating HTML for `whtml_builder`:

1. **No Placeholders:** Never use "Heading", "Text", or "Button Text". Use the actual values from the manifest.
2. **Completeness Check:** Cross-reference the generated HTML against the Content Manifest. 
   - *Audit Rule:* Every item in the manifest MUST be represented by an HTML tag in the generated string.
3. **Nesting Check:** Ensure that nested text (e.g., spans inside paragraphs) is preserved.

## 3. Post-Build Audit (Phase 4: Validate)
After the `whtml_builder` call succeeds:

1. **Text Count Verification:** Compare the number of text elements in Webflow (via `get_all_elements`) with the count in the Text Manifest.
2. **String Matching:** Select a few key strings and verify they exist in the Webflow DOM using `query_elements` with the `text` filter.
3. **Asset Verification:** Verify that every `Image` element has a valid `image_asset_id` assigned.

## 4. Handling Missing Content
If content is missing after build:
1. Identify the missing element ID from Figma.
2. Use `element_builder` to surgically insert the missing element into the correct position in the Webflow DOM.
3. Update the tracker to reflect the correction.

## 5. Prohibited Shortcuts
- **DO NOT** skip small labels or "hidden" text nodes in Figma.
- **DO NOT** assume "default" text is sufficient.
- **DO NOT** truncate long paragraphs in the `whtml` string.
