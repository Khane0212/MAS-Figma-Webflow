# Client-First Naming Convention (Finsweet)

> **Documentation**: https://finsweet.com/client-first

---

## 🏗️ Core Structure (Bắt buộc)

### Page Layout Hierarchy
```
.page-wrapper
  └── .main-wrapper
      └── .section_[name]
          └── .padding-global
              └── .container-[size]
                  └── .padding-section-[size]
                      └── CONTENT
```

### Ví dụ đầy đủ:
```html
<div class="page-wrapper">
  <div class="main-wrapper">
    <section class="section_hero">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-large">
            <!-- Hero content here -->
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
```

---

## 📋 Core Classes

### Wrappers
| Class | Purpose |
|-------|---------|
| `.page-wrapper` | Wrap toàn bộ trang |
| `.main-wrapper` | Wrap nội dung chính (không include nav/footer) |

### Sections
| Pattern | Example | Purpose |
|---------|---------|---------|
| `.section_[name]` | `.section_hero`, `.section_about`, `.section_pricing` | Define section theo chức năng |

### Padding Global
| Class | Purpose |
|-------|---------|
| `.padding-global` | Horizontal padding responsive (1.5rem → 3rem) |

### Containers
| Class | Max Width | Purpose |
|-------|-----------|---------|
| `.container-large` | 80rem (1280px) | Main content container |
| `.container-medium` | 64rem (1024px) | Medium content |
| `.container-small` | 48rem (768px) | Small content, text blocks |

### Section Padding
| Class | Vertical Padding |
|-------|------------------|
| `.padding-section-small` | 3rem top/bottom |
| `.padding-section-medium` | 5rem top/bottom |
| `.padding-section-large` | 7rem top/bottom |

---

## 🎯 Semantic Naming - Client First Philosophy

> **Đặt tên theo CHỨC NĂNG, không phải STYLE**

### ❌ Sai (Style-based)
- `.blue-text` (màu có thể đổi)
- `.big-button` (kích thước tương đối)
- `.left-sidebar` (vị trí có thể đổi)
- `.margin-top-20` (cố định số)

### ✅ Đúng (Function-based)
- `.text-color-brand` (màu brand, có thể đổi giá trị)
- `.cta-button` (button cho call-to-action)
- `.secondary-nav` (navigation phụ)
- `.margin-bottom.margin-small` (spacing theo scale)

---

## 📊 Spacing Scale (Margin & Padding)

### Pattern
```
.[property]-[direction].margin-[size]
.[property]-[direction].padding-[size]
```

### Examples
```css
/* Margin */
.margin-bottom.margin-small    /* 1rem */
.margin-bottom.margin-medium   /* 2rem */
.margin-bottom.margin-large    /* 3rem */
.margin-bottom.margin-xlarge   /* 4rem */
.margin-bottom.margin-xxlarge  /* 5rem */
.margin-bottom.margin-huge     /* 6rem */
.margin-bottom.margin-xhuge    /* 8rem */
.margin-bottom.margin-xxhuge   /* 12rem */

/* Padding tương tự với .padding-[size] */
```

---

## 🔤 Typography Scale

### Pattern
```
.text-[size]
.text-style-[style]
```

### Size Scale
| Class | Size | Line Height | Weight |
|-------|------|-------------|--------|
| `.text-size-small` | 0.875rem | 1.5 | 400 |
| `.text-size-regular` | 1rem | 1.5 | 400 |
| `.text-size-medium` | 1.125rem | 1.6 | 400 |
| `.text-size-large` | 1.25rem | 1.6 | 400 |
| `.text-size-xlarge` | 1.5rem | 1.6 | 500 |
| `.text-size-xxlarge` | 2rem | 1.4 | 500 |
| `.text-size-xxxlarge` | 2.5rem | 1.2 | 600 |

