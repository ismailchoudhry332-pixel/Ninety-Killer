## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-09-02 - Sidebar Active State & Navigation Accessibility
**Learning:** Found that the sidebar navigation lacked `aria-current="page"` for active states and had no visible focus ring for keyboard users. Adding these properties and hiding purely decorative SVGs (`aria-hidden="true"`) are essential for improving the accessibility and tab order experience.
**Action:** Always verify keyboard focus states and screen-reader outputs for global navigation components.
