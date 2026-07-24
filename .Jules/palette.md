## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-07-24 - Active Link Accessibility Pattern
**Learning:** Found that the sidebar navigation lacked `aria-current="page"` for the active link and proper focus rings for keyboard navigation. `aria-current="page"` is the standard way to programmatically indicate the current page to screen readers, unlike just changing colors.
**Action:** Always ensure navigation items conditionally apply `aria-current="page"` when active, and explicitly define `focus-visible` styles so keyboard navigators can track their position.
