# Webflow Footer Patterns

## Decision Rule

**2 backgrounds in Figma → Use nested sections**
**1 background in Figma → Build normally (single section)**

---

## Case 1: Normal Footer (Single Background)

**When:** Figma shows 1 background color throughout footer

**Structure:**
```html
<section class="section_footer">
  <div class="padding-global">
    <div class="container-large">
      <div class="padding-section-medium">
        <div class="footer_component">
          <!-- All footer content -->
        </div>
      </div>
    </div>
  </div>
</section>
```

**Follows 7-layer architecture normally**

---

## Case 2: Multi-Background Footer (Nested Sections)

**When:** Figma shows 2 different background colors

**Example:** Dark top (81.19%) + White bottom (18.81%)

**Structure:**
```html
<section class="section_footer"> <!-- Wrapper only -->
  
  <section class="footer-main-section"> <!-- 7-layer here -->
    <div class="padding-global">
      <div class="container-large">
        <div class="padding-section-medium">
          <div class="footer_component">
            <!-- Brand, CTA, Contact -->
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="footer-links-section"> <!-- 7-layer here -->
    <div class="padding-global">
      <div class="container-large">
        <div class="padding-section-medium">
          <div class="footer_bottom_row">
            <!-- Copyright, Links -->
          </div>
        </div>
      </div>
    </div>
  </section>
  
</section>
```

**Key Points:**
- `section_footer`: Wrapper only, NO 7-layer, NO padding
- Nested sections: Each has full 7-layer structure
- Each section: Own background color

---

## Implementation Guide

### Step 1: Check Figma
- **Count background colors** in footer
- **1 color** → Normal build
- **2+ colors** → Nested sections

### Step 2: Build Accordingly

**Normal (1 background):**
```
section_footer
├── padding-global
├── container-large
├── padding-section-medium
└── footer_component
```

**Nested (2 backgrounds):**
```
section_footer (wrapper)
├── footer-main-section (7-layer + dark bg)
└── footer-links-section (7-layer + white bg)
```

### Step 3: Apply Combo Classes

**is-footer class:**
- Add to nested sections when using multi-background pattern
- Removes extra bottom spacing
- Maintains consistent spacing

**Components:**
- `footer_brand`: Flex column
- `footer_cta`: Flex column  
- `footer_contact`: Grid 2 columns
- `footer_bottom_row`: Flex space-between

---

## Quick Reference

| Figma Shows | Pattern | Structure |
|-------------|---------|-----------|
| 1 background | Normal | Single section with 7-layer |
| 2 backgrounds | Nested | Wrapper + 2 nested sections with 7-layer each |

---

## Current Project Example

**Figma:** 81.19% dark (#1c1e53) + 18.81% white (#ffffff)

**Result:** Nested sections pattern
- `footer-main-section`: Dark bg + 7-layer
- `footer-links-section`: White bg + 7-layer

**Working correctly** ✅
