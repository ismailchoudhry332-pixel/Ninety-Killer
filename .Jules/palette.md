## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-24 - Sidebar Navigation Accessibility
**Learning:** Found that the sidebar navigation lacked `aria-current="page"` for active links and didn't have keyboard focus indicators on the logo and navigation links.
**Action:** Always add `aria-current="page"` to the currently active link in navigation menus, and explicitly apply `focus-visible` states to all interactive elements to ensure proper screen reader support and visual keyboard navigation.
