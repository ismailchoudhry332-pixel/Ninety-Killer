## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-13 - Sidebar Navigation Accessibility
**Learning:** The main sidebar navigation links lacked the `aria-current="page"` attribute for the currently active link, and keyboard focus indicators were not explicitly defined. Purely decorative icons within the navigation also lacked `aria-hidden="true"`.
**Action:** When creating or modifying navigation menus, always include `aria-current="page"` on the active link for screen reader users, ensure interactive elements have clear `focus-visible` styles, and hide decorative SVG icons from screen readers using `aria-hidden="true"`.
