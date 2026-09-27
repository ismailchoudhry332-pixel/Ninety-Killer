## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-13 - Navigation Link Accessibility Pattern
**Learning:** Next.js active route styles often change visual properties (background/text colors) but forget semantic accessibility and keyboard support. Adding `aria-current="page"` is the standard way to announce the active menu link to screen readers.
**Action:** When working on navigation or link lists, ensure the active state toggles `aria-current="page"`, and apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600` for keyboard tab navigation visibility.
