## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-10-01 - Sidebar Accessibility
**Learning:** The navigation sidebar lacked `aria-current="page"` for active links and distinct `focus-visible` styles for keyboard navigation, which degrades the experience for screen reader users and keyboard navigators.
**Action:** When creating or updating navigation menus, always ensure the currently active link includes `aria-current="page"` and all interactive elements have explicit focus states (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600`) to guarantee accessibility.
