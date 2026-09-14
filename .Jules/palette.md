## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-11 - Navigation Accessibility Pattern
**Learning:** Found that the standard Sidebar navigation component lacked ARIA attributes (aria-current='page') to indicate the currently active route to screen readers, and that its purely decorative SVG icons were being unnecessarily announced.
**Action:** When implementing or reviewing future navigation components, ensure active links explicitly define `aria-current="page"` and that all accompanying decorative icons define `aria-hidden="true"`.
