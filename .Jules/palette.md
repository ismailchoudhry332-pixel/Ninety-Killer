## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-13 - Navigation Sidebar Keyboard and ARIA Accessibility Pattern
**Learning:** Found that the main sidebar navigation `Link` components lacked `aria-current="page"` and explicit keyboard focus indicators (e.g., `focus-visible:ring-2`). Using Tailwind's `focus-visible` ensures clean styling for screen reader and keyboard users without altering mouse behavior.
**Action:** Always include `aria-current="page"` conditionally for active links in navigation menus, and explicitly apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600` for consistent keyboard accessibility across interactive elements.
