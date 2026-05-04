# Typography Specification

## Principle
Separate semantic HTML from visual styling.

- **HTML tag** = Structure (SEO)
- **Class** = Visual appearance

## Size Classes

### Headings
```
heading-style-h1  (3.5rem)
heading-style-h2  (3rem)
heading-style-h3  (2.5rem)
heading-style-h4  (2rem)
heading-style-h5  (1.5rem)
heading-style-h6  (1.25rem)
```

### Body Text
```
text-size-large    (1.25rem)
text-size-medium   (1.125rem)
text-size-regular  (1rem)
text-size-small    (0.875rem)
text-size-tiny     (0.75rem)
```

## Weight Classes
```
text-weight-bold      (700)
text-weight-semibold  (600)
text-weight-medium    (500)
text-weight-normal    (400)
text-weight-light     (300)
```

## Alignment Classes
```
text-align-left
text-align-center
text-align-right
```

## Hybrid Pattern

```html
<!-- SEO: H1 -->
<!-- Visual: H3 size -->
<h1 class="heading-style-h3">
  Page Title
</h1>

<!-- SEO: Paragraph -->
<!-- Visual: Large text -->
<p class="text-size-large">
  Lead paragraph
</p>
```

## Conversion

| Figma | Class |
|-------|-------|
| 56px+ | heading-style-h1 |
| 48px | heading-style-h2 |
| 40px | heading-style-h3 |
| 32px | heading-style-h4 |
| 24px | heading-style-h5 |
| 20px | text-size-large |
| 18px | text-size-medium |
| 16px | text-size-regular |
| 14px | text-size-small |
| 12px | text-size-tiny |
