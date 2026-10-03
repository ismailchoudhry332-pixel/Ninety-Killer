## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-12 - Sidebar Navigation Accessibility
**Learning:** Found that the sidebar navigation links and decorative icons lacked proper keyboard accessibility and screen reader optimizations.
**Action:** When implementing navigation links, use `aria-current="page"` for the active item, add `focus-visible` utility classes (e.g. `focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2`) to provide visible indicators for keyboard users, and use `aria-hidden="true"` on decorative icon SVGs to reduce screen reader noise.
