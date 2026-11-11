## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-11-11 - Sidebar Accessibility Pattern
**Learning:** Found that the sidebar navigation lacked `aria-current="page"` and `focus-visible` states, making it inaccessible for screen readers and keyboard navigators.
**Action:** When implementing navigation bars, ensure the current page is clearly indicated via `aria-current="page"` and focus indicators using standard Tailwind `focus-visible` utility classes are defined.
