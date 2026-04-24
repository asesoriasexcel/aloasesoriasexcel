# Frontend React Pro - Design & Architecture Guidelines

This document serves as a "skill" or rule-set for developing the frontend of the Aló Excel React application. It guarantees consistency, performance, and professional standards across all components and pages.

## 1. Design System & Theming Consistency
- **Single Source of Truth:** All colors, spacing, and borders must reference global CSS variables defined in the palette (e.g., `var(--alo-oscuro)`, `var(--alo-borde)`). Do not hardcode HEX or RGBA values unless creating a highly specific, localized effect (like a faint neon shadow).
- **Dark Theme Consistency:** Maintain the established dark theme visual hierarchy:
  - **Base background:** `var(--alo-oscuro)`
  - **Elevated surfaces** (Cards, Panels, Modals): `var(--alo-oscuro2)`
  - **Primary borders:** `var(--alo-borde)`
  - **Accent colors:** `var(--alo-verde)` and `var(--alo-verde-claro)`
- **Border Radius Standarization:**
  - `8px` for large layout containers, sidebars, and main panels.
  - `12px` for interactive product/dashboard cards.
  - `4px` or `6px` for small elements like buttons, badges, tags, and inputs.

## 2. Component Architecture
- **Separation of Concerns:** Keep business logic, data fetching, and state management at the top of the component (or ideally in custom hooks). Keep the JSX clean and focused strictly on rendering.
- **Dumb & Smart Components:** Separate complex state-aware containers (Pages/Dashboards) from pure presentation components (like `ProductosGrid`). Pass data via props and trigger actions via callbacks (`onAddToCart`, `onDelete`).
- **Ant Design (antd) Overrides:** When using external UI libraries like `antd`, **always** override their default themes (e.g., the default blue) using scoped CSS classes or `ConfigProvider` to enforce brand consistency. Never leave default framework styles visible in production.
  - *Affix-Wrapper Edge Case:* When overriding background and borders for inputs with prefixes/icons (like `.ant-input-affix-wrapper`), you **must** explicitly remove the border of the inner `input` element (`border: none !important; box-shadow: none !important;`) to prevent an ugly double-border visual glitch.
  - *Pagination Overrides:* The default antd pagination is bright white with blue borders. In dark theme, this breaks immersion. Always override `.ant-pagination-item`, `.ant-pagination-prev`, and `.ant-pagination-next` to use dark backgrounds (e.g., `var(--admin-surface-2)`). The active item (`.ant-pagination-item-active`) should use a transparent primary color background with a vibrant accent border (`var(--alo-verde-claro)`).

## 3. Responsive Layouts & CSS
- **Flexbox & CSS Grid:** Use Flexbox for 1-dimensional layouts (toolbars, headers, simple rows) and CSS Grid for 2-dimensional layouts (product galleries, complex dashboards).
- **Fluid & Constrained Widths:** Always provide a `maxWidth` to layouts (e.g., `maxWidth: 1100px`). 
  - For **functional panels and forms** (Admin, Cart), **align them to the left** to provide a professional, native-app feel that respects reading flow.
  - For **general reading pages** (Terms and Conditions, FAQs, Contact form layouts), **center** the main container (`alignItems: center` or `margin: 0 auto`) to provide a better visual balance on ultra-wide screens.
- **Scroll & Overflow:** Ensure sidebars and independent panels have their own scroll context (`overflow-y: auto`) and custom scrollbars instead of scrolling the entire `<body>`. This maintains an app-like behavior.

## 4. State Management & Real-time Sync
- **Event-Driven Synchronization:** For data shared across disjointed parts of the DOM tree (like Cart counts or Sidebar category counts), use Custom Events (e.g., `window.dispatchEvent(new Event('adminProductsChanged'))`) to notify independent components and keep data perfectly synchronized without heavy Context setups.
- **Optimistic UI:** When a user performs an action, provide immediate visual feedback (disabling a button, updating a count locally) while waiting for the server response.

## 5. Performance & UX Best Practices
- **Feedback:** Always provide feedback for actions:
  - Transition and hover states on interactive elements (buttons, cards, links).
  - Loading states (`<Spin />` or skeletons) while fetching data.
  - Toast messages (`message.success()`, `message.error()`) upon action completion.
- **Clean Navigation:** Use Breadcrumbs and well-structured sidebars to ensure the user never feels "lost" or trapped in a view. Provide clear "Go Back" or "Cancel" actions in forms.
- **Disabled UI States:** In a dark theme, native framework disabled buttons usually default to light gray (`#f5f5f5`) which causes severe visual inconsistency. Always override disabled buttons (`.ant-btn[disabled]`) to use a dark, low-opacity background (e.g., `rgba(255, 255, 255, 0.08)`) and readable low-contrast text (e.g., `rgba(255, 255, 255, 0.4)`).

## 6. Typography Standard (The FAQ Standard)
- **Main Titles (`h1`):** Must use `32px` font size, `700` font weight, and `-0.02em` letter spacing to convey an executive dashboard feel.
- **Subtitles (`p` below headers):** Use `15px` font size with a line height of `1.6`.
- **Body Text & Tables:** Must use `14px` font size (matching the FAQ accordion content) for optimal data density and readability. In tables, all standard data columns must rely ONLY on color (`var(--alo-blanco)` vs `var(--alo-gris)`) to create hierarchy. **Do NOT use `fontWeight` or `fontSize` overrides on individual columns** (except for specialized pills like Status/Action), as this creates disjointed, disparate row visuals.
- **Enforcement:** These typography rules are globally enforced via the `.admin-shell h1` and `.admin-shell p` classes using `!important` to prevent inline style overrides. Never use inline `fontSize` or `lineHeight` on standard text tags.
