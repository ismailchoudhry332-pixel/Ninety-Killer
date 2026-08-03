## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-13 - Navigation Accessibility Pattern
**Learning:** Found that the sidebar navigation lacked `aria-current="page"` for the active link and clear keyboard focus styles (`focus-visible`). This makes it difficult for screen reader users to identify the current page and for keyboard users to track focus.
**Action:** When implementing or reviewing navigation menus, always ensure the active link is marked with `aria-current="page"` and that all interactive links have distinct `focus-visible` utility classes (e.g., `focus-visible:ring-2 focus-visible:ring-primary-600`).
