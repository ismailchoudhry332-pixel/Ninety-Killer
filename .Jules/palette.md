## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2026-08-30 - Sidebar Navigation Accessibility
**Learning:** Navigation links in standard Next.js sidebars were missing `aria-current="page"` for active links and lacked explicit focus states. This makes keyboard navigation confusing (no visual indicator of where focus is) and screen reader navigation unclear (no announcement of the currently active page).
**Action:** Always include `aria-current={isActive ? 'page' : undefined}` and add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600` to standard navigation `<Link>` elements, including the logo link.
