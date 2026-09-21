## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Sidebar Accessibility Pattern
**Learning:** Found that the main navigation Sidebar component lacked critical keyboard accessibility (focus indicators on links) and correct screen reader cues (`aria-current="page"` for active links, `aria-hidden="true"` for decorative icons).
**Action:** When implementing or reviewing navigation components, always ensure interactive elements have distinct `focus-visible` utility classes (e.g., `focus-visible:ring-2`), use `aria-current` to indicate the active page, and hide decorative SVG icons from screen readers.
