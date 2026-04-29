# Responsive Design Expert Skill

This skill defines mandatory standards and implementation rules for creating flawlessly responsive, mobile-first web applications for Aló Asesorías Excel. Apply every rule before writing or reviewing any CSS or layout.

---

## 1. Core Principles

- **Mobile-First Always:** Write CSS for mobile first. Use `min-width` media queries to enhance for larger screens.
- **Fluid Layouts:** Avoid fixed `width` or `height`. Use relative units (`%`, `vw`, `vh`, `rem`) and constraints (`max-width`, `min-height`).
- **Flexbox & Grid Mastery:** Flexbox for 1D (toolbars, rows); CSS Grid for 2D (galleries, complex dashboards).
- **No Horizontal Overflow:** The golden rule. Apply `overflow-x: hidden` on `body`. No child element may break out of the viewport.
- **box-sizing: border-box everywhere:** Apply globally. Padding should never cause overflow.

---

## 2. Breakpoints Standard

Always use these consistent breakpoints. Never scatter arbitrary pixel values across files.

```css
/* Mobile base (0–480px): No media query, just default styles */

/* Smartphones landscape & small tablets */
@media (min-width: 481px) { ... }

/* Tablets portrait */
@media (min-width: 768px) { ... }

/* Tablets landscape & small laptops */
@media (min-width: 1024px) { ... }

/* Desktops */
@media (min-width: 1200px) { ... }
```

For **max-width** (mobile overrides), use `@media (max-width: 768px)`.

---

## 3. The Fixed Header Rule — Critical for This Project

> **This is the #1 layout issue in this project and must be checked first on every page.**

The `TopMenu` in `MainLayout` is **`position: fixed`** on mobile with a height of ~74px. Any content directly below it will be hidden unless explicitly padded.

**Rule:** Every page inside `MainLayout` (Landing, Contacto, Diseño, Términos y Condiciones) MUST have:
```css
@media (max-width: 768px) {
  .page-wrapper {
    padding-top: 110px; /* clears the ~74px fixed header + breathing room */
  }
}
```

**Exception:** Pages inside `AppShell` (Tienda, Carrito, Confirmar Compra, Admin, Mis Compras) do NOT need this — the AppShell's topbar is part of the document flow, not fixed over content.

---

## 4. Common Anti-Patterns & Mandatory Fixes

### 4.1 Fixed Widths
- ❌ `width: 1000px`
- ✅ `width: 100%; max-width: 1000px;`

### 4.2 Large Fixed Padding (Desktop → Mobile)
- ❌ `padding: 100px 24px` (same on all screens)
- ✅ Desktop: `padding: 40px 24px`; Mobile: `padding: 110px 16px 40px` (inside MainLayout) or `padding: 24px 16px 40px` (inside AppShell)

### 4.3 Two-Column Panels → Mobile Stack
Two-column layouts (like Carrito: product list + summary) must stack on mobile:
```css
.panel-layout { display: flex; gap: 24px; }

@media (max-width: 768px) {
  .panel-layout { flex-direction: column; }
  .panel-left, .panel-right {
    width: 100%;
    min-width: 100%; /* override any fixed min-width */
    padding: 0; /* no extra inner padding that shrinks the card width */
  }
}
```

### 4.4 Flex Items With `flex-wrap: wrap` Dropping Elements
When a row has `flex-wrap: wrap` and includes an icon/action button at the end, it can drop to a new line on narrow screens.
- ✅ Use `flex-wrap: nowrap` on the item row.
- ✅ Shrink image thumbnails on mobile (e.g., from `80px` → `56px`).
- ✅ Set the info section to `flex: 1; min-width: 0;` with `text-overflow: ellipsis` to prevent overflow.
- ✅ Keep the action button container to `min-width: 40px` with `flex-shrink: 0`.

### 4.5 Modals Not Centered on Mobile
Ant Design's `Modal.confirm()` or `modal.confirm()` renders centered by default on desktop. On mobile with a fixed header, the modal can appear behind the header or shifted to the top.
- ✅ Use `centered: true` in the modal config: `modal.confirm({ centered: true, ... })`.
- ✅ Never use static `Modal.confirm()` — use `const { modal } = App.useApp()` to get theme-aware instance.

### 4.6 Header + Breadcrumb Collision
On mobile, an `h1` and `<Breadcrumb>` side by side with `justify-content: space-between` will crash into each other.
- ✅ Switch the container to `flex-direction: column; align-items: flex-start;` on `@media (max-width: 600px)`.

### 4.7 Tables on Mobile
Native `<Table>` (antd) inside a mobile view forces horizontal scrolling when `minWidth` is set. This is acceptable only with an explicit `overflowX: auto` wrapper.
- ✅ Wrap: `<div style={{ overflowX: 'auto' }}><Table style={{ minWidth: '700px' }} /></div>`.

### 4.8 Full-Width Cards Inside Padding Containers
When a card lives inside a container with `padding: 24px`, on mobile the card doesn't reach the edges. This is usually desirable, but must be consistent across all pages. Never mix `padding: 16px` on the panel itself AND the wrapper — choose one level.

---

## 5. AppShell Interior Pages — The Standard

All pages inside the `AppShell` (tienda, carrito, checkout, admin, mis compras) share this layout pattern:

```
┌─────────────────────────────────────┐
│ [h1 Title]           [Breadcrumb]   │  ← Outside any card, margin-bottom: 32px
├─────────────────────────────────────┤
│ Card / Panel content                │  ← background: var(--alo-oscuro2)
│ border: 1px solid var(--alo-borde)  │     border-radius: 8px
│ padding: 24px                       │     padding: 24px
└─────────────────────────────────────┘
```

**Wrapper class:** Use `.carrito-wrapper` (already defined) or an equivalent class that provides `padding: 40px 24px 60px` on desktop and `24px 16px 40px` on mobile.

---

## 6. Responsive Image Best Practices

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

For cover images in fixed-height containers, always use `object-fit: cover`.

---

## 7. Mobile UX Checklist (Run Before Every Deployment)

- [ ] Does the page clear the fixed `TopMenu` on mobile? (`padding-top ≥ 110px` inside MainLayout)
- [ ] Does every two-column layout stack properly at ≤768px?
- [ ] Are all `flex-wrap: wrap` rows correctly handling the action icon/button?
- [ ] Do cards reach the full width of the screen (minus wrapper padding)?
- [ ] Is the page title (`h1`) outside of the card container?
- [ ] Are modals using `centered: true`?
- [ ] Is there any element with a fixed `px` width wider than the mobile viewport (≤375px)?
- [ ] Do buttons stay full-width inside modals on mobile?
