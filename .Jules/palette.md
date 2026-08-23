## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2026-08-23 - Sidebar Navigation Accessibility
**Learning:** Decorative icons in navigation menus need `aria-hidden="true"` to prevent screen readers from reading them out redundantly, and active navigation links need `aria-current="page"` for screen reader clarity. Focus states should also be clearly visible for keyboard users.
**Action:** Always add `aria-hidden="true"` to icons used alongside text labels, `aria-current="page"` to active navigation items, and `focus-visible` utility classes for clear keyboard navigation support.
