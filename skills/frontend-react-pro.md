# Frontend React Pro - Design & Architecture Guidelines

This document is the **mandatory rule-set** for all frontend work on the Aló Excel React application. Apply every section before writing or modifying any component or page. Non-compliance produces visual inconsistencies and technical debt.

---

## 1. Design System & Theming Consistency

- **Single Source of Truth:** All colors, spacing, and borders MUST reference global CSS variables. Do not hardcode HEX or RGBA values unless creating a highly specific glow/shadow effect.
  - Base background: `var(--alo-oscuro)`
  - Elevated surfaces (Cards, Panels, Modals): `var(--alo-oscuro2)`
  - Primary borders: `var(--alo-borde)`
  - Accent colors: `var(--alo-verde)` and `var(--alo-verde-claro)`
  - Text primary: `var(--alo-blanco)`
  - Text muted: `var(--alo-gris)`

- **Border Radius Standardization:**
  - `8px` — large layout containers, sidebars, main panels
  - `12px` — interactive product/dashboard cards
  - `4–6px` — small elements: buttons, badges, tags, inputs

- **Ant Design (antd) Overrides:** ALWAYS override antd default themes via `ConfigProvider` or scoped CSS to enforce brand consistency. Never leave default blue antd styles visible in production.
  - Input with prefix icons: also remove inner `input` border (`border: none !important; box-shadow: none !important;`) to avoid double-border glitch.
  - Pagination: override `.ant-pagination-item`, `.ant-pagination-prev`, `.ant-pagination-next` with dark backgrounds. Active item gets `var(--alo-verde-claro)` accent border.
  - **Modals and Dialogs:** NEVER use static `Modal.confirm()`. Always use `const { modal } = App.useApp()` so the modal inherits the dark theme from `ConfigProvider`. Static `Modal.*` calls bypass the theme context and render with default light styling.

---

## 2. Interior Page Layout Standard

**Every interior page (Carrito, Confirmar Compra, Mis Compras, Contacto, Diseño, Términos) MUST follow this exact structure:**

```jsx
<div className="page-wrapper">

  {/* HEADER — Always outside any card */}
  <div className="page-header">
    <h1>Título de la Página</h1>
    <Breadcrumb ... />  {/* optional */}
  </div>

  {/* CONTENT — Card(s) below header */}
  <div className="page-card">
    ...content...
  </div>

</div>
```

**Rules:**
1. The `<h1>` MUST be outside of every card/panel. It floats above as a page title.
2. Cards/panels sit below the title as content containers.
3. The wrapper uses `padding: 40px 24px 60px` on desktop, `padding: 24px 16px 40px` on mobile (≤768px).
4. **Never** place the page title inside a bordered card. This is the #1 recurring violation.

---

## 3. Component Architecture

- **Separation of Concerns:** Keep business logic, data fetching, and state at the top of the component (or in custom hooks). Keep JSX focused on rendering.
- **Dumb & Smart Components:** Separate state-aware containers (Pages) from pure presentation components. Pass data via props and actions via callbacks.
- **Context Usage:** Use `App.useApp()` to access `message`, `modal`, and `notification` inside components. This guarantees theme inheritance and avoids "static function" React warnings.

---

## 4. Responsive Layouts & CSS

- **Flexbox & CSS Grid:** Use Flexbox for 1D layouts; CSS Grid for 2D layouts (galleries, dashboards).
- **Fluid & Constrained Widths:** Always provide `maxWidth` to layouts (`maxWidth: 1100px`).
  - Functional panels (Admin, Cart, Checkout): Left-aligned, max-width constrained.
  - Reading pages (Terms, FAQ, Contact): Centered (`margin: 0 auto`).
- **Scroll & Overflow:** Independent panels have their own scroll context (`overflow-y: auto`) with custom scrollbars. Never scroll the entire `<body>`.
- **Full-Bleed Pattern (Ultra-Wide):**
  - ❌ WRONG: `max-width` on `#root`.
  - ✅ CORRECT: Outer shell is full-width. Inner wrapper uses `max-width + margin: 0 auto`.

---

## 5. Mobile Padding — The "Clear The Header" Rule

> **This rule is mandatory for all pages rendered inside `MainLayout` (TopMenu + Footer).**

The `TopMenu` on mobile is **`position: fixed`** with a height of approximately **74px**. Any page rendered under it must have enough `padding-top` to avoid being hidden behind the menu.

**Standard mobile padding for `MainLayout` pages:**
```css
@media (max-width: 768px) {
  .page-wrapper {
    padding-top: 110px; /* 74px header + 36px breathing room */
  }
}
```

> **Note:** Pages inside `AppShell` (Tienda, Carrito, Confirmar, Admin) do NOT need this rule — the shell's topbar is part of the layout flow, not fixed over the content.

---

## 6. State Management & Real-time Sync

- **Event-Driven Sync:** For shared data across disconnected DOM subtrees (Cart count, category counts), use Custom Events (`window.dispatchEvent(new Event('adminProductsChanged'))`).
- **Optimistic UI:** Give immediate visual feedback (disable button, update count locally) while awaiting server response.
- **Auth Guards:** All pages requiring authentication MUST check `user` from `AuthContext` before fetching or displaying protected content. Unauthenticated state should render a clear, friendly CTA — not a blank page or raw error.

---

## 7. Performance & UX Best Practices

- **Feedback:** Always provide:
  - Hover/transition states on interactive elements.
  - Loading states (`<Spin />` or skeletons) while fetching.
  - Toast messages (`message.success()`, `message.error()`) after actions.
- **Navigation Clarity:** Use Breadcrumbs and clear "Go Back" or "Cancel" actions.
- **Disabled UI States:** Override antd's light disabled states to dark equivalents (`.ant-btn[disabled]` → dark bg, low-opacity text).

---

## 8. Typography Standard

- **`h1` (Page Titles):** `24px`, `600` weight. Always outside cards.
- **`h2` (Card/Section Titles):** `16–18px`, `600` weight. Inside cards.
- **Body / Table text:** `14px`, relying on color (`var(--alo-blanco)` vs `var(--alo-gris)`) for hierarchy — never `fontWeight` or `fontSize` overrides on individual table columns (except Status/Action pills).
- **These rules are enforced via `.admin-shell h1` and `.admin-shell p` CSS classes.** Never use inline `fontSize` or `lineHeight` on standard text tags inside those wrappers.

---

## 9. Ant Design v5 Specific Rules

- **Cards:** Use `variant="outlined"`, never the deprecated `bordered` prop.
- **Collapse:** Never use `<Panel>` children. Always use the `items` prop as an array of `{ key, label, children }`.
- **Global Feedback:** Wrap root in `<App>` from antd and use `const { message, modal, notification } = App.useApp()` inside all components.
