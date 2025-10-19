# SAK Design System

A semantic, maintainable design system for Stockholms Astrologiska Konferens.

## Color System

Colors are organized by **purpose**, not by name. This makes it easy to know which color to use for each UI element.

### Base Colors

```css
--background      /* Off White (#efefef) - Page background */
--foreground      /* Black - Default text color */
```

**Usage:** Default page background and body text

---

### Primary - Deep Teal

```css
--primary           /* #1b3e45 - Main brand color */
--primary-foreground /* Off White - Text on primary backgrounds */
--primary-dark      /* #0d596a - Darker variant (formerly "Aqua Blue") */
```

**Usage:**

- Main buttons and CTAs
- Headings and important text
- Navigation links
- Section borders
- Brand elements

**Examples:**

```tsx
<button className="bg-primary text-primary-foreground">Click me</button>
<h2 className="text-primary">Heading</h2>
<div className="bg-primary-dark">Darker teal container</div>
```

---

### Accent - Terracotta

```css
--accent           /* #a85c37 - Highlight color */
--accent-foreground /* Off White - Text on accent backgrounds */
```

**Usage:**

- Hover states
- Price highlights
- Special emphasis text
- Speaker names
- Decorative elements

**Examples:**

```tsx
<button className="hover:bg-accent">Hover me</button>
<span className="text-accent">Special text</span>
```

---

### Muted - Pale Lavender

```css
--muted           /* #e4d8d1 - Soft background */
--muted-foreground /* Deep Teal - Text on muted backgrounds */
```

**Usage:**

- Card backgrounds
- Subtle containers
- Secondary UI elements
- Form inputs

**Examples:**

```tsx
<div className="bg-muted text-muted-foreground">Card content</div>
```

---

### Secondary - Soft Teal

```css
--secondary           /* #a5babe - Alternative background */
--secondary-foreground /* Black - Text on secondary backgrounds */
```

**Usage:**

- Large section backgrounds
- Alternative surfaces
- Dividers

**Examples:**

```tsx
<section className="bg-secondary">Section content</section>
```

---

### Additional Colors

```css
--border  /* Soft Teal - For borders */
--gold    /* #C89B6B - Optional decorative accent */
```

---

## Typography System

Fonts are named by **purpose** to make it clear when to use each one.

### Font Families

#### `font-heading` - TAN Pearl

**Description:** Decorative serif font with elegant character

**Usage:**

- Logo and brand name
- Large page titles (H1)
- Section headings (H2, H3)
- Price numbers
- Special decorative text

**Examples:**

```tsx
<h1 className="font-heading">Stockholms Astrologiska Konferens</h1>
<h2 className="font-heading">Föreläsare</h2>
<p className="text-5xl font-heading">1250 kr</p>
```

---

#### `font-body` - Glacial Indifference

**Description:** Clean, readable sans-serif font

**Usage:**

- Body paragraphs
- UI text (buttons, navigation, forms)
- Descriptions
- Lists
- Any text meant to be read at length

**Examples:**

```tsx
<p className="font-body">Regular paragraph text...</p>
<button className="font-body">Click me</button>
```

---

#### `font-accent` - Haliman

**Description:** Stylistic decorative font

**Usage:**

- Special subheadings
- Decorative callouts
- Stylistic quotes
- Use sparingly for impact

**Examples:**

```tsx
<h3 className="font-accent">Special subheading</h3>
```

---

## Button Component

A modern, accessible button component with 4 variants and 3 sizes.

### Variants

#### `primary` (default)

White/off-white background with dark text. This is the main button style used throughout the site.

```tsx
<Button variant="primary">Köp biljett</Button>
```

**Usage:** Main CTAs, most buttons, prominent actions

---

#### `dark`

Dark teal background with light text. Use for contrast on light backgrounds.

```tsx
<Button variant="dark">Learn more</Button>
```

**Usage:** Buttons on white/light cards, alternative emphasis

---

#### `outline`

Transparent with border. Fills on hover.

```tsx
<Button variant="outline">See details</Button>
```

**Usage:** Special cases, alternative CTAs

---

#### `ghost`

Text-only button with subtle hover. No visible border. Minimal visual weight.

```tsx
<Button variant="ghost">Read more</Button>
```

**Usage:** Tertiary actions, inline links (note: most "read more" buttons use `primary` variant instead)

### Sizes

```tsx
<Button size="sm">Small</Button>    {/* px-3 py-1.5 text-sm */}
<Button size="md">Medium</Button>   {/* px-5 py-2 text-base (default) */}
<Button size="lg">Large</Button>    {/* px-6 py-2.5 text-base */}
```

**Note:** All buttons have:

- Subtle gray border (`border-gray-300/40`)
- Smaller border radius (`rounded` instead of `rounded-md`)
- Reduced padding for a more compact appearance

### With Icons

Buttons automatically handle icon spacing with `gap-2`:

```tsx
<Button variant="primary" size="lg">
  <Star size={16} />
  Köp biljett
</Button>
```

### Full Width

```tsx
<Button variant="primary" className="w-full">
  Full width button
</Button>
```

### Disabled State

```tsx
<Button disabled>Cannot click</Button>
```

### Features

- ✅ Smooth transitions and hover effects
- ✅ Focus ring for accessibility
- ✅ Disabled state styling
- ✅ Icon support with automatic spacing
- ✅ Fully customizable with className override
- ✅ Modern shadow effects

---

## Quick Reference Guide

### Common Patterns

**Section with cards:**

```tsx
<section className="bg-secondary">
  <div className="bg-muted text-muted-foreground">
    <h3 className="text-accent font-heading">Card title</h3>
    <p className="text-primary font-body">Card description</p>
  </div>
</section>
```

**Heading styles:**

```tsx
<h1 className="text-4xl font-heading text-primary">Page Title</h1>
<h2 className="text-3xl font-heading text-primary">Section Title</h2>
<h3 className="text-2xl font-accent text-accent">Special Heading</h3>
```

**Button examples:**

```tsx
<Button variant="primary">Main CTA (White)</Button>
<Button variant="dark" size="lg">Dark Button</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost" size="sm">Subtle Link</Button>
```

---

## Migration from Old System

If you see these old class names, replace them with:

### Colors

- `bg-deep-teal` → `bg-primary`
- `text-deep-teal` → `text-primary`
- `bg-aqua-blue` → `bg-primary-dark`
- `text-aqua-blue` → `text-primary-dark`
- `bg-soft-teal` → `bg-secondary`
- `text-soft-teal` → `text-secondary`
- `bg-pale-lavender` → `bg-muted`
- `text-pale-lavender` → `text-muted`
- `bg-terracotta` → `bg-accent`
- `text-terracotta` → `text-accent`

### Fonts

- `font-sans` → `font-heading` (for TAN Pearl)
- `font-serif` → `font-body` (for Glacial Indifference)
- `font-accent` → `font-accent` (unchanged, for Haliman)

---

## Design Principles

1. **Semantic over specific:** Use `primary` instead of `deep-teal`
2. **Purpose-driven:** Name things by what they do, not what they are
3. **Consistent foreground pairs:** Each background color has a matching foreground
4. **Clear hierarchy:** heading > accent > body for typography
5. **KISS principle:** Keep it simple, avoid nested abstractions
