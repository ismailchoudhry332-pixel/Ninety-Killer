## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-07-20 - Sidebar Navigation Accessibility
**Learning:** Decorative icons in sidebar navigation need `aria-hidden="true"` to prevent redundant screen reader announcements when the parent link already has accessible text. Active links benefit significantly from `aria-current="page"` and `focus-visible` classes to improve keyboard navigation and screen reader context.
**Action:** Always verify that navigation links include focus states, active states use `aria-current`, and decorative icons are hidden from screen readers.
