## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-11-05 - Navigation Sidebar Accessibility
**Learning:** Found that the standard navigation sidebar lacked `aria-current="page"` for active links and distinct `focus-visible` styles, which is critical for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future navigation components, always ensure active links have `aria-current="page"` and interactive elements feature visible focus indicators.