### Style Modifiers
| Class | Purpose |
|-------|---------|
| `.text-style-uppercase` | Uppercase text |
| `.text-style-italic` | Italic text |
| `.text-style-strikethrough` | Strikethrough |
| `.text-style-nowrap` | No wrap |
| `.text-style-link` | Link styling |
| `.text-align-center` | Center align |
| `.text-align-left` | Left align |
| `.text-align-right` | Right align |

---

## 🎨 Color & Background

### Pattern
```
.text-color-[name]
.background-color-[name]
```

### Examples
```css
.text-color-brand          /* Brand primary color */
.text-color-brand-secondary /* Brand secondary */
.text-color-black
.text-color-white
.text-color-gray

.background-color-brand
.background-color-white
.background-color-black
.background-color-gray
```

---

## 🧩 Button Classes

### Base + Variants
```css
.button                    /* Base button */
.button.is-primary         /* Primary variant */
.button.is-secondary       /* Secondary variant */
.button.is-small           /* Small size */
.button.is-large           /* Large size */
.button.is-full-width      /* Full width */
```

---

## 📱 Display & Layout

### Display
```css
.display-none              /* Hide element */
.display-block             /* Block display */
.display-flex              /* Flex display */
.display-grid              /* Grid display */
```

### Flex & Grid
```css
/* Flex direction */
.flex-row
.flex-column

/* Justify content */
.justify-start
.justify-center
.justify-end
.justify-between

/* Align items */
.align-start
.align-center
.align-end
.align-stretch
```

---

## 🔄 Responsive Pattern

### Breakpoints (Mobile First)
```
base → medium (≥768px) → large (≥992px) → xlarge (≥1280px)
```

### Pattern
```
.class                          /* Mobile */
.class-medium                  /* ≥768px */
.class-large                   /* ≥992px */
.class-xlarge                  /* ≥1280px */
```

### Example
```css
.display-none                   /* Hide on mobile */
.display-none-medium            /* Hide on tablet+ */
.flex-row-large                 /* Flex row on desktop */
```

---

## 🏷️ Industry-Specific Naming

### Quy trình tạo tên

#### Bước 1: Xác định Industry Context
```
Industry: Healthcare / Fintech / E-commerce / SaaS / Education / Food & Beverage
```

#### Bước 2: Xác định Intent/Function
```
Function: Navigation / Hero / CTA / Feature / Testimonial / Pricing / Product / Cart
```

#### Bước 3: Xác định Component Type
```
Type: Section / Wrapper / Container / Card / Button / Form / List / Grid
```

#### Bước 4: Kết hợp thành tên
```
[Context]-[Function]-[Type]
```

## Ví dụ theo ngành

### Healthcare
- `.patient-portal-hero` (hero section portal bệnh nhân)
- `.appointment-form-wrapper` (wrapper form đặt lịch)
- `.doctor-profile-card` (card hồ sơ bác sĩ)

### Fintech
- `.dashboard-balance-widget` (widget số dư dashboard)
- `.transaction-history-table` (bảng lịch sử giao dịch)
- `.kyc-verification-form` (form xác minh KYC)

### E-commerce
- `.product-gallery-grid` (grid gallery sản phẩm)
- `.checkout-form-block` (block form thanh toán)
- `.cart-summary-sidebar` (sidebar tóm tắt giỏ hàng)

### SaaS
- `.pricing-tier-card` (card tier giá)
- `.feature-comparison-table` (bảng so sánh tính năng)
- `.onboarding-wizard-step` (bước wizard onboarding)

## Danh sách từ khóa ngữ nghĩa theo ngành

### Common
- hero, cta, feature, testimonial, pricing, nav, footer, header
- form, card, list, grid, table, modal, alert, badge

### Healthcare
- patient, doctor, appointment, clinic, treatment, prescription, portal, record

### Fintech
- account, balance, transaction, payment, transfer, wallet, investment, portfolio

### E-commerce
- product, cart, checkout, order, shipping, inventory, wishlist, review

### SaaS
- dashboard, integration, api, subscription, tier, user, team, workspace
