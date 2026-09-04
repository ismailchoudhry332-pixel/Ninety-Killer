## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Sidebar Accessibility Pattern
**Learning:** Found that the sidebar navigation component lacked `aria-current="page"` for indicating the active route to screen readers and lacked keyboard focus indicators. Furthermore, decorative SVG icons in the sidebar didn't have `aria-hidden="true"`.
**Action:** When implementing or reviewing navigation menus, always use `aria-current="page"` on the active link to support screen readers, include distinct `focus-visible` utility classes for keyboard users, and explicitly add `aria-hidden="true"` to decorative icons.
